import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../../context/CursorContext';

export default function CursorPreview() {
  const { preview } = useCursor();
  const previewRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${currentPos.current.x + 28}px, ${currentPos.current.y - 100}px, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouch || !preview.src) return null;

  return (
    <div
      ref={previewRef}
      className={`cursor-preview ${preview.visible ? 'visible' : ''}`}
      aria-hidden="true"
      style={{ left: 0, top: 0 }}
    >
      <img src={preview.src} alt={preview.title || 'Preview'} loading="lazy" />
      {preview.title && (
        <div style={{
          padding: '8px 12px',
          background: 'rgba(23, 23, 23, 0.95)',
          color: '#F7F4EE',
          fontSize: '11px',
          fontFamily: 'var(--font-label)',
          letterSpacing: '0.04em',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {preview.category && (
            <span style={{ color: 'var(--accent)', fontWeight: 700, marginRight: '6px', fontSize: '9px', letterSpacing: '0.1em' }}>
              {preview.category}
            </span>
          )}
          <span>{preview.title}</span>
        </div>
      )}
    </div>
  );
}
