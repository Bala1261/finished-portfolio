import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export default function SelectedWork({ projects, onSelectProject }) {
  const { setCursor, resetCursor, showPreview, hidePreview } = useCursor();

  return (
    <section className="selected-work" id="work">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-header__title">Selected Case Studies</h2>
          <div className="section-header__link">
            <span>Client Engagements</span>
          </div>
        </div>

        {/* Project Editorial List */}
        <div className="project-list">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-item"
              onClick={() => onSelectProject && onSelectProject(project.id)}
              onMouseEnter={() => {
                setCursor('view', 'VIEW →');
                if (project.image) {
                  showPreview(project.image, project.title, project.category);
                }
              }}
              onMouseLeave={() => {
                resetCursor();
                hidePreview();
              }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject && onSelectProject(project.id);
                }
              }}
            >
              <div className="project-item__number">{project.number}</div>

              <div className="project-item__body">
                <div className="project-item__category">{project.category} &bull; {project.client}</div>
                <h3 className="project-item__title">{project.title}</h3>

                <p style={{ fontSize: '15px', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: '16px', maxWidth: '680px' }}>
                  {project.challenge}
                </p>

                <div className="project-item__services">
                  {project.services.map((svc) => (
                    <span key={svc} className="project-item__service-tag">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span className="project-item__year">{project.year}</span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
