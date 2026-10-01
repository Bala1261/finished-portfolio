import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { horizontalShowcase } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const { setCursor } = useCursor();

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const track   = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalWidth = track.scrollWidth - section.offsetWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
          scrub: 1.4,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--color-bg-2)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Section label — pinned */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(2rem,4vw,3rem)',
          left: 'var(--section-px)',
          zIndex: 10,
        }}
      >
        <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.35rem' }}>
          Showcase
        </p>
        <p className="text-caption" style={{ opacity: 0.5 }}>Scroll to explore →</p>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="h-showcase-track"
        style={{
          padding: 'clamp(5rem,9vw,9rem) var(--section-px)',
          paddingRight: '25vw',
          willChange: 'transform',
        }}
      >
        {horizontalShowcase.map((item, i) => (
          <div
            key={item.id}
            className="showcase-panel"
            onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
            onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
          >
            {/* Image */}
            <div className="showcase-img-wrap">
              <img src={item.image} alt={item.title} loading="lazy" />

              {/* Category badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem', left: '1rem',
                  padding: '0.3rem 0.7rem',
                  background: 'rgba(8,8,8,0.7)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '2px',
                }}
              >
                <span className="text-label" style={{ color: 'var(--color-accent)', fontSize: '0.5625rem' }}>
                  {String(i + 1).padStart(2, '0')} — {item.category}
                </span>
              </div>
            </div>

            {/* Info below image */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-text)',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                {item.title}
              </p>
              <p className="text-caption" style={{ marginBottom: '0.5rem' }}>{item.subtitle}</p>
              {item.description && (
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '0.9375rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.55,
                    maxWidth: '320px',
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile fallback */}
      <style>{`
        @media (max-width: 767px) {
          .h-showcase-track {
            flex-direction: column;
            padding: var(--section-py) var(--section-px) !important;
          }
          .showcase-panel { width: 100% !important; }
          .showcase-img-wrap { height: clamp(240px, 55vw, 360px) !important; }
        }
      `}</style>
    </section>
  );
}
