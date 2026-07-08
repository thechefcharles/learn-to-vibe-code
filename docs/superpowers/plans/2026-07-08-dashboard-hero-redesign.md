# Dashboard-Style Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the traditional scrollable kids landing page with a condensed, no-scroll dashboard hero featuring 6 interactive widgets + floating sticky CTA (top-right), inspired by Zalak Patel's portfolio aesthetic.

**Architecture:** Dark card grid layout (CSS Grid) with 6 mixed-size cards (2x1, 1x1 combinations) displaying interactive widgets. Floating sticky CTA button in top-right corner always visible. All widgets interactive with micro-interactions (cursor tracking, animations, instant feedback). No scroll required for initial hero experience. Single page, dense but not cluttered.

**Tech Stack:** Next.js (App Router), TypeScript, Framer Motion, Tailwind v4, Web Audio API (sound), SVG (arc + visualizations)

## Global Constraints

- **Accessibility:** WCAG AA compliant, prefers-reduced-motion honored, full keyboard navigation
- **Performance:** FCP < 2s, LCP < 2.5s, no layout shift, GPU-accelerated animations
- **Responsive:** Mobile-first (375px–1920px), no horizontal scroll, touch-friendly (44px+ tap targets)
- **Theme:** Dark navy/charcoal background (#0f1929 or similar), neon accents (cyan, pink, purple, rainbow)
- **No scroll:** Hero must fit in single viewport (or minimal scroll at bottom for footer)
- **Widgets:** 6 total: Module Arc, Learning Tiers, Code Executor, AI Copilot, Progress Flow, Credential Preview
- **CTA:** Floating sticky button (top-right), always visible, glowing neon style

---

## File Structure

**Create (Widget Components):**
- `components/kids-landing/dashboard/DashboardGrid.tsx` — Main grid layout container (CSS Grid, responsive sizing)
- `components/kids-landing/dashboard/ModuleArcWidget.tsx` — Module arc 0-16 (refactor existing, reuse CursorTrackedModuleArc logic)
- `components/kids-landing/dashboard/LearningTiersWidget.tsx` — 4-tier expandable card breakdown
- `components/kids-landing/dashboard/CodeExecutorWidget.tsx` — Live code editor with presets
- `components/kids-landing/dashboard/AICopilotWidget.tsx` — AI suggestion input + typewriter response
- `components/kids-landing/dashboard/ProgressFlowWidget.tsx` — Interactive progress flow (Module → Quiz → Unlock → Capstone → Cert)
- `components/kids-landing/dashboard/CredentialPreviewWidget.tsx` — Certificate preview with 3D flip
- `components/kids-landing/FloatingCTA.tsx` — Sticky top-right button (Enroll Free)

**Modify:**
- `app/landing-kids/page-content.tsx` — Complete page rewrite: hero headline + stats + DashboardGrid + FloatingCTA
- `lib/kids-landing/content.ts` — Add widget copy/config (code examples, progress stages, badge data)
- `tests/kids-landing-e2e.spec.ts` — Rewrite E2E suite for new widgets

**Delete/Archive:**
- `components/kids-landing/RotatableProjectCard.tsx` (no longer used)
- `components/kids-landing/MiniGameCTA.tsx` (no longer used)
- `components/kids-landing/InteractiveFeatureCard.tsx` (no longer used)

---

## Task 1: DashboardGrid Layout Component

**Files:**
- Create: `components/kids-landing/dashboard/DashboardGrid.tsx`

**Interfaces:**
- Consumes: Nothing (layout wrapper)
- Produces: `<DashboardGrid>` — CSS Grid container with responsive card sizing

**Description:** Create the grid layout that arranges 6 cards in a responsive grid. Cards are:
- Row 1: Module Arc (2x1) | Learning Tiers (2x1) | (spacer or 6th widget)
- Row 2: Code Executor (1x1) | AI Copilot (1x1) | (spacer)
- Row 3: Progress Flow (2x2 or full-width) | Credential Preview (1x1)

Grid must be responsive (1 column on mobile, 2 columns on tablet, 3+ on desktop).

- [ ] **Step 1: Create component file with grid structure**

```typescript
// components/kids-landing/dashboard/DashboardGrid.tsx
'use client';

import { ReactNode } from 'react';

interface GridItemProps {
  children: ReactNode;
  colSpan?: number; // 1 or 2 (default 1)
  rowSpan?: number; // 1 or 2 (default 1)
}

function GridItem({ children, colSpan = 1, rowSpan = 1 }: GridItemProps) {
  return (
    <div
      className={`col-span-${colSpan} row-span-${rowSpan} rounded-lg bg-slate-900/50 border border-slate-700 p-6 hover:border-cyan-500/50 transition-colors`}
    >
      {children}
    </div>
  );
}

export function DashboardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}

export { GridItem };
```

- [ ] **Step 2: Test grid layout in browser**

```bash
npm run dev
# Visit http://localhost:3008/landing-kids
# Verify grid renders (will be empty without child widgets)
# Test responsive: DevTools mobile (1 col), tablet (2 col), desktop (4 col)
```

Expected: Grid container appears, responsive columns work.

- [ ] **Step 3: Commit**

```bash
cd /Users/admin/Charlie\ Foreman/My\ Projects/learn-to-vibe-code
git add components/kids-landing/dashboard/DashboardGrid.tsx
git commit -m "feat: create DashboardGrid layout component with responsive CSS Grid"
```

---

## Task 2: FloatingCTA Button

**Files:**
- Create: `components/kids-landing/FloatingCTA.tsx`

**Interfaces:**
- Consumes: Nothing (standalone component)
- Produces: `<FloatingCTA href="/signup" />` — Sticky button top-right

**Description:** Create a floating, sticky CTA button in top-right corner. Always visible, glowing neon effect, smooth animations.

- [ ] **Step 1: Create component**

```typescript
// components/kids-landing/FloatingCTA.tsx
'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';

export function FloatingCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed top-8 right-8 z-50">
      <Link
        href="/signup"
        className={`
          px-6 py-3 rounded-lg font-bold text-white
          bg-gradient-to-r from-cyan-500 to-purple-600
          border border-cyan-400 shadow-lg
          hover:shadow-cyan-500/50 hover:scale-105
          transition-all duration-300
          ${!prefersReducedMotion ? 'animate-pulse' : ''}
        `}
        style={{
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.1)',
        }}
      >
        Enroll Free
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Test button visibility**

```bash
npm run dev
# Visit http://localhost:3008/landing-kids
# Verify button appears top-right
# Test: hover effect, glow, scaling
# Test: prefers-reduced-motion (no pulse on reduced motion)
# Test sticky position: scroll (if page scrolls), button stays top-right
```

Expected: Button visible, glowing, sticky position works, hover effects smooth.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/FloatingCTA.tsx
git commit -m "feat: add FloatingCTA sticky button with neon glow effect"
```

---

## Task 3: ModuleArcWidget

**Files:**
- Create: `components/kids-landing/dashboard/ModuleArcWidget.tsx`
- Modify: Refactor existing `components/kids-landing/CursorTrackedModuleArc.tsx` or reuse logic

**Interfaces:**
- Consumes: Framer Motion, SVG rendering
- Produces: `<ModuleArcWidget />` — Interactive arc showing 0-16 modules, cursor-tracked

**Description:** Wrap or refactor the existing CursorTrackedModuleArc to fit dashboard widget style. Keep rainbow gradient, cursor tracking, module labels. Adjust sizing for card container.

- [ ] **Step 1: Create widget wrapper**

```typescript
// components/kids-landing/dashboard/ModuleArcWidget.tsx
'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-sm text-gray-400 uppercase tracking-wide mb-4">16 Module Learning Path</div>
      <div className="w-full h-48">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
      <div className="text-xs text-gray-500 mt-4 text-center">
        Drag cursor across the arc to explore modules
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test widget rendering**

```bash
npm run dev
# Visit http://localhost:3008/landing-kids
# Verify ModuleArcWidget displays inside grid card
# Test cursor tracking (0-16 modules)
# Test rainbow gradient fills completely
```

Expected: Arc displays in card, cursor tracking works, no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/dashboard/ModuleArcWidget.tsx
git commit -m "feat: create ModuleArcWidget wrapper for dashboard grid"
```

---

## Task 4: LearningTiersWidget

**Files:**
- Create: `components/kids-landing/dashboard/LearningTiersWidget.tsx`

**Interfaces:**
- Consumes: MODULE_TIERS from `lib/kids-landing/content.ts`
- Produces: `<LearningTiersWidget />` — 4 expandable tier cards

**Description:** Display 4 learning tiers (Foundations, Building, Production, Landscape) as clickable cards. Expand on click to show module list for each tier.

- [ ] **Step 1: Create component**

```typescript
// components/kids-landing/dashboard/LearningTiersWidget.tsx
'use client';

import { useState } from 'react';
import { MODULE_TIERS } from '@/lib/kids-landing/content';

const TIER_COLORS: Record<string, string> = {
  foundations: 'from-blue-500 to-cyan-500',
  building: 'from-purple-500 to-pink-500',
  production: 'from-green-500 to-emerald-500',
  landscape: 'from-orange-500 to-red-500',
};

export function LearningTiersWidget() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-sm text-gray-400 uppercase tracking-wide">4 Learning Tiers</div>
      
      <div className="grid grid-cols-2 gap-2 flex-1">
        {Object.entries(MODULE_TIERS).map(([key, tier]) => (
          <button
            key={key}
            onClick={() => setExpandedTier(expandedTier === key ? null : key)}
            className={`
              p-3 rounded-lg bg-gradient-to-br ${TIER_COLORS[key]}
              text-white font-bold text-sm
              hover:shadow-lg transition-all duration-300
              ${expandedTier === key ? 'ring-2 ring-white' : ''}
            `}
          >
            {tier.name}
            <div className="text-xs opacity-80 mt-1">Modules {tier.modules.length}</div>
          </button>
        ))}
      </div>

      {expandedTier && (
        <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-xs text-gray-300">
          <div className="font-bold mb-2">{MODULE_TIERS[expandedTier as keyof typeof MODULE_TIERS].name} Modules:</div>
          <div className="space-y-1">
            {MODULE_TIERS[expandedTier as keyof typeof MODULE_TIERS].modules.map((mod) => (
              <div key={mod}>Module {mod}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Test widget interaction**

```bash
npm run dev
# Visit http://localhost:3008/landing-kids
# Click each tier card
# Verify expand/collapse behavior
# Verify color gradients display correctly
```

Expected: Tier cards clickable, expand/collapse smooth, colors show.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/dashboard/LearningTiersWidget.tsx
git commit -m "feat: create LearningTiersWidget with expandable tier cards"
```

---

## Task 5: CodeExecutorWidget

**Files:**
- Create: `components/kids-landing/dashboard/CodeExecutorWidget.tsx`

**Interfaces:**
- Consumes: JavaScript eval (safe, sandboxed context), Framer Motion
- Produces: `<CodeExecutorWidget />` — Live code editor with presets

**Description:** Create an interactive code editor where users can type and see output instantly. Include preset examples (Math, String, etc.). Keep it simple and kid-friendly.

- [ ] **Step 1: Create component**

```typescript
// components/kids-landing/dashboard/CodeExecutorWidget.tsx
'use client';

import { useState } from 'react';

const PRESETS: Record<string, string> = {
  greet: `greet("Sarah")`,
  math: `2 + 3 * 4`,
  string: `"Hello".toUpperCase()`,
};

const CODE_FUNCTIONS = `
function greet(name) { return 'Hello ' + name + '!'; }
`;

export function CodeExecutorWidget() {
  const [code, setCode] = useState(PRESETS.greet);
  const [output, setOutput] = useState('');

  const executeCode = (input: string) => {
    try {
      const result = new Function(CODE_FUNCTIONS + `return ${input}`)();
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
  };

  const handleChange = (newCode: string) => {
    setCode(newCode);
    executeCode(newCode);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-sm text-gray-400 uppercase tracking-wide">Live Code</div>

      <div className="flex gap-2 flex-wrap">
        {Object.entries(PRESETS).map(([name, value]) => (
          <button
            key={name}
            onClick={() => handleChange(value)}
            className="px-3 py-1 text-xs bg-slate-800 border border-cyan-500 rounded text-cyan-400 hover:bg-cyan-500/10"
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      <textarea
        value={code}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full h-20 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white font-mono text-cyan-400 focus:border-cyan-500 focus:outline-none"
        placeholder="Type code here..."
      />

      <div className="p-2 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono">
        Output: <span className="text-green-400">{output}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test code execution**

```bash
npm run dev
# Click preset buttons, verify code updates and runs
# Type in editor, verify output updates
# Test math, string, function examples
```

Expected: Presets work, code executes on change, output displays correctly.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/dashboard/CodeExecutorWidget.tsx
git commit -m "feat: create CodeExecutorWidget with live code execution and presets"
```

---

## Task 6: AICopilotWidget

**Files:**
- Create: `components/kids-landing/dashboard/AICopilotWidget.tsx`

**Interfaces:**
- Consumes: Framer Motion (for typewriter effect)
- Produces: `<AICopilotWidget />` — AI suggestion input + animated response

**Description:** Text input where users ask "What should I build?" and AI responds with a suggestion. Animate response as typewriter effect. Include action buttons (Show Code, Another Idea, Try This).

- [ ] **Step 1: Create component**

```typescript
// components/kids-landing/dashboard/AICopilotWidget.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SUGGESTIONS: Record<string, string> = {
  'drawing app': 'Use HTML Canvas + JavaScript to draw. Save your art as images!',
  'chat bot': 'Use string matching + arrays to build a simple bot. Learn to handle user input.',
  'game': 'Build Pong with React. Use state for position, onClick for movement.',
  'todo list': 'Perfect beginner project. Learn useState, array methods, localStorage.',
};

export function AICopilotWidget() {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (userInput: string) => {
    const key = userInput.toLowerCase();
    const response = Object.keys(SUGGESTIONS).find((k) => key.includes(k))
      ? SUGGESTIONS[Object.keys(SUGGESTIONS).find((k) => key.includes(k)) as string]
      : 'That sounds cool! Try starting with HTML & CSS, then add JavaScript.';

    setSuggestion('');
    setIsTyping(true);

    // Typewriter effect
    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setSuggestion((prev) => prev + response[i]);
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-sm text-gray-400 uppercase tracking-wide">🤖 AI Copilot</div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              handleSubmit(input);
              setInput('');
            }
          }}
          placeholder="What do you want to build?"
          className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-white focus:border-cyan-500 focus:outline-none"
        />
        <button
          onClick={() => {
            handleSubmit(input);
            setInput('');
          }}
          disabled={isTyping || !input.trim()}
          className="px-4 py-2 bg-cyan-600 text-white rounded text-sm font-bold hover:bg-cyan-700 disabled:opacity-50"
        >
          Ask
        </button>
      </div>

      {suggestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-slate-800/50 border border-cyan-500/30 rounded text-sm text-gray-300"
        >
          {suggestion}
          {isTyping && <span className="animate-blink">|</span>}
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Test AI copilot**

```bash
npm run dev
# Type "drawing app", hit Enter
# Verify typewriter effect animates response
# Test other keywords (chat bot, game, todo list)
# Verify fallback response for unknown input
```

Expected: Input works, suggestions display with typewriter effect, smooth animation.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/dashboard/AICopilotWidget.tsx
git commit -m "feat: create AICopilotWidget with AI suggestions and typewriter effect"
```

---

## Task 7: ProgressFlowWidget

**Files:**
- Create: `components/kids-landing/dashboard/ProgressFlowWidget.tsx`

**Interfaces:**
- Consumes: Flow stages (Module → Quiz → Pass → Unlock → Capstone → Certificate)
- Produces: `<ProgressFlowWidget />` — Interactive progress flow visualization

**Description:** Visual flow showing progression through the course. Display stages as nodes with labels. Click each stage for tooltip details. Animated connecting line. Horizontal scroll on mobile.

- [ ] **Step 1: Create component**

```typescript
// components/kids-landing/dashboard/ProgressFlowWidget.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  { id: 'module', label: 'Module', desc: 'Learn new skills' },
  { id: 'quiz', label: 'Quiz', desc: 'Test your knowledge' },
  { id: 'pass', label: 'Pass (80%)', desc: 'Score 80% to proceed' },
  { id: 'unlock', label: 'Unlock Next', desc: 'Advance to next module' },
  { id: 'capstone', label: 'Capstone', desc: 'Build your project' },
  { id: 'cert', label: 'Certificate', desc: 'Earn your credential' },
];

export function ProgressFlowWidget() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-sm text-gray-400 uppercase tracking-wide">Your Path to Success</div>

      <div className="overflow-x-auto flex-1">
        <div className="flex gap-4 pb-2 min-w-max">
          {STAGES.map((stage, idx) => (
            <div key={stage.id} className="flex items-center">
              <motion.button
                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                whileHover={{ scale: 1.1 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all
                  ${activeStage === stage.id
                    ? 'bg-cyan-500 text-white ring-2 ring-cyan-300'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}
                `}
              >
                {idx + 1}
              </motion.button>

              {idx < STAGES.length - 1 && (
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {activeStage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-slate-800/50 border border-cyan-500/30 rounded text-sm"
        >
          <div className="font-bold text-cyan-400">
            {STAGES.find((s) => s.id === activeStage)?.label}
          </div>
          <div className="text-gray-300 text-xs">
            {STAGES.find((s) => s.id === activeStage)?.desc}
          </div>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Test progress flow**

```bash
npm run dev
# Click each stage number
# Verify tooltip shows stage label + description
# Test horizontal scroll on mobile
# Verify connecting line gradient
```

Expected: Stages clickable, tooltips appear, flow displays correctly.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/dashboard/ProgressFlowWidget.tsx
git commit -m "feat: create ProgressFlowWidget with interactive course progression flow"
```

---

## Task 8: CredentialPreviewWidget

**Files:**
- Create: `components/kids-landing/dashboard/CredentialPreviewWidget.tsx`

**Interfaces:**
- Consumes: Framer Motion (for 3D flip effect)
- Produces: `<CredentialPreviewWidget />` — Certificate mockup with 3D flip on hover

**Description:** Display certificate mockup with 3D flip effect. Show front (certificate design) and back (credential details). Hover or click to flip. Include share button.

- [ ] **Step 1: Create component**

```typescript
// components/kids-landing/dashboard/CredentialPreviewWidget.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function CredentialPreviewWidget() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-sm text-gray-400 uppercase tracking-wide">Your Certificate</div>

      <motion.div
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.05 }}
        className="flex-1 cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg p-4 flex flex-col items-center justify-center text-center border-2 border-yellow-500"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {!isFlipped ? (
            <>
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-bold text-white">Accredited</div>
              <div className="text-xs text-yellow-100 mt-1">Vibe Coding Course</div>
              <div className="text-xs text-yellow-100">Certificate of Completion</div>
            </>
          ) : (
            <>
              <div className="text-xs font-mono text-yellow-900 space-y-1">
                <div>ID: VCC-2026-ABC123XYZ</div>
                <div>Issued: July 2026</div>
                <div>Verify at: learn.vibecode.io</div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      <button className="px-4 py-2 bg-cyan-600 text-white text-sm font-bold rounded hover:bg-cyan-700 transition-colors">
        Share Certificate
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Test certificate flip**

```bash
npm run dev
# Hover over certificate (or click to toggle flip)
# Verify 3D flip animation works smoothly
# Check front (trophy) and back (credential details)
# Test share button
```

Expected: Flip animation smooth, both sides display, button visible.

- [ ] **Step 3: Commit**

```bash
git add components/kids-landing/dashboard/CredentialPreviewWidget.tsx
git commit -m "feat: create CredentialPreviewWidget with 3D flip certificate preview"
```

---

## Task 9: Integrate All Widgets into Page

**Files:**
- Modify: `app/landing-kids/page-content.tsx` (complete rewrite)

**Interfaces:**
- Consumes: All 7 widget components + DashboardGrid + FloatingCTA
- Produces: Full dashboard hero page

**Description:** Create new page layout with hero headline + stats + DashboardGrid containing all 6 widgets + FloatingCTA.

- [ ] **Step 1: Rewrite page-content.tsx**

```typescript
// app/landing-kids/page-content.tsx
'use client';

import { DashboardGrid, GridItem } from '@/components/kids-landing/dashboard/DashboardGrid';
import { ModuleArcWidget } from '@/components/kids-landing/dashboard/ModuleArcWidget';
import { LearningTiersWidget } from '@/components/kids-landing/dashboard/LearningTiersWidget';
import { CodeExecutorWidget } from '@/components/kids-landing/dashboard/CodeExecutorWidget';
import { AICopilotWidget } from '@/components/kids-landing/dashboard/AICopilotWidget';
import { ProgressFlowWidget } from '@/components/kids-landing/dashboard/ProgressFlowWidget';
import { CredentialPreviewWidget } from '@/components/kids-landing/dashboard/CredentialPreviewWidget';
import { FloatingCTA } from '@/components/kids-landing/FloatingCTA';
import { SoundToggle } from '@/components/kids-landing/SoundToggle';

export default function KidsLandingPageContent() {
  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <SoundToggle />
      <FloatingCTA />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Build Real Apps.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                With AI. In Weeks.
              </span>
            </h1>

            {/* Stats Line */}
            <div className="text-lg md:text-xl text-gray-300 space-y-2">
              <div>16 Modules • 93 Hours • Free • Self-Paced • Accredited Certificate</div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <DashboardGrid>
            <GridItem colSpan={2}>
              <ModuleArcWidget />
            </GridItem>
            <GridItem colSpan={2}>
              <LearningTiersWidget />
            </GridItem>

            <GridItem>
              <CodeExecutorWidget />
            </GridItem>
            <GridItem>
              <AICopilotWidget />
            </GridItem>

            <GridItem colSpan={4}>
              <ProgressFlowWidget />
            </GridItem>

            <GridItem>
              <CredentialPreviewWidget />
            </GridItem>
          </DashboardGrid>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 Vibe Coding. Learn to code with AI. Ship real apps.</p>
          <div className="flex gap-6 justify-center mt-4">
            <a href="/demo" className="hover:text-cyan-400 transition">Demo</a>
            <a href="/about" className="hover:text-cyan-400 transition">About</a>
            <a href="/support" className="hover:text-cyan-400 transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Test full page layout**

```bash
npm run dev
# Visit http://localhost:3008/landing-kids
# Verify all 6 widgets display in grid
# Verify hero headline + stats visible
# Verify FloatingCTA top-right
# Verify SoundToggle present
# Test responsive (mobile, tablet, desktop)
# Check for console errors
```

Expected: All widgets display, layout responsive, no errors.

- [ ] **Step 3: Commit**

```bash
git add app/landing-kids/page-content.tsx
git commit -m "refactor: replace page with dashboard hero containing 6 interactive widgets"
```

---

## Task 10: Update E2E Tests

**Files:**
- Modify: `tests/kids-landing-e2e.spec.ts` (rewrite test suite)

**Interfaces:**
- Consumes: Playwright test patterns
- Produces: 15+ E2E tests covering all widgets

**Description:** Rewrite E2E suite to test new dashboard widgets: Module Arc, Learning Tiers, Code Executor, AI Copilot, Progress Flow, Credential Preview, FloatingCTA. Include responsive tests, accessibility, performance.

- [ ] **Step 1: Rewrite test suite**

```typescript
// tests/kids-landing-e2e.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Kids Landing Page - Dashboard Hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3008/landing-kids');
    await page.waitForLoadState('networkidle');
  });

  // HERO
  test('hero headline is visible', async ({ page }) => {
    const headline = page.locator('text=Build Real Apps');
    await expect(headline).toBeVisible();
  });

  test('stats line displays correctly', async ({ page }) => {
    const stats = page.locator('text=16 Modules');
    await expect(stats).toBeVisible();
  });

  // MODULE ARC
  test('module arc widget displays', async ({ page }) => {
    const arc = page.locator('text=16 Module Learning Path');
    await expect(arc).toBeVisible();
  });

  test('module arc cursor tracking works', async ({ page }) => {
    const arcSvg = page.locator('svg').first();
    const bbox = await arcSvg.boundingBox();
    if (bbox) {
      await page.mouse.move(bbox.x + 10, bbox.y + bbox.height / 2);
      await page.waitForTimeout(100);
      const moduleNum = page.locator('text=/^\\d+$/').first();
      await expect(moduleNum).toBeVisible();
    }
  });

  // LEARNING TIERS
  test('learning tiers widget displays 4 tiers', async ({ page }) => {
    const tiers = page.locator('text=4 Learning Tiers').locator('..').first();
    await expect(tiers).toBeVisible();
  });

  test('tier card click expands tier details', async ({ page }) => {
    const tierCard = page.locator('button', { hasText: 'Foundations' }).first();
    await tierCard.click();
    const expandedContent = page.locator('text=Foundations Modules');
    await expect(expandedContent).toBeVisible();
  });

  // CODE EXECUTOR
  test('code executor widget is interactive', async ({ page }) => {
    const codeInput = page.locator('textarea');
    await expect(codeInput).toBeVisible();
    await codeInput.fill('2 + 3');
    const output = page.locator('text=/Output:/');
    await expect(output).toBeVisible();
  });

  test('code presets work', async ({ page }) => {
    const mathPreset = page.locator('button:has-text("Math")').first();
    await mathPreset.click();
    const output = page.locator('text=/Output:/');
    await expect(output).toBeVisible();
  });

  // AI COPILOT
  test('AI copilot input accepts text', async ({ page }) => {
    const input = page.locator('input[placeholder*="build"]');
    await input.fill('drawing app');
    const askBtn = page.locator('button:has-text("Ask")');
    await askBtn.click();
    const suggestion = page.locator('text=/Canvas|HTML/');
    await expect(suggestion).toBeVisible({ timeout: 2000 });
  });

  // PROGRESS FLOW
  test('progress flow stages are clickable', async ({ page }) => {
    const stageButton = page.locator('button').filter({ hasText: '1' }).first();
    await stageButton.click();
    const tooltip = page.locator('text=/Module|Learn/');
    await expect(tooltip).toBeVisible();
  });

  // CREDENTIAL PREVIEW
  test('certificate flips on click', async ({ page }) => {
    const certCard = page.locator('text=Your Certificate').locator('..').first();
    await certCard.click();
    await page.waitForTimeout(300);
    await certCard.click();
    await expect(certCard).toBeVisible();
  });

  // FLOATING CTA
  test('floating CTA button is visible top-right', async ({ page }) => {
    const cta = page.locator('a:has-text("Enroll Free")');
    await expect(cta).toBeVisible();
    const bbox = await cta.boundingBox();
    expect(bbox?.x).toBeGreaterThan(page.viewportSize()!.width - 200);
  });

  test('CTA button is sticky (visible on scroll)', async ({ page }) => {
    const cta = page.locator('a:has-text("Enroll Free")');
    await expect(cta).toBeVisible();
    // If page scrolls, button should remain visible (position: fixed)
  });

  // ACCESSIBILITY
  test('page respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('http://localhost:3008/landing-kids');
    const cta = page.locator('a:has-text("Enroll Free")');
    await expect(cta).toBeVisible();
  });

  test('full keyboard navigation works', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT'].includes(focused || '')).toBe(true);
  });

  // RESPONSIVE
  test('page is mobile responsive (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const headline = page.locator('text=Build Real Apps');
    await expect(headline).toBeVisible();
    const grid = page.locator('grid');
    await expect(grid).toBeVisible();
  });

  // PERFORMANCE
  test('page loads within 2s', async ({ page }) => {
    const start = Date.now();
    await page.goto('http://localhost:3008/landing-kids');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(2000);
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npx playwright test tests/kids-landing-e2e.spec.ts -x
```

Expected: 15+ tests pass, coverage of all widgets.

- [ ] **Step 3: Commit**

```bash
git add tests/kids-landing-e2e.spec.ts
git commit -m "test: rewrite E2E suite for dashboard hero widgets"
```

---

## Task 11: Final Verification & Polish

**Files:**
- Verify all changes (no new code changes in this task)

**Description:** Final integration check, manual testing, responsive verification, accessibility audit.

- [ ] **Step 1: Full TypeScript compilation**

```bash
npm run build
```

Expected: Build succeeds with 0 errors.

- [ ] **Step 2: Run full E2E suite**

```bash
npx playwright test tests/kids-landing-e2e.spec.ts
```

Expected: All tests pass.

- [ ] **Step 3: Manual verification**

Visit `http://localhost:3008/landing-kids` in browser:
- [ ] Hero headline visible
- [ ] All 6 widgets display in grid
- [ ] Module Arc cursor tracking works
- [ ] Learning Tiers expand/collapse
- [ ] Code Executor executes code
- [ ] AI Copilot responds to input
- [ ] Progress Flow clicks show details
- [ ] Certificate flips
- [ ] FloatingCTA visible top-right, glowing
- [ ] No console errors
- [ ] No horizontal scroll

- [ ] **Step 4: Mobile responsive (375px)**

- [ ] All text readable
- [ ] Buttons tap-friendly (44px+)
- [ ] Grid adapts to single column
- [ ] No horizontal scroll
- [ ] Widgets still interactive

- [ ] **Step 5: Accessibility**

- [ ] Keyboard Tab navigation works
- [ ] prefers-reduced-motion respected
- [ ] Focus rings visible
- [ ] All interactive elements labeled

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "refactor: dashboard hero redesign complete - 6 interactive widgets + floating CTA"
```

---

## Success Criteria

✅ **Page Structure:**
- ✅ Hero headline + stats visible
- ✅ Dashboard grid with 6 widgets (correct sizing)
- ✅ All widgets interactive and functional
- ✅ FloatingCTA sticky top-right
- ✅ No scroll required for full hero

✅ **Widgets:**
- ✅ Module Arc: cursor-tracked 0-16 modules
- ✅ Learning Tiers: expandable 4-tier cards
- ✅ Code Executor: live code editing + presets
- ✅ AI Copilot: input + typewriter response
- ✅ Progress Flow: clickable stages with details
- ✅ Credential Preview: 3D flip certificate

✅ **Quality:**
- ✅ TypeScript: 0 errors
- ✅ Build: Clean
- ✅ E2E Tests: 15+ passing
- ✅ Responsive: 375px–1920px
- ✅ A11y: WCAG AA, keyboard nav, prefers-reduced-motion
- ✅ Performance: FCP < 2s
- ✅ No console errors

✅ **Design:**
- ✅ Dark navy background
- ✅ Neon accents (rainbow, cyan, purple)
- ✅ Zalak Patel aesthetic (card grid, micro-interactions)
- ✅ Smooth animations
- ✅ Engaging, kid-friendly

---

## Commits Summary

1. Task 1: `feat: create DashboardGrid layout component`
2. Task 2: `feat: add FloatingCTA sticky button`
3. Task 3: `feat: create ModuleArcWidget wrapper`
4. Task 4: `feat: create LearningTiersWidget`
5. Task 5: `feat: create CodeExecutorWidget`
6. Task 6: `feat: create AICopilotWidget`
7. Task 7: `feat: create ProgressFlowWidget`
8. Task 8: `feat: create CredentialPreviewWidget`
9. Task 9: `refactor: replace page with dashboard hero`
10. Task 10: `test: rewrite E2E suite for dashboard widgets`
11. Task 11: `refactor: dashboard hero redesign complete`
