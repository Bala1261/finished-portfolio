import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import portfolioData from '../data/portfolioData.json';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            {portfolioData.user.name}
          </NavLink>
        </div>
        
        <button 
          className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {portfolioData.navigation.map((link, index) => (
            <li key={index}>
              {link.isExternal ? (
                <a
                  href={portfolioData.user.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  <FaFileAlt style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;