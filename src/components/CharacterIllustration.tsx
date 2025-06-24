import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the props for the component
interface CharacterIllustrationProps {
  /** The source URL for the character image */
  imageUrl: string;
  /** The alt text for the image, for accessibility */
  alt: string;
  /** Optional additional class names for custom styling */
  className?: string;
  /** The type of animation to apply */
  animation?: 'float' | 'none';
}

/**
 * A dedicated component for rendering custom, vibrant illustrations of Doraemon characters.
 * It includes a subtle, built-in floating animation to add life to the page.
 */
const CharacterIllustration: React.FC<CharacterIllustrationProps> = ({
  imageUrl,
  alt,
  className,
  animation = 'float',
}) => {
  console.log(`CharacterIllustration loaded for: ${alt}`);

  const containerVariants = {
    initial: {},
    animate: {},
  };

  const imageVariants = {
    initial: { y: 0 },
    animate: {
      y: ['-8px', '8px'],
    },
  };

  const imageTransition = {
    duration: 4,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  };

  const isAnimated = animation === 'float';

  return (
    <motion.div
      className={cn('relative flex justify-center items-center', className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.img
        src={imageUrl}
        alt={alt}
        className="w-full h-auto object-contain max-w-xs sm:max-w-sm md:max-w-md"
        variants={isAnimated ? imageVariants : undefined}
        transition={isAnimated ? imageTransition : undefined}
        // Prevents the image from being dragged, which can be distracting
        onDragStart={(e) => e.preventDefault()}
      />
    </motion.div>
  );
};

export default CharacterIllustration;