import React, { useEffect, useRef, useState } from 'react';

export default function Proof({ proof }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(proof.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate numbers up
          const duration = 1600;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easedProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out

            setCounts(
              proof.map((item) => {
                const target = parseInt(item.number, 10) || 0;
                return Math.round(target * easedProgress);
              })
            );

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts(proof.map((item) => parseInt(item.number, 10) || 0));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, proof]);

  return (
    <section className="proof-section" ref={sectionRef} id="proof">
      <div className="container">
        <div
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '40px',
          }}
        >
          Track Record &amp; Proof
        </div>

        <div className="proof-grid">
          {proof.map((item, idx) => (
            <div key={item.label} className="proof-item">
              <div className="proof-item__number">
                {counts[idx]}
                <span>{item.suffix}</span>
              </div>
              <div className="proof-item__label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
