import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';
import { FiBriefcase, FiAward, FiCode, FiLayers, FiCpu, FiTerminal, FiDatabase, FiTool } from 'react-icons/fi';
import { BiMicrophone } from 'react-icons/bi';
import { useState } from 'react';

const ExperienceCard = ({ exp, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX(((centerY - y) / centerY) * 30);
    setRotateY(((x - centerX) / centerX) * 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden">
        <div className="relative">
          <motion.div 
            className="relative mb-4 inline-block cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <motion.div 
              className="relative"
              animate={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`relative p-4 rounded-xl ${
                  exp.icon === 'hackathon' 
                    ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' 
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                } shadow-2xl`}
              >
                {exp.icon === 'hackathon' ? (
                  <FiAward className="w-12 h-12 text-white" />
                ) : (
                  <BiMicrophone className="w-12 h-12 text-white" />
                )}
              </div>
            </motion.div>
          </motion.div>
          
          <h4 className="text-xl font-bold text-white mb-2">{exp.title}</h4>
          <div className="flex items-center gap-2 text-blue-300 mb-3">
            <span className="font-medium">{exp.organization}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{exp.location}</span>
          </div>
          <p className="text-gray-400 mb-3">{exp.description}</p>
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
            {exp.date}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsExperience = () => {
  const skillIcons = {
    'HTML': FiCode,
    'CSS': FiLayers,
    'JavaScript': FiTerminal,
    'React.js': FiCpu,
    'Tailwind CSS': FiLayers,
    'Bootstrap': FiLayers,
    'Node.js': FiDatabase,
    'Express.js': FiDatabase,
    'MySQL': FiDatabase,
    'MongoDB': FiDatabase,
    'REST APIs': FiTerminal,
    'Java': FiCpu,
    'Git': FiTool,
    'GitHub': FiTool,
    'VS Code': FiTool,
    'Postman': FiTool,
    'Figma': FiTool,
  };

  const skillColors = {
    'HTML': 'from-orange-500 to-red-500',
    'CSS': 'from-blue-500 to-cyan-500',
    'JavaScript': 'from-yellow-400 to-yellow-600',
    'React.js': 'from-cyan-400 to-blue-500',
    'Tailwind CSS': 'from-teal-400 to-cyan-500',
    'Bootstrap': 'from-cyan-500 to-blue-600',
    'Node.js': 'from-green-500 to-emerald-600',
    'Express.js': 'from-gray-600 to-gray-800',
    'MySQL': 'from-blue-600 to-cyan-700',
    'MongoDB': 'from-green-600 to-teal-600',
    'REST APIs': 'from-cyan-500 to-blue-600',
    'Java': 'from-red-600 to-orange-700',
    'Git': 'from-orange-600 to-red-600',
    'GitHub': 'from-gray-700 to-slate-900',
    'VS Code': 'from-blue-600 to-cyan-600',
    'Postman': 'from-orange-500 to-orange-600',
    'Figma': 'from-cyan-500 to-blue-500',
  };

  const allSkills = [
    ...(skills?.frontend || []),
    ...(skills?.backend || []),
    ...(skills?.tools || [])
  ];

  const experiences = [
    {
      title: "Hackathon Participation",
      organization: "Sathyabama University",
      location: "Chennai",
      date: "2024",
      description: "Participated in hackathon on Retail Forecasting, showcasing innovative solutions",
      icon: "hackathon"
    },
    {
      title: "Project Presentation",
      organization: "Sona College of Technology",
      location: "Salem",
      date: "2024",
      description: "Presented SMART CO DETECTION hardware project demonstrating IoT and embedded systems capabilities",
      icon: "presentation"
    }
  ];

  return (
    <section id="skills" className="relative py-20 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
            🛠️ Skills & Experience
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid with Original Hover Animations & Glow Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allSkills.map((skill, index) => {
              const Icon = skillIcons[skill.name] || FiCode;
              const colorGradient = skillColors[skill.name] || 'from-cyan-500 to-blue-500';
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  <div className="relative h-full rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10 cursor-pointer overflow-hidden">
                    {/* Glowing Backlight on Hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colorGradient} opacity-0 group-hover:opacity-25 transition-opacity blur-xl`}
                    />
                    
                    <motion.div
                      className="relative flex flex-col items-center justify-center gap-3"
                      whileHover={{ rotate: [0, -8, 8, -8, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {Icon && (
                        <motion.div
                          className={`p-3 rounded-lg bg-gradient-to-r ${colorGradient} shadow-lg`}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-8 h-8 text-white drop-shadow-md" />
                        </motion.div>
                      )}
                      
                      <span className="text-gray-200 font-medium text-center text-sm group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>

                    {/* Floating Pulse Particle */}
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400/50"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.1
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <motion.div 
              className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FiBriefcase className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-white">Experience & Events</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsExperience;