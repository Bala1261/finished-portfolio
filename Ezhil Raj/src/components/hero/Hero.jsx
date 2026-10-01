import React, { useEffect, useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowDownRight, Sparkles, BookOpen } from 'lucide-react';

export default function Hero({ hero, personal, onSelectArticle }) {
  const [mounted, setMounted] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const mode = hero.mode || 'portrait';

  return (
    <section className="hero" id="hero">
      <div className="hero__grain" />

      {/* LEFT COLUMN: Editorial Typography & Actions */}
      <div className="hero__left">
        {/* Step 2: Role label */}
        <div
          className="hero__role-label"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s var(--ease-out) 0.2s, transform 0.6s var(--ease-out) 0.2s',
          }}
        >
          {personal.tagline || personal.roles?.join(' • ')}
        </div>

        {/* Step 3: Headline line reveal */}
        <h1 className="hero__headline">
          {mode === 'quoteFirst' ? (
            <div style={{ fontStyle: 'italic', lineHeight: 1.05 }}>
              &ldquo;GOOD IDEAS
              <br />
              <span className="accent">DESERVE BETTER</span>
              <br />
              STORIES.&rdquo;
            </div>
          ) : mode === 'textFirst' ? (
            <div>
              <span className="hero__headline-line">
                <span
                  className="hero__headline-inner"
                  style={{
                    transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                    transition: 'transform 0.8s var(--ease-out) 0.3s',
                  }}
                >
                  WRITER.
                </span>
              </span>
              <span className="hero__headline-line">
                <span
                  className="hero__headline-inner accent"
                  style={{
                    transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                    transition: 'transform 0.8s var(--ease-out) 0.45s',
                  }}
                >
                  STRATEGIST.
                </span>
              </span>
              <span className="hero__headline-line">
                <span
                  className="hero__headline-inner"
                  style={{
                    transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                    transition: 'transform 0.8s var(--ease-out) 0.6s',
                  }}
                >
                  CREATOR.
                </span>
              </span>
            </div>
          ) : (
            hero.headline.map((line, idx) => (
              <span key={idx} className="hero__headline-line">
                <span
                  className="hero__headline-inner"
                  style={{
                    transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                    transition: `transform 0.85s var(--ease-out) ${0.3 + idx * 0.15}s`,
                    color: idx === 1 ? 'var(--accent)' : 'inherit',
                  }}
                >
                  {line}
                </span>
              </span>
            ))
          )}
        </h1>

        {/* Step 5: Supporting text fade */}
        <p
          className="hero__sub"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s var(--ease-out) 0.7s, transform 0.6s var(--ease-out) 0.7s',
          }}
        >
          {personal.bio}
        </p>

        {/* Step 6: CTA reveal */}
        <div
          className="hero__ctas"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s var(--ease-out) 0.85s, transform 0.6s var(--ease-out) 0.85s',
          }}
        >
          <a
            href="#content"
            className="hero__cta-primary"
            onMouseEnter={() => setCursor('read', 'READ →')}
            onMouseLeave={resetCursor}
          >
            Read My Work &rarr;
          </a>
          <a
            href="#services"
            className="hero__cta-secondary"
            onMouseEnter={() => setCursor('talk', "LET'S TALK")}
            onMouseLeave={resetCursor}
          >
            Work With Me &rarr;
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: Asymmetric Portrait or Content Showcase */}
      <div className="hero__right">
        {mode === 'contentFirst' ? (
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              padding: '36px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s var(--ease-out) 0.5s, transform 0.8s var(--ease-out) 0.5s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '16px' }}>
              <Sparkles size={16} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Featured Piece
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', lineHeight: 1.15, marginBottom: '14px' }}>
              The Future of AI in Modern Business Workflows
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
              Artificial intelligence isn't just changing what we make — it's changing how we think.
            </p>
            <button
              type="button"
              onClick={() => onSelectArticle && onSelectArticle('c1')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-label)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
              onMouseEnter={() => setCursor('read', 'READ →')}
              onMouseLeave={resetCursor}
            >
              <BookOpen size={16} /> Read Full Essay &rarr;
            </button>
          </div>
        ) : (
          <div
            className="hero__portrait-wrap"
            style={{
              clipPath: mounted ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
              transition: 'clip-path 1.1s var(--ease-out) 0.4s',
            }}
          >
            <img
              src={personal.portrait}
              alt={`${personal.name} editorial portrait`}
              className="hero__portrait"
              loading="eager"
            />

            {/* Small editorial metadata badge */}
            <div
              className="hero__portrait-meta"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(16px)',
                transition: 'opacity 0.6s var(--ease-out) 0.95s, transform 0.6s var(--ease-out) 0.95s',
              }}
            >
              <div style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '2px' }}>
                Vol. 03 &bull; 2026
              </div>
              <div>{personal.location}</div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="hero__scroll-indicator"
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s var(--ease-out) 1.1s',
        }}
      >
        <span className="hero__scroll-line" />
        <span>Scroll To Explore</span>
      </div>
    </section>
  );
}
