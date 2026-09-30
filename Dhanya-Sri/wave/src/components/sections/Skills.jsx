import { motion } from 'framer-motion';
import { 
  SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiVuedotjs,
  SiNodedotjs, SiExpress, SiPython, SiPostgresql, SiMongodb,
  SiGit, SiDocker, SiAmazonaws, SiFigma, SiVisualstudiocode, SiPostman
} from 'react-icons/si';
import { BiData } from 'react-icons/bi';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { skills } from '../../data/portfolio';

const iconMap = {
  'React': SiReact,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'Python': SiPython,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'REST APIs': BiData,
  'Git': SiGit,
  'Docker': SiDocker,
  'AWS': SiAmazonaws,
  'Figma': SiFigma,
  'VS Code': SiVisualstudiocode,
  'Postman': SiPostman,
};

const Skills = () => {
  const skillCategories = [
    { title: 'Frontend', skills: skills.frontend, color: 'from-blue-600 to-cyan-500' },
    { title: 'Backend', skills: skills.backend, color: 'from-blue-700 to-blue-500' },
    { title: 'Tools', skills: skills.tools, color: 'from-cyan-600 to-blue-400' },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies I work with"
          gradient
        />

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12 }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <Card className="h-full">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => {
                    const Icon = iconMap[skill.name];
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {Icon && (
                              <Icon className="text-xl text-gray-700 dark:text-gray-300 
                                           group-hover:text-primary-500 dark:group-hover:text-primary-400 
                                           transition-colors" />
                            )}
                            <span className="font-medium text-gray-900 dark:text-white">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 0.2
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
