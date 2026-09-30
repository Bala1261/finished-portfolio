import React from 'react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';

const PortfolioPage = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <About />
      <Skills />
      <Projects />
      <Experience />
    </div>
  );
};

export default PortfolioPage;