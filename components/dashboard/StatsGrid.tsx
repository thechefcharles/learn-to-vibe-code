'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StatsGridProps {
  completedModules: number;
  totalModules: number;
  badgeCount: number;
  xpLevel: number;
  capstoneUnlocked: boolean;
}

export function StatsGrid({
  completedModules,
  totalModules,
  badgeCount,
  xpLevel,
  capstoneUnlocked,
}: StatsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const progressPercentage = (completedModules / totalModules) * 100;

  const stats = [
    {
      title: 'Modules',
      value: `${completedModules}/${totalModules}`,
      icon: '📚',
      color: 'from-cyan-500 to-blue-600',
      subtext: `${Math.round(progressPercentage)}% complete`,
    },
    {
      title: 'Badges Earned',
      value: badgeCount.toString(),
      icon: '🏆',
      color: 'from-purple-500 to-pink-600',
      subtext: 'Keep learning to earn more',
    },
    {
      title: 'Your Level',
      value: xpLevel.toString(),
      icon: '⭐',
      color: 'from-orange-500 to-red-600',
      subtext: 'Vibe Coder in Training',
    },
    {
      title: 'Capstone',
      value: capstoneUnlocked ? '🔓' : '🔒',
      icon: '🎯',
      color: capstoneUnlocked ? 'from-green-500 to-emerald-600' : 'from-gray-500 to-slate-600',
      subtext: capstoneUnlocked ? 'Unlocked! Ready to submit.' : 'Complete Module 15 to unlock',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
          animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
          transition={!prefersReducedMotion ? { duration: 0.5, delay: idx * 0.1 } : undefined}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:border-white/40 transition-all hover:bg-white/15 group"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">
              {stat.title}
            </h3>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="mb-2">
            <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
          </div>
          <p className="text-xs text-gray-400">{stat.subtext}</p>
        </motion.div>
      ))}
    </div>
  );
}
