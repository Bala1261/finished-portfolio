import React, { useState } from 'react';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MetricsStrip from './components/MetricsStrip';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ToolMarquee from './components/ToolMarquee';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenisSmoothScroll();

  // Resume modal visibility state
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <div className="relative min-h-screen bg-[#F7F9FC] text-[#101828] selection:bg-[#145BFF] selection:text-white antialiased">
      {/* 2px Thin Scroll Progress Bar */}
      <ScrollProgress />

      {/* Two-tier Custom Cursor (Inner Dot + Outer Elastic Ring) */}
      <CustomCursor />

      {/* Sticky Translucent Floating Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Page Content Flow */}
      <main id="main-content">
        {/* 1. Hero Section (90-100vh asymmetric composition + mouse parallax) */}
        <Hero onOpenResume={handleOpenResume} />

        {/* 2. Professional Summary (About section with editorial typography) */}
        <About />

        {/* 3. Business Metrics Strip (KPI counters with ScrollTrigger) */}
        <MetricsStrip />

        {/* 4. Experience Section (Sticky title + blue scroll-fill timeline) */}
        <Experience />

        {/* 5. Education Section (Elevated cards + diagonal arrow hover) */}
        <Education />

        {/* 6. Skills Section (Categorized cards + spotlight cursor highlight) */}
        <Skills />

        {/* 7. Featured Projects (Alternating layouts, VIEW cursor & detailed case study modal) */}
        <Projects />

        {/* 8. Continuous Subtle Business Tool Marquee */}
        <ToolMarquee />

        {/* 9. Achievements & Leadership Honors */}
        <Achievements />

        {/* 10. Professional Recommendations & Endorsements */}
        <Testimonials />

        {/* 11. Executive Dark Navy Contact Section (Inverted cursor) */}
        <Contact />
      </main>

      {/* 12. Minimalist Footer & Magnetic Back to Top */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Resume Preview & Print/Download Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </div>
  );
}
