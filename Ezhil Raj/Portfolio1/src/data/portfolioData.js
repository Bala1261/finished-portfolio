// ============================================================
// CONTENT & PROFESSIONAL PORTFOLIO — DATA CONFIGURATION
// Template 03 — Personal Publishing & Professional Identity
// ============================================================
// Change profileType to switch modes:
// 'writer' | 'contentCreator' | 'consultant' | 'freelancer'
// | 'coach' | 'speaker' | 'educator' | 'marketer' | 'personalBrand'
// ============================================================

export const portfolioData = {

  // ── PROFILE TYPE ─────────────────────────────────────────
  profileType: 'personalBrand', // Controls section ordering & emphasis

  // ── THEME ────────────────────────────────────────────────
  theme: {
    accent: '#C75B32',
    background: '#F7F4EE',
    primary: '#171717',
    secondary: '#66615B',
    card: '#FFFFFF',
    border: 'rgba(23,23,23,0.12)',
  },

  // ── PERSONAL ────────────────────────────────────────────
  personal: {
    name: 'Ezhil Arasan',
    firstName: 'Ezhil',
    lastName: 'Arasan',
    tagline: 'Writer · Strategist · Consultant',
    roles: ['Writer', 'Strategist', 'Consultant'],
    bio: 'I help individuals and organizations communicate ideas that move people. Through writing, strategy, and consulting, I turn complexity into clarity.',
    location: 'Chennai, India',
    portrait: '/images/hero-portrait.jpg',
    email: 'hello@ezhilarasan.com',
    website: 'ezhilarasan.com',
    bookingUrl: 'https://cal.com/ezhilarasan',
  },

  // ── HERO ────────────────────────────────────────────────
  hero: {
    mode: 'portrait', // 'portrait' | 'textFirst' | 'contentFirst' | 'quoteFirst'
    headline: ['I WRITE, THINK,', 'AND BUILD IDEAS', 'THAT MATTER.'],
    subtext: 'Writer · Consultant · Creator',
    cta: [
      { label: 'Read My Work', href: '#content', type: 'primary' },
      { label: 'Work With Me', href: '#services', type: 'secondary' },
    ],
    quote: '"GOOD IDEAS\nDESERVE\nBETTER STORIES."',
  },

  // ── MANIFESTO ───────────────────────────────────────────
  manifesto: {
    lines: [
      { text: 'I BELIEVE', muted: false },
      { text: 'GOOD CONTENT', muted: false, accent: true },
      { text: 'DOES MORE THAN', muted: true },
      { text: 'GET ATTENTION.', muted: true },
      { text: '', muted: true },
      { text: 'IT BUILDS', muted: true },
      { text: 'TRUST.', accent: true },
    ],
  },

  // ── CONTENT ────────────────────────────────────────────
  content: [
    {
      id: 'c1',
      type: 'article',
      featured: true,
      category: 'BUSINESS',
      title: 'The Future of AI in Modern Business Workflows',
      excerpt: 'Artificial intelligence isn\'t just changing what we make — it\'s changing how we think. Here\'s what that means for strategy, content, and teams.',
      date: 'Sep 2026',
      readTime: '8 min read',
      image: '/images/article-ai-workflows.jpg',
      url: '#article/c1',
    },
    {
      id: 'c2',
      type: 'article',
      featured: false,
      category: 'STRATEGY',
      title: 'Why Most Content Strategies Fail Before They Begin',
      excerpt: 'The problem isn\'t execution. It\'s that most content strategies are built around channels, not ideas.',
      date: 'Aug 2026',
      readTime: '6 min read',
      image: '/images/article-content-strategy.jpg',
      url: '#article/c2',
    },
    {
      id: 'c3',
      type: 'article',
      featured: false,
      category: 'PERSONAL BRAND',
      title: 'Finding Your Voice: The Art of Authentic Brand Communication',
      excerpt: 'Your brand voice isn\'t a style guide. It\'s a perspective. Here\'s how to find it and keep it consistent.',
      date: 'Jul 2026',
      readTime: '5 min read',
      image: '/images/article-brand-voice.jpg',
      url: '#article/c3',
    },
    {
      id: 'c4',
      type: 'insight',
      featured: false,
      category: 'INSIGHTS',
      title: 'Three Things I\'ve Learned About Writing for the Internet',
      excerpt: 'After 120+ articles and 35,000 readers, here\'s what actually moves people online.',
      date: 'Jun 2026',
      readTime: '3 min read',
      image: null,
      url: '#article/c4',
    },
    {
      id: 'c5',
      type: 'article',
      featured: false,
      category: 'MARKETING',
      title: 'The Newsletter Renaissance: Why Email Is Back',
      excerpt: 'The algorithm giveth and taketh away. But your inbox is still yours. A look at the newsletter economy.',
      date: 'May 2026',
      readTime: '7 min read',
      image: '/images/article-content-strategy.jpg',
      url: '#article/c5',
    },
    {
      id: 'c6',
      type: 'insight',
      featured: false,
      category: 'CAREER',
      title: 'Going Independent: Notes from My First Year of Consulting',
      excerpt: 'What nobody tells you about leaving a stable job to consult. The good, the uncomfortable, and the lessons.',
      date: 'Apr 2026',
      readTime: '4 min read',
      image: null,
      url: '#article/c6',
    },
  ],

  // ── CATEGORIES (for filter) ─────────────────────────────
  categories: ['ALL', 'BUSINESS', 'STRATEGY', 'PERSONAL BRAND', 'MARKETING', 'CAREER', 'INSIGHTS'],

  // ── SELECTED WORK / CASE STUDIES ────────────────────────
  projects: [
    {
      id: 'p1',
      number: '01',
      category: 'BRAND STRATEGY',
      title: 'Helping Verdant Co. clarify its digital voice.',
      services: ['Strategy', 'Content', 'Brand'],
      year: '2026',
      client: 'Verdant Co.',
      challenge: 'The brand had three different tones across three different channels — none of them sounded like the same company.',
      approach: 'Conducted a brand voice audit, ran stakeholder workshops, and built a modular content system that scaled across teams.',
      outcome: '40% improvement in content consistency scores. Brand launched new website with unified tone within 60 days.',
      image: '/images/project-brand-strategy.jpg',
    },
    {
      id: 'p2',
      number: '02',
      category: 'CONTENT STRATEGY',
      title: 'Building a thought leadership engine for Arch Studio.',
      services: ['Writing', 'Strategy', 'Editorial'],
      year: '2025',
      client: 'Arch Studio',
      challenge: 'The team had expertise but no platform. Their knowledge lived in Slack threads and internal documents.',
      approach: 'Created an editorial calendar, built a writing workflow, and trained the team to publish consistently.',
      outcome: 'Published 48 articles in 6 months. Email list grew from 0 to 8,000 subscribers.',
      image: '/images/article-content-strategy.jpg',
    },
    {
      id: 'p3',
      number: '03',
      category: 'COPYWRITING',
      title: 'Rewriting the way Luminary SaaS talks to its users.',
      services: ['UX Writing', 'Copy', 'Messaging'],
      year: '2025',
      client: 'Luminary SaaS',
      challenge: 'Onboarding drop-off was at 64%. Users said the product felt confusing, not the interface — the words.',
      approach: 'Audited all in-app copy, rewrote onboarding flow, redesigned empty states and error messages.',
      outcome: 'Onboarding completion rate improved to 81%. NPS score increased by 22 points.',
      image: '/images/article-brand-voice.jpg',
    },
  ],

  // ── SERVICES ────────────────────────────────────────────
  services: [
    {
      id: 's1',
      number: '01',
      name: 'CONTENT STRATEGY',
      description: 'Building content systems that scale — from positioning to publishing.',
      deliverables: ['Audience research', 'Content positioning', 'Editorial system', 'Channel strategy'],
    },
    {
      id: 's2',
      number: '02',
      name: 'COPYWRITING',
      description: 'Words that convert, connect, and create lasting impressions.',
      deliverables: ['Website copy', 'Brand messaging', 'UX writing', 'Email sequences'],
    },
    {
      id: 's3',
      number: '03',
      name: 'CONSULTING',
      description: 'Strategic thinking for content, communications, and marketing.',
      deliverables: ['Strategy sessions', 'Audits & reviews', 'Team training', 'Ongoing advisory'],
    },
    {
      id: 's4',
      number: '04',
      name: 'PERSONAL BRANDING',
      description: 'Helping experts build authority and share their perspective at scale.',
      deliverables: ['Brand voice', 'LinkedIn strategy', 'Newsletter setup', 'Speaking prep'],
    },
    {
      id: 's5',
      number: '05',
      name: 'CREATIVE DIRECTION',
      description: 'Shaping the editorial voice and visual language of content teams.',
      deliverables: ['Brand guidelines', 'Editorial direction', 'Visual tone', 'Content audits'],
    },
  ],

  // ── EXPERIENCE / TIMELINE ────────────────────────────────
  experience: [
    {
      year: '2026',
      role: 'Independent Consultant',
      company: 'Self',
      description: 'Working with startups, agencies, and individuals on content, brand, and strategy.',
    },
    {
      year: '2024',
      role: 'Senior Content Strategist',
      company: 'Meridian Digital',
      description: 'Led content strategy for 12 B2B and DTC clients. Built editorial systems from scratch.',
    },
    {
      year: '2022',
      role: 'Content Lead',
      company: 'Kairos Labs',
      description: 'Built the company\'s content engine from 0 to 50K monthly readers in 18 months.',
    },
    {
      year: '2020',
      role: 'Started Writing Online',
      company: 'Independent',
      description: 'Published my first article. 12 people read it. I was hooked.',
    },
  ],

  // ── PROOF / STATS ────────────────────────────────────────
  proof: [
    { number: '120', suffix: '+', label: 'Articles' },
    { number: '35', suffix: 'K+', label: 'Readers' },
    { number: '18', suffix: '', label: 'Clients' },
    { number: '12', suffix: '', label: 'Talks' },
  ],

  // ── TESTIMONIALS ────────────────────────────────────────
  testimonials: [
    {
      id: 't1',
      quote: 'Ezhil helped us turn complex ideas into content people actually understood. The clarity she brought to our messaging was transformative.',
      author: 'Rahul Menon',
      role: 'CEO, Verdant Co.',
    },
    {
      id: 't2',
      quote: 'Working with Ezhil changed how our whole team thinks about writing. She doesn\'t just write — she teaches you to think differently.',
      author: 'Priya Chandran',
      role: 'Head of Marketing, Arch Studio',
    },
    {
      id: 't3',
      quote: 'Our NPS jumped 22 points after Ezhil rewrote our onboarding copy. That\'s not a coincidence — that\'s craft.',
      author: 'Marcus Webb',
      role: 'Product Lead, Luminary SaaS',
    },
  ],

  // ── PUBLICATIONS / PRESS ─────────────────────────────────
  publications: [
    { name: 'Forbes India', type: 'publication' },
    { name: 'The Ken', type: 'publication' },
    { name: 'Content Inc. Podcast', type: 'podcast' },
    { name: 'MarketingProfs', type: 'publication' },
    { name: 'INK Conference', type: 'event' },
    { name: 'Future of Work Summit', type: 'event' },
  ],

  // ── NEWSLETTER ───────────────────────────────────────────
  newsletter: {
    enabled: true,
    heading: ['ONE IDEA.', 'EVERY WEEK.'],
    description: 'A weekly newsletter on writing, strategy, and ideas worth sharing. No fluff, no pitches.',
    cta: 'Subscribe →',
    placeholder: 'Your email address',
  },

  // ── ABOUT ────────────────────────────────────────────────
  about: {
    heading: ['A LITTLE', 'ABOUT ME.'],
    story: [
      'I started writing online in 2020, mostly as a way to think out loud. I didn\'t expect it to become a career, a community, or a calling.',
      'Today I work with founders, teams, and experts who have valuable ideas but struggle to communicate them. I help them write clearly, think sharply, and build systems that keep the good ideas coming.',
      'My approach is part journalist, part strategist, part editor. I care deeply about precision — finding the exact word, the right structure, the story that makes someone lean forward.',
    ],
    beliefs: [
      'Clarity is a form of respect.',
      'Good writing is good thinking.',
      'Consistency beats brilliance.',
      'Your audience remembers how you made them feel.',
    ],
    interests: ['Long-form essays', 'Film photography', 'South Indian classical music', 'Product thinking'],
  },

  // ── SOCIALS ─────────────────────────────────────────────
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/ezhilarasan', handle: '@ezhilarasan' },
    { platform: 'X (Twitter)', url: 'https://x.com/ezhilarasan', handle: '@ezhilarasan' },
    { platform: 'Instagram', url: 'https://instagram.com/ezhilarasan', handle: '@ezhilarasan' },
    { platform: 'Substack', url: 'https://ezhilarasan.substack.com', handle: 'Newsletter' },
  ],

  // ── MARQUEE ──────────────────────────────────────────────
  marquee: {
    items: ['WRITING', 'STRATEGY', 'IDEAS', 'BUSINESS', 'CREATIVITY', 'CLARITY', 'CONTENT', 'STORYTELLING'],
  },

  // ── CONTACT ─────────────────────────────────────────────
  contact: {
    heading: ['HAVE AN IDEA?', "LET'S TALK."],
    cta: 'START A CONVERSATION →',
    email: 'hello@ezhilarasan.com',
    bookingLabel: 'Book a Call',
  },
};

export default portfolioData;
