import { useEffect, useRef } from 'react';

/**
 * Tracks mouse position and returns smoothed X/Y values as a ref.
 * Layers can read from the ref to implement parallax at different speeds.
 */
export function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      smoothed.current.x = lerp(smoothed.current.x, mouse.current.x, 0.06);
      smoothed.current.y = lerp(smoothed.current.y, mouse.current.y, 0.06);
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return smoothed;
}
