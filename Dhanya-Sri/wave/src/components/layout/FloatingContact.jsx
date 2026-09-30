import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail } from 'react-icons/hi';

const FloatingContact = () => {
  const [setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 
                     text-white shadow-2xl hover:shadow-primary-500/50 
                     transition-shadow duration-300 group relative"
            aria-label="Contact me"
          >
            <HiMail className="text-2xl" />
            
            {/* Ping effect */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
                           bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
            </span>

            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 
                         px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-800 text-white text-sm 
                         whitespace-nowrap opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 pointer-events-none">
              Contact Me
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContact;
