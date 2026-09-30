import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function EducationSection() {
  const { educationEntries } = useProfile();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Hide section completely if empty
  if (!educationEntries || educationEntries.length === 0) {
    return null;
  }

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-10 sm:py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="section-eyebrow">
            <GraduationCap size={13} />
            <span>Academic Qualifications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Academic <span className="text-gradient-violet">Education &amp; Background.</span>
          </h2>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {educationEntries.map((item, idx) => (
            <motion.div
              key={item.id || item.degree || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel-hover p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden border border-[#DCE6F3] hover:border-[#0EA5E9]/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F3] flex-wrap gap-2">
                  <span className="text-xs text-[#0EA5E9] font-mono flex items-center gap-1.5 font-medium">
                    <Calendar size={13} />
                    {item.period || item.year}
                  </span>
                  {(item.grade || item.cgpa) && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981]">
                      {item.grade || item.cgpa}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                    {item.degree}
                  </h3>
                  <div className="text-sm text-[#64748B] flex items-center gap-2 mt-2 font-medium flex-wrap">
                    <span>{item.institution}</span>
                    {item.location && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="flex items-center gap-1 text-[#64748B]">
                          <MapPin size={13} className="text-[#0EA5E9]" /> {item.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#111827]">
                        <CheckCircle2 size={13} className="text-[#0EA5E9] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}