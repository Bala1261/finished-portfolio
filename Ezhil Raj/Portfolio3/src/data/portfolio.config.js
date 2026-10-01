// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO CONFIGURATION — Design & Creative Template 02
// One file controls everything. Change profileType to switch the entire
// presentation mode for your profession.
// ─────────────────────────────────────────────────────────────────────────────

// ── Profile type ─────────────────────────────────────────────────────────────
// Options: 'designer' | 'photographer' | 'videographer' | 'motionDesigner'
//          '3dArtist' | 'illustrator' | 'architect' | 'artist'
export const profile = {
  type: 'designer',
};

// ── Theme ─────────────────────────────────────────────────────────────────────
export const theme = {
  accent: '#C8FF00',  // Change this one value to retheme the entire site
};

// ── Hero configuration ────────────────────────────────────────────────────────
// type: 'image' | 'video' | '3d' | 'gradient'
export const hero = {
  type: '3d',
  // For image mode:
  // src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=90',
  // For video mode:
  // src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  // videoReel: '#',   // CTA link for filmmakers
  caption: 'Creative Director & Designer — New York',
};

// ── Personal information ──────────────────────────────────────────────────────
export const personal = {
  name: 'Alex Mercer',
  initials: 'AM',
  role: 'Creative Designer',
  tagline: 'Art Director',
  location: 'New York, USA',
  available: true,
  bio: `I create visual experiences\nthat people remember.`,
  about: [
    `Based in New York, I am a creative designer and art director with over a decade of experience shaping the visual identity of digital-first brands.`,
    `My work sits at the intersection of editorial design, motion, and technology — always in pursuit of that rare moment when form and function become indistinguishable.`,
    `Currently open to select freelance projects and creative collaborations.`,
  ],
  email: 'hello@alexmercer.design',
  socials: [
    { label: 'Instagram',  href: '#', icon: 'instagram' },
    { label: 'Dribbble',   href: '#', icon: 'dribbble'  },
    { label: 'Behance',    href: '#', icon: 'behance'   },
    { label: 'LinkedIn',   href: '#', icon: 'linkedin'  },
  ],
};

// ── Projects ──────────────────────────────────────────────────────────────────
// mediaType: 'image' | 'video'
// layout: 'landscape' | 'portrait' | 'square'   (controls grid sizing)
export const projects = [
  {
    id: 'brand-cosmos',
    number: '01',
    title: 'Cosmos',
    client: 'Cosmos Space Travel',
    category: 'Brand Experience',
    year: '2026',
    tags: ['Brand Identity', 'Motion', 'Web'],
    description: 'Full brand system for a luxury space-tourism company — from logomark to spatial installation.',
    role: 'Creative Director, Brand Designer',
    mediaType: 'image',
    layout: 'landscape',
    image: 'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?w=1200&q=85',
    featured: true,
    filterCategory: 'Branding',
    caseStudy: {
      statement: 'Designing the future of luxury travel — one constellation at a time.',
      challenge: 'Cosmos needed a brand identity that could live across physical, digital, and spatial mediums while feeling timeless and premium.',
      process: 'We began with an extensive research phase exploring the intersection of luxury hospitality and space exploration. The visual language draws from star maps, orbital mechanics, and the silence of deep space.',
      outcome: 'The resulting system has been deployed across 14 touchpoints from spacecraft livery to digital booking experiences.',
      gallery: [
        'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?w=1600&q=90',
        'https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=1600&q=90',
        'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1600&q=90',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=90',
      ],
    },
  },
  {
    id: 'product-flux',
    number: '02',
    title: 'Flux',
    client: 'Flux Systems',
    category: 'Digital Product',
    year: '2026',
    tags: ['UI/UX', 'Product Design', 'Prototyping'],
    description: 'End-to-end product design for a real-time collaboration platform used by 200k+ designers.',
    role: 'Lead Product Designer',
    mediaType: 'image',
    layout: 'portrait',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    featured: true,
    filterCategory: 'UI/UX',
    caseStudy: {
      statement: 'Rethinking how design teams collaborate in real time.',
      challenge: 'Teams were spending 40% of project time in meetings rather than making. Flux needed to turn synchronous collaboration into an async-first experience.',
      process: 'Twelve weeks of embedded team research, 6 prototype rounds, 3 user testing sessions with 200 participants across 14 countries.',
      outcome: '200,000 active designers. 4.9/5 App Store rating. 38% reduction in meeting time.',
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=90',
        'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=1600&q=90',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1600&q=90',
      ],
    },
  },
  {
    id: 'motion-atlas',
    number: '03',
    title: 'Atlas',
    client: 'BBC Studios',
    category: 'Motion Identity',
    year: '2025',
    tags: ['Motion Design', 'After Effects', '3D'],
    description: 'Kinetic brand language and broadcast package for a global documentary series.',
    role: 'Motion Director',
    mediaType: 'image',
    layout: 'landscape',
    image: 'https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?w=1200&q=85',
    featured: true,
    filterCategory: 'Motion',
    caseStudy: {
      statement: 'Motion as narrative — an identity system that breathes.',
      challenge: 'Atlas required a broadcast package that could adapt across 12 episode themes while maintaining visual coherence across 40+ markets.',
      process: 'We developed a modular motion system — core shapes that could deform, combine and evolve with each episode\'s subject matter.',
      outcome: 'Broadcast in 48 countries. BAFTA nominated. Viewed by 28 million people.',
      gallery: [
        'https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?w=1600&q=90',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=90',
        'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1600&q=90',
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=90',
      ],
    },
  },
  {
    id: 'web-prism',
    number: '04',
    title: 'Prism',
    client: 'Artblock',
    category: 'Creative Development',
    year: '2025',
    tags: ['WebGL', 'Three.js', 'Creative Code'],
    description: 'Immersive WebGL experience for a generative-art platform launch.',
    role: 'Creative Developer',
    mediaType: 'image',
    layout: 'portrait',
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=1200&q=85',
    featured: true,
    filterCategory: 'Development',
    caseStudy: {
      statement: 'Where code meets canvas.',
      challenge: 'A generative-art platform launch needed an experience that was itself generative — proving the platform\'s promise through the medium.',
      process: 'Built in Three.js with custom GLSL shaders. Every visitor sees a unique composition generated from their browser fingerprint.',
      outcome: '1.4M impressions in 48 hours. 94,000 unique artworks generated.',
      gallery: [
        'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=1600&q=90',
        'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1600&q=90',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f974?w=1600&q=90',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=90',
      ],
    },
  },
  {
    id: 'photo-nomad',
    number: '05',
    title: 'Nomad',
    client: 'Nomad Magazine',
    category: 'Art Direction',
    year: '2024',
    tags: ['Art Direction', 'Photography', 'Publishing'],
    description: 'Art direction and photography for an independent travel magazine.',
    role: 'Art Director, Photographer',
    mediaType: 'image',
    layout: 'landscape',
    image: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1200&q=85',
    featured: false,
    filterCategory: 'Photography',
    caseStudy: {
      statement: 'The world as seen through the lens of curiosity.',
      challenge: 'Nomad needed editorial photography that felt both documentary and aspirational — real places, real people, but always with intention.',
      process: '14 cities across 6 countries over 8 months. 4,200 frames reduced to 180 published images.',
      outcome: '50,000 print run. Featured in AIGA Eye on Design.',
      gallery: [
        'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1600&q=90',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=90',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=90',
        'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&q=90',
      ],
    },
  },
];

// ── Horizontal Showcase ───────────────────────────────────────────────────────
export const horizontalShowcase = [
  {
    id: 'hs-1',
    title: 'Cosmos',
    subtitle: 'Brand Experience — 2026',
    description: 'A luxury brand system for the age of space travel.',
    image: 'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?w=1200&q=85',
    category: 'Brand',
  },
  {
    id: 'hs-2',
    title: 'Flux',
    subtitle: 'Digital Product — 2026',
    description: '200k+ designers. One canvas. Zero meetings.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    category: 'Product',
  },
  {
    id: 'hs-3',
    title: 'Atlas',
    subtitle: 'Motion Identity — 2025',
    description: 'A motion system that breathes with the story.',
    image: 'https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?w=1200&q=85',
    category: 'Motion',
  },
  {
    id: 'hs-4',
    title: 'Prism',
    subtitle: 'WebGL — 2025',
    description: 'Every visitor generates a unique artwork.',
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=1200&q=85',
    category: 'Development',
  },
  {
    id: 'hs-5',
    title: 'Nomad',
    subtitle: 'Art Direction — 2024',
    description: 'The world through a lens of curiosity.',
    image: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1200&q=85',
    category: 'Photography',
  },
];

// ── Services ──────────────────────────────────────────────────────────────────
export const services = [
  { number: '01', title: 'Brand Identity',        preview: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80' },
  { number: '02', title: 'UI / UX Design',         preview: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80' },
  { number: '03', title: 'Motion Design',          preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80' },
  { number: '04', title: 'Creative Development',  preview: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&q=80' },
  { number: '05', title: '3D / WebGL',             preview: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&q=80' },
  { number: '06', title: 'Art Direction',          preview: 'https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=400&q=80' },
];

// ── Experience ────────────────────────────────────────────────────────────────
export const experience = [
  { year: '2024–Now',  role: 'Creative Director',       company: 'Studio Volta',  location: 'New York' },
  { year: '2021–2024', role: 'Senior Product Designer',  company: 'Linear',        location: 'Remote'   },
  { year: '2019–2021', role: 'Lead UX Designer',         company: 'Figma',         location: 'San Francisco' },
  { year: '2017–2019', role: 'Visual Designer',          company: 'Pentagram',     location: 'New York' },
];

// ── Clients ───────────────────────────────────────────────────────────────────
// Set to [] to hide the section
export const clients = [
  { name: 'Nike',       preview: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { name: 'Apple',      preview: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&q=80' },
  { name: 'Spotify',    preview: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&q=80' },
  { name: 'Airbnb',     preview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
  { name: 'Figma',      preview: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=80' },
  { name: 'Pentagram',  preview: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80' },
];

// ── Awards ────────────────────────────────────────────────────────────────────
// Set to [] to hide the section
export const awards = [
  { year: '2026', title: 'D&AD Yellow Pencil',       category: 'Digital Design' },
  { year: '2025', title: 'Awwwards Site of the Year', category: 'Creative Development' },
  { year: '2025', title: 'AIGA Eye on Design',        category: 'Editorial' },
  { year: '2024', title: 'CSS Design Awards',         category: 'Motion & Interaction' },
];

// ── Gallery (Photography mode) ────────────────────────────────────────────────
export const gallery = {
  mode: 'masonry',   // 'masonry' | 'editorial' | 'horizontal'
  images: [
    { src: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=900&q=85',  alt: 'Urban Solitude',       orientation: 'portrait'  },
    { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85',  alt: 'Open Road',            orientation: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=85',  alt: 'Mountain Light',       orientation: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=85',  alt: 'City Dusk',            orientation: 'portrait'  },
    { src: 'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?w=900&q=85',  alt: 'Deep Space',           orientation: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=900&q=85',  alt: 'Saturn Ring',          orientation: 'portrait'  },
    { src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&q=85',  alt: 'Nebula',               orientation: 'landscape' },
    { src: 'https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?w=900&q=85',  alt: 'Star Trail',           orientation: 'portrait'  },
  ],
};
