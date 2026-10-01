import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, ArrowUpRight, Award, BookOpen } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const { education } = portfolioData;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(800px) rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-14 md:py-18 bg-[#F7F9FC] relative border-b border-[rgba(16,24,40,0.06)]"
    >
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        
        <SectionHeading
          badge="ACADEMIC BACKGROUND"
          title="Education & Credentials"
          subtitle="Rigorous foundations in business economics, quantitative strategy, and international certifications."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.25s ease' }}
              className="group bg-white rounded-2xl p-6 border border-[rgba(16,24,40,0.08)] shadow-sm hover:border-[#145BFF] transition-all duration-300 flex flex-col justify-between will-change-transform cursor-default"
            >
              <div>
                {/* Header Icon + Arrow */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF1FF] text-[#145BFF] flex items-center justify-center font-bold group-hover:bg-[#145BFF] group-hover:text-white transition-colors duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  
                  {/* Subtle diagonal arrow */}
                  <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-[#667085] group-hover:text-[#145BFF] group-hover:border-[#145BFF]/30 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Institution & Year */}
                <div className="flex items-center justify-between gap-2 text-xs font-heading font-semibold text-[#667085] uppercase tracking-wider mb-2">
                  <span>{edu.institution}</span>
                  <span className="text-[#145BFF] bg-[#EAF1FF] px-2 py-0.5 rounded-md">{edu.year}</span>
                </div>

                {/* Degree */}
                <h3 className="font-heading font-bold text-xl text-[#101828] mb-2 leading-snug">
                  {edu.degree}
                </h3>

                {/* Specialization */}
                <div className="text-sm font-medium text-[#344054] mb-4">
                  {edu.specialization}
                </div>

                {/* GPA / Honors */}
                <div className="pt-4 border-t border-[rgba(16,24,40,0.06)] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#101828] font-semibold">
                    <Award className="w-4 h-4 text-[#145BFF] shrink-0" />
                    <span>{edu.honors}</span>
                  </div>
                  {edu.gpa && (
                    <div className="text-xs text-[#667085]">
                      Cumulative GPA: <span className="font-semibold text-[#101828]">{edu.gpa}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coursework Tags */}
              {edu.coursework && (
                <div className="mt-6 pt-4 border-t border-[rgba(16,24,40,0.06)]">
                  <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#667085] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#145BFF]" />
                    Key Focus Areas
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F7F9FC] text-[#475467] border border-gray-100 font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
