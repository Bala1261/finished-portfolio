import React from 'react';
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaGithub,
  FaHtml5, FaJs
} from 'react-icons/fa';
import {
  SiExpress, SiMongodb, SiVisualstudiocode, SiC, SiPostman
} from 'react-icons/si';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skills = [
    {
      name: 'React.js',
      icon: <FaReact />,
      color: '#61DAFB',
      level: 'Advanced'
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs />,
      color: '#68A063',
      level: 'Intermediate'
    },
    {
      name: 'Express.js',
      icon: <SiExpress />,
      color: '#FFFFFF',
      level: 'Intermediate'
    },
    {
      name: 'Python',
      icon: <FaPython />,
      color: '#3776AB',
      level: 'Advanced'
    },
    {
      name: 'Java',
      icon: <FaJava />,
      color: '#007396',
      level: 'Intermediate'
    },
    {
      name: 'C',
      icon: <SiC />,
      color: '#A8B9CC',
      level: 'Intermediate'
    },
    {
      name: 'JavaScript',
      icon: <FaJs />,
      color: '#F7DF1E',
      level: 'Advanced'
    },
    {
      name: 'HTML5',
      icon: <FaHtml5 />,
      color: '#E34F26',
      level: 'Advanced'
    },
    {
      name: 'MongoDB',
      icon: <SiMongodb />,
      color: '#47A248',
      level: 'Intermediate'
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      color: '#FFFFFF',
      level: 'Advanced'
    },
    {
      name: 'VS Code',
      icon: <SiVisualstudiocode />,
      color: '#007ACC',
      level: 'Expert'
    },
    {
      name: 'Postman',
      icon: <SiPostman />,
      color: '#FF6C37',
      level: 'Intermediate'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="section-subtitle">Technologies I work with</div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3>{skill.name}</h3>
              <span className="skill-level">{skill.level}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
