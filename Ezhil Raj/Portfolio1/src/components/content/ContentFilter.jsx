import React from 'react';
import { useCursor } from '../../context/CursorContext';

export default function ContentFilter({ categories, activeCategory, onSelectCategory }) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="content-filter" role="tablist" aria-label="Filter articles by category">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`content-filter__btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
