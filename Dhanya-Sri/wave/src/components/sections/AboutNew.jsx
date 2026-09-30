import { motion } from 'framer-motion';
import { about, personalInfo } from '../../data/portfolio';
import { useBexoProfile } from '../../context/BexoProfileContext';
import { FiAward, FiBook, FiHeart, FiUser } from 'react-icons/fi';

const AboutNew = () => {
  const { user, profile } = useBexoProfile();

  const displayName = user?.name || personalInfo.name;
  const displayTitle = profile?.headline || personalInfo.role;
  const displayAvatar = user?.photoUrl || personalInfo.avatar;
  const displayDescription = profile?.bio || about.description;
  const educationList = about.education || [];

  return (
    <section id="about" className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/25 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4"
          >
            <motion.div
              className="relative"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FiUser className="w-4 h-4 text-cyan-300" />
            </motion.div>
            About Me
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Get To Know Me
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Profile & Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8">
                <div className="flex items-center gap-6 mb-6">
                  {/* Avatar */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                      <img
                        src={displayAvatar}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 20%' }}
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{displayName}</h3>
                    <p className="text-cyan-300">{displayTitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {displayDescription}
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  <FiBook className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              <div className="space-y-6">
                {educationList.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-6 border-l-2 border-cyan-500/30"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <h4 className="text-lg font-semibold text-white mb-1">{edu.degree}</h4>
                    <p className="text-cyan-300 text-sm mb-1">{edu.institution}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.year}</p>
                    <p className="text-gray-300 text-sm font-medium">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Interests & Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Interests */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Interests</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {about.interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{interest}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 overflow-visible">
                  <FiHeart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Soft Skills</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {about.softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-center group cursor-pointer"
                  >
                    <span className="text-cyan-200 font-medium group-hover:text-white transition-colors">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutNew;