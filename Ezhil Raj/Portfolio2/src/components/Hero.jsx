import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Download, Mail, MapPin, TrendingUp, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import LinkedinIcon from './LinkedinIcon';
import MagneticButton from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const { personal } = portfolioData;
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const metaGroupRef = useRef(null);

  // Parallax elements
  const portraitFrameRef = useRef(null);
  const bgShapeRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const cardFocusRef = useRef(null);

  // Animated counters refs
  const statVal0Ref = useRef(null);
  const statVal1Ref = useRef(null);
  const statVal2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Set initial states
      gsap.set(badgeRef.current, { opacity: 0, y: 16 });
      gsap.set([headingLine1Ref.current, headingLine2Ref.current], { yPercent: 110 });
      gsap.set(paragraphRef.current, { opacity: 0, y: 24 });
      gsap.set(ctaGroupRef.current, { opacity: 0, y: 20 });
      gsap.set(metaGroupRef.current, { opacity: 0, y: 16 });

      gsap.set(portraitFrameRef.current, { scale: 0.95, opacity: 0 });
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, cardFocusRef.current], {
        opacity: 0,
        y: 20,
        scale: 0.95,
      });

      // Play orchestrated entrance (total ~1.5s)
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .to(headingLine1Ref.current, { yPercent: 0, duration: 0.75 }, 0.2)
        .to(headingLine2Ref.current, { yPercent: 0, duration: 0.75 }, 0.35)
        .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .to(ctaGroupRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.65)
        .to(metaGroupRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
        .to(portraitFrameRef.current, { opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out' }, 0.35)
        .to(
          [card1Ref.current, card2Ref.current, card3Ref.current, cardFocusRef.current],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: 'back.out(1.1)',
          },
          0.65
        );

      // Number count-up animation
      const countObj = { val0: 0, val1: 0, val2: 0 };
      gsap.to(countObj, {
        val0: personal.heroStats[0].value,
        val1: personal.heroStats[1].value,
        val2: personal.heroStats[2].value,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.7,
        onUpdate: () => {
          if (statVal0Ref.current) statVal0Ref.current.innerText = Math.round(countObj.val0);
          if (statVal1Ref.current) statVal1Ref.current.innerText = Math.round(countObj.val1);
          if (statVal2Ref.current) statVal2Ref.current.innerText = Math.round(countObj.val2);
        },
      });

      // 2. Mouse Parallax (Hero section only, disabled on touch/mobile)
      const heroEl = heroRef.current;
      if (!heroEl) return;

      const handleMouseMove = (e) => {
        if (window.innerWidth < 1024 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
          return;
        }

        const rect = heroEl.getBoundingClientRect();
        const xRel = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const yRel = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        // Subtle movements: portrait ±5px, bg ±10px, cards ±15px
        if (portraitFrameRef.current) {
          gsap.to(portraitFrameRef.current, {
            x: xRel * 6,
            y: yRel * 6,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
        if (bgShapeRef.current) {
          gsap.to(bgShapeRef.current, {
            x: xRel * -10,
            y: yRel * -10,
            duration: 1.0,
            ease: 'power2.out',
          });
        }
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, cardFocusRef.current];
        cards.forEach((card, index) => {
          if (card) {
            const multiplier = 12 + index * 3;
            gsap.to(card, {
              x: xRel * (multiplier * (index % 2 === 0 ? 1 : -1)),
              y: yRel * (multiplier * (index < 2 ? 1 : -1)),
              duration: 0.7,
              ease: 'power2.out',
            });
          }
        });
      };

      const handleMouseLeave = () => {
        gsap.to([portraitFrameRef.current, bgShapeRef.current], {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
        gsap.to([card1Ref.current, card2Ref.current, card3Ref.current, cardFocusRef.current], {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      };

      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, [personal]);

  const [headingPart1, headingPart2] = personal.headline.split('\n');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-24 overflow-hidden bg-[#F7F9FC]"
    >
      {/* Subtle Background Geometry */}
      <div
        ref={bgShapeRef}
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#145BFF]/5 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Status Badge */}
            <div ref={badgeRef} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] border border-[#145BFF]/20 text-[#145BFF] text-xs font-heading font-bold uppercase tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#145BFF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#145BFF]" />
                </span>
                {personal.badge}
              </div>
            </div>

            {/* Large Masked Heading */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#101828] mb-6">
              <div className="overflow-mask">
                <span ref={headingLine1Ref} className="inline-block will-change-transform">
                  {headingPart1}
                </span>
              </div>
              <div className="overflow-mask">
                <span
                  ref={headingLine2Ref}
                  className="inline-block text-[#145BFF] will-change-transform"
                >
                  {headingPart2 || 'Backed by insight.'}
                </span>
              </div>
            </h1>

            {/* Supporting Copy */}
            <p
              ref={paragraphRef}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed max-w-xl mb-8 font-normal"
            >
              {personal.tagline}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 mb-10">
              <MagneticButton
                variant="primary"
                href="#projects"
                className="gap-2.5 shadow-[0_4px_14px_rgba(20,91,255,0.25)] hover:shadow-[0_6px_20px_rgba(20,91,255,0.35)]"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={onOpenResume}
                dataCursor="resume"
                className="gap-2.5"
              >
                <Download className="w-4 h-4 text-[#145BFF]" />
                <span>Download Resume</span>
              </MagneticButton>
            </div>

            {/* Quick Metadata Links */}
            <div
              ref={metaGroupRef}
              className="pt-6 border-t border-[rgba(16,24,40,0.08)] flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#667085] font-medium"
            >
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="flex items-center gap-2 hover:text-[#145BFF] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-[#145BFF]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${personal.email}`}
                data-cursor="pointer"
                className="flex items-center gap-2 hover:text-[#145BFF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#145BFF]" />
                <span>{personal.email}</span>
              </a>

              <div className="flex items-center gap-1.5 text-[#667085]">
                <MapPin className="w-4 h-4 text-[#145BFF]" />
                <span>{personal.location}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Executive Composition & Floating Dashboard Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            <div className="relative w-full max-w-[420px] mx-auto">
              
              {/* Executive Portrait Frame */}
              <div
                ref={portraitFrameRef}
                className="relative rounded-3xl overflow-hidden bg-white p-2 shadow-[0_20px_50px_-10px_rgba(7,20,38,0.12)] border border-[rgba(16,24,40,0.08)] will-change-transform"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src="/executive_portrait.jpg"
                    alt={personal.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle inner gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Dashboard Card 1: 5+ Strategic Projects */}
              <div
                ref={card1Ref}
                className="absolute -top-4 -left-6 sm:-left-10 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-card border border-[rgba(16,24,40,0.08)] flex items-center gap-3 will-change-transform z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#145BFF] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl leading-none text-[#101828]">
                    <span ref={statVal0Ref}>0</span>
                    {personal.heroStats[0].suffix}
                  </div>
                  <div className="text-[11px] font-medium text-[#667085] uppercase tracking-wider mt-0.5">
                    {personal.heroStats[0].label}
                  </div>
                </div>
              </div>

              {/* Floating Dashboard Card 2: 3 Internships */}
              <div
                ref={card2Ref}
                className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-card border border-[rgba(16,24,40,0.08)] flex items-center gap-3 will-change-transform z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl leading-none text-[#101828]">
                    <span ref={statVal1Ref}>0</span>
                    {personal.heroStats[1].suffix}
                  </div>
                  <div className="text-[11px] font-medium text-[#667085] uppercase tracking-wider mt-0.5">
                    {personal.heroStats[1].label}
                  </div>
                </div>
              </div>

              {/* Floating Dashboard Card 3: 92% Project Success */}
              <div
                ref={card3Ref}
                className="absolute -bottom-5 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-card border border-[rgba(16,24,40,0.08)] flex items-center gap-3 will-change-transform z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#145BFF] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl leading-none text-[#101828]">
                    <span ref={statVal2Ref}>0</span>
                    {personal.heroStats[2].suffix}
                  </div>
                  <div className="text-[11px] font-medium text-[#667085] uppercase tracking-wider mt-0.5">
                    {personal.heroStats[2].label}
                  </div>
                </div>
              </div>

              {/* Floating Focus Badge: Current Focus */}
              <div
                ref={cardFocusRef}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-[#071426] text-white px-4 py-2.5 rounded-xl shadow-lg border border-white/10 flex items-center gap-2.5 will-change-transform z-20"
              >
                <span className="w-2 h-2 rounded-full bg-[#3278FF]" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
                    {personal.currentFocus.tag}
                  </div>
                  <div className="text-xs font-heading font-bold text-white">
                    {personal.currentFocus.title}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
