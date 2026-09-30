import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BexoProfileProvider } from './context/BexoProfileContext';

// Layout & Effects Imports
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollProgressBar from './components/layout/ScrollProgressBar';
import CustomCursor from './components/layout/CustomCursor';
import ParticleBackground from './components/layout/ParticleBackground';
import IntroLoader from './components/layout/IntroLoader';
import ScrollToTopOnNav from './components/layout/ScrollToTopOnNav';

// Section Imports
import HeroNew from './components/sections/HeroNew';
import AboutNew from './components/sections/AboutNew';
import SkillsExperience from './components/sections/SkillsExperience';
import ProjectsInnovative from './components/sections/ProjectsInnovative';
import CertificationsNew from './components/sections/CertificationsNew';
import Contact from './components/sections/Contact';
import ResumeViewerPage from './components/sections/ResumeViewerPage';

// Portfolio View Route (/pages/portfolio.html)
const PortfolioPage = () => (
  <main className="pt-24 pb-16 bg-slate-950 text-white">
    <AboutNew />
    <SkillsExperience />
    <ProjectsInnovative />
    <CertificationsNew />
  </main>
);

// Hire Me Page Route (/pages/hire-me.html)
const HireMePage = () => (
  <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 pt-24 pb-12">
    <div className="max-w-2xl w-full text-center bg-white/5 border border-white/10 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-2xl">
      <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
        BEXO PLATFORM HIRING HANDOFF
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Hire Solairaj R</h1>
      <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-lg mx-auto">
        Initiate contract engagements, full-time positions, or custom development projects via BEXO's verified platform hiring system.
      </p>
      <a
        href="/pages/contact.html#contact"
        className="inline-block w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm shadow-lg hover:shadow-cyan-500/50 transition-all mb-4"
      >
        Continue to BEXO Hiring Workflow →
      </a>
    </div>
  </main>
);

// Home Page Route (/) — Strictly Hero section
const HomePage = () => (
  <main className="relative z-10 overflow-hidden">
    <HeroNew />
  </main>
);

function AppContent() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <ScrollToTopOnNav />
      <IntroLoader onComplete={() => setShowLoader(false)} />
      <AnimatePresence>
        {!showLoader && (
          <motion.div 
            className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ScrollProgressBar />
            <ParticleBackground />

            {/* Background Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            <CustomCursor />
            <Navbar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pages/portfolio.html" element={<PortfolioPage />} />
              <Route path="/pages/contact.html" element={<Contact />} />
              <Route path="/pages/hire-me.html" element={<HireMePage />} />
              <Route path="/pages/resume.html" element={<ResumeViewerPage />} />
            </Routes>

            <Footer />
            <FloatingContact />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <BexoProfileProvider>
        <AppContent />
      </BexoProfileProvider>
    </Router>
  );
}