#!/usr/bin/env node
// Local server for testing payments: serves the site like tools/dev_server.py (unknown paths -> index.html) and runs
// the Vercel functions in /api with keys read from .env. Usage: node tools/dev_api_server.js [port]
const http = require('http'), fs = require('fs'), path = require('path');

const ROOT = path.dirname(__dirname);
const PORT = Number(process.argv[2] || 4325);
const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain'};

try {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
} catch (e) { console.warn('No .env found; /api calls will say payments are not set up.'); }
process.chdir(ROOT);

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const fn = url.pathname.match(/^\/api\/([a-z0-9-]+)$/);
  if (fn) {
    const file = path.join(ROOT, 'api', fn[1] + '.js');
    if (!fs.existsSync(file)) { res.statusCode = 404; return res.end('{}'); }
    let raw = '';
    req.on('data', c => { raw += c; });
    req.on('end', () => {
      try { req.body = raw ? JSON.parse(raw) : {}; } catch (e) { req.body = raw; }
      Promise.resolve(require(file)(req, res)).catch(err => { console.error(err); res.statusCode = 500; res.end('{"error":"server error"}'); });
    });
    return;
  }
  let file = path.join(ROOT, decodeURIComponent(url.pathname));
  if (!file.startsWith(ROOT) || file.includes(`${path.sep}.env`)) { res.statusCode = 403; return res.end(); }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(ROOT, 'index.html');
  res.setHeader('Content-Type', TYPES[path.extname(file)] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store');
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Cozy Texture Art with /api on http://localhost:${PORT}`));
