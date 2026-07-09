'use client';

import { useState } from 'react';
import { MODULE_TIERS } from '@/lib/kids-landing/content';
import { motion } from 'framer-motion';

const TIER_COLORS: Record<string, { gradient: string; bg: string; style: React.CSSProperties }> = {
  foundations: { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))' } },
  building: { gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))' } },
  production: { gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(5, 150, 105, 0.15))' } },
  landscape: { gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-600/20', style: { backgroundImage: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(239, 68, 68, 0.15))' } },
};

const MODULE_NAMES: Record<number, string> = {
  0: 'Setup & Tools',
  1: 'HTML Basics',
  2: 'CSS Fundamentals',
  3: 'JavaScript Intro',
  4: 'React Basics',
  5: 'Components & State',
  6: 'Design & UX',
  7: 'Databases',
  8: 'Full Stack',
  9: 'APIs & Integration',
  10: 'Deployment',
  11: 'Security & Auth',
  12: 'Production Ready',
  13: 'Testing',
  14: 'Frameworks',
  15: 'Future of Coding',
  16: 'Capstone',
};

export function LearningTiersWidget() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const mainTiers = Object.entries(MODULE_TIERS).filter(([key]) => key !== 'capstone');

  const toggleFlip = (tierKey: string) => {
    setFlipped(prev => ({ ...prev, [tierKey]: !prev[tierKey] }));
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-base text-gray-400 uppercase tracking-wide">4 Learning Tiers</div>

      {/* Centered 2x2 Grid of Flip Cards */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {mainTiers.map(([key, tier]) => (
            <motion.button
              key={key}
              onClick={() => toggleFlip(key)}
              className="h-32 cursor-pointer focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotateY: flipped[key] ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full relative"
                style={{ perspective: '1000px' }}
              >
                {/* Front of card */}
                <motion.div
                  className="absolute inset-0 p-4 rounded-xl backdrop-blur-lg border border-white/30 flex flex-col items-center justify-center text-white font-bold backface-hidden"
                  style={{
                    ...TIER_COLORS[key].style,
                    backfaceVisibility: 'hidden',
                  }}
                  animate={{ opacity: flipped[key] ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center text-base">{tier.name}</div>
                  <div className="text-xs opacity-80 mt-1">{tier.modules.length} modules</div>
                </motion.div>

                {/* Back of card */}
                <motion.div
                  className="absolute inset-0 p-3 rounded-xl backdrop-blur-lg border border-white/30 flex flex-col items-center justify-center bg-white/5 backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  animate={{ opacity: flipped[key] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs font-semibold text-white text-center overflow-y-auto max-h-full">
                    {tier.modules.map((modNum) => (
                      <div key={modNum} className="mb-1.5 text-sm">
                        {MODULE_NAMES[modNum]}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
