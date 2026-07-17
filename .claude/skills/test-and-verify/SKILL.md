---
name: test-and-verify
description: Run full test suite and verify code quality
---

# Test and Verify

Run all tests (unit, E2E, accessibility) and verify code quality gates before merge.

## Steps

1. Run unit tests: `npm run test`
   - Must pass all tests
   - Check coverage report
2. Run E2E tests: `npx playwright test`
   - Verify key user flows (sign-up, lesson view, quiz, submit deliverable)
   - No flaky tests
3. Run accessibility audit: `npm run test:a11y`
   - Check WCAG AA compliance
   - Verify alt text on images
   - Verify keyboard navigation
4. Run type check: `npm run type-check`
   - No TypeScript errors
5. Run linter: `npm run lint`
   - No eslint errors
6. Check bundle size: `npm run build && npm run analyze-bundle`
   - Core Web Vitals targets met
   - No unexpected bundle growth
7. Report results:
   - ✓/✗ for each gate
   - Coverage %
   - Any regressions detected

## Usage

```bash
/test-and-verify
```

## When to use

- Before pushing code
- Before creating a PR
- Before deploying to production
- As a pre-commit hook (automated via settings.json)

## Verification criteria

✓ All unit tests pass  
✓ All E2E tests pass  
✓ A11y audit passes  
✓ No TypeScript errors  
✓ No eslint errors  
✓ Bundle size acceptable  
✓ Coverage >= 70%  
