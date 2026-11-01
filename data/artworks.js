// Cozy Texture Art — catalogue data. The site renders everything from this file.
// Add a piece: run tools/add_art.py for its images, then add an entry to ARTWORKS (see TEMPLATE below).

// Tag vocabulary. Every tag on a piece must be listed here; the label is what visitors see.
window.TAGS = {
  // subject
  florals: 'Florals',
  botanical: 'Botanical',
  landscape: 'Landscape',
  seascape: 'Seascape',
  celestial: 'Celestial',
  abstract: 'Abstract',
  geometric: 'Geometric',
  arches: 'Arches',
  // colour story
  earthy: 'Earthy tones',
  'pop-pastels': 'Pop pastels',
  neutrals: 'Neutrals',
  // mood
  calm: 'Calm',
  joyful: 'Joyful',
  spiritual: 'Spiritual',
  minimal: 'Minimal'
};

// Art rooms are collections of tags: a piece appears in every room that shares at least one of its tags.
// Rooms with no pieces are hidden. `cover` (optional) is the slug of the piece whose photo fronts the room.
window.ART_ROOMS = [
  { slug: 'bloom-room', name: 'The Bloom Room', sub: 'Florals, petals and peonies',
    text: 'Flowers built petal by petal, each one sculpted in texture paste and lifted off the canvas with the tip of the knife.',
    tags: ['florals', 'botanical'] },
  { slug: 'clay-room', name: 'The Clay Room', sub: 'Earthy tones: oat, sand and terracotta',
    text: 'Colours of unfired clay and old lime walls. Grounding pieces for warm wood and linen homes.',
    tags: ['earthy', 'neutrals'] },
  { slug: 'signature-pop', name: 'Signature Pop Colours', sub: 'The brightest pastels',
    text: 'Bubblegum, aqua, lemon and lilac. The cozy signature palette, made for rooms that want a little joy.',
    tags: ['pop-pastels'] },
  { slug: 'the-grove', name: 'The Grove', sub: 'Fields, tides and gardens',
    text: 'Landscapes you can run a hand across: ridged sand, long grass, slow afternoons outdoors.',
    tags: ['landscape', 'seascape'] }
];

// Palette families for the collection filter.
window.FAMILIES = {
  warm: { label: 'Blush & butter', dots: ['#EFC6C6', '#F3E3B0', '#F2CDB0'] },
  green: { label: 'Sage & pistachio', dots: ['#C9D8C1', '#D9E4BF', '#CFE6DA'] },
  cool: { label: 'Powder & lilac', dots: ['#C6D8E8', '#D8CDE9', '#C8BEDF'] },
  neutral: { label: 'Oat & clay', dots: ['#EDE3D2', '#E4C7B1', '#D7CBBB'] }
};

window.SUITS = ['Living room', 'Bedroom', 'Entryway', 'Dining', 'Kitchen', 'Kids room', 'Study'];

/* TEMPLATE — copy, fill in, and add to ARTWORKS. Keep fields in this order.
{
  slug: 'lilac-doorway',                 // URL: /art/lilac-doorway (lower-case, hyphens)
  title: 'Lilac Doorway',                // 2–3 words: place, time or feeling + material/colour. Series use "No."
  year: 2026,
  concept: '',                           // 2–3 lines on what the piece is and how it was made (shown in the exhibit and on the piece page)
  holds: '',                             // "What it holds": one brief note on what it represents
  size: { w: 60, h: 90 },                // cm, width × height. Round works: { d: 70 }
  depth: '',                             // optional, e.g. '3 cm' (canvas depth)
  medium: 'Acrylic colour mixed into texture paste, on canvas',
  shape: 'portrait',                     // portrait | square | round | arch | landscape
  family: 'cool',                        // warm | green | cool | neutral
  palette: [ { name: 'lilac', hex: '#C8BEDF' } ],   // 3–4 pigments from the photo; one lower-case word each
  tags: ['arches', 'calm'],              // from TAGS; these decide which art rooms it joins
  suits: ['Bedroom', 'Entryway'],        // from SUITS
  status: 'available',                   // available | sold | reserved
  featured: false,                       // true = shown in the home page's featured row
  images: {
    front: { src: '/images/art/lilac-doorway/front.webp', w: 1200, h: 1600, alt: '' },
    room:  { src: '/images/art/lilac-doorway/room.webp',  w: 1600, h: 1200, alt: '' }
  }
}
*/
window.ARTWORKS = [
  // ── Signature Pop Colours ──
  {
    slug: 'sherbet-rows',
    title: 'Sherbet Rows',
    year: 2026,
    concept: 'Eighty-one dabs of texture paste, each pressed down and pulled with the palette knife in a single stroke, so every one ends in a soft, rounded lip. Nine rows in three bands, bubblegum, lemon and aqua, laid over a faint pencil grid that still shows between them.',
    holds: 'A sweet-shop counter on a summer holiday, every row a different flavour. It is about the quiet joy of doing one small, satisfying thing again and again until it adds up to something bright.',
    size: { w: 30, h: 40 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'bubblegum', hex: '#D594B4' },
      { name: 'blush', hex: '#E0C2D3' },
      { name: 'lemon', hex: '#ECEB76' },
      { name: 'aqua', hex: '#9BD0C7' }
    ],
    tags: ['pop-pastels', 'joyful', 'abstract', 'geometric'],
    suits: ['Living room', 'Kids room', 'Bedroom'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/sherbet-rows/front.webp', w: 1200, h: 1600, alt: 'Sherbet Rows: nine rows of rounded texture-paste dabs in bubblegum pink, lemon and aqua on white canvas' },
      room:  { src: '/images/art/sherbet-rows/room.webp',  w: 1600, h: 1200, alt: 'Sherbet Rows on a plum wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'lilac-dahlia-no-1',
    title: 'Lilac Dahlia No. 1',
    year: 2026,
    concept: 'One full bloom built from the outside in: a ring of orchid petals, then rings that soften to lilac and finally white, each petal pressed down with the rounded tip of the knife so it overlaps the one before. A cluster of raised orchid dots sits at the centre.',
    holds: 'The way a flower opens, slowly and then all at once. It is a reminder that softness can hold a quiet kind of strength.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'orchid', hex: '#CF8ED2' },
      { name: 'lilac', hex: '#E7D5E9' },
      { name: 'milk', hex: '#F3EFF2' },
      { name: 'plum', hex: '#A9679F' }
    ],
    tags: ['florals', 'pop-pastels', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lilac-dahlia-no-1/front.webp', w: 1600, h: 1600, alt: 'Lilac Dahlia No. 1: a round bloom of overlapping texture-paste petals fading from orchid at the edge to white at the centre' },
      room:  { src: '/images/art/lilac-dahlia-no-1/room.webp',  w: 1600, h: 1200, alt: 'Lilac Dahlia No. 1 on a navy wall above a light oak sideboard' }
    }
  },
  {
    slug: 'matcha-tide',
    title: 'Matcha Tide',
    year: 2026,
    concept: 'Two broad waves of matcha green, combed into fine parallel ridges that catch the light, drift across the canvas between lanes of rough cream paste. Two forest-green quarter circles anchor opposite corners, their ridges curving like the rings of a tree.',
    holds: 'A slow river through a green valley, the kind of view that lowers your shoulders. It is about letting life flow around the things that keep you grounded.',
    size: { w: 23, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'matcha', hex: '#AEC4AF' },
      { name: 'mint', hex: '#C9DCC6' },
      { name: 'cream', hex: '#EEE9E1' },
      { name: 'forest', hex: '#1F4A1C' }
    ],
    tags: ['pop-pastels', 'abstract', 'landscape', 'calm'],
    suits: ['Living room', 'Study', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/matcha-tide/front.webp', w: 1227, h: 1600, alt: 'Matcha Tide: combed matcha-green waves between cream paste, with forest-green quarter circles in two corners' },
      room:  { src: '/images/art/matcha-tide/room.webp',  w: 1600, h: 1200, alt: 'Matcha Tide on a terracotta wall above a light oak sideboard' }
    }
  },
  {
    slug: 'strawberry-swatches',
    title: 'Strawberry Swatches',
    year: 2026,
    concept: 'Twelve bars of texture paste in two columns on a mint ground, stepping from milk white through blush to deep raspberry. Each pair carries a different knife texture, from soft waves to crumpled peaks, so the colour and the surface change together.',
    holds: 'A swatch card for a strawberry-milk day, every shade of pink side by side. It celebrates the small differences that make each day its own.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'mint', hex: '#BFD0C3' },
      { name: 'blush', hex: '#F1C6E3' },
      { name: 'strawberry', hex: '#E299BB' },
      { name: 'raspberry', hex: '#AE5B85' }
    ],
    tags: ['pop-pastels', 'geometric', 'joyful'],
    suits: ['Bedroom', 'Kids room', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/strawberry-swatches/front.webp', w: 1600, h: 1600, alt: 'Strawberry Swatches: twelve textured bars stepping from white to deep pink on a mint background' },
      room:  { src: '/images/art/strawberry-swatches/room.webp',  w: 1600, h: 1200, alt: 'Strawberry Swatches on a deep green wall above a walnut sideboard' }
    }
  },
  {
    slug: 'marigold-scales',
    title: 'Marigold Scales',
    year: 2026,
    concept: 'Overlapping fans of scallops rise like hills, each scallop pressed with the knife so the paste lifts into a raised rim. Pale butter at the top deepens into marigold, then soft celery and a deep pine green in the bottom corner.',
    holds: 'Late-afternoon sun over terraced fields, warm gold giving way to cool green. It is about the comfort of things that build up, layer upon layer, over time.',
    size: { w: 20, h: 25 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'butter', hex: '#F1E3A6' },
      { name: 'marigold', hex: '#C9973F' },
      { name: 'celery', hex: '#D3E2C4' },
      { name: 'pine', hex: '#2F5A33' }
    ],
    tags: ['pop-pastels', 'geometric', 'earthy'],
    suits: ['Living room', 'Dining', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/marigold-scales/front.webp', w: 1280, h: 1600, alt: 'Marigold Scales: fans of raised scallop outlines in butter, marigold, celery and pine green' },
      room:  { src: '/images/art/marigold-scales/room.webp',  w: 1600, h: 1200, alt: 'Marigold Scales on a plum wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'sorbet-shells',
    title: 'Sorbet Shells',
    year: 2026,
    concept: 'Rows of small shells run diagonally across the canvas in lemon, peach, sage and lilac. Each shell is pressed in with the knife and fanned with fine ribs, then left glossy so the light runs along every ridge.',
    holds: 'A beach walk with pockets full of shells, sorted by colour. It holds the simple happiness of collecting small, beautiful things.',
    size: { w: 23, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'lemon', hex: '#E9E58F' },
      { name: 'peach', hex: '#E3B79E' },
      { name: 'sage', hex: '#B9CDBF' },
      { name: 'lilac', hex: '#BDB3E4' }
    ],
    tags: ['pop-pastels', 'seascape', 'geometric', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/sorbet-shells/front.webp', w: 1227, h: 1600, alt: 'Sorbet Shells: diagonal rows of ribbed shell shapes in lemon, peach, sage and lilac' },
      room:  { src: '/images/art/sorbet-shells/room.webp',  w: 1600, h: 1200, alt: 'Sorbet Shells on a lilac wall above a light oak sideboard' }
    }
  },
  {
    slug: 'lilac-dahlia-no-2',
    title: 'Lilac Dahlia No. 2',
    year: 2026,
    concept: 'Two half-blooms reach in from opposite corners, leaving a quiet band of white canvas between them. Petals step from orchid at the edge to lilac and almost white near the centre, each pressed so its rim stands just above the last.',
    holds: 'Two people leaning towards each other across a room. It is about the space in between that still connects them.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'orchid', hex: '#C88CC6' },
      { name: 'lilac', hex: '#DABDDE' },
      { name: 'milk', hex: '#F1EEF1' }
    ],
    tags: ['florals', 'pop-pastels', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lilac-dahlia-no-2/front.webp', w: 1600, h: 1600, alt: 'Lilac Dahlia No. 2: two half-blooms of layered petals reaching in from opposite corners' },
      room:  { src: '/images/art/lilac-dahlia-no-2/room.webp',  w: 1600, h: 1200, alt: 'Lilac Dahlia No. 2 on a navy wall above a light oak sideboard' }
    }
  },
  {
    slug: 'guava-blossoms',
    title: 'Guava Blossoms',
    year: 2026,
    concept: 'A hot pink ground washed through to coral, with a paler painted panel at its centre. A drift of knife-pressed blossoms runs corner to corner: white petals edged in coral, and a few bright orange flowers that glow against the pink.',
    holds: 'The bright, giddy end of a summer evening, when everything is turned up a little loud and that is the fun of it.',
    size: { w: 15, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'guava', hex: '#FC6292' },
      { name: 'coral', hex: '#FC7C7C' },
      { name: 'blush', hex: '#FBC6C5' },
      { name: 'petal', hex: '#FEE7EC' }
    ],
    tags: ['florals', 'pop-pastels', 'joyful'],
    suits: ['Kids room', 'Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/guava-blossoms/front.webp', w: 1200, h: 1600, alt: 'Guava Blossoms: white and orange textured blossoms drifting across a hot pink to coral ground' },
      room:  { src: '/images/art/guava-blossoms/room.webp',  w: 1600, h: 1200, alt: 'Guava Blossoms on a peach wall above a powder-blue sideboard' }
    }
  },
  {
    slug: 'candy-whirl',
    title: 'Candy Whirl',
    year: 2026,
    concept: 'Thick strokes of paste in pink, lemon, mint, white and coral, laid down with the edge of the knife in loose rings that tighten towards the centre, over a square of sky blue on white canvas. Flecks of the blue show through between the rings.',
    holds: 'A day spinning in the best way, too many good things happening at once.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'bubblegum', hex: '#F3A4B4' },
      { name: 'lemon', hex: '#FCF07B' },
      { name: 'mint', hex: '#ACD9D7' },
      { name: 'milk', hex: '#F8F8F8' }
    ],
    tags: ['abstract', 'pop-pastels', 'joyful'],
    suits: ['Living room', 'Kids room', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/candy-whirl/front.webp', w: 1600, h: 1600, alt: 'Candy Whirl: a spiral of thick pink, lemon, mint and white knife strokes over sky blue' },
      room:  { src: '/images/art/candy-whirl/room.webp',  w: 1600, h: 1200, alt: 'Candy Whirl on a terracotta wall above a light oak sideboard' }
    }
  },
  {
    slug: 'bubblegum-dahlia',
    title: 'Bubblegum Dahlia',
    year: 2026,
    concept: 'One broad dahlia in bubblegum pink, each wide petal spread flat with the knife and edged where it meets the next. A white inner ring holds a small lemon flower at the centre, and a border of raised lemon dots frames the white canvas.',
    holds: 'A single flower given all the room it needs; a small celebration to keep on the wall.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'bubblegum', hex: '#E2A5D2' },
      { name: 'blush', hex: '#F5C9EB' },
      { name: 'milk', hex: '#FEFDFE' },
      { name: 'lemon', hex: '#FBFAA1' }
    ],
    tags: ['florals', 'pop-pastels', 'joyful'],
    suits: ['Bedroom', 'Kids room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/bubblegum-dahlia/front.webp', w: 1600, h: 1600, alt: 'Bubblegum Dahlia: one large pink textured dahlia with a lemon centre inside a border of lemon dots' },
      room:  { src: '/images/art/bubblegum-dahlia/room.webp',  w: 1600, h: 1200, alt: 'Bubblegum Dahlia on a sage-green wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'lemonade-checks',
    title: 'Lemonade Checks',
    year: 2026,
    concept: 'A four-by-four grid of aqua and lemon squares on white canvas, each holding one piped flower with a dotted centre: butter flowers on the aqua, sage flowers on the lemon. Small white dots of paste mark where the corners meet.',
    holds: 'The cheer of a tiled kitchen in summer, orderly and bright at the same time.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'green',
    palette: [
      { name: 'aqua', hex: '#86C8C9' },
      { name: 'lemon', hex: '#F8EA6A' },
      { name: 'sage', hex: '#C1D0B1' },
      { name: 'butter', hex: '#FBF9B1' }
    ],
    tags: ['florals', 'geometric', 'pop-pastels', 'joyful'],
    suits: ['Kitchen', 'Kids room', 'Dining'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lemonade-checks/front.webp', w: 1600, h: 1600, alt: 'Lemonade Checks: sixteen piped flowers on an aqua and lemon checkerboard' },
      room:  { src: '/images/art/lemonade-checks/room.webp',  w: 1600, h: 1200, alt: 'Lemonade Checks on a cream wall above a light oak sideboard' }
    }
  },
  {
    slug: 'iris-scales',
    title: 'Iris Scales',
    year: 2026,
    concept: 'Rows of rounded scales pressed with the curve of the knife, each one lifting at its edge, shaded row by row from white at the top to deep violet at the base. A lilac ground shows as a border on all four sides.',
    holds: 'Dusk arriving slowly, one shade at a time, until the evening settles in.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'milk', hex: '#EDEFFC' },
      { name: 'lavender', hex: '#C8C7DE' },
      { name: 'lilac', hex: '#ABA6BD' },
      { name: 'iris', hex: '#9591AD' }
    ],
    tags: ['abstract', 'geometric', 'pop-pastels', 'calm'],
    suits: ['Bedroom', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/iris-scales/front.webp', w: 1600, h: 1600, alt: 'Iris Scales: rows of raised scallops shading from white to deep violet on a lilac ground' },
      room:  { src: '/images/art/iris-scales/room.webp',  w: 1600, h: 1200, alt: 'Iris Scales on a peach wall above a powder-blue sideboard' }
    }
  },
  {
    slug: 'melon-checks',
    title: 'Melon Checks',
    year: 2026,
    concept: 'A five-by-five grid of melon and mint squares, every square holding one piped flower in white, blush, lilac or peach with a dotted centre. Tiny raised dots of paste are scattered across the joins.',
    holds: 'A patchwork quilt of small happy things, each square its own little garden.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'melon', hex: '#B87B73' },
      { name: 'mint', hex: '#6A9B93' },
      { name: 'blush', hex: '#CAB5B5' },
      { name: 'milk', hex: '#EDE9EC' }
    ],
    tags: ['florals', 'geometric', 'pop-pastels', 'joyful'],
    suits: ['Kids room', 'Bedroom', 'Dining'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/melon-checks/front.webp', w: 1600, h: 1600, alt: 'Melon Checks: twenty-five piped pastel flowers on a melon and mint checkerboard' },
      room:  { src: '/images/art/melon-checks/room.webp',  w: 1600, h: 1200, alt: 'Melon Checks on a terracotta wall above a light oak sideboard' }
    }
  },
  {
    slug: 'dawn-garden',
    title: 'Dawn Garden',
    year: 2026,
    concept: 'A ground that fades from lilac at the top through pink to warm lemon at the base, filled edge to edge with flowers: large blush blooms drawn in fine white lines of paste, lilac and cream petals knifed flat, and dozens of tiny dotted flowers in between.',
    holds: 'The first light of the morning, when the sky is every soft colour at once.',
    size: { w: 15, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'rose', hex: '#C19295' },
      { name: 'lilac', hex: '#A48CA3' },
      { name: 'apricot', hex: '#CFB59F' },
      { name: 'cream', hex: '#EEE2E1' }
    ],
    tags: ['florals', 'pop-pastels', 'joyful'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/dawn-garden/front.webp', w: 1200, h: 1600, alt: 'Dawn Garden: outlined blush flowers and cream petals over a lilac to pink to lemon ground' },
      room:  { src: '/images/art/dawn-garden/room.webp',  w: 1600, h: 1200, alt: 'Dawn Garden on a navy wall above a light oak sideboard' }
    }
  },
  {
    slug: 'sunset-scales',
    title: 'Sunset Scales',
    year: 2026,
    concept: 'Hundreds of rounded scales, each pressed and lifted with the knife, run in rows from blush and coral through red, orange and yellow down to sea green and teal at the base. The colours swirl into one another like a sky turning over the water.',
    holds: 'The few minutes when the sun goes down over the sea and every colour shows up at once.',
    size: { w: 40, h: 50 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'papaya', hex: '#EF8B6D' },
      { name: 'tangerine', hex: '#FA8E3B' },
      { name: 'coral', hex: '#E76156' },
      { name: 'teal', hex: '#41656D' }
    ],
    tags: ['pop-pastels', 'abstract', 'seascape', 'joyful'],
    suits: ['Living room', 'Dining', 'Entryway'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/sunset-scales/front.webp', w: 1272, h: 1600, alt: 'Sunset Scales: rows of raised knife-pressed scales shading from coral, red and orange to sea green and teal' },
      room:  { src: '/images/art/sunset-scales/room.webp',  w: 1600, h: 1200, alt: 'Sunset Scales on a navy wall above a light oak sideboard' }
    }
  },
  // ── The Bloom Room ──
  {
    slug: 'butter-daisies',
    title: 'Butter Daisies',
    year: 2026,
    concept: 'Butter-yellow daisies scattered across a sage ground, each petal pulled out from the centre with the knife so it lifts at the tip. Teal leaves are pressed in between, and every centre is dotted with plum.',
    holds: 'A breakfast table on a bright morning. It holds the easy, everyday cheer of flowers that ask for nothing.',
    size: { w: 30, h: 23 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'landscape',
    family: 'cool',
    palette: [
      { name: 'sage', hex: '#ADC7AA' },
      { name: 'butter', hex: '#EFD7A4' },
      { name: 'teal', hex: '#6FB5A8' },
      { name: 'plum', hex: '#9C7A93' }
    ],
    tags: ['florals', 'joyful'],
    suits: ['Dining', 'Living room', 'Kitchen'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/butter-daisies/front.webp', w: 1600, h: 1227, alt: 'Butter Daisies: yellow textured daisies with plum centres and teal leaves on a sage ground' },
      room:  { src: '/images/art/butter-daisies/room.webp',  w: 1600, h: 1200, alt: 'Butter Daisies on a deep green wall above a walnut sideboard' }
    }
  },
  {
    slug: 'mint-stripe-posy',
    title: 'Mint Stripe Posy',
    year: 2026,
    concept: 'A loose bouquet of raspberry, blush, white and lavender blooms rises from a white vase combed into fine vertical ridges. Behind it, wide mint and milk stripes give the posy a cheerful, café-awning backdrop.',
    holds: 'Flowers brought home on an ordinary day, just because. It is about the small gestures that make a house feel loved.',
    size: { w: 25, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'mint', hex: '#8AC9BC' },
      { name: 'milk', hex: '#F2F0EC' },
      { name: 'raspberry', hex: '#C2577F' },
      { name: 'lavender', hex: '#9B86C8' }
    ],
    tags: ['florals', 'botanical', 'joyful'],
    suits: ['Living room', 'Entryway', 'Dining'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/mint-stripe-posy/front.webp', w: 1333, h: 1600, alt: 'Mint Stripe Posy: a textured bouquet in a ribbed white vase against mint and white stripes' },
      room:  { src: '/images/art/mint-stripe-posy/room.webp',  w: 1600, h: 1200, alt: 'Mint Stripe Posy on a terracotta wall above a light oak sideboard' }
    }
  },
  {
    slug: 'honey-blooms',
    title: 'Honey Blooms',
    year: 2026,
    concept: 'Large cornflower daisies and bubblegum blossoms crowd a warm honey ground, with berry buds and tiny pale forget-me-nots tucked into every gap. Each petal is a single press of the knife, so the whole surface ripples.',
    holds: 'A garden in full summer, too busy to keep tidy. It celebrates abundance, and the joy of not leaving any space empty.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'honey', hex: '#F1C15B' },
      { name: 'cornflower', hex: '#AFC3E6' },
      { name: 'bubblegum', hex: '#EBA3C6' },
      { name: 'berry', hex: '#A9446F' }
    ],
    tags: ['florals', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Kids room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/honey-blooms/front.webp', w: 1600, h: 1600, alt: 'Honey Blooms: cornflower-blue daisies and pink blossoms packed onto a honey-yellow ground' },
      room:  { src: '/images/art/honey-blooms/room.webp',  w: 1600, h: 1200, alt: 'Honey Blooms on a sage-green wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'forget-me-nots',
    title: 'Forget-Me-Nots',
    year: 2026,
    concept: 'Three heavy white blossoms and a drift of cornflower forget-me-nots, each dotted with gold, sit on a blush square inside a frame of rough oyster-grey paste. Mint leaves trail out past the edge of the square.',
    holds: 'A keepsake for someone you hold close. It is about remembering gently, and carrying people with you.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'oyster', hex: '#D9D7D2' },
      { name: 'blush', hex: '#D9B8A6' },
      { name: 'cornflower', hex: '#6F9AD6' },
      { name: 'mint', hex: '#BFE3D8' }
    ],
    tags: ['florals', 'calm'],
    suits: ['Bedroom', 'Living room', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/forget-me-nots/front.webp', w: 1600, h: 1600, alt: 'Forget-Me-Nots: white blossoms and blue forget-me-nots on a blush square framed by textured grey paste' },
      room:  { src: '/images/art/forget-me-nots/room.webp',  w: 1600, h: 1200, alt: 'Forget-Me-Nots on a navy wall above a light oak sideboard' }
    }
  },
  {
    slug: 'raspberry-lilies',
    title: 'Raspberry Lilies',
    year: 2026,
    concept: 'Star-shaped lilies in raspberry and blush open across a teal ground, their centres crowded with raised white and lemon dots. Small pink blossoms and lime and mint leaves fill the space between them.',
    holds: 'A warm evening when the garden smells strongest. It holds the confidence of flowers that open wide.',
    size: { w: 20, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'landscape',
    family: 'cool',
    palette: [
      { name: 'teal', hex: '#66AFC7' },
      { name: 'raspberry', hex: '#883D65' },
      { name: 'blush', hex: '#E192AC' },
      { name: 'lime', hex: '#D4E59A' }
    ],
    tags: ['florals', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Dining'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/raspberry-lilies/front.webp', w: 1600, h: 1200, tight: false, alt: 'Raspberry Lilies: raspberry and blush lilies with small pink blossoms and lime leaves on a teal ground' },
      room:  { src: '/images/art/raspberry-lilies/room.webp',  w: 1600, h: 1200, alt: 'Raspberry Lilies on a deep green wall above a walnut sideboard' }
    }
  },
  {
    slug: 'blossom-checks',
    title: 'Blossom Checks',
    year: 2026,
    concept: 'Sixteen blooms sit one to a square on a lemon and rose checkerboard, each pressed petal by petal with a raised dotted centre. The flowers move through violet, lilac and blush, so no two neighbours match.',
    holds: 'A quilt of small, happy things, one for each day of the week and then some. It is about order that still feels playful.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'lemon', hex: '#E2E58A' },
      { name: 'rose', hex: '#D6A1C6' },
      { name: 'lilac', hex: '#B3A8E3' },
      { name: 'violet', hex: '#6457B5' }
    ],
    tags: ['florals', 'geometric', 'joyful'],
    suits: ['Kids room', 'Bedroom', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/blossom-checks/front.webp', w: 1600, h: 1600, alt: 'Blossom Checks: sixteen textured flowers in violet, lilac and blush on a lemon and pink checkerboard' },
      room:  { src: '/images/art/blossom-checks/room.webp',  w: 1600, h: 1200, alt: 'Blossom Checks on a deep green wall above a walnut sideboard' }
    }
  },
  {
    slug: 'lemon-and-lilac',
    title: 'Lemon and Lilac',
    year: 2026,
    concept: 'Four broad blossoms, two lemon and two lilac, fill an oat-pink ground, each outlined with a raised rim and veined with fine white lines drawn into the wet paste. Pale sage leaves sit flat between them.',
    holds: 'Two soft colours sharing one space without competing. It is about balance, and letting gentle things take up room.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'lemon', hex: '#E8E39A' },
      { name: 'lilac', hex: '#C8BEE8' },
      { name: 'oat', hex: '#DCD3CC' },
      { name: 'sage', hex: '#BFD8C8' }
    ],
    tags: ['florals', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lemon-and-lilac/front.webp', w: 1600, h: 1600, alt: 'Lemon and Lilac: large textured lemon and lilac blossoms with white vein lines on a soft oat ground' },
      room:  { src: '/images/art/lemon-and-lilac/room.webp',  w: 1600, h: 1200, alt: 'Lemon and Lilac on a lilac wall above a light oak sideboard' }
    }
  },
  {
    slug: 'meadow-morning',
    title: 'Meadow Morning',
    year: 2026,
    concept: 'A painted sky drifts from blue into a lime-green field, and over it rise wildflowers on thin dark stems: cornflower stars, lilac bells and apricot lilies, each petal sculpted in paste so the flowers stand off the painted ground.',
    holds: 'The first warm walk of spring, when everything seems to bloom at once. It holds the feeling of fresh air and a long day ahead.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'green',
    palette: [
      { name: 'sky', hex: '#6FA7DA' },
      { name: 'lime', hex: '#C9E08E' },
      { name: 'apricot', hex: '#F2CC86' },
      { name: 'lilac', hex: '#D3C3E8' }
    ],
    tags: ['florals', 'landscape', 'joyful'],
    suits: ['Living room', 'Entryway', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/meadow-morning/front.webp', w: 1600, h: 1600, alt: 'Meadow Morning: textured wildflowers in blue, lilac and apricot on dark stems against a painted blue and green sky' },
      room:  { src: '/images/art/meadow-morning/room.webp',  w: 1600, h: 1200, alt: 'Meadow Morning on a plum wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'blossom-dusk',
    title: 'Blossom Dusk',
    year: 2026,
    concept: 'A single blossom branch reaches across a painted sky that turns from peach to lavender. Blush and lilac flowers, mint leaves and loose petals are each pressed in paste, and a few petals drift down towards the corner.',
    holds: 'The quiet hour when the light goes soft and the day lets go. It is about the beauty of things that are passing.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'peach', hex: '#EBC0A8' },
      { name: 'lavender', hex: '#B4ADD6' },
      { name: 'blush', hex: '#E5B5C8' },
      { name: 'mint', hex: '#8FD0B5' }
    ],
    tags: ['florals', 'botanical', 'calm'],
    suits: ['Bedroom', 'Living room', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/blossom-dusk/front.webp', w: 1600, h: 1600, alt: 'Blossom Dusk: a textured blossom branch with falling petals over a painted peach and lavender sky' },
      room:  { src: '/images/art/blossom-dusk/room.webp',  w: 1600, h: 1200, alt: 'Blossom Dusk on a navy wall above a light oak sideboard' }
    }
  },
  {
    slug: 'mauve-posy',
    title: 'Mauve Posy',
    year: 2026,
    concept: 'Two thick white daisies with orange centres, peach five-petal blossoms and lime flowers gather on a mauve ground, framed by long teal leaves. The white petals are built up highest, so they catch the light first.',
    holds: 'A small bunch picked on the way home, gathered without a plan. It holds the charm of things put together simply.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'mauve', hex: '#D8BDC4' },
      { name: 'milk', hex: '#F6F4F1' },
      { name: 'peach', hex: '#F3C1A8' },
      { name: 'teal', hex: '#4FA394' }
    ],
    tags: ['florals', 'calm'],
    suits: ['Bedroom', 'Living room', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/mauve-posy/front.webp', w: 1600, h: 1600, alt: 'Mauve Posy: white daisies, peach blossoms and lime flowers with teal leaves on a mauve ground' },
      room:  { src: '/images/art/mauve-posy/room.webp',  w: 1600, h: 1200, alt: 'Mauve Posy on a deep green wall above a walnut sideboard' }
    }
  },
  {
    slug: 'latte-hearts',
    title: 'Latte Hearts',
    year: 2026,
    concept: 'A latte and oat checkerboard where cream blossoms with cocoa-dotted centres alternate with soft, swirled hearts. Everything stays in one warm family of neutrals, so the texture does all the talking.',
    holds: 'Love and growth, side by side and taking turns. It is about the steady rhythm of a home that is cared for.',
    size: { w: 20, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'neutral',
    palette: [
      { name: 'latte', hex: '#C3A288' },
      { name: 'oat', hex: '#E3D3C2' },
      { name: 'cream', hex: '#F6F1EA' },
      { name: 'cocoa', hex: '#8C654D' }
    ],
    tags: ['florals', 'neutrals', 'geometric', 'minimal'],
    suits: ['Bedroom', 'Living room', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/latte-hearts/front.webp', w: 1600, h: 1600, alt: 'Latte Hearts: cream textured blossoms and hearts alternating on a latte and oat checkerboard' },
      room:  { src: '/images/art/latte-hearts/room.webp',  w: 1600, h: 1200, alt: 'Latte Hearts on a lilac wall above a light oak sideboard' }
    }
  },
  {
    slug: 'raspberry-and-lime',
    title: 'Raspberry and Lime',
    year: 2026,
    concept: 'Raspberry and bubblegum blossoms with pearl-dotted centres climb across a shimmering pearl ground, with sprays of lime leaves and loose petals in between. The petals are pressed thick and glossy, so they read almost like sugar work.',
    holds: 'A fruit-bowl brightness for a room that needs waking up. It is about choosing joy, loudly.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'raspberry', hex: '#BF4D75' },
      { name: 'bubblegum', hex: '#E28DAD' },
      { name: 'lime', hex: '#D8EFA0' },
      { name: 'pearl', hex: '#EEECEA' }
    ],
    tags: ['florals', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Kids room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/raspberry-and-lime/front.webp', w: 1600, h: 1600, alt: 'Raspberry and Lime: glossy raspberry and pink blossoms with lime leaves on a pearl ground' },
      room:  { src: '/images/art/raspberry-and-lime/room.webp',  w: 1600, h: 1200, alt: 'Raspberry and Lime on a plum wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'sage-lace',
    title: 'Sage Lace',
    year: 2026,
    concept: 'Blush-white flowers and leafy sprigs drawn in raised lines of texture paste on a soft sage ground, each petal filled with a thin pull of the knife so the outlines stand proud like lace. A dot of butter yellow sits at every centre.',
    holds: 'A quiet morning in a garden, when everything is still a little soft at the edges.',
    size: { w: 20, h: 25 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'sage', hex: '#B0BFAB' },
      { name: 'milk', hex: '#F3F4EF' },
      { name: 'pistachio', hex: '#D3D5CC' },
      { name: 'butter', hex: '#E5DD96' }
    ],
    tags: ['florals', 'botanical', 'calm', 'minimal'],
    suits: ['Bedroom', 'Living room', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/sage-lace/front.webp', w: 1280, h: 1600, alt: 'Sage Lace: blush-white flowers and leaves outlined in raised paste on a sage-green ground' },
      room:  { src: '/images/art/sage-lace/room.webp',  w: 1600, h: 1200, alt: 'Sage Lace on a terracotta wall above a light oak sideboard' }
    }
  },
  {
    slug: 'lilac-stripe-posy',
    title: 'Lilac Stripe Posy',
    year: 2026,
    concept: 'Wide stripes of lilac and cream painted as a ground, with a vase traced in fine white lines of paste. Above it, a loose bunch of knife-pressed pink stars, lemon tulips, powder-blue forget-me-nots and lilac buds on thin green stems.',
    holds: 'A jar of flowers on a windowsill, picked on the way home for no reason at all.',
    size: { w: 15, h: 20 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'cool',
    palette: [
      { name: 'lilac', hex: '#D2C5D3' },
      { name: 'cream', hex: '#F4F1E3' },
      { name: 'bubblegum', hex: '#FAB4D0' },
      { name: 'powder', hex: '#ABE2F5' }
    ],
    tags: ['florals', 'botanical', 'calm'],
    suits: ['Bedroom', 'Kitchen', 'Dining'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lilac-stripe-posy/front.webp', w: 1200, h: 1600, alt: 'Lilac Stripe Posy: a bouquet of pink, lemon and blue textured flowers in a white-lined vase on lilac and cream stripes' },
      room:  { src: '/images/art/lilac-stripe-posy/room.webp',  w: 1600, h: 1200, alt: 'Lilac Stripe Posy on a cream wall above a light oak sideboard' }
    }
  },
  {
    slug: 'butter-lilies',
    title: 'Butter Lilies',
    year: 2026,
    concept: 'Four large lilies, two in white and two in butter yellow, pulled petal by petal from the centre and scattered over a lilac ground. Small piped flowers in pink, sage and lemon fill the gaps between them with raised dots and loops.',
    holds: 'A busy, happy garden bed in spring, where nothing is planned and everything is blooming.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'lilac', hex: '#958FAF' },
      { name: 'butter', hex: '#EFEB97' },
      { name: 'milk', hex: '#EDEAED' },
      { name: 'orchid', hex: '#B07FA4' }
    ],
    tags: ['florals', 'joyful'],
    suits: ['Bedroom', 'Kids room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/butter-lilies/front.webp', w: 1600, h: 1600, alt: 'Butter Lilies: white and butter-yellow lilies among small piped flowers on a lilac ground' },
      room:  { src: '/images/art/butter-lilies/room.webp',  w: 1600, h: 1200, alt: 'Butter Lilies on a sage-green wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'rosewater-stars',
    title: 'Rosewater Stars',
    year: 2026,
    concept: 'Three star-shaped flowers in orchid pink, each petal pulled out to a point with the knife and ringed in white around a lemon centre, on a soft blush ground. Small piped flowers in lemon, sage and white are scattered around them.',
    holds: 'A wish made on a clear night, kept somewhere you will see it every day.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'warm',
    palette: [
      { name: 'blush', hex: '#CCA7AA' },
      { name: 'orchid', hex: '#EBB8D9' },
      { name: 'lemon', hex: '#F6EC9C' },
      { name: 'oat', hex: '#D7CFBD' }
    ],
    tags: ['florals', 'calm'],
    suits: ['Bedroom', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/rosewater-stars/front.webp', w: 1600, h: 1600, alt: 'Rosewater Stars: three orchid-pink star flowers and small pastel blooms on a blush ground' },
      room:  { src: '/images/art/rosewater-stars/room.webp',  w: 1600, h: 1200, alt: 'Rosewater Stars on a lilac wall above a light oak sideboard' }
    }
  },
  {
    slug: 'lilac-breeze',
    title: 'Lilac Breeze',
    year: 2026,
    concept: 'A painted ground that fades from soft pink at the top to lilac at the base, with a border of bare white canvas around it. Dozens of small petals in lemon, pink and lilac are pressed and dragged with the tip of the knife, all drifting the same way across the canvas.',
    holds: 'The hour when a warm breeze carries petals across the garden and nothing needs doing.',
    size: { w: 25, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'cool',
    palette: [
      { name: 'blossom', hex: '#E8BED6' },
      { name: 'lilac', hex: '#A289CF' },
      { name: 'lemon', hex: '#F4EB87' },
      { name: 'milk', hex: '#F8F4F5' }
    ],
    tags: ['florals', 'abstract', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/lilac-breeze/front.webp', w: 1329, h: 1600, alt: 'Lilac Breeze: lemon, pink and lilac petals of texture paste drifting across a pink to lilac ground' },
      room:  { src: '/images/art/lilac-breeze/room.webp',  w: 1600, h: 1200, alt: 'Lilac Breeze on a cream wall above a light oak sideboard' }
    }
  },
  // ── The Clay Room ──
  {
    slug: 'latte-brickwork',
    title: 'Latte Brickwork',
    year: 2026,
    concept: 'Thirty-nine small bricks of rough latte paste, laid in three neat columns on chalk-white canvas, each crossed by a diagonal stroke of mint. The surface of every brick is stippled, like old plaster.',
    holds: 'The patient work of building something, one small piece at a time. It holds the calm of routine and the pleasure of a wall well made.',
    size: { w: 25, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'neutral',
    palette: [
      { name: 'chalk', hex: '#F2F0EE' },
      { name: 'latte', hex: '#D9C2B2' },
      { name: 'mint', hex: '#9FD8BE' }
    ],
    tags: ['earthy', 'neutrals', 'geometric', 'minimal'],
    suits: ['Living room', 'Study', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/latte-brickwork/front.webp', w: 1333, h: 1600, alt: 'Latte Brickwork: rows of rough latte-coloured texture bricks with mint diagonal strokes on white canvas' },
      room:  { src: '/images/art/latte-brickwork/room.webp',  w: 1600, h: 1200, alt: 'Latte Brickwork on a navy wall above a light oak sideboard' }
    }
  },
  {
    slug: 'cobalt-shore',
    title: 'Cobalt Shore',
    year: 2026,
    concept: 'A beach seen from above: a wide band of gritty sand paste meets a sea of overlapping scallops that deepen from white foam through seafoam and sky to cobalt. Each scallop is a single pressed stroke, like a wave laid flat.',
    holds: 'The line where land gives way to water. It is about edges, and how beautiful the meeting of two things can be.',
    size: { w: 30, h: 23 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'landscape',
    family: 'cool',
    palette: [
      { name: 'sand', hex: '#E2C8B5' },
      { name: 'seafoam', hex: '#BBE3D9' },
      { name: 'sky', hex: '#8EC0EA' },
      { name: 'cobalt', hex: '#4C82D8' }
    ],
    tags: ['earthy', 'seascape', 'abstract'],
    suits: ['Living room', 'Bedroom', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/cobalt-shore/front.webp', w: 1600, h: 1227, alt: 'Cobalt Shore: sand-textured paste meeting overlapping scallops in white, seafoam and cobalt blue' },
      room:  { src: '/images/art/cobalt-shore/room.webp',  w: 1600, h: 1200, alt: 'Cobalt Shore on a deep green wall above a walnut sideboard' }
    }
  },
  // ── The Grove ──
  {
    slug: 'sunset-ridges',
    title: 'Sunset Ridges',
    year: 2026,
    concept: 'Six rolling bands, apricot and tangerine at the top down through coral and raspberry to orchid, each combed into fine wavy ridges. The bands overlap like hills seen at sunset, every ridge holding its own line of light.',
    holds: 'Layers of hills fading into an evening sky. It is about the warmth that stays after a long, good day.',
    size: { w: 23, h: 30 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'warm',
    palette: [
      { name: 'apricot', hex: '#FD9676' },
      { name: 'tangerine', hex: '#F2994E' },
      { name: 'coral', hex: '#EE5773' },
      { name: 'orchid', hex: '#D86FA8' }
    ],
    tags: ['landscape', 'abstract', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Dining'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/sunset-ridges/front.webp', w: 1227, h: 1600, alt: 'Sunset Ridges: wavy combed bands of apricot, tangerine, coral and orchid texture paste' },
      room:  { src: '/images/art/sunset-ridges/room.webp',  w: 1600, h: 1200, alt: 'Sunset Ridges on a sage-green wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'peach-wave',
    title: 'Peach Wave',
    year: 2026,
    concept: 'A cornflower wave curls up out of the frame, its crest whipped into white foam with the knife, in front of a painted panel that fades from cobalt night to peach. A small raised pink sun sits just above the break.',
    holds: 'The moment just before a wave lands, full of energy and a little daring. It holds the courage to ride what comes.',
    size: { w: 20, h: 25 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'cool',
    palette: [
      { name: 'cobalt', hex: '#2F4FC8' },
      { name: 'peach', hex: '#E6A97A' },
      { name: 'cornflower', hex: '#8DB7EA' },
      { name: 'foam', hex: '#E8F4F2' }
    ],
    tags: ['seascape', 'landscape', 'joyful'],
    suits: ['Living room', 'Bedroom', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/peach-wave/front.webp', w: 1280, h: 1600, alt: 'Peach Wave: a sculpted cornflower-blue wave with white foam over a painted cobalt-to-peach sky and a pink sun' },
      room:  { src: '/images/art/peach-wave/room.webp',  w: 1600, h: 1200, alt: 'Peach Wave on a peach wall above a powder-blue sideboard' }
    }
  },
  {
    slug: 'twilight-fern',
    title: 'Twilight Fern',
    year: 2026,
    concept: 'One long fern frond sweeps diagonally across a painted panel that runs from indigo night through lemon to lime. Its leaflets are pressed in paste and change colour along the stem, mint to lemon to lilac at the tip.',
    holds: 'Growth that keeps reaching, even as the light changes. It is about holding on to hope through the evening.',
    size: { w: 20, h: 25 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'indigo', hex: '#332C72' },
      { name: 'lemon', hex: '#E2DC6E' },
      { name: 'lime', hex: '#A0D396' },
      { name: 'lilac', hex: '#8F86D8' }
    ],
    tags: ['botanical', 'landscape', 'calm'],
    suits: ['Living room', 'Bedroom', 'Study'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/twilight-fern/front.webp', w: 1280, h: 1600, alt: 'Twilight Fern: a textured fern frond in mint, lemon and lilac across a painted indigo-to-lime sky' },
      room:  { src: '/images/art/twilight-fern/room.webp',  w: 1600, h: 1200, alt: 'Twilight Fern on a plum wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'cloud-rainbow',
    title: 'Cloud Rainbow',
    year: 2026,
    concept: 'A rainbow arcs across the canvas in raised bands of bubblegum, peach, lemon, mint, cornflower and lilac, each laid as a single smooth ridge. Two sculpted pink clouds anchor its ends on a soft mint ground.',
    holds: 'The bright bit after the rain. It holds the promise that the weather always turns.',
    size: { w: 20, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'landscape',
    family: 'warm',
    palette: [
      { name: 'mint', hex: '#B1CBC7' },
      { name: 'bubblegum', hex: '#F2A8C4' },
      { name: 'lemon', hex: '#F0DA6E' },
      { name: 'lilac', hex: '#A383D0' }
    ],
    tags: ['celestial', 'joyful', 'landscape'],
    suits: ['Kids room', 'Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/cloud-rainbow/front.webp', w: 1600, h: 1200, alt: 'Cloud Rainbow: a raised pastel rainbow ending in two sculpted pink clouds on a mint ground' },
      room:  { src: '/images/art/cloud-rainbow/room.webp',  w: 1600, h: 1200, alt: 'Cloud Rainbow on a cream wall above a light oak sideboard' }
    }
  },
  {
    slug: 'lavender-drift',
    title: 'Lavender Drift',
    year: 2026,
    concept: 'Loose sweeps of lavender and blush paste make a soft, cloudy sky, and through it drift lemon and rose petals, each laid with one quick pass of the knife so they tilt as if caught by the wind.',
    holds: 'Letting the day float past without holding on too tightly. It is about rest, and the lightness that comes after.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'lavender', hex: '#C4B0DC' },
      { name: 'blush', hex: '#E6C2D8' },
      { name: 'lemon', hex: '#E8E27A' },
      { name: 'rose', hex: '#D99AB0' }
    ],
    tags: ['landscape', 'abstract', 'calm'],
    suits: ['Bedroom', 'Living room'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lavender-drift/front.webp', w: 1600, h: 1600, alt: 'Lavender Drift: lemon and rose petal strokes drifting across a cloudy lavender and blush ground' },
      room:  { src: '/images/art/lavender-drift/room.webp',  w: 1600, h: 1200, alt: 'Lavender Drift on a sage-green wall above a pale ash sideboard' }
    }
  },
  {
    slug: 'rain-garden',
    title: 'Rain Garden',
    year: 2026,
    concept: 'Strokes of cornflower and mint fall like rain from the top of a painted teal ground, and gather at the bottom into a curved bowl of white, mint and green dabs, dotted with a few blush flowers.',
    holds: 'A garden after a long, soft rain, everything green and refreshed. It holds the comfort of being renewed.',
    size: { w: 20, h: 25 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'portrait',
    family: 'green',
    palette: [
      { name: 'cornflower', hex: '#5E8EDB' },
      { name: 'teal', hex: '#3F9E9C' },
      { name: 'mint', hex: '#9DC9C2' },
      { name: 'blush', hex: '#E9A7BE' }
    ],
    tags: ['landscape', 'botanical', 'calm'],
    suits: ['Living room', 'Bedroom', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/rain-garden/front.webp', w: 1280, h: 1600, alt: 'Rain Garden: falling cornflower strokes over teal, gathering into a bowl of white and green dabs with pink flowers' },
      room:  { src: '/images/art/rain-garden/room.webp',  w: 1600, h: 1200, alt: 'Rain Garden on a lilac wall above a light oak sideboard' }
    }
  },
  {
    slug: 'lilac-meadow',
    title: 'Lilac Meadow',
    year: 2026,
    concept: 'Tall stems and grass blades painted in deep green rise from a sage band into a lilac sky. Pink flowers pressed petal by petal with the tip of the knife, and sprigs of cream dots, sit at the tops of the stems.',
    holds: 'An evening walk through long grass, slow and unhurried, with nowhere particular to be.',
    size: { w: 15, h: 15 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, over a painted acrylic ground, on canvas',
    shape: 'square',
    family: 'cool',
    palette: [
      { name: 'lilac', hex: '#BEA0B4' },
      { name: 'sage', hex: '#9BA78F' },
      { name: 'orchid', hex: '#CDAAC2' },
      { name: 'moss', hex: '#363C22' }
    ],
    tags: ['florals', 'botanical', 'landscape', 'calm'],
    suits: ['Bedroom', 'Living room', 'Entryway'],
    status: 'available',
    featured: false,
    images: {
      front: { src: '/images/art/lilac-meadow/front.webp', w: 1600, h: 1600, alt: 'Lilac Meadow: pink textured flowers on tall green stems against a lilac sky and sage ground' },
      room:  { src: '/images/art/lilac-meadow/room.webp',  w: 1600, h: 1200, alt: 'Lilac Meadow on a cream wall above a light oak sideboard' }
    }
  },
  {
    slug: 'peach-shore',
    title: 'Peach Shore',
    year: 2026,
    concept: 'Wavy bands of peach and blue, from pale sky down to deep cobalt, each outlined in a raised line of paste. Inside the bands the paste is combed into fine upright ridges or pressed into rows of small dots with the tip of the knife.',
    holds: 'A long walk along the shore, where sand and water take turns with every wave.',
    size: { w: 40, h: 50 },
    depth: '',
    medium: 'Acrylic colour mixed into texture paste, on canvas',
    shape: 'portrait',
    family: 'cool',
    palette: [
      { name: 'peach', hex: '#E1C2A4' },
      { name: 'sand', hex: '#CEA885' },
      { name: 'sky', hex: '#889BB0' },
      { name: 'cobalt', hex: '#031F73' }
    ],
    tags: ['seascape', 'abstract', 'calm'],
    suits: ['Living room', 'Bedroom', 'Entryway'],
    status: 'available',
    featured: true,
    images: {
      front: { src: '/images/art/peach-shore/front.webp', w: 1272, h: 1600, alt: 'Peach Shore: wavy bands of peach and blue paste, combed into ridges and pressed into dots, deepening to cobalt' },
      room:  { src: '/images/art/peach-shore/room.webp',  w: 1600, h: 1200, alt: 'Peach Shore on a sage-green wall above a pale ash sideboard' }
    }
  }
];
