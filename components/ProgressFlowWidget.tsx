"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Stage {
  id: number;
  label: string;
  description: string;
}

const stages: Stage[] = [
  {
    id: 1,
    label: "Module",
    description: "Access course content and learning materials",
  },
  {
    id: 2,
    label: "Quiz",
    description: "Take the module assessment and demonstrate knowledge",
  },
  {
    id: 3,
    label: "Pass (80%)",
    description: "Achieve 80% or higher score to pass and earn XP",
  },
  {
    id: 4,
    label: "Unlock Next",
    description: "Submit deliverable to unlock the next module",
  },
  {
    id: 5,
    label: "Capstone",
    description: "After Module 15, access the capstone project challenge",
  },
  {
    id: 6,
    label: "Certificate",
    description: "Earn your verifiable completion certificate and 9.3 CEUs",
  },
];

export function ProgressFlowWidget() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 overflow-hidden"
    >
      {/* Title */}
      <motion.h2
        className="text-2xl font-bold font-display text-white mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Your Learning Journey
      </motion.h2>

      {/* Flow Container with horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex justify-center min-w-min px-4 gap-0">
          {/* SVG for connecting lines */}
          <svg
            className="absolute top-1/2 left-0 right-0 h-1 pointer-events-none hidden md:block"
            style={{ transform: "translateY(-50%)" }}
            preserveAspectRatio="none"
            viewBox={`0 0 ${(stages.length - 1) * 200} 4`}
          >
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" /> {/* cyan */}
                <stop offset="100%" stopColor="#A78BFA" /> {/* violet-light */}
              </linearGradient>
            </defs>
            {stages.slice(0, -1).map((_, index) => (
              <rect
                key={`line-${index}`}
                x={index * 200}
                y="0"
                width="200"
                height="4"
                fill="url(#flowGradient)"
                opacity="0.5"
              />
            ))}
          </svg>

          {/* Stage Circles */}
          <div className="flex items-center gap-0 md:gap-0 relative z-10">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.1 + index * 0.1,
                  duration: 0.5,
                }}
              >
                {/* Stage Circle */}
                <motion.button
                  onClick={() =>
                    setActiveStage(activeStage === stage.id ? null : stage.id)
                  }
                  className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet to-violet-light text-white font-bold text-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-violet/50 flex-shrink-0"
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.15,
                          transition: { duration: 0.2 },
                        }
                  }
                  whileTap={
                    prefersReducedMotion
                      ? {}
                      : { scale: 0.95, transition: { duration: 0.1 } }
                  }
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-violet-light opacity-0"
                    animate={{
                      opacity: activeStage === stage.id ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Number */}
                  <span className="relative z-10">{stage.id}</span>
                </motion.button>

                {/* Label */}
                <motion.p
                  className="text-xs font-semibold text-white mt-3 text-center w-20 break-words"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
                >
                  {stage.label}
                </motion.p>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{
                    opacity: activeStage === stage.id ? 1 : 0,
                    scale: activeStage === stage.id ? 1 : 0.8,
                    y: activeStage === stage.id ? 10 : -10,
                    pointerEvents:
                      activeStage === stage.id ? "auto" : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-24 z-50 bg-white/20 backdrop-blur-md rounded-xl p-4 w-max max-w-xs shadow-2xl border border-white/40"
                >
                  <p className="text-sm font-bold text-violet mb-2">
                    {stage.label}
                  </p>
                  <p className="text-xs text-slate leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Tooltip arrow */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/95 rotate-45 border-t border-l border-violet/20" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator (mobile only) */}
      <motion.div
        className="flex justify-center gap-1 mt-6 md:hidden"
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-xs text-cyan-400 font-semibold">Swipe to explore →</span>
      </motion.div>

      {/* Custom scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
