import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ProfileProvider } from './context/ProfileContext';

import LoadingScreen from './components/LoadingScreen';
import ConstellationBackground from './components/ConstellationBackground';
import CustomCursor from './components/CustomCursor';
import FloatingActions from './components/FloatingActions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import HireMePage from './pages/HireMePage';

function AppContent({ defaultPath }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname && window.location.pathname !== '/') {
      return window.location.pathname;
    }
    return defaultPath || '/index.html';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/index.html');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    const p = currentPath.toLowerCase();
    if (p.includes('portfolio')) {
      return <PortfolioPage />;
    }
    if (p.includes('contact')) {
      return <ContactPage />;
    }
    if (p.includes('hire-me')) {
      return <HireMePage />;
    }
    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <div className="relative min-h-screen bg-[#F5F8FF] text-[#111827] selection:bg-[#0EA5E9]/20 selection:text-[#0EA5E9]">
      {/* Accessibility Skip-To-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0EA5E9] text-white font-bold rounded-lg shadow-xl"
      >
        Skip to main content
      </a>

      {/* Preloader Animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Custom Follower Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] origin-left z-50 shadow-[0_0_12px_rgba(14,165,233,0.5)]"
        style={{ scaleX }}
      />

      {/* Interactive Constellation Background */}
      <ConstellationBackground />

      {/* Header Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Content Layout */}
      <main id="main-content" className="relative z-10 min-h-[80vh]">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Contact & Action Launcher */}
      <FloatingActions />
    </div>
  );
}

export default function App({ defaultPath }) {
  return (
    <ProfileProvider>
      <AppContent defaultPath={defaultPath} />
    </ProfileProvider>
  );
}
