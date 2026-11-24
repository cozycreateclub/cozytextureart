#!/usr/bin/env node
// Write sitemap.xml (home, collection, about, every art room with pieces, every piece, with its front
// image) and robots.txt pointing to it. Run after every catalogue change. Usage: node tools/make_sitemap.js
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.dirname(__dirname);
const SITE = 'https://www.cozytextureart.com';
const win = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data/artworks.js'), 'utf8'), { window: win });
const { ART_ROOMS } = win;
const ARTWORKS = win.ARTWORKS.filter(a => !a.hidden);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (loc, extra = '') => `  <url>\n    <loc>${esc(SITE + loc)}</loc>${extra}\n  </url>`;

const rooms = ART_ROOMS.filter(r => ARTWORKS.some(a => a.tags.some(t => r.tags.includes(t))));
const urls = [
  url('/'), url('/collection'), url('/collection/all'), url('/about'), url('/gifts'),
  ...['terms', 'privacy', 'refunds', 'shipping', 'contact'].map(s => url('/' + s)),
  ...rooms.map(r => url('/collection/' + r.slug)),
  ...ARTWORKS.map(a => url('/art/' + a.slug,
    `\n    <image:image>\n      <image:loc>${esc(SITE + a.images.front.src)}</image:loc>\n    </image:image>`))
];

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  urls.join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`sitemap.xml: ${urls.length} pages (${rooms.length} rooms, ${ARTWORKS.length} pieces); robots.txt written`);
