# Consolidate Section Navigation — Single Row Design

> **For agentic workers:** This is a focused UX fix for the section-based lessons viewer. Can be executed as a standalone task.

**Goal:** Replace dual navigation (section-level + lesson-level buttons) with a single, clear navigation row showing section progress and lesson progression.

**Problem:** Current UI shows 4-5 buttons competing for space (← Back, Lesson Complete!, ← Previous, Next →), confusing users about which button does what and cluttering the footer.

**Solution:** Single navigation row with inline section indicator + unified Back/Next buttons.

---

## Current State (Confusing)

```
[Section Navigation]
← Back  |  Lesson Complete! 🎉 (disabled)

[Lesson Navigation]  
← Previous  |  10 of 12  |  Next →
```

**Problems:**
- Two "back" buttons with different meanings
- Unclear which nav level to use
- 4-5 buttons wasting space
- "Lesson Complete!" is state, not action

---

## Target Design (Clear)

```
← Back  |  Section 1  2  3 ✓  |  Next Lesson →
```

Or with status indicator:

```
← Back  |  Section 3 of 3 ✓ (All viewed)  |  Next Lesson →
```

**Benefits:**
- ✅ One row, three clear actions
- ✅ Section progress visible inline
- ✅ Back/Next unambiguous (navigate sections within lesson, then lessons in module)
- ✅ Completion status shown as badge, not disabled button

---

## Implementation

### Files to Modify

- `components/course/SectionLessonViewer.tsx` — replace the "Back | Lesson Complete! 🎉 | Next →" navigation block
- `components/StepLessonViewer.tsx` — ensure lesson-level navigation doesn't render when in section-mode

### Step 1: Redesign SectionLessonViewer navigation

Replace the current navigation block (lines ~406-453 in the current code) with:

```typescript
{/* Consolidated Navigation */}
<div className="flex gap-4 items-center pt-6 border-t border-slate-700">
  {/* Back Button */}
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

  {/* Section Indicator */}
  <div className="flex-1 flex items-center justify-center gap-2">
    {/* Section dots/numbers */}
    <div className="flex gap-1.5">
      {sections.map((_, idx) => (
        <motion.button
          key={idx}
          onClick={() => setSectionIndex(idx)}
          className={`w-8 h-8 rounded-full font-bold text-xs transition-all ${
            viewedSections.has(idx)
              ? isKids
                ? 'bg-green-500 text-white'
                : 'bg-green-600 text-white'
              : idx === sectionIndex
              ? isKids
                ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                : 'bg-cyan-500 text-white ring-2 ring-cyan-400'
              : isKids
              ? 'bg-purple-200 text-purple-900'
              : 'bg-slate-600 text-slate-300'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {idx + 1}
        </motion.button>
      ))}
    </div>

    {/* Completion status */}
    {allSectionsViewed && (
      <span className={`ml-2 text-sm font-semibold ${
        isKids ? 'text-green-600' : 'text-green-400'
      }`}>
        ✓ Complete
      </span>
    )}
  </div>

  {/* Next Button */}
  {isLastSection ? (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={!allSectionsViewed}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
        allSectionsViewed
          ? isKids
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
            : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      Next Lesson →
    </motion.button>
  ) : (
    <motion.button
      onClick={() => setSectionIndex(Math.min(sections.length - 1, sectionIndex + 1))}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
        isKids
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
          : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
      }`}
    >
      Next Section →
    </motion.button>
  )}
</div>
```

### Step 2: Hide lesson-level navigation when in section-mode

In `components/StepLessonViewer.tsx`, wrap the existing lesson navigation (← Previous | lesson counter | Next) with a guard:

```typescript
{!currentStep.sections && (
  // Only show lesson nav for legacy single-content lessons
  <div>
    {/* existing lesson navigation code */}
  </div>
)}
```

### Step 3: Test

**Playwright test scenarios:**

```typescript
test('consolidated navigation shows all sections', async ({ page }) => {
  // Navigate to section lesson
  await page.goto('http://localhost:3008/course/0');
  await page.click('button:has-text("Free Tiers & Costs")');

  // Verify section indicator shows 1 2 3
  await expect(page.locator('button:has-text("1")')).toBeVisible();
  await expect(page.locator('button:has-text("2")')).toBeVisible();
  await expect(page.locator('button:has-text("3")')).toBeVisible();

  // Current section should be highlighted (ring)
  const currentSection = page.locator('button:has-text("1")').first();
  await expect(currentSection).toHaveClass(/ring-2/);
});

test('no duplicate navigation buttons', async ({ page }) => {
  await page.goto('http://localhost:3008/course/0');
  await page.click('button:has-text("Free Tiers & Costs")');

  // Should have exactly one "Back" button
  const backButtons = await page.locator('button:has-text("← Back")').count();
  expect(backButtons).toBe(1);

  // Should NOT have "← Previous" button (lesson-level nav hidden)
  const previousButtons = await page.locator('button:has-text("← Previous")').count();
  expect(previousButtons).toBe(0);
});
```

### Step 4: Verify no regressions

- Single-content lessons (legacy path) still show lesson-level navigation
- Section clicking in the indicator changes sections
- Completion blocks next until all sections viewed

---

## Success Criteria

- ✅ Single navigation row with Back | Section Indicator | Next
- ✅ Section dots show 1 2 3 (current highlighted, viewed marked ✓)
- ✅ Completion badge shown when all sections viewed
- ✅ Lesson-level nav hidden for section-mode lessons
- ✅ Legacy single-content lessons unaffected
- ✅ Playwright tests confirm no duplicate buttons
- ✅ Build succeeds: `npm run build`
- ✅ Commit: "refactor: consolidate section navigation into single unified row"

---

## Design Notes

**Section indicator variants (pick one):**

1. **Numbers with status:** `1  2  3 ✓` (current, viewed as ✓)
2. **Text counter:** `Section 3 of 3 ✓ (All viewed)`
3. **Pills:** `[1] [2] [3 ✓]` (clickable dots with borders)

Recommendation: **Numbers with status** (most compact, clear).

**Color scheme:**
- Current section: ring, highlight color
- Viewed section: green checkmark or green background
- Unviewed: muted gray

**Button labels:**
- When not on last section: `Next Section →`
- When on last section: `Next Lesson →` (label changes based on state)

This makes it crystal clear what action happens next.
