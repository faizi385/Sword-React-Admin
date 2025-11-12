import { motion } from 'framer-motion';

// Page transitions
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade in up animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Scale in animation
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.03,
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export const tapScale = {
  scale: 0.98,
};

// Button animations
export const buttonHover = {
  scale: 1.03,
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export const buttonTap = {
  scale: 0.98,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

// Card animations
export const cardHover = {
  y: -5,
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  transition: { type: 'spring', stiffness: 300, damping: 15 },
};

// Staggered list animation
export const staggerList = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Loading spinner animation
export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// Modal animations
export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const modalContent = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// Export motion component with default variants
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionSection = motion.section;
export const MotionArticle = motion.article;
export const MotionSpan = motion.span;

// Helper function to create staggered children
// eslint-disable-next-line react/display-name
export const StaggerContainer = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={staggerContainer}
    className={className}
  >
    {children}
  </motion.div>
);

// Helper function to create staggered items
// eslint-disable-next-line react/display-name
export const StaggerItem = ({ children, className = '' }) => (
  <motion.div variants={staggerItem} className={className}>
    {children}
  </motion.div>
);
