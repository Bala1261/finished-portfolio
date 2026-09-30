import React from 'react';
import IdentitySection from '../components/IdentitySection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectsSection';
import CertificationsSection from '../components/CertificationsSection';
import AchievementsSection from '../components/AchievementsSection';
import ResearchSection from '../components/ResearchSection';

export default function PortfolioPage() {
  return (
    <div className="space-y-4 pb-16">
      {/* 1. About / Identity */}
      <IdentitySection />

      {/* 2. Skills */}
      <SkillsSection />

      {/* 3. Experience */}
      <ExperienceSection />

      {/* 4. Education */}
      <EducationSection />

      {/* 5. Selected Work / Projects */}
      <ProjectsSection />

      {/* 6. Certificates */}
      <CertificationsSection />

      {/* 7. Achievements */}
      <AchievementsSection />

      {/* 8. Research */}
      <ResearchSection />
    </div>
  );
}
