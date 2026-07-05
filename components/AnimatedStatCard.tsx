"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { AnimatedCounter } from "./AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { InfoTooltip } from "./InfoTooltip";

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

const glowColorMap = {
  violet: {
    border: "border-violet/60",
    hoverBorder: "hover:border-violet",
    shadow: "hover:shadow-violet/60",
  },
  orange: {
    border: "border-orange-400/60",
    hoverBorder: "hover:border-orange-400",
    shadow: "hover:shadow-orange-400/60",
  },
  lime: {
    border: "border-lime/60",
    hoverBorder: "hover:border-lime",
    shadow: "hover:shadow-lime/60",
  },
  pink: {
    border: "border-pink-400/60",
    hoverBorder: "hover:border-pink-400",
    shadow: "hover:shadow-pink-400/60",
  },
};

const textColorMap = {
  violet: "text-violet",
  orange: "text-orange-400",
  lime: "text-lime",
  pink: "text-pink-400",
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
  const colors = glowColorMap[glowColor];
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
        bg-white/10 backdrop-blur-2xl rounded-xl p-6
        border-2 transition-all duration-300
        ${colors.border} ${colors.hoverBorder}
        shadow-lg hover:shadow-2xl ${colors.shadow}
        hover:bg-white/20
        overflow-hidden
      `}
    >
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/10 via-transparent to-transparent pointer-events-none"
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
        }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
      />

      {/* Glow line effect */}
      <motion.div
        className={`absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-${glowColor}/50 to-transparent pointer-events-none`}
        animate={{
          opacity: isHovered ? 1 : 0.3,
          height: isHovered ? 2 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        className="relative z-10"
      >
        <motion.div
          className="text-slate text-sm mb-3 font-medium flex items-center gap-2"
          animate={{
            scale: isHovered ? 1.05 : 1,
            color: isHovered ? `var(--color-${glowColor})` : undefined,
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

        <div className={`text-5xl font-bold font-display ${textColorMap[glowColor]} mb-4`}>
          <motion.span
            animate={{
              textShadow: isHovered
                ? `0 0 20px rgba(124, 58, 237, 0.6), 0 0 40px rgba(124, 58, 237, 0.3)`
                : "0 0 0px rgba(124, 58, 237, 0)",
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCounter from={0} to={value} duration={2} />
          </motion.span>
          {maxValue && <span className="text-xl text-slate ml-1">/{maxValue}</span>}
        </div>

        {children}
      </motion.div>
    </motion.div>
  );

  if (tooltipTitle && tooltipDescription) {
    return (
      <InfoTooltip title={tooltipTitle} description={tooltipDescription}>
        {cardContent}
      </InfoTooltip>
    );
  }

  return cardContent;
}
