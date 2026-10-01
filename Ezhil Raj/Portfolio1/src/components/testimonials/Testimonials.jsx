import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Quote size={14} /> Endorsements &amp; Trust
        </div>

        <div className="testimonial-carousel">
          <blockquote className="testimonial-quote">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className="testimonial-author visible">
            <div className="testimonial-name">&mdash; {current.author}</div>
            <div className="testimonial-role">{current.role}</div>
          </div>

          <div className="testimonial-nav">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`testimonial-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(247,244,238,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(247,244,238,0.7)',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(247,244,238,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(247,244,238,0.7)',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
