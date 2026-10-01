import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Sliders, Check } from 'lucide-react';

const PROFILES = [
  { id: 'personalBrand', label: 'Personal Brand Mode', role: 'Thought Leader / Hybrid', heroMode: 'portrait' },
  { id: 'writer', label: 'Writer / Essayist Mode', role: 'Writer & Columnist', heroMode: 'textFirst' },
  { id: 'consultant', label: 'Consultant / Advisor Mode', role: 'Strategic Advisor', heroMode: 'portrait' },
  { id: 'contentCreator', label: 'Content Creator Mode', role: 'Creator & Educator', heroMode: 'contentFirst' },
  { id: 'speaker', label: 'Speaker / Coach Mode', role: 'Keynote Speaker & Coach', heroMode: 'quoteFirst' },
];

export default function ProfileSwitcher({ currentProfile, onProfileChange, heroMode, onHeroModeChange }) {
  const [open, setOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 990,
      }}
    >
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: '52px',
            right: 0,
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            padding: '20px',
            borderRadius: '4px',
            width: '280px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '8px',
            }}
          >
            Switch Profile Template
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {PROFILES.map((p) => {
              const active = currentProfile === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onProfileChange(p.id);
                    onHeroModeChange(p.heroMode);
                  }}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: active ? 'rgba(199, 91, 50, 0.08)' : 'transparent',
                    border: active ? '1px solid var(--accent)' : '1px solid transparent',
                    borderRadius: '2px',
                    color: active ? 'var(--accent)' : 'var(--primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: active ? 700 : 500 }}>{p.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--secondary)' }}>{p.role}</div>
                  </div>
                  {active && <Check size={14} />}
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
            <div
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '10px',
                color: 'var(--secondary)',
                letterSpacing: '0.08em',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              Hero Layout Mode
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {['portrait', 'textFirst', 'contentFirst', 'quoteFirst'].map((hm) => (
                <button
                  key={hm}
                  type="button"
                  onClick={() => onHeroModeChange(hm)}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-label)',
                    padding: '4px 8px',
                    background: heroMode === hm ? 'var(--primary)' : 'var(--bg)',
                    color: heroMode === hm ? 'var(--bg)' : 'var(--secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {hm}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setCursor('link')}
        onMouseLeave={resetCursor}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--primary)',
          color: 'var(--bg)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 16px',
          borderRadius: '30px',
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          cursor: 'pointer',
        }}
      >
        <Sliders size={14} color="var(--accent)" />
        <span>Mode: {currentProfile}</span>
      </button>
    </div>
  );
}
