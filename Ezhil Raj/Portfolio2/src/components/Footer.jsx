import React from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ onOpenResume }) {
  const { personal, contact } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      data-cursor-dark
      className="bg-[#050E1B] text-[#98A2B3] py-12 border-t border-white/10"
    >
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Name / Logo */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-heading font-black text-xs">
            DV
          </span>
          <div>
            <div className="font-heading font-bold text-sm text-white">
              {personal.name}
            </div>
            <div className="text-xs text-[#667085]">
              Executive Business Portfolio
            </div>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-heading font-medium text-gray-400">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${contact.email}`}
            data-cursor="pointer"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <button
            onClick={onOpenResume}
            data-cursor="resume"
            className="hover:text-white transition-colors focus:outline-none"
          >
            Resume (PDF)
          </button>
        </div>

        {/* Right: Copyright & Magnetic Back to Top */}
        <div className="flex items-center gap-6">
          <span className="text-xs text-gray-500">
            © 2026 {personal.name}. All rights reserved.
          </span>

          <MagneticButton
            variant="dark"
            onClick={scrollToTop}
            className="!p-2.5 !rounded-full !border-white/20 text-white hover:bg-white hover:text-[#071426] transition-colors"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
