# BEXO Premium Portfolio Standard — Design & Creative

A state-of-the-art, responsive design & creative executive portfolio template engineered according to the **BEXO Premium Portfolio Standard**.

Designed for **Creative Directors, Art Directors, Multidisciplinary Designers, UI/UX Architects, Brand Designers, Motion Specialists, and Creative Technologists**.

🌐 **Live Production Link**: [https://design-mu-flax.vercel.app/](https://design-mu-flax.vercel.app/)

---

## ✨ Key Features & Standard Implementation

### 1. Four Public Canonical Routes
- **Home (`index.html`)**: First-viewport communication of identity, designation, portrait frame, primary **View Selected Portfolio** CTA, conditional **Creative CV (PDF)** CTA, live availability badge, hero KPI counters, featured case study preview, and services ticker.
- **Portfolio (`pages/portfolio.html`)**: Follows the exact canonical sequence:
  1. *Identity & Profile block* (Photo, name, title, status pill, bio, and creative mission)
  2. *Skills* (`skillEntries`)
  3. *Experience* (`experienceEntries`)
  4. *Education* (`educationEntries`)
  5. *Selected Work* (`projectEntries` with interactive case study modal lightbox, tags, external links)
  6. *Certificates* (`certificateEntries`)
  7. *Achievements* (`achievementEntries`)
  8. *Research & Publications* (`researchEntries`)
- **Contact (`pages/contact.html`)**: Direct `mailto:` link, phone link, truthful `openToHire` status pill, social channels, and an interactive contact form with hidden honeypot bot trap, client validation, accessible feedback via `role="status" aria-live="polite"`, and API dispatch to `/api/profile/public/{handle}/contact`.
- **Hire Me (`pages/hire-me.html`)**: Dedicated platform handoff page dispatching to `/hire-me/{handle}`, practice pillars (Brand Strategy, UI/UX, Motion/Spatial), and direct fallback contact options.

### 2. Data Contract & Dynamic Injection
- Conforms to `window.__BEXO_PROFILE__` injection at runtime with automatic fallback to local preview data in `js/profile-data.js`.
- Strict conditional rendering: all empty collections are cleanly hidden without blank headings or layout gaps.
- Safe HTML escaping (`escapeHtml()`) protects against XSS vulnerabilities.
- Relative asset and route resolvers (`resolveAsset()`, `resolveRoute()`) ensure consistent routing from both root and subdirectories.

### 3. Visual & Interaction Architecture
- **Aesthetic**: Dark luxury editorial styling with electric lime `#C8FF00` accent glow, soft elevated cards, and high contrast typography.
- **Typography**: Google Fonts pairing of **Syne** (bold modern display headlines), **Inter** (clean functional body UI), and **Instrument Serif** (editorial flourishes).
- **Navigation**: Floating capsule navbar with active pill tracking (`aria-current="page"`), mobile drawer menu with keyboard escape trap, top scroll depth progress bar, and skip-to-content accessibility link.
- **Interactive Lightbox**: In-depth modal dialog for case studies displaying statement, challenges, strategy, quantifiable metrics, and visual artifact galleries.
- **Theme Controller**: Dark/light theme management with persistent `localStorage` support.

---

## 🛠️ Tech Stack & Tooling

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Vanilla HTML5 / ES6 JavaScript Modules | Clean, lightweight, framework-agnostic BEXO standard compliance |
| **Styling** | Vanilla CSS3 | Custom tokens, CSS custom properties, responsive grid, reduced motion support |
| **Bundler & Server** | [Vite](https://vitejs.dev/) | Multi-page Rollup builds and local HMR dev server |
| **Typography** | [Syne](https://fonts.google.com/specimen/Syne) & [Inter](https://fonts.google.com/specimen/Inter) | Google Fonts CDN |
| **PDF Engine** | [jsPDF](https://github.com/parallax/jsPDF) | High-resolution ATS-compliant A4 Executive Resume generation |
| **Testing** | [Puppeteer](https://pptr.dev/) | Headless multi-viewport responsive testing and overflow auditing |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v10+)

### Installation
```bash
# Clone the repository
git clone https://github.com/EXHIL6373/Design-Creative-Portfolio.git
cd Design-Creative-Portfolio

# Install dependencies
npm install
```

### Development
```bash
# Start local development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
# Generate optimized multi-page production bundle
npm run build

# Preview production build locally
npm run preview
```

### Automated Testing
```bash
# Run multi-viewport responsive and overflow verification
node scripts/test-all-responsive.cjs
```

---

## 📁 Canonical File Structure

```
Design-Creative-Portfolio/
├── index.html                           # Home route (Identity, CTA, Featured Teaser)
├── PORTFOLIO-STANDARD-DESIGN.html       # BEXO Canonical Implementation Handbook
├── package.json                         # Project scripts and dependencies
├── vite.config.js                       # Multi-page build configuration
├── css/
│   ├── index.css                        # Tokens, layout, navbar, hero, footer, responsive queries
│   ├── portfolio.css                    # Portfolio sections, timeline, project cards, modal
│   └── contact.css                      # Contact form, alerts, and hire-me handoff styling
├── js/
│   ├── profile-runtime.js               # window.__BEXO_PROFILE__ getter & path resolvers
│   ├── profile-data.js                  # Default local preview profile dataset (Alex Mercer)
│   ├── render.js                        # Home, Portfolio, and Hire Me data renderers
│   ├── nav.js                           # Capsule navbar, mobile drawer, scroll progress bar
│   ├── contact.js                       # Form validation, honeypot, and API dispatcher
│   ├── media.js                         # Case study modal dialog & lightbox handlers
│   └── theme.js                         # Dark / Light theme toggle & storage
├── pages/
│   ├── portfolio.html                   # Portfolio route
│   ├── contact.html                     # Contact route
│   └── hire-me.html                     # Hire Me route
├── public/
│   ├── assets/
│   │   ├── Alex_Mercer_Creative_Resume.pdf  # Generated A4 Executive Resume
│   │   ├── portrait.png                 # Creative Director portrait visual
│   │   ├── favicon.svg                  # SVG favicon
│   │   └── icons.svg                    # SVG symbols
├── scripts/
│   ├── generate-resume-pdf.cjs          # Script to generate PDF resume
│   └── test-all-responsive.cjs          # Automated responsive & overflow test script
└── src/                                 # Preserved React component assets
```

---

## ✅ Acceptance Criteria Matrix

| Criterion | Requirement | Status |
| :--- | :--- | :--- |
| **Home Hero** | Communicates identity, designation, portrait, and View Portfolio without forced scroll on mobile | ✅ Verified |
| **Resume CTA** | Appears conditionally only when `resumeUrl` exists | ✅ Verified |
| **Collections** | Supports 0, 1, or many items; empty sections hide cleanly without gaps | ✅ Verified |
| **Contact Form** | Client-side validation for required fields, honeypot bot trap, accessible `aria-live` state | ✅ Verified |
| **Hire Me** | Single platform handoff to `/hire-me/{handle}` with fallback contact links | ✅ Verified |
| **Responsive** | Zero horizontal overflow at 320px, 375px, 768px, and desktop viewports | ✅ Verified (0px) |
| **SEO & A11y** | Single `<h1>` per page, descriptive titles, skip-to-content link, `aria-current="page"` | ✅ Verified |
| **Data Override**| Production injected `window.__BEXO_PROFILE__` seamlessly overrides local preview data | ✅ Verified |
| **Console Health**| Zero runtime errors or missing module exceptions | ✅ 0 Errors |

---

## 📄 License

MIT © [Ezhil Raj](https://github.com/EXHIL6373) / ACE Digitals — BEXO Template Wars 2026.
