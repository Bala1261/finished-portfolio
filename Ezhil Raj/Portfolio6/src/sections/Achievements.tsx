import React from 'react';
import { PortfolioAchievementItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { AssetRenderer } from '../components/AssetRenderer';
import { formatPortfolioDate } from '../utils/date';
import { Trophy, Building2, FolderGit2, Calendar } from 'lucide-react';
import './Achievements.css';

interface AchievementsProps {
  achievements?: PortfolioAchievementItem[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="bexo-achievements-section">
      <SectionHeading
        eyebrow="HONORS"
        title="Key Achievements"
        subtitle="Hackathons, competitive milestones, industry honors, and recognitions"
      />

      <div className="bexo-achievements-grid">
        {achievements.map((item) => {
          const dateLabel = item.dateLabel || formatPortfolioDate(item.date);
          const primaryAsset = item.assets && item.assets.length > 0 ? item.assets[0] : undefined;

          return (
            <div key={item.id} className="bexo-achievement-card">
              <div className="bexo-achieve-header">
                <div className="bexo-achieve-icon-wrap">
                  <Trophy className="bexo-achieve-icon" aria-hidden="true" />
                </div>
                <div className="bexo-achieve-title-block">
                  <h3 className="bexo-achieve-title">{item.title}</h3>
                  {item.organization && (
                    <span className="bexo-achieve-org">
                      <Building2 className="bexo-achieve-meta-icon" aria-hidden="true" />
                      <span>{item.organization}</span>
                    </span>
                  )}
                </div>
              </div>

              {item.project && (
                <div className="bexo-achieve-project">
                  <FolderGit2 className="bexo-achieve-meta-icon" aria-hidden="true" />
                  <span>
                    Associated Project: <strong>{item.project}</strong>
                  </span>
                </div>
              )}

              {primaryAsset && (
                <div className="bexo-achieve-asset">
                  <AssetRenderer asset={primaryAsset} aspectRatio="16/9" />
                </div>
              )}

              {dateLabel && (
                <div className="bexo-achieve-footer">
                  <Calendar className="bexo-achieve-meta-icon" aria-hidden="true" />
                  <span>{dateLabel}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
