import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Menu, X, FileText, Briefcase } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'HOME', href: '/index.html', pathKey: 'home' },
  { label: 'PORTFOLIO', href: '/pages/portfolio.html', pathKey: 'portfolio' },
  { label: 'CONTACT', href: '/pages/contact.html', pathKey: 'contact' },
  { label: 'HIRE ME', href: '/pages/hire-me.html', pathKey: 'hire-me' },
];

export default function Navbar({ currentPath = '/', onNavigate }) {
  const { user, profile } = useProfile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const normalizePath = (path) => {
    if (!path || path === '/' || path.endsWith('index.html')) return 'home';
    if (path.includes('portfolio')) return 'portfolio';
    if (path.includes('contact')) return 'contact';
    if (path.includes('hire-me')) return 'hire-me';
    return 'home';
  };

  const activeKey = normalizePath(currentPath);

  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#DCE6F3] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo / Identity */}
          <a
            href="/index.html"
            onClick={(e) => handleLinkClick(e, '/index.html')}
            className="flex items-center gap-3 text-[#111827] font-extrabold text-lg tracking-tight hover:text-[#0EA5E9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] flex items-center justify-center text-white text-sm font-bold shadow-md shadow-[#0EA5E9]/25">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">{user.name}</span>
              <span className="text-[10px] text-[#2563EB] font-mono tracking-wider font-semibold uppercase">
                {profile.headline || 'Portfolio'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((link) => {
              const isActive = activeKey === link.pathKey;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-2 text-xs font-mono font-semibold tracking-wider transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] rounded-lg ${
                    isActive
                      ? 'text-[#0EA5E9] font-bold'
                      : 'text-[#111827]/80 hover:text-[#0EA5E9]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Conditional Resume Link (Only displayed if resumeUrl exists) */}
            {user.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 text-[#0EA5E9] hover:text-[#2563EB] text-xs font-mono font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                title="Download / View Resume"
              >
                <FileText size={14} />
                <span>Resume</span>
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            {user.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-mono font-medium flex items-center gap-1"
                aria-label="View Resume"
              >
                <FileText size={16} />
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-[#DCE6F3] text-[#111827] hover:text-[#0EA5E9] hover:border-[#0EA5E9]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-[#DCE6F3] px-4 pt-2 pb-6 space-y-2 overflow-hidden shadow-xl"
          >
            {NAV_ITEMS.map((link) => {
              const isActive = activeKey === link.pathKey;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-4 py-3 rounded-xl text-sm font-mono font-semibold tracking-wider transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] text-white shadow-md shadow-[#0EA5E9]/20'
                      : 'text-[#111827] hover:bg-slate-100 hover:text-[#0EA5E9]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {user.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block px-4 py-3 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] text-sm font-mono font-semibold text-center flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                <span>View Resume</span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
