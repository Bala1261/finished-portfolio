"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import ContactSection from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className={cn("bg-transparent min-h-screen flex flex-col justify-center relative pt-20 pb-16")}>
        <div
          className="top-0 z-0 fixed w-full pointer-events-none"
          style={{ height: '100svh' }}
        >
          <AnimatedBackground />
        </div>
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
