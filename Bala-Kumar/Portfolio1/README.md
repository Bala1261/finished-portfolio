# Bala Kumar G — Multi-page Portfolio

This version reorganizes the uploaded portfolio into the BEXO-style four-route format while retaining the uploaded sample content and visual styling.

## Pages
- `index.html` — Home / hero
- `pages/portfolio.html` — Profile, services, experience, and journal
- `pages/contact.html` — Contact details and project inquiry form
- `pages/hire-me.html` — Hiring / collaboration call to action

## Run locally
Open this folder in VS Code and use Live Server on `index.html`, or run `python -m http.server 5500` from this folder and visit `http://localhost:5500`.

## Sample-data notes
- Name and portfolio content are retained from the uploaded portfolio (Bala Kumar G).
- Contact details such as `hello@example.com`, phone placeholder, social links, and remote sample photos are demo values; replace them before publishing.
- The contact form currently uses the behavior included in the original template (prepares an email; it is not connected to a backend).
- No resume or showreel file was included, so no resume/showreel download link is provided.


## Recent layout updates
- Header now occupies its own layout row instead of overlaying the home hero.
- Hero portrait is constrained to its column and scales responsively.
- Hero heading wraps safely at narrower desktop widths.
- Selected Projects is numbered 04 because Education is currently absent.
