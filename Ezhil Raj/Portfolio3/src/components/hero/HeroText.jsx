import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personal } from '../../data/portfolio.config';

/**
 * Word-by-word GSAP reveal with clip/mask pattern.
 * Each line is wrapped in overflow:hidden so words rise up into view.
 */
export default function HeroText({ ready }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const words = containerRef.current?.querySelectorAll('.hero-word-inner');
    if (!words?.length) return;

    gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.2,
      }
    );
  }, [ready]);

  const roleWords = personal.role.split(' ');

  return (
    <div ref={containerRef}>
      {roleWords.map((word, i) => (
        <div
          key={i}
          style={{ overflow: 'hidden', lineHeight: '0.92', display: 'block' }}
        >
          <span className="hero-word-inner text-hero" style={{ display: 'inline-block' }}>
            {word}
          </span>
        </div>
      ))}
    </div>
  );
}
