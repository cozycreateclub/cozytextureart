// POST /api/create-order  { slug, buyer: { name, email, phone, address, city, pincode } }
// Creates a Razorpay order for one painting at its catalogue price and returns { order_id, amount, currency, key_id }.
// The buyer's delivery details ride along as order notes, so they show in the Razorpay dashboard next to the payment.
// GET returns { enabled, mode } so the site knows whether to show Buy now (test keys stay hidden from visitors).
const {keys, catalogue, body, send, razorpay} = require('./_razorpay');

const clip = (v, n) => String(v || '').replace(/\s+/g, ' ').trim().slice(0, n);

module.exports = async (req, res) => {
  const k = keys();
  if (req.method === 'GET') return send(res, 200, {enabled: !!k, mode: k ? (k.id.startsWith('rzp_live_') ? 'live' : 'test') : null});
  if (req.method !== 'POST') return send(res, 405, {error: 'Use POST'});
  if (!k) return send(res, 500, {error: 'Payments are not set up yet'});

  const {slug, buyer = {}} = body(req);
  const piece = catalogue().find(a => a.slug === slug);
  if (!piece || piece.hidden) return send(res, 404, {error: 'This painting is not on the site'});
  if (piece.status !== 'available') return send(res, 409, {error: 'This painting has already found a home'});
  const amount = Math.round(Number(piece.price) * 100);
  if (!Number.isInteger(amount) || amount < 100) return send(res, 400, {error: 'This painting has no price yet'});
  for (const f of ['name', 'phone', 'address', 'pincode']) if (!clip(buyer[f], 255)) return send(res, 400, {error: `Missing ${f}`});

  const {status, data} = await razorpay('POST', '/orders', k, {
    amount, currency: 'INR', receipt: clip(`${slug}-${Date.now()}`, 40),
    notes: {
      painting: clip(piece.title, 255), slug: clip(slug, 255), price_inr: String(piece.price),
      name: clip(buyer.name, 255), email: clip(buyer.email, 255), phone: clip(buyer.phone, 255),
      address: clip(buyer.address, 255), city: clip(buyer.city, 255), pincode: clip(buyer.pincode, 20)
    }
  });
  if (status === 401) return send(res, 401, {error: 'Payment keys were rejected'});
  if (status >= 300 || !data.id) return send(res, 500, {error: (data.error && data.error.description) || 'Could not start the payment'});
  return send(res, 200, {order_id: data.id, amount: data.amount, currency: data.currency, key_id: k.id, title: piece.title});
};
