#!/usr/bin/env python3
"""Studio-clean a front-on artwork photo without changing the artwork itself.

Usage: python3 tools/refine_photo.py <in> <out> [--corners auto|x,y,x,y,x,y,x,y] [--size WxH]
         [--inset N] [--overlay file] [--bg auto|x,y] [--target R,G,B] [--tol N]
         [--neutral N] [--global] [--enhance-only] [--crop l,t,r,b] [--color 1.03] [--contrast 1.05]

--corners: the canvas corners in the raw photo, clockwise from top-left (TL, TR, BR, BL), or
  `auto` to find them from the contrast against wall/table. The photo is perspective-corrected
  to a rectangle with the --size aspect (e.g. 30x42), which also crops everything that isn't canvas.
  --inset trims N px more off each edge if background still shows. --overlay saves a downscaled
  copy with the corners drawn on it: always check it.
--bg auto (default): white canvas if enough shows, else the dominant ground colour.
--ground colour: pale painted grounds (powder blue, taupe, mauve, grey) that auto would mistake for white.
--enhance-only: painted skies/gradients, where evening the light would erase the artwork.
--global: hard stripes of sun and shadow; one white-balance gain only (flag the photo for a reshoot).
--wb-surround: for painted grounds/skies shot on a white sheet or wall: first map that surround to a
  neutral near-white (white balance + exposure, gains capped 0.85–1.30), so a pale ground keeps its
  own colour and brightness, not the room light's.

Only geometric and global, photographic corrections (no retouching of the paint):
  0. Square up: perspective-correct and crop to the canvas (--corners).
  1. Even lighting: fits a smooth surface to the plain ground (the colour at --bg within
     --tol, or any near-neutral pixel with --neutral) and divides it out, removing falloff.
  2. White balance: the ground is mapped to --target (default a neutral studio white).
  3. Gentle colour/contrast lift and a fine unsharp mask for crisp knife marks.
Pillow only (no numpy).
"""
import argparse
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageMath, ImageOps

GRID = 96  # sample grid for the lighting fit


def solve(A, b):
    # Gaussian elimination for the small normal-equation system.
    n = len(A)
    M = [row[:] + [b[i]] for i, row in enumerate(A)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c]))
        M[c], M[p] = M[p], M[c]
        for r in range(n):
            if r != c and M[c][c]:
                f = M[r][c] / M[c][c]
                M[r] = [x - f * y for x, y in zip(M[r], M[c])]
    return [M[i][n] / M[i][i] for i in range(n)]


def terms(x, y):
    return [1, x, y, x * x, y * y, x * y, x * x * x, y * y * y, x * x * y, x * y * y]


def fit_lighting(im, ref, tol, neutral=None):
    w, h = im.size
    gw = GRID; gh = max(8, round(GRID * h / w))
    small = im.resize((gw, gh), Image.BOX)
    px = small.load()
    pts = []
    # In neutral mode, judge "white" after removing the photo's own colour cast (taken from --bg),
    # scaled by brightness so shadowed canvas still counts.
    rm = sum(ref) / 3
    cast = [ref[k] - rm for k in range(3)]
    for j in range(gh):
        for i in range(gw):
            c = px[i, j]
            if neutral:
                L = sum(c) / 3
                d = [c[k] - cast[k] * L / rm for k in range(3)]
                ok = max(d) - min(d) < neutral and L > 90
            else:
                ok = sum(abs(c[k] - ref[k]) for k in range(3)) < tol
            if ok:
                pts.append((i / (gw - 1), j / (gh - 1), c))
    if len(pts) < 30:
        raise SystemExit(f'only {len(pts)} ground samples; raise --tol or move --bg')
    fits = []
    for k in range(3):
        n = len(terms(0, 0))
        A = [[0.0] * n for _ in range(n)]; b = [0.0] * n
        for x, y, c in pts:
            t = terms(x, y)
            for r in range(n):
                b[r] += t[r] * c[k]
                for s in range(n):
                    A[r][s] += t[r] * t[s]
        fits.append(solve(A, b))
    return fits, len(pts), (gw, gh)


def gain_maps(size, fits, target, grid):
    w, h = size; gw, gh = grid
    maps = []
    for k in range(3):
        g = Image.new('F', (gw, gh))
        gp = g.load()
        for j in range(gh):
            for i in range(gw):
                v = sum(a * t for a, t in zip(fits[k], terms(i / (gw - 1), j / (gh - 1))))
                gp[i, j] = target[k] / max(v, 1.0)
        maps.append(g.resize((w, h), Image.BICUBIC))
    return maps


def auto_ground(im, force=None):
    """Pick the plain ground: white canvas if enough shows, else the most common colour."""
    small = im.resize((96, max(8, round(96 * im.height / im.width))), Image.BOX)
    px = list(small.getdata())
    # The photo's colour cast, read off the brightest pixels (most likely bare canvas), is
    # removed before judging what counts as white, so a warm or cool cast doesn't hide it.
    bright = sorted(px, key=sum)[-max(1, len(px) // 10):]
    ref = [sorted(c[k] for c in bright)[len(bright) // 2] for k in range(3)]
    rm = sum(ref) / 3
    cast = [ref[k] - rm for k in range(3)]

    def neutral(c):
        L = sum(c) / 3
        d = [c[k] - cast[k] * L / rm for k in range(3)]
        return max(d) - min(d) < 22 and L > 150

    whites = [c for c in px if neutral(c)]
    if force != 'colour' and (force == 'white' or len(whites) > len(px) * 0.12):
        whites.sort(key=sum)
        return whites[len(whites) // 2], 'white'
    q = small.quantize(colors=8, method=Image.Quantize.MEDIANCUT)
    count, idx = max(q.getcolors())
    pal = q.getpalette()
    return tuple(pal[idx * 3: idx * 3 + 3]), 'colour'


def find_corners(im):
    """Canvas corners (TL, TR, BR, BL) from its contrast against the surround.

    The surround is modelled as a smooth quadratic surface fitted to a thin border strip, so
    light falloff across the wall doesn't read as canvas; canvas pixels are the ones that differ
    from it by more than an Otsu threshold. Corners are the extreme points of x+y and x-y of the
    cleaned mask, which holds for a canvas shot roughly straight on, even with keystone or tilt.
    """
    W = 480
    s = im.resize((W, max(8, round(W * im.height / im.width))), Image.BOX)
    w, h = s.size
    px = s.load()
    b = max(2, w // 60)
    border = [(x, y) for x in range(w) for y in list(range(b)) + list(range(h - b, h))]
    border += [(x, y) for y in range(b, h - b) for x in list(range(b)) + list(range(w - b, w))]
    q = lambda x, y: [1, x, y, x * x, y * y, x * y]
    fits = []
    for k in range(3):
        A = [[0.0] * 6 for _ in range(6)]; r = [0.0] * 6
        for x, y in border:
            t = q(x / w, y / h)
            for i in range(6):
                r[i] += t[i] * px[x, y][k]
                for j in range(6):
                    A[i][j] += t[i] * t[j]
        fits.append(solve(A, r))
    d = []
    for y in range(h):
        for x in range(w):
            t = q(x / w, y / h)
            c = px[x, y]
            d.append(min(255, int(sum(abs(c[k] - sum(a * v for a, v in zip(fits[k], t))) for k in range(3)))))
    # Otsu threshold on the difference histogram.
    hist = [0] * 256
    for v in d:
        hist[v] += 1
    total, sum_all = len(d), sum(i * n for i, n in enumerate(hist))
    best, thr, wb, sb = 0, 40, 0, 0
    for t in range(256):
        wb += hist[t]; sb += t * hist[t]
        if wb == 0 or wb == total:
            continue
        mb, mf = sb / wb, (sum_all - sb) / (total - wb)
        between = wb * (total - wb) * (mb - mf) ** 2
        if between > best:
            best, thr = between, t
    thr = max(thr, 25)
    diff = Image.new('L', (w, h))
    diff.putdata([255 if v > thr else 0 for v in d])
    # Close small gaps in the canvas, then drop specks outside it.
    mask = diff.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(5))
    mp = mask.load()
    pts = [(x, y) for y in range(h) for x in range(w) if mp[x, y]]
    if len(pts) < w * h * 0.05:
        raise SystemExit('could not find the canvas edge; pass --corners x,y,... read off the photo')
    tl = min(pts, key=lambda p: p[0] + p[1]); br = max(pts, key=lambda p: p[0] + p[1])
    tr = max(pts, key=lambda p: p[0] - p[1]); bl = min(pts, key=lambda p: p[0] - p[1])
    k = im.width / w
    return [(x * k, y * k) for x, y in (tl, tr, br, bl)]


def square_up(im, corners, size, inset=0):
    """Perspective-correct the canvas quad to a rectangle with the canvas's own aspect."""
    tl, tr, br, bl = corners
    dist = lambda p, q: ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2) ** .5
    if size:
        cw, ch = size
    else:
        cw, ch = max(dist(tl, tr), dist(bl, br)), max(dist(tl, bl), dist(tr, br))
    ow = round(max(dist(tl, tr), dist(bl, br), dist(tl, bl) * cw / ch, dist(tr, br) * cw / ch))
    oh = round(ow * ch / cw)
    # QUAD takes the source corners as upper-left, lower-left, lower-right, upper-right.
    quad = tuple(v for p in (tl, bl, br, tr) for v in p)
    out = im.transform((ow, oh), Image.QUAD, quad, Image.BICUBIC)
    if inset:
        out = out.crop((inset, inset, ow - inset, oh - inset))
    return out


def surround_gain(im, corners, target=236, lo=0.85, hi=1.30):
    """White-balance and exposure gains read off the plain white surround (sheet, wall) outside the canvas.

    For painted grounds and skies, where no white canvas shows, this is the only neutral in the
    photo. Uses the brighter half of the pixels outside the canvas quad and maps them to a neutral
    `target` (phone shots indoors come out ~15–20% dark); each gain is capped to [lo, hi].
    """
    w = 400
    k = w / im.width
    s = im.resize((w, round(im.height * k)), Image.BOX)
    m = Image.new('L', s.size, 255)
    ImageDraw.Draw(m).polygon([(x * k, y * k) for x, y in corners], fill=0)
    m = m.filter(ImageFilter.MinFilter(9))           # stay clear of the canvas edge
    px = [c for c, keep in zip(s.getdata(), m.getdata()) if keep and max(c) - min(c) < 40]
    if len(px) < 200:
        return [1.0, 1.0, 1.0]
    px.sort(key=sum)
    bright = px[len(px) // 2:]
    med = [sorted(c[i] for c in bright)[len(bright) // 2] for i in range(3)]
    return [min(hi, max(lo, target / max(v, 1))) for v in med]


def save_overlay(im, corners, path):
    o = im.copy()
    o.thumbnail((1000, 1000))
    k = o.width / im.width
    d = ImageDraw.Draw(o)
    pts = [(x * k, y * k) for x, y in corners]
    d.line(pts + [pts[0]], fill=(255, 0, 140), width=3)
    for x, y in pts:
        d.ellipse((x - 7, y - 7, x + 7, y + 7), outline=(255, 0, 140), width=3)
    o.save(path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('out')
    ap.add_argument('--corners', help='auto, or x,y,x,y,x,y,x,y clockwise from top-left')
    ap.add_argument('--size', help='canvas WxH in cm (any unit), sets the output aspect, e.g. 30x42')
    ap.add_argument('--inset', type=int, default=0)
    ap.add_argument('--overlay', help='save the detected/given corners drawn on the photo here')
    ap.add_argument('--wb-surround', action='store_true',
                    help='with --corners: white balance and exposure from the white sheet/wall around the canvas, before anything else')
    ap.add_argument('--bg', default='auto', help='auto, or x,y of a plain ground pixel (in the cropped image)')
    ap.add_argument('--target', default='247,247,246')
    ap.add_argument('--tol', type=int, default=45)
    ap.add_argument('--neutral', type=int, help='treat near-grey pixels (after removing the cast) as ground')
    ap.add_argument('--global', dest='glob', action='store_true', help='white balance only, one gain for the whole image')
    ap.add_argument('--enhance-only', action='store_true', help='no lighting or white-balance change')
    ap.add_argument('--ground', choices=['white', 'colour'], help='force the auto mode (colour keeps a painted ground\'s own colour)')
    ap.add_argument('--crop')
    ap.add_argument('--color', type=float, default=1.03)
    ap.add_argument('--contrast', type=float, default=1.05)
    a = ap.parse_args()

    im = ImageOps.exif_transpose(Image.open(a.src)).convert('RGB')
    if a.corners:
        if a.corners == 'auto':
            corners = find_corners(im)
        else:
            v = [float(x) for x in a.corners.split(',')]
            corners = list(zip(v[0::2], v[1::2]))
        if a.overlay:
            save_overlay(im, corners, a.overlay)
        if a.wb_surround:
            g = surround_gain(im, corners)
            im = Image.merge('RGB', [b.point(lambda v, f=f: min(255, round(v * f))) for b, f in zip(im.split(), g)])
            print('surround white balance + exposure', ', '.join(f'{f:.3f}' for f in g))
        size = tuple(float(x) for x in a.size.lower().split('x')) if a.size else None
        im = square_up(im, corners, size, a.inset)
        print('corners', ', '.join(f'{x:.0f},{y:.0f}' for x, y in corners))
    if a.crop:
        im = im.crop(tuple(int(v) for v in a.crop.split(',')))
    target = [int(v) for v in a.target.split(',')]
    if a.enhance_only:
        note = 'enhance only'
        maps = None
    else:
        if a.bg == 'auto':
            ref, mode = auto_ground(im, a.ground)
            if mode == 'white':
                a.neutral = a.neutral or 16
            else:
                a.neutral = None
                target = [min(250, round(c * 1.04)) for c in ref]
        else:
            bx, by = (int(v) for v in a.bg.split(','))
            ref = im.resize((im.width // 8, im.height // 8), Image.BOX).getpixel((bx // 8, by // 8))
            mode = 'manual'
        if a.glob:
            maps = [Image.new('F', im.size, target[k] / max(ref[k], 1)) for k in range(3)]
            note = f'{mode} ground {ref} → {tuple(target)}, global'
        else:
            fits, n, grid = fit_lighting(im, ref, a.tol, a.neutral)
            maps = gain_maps(im.size, fits, target, grid)
            note = f'{mode} ground {ref} → {tuple(target)}, {n} samples'
    out = im
    if maps:
        bands = []
        for band, g in zip(im.split(), maps):
            f = ImageMath.lambda_eval(lambda e: e['min'](e['float'](e['a']) * e['b'], 255.0), a=band, b=g)
            bands.append(f.convert('L'))
        out = Image.merge('RGB', bands)
    out = ImageEnhance.Color(out).enhance(a.color)
    out = ImageEnhance.Contrast(out).enhance(a.contrast)
    out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=3))
    out.save(a.out, quality=95) if a.out.lower().endswith(('.jpg', '.jpeg')) else out.save(a.out)
    print(f'{note}; saved {out.size} → {a.out}')


if __name__ == '__main__':
    main()
