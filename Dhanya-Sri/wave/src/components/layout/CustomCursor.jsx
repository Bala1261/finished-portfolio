import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2"
      style={{
        transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
        transition: 'none'
      }}
    >
      {/* Single dot cursor */}
      <div className="w-full h-full rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
    </div>
  );
};

export default CustomCursor;
