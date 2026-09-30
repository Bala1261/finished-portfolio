// Animation variants for Framer Motion

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

export const slideInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 }
};

export const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Hover variants
export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05 }
};

export const hoverGlow = {
  rest: { boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { boxShadow: '0 0 20px rgba(14,165,233,0.5)' }
};
