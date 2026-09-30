import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2"
          >
            © {currentYear} Portfolio. Made with{' '}
            <FaHeart className="text-red-500 animate-pulse" /> by {personalInfo.name}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
