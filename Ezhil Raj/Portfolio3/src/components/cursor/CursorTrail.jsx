import { useEffect, useRef, useState } from 'react';

const TRAIL_COUNT = 4;

export default function CursorTrail() {
  const trailRefs = useRef([]);
  const positions = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));
  const mousePos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      positions.current[0].x = lerp(positions.current[0].x, mousePos.current.x, 0.25);
      positions.current[0].y = lerp(positions.current[0].y, mousePos.current.y, 0.25);

      for (let i = 1; i < TRAIL_COUNT; i++) {
        positions.current[i].x = lerp(positions.current[i].x, positions.current[i - 1].x, 0.35);
        positions.current[i].y = lerp(positions.current[i].y, positions.current[i - 1].y, 0.35);
      }

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${positions.current[i].x}px, ${positions.current[i].y}px) translate(-50%, -50%)`;
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            zIndex: 9998,
            pointerEvents: 'none',
            width: `${6 - i}px`,
            height: `${6 - i}px`,
            borderRadius: '50%',
            background: `rgba(200, 255, 0, ${0.25 - i * 0.05})`,
            willChange: 'transform',
          }}
        />
      ))}
    </>
  );
}
