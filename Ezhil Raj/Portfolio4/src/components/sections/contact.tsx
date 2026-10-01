"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
import { Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-12 md:pt-20 pb-8 md:pb-12 relative z-10 flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
        {/* Left Column: Heading and Subtitle */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <Link href={"#contact"} className="block">
            <h2
              className={cn(
                "bg-clip-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display",
                "bg-gradient-to-b from-white/95 to-white/60 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]",
                "leading-tight tracking-tight"
              )}
            >
              LET&apos;S WORK <br />
              TOGETHER
            </h2>
          </Link>

          <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-md drop-shadow-md">
            Have an exciting project, full-time opportunity, or just want to chat? Reach out directly.
          </p>

          {config.openToHire && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire / Opportunities</span>
            </div>
          )}

          <div className="pt-2 text-sm text-zinc-400">
            <span>Direct Email: </span>
            <a
              href={`mailto:${config.email}`}
              className="text-purple-400 hover:text-purple-300 underline font-medium transition-colors"
            >
              {config.email}
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 w-full">
          <Card className="w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <CardHeader className="p-6 sm:p-8 pb-4">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <Send className="w-6 h-6 text-purple-400" /> Send a Message
              </CardTitle>
              <CardDescription className="text-zinc-300 text-xs sm:text-sm">
                Fill in your details below and I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-0">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
