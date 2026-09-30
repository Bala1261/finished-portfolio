import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import portfolioData from '../data/portfolioData.json';

const HireMe = () => {
  const navigate = useNavigate();

  return (
    <section id="hire-me" className="section" style={{ background: 'rgba(15, 23, 42, 0.4)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
        <h2 className="section-title">Hire {portfolioData.user.name}</h2>
        <div className="section-subtitle">Initiate contract engagements, full-time positions, or custom development projects.</div>

        <motion.div 
          className="card"
          style={{ 
            background: 'var(--dark-card)', 
            border: '1px solid rgba(59, 130, 246, 0.3)', 
            padding: '45px', 
            borderRadius: '20px',
            marginTop: '30px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '25px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Verified Profile
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Fast Handoff
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Secure Process
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.8' }}>
            Looking for a dedicated developer to build scalable web applications or modern frontend experiences? Connect securely or transition directly to the contact channel below.
          </p>

          <button 
            onClick={() => navigate('/contact')} 
            className="btn btn-primary" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: 'none' }}
          >
            <FaBriefcase /> Continue to Hiring Workflow <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HireMe;