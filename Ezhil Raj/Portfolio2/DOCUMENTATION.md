# Executive Business & Management Portfolio Template — Complete Documentation

A modern, production-grade executive portfolio designed for **BBA/MBA graduates, Business Analysts, Management Consultants, Finance Specialists, Marketing Strategists, HR Executives, Entrepreneurs, and Corporate Leaders**.

---

## 📑 Table of Contents
1. [Overview & Design Philosophy](#1-overview--design-philosophy)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project Structure](#3-project-structure)
4. [Customization Guide (`portfolioData.js`)](#4-customization-guide-portfoliodatajs)
5. [Key Components & Features](#5-key-components--features)
6. [Animation & Motion Architecture](#6-animation--motion-architecture)
7. [Design Tokens & Styling](#7-design-tokens--styling)
8. [Responsive Breakpoints](#8-responsive-breakpoints)
9. [Running & Deployment](#9-running--deployment)

---

## 1. Overview & Design Philosophy

Unlike typical software engineering portfolios, an **Executive Business Portfolio** must communicate:
- **Corporate Credibility**: High-end typography, controlled contrast, and data-driven clarity.
- **Strategic Impact**: Focus on revenue growth, operational efficiency, cost reduction, and working capital optimization rather than just code snippets.
- **Analytical Mastery**: Showcases business intelligence dashboards (Power BI, Tableau, SQL, Excel) and structured problem-solving frameworks (MECE, Pyramid Principle).
- **Subtle Modern Interaction**: Two-tier custom cursor, 3D card parallax on mouse movement, Lenis smooth scrolling, and scroll-synchronized timelines.

---

## 2. Tech Stack & Dependencies

| Tool / Library | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 19.x | Component-based UI library |
| **Vite** | 8.x | High-performance build tool and local dev server |
| **Tailwind CSS** | 3.4.x | Utility-first CSS framework with tailored tokens |
| **GSAP** | 3.14.x | Timeline orchestration and scroll animations |
| **GSAP ScrollTrigger** | 3.14.x | Viewport-driven triggers and timeline progress fill |
| **Lenis** | 1.1.x | Controlled smooth scrolling engine |
| **Lucide React** | 1.x | Clean, consistent vector icons |
| **Google Fonts** | CDN | **Manrope** (Headings) + **Inter** (Body/UI) |

---

## 3. Project Structure

```
BUSINESS & MANAGEMENT/
├── public/
│   ├── executive_portrait.jpg     # High-res studio portrait
│   ├── dashboard_retail.jpg       # Retail inventory analytics dashboard preview
│   └── dashboard_saas.jpg         # SaaS metric & cohort retention dashboard preview
├── src/
│   ├── components/
│   │   ├── About.jsx              # Editorial narrative with 4 info blocks
│   │   ├── Achievements.jsx       # 2x3 balanced distinction cards with 3D tilt
│   │   ├── CaseStudyModal.jsx     # Deep-dive case study modal dialog
│   │   ├── Contact.jsx            # Dark navy CTA block with 1-click email copy
│   │   ├── CustomCursor.jsx       # 2-tier cursor (dot + elastic ring with labels)
│   │   ├── Education.jsx          # Academic degrees & certifications with 3D tilt
│   │   ├── Experience.jsx         # Vertical timeline with scroll-fill blue line
│   │   ├── Footer.jsx             # Minimal brand footer + magnetic "Back to top"
│   │   ├── Hero.jsx               # Asymmetric layout, stats counter, mouse parallax
│   │   ├── LinkedinIcon.jsx       # Scalable vector LinkedIn icon
│   │   ├── MagneticButton.jsx     # Elastic magnetic button with hover spring
│   │   ├── MetricsStrip.jsx       # 4-column KPI counter strip
│   │   ├── Navbar.jsx             # Sticky translucent navbar with active section spy
│   │   ├── Projects.jsx           # Alternating case studies with "VIEW" cursor
│   │   ├── ResumeModal.jsx        # ATS-compliant executive CV modal with 1-click PDF download & @media print
│   │   ├── ScrollProgress.jsx     # 2px top scroll depth bar
│   │   ├── SectionHeading.jsx     # Uniform typography headings with badge pills
│   │   ├── Skills.jsx             # 4-category filterable cards with cursor spotlight
│   │   ├── Testimonials.jsx       # Executive endorsements & recommendation quotes
│   │   └── ToolMarquee.jsx        # Continuous subtle tool marquee
│   ├── data/
│   │   └── portfolioData.js       # Central data source for all portfolio content
│   ├── hooks/
│   │   └── useLenisSmoothScroll.js# Lenis + GSAP ScrollTrigger bridge
│   ├── App.jsx                    # Root page assembly
│   ├── index.css                  # Global styles, Tailwind directives, Lenis CSS
│   └── main.jsx                   # React entry point
├── index.html                     # HTML shell, font links, and SEO tags
├── package.json                   # Scripts and project dependencies
├── tailwind.config.js             # Color palette, font definitions, and extensions
├── vite.config.js                 # Vite bundler configuration
└── README.md                      # Quickstart documentation
```

---

## 4. Customization Guide (`portfolioData.js`)

All portfolio content is decoupled in [`src/data/portfolioData.js`](file:///c:/Users/ELCOT/Desktop/freelance/Templates/BUSINESS%20&%20MANAGEMENT/src/data/portfolioData.js). To customize this template for a specific professional or student, simply update the export object:

### 4.1 Personal Info & Hero Stats
```javascript
export const portfolioData = {
  personal: {
    name: "Your Name",
    role: "Management Consultant / Business Analyst",
    badge: "AVAILABLE FOR OPPORTUNITIES",
    headline: "Business decisions.\nBacked by insight.",
    tagline: "I combine business thinking, analytical skills and practical execution...",
    location: "New York & Remote",
    email: "your.email@gmail.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    heroStats: [
      { value: 5, suffix: "+", label: "Strategic Projects" },
      { value: 3, suffix: "", label: "Corporate Internships" },
      { value: 92, suffix: "%", label: "Project Success" },
    ],
    currentFocus: {
      tag: "Current Focus",
      title: "Business & Predictive Analytics",
      sub: "Forecasting, Unit Economics & BI",
    }
  },
  // ...
};
```

### 4.2 Adding a New Case Study
In `portfolioData.projects`, add an object with the required case study fields:
```javascript
{
  id: "05",
  title: "Supply Chain Network Optimization",
  category: "Operations & Logistics",
  tagline: "Reducing distribution lead time by 4.2 days across 18 regional hubs.",
  description: "Modeled linear optimization in Python and Excel to consolidate freight routes...",
  tools: ["Python", "Excel Solver", "Power BI", "SQL"],
  metrics: [
    { label: "Cost Savings", value: "$1.8M" },
    { label: "Lead Time Reduction", value: "-22%" },
    { label: "On-Time Delivery", value: "98.4%" }
  ],
  caseStudy: {
    challenge: "...",
    research: "...",
    approach: "...",
    solution: "...",
    toolsUsed: ["..."],
    results: ["..."],
    learnings: "..."
  }
}
```

---

## 5. Key Components & Features

### 5.1 Custom Smooth Circle & Ring Cursor (`CustomCursor.jsx`)
- **Dual-Tier Geometry**:
  - **Precision Inner Dot**: 7px solid circular core with ultra-responsive GSAP `quickTo` tracking (`duration: 0.05, ease: 'power3.out'`) in cobalt `#145BFF` (or white glow in dark sections).
  - **Elastic Trailing Ring**: 38px circular follower with smooth inertia lag (`duration: 0.18, ease: 'power2.out'`), subtle border, and translucent fill.
- **Dynamic Velocity Stretch**:
  - Analyzes directional movement vector during quick sweeps, organically stretching the outer ring along the travel axis (up to 1.45×) and squashing perpendicularly (down to 0.75×).
  - Springs back into a perfect circular ring with elastic damping when movement eases.
- **Contextual States & Feedback**:
  - `button, a, .magnetic-btn, [data-cursor="pointer"]`: Outer ring expands by 1.55× while inner dot contracts to 0.6× for subtle focus.
  - `[data-cursor="view"]`: Ring expands to 2.2× featuring a clean `"VIEW"` text badge while the dot gracefully transitions out.
  - `[data-cursor="resume"]`: Ring expands with `"PDF ↓"` indicator for executive document downloads.
  - **Tactile Click Response**: Compresses ring to 0.85× on `mousedown` and pops back on `mouseup`.
  - `[data-cursor-dark]`: Seamlessly switches to pure white core with luminous ring across dark sections.
  - **Auto-Disabled**: Disabled on touchscreens and mobile devices (`pointer: coarse` or `< 1024px`).

### 5.2 Interactive Case Study Modal (`CaseStudyModal.jsx`)
- Opens full-viewport overlay when clicking `"View Case Study"` on any project card.
- Displays structured executive breakdown:
  - **The Business Challenge** (Rose accent)
  - **Empirical Research & Data** (Amber accent)
  - **Strategic Approach** (Cobalt accent)
  - **Implementation & Solution** (Emerald accent)
  - **Quantified Commercial Outcomes** ($ freed, % improved)
  - **Executive Governance Learnings** (Callout quote)
- Supports `Escape` key close, backdrop dismiss, and body scroll lock.

### 5.3 Interactive Skills Spotlight (`Skills.jsx`)
- Divided into 4 strategic categories:
  1. **Business Strategy** (Growth vector modeling, GTM, TAM/SAM, DCF modeling)
  2. **Data & Analytics** (Power BI, DAX, SQL, Tableau, Python, Cohort models)
  3. **Executive Leadership** (C-Suite presentation, MECE problem solving, negotiation)
  4. **Enterprise Tools** (PowerPoint pyramid decks, Notion, Jira, Figma, dbt)
- Dynamic spotlight gradient follows cursor position inside each card via CSS custom properties (`--mouse-x`, `--mouse-y`).

### 5.4 Experience Timeline with Scroll Fill (`Experience.jsx`)
- Left column remains sticky while user scrolls through the timeline.
- A vertical line connects each experience node and gradually fills in primary blue (`#145BFF`) based on scroll depth via GSAP ScrollTrigger.
- Current/active role receives an emerald live beacon.

---

## 6. Animation & Motion Architecture

- **Lenis Smooth Scroll**: Initializes in `useLenisSmoothScroll.js` with duration `1.15s` and exponential easing, updating ScrollTrigger on every tick.
- **Hero Entrance Timeline**: Runs sequentially in ~1.5s:
  1. Status badge reveals
  2. Heading masked reveal line-by-line
  3. Supporting paragraph fades up
  4. CTA buttons reveal
  5. Portrait scales from 0.95 → 1.0
  6. Floating KPI cards stagger into view
  7. Number counters animate from 0 to target values
- **Mouse Parallax**: Hero elements react subtly to mouse position (portrait ±6px, background glow ±10px, cards ±15px).
- **3D Card Tilt**: Project visual cards, education cards, and about info blocks tilt along the X and Y axes on mouse movement using CSS `perspective(800px)`.
- **Marquee Continuous Ticker**: Pure CSS `@keyframes marquee` running at 35s per loop, pauses on hover, and deactivates when `prefers-reduced-motion` is enabled.

---

## 7. Design Tokens & Styling

### Color System
```css
--canvas-bg:      #F7F9FC;  /* Soft executive light canvas */
--dark-navy:      #071426;  /* Deep slate corporate dark */
--primary-blue:   #145BFF;  /* High-energy electric cobalt */
--secondary-blue: #3278FF;  /* Midtone blue for accents & hover */
--light-blue:     #EAF1FF;  /* Soft tint for badges and icons */
--text-primary:   #101828;  /* Crisp dark text */
--text-muted:     #667085;  /* Secondary slate text */
--border-subtle:  rgba(16, 24, 40, 0.08); /* 1px clean borders */
```

### Typography Hierarchy
- **Headings**: `font-heading` (`Manrope`, 500/600/700/800)
  - Hero Title: `4xl` (mobile) to `68px` (desktop)
  - Section Headings: `3xl` to `5xl`
  - Card Titles: `lg` to `2xl`
- **Body & Data**: `font-sans` (`Inter`, 400/500/600)
  - Body Copy: `16px` – `18px`
  - Metric Values: `2xl` to `6xl` font-extrabold
  - Meta/Tags: `11px` – `13px` font-medium

---

## 8. Responsive Breakpoints

| Breakpoint | Screen Size | Layout Adjustments |
| :--- | :--- | :--- |
| **Mobile (`<640px`)** | 390px – 430px | 1-column layouts, mobile navigation drawer, natural touch scrolling, custom cursor hidden |
| **Tablet (`640px–1024px`)** | 768px – 1024px | 2-column metrics and skills grid, responsive timeline padding |
| **Desktop (`1024px–1440px`)** | 1024px – 1440px | 12-column grid, sticky timeline title, interactive mouse parallax and 3D card tilt |
| **Large Desktop (`>1440px`)** | 1920px | Centered content container with `max-w-content: 1320px` and ~80px horizontal gutters |

---

## 9. Running & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server opens at: http://127.0.0.1:5173/
```

### Production Build
```bash
# Build optimized bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel / Netlify / GitHub Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: `18.x` or `20.x`
