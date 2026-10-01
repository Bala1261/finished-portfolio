import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT = [
  { line: "I DON'T JUST DESIGN", bold: false },
  { line: "INTERFACES.", bold: true },
  { line: "" },
  { line: "I DESIGN HOW PEOPLE", bold: false },
  { line: "EXPERIENCE THEM.", bold: true },
];

export default function Manifesto() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const words = wordsRef.current.filter(Boolean);
    if (!words.length) return;

    const ctx = gsap.context(() => {
      words.forEach((word, i) => {
        ScrollTrigger.create({
          trigger: word,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const color = `rgba(244, 241, 234, ${0.15 + progress * 0.85})`;
            word.style.color = color;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let wordIdx = 0;

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(6rem, 12vw, 14rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
      }}
    >
      {/* Section label */}
      <p
        className="text-label"
        style={{
          color: 'var(--color-muted)',
          marginBottom: '4rem',
        }}
      >
        Manifesto
      </p>

      {/* Statement */}
      <div>
        {STATEMENT.map((entry, lineIdx) => {
          if (!entry.line) {
            return <div key={lineIdx} style={{ height: '0.5em' }} />;
          }

          const lineWords = entry.line.split(' ');
          return (
            <div
              key={lineIdx}
              style={{
                lineHeight: 1,
                marginBottom: '0.1em',
                display: 'block',
              }}
            >
              {lineWords.map((word, wi) => {
                const idx = wordIdx++;
                return (
                  <span
                    key={wi}
                    ref={(el) => (wordsRef.current[idx] = el)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                      fontWeight: entry.bold ? 800 : 600,
                      letterSpacing: '-0.03em',
                      textTransform: 'uppercase',
                      color: 'rgba(244,241,234,0.15)',
                      display: 'inline-block',
                      marginRight: '0.3em',
                      transition: 'color 0.1s linear',
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
