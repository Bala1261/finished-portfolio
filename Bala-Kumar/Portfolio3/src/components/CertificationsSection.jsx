import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';

export default function CertificationsSection() {
  const { certificateEntries } = useProfile();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Hide section completely if empty
  if (!certificateEntries || certificateEntries.length === 0) {
    return null;
  }

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-10 sm:py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="section-eyebrow">
            <Award size={13} />
            <span>Certifications &amp; Credentials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Technical <span className="text-gradient-violet">Certifications.</span>
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {certificateEntries.map((cert, idx) => (
            <motion.div
              key={cert.id || cert.title || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel-hover p-6 sm:p-8 space-y-4 relative group border border-[#DCE6F3] hover:border-[#0EA5E9]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F3] flex-wrap gap-2">
                  {cert.issuer && (
                    <span className="text-xs font-bold text-[#0EA5E9] font-mono flex items-center gap-1.5">
                      <Award size={13} />
                      {cert.issuer}
                    </span>
                  )}
                  {(cert.period || cert.year) && (
                    <span className="text-xs text-[#64748B] font-mono flex items-center gap-1.5">
                      <Calendar size={13} />
                      {cert.period || cert.year}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                {cert.description && (
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#DCE6F3] flex items-center justify-between text-xs font-medium text-[#10B981]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Verified Credential</span>
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0EA5E9] hover:text-[#2563EB] underline font-mono text-[11px]"
                  >
                    View Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
