import React, { useState, useEffect } from 'react';
import { Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function ProblemSolving() {
  const [stats, setStats] = useState({
    easy: 67,
    medium: 80,
    hard: 9,
    total: 156,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('https://leetcode-stats-api.herokuapp.com/Jothimani06');
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'success') {
            const easy = data.easySolved || 67;
            const med = data.mediumSolved || 80;
            const hard = data.hardSolved || 9;
            setStats({
              easy,
              medium: med,
              hard,
              total: easy + med + hard,
            });
          }
        }
      } catch {
        // Retain verified fallback stats
      }
    }
    fetchStats();
  }, []);

  return (
    <section id="problem-solving" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Code2 size={14} /> Algorithmic Skill
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Competitive <span className="text-gradient">Coding Hub</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Active problem-solving across leading competitive coding platforms, honing data structures, dynamic programming, and computational complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LeetCode Interactive Spotlight Card */}
        <div className="lg:col-span-7">
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.18)"
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-[0_4px_35px_rgba(0,0,0,0.5)]"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 text-2xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  <i className="fas fa-code"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                    LeetCode Practice
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-slate-400">
                    Active Profile: <span className="text-cyan-400 font-bold">@Jothimani06</span>
                  </div>
                </div>
              </div>

              <a
                href="https://leetcode.com/u/Jothimani06/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberTone(880, 'sine', 0.08, 0.04)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 text-xs font-bold text-slate-200 hover:text-cyan-400 transition-all"
              >
                <span>Profile</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Difficulty Breakdown Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              
              {/* Easy */}
              <div className="p-4 rounded-xl bg-slate-900/60 border-b-4 border-emerald-400 text-center">
                <div className="font-display text-2xl sm:text-3xl font-black text-white mb-1">
                  {stats.easy}
                </div>
                <div className="font-mono text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                  Easy
                </div>
              </div>

              {/* Medium */}
              <div className="p-4 rounded-xl bg-slate-900/60 border-b-4 border-amber-400 text-center">
                <div className="font-display text-2xl sm:text-3xl font-black text-white mb-1">
                  {stats.medium}
                </div>
                <div className="font-mono text-[11px] font-bold text-amber-400 tracking-wider uppercase">
                  Medium
                </div>
              </div>

              {/* Hard */}
              <div className="p-4 rounded-xl bg-slate-900/60 border-b-4 border-rose-500 text-center">
                <div className="font-display text-2xl sm:text-3xl font-black text-white mb-1">
                  {stats.hard}
                </div>
                <div className="font-mono text-[11px] font-bold text-rose-400 tracking-wider uppercase">
                  Hard
                </div>
              </div>

            </div>

            {/* Progress Meter */}
            <div className="mb-6">
              <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                <span>Total Solved Milestones</span>
                <span className="text-cyan-400 font-mono font-bold">{stats.total} Solved</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  style={{ width: `${Math.min((stats.total / 300) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
              <span>Core Algorithms: Dynamic Programming, Graph Traversal, Binary Trees, Two Pointers</span>
            </div>

          </SpotlightCard>
        </div>

        {/* Other Coding Platforms */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* HackerRank */}
          <a
            href="https://www.hackerrank.com/profile/jothimani782006"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberTone(780, 'sine', 0.08, 0.03)}
            className="block card-3d-wrap group"
          >
            <div className="card-3d-content glass-panel p-6 rounded-2xl flex items-center justify-between group-hover:translate-x-2 group-hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <i className="fab fa-hackerrank"></i>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                    HackerRank
                  </h4>
                  <p className="text-xs text-slate-400">
                    C, Python, Data Structures & Relational SQL queries.
                  </p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>

          {/* HackerEarth */}
          <a
            href="https://www.hackerearth.com/@jothimani782006/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberTone(840, 'sine', 0.08, 0.03)}
            className="block card-3d-wrap group"
          >
            <div className="card-3d-content glass-panel p-6 rounded-2xl flex items-center justify-between group-hover:translate-x-2 group-hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-2xl text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    HackerEarth
                  </h4>
                  <p className="text-xs text-slate-400">
                    Contest programming & algorithmic optimization challenges.
                  </p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
