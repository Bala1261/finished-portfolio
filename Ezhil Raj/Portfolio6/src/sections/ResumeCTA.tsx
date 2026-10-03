import React from 'react';
import { PortfolioAsset } from '../types/bexo';
import { Button } from '../components/Button';
import { FileDown, FileText } from 'lucide-react';
import { sanitizeUrl } from '../utils/safeUrl';
import './ResumeCTA.css';

interface ResumeCTAProps {
  resume?: string | PortfolioAsset;
  developerName?: string;
}

export const ResumeCTA: React.FC<ResumeCTAProps> = ({ resume, developerName }) => {
  if (!resume) return null;

  const url = typeof resume === 'string' ? resume : resume.url;
  const safeUrl = sanitizeUrl(url);

  if (!safeUrl) return null;

  const fileName = typeof resume === 'object' && resume.name ? resume.name : 'Curriculum Vitae';

  return (
    <section className="bexo-resume-cta-section" aria-label="Curriculum Vitae Download">
      <div className="bexo-resume-cta-card">
        <div className="bexo-resume-cta-icon-wrap">
          <FileText className="bexo-resume-doc-icon" aria-hidden="true" />
        </div>

        <div className="bexo-resume-cta-content">
          <h3 className="bexo-resume-cta-title">Curriculum Vitae & Experience Dossier</h3>
          <p className="bexo-resume-cta-desc">
            Download the comprehensive resume of {developerName || 'this engineer'}, including in-depth project contributions, tech stack proficiencies, and metrics.
          </p>
          <span className="bexo-resume-filename">{fileName}</span>
        </div>

        <div className="bexo-resume-cta-action">
          <Button
            href={safeUrl}
            variant="primary"
            size="lg"
            icon={<FileDown />}
            isExternal
          >
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  );
};
