"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FlipCardProps {
  children: React.ReactNode;
  tooltipTitle: string;
  tooltipDescription: string;
}

export function FlipCard({
  children,
  tooltipTitle,
  tooltipDescription,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1000px" }}
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
        className="w-full h-full"
      >
        {/* Front */}
        <div style={{ backfaceVisibility: "hidden" }} className="w-full h-full">
          {children}
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-8"
        >
          {children}
        </div>
      </motion.div>

      {/* Back content overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isFlipped ? 1 : 0,
          pointerEvents: isFlipped ? "auto" : "none",
        }}
        transition={{ delay: isFlipped ? 0.6 : 0, duration: 0.2 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-5 text-white overflow-hidden"
      >
        <p className="font-bold text-base mb-3 leading-tight">{tooltipTitle}</p>
        <p className="text-xs leading-relaxed line-clamp-6">{tooltipDescription}</p>
      </motion.div>
    </div>
  );
}
