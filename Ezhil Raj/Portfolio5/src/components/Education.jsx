import React from 'react';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Education() {
  const coursework = [
    'Cloud Computing',
    'Operating Systems & Linux',
    'Computer Networks',
    'Database Management Systems',
    'Data Structures & Algorithms',
    'Software Engineering',
    'Web Technologies',
    'Object-Oriented Programming',
  ];

  return (
    <section id="education" className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <GraduationCap size={14} /> Academics & Foundation
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Academic <span className="text-gradient">Background</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          The theoretical and laboratory foundation shaping my systems architecture approach.
        </p>
      </div>

      {/* Spotlight Education Card */}
      <SpotlightCard
        spotlightColor="rgba(0, 240, 255, 0.18)"
        className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 text-3xl sm:text-4xl flex-shrink-0 shadow-[0_0_30px_rgba(0,240,255,0.35)]">
            <GraduationCap />
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
              B.Tech in Information Technology
            </h3>
            <div className="text-cyan-400 font-semibold text-base sm:text-lg mb-2">
              Dr. Mahalingam College of Engineering and Technology (MCET)
            </div>
            <div className="inline-flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-mono mb-6">
              <Calendar size={14} />
              <span>2024 — 2028 (Undergraduate Engineering)</span>
            </div>

            <h4 className="font-display font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan-400" />
              <span>Core Coursework & Specialized Subjects</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>

    </section>
  );
}
