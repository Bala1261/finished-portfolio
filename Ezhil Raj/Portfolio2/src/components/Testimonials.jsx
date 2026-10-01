import React from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';

export default function Testimonials() {
  const { testimonials } = portfolioData;

  return (
    <section id="testimonials" className="py-14 md:py-18 bg-[#F7F9FC] relative border-b border-[rgba(16,24,40,0.06)]">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        
        <SectionHeading
          badge="EXECUTIVE ENDORSEMENTS"
          title="Professional Recommendations"
          subtitle="Feedback from managing directors, strategy partners, and academic mentors on commercial rigor and presentation clarity."
        />

        {/* Horizontal Card Layout for Desktop, natural scroll for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[rgba(16,24,40,0.08)] shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all duration-300"
            >
              <div>
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#145BFF] flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 fill-current" />
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-[#344054] leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-[rgba(16,24,40,0.06)] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#071426] text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-heading font-bold text-sm sm:text-base text-[#101828] flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-4 h-4 text-[#145BFF]" />
                  </div>
                  <div className="text-xs text-[#667085] leading-tight mt-0.5">
                    {item.role}
                  </div>
                  <div className="text-[11px] font-semibold text-[#145BFF] mt-0.5">
                    {item.org}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
