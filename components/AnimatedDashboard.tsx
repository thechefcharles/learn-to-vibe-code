"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedStatCard } from "./AnimatedStatCard";
import { AnimatedProgressRing } from "./AnimatedProgressRing";
import { ProgressBar } from "./ProgressBar";
import { CursorTrail } from "./CursorTrail";
import { FloatingOrbs } from "./FloatingOrbs";
import { AnimatedGradientBg } from "./AnimatedGradientBg";
import { PlayButton } from "./PlayButton";
import { BackgroundFlair } from "./BackgroundFlair";
import { ProgressFlowWidget } from "./ProgressFlowWidget";
import type { Version } from "@/lib/VersionContext";

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
  capstoneUnlocked?: boolean;
  version?: Version;
}

interface AnimatedDashboardProps {
  data: DashboardData;
}

// Version-aware badge label mapping
const getBadgeLabel = (badgeKey: string, version?: Version): string => {
  if (version === "kids") {
    const kidsBadges: Record<string, string> = {
      first_quiz_passed: "🎮 Quiz Champion",
      rls_locked_down: "🔐 Security Expert",
      went_live: "🚀 Launch Master",
      automation_engineer: "🤖 Automation Wizard",
      capstone: "🏆 Master Builder",
    };
    return kidsBadges[badgeKey] || badgeKey;
  }

  // Adult version badge labels
  const adultBadges: Record<string, string> = {
    first_quiz_passed: "Quiz Pass",
    rls_locked_down: "RLS Mastery",
    went_live: "Deployment",
    automation_engineer: "Automation",
    capstone: "Capstone",
  };
  return adultBadges[badgeKey] || badgeKey;
};

export function AnimatedDashboard({ data }: AnimatedDashboardProps) {
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
    <>
      <AnimatedGradientBg />
      <FloatingOrbs />
      <CursorTrail />
      <BackgroundFlair />

      <motion.div
        className="w-full flex-1 py-12 px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold font-display text-ink mb-2">Dashboard</h1>
        <p className="text-slate text-lg">
          {data.version === "kids"
            ? `Welcome back, ${data.userName}! 🎉 Ready to level up?`
            : `Welcome back, ${data.userName}! 👋`}
        </p>
      </motion.div>

      {/* Play Button */}
      <PlayButton hasStarted={data.completedModules > 0} />

      {/* Progress Flow Widget */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ProgressFlowWidget />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 auto-cols-fr"
        style={{ gridAutoColumns: "1fr" }}
        variants={containerVariants}
      >
        <AnimatedStatCard
          label="Level"
          value={data.xpLevel}
          glowColor="violet"
          index={0}
          tooltipTitle={data.version === "kids" ? "Your Level 🌟" : "Your Level"}
          tooltipDescription={data.version === "kids" ? "Complete modules & quizzes to earn XP! Every 1,000 XP = new level! You're on fire! 🔥" : "Earn XP by completing modules, passing quizzes, and maintaining streaks. Level up every 1,000 XP. Progress toward mastery!"}
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
          tooltipTitle={data.version === "kids" ? "Keep the 🔥 Burning!" : "Your Streak"}
          tooltipDescription={data.version === "kids" ? `Log in every day to build your streak! Your best: ${data.streakLongest} days. Don't break the chain! 🚀` : "Days in a row you've actively participated in the course. Maintain consistency to build momentum and earn streak badges!"}
        >
          <div className="text-xs text-slate mt-2">Best: {data.streakLongest}</div>
        </AnimatedStatCard>

        <AnimatedStatCard
          label="Modules"
          value={data.completedModules}
          maxValue={data.totalModules}
          glowColor="lime"
          index={2}
          tooltipTitle={data.version === "kids" ? "Levels Unlocked! 🎮" : "Course Progress"}
          tooltipDescription={data.version === "kids" ? "Complete all 16 levels to become a Master Builder! Pass quizzes & deliverables to unlock the next level and access the Grand Challenge! 🏆" : "16 modules from foundations to production-ready deployment. Complete quizzes and deliverables to unlock the next module and access the capstone."}
        >
          <div className="mt-3 flex justify-center">
            <AnimatedProgressRing current={data.completedModules} max={data.totalModules} size={60} />
          </div>
        </AnimatedStatCard>

        <AnimatedStatCard
          label="Badges"
          value={data.badgeCount}
          glowColor="pink"
          icon="🏆"
          index={3}
          tooltipTitle={data.version === "kids" ? "Badge Collection 👑" : "Achievements"}
          tooltipDescription={data.version === "kids" ? "Collect badges for epic milestones! Quiz Champion 🎯, Security Expert 🔐, Launch Master 🚀, Automation Wizard 🤖, and Master Builder 👑. Catch 'em all!" : "Earn badges for milestones: first quiz passed, completing modules, perfect scores, streaks, and more. Collect them all!"}
        />
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
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.1 + idx * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="
                  relative
                  bg-white/10 backdrop-blur-2xl rounded-xl p-6
                  border-2 border-violet/40 hover:border-violet/80
                  text-center transition-all duration-300
                  hover:shadow-2xl hover:shadow-violet/50
                  hover:bg-white/20
                  overflow-hidden
                "
              >
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 via-transparent to-transparent pointer-events-none"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glow line effect */}
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-violet/60 to-transparent pointer-events-none"
                  whileHover={{ opacity: 1, height: 2 }}
                  initial={{ opacity: 0.3, height: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: "100%" }}
                />

                <motion.div
                  className="text-4xl mb-3 inline-block"
                  whileHover={{ scale: 1.3, rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  {getBadgeEmoji(badge.badge_key)}
                </motion.div>

                <h3 className="font-bold font-display text-ink mb-2 relative z-10">
                  {getBadgeName(badge.badge_key, data.version)}
                </h3>
                <p className="text-sm text-slate relative z-10">{getBadgeDescription(badge.badge_key)}</p>
                <motion.p
                  className="text-xs text-slate-600 mt-3 relative z-10"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Earned {new Date(badge.earned_at).toLocaleDateString()}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      </motion.div>
    </>
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

function getBadgeName(badgeId: string, version?: Version): string {
  if (version === "kids") {
    const kidsNames: Record<string, string> = {
      first_quiz_passed: "🎮 Quiz Champion",
      five_modules_complete: "⭐ Level 5 Master",
      all_modules_complete: "👑 Course Hero",
      perfect_quiz: "💯 Perfect Run",
      streak_7: "🔥 7-Day Warrior",
      streak_30: "🌟 Legend Status",
    };
    return kidsNames[badgeId] || "Achievement";
  }

  const adultNames: Record<string, string> = {
    first_quiz_passed: "Quiz Master",
    five_modules_complete: "Dedicated Learner",
    all_modules_complete: "Course Champion",
    perfect_quiz: "Perfect Score",
    streak_7: "Week Warrior",
    streak_30: "Consistency King",
  };
  return adultNames[badgeId] || "Achievement";
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
