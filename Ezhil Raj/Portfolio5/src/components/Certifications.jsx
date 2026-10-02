import React from 'react';
import { Award } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Certifications() {
  const certs = [
    {
      title: 'AWS Academy Cloud Foundations',
      issuer: 'AWS Training & Certification',
      desc: 'Fundamental understanding of AWS cloud infrastructure, security practices, architectural principles, and core cloud services.',
      icon: 'fab fa-aws',
      color: 'text-amber-400',
      spotlight: 'rgba(245, 158, 11, 0.15)',
    },
    {
      title: 'Linux Essentials Certification',
      issuer: 'LPI / Open Source',
      desc: 'Command-line fluency, process control, shell scripting, package management, and system administration principles.',
      icon: 'fab fa-linux',
      color: 'text-yellow-400',
      spotlight: 'rgba(250, 204, 21, 0.15)',
    },
    {
      title: 'Artificial Intelligence Certification',
      issuer: 'Verified AI Program',
      desc: 'Machine learning fundamentals, neural networks, supervised classification, and intelligent automation systems.',
      icon: 'fas fa-brain',
      color: 'text-purple-400',
      spotlight: 'rgba(168, 85, 247, 0.15)',
    },
    {
      title: 'Codesoft Internship Offer Letter',
      issuer: 'Codesoft Technologies',
      desc: 'Selected for software development and engineering design with practical real-world problem solving.',
      icon: 'fas fa-briefcase',
      color: 'text-cyan-400',
      spotlight: 'rgba(0, 240, 255, 0.15)',
    },
    {
      title: 'Thirax Full-Stack Internship',
      issuer: 'Thirax Web Solutions',
      desc: 'Full-stack web development verified completion with client-server architecture and persistent database integration.',
      icon: 'fas fa-file-shield',
      color: 'text-blue-400',
      spotlight: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Robo Miracle Robotics Internship',
      issuer: 'Robo Miracle Lab',
      desc: 'Hands-on engineering internship working with embedded technology systems, sensors, and robotics software integration.',
      icon: 'fas fa-robot',
      color: 'text-emerald-400',
      spotlight: 'rgba(16, 185, 129, 0.15)',
    },
    {
      title: 'Unstop Hackathons & Achievements',
      issuer: 'Unstop National Competitions',
      desc: 'Participated in national competitive programming contests, coding hackathons, and technical assessments.',
      icon: 'fas fa-trophy',
      color: 'text-yellow-300',
      spotlight: 'rgba(253, 224, 71, 0.15)',
    },
    {
      title: 'NPTEL - Management Information Systems',
      issuer: 'NPTEL / IIT',
      desc: 'Enterprise database infrastructure, decision support software, and corporate data flow management.',
      icon: 'fas fa-graduation-cap',
      color: 'text-pink-400',
      spotlight: 'rgba(244, 114, 182, 0.15)',
    },
    {
      title: 'NPTEL - Environmental Impact Assessment',
      issuer: 'NPTEL / IIT',
      desc: 'Sustainable engineering principles, risk assessment methods, and modern green technology policies.',
      icon: 'fas fa-leaf',
      color: 'text-green-400',
      spotlight: 'rgba(74, 222, 128, 0.15)',
    },
  ];

  return (
    <section id="certifications" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Award size={14} /> Verified Credentials
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Certifications & <span className="text-gradient">Internships</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Recognized achievements, completed professional internships, and verified academic technical certifications.
        </p>
      </div>

      {/* Spotlight Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((c, idx) => (
          <SpotlightCard
            key={idx}
            spotlightColor={c.spotlight}
            onMouseEnter={() => playCyberTone(680 + idx * 35, 'sine', 0.05, 0.02)}
            className="glass-panel p-6 rounded-2xl flex gap-4 items-start transition-all duration-300 hover:-translate-y-1.5 border border-white/10 hover:border-cyan-400/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)] group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform ${c.color} shadow-sm`}>
              <i className={c.icon}></i>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 font-semibold block mb-1 uppercase tracking-wider">
                {c.issuer}
              </span>
              <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {c.desc}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>

    </section>
  );
}
