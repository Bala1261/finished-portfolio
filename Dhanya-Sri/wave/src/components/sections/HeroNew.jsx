import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { personalInfo, socialLinks } from '../../data/portfolio';

const HeroNew = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-900 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * 800],
              x: [null, Math.random() * 1000],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '-30%', left: '-20%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '-30%', right: '-20%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              {personalInfo.name.toUpperCase()}
            </span>
          </motion.h1>

          {/* Animated Role Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8 w-full"
          >
            <div className="relative min-h-[80px] sm:min-h-[100px] flex items-center justify-center lg:justify-start">
              {/* Full Stack Developer */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                animate={{ 
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.5, 1, 1, 1, 0.5],
                  rotateX: [-90, 0, 0, 0, 90],
                  y: [50, 0, 0, 0, -50]
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.2, 0.4, 0.45, 0.5],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative">
                  <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    Full Stack Developer
                  </motion.h2>
                </div>
              </motion.div>

              {/* UI/UX Designer */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                animate={{ 
                  opacity: [0, 0, 0, 0, 1, 1, 1, 0],
                  scale: [0.5, 0.5, 0.5, 0.5, 1, 1, 1, 0.5],
                  rotateX: [90, 90, 90, 90, 0, 0, 0, -90],
                  y: [-50, -50, -50, -50, 0, 0, 0, 50]
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.45, 0.5, 0.55, 0.7, 0.9, 0.95, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative">
                  <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap"
                    animate={{
                      backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    UI/UX Designer
                  </motion.h2>
                </div>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mt-6 lg:mx-0 mx-auto"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 mt-8"
            >
              {socialLinks.github && (
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub className="w-6 h-6 text-white" />
                </motion.a>
              )}
              {socialLinks.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLinkedin className="w-6 h-6 text-white" />
                </motion.a>
              )}
              {socialLinks.leetcode && (
                <motion.a
                  href={socialLinks.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SiLeetcode className="w-6 h-6 text-white" />
                </motion.a>
              )}
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="group relative p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-6 h-6 text-white" />
              </motion.a>
            </motion.div>
          </motion.div>
          </div>

          {/* Right Side - Profile Picture with Glowing Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(6, 182, 212, 0.3)"
                }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(6, 182, 212, 0.3)",
                    "0 0 50px rgba(14, 165, 233, 0.8), inset 0 0 50px rgba(14, 165, 233, 0.5)",
                    "0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 rounded-full" style={{ padding: "4px" }}>
                <div className="w-full h-full rounded-full" style={{ background: "linear-gradient(45deg, #06b6d4, #0ea5e9, #22d3ee, #06b6d4)", padding: "4px" }}>
                  <div className="w-full h-full rounded-full bg-slate-950" />
                </div>
              </div>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;