
import React, { useEffect, useState } from 'react';
import { X, Download, FileText, CheckCircle2, Printer, ExternalLink, Mail, MapPin, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const { personal, experiences, education, achievements } = portfolioData;
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Direct 1-Click File Download
  const handleDirectDownload = () => {
    setDownloadSuccess(true);
    const link = document.createElement('a');
    link.href = '/David_Vance_Executive_Resume.pdf';
    link.download = 'David_Vance_Executive_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  // Browser Print / Save to PDF
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 200);
  };

  return (
    <div className="resume-modal-root fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="resume-modal-backdrop fixed inset-0 bg-[#071426]/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Resume Document Window */}
      <div
        className="resume-modal-window relative bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto z-10 border border-[rgba(16,24,40,0.12)] shadow-2xl flex flex-col"
        data-lenis-prevent
      >
        {/* Header Control Bar */}
        <div className="resume-modal-header sticky top-0 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3.5 border-b border-[rgba(16,24,40,0.08)] flex flex-wrap items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EAF1FF] text-[#145BFF] flex items-center justify-center font-bold shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#101828]">
                {personal.name} — Executive Curriculum Vitae
              </h3>
              <p className="text-[11px] text-[#667085] flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Official Profile • ATS-Compliant PDF • Updated 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Direct Download Button */}
            <button
              onClick={handleDirectDownload}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm ${downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#145BFF] hover:bg-[#0047E0] text-white active:scale-95'
                }`}
              title="Download David_Vance_Executive_Resume.pdf"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Print / Save as PDF Button */}
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#101828] bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
              title="Open browser print / Save as PDF dialog"
            >
              <Printer className="w-3.5 h-3.5 text-[#667085]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#101828] flex items-center justify-center transition-colors"
              aria-label="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Executive Resume Content */}
        <div className="resume-printable-content p-6 sm:p-12 space-y-7 text-[#101828]">

          {/* Header */}
          <div className="border-b border-gray-200 pb-5 text-center sm:text-left">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#071426] tracking-tight">
              {personal.name.toUpperCase()}
            </h1>
            <p className="text-sm sm:text-base font-heading font-semibold text-[#145BFF] mt-1">
              {personal.role}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1.5 gap-x-4 mt-3 text-xs text-[#667085]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#145BFF]" />
                {personal.location}
              </span>
              <span>•</span>
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-[#145BFF] transition-colors">
                <Mail className="w-3 h-3 text-[#145BFF]" />
                {personal.email}
              </a>
              <span>•</span>
              <span>+1 (555) 234-8901</span>
              <span>•</span>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#145BFF] transition-colors">
                <Globe className="w-3 h-3 text-[#145BFF]" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="resume-section-item">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#145BFF] border-b border-gray-200 pb-1 mb-2.5">
              Executive Summary
            </h4>
            <p className="text-xs sm:text-sm text-[#344054] leading-relaxed">
              Results-driven Senior Business Analyst & Strategy Consultant with 3+ years of expertise in corporate finance, operational due diligence, unit-economics restructuring, and enterprise BI dashboard architectures. Proven track record synthesizing multi-million-dollar datasets into actionable C-suite board memos, delivering $6M+ in bottom-line optimization and working capital release across private equity, fintech, and omnichannel retail portfolios.
            </p>
          </div>

          {/* Core Competencies & Toolkit */}
          <div className="resume-section-item">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#145BFF] border-b border-gray-200 pb-1 mb-3">
              Core Competencies & Toolkit
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-[#344054]">
              <div>
                <strong className="text-[#101828]">Strategic & Financial Modeling:</strong> DCF Valuation, 3-Statement Forecasting, LBO, Scenario Sensitivity, Unit Economics
              </div>
              <div>
                <strong className="text-[#101828]">Business Intelligence & Data:</strong> Power BI (DAX, Dataflows), Tableau, SQL (Snowflake/PostgreSQL), Python (Pandas)
              </div>
              <div>
                <strong className="text-[#101828]">Problem-Solving & Governance:</strong> MECE Framework, Pyramid Principle Decks, Commercial Due Diligence, Agile Scrum
              </div>
              <div>
                <strong className="text-[#101828]">Enterprise Tools & Platforms:</strong> Advanced Excel (VBA/Solver), Capital IQ, PitchBook, Jira, Salesforce CRM, dbt
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="resume-section-item">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#145BFF] border-b border-gray-200 pb-1 mb-4">
              Professional Experience
            </h4>
            <div className="space-y-5">
              {experiences.map((exp, idx) => (
                <div key={idx} className="resume-section-item text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center justify-between font-heading font-bold text-[#101828] gap-1">
                    <span>
                      {exp.role} <span className="font-semibold text-[#145BFF]">| {exp.company}</span>
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#667085] font-medium">
                      {exp.location} • {exp.year}
                    </span>
                  </div>
                  <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.highlights && (
                    <ul className="mt-1.5 space-y-1 pl-4 list-disc list-outside text-xs text-[#344054]">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="leading-relaxed">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Distinctions */}
          <div className="resume-section-item">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#145BFF] border-b border-gray-200 pb-1 mb-3.5">
              Education & Academic Honors
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              {education.map((edu, idx) => (
                <div key={idx} className="resume-section-item flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                  <div>
                    <div className="font-heading font-bold text-[#101828]">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-[#475467] mt-0.5">
                      <span className="font-semibold text-[#145BFF]">{edu.institution}</span> — {edu.specialization}
                    </div>
                    {edu.honors && (
                      <div className="text-[11px] text-[#667085] mt-0.5">
                        {edu.honors} {edu.gpa && `• GPA: ${edu.gpa}`}
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#667085] font-medium sm:text-right">
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Leadership Distinctions */}
          <div className="resume-section-item">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#145BFF] border-b border-gray-200 pb-1 mb-2.5">
              Certifications & Leadership Distinctions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#344054]">
              <div>• <strong>CFA Institute:</strong> Passed CFA Level I Examination (Top 10th Percentile)</div>
              <div>• <strong>Microsoft Certified:</strong> Power BI Data Analyst Associate (PL-300)</div>
              <div>• <strong>Case Competition:</strong> 1st Place Champion — National Inter-Collegiate MBA Case</div>
              <div>• <strong>Reforge:</strong> Growth & Unit Economics Executive Program Certified</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
