import { useRef, useEffect, Suspense, lazy } from 'react';

const HeroVisual = lazy(() => import('./HeroVisual'));

/**
 * HeroMedia — renders the correct background media based on hero.type
 *   'image'    → fullscreen parallax image
 *   'video'    → muted autoplay fullscreen video
 *   '3d'       → R3F torus knot (existing HeroVisual)
 *   'gradient' → animated CSS gradient only
 */
export default function HeroMedia({ config, mouse }) {
  const imgRef  = useRef(null);
  const rafId   = useRef(null);

  // Mouse parallax for image mode
  useEffect(() => {
    if (config.type !== 'image' || !imgRef.current) return;

    const tick = () => {
      if (imgRef.current && mouse?.current) {
        const mx = mouse.current.x * 10;
        const my = mouse.current.y * 10;
        imgRef.current.style.transform = `translate(${mx}px, ${my}px) scale(1.08)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [config.type, mouse]);

  if (config.type === 'image' && config.src) {
    return (
      <>
        <img
          ref={imgRef}
          src={config.src}
          alt="Hero"
          className="hero-media-image"
          style={{ willChange: 'transform', transform: 'scale(1.08)' }}
        />
        <div className="hero-overlay" />
      </>
    );
  }

  if (config.type === 'video' && config.src) {
    return (
      <>
        <video
          className="hero-video"
          src={config.src}
          autoPlay
          muted
          loop
          playsInline
          poster={config.poster}
        />
        <div className="hero-overlay" />
      </>
    );
  }

  if (config.type === '3d') {
    return (
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '5%',
          width: 'clamp(360px, 55vw, 800px)',
          height: '100%',
          zIndex: 1,
          opacity: 0.92,
        }}
      >
        <Suspense fallback={null}>
          <HeroVisual />
        </Suspense>
      </div>
    );
  }

  // gradient fallback
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 70% 50%, rgba(200,255,0,0.06) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(200,255,0,0.03) 0%, transparent 70%)
        `,
        animation: 'gradientShift 8s ease-in-out infinite alternate',
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0%   { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
