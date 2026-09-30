import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaChevronDown, FaFileAlt, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolioData.json';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Vishal-25-cyber', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/vishxl_76/', label: 'Instagram' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/u/K_VISHAL_25/', label: 'LeetCode' }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-content container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {portfolioData.user.openToHire && (
            <div style={{ marginBottom: '15px', display: 'inline-block', padding: '6px 14px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary-color)', borderRadius: '20px', color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 600 }}>
              🟢 Available for Opportunities
            </div>
          )}
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{portfolioData.user.name}</span>
          </h1>
          <h2 className="hero-subtitle">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'UI/UX Designer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </h2>
          <p className="hero-description">
            Third-year Computer Science student at Kongu Engineering College, passionate about Full Stack Development and UI Design.
            Let's build something amazing together!
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/portfolio')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              View Portfolio <FaArrowRight />
            </button>
            <a
              href={portfolioData.user.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <FaFileAlt /> View Resume
            </a>
          </div>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="profile-img-container">
            <div className="profile-img-bg"></div>
            <img
              src={portfolioData.user.photoUrl}
              alt={`${portfolioData.user.name} - Full Stack Developer`}
              className="profile-img"
            />
          </div>
        </motion.div>
      </div>

      <div className="scroll-down">
        <button
          onClick={() => navigate('/portfolio')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '2rem' }}
        >
          <FaChevronDown />
        </button>
      </div>
    </section>
  );
};

export default Hero;