const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Target output locations
const publicAssetsPath = path.resolve(__dirname, '../public/assets/Ezhil_Arasan_Content_Resume.pdf');
const publicRootPath = path.resolve(__dirname, '../public/Ezhil_Arasan_Content_Resume.pdf');
const distAssetsPath = path.resolve(__dirname, '../dist/assets/Ezhil_Arasan_Content_Resume.pdf');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4',
});

// Dimensions
const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt
const margin = 38;
const contentWidth = pageWidth - margin * 2; // 519.28 pt
const rightEdge = pageWidth - margin; // 557.28 pt

// Colors
const primaryInk = [23, 23, 23]; // #171717
const terracotta = [199, 91, 50]; // #C75B32
const slate = [90, 85, 80]; // #5A5550
const lightLine = [225, 220, 212]; // #E1DCD4

// ==========================================
// HEADER SECTION
// ==========================================
// 1. Top accent line (placed high with 10pt buffer before text)
const topBarY = 32;
doc.setFillColor(...terracotta);
doc.rect(margin, topBarY, contentWidth, 2.5, 'F');

// 2. Name & Role title
// Name baseline at y = 58. (Cap-height of 21pt font is ~15pt -> top is at 43, 8.5pt below the bar)
let y = 58;
doc.setFont('helvetica', 'bold');
doc.setFontSize(21);
doc.setTextColor(...primaryInk);
doc.text('EZHIL ARASAN', margin, y);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...terracotta);
const roleText = 'WRITER, CONTENT STRATEGIST & CONSULTANT';
const roleWidth = doc.getTextWidth(roleText);
doc.text(roleText, rightEdge - roleWidth, y);

// 3. Contact info row
y += 15;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
doc.setTextColor(...slate);
const contactItems = [
  'hello@ezhilarasan.com',
  '+91 98401 23456',
  'Chennai, India & Global Remote',
  'ezhilarasan.com',
  'Substack: @ezhilarasan',
];
const contactText = contactItems.join('   •   ');
doc.text(contactText, margin, y);

// 4. Header bottom dividing line
y += 9;
doc.setDrawColor(...lightLine);
doc.setLineWidth(0.75);
doc.line(margin, y, rightEdge, y);
y += 15;

// ==========================================
// HELPERS
// ==========================================
function addSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...terracotta);
  doc.text(title.toUpperCase(), margin, y);
  
  // Clean full-width horizontal rule directly underneath the title
  y += 4;
  doc.setDrawColor(...lightLine);
  doc.setLineWidth(0.75);
  doc.line(margin, y, rightEdge, y);
  y += 10;
}

function drawBullet(bx, by) {
  doc.setFillColor(...terracotta);
  doc.circle(bx, by - 2.5, 1.3, 'F');
}

// ==========================================
// 1. EXECUTIVE PROFILE SUMMARY
// ==========================================
addSectionHeader('Executive Profile & Overview');

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.4);
doc.setTextColor(...primaryInk);
const summaryText =
  'Strategic editorial consultant, narrative architect, and writer with 6+ years of expertise helping high-growth technology brands, venture-backed founders, and consulting organizations articulate transformative ideas with precision. Specializing in company brand voice systems, executive ghostwriting, and high-retention publishing frameworks. Author of 120+ published essays and thought-leadership articles read by over 35,000 global subscribers across Substack, Forbes India, and The Ken.';
const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
doc.text(summaryLines, margin, y, { lineHeightFactor: 1.28 });
y += summaryLines.length * 10.8 + 10;

// ==========================================
// 2. CORE CAPABILITIES & METHODOLOGY
// ==========================================
addSectionHeader('Core Capabilities & Strategy Frameworks');

const competencies = [
  {
    category: 'Editorial & Thought Leadership:',
    skills: 'Long-Form Essays, Executive Ghostwriting, Op-Ed Placements, Keynote Remarks, Speechwriting',
  },
  {
    category: 'Brand Voice Architecture:',
    skills: 'Brand Voice Lexicons, Tone Matrices, Cross-Department Style Guides, Messaging Hierarchy Systems',
  },
  {
    category: 'Content Systems & Strategy:',
    skills: 'Audience Intent Research, Editorial Workflow Pipelines, Topical Authority Clustering, Newsletter Engines',
  },
  {
    category: 'UX Writing & Product Copy:',
    skills: 'Onboarding Microcopy, Error & Empty States, Product Framing, Behavioral Messaging, Conversion Audits',
  },
  {
    category: 'Platforms & Telemetry:',
    skills: 'Substack, Notion, Ghost, Figma Copy Systems, Airtable, Typeform, Audience Analytics & Telemetry',
  },
];

const col1Gutter = 138;
const col2Width = contentWidth - col1Gutter;

competencies.forEach((c) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...primaryInk);
  doc.text(c.category, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(...slate);
  const sLines = doc.splitTextToSize(c.skills, col2Width);
  doc.text(sLines, margin + col1Gutter, y, { lineHeightFactor: 1.2 });
  y += Math.max(sLines.length * 9.5, 11);
});
y += 6;

// ==========================================
// 3. PROFESSIONAL EXPERIENCE
// ==========================================
addSectionHeader('Professional Experience & Track Record');

const experiences = [
  {
    role: 'Principal Editorial Consultant & Strategist',
    company: 'Independent Advisory',
    location: 'Chennai / Global Remote',
    period: '2024 — Present',
    bullets: [
      'Advised venture-backed founders, design studios, and SaaS enterprises on foundational brand voice, intellectual property publishing, and executive op-eds.',
      'Designed and executed complete thought-leadership program for an architecture consultancy, scaling their subscriber base from 0 to 8,000+ organic readers with a 52% open rate in 6 months.',
      'Audited and overhauled onboarding flow copy for an enterprise SaaS product, reducing drop-off by 45% and elevating user onboarding completion from 36% to 81%.',
    ],
  },
  {
    role: 'Senior Content Strategist',
    company: 'Meridian Digital',
    location: 'Remote',
    period: '2022 — 2024',
    bullets: [
      'Directed cross-functional editorial and copywriting initiatives for 12 international B2B technology and direct-to-consumer accounts.',
      'Developed comprehensive Brand Voice Lexicons and cross-channel guidelines adopted across engineering, product marketing, and executive tiers.',
      'Increased publishing velocity by 35% through standardized editorial review frameworks while boosting annual client retainer renewals by 28%.',
    ],
  },
  {
    role: 'Content & Brand Lead',
    company: 'Kairos Labs',
    location: 'Bengaluru, India',
    period: '2020 — 2022',
    bullets: [
      'Spearheaded organic publishing strategy from seed stage through Series A, growing readership from 0 to 50,000 monthly readers in 18 months.',
      'Authored foundational product whitepapers and industry manifestos cited by market analysts and venture partners.',
      'Produced in-depth interview series and newsletters that consistently delivered 48%+ engagement benchmarks.',
    ],
  },
  {
    role: 'Editorial Essayist & Columnist',
    company: 'Independent Writing',
    location: 'Chennai, India',
    period: '2018 — 2020',
    bullets: [
      'Authored 60+ essays investigating technology ethics, digital discourse, and concise communication craft; established early readership of 10,000+ subscribers.',
      'Facilitated writing masterclasses and communication workshops for early-stage professionals and creative teams.',
    ],
  },
];

experiences.forEach((exp, idx) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(...primaryInk);
  doc.text(exp.role, margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...terracotta);
  const roleWidth = doc.getTextWidth(exp.role) + 4;
  doc.text(`|  ${exp.company}`, margin + roleWidth, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slate);
  const metaText = `${exp.location}   •   ${exp.period}`;
  const metaWidth = doc.getTextWidth(metaText);
  doc.text(metaText, rightEdge - metaWidth, y);

  y += 10.5;

  exp.bullets.forEach((b) => {
    drawBullet(margin + 4, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...slate);
    const bLines = doc.splitTextToSize(b, contentWidth - 14);
    doc.text(bLines, margin + 12, y, { lineHeightFactor: 1.22 });
    y += bLines.length * 9.6 + 2;
  });

  y += (idx === experiences.length - 1 ? 3 : 5);
});
y += 6;

// ==========================================
// 4. SELECTED CASE STUDIES & QUANTIFIED IMPACT
// ==========================================
addSectionHeader('Featured Case Studies & Quantified Impact');

const caseStudies = [
  {
    client: 'Verdant Co.',
    track: 'Brand Voice Architecture',
    result: 'Audited 3 disparate department vocabularies; deployed unified voice system in 60 days, lifting consistency scores by 40% and shortening sales pipeline by 26%.',
  },
  {
    client: 'Arch Studio',
    track: 'Thought Leadership Engine',
    result: 'Built weekly editorial dispatch and structured interview pipeline; published 48 deep essays, expanding subscriber base from 0 to 8,000+ at 52% average open rate.',
  },
  {
    client: 'Luminary SaaS',
    track: 'UX Onboarding Overhaul',
    result: 'Rewrote 80+ microcopy states and contextual guides; onboarding completion soared from 36% to 81%, while NPS jumped 22 points and setup tickets fell by 47%.',
  },
];

caseStudies.forEach((cs) => {
  drawBullet(margin + 4, y);

  // Client name in bold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...primaryInk);
  doc.text(cs.client, margin + 12, y);

  // Track in terracotta
  const cWidth = doc.getTextWidth(cs.client) + 4;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...terracotta);
  doc.text(`(${cs.track}): `, margin + 12 + cWidth, y);
  const trackWidth = doc.getTextWidth(`(${cs.track}): `) + 2;

  // Result text flowing seamlessly
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slate);
  const prefixWidth = cWidth + trackWidth;
  const rLines = doc.splitTextToSize(cs.result, contentWidth - 12 - prefixWidth);
  
  if (rLines.length === 1) {
    doc.text(rLines[0], margin + 12 + prefixWidth, y);
    y += 11;
  } else {
    // If it wraps, print first line next to header, rest indented cleanly
    doc.text(rLines[0], margin + 12 + prefixWidth, y);
    y += 10;
    const remaining = rLines.slice(1);
    doc.text(remaining, margin + 12 + prefixWidth, y, { lineHeightFactor: 1.22 });
    y += remaining.length * 9.6 + 2;
  }
});
y += 5;

// ==========================================
// 5. EDUCATION & ACADEMIC HONORS
// ==========================================
addSectionHeader('Education & Academic Background');

const education = [
  {
    degree: 'Master of Arts in Strategic Communications & Literature',
    period: '2016 — 2018',
    institution: 'University of Madras',
    details: 'First Class with Distinction   •   Focus: Rhetorical Theory, Digital Discourse & Narrative Architecture',
  },
  {
    degree: 'Bachelor of Arts in English & Media Studies',
    period: '2013 — 2016',
    institution: 'Loyola College',
    details: 'Gold Medalist & Department Valedictorian   •   Focus: Print Journalism & Critical Media Analysis',
  },
];

education.forEach((edu) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.6);
  doc.setTextColor(...primaryInk);
  doc.text(edu.degree, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slate);
  const pWidth = doc.getTextWidth(edu.period);
  doc.text(edu.period, rightEdge - pWidth, y);

  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...terracotta);
  doc.text(edu.institution, margin, y);

  const instWidth = doc.getTextWidth(edu.institution) + 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slate);
  doc.text(`—   ${edu.details}`, margin + instWidth, y);

  y += 11.5;
});
y += 5;

// ==========================================
// 6. CERTIFICATIONS & PUBLIC RECOGNITION
// ==========================================
addSectionHeader('Certifications & Industry Distinctions');

const certs = [
  { title: 'Oxford Editorial Institute: ', desc: 'Master Class in Narrative Architecture Certification (2024)' },
  { title: 'Nielsen Norman Group (NN/g): ', desc: 'Certified UX Content Design & Behavioral Framing Specialist (2023)' },
  { title: 'INK Global Conference: ', desc: 'Plenary Keynote Speaker — "The Anatomy of Resonant Words" to 1,200 founders (2024)' },
  { title: 'Forbes India & The Ken: ', desc: 'Featured Editorial Columnist & Essayist on Corporate Voice & Strategy (2025)' },
];

certs.forEach((c) => {
  drawBullet(margin + 4, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...primaryInk);
  doc.text(c.title, margin + 12, y);

  const tWidth = doc.getTextWidth(c.title) + 2;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slate);
  doc.text(c.desc, margin + 12 + tWidth, y);

  y += 11;
});

// Output bytes
const pdfBytes = doc.output('arraybuffer');
const buffer = Buffer.from(pdfBytes);

// Write to all target locations
[publicAssetsPath, publicRootPath, distAssetsPath].forEach((p) => {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, buffer);
  console.log('✓ Generated Ezhil Arasan Resume PDF ->', p, `(${buffer.length} bytes)`);
});
