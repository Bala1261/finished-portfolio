import React, { useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--bg)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Sticky Top Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(247, 244, 238, 0.94)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px var(--gutter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1001,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="article-back__btn"
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Back to Case Studies
        </button>

        <span style={{ fontFamily: 'var(--font-label)', fontSize: '11px', color: 'var(--secondary)', letterSpacing: '0.1em' }}>
          CASE STUDY &bull; {project.year}
        </span>
      </div>

      <div style={{ maxWidth: '860px', margin: '40px auto 100px', padding: '0 var(--gutter)' }}>
        <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
          {project.category} &bull; {project.client}
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
          {project.title}
        </h1>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {project.services.map((s) => (
            <span key={s} style={{ border: '1px solid var(--border)', padding: '6px 14px', fontSize: '12px', fontFamily: 'var(--font-label)', borderRadius: '2px' }}>
              {s}
            </span>
          ))}
        </div>

        {project.image && (
          <div style={{ marginBottom: '48px', overflow: 'hidden', borderRadius: '2px' }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Structured Grid: Challenge, Approach, Outcome */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '36px' }}>
          <div style={{ background: 'var(--card)', padding: '36px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '12px', color: 'var(--primary)' }}>
              The Challenge
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--secondary)', lineHeight: 1.75 }}>
              {project.challenge}
            </p>
          </div>

          <div style={{ background: 'var(--card)', padding: '36px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '12px', color: 'var(--primary)' }}>
              The Strategic Approach
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--secondary)', lineHeight: 1.75 }}>
              {project.approach}
            </p>
          </div>

          <div style={{ background: 'var(--card)', padding: '36px', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <CheckCircle2 size={20} color="var(--accent)" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0, color: 'var(--primary)' }}>
                The Outcome & Impact
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: 'var(--secondary)', lineHeight: 1.75 }}>
              {project.outcome}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '12px 32px',
              background: 'var(--primary)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-label)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderRadius: '2px',
            }}
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
