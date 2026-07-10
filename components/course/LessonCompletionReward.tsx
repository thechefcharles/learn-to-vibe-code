'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';

const Confetti = dynamic(() => import('@/components/Confetti').then(mod => mod.Confetti), {
  ssr: false,
});

interface LessonCompletionRewardProps {
  xpReward: number;
  lessonTitle: string;
  isKids: boolean;
  onClose?: () => void;
}

export function LessonCompletionReward({
  xpReward,
  lessonTitle,
  isKids,
  onClose,
}: LessonCompletionRewardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = usePreferredMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <>
      {!prefersReducedMotion && <Confetti />}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className={`fixed bottom-8 right-8 p-6 rounded-lg shadow-2xl z-50 ${
          isKids
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white'
            : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white'
        }`}
      >
        <div className="font-bold text-lg mb-2">🎉 Lesson Complete!</div>
        <div className="text-sm mb-3">{lessonTitle}</div>
        <div className="text-2xl font-bold">+{xpReward} XP</div>
      </motion.div>
    </>
  );
}
