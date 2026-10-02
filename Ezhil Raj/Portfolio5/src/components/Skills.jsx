import React, { useState } from 'react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';
import ShinyText from './reactbits/ShinyText';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Stack', icon: 'fas fa-border-all' },
    { id: 'cloud', label: 'Cloud & DevOps', icon: 'fas fa-cloud' },
    { id: 'programming', label: 'Programming', icon: 'fas fa-code' },
    { id: 'web', label: 'Frontend & Backend', icon: 'fas fa-layer-group' },
    { id: 'data', label: 'Database & Tools', icon: 'fas fa-database' },
  ];

  const skillsData = [
    // Cloud & DevOps
    { name: 'Amazon Web Services (AWS)', level: 84, category: 'cloud', icon: 'fab fa-aws', color: '#ff9900' },
    { name: 'Docker & Containers', level: 86, category: 'cloud', icon: 'fab fa-docker', color: '#2496ed' },
    { name: 'Linux System Administration', level: 88, category: 'cloud', icon: 'fab fa-linux', color: '#fcc624' },
    { name: 'Git & GitHub Actions', level: 90, category: 'cloud', icon: 'fab fa-git-alt', color: '#f05032' },
    // Programming Languages
    { name: 'Python', level: 88, category: 'programming', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'JavaScript (ES6+)', level: 85, category: 'programming', icon: 'fab fa-js', color: '#f7df1e' },
    { name: 'C Language & Memory', level: 85, category: 'programming', icon: 'fas fa-c', color: '#00599c' },
    { name: 'Java Core', level: 80, category: 'programming', icon: 'fab fa-java', color: '#ea2d2e' },
    // Frontend & Backend
    { name: 'React.js & Tailwind CSS', level: 84, category: 'web', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'Node.js & Express API', level: 82, category: 'web', icon: 'fab fa-node-js', color: '#68a063' },
    // Database & Tools
    { name: 'MongoDB & SQLite', level: 82, category: 'data', icon: 'fas fa-database', color: '#47a248' },
    { name: 'Machine Learning (Scikit)', level: 78, category: 'data', icon: 'fas fa-brain', color: '#f58220' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <i className="fas fa-layer-group"></i>
          <ShinyText text="Technical Capabilities" color="#00f0ff" shineColor="#ffffff" speed={3.5} />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Interactive <span className="text-gradient">Tech Matrix</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          An interactive breakdown of cloud infrastructure, core systems programming, and modern development tooling.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              playCyberTone(800, 'triangle', 0.08, 0.03);
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            <i className={cat.icon}></i>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* React Bits Spotlight Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSkills.map((skill, idx) => (
          <SpotlightCard
            key={skill.name}
            spotlightColor={`${skill.color}25`}
            onMouseEnter={() => playCyberTone(650 + idx * 30, 'sine', 0.05, 0.02)}
            className="group cursor-pointer glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-xl transition-transform group-hover:scale-110 shadow-sm"
                  style={{ color: skill.color }}
                >
                  <i className={skill.icon}></i>
                </div>
                <span className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400">
                {skill.level}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </SpotlightCard>
        ))}
      </div>

    </section>
  );
}
