import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { projects } from '../../data/portfolio';

const ProjectsNew = () => {
  const featuredProjects = projects.filter(p => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
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
            className="inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-sm font-medium mb-4"
          >
            💼 My Work
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="relative h-full rounded-xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60"></div>
                  
                  {/* Floating Icons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <FiGithub className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <FiExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>

                  {/* Stars Badge */}
                  {project.stars && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 flex items-center gap-1">
                      <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-200 text-xs font-medium">{project.stars}</span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-gray-400 text-xs">
                        +{project.technologies.length - 3}
                      </span>
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

export default ProjectsNew;
