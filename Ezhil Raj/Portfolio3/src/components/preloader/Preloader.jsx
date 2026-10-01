import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { personal, projects } from '../../data/portfolio.config';

const FLASH_IMAGES = projects.map(p => p.image).slice(0, 4);

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const barRef       = useRef(null);
  const flashRef     = useRef(null);
  const [count, setCount]     = useState(0);
  const [flashIdx, setFlashIdx] = useState(-1);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reducedMotion) { onComplete?.(); return; }

    const duration = 1400; // ms
    const start    = performance.now();
    let   rafId;
    let   lastFlashTime = 0;
    let   fIdx = 0;

    const easeOut = (t) => 1 - Math.pow(1 - t, 2.5);

    const tick = (now) => {
      const elapsed = now - start;
      const raw   = Math.min(elapsed / duration, 1);
      const eased = easeOut(raw);
      const value = Math.floor(eased * 100);

      setCount(value);
      if (barRef.current) barRef.current.style.width = `${value}%`;

      // Flash project images rapidly in first 60%
      if (raw < 0.6 && now - lastFlashTime > 220 && fIdx < FLASH_IMAGES.length) {
        setFlashIdx(fIdx);
        lastFlashTime = now;
        fIdx++;
        setTimeout(() => setFlashIdx(-1), 180);
      }

      if (raw < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Exit
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power3.inOut',
          delay: 0.15,
          onComplete: () => {
            if (preloaderRef.current) preloaderRef.current.style.display = 'none';
            onComplete?.();
          },
        });
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete, reducedMotion]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Flash images */}
      {FLASH_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="preloader-flash-img"
          style={{ opacity: flashIdx === i ? 0.12 : 0 }}
          aria-hidden="true"
        />
      ))}

      {/* Name */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.75rem, 2vw, 1rem)',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
          }}
        >
          {personal.name}
        </p>
      </div>

      {/* Counter */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '1.5rem', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 14vw, 11rem)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: 'var(--color-text)',
            display: 'block',
            lineHeight: 1,
          }}
        >
          {String(count).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div
          ref={barRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            height: '100%', width: '0%',
            background: 'var(--color-accent)',
            transition: 'width 0.06s linear',
            boxShadow: '0 0 12px var(--color-accent)',
          }}
        />
      </div>
    </div>
  );
}
