import { useEffect, useRef, useState } from 'react';
import { personal } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';

const navLinks = [
  { label: 'Work',       href: '#work' },
  { label: 'About',      href: '#about' },
  { label: 'Services',   href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const { setCursor } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
          onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
        >
          {personal.initials}
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,3rem)', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleScroll(e, link.href)}
              onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
              onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          style={{
            background: 'none', border: 'none',
            color: 'var(--color-text)', display: 'flex',
            flexDirection: 'column', gap: '5px', padding: '4px',
          }}
          onClick={() => { setMenuOpen(o => !o); setCursor(CURSOR_STATES.DEFAULT); }}
          aria-label="Toggle menu"
          onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
          onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
        >
          {[0,1,2].map(i => (
            <div
              key={i}
              style={{
                width: '22px', height: '1px',
                background: 'var(--color-text)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translateY(6px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translateY(-6px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,8,8,0.98)',
          backdropFilter: 'blur(16px)',
          zIndex: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'var(--section-px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                textDecoration: 'none',
                lineHeight: 1.05,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.5s var(--ease-expo) ${0.1 + i * 0.07}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text)'; }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-label" style={{ color: 'var(--color-muted)', marginTop: '3rem' }}>
          {personal.email}
        </p>
      </div>
    </>
  );
}
