# Executive Business & Management Portfolio Template

A production-quality, responsive executive portfolio website designed for **BBA/MBA students, business analysts, management consultants, finance & marketing professionals, corporate leaders, and entrepreneurs**.

Combines high-end SaaS aesthetics, corporate credibility, elegant typography (**Manrope** & **Inter**), subtle GSAP timeline motion, and Lenis smooth scrolling.

---

## 🌟 Key Features

- **Executive Aesthetic & Design System**: Tailored palette (`#071426` slate/navy, `#F7F9FC` background, `#145BFF` cobalt blue, `#EAF1FF` light blue), crisp typography hierarchy, soft borders, and generous whitespace.
- **Custom Animated Circle & Ring Pointer**: Minimal dual-tier cursor featuring a 7px solid circular core with rapid tracking and a 38px elastic outer follower ring with GSAP inertia, velocity-based stretch, tactile click compression, contextual labels (`VIEW`, `PDF ↓`), and dark section inversion. Auto-disabled on touch devices.
- **Smooth Scroll (Lenis + GSAP ScrollTrigger)**: Controlled, responsive smooth scrolling integrated with the GSAP ticker.
- **Top Scroll Progress Indicator**: 2px primary blue progress bar tracking scroll depth.
- **Hero Section**: 90-100vh asymmetric layout with live status badge, masked line reveals, executive portrait composition, floating KPI cards, count-up statistics, and multi-depth mouse parallax.
- **Professional Summary (About)**: Editorial typography, narrative paragraphs, and 4 structured credential blocks.
- **Business Metrics Strip**: Minimalist KPI strip (`05+ Projects`, `03 Internships`, `08+ Business Tools`, `100% Commitment`) triggered via `ScrollTrigger`.
- **Experience Timeline**: Sticky header with an active blue fill line that advances down as you scroll.
- **Education & Credentials**: Academic degree cards with diagonal arrow hover transitions.
- **Skills & Strategic Toolkit**: Categorized tabs (Business, Analytics, Leadership, Tools) with cursor-following spotlight radial highlights.
- **Featured Case Studies**: Alternating project layout with dashboard previews and an interactive **Case Study Modal** (Challenge, Research, Approach, Solution, Quantified Metrics, Learnings).
- **Business Tool Marquee**: Subtle horizontal marquee that pauses on hover and respects `prefers-reduced-motion`.
- **Achievements & Testimonials**: Compact honor cards and verified executive recommendation cards.
- **Contact Section & Footer**: Deep navy section (`#071426`) with 1-click email copy, social links, and magnetic *"Back to top ↑"*.
- **Executive CV Modal**: Interactive printable/downloadable resume modal.
- **Modular Data Architecture**: Centralized `src/data/portfolioData.js` configuration for instant personalization.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Manrope](https://fonts.google.com/specimen/Manrope) & [Inter](https://fonts.google.com/specimen/Inter)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/EXHIL6373/BUSINESS-MANAGEMENT.git

# Navigate to project directory
cd BUSINESS-MANAGEMENT

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
BUSINESS & MANAGEMENT/
├── public/
│   ├── executive_portrait.jpg
│   ├── dashboard_retail.jpg
│   └── dashboard_saas.jpg
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Achievements.jsx
│   │   ├── CaseStudyModal.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LinkedinIcon.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── MetricsStrip.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── ResumeModal.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── Skills.jsx
│   │   ├── Testimonials.jsx
│   │   └── ToolMarquee.jsx
│   ├── data/
│   │   └── portfolioData.js     <-- Personalize your portfolio here!
│   ├── hooks/
│   │   └── useLenisSmoothScroll.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 License
MIT License. Free to use for personal and commercial projects.
