import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps children in a clip-path reveal triggered by ScrollTrigger.
 * direction: 'left' | 'bottom' | 'center'
 */
export default function ClipReveal({ children, direction = 'bottom', delay = 0, className = '' }) {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const clipStart = {
      left:   'inset(0 100% 0 0)',
      bottom: 'inset(100% 0 0 0)',
      center: 'inset(50% 0 50% 0)',
    }[direction] || 'inset(100% 0 0 0)';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: clipStart },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          delay,
          scrollTrigger: {
            trigger: wrap,
            start: 'top 85%',
          },
        }
      );
      gsap.fromTo(
        inner,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: wrap,
            start: 'top 85%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={wrapRef} className={`clip-reveal ${className}`} style={{ overflow: 'hidden' }}>
      <div ref={innerRef} className="clip-reveal-inner">
        {children}
      </div>
    </div>
  );
}
