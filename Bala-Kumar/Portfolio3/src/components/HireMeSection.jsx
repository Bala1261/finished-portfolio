import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function HireMeSection() {
  const { user } = useProfile();

  const hireRoute = '/pages/contact.html#contact';

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Background Volumetric Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0EA5E9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 sm:p-12 relative overflow-hidden border border-[#DCE6F3] shadow-md space-y-8"
        >
          {/* Eyebrow Pill */}
          <div className="flex justify-center">
            <div className="section-eyebrow mb-0">
              <Briefcase size={14} />
              <span>BEXO Platform Hiring Handoff</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
              Hire <span className="animate-shimmer">{user.name}</span>
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto leading-relaxed">
              Initiate contract engagements, full-time positions, or custom development projects via BEXO&apos;s verified platform hiring system.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto py-2">
            <div className="p-3.5 rounded-xl bg-white/80 border border-[#DCE6F3] space-y-1">
              <ShieldCheck size={18} className="text-[#0EA5E9]" />
              <div className="text-xs font-bold text-[#111827] font-mono">Verified Profile</div>
              <div className="text-[11px] text-[#64748B]">Authenticated talent record</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-[#DCE6F3] space-y-1">
              <Sparkles size={18} className="text-[#0EA5E9]" />
              <div className="text-xs font-bold text-[#111827] font-mono">Fast Handoff</div>
              <div className="text-[11px] text-[#64748B]">Direct hiring workflow</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-[#DCE6F3] space-y-1">
              <CheckCircle2 size={18} className="text-[#10B981]" />
              <div className="text-xs font-bold text-[#111827] font-mono">Secure Process</div>
              <div className="text-[11px] text-[#64748B]">Protected platform escrow</div>
            </div>
          </div>

          {/* Primary Action Button (Handoff to /hire-me/{handle}) */}
          <div className="space-y-4 pt-2">
            <a
              href={hireRoute}
              className="btn-primary py-4 px-8 text-base font-bold w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/30 hover:scale-105 transition-all"
            >
              <span>Continue to BEXO Hiring Workflow</span>
              <ArrowRight size={18} />
            </a>

            {/* Accessible Fallback Direct Link */}
            <div className="text-xs text-[#64748B] font-mono pt-2">
              Destination Route: <a href={hireRoute} className="text-[#0EA5E9] underline hover:text-[#2563EB]">{hireRoute}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
