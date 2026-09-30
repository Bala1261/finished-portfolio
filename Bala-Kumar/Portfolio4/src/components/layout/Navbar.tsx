import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Command, Menu as MenuIcon, FileText } from 'lucide-react';
import { MotionToggle } from '@/components/ui/MotionToggle';
import { useTheme } from '@/context/ThemeContext';
import { FullscreenMenu, type MenuLink } from './FullscreenMenu';

export const NAV_LINKS: MenuLink[] = [
  { name: 'HOME', path: '/' },
  { name: 'PORTFOLIO', path: '/portfolio' },
  { name: 'CONTACT', path: '/contact' },
  { name: 'HIRE ME', path: '/hire-me' },
];

export const NAV_EXPLORE_LINKS: MenuLink[] = [
  { name: 'Resume / CV', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCommandMenu } = useTheme();
  const [clock, setClock] = useState('');
  const location = useLocation();

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date())
      );
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/85 backdrop-blur-xl transition-colors duration-300 border-b border-[var(--border-color)]/50">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo / Name on the left */}
          <NavLink to="/" className="group flex items-baseline gap-3 focus:outline-none shrink-0">
            <span className="font-display font-extrabold text-base tracking-[0.08em] text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
              RAHUL R
            </span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              AI × Data × Code
            </span>
          </NavLink>

          {/* Desktop Nav Links in order: HOME | PORTFOLIO | CONTACT | HIRE ME */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-6 font-mono text-xs uppercase tracking-[0.18em]">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--accent-color)] font-bold bg-[var(--accent-glow)]/40 border-b-2 border-[var(--accent-color)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right cluster: Resume button + Toggles + Mobile Menu button */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden lg:inline font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] tabular-nums">
              COIMBATORE {clock} IST
            </span>

            {/* Resume button on the right */}
            <NavLink
              to="/resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--accent-color)] text-[var(--accent-color)] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-color)] hover:text-black transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </NavLink>

            <button
              onClick={toggleCommandMenu}
              type="button"
              aria-label="Open command menu"
              title="Open Command Menu (/)"
              className="hidden sm:grid h-9 w-9 place-items-center rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-colors"
            >
              <Command className="w-3.5 h-3.5" />
            </button>

            <span className="hidden sm:flex items-center gap-2">
              <MotionToggle />
            </span>

            {/* Mobile / Fullscreen Menu Trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="md:hidden group flex items-center gap-2 pl-1 focus:outline-none"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all">
                <MenuIcon className="w-4 h-4 text-[var(--text-primary)] group-hover:text-[var(--accent-color)]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} exploreLinks={NAV_EXPLORE_LINKS} />
    </>
  );
};
