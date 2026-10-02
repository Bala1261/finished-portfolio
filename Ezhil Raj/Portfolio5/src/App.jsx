import React, { useState, useEffect } from 'react';
import Preloader3D from './components/Preloader3D';
import ThreeCanvas from './components/ThreeCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import ProblemSolving from './components/ProblemSolving';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HireMeModal from './components/HireMeModal';
import { ArrowUp } from 'lucide-react';
import { playCyberTone } from './utils/audio';
import { getProfileData } from './utils/profile-data';
import Particles from './components/reactbits/Particles';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('cyan');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(() => getProfileData());

  useEffect(() => {
    // Sync with production window.__BEXO_PROFILE__ if dynamically injected
    const data = getProfileData();
    setProfileData(data);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playCyberTone(950, 'triangle', 0.1, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050711] text-slate-100 overflow-x-hidden selection:bg-cyan-400 selection:text-black font-sans">
      
      {/* 1. Dedicated 3D Polyhedron Preloader Screen */}
      {loading && <Preloader3D onLoaded={() => setLoading(false)} />}

      {/* 2. Decent 3D Three.js WebGL Sculpture (Clean & Non-Disturbing) */}
      <ThreeCanvas />

      {/* React Bits Subtle Interactive Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <Particles
          particleCount={80}
          particleSpread={12}
          speed={0.05}
          particleBaseSize={60}
          particleColors={['#00f0ff', '#3b82f6', '#818cf8']}
          moveParticlesOnHover={true}
          alphaParticles={true}
        />
      </div>

      {/* 3. Soft Atmospheric Ambient Lighting (Zero Noise) */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 -right-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* 4. Awwwards Dual Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 5. Top Thin Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 z-[1001] shadow-[0_0_8px_#00f0ff] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 6. Floating Island Navbar (BEXO Canonical 4-Route Navigation) */}
      <Navbar
        currentTheme={theme}
        setTheme={setTheme}
        onOpenHireMe={() => setHireModalOpen(true)}
      />

      {/* 7. Main Content Sections (Structured per BEXO Canonical Architecture) */}
      <main id="main-content" className="relative z-10">
        
        {/* Route 1: Home (#hero) */}
        <Hero profileData={profileData} />

        {/* Route 2: Portfolio (#portfolio) with Canonical Hierarchy */}
        <div id="portfolio" className="relative scroll-mt-24">
          {/* Identity & Biography */}
          <About />

          {/* Technical Capabilities & Stack */}
          <Skills />

          {/* Chronological Evolution / Experience */}
          <Timeline />

          {/* Academic Background & Foundation */}
          <Education />

          {/* Selected Work & Key Projects */}
          <Projects />

          {/* Verified Credentials & Certifications */}
          <Certifications />

          {/* Problem Solving & Algorithmic Milestones */}
          <ProblemSolving />
        </div>

        {/* Route 3: Contact (#contact) */}
        <Contact profileData={profileData} />
      </main>

      {/* Route 4: BEXO Hire Me Platform Handoff Modal */}
      <HireMeModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
        profileData={profileData}
      />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Floating Back To Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/15 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} />
      </button>

    </div>
  );
}
