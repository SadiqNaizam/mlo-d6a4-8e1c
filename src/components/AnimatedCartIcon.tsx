import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';

interface AnimatedCartIconProps {
  itemCount: number;
}

const AnimatedCartIcon: React.FC<AnimatedCartIconProps> = ({ itemCount = 0 }) => {
  console.log('AnimatedCartIcon loaded');

  const controls = useAnimationControls();
  const [prevItemCount, setPrevItemCount] = useState(itemCount);

  useEffect(() => {
    // Trigger wiggle animation only when a new item is added (count increases)
    if (itemCount > prevItemCount) {
      controls.start({
        rotate: [0, -15, 15, -10, 10, -5, 5, 0],
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
        },
      });
    }
    // Update the previous count for the next render
    setPrevItemCount(itemCount);
  }, [itemCount, prevItemCount, controls]);

  return (
    <Link to="/cart" className="relative" aria-label={`View your cart with ${itemCount} items`}>
      <motion.div
        className="relative cursor-pointer"
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* The 4D Pocket visual */}
        <div className="w-[72px] h-9 bg-gray-100 rounded-b-full border-4 border-red-500 border-t-0 shadow-md" />
        <div className="absolute top-0 left-0 w-[72px] h-1 bg-red-500" />

        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              key={itemCount}
              className="absolute -top-2 -right-3 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold select-none pointer-events-none"
              initial={{ scale: 0, y: -10 }}
              animate={{ scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 20 } }}
              exit={{ scale: 0 }}
            >
              {itemCount > 9 ? '9+' : itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default AnimatedCartIcon;