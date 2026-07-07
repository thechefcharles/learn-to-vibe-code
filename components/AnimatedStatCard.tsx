"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { AnimatedCounter } from "./AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVersion } from "@/lib/VersionContext";
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
  violet: "bg-violet-500 hover:bg-violet-600",
  orange: "bg-orange-400 hover:bg-orange-500",
  lime: "bg-lime-400 hover:bg-lime-500",
  pink: "bg-pink-400 hover:bg-pink-500",
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
  const { version } = useVersion();
  const bgColor = solidColorMap[glowColor];
  const prefersReducedMotion = useReducedMotion();
  const isKids = version === "kids";

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
              y: -5,
              scale: 1.01,
              transition: { duration: 0.3 },
            }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative
        ${bgColor} ${isKids ? "rounded-2xl p-8" : "rounded-xl p-6"}
        transition-all duration-300
        shadow-lg hover:shadow-2xl
        overflow-hidden
        ${isKids ? "h-72" : "h-56"} flex flex-col justify-center
      `}
    >

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        className="relative z-10 w-full"
      >
        <motion.div
          className={`text-white ${isKids ? "text-lg" : "text-sm"} mb-3 font-medium flex items-center gap-2`}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {icon && (
            <motion.span
              className={isKids ? "text-2xl" : "text-lg"}
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

        <div className={`${isKids ? "text-7xl" : "text-5xl"} font-bold font-display text-white mb-4`}>
          <motion.span>
            <AnimatedCounter from={0} to={value} duration={2} />
          </motion.span>
          {maxValue && <span className={`${isKids ? "text-3xl" : "text-xl"} text-white/80 ml-1`}>/{maxValue}</span>}
        </div>

        {children}
      </motion.div>
    </motion.div>
  );

  if (tooltipTitle && tooltipDescription) {
    const textColorClass = {
      violet: "text-violet-600",
      orange: "text-orange-500",
      lime: "text-lime-600",
      pink: "text-pink-600",
    }[glowColor];

    return (
      <FlipCard
        tooltipTitle={tooltipTitle}
        tooltipDescription={tooltipDescription}
        textColorClass={textColorClass}
      >
        {cardContent}
      </FlipCard>
    );
  }

  return cardContent;
}
