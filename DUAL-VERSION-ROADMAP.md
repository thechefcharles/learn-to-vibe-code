# Dual-Version Roadmap: Kids vs. Accredited Adult Course

## Overview
This document outlines the full scope of work required to launch a **kids version** and **adult version** of Learn to Vibe Code under a single codebase with a user-facing toggle.

---

## Phase 1: Foundation & Context

### Version Management
- [ ] Create `lib/VersionContext.tsx` (parallel to ThemeContext)
  - `version: "kids" | "adult"`
  - `setVersion()` method
  - localStorage persistence
  - SSR-safe (hydration checks)
- [ ] Create `components/VersionToggle.tsx`
  - Fixed/floating UI toggle (top-right next to theme switcher)
  - Visual indicator of current version
  - Smooth transition animation
- [ ] Add `useVersion()` hook for consumption

### Database Schema Updates
- [ ] Add `target_audience` column to:
  - `modules` table (enum: "kids" | "adult" | "both")
  - `quizzes` table
  - `quiz_questions` table (answer keys may differ)
  - `capstone_submissions` (different rubrics)
  - `badges` table (different designs per version)
- [ ] Add `enrolled_version` to `enrollments` table (track which path user chose)
- [ ] Run migrations (backup production first)

---

## Phase 2: Content Duplication & Adaptation

### Course Modules
- [ ] Audit existing 16 modules → tag all as "adult"
- [ ] Create parallel "kids" versions (16 modules, simplified)
  - Simplify language, concepts, examples
  - Shorter modules (or same length, easier pace)
  - Fewer prerequisites, scaffolded difficulty
  - Estimate: ~40-60% content rewrite per module
- [ ] Content checklist per module:
  - [ ] Lesson markdown (2 versions)
  - [ ] Learning objectives (age-appropriate)
  - [ ] Deliverable specs (kids: simpler projects)
  - [ ] Quiz questions (kids: 3-5 easier Q's)
  - [ ] Figure/screenshot references (kids-friendly where needed)

### Quizzes & Assessments
- [ ] Create kids-version quiz questions
  - Adult: current 3 questions/module
  - Kids: 3-5 questions, simpler language, more scaffolding
- [ ] Answer keys (server-side only, per version)
- [ ] Passing threshold decision:
  - Kids: 75% (encouragement)?
  - Adult: 80% (current)

### Deliverables
- [ ] Define kids-version deliverable specs
  - Simpler project scopes
  - Example: "Build a 3-color palette site" vs. "Full-stack e-commerce"
  - Auto-checks: still URL-based, but simpler validation
- [ ] Create rubrics for manual review (kids vs. adult)

### Capstone
- [ ] Kids capstone brief (shorter, fun theme)
- [ ] Kids capstone rubric (different scoring weights)
- [ ] Adults: current capstone (unchanged)

---

## Phase 3: UI/Design System

### Component Variants
- [ ] Create layout/styling registry per version:
  - Kids: larger fonts (18px base → 20px), more padding
  - Kids: rounded corners (8px → 12px), softer shadows
  - Kids: more vibrant colors, higher saturation
  - Adult: current (professional, dense)
- [ ] Update components with conditional rendering:
  - [ ] DashboardHeader (logo size, tagline)
  - [ ] StatCards (kids: emoji-heavy, adult: clean)
  - [ ] AnimatedDashboard layout (kids: more spacing)
  - [ ] LandingHero (kids: fun intro, adult: job outcomes)
  - [ ] LandingFeatures (kids: learning journey, adult: skills)
  - [ ] PlayButton (kids: bigger, playful; adult: subtle)
  - [ ] Quiz interface (kids: larger inputs, more feedback)
  - [ ] Course map (kids: visual level progression, adult: module checklist)

### Badges & Gamification
- [ ] Design kids-version badges (emoji-based, fun names)
  - Adult badges: `first_quiz_passed`, `went_live`, etc.
  - Kids badges: `explorer`, `code_wizard`, `bug_squasher`, etc.
- [ ] XP/Level naming:
  - Adult: Foundations → Building → Production → Landscape
  - Kids: Apprentice → Builder → Creator → Master
- [ ] Streaks UI (kids: more celebratory, animations)

### Typography & Fonts
- [ ] Consider adding `font-kids` variant (Comic Sans is bad, but consider friendly sans-serif)
  - Keep current fonts for adult
  - Or just increase size/weight for kids
- [ ] Update Tailwind config with size variants per version

### Landing Page
- [ ] Version selector *before* signup
  - Early redirect: `/` → "Choose your path" → `/auth/sign-up?version=kids` or `?version=adult`
- [ ] LandingHero (version-specific):
  - Kids: "Learn to code, have fun, save the world!"
  - Adult: "Job-ready full-stack in 93 hours, accredited"
- [ ] LandingFeatures (different benefits per version)
- [ ] LandingTestimonials (kids: student testimonials, adult: career outcomes)
- [ ] LandingCTA (kids: "Start Learning", adult: "Get Your Certificate")

---

## Phase 4: Authentication & Onboarding

### Signup Flow
- [ ] Modify `/auth/sign-up` to capture version choice
  - Radio buttons: "I'm learning to code" vs. "I want a job-ready credential"
  - Or age gate: "Under 13" / "13-18" / "18+"
  - Store in `user_metadata.target_audience` and `enrollments.enrolled_version`
- [ ] Post-signup redirect:
  - Kids: `/dashboard?version=kids&onboard=true` → version-specific tutorial
  - Adult: `/dashboard?version=adult` → current flow

### User Switching (UX Decision)
- [ ] Decision: Can users switch versions mid-course?
  - **Option A (Recommended):** No, pick at signup. Keeps progress clean.
  - **Option B:** Yes, but starts fresh in new version. Confusing UX.
  - **Option C:** Yes, can toggle, but progress is separate per version.
- [ ] Implement chosen option

---

## Phase 5: Course Content Rendering

### Module Viewer
- [ ] Update `/course/[module]` to query correct version's content
  - `content/modules/module-00-kids.md` vs. `module-00-adult.md`
  - Or single file with version tags: `<!-- KIDS: --> ... <!-- END KIDS -->`
- [ ] MarkdownRenderer respects version (conditionally render sections)

### Quiz Rendering
- [ ] `/course/[module]/quiz` pulls version-correct questions
- [ ] Answer keys (server action) routes based on `useVersion()`
- [ ] Scoring logic may differ per version

### Deliverable Submission
- [ ] `/course/[module]/submit` shows version-correct rubric preview
- [ ] Auto-checks (URL validation) same, but form hints differ

### Progress Tracking
- [ ] `module_progress`, `quiz_attempts`, `deliverables` queries filtered by version
- [ ] Dashboard shows only current-version progress
- [ ] No cross-version comparisons (keeps progress separate)

---

## Phase 6: Admin & Grading Tools

### Instructor Dashboard
- [ ] `/admin/capstone-reviews` filters by version
  - Kids submissions show kids rubric
  - Adult submissions show adult rubric
- [ ] Version indicator on all submission cards
- [ ] Export reports per version (separate CSV files)

### Grading Rubrics
- [ ] Store different rubrics in DB or as versioned constants
  - Kids rubric: simpler criteria, emphasis on learning
  - Adult rubric: current (skills, job-readiness)

---

## Phase 7: Credentials & Certification

### Certificates
- [ ] Design kids-version certificate
  - Playful design, fun fonts
  - "Certificate of Completion" vs. "Accredited Certificate"
- [ ] Certificate generation logic checks version
  - Different template, different CEU claim
- [ ] Kids: No CEUs (or "Learning Hours" instead)
- [ ] Adult: 9.3 CEUs (current)

### Accreditation
- [ ] Kids version: May not pursue IACET (focus on completion, not CEUs)
- [ ] Kids: Could pursue other credentialing (e.g., Khan Academy style)
- [ ] Adult: Continue IACET path (unchanged)

---

## Phase 8: Testing & QA

### Unit & Integration Tests
- [ ] VersionContext tests (set/get, localStorage)
- [ ] Version-gated content tests (modules, quizzes load correct variant)
- [ ] VersionToggle component tests

### E2E Tests (Playwright)
- [ ] Kids flow: Signup → Module 1 (kids) → Quiz (kids) → Dashboard (kids aesthetic)
- [ ] Adult flow: Signup → Module 1 (adult) → Quiz (adult) → Dashboard (adult aesthetic)
- [ ] Toggle between versions: Verify UI changes
- [ ] Cross-version isolation: Adult user doesn't see kids content, vice versa

### Manual Testing
- [ ] QA kid and adult versions end-to-end
- [ ] Check responsive design for both (kids: larger touch targets)
- [ ] A/B visual review (does kids version feel fun? Does adult feel professional?)

---

## Phase 9: Analytics & Monitoring

### Tracking
- [ ] Log version on all key events (signup, quiz submit, capstone submit)
- [ ] Analytics queries:
  - Completion rate by version
  - Module engagement by version
  - Time-to-complete by version
  - Badge earn rates by version

### Dashboards
- [ ] Instructor view: Kids vs. Adult cohort metrics side-by-side
- [ ] Identify which version resonates (completion, engagement)

---

## Phase 10: Deployment & Monitoring

### Vercel Deployment
- [ ] All changes tested in preview
- [ ] Rollout: Feature flag or direct deploy
- [ ] Monitor error rates per version (in case one breaks)

### Production Checks
- [ ] Verify version toggle works in production
- [ ] Spot-check: Load kids module, load adult module
- [ ] Certificate generation works for both
- [ ] Admin grading tool shows correct rubrics

---

## Blocking Decisions (Before Starting)

1. **Can users switch versions?** (Recommend: No, pick at signup)
2. **Age gate or interest-based?** (Recommend: Interest-based to avoid legal complexity)
3. **Kids CEU/credential approach?** (Recommend: "Completion Certificate", no CEUs)
4. **Timeline:** Start after adult course ships and stabilizes (Phase 11+)

---

## Estimated Effort

| Phase | Effort | Notes |
|-------|--------|-------|
| 1 | 2-3 days | Context, DB migrations |
| 2 | 10-15 days | Content duplication & adaptation (biggest bottleneck) |
| 3 | 5-7 days | UI variants, component updates |
| 4 | 2-3 days | Auth/onboarding |
| 5 | 3-4 days | Content routing, progress tracking |
| 6 | 2-3 days | Admin tools |
| 7 | 2-3 days | Certificates |
| 8 | 3-5 days | Testing |
| 9 | 1-2 days | Analytics setup |
| 10 | 1 day | Deployment, monitoring |
| **Total** | **31-45 days** | **~6-9 weeks**, heavily content-dependent |

---

## Success Metrics (Post-Launch)

- [ ] Kids version completion rate ≥ adult (or defined target)
- [ ] Kids version engagement (daily active, streaks) ≥ adult
- [ ] Kids version Net Promoter Score (if surveyed)
- [ ] Adult version unaffected (same metrics as before toggle)
- [ ] Zero cross-version data leaks (test isolation)

---

## Notes

- **Content is the long pole.** Rewriting 16 modules for kids takes time.
- **Test early & often.** Version toggle touches every flow; regressions likely.
- **Consider hiring.** If pursuing both seriously, kids content writer + QA dedicated.
- **Global expansion:** Add i18n *after* both English versions stabilize.
