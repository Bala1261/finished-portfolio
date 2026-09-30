import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { User, Target, CheckCircle2, Sparkles, FileText } from 'lucide-react';

export default function IdentitySection() {
  const { user, profile } = useProfile();

  return (
    <section className="relative pt-24 sm:pt-28 pb-10 overflow-hidden">
      {/* Background Volumetric Glow Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-10 relative overflow-hidden border border-[#DCE6F3] shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Portrait Image Block */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center">
              <div className="relative group">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-[#DCE6F3] shadow-md relative bg-white">
                  <img
                    src={user.photoUrl || '/avatar.jpg'}
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/avatar.jpg';
                    }}
                  />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] opacity-20 blur-lg -z-10 group-hover:opacity-40 transition-opacity" />
              </div>
            </div>

            {/* Profile Information Block */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4 text-center md:text-left">
              <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                <div className="section-eyebrow mb-0">
                  <User size={13} />
                  <span>About &amp; Identity</span>
                </div>

                {/* Conditional Availability Badge */}
                {user.openToHire && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Open to Work</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
                {user.name}
              </h1>

              <div className="text-lg sm:text-xl font-semibold text-gradient-violet">
                {profile.headline}
              </div>

              {profile.bio && (
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-3xl">
                  {profile.bio}
                </p>
              )}

              {/* Optional Career Goal */}
              {profile.careerGoal && (
                <div className="p-4 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-xs sm:text-sm text-[#111827] font-medium flex items-start gap-3">
                  <Target size={18} className="text-[#0EA5E9] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#0EA5E9] font-bold block mb-0.5 font-mono uppercase text-[11px] tracking-wider">Career Objective</span>
                    <span>{profile.careerGoal}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
