import { useState } from 'react';
import { services } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import CursorPreview from '../cursor/CursorPreview';

function ServiceRow({ item }) {
  const { setCursor } = useCursor();
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <>
      <div
        className="service-row"
        onMouseEnter={() => { setCursor(CURSOR_STATES.LINK); setPreviewVisible(true); }}
        onMouseLeave={() => { setCursor(CURSOR_STATES.DEFAULT); setPreviewVisible(false); }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span className="service-num">{item.number}</span>
            <span className="service-title">{item.title}</span>
          </div>
          <span className="service-arrow">↗</span>
        </div>
      </div>
      <CursorPreview src={item.preview} visible={previewVisible} />
    </>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: 'var(--color-bg)',
        padding: 'var(--section-py) var(--section-px)',
      }}
    >
      <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '3rem' }}>
        Services
      </p>

      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        {services.map((item) => (
          <ServiceRow key={item.number} item={item} />
        ))}
      </div>
    </section>
  );
}
