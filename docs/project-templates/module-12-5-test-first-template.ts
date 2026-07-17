// Module 12.5 Project: Test-First Feature Build with Playwright
//
// Objective: Write a failing test, ask Claude Code to make it pass.
// Time: 30-45 minutes
// Deliverable: Feature + passing test + reflection
//
// This file is a starter template. Copy it, modify for your feature,
// then use Claude Code to implement the code that makes it pass.

import { test, expect } from '@playwright/test';

/**
 * EXAMPLE 1: Invoice List Page
 *
 * This test expects a page at /invoices that shows a list of invoices.
 * If you run this test before building the feature, it will fail (red).
 * Then you prompt Claude Code: "Make this test pass."
 * Claude Code builds the feature, and the test passes (green).
 */
test.describe('Invoice List Page', () => {
  test('displays all invoices in a table', async ({ page }) => {
    // Navigate to the invoices page
    await page.goto('http://localhost:3008/invoices');

    // Expect the page title
    const title = page.locator('h1');
    await expect(title).toContainText('Invoices');

    // Expect a table with at least one invoice row
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(3); // Mock data: 3 invoices

    // Expect the create button
    const createBtn = page.locator('button', { hasText: 'Create Invoice' });
    await expect(createBtn).toBeVisible();
  });

  test('create invoice button is clickable', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices');

    const createBtn = page.locator('button', { hasText: 'Create Invoice' });
    await createBtn.click();

    // After clicking, expect a form to appear (or navigate to /invoices/new)
    const amountInput = page.locator('input[name="amount"]');
    await expect(amountInput).toBeVisible();
  });

  test('invoice status badge displays correctly', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices');

    // Find an invoice row and check its status badge
    const statusBadge = page.locator('[data-testid="invoice-status"]').first();
    await expect(statusBadge).toContainText(/Pending|Paid|Overdue/);
  });
});

/**
 * EXAMPLE 2: Filter Feature
 *
 * This test expects a filter dropdown that filters invoices by status.
 * Run this test when the feature doesn't exist yet (should fail).
 * Prompt Claude Code: "Make this test pass. Add a status filter."
 */
test.describe('Invoice List Filtering', () => {
  test('filter by status reduces invoice count', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices');

    // Find the status filter
    const statusFilter = page.locator('[role="combobox"], select', { hasText: 'Status' });
    await statusFilter.selectOption('paid');

    // After filtering, expect only paid invoices
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(1); // Only 1 paid invoice in mock data

    // Verify each row shows "Paid" status
    const badgeText = await page.locator('[data-testid="invoice-status"]').first().textContent();
    expect(badgeText).toContain('Paid');
  });

  test('can clear filter to show all invoices', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices');

    // Apply filter
    const statusFilter = page.locator('[role="combobox"], select', { hasText: 'Status' });
    await statusFilter.selectOption('paid');

    let rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(1);

    // Clear filter (select "All" or empty option)
    await statusFilter.selectOption('');

    // Back to all invoices
    rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(3);
  });
});

/**
 * EXAMPLE 3: Form Validation
 *
 * This test expects form validation to prevent invalid inputs.
 * Run this before implementing validation (should fail).
 * Prompt Claude Code: "Make this test pass. Add validation to reject invalid amounts."
 */
test.describe('Invoice Creation Form', () => {
  test('rejects invalid amount', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices/new');

    // Fill form with invalid amount
    const amountInput = page.locator('input[name="amount"]');
    await amountInput.fill('-100'); // Negative amount (invalid)

    // Try to submit
    const submitBtn = page.locator('button', { hasText: 'Create' });
    await submitBtn.click();

    // Expect an error message
    const errorMsg = page.locator('[role="alert"]');
    await expect(errorMsg).toContainText(/Amount must be positive|Invalid amount/i);

    // Form should not submit
    const confirmPage = page.locator('h1', { hasText: 'Invoice Created' });
    await expect(confirmPage).not.toBeVisible();
  });

  test('rejects empty client field', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices/new');

    // Leave client field empty
    const amountInput = page.locator('input[name="amount"]');
    await amountInput.fill('100');

    // Don't fill client field

    // Try to submit
    const submitBtn = page.locator('button', { hasText: 'Create' });
    await submitBtn.click();

    // Expect error
    const errorMsg = page.locator('[role="alert"]');
    await expect(errorMsg).toContainText(/Client is required/i);
  });

  test('successfully creates invoice with valid data', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices/new');

    // Fill form correctly
    const clientSelect = page.locator('select[name="clientId"]');
    await clientSelect.selectOption('1'); // Select first client

    const amountInput = page.locator('input[name="amount"]');
    await amountInput.fill('500.00');

    const dueDateInput = page.locator('input[name="dueDate"]');
    await dueDateInput.fill('2026-08-17');

    // Submit
    const submitBtn = page.locator('button', { hasText: 'Create' });
    await submitBtn.click();

    // Expect success (redirect to list)
    await page.waitForURL('**/invoices');
    const title = page.locator('h1');
    await expect(title).toContainText('Invoices');

    // Verify new invoice appears in list
    const newInvoice = page.locator('table tbody tr', { hasText: '500.00' });
    await expect(newInvoice).toBeVisible();
  });
});

/**
 * EXAMPLE 4: Mobile Responsiveness
 *
 * This test checks that your feature works on mobile (375px width).
 * Run this to catch responsive design issues.
 */
test.describe('Invoice List (Mobile)', () => {
  test('mobile layout is readable', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 812 }); // iPhone size

    await page.goto('http://localhost:3008/invoices');

    // Title should be visible
    const title = page.locator('h1');
    await expect(title).toBeVisible();

    // Create button should be touchable (≥44px height)
    const createBtn = page.locator('button', { hasText: 'Create Invoice' });
    const box = await createBtn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);

    // Table should not have horizontal scroll
    const table = page.locator('table');
    const pageWidth = await page.evaluate(() => document.documentElement.offsetWidth);
    const tableBox = await table.boundingBox();
    expect(tableBox?.width).toBeLessThanOrEqual(pageWidth);
  });
});

/**
 * EXAMPLE 5: Screenshot Regression Test
 *
 * This test takes a screenshot at each step.
 * If the design changes unexpectedly, the screenshot comparison catches it.
 */
test.describe('Invoice List Screenshot Tests', () => {
  test('invoice list screenshot matches baseline', async ({ page }) => {
    await page.goto('http://localhost:3008/invoices');

    // Wait for content to load
    await page.waitForSelector('table tbody tr');

    // Take screenshot
    await expect(page).toHaveScreenshot('invoice-list-desktop.png');
  });

  test('mobile screenshot matches baseline', async ({ page }) => {
    page.setViewportSize({ width: 375, height: 812 });

    await page.goto('http://localhost:3008/invoices');

    // Wait for content to load
    await page.waitForSelector('table tbody tr');

    // Take screenshot
    await expect(page).toHaveScreenshot('invoice-list-mobile.png');
  });
});

/**
 * EXAMPLE 6: Edge Cases
 *
 * Test boundary conditions, errors, and unusual scenarios.
 */
test.describe('Invoice List Edge Cases', () => {
  test('shows "no invoices" message when list is empty', async ({ page }) => {
    // This assumes you have a route that returns empty invoices
    // or a way to clear the mock data
    await page.goto('http://localhost:3008/invoices?empty=true');

    const emptyMsg = page.locator('text=/No invoices yet|Empty list/i');
    await expect(emptyMsg).toBeVisible();

    // Create button should still be accessible
    const createBtn = page.locator('button', { hasText: 'Create' });
    await expect(createBtn).toBeVisible();
  });

  test('handles network error gracefully', async ({ page }) => {
    // Intercept network and simulate failure
    await page.route('**/api/invoices', route => route.abort());

    await page.goto('http://localhost:3008/invoices');

    // Expect error message, not blank page
    const errorMsg = page.locator('[role="alert"]');
    await expect(errorMsg).toBeVisible();

    // Should have a retry button
    const retryBtn = page.locator('button', { hasText: 'Retry' });
    await expect(retryBtn).toBeVisible();
  });
});

/**
 * HOW TO USE THIS TEMPLATE
 *
 * 1. Copy this file to your project: tests/features/[feature-name].spec.ts
 *
 * 2. Modify the tests for YOUR feature:
 *    - Replace "Invoice" with your entity (Post, Todo, Product, etc.)
 *    - Change URLs, button text, field names to match your app
 *    - Keep the test structure (describe + test)
 *
 * 3. Run the test (it will fail):
 *    npx playwright test tests/features/[feature].spec.ts
 *    ✗ Should show many failures (red)
 *
 * 4. Prompt Claude Code:
 *    claude
 *    "Make this test pass: [paste test name and 3-4 lines of test code]
 *     Build [feature name]. Use [tech stack].
 *     Show me a plan first."
 *
 * 5. Review Claude's plan, approve, let it execute
 *
 * 6. Run test again:
 *    npx playwright test tests/features/[feature].spec.ts
 *    ✓ All tests pass (green)
 *
 * 7. Commit:
 *    git add tests/ app/
 *    git commit -m "feat: add [feature] (test-first)"
 *
 * TIPS
 * - Start with one test (make it pass)
 * - Add more tests for edge cases, mobile, filters
 * - Use data-testid attributes to make tests resilient
 * - Screenshots catch UI regressions automatically
 * - Keep tests focused (one feature per describe block)
 */

/**
 * CLAUDE CODE PROMPT TEMPLATE
 *
 * Copy and modify this for your feature:
 *
 * ---
 *
 * Make this Playwright test pass. Here's the test:
 *
 * test('displays all invoices in a table', async ({ page }) => {
 *   await page.goto('http://localhost:3008/invoices');
 *   const title = page.locator('h1');
 *   await expect(title).toContainText('Invoices');
 *   const rows = page.locator('table tbody tr');
 *   await expect(rows).toHaveCount(3);
 * });
 *
 * Build a /invoices page that:
 * 1) Has an h1 title "Invoices"
 * 2) Shows a table with 3 invoices (mock data)
 * 3) Each row has id, client, amount, dueDate, status columns
 * 4) Uses shadcn/ui Table component
 * 5) Style with Tailwind
 *
 * Stack: Next.js App Router, TypeScript, Tailwind, shadcn/ui
 *
 * Show me a plan first.
 *
 * ---
 *
 * Claude Code will:
 * 1) Propose a plan for files to create/modify
 * 2) You approve or refine
 * 3) It implements the code
 * 4) You run: npx playwright test
 * 5) Test passes ✓
 */
