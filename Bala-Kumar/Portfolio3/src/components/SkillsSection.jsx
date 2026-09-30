import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Terminal } from 'lucide-react';

export default function SkillsSection() {
  const { skillEntries } = useProfile();

  // Hide section completely if no skills exist
  if (!skillEntries || skillEntries.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="relative py-10 sm:py-14 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0EA5E9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="section-eyebrow">
            <Terminal size={13} />
            <span>Skills &amp; Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Technical <span className="text-gradient-violet">Competencies &amp; Tools.</span>
          </h2>
        </div>

        {/* Skills Pills Presentation */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-2">
          {skillEntries.map((skill, idx) => {
            const skillName = typeof skill === 'string' ? skill : skill.name;
            const category = typeof skill === 'object' ? skill.category : null;

            return (
              <motion.div
                key={skillName + idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.02 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="glass-panel-hover px-4 sm:px-5 py-2.5 sm:py-3 border border-[#DCE6F3] hover:border-[#0EA5E9]/50 flex items-center gap-2 rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                <span className="text-xs sm:text-sm font-semibold text-[#111827] hover:text-[#0EA5E9]">
                  {skillName}
                </span>
                {category && (
                  <span className="text-[10px] font-mono text-[#0EA5E9] px-1.5 py-0.5 rounded bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 ml-1">
                    {category}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}