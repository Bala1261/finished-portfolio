import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; 2025 Vishal K. All rights reserved.</p>
            <p>Built with <FaHeart className="heart-icon" /> and passion</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
