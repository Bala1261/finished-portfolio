import React from 'react';
import { PortfolioResearchItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { ExternalLink } from '../components/ExternalLink';
import { AssetRenderer } from '../components/AssetRenderer';
import { formatPortfolioDate } from '../utils/date';
import { BookOpen, Users, Calendar, Newspaper } from 'lucide-react';
import './Research.css';

interface ResearchProps {
  research?: PortfolioResearchItem[];
}

export const Research: React.FC<ResearchProps> = ({ research }) => {
  if (!research || research.length === 0) {
    return null;
  }

  return (
    <section id="research" className="bexo-research-section">
      <SectionHeading
        eyebrow="PUBLICATIONS"
        title="Research & Whitepapers"
        subtitle="Peer-reviewed papers, system design studies, and published investigations"
      />

      <div className="bexo-research-list">
        {research.map((item) => {
          const dateLabel = item.dateLabel || formatPortfolioDate(item.date);
          const primaryAsset = item.assets && item.assets.length > 0 ? item.assets[0] : undefined;

          return (
            <article key={item.id} className="bexo-research-card">
              <div className="bexo-research-main">
                <div className="bexo-research-header">
                  <BookOpen className="bexo-research-type-icon" aria-hidden="true" />
                  <h3 className="bexo-research-title">{item.title}</h3>
                </div>

                {item.authors && item.authors.length > 0 && (
                  <div className="bexo-research-authors">
                    <Users className="bexo-research-meta-icon" aria-hidden="true" />
                    <span>{item.authors.join(', ')}</span>
                  </div>
                )}

                <div className="bexo-research-meta">
                  {item.publication && (
                    <span className="bexo-research-publication">
                      <Newspaper className="bexo-research-meta-icon" aria-hidden="true" />
                      <span>{item.publication}</span>
                    </span>
                  )}

                  {dateLabel && (
                    <span className="bexo-research-date">
                      <Calendar className="bexo-research-meta-icon" aria-hidden="true" />
                      <span>{dateLabel}</span>
                    </span>
                  )}
                </div>

                {item.links && item.links.length > 0 && (
                  <div className="bexo-research-links">
                    {item.links.map((link) => (
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

              {primaryAsset && (
                <div className="bexo-research-asset">
                  <AssetRenderer asset={primaryAsset} aspectRatio="16/9" />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
