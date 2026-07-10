"use client";

import { motion } from "framer-motion";

interface XPRewardBadgeProps {
  xp: number;
  type?: "preview" | "earned";
}

export function XPRewardBadge({ xp, type = "preview" }: XPRewardBadgeProps) {
  const isEarned = type === "earned";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
        isEarned
          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
      }`}
    >
      <span>⭐</span>
      <span>+{xp} XP</span>
    </motion.div>
  );
}
