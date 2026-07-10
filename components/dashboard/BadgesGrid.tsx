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

interface BadgesGridProps {
  badges: BadgeData[];
  allBadges: BadgeMetadata[];
}

export function BadgesGrid({ badges, allBadges }: BadgesGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const earnedKeys = badges.map((b) => b.badge_key);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {allBadges.map((badge, idx) => {
        const isEarned = earnedKeys.includes(badge.key);
        const earnedBadge = badges.find((b) => b.badge_key === badge.key);

        return (
          <motion.div
            key={badge.key}
            initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
            animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
            transition={!prefersReducedMotion ? { duration: 0.5, delay: idx * 0.1 } : undefined}
            className={`rounded-xl border-2 p-6 flex flex-col items-center gap-4 text-center transition-all ${
              isEarned
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50'
                : 'bg-white/5 border-white/20 opacity-60 hover:opacity-80'
            }`}
          >
            <div className="text-5xl">{badge.icon}</div>
            <div>
              <h3 className="font-bold text-white text-lg">{badge.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
            </div>
            {isEarned && earnedBadge && (
              <div className="text-xs text-yellow-300 font-semibold">
                Earned {new Date(earnedBadge.earned_at).toLocaleDateString()}
              </div>
            )}
            {!isEarned && (
              <div className="text-xs text-gray-500 font-semibold">Locked</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
