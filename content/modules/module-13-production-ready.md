# Module 13: Building Production-Ready Software

**Stage:** Production · **Level:** Advanced · **Duration:** ~6.5 contact hours (0.65 CEU)

**Prerequisites:** Modules 4–11. Learners have a deployed, database-backed app with auth, RLS, design, and an agent feature. This module turns a working app into a *trustworthy* one — direct preparation for the capstone.

> "It works on my screen" and "it's ready for real users" are different bars. This module covers the gap: tests, error handling, security, accessibility, performance, and maintainability. Everything here maps to the capstone rubric — this is the module that gets learners over the pass line.

---

## What this module covers

Turning a working app into a *trustworthy* one is the goal. This module covers all five pillars of production-ready software — **tested**, **resilient** (handles errors/empty/loading), **secure**, **accessible & performant**, and **maintainable** — and adds test-driven AI development with Playwright, including visual-regression and fuzz-style tests.

**Time:** ~6.5 hours across six lessons plus a folded-in hands-on lab. Everything maps to the capstone rubric.

**Out of scope:** a few niche patterns (golden fixtures, tool contracts) — powerful but optional. Learn them after you ship your capstone.

**Goal:** By the end of Module 13, you'll have a completed production-readiness checklist. Complete it, and you're ready to ship.

---

## Learning objectives

By the end of this module, the learner can:

1. **Deliver** a tested, secure, maintainable application. *(Create)*
2. **Add** automated tests, error handling, and basic security hardening. *(Apply)*
3. **Ensure** accessibility (WCAG basics, keyboard, contrast) and measure/improve performance (Core Web Vitals). *(Apply/Evaluate)*
4. **Review** code for quality, security, and maintainability against a checklist. *(Evaluate)*

---

## Lesson 13.1 — Production-Ready Foundation: Config + Tests (~75 min)

Production-ready means the app holds up when real people use it in unexpected ways. Five pillars: **tested**, **resilient** (handles errors/empty/loading), **secure**, **accessible & performant**, and **maintainable**.

Reframe for AI builders: AI helps you *reach* production-ready faster (it writes tests, adds error handling, spots issues), but *you* set the bar and verify — the Module 2 principle at its highest stakes.

### Configuration Discipline (~30 min)

Production apps live in multiple environments: your local machine, staging, and production. Each needs different settings—a test database vs. production, short timeouts for dev vs. resilient timeouts for prod. **Configuration discipline** means separating *things you might change* (config) from *things you never share* (secrets).

#### For kids

**Config** = things you might change. **Secrets** = things you never share, ever.

**Config examples:**
- Database name: `invoice_tracker_dev` locally, `invoices` on production
- Timeout: 2 seconds locally, 10 seconds on production (production is slow sometimes)
- Feature flags: "is payments on?" (no locally, yes on production)

**Secret examples:**
- Supabase API key
- Database password
- Stripe secret key

**The simple rule:** Put secrets in `.env.local` (git-ignored). Put everything else you might change in config (safe to commit).

Example:
```yaml
# config (safe to commit) — illustrative shape only
database: invoice_tracker_dev
timeout_ms: 2000
enable_payments: false
```

```
# .env.local (git-ignored, secret)
SUPABASE_KEY=sb_secret_xxx
DATABASE_PASSWORD=mypassword123
```

> *The YAML above just illustrates the idea of separating config from secrets. Real Next.js projects don't read a `config.yaml` — they use a typed config file that reads environment variables, shown in the "For adults" section below.*

**Deliverable:** Identify 2–3 hardcoded values in your capstone (timeouts, URLs, feature flags) and move them out of code into a config module instead of leaving them scattered inline.

---

#### For adults

**Config** (versioned in git, safe to commit):
- Environment-specific values: database connection strings for dev/staging/prod
- Feature flags: which features are enabled (canary, beta, etc.)
- Thresholds: timeouts, retry limits, rate limits
- Public URLs and endpoints

> **Illustrative only — Next.js is not configured this way.** The YAML blocks below show the *concept*: environment-specific values kept separate from secrets. Next.js apps do **not** load `config.yaml` files. In a real project this config lives in a typed config module that reads `process.env`, shown in the `lib/config.ts` example that follows.

Example config *shape* (concept, not a real Next.js file):
```yaml
# development (illustrative)
database:
  url: postgresql://localhost/invoice_tracker_dev
  pool_size: 5

features:
  enable_agent_workflows: true
  enable_payments: false

timeouts:
  db_query_ms: 2000
  external_api_ms: 5000
```

```yaml
# production (illustrative)
database:
  url: postgresql://prod-db.example.com/invoices
  pool_size: 25

features:
  enable_agent_workflows: true
  enable_payments: true

timeouts:
  db_query_ms: 10000
  external_api_ms: 15000
```

**Secrets** (in `.env.local` locally, Vercel env vars in production):
- Database passwords and service keys
- API keys (Anthropic, Stripe, SendGrid)
- Signing certificates
- OAuth tokens
- JWT secrets

**The real Next.js pattern** — a typed config module that reads `process.env`. This is how you actually wire config and secrets in this stack:
```typescript
// lib/config.ts
export const config = {
  database: {
    url: process.env.DATABASE_URL || "postgresql://localhost/dev",
    password: process.env.DATABASE_PASSWORD, // Never in config!
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY, // Secrets only
  },
  features: {
    enablePayments: process.env.ENABLE_PAYMENTS === "true",
  },
  timeouts: {
    dbQueryMs: Number(process.env.DB_QUERY_TIMEOUT_MS ?? 2000),
  },
};
```

**Deployment:** Vercel stores secrets in project settings (inaccessible to the code), injects them at build/runtime as env vars. Your code reads `process.env.SOME_SECRET`. This means teammates can clone your repo safely (non-secret defaults are open, secrets come from Vercel), and you can swap environments (dev ↔ prod) just by changing environment variables.

**Audit:** Document which secrets your capstone uses and how they're managed (Vercel env vars, rotation policy, access control). This becomes part of your security checklist in your `CLAUDE.md`.

**Check:** if a value starts with `secret`, `token`, `key`, `password`, or `credential`, it's a secret. If you'd reasonably version-control it or commit with a placeholder, it's config.

---

## Lesson 13.2 — Write Tests: Unit, Integration & E2E (~60 min)

Tests are code that checks your code, so you can change things confidently. **Use Claude Code to generate tests, then you review and verify they actually work.**

Three levels of tests:
- **Unit tests** — one function in isolation (e.g. "an invoice past its due date is flagged overdue"). Tools: Vitest or Jest.
- **Integration tests** — pieces together (saving a client actually writes to the DB).
- **E2E tests** — drive the real app like a user, in a browser. Tool: Playwright.

### Using Claude Code to generate tests

**Step 1 — Identify what to test.** Pick a core function from your app (e.g., `isOverdue`, `calculateTax`, `validateEmail`, or a key user flow).

**Step 2 — Prompt Claude Code to generate tests:**

```bash
claude
```

Send:

```
Generate comprehensive tests for my invoice tracker.

I need:
1. Unit tests (Vitest) for these functions:
   - isOverdue(invoice) — returns true if invoice.dueDate is in the past
   - calculateTotalInvoices(invoices) — sums all invoice amounts
   
2. One E2E test (Playwright) for this flow:
   - User logs in with demo@example.com / password
   - Navigates to /invoices
   - Sees the invoices list
   - Filters by "unpaid" status
   - Verifies results update

For unit tests:
- Cover happy path and edge cases (e.g., today's date, dates in future)
- Use realistic test data

For E2E test:
- Assume a demo user exists in Supabase
- Use proper Playwright selectors
- Include assertions that check results

Generate the test files and setup instructions (any npm packages needed).
```

**Step 3 — Review Claude Code's output.** It will generate test files like:

```typescript
// lib/__tests__/invoiceStatus.test.ts
import { describe, it, expect } from "vitest";
import { isOverdue } from "../invoiceStatus";

describe("isOverdue", () => {
  it("returns true for invoices past due", () => {
    const pastDue = { dueDate: new Date(Date.now() - 5 * 86400000).toISOString() };
    expect(isOverdue(pastDue as any)).toBe(true);
  });

  it("returns false for invoices not yet due", () => {
    const future = { dueDate: new Date(Date.now() + 5 * 86400000).toISOString() };
    expect(isOverdue(future as any)).toBe(false);
  });

  it("handles edge case: due today", () => {
    const today = { dueDate: new Date().toISOString() };
    expect(isOverdue(today as any)).toBe(false);
  });
});
```

An **integration test** goes one level up — it checks that pieces work *together*, e.g. that saving a client actually writes to and reads back from the database (not a mock):

```typescript
// lib/__tests__/clients.integration.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { createClient, getClients } from "../clients";
import { resetTestDb } from "../test/db";

describe("saving a client (integration)", () => {
  beforeEach(async () => {
    await resetTestDb(); // fresh test database before each run
  });

  it("persists a new client and reads it back", async () => {
    await createClient({ name: "Acme Co", email: "billing@acme.test" });

    const clients = await getClients();
    expect(clients).toHaveLength(1);
    expect(clients[0].name).toBe("Acme Co");
  });
});
```

Check each test:
- ✅ Does it test what you care about? (not just `expect(true).toBe(true)`)
- ✅ Does it cover happy path AND edge cases?
- ✅ Are assertions meaningful (checking return values, not just that the function ran)?

**Step 4 — Run the tests.** Execute Claude Code's setup instructions, then:

```bash
npm run test           # Unit + integration
npm run test:e2e       # Playwright E2E
```

**Watch for test failures.** If a test fails, it's useful feedback — the test found a real bug (or the test itself is wrong). Debug with Claude Code: "This test is failing — can you explain what the assertion checks and fix either the test or the function?"

[SCREENSHOT: Terminal showing npm run test with 25 unit tests passing and npm run test:e2e with 5 E2E tests passing]

**Critical:** **Review Claude Code's tests, don't blind-accept them.** A test can pass but check the wrong thing:

```typescript
// ❌ BAD TEST (passes but meaningless)
it("invokes the function", () => {
  isOverdue(someInvoice);
  expect(true).toBe(true); // Always true!
});

// ✅ GOOD TEST (checks actual return value)
it("returns true for overdue invoices", () => {
  const overdue = { dueDate: new Date(Date.now() - 10000).toISOString() };
  expect(isOverdue(overdue as any)).toBe(true);
});
```

Your job: read the test, understand what it's asserting, and verify that's what you care about.

---

## Lesson 13.3 — Harden: Error States, Security, A11y & Performance (~90 min)

**Use Claude Code to generate error handling, security fixes, and accessibility/performance improvements. You verify each by testing.**

### Three hardening tasks, Claude Code orchestrates

**Task 1 — Error handling & resilient UX (40 min)**

Every data-driven screen needs three states: Loading, Empty, Error. Prompt Claude Code:

```bash
claude
```

```
Add loading, empty, and error states to these pages:
- app/invoices/page.tsx
- app/clients/page.tsx

Each page should:
1. Show a loading spinner while fetching
2. Show "No X yet — create one" if the list is empty
3. Show a friendly error message + retry button if the fetch fails

Use shadcn/ui components where available (Skeleton for loading, Button for retry).
Never show raw error messages to users.
```

Claude Code will generate components with try/catch, state management, and all three states. Your job: test each state:

```bash
# Test locally by:
# - Stopping the backend (to trigger error)
# - Mocking empty results
# - Watching for loading state
```

**Task 2 — Security hardening (40 min)**

Prompt Claude Code to review and fix security:

```
Review my app for security issues:
1. Input validation: do all forms validate on the server?
2. RLS policies: is row-level security enabled on every table?
3. Secrets: are all API keys in env vars (not code)?
4. Dependencies: any vulnerable packages? (run npm audit)

For each issue found:
- Show me the bad code
- Propose a fix
- Generate the fixed version

Start with: [paste your data models, form handlers, and API routes]
```

Claude Code will review and propose fixes. Your verification:
- ✅ Read the proposed fixes (do they make sense?)
- ✅ Apply them to your code
- ✅ **Test with two accounts:** log in as User A, confirm you see only User A's data. Log in as User B, confirm they see only User B's data (and can't access User A's)
- ✅ Run `npm audit` to confirm no critical vulnerabilities

**Server-side validation, worked example.** Browser-side validation is a UX nicety — it can be bypassed with a crafted request. The real gate is the server. Here's the same rule enforced in a Next.js server action with a Zod schema: parse untrusted input, reject anything invalid, and only then touch the database:

```typescript
// app/invoices/actions.ts
"use server";

import { z } from "zod";
import { db } from "@/lib/db";

// Validate on the SERVER — never trust the browser
const InvoiceInput = z.object({
  clientId: z.string().uuid(),
  amount: z.number().positive().max(1_000_000),
  dueDate: z.coerce.date(),
});

export async function createInvoice(raw: unknown) {
  const parsed = InvoiceInput.safeParse(raw);
  if (!parsed.success) {
    // Return field errors to the UI, but reject the write
    return { ok: false, errors: parsed.error.flatten() };
  }

  // parsed.data is now typed AND validated — safe to persist
  const invoice = await db.invoices.insert(parsed.data);
  return { ok: true, invoice };
}
```

The same `InvoiceInput` schema can be reused on the client for instant feedback, but the server call is the one that actually protects your data.

**Task 3 — Accessibility & performance (40 min)**

Prompt Claude Code to improve both:

```
Audit my app for accessibility and performance:

1. RUN A LIGHTHOUSE AUDIT:
   - Open the app in Chrome
   - Press F12 → Lighthouse tab
   - Run Accessibility audit (note the score)
   - Run Performance audit (note LCP, INP, CLS)

2. SUGGEST FIXES:
   Based on common issues, improve:
   - Labels on all form inputs
   - Alt text on all images
   - Semantic HTML (use <button> not <div>)
   - Keyboard navigation (tab through the app)
   - Image sizing (compress large images)
   - Unused CSS/JS (tree-shaking, lazy loading)

Generate fixes for the top 3 issues.
```

Claude Code will propose fixes. Your verification:
- ✅ Apply the fixes to your code
- ✅ Re-run Lighthouse → verify scores improved
- ✅ Tab through the app using only keyboard → confirm everything is reachable

[SCREENSHOT: Two Lighthouse reports side by side, before Accessibility 72 Performance 65 and after Accessibility 88 Performance 82]

### Why Claude Code + your verification?

- **Claude Code generates** the boilerplate: error handling wrappers, RLS fixes, WCAG improvements
- **You verify** by testing: does the loading state actually show? Can User B see User A's data? Does the keyboard work?

This split keeps you in control of the hardening while Claude Code handles the mechanical work.

---

## Lesson 13.4 — Browser automation & AI testing: Playwright for iterative UI development (~75 min)

The last skill: using **Playwright** (E2E test framework) not just for validation, but as a **feedback loop** for AI-driven development. Write a Playwright test that fails, ask Claude Code to fix the code to make it pass, then iterate. This "test-driven AI development" is faster and more reliable than manual testing.

### The workflow: Write test → AI fixes code → Test passes

Instead of:
```
you write code → you manually test in browser → you notice a bug → you fix code → repeat
```

Use:
```
you write Playwright test → test fails (red) → Claude Code fixes code → test passes (green) → repeat
```

**Why:** Tests describe your intent. Claude Code can read the failing test and know exactly what to fix. No guessing, no ambiguity.

### Setup: Playwright in your project

If you don't already have it, Claude Code can set it up:

```bash
claude
"Add Playwright testing. Use @playwright/test, write tests in tests/ directory, add 'test' and 'test:ui' scripts to package.json. Then write a test for the login flow and show me the diff."
```

Claude Code installs Playwright, creates the test directory, and generates an example test.

### Test-driven AI workflow: The invoice feature

Let's build invoices test-first.

**Step 1 — Write a failing test:**

```typescript
import { test, expect } from '@playwright/test';

test('invoice list page displays all invoices', async ({ page }) => {
  await page.goto('http://localhost:3008/invoices');
  
  // Expect the page title
  const title = page.locator('h1');
  await expect(title).toContainText('Invoices');
  
  // Expect at least one invoice row in the table
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(3); // Should show 3 mock invoices
  
  // Expect the "Create Invoice" button
  const createBtn = page.locator('button', { hasText: 'Create Invoice' });
  await expect(createBtn).toBeVisible();
});
```

**Run it:**

```bash
npx playwright test tests/invoices.spec.ts
```

**It fails** (red) because the `/invoices` page doesn't exist yet. Good.

**Step 2 — Prompt Claude Code with the failing test:**

```bash
claude
"Make this test pass. The test expects:
1) A page at /invoices with an h1 title 'Invoices'
2) A table with 3 invoice rows (mock data)
3) A 'Create Invoice' button

Use the patterns from app/clients. Show me the plan first, then implement it."
```

Claude Code reads the test, understands what's needed, and generates the feature. The test guides it.

**Step 3 — Run the test again:**

```bash
npx playwright test tests/invoices.spec.ts
```

**It passes** (green). Feature done.

### Iterating with tests: Add a filter

You want to add a status filter. Write a test first:

```typescript
test('invoice list can filter by status', async ({ page }) => {
  await page.goto('http://localhost:3008/invoices');
  
  // Find the status filter dropdown
  const statusFilter = page.locator('select, [role="combobox"]', { hasText: 'Status' });
  await statusFilter.selectOption('paid');
  
  // Expect only "Paid" invoices shown
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1); // Only 1 paid invoice
  
  // Verify the status badge says "Paid"
  const badge = page.locator('[data-status="paid"]');
  await expect(badge).toContainText('Paid');
});
```

Run it. It fails. Prompt Claude Code:

```bash
claude
"Make the invoice filter test pass. Add a status dropdown that filters the list. Use a Select component from shadcn/ui. Show a plan first."
```

Claude Code sees the test, implements the filter, test passes.

### Why test-driven AI development wins

1. **No ambiguity** — The test describes the exact expected behavior. Claude Code can't misinterpret.
2. **Fast feedback** — Test passes or fails immediately. You know if it works.
3. **Safety net** — When you refactor later, tests catch breakage. You can be confident in changes.
4. **Documentation** — Tests show future-you (or teammates) how the feature is supposed to work.
5. **No manual testing** — Browser testing is slow (manual clicking). Automated tests run in seconds.

### Combining Playwright with visual feedback: Screenshots as test output

Playwright can screenshot your app during tests. Use this to catch UI regressions:

```typescript
test('invoice list looks correct on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone size
  await page.goto('http://localhost:3008/invoices');
  
  // Take a screenshot
  await page.screenshot({ path: 'tests/screenshots/invoices-mobile.png' });
  
  // Verify key elements are visible
  const title = page.locator('h1');
  await expect(title).toBeVisible();
});
```

Run the test. It generates `invoices-mobile.png`. Check the screenshot:
- Does it look good on mobile?
- Is the table readable?
- Are buttons touch-friendly (≥44px)?

If you change the styling, re-run the test and check the new screenshot. This catches visual regressions automatically.

### Advanced: Fuzz testing with Claude Code

For complex features, fuzz the behavior with random inputs:

```typescript
test('invoice form rejects invalid amounts', async ({ page }) => {
  await page.goto('http://localhost:3008/invoices/new');
  
  const invalidAmounts = ['abc', '-50', '0', '999999.99'];
  
  for (const amount of invalidAmounts) {
    const input = page.locator('input[name="amount"]');
    await input.fill(amount);
    
    const submitBtn = page.locator('button', { hasText: 'Create' });
    await submitBtn.click();
    
    // Expect an error message
    const error = page.locator('[role="alert"]');
    await expect(error).toBeVisible();
  }
});
```

Prompt Claude Code to make this test pass. It'll implement validation that handles all the edge cases in one go.

### Hands-on: Test-driven feature build

1. **Write a failing Playwright test** for a feature you want to build (e.g., "create a post," "edit user profile," "export as CSV")
2. **Prompt Claude Code** with the test: "Make this test pass. Here's the test [paste]. Implement the feature."
3. **Review the diff** and run the test
4. **Iterate:** Add a second test for an edge case (error state, validation), prompt Claude Code again
5. **Document:** Submit the test file + test output (green checkmarks) + one sentence: "How did writing the test first change your development?"

---

## Lesson 13.5 — Maintainability (~45 min)

Code is read far more than written — and with AI generating lots of it, keeping it understandable is a real skill:

- **Clear names** — `getOverdueInvoices` beats `doStuff`.
- **Small, focused pieces** — components/functions that do one thing.
- **Consistent structure** — follow the project's patterns (encode them in `.cursorrules`/`CLAUDE.md`).
- **Light docs** — a README (what it is, how to run it); comments only where the *why* isn't obvious.
- **Don't ship what you don't understand** — the course throughline (Module 9's reading skill).

A maintainable codebase is also AI-friendly: clean code gives the model better context. Quality compounds.

---

## Lesson 13.6 — Reviewing against a checklist (~40 min)

This lesson mirrors the capstone rubric. Self-review before calling anything done:

| Area | Check |
| --- | --- |
| Functionality | Core features work; happy path and edge cases handled |
| Tests | Key logic has tests; they pass; they check the right things |
| Errors/UX | Loading, empty, and error states on every data screen |
| Security | RLS on all tables (tested w/ 2 accounts); server-side validation; no secrets in repo |
| Accessibility | Semantic HTML, keyboard nav, contrast, labels/alt |
| Performance | Core Web Vitals measured; obvious wins done |
| Maintainability | Clear names, small pieces, consistent structure, README |
| Deployment | Deployed, env vars set, production auth URLs configured |
| Understanding | You can explain every part you're shipping |

Run it against the invoice-tracker and fix each gap. This checklist *is* the capstone rubric in checklist form.

---

## Hands-on activity (~90 min, folded in)

**"Harden the invoice tracker to production-ready."** Follow these steps:

### Step 1: Add unit tests (15 min)
1. Create `lib/__tests__/` folder
2. Pick one core function (e.g., `isOverdue`, `calculateTax`, `validateEmail`)
3. Ask AI: "Write Vitest unit tests for this function covering normal cases and edge cases"
4. Review the tests (do they check what you care about?)
5. Run: `npm run test` → all tests pass

### Step 2: Add one E2E test (15 min)
1. Create `e2e/invoices.spec.ts`
2. Write a test that: logs in → navigates → performs an action → verifies result
3. Seed a demo user in your Supabase project first
4. Run: `npm run test:e2e` → test passes

### Step 3: Add loading/empty/error states (15 min)
1. Pick a data-driven page (e.g., `/invoices`, `/clients`)
2. Ask AI: "Add loading, empty, and error states to this page"
3. Test each state by mocking different API responses (use Playwright intercept or modify the component locally)
4. Verify: loading spinner shows, empty message shows, error message shows

### Step 4: Run security checklist (15 min)
1. For every table in your database:
   - [ ] RLS is enabled
   - [ ] Policies exist for SELECT, INSERT, UPDATE, DELETE
   - Test with two accounts (User A sees only User A's data)

2. For every form/API route:
   - [ ] Input validated on server (not just browser)
   - [ ] Secrets are env vars, not in code

3. Check `.gitignore`:
   - [ ] `.env.local` is listed
   - [ ] `node_modules`, `.next` are listed

4. Run: `npm audit` → no critical vulnerabilities

### Step 5: Run a11y + performance audit (15 min)
1. Deploy to Vercel or run locally
2. Open in Chrome, press F12, go to Lighthouse
3. Run: Accessibility audit → note score
4. Run: Performance audit → note LCP, INP, CLS
5. Fix the top 2-3 issues:
   - Missing alt text? Add it
   - Low contrast? Increase it
   - Large images? Compress/size them
   - Missing labels? Add them
6. Re-run Lighthouse → verify scores improved

### Step 6: Self-review against checklist (15 min)
1. Go through the 9-point checklist in Lesson 13.6
2. For each item: does your app pass?
3. List: ✅ (passes) or ❌ (needs work)
4. For each ❌, write what you'd fix

### Deliverable:
- Passing unit test + E2E test (screenshot or test output)
- Screenshots of loading/empty/error states
- Screenshot of Lighthouse audit (before & after)
- Completed 9-point checklist (with ✅ or ❌ for each)
- Write-up: one paragraph on what hardening taught you

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q13-1:** The pillars of production-ready are tested, resilient, secure, maintainable, and:
- (a) colorful
- (b) **accessible & performant** ✓
- (c) cheap
- (d) fast to type

*Why:* Production-ready has five pillars: tested, resilient (handles errors/empty/loading), secure (RLS/validation/env vars), accessible (WCAG, keyboard, labels), and performant (Core Web Vitals). Real users depend on all five.

**Q13-2:** The caveat when AI writes your tests:
- (a) they're always perfect
- (b) **review them — a test can pass while checking the wrong thing** ✓
- (c) never run them
- (d) delete them

*Why:* A test can pass and still not validate what you care about. The test passes because the assertion is wrong, not because the code works. Review the test logic — does it check what you intended?

**Q13-3:** Which production qualities does AI usually skip unless you ask?
- (a) Variable names
- (b) **Accessibility & performance** ✓
- (c) Syntax
- (d) Comments

*Why:* AI excels at logic and structure. It rarely thinks about a11y (labels, keyboard, contrast) or performance (bundle size, Core Web Vitals) unless you explicitly prompt for them. Ask. Verify. Measure.

---

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Deliver production-ready:** Describe what "production-ready" means and how it differs from "it works on my screen."
- *Example answer:* "Production-ready means the app holds up when real people use it unexpectedly. It's tested (unit/E2E), resilient (handles errors/loading/empty), secure (RLS/validation/env vars), accessible (keyboard/contrast/labels), performant (Core Web Vitals), and maintainable (clear names, documented). 'It works on my screen' is just the happy path."

**Objective 2 — Tests/errors/hardening:** Explain why a test can pass but be wrong, and give an example.
- *Example answer:* "A test can pass but check the wrong thing. Example: `it("function exists", () => { expect(true).toBe(true); })` passes but doesn't verify the function's behavior. Better: `it("returns true for overdue invoices", () => { expect(isOverdue(pastDue)).toBe(true); })` checks what we care about."

**Objective 3 — A11y & performance:** Name three WCAG basics and one Core Web Vital, then explain how you'd measure them.
- *Example answer:* "WCAG basics: semantic HTML (real buttons), keyboard navigation (Tab key works), contrast (text meets ratio), alt text (images described). Core Web Vital: LCP (time to largest paint). Measure with Chrome Lighthouse (F12 → Lighthouse tab)."

**Objective 4 — Review:** Use the 9-point checklist to review your app and identify one gap and how to fix it.
- *Example answer:* "My app fails Accessibility (missing form labels). Fix: add `<label htmlFor="email">` to the input field and aria attributes. Verified with Lighthouse that the score improved."

### Scenario-based judgment checks:

*For each scenario, explain what's the problem and what to do.*

- **(a) All your tests pass, but your app crashes in production.** Tests passed but didn't catch the bug.
  - ✅ **Root cause:** Tests only checked the happy path, not edge cases or integration. **Fix:** Add tests for error states (invalid input, network failure), test with real DB (not mocks), test with two accounts.
  - ❌ **Avoid:** Trusting tests alone. Tests catch bugs you think to test for; they don't catch everything.

- **(b) You deployed but users with screen readers can't use your app.** No a11y testing.
  - ✅ **Root cause:** AI generated HTML without labels/alt/semantic structure. **Fix:** Run Lighthouse a11y audit, add labels to forms, add alt text to images, use semantic HTML (`<button>` not `<div>`).
  - ❌ **Avoid:** Skipping a11y because "most users don't need it." Some do. It's a legal requirement in many places.

- **(c) Your app is slow (Lighthouse: LCP = 5s).** Performance not measured.
  - ✅ **Root cause:** Probably fetching all data client-side. **Fix:** Use server components (don't fetch on client), paginate large lists, size images properly, check Core Web Vitals.
  - ❌ **Avoid:** Hoping it's fast. Measure with Lighthouse. Optimize what's slow.

- **(d) A user from a different team can see another team's invoices.** RLS not tested.
  - ✅ **Critical:** Test with two accounts! User A signs in → sees only User A's data. User B signs in → sees only User B's data. **Fix:** Check RLS policies in Supabase; verify both SELECT and UPDATE policies exist.
  - ❌ **Avoid:** Assuming RLS works without testing. This is a real data breach.

- **(e) You need to add a feature but the code is a mess and you're terrified to change it.** Non-maintainable code.
  - ✅ **Root cause:** Function names are unclear, no tests, inconsistent patterns. **Fix:** Add tests first (safety net for refactoring), rename functions clearly, extract small pieces, document the pattern in `CLAUDE.md`.
  - ❌ **Avoid:** Shipping unmaintainable code. Technical debt compounds. Harder to ship later.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Unit tests** | At least 1 unit test written, covers normal + edge case, passes |
| **E2E test** | At least 1 E2E test (real browser, real login, real action), passes |
| **Loading state** | Data-driven page shows loading spinner/skeleton while fetching |
| **Empty state** | Page shows friendly "No items yet" message, not blank table |
| **Error state** | Page shows friendly error + retry button, never raw error message |
| **RLS verified** | Enabled on all tables; tested with 2 accounts (A sees only A's data) |
| **Input validation** | Server-side validation on forms (not just browser) |
| **Secrets safe** | `.env.local` in `.gitignore`; no API keys in code |
| **A11y checked** | Lighthouse a11y audit run; score ≥85; semantic HTML, labels, alt text |
| **Performance checked** | Lighthouse performance audit run; LCP, INP, CLS measured; obvious wins done (images sized, data paginated) |
| **Tests reviewed** | You read your own tests; each one checks what you intended (not just passing) |
| **App deployable** | Deploys without errors; env vars configured; auth URLs set |
| **README exists** | One-page README: what it is, how to run it, how to test it |
| **Checklist completed** | 9-point production-readiness checklist filled out; each item ✅ or ❌ with notes |
| **Understanding** | You can explain every part you're shipping; no "I don't know why this works" |

*Pass mark: 80% and a hardened app with test output, audit screenshots, and completed checklist submitted.*

---

Defaults: **Vitest/Jest** (unit/integration), **Playwright** (E2E), **Lighthouse/axe** (a11y + perf). Alternatives: Cypress for E2E; other assertion libraries. The concepts are universal. AI accelerates all of it — but this is the module where you verify its output most rigorously, because the stakes are real users.

---

## Key takeaways

- Production-ready = tested, resilient, secure, accessible, performant, and maintainable — a higher bar than "it works."
- Test at three levels; AI writes tests well, but review that they check the right thing (and watch the runner/glob/auth gotchas).
- Every data screen needs loading, empty, and error states.
- Accessibility and performance are the qualities AI skips — prompt for them explicitly and verify with a real audit.
- Self-review against the checklist before shipping — it's the capstone rubric; don't ship what you can't explain.
