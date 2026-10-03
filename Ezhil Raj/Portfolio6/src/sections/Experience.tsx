import React from 'react';
import { PortfolioExperienceItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { formatDateRange } from '../utils/date';
import { MapPin, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import './Experience.css';

interface ExperienceProps {
  experience?: PortfolioExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="bexo-experience-section">
      <SectionHeading
        eyebrow="CAREER"
        title="Work Experience"
        subtitle="Professional history, engineering impacts, and leadership initiatives"
      />

      <div className="bexo-experience-timeline">
        {experience.map((item, index) => {
          const { label: dateLabel, isOngoing } = formatDateRange(item.dates);

          return (
            <div
              key={item.id || index}
              className={`bexo-timeline-item ${isOngoing ? 'is-current' : ''}`}
            >
              <div className="bexo-timeline-indicator">
                <div className="bexo-timeline-dot">
                  {isOngoing && <div className="bexo-dot-pulse" aria-hidden="true" />}
                </div>
                {index < experience.length - 1 && <div className="bexo-timeline-line" />}
              </div>

              <div className="bexo-timeline-card">
                <div className="bexo-timeline-header">
                  <div className="bexo-timeline-main-info">
                    <h3 className="bexo-timeline-role">{item.role}</h3>
                    <h4 className="bexo-timeline-company">
                      <Briefcase className="bexo-timeline-meta-icon" aria-hidden="true" />
                      <span>{item.company}</span>
                    </h4>
                  </div>

                  <div className="bexo-timeline-badges">
                    {dateLabel && (
                      <span className={`bexo-timeline-date-pill ${isOngoing ? 'current' : ''}`}>
                        <Calendar className="bexo-timeline-meta-icon" aria-hidden="true" />
                        <span>{dateLabel}</span>
                      </span>
                    )}

                    {item.location && (
                      <span className="bexo-timeline-location-pill">
                        <MapPin className="bexo-timeline-meta-icon" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="bexo-timeline-desc">{item.description}</p>
                )}

                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="bexo-timeline-responsibilities">
                    {item.responsibilities.map((resp, rIndex) => (
                      <li key={rIndex} className="bexo-resp-item">
                        <CheckCircle className="bexo-resp-bullet" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
