import { useEffect, useRef } from 'react';

/**
 * Image-follow preview — mounts near the cursor with lerp interpolation.
 * Props:
 *   src      — image URL (null = hidden)
 *   visible  — boolean
 */
export default function CursorPreview({ src, visible }) {
  const previewRef = useRef(null);
  const pos = useRef({ x: -500, y: -500 });
  const cur = useRef({ x: -500, y: -500 });
  const vel = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      vel.current.x = e.clientX - pos.current.x;
      vel.current.y = e.clientY - pos.current.y;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cur.current.x = lerp(cur.current.x, pos.current.x, 0.1);
      cur.current.y = lerp(cur.current.y, pos.current.y, 0.1);

      if (previewRef.current) {
        const rotation = Math.max(-6, Math.min(6, vel.current.x * 0.08));
        previewRef.current.style.transform =
          `translate(${cur.current.x + 140}px, ${cur.current.y - 60}px) rotate(${rotation}deg)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={previewRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        zIndex: 9997,
        pointerEvents: 'none',
        width: '240px',
        height: '160px',
        overflow: 'hidden',
        borderRadius: '4px',
        opacity: visible && src ? 1 : 0,
        scale: visible && src ? '1' : '0.85',
        transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), scale 0.35s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform',
      }}
    >
      {src && (
        <img
          src={src}
          alt="preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </div>
  );
}
