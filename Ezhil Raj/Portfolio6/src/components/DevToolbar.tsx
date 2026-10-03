import React from 'react';
import { FixtureKey, FIXTURES } from '../data/portfolio';
import { Layers, Check } from 'lucide-react';
import './DevToolbar.css';

interface DevToolbarProps {
  currentFixture: FixtureKey;
  onSelectFixture: (key: FixtureKey) => void;
}

export const DevToolbar: React.FC<DevToolbarProps> = ({ currentFixture, onSelectFixture }) => {
  // Render during local development OR when testing via ?demo=1 or ?dev=1
  const isDev =
    import.meta.env.DEV ||
    (typeof window !== 'undefined' &&
      (window.location.search.includes('demo=1') || window.location.search.includes('dev=1')));

  if (!isDev) {
    return null;
  }

  return (
    <aside className="bexo-dev-toolbar" aria-label="Development BEXO Test Panel">
      <div className="bexo-dev-toolbar-inner">
        <div className="bexo-dev-tag">
          <Layers className="bexo-dev-icon" aria-hidden="true" />
          <span>BEXO TEST FIXTURE:</span>
        </div>

        <div className="bexo-dev-buttons">
          {(Object.keys(FIXTURES) as FixtureKey[]).map((key) => {
            const isSelected = currentFixture === key;
            return (
              <button
                key={key}
                type="button"
                className={`bexo-dev-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectFixture(key)}
              >
                {isSelected && <Check className="bexo-dev-check" aria-hidden="true" />}
                <span>{FIXTURES[key].name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
