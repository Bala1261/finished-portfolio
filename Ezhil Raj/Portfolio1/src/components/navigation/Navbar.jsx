import React, { useState, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ personal, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Writing', href: '#content' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a
          href="#"
          className="navbar__brand"
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
        >
          {personal.name}
        </a>

        <nav aria-label="Main Navigation">
          <ul className="navbar__nav">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#contact"
            className="navbar__cta"
            onMouseEnter={() => setCursor('talk', "LET'S TALK")}
            onMouseLeave={resetCursor}
            onClick={onOpenContact}
          >
            Work With Me →
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              display: 'none',
              padding: '6px',
              color: 'var(--primary)',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg)',
            zIndex: 99,
            padding: '100px 32px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  color: 'var(--primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-label)',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
              }}
            >
              Work With Me <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .navbar__mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
