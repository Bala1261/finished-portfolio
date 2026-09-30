import React from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const info = [
    { icon: <FaUser />, title: 'Name', value: 'Vishal K' },
    { icon: <FaEnvelope />, title: 'Email', value: 'vishal250820@gmail.com' },
    { icon: <FaMapMarkerAlt />, title: 'Location', value: 'Cuddalore, Tamil Nadu' },
    { icon: <FaBriefcase />, title: 'Status', value: '3rd Year Student' }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="section-subtitle">Get to know me better</div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/images/profile.jpg" alt="Vishal K" />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>I'm a Full Stack Developer Student</h3>
            <p>
              I'm currently pursuing my Bachelor's in Computer Science at Kongu Engineering College (2023-2027).
              With a passion for creating elegant solutions, I specialize in building modern web applications
              using React, Node.js, and Express. My current CGPA is 7.50, and I'm constantly learning and growing.
            </p>
            <p>
              I'm particularly interested in Full Stack Development and UI/UX Design. When I'm not coding,
              you can find me gaming, exploring new technologies, or participating in hackathons and technical events.
              I've showcased my work at various prestigious institutions and earned certifications to strengthen my skills.
            </p>

            <div className="about-info">
              {info.map((item, index) => (
                <motion.div
                  key={index}
                  className="info-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaDownload /> Download Resume (PDF)
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
