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
  const [titleHover, setTitleHover] = useState(false);

  const mainTiers = Object.entries(MODULE_TIERS).filter(([key]) => key !== 'capstone');

  return (
    <div className="flex flex-col h-full w-full">
      {/* Centered heading */}
      <motion.div
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="text-center uppercase tracking-wide mb-4 cursor-pointer font-bold text-xl"
        style={{
          background: titleHover
            ? 'linear-gradient(to right, rgb(34, 211, 238), rgb(168, 85, 247), rgb(236, 72, 153))'
            : 'transparent',
          backgroundClip: titleHover ? 'text' : 'unset',
          WebkitBackgroundClip: titleHover ? 'text' : 'unset',
          WebkitTextFillColor: titleHover ? 'transparent' : 'white',
          color: titleHover ? 'transparent' : 'white',
        }}
      >
        4 Learning Tiers
      </motion.div>

      {/* Centered 2x2 Grid of Flip Cards */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs h-full">
          {mainTiers.map(([key, tier]) => (
            <motion.div
              key={key}
              onMouseEnter={() => setFlipped(prev => ({ ...prev, [key]: true }))}
              onMouseLeave={() => setFlipped(prev => ({ ...prev, [key]: false }))}
              className="relative h-48 cursor-pointer"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                animate={{ rotateY: flipped[key] ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 p-4 rounded-xl backdrop-blur-lg border border-white/30 flex flex-col items-center justify-center text-white font-bold"
                  style={{
                    ...TIER_COLORS[key].style,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-center text-base">{tier.name}</div>
                  <div className="text-xs opacity-80 mt-1">{tier.modules.length} modules</div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 p-3 rounded-xl backdrop-blur-lg border border-white/30 bg-white/5 overflow-y-auto flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="space-y-1.5 text-center w-full">
                    {tier.modules.map((modNum) => (
                      <div key={modNum} className="text-xs leading-tight">
                        <span className="text-cyan-300 font-bold">{modNum}.</span>
                        <span className="text-white ml-1">{MODULE_NAMES[modNum]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
