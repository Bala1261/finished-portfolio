# Developer Premium — BEXO Portfolio Template

> **Template ID**: `developer-premium`  
> **Renderer Kind**: `bexo-web`  
> **Schema Version**: `bexo-portfolio/v1`

A production-ready, dark-first engineering portfolio template built for the **BEXO** platform. Inspired by the refined, high-performance aesthetics of Linear, Raycast, and Vercel, this template communicates elite technical depth, systems craftsmanship, and credible impact.

---

## 1. Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite 5
- **Icons**: Lucide Icons & clean inline SVGs
- **Styling**: Vanilla CSS Design Tokens (CSS Variables) — no bulky CSS utility frameworks or heavy runtimes
- **Typography**: Geist / Inter modern developer typography with monospace accents

---

## 2. Architecture & Data Flow

This template is strictly presentation-tier. It receives a canonical `portfolio` object from BEXO and renders the UI deterministically:

```
BEXO Injected Data (window.__BEXO_PORTFOLIO__ or props)
                         ↓
            src/data/portfolio.ts (Adapter)
                         ↓
            Typed Component Tree (React + CSS Tokens)
                         ↓
            Responsive, Accessible Portfolio UI
```

### What this template controls:
- Visual design, theme tokens, typography, layouts
- Grid and timeline presentations
- Interactive modals (Project details, media preview)
- Responsive mobile navigation and compact-on-scroll header
- Empty state handling and graceful section degradation

### What this template DOES NOT control:
- No database connections or Supabase clients
- No authentication or authorization flows
- No remote backend services or data fetchers
- No proprietary API calls or second schemas

---

## 3. Supported BEXO Data Contract

The template implements the official BEXO Data Contract v1:

- `portfolio.profile`: `name`, `handle`, `headline`, `avatar`, `careerGoal`, `openToHire`
- `portfolio.summary`: `text`
- `portfolio.about`: `currentStatus`
- `portfolio.education[]`: `id`, `institution`, `degree`, `dates`, `grade`
- `portfolio.experience[]`: `id`, `company`, `role`, `dates`, `description`, `responsibilities`, `location`
- `portfolio.projects[]`: `id`, `title`, `description`, `category`, `technologies`, `role`, `date`, `dateLabel`, `assets`, `links`, `credits`
- `portfolio.certificates[]`: `id`, `title`, `issuer`, `date`, `dateLabel`, `credentialUrl`, `assets`
- `portfolio.achievements[]`: `id`, `title`, `organization`, `project`, `date`, `dateLabel`, `assets`
- `portfolio.research[]`: `id`, `title`, `authors`, `publication`, `date`, `dateLabel`, `assets`, `links`
- `portfolio.skills[]`: `id`, `name`, `category` (dynamically categorized)
- `portfolio.contact`: `email`, `links[]`
- `portfolio.resume`: string URL or `PortfolioAsset`

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm / yarn

### Installation
```bash
npm install
```

### Running Locally (Development Mode)
```bash
npm run dev
```
In development mode, a bottom toolbar allows switching between representative test fixtures:
1. **Alex Morgan (Full Profile)**: Comprehensive profile with all sections populated.
2. **Minimal Profile**: Verifies that empty sections hide cleanly without rendering broken frames or empty headings.
3. **Edge Cases**: 15+ projects, missing assets, long names, and edge-case text wrapping.

### Production Build
```bash
npm run build
```
Generates optimized, tree-shaken static assets in `dist/`.

---

## 5. Asset Handling

Assets in `portfolio.projects`, `portfolio.certificates`, `portfolio.achievements`, and `portfolio.research` can have `kind: "image" | "pdf" | "video"`.
- **`image`**: Rendered with responsive aspect ratios (`16/9`, `1/1`), lazy loading, and error fallbacks.
- **`pdf`**: Rendered as an accessible document badge displaying file name, size, and secure link.
- **`video`**: Rendered with HTML5 native video player and accessibility metadata.

---

## 6. Empty Data System

Every section and field enforces strict null safety:
- If `portfolio.experience` is empty or undefined, the entire experience timeline is omitted.
- If `portfolio.projects` is empty, the project grid and project links are omitted.
- Missing avatars fallback to developer initials.
- Missing project images fallback to clean abstract placeholder cards with asset titles.
- Broken URLs or javascript pseudo-protocols are stripped by `src/utils/safeUrl.ts`.

---

## 7. Manifest Declaration

See `manifest.json` for template metadata, supported sections, and capability flags.
