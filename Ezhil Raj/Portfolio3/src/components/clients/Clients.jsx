import { useRef, useState, useEffect } from 'react';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import CursorPreview from '../cursor/CursorPreview';
import { clients } from '../../data/portfolio.config';

export default function Clients() {
  if (!clients?.length) return null;

  const { setCursor } = useCursor();
  const [preview, setPreview] = useState(null);

  return (
    <section
      style={{
        background: 'var(--color-bg-2)',
        padding: 'var(--section-py) var(--section-px)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '3rem' }}>
        Clients
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(1rem,3vw,2.5rem) clamp(2rem,5vw,5rem)',
          alignItems: 'baseline',
        }}
      >
        {clients.map((client) => (
          <span
            key={client.name}
            className="client-name"
            onMouseEnter={() => { setCursor(CURSOR_STATES.VIEW); setPreview(client); }}
            onMouseLeave={() => { setCursor(CURSOR_STATES.DEFAULT); setPreview(null); }}
          >
            {client.name}
          </span>
        ))}
      </div>

      <CursorPreview src={preview?.preview || null} visible={!!preview} />
    </section>
  );
}
