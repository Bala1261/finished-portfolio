"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useScroll, motion, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const SkillsSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLElement>(null);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const handleInteraction = () => setTapped(true);
    // Only mark as tapped on actual keyboard-press (key tap), not generic touch/click
    // which would fire when user merely scrolls into the section.
    window.addEventListener("keyboard-press", handleInteraction);
    return () => {
      window.removeEventListener("keyboard-press", handleInteraction);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start 20%", "end end"] : ["start 45%", "end end"],
  });

  // On desktop: appears smoothly around start 45%. On mobile: appears much later around start 20%
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.1, 0.88, 1] : [0, 0.05, 0.88, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0.88, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      id="skills"
      style={{
        position: "relative",
        width: "100%",
        height: "250vh",
        minHeight: "250vh",
        pointerEvents: "none",
      }}
    >
      {/* Fixed Sticky Header - Centered on mobile, Right-aligned on desktop */}
      <motion.div
        style={{ opacity, y }}
        className="fixed top-8 sm:top-12 md:top-14 inset-x-0 mx-auto w-full flex justify-center md:justify-end md:pr-16 lg:pr-24 xl:pr-32 z-30 pointer-events-none"
      >
        <Link href={"#skills"} className="pointer-events-auto">
          <h2
            className={cn(
              "bg-clip-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center md:text-right text-transparent font-display font-extrabold tracking-tight",
              "bg-gradient-to-b from-white via-white/95 to-slate-200 drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
            )}
          >
            SKILLS
          </h2>
        </Link>
      </motion.div>

      {/* Guaranteed Fixed Sticky Mobile Hint that unmounts immediately when tapped */}
      {!tapped && (
        <motion.div
          style={{ opacity }}
          className="md:hidden fixed bottom-8 inset-x-0 mx-auto w-fit z-30 pointer-events-auto"
        >
          <p className="font-mono text-xs tracking-[0.25em] text-white/90 uppercase bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.25)] animate-pulse">
            Tap keys to reveal skills
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default SkillsSection;
