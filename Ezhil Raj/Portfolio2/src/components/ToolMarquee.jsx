import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function ToolMarquee() {
  const { toolMarquee } = portfolioData;

  // Duplicate items for seamless continuous looping
  const marqueeItems = [...toolMarquee, ...toolMarquee];

  return (
    <div className="py-6 bg-white border-y border-[rgba(16,24,40,0.06)] overflow-hidden relative select-none">
      {/* Edge gradient masks for subtle fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee items-center">
        {marqueeItems.map((tool, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-[#475467] hover:text-[#145BFF] transition-colors duration-200">
              {tool}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#145BFF] ml-12 opacity-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
