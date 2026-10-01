import React, { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'ghost'
  dataCursor,
  strength = 0.28,
  ...props
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    // Disable on touch devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const el = buttonRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1.1, 0.4)',
    });
  };

  const variantStyles = {
    primary:
      'bg-[#145BFF] hover:bg-[#0E4BE3] text-white border border-[#145BFF] shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary:
      'bg-white hover:bg-[#F7F9FC] text-[#101828] border border-[rgba(16,24,40,0.14)] hover:border-[#145BFF] hover:text-[#145BFF] shadow-sm',
    dark:
      'bg-[#071426] hover:bg-[#0D1E36] text-white border border-white/10 hover:border-white/30 shadow-sm',
    ghost:
      'bg-transparent hover:bg-black/5 text-[#101828] border border-transparent hover:border-[rgba(16,24,40,0.12)]',
    white:
      'bg-white text-[#071426] hover:bg-[#EAF1FF] border border-white/90 shadow-md',
  };

  const baseClasses = `magnetic-btn inline-flex items-center justify-center font-heading font-semibold text-[15px] px-6 py-3.5 rounded-full transition-colors duration-200 select-none group will-change-transform ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor={dataCursor}
        className={baseClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}
