import React, { useState } from 'react';
import { ArrowUpRight, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';
import CaseStudyModal from './CaseStudyModal';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  // Map project visual assets
  const getProjectVisual = (project, index) => {
    if (index === 0) return '/dashboard_retail.jpg';
    if (index === 1) return '/dashboard_saas.jpg';
    // For 3 & 4, reuse or styled executive mockups
    if (index === 2) return '/dashboard_retail.jpg';
    return '/dashboard_saas.jpg';
  };

  // Interactive visual tilt on mouse move
  const handleVisualMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleVisualMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="py-14 md:py-20 bg-[#F7F9FC] relative border-b border-[rgba(16,24,40,0.06)]">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        
        <SectionHeading
          badge="SELECTED WORK"
          title="Featured Case Studies & Analytics"
          subtitle="Real-world strategic transformations, corporate valuations, and business intelligence cockpits delivered with measurable commercial ROI."
        />

        <div className="space-y-8 sm:space-y-10">
          {projects.map((project, idx) => {
            const isVisualLeft = idx % 2 === 1; // Project 02 & 04: visual left / text right

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[rgba(16,24,40,0.08)] shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center ${
                  isVisualLeft ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* TEXT COLUMN */}
                  <div className={`lg:col-span-6 space-y-6 ${isVisualLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Index & Category */}
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-black text-3xl sm:text-4xl text-[#145BFF]/30 tracking-tight">
                        {project.id}
                      </span>
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#145BFF] bg-[#EAF1FF] px-3 py-1 rounded-full border border-[#145BFF]/15">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#101828] leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-[#145BFF] mt-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Metrics Pill Grid */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-[rgba(16,24,40,0.06)]">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="font-heading font-black text-lg sm:text-xl text-[#101828]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[#667085] leading-tight mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-md bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)] text-xs font-heading font-medium text-[#475467]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <MagneticButton
                        variant="primary"
                        onClick={() => setSelectedProject(project)}
                        className="gap-2 text-sm !px-6 !py-3"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </MagneticButton>
                    </div>

                  </div>

                  {/* VISUAL COLUMN (Interactive with "VIEW" Cursor) */}
                  <div className={`lg:col-span-6 ${isVisualLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => setSelectedProject(project)}
                      onMouseMove={handleVisualMouseMove}
                      onMouseLeave={handleVisualMouseLeave}
                      data-cursor="view"
                      style={{ transition: 'transform 0.2s ease-out' }}
                      className="group relative rounded-2xl overflow-hidden border border-[rgba(16,24,40,0.08)] bg-slate-900 shadow-md cursor-pointer select-none will-change-transform"
                    >
                      {/* Dashboard Image with scale on hover */}
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={getProjectVisual(project, idx)}
                          alt={project.title}
                          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* Subtle hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                      {/* Bottom Visual Bar */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                        <div className="flex items-center gap-2 bg-[#071426]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-heading font-medium">
                          <BarChart3 className="w-3.5 h-3.5 text-[#3278FF]" />
                          <span>Interactive BI Model</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/90 text-[#071426] flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
