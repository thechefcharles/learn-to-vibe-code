"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

interface AnimatedStatCardProps {
  label: string;
  value: number;
  maxValue?: number;
  icon?: string;
  glowColor: "violet" | "orange" | "lime" | "pink";
  index: number;
  children?: ReactNode;
}

const glowColorMap = {
  violet: "border-violet/60 hover:border-violet shadow-lg hover:shadow-violet/40",
  orange: "border-orange-400/60 hover:border-orange-400 shadow-lg hover:shadow-orange-400/40",
  lime: "border-lime/60 hover:border-lime shadow-lg hover:shadow-lime/40",
  pink: "border-pink-400/60 hover:border-pink-400 shadow-lg hover:shadow-pink-400/40",
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
}: AnimatedStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className={`
        relative
        bg-white/10 backdrop-blur-2xl rounded-xl p-6
        border transition-all duration-300
        ${glowColorMap[glowColor]}
        hover:bg-white/15
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        className="relative z-10"
      >
        <div className="text-slate text-sm mb-3 font-medium flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {label}
        </div>

        <div className={`text-5xl font-bold font-display ${textColorMap[glowColor]} mb-4`}>
          <AnimatedCounter from={0} to={value} duration={2} />
          {maxValue && <span className="text-xl text-slate ml-1">/{maxValue}</span>}
        </div>

        {children}
      </motion.div>
    </motion.div>
  );
}
