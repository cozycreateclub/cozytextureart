#!/usr/bin/env node
// Check data/artworks.js: unique slugs, known tags/suits/families/shapes, sizes, images on disk,
// a whole-rupee price on unsold pieces, no relief fields, and pop-pastels only on pieces meant for Signature Pop Colours.
// Prints each art room's piece count. Usage: node tools/validate.js
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.dirname(__dirname);
const win = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data/artworks.js'), 'utf8'), { window: win });
const { TAGS, ART_ROOMS, FAMILIES, SUITS, ARTWORKS } = win;

const errors = [];
const err = (slug, msg) => errors.push(`${slug}: ${msg}`);
const SHAPES = ['portrait', 'square', 'round', 'arch', 'landscape'];
const STATUS = ['available', 'sold', 'reserved'];
const seen = new Set(), titles = new Set();

for (const a of ARTWORKS) {
  const s = a.slug || '(no slug)';
  if (seen.has(s)) err(s, 'duplicate slug');
  seen.add(s);
  if (titles.has(a.title)) err(s, `duplicate title "${a.title}"`);
  titles.add(a.title);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) err(s, 'slug is not lower-case kebab case');
  for (const t of a.tags || []) if (!(t in TAGS)) err(s, `unknown tag "${t}"`);
  for (const u of a.suits || []) if (!SUITS.includes(u)) err(s, `unknown suit "${u}"`);
  if (!(a.family in FAMILIES)) err(s, `unknown family "${a.family}"`);
  if (!SHAPES.includes(a.shape)) err(s, `unknown shape "${a.shape}"`);
  if (!STATUS.includes(a.status)) err(s, `unknown status "${a.status}"`);
  if (!a.size || !(a.size.d || (a.size.w && a.size.h))) err(s, 'size needs {w,h} or {d}');
  if (a.status !== 'sold' && !(Number.isInteger(a.price) && a.price > 0)) err(s, 'price must be a whole number of rupees');
  if (!a.concept || !a.holds) err(s, 'concept and holds are required');
  if (!a.palette || a.palette.length < 3 || a.palette.length > 4) err(s, 'palette needs 3–4 swatches');
  for (const p of a.palette || []) {
    if (!/^[a-z]+$/.test(p.name)) err(s, `swatch name "${p.name}" should be one lower-case word`);
    if (!/^#[0-9A-Fa-f]{6}$/.test(p.hex)) err(s, `swatch hex "${p.hex}" is not #RRGGBB`);
  }
  for (const f of ['relief', 'mm']) if (f in a) err(s, `"${f}" field is not used on this site`);
  for (const k of ['front', 'room']) {
    const im = a.images && a.images[k];
    if (!im) { err(s, `missing images.${k}`); continue; }
    if (!im.alt) err(s, `images.${k}.alt is empty`);
    if (!fs.existsSync(path.join(ROOT, im.src))) err(s, `${im.src} not found`);
  }
  if (!fs.existsSync(path.join(ROOT, `images/art/${s}/front-sm.webp`))) err(s, 'front-sm.webp not found');
}

for (const r of ART_ROOMS) {
  for (const t of r.tags) if (!(t in TAGS)) err(r.slug, `room uses unknown tag "${t}"`);
  if (r.cover && !seen.has(r.cover)) err(r.slug, `cover "${r.cover}" is not a piece`);
}

console.log(`${ARTWORKS.length} pieces, ${Object.keys(TAGS).length} tags`);
for (const r of ART_ROOMS) {
  const n = ARTWORKS.filter(a => a.tags.some(t => r.tags.includes(t))).length;
  console.log(`  ${r.name.padEnd(24)} ${String(n).padStart(3)}${n ? '' : '  (hidden: no pieces)'}`);
}
const featured = ARTWORKS.filter(a => a.featured).length;
console.log(`  featured on home page     ${String(featured).padStart(3)}`);

if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('OK');
