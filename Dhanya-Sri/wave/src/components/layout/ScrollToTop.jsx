import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 left-8 z-40 p-3 rounded-full 
                   bg-white dark:bg-gray-800 shadow-lg
                   border border-gray-200 dark:border-gray-700
                   text-gray-700 dark:text-gray-300
                   hover:border-primary-500 dark:hover:border-primary-500
                   transition-colors"
          aria-label="Scroll to top"
        >
          <HiArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
