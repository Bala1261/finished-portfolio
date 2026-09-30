import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { FiCode, FiDatabase, FiTool } from 'react-icons/fi';

const SkillsNew = () => {
  const categories = [
    { title: 'Frontend', icon: FiCode, skills: skills.frontend, color: 'from-blue-500 to-cyan-500' },
    { title: 'Backend', icon: FiDatabase, skills: skills.backend, color: 'from-cyan-500 to-blue-500' },
    { title: 'Tools', icon: FiTool, skills: skills.tools, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4"
          >
            🛠️ Tech Stack
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing projects
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="h-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -50, rotateY: -15 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        delay: (categoryIndex * 0.3) + (skillIndex * 0.15), 
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.03, 
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      className="relative group/skill"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Skill info with animated entrance */}
                      <motion.div 
                        className="flex items-center justify-between mb-2 relative z-10"
                        initial={{ y: -10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: (categoryIndex * 0.3) + (skillIndex * 0.15) + 0.1,
                          duration: 0.4
                        }}
                      >
                        <motion.span 
                          className="text-gray-300 font-medium relative"
                          whileHover={{ color: "#06b6d4" }}
                        >
                          {skill.name}
                          {/* Floating icon/dot on hover */}
                          <motion.span
                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover/skill:opacity-100"
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.span>
                        <motion.span 
                          className="text-cyan-400 font-semibold tabular-nums"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: (categoryIndex * 0.3) + (skillIndex * 0.15) + 0.2,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </motion.div>

                      {/* Progress bar container */}
                      <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover/skill:border-cyan-500/30 transition-all duration-300">
                        {/* Animated progress fill */}
                        <motion.div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: (categoryIndex * 0.3) + (skillIndex * 0.15) + 0.3,
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          {/* Pulsing glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                            animate={{
                              x: ['-200%', '200%']
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Moving shine effect */}
                          <motion.div
                            className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/50 to-transparent blur-sm"
                            animate={{
                              x: [0, -10, 0],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>

                        {/* Shimmer overlay on hover */}
                        <motion.div
                          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent opacity-0 group-hover/skill:opacity-100"
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </div>

                      {/* Floating particles on hover */}
                      <motion.div
                        className="absolute -right-1 top-0 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover/skill:opacity-100"
                        animate={{
                          y: [0, -20, -40],
                          x: [0, 5, -5],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute -right-2 top-2 w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover/skill:opacity-100"
                        animate={{
                          y: [0, -25, -50],
                          x: [0, -3, 3],
                          opacity: [0, 1, 0],
                          scale: [0, 1.2, 0.3]
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: 0.3,
                          ease: "easeOut"
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05), transparent 70%)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsNew;
