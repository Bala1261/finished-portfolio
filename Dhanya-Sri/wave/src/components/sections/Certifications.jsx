import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { HiCheckBadge, HiSparkles } from 'react-icons/hi2';
import { achievements } from '../../data/portfolio';

const Certifications = () => {
  return (
    <section id="certifications" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          title="Global Certifications"
          subtitle="Professional certifications and achievements"
          gradient
        />

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.15 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <Card hover={true} className="h-full relative group overflow-hidden">
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <HiCheckBadge className="w-9 h-9 text-white" />
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiSparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {achievement.title}
                    </motion.h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                        {achievement.year}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
