import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { about } = portfolioData;
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const paragraphsRef = useRef(null);
  const blocksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal timeline on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from(leftColRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
      })
      .from(
        paragraphsRef.current.children,
        {
          opacity: 0,
          y: 30,
          stagger: 0.14,
          duration: 0.7,
        },
        '-=0.4'
      )
      .from(
        blocksRef.current.children,
        {
          opacity: 0,
          y: 25,
          stagger: 0.1,
          duration: 0.6,
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getBlockIcon = (index) => {
    switch (index) {
      case 0:
        return <GraduationCap className="w-5 h-5 text-[#145BFF]" />;
      case 1:
        return <Briefcase className="w-5 h-5 text-[#145BFF]" />;
      case 2:
        return <MapPin className="w-5 h-5 text-[#145BFF]" />;
      case 3:
      default:
        return <Calendar className="w-5 h-5 text-[#145BFF]" />;
    }
  };

  // Mouse tilt for info blocks
  const handleCardMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(800px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) translateY(-3px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-14 md:py-20 bg-white border-y border-[rgba(16,24,40,0.06)] relative"
    >
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Editorial Two-Column Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left: Statement & Headline */}
          <div ref={leftColRef} className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] border border-[#145BFF]/20 text-[#145BFF] text-xs font-heading font-bold uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#145BFF]" />
              {about.badge}
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.12] tracking-tight text-[#101828]">
              {about.statement}
            </h2>

            <div className="mt-6 pt-6 border-t border-[rgba(16,24,40,0.08)]">
              <div className="text-xs font-heading font-bold text-[#145BFF] uppercase tracking-wider mb-1.5">
                Executive Profile
              </div>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Combining quantitative commercial analytics with corporate governance, financial modeling, and stakeholder alignment.
              </p>
            </div>
          </div>

          {/* Right: Paragraphs */}
          <div ref={paragraphsRef} className="lg:col-span-7 space-y-4 text-[#475467] text-base sm:text-lg leading-relaxed font-normal">
            {about.paragraphs.map((p, index) => (
              <p key={index} className="first-of-type:text-[#101828] first-of-type:font-medium">
                {p}
              </p>
            ))}
          </div>

        </div>

        {/* Four Information Blocks */}
        <div
          ref={blocksRef}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {about.infoBlocks.map((block, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ transition: 'transform 0.15s ease-out, box-shadow 0.25s ease' }}
              className="p-5 rounded-2xl bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)] hover:border-[#145BFF]/40 hover:bg-white shadow-xs hover:shadow-card group will-change-transform cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(16,24,40,0.06)] shadow-xs flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                {getBlockIcon(idx)}
              </div>
              <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#667085] mb-1">
                {block.title}
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-[#101828] mb-1 leading-snug">
                {block.value}
              </div>
              <div className="text-xs text-[#667085]">
                {block.meta}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
