import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'left', // 'left' | 'center'
  className = '',
  dark = false,
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-6 sm:mb-8 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-widest mb-3 border ${
          dark
            ? 'bg-white/10 text-white border-white/20'
            : 'bg-[#EAF1FF] text-[#145BFF] border-[#145BFF]/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-white' : 'bg-[#145BFF]'}`} />
          {badge}
        </div>
      )}

      {title && (
        <h2 className={`font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight ${
          dark ? 'text-white' : 'text-[#101828]'
        }`}>
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`mt-2.5 text-sm sm:text-base md:text-lg leading-relaxed font-normal ${
          dark ? 'text-gray-300' : 'text-[#667085]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
