import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Progress counter
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setClosing(true), 300);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        const jump = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + jump);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="preloader"
      style={{
        transition: 'transform 0.65s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.6s ease',
        transform: closing ? 'translateY(-100%)' : 'translateY(0)',
        pointerEvents: closing ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      <div style={{ overflow: 'hidden', textAlign: 'center', marginBottom: '8px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            color: '#F7F4EE',
            letterSpacing: '-0.02em',
            margin: 0,
            opacity: 0.95,
          }}
        >
          WORDS &bull; IDEAS &bull; CRAFT
        </h1>
      </div>

      <div style={{ width: '160px', height: '1px', background: 'rgba(247,244,238,0.15)', position: 'relative', margin: '20px 0' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: 'var(--accent)',
            width: `${counter}%`,
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'rgba(247,244,238,0.4)',
          textTransform: 'uppercase',
        }}
      >
        EDITORIAL EDITION &bull; {counter}%
      </div>
    </div>
  );
}
