import React, { useRef, useState, useEffect } from 'react';

export default function InteractiveQuote() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 20, y: y * 20 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section
      className="interactive-quote"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Editorial thought"
    >
      <div className="iq__words">
        <span
          className="iq__word"
          style={{ transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.5}px, 0)` }}
        >
          THINK
        </span>
        <span
          className="iq__word"
          style={{ transform: `translate3d(${-offset.x * 1.2}px, ${-offset.y * 0.7}px, 0)` }}
        >
          CLEARLY.
        </span>
        <span
          className="iq__word"
          style={{ transform: `translate3d(${offset.x * 1.5}px, ${offset.y * 1.0}px, 0)` }}
        >
          CREATE
        </span>
        <span
          className="iq__word"
          style={{ transform: `translate3d(${-offset.x * 0.9}px, ${-offset.y * 0.4}px, 0)` }}
        >
          BOLDLY.
        </span>
      </div>
    </section>
  );
}
