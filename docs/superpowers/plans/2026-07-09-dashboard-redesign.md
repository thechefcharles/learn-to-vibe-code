# New Learner Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace old AnimatedDashboard with a cosmic glass-morphism dashboard matching the landing page aesthetic, featuring profile hero card, stats grid, course progress flow, badges showcase, and responsive mobile layout.

**Architecture:** Dashboard page uses server-side data fetching (user, XP, badges, streak, progress) and passes to client components organized by section: ProfileHeroCard, StatsGrid, CourseProgress, QuickActions, BadgesShowcase. All components use glass morphism styling with backdrop-blur, white/10 backgrounds, and gradient accents (cyan→purple→pink). Mobile collapses to single column with reduced animations.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, Framer Motion (subtle only), server actions for auth/data.

## Global Constraints

- Glass morphism: `bg-white/10 backdrop-blur-md border border-white/20`
- Gradient accents: `linear-gradient(90deg, #06B6D4, #A78BFA, #EC4899)`
- Mobile breakpoint: `< 768px` (1 column), desktop: 2 columns (progress 65% / actions 35%)
- Animations: subtle on desktop, disabled on mobile via `prefers-reduced-motion`
- Dark background: `#0f172a` with video backdrop
- Responsive typography: `text-sm sm:text-base lg:text-lg`

---

### Task 1: Create ProfileHeroCard Component

**Files:**
- Create: `components/dashboard/ProfileHeroCard.tsx`

**Interfaces:**
- Consumes: `userName: string`, `xpLevel: number`, `xpPoints: number`, `streakCurrent: number`, `streakLongest: number`
- Produces: React component rendering profile section with user name, level badge, XP progress bar, and streak display

- [ ] **Step 1: Create ProfileHeroCard component file**

```typescript
'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProfileHeroCardProps {
  userName: string;
  xpLevel: number;
  xpPoints: number;
  streakCurrent: number;
  streakLongest: number;
}

export function ProfileHeroCard({
  userName,
  xpLevel,
  xpPoints,
  streakCurrent,
  streakLongest,
}: ProfileHeroCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const nextLevelXP = (xpLevel + 1) * 1000;
  const xpPercentage = (xpPoints % 1000) / 10;

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 hover:border-white/40 transition-all hover:bg-white/15"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Left: User Info */}
        <div className="flex flex-col items-center md:items-start gap-3 flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{userName}</h2>
            <div className="text-sm text-cyan-300 font-semibold">Level {xpLevel}</div>
          </div>
        </div>

        {/* Center: XP Progress */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Experience Progress</span>
            <span className="text-sm font-semibold text-cyan-300">{xpPoints % 1000} / 1000</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
            <motion.div
              initial={!prefersReducedMotion ? { width: 0 } : { width: `${xpPercentage}%` }}
              animate={{ width: `${xpPercentage}%` }}
              transition={!prefersReducedMotion ? { duration: 0.8, ease: 'easeOut' } : undefined}
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg"
            />
          </div>
        </div>

        {/* Right: Streak */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="text-3xl">🔥</div>
          <div className="text-center">
            <div className="text-sm text-gray-300">Current Streak</div>
            <div className="text-2xl font-bold text-orange-400">{streakCurrent}</div>
            <div className="text-xs text-gray-500">Best: {streakLongest}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit ProfileHeroCard**

```bash
cd /Users/admin/Charlie\ Foreman/My\ Projects/learn-to-vibe-code
git add components/dashboard/ProfileHeroCard.tsx
git commit -m "feat: create profile hero card component with user info and xp progress"
```

---

### Task 2: Create StatsGrid Component

**Files:**
- Create: `components/dashboard/StatsGrid.tsx`

**Interfaces:**
- Consumes: `completedModules: number`, `totalModules: number`, `badgeCount: number`, `xpLevel: number`, `capstoneUnlocked: boolean`
- Produces: React component with 4 stat cards in responsive grid

- [ ] **Step 1: Create StatsGrid component file**

```typescript
'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StatsGridProps {
  completedModules: number;
  totalModules: number;
  badgeCount: number;
  xpLevel: number;
  capstoneUnlocked: boolean;
}

export function StatsGrid({
  completedModules,
  totalModules,
  badgeCount,
  xpLevel,
  capstoneUnlocked,
}: StatsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const progressPercentage = (completedModules / totalModules) * 100;

  const stats = [
    {
      title: 'Modules',
      value: `${completedModules}/${totalModules}`,
      icon: '📚',
      color: 'from-cyan-500 to-blue-600',
      subtext: `${Math.round(progressPercentage)}% complete`,
    },
    {
      title: 'Badges Earned',
      value: badgeCount.toString(),
      icon: '🏆',
      color: 'from-purple-500 to-pink-600',
      subtext: 'Keep learning to earn more',
    },
    {
      title: 'Your Level',
      value: xpLevel.toString(),
      icon: '⭐',
      color: 'from-orange-500 to-red-600',
      subtext: 'Vibe Coder in Training',
    },
    {
      title: 'Capstone',
      value: capstoneUnlocked ? '🔓' : '🔒',
      icon: '🎯',
      color: capstoneUnlocked ? 'from-green-500 to-emerald-600' : 'from-gray-500 to-slate-600',
      subtext: capstoneUnlocked ? 'Unlocked! Ready to submit.' : 'Complete Module 15 to unlock',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
          animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
          transition={!prefersReducedMotion ? { duration: 0.5, delay: idx * 0.1 } : undefined}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:border-white/40 transition-all hover:bg-white/15 group"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide">
              {stat.title}
            </h3>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="mb-2">
            <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
          </div>
          <p className="text-xs text-gray-400">{stat.subtext}</p>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit StatsGrid**

```bash
git add components/dashboard/StatsGrid.tsx
git commit -m "feat: create stats grid component with 4 stat cards"
```

---

### Task 3: Create CourseProgress Component

**Files:**
- Create: `components/dashboard/CourseProgress.tsx`

**Interfaces:**
- Consumes: `progress: Array<{id: string, module_id: number, status: 'not_started'|'in_progress'|'completed'}>`, `totalModules: number`
- Produces: React component showing 16 modules in visual flow with status indicators

- [ ] **Step 1: Create CourseProgress component file**

```typescript
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in_progress':
        return '▶';
      default:
        return '○';
    }
  };

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full"
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-6 uppercase tracking-wide">
        Your Learning Path
      </h3>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
        {Array.from({ length: totalModules }).map((_, idx) => {
          const moduleId = idx;
          const status = getModuleStatus(moduleId);
          
          return (
            <Link
              key={moduleId}
              href={`/course/module-${moduleId.toString().padStart(2, '0')}`}
            >
              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.1 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
                className={`w-full aspect-square rounded-lg border-2 ${getStatusColor(
                  status,
                )} flex items-center justify-center cursor-pointer transition-all hover:border-white/60 font-bold text-xs sm:text-sm text-white shadow-lg`}
              >
                {getStatusIcon(status)}
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
```

- [ ] **Step 2: Commit CourseProgress**

```bash
git add components/dashboard/CourseProgress.tsx
git commit -m "feat: create course progress component showing 16 module flow"
```

---

### Task 4: Create QuickActions Component

**Files:**
- Create: `components/dashboard/QuickActions.tsx`

**Interfaces:**
- Consumes: `capstoneUnlocked: boolean`, `completedModules: number`
- Produces: React component with action buttons (continue learning, view badges, download cert, settings)

- [ ] **Step 1: Create QuickActions component file**

```typescript
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface QuickActionsProps {
  capstoneUnlocked: boolean;
  completedModules: number;
}

export function QuickActions({ capstoneUnlocked, completedModules }: QuickActionsProps) {
  const prefersReducedMotion = useReducedMotion();

  const actions = [
    {
      label: 'Continue Learning',
      icon: '▶',
      href: '/course',
      color: 'from-cyan-500 to-blue-600',
      subtext: 'Jump back in',
    },
    {
      label: 'View Badges',
      icon: '🏆',
      href: '/dashboard/badges',
      color: 'from-purple-500 to-pink-600',
      subtext: `${completedModules} earned`,
    },
    ...(capstoneUnlocked
      ? [
          {
            label: 'Capstone Project',
            icon: '🎯',
            href: '/capstone',
            color: 'from-green-500 to-emerald-600',
            subtext: 'Final challenge',
          },
        ]
      : []),
    {
      label: 'Profile Settings',
      icon: '⚙',
      href: '/dashboard/settings',
      color: 'from-orange-500 to-red-600',
      subtext: 'Preferences',
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {actions.map((action, idx) => (
        <motion.div
          key={action.label}
          initial={!prefersReducedMotion ? { opacity: 0, x: 20 } : undefined}
          animate={!prefersReducedMotion ? { opacity: 1, x: 0 } : undefined}
          transition={!prefersReducedMotion ? { duration: 0.5, delay: idx * 0.1 } : undefined}
        >
          <Link href={action.href} className="block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:border-white/40 transition-all hover:bg-white/15 group cursor-pointer">
              <div className="flex items-center gap-3">
                <div
                  className={`text-2xl w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}
                >
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm sm:text-base">{action.label}</h4>
                  <p className="text-xs text-gray-400">{action.subtext}</p>
                </div>
                <div className="text-gray-500 group-hover:text-white transition-colors">→</div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit QuickActions**

```bash
git add components/dashboard/QuickActions.tsx
git commit -m "feat: create quick actions component with navigation buttons"
```

---

### Task 5: Create BadgesShowcase Component

**Files:**
- Create: `components/dashboard/BadgesShowcase.tsx`

**Interfaces:**
- Consumes: `badges: Array<{badge_key: string, earned_at: string}>`, `allBadges: Array<{key: string, name: string, description: string}>`
- Produces: React component with horizontal scrollable badge carousel

- [ ] **Step 1: Create BadgesShowcase component file**

```typescript
'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BadgeData {
  badge_key: string;
  earned_at: string;
}

interface BadgeMetadata {
  key: string;
  name: string;
  description: string;
  icon: string;
}

interface BadgesShowcaseProps {
  badges: BadgeData[];
  allBadges: BadgeMetadata[];
}

export function BadgesShowcase({ badges, allBadges }: BadgesShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const earnedKeys = badges.map((b) => b.badge_key);

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full"
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-6 uppercase tracking-wide">
        Badges & Achievements
      </h3>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {allBadges.map((badge) => {
            const isEarned = earnedKeys.includes(badge.key);

            return (
              <motion.div
                key={badge.key}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                className={`flex-shrink-0 w-24 h-32 sm:w-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center gap-2 p-2 text-center transition-all ${
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400 shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 border-white/20 opacity-50'
                }`}
              >
                <div className="text-3xl sm:text-4xl">{badge.icon}</div>
                <div className="text-xs font-semibold text-white text-center line-clamp-2">
                  {badge.name}
                </div>
                {!isEarned && (
                  <div className="text-xs text-gray-400">Locked</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-400 mt-4">
        Scroll to see all badges. Complete challenges to unlock more achievements!
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit BadgesShowcase**

```bash
git add components/dashboard/BadgesShowcase.tsx
git commit -m "feat: create badges showcase component with scrollable carousel"
```

---

### Task 6: Create DashboardBackground Component

**Files:**
- Create: `components/dashboard/DashboardBackground.tsx`

**Interfaces:**
- Produces: React component with animated video background matching landing page

- [ ] **Step 1: Create DashboardBackground component file**

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const VIDEO_SOURCES: Record<string, string> = {
  violet: '/bg-purple.mp4',
  sage: '/bg-sage.mp4',
  sunset: '/bg-orange.mp4',
};

export function DashboardBackground() {
  const videoRefs = {
    violet: useRef<HTMLVideoElement>(null),
    sage: useRef<HTMLVideoElement>(null),
    sunset: useRef<HTMLVideoElement>(null),
  };
  const { currentTheme } = useTheme();

  useEffect(() => {
    const themes = Object.keys(videoRefs) as Array<keyof typeof videoRefs>;
    themes.forEach((theme) => {
      const video = videoRefs[theme].current;
      if (!video) return;

      if (theme === currentTheme) {
        video.style.visibility = 'visible';
        video.style.opacity = '1';
        video.play().catch(() => {});
      } else {
        video.style.visibility = 'hidden';
        video.style.opacity = '0';
        video.pause();
      }
    });
  }, [currentTheme]);

  const videoStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    zIndex: -10,
    visibility: 'hidden' as const,
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
    filter: 'blur(8px) brightness(0.3)',
  };

  return (
    <>
      <video ref={videoRefs.violet} muted loop playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.violet} type="video/mp4" />
      </video>
      <video ref={videoRefs.sage} muted loop playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.sage} type="video/mp4" />
      </video>
      <video ref={videoRefs.sunset} muted loop playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.sunset} type="video/mp4" />
      </video>
    </>
  );
}
```

- [ ] **Step 2: Commit DashboardBackground**

```bash
git add components/dashboard/DashboardBackground.tsx
git commit -m "feat: create dashboard background with theme-aware video"
```

---

### Task 7: Update DashboardPage Layout

**Files:**
- Modify: `app/dashboard/page.tsx`

**Interfaces:**
- Consumes: Data from existing server actions (user, XP, badges, streak, progress)
- Produces: New dashboard layout using all component pieces

- [ ] **Step 1: Update dashboard page layout**

```typescript
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress, getUserEnrolledVersion } from "@/lib/actions/course";
import { signOutAction } from "@/lib/actions/auth";
import { ProfileHeroCard } from "@/components/dashboard/ProfileHeroCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BadgesShowcase } from "@/components/dashboard/BadgesShowcase";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import { Header } from "@/components/kids-landing/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const BADGE_METADATA = [
  { key: "first_quiz_passed", name: "First Steps", description: "Passed your first quiz", icon: "🎯" },
  { key: "rls_locked_down", name: "Security Pro", description: "Mastered RLS", icon: "🔐" },
  { key: "went_live", name: "Live!", description: "Deployed to production", icon: "🚀" },
  { key: "automation_engineer", name: "Automation Master", description: "Built with automation", icon: "⚡" },
  { key: "capstone_submitted", name: "Capstone Complete", description: "Submitted capstone project", icon: "🏆" },
];

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const [xp, badges, streak, progress, version] = await Promise.all([
    getUserXP(),
    getUserBadges(),
    getUserStreak(),
    getAllModuleProgress(),
    getUserEnrolledVersion(),
  ]);

  const completedModules = progress.filter((p) => p.status === "completed").length;
  const capstoneUnlocked = completedModules >= 15;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <DashboardBackground />
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Profile Hero */}
        <section className="mb-8">
          <ProfileHeroCard
            userName={user.user_metadata?.name || user.email || "Learner"}
            xpLevel={xp.level}
            xpPoints={xp.points}
            streakCurrent={streak.current}
            streakLongest={streak.longest}
          />
        </section>

        {/* Stats Grid */}
        <section className="mb-8">
          <StatsGrid
            completedModules={completedModules}
            totalModules={16}
            badgeCount={badges.length}
            xpLevel={xp.level}
            capstoneUnlocked={capstoneUnlocked}
          />
        </section>

        {/* Two Column Layout: Progress + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Course Progress (65%) */}
          <div className="lg:col-span-2">
            <CourseProgress progress={progress} totalModules={16} />
          </div>

          {/* Right: Quick Actions (35%) */}
          <div className="lg:col-span-1">
            <QuickActions capstoneUnlocked={capstoneUnlocked} completedModules={completedModules} />
          </div>
        </div>

        {/* Badges Showcase */}
        <section className="mb-8">
          <BadgesShowcase badges={badges} allBadges={BADGE_METADATA} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit updated DashboardPage**

```bash
git add app/dashboard/page.tsx
git commit -m "feat: redesign dashboard page with new cosmic glass-morphism layout"
```

---

### Task 8: Delete Old Dashboard Components

**Files:**
- Delete: `components/AnimatedDashboard.tsx`
- Delete: `components/DashboardHeader.tsx`
- Delete: `components/DashboardBackground.tsx` (old one)

- [ ] **Step 1: Remove old components**

```bash
rm components/AnimatedDashboard.tsx
rm components/DashboardHeader.tsx
git add -u
git commit -m "feat: remove old dashboard components"
```

---

### Task 9: Test Dashboard End-to-End

**Files:**
- Test: Visit `/dashboard` in browser, verify all sections render

- [ ] **Step 1: Start dev server and test**

```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Verify:
# - Profile hero card displays
# - Stats grid shows all 4 stats
# - Course progress shows 16 modules
# - Quick actions are clickable
# - Badges showcase scrolls
# - Mobile responsive (< 768px collapses to 1 col)
# - Video background plays
```

- [ ] **Step 2: Commit test verification**

```bash
git add -A
git commit -m "test: verify new dashboard renders correctly and is responsive"
```

---

## Spec Coverage Checklist

✅ ProfileHeroCard (user, level, XP progress, streak)  
✅ StatsGrid (modules, badges, XP level, capstone unlock)  
✅ CourseProgress (16 modules visual flow with status)  
✅ QuickActions (continue/badges/capstone/settings)  
✅ BadgesShowcase (scrollable carousel, earned/locked)  
✅ DashboardBackground (video, theme-aware)  
✅ Responsive grid (2-col desktop, 1-col mobile)  
✅ Glass morphism styling (matching landing page)  
✅ Delete old components
