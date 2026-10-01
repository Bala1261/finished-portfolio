import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export default function Contact({ contact, personal, socials, onOpenContactModal }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="contact-section" id="contact">
      <div className="container">
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
          Initiate Contact &mdash; 07
        </div>

        <h2 className="contact-heading">
          {contact.heading.map((line, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                color: i === 1 ? 'var(--accent)' : 'inherit',
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        <div className="contact-cta-wrap">
          <button
            type="button"
            className="contact-cta"
            onClick={onOpenContactModal}
            onMouseEnter={() => setCursor('talk', 'TALK →')}
            onMouseLeave={resetCursor}
          >
            <span>{contact.cta}</span>
            <ArrowUpRight size={32} />
          </button>
        </div>

        <div className="contact-links">
          <div className="contact-link">
            <span className="contact-link__label">Direct Inquiries</span>
            <a
              href={`mailto:${contact.email}`}
              className="contact-link__value"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
            >
              {contact.email}
            </a>
          </div>

          <div className="contact-link">
            <span className="contact-link__label">Calendar Booking</span>
            <a
              href={personal.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link__value"
              onMouseEnter={() => setCursor('open', 'OPEN ↗')}
              onMouseLeave={resetCursor}
            >
              {contact.bookingLabel || 'Schedule 30-min call'} &rarr;
            </a>
          </div>

          <div className="contact-link">
            <span className="contact-link__label">Writing Dispatch</span>
            <a
              href="https://ezhilarasan.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link__value"
              onMouseEnter={() => setCursor('open', 'OPEN ↗')}
              onMouseLeave={resetCursor}
            >
              Substack Publication &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
