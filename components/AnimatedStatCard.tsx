"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { AnimatedCounter } from "./AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FlipCard } from "./FlipCard";

interface AnimatedStatCardProps {
  label: string;
  value: number;
  maxValue?: number;
  icon?: string;
  glowColor: "violet" | "orange" | "lime" | "pink";
  index: number;
  children?: ReactNode;
  tooltipTitle?: string;
  tooltipDescription?: string;
}

const solidColorMap = {
  violet: "bg-violet-600 hover:bg-violet-700",
  orange: "bg-orange-500 hover:bg-orange-600",
  lime: "bg-lime-500 hover:bg-lime-600",
  pink: "bg-pink-500 hover:bg-pink-600",
};

export function AnimatedStatCard({
  label,
  value,
  maxValue,
  icon,
  glowColor,
  index,
  children,
  tooltipTitle,
  tooltipDescription,
}: AnimatedStatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const bgColor = solidColorMap[glowColor];
  const prefersReducedMotion = useReducedMotion();

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 },
            }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative
        ${bgColor} rounded-xl p-6
        transition-all duration-300
        shadow-lg hover:shadow-2xl
        overflow-hidden
        h-56 flex flex-col justify-center
      `}
    >

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        className="relative z-10"
      >
        <motion.div
          className="text-white text-sm mb-3 font-medium flex items-center gap-2"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {icon && (
            <motion.span
              className="text-lg"
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 12 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          )}
          {label}
        </motion.div>

        <div className="text-5xl font-bold font-display text-white mb-4">
          <motion.span>
            <AnimatedCounter from={0} to={value} duration={2} />
          </motion.span>
          {maxValue && <span className="text-xl text-white/80 ml-1">/{maxValue}</span>}
        </div>

        {children}
      </motion.div>
    </motion.div>
  );

  if (tooltipTitle && tooltipDescription) {
    return (
      <FlipCard tooltipTitle={tooltipTitle} tooltipDescription={tooltipDescription}>
        {cardContent}
      </FlipCard>
    );
  }

  return cardContent;
}
