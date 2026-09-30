import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/pages/portfolio.html" },
    { name: "Contact", path: "/pages/contact.html" },
    { name: "Hire Me", path: "/pages/hire-me.html" },
    { name: "Resume", path: "/pages/resume.html" }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Name */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
            {personalInfo.name.charAt(0)}
          </span>
          <span className="text-white font-bold tracking-wider text-sm sm:text-base uppercase group-hover:text-cyan-400 transition-colors">
            {personalInfo.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (location.pathname === "/" && link.path === "/");
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name === "Resume"}
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;