// Shared helpers for the Razorpay functions. Files starting with "_" in /api are not deployed as endpoints.
// Keys come only from environment variables (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET); the secret never leaves the server.
const fs = require('fs'), path = require('path'), vm = require('vm');

function keys() {
  const id = process.env.RAZORPAY_KEY_ID, secret = process.env.RAZORPAY_KEY_SECRET;
  return id && secret ? {id, secret} : null;
}

// The catalogue is the source of truth for prices, so a buyer can never change what they pay.
function catalogue() {
  const win = {};
  vm.runInNewContext(fs.readFileSync(path.join(process.cwd(), 'data', 'artworks.js'), 'utf8'), {window: win});
  return win.ARTWORKS || [];
}

// Vercel parses JSON bodies; the local dev server passes a string or object.
function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (e) { return {}; }
}

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

async function razorpay(method, route, k, payload) {
  const r = await fetch('https://api.razorpay.com/v1' + route, {
    method,
    headers: {'Content-Type': 'application/json', Authorization: 'Basic ' + Buffer.from(k.id + ':' + k.secret).toString('base64')},
    body: payload ? JSON.stringify(payload) : undefined
  });
  const j = await r.json().catch(() => ({}));
  return {status: r.status, data: j};
}

module.exports = {keys, catalogue, body, send, razorpay};
