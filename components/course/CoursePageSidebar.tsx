'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLessonStats } from '@/lib/hooks/useLessonStats';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { BookmarkButton } from '@/components/course/BookmarkButton';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';
import { NextLessonPreview } from '@/components/course/NextLessonPreview';
import type { User } from '@supabase/supabase-js';

interface CoursePageSidebarProps {
  userId?: string;
  moduleId: number;
  lessonNumber: number;
  lessonTitle: string;
  estimatedMinutes: number;
  user: User | null;
}

export function CoursePageSidebar({
  userId,
  moduleId,
  lessonNumber,
  lessonTitle,
  estimatedMinutes,
  user,
}: CoursePageSidebarProps) {
  const stats = useLessonStats(user);
  const { bookmarks } = useBookmarks();
  const prefersReducedMotion = usePreferredMotion();

  // Define level tiers
  const getLevelTier = (level: number): string => {
    if (level <= 3) return 'Foundations';
    if (level <= 6) return 'Building';
    if (level <= 9) return 'Production';
    return 'Landscape';
  };

  const levelTier = getLevelTier(stats.level);
  const levelPercentage = ((stats.xp % 1000) / 1000) * 100;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  return (
    <motion.aside
      className="hidden lg:block sticky top-20 h-fit w-72 flex-shrink-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4">
        {/* User Stats Card */}
        {user && !stats.loading && (
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-lg p-4 space-y-3"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Your Stats
            </h3>

            {/* XP & Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400" aria-label="Current level">Level</span>
                <span className="text-lg font-bold text-white" aria-label={`Level ${stats.level}`}>{stats.level}</span>
              </div>
              <div className="text-xs text-slate-500" aria-label={`Tier: ${levelTier}`}>{levelTier}</div>

              {/* XP Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">XP</span>
                  <span className="text-slate-500">{stats.xp % 1000} / 1000</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    role="progressbar"
                    aria-valuenow={levelPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`XP progress: ${levelPercentage}% to next level`}
                    initial={{ width: 0 }}
                    animate={{ width: `${levelPercentage}%` }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Streak & Badges */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400" aria-label="Current streak">🔥 Streak</span>
                <span className="font-semibold text-orange-400" aria-label={`${stats.streakCurrent} day streak`}>{stats.streakCurrent}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400" aria-label="Badges earned">🏆 Badges</span>
                <span className="font-semibold text-emerald-400" aria-label={`${stats.badgesCount} badges earned`}>{stats.badgesCount}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {stats.loading && (
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-lg p-4 space-y-3"
          >
            <div className="h-4 bg-slate-700/50 rounded animate-pulse" />
            <div className="h-4 bg-slate-700/50 rounded animate-pulse" />
          </motion.div>
        )}

        {/* Time Estimate Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg border border-indigo-500/30 rounded-lg p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">
                Time Estimate
              </p>
              <p className="text-2xl font-bold text-white" aria-label={`Estimated time: ${estimatedMinutes} minutes`}>{estimatedMinutes}</p>
              <p className="text-xs text-slate-400">minutes</p>
            </div>
            <div className="text-3xl">⏱️</div>
          </div>
        </motion.div>

        {/* Bookmark Button */}
        {user && lessonTitle && (
          <motion.div
            variants={itemVariants}
            className="flex gap-2"
          >
            <BookmarkButton
              moduleId={moduleId}
              stepIndex={lessonNumber}
              stepTitle={lessonTitle}
            />
            <button
              className="flex-1 bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:border-white/20 transition"
              title="Share this lesson"
              aria-label={`Share ${lessonTitle}`}
            >
              📤 Share
            </button>
          </motion.div>
        )}

        {/* Next Lesson Preview */}
        <motion.div variants={itemVariants}>
          <NextLessonPreview
            moduleId={moduleId + 1}
            lessonNumber={lessonNumber + 1}
          />
        </motion.div>

        {/* Login Prompt */}
        {!user && !stats.loading && (
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-lg p-4 text-center space-y-3"
          >
            <p className="text-sm text-slate-400">
              Sign in to track your progress and earn badges
            </p>
            <Link
              href="/auth/sign-in"
              className="block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2 rounded-lg transition text-sm"
            >
              Sign In
            </Link>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
