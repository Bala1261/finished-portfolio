BEXO PREMIUM PORTFOLIO — CONVERTED SAMPLE PROJECT

This folder contains the converted multi-page portfolio, using the sample identity and content from the uploaded portfolio.

PAGES
- index.html — Home / hero page
- pages/portfolio.html — Portfolio profile and sections
- pages/contact.html — Contact details and form interface
- pages/hire-me.html — Hire Me page

PROJECT FILES
- style.css — Shared styling
- script.js — Original portfolio interactions and scroll-reveal animation (loaded by every page)
- js/nav.js — Sets the current page navigation state; script.js handles the mobile menu
- js/contact.js — Contact form UI behavior
- js/profile-data.js — Editable sample profile data object
- assets/ — Add your own local photos, resume, and media here

SAMPLE DATA
The sample name Alex Morgan and other sample content are retained from the uploaded portfolio. Replace these with your own information before publishing. The profile photo currently uses a remote Unsplash image. The original upload did not contain a resume PDF, so the resume link needs your actual resume file.

RUN
Open index.html in a browser, or use a local static server for consistent relative paths. The contact form is a front-end sample and requires a backend/API to deliver messages.

TROUBLESHOOTING
If content looks blank, make sure you are opening the updated project folder and running it through Live Server. The page now loads script.js, which activates the reveal animations; without it, elements with the .reveal class remain hidden.
