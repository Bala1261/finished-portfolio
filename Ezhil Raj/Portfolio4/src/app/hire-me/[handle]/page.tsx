"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { config } from "@/data/config";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import SmoothScroll from "@/components/smooth-scroll";
import AnimatedBackground from "@/components/animated-background";

export default function PlatformHandoffPage() {
  const params = useParams();
  const handle = (params?.handle as string) || config.handle;

  return (
    <SmoothScroll>
      <main className="bg-transparent min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 pt-24 pb-16">
        <div
          className="top-0 z-0 fixed w-full pointer-events-none"
          style={{ height: "100svh" }}
        >
          <AnimatedBackground />
        </div>

        <div className="max-w-xl w-full mx-auto relative z-10 text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-thin text-white">
            Hire Platform Handoff
          </h1>

          <p className="text-sm text-zinc-300 leading-relaxed">
            You are connecting with <strong className="text-white">@{handle}</strong> ({config.author}).
            For direct inquiries, contracts, and proposals, reach out directly via email or our contact portal.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`mailto:${config.email}?subject=Hiring%20Offer%20for%20${encodeURIComponent(config.author)}`}
              className="w-full sm:w-auto"
            >
              <Button className="w-full h-11 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Send Direct Inquiry</span>
              </Button>
            </a>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full h-11 border-white/10 text-zinc-300 hover:text-white flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
