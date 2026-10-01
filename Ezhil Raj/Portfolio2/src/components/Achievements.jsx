import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Medal, Star, CheckCircle, Users, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const { achievements } = portfolioData;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
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
    card.style.transform = `perspective(800px) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg) translateY(-2px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  const getAchievementIcon = (category) => {
    switch (category) {
      case 'Leadership':
        return <Users className="w-5 h-5 text-[#145BFF]" />;
      case 'Case Competition':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Certification':
        return <Medal className="w-5 h-5 text-[#145BFF]" />;
      case 'Academic Honor':
        return <Star className="w-5 h-5 text-amber-600" />;
      case 'Fellowship':
        return <Sparkles className="w-5 h-5 text-[#145BFF]" />;
      default:
        return <Award className="w-5 h-5 text-[#145BFF]" />;
    }
  };

  return (
    <section id="achievements" ref={sectionRef} className="py-14 md:py-18 bg-white relative border-b border-[rgba(16,24,40,0.06)]">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        
        <SectionHeading
          badge="HONORS & RECOGNITIONS"
          title="Achievements & Leadership"
          subtitle="Distinctions earned through competitive case championships, academic excellence, and executive chapter stewardship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.25s ease' }}
              className="p-5 sm:p-6 rounded-2xl bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)] hover:border-[#145BFF]/30 hover:bg-white hover:shadow-card transition-all duration-300 flex items-start gap-4 sm:gap-5 group will-change-transform cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white border border-[rgba(16,24,40,0.06)] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                {getAchievementIcon(item.category)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#145BFF]">
                    {item.category}
                  </span>
                  <span className="text-xs font-heading font-semibold text-[#667085] bg-white px-2.5 py-0.5 rounded-full border border-gray-100">
                    {item.year}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-base sm:text-lg text-[#101828] mb-1 leading-snug">
                  {item.title}
                </h4>

                <div className="text-xs font-semibold text-[#475467] mb-2">
                  {item.org}
                </div>

                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
