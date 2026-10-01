import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['CREATE', 'DESIGN', 'BUILD', 'EXPERIENCE'];

export default function ScrollWords() {
  const sectionRef = useRef(null);
  const wordsRef   = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wordsRef.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: section,
          start: `${i * 20}% center`,
          end: `${(i + 1) * 20}% center`,
          scrub: true,
          onUpdate(self) {
            const p = self.progress;
            const targetColor = p > 0.2
              ? 'var(--color-text)'
              : 'rgba(244,241,234,0.08)';
            const scale = 1 + p * 0.06;
            const tx    = p * 20;
            el.style.color = p > 0.2 ? 'var(--color-text)' : 'rgba(244,241,234,0.08)';
            el.style.transform = `translateX(${tx}px)`;
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scroll-words-section"
      style={{ padding: 'clamp(8rem,15vw,20rem) var(--section-px)' }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '4rem' }}>
        Process
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
        {WORDS.map((word, i) => (
          <span
            key={word}
            ref={el => (wordsRef.current[i] = el)}
            className="scroll-word"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
