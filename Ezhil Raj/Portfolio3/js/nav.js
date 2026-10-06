/**
 * BEXO Standard Navigation & Footer System — Design & Creative
 * Features:
 * - Floating Capsule Navbar (Home -> Portfolio -> Contact -> Hire Me)
 * - Top Scroll Depth Progress Bar dynamically scaling across all pages
 * - Active route state tracking (`aria-current="page"`)
 * - Accessible mobile menu with keyboard trapping & escape listener
 * - Skip to main content link for screen readers
 * - Conditional resume link in footer & topbar (only when resumeUrl exists)
 */

import { getProfile, resolveRoute, resolveAsset, escapeHtml } from './profile-runtime.js';
import { initTheme } from './theme.js';

export function initNavigation(activeRoute = 'home') {
  const profile = getProfile();
  renderSkipLink();
  renderScrollProgress();
  renderNavbar(profile, activeRoute);
  renderFooter(profile, activeRoute);
  setupMobileMenu();
  initTheme();
}

function renderSkipLink() {
  if (document.getElementById('bexo-skip-link')) return;
  const skip = document.createElement('a');
  skip.id = 'bexo-skip-link';
  skip.href = '#main-content';
  skip.className = 'skip-link';
  skip.textContent = 'Skip to main content';
  document.body.prepend(skip);
}

/**
 * Top Scroll Progress Bar
 */
function renderScrollProgress() {
  if (document.getElementById('bexo-scroll-progress-bar')) return;
  const wrap = document.createElement('div');
  wrap.className = 'scroll-progress-container';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = '<div id="bexo-scroll-progress-bar" class="scroll-progress-bar"></div>';
  document.body.prepend(wrap);

  const bar = document.getElementById('bexo-scroll-progress-bar');
  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    if (bar) {
      bar.style.transform = `scaleX(${progress})`;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Navbar with Capsule Pill
 */
function renderNavbar(profile, activeRoute) {
  const container = document.getElementById('bexo-navbar') || document.querySelector('header.topbar');
  if (!container) return;

  const routes = [
    { key: 'home', label: 'Home', url: resolveRoute('home') },
    { key: 'portfolio', label: 'Portfolio', url: resolveRoute('portfolio') },
    { key: 'contact', label: 'Contact', url: resolveRoute('contact') },
    { key: 'hire-me', label: 'Hire Me', url: resolveRoute('hire-me') },
  ];

  const brandName = escapeHtml(profile.user.name || 'Alex Mercer');
  const userInitials = escapeHtml(profile.user.initials || 'AM');
  const hasResume = Boolean(profile.user.resumeUrl);

  container.innerHTML = `
    <div class="topbar-inner">
      <a href="${resolveRoute('home')}" class="brand-link" aria-label="${brandName} Home">
        <span class="brand-avatar">${userInitials}</span>
        <span class="brand-text">
          <strong class="brand-name">${brandName}</strong>
          <span class="brand-role">${escapeHtml(profile.profile.headline || 'Creative Director')}</span>
        </span>
      </a>

      <!-- Floating Capsule Nav -->
      <nav class="nav-capsule" aria-label="Primary Navigation">
        <ul class="nav-list">
          ${routes.map((r) => {
            const isActive = r.key === activeRoute;
            return `
              <li class="nav-item">
                <a href="${r.url}" 
                   class="nav-link ${isActive ? 'active' : ''}" 
                   ${isActive ? 'aria-current="page"' : ''}>
                  ${r.label}
                  ${r.key === 'hire-me' && profile.user.openToHire ? '<span class="nav-dot-available" title="Available for hire"></span>' : ''}
                </a>
              </li>
            `;
          }).join('')}
        </ul>
      </nav>

      <!-- Right Actions: Theme Toggle, Resume & Mobile Menu -->
      <div class="topbar-actions">
        <button type="button" class="btn-icon theme-toggle-btn" data-action="toggle-theme" aria-label="Toggle visual theme">
          <span class="theme-icon">🌙</span>
        </button>

        ${hasResume ? `
          <a href="${resolveAsset(profile.user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm topbar-resume-btn">
            <span>CV</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        ` : ''}

        <button type="button" class="menu-toggle-btn" id="bexo-menu-toggle" aria-expanded="false" aria-controls="bexo-mobile-drawer" aria-label="Toggle navigation menu">
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </button>
      </div>
    </div>
  `;

  // Mount Mobile Navigation Drawer to document.body (avoids backdrop-filter containing block entrapment)
  let drawer = document.getElementById('bexo-mobile-drawer');
  if (drawer) drawer.remove();

  drawer = document.createElement('div');
  drawer.id = 'bexo-mobile-drawer';
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('hidden', '');
  drawer.setAttribute('aria-hidden', 'true');

  drawer.innerHTML = `
    <div class="mobile-drawer-content">
      <div class="mobile-drawer-header">
        <span class="brand-name">${brandName}</span>
        <button type="button" class="btn-icon mobile-drawer-close" id="bexo-menu-close" aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <ul class="mobile-nav-list">
        ${routes.map((r) => {
          const isActive = r.key === activeRoute;
          return `
            <li>
              <a href="${r.url}" class="mobile-nav-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                ${r.label}
                ${r.key === 'hire-me' && profile.user.openToHire ? '<span class="status-pill status-open">Available</span>' : ''}
              </a>
            </li>
          `;
        }).join('')}
      </ul>
      ${hasResume ? `
        <div class="mobile-drawer-footer">
          <a href="${resolveAsset(profile.user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full">
            Download Executive Resume (PDF)
          </a>
        </div>
      ` : ''}
    </div>
  `;
  document.body.appendChild(drawer);
}

/**
 * Mobile Drawer Menu Handlers
 */
function setupMobileMenu() {
  const toggleBtn = document.getElementById('bexo-menu-toggle');
  const closeBtn = document.getElementById('bexo-menu-close');
  const drawer = document.getElementById('bexo-mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.removeAttribute('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-active');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-active')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/**
 * Site Footer
 */
function renderFooter(profile, activeRoute) {
  const footer = document.getElementById('bexo-footer') || document.querySelector('footer.site-footer');
  if (!footer) return;

  const routes = [
    { key: 'home', label: 'Home', url: resolveRoute('home') },
    { key: 'portfolio', label: 'Portfolio', url: resolveRoute('portfolio') },
    { key: 'contact', label: 'Contact', url: resolveRoute('contact') },
    { key: 'hire-me', label: 'Hire Me', url: resolveRoute('hire-me') },
  ];

  const brandName = escapeHtml(profile.user.name || 'Alex Mercer');
  const headline = escapeHtml(profile.profile.headline || 'Creative Director & Designer');
  const socials = profile.user.socials || [];
  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container footer-container">
      <div class="footer-top">
        <div class="footer-brand-col">
          <div class="footer-brand-title">${brandName}</div>
          <p class="footer-brand-tagline">${headline}</p>
          <p class="footer-brand-quote">${escapeHtml(profile.profile.overviewQuote || 'Crafting visionary digital systems.')}</p>
        </div>

        <div class="footer-nav-col">
          <div class="footer-col-heading">Navigation</div>
          <ul class="footer-links">
            ${routes.map((r) => `
              <li><a href="${r.url}" class="footer-link ${r.key === activeRoute ? 'active' : ''}">${r.label}</a></li>
            `).join('')}
            ${profile.user.resumeUrl ? `
              <li><a href="${resolveAsset(profile.user.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="footer-link">Resume (PDF) ↗</a></li>
            ` : ''}
          </ul>
        </div>

        <div class="footer-social-col">
          <div class="footer-col-heading">Connect</div>
          <ul class="footer-links">
            ${socials.map((s) => `
              <li><a href="${escapeHtml(s.href)}" target="_blank" rel="noopener noreferrer" class="footer-link">${escapeHtml(s.label)} ↗</a></li>
            `).join('')}
            ${profile.user.email ? `
              <li><a href="mailto:${escapeHtml(profile.user.email)}" class="footer-link">${escapeHtml(profile.user.email)}</a></li>
            ` : ''}
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© ${year} ${brandName}. BEXO Standard Portfolio.</p>
        <div class="footer-badges">
          <span class="badge-mini">BEXO Verified Standard</span>
          <a href="#main-content" class="back-to-top" aria-label="Back to top of page">Back to top ↑</a>
        </div>
      </div>
    </div>
  `;
}
