/* Accessible, shared mobile navigation for all portfolio routes. */
(() => {
  const initMobileNavigation = () => {
    const button = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!button || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('mobile-nav-open', open);
      if (open) {
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      } else {
        button.focus({ preventScroll: true });
      }
    };

    // Set the initial state explicitly so stale markup cannot leave the menu open.
    setOpen(false);
    button.addEventListener('click', () => {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
      }
    });

    // If resized to desktop while open, reset mobile state.
    const desktopQuery = window.matchMedia('(min-width: 801px)');
    const resetOnDesktop = (event) => { if (event.matches) setOpen(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', resetOnDesktop);
    else desktopQuery.addListener(resetOnDesktop);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNavigation, { once: true });
  } else {
    initMobileNavigation();
  }
})();
