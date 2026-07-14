# Curriculum Update Checklist

**Purpose:** When adding, removing, or modifying course modules/lessons, use this checklist to ensure all affected components are updated.

**Last Updated:** 2026-07-13  
**Current State:** 16 modules (0-15), 93 hours, 9.3 CEUs, 3 questions/module

---

## Impact Tiers

### 🔴 TIER 1: CRITICAL (Will Break)

These updates are **mandatory**. Missing even one will cause broken UI, incorrect progress tracking, or locked learners.

#### 1️⃣ Module Metadata & Routing

- **File:** `lib/module-metadata.ts`
  - Add new module to `getModuleMetadata(moduleId)` switch statement
  - Verify module count accuracy in metadata object
  
- **File:** `lib/module-steps.ts`
  - Add MODULE configs if using new step-based format
  
- **File:** `CLAUDE.md`
  - Update "16 modules" → new count
  - Update "93 hours" → new total
  - Update phase descriptions if module assignments change

#### 2️⃣ Content & Quizzes

- **File:** `content/modules/module-XX-title.md`
  - Create new lesson markdown file with proper frontmatter
  - Ensure learning objectives are defined
  
- **File:** `lib/quizzes.ts`
  - Add exactly 3 multiple-choice questions per module
  - Keep answer key server-side (never ship to client)
  - Add to `QUIZ_BANK` with module_id, question_id, answers
  
- **File:** `assessments/` (if tracking answers)
  - Add answer keys to reference (server-side only)

#### 3️⃣ Database Schema (Supabase)

- **Table:** `module_progress`
  - Verify module_id column accepts new range (0-N)
  - No hardcoded constraints on module_id values
  
- **Table:** `quiz_attempts`
  - Ensure per-module scoring works for all module IDs
  
- **Table:** `deliverables`
  - Per-module submission tracking must handle new modules

#### 4️⃣ Progress & Unlock Gates

- **File:** `lib/unlock-gates.ts`
  - Update unlock logic if capstone requirement changes
  - Verify `completedModules >= 15` references correct threshold
  
- **File:** `lib/actions/course.ts`
  - `getAllModuleProgress()` — verify loop handles all modules
  - `isModuleUnlocked()` — check prerequisite logic
  
- **File:** Search for progress calculations
  - Update: `(completedModules / 16) * 100` → use new count
  - Update any hardcoded progress thresholds

---

### 🟠 TIER 2: HIGH PRIORITY (Will Show Wrong Data)

These updates prevent broken or misleading UI.

#### 5️⃣ Dashboard & Progress Display

- **File:** `components/dashboard/CourseProgress.tsx`
  - Renders module grid — verify it loops correctly
  - Update any hardcoded "16 modules" text
  
- **File:** `components/dashboard/CockpitDashboard.tsx`
  - Update "X/16 complete" labels
  - Progress percentage calculation
  
- **File:** `components/kids-landing/dashboard/ModuleArcWidget.tsx`
  - Visual arc animation — verify it spans full course

#### 6️⃣ Course Map & Navigation

- **File:** `app/course/page.tsx`
  - Loop: `for (let i = 0; i <= 15)` → update to new max
  
- **File:** `components/course/ModuleTreeView.tsx`
  - Module tree rendering — verify all modules appear
  
- **File:** `components/course/ModuleSidebar.tsx`
  - Dropdown: `Array.from({ length: 16 })` → update count
  - Module selector must show all available modules

#### 7️⃣ Capstone & Completion

- **File:** `app/capstone/page.tsx`
  - Update "After Module 15 completion" if requirement changes
  
- **File:** `lib/actions/course.ts`
  - `capstoneUnlocked = completedModules >= 15` → update threshold
  
- **File:** `components/dashboard/QuickActions.tsx`
  - Capstone availability status display

#### 8️⃣ Certificate & Credentials

- **File:** `app/certificate/page.tsx`
  - Update "Completed all 16 modules" message
  
- **File:** `lib/certificate.ts`
  - CEU calculation: `modules * 0.6` must equal correct total
  - Example: 16 modules × 0.6 = 9.3 CEUs

---

### 🟡 TIER 3: MEDIUM PRIORITY (Stats & Analytics)

These updates prevent misleading analytics and tracking.

#### 9️⃣ Gamification & XP

- **File:** `lib/gamification-logic.ts`
  - XP awards per module completion
  - Verify XP scaling for new module count
  
- **File:** `components/dashboard/StatsGrid.tsx`
  - Update "16 modules to master" text
  
- **File:** Badge definitions
  - If badges are module-specific (e.g., "Module 7 = Supabase badge"), verify assignments still make sense

#### 🔟 Analytics & Admin

- **File:** `components/admin/AnalyticsDashboard.tsx`
  - Module completion statistics
  - Verify graphs/charts calculate percentages correctly
  
- **File:** `app/api/admin/export-records/route.ts`
  - CSV export — assumes 16 modules in calculations
  - Update any hardcoded column headers or totals

#### 1️⃣1️⃣ Landing & Marketing Pages

- **File:** `app/page.tsx`
  - Update "16 modules, 93 hours" hero text
  
- **File:** `app/landing-adult/page.tsx`
  - Course overview copy
  
- **File:** `app/landing-kids/page-content.tsx`
  - Kids version of course description
  
- **File:** `lib/kids-landing/content.ts`
  - "16 exciting modules" — update copy
  
- **File:** `components/LandingFeatures.tsx`
  - Feature count or module list
  
- **File:** `app/opengraph-image.tsx`
  - og:image metadata — update course scope

---

### 🟢 TIER 4: LOW PRIORITY (Edge Cases)

Nice-to-have updates that improve UX but won't break the app.

#### 1️⃣2️⃣ Tests

- **File:** `lib/__tests__/unlock-gates.test.ts`
  - Update module count in fixtures
  - Test unlock logic for new modules
  
- **File:** `lib/__tests__/quizzes.test.ts`
  - Verify quiz count: 3 × module_count
  
- **File:** `lib/__tests__/gamification-logic.test.ts`
  - XP per module assertions

#### 1️⃣3️⃣ Documentation

- **File:** `README.md` (if exists)
  - Course scope: module count, hours, CEUs
  
- **File:** `course-content/` (source of truth)
  - Learning objectives per module
  - Capstone brief (references module count)

#### 1️⃣4️⃣ Animations & UI Elements

- **File:** `components/ProgressFlowWidget.tsx`
  - Progress visualization — verify scaling
  
- **File:** `components/kids-landing/CursorTrackedModuleArc.tsx`
  - Arc animation — responsive to module count
  
- **File:** `components/AnimatedCounter.tsx`
  - If counting modules in hero section

#### 1️⃣5️⃣ Email Templates

- **File:** Email service (if exists)
  - "You've unlocked Module X" emails
  - "Capstone unlocked" milestone email
  - Certificate awarded email

---

## Quick Reference: Search Commands

Find all hardcoded references that might need updating:

```bash
# Find all "16" (module count)
grep -r "16" lib/ app/ components/ | grep -v node_modules | grep -v ".next"

# Find all "15" (capstone requirement)
grep -r "15" lib/ app/ components/ | grep -v node_modules | grep -v ".next"

# Find all "93" (total hours)
grep -r "93" lib/ app/ | grep -v "930" | grep -v node_modules

# Find hardcoded unlock logic
grep -r "completedModules >=" lib/ app/

# Find all module loops
grep -r "length: 16" app/ components/

# Find all module metadata references
grep -r "moduleId" lib/ app/ components/ | grep "switch\|case"
```

---

## Update Workflow (Step-by-Step)

### When Adding a Single Module

1. **Create content**
   - [ ] Write `content/modules/module-XX-title.md`
   - [ ] Add 3 quiz questions to `lib/quizzes.ts`

2. **Update metadata**
   - [ ] Add to `lib/module-metadata.ts`
   - [ ] Update CLAUDE.md (module count, hours)

3. **Update UI components**
   - [ ] `components/course/ModuleSidebar.tsx` — update `Array.from({ length: 16 })`
   - [ ] `app/course/page.tsx` — update loop to `i <= 15` (or new max)
   - [ ] `components/dashboard/CockpitDashboard.tsx` — "X/16 complete"

4. **Update marketing**
   - [ ] `app/page.tsx` — hero text
   - [ ] `app/landing-adult/page.tsx` — course description
   - [ ] `lib/kids-landing/content.ts` — kids copy

5. **Update credentials**
   - [ ] `lib/certificate.ts` — CEU math
   - [ ] `CLAUDE.md` — total hours and CEUs

6. **Test**
   - [ ] Run `npm run test` — quiz count assertions should pass
   - [ ] Verify course map renders all modules
   - [ ] Verify progress percentage calculates correctly

### When Changing Capstone Requirement

1. **Update unlock logic**
   - [ ] `lib/unlock-gates.ts` — capstone unlock threshold
   - [ ] `lib/actions/course.ts` — `capstoneUnlocked >= X`

2. **Update UI**
   - [ ] `components/dashboard/QuickActions.tsx` — capstone availability message
   - [ ] `app/capstone/page.tsx` — prerequisite text

3. **Update docs**
   - [ ] `CLAUDE.md` — capstone unlock requirement

---

## Constants (To Minimize Hardcoding)

Consider moving these to `lib/constants.ts` to reduce fragility:

```typescript
export const TOTAL_MODULES = 16;
export const TOTAL_HOURS = 93;
export const CEUS_PER_MODULE = 0.6;
export const TOTAL_CEUS = TOTAL_MODULES * CEUS_PER_MODULE;
export const QUESTIONS_PER_MODULE = 3;
export const CAPSTONE_UNLOCK_MODULES = 15;

// Then use everywhere:
// Instead of: Array.from({ length: 16 })
// Use: Array.from({ length: TOTAL_MODULES })

// Instead of: completedModules >= 15
// Use: completedModules >= CAPSTONE_UNLOCK_MODULES
```

---

## Verification Checklist

After updates, verify:

- [ ] `npm run build` passes without errors
- [ ] `npm run test` passes (quiz counts, unlock logic)
- [ ] Course map displays all modules without gaps
- [ ] Progress percentage calculates to 100% only at course end
- [ ] Capstone unlocks at correct threshold
- [ ] Certificate CEU calculation is mathematically correct
- [ ] Landing page copy matches module count
- [ ] Mobile layout (ModuleSidebar) handles full module count
- [ ] No "16" or hardcoded counts left in user-facing text

---

## Notes

- **Never hardcode module IDs** — use module metadata queries
- **Quiz count** must be exactly 3 × module count
- **CEU math** is auditable — accreditors will verify
- **Unlock gates** are load-bearing — test thoroughly
- **Consider constant refactoring** if updating curriculum frequently
