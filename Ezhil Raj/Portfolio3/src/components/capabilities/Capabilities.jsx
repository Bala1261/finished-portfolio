import { useState } from 'react';
import { capabilities } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import CursorPreview from '../cursor/CursorPreview';

function CapabilityRow({ item }) {
  const { setCursor } = useCursor();
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <>
      <div
        className="capability-row"
        onMouseEnter={() => { setCursor(CURSOR_STATES.VIEW); setPreviewVisible(true); }}
        onMouseLeave={() => { setCursor(CURSOR_STATES.DEFAULT); setPreviewVisible(false); }}
        style={{ cursor: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <span className="cap-num">{item.number}</span>
          <span className="cap-title">{item.title}</span>
        </div>
      </div>

      <CursorPreview src={item.preview} visible={previewVisible} />
    </>
  );
}

export default function Capabilities() {
  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(4rem, 8vw, 10rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '3rem' }}>
        Capabilities
      </p>

      {/* First capability row gets a top border */}
      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        {capabilities.map((item) => (
          <CapabilityRow key={item.number} item={item} />
        ))}
      </div>
    </section>
  );
}
