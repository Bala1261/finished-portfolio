import { motion } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import SectionTitle from '../common/SectionTitle';
import Badge from '../common/Badge';
import { projects } from '../../data/portfolio';

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <SectionTitle
          title="Featured Projects"
          subtitle="Building innovative solutions with modern technologies"
          gradient
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
              }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
                            border border-gray-200 dark:border-gray-700 
                            shadow-sm hover:shadow-xl hover:shadow-primary-500/10 
                            transition-all duration-300">
                
                {/* Project Image */}
                <div className="relative w-full h-52 bg-gradient-to-br from-primary-100 to-blue-100 
                              dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain p-8 transition-transform duration-500 
                             group-hover:scale-110"
                  />
                  
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                flex items-end justify-center pb-4 gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
                               rounded-lg text-sm font-medium flex items-center gap-2 
                               hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiCode className="text-lg" />
                      Code
                    </motion.a>
                    {project.demo !== '#' && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium 
                                 flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiExternalLink className="text-lg" />
                        Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white 
                               group-hover:text-primary-600 dark:group-hover:text-primary-400 
                               transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="tech"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                                 border-gray-200 dark:border-gray-600"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge 
                        variant="tech"
                        className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 
                                 dark:text-primary-400 border-primary-200 dark:border-primary-800"
                      >
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
