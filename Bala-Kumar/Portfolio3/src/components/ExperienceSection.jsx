import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Calendar, Building2, Briefcase, ExternalLink, Globe, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection() {
  const { experienceEntries } = useProfile();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Hide section completely if empty
  if (!experienceEntries || experienceEntries.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-10 sm:py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="section-eyebrow">
            <Briefcase size={13} />
            <span>Professional Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Work Experience &amp; <span className="text-gradient-violet">Track Record.</span>
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {experienceEntries.map((exp, idx) => {
            const techList = exp.tech || exp.stack || [];

            return (
              <motion.div
                key={exp.id || exp.company || idx}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-panel-hover p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group border border-[#DCE6F3] hover:border-[#0EA5E9]/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#DCE6F3] flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 text-[#0EA5E9]">
                      {exp.type || 'Experience'}
                    </span>

                    <span className="text-xs text-[#64748B] flex items-center gap-1.5 font-mono">
                      <Calendar size={13} className="text-[#0EA5E9]" />
                      {exp.period || exp.year}
                    </span>
                  </div>

                  {/* Role & Company Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#111827] tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                          {exp.role}
                        </h3>
                        {exp.company && (
                          <div className="text-sm font-semibold text-[#0EA5E9] flex items-center gap-1.5 mt-1">
                            <Building2 size={15} />
                            <span>{exp.company}</span>
                          </div>
                        )}
                      </div>

                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 border border-[#0EA5E9]/25 text-[#0EA5E9] text-xs font-mono font-medium transition-all shadow-xs shrink-0"
                          title={`Visit ${exp.displayUrl || exp.website}`}
                        >
                          <Globe size={13} />
                          <span>{exp.displayUrl || 'Website'}</span>
                          <ExternalLink size={11} className="text-[#0EA5E9]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {/* Bullets */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-[#111827]">
                          <CheckCircle2 size={14} className="text-[#0EA5E9] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {techList.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-semibold">
                        Technologies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {techList.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-[#DCE6F3] text-[#0EA5E9] font-mono font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}