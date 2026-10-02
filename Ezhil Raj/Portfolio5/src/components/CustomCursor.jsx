import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [auraPos, setAuraPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth inertia tracking for aura
    let animId;
    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setAuraPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(animateCursor);
    };
    animId = requestAnimationFrame(animateCursor);

    // Dynamic hover bindings
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, .interactive-hover, .card-3d-wrap');
      if (target) {
        setIsHovering(true);
        if (target.dataset.cursor) {
          setCursorText(target.dataset.cursor);
        } else if (target.classList.contains('card-3d-wrap')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Outer Magnetic Aura */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border border-cyan-400/50 backdrop-blur-[1px] hidden md:flex items-center justify-center font-mono text-[9px] font-bold tracking-wider text-white transition-[width,height,background-color,border-color] duration-300 ease-out ${
          isHovering
            ? 'w-16 h-16 bg-cyan-500/20 border-cyan-400'
            : 'w-10 h-10 bg-cyan-500/5'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          left: `${auraPos.x}px`,
          top: `${auraPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {cursorText}
      </div>
    </>
  );
}
