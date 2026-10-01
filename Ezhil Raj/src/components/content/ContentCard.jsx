import React from 'react';
import { useCursor } from '../../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export default function ContentCard({ item, onSelect }) {
  const { setCursor, resetCursor, showPreview, hidePreview } = useCursor();

  const handleMouseEnter = () => {
    setCursor('read', 'READ →');
    if (item.image) {
      showPreview(item.image, item.title, item.category);
    }
  };

  const handleMouseLeave = () => {
    resetCursor();
    hidePreview();
  };

  return (
    <article
      className="content-card"
      onClick={() => onSelect(item.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item.id);
        }
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="content-card__image"
          loading="lazy"
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="content-card__tag">{item.category}</span>
        <ArrowUpRight size={16} className="secondary-color" />
      </div>

      <h3 className="content-card__title">{item.title}</h3>

      <p className="content-card__excerpt">{item.excerpt}</p>

      <div className="content-card__footer">
        <span>{item.readTime}</span>
        <span className="content-card__footer-dot" />
        <span>{item.date}</span>
      </div>
    </article>
  );
}
