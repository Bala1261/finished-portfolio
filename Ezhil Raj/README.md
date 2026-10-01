# Template 03 — Content & Professional Portfolio

A premium, production-quality editorial publishing and professional identity platform.

Designed specifically for **Content Strategists, Writers, Consultants, Thought Leaders, Educators, and Creators**.

Unlike corporate dashboards or minimal CV resumes, this template treats your ideas, writing, and professional perspective as the centerpiece of your digital presence.

---

## 🎨 Design Philosophy & Aesthetic

* **Editorial + Warm + Intelligent + Personal + Sophisticated**
* **Palette:**
  * Background: `#F7F4EE` (Warm Cream)
  * Primary Text: `#171717` (Deep Ink)
  * Secondary Text: `#66615B` (Warm Slate)
  * Accent: `#C75B32` (Warm Terracotta / Sienna)
  * Card Surfaces: `#FFFFFF`
  * Borders: `rgba(23, 23, 23, 0.12)`
* **Typography Hierarchy:**
  * **Display & Editorial Headings:** *DM Serif Display* & *Instrument Serif* (magazine cover clamp scales)
  * **Body Copy & UI:** *Inter* & *Manrope* (optimized for long-form readability)

---

## ✨ Features

1. **Editorial Hero Section:**
   * Oversized magazine typography with line reveals
   * Asymmetric portrait showcase with subtle grain & metadata tags
   * 4 Configurable Modes: `portrait`, `textFirst`, `contentFirst`, `quoteFirst`
2. **Scroll-Linked Manifesto:**
   * Words transition from muted to active/accent color as the user scrolls into view.
3. **Interactive Editorial Cursor & Previews:**
   * Custom cursor morphing into `READ →`, `VIEW →`, `LET'S TALK`, and `OPEN ↗`.
   * Floating inertia thumbnail preview on link/card hover.
4. **Interactive Parallax Quote:**
   * Subtle mouse-reactive word shifts ("THINK CLEARLY. CREATE BOLDLY.").
5. **Featured Writing & Essays:**
   * Magazine-style large featured article layout.
   * Editorial category filters (`ALL`, `BUSINESS`, `STRATEGY`, `PERSONAL BRAND`, `INSIGHTS`).
   * Complete in-app **Article Reading Experience** with top reading progress indicator, pull quotes, and next essay navigation.
6. **Selected Case Studies:**
   * Numbered editorial project breakdowns (01, 02, 03).
   * Interactive modal with Challenge, Strategic Approach, and Measurable Outcomes.
7. **Capabilities & Services:**
   * Clean row interactions with hover offsets, deliverable tag pills, and inquiry triggers.
8. **Track Record & Proof:**
   * Editorial stat counters with smooth viewport entrance count-up animations.
9. **Personal Story & Guiding Principles:**
   * Editorial two-column biographical narrative and core beliefs.
10. **Career Timeline:**
    * Chronological timeline highlighting career milestones with active year states.
11. **Testimonials & Endorsements:**
    * Prominent quotes with smooth slider controls.
12. **Weekly Dispatch Newsletter:**
    * Warm editorial subscription box with instant confirmation.
13. **Direct Contact & Inquiry Dialogue:**
    * Interactive modal for project inquiries and cal.com calendar booking.
14. **Profile Switcher:**
    * Floating control bar to preview different professional modes (`Writer`, `Consultant`, `Content Creator`, `Personal Brand`).

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* npm

### Installation

```bash
# Clone the repository
git clone https://github.com/EXHIL6373/CONTENT-PROFESSIONAL.git

# Navigate to project directory
cd CONTENT-PROFESSIONAL

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## ⚙️ Configuration

All personal data, articles, projects, services, and theme settings are managed in a single file:

`src/data/portfolioData.js`

```javascript
export const portfolioData = {
  profileType: 'personalBrand', // 'writer' | 'consultant' | 'contentCreator' | 'personalBrand'
  theme: {
    accent: '#C75B32',
    background: '#F7F4EE',
    primary: '#171717',
    secondary: '#66615B',
  },
  personal: {
    name: 'Your Name',
    tagline: 'Writer · Strategist · Consultant',
    // ...
  },
  // ...
};
```

---

## 📄 License

MIT
