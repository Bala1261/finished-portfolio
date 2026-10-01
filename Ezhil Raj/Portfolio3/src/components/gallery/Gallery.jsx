import { useState } from 'react';
import { gallery as galleryConfig } from '../../data/portfolio.config';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';
import Lightbox from '../lightbox/Lightbox';

function MasonryGallery({ images, onOpen }) {
  const { setCursor } = useCursor();
  return (
    <div className="masonry-grid">
      {images.map((img, i) => (
        <div
          key={i}
          className="masonry-item"
          onClick={() => onOpen(i)}
          onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
          onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
        >
          <img src={img.src} alt={img.alt || ''} loading="lazy" />
          <div className="masonry-item-overlay">
            <span className="text-label" style={{ color: 'rgba(244,241,234,0.7)', fontSize: '0.5625rem' }}>
              {img.alt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function EditorialGallery({ images, onOpen }) {
  const { setCursor } = useCursor();
  const pairs = [];
  for (let i = 0; i < images.length; i += 3) {
    pairs.push(images.slice(i, i + 3));
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {pairs.map((group, gi) => (
        <div key={gi} className="editorial-grid">
          {group[0] && (
            <div
              className="editorial-item editorial-large"
              style={{ height: 'clamp(300px,45vh,580px)' }}
              onClick={() => onOpen(gi * 3)}
              onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
              onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
            >
              <img src={group[0].src} alt={group[0].alt} loading="lazy" />
            </div>
          )}
          <div className="editorial-small">
            {group.slice(1).map((img, si) => (
              <div
                key={si}
                className="editorial-item"
                style={{ height: 'clamp(140px,21vh,280px)' }}
                onClick={() => onOpen(gi * 3 + si + 1)}
                onMouseEnter={() => setCursor(CURSOR_STATES.VIEW)}
                onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = galleryConfig.images;

  if (!images?.length) return null;

  return (
    <section
      id="gallery"
      style={{
        background: 'var(--color-bg-2)',
        padding: 'var(--section-py) var(--section-px)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.75rem' }}>Gallery</p>
          <h2 className="text-editorial" style={{ color: 'var(--color-text)' }}>
            Selected Images
          </h2>
        </div>
        <p className="text-label" style={{ color: 'var(--color-muted)' }}>{images.length} Works</p>
      </div>

      {galleryConfig.mode === 'masonry' ? (
        <MasonryGallery images={images} onOpen={setLightboxIndex} />
      ) : (
        <EditorialGallery images={images} onOpen={setLightboxIndex} />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
