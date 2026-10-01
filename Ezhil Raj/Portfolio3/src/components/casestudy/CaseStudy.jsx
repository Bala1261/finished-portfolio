import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import { projects as allProjects } from '../../data/portfolio.config';
import Lightbox from '../lightbox/Lightbox';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy({ project, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const { setCursor } = useCursor();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const nextProject = allProjects[(allProjects.findIndex(p => p.id === project.id) + 1) % allProjects.length];

  // Enter animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlay, { y: '100%' }, { y: '0%', duration: 0.7, ease: 'power3.inOut' });

    // ScrollTrigger within overlay
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.cs-reveal', overlay).forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: overlay, start: 'top 85%' },
          }
        );
      });
    }, overlay);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      y: '100%',
      duration: 0.65,
      ease: 'power3.inOut',
      onComplete: onClose,
    });
  };

  const cs = project.caseStudy;
  const galleryImages = cs?.gallery?.map(src => ({ src, alt: project.title })) || [];

  return createPortal(
    <div ref={overlayRef} className="case-study-overlay">
      {/* Close button */}
      <button
        className="case-study-close"
        onClick={handleClose}
        onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
        onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
      >
        ← Back
      </button>

      {/* Hero image */}
      <div className="case-study-hero">
        <img src={project.image} alt={project.title} />
        <div className="case-study-hero-overlay" />
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem,5vw,4rem)',
            left: 'var(--section-px)',
            right: 'var(--section-px)',
          }}
        >
          <p className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>
            {project.number} — {project.category}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: 'var(--color-text)',
            }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Meta strip */}
      <div
        className="cs-section cs-reveal"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '2rem' }}
      >
        {[
          { label: 'Client',   value: project.client },
          { label: 'Year',     value: project.year },
          { label: 'Role',     value: project.role },
          { label: 'Category', value: project.category },
        ].map(({ label, value }) => value && (
          <div key={label}>
            <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>{label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Statement */}
      {cs?.statement && (
        <div className="cs-section cs-reveal">
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem,3vw,2.2rem)',
              lineHeight: 1.4,
              color: 'var(--color-text)',
              maxWidth: '820px',
            }}
          >
            "{cs.statement}"
          </p>
        </div>
      )}

      {/* Full-width image */}
      {galleryImages[0] && (
        <div className="cs-reveal">
          <img src={galleryImages[0].src} alt={project.title} className="cs-full-image" />
        </div>
      )}

      {/* Challenge */}
      {cs?.challenge && (
        <div className="cs-section cs-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Challenge</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem,1.5vw,1.1rem)', lineHeight: 1.75, color: 'var(--color-muted)' }}>
            {cs.challenge}
          </p>
        </div>
      )}

      {/* Gallery grid */}
      {galleryImages.length > 1 && (
        <div
          className="cs-section cs-reveal"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}
        >
          {galleryImages.slice(1, 3).map((img, i) => (
            <div
              key={i}
              style={{ overflow: 'hidden', borderRadius: '2px', cursor: 'none' }}
              onClick={() => setLightboxIndex(i + 1)}
              onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
              onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: '100%', height: 'clamp(200px,30vh,400px)', objectFit: 'cover', display: 'block', transition: 'transform 0.6s var(--ease-expo)' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>
      )}

      {/* Process */}
      {cs?.process && (
        <div className="cs-section cs-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Process</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem,1.5vw,1.1rem)', lineHeight: 1.75, color: 'var(--color-muted)' }}>
            {cs.process}
          </p>
        </div>
      )}

      {/* Final image */}
      {galleryImages[3] && (
        <div className="cs-reveal">
          <img src={galleryImages[3].src} alt={project.title} className="cs-full-image" />
        </div>
      )}

      {/* Outcome */}
      {cs?.outcome && (
        <div className="cs-section cs-reveal">
          <p className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '1.5rem' }}>Result</p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem,3vw,2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--color-text)',
              maxWidth: '700px',
            }}
          >
            {cs.outcome}
          </p>
        </div>
      )}

      {/* Next project */}
      {nextProject && (
        <div
          className="next-project-section cs-reveal"
          onClick={() => { onClose(); setTimeout(() => {}, 700); }}
          onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
          onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
        >
          <img src={nextProject.image} alt={nextProject.title} loading="lazy" />
          <div className="next-project-overlay">
            <p className="text-label" style={{ color: 'var(--color-accent)' }}>Next Project</p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem,5vw,4.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: 'var(--color-text)',
              }}
            >
              {nextProject.title}
            </p>
          </div>
        </div>
      )}

      {/* Lightbox for gallery */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>,
    document.body
  );
}
