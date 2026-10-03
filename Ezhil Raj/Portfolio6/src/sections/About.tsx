import React from 'react';
import { Portfolio } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { Activity, Target, CheckCircle2, User } from 'lucide-react';
import './About.css';

interface AboutProps {
  portfolio: Portfolio;
}

export const About: React.FC<AboutProps> = ({ portfolio }) => {
  const { about, summary, profile } = portfolio;

  const currentStatus = about?.currentStatus;
  const summaryText = summary?.text;
  const careerGoal = profile.careerGoal;

  // If no relevant data is available, do not render section
  if (!currentStatus && !summaryText && !careerGoal) {
    return null;
  }

  return (
    <section id="about" className="bexo-about-section">
      <SectionHeading
        eyebrow="ABOUT"
        title="Background & Focus"
        subtitle="Engineering philosophies, ongoing pursuits, and technical trajectory"
      />

      <div className="bexo-about-grid">
        {summaryText && (
          <div className="bexo-about-statement-card">
            <h3 className="bexo-about-statement-title">
              <User className="bexo-about-card-icon" aria-hidden="true" />
              <span>Overview</span>
            </h3>
            <p className="bexo-about-statement-text">{summaryText}</p>
          </div>
        )}

        <div className="bexo-about-details-column">
          {currentStatus && (
            <div className="bexo-about-info-card status">
              <div className="bexo-about-card-header">
                <Activity className="bexo-about-card-icon highlight" aria-hidden="true" />
                <h4>Current Status</h4>
              </div>
              <p className="bexo-about-card-body">{currentStatus}</p>
            </div>
          )}

          {careerGoal && (
            <div className="bexo-about-info-card goal">
              <div className="bexo-about-card-header">
                <Target className="bexo-about-card-icon" aria-hidden="true" />
                <h4>Career Objective</h4>
              </div>
              <p className="bexo-about-card-body">{careerGoal}</p>
            </div>
          )}

          {profile.openToHire && (
            <div className="bexo-about-info-card hiring">
              <div className="bexo-about-card-header">
                <CheckCircle2 className="bexo-about-card-icon success" aria-hidden="true" />
                <h4>Availability</h4>
              </div>
              <p className="bexo-about-card-body">
                Open to discussions for impactful engineering roles, technical leadership, or high-leverage consulting.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
