import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/cursor/CustomCursor';
import CursorPreview from './components/cursor/CursorPreview';
import ScrollProgress from './components/navigation/ScrollProgress';
import Navbar from './components/navigation/Navbar';
import Preloader from './components/preloader/Preloader';
import Hero from './components/hero/Hero';
import Manifesto from './components/manifesto/Manifesto';
import Marquee from './components/marquee/Marquee';
import FeaturedContent from './components/content/FeaturedContent';
import ArticleModal from './components/content/ArticleModal';
import InteractiveQuote from './components/hero/InteractiveQuote';
import SelectedWork from './components/work/SelectedWork';
import CaseStudyModal from './components/work/CaseStudyModal';
import Services from './components/services/Services';
import Proof from './components/proof/Proof';
import About from './components/about/About';
import Timeline from './components/about/Timeline';
import Testimonials from './components/testimonials/Testimonials';
import Publications from './components/publications/Publications';
import Newsletter from './components/newsletter/Newsletter';
import Contact from './components/contact/Contact';
import ContactModal from './components/contact/ContactModal';
import Footer from './components/footer/Footer';
import ProfileSwitcher from './components/controls/ProfileSwitcher';
import portfolioData from './data/portfolioData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState(portfolioData.profileType || 'personalBrand');
  const [heroMode, setHeroMode] = useState(portfolioData.hero.mode || 'portrait');

  // Modals state
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  const selectedArticle = portfolioData.content.find((a) => a.id === selectedArticleId);
  const selectedProject = portfolioData.projects.find((p) => p.id === selectedProjectId);

  const heroConfig = {
    ...portfolioData.hero,
    mode: heroMode,
  };

  return (
    <CursorProvider>
      {/* Editorial Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className="portfolio-app">
        {/* Global Reading Progress Indicator */}
        <ScrollProgress />

        {/* Dynamic Morphing Custom Cursor & Hover Preview */}
        <CustomCursor />
        <CursorPreview />

        {/* Editorial Navigation */}
        <Navbar
          personal={portfolioData.personal}
          onOpenContact={() => setContactModalOpen(true)}
        />

        <main id="main-content">
          {/* Hero Section */}
          <Hero
            hero={heroConfig}
            personal={portfolioData.personal}
            onSelectArticle={(id) => setSelectedArticleId(id)}
          />

          {/* Section rendering adapted by Profile Type */}
          {profileType === 'writer' ? (
            <>
              <Manifesto manifesto={portfolioData.manifesto} />
              <FeaturedContent
                content={portfolioData.content}
                categories={portfolioData.categories}
                onSelectArticle={(id) => setSelectedArticleId(id)}
              />
              <About about={portfolioData.about} personal={portfolioData.personal} />
              <Publications publications={portfolioData.publications} />
              <Newsletter newsletter={portfolioData.newsletter} />
              <Contact
                contact={portfolioData.contact}
                personal={portfolioData.personal}
                socials={portfolioData.socials}
                onOpenContactModal={() => setContactModalOpen(true)}
              />
            </>
          ) : profileType === 'consultant' ? (
            <>
              <Proof proof={portfolioData.proof} />
              <SelectedWork
                projects={portfolioData.projects}
                onSelectProject={(id) => setSelectedProjectId(id)}
              />
              <Services
                services={portfolioData.services}
                onSelectService={() => setContactModalOpen(true)}
              />
              <FeaturedContent
                content={portfolioData.content}
                categories={portfolioData.categories}
                onSelectArticle={(id) => setSelectedArticleId(id)}
              />
              <Timeline experience={portfolioData.experience} />
              <Testimonials testimonials={portfolioData.testimonials} />
              <Contact
                contact={portfolioData.contact}
                personal={portfolioData.personal}
                socials={portfolioData.socials}
                onOpenContactModal={() => setContactModalOpen(true)}
              />
            </>
          ) : profileType === 'contentCreator' ? (
            <>
              <FeaturedContent
                content={portfolioData.content}
                categories={portfolioData.categories}
                onSelectArticle={(id) => setSelectedArticleId(id)}
              />
              <Marquee items={portfolioData.marquee.items} />
              <Proof proof={portfolioData.proof} />
              <SelectedWork
                projects={portfolioData.projects}
                onSelectProject={(id) => setSelectedProjectId(id)}
              />
              <Newsletter newsletter={portfolioData.newsletter} />
              <Services
                services={portfolioData.services}
                onSelectService={() => setContactModalOpen(true)}
              />
              <Testimonials testimonials={portfolioData.testimonials} />
              <Contact
                contact={portfolioData.contact}
                personal={portfolioData.personal}
                socials={portfolioData.socials}
                onOpenContactModal={() => setContactModalOpen(true)}
              />
            </>
          ) : (
            /* 'personalBrand' & Default Comprehensive Editorial Flow */
            <>
              <Manifesto manifesto={portfolioData.manifesto} />
              <Marquee items={portfolioData.marquee.items} />
              <FeaturedContent
                content={portfolioData.content}
                categories={portfolioData.categories}
                onSelectArticle={(id) => setSelectedArticleId(id)}
              />
              <InteractiveQuote />
              <SelectedWork
                projects={portfolioData.projects}
                onSelectProject={(id) => setSelectedProjectId(id)}
              />
              <Services
                services={portfolioData.services}
                onSelectService={() => setContactModalOpen(true)}
              />
              <Proof proof={portfolioData.proof} />
              <About about={portfolioData.about} personal={portfolioData.personal} />
              <Timeline experience={portfolioData.experience} />
              <Testimonials testimonials={portfolioData.testimonials} />
              <Publications publications={portfolioData.publications} />
              <Newsletter newsletter={portfolioData.newsletter} />
              <Contact
                contact={portfolioData.contact}
                personal={portfolioData.personal}
                socials={portfolioData.socials}
                onOpenContactModal={() => setContactModalOpen(true)}
              />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer
          personal={portfolioData.personal}
          socials={portfolioData.socials}
        />

        {/* Profile Switcher Demo Bar */}
        <ProfileSwitcher
          currentProfile={profileType}
          onProfileChange={setProfileType}
          heroMode={heroMode}
          onHeroModeChange={setHeroMode}
        />

        {/* Modals */}
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            allArticles={portfolioData.content}
            authorName={portfolioData.personal.name}
            onClose={() => setSelectedArticleId(null)}
            onSelectNext={(id) => setSelectedArticleId(id)}
          />
        )}

        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProjectId(null)}
          />
        )}

        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          personal={portfolioData.personal}
        />
      </div>
    </CursorProvider>
  );
}
