"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import CertificationsSection from "@/components/sections/certifications";
import CodingJourneySection from "@/components/sections/coding-journey";
import { FallingSkills } from "@/components/falling-skills";

export default function PortfolioPage() {
  return (
    <>
      <FallingSkills />
      <SmoothScroll>
        <main className={cn("bg-transparent relative pt-16 sm:pt-20 pb-20")}>
          <div
            className="top-0 z-0 fixed w-full pointer-events-none"
            style={{ height: "100svh" }}
          >
            <AnimatedBackground />
          </div>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <CodingJourneySection />
        </main>
      </SmoothScroll>
    </>
  );
}
