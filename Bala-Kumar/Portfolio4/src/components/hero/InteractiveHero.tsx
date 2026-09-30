import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Magnetic } from '@/components/ui/Animations';
import { Typewriter } from '@/components/ui/Typewriter';
import { Button } from '@/components/ui/Button';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { SOCIAL } from '@/data/social';
import { PAGE_ARTWORK } from '@/data/artwork';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * PAGE 1 - HOME (single screen hero layout)
 * 1. Short intro: "Hi, I'm Rahul R", role/title, 3-4 line bio.
 * 2. Buttons: "View Portfolio" and "Resume".
 * 3. Social icon buttons: GitHub, LinkedIn, Email.
 * 4. Photo/visual on the right side.
 */
export const InteractiveHero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0): MotionProps =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: 'easeOut' },
        };

  return (
    <section className="relative flex h-[100svh] min-h-[100vh] flex-col justify-center pt-20 pb-10 px-5 sm:px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-[100rem] my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Intro text, Title, Bio, Buttons & Socials */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          <motion.div {...reveal(0.05)} className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-color)] font-bold">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
            Hi, I'm Rahul R
          </motion.div>

          <motion.h1
            {...reveal(0.12)}
            className="font-display font-extrabold text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.05em] leading-[0.95] text-[var(--text-primary)]"
          >
            AI <span className="font-serif-accent text-gold-gradient font-medium text-[clamp(2.5rem,7vw,6.5rem)]">×</span> DATA <span className="font-serif-accent text-gold-gradient font-medium text-[clamp(2.5rem,7vw,6.5rem)]">×</span> CODE
          </motion.h1>

          <motion.p {...reveal(0.2)} className="font-mono text-sm sm:text-base text-[var(--accent-color)] font-bold">
            B.Tech Artificial Intelligence &amp; Data Science
          </motion.p>

          <motion.p {...reveal(0.27)} className="max-w-xl text-sm sm:text-lg leading-relaxed text-[var(--text-muted)]">
            I like taking messy problems, turning them into systems, and seeing whether they work —
            across artificial intelligence, data analytics, computer vision and interactive software interfaces.
          </motion.p>

          <motion.div {...reveal(0.33)} className="font-mono text-xs sm:text-sm text-[var(--text-primary)]">
            <Typewriter phrases={['artificial intelligence', 'data analytics', 'computer vision', 'interactive software']} />
          </motion.div>

          {/* Action Buttons */}
          <motion.div {...reveal(0.38)} className="flex flex-wrap items-center gap-4 pt-2">
            <Magnetic>
              <Button to="/portfolio" size="lg" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                View Portfolio
              </Button>
            </Magnetic>
            <Magnetic>
              <Button to="/resume" size="lg" variant="outline" icon={<FileText className="w-4 h-4" />}>
                Resume / CV
              </Button>
            </Magnetic>
          </motion.div>

          {/* Social Icon Buttons */}
          <motion.div {...reveal(0.45)} className="flex items-center gap-4 pt-3 border-t border-[var(--border-color)]/60 max-w-md">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Connect:</span>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <NavLink
              to="/contact"
              aria-label="Email Contact"
              className="p-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </NavLink>
          </motion.div>
        </div>

        {/* Right Column: Visual Photo Frame / Stage */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            {...reveal(0.3)}
            className="relative w-full max-w-md aspect-square studio-panel rounded-2xl border border-[var(--border-color)] p-4 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            <img
              src={PAGE_ARTWORK.about}
              alt="Rahul R Profile & Visual Stage"
              className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs flex justify-between items-center">
              <div>
                <span className="text-[var(--text-primary)] font-bold block">RAHUL R</span>
                <span className="text-[var(--text-muted)] text-[10px]">Coimbatore, Tamil Nadu, IN</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Open for Hire
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
