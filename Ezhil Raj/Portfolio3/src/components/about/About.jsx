import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personal } from '../../data/portfolio.config';
import ClipReveal from '../shared/ClipReveal';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_WORDS = ['I', 'CREATE', 'VISUAL', 'EXPERIENCES', 'THAT', 'PEOPLE', 'REMEMBER.'];

export default function About() {
  const sectionRef    = useRef(null);
  const imgRef        = useRef(null);
  const wordsRef      = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Portrait reveal
      gsap.from(imgRef.current, {
        yPercent: 6, scale: 1.06, opacity: 0,
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: imgRef.current, start: 'top 82%' },
      });

      // Statement word reveals
      wordsRef.current.filter(Boolean).forEach((word) => {
        ScrollTrigger.create({
          trigger: word,
          start: 'top 75%',
          end: 'top 40%',
          scrub: true,
          onUpdate(self) {
            word.style.color = `rgba(244,241,234,${0.08 + self.progress * 0.92})`;
          },
        });
      });

      // Bio paragraphs
      gsap.utils.toArray('.about-bio-para', section).forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 24,
          duration: 0.8, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--color-bg-2)', padding: 'var(--section-py) var(--section-px)' }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '4rem' }}>About</p>

      {/* Editorial statement */}
      <div style={{ marginBottom: 'clamp(4rem,8vw,8rem)' }}>
        {STATEMENT_WORDS.map((word, i) => (
          <span
            key={i}
            ref={el => (wordsRef.current[i] = el)}
            className="about-statement-word"
            style={{ marginRight: word === 'VISUAL' || word === 'THAT' ? '0.3em' : '0.3em', display: 'inline-block' }}
          >
            {word}&nbsp;
          </span>
        ))}
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 8rem)',
          alignItems: 'start',
        }}
      >
        {/* Text column */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'var(--color-text)',
              marginBottom: '2rem',
            }}
          >
            {personal.name}
            <br />
            <span style={{ color: 'var(--color-accent)' }}>{personal.role}</span>
          </h2>

          {personal.about.map((para, i) => (
            <p
              key={i}
              className="about-bio-para"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                lineHeight: 1.8,
                color: i === 0 ? 'var(--color-text)' : 'var(--color-muted)',
                marginBottom: '1.25rem',
              }}
            >
              {para}
            </p>
          ))}

          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginTop: '2rem', padding: '0.5rem 1rem',
              border: '1px solid var(--color-border)', borderRadius: '2px',
            }}
          >
            <div
              style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--color-accent)',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }}
            />
            <span className="text-label" style={{ color: 'var(--color-muted)' }}>
              {personal.location} — {personal.available ? 'Available for projects' : 'Fully booked'}
            </span>
          </div>
          <style>{`
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.4); }
              50% { box-shadow: 0 0 0 5px rgba(200,255,0,0); }
            }
          `}</style>
        </div>

        {/* Portrait */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px', maxWidth: '420px' }}>
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85"
            alt={personal.name}
            className="about-portrait"
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--color-accent)' }} />
        </div>
      </div>
    </section>
  );
}
