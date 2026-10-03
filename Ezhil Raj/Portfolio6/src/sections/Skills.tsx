import React, { useMemo } from 'react';
import { PortfolioSkillItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { Cpu, Terminal, Database, Code, Wrench, Layers } from 'lucide-react';
import './Skills.css';

interface SkillsProps {
  skills?: PortfolioSkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Dynamically group skills by their BEXO category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, PortfolioSkillItem[]> = {};

    skills.forEach((skill) => {
      const category = (skill.category || 'General').trim();
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skill);
    });

    return groups;
  }, [skills]);

  const categories = Object.keys(groupedSkills);
  if (categories.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('front') || lower.includes('ui') || lower.includes('web')) {
      return <Layers className="bexo-cat-icon" aria-hidden="true" />;
    }
    if (lower.includes('back') || lower.includes('server') || lower.includes('api')) {
      return <Terminal className="bexo-cat-icon" aria-hidden="true" />;
    }
    if (lower.includes('data') || lower.includes('db') || lower.includes('sql')) {
      return <Database className="bexo-cat-icon" aria-hidden="true" />;
    }
    if (lower.includes('lang') || lower.includes('program') || lower.includes('code')) {
      return <Code className="bexo-cat-icon" aria-hidden="true" />;
    }
    if (lower.includes('tool') || lower.includes('devops') || lower.includes('cloud')) {
      return <Wrench className="bexo-cat-icon" aria-hidden="true" />;
    }
    return <Cpu className="bexo-cat-icon" aria-hidden="true" />;
  };

  return (
    <section id="skills" className="bexo-skills-section">
      <SectionHeading
        eyebrow="CAPABILITIES"
        title="Technical Skills"
        subtitle="Languages, architectures, systems, and specialized tooling"
      />

      <div className="bexo-skills-categories-grid">
        {categories.map((category) => {
          const items = groupedSkills[category];
          return (
            <div key={category} className="bexo-skill-category-panel">
              <div className="bexo-category-header">
                {getCategoryIcon(category)}
                <h3 className="bexo-category-title">{category}</h3>
                <span className="bexo-category-count">{items.length}</span>
              </div>

              <div className="bexo-skill-pills-wrap">
                {items.map((skill) => (
                  <div key={skill.id} className="bexo-skill-pill">
                    <span className="bexo-skill-pill-bullet" aria-hidden="true" />
                    <span className="bexo-skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
