import { useEffect, useRef, useState, Suspense } from 'react';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import HeroMedia from './HeroMedia';
import HeroText from './HeroText';
import ScrollIndicator from './ScrollIndicator';
import { personal, hero as heroConfig } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';

export default function Hero({ ready }) {
  const mouse = useMouseParallax();
  const textLayerRef = useRef(null);
  const subtitleRef  = useRef(null);
  const rafId        = useRef(null);
  const { setCursor } = useCursor();

  const isImageFull = heroConfig.type === 'image';
  const isVideoFull = heroConfig.type === 'video';
  const isFullscreen = isImageFull || isVideoFull;

  // Multi-layer mouse parallax for non-fullscreen modes
  useEffect(() => {
    if (isFullscreen) return;

    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      if (textLayerRef.current) {
        textLayerRef.current.style.transform = `translate(${mx * 6}px, ${my * 6}px)`;
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.transform = `translate(${mx * 4}px, ${my * 4}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [mouse, isFullscreen]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '600px',
        background: 'var(--color-bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => isFullscreen && setCursor(CURSOR_STATES.VIEW)}
      onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
    >
      {/* ── Background / Media ── */}
      <HeroMedia config={heroConfig} mouse={mouse} />

      {/* ── Content overlay ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isFullscreen ? 'flex-end' : 'center',
          padding: 'var(--section-px)',
          paddingTop: isFullscreen ? 'var(--section-px)' : '7rem',
          paddingBottom: isFullscreen ? '5rem' : 'var(--section-px)',
        }}
      >
        {!isFullscreen && (
          <>
            {/* Role label */}
            <div style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
              <p
                className="text-label"
                style={{
                  color: 'var(--color-accent)',
                  opacity: ready ? 1 : 0,
                  transform: ready ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'opacity 0.8s ease 0.1s, transform 0.8s var(--ease-expo) 0.1s',
                }}
              >
                {personal.location} — Available for projects
              </p>
            </div>

            {/* Hero display type */}
            <div ref={textLayerRef} style={{ willChange: 'transform' }}>
              <HeroText ready={ready} />
            </div>

            {/* Subtitle */}
            <div
              ref={subtitleRef}
              style={{
                marginTop: '3rem',
                maxWidth: '480px',
                willChange: 'transform',
                opacity: ready ? 1 : 0,
                transition: 'opacity 1s ease 1s',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: 'var(--color-muted)',
                  lineHeight: 1.65,
                }}
              >
                Designing the space between<br />
                <span style={{ color: 'var(--color-text)' }}>aesthetics and function.</span>
              </p>
            </div>

            {/* CTAs */}
            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                opacity: ready ? 1 : 0,
                transition: 'opacity 1s ease 1.2s',
              }}
            >
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.6875rem',
                  fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--color-bg)', background: 'var(--color-accent)',
                  padding: '0.875rem 1.75rem', textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'opacity 0.3s ease, transform 0.3s var(--ease-expo)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='translateY(0)'; }}
              >
                View Work
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.6875rem',
                  fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--color-muted)', textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)', paddingBottom: '2px',
                  transition: 'color 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color='var(--color-text)'; e.currentTarget.style.borderColor='var(--color-text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color='var(--color-muted)'; e.currentTarget.style.borderColor='var(--color-border)'; }}
              >
                About me →
              </a>
            </div>
          </>
        )}

        {/* Fullscreen hero bottom bar */}
        {isFullscreen && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              opacity: ready ? 1 : 0,
              transition: 'opacity 1s ease 0.8s',
            }}
          >
            <div>
              <p className="text-label" style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                {personal.location}
              </p>
              <HeroText ready={ready} />
            </div>
            {heroConfig.type === 'video' && heroConfig.videoReel && (
              <a
                href={heroConfig.videoReel}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.6875rem',
                  fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--color-bg)', background: 'var(--color-accent)',
                  padding: '0.875rem 1.75rem', textDecoration: 'none', borderRadius: '2px',
                }}
              >
                Play Reel ▶
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
