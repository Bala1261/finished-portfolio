import React, { useState, useEffect } from 'react';
import { Portfolio } from './types/bexo';
import { getInitialPortfolio, FIXTURES, FixtureKey } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Certificates } from './sections/Certificates';
import { Achievements } from './sections/Achievements';
import { Research } from './sections/Research';
import { ResumeCTA } from './sections/ResumeCTA';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { DevToolbar } from './components/DevToolbar';

interface AppProps {
  portfolio?: Portfolio;
}

export const App: React.FC<AppProps> = ({ portfolio: injectedPortfolio }) => {
  const [currentFixture, setCurrentFixture] = useState<FixtureKey>('alex-morgan');
  const [activePortfolio, setActivePortfolio] = useState<Portfolio>(() => {
    return injectedPortfolio || getInitialPortfolio();
  });

  // Keep in sync if an external injection or prop arrives
  useEffect(() => {
    if (injectedPortfolio) {
      setActivePortfolio(injectedPortfolio);
    }
  }, [injectedPortfolio]);

  // Handle SEO Dynamic Title and Meta description
  useEffect(() => {
    const name = activePortfolio?.profile?.name;
    const headline = activePortfolio?.profile?.headline;
    if (name) {
      document.title = headline ? `${name} | ${headline}` : `${name} | Portfolio`;
    }

    const summaryText = activePortfolio?.summary?.text;
    if (summaryText) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', summaryText.slice(0, 160));
      }
    }
  }, [activePortfolio]);

  const handleSelectFixture = (key: FixtureKey) => {
    setCurrentFixture(key);
    setActivePortfolio(FIXTURES[key].data);
  };

  return (
    <div className="bexo-portfolio-root">
      {/* Background ambient light & grid pattern */}
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="app-grid-overlay" aria-hidden="true" />

      {/* Main Navigation */}
      <Navbar portfolio={activePortfolio} />

      {/* Main Single Page Content */}
      <main className="app-container" id="main-content">
        <Hero portfolio={activePortfolio} />
        <About portfolio={activePortfolio} />
        <Experience experience={activePortfolio?.experience} />
        <Projects projects={activePortfolio?.projects} />
        <Skills skills={activePortfolio?.skills} />
        <Education education={activePortfolio?.education} />
        <Certificates certificates={activePortfolio?.certificates} />
        <Achievements achievements={activePortfolio?.achievements} />
        <Research research={activePortfolio?.research} />
        <ResumeCTA
          resume={activePortfolio?.resume}
          developerName={activePortfolio?.profile?.name}
        />
        <Contact
          contact={activePortfolio?.contact}
          developerName={activePortfolio?.profile?.name}
        />
      </main>

      {/* Global Footer */}
      <Footer portfolio={activePortfolio} />

      {/* Dev Mode Scenario Switcher (stripped in production) */}
      <DevToolbar
        currentFixture={currentFixture}
        onSelectFixture={handleSelectFixture}
      />
    </div>
  );
};

export default App;
