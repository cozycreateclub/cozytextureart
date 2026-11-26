// Order emails, sent from the studio's own Gmail through nodemailer. Needs environment variables GMAIL_USER
// (cozytextureart@gmail.com) and GMAIL_APP_PASSWORD (a Google app password, not the account password).
// Without them, sendMail() does nothing and returns false, so payments still work.
const nodemailer = require('nodemailer');

let transport = null;
function mailer() {
  const user = (process.env.GMAIL_USER || '').trim(), pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  if (!user || !pass) return null;
  return transport || (transport = nodemailer.createTransport({service: 'gmail', auth: {user, pass}}));
}

async function sendMail({to, subject, text, html, replyTo}) {
  const t = mailer();
  if (!t || !to) return false;
  try {
    await t.sendMail({from: `Cozy Texture Art <${process.env.GMAIL_USER.trim()}>`, to, subject, text, html, replyTo});
    return true;
  } catch (e) {
    console.error('mail failed', e && e.message);
    return false;
  }
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const inr = n => '₹ ' + Number(n).toLocaleString('en-IN');

// One order = one email to the buyer and one to the studio, built from the Razorpay order notes.
function orderEmails({notes, amount, paymentId, orderId, test, site}) {
  const price = inr((amount || 0) / 100);
  const link = `${site}/art/${notes.slug || ''}`;
  const addr = [notes.address, [notes.city, notes.pincode].filter(Boolean).join(' ')].filter(Boolean).join(', ');
  const first = (notes.name || '').trim().split(' ')[0] || 'there';
  const tag = test ? ' [TEST]' : '';
  const testLine = test ? 'This was a test-mode payment: no real money moved.\n\n' : '';
  const buyerText = `Hi ${first},

Thank you. ${notes.painting} is yours.

${testLine}Painting: ${notes.painting} (${link})
Paid: ${price}
Payment reference: ${paymentId}
Delivering to: ${notes.name}, ${addr}
Phone: ${notes.phone}

Your painting will be wrapped and packed by hand and dispatched within 5–7 days. Tracking details will follow by email or message once it ships. Delivery anywhere in India is included.

If anything needs changing, just reply to this email.

Warmly,
Priyanka
Cozy Texture Art · ${site}`;
  const p = s => `<p style="margin:0 0 14px;font:15px/1.6 Georgia,serif;color:#2B2622">${s}</p>`;
  const buyerHtml = `<div style="max-width:560px;padding:24px;background:#F7F4EF">
${p(`Hi ${esc(first)},`)}
${p(`Thank you. <a href="${esc(link)}" style="color:#8E5A55">${esc(notes.painting)}</a> is yours.`)}
${test ? p('<em>This was a test-mode payment: no real money moved.</em>') : ''}
${p(`<strong>Paid:</strong> ${esc(price)}<br><strong>Payment reference:</strong> ${esc(paymentId)}<br><strong>Delivering to:</strong> ${esc(notes.name)}, ${esc(addr)}<br><strong>Phone:</strong> ${esc(notes.phone)}`)}
${p('Your painting will be wrapped and packed by hand and dispatched within 5–7 days. Tracking details will follow by email or message once it ships. Delivery anywhere in India is included.')}
${p('If anything needs changing, just reply to this email.')}
${p(`Warmly,<br>Priyanka<br><a href="${esc(site)}" style="color:#8E5A55">Cozy Texture Art</a>`)}
</div>`;
  const studioText = `New order${test ? ' (TEST MODE, no real money)' : ''}

Painting: ${notes.painting} (${link})
Paid: ${price}
Payment: ${paymentId}
Order: ${orderId}

Name: ${notes.name}
Email: ${notes.email || '(not given)'}
Phone: ${notes.phone}
Address: ${addr}

Remember to mark this painting sold on the website.`;
  return {
    buyer: {to: notes.email, subject: `${tag ? '[TEST] ' : ''}Your Cozy Texture Art order: ${notes.painting}`, text: buyerText, html: buyerHtml},
    studio: {to: process.env.GMAIL_USER && process.env.GMAIL_USER.trim(), subject: `Order paid${tag}: ${notes.painting} · ${price}`, text: studioText, replyTo: notes.email || undefined}
  };
}

// For the setup check in create-order (GET ?mailcheck): signs in to Gmail without sending anything.
async function mailStatus() {
  const t = mailer();
  if (!t) return {configured: false, ok: false};
  try { await t.verify(); return {configured: true, ok: true}; }
  catch (e) { return {configured: true, ok: false, error: String(e && (e.responseCode || e.code) || 'failed')}; }
}

module.exports = {sendMail, orderEmails, mailStatus};
