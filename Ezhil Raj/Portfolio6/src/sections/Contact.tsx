import React from 'react';
import { PortfolioContact } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { ExternalLink } from '../components/ExternalLink';
import { Send } from 'lucide-react';
import { sanitizeUrl } from '../utils/safeUrl';
import './Contact.css';

interface ContactProps {
  contact?: PortfolioContact;
  developerName?: string;
}

export const Contact: React.FC<ContactProps> = ({ contact, developerName }) => {
  if (!contact) return null;

  const email = contact.email?.trim();
  const safeEmail = email ? sanitizeUrl(`mailto:${email}`) : null;
  const links = contact.links || [];

  if (!email && links.length === 0) {
    return null;
  }

  return (
    <section id="contact" className="bexo-contact-section">
      <div className="bexo-contact-card">
        <div className="bexo-contact-glow" aria-hidden="true" />

        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Let's build something meaningful."
          subtitle={`Whether you're looking to discuss architecture, recruit engineering talent, or collaborate on innovative projects, feel free to reach out.`}
          align="center"
        />

        <div className="bexo-contact-actions">
          {safeEmail && (
            <Button
              href={safeEmail}
              variant="primary"
              size="lg"
              icon={<Send />}
              ariaLabel={`Send email to ${developerName || 'developer'}`}
            >
              <span className="bexo-contact-email-label">Send Email: {email}</span>
            </Button>
          )}

          {links.length > 0 && (
            <div className="bexo-contact-social-grid">
              {links.map((link) => (
                <ExternalLink
                  key={link.id}
                  url={link.url}
                  label={link.label}
                  platform={link.platform}
                  className="bexo-contact-social-btn"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
