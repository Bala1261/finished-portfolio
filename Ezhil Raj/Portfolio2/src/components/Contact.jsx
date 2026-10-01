import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, Copy, Check, Calendar, Phone } from 'lucide-react';
import LinkedinIcon from './LinkedinIcon';
import MagneticButton from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { contact } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [headingPart1, headingPart2] = contact.heading.split('\n');

  return (
    <section
      id="contact"
      data-cursor-dark
      className="py-16 md:py-24 bg-[#071426] text-white relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#145BFF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#3278FF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-heading font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            GET IN TOUCH
          </div>

          {/* Large Headline */}
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white">
            <span>{headingPart1}</span>
            <br />
            <span className="text-[#3278FF]">{headingPart2}</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
            {contact.subheading}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton
              variant="white"
              href={`mailto:${contact.email}`}
              className="gap-2.5 !px-8 !py-4 text-base font-bold shadow-lg"
            >
              <Mail className="w-4 h-4 text-[#145BFF]" />
              <span>Send Email</span>
            </MagneticButton>

            <MagneticButton
              variant="dark"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2.5 !px-8 !py-4 text-base !border-white/20"
            >
              <LinkedinIcon className="w-4 h-4 text-[#3278FF]" />
              <span>LinkedIn Profile</span>
            </MagneticButton>
          </div>

          {/* Contact Details Card */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            
            {/* Email Block with Copy */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors group">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-1">
                Direct Email
              </div>
              <div className="font-heading font-semibold text-sm sm:text-base text-white truncate mb-2">
                {contact.email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs text-[#3278FF] hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to clipboard!' : 'Copy address'}</span>
              </button>
            </div>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-1">
                Location & Relocation
              </div>
              <div className="font-heading font-semibold text-sm sm:text-base text-white mb-2">
                {contact.location}
              </div>
              <div className="text-xs text-gray-400">
                Open to hybrid, onsite & global assignments
              </div>
            </div>

            {/* Availability */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors">
              <div className="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-1">
                Timeline & Scope
              </div>
              <div className="font-heading font-semibold text-sm sm:text-base text-emerald-400 mb-2">
                Immediate / Fall 2026
              </div>
              <div className="text-xs text-gray-400">
                Full-time roles, strategy advisory & consulting
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
