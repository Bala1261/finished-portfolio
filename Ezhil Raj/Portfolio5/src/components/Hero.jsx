import React, { useState, useEffect } from 'react';
import { ArrowDownRight, Download, Send } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import BlurText from './reactbits/BlurText';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import Magnet from './reactbits/Magnet';

const ROLES = [
  'Aspiring Cloud Engineer',
  'DevOps Automation Enthusiast',
  'Full Stack Web Architect',
  'Algorithmic Problem Solver',
];

export default function Hero({ profileData }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const resumeUrl = profileData?.user?.resumeUrl || `${import.meta.env.BASE_URL}727624BIT110_Final_Resume_Jothimani-2027.pdf`;
  const openToHire = profileData?.user?.openToHire !== false;

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCharIdx((prev) => prev + 1);
          if (charIdx + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), 2200);
          }
        } else {
          setCharIdx((prev) => prev - 1);
          if (charIdx - 1 === 0) {
            setIsDeleting(false);
            setRoleIdx((prev) => (prev + 1) % ROLES.length);
          }
        }
      },
      isDeleting ? 35 : 75
    );
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, roleIdx]);

  // Smooth 3D Tilt for Avatar Stage
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 18, y: y * -18 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full z-10">

        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-4">

          {/* Subtle Status Pill (BEXO Conditional Open to Hire State) */}
          {openToHire && (
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs font-semibold tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <ShinyText
                text="AVAILABLE FOR OPPORTUNITIES & INTERNSHIPS"
                color="#00f0ff"
                shineColor="#ffffff"
                speed={3.5}
              />
            </div>
          )}

          {/* Hero Heading */}
          <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white mb-4">
            <BlurText
              text="Hi, I'm"
              delay={60}
              animateBy="words"
              direction="top"
              className="text-white"
            />
            <br />
            <span className="text-gradient inline-block">
              <DecryptedText
                text="Jothimani"
                speed={35}
                maxIterations={10}
                animateOn="view"
                revealDirection="start"
                className="text-gradient"
                encryptedClassName="text-cyan-400 opacity-60"
              />
            </span>
          </h1>

          {/* Kinetic Typewriter Role */}
          <div className="flex items-center gap-2 font-mono text-lg sm:text-2xl text-cyan-400 font-medium mb-6 h-8">
            <span className="text-slate-500 font-normal">&gt;</span>
            <span>{ROLES[roleIdx].substring(0, charIdx)}</span>
            <span className="w-1.5 h-6 bg-cyan-400 animate-pulse ml-0.5" />
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-9 font-normal">
            Specializing in resilient <strong>cloud infrastructure</strong>, container orchestration with <strong>Docker & Kubernetes</strong>, and automated CI/CD deployment pipelines. Building the future of scalable web systems.
          </p>

          {/* Action Buttons with Magnet effect (BEXO Canonical Contract: View Portfolio is dominant) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8">
            <Magnet padding={35} magnetStrength={3}>
              <a
                href="#portfolio"
                onClick={() => playCyberTone(850, 'triangle', 0.1, 0.04)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(0,240,255,0.3)] hover:shadow-[0_6px_30px_rgba(0,240,255,0.45)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>View Portfolio</span>
                <ArrowDownRight size={16} />
              </a>
            </Magnet>

            <Magnet padding={35} magnetStrength={3}>
              <a
                href="#contact"
                onClick={() => playCyberTone(750, 'sine', 0.08, 0.04)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:border-cyan-400 text-white font-semibold text-sm backdrop-blur-md hover:bg-cyan-500/10 transition-all duration-200 cursor-pointer"
              >
                <Send size={15} />
                <span>Contact Me</span>
              </a>
            </Magnet>

            {resumeUrl && (
              <Magnet padding={30} magnetStrength={3}>
                <a
                  href={resumeUrl}
                  download
                  onClick={() => playCyberTone(900, 'triangle', 0.08, 0.04)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/60 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono font-semibold transition-all duration-200 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Resume PDF</span>
                </a>
              </Magnet>
            )}
          </div>

          {/* Direct Social Links Strip */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline-block">Connect:</span>
            <a
              href="https://github.com/jothimani7806"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              onClick={() => playCyberTone(700, 'sine', 0.05, 0.02)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center text-sm transition-all hover:scale-105"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/jothimani-p-7402a2328"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              onClick={() => playCyberTone(740, 'sine', 0.05, 0.02)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center text-sm transition-all hover:scale-105"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://leetcode.com/u/Jothimani06/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              onClick={() => playCyberTone(780, 'sine', 0.05, 0.02)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-amber-400 hover:text-amber-400 text-slate-300 flex items-center justify-center text-sm transition-all hover:scale-105"
            >
              <i className="fas fa-code"></i>
            </a>
            <a
              href="mailto:jothimani782006@gmail.com"
              aria-label="Send Email"
              onClick={() => playCyberTone(820, 'sine', 0.05, 0.02)}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center text-sm transition-all hover:scale-105"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Right Column: Prominent, Enlarged & Neatly Suited 3D Avatar Centerpiece */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          <div
            className="relative w-72 h-72 sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[470px] lg:h-[470px] max-w-full flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1200px' }}
          >
            {/* Soft Ambient Depth Glow Behind Avatar */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/20 blur-2xl pointer-events-none" />

            {/* Dual Outer Rotating 3D Orbital Rings */}
            <div className="absolute inset-[-10px] sm:inset-[-18px] rounded-full border border-cyan-400/20 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-[-24px] sm:inset-[-36px] rounded-full border border-indigo-500/15 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

            {/* Neatly Sized & Enlarged 3D Photo Container */}
            <div
              className="relative w-64 h-64 sm:w-[330px] sm:h-[330px] md:w-[390px] md:h-[390px] lg:w-[420px] lg:h-[420px] rounded-full p-2.5 sm:p-3 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(0,240,255,0.3)] transition-transform duration-200 ease-out group"
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Inner Dark Bezel & Profile Photo */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-950 bg-slate-950 relative shadow-inner">
                <img
                  src={`${import.meta.env.BASE_URL}portfolio_img.jpeg`}
                  alt="Jothimani - Cloud Engineer & DevOps Developer Profile"
                  className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Subtle Lens Vignette */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Clean, Neatly Positioned Floating 3D Tech Badges */}
            <div
              onClick={() => playCyberTone(950, 'sine', 0.08, 0.04)}
              className="absolute -top-1 right-2 sm:right-4 lg:-right-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(0,240,255,0.3)] animate-float-slow cursor-pointer hover:scale-110 transition-transform select-none z-20"
            >
              <i className="fab fa-aws mr-1.5 text-amber-400 text-sm"></i> AWS Cloud
            </div>

            <div
              onClick={() => playCyberTone(880, 'sine', 0.08, 0.04)}
              className="absolute bottom-6 -right-2 sm:-right-1 lg:-right-4 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-400/40 text-blue-300 font-mono text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(59,130,246,0.3)] animate-float-reverse cursor-pointer hover:scale-110 transition-transform select-none z-20"
            >
              <i className="fab fa-docker mr-1.5 text-blue-400 text-sm"></i> Docker
            </div>

            <div
              onClick={() => playCyberTone(820, 'sine', 0.08, 0.04)}
              className="absolute top-8 -left-2 sm:-left-4 lg:-left-6 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(16,185,129,0.3)] animate-float-reverse cursor-pointer hover:scale-110 transition-transform select-none z-20"
            >
              <i className="fab fa-linux mr-1.5 text-yellow-300 text-sm"></i> Linux CLI
            </div>

            <div
              onClick={() => playCyberTone(1020, 'sine', 0.08, 0.04)}
              className="absolute -bottom-2 left-4 sm:left-6 lg:left-2 px-4 py-2 rounded-full bg-slate-900/90 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(168,85,247,0.3)] animate-float-slow cursor-pointer hover:scale-110 transition-transform select-none z-20"
            >
              <i className="fas fa-dharmachakra mr-1.5 text-purple-400 text-sm"></i> Kubernetes
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
