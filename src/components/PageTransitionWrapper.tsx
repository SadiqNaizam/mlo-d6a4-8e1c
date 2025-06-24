import React from 'react';
import { motion } from 'framer-motion';

/**
 * A wrapper component to provide a consistent page transition animation.
 * It creates a "swoosh" effect for child elements as they mount.
 * Note: For exit animations, this component's parent must contain an <AnimatePresence> from framer-motion.
 * By default, this will only animate on entry.
 */

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children }) => {
  console.log('PageTransitionWrapper loaded');

  const pageVariants = {
    initial: {
      opacity: 0,
      x: '5vw', // Start slightly off-screen to the right
    },
    in: {
      opacity: 1,
      x: 0, // Animate to original position
    },
    out: {
      opacity: 0,
      x: '-5vw', // Animate off-screen to the left on exit
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate', // A fun, thematic easing
    duration: 0.6,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;