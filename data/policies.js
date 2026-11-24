// Cozy Texture Art — policy pages (Terms, Privacy, Refunds, Shipping, Contact), shown at /<slug>.
// Written 2026-11-24 for the Razorpay website check, from her pricing guide (docs/pricing.md) and the site.
// Each section has a heading `h` and either paragraphs `p` or a bullet list `list` (or both).
// Lines marked CONFIRM are sensible defaults she has not confirmed yet.
window.POLICY_UPDATED = '24 November 2026';
window.POLICIES = [
  {
    slug: 'terms', name: 'Terms & Conditions', title: 'Terms & Conditions',
    intro: 'These terms apply when you buy a painting or order a custom piece from Cozy Texture Art at cozytextureart.com. By placing an order, you agree to them.',
    sections: [
      { h: 'Who we are', p: ['Cozy Texture Art is run by Priyanka Meena, who makes every piece by hand. You can reach the studio at cozytextureart@gmail.com.'] },
      { h: 'The paintings', list: [
        'Every piece is an original, made once and never reproduced.',
        'Pieces are made by hand from texture paste and acrylic colour, so knife marks, ridges and small variations are part of the work, not faults.',
        'Colours on screen can differ slightly from the painting, depending on your display and the light in the photo.',
        'Pieces are sold unframed.',
        'Sizes are given in centimetres, width × height, and may vary by a few millimetres.'
      ] },
      { h: 'Prices and payment', list: [
        'Prices are in Indian rupees and include packing and delivery anywhere in India.',
        'Orders from outside India pay extra shipping, quoted by email for the delivery address. Import duties and taxes in the buyer\'s country are paid by the buyer.',
        'A piece is yours once payment is received in full. Until then, it may be sold to someone else.',
        'Prices may change at any time, but the price you paid is the price you pay.',
        'Payments are handled by a secure payment provider. Card and bank details go to the provider and are never seen or stored by the studio.'
      ] },
      { h: 'Custom orders', list: [
        'A custom piece is made to order in your choice of colours, design or size. The price is confirmed by email before you pay anything, and a quote is valid for 7 days.',
        'A 50% deposit books the piece. The deposit is non-refundable once work starts. The balance is paid before dispatch.',
        'One colour and layout mock-up and one round of changes are included.',
        'Custom pieces take about 2–3 weeks, because each layer of texture paste has to dry fully. You get photos and a short video to approve before it ships.',
        'Custom pieces cannot be returned.'
      ] },
      { h: 'Copyright', p: ['All paintings, photos and text on this site belong to Cozy Texture Art. Buying a painting gives you the painting itself, not the right to copy, print or sell images of it.'] },
      { h: 'Changes and contact', p: ['These terms may be updated from time to time; the date at the top shows the latest version. They are governed by the laws of India. For any question, write to cozytextureart@gmail.com.'] }
    ]
  },
  {
    slug: 'privacy', name: 'Privacy Policy', title: 'Privacy Policy',
    intro: 'This page explains what information cozytextureart.com collects, why, and what you can ask the studio to do with it.',
    sections: [
      { h: 'What is collected', list: [
        'When you send an enquiry: your name, email address and message, plus the painting you asked about.',
        'When you buy: your name, phone number, email and delivery address, and the payment status. Card, UPI and bank details are handled by the payment provider and are never seen or stored by the studio.',
        'When you browse: basic visit information from the hosting service, and the pages and paintings you view, through the Meta Pixel (see below).'
      ] },
      { h: 'How it is used', list: [
        'To reply to your enquiry and send quotes.',
        'To pack, ship and support your order.',
        'To understand which paintings people look at and to show relevant ads on Instagram and Facebook.'
      ], p: ['Your information is never sold.'] },
      { h: 'Services that help run the site', list: [
        'Vercel hosts the website.',
        'FormSubmit and Web3Forms deliver enquiry messages to the studio\'s email.',
        'Meta (Facebook and Instagram) receives visit information through the Meta Pixel, which uses cookies. You can limit ad tracking in your Facebook or Instagram ad settings, or block cookies in your browser.',
        'A payment provider processes payments, under its own privacy policy.',
        'Courier partners receive your name, phone and address to deliver your order.'
      ] },
      { h: 'Your choices', p: ['You can ask to see, correct or delete the information the studio holds about you by writing to cozytextureart@gmail.com. Order records may be kept as long as the law requires.'] }
    ]
  },
  {
    slug: 'refunds', name: 'Refund & Cancellation', title: 'Refund & Cancellation Policy',
    intro: 'Each piece is one of one and packed with care. Here is what happens if something needs to change or goes wrong.',
    sections: [
      { h: 'Cancelling an order', list: [
        'Ready-made paintings: you can cancel any time before the piece is dispatched, for a full refund.',
        'Custom pieces: the 50% deposit is non-refundable once work has started. If you cancel before work starts, the deposit is refunded in full.'
      ] },
      { h: 'Returns', list: [
        'Ready-made paintings are not returnable for a change of mind, since each piece is one of one.', // CONFIRM
        'Custom pieces cannot be returned.'
      ] },
      { h: 'Damaged in transit', p: ['If your painting arrives damaged, email cozytextureart@gmail.com within 48 hours of delivery with photos of the piece and the packaging (an unboxing video helps). The studio will offer a repair, a replacement of similar value or a full refund, whichever suits you.'] }, // CONFIRM
      { h: 'How refunds are paid', p: ['Approved refunds go back to the original payment method within 5–7 working days. Your bank may take a few more days to show it.'] } // CONFIRM
    ]
  },
  {
    slug: 'shipping', name: 'Shipping Policy', title: 'Shipping Policy',
    intro: 'Every painting is wrapped and packed by hand before it leaves the studio.',
    sections: [
      { h: 'Within India', list: [
        'Packing and delivery anywhere in India are included in every price.',
        'Ready-made paintings are dispatched within 5–7 days of payment.',
        'Custom pieces ship once you have approved the photos and video of the finished piece and paid the balance.',
        'Tracking details are sent by email or message once the piece is dispatched. Delivery time after dispatch depends on your location and the courier.'
      ] },
      { h: 'Outside India', list: [
        'Shipping abroad is not included in the price. It is quoted by email for your address before you pay.',
        'Import duties and taxes in your country are paid by the buyer.'
      ] },
      { h: 'Delivery problems', p: ['If your parcel is delayed or arrives damaged, write to cozytextureart@gmail.com. For damage, see the Refund & Cancellation Policy.'] }
    ]
  },
  {
    slug: 'contact', name: 'Contact', title: 'Contact',
    intro: 'Questions about a painting, an order or a custom piece? Every message gets a personal reply, usually within a day.',
    sections: [
      { h: 'Email', p: ['cozytextureart@gmail.com'] },
      { h: 'Instagram', p: ['@cozytextureart · instagram.com/cozytextureart'] },
      { h: 'About a painting', p: ['Each painting page has an enquiry form. Use it to ask about the piece, buy it, or ask for it in a custom size.'] },
      { h: 'Studio', p: ['Cozy Texture Art, run by Priyanka Meena. India.'] } // CONFIRM: Razorpay may ask for a full business address and phone here
    ]
  }
];
