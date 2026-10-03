import React from 'react';
import { PortfolioEducationItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { formatDateRange } from '../utils/date';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import './Education.css';

interface EducationProps {
  education?: PortfolioEducationItem[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="bexo-education-section">
      <SectionHeading
        eyebrow="ACADEMICS"
        title="Education"
        subtitle="Academic foundations, degree specializations, and scholastic merits"
      />

      <div className="bexo-education-grid">
        {education.map((item, index) => {
          const { label: dateLabel } = formatDateRange(item.dates);

          return (
            <div key={item.id || index} className="bexo-education-card">
              <div className="bexo-edu-header">
                <div className="bexo-edu-icon-wrap">
                  <GraduationCap className="bexo-edu-icon" aria-hidden="true" />
                </div>
                <div className="bexo-edu-titles">
                  <h3 className="bexo-edu-institution">{item.institution}</h3>
                  {item.degree && <h4 className="bexo-edu-degree">{item.degree}</h4>}
                </div>
              </div>

              <div className="bexo-edu-meta">
                {dateLabel && (
                  <span className="bexo-edu-date">
                    <Calendar className="bexo-edu-meta-icon" aria-hidden="true" />
                    <span>{dateLabel}</span>
                  </span>
                )}
                {item.grade && (
                  <span className="bexo-edu-grade">
                    <Award className="bexo-edu-meta-icon" aria-hidden="true" />
                    <span>Grade / Honor: {item.grade}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
