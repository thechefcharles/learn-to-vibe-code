"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedStatCard } from "./AnimatedStatCard";
import { AnimatedActionButton } from "./AnimatedActionButton";
import { ProgressBar } from "./ProgressBar";

interface DashboardData {
  userName: string;
  xpLevel: number;
  xpPoints: number;
  nextLevelXP: number;
  streakCurrent: number;
  streakLongest: number;
  completedModules: number;
  totalModules: number;
  badgeCount: number;
  badges: Array<{
    id: string;
    badge_key: string;
    earned_at: string;
  }>;
}

interface AnimatedDashboardProps {
  data: DashboardData;
  onSignOut: () => Promise<void>;
}

export function AnimatedDashboard({ data, onSignOut }: AnimatedDashboardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="w-full flex-1 py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex justify-between items-start"
      >
        <div>
          <h1 className="text-5xl font-bold font-display text-ink mb-2">Dashboard</h1>
          <p className="text-slate text-lg">Welcome back, {data.userName}! 👋</p>
        </div>
        <motion.form
          action={onSignOut}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="submit"
            className="
              bg-gradient-to-r from-red-600 to-red-700
              hover:from-red-700 hover:to-red-800
              text-paper font-medium py-2 px-6 rounded-lg
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            Sign Out
          </button>
        </motion.form>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        variants={containerVariants}
      >
        <AnimatedStatCard
          label="Level"
          value={data.xpLevel}
          glowColor="violet"
          index={0}
        >
          <ProgressBar
            current={data.xpPoints}
            max={data.nextLevelXP}
            size="sm"
            showPercentage={false}
          />
        </AnimatedStatCard>

        <AnimatedStatCard
          label="Streak"
          value={data.streakCurrent}
          glowColor="orange"
          icon="🔥"
          index={1}
        >
          <div className="text-xs text-slate mt-2">Best: {data.streakLongest}</div>
        </AnimatedStatCard>

        <AnimatedStatCard
          label="Modules"
          value={data.completedModules}
          maxValue={data.totalModules}
          glowColor="lime"
          index={2}
        />

        <AnimatedStatCard
          label="Badges"
          value={data.badgeCount}
          glowColor="pink"
          icon="🏆"
          index={3}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold font-display text-ink mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedActionButton href="/course" label="Continue Learning →" variant="primary" index={0} />
          <AnimatedActionButton href="/capstone" label="🎓 Capstone Project" variant="secondary" index={1} />
          <AnimatedActionButton href="/support" label="Support ❤️" variant="outline" index={2} />
        </div>
      </motion.div>

      {/* Badges Section */}
      {data.badges.length > 0 && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold font-display text-ink mb-6">Your Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.badges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.1 + idx * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="
                  bg-white/10 backdrop-blur-xl rounded-xl p-6
                  border border-violet/40 hover:border-violet/60
                  text-center transition-all duration-300
                  hover:shadow-lg hover:shadow-violet/30
                "
              >
                <div className="text-4xl mb-3">{getBadgeEmoji(badge.badge_key)}</div>
                <h3 className="font-bold font-display text-ink mb-2">
                  {getBadgeName(badge.badge_key)}
                </h3>
                <p className="text-sm text-slate">{getBadgeDescription(badge.badge_key)}</p>
                <p className="text-xs text-slate-500 mt-3">
                  Earned {new Date(badge.earned_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function getBadgeEmoji(badgeId: string): string {
  const emojis: Record<string, string> = {
    first_quiz_passed: "🎯",
    five_modules_complete: "⭐",
    all_modules_complete: "👑",
    perfect_quiz: "💯",
    streak_7: "🔥",
    streak_30: "🌟",
  };
  return emojis[badgeId] || "🏆";
}

function getBadgeName(badgeId: string): string {
  const names: Record<string, string> = {
    first_quiz_passed: "Quiz Master",
    five_modules_complete: "Dedicated Learner",
    all_modules_complete: "Course Champion",
    perfect_quiz: "Perfect Score",
    streak_7: "Week Warrior",
    streak_30: "Consistency King",
  };
  return names[badgeId] || "Achievement";
}

function getBadgeDescription(badgeId: string): string {
  const descriptions: Record<string, string> = {
    first_quiz_passed: "Passed your first quiz",
    five_modules_complete: "Completed 5 modules",
    all_modules_complete: "Completed entire course",
    perfect_quiz: "Scored 100% on a quiz",
    streak_7: "7-day learning streak",
    streak_30: "30-day learning streak",
  };
  return descriptions[badgeId] || "Special achievement";
}
