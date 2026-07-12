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
      className="rounded-lg p-6 mb-8 border backdrop-blur-md bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-cyan-500/30 relative overflow-hidden"
      style={{
        borderLeft: "4px solid transparent",
        backgroundClip: "padding-box",
        backgroundImage: "linear-gradient(to bottom, #06b6d4, #a78bfa)"
      }}
    >
      {/* Left accent border as overlay */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #06b6d4, #a78bfa)"
        }}
      />
      <div className="pl-3">
        <p className="text-xs text-cyan-300 uppercase tracking-wider mb-3 font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          ✨ KEY INSIGHT
        </p>
        <p className="text-sm text-slate-200 leading-relaxed">
          {keyPoint}
        </p>
      </div>
    </motion.div>
  );
}
