import React, { useEffect } from 'react';
import { X, Sparkles, Briefcase, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playCyberTone } from '../utils/audio';

export default function HireMeModal({ isOpen, onClose, profileData }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      playCyberTone(920, 'sine', 0.12, 0.05);
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handle = profileData?.profile?.handle || 'jothimani7806';
  const name = profileData?.user?.name || 'Jothimani';
  const email = profileData?.user?.email || 'jothimani782006@gmail.com';
  const platformHireUrl = `/hire-me/${handle}`;
  const directMailUrl = `mailto:${email}?subject=${encodeURIComponent(`Hiring Inquiry for ${name}`)}&body=${encodeURIComponent(`Hi ${name},\n\nWe came across your portfolio and would love to discuss a potential engineering opportunity with our team.\n\nBest regards,`)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hire-modal-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/30 p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.2)] bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-[#050711]/95 text-white"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playCyberTone(650, 'sine', 0.05, 0.02);
            onClose();
          }}
          aria-label="Close hire modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-4">
          <Briefcase size={13} />
          <span>BEXO Talent Handoff</span>
        </div>

        <h2 id="hire-modal-title" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Hire <span className="text-gradient">{name}</span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          Currently open for <strong>Cloud Engineering</strong>, <strong>DevOps automation</strong>, and <strong>Full-Stack</strong> developer opportunities & internships.
        </p>

        {/* Benefits checklist */}
        <div className="space-y-2.5 mb-7 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
            <span>AWS Infrastructure & Container Orchestration</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
            <span>Automated CI/CD Delivery & Linux Administration</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
            <span>Fast Algorithmic Problem Solving & Full-Stack Agility</span>
          </div>
        </div>

        {/* Primary Platform Handoff Button (BEXO Canonical Contract) */}
        <div className="space-y-3">
          <a
            href={platformHireUrl}
            onClick={() => playCyberTone(1050, 'triangle', 0.12, 0.05)}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(0,240,255,0.35)] hover:shadow-[0_6px_35px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Proceed to Platform Hiring Workflow</span>
            <ArrowUpRight size={17} />
          </a>

          {/* Direct Email Fallback Action (BEXO Section 5) */}
          <a
            href={directMailUrl}
            onClick={() => playCyberTone(880, 'sine', 0.08, 0.03)}
            className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/15 hover:border-cyan-400 text-white font-semibold text-xs tracking-wider uppercase font-mono flex items-center justify-center gap-2 hover:bg-cyan-500/10 transition-all cursor-pointer"
          >
            <Mail size={14} className="text-cyan-400" />
            <span>Direct Email Handoff ({email})</span>
          </a>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-4">
          BEXO Platform Standard · Instant confirmation & direct communication
        </p>
      </div>
    </div>
  );
}
