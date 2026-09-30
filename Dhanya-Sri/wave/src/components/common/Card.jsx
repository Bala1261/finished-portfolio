import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, glass = false }) => {
  const baseStyles = 'relative rounded-2xl p-6 transition-all will-change-transform overflow-hidden';
  const glassStyles = glass 
    ? 'glass' 
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
  const hoverStyles = hover 
    ? 'cursor-pointer' 
    : '';

  return (
    <motion.div
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { 
        y: -3,
        scale: 1.01,
        boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)"
      } : {}}
    >
      <motion.div
        whileHover={hover ? { y: -2 } : {}}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Card;
