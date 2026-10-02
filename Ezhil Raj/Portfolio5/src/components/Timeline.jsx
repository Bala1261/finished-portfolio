import React from 'react';
import { Calendar, Compass, Cpu, GitBranch, Cloud } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Timeline() {
  const milestones = [
    {
      period: '2022 — 2023',
      title: 'Foundation of Science & Analytical Logic',
      desc: 'Formed a strong base in analytical reasoning, advanced mathematics, and core computational problem solving, igniting an early passion for computer operating systems.',
      tags: ['STEM Studies', 'Analytical Thinking', 'Core Logic'],
      icon: Compass,
      spotlight: 'rgba(59, 130, 246, 0.2)',
    },
    {
      period: '2024',
      title: 'College First Year — Engineering Fundamentals',
      desc: 'Commenced B.Tech in Information Technology at MCET. Mastered procedural programming in C, object-oriented paradigms, and low-level computer architecture.',
      tags: ['C / Java / Python', 'Data Structures', 'Computer Architecture'],
      icon: Cpu,
      spotlight: 'rgba(0, 240, 255, 0.2)',
    },
    {
      period: '2025',
      title: 'Full-Stack Development & Competitive Programming',
      desc: 'Built modern web systems (React, Node.js, Express, MongoDB) while maintaining consistent algorithmic practice on LeetCode and HackerRank, optimizing time-space complexity.',
      tags: ['Full-Stack Web', 'LeetCode Practice', 'Database Engineering'],
      icon: GitBranch,
      spotlight: 'rgba(168, 85, 247, 0.2)',
    },
    {
      period: '2026',
      title: 'Cloud Systems, DevOps & Container Automation',
      desc: 'Deep-diving into Amazon Web Services, Docker container deployment, Kubernetes pod coordination, Linux system hardening, and automated CI/CD workflows.',
      tags: ['AWS Cloud', 'Docker & K8s', 'Linux Bash', 'CI/CD Automation'],
      icon: Cloud,
      spotlight: 'rgba(245, 158, 11, 0.2)',
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Calendar size={13} /> Milestones & Journey
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Technical <span className="text-gradient">Evolution</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          Chronological milestones highlighting progression from fundamentals to cloud architecture and DevOps operations.
        </p>
      </div>

      {/* Timeline Vertical Conduit */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-cyan-500/30 space-y-10">
        {milestones.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div
              key={idx}
              onMouseEnter={() => playCyberTone(700 + idx * 70, 'sine', 0.05, 0.02)}
              className="relative group cursor-pointer"
            >
              {/* Node on Line */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.5)] group-hover:scale-125 group-hover:border-white transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Milestone Spotlight Card */}
              <SpotlightCard
                spotlightColor={m.spotlight}
                className="glass-panel p-6 sm:p-8 rounded-2xl transition-all duration-300 group-hover:translate-x-2 border border-white/10 group-hover:border-cyan-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
              >
                {/* Period Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30">
                    <Calendar size={13} />
                    <span>{m.period}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                    <IconComp size={16} />
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                  {m.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                  {m.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>

    </section>
  );
}
