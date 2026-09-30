(() => {
  const path = window.location.pathname;
  const key = path.endsWith('/portfolio.html') ? 'portfolio' : path.endsWith('/contact.html') ? 'contact' : path.endsWith('/hire-me.html') ? 'hire' : 'home';
  document.querySelectorAll('[data-page]').forEach((link) => {
    if (link.dataset.page === key) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
})();
