import React, { useState } from 'react';
import { Briefcase, BarChart3, Users, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    { key: 'All', label: 'All Competencies', icon: null },
    { key: 'Business', label: 'Business Strategy', icon: Briefcase },
    { key: 'Analytics', label: 'Data & Analytics', icon: BarChart3 },
    { key: 'Professional', label: 'Executive Leadership', icon: Users },
    { key: 'Tools', label: 'Enterprise Tools', icon: Wrench },
  ];

  // Helper for mouse position spotlight
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getFilteredSkills = () => {
    if (activeTab === 'All') {
      return Object.entries(skills).flatMap(([cat, list]) =>
        list.map((item) => ({ ...item, category: cat }))
      );
    }
    return (skills[activeTab] || []).map((item) => ({ ...item, category: activeTab }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-14 md:py-18 bg-white relative border-b border-[rgba(16,24,40,0.06)]">
      <div className="max-w-content mx-auto px-6 sm:px-10 md:px-16">
        
        <SectionHeading
          badge="CORE CAPABILITIES"
          title="Skills & Strategic Toolkit"
          subtitle="Delivering commercial value at the intersection of business acumen, quantitative data intelligence, and executive communication."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6 pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#145BFF] text-white border-[#145BFF] shadow-xs'
                    : 'bg-[#F7F9FC] text-[#667085] border-[rgba(16,24,40,0.08)] hover:text-[#101828] hover:bg-white hover:border-[#145BFF]/30'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid with Spotlight Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              className="relative p-6 rounded-2xl bg-[#F7F9FC] border border-[rgba(16,24,40,0.08)] transition-all duration-300 hover:border-[#145BFF]/40 hover:bg-white group overflow-hidden shadow-xs hover:shadow-card"
              style={{
                backgroundImage:
                  'radial-gradient(350px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(20, 91, 255, 0.08), transparent 80%)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#145BFF] bg-[#EAF1FF] px-2.5 py-0.5 rounded-full">
                  {skill.category}
                </span>
                <span className="text-xs font-semibold text-[#475467] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {skill.level}
                </span>
              </div>

              <h4 className="font-heading font-bold text-lg text-[#101828] group-hover:text-[#145BFF] transition-colors duration-200 mt-1">
                {skill.name}
              </h4>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mt-2">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
