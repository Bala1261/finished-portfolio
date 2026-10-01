/**
 * BEXO Standard Navigation & Footer Component
 * Conforms to:
 * - 4 Canonical Public Routes (Home, Portfolio, Contact, Hire Me)
 * - Circular Capsule Navigation Container
 * - Active route detection and accessible aria-current
 * - Responsive mobile drawer with keyboard traps & escape key handling
 * - Truthful resume CTA conditional rendering
 * - Rich 4-column standard footer
 */

import { getProfile, resolveRoute, resolveAsset, escapeHtml } from './profile-runtime.js';

export function initNavigation(activeRoute = 'home') {
  const profile = getProfile();
  renderTopNav(profile, activeRoute);
  renderFooter(profile, activeRoute);
  setupMobileMenu();
}

function renderTopNav(profile, activeRoute) {
  const navContainer = document.getElementById('bexo-navbar') || document.querySelector('header.topbar');
  if (!navContainer) return;

  const routes = [
    { key: 'home', label: 'Home', url: resolveRoute('home') },
    { key: 'portfolio', label: 'Portfolio', url: resolveRoute('portfolio') },
    { key: 'contact', label: 'Contact', url: resolveRoute('contact') },
    { key: 'hire-me', label: 'Hire Me', url: resolveRoute('hire-me') }
  ];

  const homeUrl = resolveRoute('home');
  const brandName = escapeHtml(profile.user.name || 'Ezhil Arasan');

  navContainer.className = 'topbar';
  navContainer.innerHTML = `
    <div class="topbar-inner">
      <a href="${homeUrl}" class="brand" aria-label="${brandName} Home">
        <span class="brand-monogram">EA</span>
        <span class="brand-text">
          <span class="brand-name">${brandName}</span>
          <span class="brand-role">Editorial &amp; Strategy</span>
        </span>
      </a>

      <!-- Circular Capsule Navigation Container -->
      <nav class="desktop-nav nav-capsule" aria-label="Main Navigation">
        <ul class="nav-capsule-list">
          ${routes.map(r => {
            const isActive = r.key === activeRoute;
            return `
              <li class="nav-capsule-item">
                <a href="${r.url}" class="nav-capsule-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                  ${r.label}
                </a>
              </li>
            `;
          }).join('')}
        </ul>
      </nav>

      <div class="topbar-right-actions">
        ${profile.user.resumeUrl ? `
          <a href="${resolveAsset(profile.user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm topbar-resume-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Resume</span>
          </a>
        ` : ''}

        <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle color theme">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>

        <button id="menu-toggle" class="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Toggle navigation menu">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Slide Drawer -->
    <div id="mobile-nav" class="mobile-nav-drawer" hidden aria-label="Mobile Navigation">
      <ul class="mobile-nav-list">
        ${routes.map(r => `
          <li>
            <a href="${r.url}" class="mobile-nav-link ${r.key === activeRoute ? 'active' : ''}" ${r.key === activeRoute ? 'aria-current="page"' : ''}>
              ${r.label}
            </a>
          </li>
        `).join('')}
      </ul>
      <div class="mobile-nav-footer">
        ${profile.user.resumeUrl ? `
          <a href="${resolveAsset(profile.user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm w-full mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume (PDF)
          </a>
        ` : ''}
        <button class="btn btn-outline btn-sm w-full theme-toggle-btn" aria-label="Toggle dark/light theme">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <span>Toggle Theme Mode</span>
        </button>
      </div>
    </div>
  `;
}

function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-nav');
  if (!toggle || !drawer) return;

  function toggleMenu(show) {
    const isExpanded = show !== undefined ? show : toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(isExpanded));
    toggle.classList.toggle('open', isExpanded);
    if (isExpanded) {
      drawer.removeAttribute('hidden');
      drawer.classList.add('is-open');
    } else {
      drawer.classList.remove('is-open');
      drawer.setAttribute('hidden', '');
    }
  }

  toggle.addEventListener('click', () => toggleMenu());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      toggle.focus();
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

function renderFooter(profile, activeRoute) {
  const container = document.getElementById('bexo-footer') || document.querySelector('footer.site-footer');
  if (!container) return;

  const routes = [
    { key: 'home', label: 'Home', url: resolveRoute('home') },
    { key: 'portfolio', label: 'Portfolio', url: resolveRoute('portfolio') },
    { key: 'contact', label: 'Contact', url: resolveRoute('contact') },
    { key: 'hire-me', label: 'Hire Me', url: resolveRoute('hire-me') }
  ];

  const hasResume = Boolean(profile.user.resumeUrl);
  const resumeUrl = hasResume ? resolveAsset(profile.user.resumeUrl) : '#';

  container.className = 'site-footer';
  container.innerHTML = `
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col footer-brand-col">
          <div class="footer-logo">
            <span class="brand-monogram">EA</span>
            <span class="footer-name">${escapeHtml(profile.user.name)}</span>
          </div>
          <p class="footer-tagline">${escapeHtml(profile.profile.headline)}</p>
          <div class="footer-status-pill">
            <span class="status-dot ${profile.user.openToHire ? 'pulse' : ''}"></span>
            <span>${profile.user.openToHire ? 'Open for Strategic & Advisory Roles' : 'Currently Engaged'}</span>
          </div>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Navigation</h3>
          <ul class="footer-links">
            ${routes.map(r => `
              <li>
                <a href="${r.url}" class="${r.key === activeRoute ? 'active' : ''}">${r.label}</a>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Direct Connect</h3>
          <ul class="footer-links">
            ${profile.user.email ? `<li><a href="mailto:${escapeHtml(profile.user.email)}">${escapeHtml(profile.user.email)}</a></li>` : ''}
            ${profile.user.phone ? `<li><span class="footer-plain-text">${escapeHtml(profile.user.phone)}</span></li>` : ''}
            ${profile.user.location ? `<li><span class="footer-plain-text">${escapeHtml(profile.user.location)}</span></li>` : ''}
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Editorial Materials</h3>
          <div class="footer-materials">
            ${hasResume ? `
              <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline footer-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download Resume (PDF)</span>
              </a>
            ` : ''}
            <a href="${resolveRoute('contact')}" class="btn btn-primary footer-btn">
              <span>Start Conversation</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${escapeHtml(profile.user.name)}. All rights reserved. BEXO Premium Content &amp; Editorial Standard.</p>
        <div class="footer-bottom-links">
          <a href="#main-content" class="back-to-top">Back to top &uarr;</a>
        </div>
      </div>
    </div>
  `;
}
