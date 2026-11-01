#!/usr/bin/env python3
"""Hang a refined front photo in a room scene at true scale.

Usage:
  python3 tools/make_mockup.py <front> <out> --size 30x42 [--scene name|auto] [--avoid a,b] [--round]
  python3 tools/make_mockup.py scenes        # (re)draw the code-drawn scene set into mockups/rooms/
  python3 tools/make_mockup.py list          # scenes and their wall colours

Scenes live in mockups/rooms/: <name>.jpg (1600x1200, empty wall) + <name>.json sidecar:
  { "wall": [x0,y0,x1,y1],        where art may hang
    "floor_y": 1010,              floor line
    "px_per_cm": 6.5,             on the wall plane (calibrate from a known object, e.g. a 120 cm sideboard)
    "hang_x": 800,                centre line to hang on (usually the furniture's centre)
    "furniture_top": 687,         top of the sideboard/console under the art
    "light": "left" | "right",    side the window light comes from
    "wall_rgb": [r,g,b],
    "source": "photo" | "code" }
Drop your own empty-wall photos in with a sidecar and they join the set; `scenes` only rewrites
the code-drawn ones.

Compositing: small pieces get a closer crop of the room (--zoom, auto up to 2.6x; scale stays true
because px_per_cm scales with it). Scale to size.w x px_per_cm, hang centred 25 cm (up to 35) above the furniture, add a 2–3 px
canvas edge and a soft warm drop shadow away from the light, then multiply the art by the wall's
own low-frequency light so window light falls across it the same way. Needs Pillow and numpy.
"""
import argparse, colorsys, glob, json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOMS = os.path.join(ROOT, 'mockups', 'rooms')
W, H = 1600, 1200
PPC = 8              # px per cm on the wall in the code-drawn scenes
FLOOR = 1010
GAP_CM = 25          # art bottom above the furniture top (25–35 cm)

WOODS = {'oak': (196, 160, 118), 'walnut': (112, 74, 50), 'ash': (214, 190, 156)}

# name: wall, furniture (wood name or rgb), light side, lamp base
SCENES = {
    'cream-oak':      dict(wall=(236, 226, 208), furn='oak',            light='left',  lamp=(214, 120, 96)),
    'sage-ash':       dict(wall=(188, 200, 176), furn='ash',            light='right', lamp=(240, 232, 214)),
    'terracotta-oak': dict(wall=(198, 140, 112), furn='oak',            light='left',  lamp=(242, 234, 220)),
    'peach-powder':   dict(wall=(238, 194, 166), furn=(164, 196, 204), light='right', lamp=(228, 184, 72)),
    'plum-ash':       dict(wall=(146, 110, 126), furn='ash',            light='left',  lamp=(236, 226, 210)),
    'lilac-oak':      dict(wall=(206, 192, 212), furn='oak',            light='right', lamp=(150, 112, 128)),
    'green-walnut':   dict(wall=(54, 84, 64),    furn='walnut',         light='left',  lamp=(206, 160, 70)),
    'navy-oak':       dict(wall=(48, 60, 86),    furn='oak',            light='right', lamp=(238, 228, 212)),
}


# ── drawing helpers ──────────────────────────────────────────────

def noise(shape, scale, rng):
    """Smooth value noise in [-1, 1] at roughly `scale` px features."""
    h, w = shape
    small = rng.standard_normal((max(2, h // scale + 2), max(2, w // scale + 2))).astype(np.float32)
    im = Image.fromarray(small).resize((w, h), Image.BICUBIC)
    a = np.asarray(im)
    return a / (np.abs(a).max() + 1e-6)


def blur(a, r):
    """Gaussian blur of a float array (any range) via Pillow; 8-bit is plenty for a light map."""
    lo, hi = float(a.min()), float(a.max())
    if hi - lo < 1e-6:
        return a.copy()
    b = Image.fromarray(((a - lo) / (hi - lo) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    return np.asarray(b).astype(np.float32) / 255 * (hi - lo) + lo


def layer(draw_fn, r=0):
    """Alpha mask (0..1) drawn by draw_fn(ImageDraw), optionally blurred."""
    m = Image.new('L', (W, H), 0)
    draw_fn(ImageDraw.Draw(m))
    if r:
        m = m.filter(ImageFilter.GaussianBlur(r))
    return np.asarray(m).astype(np.float32)[..., None] / 255


def over(img, mask, rgb):
    img[:] = img * (1 - mask) + np.array(rgb, np.float32) * mask


def shade(img, mask, k):
    """Multiply by (1 - k) under mask (k > 0 darkens, k < 0 lightens)."""
    img[:] = img * (1 - mask * k)


def leaf(cx, cy, length, width, ang):
    pts = []
    for i in range(21):
        t = i / 20
        x = t * length; y = math.sin(math.pi * t) * width / 2
        pts.append((x, y))
    pts += [(x, -y) for x, y in reversed(pts)]
    c, s = math.cos(ang), math.sin(ang)
    return [(cx + x * c - y * s, cy + x * s + y * c) for x, y in pts]


# ── scenes ───────────────────────────────────────────────────────

def draw_scene(name, spec, seed):
    rng = np.random.default_rng(seed)
    wall = np.array(spec['wall'], np.float32)
    left = spec['light'] == 'left'
    img = np.zeros((H, W, 3), np.float32) + wall
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    fx = xx / W if left else 1 - xx / W

    # Wall: plaster noise, falloff away from the window, a little darker high up.
    img *= (1 + 0.035 * noise((H, W), 160, rng) + 0.012 * noise((H, W), 6, rng))[..., None]
    img *= (1.08 - 0.16 * fx - 0.05 * (1 - yy / FLOOR).clip(0, 1))[..., None]

    # Window light: slanted panes, soft-edged, warm.
    def panes(d):
        for i, (x0, w0) in enumerate([(-120, 230), (170, 210), (450, 170)]):
            sk = 260
            for row in (0, 1):
                y0, y1 = 60 + row * 360, 60 + row * 360 + 320
                xs = [x0, x0 + w0, x0 + w0 + sk, x0 + sk]
                ys = [y0, y0, y1, y1]
                if not left:
                    xs = [W - x for x in xs]
                d.polygon(list(zip(xs, ys)), fill=255)
    sun = layer(panes, 26) * (0.55 + 0.45 * (1 - fx))[..., None]
    img *= 1 + sun * np.array([0.40, 0.34, 0.24], np.float32)   # brighten with warm light, keeping the wall's hue

    # Skirting.
    sk = layer(lambda d: d.rectangle((0, FLOOR - 46, W, FLOOR), fill=255))
    over(img, sk, wall * 1.06)
    shade(img, layer(lambda d: d.rectangle((0, FLOOR - 48, W, FLOOR - 45), fill=255), 1), 0.12)

    # Floor: warm oak, darker towards the camera, planks converging on the centre.
    flo = layer(lambda d: d.rectangle((0, FLOOR, W, H), fill=255))
    oak = np.array((172, 132, 94), np.float32)
    fimg = oak * (1 + 0.04 * noise((H, W), 30, rng))[..., None] * (1.05 - 0.22 * ((yy - FLOOR) / (H - FLOOR)).clip(0, 1))[..., None]
    img[:] = img * (1 - flo) + fimg * flo
    shade(img, layer(lambda d: [d.line((800 + (x - 800) * .35, FLOOR, x, H), fill=255, width=2) for x in range(-1600, 3300, 150)], 1) * flo, 0.10)
    # Rug.
    rug = layer(lambda d: d.polygon([(230, 1070), (1370, 1070), (1560, H), (40, H)], fill=255), 1)
    jute = np.array((216, 198, 168), np.float32)
    rimg = jute * (1 + 0.06 * noise((H, W), 3, rng))[..., None]
    img[:] = img * (1 - rug) + rimg * rug

    # Sideboard: 120 cm wide, 55 cm tall, in front of the wall.
    sw, sh, cx = 120 * PPC, 55 * PPC, 800
    x0, x1 = cx - sw / 2, cx + sw / 2
    bottom = FLOOR + 34; top = bottom - sh; body_b = bottom - 9 * PPC
    furn = np.array(WOODS.get(spec['furn'], spec['furn']), np.float32)
    dx = 34 if left else -34
    shade(img, layer(lambda d: d.rectangle((x0 + dx, top + 10, x1 + dx, FLOOR), fill=255), 26), 0.30)
    shade(img, layer(lambda d: d.ellipse((x0 - 30, bottom - 14, x1 + 30, bottom + 16), fill=255), 14), 0.40)
    for lx in (x0 + 40, x1 - 52):
        over(img, layer(lambda d, lx=lx: d.rectangle((lx, body_b, lx + 12, bottom), fill=255)), furn * 0.7)
    body = layer(lambda d: d.rectangle((x0, top, x1, body_b), fill=255))
    grain = furn * (1 + 0.035 * noise((H, W), 12, rng))[..., None] * (1 + 0.05 * (1 - fx))[..., None]
    img[:] = img * (1 - body) + grain * body
    over(img, layer(lambda d: d.rectangle((x0, top, x1, top + 7), fill=255)), np.minimum(furn * 1.12, 255))
    shade(img, layer(lambda d: d.rectangle((x0, top + 7, x1, top + 10), fill=255)), 0.14)
    for i in range(1, 4):
        xd = x0 + sw * i / 4
        shade(img, layer(lambda d, xd=xd: d.line((xd, top + 16, xd, body_b - 8), fill=255, width=2)), 0.22)
        shade(img, layer(lambda d, xd=xd: d.ellipse((xd - 22, top + 70, xd - 14, top + 78), fill=255)), 0.28)
    shade(img, layer(lambda d: d.rectangle((x0, body_b - 4, x1, body_b), fill=255)), 0.18)

    # Lamp on the sideboard, away from the art.
    lx = x0 + 120 if left else x1 - 120
    base = np.array(spec['lamp'], np.float32)
    shade(img, layer(lambda d: d.ellipse((lx - 40 + dx * .6, top - 230, lx + 70 + dx * .6, top), fill=255), 22), 0.16)
    over(img, layer(lambda d: d.ellipse((lx - 34, top - 120, lx + 34, top), fill=255), 1), base)
    over(img, layer(lambda d: d.ellipse((lx - 22, top - 150, lx + 22, top - 96), fill=255), 1), base * 1.03)
    shade(img, layer(lambda d: d.ellipse((lx + (6 if left else -40), top - 110, lx + (40 if left else -6), top - 6), fill=255), 8), 0.18)
    over(img, layer(lambda d: d.rectangle((lx - 3, top - 168, lx + 3, top - 146), fill=255)), (150, 120, 70))
    over(img, layer(lambda d: d.polygon([(lx - 62, top - 168), (lx + 62, top - 168), (lx + 46, top - 300), (lx - 46, top - 300)], fill=255), 1), (246, 236, 216))
    img += layer(lambda d: d.ellipse((lx - 150, top - 380, lx + 150, top - 60), fill=255), 60) * (np.array([255, 226, 170], np.float32) - img) * 0.22

    # Vase with a few stems on the other side.
    vx = x1 - 130 if left else x0 + 130
    stems = layer(lambda d: [d.line((vx, top - 70, vx + ox, top - 70 - oy), fill=255, width=3) for ox, oy in ((-46, 120), (-8, 170), (30, 140), (58, 96))], 1)
    over(img, stems, (104, 118, 82))
    for ox, oy in ((-46, 120), (-8, 170), (30, 140), (58, 96)):
        for k in range(4):
            t = .45 + k * .15
            px_, py_ = vx + ox * t, top - 70 - oy * t
            over(img, layer(lambda d, a=px_, b=py_, k=k: d.polygon(leaf(a, b, 26, 11, -math.pi / 2 + (0.9 if k % 2 else -0.9)), fill=255), 1), (128, 146, 98))
        over(img, layer(lambda d, a=vx + ox, b=top - 70 - oy: d.ellipse((a - 7, b - 7, a + 7, b + 7), fill=255), 1), (236, 214, 150))
    shade(img, layer(lambda d: d.ellipse((vx - 34 + dx * .4, top - 92, vx + 34 + dx * .4, top + 2), fill=255), 10), 0.18)
    over(img, layer(lambda d: d.ellipse((vx - 32, top - 92, vx + 32, top + 2), fill=255), 1), (226, 216, 200))
    over(img, layer(lambda d: d.rectangle((vx - 14, top - 104, vx + 14, top - 80), fill=255), 1), (222, 212, 196))

    # Floor plant near the window side.
    px0 = 120 if left else W - 120
    shade(img, layer(lambda d: d.ellipse((px0 - 110, FLOOR + 90, px0 + 150, FLOOR + 140), fill=255), 16), 0.35)
    over(img, layer(lambda d: d.polygon([(px0 - 70, FLOOR - 140), (px0 + 70, FLOOR - 140), (px0 + 56, FLOOR + 120), (px0 - 56, FLOOR + 120)], fill=255), 1), (222, 206, 186))
    greens = [(70, 104, 64), (94, 128, 78), (118, 148, 92), (58, 88, 56)]
    for i in range(46):
        ang = -math.pi / 2 + rng.uniform(-1.3, 1.3)
        ln = rng.uniform(140, 300)
        bx, by = px0 + rng.uniform(-20, 20), FLOOR - 140 - rng.uniform(0, 400)
        over(img, layer(lambda d, a=(bx, by, ang, ln): d.polygon(leaf(a[0], a[1], a[3] * .5, a[3] * .17, a[2]), fill=255), 1.2),
             np.array(greens[i % 4], np.float32) * rng.uniform(.85, 1.1))

    img *= (1 - 0.10 * (((xx - W / 2) / W) ** 2 + ((yy - H / 2) / H) ** 2))[..., None]
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))


def build_scenes():
    os.makedirs(ROOMS, exist_ok=True)
    for i, (name, spec) in enumerate(SCENES.items()):
        draw_scene(name, spec, 100 + i).save(os.path.join(ROOMS, name + '.jpg'), quality=92)
        side = {'wall': [300, 30, 1300, 590], 'floor_y': FLOOR, 'px_per_cm': PPC, 'hang_x': 800,
                'furniture_top': FLOOR + 34 - 55 * PPC, 'light': spec['light'], 'wall_rgb': list(spec['wall']),
                'source': 'code'}
        with open(os.path.join(ROOMS, name + '.json'), 'w') as f:
            json.dump(side, f, indent=2)
        print('scene', name)


def load_scenes():
    out = {}
    for p in sorted(glob.glob(os.path.join(ROOMS, '*.json'))):
        name = os.path.splitext(os.path.basename(p))[0]
        img = next((p[:-5] + e for e in ('.jpg', '.jpeg', '.png', '.webp') if os.path.exists(p[:-5] + e)), None)
        if img:
            out[name] = (img, json.load(open(p)))
    if not out:
        sys.exit('no scenes in mockups/rooms/; run: python3 tools/make_mockup.py scenes')
    return out


# ── choosing a scene ─────────────────────────────────────────────

def art_colour(art):
    s = art.copy(); s.thumbnail((80, 80))
    a = np.asarray(s.convert('RGB')).reshape(-1, 3).astype(np.float32) / 255
    hsv = np.array([colorsys.rgb_to_hsv(*p) for p in a])
    sat = hsv[:, 1] > .12
    hue = None
    if sat.sum() > len(a) * .1:
        ang = hsv[sat, 0] * 2 * math.pi
        hue = (math.atan2(np.sin(ang).mean(), np.cos(ang).mean()) / (2 * math.pi)) % 1
    return a.mean(0) * 255, hue


def pick_scene(art, scenes, avoid):
    mean, hue = art_colour(art)
    L = lambda c: .2126 * c[0] + .7152 * c[1] + .0722 * c[2]
    scored = []
    for name, (_, side) in scenes.items():
        w = side['wall_rgb']
        wh, ws, _ = colorsys.rgb_to_hsv(*(np.array(w) / 255))
        contrast = min(.25, abs(L(mean) - L(w)) / 255)           # enough to stand off the wall; more isn't better
        harmony = 0.25
        if hue is not None and ws > .08:
            dh = abs(hue - wh); dh = min(dh, 1 - dh)               # 0 same hue … .5 opposite
            harmony = .5 - abs(dh - .33)                           # favour related-but-different hues
        score = contrast + harmony - (1 if name in avoid else 0)
        scored.append((score, name))
    return max(scored)[1]


# ── compositing ──────────────────────────────────────────────────

def zoom_for(size_cm, side, target=380):
    """Small canvases look lost on a full sideboard: frame closer so the art spans about `target` px."""
    return max(1.0, min(2.6, target / (max(size_cm) * side['px_per_cm'])))


def zoomed(scene_img, side, size_cm, z):
    """Crop the scene around the hanging spot and scale it up by z; true scale is kept because
    px_per_cm (and every other sidecar coordinate) is scaled by the same factor."""
    if z <= 1.0:
        return scene_img, side
    ppc = side['px_per_cm']
    art_h = size_cm[1] * ppc
    # Put the art about a third of the way down, with the top of the sideboard (and what stands on it) in view.
    cw, ch = W / z, H / z
    art_top = side['furniture_top'] - GAP_CM * ppc - art_h
    y0 = max(art_top - 0.22 * ch, side['furniture_top'] - 0.85 * ch)
    x0 = min(max(side['hang_x'] - cw / 2, 0), W - cw); y0 = min(max(y0, 0), H - ch)
    img = scene_img.crop((round(x0), round(y0), round(x0 + cw), round(y0 + ch))).resize((W, H), Image.LANCZOS)
    s = dict(side)
    s['px_per_cm'] = ppc * z
    s['hang_x'] = (side['hang_x'] - x0) * z
    s['furniture_top'] = (side['furniture_top'] - y0) * z
    s['floor_y'] = (side['floor_y'] - y0) * z
    wx0, wy0, wx1, wy1 = side['wall']
    s['wall'] = [max(0, round((wx0 - x0) * z)), max(0, round((wy0 - y0) * z)), min(W, round((wx1 - x0) * z)), min(H, round((wy1 - y0) * z))]
    return img, s


def composite(art, scene_path, side, size_cm, round_=False, zoom='auto'):
    img = Image.open(scene_path).convert('RGB').resize((W, H), Image.LANCZOS)
    z = zoom_for(size_cm, side) if zoom == 'auto' else float(zoom)
    img, side = zoomed(img, side, size_cm, z)
    scene = np.asarray(img).astype(np.float32)
    ppc = side['px_per_cm']
    aw = round(size_cm[0] * ppc); ah = round(size_cm[1] * ppc)
    art = art.convert('RGB').resize((aw, ah), Image.LANCZOS)
    gap = GAP_CM * ppc
    bottom = side['furniture_top'] - gap
    top = bottom - ah
    if top < 30:                                                  # big piece: close the gap, down to 15 cm
        bottom = min(side['furniture_top'] - 15 * ppc, bottom + (30 - top)); top = bottom - ah
    if top < 0:
        print('warning: piece is taller than the wall space at true scale; it will be clipped', file=sys.stderr)
    x0 = round(side['hang_x'] - aw / 2); y0 = round(top)
    left = side['light'] == 'left'

    mask = Image.new('L', (aw, ah), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, aw - 1, ah - 1), fill=255) if round_ else mask.paste(255, (0, 0, aw, ah))

    # Soft warm drop shadow, offset away from the light.
    sh = Image.new('L', (W, H), 0)
    dx, dy = (10 if left else -10), 12
    sh.paste(mask, (x0 + dx, y0 + dy))
    sha = np.asarray(sh.filter(ImageFilter.GaussianBlur(14))).astype(np.float32)[..., None] / 255 * .32
    col = np.array([70, 48, 30], np.float32) / 255
    out = scene * (1 - sha) + scene * col * sha

    # Canvas depth: a darker 3 px edge on the side away from the light, and along the bottom.
    a = np.asarray(art).astype(np.float32)
    if not round_:
        ex = x0 + aw if left else x0 - 3
        edge_col = (a[:, -4:] if left else a[:, :4]).mean((0, 1)) * .62
        out[y0 + 3:y0 + ah + 3, ex:ex + 3] = edge_col
        out[y0 + ah:y0 + ah + 2, x0 + (3 if left else -3):x0 + aw + (3 if left else -3)] = a[-4:].mean((0, 1)) * .55

    # Light match: the wall's own low-frequency light at that spot, normalised to the wall's median.
    lum = .2126 * scene[..., 0] + .7152 * scene[..., 1] + .0722 * scene[..., 2]
    wx0, wy0, wx1, wy1 = side['wall']
    ref = np.median(lum[wy0:wy1, wx0:wx1])
    light = blur(lum, 60)[y0:y0 + ah, x0:x0 + aw] / max(ref, 1)
    light = np.clip(light, .78, 1.22) ** .9
    a = a * light[..., None] * np.array([1.02, 1.0, .97], np.float32)

    m = np.asarray(mask).astype(np.float32)[..., None] / 255
    reg = out[y0:y0 + ah, x0:x0 + aw]
    out[y0:y0 + ah, x0:x0 + aw] = reg * (1 - m) + a * m
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def main():
    if len(sys.argv) > 1 and sys.argv[1] == 'scenes':
        return build_scenes()
    if len(sys.argv) > 1 and sys.argv[1] == 'list':
        for n, (p, s) in load_scenes().items():
            print(f"{n:18} wall {tuple(s['wall_rgb'])}  light {s['light']}  {s.get('source', 'photo')}")
        return
    ap = argparse.ArgumentParser()
    ap.add_argument('front'); ap.add_argument('out')
    ap.add_argument('--size', required=True, help='canvas WxH in cm, or a diameter like 70 with --round')
    ap.add_argument('--scene', default='auto')
    ap.add_argument('--avoid', default='', help='comma-separated scenes to skip (e.g. the neighbours\' scenes)')
    ap.add_argument('--round', action='store_true')
    ap.add_argument('--zoom', default='auto', help='frame closer by this factor (auto: small pieces get up to 2.6x)')
    a = ap.parse_args()
    v = [float(x) for x in a.size.lower().split('x')]
    size = (v[0], v[-1])
    art = ImageOps.exif_transpose(Image.open(a.front))
    scenes = load_scenes()
    name = pick_scene(art, scenes, set(filter(None, a.avoid.split(',')))) if a.scene == 'auto' else a.scene
    if name not in scenes:
        sys.exit(f'unknown scene {name}; have: {", ".join(scenes)}')
    path, side = scenes[name]
    composite(art, path, side, size, a.round, a.zoom).save(a.out)
    print(f'scene {name}; saved {W}x{H} → {a.out}')


if __name__ == '__main__':
    main()
