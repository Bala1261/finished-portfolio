import { useRef, useState } from 'react';
import { projects } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import CursorPreview from '../cursor/CursorPreview';

function ProjectRow({ project, index }) {
  const { setCursor, showPreview, hidePreview } = useCursor();
  const [hovered, setHovered] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    setCursor(CURSOR_STATES.VIEW);
    setPreviewSrc(project.image);
    setPreviewVisible(true);
  };
  const handleLeave = () => {
    setHovered(false);
    setCursor(CURSOR_STATES.DEFAULT);
    setPreviewVisible(false);
  };

  return (
    <>
      <div
        className="project-row"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Divider top */}
        <div className="divider" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3rem 1fr auto',
            alignItems: 'center',
            gap: '2rem',
            paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {/* Number */}
          <span className="proj-number">{project.number}</span>

          {/* Title + Category */}
          <div>
            <div className="proj-category" style={{ marginBottom: '0.5rem' }}>
              {project.category}
            </div>
            <div className="proj-title">{project.title}</div>
          </div>

          {/* Year */}
          <span className="proj-year">{project.year}</span>
        </div>
      </div>

      {/* Global preview follows cursor */}
      <CursorPreview src={previewSrc} visible={previewVisible} />
    </>
  );
}

export default function SelectedWork() {
  return (
    <section
      id="work"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(4rem, 8vw, 10rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(3rem, 6vw, 6rem)',
        }}
      >
        <div>
          <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              color: 'var(--color-text)',
            }}
          >
            Projects
          </h2>
        </div>
        <p className="text-label" style={{ color: 'var(--color-muted)' }}>
          {projects.length} Projects
        </p>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
        {/* Final divider */}
        <div className="divider" />
      </div>
    </section>
  );
}
