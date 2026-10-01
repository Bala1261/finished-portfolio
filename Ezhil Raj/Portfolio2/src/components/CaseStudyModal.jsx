import React, { useEffect } from 'react';
import { X, CheckCircle2, Award, Wrench, Lightbulb, Compass, Target, ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll while modal is active
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#071426]/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 border border-[rgba(16,24,40,0.12)] shadow-2xl animate-in zoom-in-95 duration-200"
        data-lenis-prevent
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-10 py-5 border-b border-[rgba(16,24,40,0.08)] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="font-heading font-extrabold text-xs sm:text-sm text-[#145BFF] bg-[#EAF1FF] px-3 py-1 rounded-full">
              CASE STUDY {project.id}
            </span>
            <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider hidden sm:inline">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#EAF1FF] hover:text-[#145BFF] flex items-center justify-center text-[#101828] transition-colors focus:outline-none"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Title and Tagline */}
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#101828] leading-tight mb-3">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#145BFF] font-medium leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Key Impact Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)]">
            {project.metrics.map((metric, mIdx) => (
              <div key={mIdx} className="text-center sm:text-left">
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#101828]">
                  {metric.value}
                </div>
                <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#667085] mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Structured Analysis Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Challenge */}
            <div className="p-6 rounded-2xl border border-[rgba(16,24,40,0.08)] bg-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-rose-600">
                <Target className="w-4 h-4" />
                The Business Challenge
              </div>
              <p className="text-sm text-[#475467] leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            {/* 2. Research & Hypothesis */}
            <div className="p-6 rounded-2xl border border-[rgba(16,24,40,0.08)] bg-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-amber-600">
                <Compass className="w-4 h-4" />
                Empirical Research & Data
              </div>
              <p className="text-sm text-[#475467] leading-relaxed">
                {caseStudy.research}
              </p>
            </div>

            {/* 3. Strategic Approach */}
            <div className="p-6 rounded-2xl border border-[rgba(16,24,40,0.08)] bg-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#145BFF]">
                <Lightbulb className="w-4 h-4" />
                Strategic Approach
              </div>
              <p className="text-sm text-[#475467] leading-relaxed">
                {caseStudy.approach}
              </p>
            </div>

            {/* 4. Execution & Solution */}
            <div className="p-6 rounded-2xl border border-[rgba(16,24,40,0.08)] bg-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-emerald-600">
                <Award className="w-4 h-4" />
                Implementation & Solution
              </div>
              <p className="text-sm text-[#475467] leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>

          </div>

          {/* Tools & Technologies */}
          <div>
            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#667085] mb-3">
              <Wrench className="w-4 h-4 text-[#145BFF]" />
              Analytical Tools & Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {caseStudy.toolsUsed.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)] text-xs font-heading font-semibold text-[#101828]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quantified Results */}
          <div className="p-6 rounded-2xl bg-[#EAF1FF]/50 border border-[#145BFF]/20 space-y-4">
            <div className="font-heading font-bold text-base text-[#101828]">
              Quantified Outcomes & Bottom-Line Impact
            </div>
            <div className="space-y-3">
              {caseStudy.results.map((res, rIdx) => (
                <div key={rIdx} className="flex items-start gap-3 text-sm text-[#344054]">
                  <CheckCircle2 className="w-4 h-4 text-[#145BFF] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Executive Learnings */}
          <div className="pt-6 border-t border-[rgba(16,24,40,0.08)]">
            <div className="text-xs font-heading font-bold uppercase tracking-wider text-[#667085] mb-2">
              Executive Takeaway & Governance Insight
            </div>
            <p className="text-sm sm:text-base text-[#101828] font-medium leading-relaxed italic bg-[#F7F9FC] p-4 rounded-xl border-l-4 border-[#145BFF]">
              "{caseStudy.learnings}"
            </p>
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[rgba(16,24,40,0.08)]">
            <MagneticButton variant="primary" onClick={onClose}>
              Close Case Study
            </MagneticButton>
          </div>

        </div>
      </div>
    </div>
  );
}
