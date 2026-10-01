import { useEffect, useRef, useState } from 'react';

export default function ScrollIndicator() {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 180);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.5s ease',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.625rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
        }}
      >
        Scroll to explore
      </span>
      {/* Animated arrow */}
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
          animation: 'scrollPulse 1.8s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.6); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
