import React from 'react';
import { FixtureKey, FIXTURES } from '../data/portfolio';
import { Layers, Check } from 'lucide-react';
import './DevToolbar.css';

interface DevToolbarProps {
  currentFixture: FixtureKey;
  onSelectFixture: (key: FixtureKey) => void;
}

export const DevToolbar: React.FC<DevToolbarProps> = ({ currentFixture, onSelectFixture }) => {
  // Only render during local development
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <aside className="bexo-dev-toolbar" aria-label="Development BEXO Test Panel">
      <div className="bexo-dev-toolbar-inner">
        <div className="bexo-dev-tag">
          <Layers className="bexo-dev-icon" aria-hidden="true" />
          <span>BEXO DEV FIXTURE:</span>
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
