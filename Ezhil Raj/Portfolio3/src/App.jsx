import { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import { useLenis } from './hooks/useLenis';
import { theme } from './data/portfolio.config';

// Cursor system
import CustomCursor from './components/cursor/CustomCursor';
import CursorTrail from './components/cursor/CursorTrail';

// Global UI
import Preloader from './components/preloader/Preloader';
import Navbar from './components/navigation/Navbar';

// Sections
import Hero from './components/hero/Hero';
import Manifesto from './components/manifesto/Manifesto';
import ProjectSection from './components/work/ProjectSection';
import HorizontalShowcase from './components/work/HorizontalShowcase';
import ScrollWords from './components/typography/ScrollWords';
import Services from './components/services/Services';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Clients from './components/clients/Clients';
import Awards from './components/awards/Awards';
import Contact from './components/contact/Contact';

// Case Study overlay
import CaseStudy from './components/casestudy/CaseStudy';

// Apply configurable accent to CSS custom property
document.documentElement.style.setProperty('--color-accent', theme.accent);

function AppInner() {
  const [preloadDone, setPreloadDone]       = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  useLenis();

  return (
    <>
      {/* ── Cursor system ── */}
      <CustomCursor />
      <CursorTrail />

      {/* ── Preloader ── */}
      <Preloader onComplete={() => setPreloadDone(true)} />

      {/* ── Main content ── */}
      <div
        style={{
          opacity: preloadDone ? 1 : 0,
          transition: 'opacity 0.6s ease 0.1s',
        }}
      >
        <Navbar />

        <main>
          <Hero ready={preloadDone} />
          <Manifesto />
          <ProjectSection onOpenCaseStudy={setActiveCaseStudy} />
          <HorizontalShowcase />
          <ScrollWords />
          <Services />
          <Gallery />
          <About />
          <Experience />
          <Clients />
          <Awards />
          <Contact />
        </main>
      </div>

      {/* ── Case Study overlay (portal) ── */}
      {activeCaseStudy && (
        <CaseStudy
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <AppInner />
    </CursorProvider>
  );
}
