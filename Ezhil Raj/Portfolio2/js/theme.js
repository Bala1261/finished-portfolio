/**
 * BEXO Standard Theme Controller
 * Supports:
 * - Executive Dark / Light Slate modes
 * - LocalStorage persistence
 * - prefers-color-scheme alignment
 * - Robust event delegation for theme toggle buttons
 * - Immediate sync across desktop and mobile controls
 */

const THEME_STORAGE_KEY = 'bexo_executive_theme';

export function getInitialTheme() {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_STORAGE_KEY) : null;
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  setupThemeListeners();
}

export function applyTheme(theme) {
  const root = document.documentElement;
  const isDark = theme === 'dark';

  root.setAttribute('data-theme', theme);
  document.body?.setAttribute('data-theme', theme);

  if (isDark) {
    root.classList.add('dark');
    document.body?.classList.add('dark');
  } else {
    root.classList.remove('dark');
    document.body?.classList.remove('dark');
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // Ignore storage errors in restricted contexts
  }

  updateAllToggleButtons(isDark);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getInitialTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function updateAllToggleButtons(isDark) {
  // 1. Desktop circular icon-only buttons
  const desktopBtns = document.querySelectorAll('#theme-toggle-btn, .theme-toggle-btn');
  desktopBtns.forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.innerHTML = isDark
      ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sun-icon"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="moon-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  });

  // 2. Mobile drawer full buttons with label + icon
  const mobileBtns = document.querySelectorAll('.mobile-theme-btn, #mobile-theme-toggle');
  mobileBtns.forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    const iconSlot = btn.querySelector('.theme-icon-slot');
    const textSlot = btn.querySelector('.theme-text-slot');
    const iconHtml = isDark
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sun-icon"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="moon-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    const labelText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    if (iconSlot && textSlot) {
      iconSlot.innerHTML = iconHtml;
      textSlot.textContent = labelText;
    } else {
      btn.innerHTML = `<span class="theme-icon-slot">${iconHtml}</span> <span class="theme-text-slot">${labelText}</span>`;
    }
  });
}

let listenersInitialized = false;

function setupThemeListeners() {
  if (listenersInitialized) return;
  listenersInitialized = true;

  // Global event delegation - catches clicks on any theme toggle element even after dynamic re-render
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-toggle-btn') || e.target.closest('.theme-toggle-btn') || e.target.closest('.mobile-theme-btn') || e.target.closest('#mobile-theme-toggle');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Listen to system OS preference changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
      const explicit = localStorage.getItem(THEME_STORAGE_KEY);
      if (!explicit) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Auto-run early to prevent FOUC (Flash of Unstyled Content)
if (typeof window !== 'undefined') {
  const theme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}
