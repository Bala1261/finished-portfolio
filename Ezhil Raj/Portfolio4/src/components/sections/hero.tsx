import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { File, FileText, FileDown, FileSymlink, ClipboardPaste, ClipboardList, Github, Linkedin, Cpu, Code, Braces, Terminal, Zap, ArrowRight, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import { useMediaQuery } from "@/hooks/use-media-query";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { config } from "@/data/config";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" style={{ minHeight: '100svh' }} className={cn("relative w-full md:h-[100dvh] pointer-events-none pb-8 md:pb-0 flex flex-col justify-center")}>
      <div className="grid md:grid-cols-12 h-full items-center px-4 sm:px-6 pointer-events-none">
        <div
          className={cn(
            "z-[2] col-span-12 md:col-span-5 pt-[45px] sm:pt-[55px] md:pt-0",
            "flex flex-col justify-center items-center md:items-start",
            "w-full md:pl-8 lg:pl-16 xl:pl-24",
            "pointer-events-none"
          )}
        >
          {!isLoading && (
            <div className="pointer-events-auto">
              <div className="w-full max-w-md md:max-w-none">
                <BlurIn delay={0.3}>
                  <p
                    className={cn(
                      "text-center md:text-left mt-2 sm:mt-4 font-thin text-base sm:text-lg md:text-xl",
                      "text-zinc-400",
                      "cursor-default font-display bg-clip-text"
                    )}
                  >
                    Hi, I am
                  </p>
                </BlurIn>
                <BlurIn delay={0.5}>
                  <h1
                    className={cn(
                      "font-thin text-white font-display",
                      "text-center md:text-left",
                      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
                      "cursor-default text-edge-outline leading-tight"
                    )}
                  >
                    <span className="md:hidden whitespace-nowrap">{config.author}</span>
                    <span className="hidden md:inline">
                      {config.author.split(" ")[0]}
                      <br />
                      {config.author.split(" ")[1]}
                    </span>
                  </h1>
                </BlurIn>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "text-center md:text-left mt-2.5 sm:mt-4 font-thin",
                      "text-sm sm:text-base md:text-lg lg:text-xl",
                      "text-zinc-400",
                      "cursor-default font-display bg-clip-text leading-relaxed",
                      "max-w-lg"
                    )}
                  >
                    Full Stack Developer | System Designer
                    <br />
                    AI/ML & Competitive Programming Enthusiast
                    <br />
                    Turning Ideas Into Impact
                  </p>
                </BlurIn>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col items-center md:items-start w-full">
                <div className="flex flex-col gap-3 w-fit">
                  <BoxReveal delay={0.9} width="100%">
                    <Link
                      href="/portfolio"
                      className="w-full block"
                    >
                      <Button className="flex items-center justify-center gap-2 w-full h-11 sm:h-12 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-lg shadow-white/10 group transition-all">
                        <Sparkles size={18} className="text-purple-600 transition-transform group-hover:rotate-12" />
                        <span>View Portfolio</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </BoxReveal>
                  <BlurIn delay={1.1}>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {config.resume && (
                        <Link
                          href={config.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant={"outline"}
                            className="w-full h-11 sm:h-12 flex items-center justify-center gap-1.5 px-4 bg-white/5 hover:bg-white/10 border-white/10 text-zinc-200"
                          >
                            <FileText size={18} />
                            <span>Resume</span>
                          </Button>
                        </Link>
                      )}
                      <Link href={"/hire-me"} className="flex-1">
                        <Button
                          variant={"outline"}
                          className="w-full h-11 sm:h-12 overflow-hidden px-4 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-purple-300 font-medium"
                        >
                          Hire Me
                        </Button>
                      </Link>
                      <Link
                        href={config.social.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                      >
                        <Button variant={"outline"} className="w-11 h-11 sm:w-12 sm:h-12 p-0 flex items-center justify-center border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10">
                          <SiWhatsapp size={20} />
                        </Button>
                      </Link>
                      <Link
                        href={config.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Button variant={"outline"} className="w-11 h-11 sm:w-12 sm:h-12 p-0 flex items-center justify-center">
                          <SiGithub size={22} />
                        </Button>
                      </Link>
                      <Link
                        href={config.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Button variant={"outline"} className="w-11 h-11 sm:w-12 sm:h-12 p-0 flex items-center justify-center">
                          <SiLinkedin size={22} />
                        </Button>
                      </Link>
                      <Link
                        href={config.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <Button variant={"outline"} className="w-11 h-11 sm:w-12 sm:h-12 p-0 flex items-center justify-center">
                          <FaInstagram size={22} />
                        </Button>
                      </Link>
                    </div>
                  </BlurIn>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-4 flex items-center justify-center z-[2] mt-6 sm:mt-8 md:mt-0 pointer-events-auto">
          <BlurIn delay={0.8}>
            <TechProfileImage />
          </BlurIn>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-8 left-[50%] translate-x-[-50%] pointer-events-auto">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

const TechProfileImage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setMousePos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 800);
  };

  const [isPeeking, setIsPeeking] = useState(false);

  // Indirect hint: Peek animation to suggest interaction
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsPeeking(true);
        setTimeout(() => setIsPeeking(false), 1500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Mask size - reduced to 50px as requested, but doubled for mobile
  // Added peek size for indirect hint
  const maskSize = isHovered ? (isMobile ? 75 : 50) : (isPeeking ? 25 : 0);

  return (
    <div
      ref={containerRef}
      className="relative group cursor-none no-cursor-invert touch-auto md:touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Tech Decorations - Orbiting Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Scrolling Binary Background */}
        <div className="absolute inset-x-0 top-0 bottom-0 opacity-10 overflow-hidden rounded-[60%_40%_30%_70%/60%_30%_70%_40%]">
          <motion.div
            animate={{ y: [0, -500] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="text-[10px] break-all leading-none text-sky-500 font-mono select-none"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="whitespace-nowrap">011010110010101011101010101101110010110101010101010110101110101101010</div>
            ))}
          </motion.div>
        </div>

        {/* Scanning Line HUD Effect */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-sky-400/40 blur-[1px] z-10"
        />
        {/* Rotating Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-sky-500/20 md:border-dashed animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border border-purple-500/10 animate-[spin_15s_linear_infinite_reverse]" />

        {/* Floating Tech Icons */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 -right-8 text-sky-400/60"
        >
          <Code size={32} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 -left-12 text-purple-400/60"
        >
          <Terminal size={28} />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 360], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-4 -right-4 text-emerald-400/50"
        >
          <Cpu size={24} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-10 -left-6 text-yellow-400/50"
        >
          <Zap size={20} />
        </motion.div>

        {/* Tech Words Orbiting */}
        {[
          { text: "0x7F2A_DE31", top: "10%", left: isMobile ? "80%" : "90%" },
          { text: "() => void", top: "90%", left: isMobile ? "70%" : "80%" },
          { text: "<Component />", top: "85%", left: isMobile ? "2%" : "-5%" },
          { text: "std::move()", top: "5%", left: isMobile ? "2%" : "-5%" },
        ].map((word, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              delay: 0.5 + idx * 0.2,
              duration: 2,
              y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ top: word.top, left: word.left }}
            className="absolute px-2 py-0.5 bg-black/80 backdrop-blur-md border-[1px] border-sky-500/30 rounded text-[10px] md:text-xs font-mono text-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.2)] whitespace-nowrap z-20"
          >
            <span className="text-emerald-400 opacity-70 mr-1">$</span>
            {word.text}
          </motion.div>
        ))}
      </div>

      <div className="relative w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] transition-all duration-300">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-blue-500/20 to-purple-600/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl scale-110" />

        {/* Base Image (me.png) - High Quality */}
        <div className="relative w-full h-full rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] touch-none">
          <Image
            src="/assets/me.png"
            alt="Alex Carter"
            fill
            className="object-cover"
            priority
            quality={100}
          />

          {/* Overlay Image (me1.png) revealed by mask */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
            animate={{
              clipPath: isHovered
                ? `circle(${maskSize}px at ${mousePos.x}px ${mousePos.y}px)`
                : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
              WebkitClipPath: isHovered
                ? `circle(${maskSize}px at ${mousePos.x}px ${mousePos.y}px)`
                : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
            }}
            transition={{ duration: 0 }}
          >
            <Image
              src="/assets/me1.png"
              alt="Alex Carter Active"
              fill
              className="object-cover"
              priority
              quality={100}
            />

            {/* Inner Hud Effect (Subtle glow in mask) */}
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
          </motion.div>

          {/* Click Sync Wave */}
          {isClicked && (
            <motion.div
              initial={{ scale: 0, opacity: 1, border: "2px solid #60a5fa" }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute rounded-full z-30 pointer-events-none"
              style={{ left: mousePos.x, top: mousePos.y, width: 2, height: 2 }}
            />
          )}

          {/* Static Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]" />
        </div>
      </div>
    </div >
  );
};

export default HeroSection;
