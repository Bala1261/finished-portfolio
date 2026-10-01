import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export default function Services({ services, onSelectService }) {
  const [hoveredService, setHoveredService] = useState(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-header__title">Capabilities & Services</h2>
          <div className="section-header__link">
            <span>How We Can Work Together</span>
          </div>
        </div>

        {/* Rows */}
        <div className="service-rows">
          {services.map((svc) => {
            const isHovered = hoveredService === svc.id;
            return (
              <div
                key={svc.id}
                className="service-row"
                onMouseEnter={() => {
                  setHoveredService(svc.id);
                  setCursor('talk', 'INQUIRE');
                }}
                onMouseLeave={() => {
                  setHoveredService(null);
                  resetCursor();
                }}
                onClick={() => onSelectService && onSelectService(svc)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService && onSelectService(svc);
                  }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 className="service-row__name">{svc.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--secondary)', margin: 0, maxWidth: '520px' }}>
                    {svc.description}
                  </p>
                </div>

                {/* Interactive Deliverables pill tag */}
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    maxWidth: '360px',
                    opacity: isHovered ? 1 : 0.6,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {svc.deliverables.map((d) => (
                    <span
                      key={d}
                      style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: '11px',
                        padding: '3px 8px',
                        background: isHovered ? 'var(--card)' : 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '2px',
                        color: isHovered ? 'var(--primary)' : 'var(--secondary)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="service-row__right">
                  <span className="service-row__number">{svc.number}</span>
                  <div className="service-row__arrow">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
