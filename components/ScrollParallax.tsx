"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  index?: number;
  className?: string;
}

export function ScrollParallax({
  children,
  offset = 30,
  index = 0,
  className = "",
}: ScrollParallaxProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable parallax if reduced motion is preferred
  const parallaxY = prefersReducedMotion ? 0 : scrollY * 0.3;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
            }
          : { opacity: 0, y: 30 }
      }
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      }}
      style={{
        y: parallaxY,
      }}
    >
      {children}
    </motion.div>
  );
}
