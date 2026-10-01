import { useState, useMemo } from 'react';
import { projects } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import ProjectGrid from './ProjectGrid';
import ProjectIndex from './ProjectIndex';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(projects.map(p => p.filterCategory)))];

export default function ProjectSection({ onOpenCaseStudy }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('index'); // 'index' | 'grid'
  const { setCursor } = useCursor();

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.filterCategory === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="work"
      style={{
        background: 'var(--color-bg)',
        padding: 'var(--section-py) 0',
      }}
    >
      {/* ── Section header ── */}
      <div
        style={{
          padding: '0 var(--section-px)',
          marginBottom: 'clamp(2rem, 4vw, 4rem)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
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

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* View toggle */}
            <div style={{ display: 'flex', gap: '0.25rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1.25rem' }}>
              <button
                className={`view-toggle-btn ${viewMode === 'index' ? 'active' : ''}`}
                onClick={() => setViewMode('index')}
                title="Index view"
                onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
                onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="0" y="2" width="14" height="1.5" fill="currentColor"/>
                  <rect x="0" y="6.25" width="14" height="1.5" fill="currentColor"/>
                  <rect x="0" y="10.5" width="14" height="1.5" fill="currentColor"/>
                </svg>
                Index
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
                onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
                onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="0" y="0" width="6" height="6" rx="0.5" fill="currentColor"/>
                  <rect x="8" y="0" width="6" height="6" rx="0.5" fill="currentColor"/>
                  <rect x="0" y="8" width="6" height="6" rx="0.5" fill="currentColor"/>
                  <rect x="8" y="8" width="6" height="6" rx="0.5" fill="currentColor"/>
                </svg>
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filter-bar" style={{ marginTop: '2rem' }}>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
              onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── View content ── */}
      {viewMode === 'index' ? (
        <div style={{ padding: '0 var(--section-px)' }}>
          <ProjectIndex projects={filtered} onOpen={onOpenCaseStudy} />
        </div>
      ) : (
        <div style={{ padding: '0 var(--section-px)' }}>
          <ProjectGrid projects={filtered} onOpen={onOpenCaseStudy} />
        </div>
      )}
    </section>
  );
}
