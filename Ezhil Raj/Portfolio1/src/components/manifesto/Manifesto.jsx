import React, { useEffect, useRef, useState } from 'react';

export default function Manifesto({ manifesto }) {
  const containerRef = useRef(null);
  const [activeIndices, setActiveIndices] = useState([0, 1]); // initial reveal

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // How far into the section have we scrolled
      const progress = Math.max(0, Math.min(1, (windowHeight * 0.85 - rect.top) / (rect.height * 0.95)));
      const totalLines = manifesto.lines.length;
      const countToActivate = Math.floor(progress * (totalLines + 1));

      const newActives = [];
      for (let i = 0; i < countToActivate; i++) {
        newActives.push(i);
      }
      setActiveIndices(newActives);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [manifesto.lines.length]);

  return (
    <section className="manifesto" id="manifesto" ref={containerRef}>
      <div className="container">
        <div className="manifesto__inner">
          <div
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '32px',
            }}
          >
            Editorial Manifesto &mdash; 01
          </div>

          <div>
            {manifesto.lines.map((line, idx) => {
              if (!line.text) {
                return <div key={idx} style={{ height: '24px' }} />;
              }
              const isActive = activeIndices.includes(idx);
              return (
                <span
                  key={idx}
                  className={`manifesto__line ${isActive ? 'active' : ''} ${line.accent ? 'accent' : ''}`}
                >
                  {line.text}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
