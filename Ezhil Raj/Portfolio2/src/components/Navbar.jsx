import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar({ onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      // Section detection
      const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/85 backdrop-blur-md border-b border-[rgba(16,24,40,0.08)] shadow-[0_4px_20px_rgba(7,20,38,0.04)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2 font-heading font-extrabold text-xl tracking-tight text-[#071426]"
        >
          <span className="w-8 h-8 rounded-lg bg-[#071426] text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-sm group-hover:bg-[#145BFF] transition-colors duration-200">
            DV
          </span>
          <span className="flex items-center gap-1.5">
            David Vance
            <span className="w-1.5 h-1.5 rounded-full bg-[#145BFF]" />
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[rgba(16,24,40,0.08)] shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-[14px] font-heading font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#145BFF] font-semibold bg-[#EAF1FF]'
                    : 'text-[#667085] hover:text-[#101828] hover:bg-black/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA: Download Resume */}
        <div className="hidden sm:flex items-center gap-3">
          <MagneticButton
            variant="secondary"
            className="!py-2 !px-4 !text-sm !rounded-xl gap-2 font-semibold"
            dataCursor="resume"
            onClick={onOpenResume}
          >
            <Download className="w-3.5 h-3.5 text-[#145BFF]" />
            <span>Download Resume</span>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#071426] hover:bg-black/5 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[rgba(16,24,40,0.1)] px-6 py-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2.5 rounded-lg text-base font-heading font-medium ${
                  activeSection === link.id
                    ? 'bg-[#EAF1FF] text-[#145BFF] font-bold'
                    : 'text-[#101828] hover:bg-gray-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#145BFF] text-white font-heading font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Resume (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
