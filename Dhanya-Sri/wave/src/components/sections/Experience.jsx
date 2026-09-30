import { motion } from 'framer-motion';
import { HiBriefcase, HiAcademicCap, HiLightBulb } from 'react-icons/hi';
import SectionTitle from '../common/SectionTitle';
import { experience } from '../../data/portfolio';

const Experience = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return <HiBriefcase className="text-2xl" />;
      case 'education':
        return <HiAcademicCap className="text-2xl" />;
      case 'internship':
        return <HiLightBulb className="text-2xl" />;
      default:
        return <HiBriefcase className="text-2xl" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'work':
        return 'from-blue-500 to-cyan-500';
      case 'education':
        return 'from-purple-500 to-pink-500';
      case 'internship':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey"
          gradient
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500" />

            {/* Timeline items */}
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                <div className={`flex items-start gap-6 ${
                  index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                }`}>
                  {/* Timeline dot */}
                  <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 
                                 w-16 h-16 rounded-full bg-gradient-to-br ${getColor(item.type)}
                                 flex items-center justify-center text-white shadow-lg z-10`}>
                    {getIcon(item.type)}
                  </div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`ml-24 md:ml-0 w-full md:w-[calc(50%-4rem)] 
                              bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg 
                              border border-gray-200 dark:border-gray-700
                              ${index % 2 === 0 ? 'md:mr-24' : 'md:ml-24'}`}
                  >
                    {/* Period badge */}
                    <div className="inline-block mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium
                                     bg-gradient-to-r from-primary-500/10 to-purple-500/10 
                                     text-primary-600 dark:text-primary-400
                                     border border-primary-500/20">
                        {item.period}
                      </span>
                    </div>

                    {/* Title and company */}
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                      {item.company}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {item.location}
                    </p>

                    {/* Description points */}
                    <ul className={`space-y-2 ${
                      index % 2 === 0 ? 'md:list-inside md:text-right' : ''
                    }`}>
                      {item.description.map((desc, descIndex) => (
                        <motion.li
                          key={descIndex}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: descIndex * 0.1 }}
                          className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2"
                        >
                          <span className="text-primary-500 mt-1">•</span>
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
