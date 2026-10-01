"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Binary, BrainCircuit, Code2, Cpu, GraduationCap, Repeat, Rocket, ShieldCheck, User, Zap } from "lucide-react";

import LogoLoop from "../ui/logo-loop";

const focusItems = [
    { icon: <Code2 className="w-4 h-4" />, label: "Full Stack" },
    { icon: <BrainCircuit className="w-4 h-4" />, label: "AI/ML" },
    { icon: <Binary className="w-4 h-4" />, label: "DSA" },
    { icon: <Repeat className="w-4 h-4" />, label: "CI/CD" },
    { icon: <ShieldCheck className="w-4 h-4" />, label: "Blockchain" },
    { icon: <Cpu className="w-4 h-4" />, label: "System Design" },
];

const AboutCard = ({ className, children, title, icon }: { className?: string, children: React.ReactNode, title: string, icon?: React.ReactNode }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={cn(
            "bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col gap-4 transition-all duration-300",
            className
        )}
    >
        <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        </div>
        {children}
    </motion.div>
);

const FocusItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="bg-white/10 p-3 rounded-2xl flex items-center gap-3 border border-white/5 hover:bg-white/20 transition-all cursor-default">
        <div className="text-purple-400">{icon}</div>
        <span className="text-sm font-bold text-slate-200">{label}</span>
    </div>
);

const AboutSection = () => {
    return (
        <section id="about" style={{ minHeight: '100svh' }} className="relative w-full pt-4 pb-16 sm:pt-8 sm:pb-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden pointer-events-none">
            {/* Background Decorative Elements - Desktop only */}
            <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 sm:mb-10 md:mb-16"
                >
                    <Link href={"#about"}>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-300 inline-block font-display">
                            About Me
                        </h2>
                    </Link>
                    <div className="h-1 w-16 sm:w-20 bg-purple-500 mx-auto mt-3 sm:mt-4 rounded-full" />
                </motion.div>

                {/* Mobile View: Simple Card */}
                <div className="lg:hidden">
                    <div className="bg-black/60 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl space-y-6 sm:space-y-8">
                        <div className="space-y-3 sm:space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-purple-400" /> Bio
                            </h3>
                            <p>
                                I am an aspiring <span className="text-white font-bold">Software Developer</span> and lifelong learner committed to building scalable, user-centric applications. I specialize in the intersection of <span className="text-white font-bold">AI/ML innovation</span> and modern software engineering.
                            </p>
                        </div>

                        {/* Mobile Focus Section */}
                        <div className="space-y-3 sm:space-y-4 text-slate-300 leading-relaxed pt-4 border-t border-white/10">
                            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" /> Focus
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                                {focusItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 sm:p-2.5 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-purple-400 shrink-0">{item.icon}</div>
                                        <span className="text-[11px] sm:text-xs font-semibold truncate">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4 text-slate-300 leading-relaxed pt-4 border-t border-white/10">
                            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-blue-400" /> Education
                            </h3>
                            <div>
                                <p className="text-white font-bold text-sm sm:text-base">Kongu Engineering College</p>
                                <p className="text-xs sm:text-sm text-slate-400">B.E. Computer Engineering & Design</p>
                                <p className="text-xs text-purple-400 font-bold mt-1">CGPA: 9.02/10.0</p>
                                <p className="text-[11px] sm:text-xs text-slate-500 italic">Aug 2024 — Present</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop View: Bento Grid */}
                <div className="hidden lg:grid grid-cols-12 gap-6">
                    {/* Main Bio Card */}
                    <AboutCard
                        className="col-span-8"
                        icon={<User className="w-6 h-6 text-purple-400" />}
                        title="Who I Am"
                    >
                        <div className="space-y-4 text-lg text-slate-300 leading-relaxed pt-2">
                            <p>
                                I am an aspiring <span className="text-white font-bold">Software Developer</span> and a lifelong learner deeply committed to the art of building scalable, user-centric web applications. My passion lies at the intersection of <span className="text-white font-bold">AI/ML innovation</span> and modern software engineering.
                            </p>
                            <p>
                                I take pride in writing clean, maintainable code that prioritizes both developer experience and end-user delight. Whether it&apos;s architecting distributed systems or fine-tuning deep learning models, I approach every challenge with meticulous detail and a drive for excellence.
                            </p>
                        </div>
                    </AboutCard>

                    {/* Focus Card */}
                    <AboutCard
                        className="col-span-4"
                        icon={<Zap className="w-6 h-6 text-yellow-400" />}
                        title="Focus"
                    >
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            {focusItems.map((item, index) => (
                                <FocusItem key={index} icon={item.icon} label={item.label} />
                            ))}
                        </div>
                    </AboutCard>

                    {/* Education Card */}
                    <AboutCard
                        className="col-span-8"
                        icon={<GraduationCap className="w-6 h-6 text-blue-400" />}
                        title="Education"
                    >
                        <div className="flex justify-between items-start pt-2">
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-white leading-tight">Kongu Engineering College</h4>
                                <p className="text-slate-400">Bachelor of Engineering in Computer Engineering & Design</p>
                                <p className="text-sm text-slate-500">Erode, Tamil Nadu, India</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30 inline-block">
                                    <span className="text-purple-400 font-bold whitespace-nowrap">CGPA: 9.02/10.0</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 italic">Aug 2024 — Present</p>
                            </div>
                        </div>
                    </AboutCard>

                    {/* Quote/Vision Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center group"
                    >
                        <Rocket className="w-12 h-12 text-white mb-4 group-hover:animate-bounce transition-all" />
                        <h3 className="text-xl font-bold text-white mb-2">My Mission</h3>
                        <p className="text-slate-400 italic font-medium">&quot;Building software that doesn&apos;t just work, but makes an impact.&quot;</p>
                    </motion.div>

                    {/* Tech Philosophy Card */}
                    <AboutCard
                        className="col-span-12"
                        title="Approach & Philosophy"
                    >
                        <div className="grid grid-cols-3 gap-8 pt-2">
                            <div className="space-y-2">
                                <h4 className="text-white font-bold flex items-center gap-2 leading-none">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full" /> Scalability
                                </h4>
                                <p className="text-sm text-slate-400 leading-snug">Designing systems that grow with user needs without compromising performance.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-bold flex items-center gap-2 leading-none">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Clean Code
                                </h4>
                                <p className="text-sm text-slate-400 leading-snug">Writing maintainable, predictable, and elegant code for long-term project health.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-bold flex items-center gap-2 leading-none">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" /> Innovation
                                </h4>
                                <p className="text-sm text-slate-400 leading-snug">Continuously pushing boundaries with AI integration and modern architectural patterns.</p>
                            </div>
                        </div>
                    </AboutCard>
                </div>

                {/* Skills Infinite Logo Loop below Approach & Philosophy */}
                <div className="mt-8 md:mt-12">
                    <LogoLoop />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
