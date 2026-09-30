import { motion } from 'framer-motion';

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = true,
  gradient = false 
}) => {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.h2 
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          gradient ? 'gradient-text' : 'text-gray-900 dark:text-white'
        }`}
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
