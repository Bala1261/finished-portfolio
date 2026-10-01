import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUp } from 'lucide-react';

export default function Footer({ personal, socials }) {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__name">{personal.name}</div>
            <p className="footer__tagline">
              Writer, Strategist &amp; Consultant &bull; Chennai, India
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__nav">
            <span style={{ fontFamily: 'var(--font-label)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Index
            </span>
            <a href="#hero" className="footer__nav-item" onMouseEnter={() => setCursor('link')} onMouseLeave={resetCursor}>
              Home / Intro
            </a>
            <a href="#content" className="footer__nav-item" onMouseEnter={() => setCursor('link')} onMouseLeave={resetCursor}>
              Writing &amp; Essays
            </a>
            <a href="#work" className="footer__nav-item" onMouseEnter={() => setCursor('link')} onMouseLeave={resetCursor}>
              Selected Work
            </a>
            <a href="#services" className="footer__nav-item" onMouseEnter={() => setCursor('link')} onMouseLeave={resetCursor}>
              Services &amp; Advisory
            </a>
            <a href="#about" className="footer__nav-item" onMouseEnter={() => setCursor('link')} onMouseLeave={resetCursor}>
              Story &amp; Beliefs
            </a>
          </div>

          {/* Socials & Networks */}
          <div className="footer__social">
            <span style={{ fontFamily: 'var(--font-label)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Elsewhere
            </span>
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                onMouseEnter={() => setCursor('open', 'OPEN ↗')}
                onMouseLeave={resetCursor}
              >
                {s.platform} &mdash; {s.handle}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            &copy; {new Date().getFullYear()} {personal.name}. All thoughts and words reserved.
          </div>

          <button
            type="button"
            className="footer__top-btn"
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
