import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Briefcase, ChevronDown } from 'lucide-react';
import { toggleAudio, getAudioState, playCyberTone } from '../utils/audio';
import Magnet from './reactbits/Magnet';

export default function Navbar({ currentTheme, setTheme, onOpenHireMe }) {
  const [soundOn, setSoundOn] = useState(() => getAudioState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);

  const themes = [
    { id: 'cyan', color: '#00f0ff', label: 'Cyber Cyan' },
    { id: 'purple', color: '#a855f7', label: 'Neon Purple' },
    { id: 'emerald', color: '#10b981', label: 'Matrix Emerald' },
    { id: 'amber', color: '#f59e0b', label: 'Solar Amber' },
  ];

  // BEXO Canonical 4-Route Architecture
  const primaryRoutes = [
    { id: 'hero', href: '#hero', label: 'Home' },
    { id: 'portfolio', href: '#portfolio', label: 'Portfolio', hasSubnav: true },
    { id: 'contact', href: '#contact', label: 'Contact' },
  ];

  // Portfolio Subsections in BEXO recommended order
  const portfolioSections = [
    { href: '#about', label: 'About / Identity' },
    { href: '#skills', label: 'Skills & Stack' },
    { href: '#experience', label: 'Evolution / Journey' },
    { href: '#education', label: 'Academic Foundation' },
    { href: '#projects', label: 'Selected Work' },
    { href: '#certifications', label: 'Credentials' },
    { href: '#problem-solving', label: 'Coding / LeetCode' },
  ];

  const handleSoundToggle = () => {
    const newState = toggleAudio();
    setSoundOn(newState);
  };

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    document.body.setAttribute('data-theme', themeId);
    playCyberTone(1100, 'triangle', 0.1, 0.05);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      const sections = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'certifications', 'problem-solving', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility and body lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (portfolioDropdownOpen) setPortfolioDropdownOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, portfolioDropdownOpen]);

  // Determine if active section is part of Portfolio group
  const isPortfolioActive = ['about', 'skills', 'experience', 'education', 'projects', 'certifications', 'problem-solving'].includes(activeSection);

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto flex items-center gap-2 sm:gap-4 md:gap-5 bg-slate-950/80 border border-white/10 rounded-full px-3.5 sm:px-6 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30"
        >
          {/* Brand Logo with React Bits Magnet */}
          <Magnet padding={30} magnetStrength={3}>
            <a
              href="#hero"
              onClick={() => playCyberTone(750, 'sine', 0.08, 0.03)}
              className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base tracking-tight text-white group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-transform group-hover:scale-105">
                J
              </div>
              <span className="hidden md:inline-block">Jothimani</span>
            </a>
          </Magnet>

          {/* Desktop Nav Links (Canonical 4-Route System: Home, Portfolio, Contact, Hire Me) */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {/* 1. Home Route */}
            <li>
              <Magnet padding={18} magnetStrength={3}>
                <a
                  href="#hero"
                  aria-current={activeSection === 'hero' ? 'page' : undefined}
                  onClick={() => playCyberTone(650, 'sine', 0.05, 0.02)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 block ${
                    activeSection === 'hero'
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </a>
              </Magnet>
            </li>

            {/* 2. Portfolio Route with Quick-Jump Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setPortfolioDropdownOpen(true)}
              onMouseLeave={() => setPortfolioDropdownOpen(false)}
            >
              <Magnet padding={18} magnetStrength={3}>
                <a
                  href="#portfolio"
                  aria-current={isPortfolioActive ? 'page' : undefined}
                  onClick={() => playCyberTone(680, 'sine', 0.05, 0.02)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1 ${
                    isPortfolioActive
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Portfolio</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${portfolioDropdownOpen ? 'rotate-180' : ''}`} />
                </a>
              </Magnet>

              {/* Sub-menu for Portfolio sections */}
              <div
                className={`absolute top-full left-0 mt-2 w-52 py-2 rounded-2xl glass-panel border border-white/10 bg-slate-950/95 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-200 ${
                  portfolioDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="px-3 py-1 text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest border-b border-white/5 mb-1">
                  Portfolio Sections
                </div>
                {portfolioSections.map((sec) => (
                  <a
                    key={sec.href}
                    href={sec.href}
                    onClick={() => {
                      playCyberTone(720, 'sine', 0.04, 0.02);
                      setPortfolioDropdownOpen(false);
                    }}
                    className={`block px-3 py-1.5 text-xs transition-colors ${
                      activeSection === sec.href.replace('#', '')
                        ? 'text-cyan-300 font-bold bg-cyan-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {sec.label}
                  </a>
                ))}
              </div>
            </li>

            {/* 3. Contact Route */}
            <li>
              <Magnet padding={18} magnetStrength={3}>
                <a
                  href="#contact"
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                  onClick={() => playCyberTone(710, 'sine', 0.05, 0.02)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 block ${
                    activeSection === 'contact'
                      ? 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Contact
                </a>
              </Magnet>
            </li>
          </ul>

          {/* 4. Canonical Hire Me CTA Action */}
          <Magnet padding={20} magnetStrength={4}>
            <button
              onClick={() => {
                if (onOpenHireMe) onOpenHireMe();
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Briefcase size={12} />
              <span>Hire Me</span>
            </button>
          </Magnet>

          {/* Controls: Audio & Theme Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 border-l border-white/10 pl-2.5 sm:pl-3">
            {/* Audio Toggle */}
            <Magnet padding={20} magnetStrength={3}>
              <button
                onClick={handleSoundToggle}
                title={soundOn ? 'Mute sound effects' : 'Enable futuristic sound effects'}
                aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                  soundOn
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/15 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
            </Magnet>

            {/* Theme Picker Chips */}
            <div className="flex items-center gap-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  title={t.label}
                  aria-label={`Switch theme to ${t.label}`}
                  style={{ backgroundColor: t.color }}
                  className={`w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full transition-transform cursor-pointer ${
                    currentTheme === t.id
                      ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-950'
                      : 'opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-slate-300 hover:text-white p-1 ml-1"
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer (BEXO Canonical 4-Route Navigation) */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-center items-center gap-5 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-2"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <a
          href="#hero"
          onClick={() => {
            playCyberTone(700, 'sine', 0.08, 0.04);
            setMobileMenuOpen(false);
          }}
          className="font-display text-2xl font-bold text-slate-200 hover:text-cyan-400 transition-colors"
        >
          Home
        </a>

        <div className="flex flex-col items-center gap-2">
          <a
            href="#portfolio"
            onClick={() => {
              playCyberTone(720, 'sine', 0.08, 0.04);
              setMobileMenuOpen(false);
            }}
            className="font-display text-2xl font-bold text-cyan-400 transition-colors"
          >
            Portfolio
          </a>
          <div className="flex flex-wrap justify-center gap-2 max-w-xs px-2">
            {portfolioSections.map((sec) => (
              <a
                key={sec.href}
                href={sec.href}
                onClick={() => {
                  playCyberTone(680, 'sine', 0.04, 0.02);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-400 hover:text-cyan-300 px-2 py-1 rounded-md bg-white/5"
              >
                {sec.label.split(' / ')[0]}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          onClick={() => {
            playCyberTone(740, 'sine', 0.08, 0.04);
            setMobileMenuOpen(false);
          }}
          className="font-display text-2xl font-bold text-slate-200 hover:text-cyan-400 transition-colors"
        >
          Contact
        </a>

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            if (onOpenHireMe) onOpenHireMe();
          }}
          className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-black text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.4)]"
        >
          Hire Me
        </button>
      </div>
    </>
  );
}
