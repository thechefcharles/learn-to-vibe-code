"use client";

import { motion } from "framer-motion";

interface KeyPointCardProps {
  keyPoint: string;
}

export function KeyPointCard({ keyPoint }: KeyPointCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg p-6 mb-8 border backdrop-blur-md bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-cyan-500/30"
    >
      <p className="text-xs text-cyan-400 uppercase tracking-wider mb-3 font-semibold">
        💡 Key Insight
      </p>
      <p className="text-sm text-slate-200 leading-relaxed">
        {keyPoint}
      </p>
    </motion.div>
  );
}
