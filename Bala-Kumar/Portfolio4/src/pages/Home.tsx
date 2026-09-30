import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Briefcase, Mail } from 'lucide-react';
import { PageTransition } from '@/components/ui/PageTransition';
import { InteractiveHero } from '@/components/hero/InteractiveHero';
import { CinematicStage } from '@/components/three/CinematicStage';
import { ProjectPreview } from '@/components/home/ProjectPreview';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { SplitText } from '@/components/premium/SplitText';
import { PROJECTS } from '@/data/projects';
import { PROJECT_ARTWORK } from '@/data/artwork';

/**
 * Home — Standalone initial landing page.
 * Viewport 1: HeroLanding (Name, Tagline, Intro, View Portfolio CTA, Resume/CV CTA, 3D Stage)
 * Viewport 2+: The Idea statement, Featured Work preview with link to full Portfolio,
 * and clear CTAs to Portfolio, Hire Me, and Contact destinations.
 */
export const Home: React.FC = () => {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const [preview, setPreview] = useState<{ src: string; label: string } | null>(null);

  return (
    <PageTransition>
      <CinematicStage />
      
      {/* 1. STANDALONE FIRST LANDING VIEWPORT (Hero Landing) */}
      <InteractiveHero />

      <div className="relative">
        {/* ————— 01 / THE IDEA — statement over the void ————— */}
        <section id="chapter-idea" className="mx-auto max-w-[100rem] px-5 sm:px-8 py-20 sm:py-32 scroll-mt-20">
          <SectionMarker n="01" label="The idea" />
          <p className="mt-8 max-w-5xl font-display text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.16] tracking-[-0.02em] text-[var(--text-primary)]">
            <SplitText text="Every system is a" stagger={0.05} />{' '}
            <SplitText
              text="signal path"
              stagger={0.06}
              delay={0.3}
              gradient
              gradientClass="linear-gradient(105deg, #F5E7C1 0%, #D9BC7A 45%, #9A7A35 100%)"
            />{' '}
            <SplitText
              text="— sensor to model, model to decision. I build the parts in between."
              stagger={0.02}
              delay={0.6}
            />
          </p>
        </section>

        {/* ————— 02 / FEATURED WORK PREVIEW ————— */}
        <section id="portfolio-preview" className="mx-auto max-w-[100rem] px-5 sm:px-8 py-16 sm:py-28 scroll-mt-20">
          <SectionMarker n="02" label="Selected work preview" />
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-[var(--text-primary)]">
                Work
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Selected engineering projects across AI, Computer Vision, and Data Systems.
              </p>
            </div>
            <NavLink
              to="/portfolio"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-color)] hover:underline"
            >
              Explore Full Portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavLink>
          </div>

          <ProjectPreview preview={preview} />

          <ul
            className="mt-8 border-t border-white/10"
            onMouseLeave={() => setPreview(null)}
          >
            {featuredProjects.map((project, i) => (
              <li key={project.id} className="border-b border-white/10">
                <NavLink
                  to={`/projects/${project.slug}`}
                  className="group relative flex items-baseline gap-4 sm:gap-8 py-6 sm:py-8"
                  onMouseEnter={() =>
                    setPreview({
                      src: PROJECT_ARTWORK[project.slug] ?? '',
                      label: project.categories[0] ?? 'Project',
                    })
                  }
                >
                  <span className="w-8 shrink-0 font-mono text-[11px] tabular-nums text-[var(--accent-color)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-[clamp(1.4rem,3.5vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent-color)]">
                    {project.title}
                  </span>
                  <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {project.categories.slice(0, 2).join(' · ')}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 self-center text-[var(--text-muted)] transition-all duration-300 group-hover:rotate-45 group-hover:text-[var(--accent-color)]" />
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        {/* ————— 03 / DESTINATION QUICK HUB ————— */}
        <section className="mx-auto max-w-[100rem] px-5 sm:px-8 py-16 sm:py-28 border-t border-white/10">
          <SectionMarker n="03" label="Explore destinations" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <NavLink
              to="/portfolio"
              className="group studio-panel p-8 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-widest block">01 / PORTFOLIO</span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors mt-2">
                  Full Portfolio &amp; Stack
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2">
                  Explore identity, 3D project gallery, technical capabilities, work chronology, education, and published research.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-color)] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </NavLink>

            <NavLink
              to="/hire-me"
              className="group studio-panel p-8 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> 02 / HIRE RAHUL
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors mt-2">
                  Hiring &amp; Opportunity Handoff
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2">
                  Candidate snapshot, core competencies, availability, degree metrics, and direct hiring handoff action.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-color)] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Hire Rahul</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </NavLink>

            <NavLink
              to="/contact"
              className="group studio-panel p-8 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[var(--accent-color)] uppercase tracking-widest block flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> 03 / CONTACT
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors mt-2">
                  Direct Contact &amp; Enquiry
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2">
                  Location base, email link, professional networks (GitHub, LinkedIn), and interactive enquiry form.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-color)] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </NavLink>
          </div>
        </section>

        {/* ————— 04 / CONTACT CTA — the arrival ————— */}
        <section id="contact-arrival" className="mx-auto max-w-[100rem] px-5 sm:px-8 pt-10 pb-20 sm:pb-32 text-center border-t border-white/10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Have an interesting problem?
          </p>
          <NavLink to="/contact" className="group mt-6 block focus:outline-none">
            <span className="font-serif-accent text-[clamp(2.5rem,8vw,7.5rem)] leading-[1.02] tracking-[-0.02em] text-[var(--text-primary)] transition-colors duration-500 group-hover:text-[var(--accent-color)]">
              Let's build <span className="text-gold-gradient">together</span>.
            </span>
          </NavLink>
        </section>
      </div>
    </PageTransition>
  );
};
