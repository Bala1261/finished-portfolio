import React from 'react';
import { useCursor } from '../../context/CursorContext';

export default function About({ about, personal }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Heading & Longform Story */}
          <div>
            <h2 className="about-heading">
              {about.heading.map((line, i) => (
                <span key={i} style={{ display: 'block', color: i === 1 ? 'var(--accent)' : 'inherit' }}>
                  {line}
                </span>
              ))}
            </h2>

            <div className="about-story">
              {about.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Portrait & Beliefs */}
          <div className="about-sidebar">
            <div style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src={personal.portrait}
                alt={personal.name}
                className="about-portrait"
                loading="lazy"
              />
            </div>

            <div className="about-beliefs">
              <div className="about-beliefs__label">Guiding Principles</div>
              <ul className="about-beliefs__list">
                {about.beliefs.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="about-beliefs__label">Curiosities &amp; Interests</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {about.interests.map((interest) => (
                  <span
                    key={interest}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-label)',
                      border: '1px solid var(--border)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      color: 'var(--secondary)',
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
