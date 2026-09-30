import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET_TITLE = "SOLAIRAJ R";
const GLYPHS = "0101XY_#*&@$!<>[]{}%+/=";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Number of vertical curtain columns for the innovative shutter exit
  const columns = useMemo(() => [0, 1, 2, 3, 4], []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Fast, organic progress ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              document.body.style.overflow = '';
              if (onComplete) onComplete();
            }, 850);
          }, 300);
          return 100;
        }
        const delta = prev < 50 ? Math.floor(Math.random() * 6) + 3 : Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + delta, 100);
      });
    }, 40);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Cyberpunk / Matrix text decryption derived directly from progress
  const scrambledText = useMemo(() => {
    const revealedLength = Math.floor((progress / 100) * TARGET_TITLE.length);
    let output = "";
    for (let i = 0; i < TARGET_TITLE.length; i++) {
      if (TARGET_TITLE[i] === " ") {
        output += " ";
      } else if (i < revealedLength || progress >= 100) {
        output += TARGET_TITLE[i];
      } else {
        output += GLYPHS[(i * 7 + progress) % GLYPHS.length];
      }
    }
    return output;
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
      {/* ─── Innovative 5-Column Shutter Exit Curtain ─────────────────── */}
      <div className="absolute inset-0 flex">
        {columns.map((colIdx) => (
          <motion.div
            key={colIdx}
            initial={{ y: '0%' }}
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: colIdx * 0.08,
            }}
            className="flex-1 h-full bg-[#F5F8FF] border-r border-[#DCE6F3] last:border-r-0 relative"
          >
            {/* Subtle vertical accent glow lines */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#0EA5E9]/20 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* ─── Central Innovative Holographic HUD ───────────────────────── */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-20 px-6"
          >
            {/* Volumetric Radial Glow Orbs */}
            <div className="absolute w-[600px] h-[600px] bg-[#0EA5E9]/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
            <div className="absolute w-[350px] h-[350px] bg-[#8B2CF5]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Futuristic Geometric Reactor Core */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-8">
              {/* Outer SVG Calibrated Compass & Ticks */}
              <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '16s' }} viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="1" strokeDasharray="3 7" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(37, 99, 235, 0.15)" strokeWidth="0.75" />
                {/* 4 Cardinal Crosshair Marks */}
                <line x1="100" y1="5" x2="100" y2="15" stroke="#0EA5E9" strokeWidth="2" />
                <line x1="100" y1="185" x2="100" y2="195" stroke="#0EA5E9" strokeWidth="2" />
                <line x1="5" y1="100" x2="15" y2="100" stroke="#0EA5E9" strokeWidth="2" />
                <line x1="185" y1="100" x2="195" y2="100" stroke="#0EA5E9" strokeWidth="2" />
              </svg>

              {/* Counter-rotating Hexagonal Wireframe */}
              <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} viewBox="0 0 160 160">
                <polygon
                  points="80,10 145,45 145,115 80,150 15,115 15,45"
                  fill="none"
                  stroke="rgba(139, 44, 245, 0.35)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Orbiting Laser Point */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-start justify-center pointer-events-none"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shadow-[0_0_12px_#0EA5E9]" />
              </motion.div>

              {/* Center Monospace Percentage Readout */}
              <div className="relative flex flex-col items-center justify-center">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tighter text-[#111827] drop-shadow-sm">
                  {String(progress).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-[#0EA5E9] tracking-widest uppercase font-semibold">
                  PERCENT
                </span>
              </div>
            </div>

            {/* Matrix Decrypted Name Display */}
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0EA5E9] animate-ping" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0EA5E9] font-semibold">
                  {progress < 100 ? "DECRYPTING IDENTITY KERNEL..." : "ACCESS GRANTED // INITIALIZED"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5]">
                {scrambledText}
              </h1>

              <p className="text-xs font-mono text-[#64748B] tracking-wider">
                FULL-STACK SOFTWARE ENGINEER
              </p>
            </div>

            {/* Laser Line Progress Beam */}
            <div className="mt-8 w-64 sm:w-72 space-y-2">
              <div className="relative h-[3px] w-full bg-slate-200 rounded-full overflow-hidden border border-[#DCE6F3]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] shadow-[0_0_15px_rgba(14,165,233,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Telemetry metadata footer */}
              <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
                <span>PORTFOLIO_V2.6</span>
                <span className="text-[#0EA5E9]">SYS_OK // 2027</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
