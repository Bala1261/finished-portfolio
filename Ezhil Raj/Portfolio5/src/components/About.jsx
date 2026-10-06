import React from 'react';
import { CheckCircle2, User, Sparkles } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function About({ profileData }) {
  const bio = profileData?.profile?.bio;
  const metrics = [
    { number: '7+', label: 'Key Engineered Projects', icon: 'fas fa-diagram-project', color: 'rgba(0, 240, 255, 0.2)' },
    { number: '156+', label: 'LeetCode & DSA Solved', icon: 'fas fa-code', color: 'rgba(245, 158, 11, 0.2)' },
    { number: '9+', label: 'Verified Certifications', icon: 'fas fa-certificate', color: 'rgba(168, 85, 247, 0.2)' },
    { number: '2028', label: 'B.Tech IT Graduation', icon: 'fas fa-graduation-cap', color: 'rgba(16, 185, 129, 0.2)' },
  ];

  const pillars = [
    { title: 'Infrastructure as Code', desc: 'Declarative cloud provisioning with reproducible configurations.' },
    { title: 'CI/CD Pipeline Automation', desc: 'Zero-downtime deployment pipelines with automated test suites.' },
    { title: 'Containerization & Microservices', desc: 'Dockerized isolation and Kubernetes multi-pod coordination.' },
    { title: 'Linux Systems Administration', desc: 'Kernel tuning, systemd daemon management, and bash automation.' },
  ];

  return (
    <section id="about" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <User size={13} /> Biography & Pillars
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Architecting The <span className="text-gradient">Cloud Future</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          {profileData?.profile?.headline || 'Passionate engineering student stepping forward in DevOps automation, cloud architecture, and high-performance algorithmic programming.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Metric Cards Grid with React Bits Spotlight */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
          {metrics.map((m, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={m.color}
              onMouseEnter={() => playCyberTone(700 + idx * 80, 'sine', 0.05, 0.02)}
              className="glass-panel p-6 rounded-2xl group cursor-pointer border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-cyan-400 text-xl mb-4 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-sm">
                <i className={m.icon}></i>
              </div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                {m.number}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {m.label}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Narrative & Pillars */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            {bio ? (
              <p>{bio}</p>
            ) : (
              <>
                <p>
                  I am an Information Technology student at <strong>Dr. Mahalingam College of Engineering and Technology</strong>. My passion is rooted in building reliable cloud platforms, optimizing Linux workloads, and orchestrating container environments.
                </p>
                <p>
                  I bridge foundational software engineering with modern cloud DevOps practices — ensuring every service is <strong>scalable, self-healing, and continuously deployed</strong>.
                </p>
              </>
            )}
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center gap-2.5 font-display font-bold text-sm text-white mb-1">
                  <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
