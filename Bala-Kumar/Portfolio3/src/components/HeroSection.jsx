import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import Photo3DModel from './Photo3DModel';
import { ArrowRight, Mail, Sparkles, MapPin, Code2, FileText, CheckCircle2 } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function HeroSection({ onNavigate }) {
  const { user, profile } = useProfile();

  const handlePortfolioClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/pages/portfolio.html');
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden"
    >
      {/* Background Volumetric Glow Orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0EA5E9]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#8B2CF5]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Profile Identity & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          >
            {/* Status Pill Badge */}
            {user.openToHire && (
              <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start mb-4">
                <div className="text-xs text-[#10B981] flex items-center gap-1.5 font-medium px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Available for Opportunities</span>
                </div>
              </div>
            )}

            {/* Profile Name - Responsive & wrapping without overflow */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] mb-2 leading-[1.1] max-w-full break-words">
              Hi, I&apos;m <span className="animate-shimmer">{user.name}</span>
            </h1>

            {/* Profile Designation / Headline */}
            <div className="min-h-12 flex items-center justify-center lg:justify-start mb-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gradient-violet tracking-tight flex items-center gap-2 max-w-full break-words">
                <Code2 className="text-[#0EA5E9] hidden sm:inline-block shrink-0" size={26} />
                <span>{profile.headline}</span>
              </div>
            </div>

            {/* Glowing Gradient Accent Bar */}
            <div className="h-1.5 w-36 bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] rounded-full mb-6 shadow-[0_0_15px_rgba(14,165,233,0.4)]" />

            {/* Profile Bio */}
            {profile.bio && (
              <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed mb-8">
                {profile.bio}
              </p>
            )}

            {/* Required Action Buttons: Dominant "View Portfolio" CTA + Conditional Resume CTA */}
            <div className="flex items-center gap-4 mb-8 flex-wrap justify-center lg:justify-start">
              <a
                href="/pages/portfolio.html"
                onClick={handlePortfolioClick}
                className="btn-primary text-sm font-bold shadow-lg shadow-[#0EA5E9]/30"
              >
                <Sparkles size={16} />
                <span>View Portfolio</span>
                <ArrowRight size={16} />
              </a>

              {/* Conditional Resume CTA button (Displayed ONLY when user.resumeUrl exists) */}
              {user.resumeUrl && (
                <a
                  href={user.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm font-semibold"
                >
                  <FileText size={16} className="text-[#0EA5E9]" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Links Row */}
            {user.socials && (
              <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                {user.socials.github && (
                  <a
                    href={user.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/80 border border-[#DCE6F3] hover:border-[#0EA5E9] text-[#64748B] hover:text-[#111827] hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-[#0EA5E9]/20"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={18} />
                  </a>
                )}

                {user.socials.linkedin && (
                  <a
                    href={user.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/80 border border-[#DCE6F3] hover:border-[#0EA5E9] text-[#64748B] hover:text-[#111827] hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-[#0EA5E9]/20"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                )}

                {user.email && (
                  <a
                    href={`mailto:${user.email}`}
                    className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] text-white hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-md shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50"
                    aria-label="Send Direct Email"
                  >
                    <Mail size={18} />
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Column: 360-Degree Interactive 3D Model Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0EA5E9]/20 via-[#2563EB]/15 to-[#8B2CF5]/15 rounded-3xl blur-2xl -z-10 scale-95" />
            <div className="w-full max-w-sm sm:max-w-md">
              <Photo3DModel photoUrl={user.photoUrl} name={user.name} headline={profile.headline} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}