"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FlipCardProps {
  children: React.ReactNode;
  tooltipTitle: string;
  tooltipDescription: string;
  textColorClass?: string;
}

export function FlipCard({
  children,
  tooltipTitle,
  tooltipDescription,
  textColorClass = "text-white",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        style={{
          rotateY: isFlipped ? 180 : 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isFlipped ? [0, 360, 720, 1080, 180] : 0,
        }}
        transition={{
          duration: isFlipped ? 0.8 : 0.6,
          ease: "easeInOut",
        }}
        className="w-full"
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="w-full"
        >
          {children}
        </div>

        {/* Back - Exact same size as front */}
        <motion.div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          className={`w-full h-full flex flex-col justify-center items-center text-center p-5 ${textColorClass} overflow-hidden`}
        >
          <p className="font-bold text-base mb-3 leading-tight">{tooltipTitle}</p>
          <p className="text-xs leading-relaxed line-clamp-6">{tooltipDescription}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
