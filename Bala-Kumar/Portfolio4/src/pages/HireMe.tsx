import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, ArrowUpRight, CheckCircle2, Terminal, Briefcase, MapPin } from 'lucide-react';
import { PageTransition } from '@/components/ui/PageTransition';
import { PageMasthead } from '@/components/ui/PageMasthead';
import { SOCIAL } from '@/data/social';
import { RESUME_DATA } from '@/data/resume';
import { PAGE_ARTWORK, SECTION_ARTWORK } from '@/data/artwork';
import { ArtifactPlate } from '@/components/transmission/ArtifactPlate';
import { PacketOrbit3D } from '@/components/three/PacketOrbit3D';

/**
 * Hire Me Page — Restructured according to BEXO Premium Portfolio Standard:
 * - One primary handoff action
 * - Open-to-work status indicator
 * - Fallback direct communication links
 */
export const HireMe: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 sm:space-y-24">
        <PageMasthead
          number="01"
          eyebrow="Hiring Handoff"
          title="HIRE RAHUL R"
          description="Available for full-time roles, internships, and engineering opportunities across AI, Data Science, and Software Interfaces."
          artwork={PAGE_ARTWORK.contact}
          artworkLabel="Handoff / Opportunity / Engagement"
        />

        {/* Handoff Status & Primary Action */}
        <section className="studio-panel rounded-2xl p-8 sm:p-12 border border-[var(--border-color)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities · Available for Hire
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Let's discuss <span className="font-serif-accent text-gold-gradient">hiring</span>.
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Seeking opportunities in AI engineering, data analytics, computer vision, and software development. Hand off to direct email or connect through the site contact system.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <NavLink
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--accent-color)] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#D9BC7A] shadow-[0_0_24px_var(--accent-glow)] transition-all duration-300"
              >
                <span>Hire Rahul R</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </NavLink>
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] font-mono text-xs font-bold uppercase tracking-wider hover:border-[var(--accent-color)] transition-colors"
              >
                Send Enquiry
              </NavLink>
            </div>
          </div>
        </section>

        <ArtifactPlate
          src={SECTION_ARTWORK.handshake}
          caption="SIG 18 · HIRING HANDOFF PROTOCOL"
          label="Single handoff point — connecting capability with team requirements"
        />

        {/* Candidate Handoff Profile Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="studio-panel p-8 rounded-xl space-y-6">
              <h3 className="font-mono text-xs text-[var(--accent-color)] font-bold uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>CANDIDATE SNAPSHOT</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Degree &amp; Branch</span>
                  <p className="font-display text-lg font-bold text-[var(--text-primary)] mt-1">{RESUME_DATA.education.degree}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Institution</span>
                  <p className="font-display text-lg font-bold text-[var(--text-primary)] mt-1">V.S.B. College of Engineering</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">CGPA</span>
                  <p className="font-mono text-lg font-bold text-[var(--accent-color)] mt-1">{RESUME_DATA.education.cgpa}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Location &amp; Mobility</span>
                  <p className="font-display text-lg font-bold text-[var(--text-primary)] mt-1">Coimbatore, IN (Open to Remote / Onsite)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Core Competencies</span>
                <div className="flex flex-wrap gap-2">
                  {['AI & Machine Learning', 'Computer Vision (OpenCV)', 'Data Analytics (Power BI/Pandas)', 'Python & Java', 'UI/UX & Web Interfaces', 'Git & API Integration'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="studio-panel p-8 rounded-xl space-y-4">
              <h3 className="font-mono text-xs text-[var(--accent-color)] font-bold uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>WHY HIRE RAHUL?</span>
              </h3>
              <ul className="space-y-3 text-sm text-[var(--text-muted)] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-2 shrink-0" />
                  <span><strong>Proven Problem-Solving:</strong> Published AI road safety patent with the Indian Patent Office.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-2 shrink-0" />
                  <span><strong>Internship Experience:</strong> Accenture (data analytics), Vault of Code (web dev), and TATA (BI training).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-2 shrink-0" />
                  <span><strong>High Efficiency Focus:</strong> Reduced manual reporting effort by 30% and improved UI bug resolution by 20%.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column / Fallbacks */}
          <div className="space-y-6">
            <div className="studio-panel p-6 rounded-xl space-y-4 font-mono text-xs">
              <div className="text-[var(--accent-color)] font-bold uppercase pb-3 border-b border-[var(--border-color)] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>DIRECT DIRECTORY</span>
              </div>
              <div className="space-y-4 pt-1">
                <div>
                  <span className="text-[var(--text-muted)] block uppercase mb-1">Email:</span>
                  <a href={`mailto:${SOCIAL.email}`} className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] underline underline-offset-4 transition-colors">
                    {SOCIAL.email}
                  </a>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block uppercase mb-1">Location Base:</span>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-bold">
                    <MapPin className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>{SOCIAL.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <PacketOrbit3D perRing={6} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
