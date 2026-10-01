import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export default function Publications({ publications }) {
  const { setCursor, resetCursor } = useCursor();

  if (!publications || publications.length === 0) return null;

  return (
    <section className="publications" id="publications">
      <div className="container">
        <div className="publications__label">
          Featured &amp; Published In
        </div>

        <div className="publications__list">
          {publications.map((pub, idx) => (
            <div
              key={idx}
              className="publication-item"
              onMouseEnter={() => setCursor('open', 'OPEN ↗')}
              onMouseLeave={resetCursor}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
            >
              <span>{pub.name}</span>
              <ArrowUpRight size={24} style={{ opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
