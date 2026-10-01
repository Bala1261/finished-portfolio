const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const publicAssetsDir = path.resolve(__dirname, '../public/assets');
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const publicAssetsPath = path.resolve(__dirname, '../public/assets/Alex_Mercer_Creative_Resume.pdf');
const publicRootPath = path.resolve(__dirname, '../public/Alex_Mercer_Creative_Resume.pdf');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4',
});

const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt
const margin = 38;
const contentWidth = pageWidth - margin * 2;
const rightEdge = pageWidth - margin;

// Colors
const primaryInk = [15, 20, 26]; // #0f141a
const accentColor = [160, 210, 0]; // refined neon lime
const mutedSlate = [95, 105, 115];
const lightBorder = [220, 225, 230];

// Top accent bar
doc.setFillColor(180, 230, 20);
doc.rect(margin, 30, contentWidth, 3, 'F');

// Header
let y = 60;
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...primaryInk);
doc.text('ALEX MERCER', margin, y);

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(110, 150, 0);
const roleText = 'CREATIVE DIRECTOR & DESIGNER';
const roleWidth = doc.getTextWidth(roleText);
doc.text(roleText, rightEdge - roleWidth, y);

y += 18;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...mutedSlate);
const contactLine = 'New York, NY  •  hello@alexmercer.design  •  +1 (555) 234-8901  •  alexmercer.design';
doc.text(contactLine, margin, y);

y += 14;
doc.setDrawColor(...lightBorder);
doc.setLineWidth(0.8);
doc.line(margin, y, rightEdge, y);

// Summary Section
y += 20;
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...primaryInk);
doc.text('EXECUTIVE PROFILE', margin, y);

y += 14;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...mutedSlate);
const summaryText = 'Award-winning Creative Director & Multidisciplinary Designer with 10+ years of expertise shaping digital brand identities, interactive product experiences, and spatial motion narratives for global technology leaders and cultural institutions.';
const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
doc.text(splitSummary, margin, y);
y += splitSummary.length * 13 + 8;

// Experience Section
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...primaryInk);
doc.text('EXPERIENCE', margin, y);

y += 16;
const experiences = [
  {
    role: 'Creative Director',
    company: 'Studio Volta — New York, NY',
    period: '2024 — Present',
    bullets: [
      'Lead design vision and creative strategy across luxury technology and spatial computing clients.',
      'Direct multidisciplinary teams spanning 3D interactive, generative art, and brand systems.',
      'Achieved 140% growth in design agency retainers and won D&AD Yellow Pencil 2026.'
    ]
  },
  {
    role: 'Senior Product Designer',
    company: 'Linear — Remote',
    period: '2021 — 2024',
    bullets: [
      'Orchestrated UI/UX systems and micro-interaction design for 250,000+ daily active engineering users.',
      'Pioneered dark-mode design ergonomics and key interaction primitives reducing task latency by 22%.'
    ]
  },
  {
    role: 'Lead UX Designer',
    company: 'Figma — San Francisco, CA',
    period: '2019 — 2021',
    bullets: [
      'Spearheaded canvas collaboration tools and spatial prototype workflows.',
      'Conducted multi-market design research with over 40 global enterprise design teams.'
    ]
  },
  {
    role: 'Visual Designer',
    company: 'Pentagram — New York, NY',
    period: '2017 — 2019',
    bullets: [
      'Designed bespoke typography, publication layouts, and environmental branding installations.',
      'Recognized by AIGA Eye on Design and Type Directors Club.'
    ]
  }
];

experiences.forEach(exp => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryInk);
  doc.text(exp.role, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...mutedSlate);
  const periodW = doc.getTextWidth(exp.period);
  doc.text(exp.period, rightEdge - periodW, y);

  y += 12;
  doc.setFont('helvetica', 'italic');
  doc.text(exp.company, margin, y);

  y += 11;
  doc.setFont('helvetica', 'normal');
  exp.bullets.forEach(b => {
    doc.text('•', margin + 6, y);
    const bLines = doc.splitTextToSize(b, contentWidth - 18);
    doc.text(bLines, margin + 18, y);
    y += bLines.length * 11 + 2;
  });
  y += 6;
});

// Education & Distinction
y += 6;
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...primaryInk);
doc.text('EDUCATION & AWARDS', margin, y);

y += 16;
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.text('Master of Fine Arts (MFA) in Graphic & Interactive Design', margin, y);
doc.setFont('helvetica', 'normal');
doc.text('Rhode Island School of Design (RISD) • 2017', margin, y + 11);

doc.setFont('helvetica', 'bold');
doc.text('Bachelor of Arts (BA) in Visual Communication', margin + 260, y);
doc.setFont('helvetica', 'normal');
doc.text('Parsons School of Design • 2015', margin + 260, y + 11);

y += 28;
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...primaryInk);
doc.text('CORE COMPETENCIES & CREATIVE TOOLKIT', margin, y);

y += 14;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...mutedSlate);
doc.text('Design Systems  •  Brand Identity  •  UI/UX Prototyping  •  Creative Direction  •  3D & Motion (GLSL, Three.js, Cinema 4D)', margin, y);
y += 12;
doc.text('Figma, After Effects, WebGL, Creative Code, Typography, Editorial Art Direction, Spatial Design', margin, y);

// Footer
doc.setDrawColor(...lightBorder);
doc.line(margin, pageHeight - 35, rightEdge, pageHeight - 35);
doc.setFontSize(8);
doc.text('Official BEXO Verified Profile — Alex Mercer (alexmercer.design)', margin, pageHeight - 22);

const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(publicAssetsPath, Buffer.from(pdfBytes));
fs.writeFileSync(publicRootPath, Buffer.from(pdfBytes));
console.log('PDF generated successfully at:', publicAssetsPath);
