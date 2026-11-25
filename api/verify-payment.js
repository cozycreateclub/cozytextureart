// POST /api/verify-payment  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Checks HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET) against Razorpay's signature. Only a match counts as paid;
// it then emails the buyer a confirmation and the studio the order (see _mail.js) and returns the order details.
const crypto = require('crypto');
const {keys, body, send, razorpay} = require('./_razorpay');
const {sendMail, orderEmails} = require('./_mail');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, {error: 'Use POST'});
  const k = keys();
  if (!k) return send(res, 500, {error: 'Payments are not set up yet'});

  const {razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature} = body(req);
  if (!orderId || !paymentId || !signature) return send(res, 400, {error: 'Missing payment details'});

  const expected = crypto.createHmac('sha256', k.secret).update(orderId + '|' + paymentId).digest('hex');
  const a = Buffer.from(expected), b = Buffer.from(String(signature));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return send(res, 400, {error: 'Payment could not be verified'});

  const order = await razorpay('GET', '/orders/' + encodeURIComponent(orderId), k);
  const notes = (order.data && order.data.notes) || {};
  const amount = order.data && order.data.amount;
  const site = 'https://' + (req.headers['x-forwarded-host'] || req.headers.host || 'www.cozytextureart.com');
  const mail = orderEmails({notes, amount, paymentId, orderId, test: k.id.startsWith('rzp_test_'), site});
  const [buyerEmailed, studioEmailed] = await Promise.all([sendMail(mail.buyer), sendMail(mail.studio)]);
  return send(res, 200, {verified: true, order_id: orderId, payment_id: paymentId, amount, notes, buyerEmailed, studioEmailed});
};
