'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleEffect } from './ParticleEffect';
import { playSound } from '@/lib/sounds';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface FeatureData {
  id: string;
  title: string;
  copy: string;
  hoverEffect: 'dollar-signs-away' | 'progress-animate' | 'trophy-animate' | 'certificate-slide';
  icon: 'dollar' | 'chart' | 'trophy' | 'certificate';
}

interface InteractiveFeatureCardProps {
  feature: FeatureData;
}

/**
 * Icon mapping: simple emoji or SVG symbols
 */
const ICON_MAP: Record<FeatureData['icon'], string> = {
  dollar: '$',
  chart: '📊',
  trophy: '🏆',
  certificate: '📜',
};

export const InteractiveFeatureCard: React.FC<InteractiveFeatureCardProps> = ({
  feature,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [particleTrigger, setParticleTrigger] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return;

    setIsHovering(true);
    playSound('hover');
    setParticleTrigger(true);

    // Reset particle trigger after burst
    setTimeout(() => setParticleTrigger(false), 100);

    // Animate progress bar
    if (feature.hoverEffect === 'progress-animate') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30 + 10;
        if (progress >= 100) {
          setProgressValue(100);
          clearInterval(interval);
        } else {
          setProgressValue(progress);
        }
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setProgressValue(0);
  };

  const icon = ICON_MAP[feature.icon];

  return (
    <>
      <motion.div
        className="relative flex flex-col items-center justify-center p-6 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm hover:border-cyan-400/60 transition-colors duration-300 cursor-pointer h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={isHovering && !prefersReducedMotion ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Icon container with rotation */}
        <motion.div
          className="text-5xl mb-4 relative"
          animate={isHovering && !prefersReducedMotion ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-3 text-center"
          animate={isHovering && !prefersReducedMotion ? { opacity: 1 } : { opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm text-white/70 text-center leading-relaxed"
          animate={isHovering && !prefersReducedMotion ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        >
          {feature.copy}
        </motion.p>

        {/* Feature-specific hover effects */}
        {isHovering && (
          <>
            {/* Dollar: Free indicator */}
            {feature.hoverEffect === 'dollar-signs-away' && (
              <motion.div
                className="mt-4 px-3 py-2 rounded-lg bg-green-500/20 border border-green-400 text-green-400 text-sm font-semibold"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                ✓ Free!
              </motion.div>
            )}

            {/* Chart: Progress bar */}
            {feature.hoverEffect === 'progress-animate' && (
              <motion.div
                className="mt-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressValue}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  />
                </div>
                <p className="text-xs text-cyan-400 mt-2 text-center">
                  {Math.floor(progressValue)}% Complete
                </p>
              </motion.div>
            )}

            {/* Trophy: Bounce animation */}
            {feature.hoverEffect === 'trophy-animate' && (
              <motion.div
                className="mt-4 text-4xl"
                animate={{
                  y: [0, -12, 0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              >
                🏆
              </motion.div>
            )}

            {/* Certificate: Slide-in preview */}
            {feature.hoverEffect === 'certificate-slide' && (
              <motion.div
                className="mt-4 p-4 rounded-lg bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-amber-400/50 w-full max-w-xs"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                  <span>📜</span>
                  <span>Certificate Unlocked</span>
                </div>
                <p className="text-xs text-amber-200/70 mt-2">
                  Verify your achievement with a shareable certificate
                </p>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Particle burst effect */}
      <ParticleEffect
        trigger={particleTrigger}
        count={6}
        color="#00d9ff"
        duration={0.6}
      />
    </>
  );
};

export default InteractiveFeatureCard;
