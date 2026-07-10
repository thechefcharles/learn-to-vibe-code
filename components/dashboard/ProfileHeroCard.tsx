'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProfileHeroCardProps {
  userName: string;
  xpLevel: number;
  xpPoints: number;
  streakCurrent: number;
  streakLongest: number;
}

export function ProfileHeroCard({
  userName,
  xpLevel,
  xpPoints,
  streakCurrent,
  streakLongest,
}: ProfileHeroCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const nextLevelXP = (xpLevel + 1) * 1000;
  const xpPercentage = (xpPoints % 1000) / 10;

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 hover:border-white/40 transition-all hover:bg-white/15"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Left: User Info */}
        <div className="flex flex-col items-center md:items-start gap-3 flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{userName}</h2>
            <div className="text-sm text-cyan-300 font-semibold">Level {xpLevel}</div>
          </div>
        </div>

        {/* Center: XP Progress */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Experience Progress</span>
            <span className="text-sm font-semibold text-cyan-300">{xpPoints % 1000} / 1000</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
            <motion.div
              initial={!prefersReducedMotion ? { width: 0 } : { width: `${xpPercentage}%` }}
              animate={{ width: `${xpPercentage}%` }}
              transition={!prefersReducedMotion ? { duration: 0.8, ease: 'easeOut' } : undefined}
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg"
            />
          </div>
        </div>

        {/* Right: Streak */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="text-3xl">🔥</div>
          <div className="text-center">
            <div className="text-sm text-gray-300">Current Streak</div>
            <div className="text-2xl font-bold text-orange-400">{streakCurrent}</div>
            <div className="text-xs text-gray-500">Best: {streakLongest}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
