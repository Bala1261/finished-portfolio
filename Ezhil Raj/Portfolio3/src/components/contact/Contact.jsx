import { personal } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';

export default function Contact() {
  const { setCursor } = useCursor();

  return (
    <section
      id="contact"
      style={{
        background: 'var(--color-bg)',
        padding: 'var(--section-py) var(--section-px)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '3rem' }}>
        Contact
      </p>

      {/* Large headline */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
        {['LET\'S', 'CREATE', 'SOMETHING', 'UNFORGETTABLE.'].map((word, i) => (
          <div key={i} style={{ overflow: 'hidden', lineHeight: '0.95' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 7vw, 7.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: i === 3 ? 'var(--color-accent)' : 'var(--color-text)',
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* Email CTA */}
      <a
        href={`mailto:${personal.email}`}
        className="contact-email"
        onMouseEnter={() => setCursor(CURSOR_STATES.EMAIL)}
        onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
      >
        {personal.email}
      </a>

      {/* Sub-line */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          color: 'var(--color-muted)',
          marginTop: '1.5rem',
        }}
      >
        Or find me on social —
      </p>

      {/* Divider */}
      <div className="divider" style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }} />

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div style={{ display: 'flex', gap: 'clamp(1rem, 2.5vw, 2.5rem)', flexWrap: 'wrap' }}>
          {personal.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="nav-link"
              onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
              onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
              style={{ opacity: 0.6 }}
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-caption">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}
