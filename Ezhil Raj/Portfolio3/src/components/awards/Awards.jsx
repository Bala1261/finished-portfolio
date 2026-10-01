import { awards } from '../../data/portfolio.config';

export default function Awards() {
  if (!awards?.length) return null;

  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: 'var(--section-py) var(--section-px)',
      }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '3rem' }}>
        Recognition
      </p>

      <div>
        {awards.map((award, i) => (
          <div key={i} className="award-row">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--color-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {award.year}
            </span>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem,2vw,1.4rem)',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--color-text)',
              }}
            >
              {award.title}
            </p>
            <p className="text-caption">{award.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
