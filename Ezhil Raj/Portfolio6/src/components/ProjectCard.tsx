import React from 'react';
import { PortfolioProjectItem } from '../types/bexo';
import { AssetRenderer } from './AssetRenderer';
import { ExternalLink } from './ExternalLink';
import { Badge } from './Badge';
import { formatPortfolioDate } from '../utils/date';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
  project: PortfolioProjectItem;
  onSelect: (project: PortfolioProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const primaryAsset = project.assets && project.assets.length > 0 ? project.assets[0] : undefined;
  const dateFormatted = project.dateLabel || formatPortfolioDate(project.date);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <article
      className="bexo-project-card"
      tabIndex={0}
      role="button"
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${project.title}`}
    >
      <div className="bexo-project-media">
        <AssetRenderer asset={primaryAsset} aspectRatio="16/9" />
        <div className="bexo-project-overlay" />
        <span className="bexo-project-expand-badge" aria-hidden="true">
          <ArrowUpRight className="bexo-expand-icon" />
        </span>
      </div>

      <div className="bexo-project-content">
        <div className="bexo-project-header">
          {project.category && (
            <Badge variant="primary" size="sm">
              {project.category}
            </Badge>
          )}
          {dateFormatted && (
            <span className="bexo-project-date">
              <Calendar className="bexo-card-meta-icon" aria-hidden="true" />
              <span>{dateFormatted}</span>
            </span>
          )}
        </div>

        <h3 className="bexo-project-title">{project.title}</h3>

        {project.role && (
          <div className="bexo-project-role">
            <User className="bexo-card-meta-icon" aria-hidden="true" />
            <span>{project.role}</span>
          </div>
        )}

        <p className="bexo-project-desc">{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="bexo-project-tech">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="bexo-tech-pill">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="bexo-tech-pill more">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="bexo-project-links" onClick={(e) => e.stopPropagation()}>
            {project.links.map((link) => (
              <ExternalLink
                key={link.id}
                url={link.url}
                label={link.label}
                platform={link.platform}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
