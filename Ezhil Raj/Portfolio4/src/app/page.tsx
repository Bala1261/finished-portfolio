"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";

function HomePage() {
  return (
    <SmoothScroll>
      <main className={cn("bg-transparent min-h-screen flex flex-col justify-center relative overflow-hidden")}>
        <div
          className="top-0 z-0 fixed w-full pointer-events-none"
          style={{ height: '100svh' }}
        >
          <AnimatedBackground />
        </div>
        <HeroSection />
      </main>
    </SmoothScroll>
  );
}

export default HomePage;

