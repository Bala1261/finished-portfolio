import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only disable custom cursor on pure touch-only devices (e.g. mobile phones without hover)
    const isTouchOnly =
      window.matchMedia &&
      window.matchMedia('(pointer: coarse) and (hover: none)').matches;

    if (isTouchOnly) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('custom-cursor-enabled');

    // Position centered initially off-screen
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });

    // GSAP quickTo functions for instant dot and elastic trailing ring
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power3.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power3.out' });

    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.2, ease: 'power2.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.2, ease: 'power2.out' });

    let hasMoved = false;
    let lastX = 0;
    let lastY = 0;
    let currentAngle = 0;
    let stopTimeout = null;
    let isHoveringInteractive = false;
    let isHoveringLabel = false;

    const getShortestAngle = (from, to) => {
      let diff = (to - from) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      return from + diff;
    };

    const onMouseMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      const clientX = e.clientX;
      const clientY = e.clientY;

      dotXTo(clientX);
      dotYTo(clientY);
      ringXTo(clientX);
      ringYTo(clientY);

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Dynamic stretch along movement direction when moving quickly
      if (speed > 2 && !isHoveringLabel) {
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        currentAngle = getShortestAngle(currentAngle, rawAngle);

        const stretch = Math.min(1 + speed * 0.008, 1.4);
        const squash = Math.max(1 - speed * 0.004, 0.75);
        const baseScale = isHoveringInteractive ? 1.55 : 1;

        gsap.to(ring, {
          rotation: currentAngle,
          scaleX: baseScale * stretch,
          scaleY: baseScale * squash,
          duration: 0.15,
          ease: 'power1.out',
          overwrite: 'auto',
        });

        if (stopTimeout) clearTimeout(stopTimeout);
        stopTimeout = setTimeout(() => {
          gsap.to(ring, {
            rotation: 0,
            scaleX: isHoveringInteractive ? 1.55 : 1,
            scaleY: isHoveringInteractive ? 1.55 : 1,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              currentAngle = 0;
            },
          });
        }, 50);
      }

      lastX = clientX;
      lastY = clientY;

      // Dark background section detection
      const darkEl = e.target.closest && e.target.closest('[data-cursor-dark]');
      setIsDarkSection(!!darkEl);
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: 'power2.out' });
      gsap.to(dot, { scale: 1.35, duration: 0.15, ease: 'power2.out' });
    };

    const onMouseUp = () => {
      const targetScale = isHoveringLabel ? 2.2 : isHoveringInteractive ? 1.55 : 1;
      gsap.to(ring, { scale: targetScale, duration: 0.25, ease: 'elastic.out(1, 0.5)' });
      gsap.to(dot, { scale: isHoveringLabel ? 0 : isHoveringInteractive ? 0.6 : 1, duration: 0.2 });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      // Project Card Hover ("VIEW")
      if (target.closest('[data-cursor="view"]')) {
        isHoveringLabel = true;
        isHoveringInteractive = false;
        setCursorLabel('VIEW');
        gsap.to(ring, { scale: 2.2, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.15 });
        return;
      }

      // Resume Download Hover ("PDF ↓")
      if (target.closest('[data-cursor="resume"]')) {
        isHoveringLabel = true;
        isHoveringInteractive = false;
        setCursorLabel('PDF ↓');
        gsap.to(ring, { scale: 2.2, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.15 });
        return;
      }

      // Buttons / Links / Interactive elements
      if (target.closest('button, a, .magnetic-btn, [data-cursor="pointer"]')) {
        isHoveringInteractive = true;
        isHoveringLabel = false;
        setCursorLabel('');
        gsap.to(ring, { scale: 1.55, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { opacity: 1, scale: 0.6, duration: 0.2 });
        return;
      }
    };

    const onMouseOut = (e) => {
      const fromEl = e.target;
      const toEl = e.relatedTarget;
      if (!fromEl || !fromEl.closest) return;

      if (
        fromEl.closest('[data-cursor="view"]') ||
        fromEl.closest('[data-cursor="resume"]') ||
        fromEl.closest('button, a, .magnetic-btn, [data-cursor="pointer"]')
      ) {
        if (!toEl || !toEl.closest || !toEl.closest('[data-cursor], button, a, .magnetic-btn')) {
          isHoveringInteractive = false;
          isHoveringLabel = false;
          setCursorLabel('');
          gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' });
          gsap.to(dot, { opacity: 1, scale: 1, duration: 0.25 });
        }
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      hasMoved = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      if (stopTimeout) clearTimeout(stopTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      className="custom-cursor-container pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Elastic Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] will-change-transform rounded-full flex items-center justify-center transition-colors duration-200 select-none ${
          isDarkSection
            ? 'border border-white/60 bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
            : 'border border-[#145BFF]/50 bg-[#145BFF]/5 shadow-[0_0_10px_rgba(20,91,255,0.15)]'
        }`}
        style={{ width: '38px', height: '38px' }}
      >
        {/* Context Label inside expanded ring */}
        {cursorLabel && (
          <span
            className={`text-[9px] font-heading font-extrabold tracking-wider uppercase select-none transition-colors duration-200 ${
              isDarkSection ? 'text-white' : 'text-[#145BFF]'
            }`}
          >
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Precise Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform rounded-full transition-colors duration-200 select-none ${
          isDarkSection
            ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
            : 'bg-[#145BFF] shadow-[0_0_8px_rgba(20,91,255,0.55)]'
        }`}
        style={{ width: '7px', height: '7px' }}
      />
    </div>
  );
}
