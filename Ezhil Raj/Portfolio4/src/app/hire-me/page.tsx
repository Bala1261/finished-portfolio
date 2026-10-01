"use client";

import React from "react";
import Link from "next/link";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { config } from "@/data/config";
import { Briefcase, ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { BlurIn } from "@/components/reveal-animations";

export default function HireMePage() {
  const hirePlatformUrl = `/hire-me/${config.handle}`;

  return (
    <SmoothScroll>
      <main className={cn("bg-transparent min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 pt-24 pb-16")}>
        <div
          className="top-0 z-0 fixed w-full pointer-events-none"
          style={{ height: "100svh" }}
        >
          <AnimatedBackground />
        </div>

        <div className="max-w-2xl w-full mx-auto relative z-10 text-center space-y-8">
          <BlurIn delay={0.2}>
            {config.openToHire && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Opportunities</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-thin text-white tracking-tight leading-tight">
              Hire <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400">{config.author}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
              {config.headline} specializing in building scalable web and software applications. Ready for freelance, contract, or full-time roles.
            </p>
          </BlurIn>

          <BlurIn delay={0.4}>
            <div className="p-8 sm:p-10 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6 text-left">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2.5">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  <span>Platform Handoff</span>
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Continue to the BEXO platform hiring portal to review engagement terms, project scope, and submit an offer directly.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2 pb-2">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI/ML Integration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>System Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fast Turnaround</span>
                </div>
              </div>

              {/* Single Dominant Handoff Action */}
              <div className="pt-2">
                <Link
                  href={hirePlatformUrl}
                  className="w-full block"
                >
                  <Button className="w-full h-12 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-lg shadow-white/10 group flex items-center justify-center gap-2 text-base">
                    <span>Continue to Hire Platform</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Fallback Direct Contact Link */}
              <div className="pt-2 text-center border-t border-white/10">
                <p className="text-xs text-zinc-400">
                  Prefer direct communication?{" "}
                  <Link
                    href="/contact"
                    className="text-purple-400 hover:text-purple-300 underline font-medium inline-flex items-center gap-1 ml-1"
                  >
                    <span>Use contact form</span>
                  </Link>{" "}
                  or{" "}
                  <a
                    href={`mailto:${config.email}?subject=Hiring%20Inquiry%20for%20${encodeURIComponent(config.author)}`}
                    className="text-purple-400 hover:text-purple-300 underline font-medium inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email directly</span>
                  </a>
                </p>
              </div>
            </div>
          </BlurIn>
        </div>
      </main>
    </SmoothScroll>
  );
}
