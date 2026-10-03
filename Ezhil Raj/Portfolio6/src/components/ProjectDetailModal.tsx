import React, { useEffect, useRef } from 'react';
import { PortfolioProjectItem } from '../types/bexo';
import { AssetRenderer } from './AssetRenderer';
import { ExternalLink } from './ExternalLink';
import { Badge } from './Badge';
import { formatPortfolioDate } from '../utils/date';
import { X, Calendar, User, Code, Layers } from 'lucide-react';
import './ProjectDetailModal.css';

interface ProjectDetailModalProps {
  project: PortfolioProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & handle focus trap
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus close button initially for accessibility
    closeBtnRef.current?.focus();

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const dateFormatted = project.dateLabel || formatPortfolioDate(project.date);
  const primaryAsset = project.assets && project.assets.length > 0 ? project.assets[0] : undefined;
  const secondaryAssets = project.assets && project.assets.length > 1 ? project.assets.slice(1) : [];

  return (
    <div
      className="bexo-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="bexo-modal-container"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="bexo-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X className="bexo-modal-close-icon" aria-hidden="true" />
        </button>

        {primaryAsset && (
          <div className="bexo-modal-hero-asset">
            <AssetRenderer asset={primaryAsset} aspectRatio="16/9" />
          </div>
        )}

        <div className="bexo-modal-body">
          <div className="bexo-modal-header-meta">
            {project.category && (
              <Badge variant="primary" size="sm">
                {project.category}
              </Badge>
            )}
            {dateFormatted && (
              <span className="bexo-modal-date">
                <Calendar className="bexo-meta-icon" aria-hidden="true" />
                <span>{dateFormatted}</span>
              </span>
            )}
            {project.role && (
              <span className="bexo-modal-role">
                <User className="bexo-meta-icon" aria-hidden="true" />
                <span>{project.role}</span>
              </span>
            )}
          </div>

          <h2 id="modal-project-title" className="bexo-modal-title">
            {project.title}
          </h2>

          <p className="bexo-modal-description">{project.description}</p>

          {project.technologies && project.technologies.length > 0 && (
            <div className="bexo-modal-section">
              <h4 className="bexo-modal-section-title">
                <Code className="bexo-section-icon" aria-hidden="true" />
                <span>Technologies & Architecture</span>
              </h4>
              <div className="bexo-modal-tech-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bexo-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {secondaryAssets.length > 0 && (
            <div className="bexo-modal-section">
              <h4 className="bexo-modal-section-title">
                <Layers className="bexo-section-icon" aria-hidden="true" />
                <span>Project Gallery</span>
              </h4>
              <div className="bexo-modal-gallery">
                {secondaryAssets.map((asset) => (
                  <div key={asset.id} className="bexo-gallery-item">
                    <AssetRenderer asset={asset} aspectRatio="16/9" />
                    {asset.name && <span className="bexo-gallery-caption">{asset.name}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.credits && (
            <div className="bexo-modal-section">
              <h4 className="bexo-modal-section-title">Credits & Acknowledgements</h4>
              <p className="bexo-modal-credits">{project.credits}</p>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="bexo-modal-footer-links">
              {project.links.map((link) => (
                <ExternalLink
                  key={link.id}
                  url={link.url}
                  label={link.label}
                  platform={link.platform}
                  className="bexo-modal-action-btn"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
