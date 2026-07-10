'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BadgeData {
  badge_key: string;
  earned_at: string;
}

interface BadgeMetadata {
  key: string;
  name: string;
  description: string;
  icon: string;
}

interface BadgesShowcaseProps {
  badges: BadgeData[];
  allBadges: BadgeMetadata[];
}

export function BadgesShowcase({ badges, allBadges }: BadgesShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const earnedKeys = badges.map((b) => b.badge_key);

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full"
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-6 uppercase tracking-wide">
        Badges & Achievements
      </h3>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {allBadges.map((badge) => {
            const isEarned = earnedKeys.includes(badge.key);

            return (
              <motion.div
                key={badge.key}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                className={`flex-shrink-0 w-24 h-32 sm:w-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center gap-2 p-2 text-center transition-all ${
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400 shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 border-white/20 opacity-50'
                }`}
              >
                <div className="text-3xl sm:text-4xl">{badge.icon}</div>
                <div className="text-xs font-semibold text-white text-center line-clamp-2">
                  {badge.name}
                </div>
                {!isEarned && (
                  <div className="text-xs text-gray-400">Locked</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-400 mt-4">
        Scroll to see all badges. Complete challenges to unlock more achievements!
      </p>
    </motion.div>
  );
}
