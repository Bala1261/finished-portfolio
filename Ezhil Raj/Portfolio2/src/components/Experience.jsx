import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { experiences } = portfolioData;
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fill vertical line as user scrolls through the timeline
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.3,
          },
        });
      }

      // 2. Animate each experience card into view
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          x: 30,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-14 md:py-20 bg-white relative border-b border-[rgba(16,24,40,0.06)]"
    >
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT SIDE: Sticky Section Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] border border-[#145BFF]/20 text-[#145BFF] text-xs font-heading font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#145BFF]" />
              EXPERIENCE
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-[#101828]">
              Building experience through execution.
            </h2>

            <p className="mt-6 text-base text-[#667085] leading-relaxed">
              Demonstrated track record of transforming raw data into strategic operational playbooks and executive decisions across top-tier firms.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)] hidden lg:block">
              <div className="flex items-center gap-3 text-xs font-heading font-semibold text-[#145BFF] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Current Role
              </div>
              <div className="font-heading font-bold text-sm text-[#101828]">
                {experiences[0].role}
              </div>
              <div className="text-xs text-[#667085] mt-0.5">
                {experiences[0].company} • {experiences[0].location}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Vertical Timeline with dynamic fill line */}
          <div className="lg:col-span-8 relative pl-8 sm:pl-10">
            {/* Background Line */}
            <div className="absolute top-3 bottom-6 left-2 sm:left-3 w-[2px] bg-[rgba(16,24,40,0.1)] rounded-full" />
            
            {/* Active Blue Fill Line */}
            <div
              ref={lineRef}
              className="absolute top-3 bottom-6 left-2 sm:left-3 w-[2px] bg-[#145BFF] rounded-full origin-top scale-y-0 will-change-transform shadow-[0_0_8px_rgba(20,91,255,0.4)]"
            />

            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="relative group"
                >
                  {/* Timeline node icon */}
                  <div className={`absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    exp.isCurrent
                      ? 'bg-[#145BFF] border-[#EAF1FF] text-white shadow-sm'
                      : 'bg-white border-[rgba(16,24,40,0.2)] text-[#667085] group-hover:border-[#145BFF]'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-white' : 'bg-[#667085]'}`} />
                  </div>

                  {/* Experience Card */}
                  <div className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
                    exp.isCurrent
                      ? 'bg-[#F7F9FC] border-2 border-[#145BFF]/30 shadow-card'
                      : 'bg-white border border-[rgba(16,24,40,0.08)] hover:border-[rgba(16,24,40,0.18)] shadow-sm hover:shadow-card'
                  }`}>
                    
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-extrabold text-sm sm:text-base text-[#145BFF] bg-[#EAF1FF] px-3 py-1 rounded-full">
                          {exp.year}
                        </span>
                        {exp.isCurrent && (
                          <span className="text-xs font-heading font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Present Active
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#667085] flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#101828] mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-sm sm:text-base font-medium text-[#475467] mb-4">
                      {exp.company} <span className="text-gray-300 mx-1.5">•</span> <span className="text-xs text-[#667085]">{exp.type}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#667085] leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Key Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="mb-5 space-y-2 pt-3 border-t border-[rgba(16,24,40,0.06)]">
                        {exp.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475467]">
                            <CheckCircle className="w-4 h-4 text-[#145BFF] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg text-xs font-heading font-medium bg-white border border-[rgba(16,24,40,0.1)] text-[#344054] shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
