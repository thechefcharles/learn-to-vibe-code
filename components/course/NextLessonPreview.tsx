'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';

interface NextLessonPreviewProps {
  moduleId: number;
  lessonNumber: number;
}

export function NextLessonPreview({
  moduleId,
  lessonNumber,
}: NextLessonPreviewProps) {
  const prefersReducedMotion = usePreferredMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-lg border border-emerald-500/30 rounded-lg p-4 space-y-2"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
        Next Lesson
      </p>
      <Link
        href={`/course/${moduleId}`}
        className="block group"
      >
        <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition line-clamp-2">
          Module {String(moduleId).padStart(2, '0')} — Lesson {lessonNumber}
        </p>
        <p className="text-xs text-slate-400 group-hover:text-slate-300 transition mt-2">
          Continue learning →
        </p>
      </Link>
    </motion.div>
  );
}
