import React, { useState, useMemo } from 'react';
import { PortfolioProjectItem } from '../types/bexo';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import './Projects.css';

interface ProjectsProps {
  projects?: PortfolioProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!projects || projects.length === 0) {
    return null;
  }

  // Derive dynamic categories from the projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    projects.forEach((p) => {
      if (p.category && p.category.trim()) {
        cats.add(p.category.trim());
      }
    });
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category?.trim() === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="bexo-projects-section">
      <SectionHeading
        eyebrow="PORTFOLIO"
        title="Featured Projects"
        subtitle="Architected systems, open-source libraries, and high-performance applications"
      />

      {/* Dynamic Category Filter if multiple categories exist */}
      {categories.length > 2 && (
        <div className="bexo-projects-filter-bar" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`bexo-filter-tab ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="bexo-projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
