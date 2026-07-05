"use client";

import { motion } from "framer-motion";

interface AnimatedProgressRingProps {
  current: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

export function AnimatedProgressRing({
  current,
  max,
  size = 100,
  strokeWidth = 6,
}: AnimatedProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(current / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="absolute inset-0 transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(124, 58, 237, 0.2)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 2.5,
              delay: 0.8,
              ease: "easeOut",
            }}
            style={{
              filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.6))",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="text-center"
          >
            <div className="text-xl font-bold text-violet">{Math.round(progress * 100)}%</div>
            <div className="text-xs text-slate">{current}/{max}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
