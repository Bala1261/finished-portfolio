import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Check } from 'lucide-react';

export default function Newsletter({ newsletter }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  if (!newsletter || !newsletter.enabled) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="container">
        <div className="newsletter__inner">
          <div
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '20px',
            }}
          >
            Weekly Dispatch
          </div>

          <h2 className="newsletter__heading">
            {newsletter.heading.map((line, i) => (
              <span key={i} style={{ display: 'block', color: i === 1 ? 'var(--accent)' : 'inherit' }}>
                {line}
              </span>
            ))}
          </h2>

          <p className="newsletter__desc">{newsletter.description}</p>

          {subscribed ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 20px',
                background: 'rgba(199, 91, 50, 0.08)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-label)',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <Check size={18} />
              <span>You&apos;re on the list. Welcome to the weekly dispatch.</span>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                className="newsletter__input"
                placeholder={newsletter.placeholder || 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="newsletter__submit"
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
              >
                {newsletter.cta}
              </button>
            </form>
          )}

          <div
            style={{
              marginTop: '16px',
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              color: 'var(--secondary)',
              letterSpacing: '0.04em',
            }}
          >
            Read by over 3,500 thinkers, founders, and strategists every Sunday.
          </div>
        </div>
      </div>
    </section>
  );
}
