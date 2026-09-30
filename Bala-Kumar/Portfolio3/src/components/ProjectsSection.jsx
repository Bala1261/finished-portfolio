import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { ArrowUpRight, CheckCircle2, FolderGit2, ExternalLink, FileText } from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function ProjectsSection() {
  const { projectEntries } = useProfile();

  // Hide section completely if empty
  if (!projectEntries || projectEntries.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="relative py-10 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 space-y-3">
          <div className="section-eyebrow">
            <FolderGit2 size={13} />
            <span>Selected Projects</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Featured <span className="text-gradient-violet">Projects &amp; Engineering Work</span>
          </h2>
        </div>

        {/* 2-Column Responsive Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectEntries.map((project, idx) => {
            const stack = project.stack
              ? project.stack
              : project.technologies
              ? project.technologies.split(',').map((s) => s.trim())
              : [];

            const projectUrl = project.link || project.externalLink || project.live || '';

            return (
              <motion.div
                key={project.id || project.title || idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-panel-hover p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group overflow-hidden border border-[#DCE6F3] hover:border-[#0EA5E9]/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F3]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0EA5E9] px-2.5 py-0.5 rounded-md bg-[#0EA5E9]/10 border border-[#0EA5E9]/20">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      {project.category && (
                        <span className="text-[11px] font-mono text-[#64748B] px-2 py-0.5 rounded-md bg-slate-100 border border-[#DCE6F3]">
                          {project.category}
                        </span>
                      )}
                    </div>
                    {project.year && (
                      <span className="text-xs text-[#64748B] font-mono">
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#111827] tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                      {project.title}
                    </h3>
                    {project.role && (
                      <p className="text-xs font-medium text-[#64748B] mt-1">
                        Role: {project.role}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Key Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                        Key Highlights
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 border border-[#DCE6F3] text-xs text-[#111827]"
                          >
                            <CheckCircle2 size={13} className="text-[#0EA5E9] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {stack.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                        Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-[#DCE6F3] text-xs font-medium text-[#0EA5E9]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Row */}
                <div className="pt-5 border-t border-[#DCE6F3] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#111827] hover:text-[#0EA5E9] transition-colors py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 border border-[#DCE6F3] cursor-pointer group/btn shadow-xs"
                      >
                        <GithubIcon size={15} />
                        <span>Source Code</span>
                        <ArrowUpRight
                          size={13}
                          className="text-[#64748B] group-hover/btn:text-[#0EA5E9] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    )}

                    {projectUrl && (
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0EA5E9] hover:text-[#2563EB] transition-colors py-2 px-3.5 rounded-xl bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 cursor-pointer group/btn"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span>View Project</span>
                        <ExternalLink size={13} className="text-[#0EA5E9]" />
                      </a>
                    )}

                    {project.pdf && (
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#111827] transition-colors py-2 px-3 rounded-xl bg-white border border-[#DCE6F3]"
                      >
                        <FileText size={13} />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}