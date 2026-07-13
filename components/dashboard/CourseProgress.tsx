'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ModuleProgressItem {
  id: string;
  module_id: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface CourseProgressProps {
  progress: ModuleProgressItem[];
  totalModules: number;
}

export function CourseProgress({ progress, totalModules }: CourseProgressProps) {
  const prefersReducedMotion = useReducedMotion();

  const getModuleStatus = (moduleId: number) => {
    const item = progress.find((p) => p.module_id === moduleId);
    return item?.status || 'not_started';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-400';
      case 'in_progress':
        return 'bg-cyan-500 border-cyan-400 animate-pulse';
      default:
        return 'bg-white/20 border-white/30';
    }
  };

  const getHref = (moduleId: number, status: string) => {
    const baseHref = `/course/${String(moduleId).padStart(2, '0')}`;
    // Add preview mode for incomplete modules
    if (status !== 'completed') {
      return `${baseHref}?preview=true`;
    }
    return baseHref;
  };

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 sm:p-8 w-full"
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-6 uppercase tracking-wide">
        Your Learning Path
      </h3>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
        {Array.from({ length: totalModules }).map((_, idx) => {
          const moduleId = idx;
          const status = getModuleStatus(moduleId);
          const displayNumber = String(moduleId).padStart(2, '0');

          return (
            <Link
              key={moduleId}
              href={getHref(moduleId, status)}
            >
              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.1 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
                className={`w-full aspect-square rounded-lg border-2 ${getStatusColor(
                  status,
                )} flex items-center justify-center cursor-pointer transition-all hover:border-white/60 font-bold text-xs sm:text-sm text-white shadow-lg`}
              >
                {displayNumber}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 bg-green-500 border-green-400" />
          <span className="text-gray-300">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 bg-cyan-500 border-cyan-400 animate-pulse" />
          <span className="text-gray-300">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 bg-white/20 border-white/30" />
          <span className="text-gray-300">Locked</span>
        </div>
      </div>
    </motion.div>
  );
}
