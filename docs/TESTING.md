# Testing Guide — Phase 10

## Overview

This platform uses **Vitest** for unit tests and **Playwright** for E2E tests. All tests must pass before merging.

## Running Tests

```bash
# Unit tests
npm run test:unit

# E2E tests (requires dev server running)
npm run dev &  # Start server first
npm run test:e2e

# All tests
npm run test

# Coverage report
npm run test:coverage

# Watch mode (unit tests)
npm run test:watch

# UI mode (Vitest)
npm run test:unit:ui

# Playwright UI
npm run test:ui
```

## Test Organization

### Unit Tests

**Location:** `lib/__tests__/*.test.ts`, `tests/unit/*.test.ts`

**Coverage:**
- **auth.test.ts** — Signup, login, logout, password reset
- **quiz-scoring.test.ts** — Quiz scoring logic, retakes
- **gamification-logic.test.ts** — XP awards, badges, streaks, IDOR protection
- **payments.test.ts** — Donation creation, Stripe webhook handling

**Pattern:** Each test uses mocked Supabase client from `tests/setup.ts`.

### E2E Tests

**Location:** `tests/*.spec.ts`

**Coverage:**
- **e2e-golden-path.spec.ts** — Learner flow: signup → lesson → quiz → unlock
- **e2e-capstone-flow.spec.ts** — Capstone: submit → grade → certificate
- **e2e-records-export.spec.ts** — Instructor: export records (CSV)
- **a11y.spec.ts** — WCAG AA accessibility compliance
- **performance.spec.ts** — Core Web Vitals (LCP, FID, CLS)
- **full-system-e2e.spec.ts** — Complete end-to-end journey

**Pattern:** Playwright tests run against live dev server (localhost:3008).

## Adding New Tests

### Unit Test Template

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockSupabaseClient, setupSupabaseMocks } from '../../tests/setup';

describe('Feature', () => {
  setupSupabaseMocks();

  describe('specific behavior', () => {
    it('should do X when Y', () => {
      const result = functionUnderTest(input);
      expect(result).toBe(expected);
    });
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test';

test('User journey: X → Y → Z', async ({ page }) => {
  await page.goto('http://localhost:3008/');
  // Interact with page
  await page.click('button:has-text("Next")');
  // Verify state
  await expect(page).toContainText('Success');
});
```

## Mocking Patterns

### Mocking Supabase

```typescript
mockSupabaseClient.from = vi.fn((table: string) => ({
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockResolvedValue({ data: [...] }),
}));
```

### Mocking Stripe

```typescript
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    webhooks: {
      constructEvent: vi.fn().mockReturnValue({ type: 'checkout.session.completed' }),
    },
  })),
}));
```

## CI/CD

Tests run on every push via GitHub Actions (`.github/workflows/test.yml`):

1. Unit tests: `npm run test:unit`
2. E2E tests: `npm run test:e2e`

All tests must pass before merging to `main`.

## Known Issues

- Quiz scoring tests: 3 failing tests in `lib/__tests__/quizzes.test.ts`
  - `scoreQuiz` percentage calculation mismatch (expected 33, got 25)
  - `getModuleQuiz` returning undefined for valid modules
  - See TESTING-COVERAGE.md for details

## Coverage Targets

- Lines: 70%
- Functions: 70%
- Branches: 60%

Current coverage: Run `npm run test:coverage` for latest (see TESTING-COVERAGE.md for latest report)

## Test Maintenance Checklist

- [ ] Run tests before committing: `npm run test`
- [ ] Use Playwright UI for debugging E2E failures: `npm run test:ui`
- [ ] Monitor CI/CD status in GitHub Actions
- [ ] Update tests when features change (TDD: write test first)
- [ ] Keep mocks in sync with Supabase/Stripe API changes
- [ ] Fix failing tests before merging PRs
