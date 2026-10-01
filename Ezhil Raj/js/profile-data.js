/**
 * BEXO Standard Profile Data
 * Reference Persona: Ezhil Arasan
 * Template: Content Strategist, Writer & Consultant Portfolio Standard
 */

export const defaultProfile = {
  user: {
    name: 'Ezhil Arasan',
    firstName: 'Ezhil',
    lastName: 'Arasan',
    email: 'hello@ezhilarasan.com',
    phone: '+91 98401 23456',
    photoUrl: 'assets/hero-portrait.jpg',
    resumeUrl: 'assets/Ezhil_Arasan_Content_Resume.pdf',
    openToHire: true,
    location: 'Chennai, India & Global Remote',
    socials: [
      { name: 'LinkedIn', url: 'https://linkedin.com/in/ezhilarasan', handle: '@ezhilarasan' },
      { name: 'Substack', url: 'https://ezhilarasan.substack.com', handle: 'Dispatch Newsletter' },
      { name: 'X / Twitter', url: 'https://x.com/ezhilarasan', handle: '@ezhilarasan' },
      { name: 'Instagram', url: 'https://instagram.com/ezhilarasan', handle: '@ezhilarasan' }
    ]
  },
  profile: {
    handle: 'ezhilarasan',
    headline: 'Writer, Content Strategist & Consultant',
    tagline: 'I write, think, and build ideas that matter.',
    careerGoal: 'Helping ambitious thinkers, founders, and companies articulate high-leverage perspectives.',
    bio: 'I help individuals and organizations communicate ideas that move people. Through editorial publishing, brand voice architecture, and executive consulting, I turn complexity into clarity.',
    overviewQuote: '"Clarity is a form of respect. Good ideas deserve better stories."',
    heroStats: [
      { label: 'Published Essays', value: '120+', detail: 'Across global publications' },
      { label: 'Active Readers', value: '35K+', detail: 'Subscribers & monthly readers' },
      { label: 'Client Engagements', value: '18', detail: 'Startups & Fortune 500 brands' },
      { label: 'Keynote Talks', value: '12', detail: 'Conferences & industry summits' }
    ]
  },
  skillEntries: [
    {
      category: 'Editorial & Writing',
      items: [
        { name: 'Long-Form Essays & Thought Leadership', level: 'Expert', note: 'Deep investigative writing' },
        { name: 'Executive Ghostwriting', level: 'Expert', note: 'Op-eds and keynote speeches' },
        { name: 'UX Writing & Microcopy', level: 'Advanced', note: 'Product onboarding clarity' },
        { name: 'Brand Storytelling & Voice Guidelines', level: 'Expert', note: 'Cross-functional narrative frameworks' }
      ]
    },
    {
      category: 'Content Strategy & Architecture',
      items: [
        { name: 'Audience Research & Framing', level: 'Expert', note: 'Customer intent analysis' },
        { name: 'Editorial Systems & Workflow Design', level: 'Expert', note: 'Scaling publishing cadences' },
        { name: 'Newsletter Strategy & Retention', level: 'Advanced', note: '48% average open rates' },
        { name: 'Organic Search & Topical Authority', level: 'Advanced', note: 'Evergreen pillar clustering' }
      ]
    },
    {
      category: 'Consulting & Advisory',
      items: [
        { name: 'Founder Narrative Advisory', level: 'Expert', note: 'Fundraising & vision articulation' },
        { name: 'Team Editorial Workshops', level: 'Expert', note: 'Upskilling internal teams' },
        { name: 'Repositioning & Messaging Audits', level: 'Advanced', note: 'Eliminating tone fragmentation' }
      ]
    },
    {
      category: 'Platforms & Production Tools',
      items: [
        { name: 'Substack & Ghost Ecosystems', level: 'Expert', note: 'Publishing infrastructure' },
        { name: 'Notion & Airtable Content Engines', level: 'Expert', note: 'Collaborative editorial pipelines' },
        { name: 'Figma & Visual Framing', level: 'Proficient', note: 'Information architecture layout' },
        { name: 'Audience Telemetry & Analytics', level: 'Advanced', note: 'Engagement telemetry' }
      ]
    }
  ],
  experienceEntries: [
    {
      role: 'Principal Editorial Consultant & Strategist',
      company: 'Independent Advisory',
      location: 'Chennai / Global Remote',
      period: '2024 — Present',
      description: 'Advising venture-backed founders, creative studios, and technology companies on brand voice, editorial operations, and public intellectual capital.',
      highlights: [
        'Built full thought-leadership programs generating 8,000+ newsletter subscribers in 6 months.',
        'Audited and rewrote SaaS onboarding messaging resulting in a 22-point NPS lift.',
        'Ghostwrote op-eds featured in leading business publications including Forbes India and The Ken.'
      ]
    },
    {
      role: 'Senior Content Strategist',
      company: 'Meridian Digital',
      location: 'Remote',
      period: '2022 — 2024',
      description: 'Directed editorial strategy for 12 international B2B technology and direct-to-consumer accounts. Managed cross-functional copy and design squads.',
      highlights: [
        'Established unified brand voice guidelines that scaled across 4 teams and 6 distribution channels.',
        'Standardized editorial quality criteria, improving content velocity by 35% without agency bloat.',
        'Pioneered interactive content audits that increased client contract renewals by 28%.'
      ]
    },
    {
      role: 'Content & Brand Lead',
      company: 'Kairos Labs',
      location: 'Bengaluru, India',
      period: '2020 — 2022',
      description: 'Spearheaded brand publishing and owned editorial voice from seed stage to Series A.',
      highlights: [
        'Scaled organic monthly readership from 0 to 50,000 readers in 18 months.',
        'Authored foundational manifesto and company whitepapers cited by industry analysts.',
        'Coordinated editorial partnerships and interview series with top product innovators.'
      ]
    },
    {
      role: 'Editorial Essayist & Columnist',
      company: 'Independent Writing',
      location: 'Chennai, India',
      period: '2018 — 2020',
      description: 'Began writing extensively on culture, digital communication, and clarity. Built early audience of 10,000 loyal readers.',
      highlights: [
        'Published 60+ essays exploring technology, rhetoric, and human attention.',
        'Facilitated writing workshops for independent creators and university graduates.'
      ]
    }
  ],
  educationEntries: [
    {
      degree: 'Master of Arts in Strategic Communications & Literature',
      institution: 'University of Madras',
      period: '2016 — 2018',
      grade: 'First Class with Distinction',
      focus: 'Rhetorical Analysis, Digital Discourse & Narrative Architecture'
    },
    {
      degree: 'Bachelor of Arts in English & Media Studies',
      institution: 'Loyola College',
      period: '2013 — 2016',
      grade: 'Gold Medalist & Department Valedictorian',
      focus: 'Critical Theory, Print Journalism & Editorial Craft'
    }
  ],
  projectEntries: [
    {
      id: 'p1',
      number: '01',
      title: 'Clarifying Verdant Co.’s Unified Voice Across Global Touchpoints',
      category: 'Brand Voice Architecture',
      client: 'Verdant Co.',
      year: '2026',
      role: 'Lead Voice Strategist',
      summary: 'Verdant Co. possessed three disparate brand tones across their web, product, and sales documentation, confusing prospective enterprise buyers.',
      challenge: 'Stakeholders across engineering, sales, and marketing were publishing with conflicting vocabularies, leading to customer drop-off during high-value sales cycles.',
      approach: 'Conducted a 360-degree content voice audit, hosted interactive messaging workshops with executive leaders, and drafted a living Tone System with contextual examples.',
      outcome: 'Achieved 40% improvement in content consistency scores. The client deployed a unified digital presence in 60 days, yielding a 26% acceleration in pipeline deals.',
      deliverables: ['Brand Voice Lexicon', 'Cross-Department Style Guide', 'Website Copy Rework', 'Sales Script System'],
      image: 'assets/project-brand-strategy.jpg',
      pdfUrl: 'assets/Ezhil_Arasan_Content_Resume.pdf',
      externalUrl: 'https://ezhilarasan.com/case-studies/verdant'
    },
    {
      id: 'p2',
      number: '02',
      title: 'Building a Thought Leadership Publishing Engine for Arch Studio',
      category: 'Editorial Strategy & Newsletter',
      client: 'Arch Studio',
      year: '2025',
      role: 'Editorial Director',
      summary: 'Architecture and spatial design consultancy needed to translate deep technical expertise into a high-leverage digital audience asset.',
      challenge: 'The firm held deep domain knowledge, but it was locked away in internal project notes and Slack threads, producing zero inbound market authority.',
      approach: 'Built a sustainable bi-weekly editorial dispatch, structured interviews with principal architects, and created a streamlined publishing pipeline.',
      outcome: 'Produced 48 curated long-form essays in 6 months. Grew newsletter subscribers from 0 to 8,000+ organic readers with an extraordinary 52% average open rate.',
      deliverables: ['Editorial Calendar', 'Ghostwritten Keynote Essays', 'Substack Pipeline', 'Distribution Playbook'],
      image: 'assets/article-content-strategy.jpg',
      pdfUrl: 'assets/Ezhil_Arasan_Content_Resume.pdf',
      externalUrl: 'https://ezhilarasan.com/case-studies/arch-studio'
    },
    {
      id: 'p3',
      number: '03',
      title: 'Rewriting User Onboarding & Interface Copy for Luminary SaaS',
      category: 'UX Writing & Conversion Copy',
      client: 'Luminary SaaS',
      year: '2025',
      role: 'UX Content Strategist',
      summary: 'Product analytics indicated a 64% onboarding drop-off caused by ambiguous terminology and intimidating interface copy.',
      challenge: 'User testing revealed the product capabilities were strong, but users felt alienated by technical jargon and confusing form prompts.',
      approach: 'Mapped end-to-end user journeys, audited 80+ microcopy states, redesigned empty states, and drafted clear, empathetic contextual guidance.',
      outcome: 'Onboarding completion surged from 36% to 81%. User satisfaction NPS climbed 22 points, and support tickets regarding setup fell by 47%.',
      deliverables: ['Onboarding Flow Copy', 'Error & Empty State System', 'Microcopy Guidelines', 'Figma Copy Tokens'],
      image: 'assets/article-brand-voice.jpg',
      pdfUrl: 'assets/Ezhil_Arasan_Content_Resume.pdf',
      externalUrl: 'https://ezhilarasan.com/case-studies/luminary'
    }
  ],
  researchEntries: [
    {
      id: 'r1',
      title: 'The Future of AI in Modern Business Workflows',
      category: 'Business & Strategy',
      date: 'Sep 2026',
      readTime: '8 min read',
      excerpt: 'Artificial intelligence isn’t just changing what we make — it is fundamentally altering how organizations formulate perspectives and deliberate.',
      image: 'assets/article-ai-workflows.jpg',
      featured: true,
      body: `Artificial intelligence is frequently analyzed as an efficiency mechanism: write faster, summarize quicker, generate more. But the real inflection point in modern business workflows isn't quantitative output — it is qualitative perspective.\n\nWhen synthesis becomes cheap, the premium shifts entirely to curation, editorial discernment, and foundational taste. Teams that win won't be those who generate 10,000 blog posts a day; they will be the teams whose thinking is distinct enough to earn attention in an ocean of synthetic noise.\n\nClarity is not an algorithm. It is the disciplined elimination of the irrelevant until only the essential remains.`
    },
    {
      id: 'r2',
      title: 'Why Most Content Strategies Fail Before They Begin',
      category: 'Editorial Strategy',
      date: 'Aug 2026',
      readTime: '6 min read',
      excerpt: 'The failure isn’t in distribution channels or publishing cadences. It’s that most content strategies are built around tactical formats rather than defensible ideas.',
      image: 'assets/article-content-strategy.jpg',
      featured: false,
      body: `A content strategy is not a calendar of blog post titles and LinkedIn carousels. A content strategy is an intellectual point of view.\n\nMost brand initiatives stumble because they ask: "What channels should we be on this quarter?" instead of asking: "What truth does our company understand about this industry that our competitors refuse to acknowledge?"\n\nWhen you solve the perspective problem, the distribution problem becomes an exercise in formatting.`
    },
    {
      id: 'r3',
      title: 'Finding Your Voice: The Art of Authentic Brand Communication',
      category: 'Brand Architecture',
      date: 'Jul 2026',
      readTime: '5 min read',
      excerpt: 'Your brand voice isn’t an arbitrary style guide or a list of adjectives. It is an intentional philosophy translated into everyday words.',
      image: 'assets/article-brand-voice.jpg',
      featured: false,
      body: `Most corporate style guides list words like "Friendly yet Professional" or "Innovative yet Grounded". These pairs are meaningless because they cancel each other out.\n\nA genuine voice has edges. It knows what it will not say. It takes stances. If your brand communication can be read aloud by any of your competitors without sounding out of place, you do not have a voice — you have wallpaper.`
    },
    {
      id: 'r4',
      title: 'Three Principles of Writing for High-Intent Readers',
      category: 'Craft & Prose',
      date: 'Jun 2026',
      readTime: '4 min read',
      excerpt: 'After 120+ published essays and 35,000 subscribers, here are the hard truths about holding human attention in an era of distraction.',
      image: 'assets/hero-portrait.jpg',
      featured: false,
      body: `1. Respect the reader's clock. Every paragraph must earn the next sentence.\n2. Concrete details anchor abstract principles. Never give a philosophy without an artifact.\n3. Make your conclusions actionable. Intellectual stimulation without utility quickly evaporates.`
    }
  ],
  certificateEntries: [
    {
      title: 'Master Class in Narrative Architecture',
      issuer: 'Oxford Editorial Institute',
      year: '2024',
      credentialId: 'OEI-NAR-8921',
      link: 'https://credential.net'
    },
    {
      title: 'Certified UX Content Design Specialist',
      issuer: 'Nielsen Norman Group (NN/g)',
      year: '2023',
      credentialId: 'NNG-UXC-4091',
      link: 'https://nngroup.com'
    },
    {
      title: 'Executive Communication & Rhetorical Strategy',
      issuer: 'Harvard Division of Continuing Education',
      year: '2022',
      credentialId: 'HCE-STR-1184',
      link: 'https://harvard.edu'
    }
  ],
  achievementEntries: [
    {
      title: 'Featured Columnist & Essayist',
      organization: 'Forbes India & The Ken',
      year: '2025',
      description: 'Regular invited contributor writing on organizational voice, communication economics, and executive thought leadership.'
    },
    {
      title: 'Keynote Speaker: The Anatomy of Resonant Words',
      organization: 'INK Global Conference',
      year: '2024',
      description: 'Delivered plenary address to 1,200 founders and creatives on turning strategic intent into memorable writing.'
    },
    {
      title: 'Top 10 Independent Editorial Newsletters',
      organization: 'Substack India Featured Selection',
      year: '2024',
      description: 'Selected as one of the fastest growing publications in strategy, writing, and creative discipline.'
    }
  ],
  testimonials: [
    {
      quote: 'Ezhil helped us turn complex multi-tiered concepts into copy our prospects actually understood. The clarity he brought to our brand voice was nothing short of transformative.',
      author: 'Rahul Menon',
      role: 'CEO & Founder, Verdant Co.'
    },
    {
      quote: 'Working with Ezhil permanently shifted how our entire team approaches writing. He does not simply draft words — he reconstructs your thinking.',
      author: 'Priya Chandran',
      role: 'Head of Marketing & Editorial, Arch Studio'
    },
    {
      quote: 'Our user onboarding completion jumped 45 percentage points after Ezhil rewrote our in-product communication. That is craft operating at maximum leverage.',
      author: 'Marcus Webb',
      role: 'Product Lead, Luminary SaaS'
    }
  ],
  services: [
    {
      id: 's1',
      number: '01',
      title: 'Brand Voice & Tone Architecture',
      description: 'Defining how your company sounds across web, marketing, and executive touchpoints with complete style guidelines and tone matrices.',
      deliverables: ['Voice Audit', 'Vocabulary & Tone Guide', 'Homepage Copy Rework', 'Team Enablement Workshop']
    },
    {
      id: 's2',
      number: '02',
      title: 'Executive Ghostwriting & Op-Eds',
      description: 'Translating founder insight and executive vision into high-impact articles, LinkedIn essays, and keynote speeches that build authority.',
      deliverables: ['Bi-Weekly Ghostwritten Essays', 'Op-Ed Placements', 'Conference Keynote Decks', 'PR Thought Leadership']
    },
    {
      id: 's3',
      number: '03',
      title: 'Editorial Systems & Newsletter Strategy',
      description: 'Building end-to-end publishing workflows that allow your team to produce research-backed content consistently.',
      deliverables: ['Editorial Calendar', 'Notion/Substack Pipeline', 'Distribution Playbook', 'Writer Recruitment & Review']
    },
    {
      id: 's4',
      number: '04',
      title: 'UX Writing & Product Communication',
      description: 'Eliminating friction in SaaS onboarding, navigation, empty states, and transactional flows with human, empathetic microcopy.',
      deliverables: ['Onboarding Flow Audit', 'Figma Copy System', 'Error & Empty State Library', 'NPS Feedback Review']
    }
  ],
  manifesto: {
    lines: [
      { text: 'I BELIEVE', muted: false },
      { text: 'GOOD WRITING', muted: false, accent: true },
      { text: 'DOES MORE THAN', muted: true },
      { text: 'GET ATTENTION.', muted: true },
      { text: '', muted: true },
      { text: 'IT BUILDS', muted: true },
      { text: 'UNSHAKABLE TRUST.', accent: true }
    ]
  }
};
