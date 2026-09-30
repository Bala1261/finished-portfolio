import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { useBexoProfile } from '../../context/BexoProfileContext';

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left / rect.width - 0.5);
    y.set(e.clientY - rect.top / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const title = project.title;
  const description = project.description;
  const image = project.images?.[0] || project.image || "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop";
  const techStack = project.stack || project.technologies || [];
  const githubLink = project.externalLink || project.github || "#";
  const demoLink = project.demoLink || project.demo || "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
    >
      <div className="relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/80 backdrop-blur-sm">
            {githubLink !== '#' && (
              <motion.a href={githubLink} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-slate-800 border border-cyan-500/50 text-white rounded-lg flex items-center gap-2 hover:bg-cyan-500 transition-colors shadow-lg" whileHover={{ scale: 1.05 }}>
                <HiCode className="text-lg" />
                <span className="text-sm font-medium">Code</span>
              </motion.a>
            )}
            {demoLink !== '#' && (
              <motion.a href={demoLink} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center gap-2 transition-all shadow-lg" whileHover={{ scale: 1.05 }}>
                <HiExternalLink className="text-lg" />
                <span className="text-sm font-medium">Demo</span>
              </motion.a>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-cyan-300 border border-cyan-500/30 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsInnovative = () => {
  const { projectEntries } = useBexoProfile();

  if (!projectEntries || projectEntries.length === 0) return null;

  return (
    <section id="projects" className="relative section-padding overflow-hidden bg-slate-950">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building innovative solutions with cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectEntries.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsInnovative;