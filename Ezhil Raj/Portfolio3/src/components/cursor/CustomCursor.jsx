import { useEffect, useRef, useState } from 'react';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';

const LABELS = {
  [CURSOR_STATES.DEFAULT]: '',
  [CURSOR_STATES.LINK]:    '+',
  [CURSOR_STATES.VIEW]:    'VIEW ↗',
  [CURSOR_STATES.EMAIL]:   'SEND ↗',
  [CURSOR_STATES.DRAG]:    'DRAG ↔',
  [CURSOR_STATES.PLAY]:    'PLAY ▶',
  [CURSOR_STATES.ABOUT]:   'ABOUT',
};

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);

  const pos     = useRef({ x: -200, y: -200 });
  const cur     = useRef({ x: -200, y: -200 });
  const vel     = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: -200, y: -200 });
  const rafId   = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const { cursorState } = useCursor();

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      vel.current.x = e.clientX - prevPos.current.x;
      vel.current.y = e.clientY - prevPos.current.y;
      prevPos.current = { x: e.clientX, y: e.clientY };
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cur.current.x = lerp(cur.current.x, pos.current.x, 0.11);
      cur.current.y = lerp(cur.current.y, pos.current.y, 0.11);

      // Velocity-based stretch (bounded)
      const speed  = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const scaleX = 1 + Math.min(speed * 0.03, 0.6);
      const scaleY = 1 / scaleX;  // preserve area

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${cur.current.x}px, ${cur.current.y}px) translate(-50%,-50%) scaleX(${scaleX}) scaleY(${scaleY})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      }

      // Decay velocity
      vel.current.x *= 0.78;
      vel.current.y *= 0.78;

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const isDefault = cursorState === CURSOR_STATES.DEFAULT;
  const label     = LABELS[cursorState] || '';
  const isAccent  = [CURSOR_STATES.VIEW, CURSOR_STATES.EMAIL, CURSOR_STATES.PLAY].includes(cursorState);

  return (
    <>
      {/* Tiny raw dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 10001, pointerEvents: 'none',
          width: isDefault ? '5px' : '0',
          height: isDefault ? '5px' : '0',
          background: 'var(--color-accent)',
          borderRadius: '50%',
          opacity: isDefault ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />

      {/* Ring / label */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 10000, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {isDefault ? (
          <div style={{
            width: '38px', height: '38px',
            border: '1px solid rgba(244,241,234,0.4)',
            borderRadius: '50%',
            transition: 'border-color 0.3s ease',
          }} />
        ) : (
          <div style={{
            padding: '6px 14px',
            background: isAccent ? 'var(--color-accent)' : 'rgba(244,241,234,0.95)',
            color: 'var(--color-bg)',
            fontSize: '0.5625rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            transition: 'background 0.25s ease',
          }}>
            {label}
          </div>
        )}
      </div>
    </>
  );
}
