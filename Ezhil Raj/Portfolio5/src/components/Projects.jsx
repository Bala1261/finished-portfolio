import React, { useState, useEffect } from 'react';
import { X, Check, Layers, Code2, ExternalLink } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Full-Stack & Web' },
    { id: 'ai', label: 'AI & Computer Vision' },
    { id: 'systems', label: 'Systems & CLI' },
  ];

  const projects = [
    {
      id: 'routine',
      title: 'Routine Tracker (MERN Stack)',
      category: 'web',
      catLabel: 'Full-Stack Web',
      icon: 'fas fa-calendar-check',
      desc: 'A full-stack habit and routine management platform featuring automated streak tracking, completion telemetry analytics, and secure RESTful endpoints.',
      stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'Secure JWT authentication pipeline with bcrypt password hashing',
        'Dynamic streak calculation algorithm running on MongoDB aggregation',
        'Responsive mobile-first dashboard with interactive task checklists'
      ]
    },
    {
      id: 'vlc',
      title: 'VLC Hand Gesture Control',
      category: 'ai',
      catLabel: 'Computer Vision',
      icon: 'fas fa-hand-sparkles',
      desc: 'Touchless human-computer interaction system leveraging OpenCV and MediaPipe to control VLC media player (play, pause, skip, volume) using real-time hand gestures.',
      stack: ['Python', 'OpenCV', 'MediaPipe', 'IPC Sockets', 'NumPy'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'Real-time 21 3D hand landmark tracking operating at 30+ FPS',
        'Euclidean distance coordinate mapping for volume and timeline scrubbing',
        'Noise filtering heuristic preventing spurious gesture triggers'
      ]
    },
    {
      id: 'insurance',
      title: 'Medical Insurance Cost Prediction',
      category: 'ai',
      catLabel: 'Machine Learning',
      icon: 'fas fa-file-invoice-dollar',
      desc: 'Supervised predictive regression pipeline estimating healthcare expenditure based on demographic factors, smoker coefficients, and BMI metrics.',
      stack: ['Python', 'Random Forest', 'Pandas', 'Scikit-learn'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'Robust data cleaning pipeline dealing with skewness and feature encoding',
        'Random Forest Regressor hyperparameter tuning optimizing R² score',
        'Feature importance extraction highlighting high-risk expenditure drivers'
      ]
    },
    {
      id: 'churn',
      title: 'Customer Churn Prediction',
      category: 'ai',
      catLabel: 'Data Science',
      icon: 'fas fa-user-xmark',
      desc: 'Machine learning classification pipeline identifying high-risk customer turnover profiles from historical usage metrics to enable proactive retention.',
      stack: ['Python', 'Classification', 'EDA', 'Scikit-learn', 'Seaborn'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'Class imbalance mitigation via synthetic minority oversampling (SMOTE)',
        'Model benchmark comparisons evaluating ROC-AUC and precision curves',
        'Inference engine scoring customer cohorts for automated notifications'
      ]
    },
    {
      id: 'hospital',
      title: 'Hospital Management System',
      category: 'systems',
      catLabel: 'Relational Database',
      icon: 'fas fa-hospital-user',
      desc: 'Comprehensive relational database suite managing patient admissions, doctor appointments, billing logs, and medical records with transaction safety.',
      stack: ['Python', 'SQLite', 'Relational Schemas', 'CLI Engine'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'ACID-compliant SQLite relational schema with foreign key constraints',
        'Conflict-free doctor appointment scheduler preventing double bookings',
        'Clean CLI dashboard with automated sanitization routines'
      ]
    },
    {
      id: 'todo',
      title: 'C Task Manager & File I/O',
      category: 'systems',
      catLabel: 'Systems Programming',
      icon: 'fas fa-list-check',
      desc: 'Lightweight, ultra-fast command-line task scheduler written in ANSI C with dynamic memory allocation, priority queues, and binary file persistence.',
      stack: ['C', 'Pointers & Structs', 'POSIX File I/O', 'Dynamic Memory'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'Native binary compiled with zero third-party dependencies',
        'Custom binary serialization for persistent file records',
        'Strict Valgrind-verified memory allocation with zero leaks'
      ]
    },
    {
      id: 'portfolio',
      title: 'Cloud DevOps 3D Portfolio',
      category: 'web',
      catLabel: 'Modern Web Architecture',
      icon: 'fas fa-globe',
      desc: 'An ultra-modern, GPU-accelerated interactive web platform engineered with React, Three.js 3D WebGL cosmos, Tailwind CSS, and Express backend integration.',
      stack: ['React', 'Three.js', 'Tailwind CSS', 'Vite', 'Express.js'],
      github: 'https://github.com/jothimani7806',
      architecture: [
        'Real-time Three.js WebGL particle cosmos with cursor gravity physics',
        'Dynamic 3D perspective cards with specular glare reflection',
        'Native Web Audio API synthesizer for futuristic micro-interactions'
      ]
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <i className="fas fa-laptop-code"></i> Engineering Showcase
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Engineered <span className="text-gradient">3D Creations</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Production-grade applications spanning full-stack web platforms, machine learning models, computer vision systems, and systems engineering.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id);
              playCyberTone(820, 'triangle', 0.08, 0.03);
            }}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
              filter === tab.id
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* React Bits Spotlight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => (
          <SpotlightCard
            key={p.id}
            spotlightColor="rgba(0, 240, 255, 0.22)"
            className="group rounded-2xl glass-panel p-7 flex flex-col justify-between border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            onClick={() => {
              setSelectedProject(p);
              playCyberTone(880, 'triangle', 0.1, 0.05);
            }}
          >
            <div>
              {/* Header: Icon & Category */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] group-hover:scale-110 transition-transform">
                  <i className={p.icon}></i>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30 uppercase">
                  {p.catLabel}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-xl font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {p.desc}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playCyberTone(900, 'sine', 0.08, 0.04);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
              >
                <i className="fab fa-github text-sm"></i>
                <span>Repository</span>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(p);
                  playCyberTone(880, 'triangle', 0.1, 0.05);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
              >
                View Architecture
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* 3D Glass Modal Dialog */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.2)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 uppercase inline-block mb-3">
              {selectedProject.catLabel}
            </span>

            <h3 id="project-modal-title" className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedProject.desc}
            </p>

            {/* Architecture Highlights */}
            <h4 className="font-display font-bold text-base text-cyan-400 mb-3 flex items-center gap-2">
              <Layers size={18} />
              <span>Technical Highlights & Architecture</span>
            </h4>
            <ul className="space-y-2.5 mb-6 text-sm text-slate-300">
              {selectedProject.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Stack Components */}
            <h4 className="font-display font-bold text-sm text-white mb-2.5 flex items-center gap-2">
              <Code2 size={16} />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
              >
                <i className="fab fa-github text-base"></i>
                <span>Explore GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
