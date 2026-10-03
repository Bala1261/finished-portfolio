import React from 'react';
import './SectionHeading.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  id,
}) => {
  return (
    <header className={`bexo-section-heading bexo-section-heading--${align}`} id={id}>
      {eyebrow && <span className="bexo-heading-eyebrow">{eyebrow}</span>}
      <h2 className="bexo-heading-title">{title}</h2>
      {subtitle && <p className="bexo-heading-subtitle">{subtitle}</p>}
    </header>
  );
};
