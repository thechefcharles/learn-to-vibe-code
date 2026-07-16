# Phase 10: Harden Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive unit tests, E2E test coverage, WCAG AA accessibility compliance, Core Web Vitals optimization, and accreditor records export to production-harden the platform.

**Architecture:** Test-driven hardening with three layers: (1) unit tests for auth/quiz/gamification/payments logic, (2) E2E tests for complete user journeys (signup→course→capstone→cert), (3) a11y audits via axe-core + Playwright, and (4) Core Web Vitals optimization targeting LCP <2.5s, FID <100ms, CLS <0.1.

**Tech Stack:** Vitest 4.1.9 (unit tests), Playwright 1.61.1 (E2E), axe-core + axe-playwright (a11y), @vercel/web-vitals (performance), shadcn/ui (accessible components).

## Global Constraints

- Test files: `lib/__tests__/*.test.ts`, `tests/unit/*.test.ts`, `tests/*.spec.ts`
- Unit test command: `npm run test:unit`
- E2E test command: `npm run test:e2e`
- All tests must pass before merging; no skipped tests (`test.skip`, `it.skip`)
- A11y: WCAG AA compliance; all interactive elements keyboard-navigable; alt text on all images
- Core Web Vitals: LCP ≤2.5s, FID ≤100ms, CLS ≤0.1 (measure on real device, not just local)
- Records export: CSV (for accreditors), PDF (for learners); instructor-only endpoint
- Auth always uses server-side validation; never trust client tokens
- Quiz answer keys and capstone rubrics stay server-only; never sent to client

---

### Task 1: Setup Testing Infrastructure & CI

**Files:**
- Modify: `package.json` (add test:coverage, test:watch scripts)
- Create: `.github/workflows/test.yml` (GitHub Actions CI)
- Modify: `vitest.config.ts` (add coverage config)
- Create: `tests/setup.ts` (shared test utilities, mock Supabase client)

**Interfaces:**
- Produces: `getTestSupabaseClient()` mock for Supabase auth/DB queries in unit tests
- Produces: GitHub Actions workflow that runs tests on every push

- [ ] **Step 1: Add test:coverage and test:watch scripts to package.json**

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

Run: `npm run test:coverage` to verify setup.

- [ ] **Step 2: Create tests/setup.ts with mock Supabase client**

```typescript
// tests/setup.ts
import { beforeEach, vi } from 'vitest';

export const mockSupabaseClient = {
  auth: {
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
    resetPasswordForEmail: vi.fn(),
  },
  from: vi.fn((table: string) => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  })),
};

export const setupSupabaseMocks = () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
};
```

- [ ] **Step 3: Update vitest.config.ts to add coverage**

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['tests/setup.ts'],
    include: ['lib/**/*.test.ts', 'tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['lib/**/*.ts', 'app/api/**/*.ts'],
      exclude: ['lib/**/*.test.ts', 'node_modules'],
      lines: 70,
      functions: 70,
      branches: 60,
    },
  },
});
```

- [ ] **Step 4: Create GitHub Actions workflow**

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:e2e
```

- [ ] **Step 5: Commit**

```bash
git add package.json vitest.config.ts tests/setup.ts .github/workflows/test.yml
git commit -m "test: setup testing infrastructure and CI"
```

---

### Task 2: Unit tests for auth (signup, login, password reset, session)

**Files:**
- Create: `lib/__tests__/auth.test.ts`
- Modify: `lib/auth.ts` (ensure pure functions testable)

**Interfaces:**
- Consumes: `lib/auth.ts` functions
- Produces: `auth.test.ts` covering signup, login, logout, password reset, session validation

- [ ] **Step 1: Write failing tests for auth functions**

```typescript
// lib/__tests__/auth.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockSupabaseClient } from '../../tests/setup';

describe('Auth', () => {
  describe('signup', () => {
    it('should return error if email exists', async () => {
      // Mock auth.signUp to reject with "User already exists"
      mockSupabaseClient.auth.signUp.mockRejectedValue(
        new Error('User already exists')
      );
      // Call signup with test email
      // Expect error to be returned
    });

    it('should return user and session on success', async () => {
      const mockUser = { id: 'test-id', email: 'test@test.com' };
      const mockSession = { access_token: 'token123', user: mockUser };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });
      // Call signup
      // Expect user and session returned
    });
  });

  describe('login', () => {
    it('should reject invalid credentials', async () => {
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: new Error('Invalid credentials'),
      });
      // Call login
      // Expect error
    });

    it('should return session on valid credentials', async () => {
      const mockSession = { access_token: 'token456', user: { id: 'id' } };
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockSession.user, session: mockSession },
        error: null,
      });
      // Call login
      // Expect session returned
    });
  });

  describe('logout', () => {
    it('should clear session on logout', async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null });
      // Call logout
      // Expect signOut called
    });
  });

  describe('password reset', () => {
    it('should send recovery email', async () => {
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({
        error: null,
      });
      // Call resetPassword
      // Expect email sent
    });

    it('should reject invalid email', async () => {
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({
        error: new Error('Email not found'),
      });
      // Call resetPassword with invalid email
      // Expect error
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:unit -- lib/__tests__/auth.test.ts
```

Expected: All tests FAIL (functions not fully tested yet).

- [ ] **Step 3: Implement auth tests completely**

Flesh out the test file with actual test logic (mock calls, assertions).

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:unit -- lib/__tests__/auth.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/__tests__/auth.test.ts
git commit -m "test: unit tests for auth (signup, login, password reset)"
```

---

### Task 3: Unit tests for quiz system (scoring, retakes, answer keys)

**Files:**
- Create: `lib/__tests__/quiz-scoring.test.ts`
- Reference: `lib/quizzes.ts` (quiz questions and scoring logic)

**Interfaces:**
- Consumes: `lib/quizzes.ts` scoring functions
- Produces: `quiz-scoring.test.ts` covering quiz submission, scoring, pass/fail, retakes

- [ ] **Step 1–5: Similar to Task 2, create comprehensive quiz unit tests**

Test cases:
- Correct answer = 1 point
- Wrong answer = 0 points
- Passing score ≥80%
- Can retake after 24h
- Answer keys never sent to client (server-side only)
- Questions shuffled on retake

```typescript
// lib/__tests__/quiz-scoring.test.ts
import { describe, it, expect } from 'vitest';
import { calculateQuizScore, isQuizPassed, canRetake } from '../../lib/quizzes';

describe('Quiz Scoring', () => {
  it('should calculate score correctly', () => {
    const answers = [0, 1, 0]; // correct, correct, wrong
    const score = calculateQuizScore(answers);
    expect(score).toBe(67); // 2/3 = 67%
  });

  it('should mark quiz as passed if score ≥80%', () => {
    expect(isQuizPassed(80)).toBe(true);
    expect(isQuizPassed(79)).toBe(false);
  });

  it('should allow retake after 24h', () => {
    const lastAttempt = new Date(Date.now() - 25 * 60 * 60 * 1000); // 25h ago
    expect(canRetake(lastAttempt)).toBe(true);
  });

  it('should not allow retake before 24h', () => {
    const lastAttempt = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1h ago
    expect(canRetake(lastAttempt)).toBe(false);
  });
});
```

Run: `npm run test:unit -- lib/__tests__/quiz-scoring.test.ts`

Expected: All tests PASS.

- [ ] **Commit**

```bash
git add lib/__tests__/quiz-scoring.test.ts
git commit -m "test: unit tests for quiz scoring and retakes"
```

---

### Task 4: Unit tests for gamification (XP, badges, streaks, IDOR protection)

**Files:**
- Reference: `lib/__tests__/gamification-logic.test.ts` (may already exist, expand if needed)
- Reference: `lib/gamification-logic.ts`

**Interfaces:**
- Consumes: XP award, badge earning, streak tracking
- Produces: Tests for IDOR protection (user can't award XP to other users)

Test cases:
- Award XP: correct points added, level updated
- IDOR protection: user can't modify other users' XP
- Badges: awarded on milestone (first_quiz_passed, rls_locked_down, etc.)
- Streaks: incremented on activity, reset after 1 day idle
- Idempotent XP: same action twice = same result

```typescript
// Extend lib/__tests__/gamification-logic.test.ts
describe('IDOR Protection', () => {
  it('should not allow user to award XP to other user', async () => {
    const userId = 'user-123';
    const otherUserId = 'user-456';
    const req = { userId }; // Current user
    
    // Attempt to award XP to other user
    const result = await awardXP(otherUserId, 100, req);
    
    expect(result.error).toBeDefined();
    expect(result.error).toContain('Unauthorized');
  });
});
```

Run: `npm run test:unit -- lib/__tests__/gamification-logic.test.ts`

Expected: All tests PASS (including IDOR protection).

---

### Task 5: Unit tests for payments (donation creation, Stripe webhook)

**Files:**
- Create: `lib/__tests__/payments.test.ts`
- Reference: `lib/stripe.ts`, `app/api/webhooks/stripe/route.ts`

**Interfaces:**
- Consumes: Stripe donation creation, webhook event handling
- Produces: Tests for donation flow, webhook signature verification, idempotency

Test cases:
- Create donation: records created in DB with pending status
- Webhook signature validation: rejects invalid signatures
- checkout.session.completed event: updates donation to success
- charge.failed event: updates donation to failed
- Idempotent: same webhook event twice = same result

```typescript
// lib/__tests__/payments.test.ts
import { describe, it, expect, vi } from 'vitest';
import Stripe from 'stripe';

describe('Payment Processing', () => {
  it('should create donation record on valid session', async () => {
    const session = {
      id: 'cs_test_123',
      client_secret: null,
      payment_intent: 'pi_test_456',
    };
    // Mock Stripe session retrieval
    // Create donation
    // Assert DB record created with pending status
  });

  it('should verify webhook signature', async () => {
    const signature = 'invalid_sig';
    const body = '{"test": "data"}';
    // Attempt to process webhook
    // Expect signature validation to fail
  });

  it('should update donation to success on checkout.session.completed', async () => {
    // Mock webhook event
    // Process event
    // Assert donation.status = 'success'
  });

  it('should be idempotent on duplicate webhook', async () => {
    // Send same webhook twice
    // Assert donation still marked success once (no double-processing)
  });
});
```

Run: `npm run test:unit -- lib/__tests__/payments.test.ts`

Expected: All tests PASS.

---

### Task 6: E2E test for complete signup → lesson → quiz → unlock flow

**Files:**
- Create: `tests/e2e-golden-path.spec.ts`
- Reference: Playwright config

**Interfaces:**
- Consumes: Live app (dev server running on port 3008)
- Produces: E2E test covering full learner journey

Steps:
1. Sign up with new email
2. View Module 0 lesson
3. Complete quiz (3 questions, 2+ correct = pass)
4. Assert Module 1 unlocks
5. Log out
6. Log back in
7. Verify progress persisted

```typescript
// tests/e2e-golden-path.spec.ts
import { test, expect } from '@playwright/test';

test('Learner golden path: signup → lesson → quiz → unlock', async ({ page }) => {
  const testEmail = `test-${Date.now()}@test.com`;
  const testPassword = 'TestPassword123!';

  // Sign up
  await page.goto('http://localhost:3008/signup');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button:has-text("Sign Up")');
  await page.waitForURL('http://localhost:3008/dashboard');

  // Navigate to Module 0 quiz
  await page.goto('http://localhost:3008/course/module-00');
  await page.click('button:has-text("Start Quiz")');

  // Answer 2 out of 3 questions correctly (pass)
  await page.click('input[value="0"]'); // Q1 correct
  await page.click('input[value="1"]'); // Q2 correct
  await page.click('input[value="0"]'); // Q3 wrong
  await page.click('button:has-text("Submit")');

  // Assert quiz passed
  await expect(page).toContainText('Quiz Passed');

  // Assert Module 1 unlocked
  await page.goto('http://localhost:3008/course');
  const module1 = page.locator('div:has-text("Module 1")');
  await expect(module1).not.toContainText('Locked');

  // Log out
  await page.click('[data-testid="user-menu"]');
  await page.click('button:has-text("Sign Out")');
  await page.waitForURL('http://localhost:3008/');

  // Log back in
  await page.click('a:has-text("Sign In")');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button:has-text("Sign In")');
  await page.waitForURL('http://localhost:3008/dashboard');

  // Verify progress persisted
  await page.goto('http://localhost:3008/course');
  const module1Unlocked = page.locator('div:has-text("Module 1")');
  await expect(module1Unlocked).not.toContainText('Locked');
});
```

Run: `npm run test:e2e -- tests/e2e-golden-path.spec.ts`

Expected: Test PASSES (all steps succeed).

---

### Task 7: E2E test for capstone → submission → grading → certificate

**Files:**
- Create: `tests/e2e-capstone-flow.spec.ts`

**Interfaces:**
- Consumes: Live app + instructor admin panel
- Produces: E2E test covering capstone submission, grading, certificate generation

Steps:
1. Sign up as learner
2. Auto-complete all modules (mock/bypass by setting DB directly or via admin)
3. Access capstone page
4. Submit capstone (repo URL, live URL, writeup, defense video URL)
5. As instructor, grade capstone with rubric scores
6. Verify learner sees passing grade
7. Download certificate as PDF

---

### Task 8: E2E test for admin records export

**Files:**
- Create: `tests/e2e-records-export.spec.ts`

**Interfaces:**
- Consumes: Instructor-only `/admin/records-export` route
- Produces: E2E test verifying CSV/PDF export works

Steps:
1. Sign in as instructor
2. Navigate to `/admin/records-export`
3. Select export format (CSV)
4. Click export
5. Verify file downloads with correct headers and data

---

### Task 9: WCAG AA accessibility audit (automated + manual)

**Files:**
- Create: `tests/a11y-audit.spec.ts` (automated via axe-core)
- Create: `docs/a11y-audit-manual.md` (manual checklist)

**Interfaces:**
- Consumes: axe-playwright, live app
- Produces: Audit results; fixes for critical/serious violations

Automated checks via axe-core:
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels on interactive elements
- Alt text on images
- Color contrast (4.5:1 text, 3:1 UI components)
- Form labels associated with inputs
- No focus traps

Manual checks:
- Screen reader testing (NVDA/JAWS simulation)
- Zoom to 200% readability
- Page works with sound OFF
- Motion respects prefers-reduced-motion

```typescript
// tests/a11y-audit.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('Home page should be WCAG AA compliant', async ({ page }) => {
  await page.goto('http://localhost:3008/');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});

test('Course page should be WCAG AA compliant', async ({ page }) => {
  await page.goto('http://localhost:3008/course');
  await injectAxe(page);
  await checkA11y(page);
});

test('Quiz page should be WCAG AA compliant', async ({ page }) => {
  await page.goto('http://localhost:3008/course/module-00/quiz');
  await injectAxe(page);
  await checkA11y(page);
});
```

Run: `npm run test:e2e -- tests/a11y-audit.spec.ts`

Expected: All pages pass axe-core checks (no critical/serious violations).

---

### Task 10: Core Web Vitals optimization (LCP, FID, CLS)

**Files:**
- Modify: App components for performance
- Create: `tests/performance.spec.ts` (Core Web Vitals measurement)

**Interfaces:**
- Consumes: @vercel/web-vitals, Lighthouse API
- Produces: Performance optimization fixes, test verifying metrics

Optimizations:
- Image lazy-loading + next/image
- Font optimization (system fonts or preload)
- Code splitting + dynamic imports
- Remove/defer non-critical CSS/JS
- Memoize expensive renders
- Database query optimization

```typescript
// tests/performance.spec.ts
import { test, expect } from '@playwright/test';

test('Home page Core Web Vitals', async ({ page }) => {
  const vitals = { lcp: 0, fid: 0, cls: 0 };

  page.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('LCP:')) vitals.lcp = parseFloat(text.split(':')[1]);
    if (text.includes('FID:')) vitals.fid = parseFloat(text.split(':')[1]);
    if (text.includes('CLS:')) vitals.cls = parseFloat(text.split(':')[1]);
  });

  await page.goto('http://localhost:3008/');
  await page.waitForLoadState('networkidle');

  expect(vitals.lcp).toBeLessThanOrEqual(2500); // 2.5s
  expect(vitals.fid).toBeLessThanOrEqual(100);
  expect(vitals.cls).toBeLessThanOrEqual(0.1);
});
```

---

### Task 11: Records export PDF generation & download

**Files:**
- Create: `lib/pdf-export.ts` (PDF generation for records)
- Create: `app/api/admin/export-records-pdf/route.ts`
- Test: `lib/__tests__/pdf-export.test.ts`

**Interfaces:**
- Consumes: Learner records (enrollment, quiz attempts, deliverables, capstone scores)
- Produces: PDF file with formatted records, downloadable via API endpoint

PDF structure:
- Header (platform name, issue date)
- Learner info (ID, name, email, enrollment date)
- Module progress (checklist, quiz scores)
- Capstone result (pass/fail, rubric scores)
- Contact hours & CEUs awarded
- Certificate ID

```typescript
// app/api/admin/export-records-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateRecordsPDF } from '@/lib/pdf-export';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Check instructor role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'instructor') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId } = await req.json();
  const pdfBuffer = await generateRecordsPDF(userId, supabase);

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="records-${userId}.pdf"`,
    },
  });
}
```

---

### Task 12: Admin dashboard for records viewing & export UI

**Files:**
- Create: `app/admin/records/page.tsx` (records list view)
- Create: `components/admin/RecordsTable.tsx` (sortable table)
- Create: `components/admin/ExportButton.tsx` (CSV/PDF export buttons)

**Interfaces:**
- Consumes: Records API endpoints
- Produces: Instructor-facing UI for viewing and exporting learner records

Features:
- List all learners (search, filter by status)
- View individual learner record
- Export single learner records (CSV, PDF)
- Bulk export all records (CSV)

---

### Task 13: Final E2E verification & cleanup

**Files:**
- Create: `tests/full-system-e2e.spec.ts` (comprehensive integration test)

**Interfaces:**
- Consumes: All E2E tests from previous tasks
- Produces: Full system verification test

Full flow:
1. Learner signs up
2. Completes Module 0 + quiz
3. Completes capstone
4. Instructor grades capstone
5. Learner downloads certificate
6. Instructor exports records (CSV + PDF)
7. All data persists across sessions

---

### Task 14: Testing documentation & coverage report

**Files:**
- Create: `docs/TESTING.md` (testing guide)
- Create: `docs/TESTING-COVERAGE.md` (coverage report)

**Interfaces:**
- Consumes: All test results and coverage data
- Produces: Documentation for maintaining test suite

Content:
- How to run tests locally
- How to add new tests
- Test naming conventions
- Mocking patterns (Supabase, Stripe)
- CI/CD integration
- Coverage dashboard link
- Known flaky tests (if any)

Run: `npm run test:coverage` to generate coverage report.

---

## Summary

Phase 10 delivers:
- ✅ Unit test coverage for auth, quizzes, gamification, payments (~400 lines)
- ✅ E2E tests for complete user journeys (signup→capstone→cert) (~600 lines)
- ✅ WCAG AA accessibility compliance (automated + manual audit)
- ✅ Core Web Vitals optimization (LCP <2.5s, FID <100ms, CLS <0.1)
- ✅ Records export (CSV for accreditors, PDF for archival)
- ✅ Instructor admin UI for records management
- ✅ GitHub Actions CI/CD running tests on every push
- ✅ Testing documentation and coverage dashboard

All tests must pass; no skipped or pending tests. Coverage target: 70% lines/functions, 60% branches.
