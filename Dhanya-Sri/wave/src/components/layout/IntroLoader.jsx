import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { personalInfo } from '../../data/portfolio';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [phase, setPhase] = useState(0); // 0: loading, 1: name reveal, 2: complete

  useEffect(() => {
    // Phase transitions
    const phaseTimer1 = setTimeout(() => setPhase(1), 1000);
    const phaseTimer2 = setTimeout(() => setPhase(2), 2200);

    // Progress animation
    const duration = 3000;
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 200);
          }, 50);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0">
            {/* Perspective grid */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.15) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.15) 2px, transparent 2px)
                `,
                backgroundSize: '60px 60px',
                transform: 'perspective(500px) rotateX(60deg)',
                transformOrigin: 'center center',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '60px 60px'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Glowing lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                style={{
                  width: '100%',
                  top: `${20 + i * 20}%`,
                  opacity: 0.3,
                }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "linear",
                }}
              />
            ))}

            {/* DNA Helix Effect */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <linearGradient id="helix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {[...Array(20)].map((_, i) => (
                <motion.circle
                  key={`helix-${i}`}
                  r="4"
                  fill="url(#helix-gradient)"
                  initial={{
                    cx: `${50 + Math.sin((i * Math.PI) / 10) * 20}%`,
                    cy: `${i * 5}%`,
                  }}
                  animate={{
                    cx: `${50 + Math.sin((i * Math.PI) / 10 + progress / 10) * 20}%`,
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* Liquid Blob Morphing */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '600px',
                height: '600px',
                filter: 'blur(60px)',
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.3, 0.9, 1.2, 1],
                  rotate: [0, 90, 180, 270, 360],
                  borderRadius: ['40% 60% 70% 30%', '60% 40% 30% 70%', '40% 60% 70% 30%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1.2, 0.9, 1.3, 1],
                  rotate: [360, 270, 180, 90, 0],
                  borderRadius: ['60% 40% 30% 70%', '40% 60% 70% 30%', '60% 40% 30% 70%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Matrix-style falling code */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`matrix-${i}`}
                className="absolute text-cyan-500 font-mono text-xs opacity-30"
                style={{
                  left: `${i * 7}%`,
                  top: '-10%',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 20 }, () => 
                  String.fromCharCode(33 + Math.floor(Math.random() * 94))
                ).join('\n')}
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-6">
            {/* Holographic Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotateY: -180 }}
              animate={{ 
                opacity: phase >= 0 ? 1 : 0, 
                scale: phase >= 0 ? 1 : 0,
                rotateY: 0,
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 150,
              }}
              className="mb-12 flex justify-center"
            >
              <div className="relative w-40 h-40">
                {/* Hexagon shape */}
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <defs>
                    <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <motion.polygon
                    points="50,5 90,25 90,75 50,95 10,75 10,25"
                    fill="none"
                    stroke="url(#hex-gradient)"
                    strokeWidth="2"
                    animate={{
                      strokeDasharray: ["0, 300", "300, 0"],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>

                {/* Inner rotating triangles */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="relative w-20 h-20">
                    {[0, 120, 240].map((angle) => (
                      <motion.div
                        key={angle}
                        className="absolute inset-0"
                        style={{
                          transform: `rotate(${angle}deg)`,
                        }}
                      >
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-cyan-500/50 mx-auto" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Center glow */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-md" />
                </motion.div>

                {/* Orbiting dots */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`orbit-dot-${i}`}
                    className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-6px',
                      marginTop: '-6px',
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 6 + progress / 20) * 80,
                      y: Math.sin((i * Math.PI * 2) / 6 + progress / 20) * 80,
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Name with Glitch Effect */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8 relative"
                >
                  {/* Main name */}
                  <motion.h1
                    className="text-6xl md:text-8xl font-bold relative"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(6,182,212,0.5)',
                        '0 0 40px rgba(59,130,246,0.8)',
                        '0 0 20px rgba(6,182,212,0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {personalInfo.name}
                  </motion.h1>

                  {/* Glitch layers */}
                  <motion.h1
                    className="text-6xl md:text-8xl font-bold absolute inset-0 text-cyan-500 opacity-70"
                    animate={{
                      x: [-2, 2, -2],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    {personalInfo.name}
                  </motion.h1>
                  <motion.h1
                    className="text-6xl md:text-8xl font-bold absolute inset-0 text-purple-500 opacity-70"
                    animate={{
                      x: [2, -2, 2],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: 0.1,
                    }}
                  >
                    {personalInfo.name}
                  </motion.h1>

                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent h-1"
                    animate={{
                      y: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <motion.p
                    className="text-xl md:text-3xl font-light tracking-wider"
                    style={{
                      background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    animate={{
                      backgroundPosition: ['0% center', '200% center'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    &lt; Full Stack Developer /&gt;
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Futuristic Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-md mx-auto"
            >
              {/* Progress container */}
              <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Moving light */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  style={{
                    left: `${Math.max(0, progress - 10)}%`,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Percentage */}
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500 font-mono tracking-wider">
                  INITIALIZING
                </span>
                <motion.span
                  key={progress}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
