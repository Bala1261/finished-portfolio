import React, { useState, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowLeft, Check, Send } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, personal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Content Strategy');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(23, 23, 23, 0.8)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: 'var(--bg)',
          maxWidth: '560px',
          width: '100%',
          border: '1px solid var(--border)',
          padding: '40px',
          borderRadius: '2px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            marginBottom: '24px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
        >
          <ArrowLeft size={14} /> Close
        </button>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--primary)',
            marginBottom: '12px',
          }}
        >
          Start a Conversation
        </h3>

        <p style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
          Tell me about your project, your brand, or what you&apos;re looking to communicate. I review all inquiries within 24 hours.
        </p>

        {sent ? (
          <div
            style={{
              padding: '24px',
              background: 'rgba(199, 91, 50, 0.08)',
              border: '1px solid var(--accent)',
              borderRadius: '2px',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Check size={20} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>Inquiry Received</div>
              <div style={{ fontSize: '13px', color: 'var(--primary)', marginTop: '2px' }}>
                Thank you. I&apos;ll be in touch shortly.
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  marginBottom: '6px',
                }}
              >
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  marginBottom: '6px',
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  marginBottom: '6px',
                }}
              >
                Area of Interest
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              >
                <option>Content Strategy</option>
                <option>Brand Voice &amp; Messaging</option>
                <option>Copywriting &amp; Long-Form Writing</option>
                <option>Advisory / Consulting Retainer</option>
                <option>Speaking &amp; Workshops</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  marginBottom: '6px',
                }}
              >
                What are you working on?
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a brief overview of your timeline, objectives, and context..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => setCursor('talk', 'SEND')}
              onMouseLeave={resetCursor}
              style={{
                padding: '14px 28px',
                background: 'var(--primary)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-label)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Send size={14} /> Send Inquiry &rarr;
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
