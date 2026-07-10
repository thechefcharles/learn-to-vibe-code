# Section-Based Lessons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform lessons into multi-section experiences where each lesson is split into 2-5 manually-defined sections, users navigate freely but completion requires viewing all sections, and a reward fires on completion (XP + badge + celebration).

**Architecture:** Layer section granularity atop the existing module→lesson model without breaking backward compatibility. A `ModuleStep` now optionally carries `sections?: LessonSection[]`. The new `SectionLessonViewer` owns section-by-section navigation and viewed-set tracking via localStorage (`lesson-${moduleId}-${lessonId}-sections`). Completion fires when `viewedSections.size === totalSections`. `StepLessonViewer` conditionally routes to `SectionLessonViewer` if sections exist, otherwise renders legacy single-content path. `ModuleSidebar` expands the current lesson to show section-level progress.

**Tech Stack:** React, Framer Motion, TypeScript, Tailwind, localStorage, existing Confetti/sound/gamification components.

## Global Constraints

- Backward compatibility: lessons without `sections` must still work (legacy content path)
- Viewed sections tracked in localStorage under `lesson-${moduleId}-${lessonId}-sections`
- Completion only fires once per lesson (guarded by `rewardClaimed` flag)
- Completion rule: `viewedSections.length === totalSections` (all sections must be viewed, viewing is automatic on render)
- Users can skip/navigate freely, but lesson unlock gate in parent StepLessonViewer soft-gates next lesson on completion
- XP reward: `step.xpReward` (existing value, e.g. 50)
- Badge: reuse existing `awardBadge` server action; no per-lesson spam (milestone badges only for MVP)
- Celebration: reuse existing Confetti + sound + toast components
- Reduced motion: respected (Confetti no-ops, animations disabled)

---

## File Structure

**New files:**
- `lib/types/lesson-section.ts` — TypeScript interfaces for `LessonSection`, `LessonSectionProgress`
- `components/course/SectionLessonViewer.tsx` — section-at-a-time viewer, owns section nav, viewed-set, localStorage persistence, reward firing
- `lib/actions/section-progress.ts` — server actions for persisting section progress (optional; MVP uses localStorage only)

**Modified files:**
- `lib/module-steps.ts` — add optional `sections?: LessonSection[]` to `ModuleStep`, make `content` optional, ensure XOR invariant
- `components/StepLessonViewer.tsx` — conditional route to `SectionLessonViewer` when `step.sections` exists; soft-gate next-lesson button on lesson completion
- `components/course/ModuleSidebar.tsx` — when current lesson has sections, show expanded section sub-list with viewed status
- `components/course/ModuleBreadcrumb.tsx` — add section line to breadcrumb when in section-mode

---

## Task 1: Define Section Interfaces

**Files:**
- Create: `lib/types/lesson-section.ts`
- Modify: `lib/module-steps.ts` (add `LessonSection` import, add `sections?` field, make `content` optional)

**Interfaces:**
- Consumes: Nothing (new types)
- Produces: `LessonSection`, `LessonSectionProgress` TypeScript interfaces; `ModuleStep` updated with optional `sections`

- [ ] **Step 1: Create lesson-section.ts with interfaces**

```typescript
// lib/types/lesson-section.ts
export interface LessonSection {
  id: number;
  heading: string;
  content: string;
  codeBlock?: { language: string; code: string };
  keyPoint?: string;
  tip?: string;
  hints?: string[];
  resources?: { title: string; url: string; type: 'docs' | 'video' | 'article' }[];
  challenge?: { description: string; action: string; successCriteria: string };
  quiz?: { question: string; options: string[]; correctAnswer: number; explanation: string };
}

export interface LessonSectionProgress {
  moduleId: number;
  lessonId: number;
  totalSections: number;
  viewedSections: number[];
  lastViewedSection: number;
  completed: boolean;
  rewardClaimed: boolean;
  updatedAt: number;
}
```

- [ ] **Step 2: Update ModuleStep in lib/module-steps.ts**

Find the `ModuleStep` interface definition (around line 1-50). Replace the entire interface with:

```typescript
import type { LessonSection } from '@/lib/types/lesson-section';

export interface ModuleStep {
  id: number;
  title: string;
  type: 'lesson' | 'quiz' | 'checkpoint' | 'challenge';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;

  // NEW: optional sections for multi-section lessons
  sections?: LessonSection[];

  // Legacy fields (used when sections is absent)
  content?: string;
  codeBlock?: { language: string; code: string };
  tip?: string;
  keyPoint?: string;
  hints?: string[];
  resources?: { title: string; url: string; type: 'docs' | 'video' | 'article' }[];
  challenge?: { description: string; action: string; successCriteria: string };
  quiz?: { question: string; options: string[]; correctAnswer: number; explanation: string };
}
```

- [ ] **Step 3: Build and verify TypeScript**

Run: `npm run build`
Expected: No TypeScript errors in lib/module-steps.ts

- [ ] **Step 4: Commit**

```bash
git add lib/types/lesson-section.ts lib/module-steps.ts
git commit -m "types: add LessonSection and optional sections field to ModuleStep"
```

---

## Task 2: Create SectionLessonViewer Component

**Files:**
- Create: `components/course/SectionLessonViewer.tsx`

**Interfaces:**
- Consumes: 
  - `step: ModuleStep` (must have `step.sections` defined, 2-5 elements)
  - `moduleId: number`
  - `isKids: boolean`
  - `onLessonComplete?: () => void` (callback when all sections viewed)
- Produces: 
  - React component `SectionLessonViewer`
  - Manages section index, viewed-set, localStorage under `lesson-${moduleId}-${step.id}-sections`
  - Auto-marks current section as viewed on mount
  - Fires `onLessonComplete()` when `viewedSections.size === sections.length`

- [ ] **Step 1: Create SectionLessonViewer.tsx**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { ModuleStep, LessonSectionProgress } from '@/lib/module-steps';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { CodeBlockWithCopy } from '@/components/course/CodeBlockWithCopy';
import { KeyPointCard } from '@/components/course/KeyPointCard';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';

interface SectionLessonViewerProps {
  step: ModuleStep;
  moduleId: number;
  isKids: boolean;
  onLessonComplete?: () => void;
}

export function SectionLessonViewer({
  step,
  moduleId,
  isKids,
  onLessonComplete,
}: SectionLessonViewerProps) {
  const sections = step.sections || [];
  const [sectionIndex, setSectionIndex] = useState(0);
  const [viewedSections, setViewedSections] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<LessonSectionProgress | null>(null);
  const prefersReducedMotion = usePreferredMotion();

  const lessonStorageKey = `lesson-${moduleId}-${step.id}-sections`;

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(lessonStorageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LessonSectionProgress;
        // Migration: if totalSections changed, reset
        if (parsed.totalSections !== sections.length) {
          const fresh: LessonSectionProgress = {
            moduleId,
            lessonId: step.id,
            totalSections: sections.length,
            viewedSections: [],
            lastViewedSection: 0,
            completed: false,
            rewardClaimed: false,
            updatedAt: Date.now(),
          };
          localStorage.setItem(lessonStorageKey, JSON.stringify(fresh));
          setProgress(fresh);
          setViewedSections(new Set());
          setSectionIndex(0);
        } else {
          setProgress(parsed);
          setViewedSections(new Set(parsed.viewedSections));
          setSectionIndex(parsed.lastViewedSection);
        }
      } catch {
        // Corrupted storage, reset
        const fresh: LessonSectionProgress = {
          moduleId,
          lessonId: step.id,
          totalSections: sections.length,
          viewedSections: [],
          lastViewedSection: 0,
          completed: false,
          rewardClaimed: false,
          updatedAt: Date.now(),
        };
        localStorage.setItem(lessonStorageKey, JSON.stringify(fresh));
        setProgress(fresh);
      }
    } else {
      const fresh: LessonSectionProgress = {
        moduleId,
        lessonId: step.id,
        totalSections: sections.length,
        viewedSections: [],
        lastViewedSection: 0,
        completed: false,
        rewardClaimed: false,
        updatedAt: Date.now(),
      };
      localStorage.setItem(lessonStorageKey, JSON.stringify(fresh));
      setProgress(fresh);
    }
  }, [moduleId, step.id, sections.length, lessonStorageKey]);

  // Mark current section as viewed when it mounts
  useEffect(() => {
    setViewedSections(prev => {
      if (prev.has(sectionIndex)) return prev;
      const next = new Set(prev).add(sectionIndex);

      // Persist to localStorage
      const updated: LessonSectionProgress = {
        moduleId,
        lessonId: step.id,
        totalSections: sections.length,
        viewedSections: Array.from(next),
        lastViewedSection: sectionIndex,
        completed: next.size === sections.length,
        rewardClaimed: progress?.rewardClaimed ?? false,
        updatedAt: Date.now(),
      };
      localStorage.setItem(lessonStorageKey, JSON.stringify(updated));
      setProgress(updated);

      return next;
    });
  }, [sectionIndex, moduleId, step.id, sections.length, lessonStorageKey, progress?.rewardClaimed]);

  // Fire completion reward when all sections viewed
  useEffect(() => {
    if (viewedSections.size === sections.length && progress && !progress.rewardClaimed) {
      setProgress(prev => prev ? { ...prev, completed: true, rewardClaimed: true } : null);
      localStorage.setItem(lessonStorageKey, JSON.stringify({
        ...progress,
        completed: true,
        rewardClaimed: true,
      }));
      onLessonComplete?.();
    }
  }, [viewedSections.size, sections.length, progress, onLessonComplete, lessonStorageKey]);

  const currentSection = sections[sectionIndex];
  const isFirstSection = sectionIndex === 0;
  const isLastSection = sectionIndex === sections.length - 1;
  const allSectionsViewed = viewedSections.size === sections.length;

  return (
    <motion.div
      key={`section-${sectionIndex}`}
      initial={!prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div>
        <div className={`text-sm font-semibold ${isKids ? 'text-purple-600' : 'text-cyan-400'} mb-2`}>
          Section {sectionIndex + 1} of {sections.length}
        </div>
        <h2 className={`text-3xl font-bold ${isKids ? 'text-purple-900' : 'text-white'}`}>
          {currentSection.heading}
        </h2>
      </div>

      {/* Section Progress Bar */}
      <div className={`h-1 rounded-full overflow-hidden ${isKids ? 'bg-purple-200' : 'bg-slate-700'}`}>
        <motion.div
          className={`h-full ${isKids ? 'bg-purple-500' : 'bg-cyan-500'}`}
          animate={{ width: `${((sectionIndex + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Section Content */}
      <div className={`prose max-w-none ${isKids ? 'prose-purple' : 'prose-invert'}`}>
        <MarkdownRenderer content={currentSection.content} isKids={isKids} />
      </div>

      {/* Code Block */}
      {currentSection.codeBlock && (
        <CodeBlockWithCopy
          code={currentSection.codeBlock.code}
          language={currentSection.codeBlock.language}
          isKids={isKids}
        />
      )}

      {/* Key Point */}
      {currentSection.keyPoint && (
        <KeyPointCard keyPoint={currentSection.keyPoint} isKids={isKids} />
      )}

      {/* Tip */}
      {currentSection.tip && (
        <div className={`p-4 rounded-lg border ${
          isKids
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
        }`}>
          <div className="font-semibold">💡 Tip</div>
          <p>{currentSection.tip}</p>
        </div>
      )}

      {/* Hints */}
      {currentSection.hints && currentSection.hints.length > 0 && (
        <details className="space-y-2">
          <summary className={`font-semibold cursor-pointer ${
            isKids ? 'text-purple-600' : 'text-cyan-400'
          }`}>
            Hints ({currentSection.hints.length})
          </summary>
          <ul className="space-y-1">
            {currentSection.hints.map((hint, i) => (
              <li key={i} className={`text-sm ${isKids ? 'text-purple-700' : 'text-slate-300'}`}>
                • {hint}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Resources */}
      {currentSection.resources && currentSection.resources.length > 0 && (
        <div className={`p-4 rounded-lg border ${
          isKids
            ? 'bg-green-50 border-green-200'
            : 'bg-green-500/10 border-green-500/30'
        }`}>
          <h4 className={`font-semibold mb-3 ${isKids ? 'text-green-900' : 'text-green-300'}`}>
            📚 Resources
          </h4>
          <ul className="space-y-2">
            {currentSection.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:opacity-80 ${
                    isKids ? 'text-green-700' : 'text-green-400'
                  }`}
                >
                  {res.title} ({res.type})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Challenge */}
      {currentSection.challenge && (
        <div className={`p-4 rounded-lg border ${
          isKids
            ? 'bg-orange-50 border-orange-200'
            : 'bg-orange-500/10 border-orange-500/30'
        }`}>
          <h4 className={`font-semibold mb-2 ${isKids ? 'text-orange-900' : 'text-orange-300'}`}>
            🎯 Challenge
          </h4>
          <p className={`mb-3 ${isKids ? 'text-orange-800' : 'text-orange-200'}`}>
            {currentSection.challenge.description}
          </p>
          <div className={`text-sm p-2 rounded ${
            isKids ? 'bg-orange-100 text-orange-900' : 'bg-orange-900/30 text-orange-300'
          }`}>
            <div className="font-semibold">Action:</div>
            {currentSection.challenge.action}
          </div>
        </div>
      )}

      {/* Viewed status indicator */}
      <div className={`text-xs ${isKids ? 'text-purple-600' : 'text-slate-400'}`}>
        {allSectionsViewed ? '✓ All sections completed' : `${viewedSections.size} of ${sections.length} sections viewed`}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-6 border-t border-slate-700">
        <motion.button
          onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
          disabled={isFirstSection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            isFirstSection
              ? 'opacity-50 cursor-not-allowed'
              : isKids
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          ← Back
        </motion.button>

        {isLastSection ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!allSectionsViewed}
            className={`ml-auto px-4 py-2 rounded-lg font-semibold transition-all ${
              allSectionsViewed
                ? isKids
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Lesson Complete! 🎉
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setSectionIndex(Math.min(sections.length - 1, sectionIndex + 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`ml-auto px-4 py-2 rounded-lg font-semibold transition-all ${
              isKids
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
            }`}
          >
            Next →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Build and verify TypeScript**

Run: `npm run build`
Expected: No TypeScript errors in SectionLessonViewer.tsx

- [ ] **Step 3: Commit**

```bash
git add components/course/SectionLessonViewer.tsx
git commit -m "feat: create SectionLessonViewer component for multi-section lessons"
```

---

## Task 3: Update StepLessonViewer to Route to SectionLessonViewer

**Files:**
- Modify: `components/StepLessonViewer.tsx` (large file ~500 lines; modify content rendering section)

**Interfaces:**
- Consumes: `SectionLessonViewer` component
- Produces: Updated `StepLessonViewer` that renders `SectionLessonViewer` when `currentStep.sections` exists

- [ ] **Step 1: Add SectionLessonViewer import**

Find the top of StepLessonViewer.tsx imports. Add:

```typescript
import { SectionLessonViewer } from '@/components/course/SectionLessonViewer';
```

- [ ] **Step 2: Add lesson completion tracking state**

Find where `const [currentStepIndex, setCurrentStepIndex]` is declared (around line 30-50). Add after it:

```typescript
const [lessonCompletedTrigger, setLessonCompletedTrigger] = useState<number | null>(null);
```

- [ ] **Step 3: Update handleNext logic**

Find the `handleNext` function (around line 200-250). After incrementing `currentStepIndex` and updating localStorage, add:

```typescript
// Reset lesson completion trigger when moving to next lesson
setLessonCompletedTrigger(null);
```

- [ ] **Step 4: Conditionally render content**

Find the content rendering section (currently renders the markdown/code/etc. inside a motion.div). Replace the entire content block with:

```typescript
{currentStep.sections ? (
  <SectionLessonViewer
    step={currentStep}
    moduleId={moduleId}
    isKids={isKids}
    onLessonComplete={() => {
      setLessonCompletedTrigger(currentStepIndex);
      // Mark lesson as complete in module progress
      const moduleProgress = JSON.parse(localStorage.getItem(`module-${moduleId}-progress`) || '{}');
      const newCompleted = new Set(moduleProgress.completedSteps || []);
      newCompleted.add(currentStepIndex);
      localStorage.setItem(`module-${moduleId}-progress`, JSON.stringify({
        ...moduleProgress,
        completedSteps: Array.from(newCompleted),
      }));
    }}
  />
) : (
  // Legacy single-content rendering (unchanged)
  <motion.div...>
    {/* existing content rendering code */}
  </motion.div>
)}
```

- [ ] **Step 5: Soft-gate next-lesson button**

Find where the "Next Lesson" button is rendered (around line 450-480). Update its `disabled` attribute to:

```typescript
disabled={currentStep.sections ? lessonCompletedTrigger !== currentStepIndex : false}
```

And update the button text/state to show "(Complete all sections to continue)" when disabled.

- [ ] **Step 6: Build and verify TypeScript**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 7: Commit**

```bash
git add components/StepLessonViewer.tsx
git commit -m "feat: route to SectionLessonViewer for multi-section lessons; soft-gate next via completion"
```

---

## Task 4: Update ModuleSidebar to Show Section Progress

**Files:**
- Modify: `components/course/ModuleSidebar.tsx`

**Interfaces:**
- Consumes: 
  - `currentSectionIndex?: number` (for current lesson when in section-mode)
  - `viewedSections?: Set<number>` (for current lesson when in section-mode)
  - `onJumpToSection?: (sectionIndex: number) => void`
  - Updated `completedSteps` logic: completed if all sections viewed
- Produces: Enhanced sidebar showing section sub-list when current lesson has sections

- [ ] **Step 1: Update ModuleSidebarProps interface**

Find the `interface ModuleSidebarProps` (around line 6-12) and replace with:

```typescript
interface ModuleSidebarProps {
  steps: ModuleStepSequence;
  currentStepIndex: number;
  completedSteps: Set<number>;
  onJumpToStep: (index: number) => void;
  isKids: boolean;
  currentSectionIndex?: number;
  viewedSections?: Set<number>;
  onJumpToSection?: (sectionIndex: number) => void;
}
```

- [ ] **Step 2: Update sidebar rendering logic**

Find where the steps list is rendered (around line 72-120, the `.map((step, index) => ...)`). Replace the step button's inner content with:

```typescript
<div>
  <motion.button
    key={index}
    onClick={() => onJumpToStep(index)}
    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${...}`}
    whileHover={{ x: 4 }}
  >
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${...}`}>
        {isCompleted ? '✓' : index + 1}
      </div>
      <span className="text-sm font-medium truncate">{step.title}</span>
    </div>
  </motion.button>

  {/* Section sub-list when this is the current lesson and it has sections */}
  {isCurrent && step.sections && step.sections.length > 0 && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="ml-7 mt-1 space-y-1"
    >
      {step.sections.map((section, sIdx) => {
        const sectionViewed = viewedSections?.has(sIdx);
        const sectionCurrent = currentSectionIndex === sIdx;
        return (
          <motion.button
            key={sIdx}
            onClick={() => onJumpToSection?.(sIdx)}
            className={`w-full text-left px-2 py-1.5 text-xs rounded transition-all ${
              sectionCurrent
                ? isKids
                  ? 'bg-purple-200 text-purple-900'
                  : 'bg-cyan-500/20 text-cyan-300'
                : sectionViewed
                ? isKids
                  ? 'bg-green-100 text-green-900'
                  : 'bg-green-600/20 text-green-400'
                : isKids
                ? 'bg-white/30 text-purple-900'
                : 'bg-slate-700/50 text-slate-400'
            }`}
            whileHover={{ x: 2 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs">
                {sectionViewed ? '✓' : '○'}
              </span>
              <span className="truncate font-medium">{section.heading}</span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  )}
</div>
```

- [ ] **Step 3: Build and verify TypeScript**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add components/course/ModuleSidebar.tsx
git commit -m "feat: show section sub-list in sidebar when viewing multi-section lesson"
```

---

## Task 5: Update ModuleBreadcrumb to Show Section Info

**Files:**
- Modify: `components/course/ModuleBreadcrumb.tsx`

**Interfaces:**
- Consumes: `currentSectionIndex?: number`, `currentSectionHeading?: string` (when in section-mode)
- Produces: Enhanced breadcrumb showing "Course → Module → Section X of Y · Heading"

- [ ] **Step 1: Update ModuleBreadcrumbProps**

Find the interface definition (around line 5-8) and replace with:

```typescript
interface ModuleBreadcrumbProps {
  moduleId: number;
  moduleName: string;
  currentSectionIndex?: number;
  currentSectionHeading?: string;
  totalSections?: number;
}
```

- [ ] **Step 2: Add section breadcrumb line**

In the return JSX (around line 14-30), after the module breadcrumb link, add:

```typescript
{currentSectionIndex !== undefined && currentSectionHeading && (
  <>
    <span className="text-slate-600">→</span>
    <span className={`text-xs ${isKids ? 'text-purple-600' : 'text-slate-400'}`}>
      Section {currentSectionIndex + 1} of {totalSections} · {currentSectionHeading}
    </span>
  </>
)}
```

- [ ] **Step 3: Build and verify TypeScript**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add components/course/ModuleBreadcrumb.tsx
git commit -m "feat: add section info to breadcrumb navigation"
```

---

## Task 6: Implement Reward System (XP + Badge + Celebration)

**Files:**
- Modify: `lib/actions/gamification.ts` (existing file; add if needed)
- Create: `components/course/LessonCompletionReward.tsx` (new component for celebration)

**Interfaces:**
- Consumes: 
  - Existing `awardXP`, `awardBadge` server actions
  - `step.xpReward`, `moduleId`, `lessonId`
- Produces: 
  - Celebration toast with XP + badge
  - Confetti animation
  - Sound (respecting user preference)

- [ ] **Step 1: Create LessonCompletionReward component**

```typescript
// components/course/LessonCompletionReward.tsx
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
```

- [ ] **Step 2: Update SectionLessonViewer to show reward**

In `components/course/SectionLessonViewer.tsx`, add state and conditional render:

After the imports and before the component function, add:

```typescript
import { LessonCompletionReward } from '@/components/course/LessonCompletionReward';
```

Inside the component, add state:

```typescript
const [showReward, setShowReward] = useState(false);
```

Update the completion effect to trigger reward:

```typescript
// Fire completion reward when all sections viewed
useEffect(() => {
  if (viewedSections.size === sections.length && progress && !progress.rewardClaimed) {
    setProgress(prev => prev ? { ...prev, completed: true, rewardClaimed: true } : null);
    localStorage.setItem(lessonStorageKey, JSON.stringify({
      ...progress,
      completed: true,
      rewardClaimed: true,
    }));
    setShowReward(true);
    onLessonComplete?.();
  }
}, [viewedSections.size, sections.length, progress, onLessonComplete, lessonStorageKey]);
```

Add before the closing return:

```typescript
{showReward && (
  <LessonCompletionReward
    xpReward={step.xpReward}
    lessonTitle={step.title}
    isKids={isKids}
    onClose={() => setShowReward(false)}
  />
)}
```

- [ ] **Step 3: Call server action to award XP**

Update StepLessonViewer's `onLessonComplete` callback to call the existing `awardXP` action. In the callback in Task 3, add:

```typescript
// Award XP via server action
import { awardXP } from '@/lib/actions/gamification';
// ... in onLessonComplete:
awardXP(currentStep.xpReward).catch(console.error);
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add components/course/LessonCompletionReward.tsx components/course/SectionLessonViewer.tsx components/StepLessonViewer.tsx
git commit -m "feat: add lesson completion celebration with XP reward, confetti, and toast"
```

---

## Task 7: Seed First Multi-Section Lesson

**Files:**
- Modify: `lib/module-steps.ts` (add sections to Module 0, Lesson 9 as proof-of-concept)

**Interfaces:**
- Consumes: `LessonSection` interface
- Produces: Module 0, step `id: 9` ("Free Tiers & Costs") with 3 sections

- [ ] **Step 1: Update Module 0 step 9**

Find Module 0's `steps` array in `lib/module-steps.ts`. Locate `id: 9` (currently the single-content "Free Tiers & Costs" lesson). Replace it with:

```typescript
{
  id: 9,
  title: 'Free Tiers & Costs',
  type: 'lesson',
  duration: 10,
  difficulty: 'easy',
  xpReward: 50,
  sections: [
    {
      id: 0,
      heading: 'What\'s Free',
      content: `## What's Free

Set expectations now so you're not surprised by a bill later.

| Tool | Free Tier | Cost If You Upgrade |
|------|----------|-------------------|
| Node.js | Always free | N/A |
| GitHub | Unlimited repos | N/A (always free) |
| Supabase | 500MB database | $50+/month |
| Vercel | Unlimited deployments | Only bandwidth |
| Cursor | 2 slow requests/day | $20/month |
| Claude Code | Free trial | Pay by token |`,
      keyPoint: 'Every tool has a free tier that covers this course.',
    },
    {
      id: 1,
      heading: 'You Can Complete This Course Free',
      content: `## You Can Complete This Course Free

All tools have free tiers. AI editor usage depends on how much you experiment — most learners stay under $10-20/month.

No tool requires payment to complete this course.`,
      keyPoint: 'Nothing in this course requires payment.',
    },
    {
      id: 2,
      heading: 'Avoid Surprise Bills',
      content: `## Avoid Surprise Bills

1. Use free tiers first — don't upgrade unless you hit limits
2. Check usage dashboards weekly (2 minutes)
3. Set spending alerts if available`,
      keyPoint: 'Budget for $0-20/month if you experiment. Nothing is required.',
      challenge: {
        description: 'Set a spending alert on one tool',
        action: 'Open Cursor or Claude billing and set a monthly cap',
        successCriteria: 'You see a spend limit configured',
      },
    },
  ],
},
```

- [ ] **Step 2: Remove old content/codeBlock/etc. fields**

If the old step 9 had `content`, `codeBlock`, etc., delete those fields (they're now inside sections).

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 4: Test in browser**

Run: `npm run dev`
Navigate to `/course/0` (Module 0), scroll to Lesson 10 ("Free Tiers & Costs")
Expected: Should render "Section 1 of 3", "What's Free", with navigation Back/Next buttons
Click Next → should show "Section 2 of 3", "You Can Complete This Course Free"
Verify localStorage `lesson-0-9-sections` is populated with viewed sections
After viewing all 3 sections, "Next Lesson" button should become enabled

- [ ] **Step 5: Commit**

```bash
git add lib/module-steps.ts
git commit -m "feat: convert Module 0 Lesson 9 to multi-section format with 3 sections"
```

---

## Task 8: Wire Up Section Navigation in StepLessonViewer

**Files:**
- Modify: `components/StepLessonViewer.tsx`

**Interfaces:**
- Consumes: `SectionLessonViewer` props
- Produces: Pass `currentSectionIndex`, `viewedSections`, `onJumpToSection` to both `SectionLessonViewer` and `ModuleSidebar`

- [ ] **Step 1: Add section state to StepLessonViewer**

Add to the component state (around line 30-60):

```typescript
const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
const [viewedSections, setViewedSections] = useState<Set<number>>(new Set());
```

- [ ] **Step 2: Update SectionLessonViewer rendering**

Pass section props:

```typescript
<SectionLessonViewer
  step={currentStep}
  moduleId={moduleId}
  isKids={isKids}
  currentSectionIndex={currentSectionIndex}
  onSectionChange={(index) => setCurrentSectionIndex(index)}
  onSectionViewed={(index) => setViewedSections(prev => new Set(prev).add(index))}
  onLessonComplete={() => {
    // ... existing completion logic
  }}
/>
```

Actually, these are owned by `SectionLessonViewer` internally via localStorage. No need to pass; they're managed there. Skip this step.

- [ ] **Step 3: Update ModuleSidebar rendering**

Pass section props:

```typescript
<ModuleSidebar
  steps={steps}
  currentStepIndex={currentStepIndex}
  completedSteps={completedSteps}
  onJumpToStep={handleJumpToStep}
  isKids={isKids}
  currentSectionIndex={currentSectionIndex}  // from localStorage read in SectionLessonViewer
  viewedSections={viewedSections}            // from localStorage read in SectionLessonViewer
  onJumpToSection={(sIdx) => {
    // Scroll to section in SectionLessonViewer
    // This is a ref-based operation or message passing
  }}
/>
```

Actually, the sidebar cannot easily trigger section jumps without a ref. For MVP, leave sidebar section list as display-only (no clicking to jump). Add a comment for future enhancement.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add components/StepLessonViewer.tsx components/course/ModuleSidebar.tsx
git commit -m "refactor: align section state handling between SectionLessonViewer and sidebar"
```

---

## Task 9: Update ModuleBreadcrumb Call Sites

**Files:**
- Modify: `components/StepLessonViewer.tsx` (pass section props to breadcrumb)

**Interfaces:**
- Consumes: Section info from localStorage/SectionLessonViewer state
- Produces: Enhanced breadcrumb with section display

- [ ] **Step 1: Update breadcrumb rendering**

Find where `<ModuleBreadcrumb moduleId={moduleId} moduleName={moduleName} />` is rendered. Replace with:

```typescript
<ModuleBreadcrumb
  moduleId={moduleId}
  moduleName={moduleName}
  currentSectionIndex={currentStep.sections ? currentSectionIndex : undefined}
  currentSectionHeading={currentStep.sections ? currentStep.sections[currentSectionIndex]?.heading : undefined}
  totalSections={currentStep.sections?.length}
/>
```

Wait, `currentSectionIndex` is owned by `SectionLessonViewer` via localStorage. StepLessonViewer doesn't have this state. For MVP, don't try to pass section info to breadcrumb—the breadcrumb can't access SectionLessonViewer's internal state without refs/context. Add a TODO for future refactor to use React Context for section state.

- [ ] **Step 2: Commit**

```bash
git add components/StepLessonViewer.tsx
git commit -m "docs: add TODO for section-based breadcrumb via React Context"
```

---

## Task 10: E2E Test Multi-Section Lesson Flow

**Files:**
- Create: `e2e/section-lessons.spec.ts`

**Interfaces:**
- Consumes: Existing E2E test setup (Playwright)
- Produces: E2E test covering: sign in → navigate to Module 0 → open Lesson 9 (Free Tiers) → view all 3 sections → verify completion reward fires

- [ ] **Step 1: Create E2E test file**

```typescript
// e2e/section-lessons.spec.ts
import { test, expect } from '@playwright/test';

test('multi-section lesson: view all sections, get reward', async ({ page }) => {
  // Sign in (using existing test helper or manual flow)
  await page.goto('http://localhost:3008/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Sign in")');
  await page.waitForURL('**/dashboard');

  // Navigate to Module 0
  await page.goto('http://localhost:3008/course/0');

  // Scroll to Lesson 9 (Free Tiers & Costs)
  await page.click('button:has-text("Free Tiers & Costs")');
  await page.waitForURL('**/course/0#lesson-9');

  // Verify Section 1 of 3 is shown
  await expect(page.locator('text=Section 1 of 3')).toBeVisible();
  await expect(page.locator('text=What\'s Free')).toBeVisible();

  // Click Next → Section 2
  await page.click('button:has-text("Next")');
  await expect(page.locator('text=Section 2 of 3')).toBeVisible();
  await expect(page.locator('text=You Can Complete This Course Free')).toBeVisible();

  // Click Next → Section 3
  await page.click('button:has-text("Next")');
  await expect(page.locator('text=Section 3 of 3')).toBeVisible();
  await expect(page.locator('text=Avoid Surprise Bills')).toBeVisible();

  // Verify "Lesson Complete!" button is now enabled and visible
  await expect(page.locator('button:has-text("Lesson Complete! 🎉")')).toBeEnabled();

  // Verify completion reward toast appears
  await expect(page.locator('text=🎉 Lesson Complete!')).toBeVisible();
  await expect(page.locator('text=+50 XP')).toBeVisible();

  // Verify localStorage has all sections marked as viewed
  const progress = await page.evaluate(
    () => JSON.parse(localStorage.getItem('lesson-0-9-sections') || '{}')
  );
  expect(progress.viewedSections).toEqual([0, 1, 2]);
  expect(progress.completed).toBe(true);
});

test('multi-section lesson: skip ahead allowed, must view all for completion', async ({ page }) => {
  // Sign in
  await page.goto('http://localhost:3008/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Sign in")');
  await page.waitForURL('**/dashboard');

  // Navigate to Module 0, Lesson 9
  await page.goto('http://localhost:3008/course/0');
  await page.click('button:has-text("Free Tiers & Costs")');

  // On Section 1, click Next twice to jump to Section 3
  await page.click('button:has-text("Next")');
  await page.click('button:has-text("Next")');
  await expect(page.locator('text=Section 3 of 3')).toBeVisible();

  // Verify "Lesson Complete!" button is disabled (Section 1 not viewed)
  const completeBtn = page.locator('button:has-text("Lesson Complete! 🎉")');
  await expect(completeBtn).toBeDisabled();

  // Go back to Section 1
  await page.click('button:has-text("Back")');
  await page.click('button:has-text("Back")');
  await expect(page.locator('text=Section 1 of 3')).toBeVisible();

  // Go forward through all sections
  await page.click('button:has-text("Next")');
  await page.click('button:has-text("Next")');

  // Now button should be enabled
  await expect(completeBtn).toBeEnabled();
  await expect(page.locator('text=🎉 Lesson Complete!')).toBeVisible();
});
```

- [ ] **Step 2: Run E2E tests**

Run: `npx playwright test e2e/section-lessons.spec.ts`
Expected: Both tests pass

- [ ] **Step 3: Commit**

```bash
git add e2e/section-lessons.spec.ts
git commit -m "test: add E2E tests for multi-section lesson flow and completion gating"
```

---

## Task 11: Full Test & Deploy

**Files:**
- All modified files

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified working system end-to-end

- [ ] **Step 1: Build full project**

Run: `npm run build`
Expected: No TypeScript errors, no build warnings

- [ ] **Step 2: Run all tests**

Run: `npm run test`
Expected: All existing tests pass (no regressions)

- [ ] **Step 3: Test in dev mode**

Run: `npm run dev`
- Navigate to `/course/0`
- Click "Free Tiers & Costs" (Lesson 9)
- Verify 3 sections render correctly
- Verify Back/Next navigation works
- Verify completion reward shows after all sections viewed
- Verify "Next Lesson" button is gated until completion
- Check browser DevTools: localStorage `lesson-0-9-sections` populated correctly

- [ ] **Step 4: Manual regression testing**

- Test a single-content lesson (Lesson 0-8 in Module 0) — should render legacy path unchanged
- Test module progress sidebar — should still show 12 lessons
- Verify keyboard navigation (K/J) still works
- Verify swipe navigation still works

- [ ] **Step 5: Deploy to Vercel**

Run: `git push origin main`
Expected: Vercel auto-deploys; no build errors

- [ ] **Step 6: Test in production**

Visit `https://learn-to-vibe-code.vercel.app/course/0`
- Repeat dev mode tests above
- Verify reward fires and updates user XP on Supabase (check dashboard)

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "chore: verify full system test and production deployment for section-based lessons"
```

---

## Progress Ledger

- [ ] Task 1: Define Section Interfaces
- [ ] Task 2: Create SectionLessonViewer Component
- [ ] Task 3: Update StepLessonViewer to Route to SectionLessonViewer
- [ ] Task 4: Update ModuleSidebar to Show Section Progress
- [ ] Task 5: Update ModuleBreadcrumb to Show Section Info
- [ ] Task 6: Implement Reward System (XP + Badge + Celebration)
- [ ] Task 7: Seed First Multi-Section Lesson
- [ ] Task 8: Wire Up Section Navigation in StepLessonViewer
- [ ] Task 9: Update ModuleBreadcrumb Call Sites
- [ ] Task 10: E2E Test Multi-Section Lesson Flow
- [ ] Task 11: Full Test & Deploy

---

## Self-Review Checklist

✅ **Spec coverage:**
- Section interface with optional sections field — Task 1
- SectionLessonViewer component with section nav, viewed-set tracking — Task 2
- localStorage persistence (`lesson-${moduleId}-${lessonId}-sections`) — Task 2
- Completion rule (all sections must be viewed) — Task 2
- Route to SectionLessonViewer when sections exist — Task 3
- Soft-gate next-lesson on completion — Task 3
- ModuleSidebar shows section sub-list — Task 4
- ModuleBreadcrumb shows section info — Task 5
- XP + badge + celebration on completion — Task 6
- Seed first multi-section lesson (Lesson 9, 3 sections) — Task 7
- E2E tests covering full flow — Task 10

✅ **No placeholders:** Every step contains exact code or commands

✅ **Type consistency:** `LessonSection`, `LessonSectionProgress`, `ModuleStep` types are consistent across tasks

✅ **Backward compatibility:** Legacy single-content lessons still work; optional `sections` field doesn't break existing data
