import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { BookOpen, ExternalLink, FileText } from 'lucide-react';

export default function ResearchSection() {
  const { researchEntries } = useProfile();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Hide section completely if empty
  if (!researchEntries || researchEntries.length === 0) {
    return null;
  }

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-10 sm:py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="section-eyebrow">
            <BookOpen size={13} />
            <span>Research &amp; Publications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Academic <span className="text-gradient-violet">Research &amp; Papers.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {researchEntries.map((item, idx) => (
            <motion.div
              key={item.id || item.title || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel-hover p-6 sm:p-8 space-y-4 relative group border border-[#DCE6F3] hover:border-[#0EA5E9]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F3] flex-wrap gap-2">
                  {item.journal && (
                    <span className="text-xs font-bold text-[#0EA5E9] font-mono">
                      {item.journal}
                    </span>
                  )}
                  {item.year && (
                    <span className="text-xs text-[#64748B] font-mono">
                      {item.year}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                  {item.title}
                </h3>

                {(item.abstract || item.description) && (
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.abstract || item.description}
                  </p>
                )}
              </div>

              {item.link && (
                <div className="pt-4 border-t border-[#DCE6F3]">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0EA5E9] hover:text-[#2563EB]"
                  >
                    <ExternalLink size={13} />
                    <span>Read Publication</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
