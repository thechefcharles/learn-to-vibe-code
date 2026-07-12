# Course Page UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) to implement this plan task-by-task.

**Goal:** Add unified header, gamification stats, engagement cards, mobile menu, and polish to lesson pages so learners can navigate, celebrate progress, and personalize their experience.

**Architecture:** Create a cohesive header+sidebar+footer pattern for lesson pages by centralizing navigation (logo, breadcrumb, profile) in a `CourseLessonHeader`, adding a `CoursePageSidebar` for stats/next lesson/bookmarks, and introducing lightweight modals/panels for celebrations, shortcuts, and sharing. Reuse existing gamification infrastructure (XP, badges, streaks, Confetti). Mobile burger menu wraps header navigation. All new components follow cosmic glass-morphism design.

**Tech Stack:** React, Next.js App Router, TypeScript, Tailwind v4, shadcn/ui, lucide-react, Supabase (auth, progress queries), localStorage (bookmarks, session tracking), reduced-motion safe animations.

## Global Constraints

- Brand: learn2vibecode (logo file exists, colors from landing page)
- Pricing: FREE with donations (PayPal + Stripe coming)
- No accreditation messaging anywhere (remove if present)
- Gamification: sound OFF by default, honor `prefers-reduced-motion`
- Responsive: works on mobile (burger menu < 768px)
- Accessibility: WCAG AA, keyboard nav (K/J already implemented), alt text on figures
- Reuse existing: DashboardHeader pattern, ProfileMenu, Confetti, ModuleSidebar, useKeyboardNavigation, useSwipeNavigation
- Design: cosmic glass-morphism (indigo/violet/lime/paper colors, gradients, blur)
- Performance: avoid N+1 queries; use React.memo for heavy re-renders

---

## File Structure

**New files:**
- `/components/course/CourseLessonHeader.tsx` — Logo, breadcrumb, theme toggle, profile menu, dashboard link
- `/components/course/CoursePageSidebar.tsx` — XP/streak stats, time estimate, next lesson, bookmarks
- `/components/course/NextLessonPreview.tsx` — Preview card with start button
- `/components/course/MilestoneModal.tsx` — Celebration modal (module completion, badge unlocked)
- `/components/course/KeyboardShortcutsPanel.tsx` — Modal showing K/J nav, scroll, skip shortcuts
- `/components/course/ShareLesson.tsx` — Share buttons (Twitter, LinkedIn, copy link)
- `/components/course/MobileMenuBurger.tsx` — Burger menu for mobile (nav links, profile)
- `/lib/hooks/useBookmarks.ts` — localStorage-based bookmark CRUD
- `/lib/hooks/useSessionTimer.ts` — Track time spent in current lesson
- `/lib/hooks/useLessonStats.ts` — Query user's XP, streak, badges for stats bar
- Modify: `/app/course/[moduleId]/page.tsx` — Integrate header, sidebar, modals
- Modify: `/components/Footer.tsx` — Add support link

---

## Tasks

### Task 1: Create CourseLessonHeader Component

**Files:**
- Create: `/components/course/CourseLessonHeader.tsx`

**Interfaces:**
- Consumes: `moduleId: string`, `lessonTitle: string`, `user: User | null`
- Produces: `CourseLessonHeader({ moduleId, lessonTitle, user })` → React.FC

- [ ] **Step 1: Write component with logo, breadcrumb, profile menu, dashboard link**

Create `/components/course/CourseLessonHeader.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, ChevronRight } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { ProfileMenu } from '@/components/dashboard/ProfileMenu'
import { useState } from 'react'
import type { User } from '@/lib/types'

interface CourseLessonHeaderProps {
  moduleId: string
  lessonTitle: string
  user: User | null
  onMobileMenuToggle?: () => void
}

export function CourseLessonHeader({
  moduleId,
  lessonTitle,
  user,
  onMobileMenuToggle,
}: CourseLessonHeaderProps) {
  const router = useRouter()
  const moduleName = `Module ${moduleId}`

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        {/* Left: Logo + Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/course"
            className="flex-shrink-0 text-indigo-400 hover:text-indigo-300 transition-colors"
            title="Back to course map"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              LV
            </div>
          </Link>

          {/* Breadcrumb (hidden on mobile) */}
          <nav className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-500">Course</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-slate-300 truncate">{moduleName}</span>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-indigo-300 truncate">{lessonTitle}</span>
          </nav>
        </div>

        {/* Right: Theme + Profile + Burger */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {user && <ProfileMenu user={user} />}
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="sm:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile breadcrumb */}
      <div className="sm:hidden px-4 py-2 text-xs text-slate-400 border-t border-slate-700/30">
        <span className="text-slate-500">Course</span> / <span className="text-indigo-300">{moduleName}</span>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Test component renders with logo, breadcrumb, profile menu**

Render test in your browser at `/course/01` — verify:
- Logo (LV) appears, clickable to `/course`
- Breadcrumb shows "Course / Module 01 / Lesson Title"
- Theme toggle (sun/moon) appears
- Profile menu appears (if logged in)
- Mobile burger menu appears only on small screens

- [ ] **Step 3: Commit**

```bash
git add components/course/CourseLessonHeader.tsx
git commit -m "feat: add unified lesson header with logo, breadcrumb, profile menu"
```

---

### Task 2: Create CoursePageSidebar Component (Stats + Next Lesson)

**Files:**
- Create: `/components/course/CoursePageSidebar.tsx`
- Create: `/lib/hooks/useLessonStats.ts`

**Interfaces:**
- Consumes: `userId: string`, `moduleId: string`, `currentLessonNumber: number`
- Produces: `CoursePageSidebar({ userId, moduleId, currentLessonNumber })` → React.FC

- [ ] **Step 1: Create useLessonStats hook to fetch XP, streak, badges**

Create `/lib/hooks/useLessonStats.ts`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@/lib/types'

interface LessonStats {
  xp: number
  level: number
  streakCurrent: number
  streakLongest: number
  badgesCount: number
  nextBadgeName?: string
  loading: boolean
}

export function useLessonStats(userId: string | undefined): LessonStats {
  const [stats, setStats] = useState<LessonStats>({
    xp: 0,
    level: 1,
    streakCurrent: 0,
    streakLongest: 0,
    badgesCount: 0,
    loading: true,
  })

  useEffect(() => {
    if (!userId) {
      setStats(s => ({ ...s, loading: false }))
      return
    }

    const fetchStats = async () => {
      const [xpRes, streaksRes, badgesRes] = await Promise.all([
        supabase.from('xp').select('points, level').eq('user_id', userId).single(),
        supabase.from('streaks').select('current, longest').eq('user_id', userId).single(),
        supabase.from('badges').select('id').eq('user_id', userId),
      ])

      setStats({
        xp: xpRes.data?.points ?? 0,
        level: xpRes.data?.level ?? 1,
        streakCurrent: streaksRes.data?.current ?? 0,
        streakLongest: streaksRes.data?.longest ?? 0,
        badgesCount: badgesRes.data?.length ?? 0,
        loading: false,
      })
    }

    fetchStats()
  }, [userId])

  return stats
}
```

- [ ] **Step 2: Create CoursePageSidebar component**

Create `/components/course/CoursePageSidebar.tsx`:

```tsx
'use client'

import { useLessonStats } from '@/lib/hooks/useLessonStats'
import { Zap, Flame, Award, Clock, BookmarkPlus } from 'lucide-react'
import { NextLessonPreview } from './NextLessonPreview'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import type { User } from '@/lib/types'

interface CoursePageSidebarProps {
  userId: string | undefined
  moduleId: string
  lessonNumber: number
  lessonTitle: string
  estimatedMinutes?: number
  user: User | null
}

export function CoursePageSidebar({
  userId,
  moduleId,
  lessonNumber,
  lessonTitle,
  estimatedMinutes = 30,
  user,
}: CoursePageSidebarProps) {
  const stats = useLessonStats(userId)
  const { bookmarks, toggleBookmark } = useBookmarks()
  const lessonKey = `${moduleId}-${lessonNumber}`
  const isBookmarked = bookmarks.includes(lessonKey)

  if (!user) return null

  return (
    <aside className="hidden lg:flex flex-col gap-4 w-72 sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Stats Card */}
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur rounded-lg border border-slate-700/50 p-4 space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Progress</h3>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap className="w-4 h-4" />
            <span>{stats.xp} XP</span>
          </div>
          <div className="text-slate-400 text-xs">Lvl {stats.level}</div>
        </div>

        <div className="flex items-center gap-2 text-sm text-orange-400">
          <Flame className="w-4 h-4" />
          <span>{stats.streakCurrent} day streak</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-emerald-400">
          <Award className="w-4 h-4" />
          <span>{stats.badgesCount} badges</span>
        </div>
      </div>

      {/* Time Estimate Card */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur rounded-lg border border-indigo-500/30 p-4 flex items-center gap-3 text-sm">
        <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
        <div>
          <div className="text-slate-300">~{estimatedMinutes} min</div>
          <div className="text-xs text-slate-500">Estimated time</div>
        </div>
      </div>

      {/* Bookmark Button */}
      <button
        onClick={() => toggleBookmark(lessonKey)}
        className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg transition-all ${
          isBookmarked
            ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
            : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-amber-400/50'
        }`}
      >
        <BookmarkPlus className="w-4 h-4" />
        <span className="text-sm font-medium">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>

      {/* Next Lesson Preview */}
      <NextLessonPreview moduleId={moduleId} lessonNumber={lessonNumber} />
    </aside>
  )
}
```

- [ ] **Step 3: Test sidebar renders stats, time estimate, bookmark button**

Visit `/course/01` (logged in) — verify:
- XP, level, streak, badges display with correct values
- Time estimate shows "~30 min" (or custom value)
- Bookmark button toggles state
- Next lesson preview appears

- [ ] **Step 4: Commit**

```bash
git add components/course/CoursePageSidebar.tsx lib/hooks/useLessonStats.ts
git commit -m "feat: add course sidebar with stats, time estimate, bookmarks"
```

---

### Task 3: Create useBookmarks Hook (localStorage)

**Files:**
- Create: `/lib/hooks/useBookmarks.ts`

**Interfaces:**
- Produces: `useBookmarks()` → `{ bookmarks: string[], toggleBookmark(key: string): void, clearBookmarks(): void }`

- [ ] **Step 1: Create useBookmarks hook**

Create `/lib/hooks/useBookmarks.ts`:

```tsx
'use client'

import { useState, useEffect } from 'react'

const BOOKMARKS_KEY = 'learn2vibecode:bookmarks'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY)
    setBookmarks(stored ? JSON.parse(stored) : [])
    setMounted(true)
  }, [])

  // Persist to localStorage when bookmarks change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
    }
  }, [bookmarks, mounted])

  const toggleBookmark = (lessonKey: string) => {
    setBookmarks(prev =>
      prev.includes(lessonKey) ? prev.filter(k => k !== lessonKey) : [...prev, lessonKey]
    )
  }

  const clearBookmarks = () => {
    setBookmarks([])
  }

  return { bookmarks, toggleBookmark, clearBookmarks }
}
```

- [ ] **Step 2: Test hook in browser console**

Open `/course/01`, open browser DevTools console, run:
```js
// Should persist bookmarks to localStorage
// Refresh page — bookmarks should persist
```

- [ ] **Step 3: Commit**

```bash
git add lib/hooks/useBookmarks.ts
git commit -m "feat: add useBookmarks hook for lesson bookmarking"
```

---

### Task 4: Create NextLessonPreview Component

**Files:**
- Create: `/components/course/NextLessonPreview.tsx`

**Interfaces:**
- Consumes: `moduleId: string`, `lessonNumber: number`
- Produces: `NextLessonPreview({ moduleId, lessonNumber })` → React.FC

- [ ] **Step 1: Query next lesson and render preview**

Create `/components/course/NextLessonPreview.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface NextLessonPreviewProps {
  moduleId: string
  lessonNumber: number
}

// Mock lesson data (replace with real queries if needed)
const LESSON_MAP: Record<string, { title: string; minutesRead: number }> = {
  '01-0': { title: 'Welcome to Vibe Coding', minutesRead: 15 },
  '01-1': { title: 'Mindset & AI Collaboration', minutesRead: 25 },
  '02-0': { title: 'Prompting Fundamentals', minutesRead: 30 },
  '02-1': { title: 'Advanced Prompting Patterns', minutesRead: 30 },
  // ... add more as needed, or query from DB
}

export function NextLessonPreview({
  moduleId,
  lessonNumber,
}: NextLessonPreviewProps) {
  const [nextLesson, setNextLesson] = useState<{ title: string; minutesRead: number } | null>(null)

  useEffect(() => {
    const nextKey = `${moduleId}-${lessonNumber + 1}`
    const lesson = LESSON_MAP[nextKey]
    setNextLesson(lesson || null)
  }, [moduleId, lessonNumber])

  if (!nextLesson) return null

  const nextModuleId = moduleId
  const nextLessonNumber = lessonNumber + 1
  const href = `/course/${nextModuleId}#lesson-${nextLessonNumber}`

  return (
    <Link href={href}>
      <div className="group bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur rounded-lg border border-emerald-500/30 p-4 hover:border-emerald-400/50 transition-all cursor-pointer">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
          Next Lesson
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-2 mb-1">
              {nextLesson.title}
            </h4>
            <div className="text-xs text-slate-500">~{nextLesson.minutesRead} min</div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Test preview card appears and links to next lesson**

Visit `/course/01` — verify:
- "Next Lesson" card shows next lesson title and time estimate
- Clicking card navigates to next lesson (or shows nothing if last lesson)

- [ ] **Step 3: Commit**

```bash
git add components/course/NextLessonPreview.tsx
git commit -m "feat: add next lesson preview card"
```

---

### Task 5: Create MilestoneModal Component (Celebration)

**Files:**
- Create: `/components/course/MilestoneModal.tsx`

**Interfaces:**
- Consumes: `isOpen: boolean`, `type: 'module_complete' | 'badge_earned'`, `moduleNumber?: number`, `badgeName?: string`, `onClose: () => void`
- Produces: `MilestoneModal({ isOpen, type, ... })` → React.FC

- [ ] **Step 1: Create modal with confetti animation**

Create `/components/course/MilestoneModal.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { X, Trophy, Award } from 'lucide-react'
import { Confetti } from '@/components/Confetti'
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion'

interface MilestoneModalProps {
  isOpen: boolean
  type: 'module_complete' | 'badge_earned'
  moduleNumber?: number
  badgeName?: string
  xpEarned?: number
  onClose: () => void
}

export function MilestoneModal({
  isOpen,
  type,
  moduleNumber,
  badgeName,
  xpEarned = 100,
  onClose,
}: MilestoneModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const prefersReducedMotion = usePreferredMotion()

  useEffect(() => {
    if (isOpen && !prefersReducedMotion) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, prefersReducedMotion])

  if (!isOpen) return null

  const isModuleComplete = type === 'module_complete'
  const title = isModuleComplete ? `Module ${moduleNumber} Complete! 🎉` : `Badge Unlocked! ⭐`
  const message = isModuleComplete
    ? `Great job finishing Module ${moduleNumber}! You earned ${xpEarned} XP.`
    : `You unlocked the "${badgeName}" badge!`

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-300">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {isModuleComplete ? (
                <Trophy className="w-16 h-16 text-amber-400 animate-bounce" />
              ) : (
                <Award className="w-16 h-16 text-indigo-400 animate-bounce" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            <p className="text-slate-400">{message}</p>

            {isModuleComplete && (
              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-sm text-slate-300">
                  Next module unlocked. Ready to continue?
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg font-medium text-white transition-all"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Test modal opens with confetti (if motion allowed)**

Open DevTools, add to `/course/01` page:
```jsx
<MilestoneModal isOpen={true} type="module_complete" moduleNumber={1} xpEarned={250} onClose={() => {}} />
```

Verify:
- Modal displays with celebration message
- Confetti animates (if `prefers-reduced-motion: no-preference`)
- Close button dismisses modal

- [ ] **Step 3: Commit**

```bash
git add components/course/MilestoneModal.tsx
git commit -m "feat: add milestone celebration modal with confetti"
```

---

### Task 6: Create KeyboardShortcutsPanel Component

**Files:**
- Create: `/components/course/KeyboardShortcutsPanel.tsx`

**Interfaces:**
- Consumes: `isOpen: boolean`, `onClose: () => void`
- Produces: `KeyboardShortcutsPanel({ isOpen, onClose })` → React.FC

- [ ] **Step 1: Create shortcuts reference modal**

Create `/components/course/KeyboardShortcutsPanel.tsx`:

```tsx
'use client'

import { X, Keyboard } from 'lucide-react'

interface KeyboardShortcutsPanelProps {
  isOpen: boolean
  onClose: () => void
}

const SHORTCUTS = [
  { key: 'K', description: 'Jump to next section' },
  { key: 'J', description: 'Jump to previous section' },
  { key: '?', description: 'Open this shortcuts panel' },
  { key: 'Esc', description: 'Close panel' },
]

export function KeyboardShortcutsPanel({ isOpen, onClose }: KeyboardShortcutsPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700/50 shadow-xl p-6 max-w-sm w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Keyboard className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-slate-100">Keyboard Shortcuts</h2>
        </div>

        <div className="space-y-3">
          {SHORTCUTS.map(({ key, description }) => (
            <div key={key} className="flex items-center gap-3 text-sm">
              <kbd className="px-2 py-1 bg-slate-700/50 rounded border border-slate-600/50 font-mono text-xs font-semibold text-slate-200 min-w-12">
                {key}
              </kbd>
              <span className="text-slate-400">{description}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm font-medium text-slate-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add hook to listen for '?' key to open panel**

Update `/lib/hooks/useKeyboardShortcuts.ts` (or create new hook):

```tsx
'use client'

import { useEffect, useState } from 'react'

export function useKeyboardShortcuts() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setShortcutsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setShortcutsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return { shortcutsOpen, setShortcutsOpen }
}
```

- [ ] **Step 3: Test panel opens/closes with keyboard**

Visit `/course/01`, press `Cmd+?` (Mac) or `Ctrl+?` (Windows) — panel should open. Press Escape to close.

- [ ] **Step 4: Commit**

```bash
git add components/course/KeyboardShortcutsPanel.tsx lib/hooks/useKeyboardShortcuts.ts
git commit -m "feat: add keyboard shortcuts reference panel"
```

---

### Task 7: Create ShareLesson Component

**Files:**
- Create: `/components/course/ShareLesson.tsx`

**Interfaces:**
- Consumes: `moduleName: string`, `lessonTitle: string`, `url: string`
- Produces: `ShareLesson({ moduleName, lessonTitle, url })` → React.FC

- [ ] **Step 1: Create share component with social buttons**

Create `/components/course/ShareLesson.tsx`:

```tsx
'use client'

import { Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareLessonProps {
  moduleName: string
  lessonTitle: string
  url: string
}

export function ShareLesson({ moduleName, lessonTitle, url }: ShareLessonProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `I'm learning vibe coding! Just completed "${lessonTitle}" from ${moduleName}. Join me at learn2vibecode.com`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyToClipboard}
        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-slate-300"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-slate-400 hover:text-blue-400"
        title="Share on Twitter"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 002.856-3.315c-1.04.6-2.153.994-3.305 1.206 1.186-1.41 2.09-3.645 2.449-6.261zM20.771 6.318a9.996 9.996 0 01-2.828 1.092 4.996 4.996 0 00-8.616 4.56 14.148 14.148 0 01-10.28-5.18 4.996 4.996 0 001.548 6.659 4.98 4.98 0 01-2.263-.57v.063a4.996 4.996 0 004.006 4.903 4.994 4.994 0 01-2.253.085 4.997 4.997 0 004.667 3.476 10.005 10.005 0 01-6.177 2.13c-.398 0-.79-.023-1.175-.067a14.122 14.122 0 007.681 2.25c9.217 0 14.25-7.63 14.25-14.25 0-.217-.005-.433-.015-.648a10.12 10.12 0 002.457-2.548z" />
        </svg>
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-blue-700/20 rounded-lg transition-colors text-slate-400 hover:text-blue-300"
        title="Share on LinkedIn"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Test share buttons open correct URLs**

Add to lesson page footer, verify:
- Copy button copies URL to clipboard, shows checkmark briefly
- Twitter button opens Twitter share dialog
- LinkedIn button opens LinkedIn share dialog

- [ ] **Step 3: Commit**

```bash
git add components/course/ShareLesson.tsx
git commit -m "feat: add social share buttons for lessons"
```

---

### Task 8: Create MobileMenuBurger Component

**Files:**
- Create: `/components/course/MobileMenuBurger.tsx`

**Interfaces:**
- Consumes: `isOpen: boolean`, `onClose: () => void`, `user: User | null`
- Produces: `MobileMenuBurger({ isOpen, onClose, user })` → React.FC

- [ ] **Step 1: Create mobile menu drawer**

Create `/components/course/MobileMenuBurger.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { ProfileMenu } from '@/components/dashboard/ProfileMenu'
import type { User } from '@/lib/types'

interface MobileMenuBurgerProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export function MobileMenuBurger({ isOpen, onClose, user }: MobileMenuBurgerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-30 sm:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-gradient-to-b from-slate-900 to-slate-900/95 backdrop-blur shadow-xl">
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-slate-100">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/course"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-200 transition-colors"
            onClick={onClose}
          >
            Course Map
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-200 transition-colors"
            onClick={onClose}
          >
            Dashboard
          </Link>
          <Link
            href="/capstone"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-200 transition-colors"
            onClick={onClose}
          >
            Capstone
          </Link>
          <Link
            href="/support"
            className="block px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-200 transition-colors"
            onClick={onClose}
          >
            Support
          </Link>
        </nav>

        {user && (
          <div className="border-t border-slate-700/50 p-4">
            <ProfileMenu user={user} />
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Test mobile menu opens/closes on mobile device or resize**

Resize browser to < 768px, click burger menu icon in header, verify drawer opens. Click overlay or close button to close.

- [ ] **Step 3: Commit**

```bash
git add components/course/MobileMenuBurger.tsx
git commit -m "feat: add mobile menu burger drawer"
```

---

### Task 9: Update Lesson Page Layout to Integrate All Components

**Files:**
- Modify: `/app/course/[moduleId]/page.tsx`

**Interfaces:**
- Consumes: All new components (CourseLessonHeader, CoursePageSidebar, MilestoneModal, etc.)
- Produces: Unified lesson page with header, sidebar, modals integrated

- [ ] **Step 1: Add new component imports and state**

Update `/app/course/[moduleId]/page.tsx` (top section):

```tsx
'use client'

import { CourseLessonHeader } from '@/components/course/CourseLessonHeader'
import { CoursePageSidebar } from '@/components/course/CoursePageSidebar'
import { MobileMenuBurger } from '@/components/course/MobileMenuBurger'
import { MilestoneModal } from '@/components/course/MilestoneModal'
import { KeyboardShortcutsPanel } from '@/components/course/KeyboardShortcutsPanel'
import { ShareLesson } from '@/components/course/ShareLesson'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'
import { useState } from 'react'
// ... other imports
```

- [ ] **Step 2: Update page component to use new header and sidebar**

Replace the existing header section in the component:

```tsx
export default function LessonPage({
  params: { moduleId },
  searchParams,
}: LessonPageProps) {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { shortcutsOpen, setShortcutsOpen } = useKeyboardShortcuts()

  // ... existing lesson loading logic

  return (
    <div className="flex flex-col min-h-screen">
      {/* New Header */}
      <CourseLessonHeader
        moduleId={moduleId}
        lessonTitle={lesson?.title || ''}
        user={user || null}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuBurger
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user || null}
      />

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      {/* Main Content Layout */}
      <div className="flex flex-1 gap-6 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Sidebar (visible on lg only) */}
        {user && (
          <CoursePageSidebar
            userId={user.id}
            moduleId={moduleId}
            lessonNumber={lesson?.number || 0}
            lessonTitle={lesson?.title || ''}
            estimatedMinutes={lesson?.estimatedMinutes || 30}
            user={user}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Lesson Content */}
          <article className="prose prose-invert max-w-3xl">
            {/* ... existing lesson markdown rendering */}
          </article>

          {/* Lesson Footer with Share Buttons */}
          <footer className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <ShareLesson
                moduleName={`Module ${moduleId}`}
                lessonTitle={lesson?.title || ''}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />
              {/* ... existing prev/next navigation */}
            </div>
          </footer>
        </div>
      </div>

      {/* Milestone Modal (triggered when module completes) */}
      <MilestoneModal
        isOpen={false} // Replace with actual state when module completes
        type="module_complete"
        moduleNumber={parseInt(moduleId)}
        xpEarned={250}
        onClose={() => {}}
      />
    </div>
  )
}
```

- [ ] **Step 3: Test integrated lesson page**

Visit `/course/01` (logged in), verify:
- Header shows logo, breadcrumb, theme toggle, profile menu
- Sidebar shows XP, streak, badges (on desktop)
- Burger menu appears on mobile
- Share buttons appear in footer
- Keyboard shortcuts panel opens with Cmd+?
- Next lesson preview shows
- All responsive on mobile

- [ ] **Step 4: Commit**

```bash
git add app/course/\[moduleId\]/page.tsx
git commit -m "feat: integrate header, sidebar, mobile menu into lesson page"
```

---

### Task 10: Add Support Link to Footer

**Files:**
- Modify: `/components/Footer.tsx`

**Interfaces:**
- Consumes: existing Footer component
- Produces: Footer with support link added

- [ ] **Step 1: Add support link**

Update `/components/Footer.tsx` to include:

```tsx
<Link href="/support" className="text-slate-400 hover:text-slate-200 transition-colors">
  Support
</Link>
```

- [ ] **Step 2: Test link appears and navigates**

Visit any page, scroll to footer, verify "Support" link appears and navigates to `/support`.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add support link to footer"
```

---

### Task 11: Create useSessionTimer Hook (Optional Polish)

**Files:**
- Create: `/lib/hooks/useSessionTimer.ts`

**Interfaces:**
- Produces: `useSessionTimer()` → `{ elapsed: number, reset: () => void }`

- [ ] **Step 1: Create session timer hook**

Create `/lib/hooks/useSessionTimer.ts`:

```tsx
'use client'

import { useEffect, useState } from 'react'

export function useSessionTimer() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const reset = () => setElapsed(0)

  return { elapsed, reset }
}
```

- [ ] **Step 2: Test hook tracks time**

Add to lesson page, log `elapsed` every second — verify increments.

- [ ] **Step 3: Commit**

```bash
git add lib/hooks/useSessionTimer.ts
git commit -m "feat: add session timer hook for tracking lesson time"
```

---

### Task 12: Clean Up "Accredited" Messaging (Per Brand Update)

**Files:**
- Search: All files mentioning "accredited"
- Modify: as needed

**Interfaces:**
- No new interfaces

- [ ] **Step 1: Find all accredited references**

Run:
```bash
grep -r "accredited\|accreditation\|CEU" --include="*.tsx" --include="*.ts" --include="*.md" app/ components/ content/ lib/ public/
```

- [ ] **Step 2: Remove or update references**

For each match:
- If in CLAUDE.md or legal docs → mark as DRAFT, note "remove before launch"
- If in UI → remove or replace with "learn2vibecode" messaging
- If in quiz/capstone → leave (historical record)

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: remove accreditation messaging (brand update to free platform)"
```

---

### Task 13: Run E2E Tests to Verify Integration

**Files:**
- Test: `/tests/e2e/course-page.spec.ts` (create new test file)

**Interfaces:**
- No new interfaces; uses existing Playwright setup

- [ ] **Step 1: Write E2E test for course page UI**

Create `/tests/e2e/course-page-ui.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

test.describe('Course Page UI', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to lesson page
    await page.goto('/login')
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password')
    await page.click('button:has-text("Sign In")')
    await page.goto('/course/01')
  })

  test('displays unified header with logo, breadcrumb, profile menu', async ({ page }) => {
    // Header visible
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Logo clickable to course map
    const logo = header.locator('a[title="Back to course map"]')
    await expect(logo).toBeVisible()

    // Breadcrumb shows course hierarchy
    const breadcrumb = header.locator('nav').first()
    await expect(breadcrumb).toContainText('Course')
    await expect(breadcrumb).toContainText('Module')

    // Profile menu visible
    const profileBtn = header.locator('button').filter({ hasText: /Profile|Settings/ })
    await expect(profileBtn.first()).toBeVisible()
  })

  test('displays sidebar with stats, time estimate, bookmarks (on desktop)', async ({
    page,
    context,
  }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1280, height: 800 })

    // Sidebar visible
    const sidebar = page.locator('aside')
    await expect(sidebar).toBeVisible()

    // Stats show
    await expect(sidebar).toContainText(/XP|Lvl|streak|badges/)

    // Time estimate visible
    await expect(sidebar).toContainText('min')

    // Bookmark button visible and functional
    const bookmarkBtn = sidebar.locator('button:has-text("Bookmark")')
    await expect(bookmarkBtn).toBeVisible()
    await bookmarkBtn.click()
    await expect(bookmarkBtn).toContainText('Bookmarked')
  })

  test('mobile burger menu opens/closes', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Burger menu button visible
    const burgerBtn = page.locator('header').locator('button[aria-label="Toggle mobile menu"]')
    await expect(burgerBtn).toBeVisible()

    // Click to open menu
    await burgerBtn.click()
    const drawer = page.locator('nav')
    await expect(drawer).toContainText('Course Map')
    await expect(drawer).toContainText('Dashboard')
  })

  test('share buttons work', async ({ page }) => {
    // Share buttons visible in footer
    const footer = page.locator('footer')
    await expect(footer.locator('button[title="Copy link"]')).toBeVisible()

    // Click copy — should show checkmark briefly
    await footer.locator('button[title="Copy link"]').click()
    await expect(footer.locator('svg[class*="text-green"]')).toBeVisible()
  })

  test('keyboard shortcuts panel opens with Cmd+?', async ({ page, browserName }) => {
    // Press Cmd+? (Mac) or Ctrl+? (Windows)
    const modifier = browserName === 'webkit' ? 'Meta' : 'Control'
    await page.keyboard.press(`${modifier}+Shift+/`) // Cmd+?

    // Modal visible
    const modal = page.locator('text=Keyboard Shortcuts')
    await expect(modal).toBeVisible()
  })
})
```

- [ ] **Step 2: Run E2E tests**

Run:
```bash
npx playwright test tests/e2e/course-page-ui.spec.ts --headed
```

Verify all tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/course-page-ui.spec.ts
git commit -m "test: add E2E tests for course page UI components"
```

---

## Spec Coverage Checklist

✅ Unified header (logo, breadcrumb, profile, dashboard link)
✅ Sidebar with stats (XP, level, streak, badges)
✅ Time estimate display
✅ Next lesson preview
✅ Milestone celebration modal
✅ Keyboard shortcuts panel
✅ Share buttons (social + copy)
✅ Mobile burger menu
✅ Bookmarks system
✅ Session timer (optional)
✅ Support link
✅ Remove accreditation messaging
✅ E2E tests
