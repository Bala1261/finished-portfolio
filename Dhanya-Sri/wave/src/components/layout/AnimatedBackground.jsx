import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 -left-40 w-80 h-80 bg-primary-500/20 dark:bg-primary-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 right-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
    </div>
  );
};

export default AnimatedBackground;
