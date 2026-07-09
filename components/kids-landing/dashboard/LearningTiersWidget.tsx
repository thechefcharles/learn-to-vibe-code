'use client';

import { useState } from 'react';
import { MODULE_TIERS } from '@/lib/kids-landing/content';
import { motion, AnimatePresence } from 'framer-motion';

const TIER_COLORS: Record<string, { gradient: string; bg: string; style: React.CSSProperties }> = {
  foundations: { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))' } },
  building: { gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))' } },
  production: { gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(5, 150, 105, 0.15))' } },
  landscape: { gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(239, 68, 68, 0.15))' } },
};

export function LearningTiersWidget() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  // Filter to show only the 4 main tiers, excluding capstone
  const mainTiers = Object.entries(MODULE_TIERS).filter(([key]) => key !== 'capstone');

  const toggleTier = (tierKey: string) => {
    setExpandedTier(expandedTier === tierKey ? null : tierKey);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-base text-gray-400 uppercase tracking-wide">4 Learning Tiers</div>

      {/* 2x2 Grid of Tier Cards */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {mainTiers.map(([key, tier]) => (
          <motion.button
            key={key}
            onClick={() => toggleTier(key)}
            className={`
              p-4 rounded-xl backdrop-blur-lg
              text-white font-bold text-base
              border border-white/30
              hover:shadow-2xl hover:border-white/50 transition-all duration-300
              flex flex-col items-center justify-center
              ${expandedTier === key ? 'ring-2 ring-white/50' : ''}
            `}
            style={{
              ...TIER_COLORS[key].style,
              boxShadow: expandedTier === key ? '0 0 20px rgba(255,255,255,0.3)' : undefined,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">{tier.name}</div>
            <div className="text-xs opacity-80 mt-1">{tier.modules.length} modules</div>
          </motion.button>
        ))}
      </div>

      {/* Expanded Details */}
      <AnimatePresence mode="wait">
        {expandedTier && (
          <motion.div
            key={`expanded-${expandedTier}`}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5`}
          >
            <div className="font-bold mb-2 text-sm text-gray-200">
              {MODULE_TIERS[expandedTier as keyof typeof MODULE_TIERS].name} Modules:
            </div>
            <div className="space-y-1">
              {MODULE_TIERS[expandedTier as keyof typeof MODULE_TIERS].modules.map((mod) => (
                <div key={mod} className="text-xs text-gray-300">
                  Module {mod}: {mod === 0 ? 'Setup & Tools' : mod === 1 ? 'HTML Basics' : mod === 2 ? 'CSS Fundamentals' : mod === 3 ? 'JavaScript Intro' : '...'}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
