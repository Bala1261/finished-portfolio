import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { about, personalInfo } from '../../data/portfolio';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionTitle
          title="About Me"
          subtitle="Get to know me better"
          gradient
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Animated decorative rings */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-4 glass-strong rounded-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Image container with animated border */}
              <motion.div 
                className="absolute inset-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Your professional photo */}
                <img 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {about.description}
            </p>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Education
              </h3>
              {about.education.map((edu, index) => (
                <Card key={index} className="mb-4" hover={false}>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {edu.year}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {edu.description}
                  </p>
                </Card>
              ))}
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Areas of Interest
              </h3>
              <div className="flex flex-wrap gap-3">
                {about.interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-600/10 to-primary-500/10 
                             border border-primary-600/20 rounded-full text-sm font-medium
                             text-gray-700 dark:text-gray-300"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            {about.softSkills && (
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {about.softSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600/10 to-blue-500/10 
                               border border-cyan-600/20 rounded-full text-sm font-medium
                               text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
