'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Badge } from './BadgeDesign';

type CeremonyType = 'module-complete' | 'level-up' | 'capstone-unlock' | 'badge-earn';

interface UnlockCeremonyProps {
  isOpen: boolean;
  onClose: () => void;
  type: CeremonyType;
  title: string;
  subtitle?: string;
  badgeType?: string;
  badgeTier?: 'silver' | 'gold' | 'platinum';
  details?: string[];
}

const CEREMONY_CONFIG = {
  'module-complete': {
    bgGradient: 'from-blue-600 to-purple-600',
    particleColor: 'text-blue-300',
    icon: '✅',
  },
  'level-up': {
    bgGradient: 'from-yellow-500 to-pink-500',
    particleColor: 'text-yellow-200',
    icon: '⭐',
  },
  'capstone-unlock': {
    bgGradient: 'from-purple-600 to-indigo-600',
    particleColor: 'text-purple-300',
    icon: '🏆',
  },
  'badge-earn': {
    bgGradient: 'from-amber-500 to-orange-600',
    particleColor: 'text-amber-200',
    icon: '🎖️',
  },
};

// Particle component for confetti effect
function Particle() {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 0.5;
  const randomDuration = 2 + Math.random() * 1;

  return (
    <motion.div
      className="fixed text-2xl pointer-events-none"
      initial={{ x: '50vw', y: '50vh', opacity: 1 }}
      animate={{
        x: `${randomX}vw`,
        y: '-10vh',
        opacity: 0,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: 'easeOut',
      }}
    >
      ✨
    </motion.div>
  );
}

export function UnlockCeremony({
  isOpen,
  onClose,
  type,
  title,
  subtitle,
  badgeType,
  badgeTier,
  details,
}: UnlockCeremonyProps) {
  const [particles, setParticles] = useState<number[]>([]);
  const config = CEREMONY_CONFIG[type];

  useEffect(() => {
    if (isOpen) {
      // Generate 20 particles
      setParticles(Array.from({ length: 20 }, (_, i) => i));

      // Auto-close after 5 seconds
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Ceremony content */}
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br ${config.bgGradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Particles */}
            {particles.map((i) => (
              <Particle key={i} />
            ))}

            {/* Main content */}
            <motion.div
              className="text-center text-white max-w-2xl mx-auto px-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className="text-7xl mb-6"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {config.icon}
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-5xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {title}
              </motion.h2>

              {/* Subtitle */}
              {subtitle && (
                <motion.p
                  className="text-2xl mb-8 text-white/90"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Badge (if applicable) */}
              {badgeType && badgeTier && (
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-6">
                    <Badge type={badgeType as any} tier={badgeTier} size="lg" />
                  </div>
                </motion.div>
              )}

              {/* Details */}
              {details && details.length > 0 && (
                <motion.div
                  className="space-y-2 text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {details.map((detail, idx) => (
                    <p key={idx} className="text-white/80">
                      ✨ {detail}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Dismiss hint */}
              <motion.p
                className="text-sm text-white/60 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Click anywhere to dismiss
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to trigger unlock ceremony
export function useUnlockCeremony() {
  const [ceremony, setCeremony] = useState<UnlockCeremonyProps & { isOpen: boolean }>({
    isOpen: false,
    onClose: () => {},
    type: 'module-complete',
    title: '',
  });

  const trigger = (config: Omit<UnlockCeremonyProps, 'isOpen' | 'onClose'>) => {
    setCeremony({
      ...config,
      isOpen: true,
      onClose: () => setCeremony((prev) => ({ ...prev, isOpen: false })),
    });
  };

  return {
    ceremony: { ...ceremony, onClose: ceremony.onClose },
    trigger,
  };
}
