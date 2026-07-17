# Module 12.5 Resources: Playwright & Test-Driven AI Development

Documentation, tutorials, and examples for building features with Playwright tests and Claude Code.

---

## Playwright Documentation & Setup

### Official Playwright Website
- **Website:** playwright.dev
- **Documentation:** playwright.dev/docs/intro
- **Installation:** `npm install @playwright/test`
- **Getting Started:** playwright.dev/docs/intro

### Playwright Guides (Official)
- **Writing Tests:** playwright.dev/docs/writing-tests
- **Selectors:** playwright.dev/docs/locators
- **Assertions:** playwright.dev/docs/test-assertions
- **Test Runner:** playwright.dev/docs/test-runner
- **Debugging:** playwright.dev/docs/debug

### Quick Start
```bash
# Install Playwright
npm install @playwright/test

# Initialize project
npx playwright install

# Create first test
npx create-playwright

# Run tests
npx playwright test

# Run with UI
npx playwright test --ui

# Debug specific test
npx playwright test --debug tests/features/invoices.spec.ts
```

---

## Test-First Development Pattern

### The Flow
1. **Write test** (fails, red)
2. **Prompt Claude Code** with test name + failing assertion
3. **Claude builds feature** (implementation)
4. **Run test** (passes, green)
5. **Iterate** (add edge cases, validation, etc.)

### Test Template for Claude
```typescript
test('should do X', async ({ page }) => {
  // 1. Navigate to page
  await page.goto('http://localhost:3000/...');
  
  // 2. Perform action
  await page.locator('button').click();
  
  // 3. Verify result
  const text = await page.locator('h1').textContent();
  expect(text).toBe('Expected');
});
```

### Prompt Claude Code
```
Make this Playwright test pass. Here's the test:

test('should do X', async ({ page }) => {
  await page.goto('http://localhost:3000/invoices');
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(3);
});

Build a /invoices page that shows 3 invoices in a table.
Use Next.js, TypeScript, Tailwind.
Show me a plan first.
```

---

## Common Playwright Patterns

### Waiting for Elements
```typescript
// Wait for element to be visible
await page.waitForSelector('.invoice-list');

// Wait for element to have text
await page.waitForFunction(() => {
  const text = document.body.textContent || '';
  return text.includes('Invoice');
});

// Wait for navigation
await page.waitForURL('**/invoices');
```

### Selecting Elements
```typescript
// By text
page.locator('button:has-text("Create Invoice")');

// By role
page.locator('button[role="primary"]');

// By data-testid
page.locator('[data-testid="invoice-row"]');

// CSS selector
page.locator('table tbody tr td:first-child');

// XPath
page.locator('//h1[contains(text(), "Invoices")]');
```

### Form Interactions
```typescript
// Fill input
await page.locator('input[name="email"]').fill('user@example.com');

// Select option
await page.locator('select[name="status"]').selectOption('paid');

// Check checkbox
await page.locator('input[type="checkbox"]').check();

// Submit form
await page.locator('button[type="submit"]').click();
```

### Assertions
```typescript
// Text content
await expect(page.locator('h1')).toContainText('Invoices');

// Visibility
await expect(page.locator('button')).toBeVisible();

// Count
await expect(page.locator('table tr')).toHaveCount(5);

// URL
await expect(page).toHaveURL('**/invoices');

// Value
await expect(page.locator('input')).toHaveValue('test@example.com');

// CSS class
await expect(page.locator('button')).toHaveClass(/primary/);
```

---

## Test Organization

### By Feature
```
tests/
├── features/
│   ├── invoices.spec.ts
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   └── payments.spec.ts
└── utils/
    └── helpers.ts
```

### By Page/Component
```
tests/
├── pages/
│   ├── invoices.spec.ts
│   ├── login.spec.ts
│   └── settings.spec.ts
└── components/
    ├── button.spec.ts
    └── form.spec.ts
```

### By Test Type
```
tests/
├── unit/
├── integration/
└── e2e/
    ├── happy-paths.spec.ts
    ├── edge-cases.spec.ts
    └── error-handling.spec.ts
```

---

## Debugging Playwright Tests

### Debug Mode
```bash
# Run test with debugger UI
npx playwright test --debug tests/features/invoices.spec.ts
```

### View Mode (UI)
```bash
# Watch tests run in browser
npx playwright test --ui
```

### Trace Viewer
```bash
# Inspect test execution with traces
npx playwright test --trace on
npx playwright show-trace trace/trace.zip
```

### Screenshots on Failure
```typescript
test('screenshot on fail', async ({ page }) => {
  await page.goto('http://localhost:3000/invoices');
  
  // If this fails, take a screenshot
  await expect(page.locator('table')).toBeVisible();
  
  // Optionally take screenshot manually
  await page.screenshot({ path: 'screenshot.png' });
});
```

### Console Logging
```typescript
test('with logging', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()));
  
  await page.goto('http://localhost:3000/invoices');
  // Console logs from page will print
});
```

---

## Testing Best Practices

### Use data-testid for Stability
```typescript
// Good: won't break if design changes
page.locator('[data-testid="invoice-create-button"]');

// Bad: breaks if class changes
page.locator('.create-invoice-btn-v2-primary');

// Okay: but fragile
page.locator('button:has-text("Create Invoice")');
```

### Test User Actions, Not Implementation
```typescript
// Good: tests what user sees/does
await page.locator('button', { hasText: 'Save' }).click();
await expect(page.locator('h1')).toContainText('Saved');

// Bad: tests internals
await page.evaluate(() => store.dispatch(saveInvoice()));
expect(store.getState().invoices).toHaveLength(4);
```

### Keep Tests Focused
```typescript
// Good: one concept per test
test('create invoice button shows form', async ({ page }) => {
  await page.locator('button', { hasText: 'Create' }).click();
  await expect(page.locator('input[name="amount"]')).toBeVisible();
});

// Bad: multiple unrelated assertions
test('invoices page works', async ({ page }) => {
  await page.goto('/invoices');
  await expect(page.locator('h1')).toContainText('Invoices');
  await page.locator('button').click();
  await expect(page.locator('form')).toBeVisible();
  // ... 10 more assertions
});
```

### Use Page Objects for DRY Tests
```typescript
// page-objects/invoices.page.ts
export class InvoicesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/invoices');
  }

  async clickCreateButton() {
    await this.page.locator('button', { hasText: 'Create' }).click();
  }

  async fillAmount(amount: string) {
    await this.page.locator('input[name="amount"]').fill(amount);
  }
}

// tests/invoices.spec.ts
test('create invoice', async ({ page }) => {
  const invoicesPage = new InvoicesPage(page);
  await invoicesPage.goto();
  await invoicesPage.clickCreateButton();
  await invoicesPage.fillAmount('500');
});
```

---

## Combining Tests with AI

### Test + Claude Workflow
```
1. Write test (failing)
2. Prompt Claude: "Make this test pass: [test name + assertion]"
3. Claude builds feature
4. Run test (green)
5. Add edge case test
6. Repeat
```

### Refining Prompts for Claude
```
✅ Good: "Make this test pass. The test expects a form with email and password fields."
❌ Bad: "Build a form"

✅ Good: "Add validation: reject amounts < 0"
❌ Bad: "Make it more robust"

✅ Good: "Make this test pass: the invoice list should have a status filter dropdown"
❌ Bad: "Add filtering"
```

---

## CI/CD Integration

### GitHub Actions (Example)
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
```

### Pre-commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit
npm run test:unit
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit cancelled."
  exit 1
fi
```

---

## Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Test times out | Add `timeout: 30000` to test config |
| Selector not found | Use `page.waitForSelector()` before interaction |
| Flaky test (sometimes fails) | Add explicit waits, avoid hardcoded delays |
| Screenshot assertions don't match | Regenerate baseline: `--update-snapshots` |
| Tests pass locally, fail in CI | Check viewport size, timezone, environment vars |

---

## Playwright Resources by Topic

### Writing Tests
- playwright.dev/docs/writing-tests
- playwright.dev/docs/test-assertions
- YouTube: "Playwright Testing Tutorial" (various creators)

### Advanced Patterns
- playwright.dev/docs/api/class-testcase (hooks, fixtures)
- Test generators: `npx playwright codegen`
- Accessibility testing: `@axe-core/playwright`

### Debugging
- playwright.dev/docs/debug
- VS Code extension: "Playwright Inspector"
- GitHub: microsoft/playwright (issues, examples)

### Performance
- playwright.dev/docs/test-parallel (parallel execution)
- playwright.dev/docs/test-performance-reporting

---

## Learning Path

### Week 1: Basics
- [ ] Install Playwright
- [ ] Write 3 simple tests (navigate, click, assert)
- [ ] Run tests with `--ui` to see browser
- [ ] Use selectors and locators

### Week 2: Patterns
- [ ] Test happy path (what user does normally)
- [ ] Test edge cases (validation, errors)
- [ ] Test mobile responsive
- [ ] Organize tests in folders

### Week 3: Test-Driven Development
- [ ] Write failing test
- [ ] Prompt Claude Code to make it pass
- [ ] Iterate (add validations, edge cases)
- [ ] Measure time vs. manual testing

### Week 4: Mastery
- [ ] Screenshot regression tests
- [ ] Page objects for DRY code
- [ ] CI/CD integration
- [ ] Teach someone else

---

## Your Test-First Checklist

- [ ] Playwright installed
- [ ] First test written (fails)
- [ ] Prompted Claude Code to implement
- [ ] Test passes (green)
- [ ] Edge case test added
- [ ] Tests pass locally
- [ ] Tests committed to git
- [ ] Reflection: speed improvement measured

---

## Real-World Example

**Feature: Invoice status filter**

**Test (fails):**
```typescript
test('filter invoices by status', async ({ page }) => {
  await page.goto('http://localhost:3000/invoices');
  
  const filter = page.locator('select[name="status"]');
  await filter.selectOption('paid');
  
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1); // Only paid invoices
});
```

**Prompt Claude Code:**
```
Make this test pass. Build a status filter for the invoice list.
Add a select dropdown with options: All, Pending, Paid, Overdue.
When changed, filter the table to show only matching invoices.
Use Next.js, TypeScript, Tailwind, shadcn/ui.
Show me a plan first.
```

**Result:** Feature built, test green, done in 10 minutes.

---

## Next Steps

1. **Install Playwright:** `npm install @playwright/test`
2. **Write one test:** Navigate to page, click button, verify result
3. **Run test (watch it fail)**
4. **Prompt Claude Code** to build the feature
5. **Run test again** (watch it pass)
6. **Add 2–3 more tests** (edge cases, validation)
7. **Commit:** `feat: add [feature] (test-first)`

---

**Questions?** See Module 12.5 lesson or Playwright docs for deeper dives.
