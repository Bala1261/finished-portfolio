import React from 'react';
import { Portfolio } from '../types/bexo';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { AssetRenderer } from '../components/AssetRenderer';
import { ArrowDown, Mail, FileDown, Terminal, Sparkles } from 'lucide-react';
import { sanitizeUrl } from '../utils/safeUrl';
import './Hero.css';

interface HeroProps {
  portfolio: Portfolio;
}

export const Hero: React.FC<HeroProps> = ({ portfolio }) => {
  if (!portfolio || !portfolio.profile) return null;

  const { profile, summary, resume, projects } = portfolio;

  const resumeUrl =
    typeof resume === 'string'
      ? sanitizeUrl(resume)
      : resume?.url
      ? sanitizeUrl(resume.url)
      : null;

  const resumeFileName =
    typeof resume === 'object' && resume.name ? resume.name : 'Resume.pdf';

  const hasProjects = Boolean(projects && projects.length > 0);

  // Avatar handling (string URL or PortfolioAsset)
  const avatarAsset =
    typeof profile.avatar === 'string'
      ? {
          id: 'profile-avatar',
          kind: 'image' as const,
          url: profile.avatar,
          name: profile.name,
          alt: `${profile.name}'s portrait`,
        }
      : profile.avatar;

  // Initials fallback
  const getInitials = (name?: string) => {
    if (!name) return 'DEV';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="home" className="bexo-hero-section">
      <div className="bexo-hero-content">
        <div className="bexo-hero-intro">
          {profile.openToHire && (
            <Badge variant="success" size="md" dot className="bexo-hero-badge">
              AVAILABLE FOR OPPORTUNITIES
            </Badge>
          )}

          <h1 className="bexo-hero-name">
            {profile.name}
            {profile.handle && <span className="bexo-hero-handle">@{profile.handle}</span>}
          </h1>

          {profile.headline && <h2 className="bexo-hero-headline">{profile.headline}</h2>}

          {summary?.text && <p className="bexo-hero-summary">{summary.text}</p>}

          <div className="bexo-hero-actions">
            {hasProjects && (
              <Button href="#projects" variant="primary" size="lg" icon={<ArrowDown />}>
                View Projects
              </Button>
            )}

            {resumeUrl && (
              <Button
                href={resumeUrl}
                variant="secondary"
                size="lg"
                icon={<FileDown />}
                isExternal
                download={resumeFileName}
              >
                Download Resume
              </Button>
            )}

            <Button href="#contact" variant="outline" size="lg" icon={<Mail />}>
              Contact Me
            </Button>
          </div>

          {profile.careerGoal && (
            <div className="bexo-hero-career-goal">
              <Sparkles className="bexo-goal-icon" aria-hidden="true" />
              <span>
                <strong>Focus:</strong> {profile.careerGoal}
              </span>
            </div>
          )}
        </div>

        <div className="bexo-hero-visual">
          <div className="bexo-avatar-wrapper">
            <div className="bexo-avatar-glow" aria-hidden="true" />
            <div className="bexo-avatar-frame">
              {avatarAsset?.url ? (
                <AssetRenderer asset={avatarAsset} aspectRatio="1/1" objectFit="cover" />
              ) : (
                <div className="bexo-avatar-initials-fallback">
                  <Terminal className="bexo-avatar-terminal-icon" aria-hidden="true" />
                  <span className="bexo-initials-text">{getInitials(profile.name)}</span>
                </div>
              )}
            </div>
            {profile.handle && (
              <div className="bexo-avatar-pill">
                <span className="bexo-avatar-pill-dot" />
                <span>bexo.dev/{profile.handle}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
