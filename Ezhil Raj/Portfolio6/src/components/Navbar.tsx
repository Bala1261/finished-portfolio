import React, { useState, useEffect } from 'react';
import { Portfolio } from '../types/bexo';
import { Button } from './Button';
import { Menu, X, FileDown } from 'lucide-react';
import { sanitizeUrl } from '../utils/safeUrl';
import './Navbar.css';

interface NavbarProps {
  portfolio?: Portfolio;
}

export const Navbar: React.FC<NavbarProps> = ({ portfolio }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profile = portfolio?.profile;
  const navLinks: { label: string; href: string }[] = [{ label: 'Home', href: '#home' }];

  if (portfolio?.about?.currentStatus || portfolio?.summary?.text) {
    navLinks.push({ label: 'About', href: '#about' });
  }

  if (portfolio?.experience && portfolio.experience.length > 0) {
    navLinks.push({ label: 'Experience', href: '#experience' });
  }

  if (portfolio?.projects && portfolio.projects.length > 0) {
    navLinks.push({ label: 'Projects', href: '#projects' });
  }

  if (portfolio?.skills && portfolio.skills.length > 0) {
    navLinks.push({ label: 'Skills', href: '#skills' });
  }

  if (portfolio?.education && portfolio.education.length > 0) {
    navLinks.push({ label: 'Education', href: '#education' });
  }

  if (portfolio?.certificates && portfolio.certificates.length > 0) {
    navLinks.push({ label: 'Certificates', href: '#certificates' });
  }

  if (portfolio?.research && portfolio.research.length > 0) {
    navLinks.push({ label: 'Research', href: '#research' });
  }

  navLinks.push({ label: 'Contact', href: '#contact' });

  // Handle resume URL safely
  const resumeUrl =
    typeof portfolio?.resume === 'string'
      ? sanitizeUrl(portfolio.resume)
      : portfolio?.resume?.url
      ? sanitizeUrl(portfolio.resume.url)
      : null;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const displayName = profile?.name || profile?.handle || 'Developer';

  const resumeFileName =
    typeof portfolio?.resume === 'object' && portfolio.resume.name
      ? portfolio.resume.name
      : 'Resume.pdf';

  return (
    <header className={`bexo-navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="bexo-navbar-container">
        <a href="#home" className="bexo-nav-logo" aria-label="Back to top">
          <span className="bexo-nav-logo-symbol">&lt;/&gt;</span>
          <span className="bexo-nav-logo-text">{displayName}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="bexo-nav-desktop" aria-label="Main Navigation">
          <ul className="bexo-nav-menu">
            {navLinks.map((link) => (
              <li key={link.href} className="bexo-nav-item">
                <a href={link.href} className="bexo-nav-anchor">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {resumeUrl && (
            <Button
              href={resumeUrl}
              variant="outline"
              size="sm"
              icon={<FileDown />}
              isExternal
              download={resumeFileName}
            >
              Resume
            </Button>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="bexo-nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`bexo-nav-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile Navigation">
          <ul className="bexo-nav-mobile-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="bexo-nav-mobile-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {resumeUrl && (
            <div className="bexo-nav-mobile-resume">
              <Button
                href={resumeUrl}
                variant="primary"
                size="md"
                icon={<FileDown />}
                isExternal
                download={resumeFileName}
                onClick={handleLinkClick}
              >
                Download Resume
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
