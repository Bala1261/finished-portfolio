# Neural Field — Priyadharshan R

An interactive 3D portfolio built for BEXO Template Wars. A breathing wireframe
core sits at the centre of the scene; six project nodes orbit it, each tied to
a project card in the page below. Hovering a card highlights its node in the
3D field, and hovering a node in the field surfaces its name.

**Live demo:** _add your deployed URL here_

## Highlights

- Custom WebGL scene (Three.js) — deforming icosahedron core, orbiting
  project nodes, an additive-blended dust field, scroll-coupled camera dolly
- Scroll-driven reveals, animated counters, and skill bars — all
  IntersectionObserver-based, no scroll libraries
- Live dashboards: GitHub repos/stars/followers/activity heatmap pulled from
  the GitHub REST API, and LeetCode difficulty breakdown pulled from a public
  LeetCode stats API, both at page load
- Fully responsive: adaptive particle count and pixel ratio on lower-spec /
  mobile devices, a slide-in nav drawer under 900px, `prefers-reduced-motion`
  support throughout

## Tech stack

HTML5 · CSS3 (custom properties, `backdrop-filter`, CSS Grid) · Vanilla
JavaScript (ES5, no build step) · [Three.js](https://threejs.org/) r128 ·
GitHub REST API · LeetCode community stats API

## Project structure

```
.
├── index.html        # markup + content
├── css/
│   └── style.css      # theme tokens, layout, components, responsive rules
├── js/
│   └── app.js          # 3D scene, data rendering, scroll logic, live dashboards
└── README.md
```

No build step, no dependencies to install. Three.js loads from a CDN.

## Run locally

```bash
git clone <your-repo-url>
cd <repo-folder>
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` directly via `file://` also works, but some browsers
block the GitHub/LeetCode `fetch` calls under `file://` — a local server
avoids that.)

## Deploy

Any static host works — no build step required:

- **Vercel** — import the GitHub repo, framework preset "Other", no build
  command, output directory `/`. Deploy.
- **Netlify** — drag-and-drop the project folder, or connect the repo with an
  empty build command and publish directory `/`.
- **GitHub Pages** — Settings → Pages → Deploy from branch → `main` → `/root`.

## Credits

Original design and animation — no licensed characters, templates, or stock
assets used.
