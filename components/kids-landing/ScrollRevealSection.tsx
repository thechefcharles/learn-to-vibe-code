'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  delay?: number; // Delay in seconds (default 0)
  stagger?: boolean; // Stagger children animations (default false)
  className?: string; // Wrapper className
}

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  delay = 0,
  stagger = false,
  className = '',
}) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });
  const prefersReducedMotion = useReducedMotion();

  // Container variants: fade in + slide up
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
        delay: prefersReducedMotion ? 0 : delay,
        staggerChildren: stagger ? 0.15 : 0,
      },
    },
  };

  // Item variants for staggered children
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  // If reduced motion is preferred, skip animations
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // If stagger is enabled, render children as individual motion items
  if (stagger) {
    const childArray = React.Children.toArray(children);
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {childArray.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Default: single container animation without stagger
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
