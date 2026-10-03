import React from 'react';
import { Portfolio } from '../types/bexo';
import { ExternalLink } from '../components/ExternalLink';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  portfolio: Portfolio;
}

export const Footer: React.FC<FooterProps> = ({ portfolio }) => {
  const currentYear = new Date().getFullYear();
  const name = portfolio?.profile?.name || portfolio?.profile?.handle || 'Developer';
  const links = portfolio?.contact?.links || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bexo-footer">
      <div className="bexo-footer-container">
        <div className="bexo-footer-left">
          <p className="bexo-footer-copy">
            &copy; {currentYear} <strong>{name}</strong>. All rights reserved.
          </p>
          <p className="bexo-footer-sub">
            Built with precision &bull; Powered by BEXO architecture
          </p>
        </div>

        {links.length > 0 && (
          <div className="bexo-footer-links">
            {links.map((link) => (
              <ExternalLink
                key={link.id}
                url={link.url}
                label={link.label}
                platform={link.platform}
                showIcon={false}
                className="bexo-footer-link"
              />
            ))}
          </div>
        )}

        <button
          className="bexo-back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <ArrowUp className="bexo-top-icon" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};
