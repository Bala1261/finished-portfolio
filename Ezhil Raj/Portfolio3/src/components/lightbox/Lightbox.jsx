import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useCursor, CURSOR_STATES } from '../../context/CursorContext';

export default function Lightbox({ images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const { setCursor } = useCursor();

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  // Enter animation
  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  // Image swap animation
  const animateImg = useCallback(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => { animateImg(); }, [index]);

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  // Touch/swipe
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) next();
    if (dx > 50)  prev();
    touchStartX.current = null;
  };

  const current = images[index];

  return createPortal(
    <div
      ref={overlayRef}
      className="lightbox"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Close */}
      <button
        className="lightbox-close"
        onClick={handleClose}
        aria-label="Close lightbox"
        onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
        onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
      >
        ✕
      </button>

      {/* Image */}
      <div className="lightbox-img-wrap">
        <img
          ref={imgRef}
          src={current.src}
          alt={current.alt || ''}
          className="lightbox-img"
        />
      </div>

      {/* Caption */}
      {current.alt && (
        <p
          className="text-caption"
          style={{ marginTop: '1rem', textAlign: 'center' }}
        >
          {current.alt}
        </p>
      )}

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav-btn prev"
            onClick={prev}
            aria-label="Previous image"
            onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
            onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
          >
            ←
          </button>
          <button
            className="lightbox-nav-btn next"
            onClick={next}
            aria-label="Next image"
            onMouseEnter={() => setCursor(CURSOR_STATES.LINK)}
            onMouseLeave={() => setCursor(CURSOR_STATES.DEFAULT)}
          >
            →
          </button>
        </>
      )}

      {/* Counter */}
      <div className="lightbox-counter">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>,
    document.body
  );
}
