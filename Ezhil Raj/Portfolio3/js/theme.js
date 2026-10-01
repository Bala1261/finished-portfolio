/**
 * BEXO Standard Theme Controller — Design & Creative
 * Controls dark/light mode and accent colors with local storage persistence.
 */

const STORAGE_KEY = 'bexo_theme_preference';

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (prefersDark ? 'dark' : 'dark'); // default dark for creative aesthetic

  applyTheme(initialTheme);
  bindThemeToggles();
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const toggleBtns = document.querySelectorAll('[data-action="toggle-theme"]');
  toggleBtns.forEach((btn) => {
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    const icon = btn.querySelector('.theme-icon');
    if (icon) {
      icon.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
  });
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function bindThemeToggles() {
  const toggleBtns = document.querySelectorAll('[data-action="toggle-theme"]');
  toggleBtns.forEach((btn) => {
    btn.removeEventListener('click', toggleTheme);
    btn.addEventListener('click', toggleTheme);
  });
}
