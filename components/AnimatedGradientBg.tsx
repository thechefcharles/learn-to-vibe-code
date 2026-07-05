"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AnimatedGradientBg() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Rotating gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(45deg, transparent 0%, rgba(168, 85, 247, 0.05) 25%, transparent 50%, rgba(34, 197, 94, 0.05) 75%, transparent 100%)",
          backgroundSize: "400% 400%",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />

      {/* Subtle radial glow center */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />
    </div>
  );
}
