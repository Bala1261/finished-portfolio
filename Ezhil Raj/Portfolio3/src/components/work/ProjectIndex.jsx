import { useState } from 'react';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import CursorPreview from '../cursor/CursorPreview';
import ClipReveal from '../shared/ClipReveal';

export default function ProjectIndex({ projects, onOpen }) {
  const { setCursor } = useCursor();
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      {projects.map((project, i) => (
        <div key={project.id}>
          {/* Top divider */}
          <div className="divider" />

          <div
            className="project-row"
            style={{ padding: 'clamp(1.5rem,3vw,2.5rem) 0' }}
            onMouseEnter={() => { setHovered(project.id); setCursor(CURSOR_STATES.VIEW); }}
            onMouseLeave={() => { setHovered(null);       setCursor(CURSOR_STATES.DEFAULT); }}
            onClick={() => onOpen?.(project)}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1fr auto',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <span className="proj-number">{project.number}</span>
              <div>
                <div className="proj-category" style={{ marginBottom: '0.4rem' }}>
                  {project.category}
                </div>
                <div className="proj-title">{project.title}</div>
              </div>
              <span className="proj-year">{project.year}</span>
            </div>
          </div>

          {/* Cursor preview follows mouse globally */}
          <CursorPreview src={project.image} visible={hovered === project.id} />
        </div>
      ))}
      <div className="divider" />
    </div>
  );
}
