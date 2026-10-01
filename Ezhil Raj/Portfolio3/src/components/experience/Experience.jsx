import { experience } from '../../data/portfolio.config';

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        background: 'var(--color-bg)',
        padding: 'var(--section-py) var(--section-px)',
      }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '4rem' }}>
        Experience
      </p>

      <div style={{ maxWidth: '900px' }}>
        {experience.map((item, i) => (
          <div key={i} className="exp-row">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--color-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {item.year}
            </span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-text)',
                  marginBottom: '0.2rem',
                }}
              >
                {item.role}
              </p>
              <p className="text-caption">{item.company}</p>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                opacity: 0.55,
              }}
            >
              {item.location}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
