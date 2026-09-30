import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description: 'Modern and responsive portfolio website built with React, featuring smooth animations, dark theme, integrated contact form with Node.js backend, and email functionality.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['React', 'Node.js', 'Express'],
      category: 'fullstack',
      demoUrl: 'http://localhost:3000',
      githubUrl: 'https://github.com/Vishal-25-cyber'
    },
    {
      id: 2,
      title: 'Advanced Full Stack Application',
      description: 'A comprehensive full-stack web application built with modern JavaScript technologies, featuring robust backend API and interactive frontend.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
      tags: ['JavaScript', 'Full Stack', 'Web Dev'],
      category: 'fullstack',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/Advanced_fullstack'
    },
    {
      id: 3,
      title: 'Bank Fraud Detection System',
      description: 'Machine learning-based fraud detection system using Python to identify fraudulent banking transactions with high accuracy.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      tags: ['Python', 'Machine Learning', 'Security'],
      category: 'ml',
      demoUrl: null,
      githubUrl: 'https://github.com/Vishal-25-cyber/Bank_fraud_detection'
    }
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Full Stack', value: 'fullstack' },
    { name: 'Web Apps', value: 'web' },
    { name: 'Machine Learning', value: 'ml' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="section-subtitle">Recent works and achievements</div>

        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                    </motion.a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
