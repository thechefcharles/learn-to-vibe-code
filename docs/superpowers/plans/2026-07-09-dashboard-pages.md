# Dashboard Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two dashboard pages (/dashboard/badges and /dashboard/settings) with badge showcase, profile editing, theme selection, and account management.

**Architecture:** Badges page displays all 5 badges in a responsive grid with earned/locked states and descriptions. Settings page provides profile editing (name/email), theme selector, sound toggle, and account actions (sign out, delete). Both use glass morphism styling matching the dashboard, server actions for Supabase updates, and proper authentication guards.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, Framer Motion, Supabase auth/updates, server actions.

## Global Constraints

- Glass morphism: `bg-white/10 backdrop-blur-md border border-white/20`
- Gradient accents: `linear-gradient(90deg, #06B6D4, #A78BFA, #EC4899)`
- Dark background: `#0f172a` with video backdrop
- Responsive: mobile-first, `sm:` tablet, `lg:` desktop breakpoints
- All pages use Header + Footer components
- Authentication: redirect unauthenticated users to `/auth/sign-in`
- Animations: Framer Motion with `prefers-reduced-motion` support
- 5 badges: first_quiz_passed, rls_locked_down, went_live, automation_engineer, capstone_submitted

---

### Task 1: Create BadgesGrid Component

**Files:**
- Create: `components/dashboard/BadgesGrid.tsx`

**Interfaces:**
- Consumes: `badges: Array<{badge_key: string, earned_at: string}>`, `allBadges: Array<{key: string, name: string, description: string, icon: string}>`
- Produces: React component displaying all badges in responsive grid with earned/locked states

- [ ] **Step 1: Create BadgesGrid component**

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

interface BadgesGridProps {
  badges: BadgeData[];
  allBadges: BadgeMetadata[];
}

export function BadgesGrid({ badges, allBadges }: BadgesGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const earnedKeys = badges.map((b) => b.badge_key);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {allBadges.map((badge, idx) => {
        const isEarned = earnedKeys.includes(badge.key);
        const earnedBadge = badges.find((b) => b.badge_key === badge.key);

        return (
          <motion.div
            key={badge.key}
            initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
            animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
            transition={!prefersReducedMotion ? { duration: 0.5, delay: idx * 0.1 } : undefined}
            className={`rounded-xl border-2 p-6 flex flex-col items-center gap-4 text-center transition-all ${
              isEarned
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50'
                : 'bg-white/5 border-white/20 opacity-60 hover:opacity-80'
            }`}
          >
            <div className="text-5xl">{badge.icon}</div>
            <div>
              <h3 className="font-bold text-white text-lg">{badge.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
            </div>
            {isEarned && earnedBadge && (
              <div className="text-xs text-yellow-300 font-semibold">
                Earned {new Date(earnedBadge.earned_at).toLocaleDateString()}
              </div>
            )}
            {!isEarned && (
              <div className="text-xs text-gray-500 font-semibold">Locked</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit BadgesGrid**

```bash
cd /Users/admin/Charlie\ Foreman/My\ Projects/learn-to-vibe-code
git add components/dashboard/BadgesGrid.tsx
git commit -m "feat: create badges grid component for badge showcase"
```

---

### Task 2: Create SettingsForm Component

**Files:**
- Create: `components/dashboard/SettingsForm.tsx`

**Interfaces:**
- Consumes: `userName: string`, `userEmail: string`, `onSave: (name: string, email: string) => Promise<void>`
- Produces: React component with form fields for name/email editing with submit handling

- [ ] **Step 1: Create SettingsForm component**

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SettingsFormProps {
  userName: string;
  userEmail: string;
  onSave: (name: string, email: string) => Promise<void>;
}

export function SettingsForm({ userName, userEmail, onSave }: SettingsFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await onSave(name, email);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.form
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
        Profile Settings
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400 rounded-lg px-4 py-3 mb-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-400 rounded-lg px-4 py-3 mb-4 text-green-300 text-sm">
          Settings saved successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </motion.form>
  );
}
```

- [ ] **Step 2: Commit SettingsForm**

```bash
git add components/dashboard/SettingsForm.tsx
git commit -m "feat: create settings form component for profile editing"
```

---

### Task 3: Create ThemeSelector Component

**Files:**
- Create: `components/dashboard/ThemeSelector.tsx`

**Interfaces:**
- Consumes: `currentTheme: string`, `onThemeChange: (theme: string) => void`, `themes: Array<{name: string, key: string, color: string}>`
- Produces: React component with 5 theme selection buttons

- [ ] **Step 1: Create ThemeSelector component**

```typescript
'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Theme {
  name: string;
  key: string;
  color: string;
}

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  themes: Theme[];
}

export function ThemeSelector({ currentTheme, onThemeChange, themes }: ThemeSelectorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5, delay: 0.1 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-2xl"
    >
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Theme</h3>
      <p className="text-sm text-gray-400 mb-4">Choose your learning environment aesthetic</p>

      <div className="flex gap-3 flex-wrap">
        {themes.map((theme) => (
          <motion.button
            key={theme.key}
            whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
            onClick={() => onThemeChange(theme.key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentTheme === theme.key
                ? `bg-gradient-to-r ${theme.color} text-white shadow-lg ring-2 ring-white/30`
                : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/15'
            }`}
          >
            {theme.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit ThemeSelector**

```bash
git add components/dashboard/ThemeSelector.tsx
git commit -m "feat: create theme selector component"
```

---

### Task 4: Create updateUserProfile Server Action

**Files:**
- Create: `lib/actions/profile.ts`

**Interfaces:**
- Consumes: `name: string`, `email: string`
- Produces: Server action that updates user profile in Supabase

- [ ] **Step 1: Create profile server action**

```typescript
'use server';

import { createClient } from '@supabase/supabase-js';
import { getUser } from '@/lib/auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function updateUserProfile(name: string, email: string) {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Update user metadata
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          name: name,
        },
      },
    );

    if (updateError) {
      throw updateError;
    }

    // Update profile record if email changed
    if (email !== user.email) {
      const { error: emailError } = await supabase.auth.admin.updateUserById(
        user.id,
        {
          email: email,
          email_confirm: true,
        },
      );

      if (emailError) {
        throw emailError;
      }
    }

    return { success: true };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
  }
}

export async function deleteUserAccount() {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Delete user (cascade delete via RLS policies)
    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to delete account');
  }
}
```

- [ ] **Step 2: Commit profile actions**

```bash
git add lib/actions/profile.ts
git commit -m "feat: create server actions for profile updates and account deletion"
```

---

### Task 5: Create Badges Page

**Files:**
- Create: `app/dashboard/badges/page.tsx`

**Interfaces:**
- Consumes: User auth, badges from DB, badge metadata
- Produces: Full badges page with header, grid, footer

- [ ] **Step 1: Create badges page**

```typescript
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserBadges } from "@/lib/actions/gamification";
import { BadgesGrid } from "@/components/dashboard/BadgesGrid";
import { Header } from "@/components/kids-landing/Header";
import { Footer } from "@/components/Footer";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import Link from "next/link";

const BADGE_METADATA = [
  { key: "first_quiz_passed", name: "First Steps", description: "Passed your first quiz", icon: "🎯" },
  { key: "rls_locked_down", name: "Security Pro", description: "Mastered RLS security", icon: "🔐" },
  { key: "went_live", name: "Live!", description: "Deployed to production", icon: "🚀" },
  { key: "automation_engineer", name: "Automation Master", description: "Built with automation", icon: "⚡" },
  { key: "capstone_submitted", name: "Capstone Complete", description: "Submitted capstone project", icon: "🏆" },
];

export default async function BadgesPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const badges = await getUserBadges();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <DashboardBackground />
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
            Your Badges & Achievements
          </h1>
          <p className="text-gray-400 mt-2">Complete challenges and unlock badges</p>
        </div>

        <BadgesGrid badges={badges} allBadges={BADGE_METADATA} />
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit badges page**

```bash
mkdir -p app/dashboard/badges
git add app/dashboard/badges/page.tsx
git commit -m "feat: create badges page with grid layout"
```

---

### Task 6: Create Settings Page

**Files:**
- Create: `app/dashboard/settings/page.tsx`

**Interfaces:**
- Consumes: User auth, current user data, theme context
- Produces: Full settings page with profile form, theme selector, account actions

- [ ] **Step 1: Create settings page**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserProfile, deleteUserAccount } from '@/lib/actions/profile';
import { SettingsForm } from '@/components/dashboard/SettingsForm';
import { ThemeSelector } from '@/components/dashboard/ThemeSelector';
import { Header } from '@/components/kids-landing/Header";
import { Footer } from "@/components/Footer";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import { useTheme } from "@/lib/ThemeContext";
import Link from "next/link";

const THEMES = [
  { name: 'Violet', key: 'violet', color: 'from-violet-500 to-purple-600' },
  { name: 'Sage', key: 'sage', color: 'from-green-500 to-teal-600' },
  { name: 'Sunset', key: 'sunset', color: 'from-orange-500 to-red-600' },
  { name: 'Dark', key: 'dark', color: 'from-slate-600 to-slate-800' },
  { name: 'Ocean', key: 'ocean', color: 'from-cyan-500 to-blue-600' },
];

export default function SettingsPage() {
  const router = useRouter();
  const { currentTheme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (!response.ok) {
          router.push('/auth/sign-in');
          return;
        }
        const userData = await response.json();
        setUser(userData);
      } catch {
        router.push('/auth/sign-in');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleSave = async (name: string, email: string) => {
    await updateUserProfile(name, email);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUserAccount();
      router.push('/');
    } catch (error) {
      alert('Failed to delete account');
      setIsDeleting(false);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <DashboardBackground />
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your profile and preferences</p>
        </div>

        <div className="space-y-8 max-w-2xl">
          {/* Profile Form */}
          <SettingsForm
            userName={user.user_metadata?.name || ''}
            userEmail={user.email || ''}
            onSave={handleSave}
          />

          {/* Theme Selector */}
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={setTheme}
            themes={THEMES}
          />

          {/* Account Actions */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Account</h3>

            <div className="space-y-4">
              <button
                onClick={() => {
                  window.location.href = '/api/auth/logout';
                }}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-bold py-3 rounded-lg transition-all"
              >
                Sign Out
              </button>

              <div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 hover:border-red-400 text-red-300 font-bold py-3 rounded-lg transition-all"
                >
                  Delete Account
                </button>
                <p className="text-xs text-gray-500 mt-2">This action is permanent and cannot be undone.</p>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md">
                <h3 className="text-xl font-bold text-white mb-3">Delete Account?</h3>
                <p className="text-gray-300 mb-6">
                  This will permanently delete your account and all associated data. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="flex-1 bg-white/10 hover:bg-white/15 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit settings page**

```bash
mkdir -p app/dashboard/settings
git add app/dashboard/settings/page.tsx
git commit -m "feat: create settings page with profile form and account management"
```

---

### Task 7: E2E Test Dashboard Pages

**Files:**
- Test: Visit both pages in browser

- [ ] **Step 1: Test badges and settings pages**

```bash
npm run dev
# Visit http://localhost:3000/dashboard/badges
# Verify: All 5 badges displayed, earned badges highlighted, locked badges dimmed
# Visit http://localhost:3000/dashboard/settings
# Verify: Name/email fields editable, theme selector working, sign out/delete buttons present
# Test mobile: Resize to 390px, verify responsive layout
```

- [ ] **Step 2: Push to production**

```bash
git push origin main
```
