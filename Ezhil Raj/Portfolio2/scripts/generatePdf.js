import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4',
});

// A4 Dimensions in points: 595.28 x 841.89
const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 38; // 38pt margins
const contentWidth = pageWidth - margin * 2; // 519.28 pt
const rightEdge = margin + contentWidth;

// Corporate Executive Color Tokens
const navy = [7, 20, 38]; // #071426 Deep corporate dark
const cobalt = [20, 91, 255]; // #145BFF Electric cobalt accent
const darkText = [16, 24, 40]; // #101828 High contrast headers
const bodyText = [52, 64, 84]; // #344054 Crisp readable body
const mutedText = [102, 112, 133]; // #667085 Slate secondary
const ruleGray = [226, 232, 240]; // #E2E8F0 Subtle divider rule

// Helper to draw clean vector bullet circles
function drawBullet(x, y) {
  doc.setFillColor(...cobalt);
  doc.circle(x, y - 2.8, 1.4, 'F');
}

// ==========================================
// 1. CANDIDATE HEADER
// ==========================================
let y = 38;

doc.setFont('helvetica', 'bold');
doc.setFontSize(23);
doc.setTextColor(...navy);
doc.text('DAVID VANCE', margin, y);

y += 18;
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...cobalt);
doc.text('SENIOR BUSINESS ANALYST & STRATEGY CONSULTANT', margin, y);

y += 15;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.8);
doc.setTextColor(...bodyText);
const contactParts = [
  'New York, NY',
  'david.vance.biz@gmail.com',
  '+1 (555) 234-8901',
  'linkedin.com/in/davidvance-consulting',
];
doc.text(contactParts.join('   •   '), margin, y);

// Divider line under header
y += 11;
doc.setDrawColor(...cobalt);
doc.setLineWidth(1.6);
doc.line(margin, y, margin + 46, y);
doc.setDrawColor(...ruleGray);
doc.setLineWidth(0.6);
doc.line(margin + 46, y, rightEdge, y);
y += 17;

// Section Header Helper with balanced vertical spacing
function addSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8);
  doc.setTextColor(...navy);
  doc.text(title.toUpperCase(), margin, y);

  y += 4;
  doc.setDrawColor(...cobalt);
  doc.setLineWidth(1.3);
  doc.line(margin, y, margin + 34, y);
  doc.setDrawColor(...ruleGray);
  doc.setLineWidth(0.5);
  doc.line(margin + 34, y, rightEdge, y);
  y += 13;
}

// ==========================================
// 2. EXECUTIVE SUMMARY
// ==========================================
addSectionHeader('Executive Summary');

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.8);
doc.setTextColor(...bodyText);
const summaryText =
  'Results-driven Senior Business Analyst and Strategy Consultant with 3+ years of experience leading corporate finance evaluations, operational due diligence, unit-economics restructuring, and enterprise BI dashboard architectures. Proven track record synthesizing multi-million-dollar datasets into actionable C-suite board memos, delivering $6M+ in bottom-line optimization and working capital release across private equity, fintech, and omnichannel retail portfolios.';
const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
doc.text(summaryLines, margin, y, { lineHeightFactor: 1.34 });
y += summaryLines.length * 11.8 + 15;

// ==========================================
// 3. CORE COMPETENCIES & TOOLKIT
// ==========================================
addSectionHeader('Core Competencies & Toolkit');

const competencies = [
  {
    category: 'Strategic & Financial Modeling:',
    skills: 'DCF Valuation, 3-Statement Forecasting, LBO, Scenario Sensitivity, Unit Economics',
  },
  {
    category: 'Business Intelligence & Data:',
    skills: 'Power BI (DAX, Dataflows), Tableau, SQL (Snowflake/PostgreSQL), Python (Pandas/NumPy)',
  },
  {
    category: 'Problem-Solving & Governance:',
    skills: 'MECE Framework, Pyramid Principle Decks, Commercial Due Diligence, Agile Scrum',
  },
  {
    category: 'Enterprise Tools & Platforms:',
    skills: 'Advanced Excel (VBA/Solver), Capital IQ, PitchBook, Jira, Salesforce CRM, dbt',
  },
];

// Fixed-column alignment: categories left-aligned, all skill lists starting at exact same X offset
const col1Width = 148;
competencies.forEach((c) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.7);
  doc.setTextColor(...darkText);
  doc.text(c.category, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.7);
  doc.setTextColor(...bodyText);
  doc.text(c.skills, margin + col1Width, y);

  y += 14.5;
});
y += 10;

// ==========================================
// 4. PROFESSIONAL EXPERIENCE
// ==========================================
addSectionHeader('Professional Experience');

const experiences = [
  {
    role: 'Strategic Business Analyst',
    company: 'Apex Advisory Partners',
    location: 'New York, NY',
    period: '2025 - Present',
    bullets: [
      'Spearheaded operational due diligence and unit-economic restructuring for mid-market B2B portfolio companies, shaving 25 hours off monthly reporting cycles.',
      'Synthesized $42M SKU profitability matrix for consumer portfolio brand, identifying $1.8M in unprofitable inventory and recommending immediate rationalization.',
      'Constructed automated DCF and dynamic LBO underwriting models used directly in partner investment committee reviews.',
    ],
  },
  {
    role: 'Strategy & Operations Intern',
    company: 'Meridian Global FinTech',
    location: 'Boston, MA',
    period: '2024 - 2025',
    bullets: [
      'Conducted churn cohort analysis across 140,000+ active SMB accounts; engineered targeted retention hypotheses lifting 60-day customer retention by 4.2%.',
      'Built automated daily funnel telemetry and executive cockpits in Tableau and Snowflake, streamlining customer onboarding friction points.',
      'Authored market sizing and GTM expansion deck presented to Head of International Strategy, paving entry into UK commercial market.',
    ],
  },
  {
    role: 'Management Consultant Associate',
    company: 'Northbridge Management Group',
    location: 'Chicago, IL',
    period: '2023 - 2024',
    bullets: [
      'Advised enterprise retail clients on supply chain logistics consolidation; designed cost-allocation models in Excel/VBA identifying $3.4M in duplicate freight spend.',
      'Modeled multi-facility warehousing scenarios across 7 regional distribution hubs, reducing average delivery lead times by 1.8 business days.',
      'Facilitated 15+ cross-functional discovery workshops across VP and director tiers to align KPIs and operational roadmaps.',
    ],
  },
  {
    role: 'Junior Financial & Market Analyst',
    company: 'Vanguard Commercial Analytics',
    location: 'New York, NY',
    period: '2022 - 2023',
    bullets: [
      'Monitored macroeconomic indices, sector earnings trends, and competitor benchmarking reports feeding weekly investment committee memos.',
      'Engineered automated financial statement scraping pipelines in Python, saving 12 analyst hours weekly and eliminating manual data entry errors.',
    ],
  },
];

experiences.forEach((exp, idx) => {
  // Role & Company on left
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.3);
  doc.setTextColor(...darkText);
  doc.text(exp.role, margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...cobalt);
  const roleWidth = doc.getTextWidth(exp.role) + 4;
  doc.text(`|  ${exp.company}`, margin + roleWidth, y);

  // Right-aligned Location & Period
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(...mutedText);
  const metaText = `${exp.location}   •   ${exp.period}`;
  const metaWidth = doc.getTextWidth(metaText);
  doc.text(metaText, rightEdge - metaWidth, y);

  y += 12;

  // Bullets with clean hanging indent
  exp.bullets.forEach((b) => {
    drawBullet(margin + 5, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(...bodyText);
    const bLines = doc.splitTextToSize(b, contentWidth - 16);
    doc.text(bLines, margin + 14, y, { lineHeightFactor: 1.28 });
    y += bLines.length * 10.6 + 2.5;
  });

  y += (idx === experiences.length - 1 ? 6 : 8);
});
y += 9;

// ==========================================
// 5. EDUCATION & ACADEMIC HONORS
// ==========================================
addSectionHeader('Education & Academic Honors');

const education = [
  {
    degree: 'Master of Business Administration (MBA)',
    period: '2024 - 2026',
    institution: 'NYU Stern School of Business',
    details: 'Strategy & Business Analytics   •   GPA: 3.92 / 4.00   •   Dean\'s Honor List',
  },
  {
    degree: 'Bachelor of Business Administration (BBA)',
    period: '2019 - 2023',
    institution: 'Baruch College, Zicklin School of Business',
    details: 'Finance & Quantitative Economics   •   GPA: 3.88 / 4.00   •   Summa Cum Laude',
  },
];

education.forEach((edu, idx) => {
  // Row 1: Degree on left, Period on right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.3);
  doc.setTextColor(...darkText);
  doc.text(edu.degree, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(...mutedText);
  const pWidth = doc.getTextWidth(edu.period);
  doc.text(edu.period, rightEdge - pWidth, y);

  y += 12;

  // Row 2: Institution in cobalt, followed by details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...cobalt);
  doc.text(edu.institution, margin, y);

  const instWidth = doc.getTextWidth(edu.institution) + 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...bodyText);
  doc.text(`—   ${edu.details}`, margin + instWidth, y);

  y += (idx === education.length - 1 ? 14 : 12);
});
y += 6;

// ==========================================
// 6. CERTIFICATIONS & LEADERSHIP
// ==========================================
addSectionHeader('Certifications & Leadership Distinctions');

const certs = [
  { title: 'CFA Institute: ', desc: 'Passed CFA Level I Examination (Top 10th Percentile Global Scoring)' },
  { title: 'Microsoft Certified: ', desc: 'Power BI Data Analyst Associate (Exam PL-300 Certification)' },
  { title: 'Case Competition: ', desc: '1st Place Champion — National Inter-Collegiate MBA Management Case Competition (2025)' },
  { title: 'Executive Education: ', desc: 'Reforge Growth Strategy & Unit Economics Certified Executive Program (2024)' },
];

certs.forEach((c) => {
  drawBullet(margin + 5, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkText);
  doc.text(c.title, margin + 14, y);

  const tWidth = doc.getTextWidth(c.title) + 2;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...bodyText);
  doc.text(c.desc, margin + 14 + tWidth, y);

  y += 13.5;
});

const outputPath = path.resolve(__dirname, '../public/David_Vance_Executive_Resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
console.log('Successfully generated perfectly aligned resume at:', outputPath);
