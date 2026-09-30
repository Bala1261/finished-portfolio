import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { PageTransition } from '@/components/ui/PageTransition';
import { PageMasthead } from '@/components/ui/PageMasthead';
import { FlipIn } from '@/components/three/Scroll3D';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { MetricCard } from '@/components/ui/MetricCard';
import { RESUME_DATA } from '@/data/resume';
import { PROJECTS } from '@/data/projects';
import { PAGE_ARTWORK } from '@/data/artwork';
import { WarpDivider } from '@/components/three/WarpDivider';
import { DragCube3D } from '@/components/three/DragCube3D';
import { Coverflow3D } from '@/components/three/Coverflow3D';
import { PacketOrbit3D } from '@/components/three/PacketOrbit3D';
import { ProjectFilters, CATEGORIES, type CategoryFilter } from '@/components/projects/ProjectFilters';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ExperienceTimeline } from '@/components/timeline/ExperienceTimeline';
import { CountUp } from '@/components/ui/CountUp';
import { SignalBus } from '@/components/transmission/SignalBus';
import {
  GraduationCap,
  Terminal,
  MapPin,
  Heart,
  BookOpen,
  Camera,
  Code2,
  CheckCircle2,
  ArrowUpRight,
  Briefcase,
  FileCheck
} from 'lucide-react';

const JOURNEY = [
  { year: '2022', title: 'Started B.Tech', detail: 'Joined V.S.B College of Engineering, Coimbatore. First time living away from home. Discovered computer vision in second semester.', tone: 'origin' },
  { year: '2023', title: 'First Internship', detail: 'TATA Data Visualization Trainee program. Learned that clean data beats clever models. Built my first dashboard that someone actually used.', tone: 'growth' },
  { year: '2024', title: 'Three Internships', detail: 'Accenture (data analytics), Vault of Code (web dev), plus the road condition patent published. Realized I like the messy middle between research and product.', tone: 'acceleration' },
  { year: '2025', title: 'Capstone & Portfolio', detail: 'Road condition analyzer as final year project. Started this portfolio. Learned that shipping teaches more than perfecting.', tone: 'synthesis' },
  { year: '2026', title: 'Graduation', detail: 'CGPA 8.3. Looking for roles where I can keep building at the intersection of AI, data, and interfaces. Still learning daily.', tone: 'current' },
];

const VALUES = [
  { icon: MapPin, label: 'Context First', description: 'Every problem lives in a specific context — user, environment, constraints. Ignore context, build the wrong thing.' },
  { icon: Heart, label: 'Useful Over Clever', description: 'A simple solution that ships beats a brilliant one that doesn\'t. Complexity is a cost, not a feature.' },
  { icon: BookOpen, label: 'Learn in Public', description: 'Writing, coding, and sharing imperfect work accelerates learning. This portfolio is that practice.' },
  { icon: Camera, label: 'Craft the Details', description: 'Micro-interactions, copy, loading states, error messages — they\'re not polish, they\'re the product.' },
];

/**
 * Portfolio Page — Restructured strictly according to the BEXO Premium Portfolio Standard:
 * Section Order:
 * 1. About / Identity block
 * 2. Skills
 * 3. Experience
 * 4. Education
 * 5. Selected Work
 * 6. Certificates
 * 7. Achievements
 * 8. Research
 */
export const Portfolio: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<CategoryFilter>('ALL');

  // Compute count of projects per filter category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: PROJECTS.length
    };

    CATEGORIES.forEach((cat) => {
      if (cat === 'ALL') return;
      counts[cat] = PROJECTS.filter((p) => {
        if (cat === 'AI') return p.categories.includes('AI');
        if (cat === 'COMPUTER VISION') return p.categories.includes('Computer Vision');
        if (cat === 'DATA') return p.categories.includes('Data');
        if (cat === 'WEB') return p.categories.includes('Web');
        if (cat === 'EXPERIMENTS') return p.categories.includes('Experiments');
        return false;
      }).length;
    });

    return counts;
  }, []);

  // Filter projects list
  const filteredProjects = useMemo(() => {
    if (currentFilter === 'ALL') return PROJECTS;
    return PROJECTS.filter((p) => {
      if (currentFilter === 'AI') return p.categories.includes('AI');
      if (currentFilter === 'COMPUTER VISION') return p.categories.includes('Computer Vision');
      if (currentFilter === 'DATA') return p.categories.includes('Data');
      if (currentFilter === 'WEB') return p.categories.includes('Web');
      if (currentFilter === 'EXPERIMENTS') return p.categories.includes('Experiments');
      return true;
    });
  }, [currentFilter]);

  const roadConditionProject = PROJECTS[0];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20 sm:space-y-32">
        {/* Masthead */}
        <PageMasthead
          number="01"
          eyebrow="Structured Profile"
          title="PORTFOLIO"
          description="Complete portfolio overview: identity, skills, experience, education, projects, certifications, achievements, and research."
          artwork={PAGE_ARTWORK.about}
          artworkLabel="BEXO Standard Profile Structure"
        />

        <WarpDivider stars={90} />

        {/* ————— 1. ABOUT / IDENTITY BLOCK ————— */}
        <section id="about" className="space-y-12 scroll-mt-24">
          <SectionMarker n="01" label="About / Identity" />
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 border-b border-[var(--border-color)] pb-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Hire &amp; Opportunities
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
                RAHUL R
              </h1>
              <p className="font-mono text-base text-[var(--accent-color)] font-bold">
                B.Tech Artificial Intelligence &amp; Data Science
              </p>
              <p className="text-base text-[var(--text-muted)] leading-relaxed">
                A practical interest in combining data, AI, software and visual interfaces — grounded in the supplied resume, shaped by daily practice. Building useful things with code.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto font-mono text-xs">
              <div className="studio-panel p-4 rounded-lg">
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Location</div>
                <div className="font-bold text-[var(--text-primary)] mt-1">Coimbatore, India</div>
              </div>
              <div className="studio-panel p-4 rounded-lg">
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Period</div>
                <div className="font-bold text-[var(--text-primary)] mt-1">2022–2026</div>
              </div>
              <div className="studio-panel p-4 rounded-lg">
                <div className="text-[var(--text-muted)] text-[10px] uppercase">Degree</div>
                <div className="font-bold text-[var(--text-primary)] mt-1">B.Tech AI &amp; DS</div>
              </div>
              <div className="studio-panel p-4 rounded-lg">
                <div className="text-[var(--text-muted)] text-[10px] uppercase">CGPA</div>
                <div className="font-bold text-[var(--accent-color)] mt-1">8.3 / 10</div>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div>
            <div className="eyebrow-rule mb-8">Career &amp; Learning Journey</div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--border-color)]" />
              {JOURNEY.map((item, i) => (
                <FlipIn key={item.year} delay={100 + i * 50} className="relative pl-20 pb-8 last:pb-0">
                  <div className="absolute left-8 top-1 w-3 h-3 rounded-full border-2 border-[var(--accent-color)] bg-[var(--bg-primary)]" />
                  <div className="studio-panel p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-[var(--accent-color)] font-bold">{item.year}</span>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-[var(--accent-color)]/20 text-[var(--accent-color)]">{item.tone}</span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
                  </div>
                </FlipIn>
              ))}
            </div>
          </div>

          {/* Operating Principles */}
          <div>
            <div className="eyebrow-rule mb-8">Operating Principles</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v) => (
                <div key={v.label} className="studio-panel p-6 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--accent-glow)] rounded-lg">
                      <v.icon className="h-5 w-5 text-[var(--accent-color)]" />
                    </div>
                    <h3 className="font-display text-base font-bold text-[var(--text-primary)]">{v.label}</h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ————— 2. SKILLS ————— */}
        <section id="skills" className="space-y-10 scroll-mt-24">
          <SectionMarker n="02" label="Skills" />
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Technical <span className="font-serif-accent text-gold-gradient">Stack</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 visual-stage relative grid place-items-center overflow-hidden rounded-xl border border-[var(--border-color)] p-8">
              <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
              <DragCube3D size={220} />
              <div className="absolute bottom-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                Drag to spin the stack
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="studio-panel p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-[var(--accent-color)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Languages</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RESUME_DATA.skills.programming.map((s) => (
                    <span key={s} className="px-3 py-1 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="studio-panel p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-[var(--accent-color)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Data &amp; Vision</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RESUME_DATA.skills.dataAndAi.map((s) => (
                    <span key={s} className="px-3 py-1 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="studio-panel p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-[var(--accent-color)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Tools &amp; Dev</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RESUME_DATA.skills.toolsAndDev.map((s) => (
                    <span key={s} className="px-3 py-1 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="studio-panel rounded-xl p-4 sm:p-6">
            <div className="eyebrow-rule mb-3">Skill Relays</div>
            <SignalBus height={110} lanes={3} />
          </div>
        </section>

        {/* ————— 3. EXPERIENCE ————— */}
        <section id="experience" className="space-y-10 scroll-mt-24">
          <SectionMarker n="03" label="Experience" />
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Work <span className="font-serif-accent text-gold-gradient">Chronology</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MetricCard label="Accenture Internship" value="~30%" sublabel="Reporting Effort Reduced via Automation" />
            <MetricCard label="Vault of Code Internship" value="20%" sublabel="UI Bug Resolution Efficiency Improvement" />
            <MetricCard label="TATA Training" value="2024" sublabel="Data processing and BI tools" />
          </div>
          <div className="studio-panel p-6 sm:p-8 rounded-xl space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-color)] font-bold uppercase tracking-widest">
              <Briefcase className="w-4 h-4" />
              <span>Roles &amp; Internships</span>
            </div>
            <ExperienceTimeline />
          </div>
        </section>

        {/* ————— 4. EDUCATION ————— */}
        <section id="education" className="space-y-8 scroll-mt-24">
          <SectionMarker n="04" label="Education" />
          <div className="studio-panel p-8 rounded-xl space-y-6 border border-[var(--border-color)]">
            <div className="flex items-center gap-3 text-[var(--accent-color)] font-mono text-xs font-bold uppercase tracking-widest">
              <GraduationCap className="w-5 h-5" />
              <span>Academic Credentials</span>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)]">
                  {RESUME_DATA.education.degree}
                </h3>
                <span className="px-3 py-1 bg-[var(--accent-glow)] text-[var(--accent-color)] border border-[var(--accent-color)]/30 text-xs font-mono font-bold rounded">
                  {RESUME_DATA.education.period}
                </span>
              </div>
              <p className="text-base text-[var(--text-muted)]">{RESUME_DATA.education.institution}</p>
              <div className="font-mono text-base text-[var(--accent-color)] font-bold pt-1">
                CGPA: {RESUME_DATA.education.cgpa}
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-primary)] font-mono uppercase">Relevant Coursework:</strong> Machine Learning, Computer Vision, Data Mining, Database Systems, Software Engineering, Signal Processing, Linear Algebra, Probability &amp; Statistics.
            </div>
          </div>
        </section>

        {/* ————— 5. SELECTED WORK ————— */}
        <section id="projects" className="space-y-12 scroll-mt-24">
          <SectionMarker n="05" label="Selected Work" />
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Project <span className="font-serif-accent text-gold-gradient">Gallery</span>
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Practical work across artificial intelligence, computer vision, data analytics, and interactive interfaces.
              </p>
            </div>
            <NavLink
              to="/projects"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
            >
              Full Gallery <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavLink>
          </div>

          {/* 3D Coverflow */}
          <section aria-label="Featured coverflow">
            <div className="eyebrow-rule mb-5">Interactive 3D Reel</div>
            <Coverflow3D projects={PROJECTS} />
          </section>

          {/* Orbit Hub */}
          <section aria-label="Work in orbit" className="studio-panel rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="eyebrow-rule">Signal hub / live</div>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Work in Orbit
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                  Every project is a satellite in the same system — capture, process, transmit. Drag to spin the fleet.
                </p>
              </div>
              <PacketOrbit3D />
            </div>
          </section>

          {/* Filterable Project Grid */}
          <section aria-label="Project collection">
            <div className="eyebrow-rule mb-5">Filter Collection</div>
            <ProjectFilters currentFilter={currentFilter} onFilterChange={setCurrentFilter} counts={categoryCounts} />
            <ProjectGrid projects={filteredProjects} />
          </section>
        </section>

        {/* ————— 6. CERTIFICATES ————— */}
        <section id="certificates" className="space-y-8 scroll-mt-24">
          <SectionMarker n="06" label="Certificates" />
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Certifications &amp; <span className="font-serif-accent text-gold-gradient">Credentials</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {RESUME_DATA.certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-5 studio-panel rounded-xl flex items-center justify-between border border-[var(--border-color)] hover:border-[var(--accent-color)]/50 transition-colors"
              >
                <div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{cert.title}</div>
                  <div className="text-[var(--text-muted)] text-[10px] uppercase mt-1">Issued by {cert.issuer}</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-color)] shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* ————— 7. ACHIEVEMENTS ————— */}
        <section id="achievements" className="space-y-8 scroll-mt-24">
          <SectionMarker n="07" label="Achievements" />
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Proof of <span className="font-serif-accent text-gold-gradient">Work</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[var(--border-color)]">
            {[
              { end: 3, label: 'Featured Projects' },
              { end: 6, label: 'Lab Experiments' },
              { end: 4, label: 'Certifications' },
              { end: 8.3, label: 'CGPA / 10', decimals: 1 },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl sm:text-6xl font-extrabold leading-none text-[var(--text-primary)]">
                  <CountUp end={stat.end} decimals={stat.decimals ?? 0} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="studio-panel p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent-color)] font-mono text-xs font-bold">
                <FileCheck className="w-4 h-4" />
                <span>ACCENTURE IMPACT</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">30% Manual Reporting Effort Reduction</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Automated dashboard templates and streamlined reporting workflows during enterprise data analytics internship.
              </p>
            </div>
            <div className="studio-panel p-6 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent-color)] font-mono text-xs font-bold">
                <Code2 className="w-4 h-4" />
                <span>VAULT OF CODE IMPACT</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">20% UI Bug Resolution Improvement</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Identified layout breaks and bottlenecks across responsive web pages in Git-based feature branching workflows.
              </p>
            </div>
          </div>
        </section>

        {/* ————— 8. RESEARCH ————— */}
        <section id="research" className="space-y-8 scroll-mt-24">
          <SectionMarker n="08" label="Research" />
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Applied Research &amp; <span className="font-serif-accent text-gold-gradient">Patent</span>
          </h2>

          {roadConditionProject && (
            <div className="studio-panel p-8 rounded-xl space-y-6 border border-[var(--border-color)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
                <div>
                  <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs uppercase font-bold border border-amber-500/30">
                    Patent Published
                  </span>
                  <h3 className="mt-3 text-2xl font-bold font-display text-[var(--text-primary)]">
                    {roadConditionProject.title}
                  </h3>
                </div>
                <NavLink
                  to={`/projects/${roadConditionProject.slug}`}
                  className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-color)] hover:underline"
                >
                  View Research Detail <ArrowUpRight className="w-4 h-4" />
                </NavLink>
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {roadConditionProject.shortDescription} Accepted and published by the Indian Patent Office. Integrates visual input, AI model processing, GPS spatial coordinates, and IoT telemetry into a single real-time road fault detection pipeline.
              </p>

              {roadConditionProject.architecture && roadConditionProject.architecture.nodes && (
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">Conceptual Signal Pipeline:</div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    {roadConditionProject.architecture.nodes.map((node, i) => (
                      <React.Fragment key={node}>
                        <span className="px-3 py-1.5 bg-[var(--bg-surface-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded">
                          {node}
                        </span>
                        {i < (roadConditionProject.architecture?.nodes.length ?? 0) - 1 && (
                          <span className="text-[var(--accent-color)]">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Footer Link / CTA */}
        <section className="text-center pt-10 border-t border-[var(--border-color)] space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Looking for hiring or direct contact?
          </p>
          <div className="flex justify-center gap-4">
            <NavLink
              to="/contact"
              className="px-6 py-3 bg-[var(--accent-color)] text-black font-mono text-xs font-bold uppercase rounded-lg hover:bg-[#D9BC7A] transition-colors"
            >
              Hire Rahul R
            </NavLink>
            <NavLink
              to="/contact"
              className="px-6 py-3 bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] font-mono text-xs font-bold uppercase rounded-lg hover:border-[var(--accent-color)] transition-colors"
            >
              Contact Me
            </NavLink>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
