import { createContext, useContext, useEffect, useState } from 'react';
import { personalInfo, about, skills, projects, experience, achievements } from '../data/portfolio';

const BexoProfileContext = createContext(null);

const localFallbackProfile = {
  user: {
    name: personalInfo.name,
    email: personalInfo.email,
    photoUrl: personalInfo.avatar,
    resumeUrl: "", // If empty/null, resume CTA disappears per BEXO standard
    openToHire: true
  },
  profile: {
    handle: "solairaj28",
    headline: personalInfo.role,
    careerGoal: about.interests[0] || "Building robust applications",
    bio: about.description
  },
  projectEntries: projects.map(p => ({
    title: p.title,
    category: p.technologies[0] || "Web App",
    description: p.description,
    stack: p.technologies,
    externalLink: p.github,
    demoLink: p.demo,
    images: [p.image]
  })),
  experienceEntries: experience.map(e => ({
    role: e.title,
    company: e.company,
    location: e.location,
    period: e.period,
    description: e.description
  })),
  educationEntries: about.education.map(ed => ({
    degree: ed.degree,
    institution: ed.institution,
    year: ed.year,
    description: ed.description
  })),
  skillEntries: [...skills.frontend, ...skills.backend, ...skills.tools],
  certificateEntries: achievements.filter(a => a.description.includes("Certification")),
  achievementEntries: achievements.filter(a => !a.description.includes("Certification")),
  researchEntries: []
};

export const BexoProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(localFallbackProfile);

  useEffect(() => {
    if (window.__BEXO_PROFILE__) {
      setProfileData(window.__BEXO_PROFILE__);
    }
  }, []);

  return (
    <BexoProfileContext.Provider value={profileData}>
      {children}
    </BexoProfileContext.Provider>
  );
};

export const useBexoProfile = () => useContext(BexoProfileContext);