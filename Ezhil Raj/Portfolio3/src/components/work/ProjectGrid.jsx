import { useMemo } from 'react';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import ClipReveal from '../shared/ClipReveal';

export default function ProjectGrid({ projects, onOpen }) {
  const { setCursor } = useCursor();

  // Pair projects into [landscape, portrait] rows where possible
  const rows = useMemo(() => {
    const result = [];
    let i = 0;
    while (i < projects.length) {
      const p = projects[i];
      if (p.layout === 'landscape' && projects[i + 1]?.layout === 'portrait') {
        result.push([p, projects[i + 1]]);
        i += 2;
      } else {
        result.push([p]);
        i++;
      }
    }
    return result;
  }, [projects]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem,1.5vw,1.5rem)' }}>
      {rows.map((row, ri) => (
        <div
          key={ri}
          className="project-grid"
          style={{ alignItems: 'stretch' }}
        >
          {row.map((project, pi) => (
            <ClipReveal
              key={project.id}
              direction={pi % 2 === 0 ? 'left' : 'bottom'}
              delay={pi * 0.1}
              className={`project-grid-item layout-${project.layout || 'landscape'}`}
            >
              <div
                onClick={() => onOpen?.(project)}
                onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
                onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
                style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-grid-img"
                  loading="lazy"
                />
                <div className="project-grid-overlay">
                  <div>
                    <p className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '0.4rem' }}>
                      {project.number} — {project.category}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem,2vw,1.6rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-text)',
                      }}
                    >
                      {project.title}
                    </p>
                    <p className="text-caption" style={{ marginTop: '0.3rem' }}>{project.year}</p>
                  </div>
                </div>
              </div>
            </ClipReveal>
          ))}
        </div>
      ))}
    </div>
  );
}
