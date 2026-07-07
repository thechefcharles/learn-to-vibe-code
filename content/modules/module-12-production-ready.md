# Module 12: Building Production-Ready Software

**Stage:** Production · **Level:** Advanced · **Duration:** ~8 contact hours (0.8 CEU)

**Prerequisites:** Modules 4–11. Learners have a deployed, database-backed app with auth, RLS, design, and an agent feature. This module turns a working app into a *trustworthy* one — direct preparation for the capstone.

> "It works on my screen" and "it's ready for real users" are different bars. This module covers the gap: tests, error handling, security, accessibility, performance, and maintainability. Everything here maps to the capstone rubric — this is the module that gets learners over the pass line.
> 

> **📸 Screenshots:** error/empty/loading states are auto-capturable (Playwright `?state=`); a passing test run is a terminal capture (or paste the text).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Deliver** a tested, secure, maintainable application. *(Create)*
2. **Add** automated tests, error handling, and basic security hardening. *(Apply)*
3. **Ensure** accessibility (WCAG basics, keyboard, contrast) and measure/improve performance (Core Web Vitals). *(Apply/Evaluate)*
4. **Review** code for quality, security, and maintainability against a checklist. *(Evaluate)*

---

## Lesson 12.1 — What "production-ready" means (~30 min)

Production-ready means the app holds up when real people use it in unexpected ways. Five pillars, each a lesson below: **tested**, **resilient** (handles errors/empty/loading), **secure**, **accessible & performant**, and **maintainable**.

Reframe for AI builders: AI helps you *reach* production-ready faster (it writes tests, adds error handling, spots issues), but *you* set the bar and verify — the Module 1 principle at its highest stakes.

---

## Lesson 12.2 — Testing with AI (~75 min)

Begins Objective 2. Tests are code that checks your code, so you can change things confidently. Three levels:

- **Unit tests** — one function in isolation (e.g. "an invoice past its due date is flagged overdue"). Tools: Vitest or Jest.
- **Integration tests** — pieces together (saving a client actually writes to the DB).
- **E2E tests** — drive the real app like a user, in a browser. Tool: Playwright.

**Concrete unit test example (Vitest):**

```typescript
// lib/invoiceStatus.ts
export function isOverdue(invoice: Invoice): boolean {
  const daysOverdue = Math.floor(
    (Date.now() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysOverdue > 0;
}

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

**Concrete E2E test example (Playwright):**

```typescript
// e2e/invoices.spec.ts
import { test, expect } from "@playwright/test";

test("user can view and filter invoices", async ({ page }) => {
  // Sign in (seed a demo user first)
  await page.goto("/login");
  await page.fill("input[type=email]", "demo@example.com");
  await page.fill("input[type=password]", "demo-password");
  await page.click("button:has-text('Sign In')");

  // Navigate to invoices
  await page.goto("/invoices");
  
  // Verify invoices list loads
  await expect(page.locator("h1")).toContainText("Invoices");
  const rows = page.locator("table tbody tr");
  await expect(rows).toBeTruthy();
  
  // Filter to unpaid
  await page.selectOption("[name=status]", "unpaid");
  
  // Verify results updated
  await expect(page.locator("text=No unpaid invoices")).toBeHidden();
});
```

AI writes tests well — give it a function and ask for unit tests covering normal *and* edge cases. **But review the tests:** an AI can write a test that passes but checks the wrong thing, giving false confidence. For example:

```typescript
// ❌ BAD TEST: passes but checks nothing
it("invokes the function", () => {
  isOverdue(someInvoice);
  expect(true).toBe(true); // Always true!
});

// ✅ GOOD TEST: checks the actual return value
it("returns true for overdue invoices", () => {
  const overdue = { dueDate: new Date(Date.now() - 10000).toISOString() };
  expect(isOverdue(overdue as any)).toBe(true);
});
```

Run tests locally and on CI:

```bash
npm run test           # Unit + integration
npm run test:e2e       # Playwright E2E
```

---

**[SCREENSHOT PLACEHOLDER: Test Run Output]**

Terminal showing: `npm run test` output with 25 unit tests passing; `npm run test:e2e` showing 5 E2E tests passing. Proof: tests run and pass.

---

> **Common gotchas (build-verified):** (1) `@playwright/test` (runner) ≠ `playwright` (library) — install the right one. (2) Vitest and Playwright **double-collect** each other's specs unless you scope `include`/`testDir` — keep them in separate folders. (3) Once auth gates routes, **E2E/screenshot scripts must sign in first**, or every test hits a 302 to login. Seed a demo user and log in at the start. (4) Review AI-written tests critically — a passing test doesn't prove code correctness, only that the assertion passes. Check: does the test verify what you intended?
> 

---

## Lesson 12.3 — Error handling & resilient UX (~50 min)

Continues Objective 2. Real apps hit failures. Every data-driven screen needs three states: **Loading** (spinner/skeleton), **Empty** ("No invoices yet — create your first," not a blank table), **Error** (friendly message + retry, never a raw stack trace).

**Concrete example — loading/empty/error states in a component:**

```tsx
// app/invoices/page.tsx
"use client"

import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/invoices");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  // Loading state
  if (invoices === null && !error) {
    return <div className="p-4"><div className="animate-pulse bg-gray-200 h-10 rounded" /></div>;
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h2 className="font-bold text-red-800">Failed to load invoices</h2>
        <p className="text-red-700">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (invoices.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold">No invoices yet</h2>
        <p>Create your first invoice to get started.</p>
        <a href="/invoices/new" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded">
          Create Invoice
        </a>
      </div>
    );
  }

  // Happy path
  return (
    <div>
      <h1>Invoices</h1>
      <table>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.clientName}</td>
              <td>${inv.amount}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

In code: wrap risky operations (DB calls, the agent workflow) in try/catch, handle the error path, never show raw errors to users. In Next.js, use error boundaries and loading files. Ask AI to "add loading, empty, and error states to this component" — then verify each state by testing:

```bash
# Test loading: intercept network requests
# Test empty: mock API to return []
# Test error: mock API to throw
```

---

**[SCREENSHOT PLACEHOLDER: Empty & Error States]**

Three screenshots: (1) Loading state with spinner, (2) Empty state with "No invoices yet" message and Create button, (3) Error state with friendly error + Retry button. Proof: UX handles all states gracefully.

---

---

## Lesson 12.4 — Security hardening (~60 min)

Completes Objective 2 and is non-negotiable. Pull together the course's security threads:

- **Authorization on every path** — RLS (Module 7) enforces data access in the DB; confirm it's on for *every* table, tested with two accounts. Gate protected pages so logged-out users can't reach them.
- **Input validation** — never trust user input; validate on the server, not just the browser.
- **Secrets** — env vars only, never in the repo (Modules 9–10); server-only keys for privileged operations.
- **Least privilege** — code and agents get only the access they need (Module 11).
- **Dependencies** — keep packages updated; AI can flag known-vulnerable ones.

**Concrete security fixes:**

**Bad: No input validation (SSRF/XSS risk)**
```typescript
// ❌ DANGEROUS: trusts user input directly
export async function saveInvoice(clientEmail: string) {
  const client = await supabase
    .from("clients")
    .insert({ email: clientEmail });
  return client;
}
```

**Good: Validate on server**
```typescript
// ✅ SAFE: validates before using
export async function saveInvoice(clientEmail: string) {
  // Validate format
  if (!clientEmail.includes("@") || clientEmail.length > 255) {
    throw new Error("Invalid email");
  }
  
  // Sanitize (remove extra whitespace)
  const clean = clientEmail.trim().toLowerCase();
  
  const client = await supabase
    .from("clients")
    .insert({ email: clean });
  return client;
}
```

**Bad: Missing RLS check (data exposure)**
```sql
-- ❌ DANGEROUS: anyone can read anyone's data
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  amount INT NOT NULL
);
-- No RLS enabled!
```

**Good: RLS on every table**
```sql
-- ✅ SAFE: data access controlled by RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own invoices" ON invoices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users update own invoices" ON invoices
  FOR UPDATE USING (auth.uid() = user_id);
```

**Test with two accounts:** sign in as User A, confirm you see only User A's data. Sign in as User B, confirm you see only User B's data (and can't access User A's via API).

**Bad: Secrets in code**
```typescript
// ❌ DANGEROUS: API key in the repo!
const STRIPE_SECRET = "sk_live_abc123";
```

**Good: Secrets in env vars**
```typescript
// ✅ SAFE: loaded from env at runtime
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET) throw new Error("Missing STRIPE_SECRET_KEY");
```

**AI + security caveat:** AI will happily write insecure code — skip validation, over-expose data, leave RLS off. Security is where you verify *hardest*. Ask AI to review specifically for security issues, then confirm its findings by:
1. Reading the code yourself
2. Testing with two accounts
3. Checking `.gitignore` for secrets
4. Running a dependency audit: `npm audit`

---

## Lesson 12.5 — Accessibility & performance (~60 min)

This delivers Objective 3 — the two production qualities beginners most often skip.

**Accessibility (a11y)** — real users include people using keyboards and screen readers, and it's often a legal requirement. The basics that cover most of it:

- **Semantic HTML** — real `<button>`, `<label>`, headings in order (not `<div>` soup).
- **Keyboard nav** — everything usable without a mouse; visible focus states.
- **Contrast** — text meets WCAG contrast ratios.
- **Labels & alt text** — form inputs have labels; images have alt.

Run a quick audit (browser Lighthouse / axe) and fix the top issues. A component library like shadcn/ui (Module 6) gives you a lot of this for free.

**Performance (Core Web Vitals)** — measure before optimizing. Watch **LCP** (load speed), **INP** (responsiveness), **CLS** (layout stability) via Lighthouse. Common wins: don't fetch everything client-side (use server components), paginate large lists, and size images. Set a simple budget and check it.

---

**[SCREENSHOT PLACEHOLDER: Lighthouse Report]**

Lighthouse audit showing: Accessibility score (e.g., 85+), Performance score (LCP, INP, CLS metrics). Proof: quality metrics meet production bar.

---

> **AI caveat:** AI rarely adds a11y or thinks about performance unless you ask. Prompt for them explicitly ("make this accessible: labels, keyboard, contrast") and verify with a real audit.
> 

---

## Lesson 12.6 — Maintainability (~45 min)

The maintainability half of Objective 1. Code is read far more than written — and with AI generating lots of it, keeping it understandable is a real skill:

- **Clear names** — `getOverdueInvoices` beats `doStuff`.
- **Small, focused pieces** — components/functions that do one thing.
- **Consistent structure** — follow the project's patterns (encode them in `.cursorrules`/[CLAUDE.md](http://CLAUDE.md)).
- **Light docs** — a README (what it is, how to run it); comments only where the *why* isn't obvious.
- **Don't ship what you don't understand** — the course throughline (Module 8's reading skill).

A maintainable codebase is also AI-friendly: clean code gives the model better context. Quality compounds.

---

## Lesson 12.7 — Reviewing against a checklist (~40 min)

Delivers Objective 4 — and mirrors the capstone rubric. Self-review before calling anything done:

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
1. Go through the 9-point checklist in Lesson 12.7
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

**Q12-1:** The pillars of production-ready are tested, resilient, secure, maintainable, and:
- (a) colorful
- (b) **accessible & performant** ✓
- (c) cheap
- (d) fast to type

*Why:* Production-ready has five pillars: tested, resilient (handles errors/empty/loading), secure (RLS/validation/env vars), accessible (WCAG, keyboard, labels), and performant (Core Web Vitals). Real users depend on all five.

**Q12-2:** The caveat when AI writes your tests:
- (a) they're always perfect
- (b) **review them — a test can pass while checking the wrong thing** ✓
- (c) never run them
- (d) delete them

*Why:* A test can pass and still not validate what you care about. The test passes because the assertion is wrong, not because the code works. Review the test logic — does it check what you intended?

**Q12-3:** Which production qualities does AI usually skip unless you ask?
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
  - ✅ **Root cause:** Function names are unclear, no tests, inconsistent patterns. **Fix:** Add tests first (safety net for refactoring), rename functions clearly, extract small pieces, document the pattern in CLAUDE.md.
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

## Tools & alternatives (this module)

Defaults: **Vitest/Jest** (unit/integration), **Playwright** (E2E), **Lighthouse/axe** (a11y + perf). Alternatives: Cypress for E2E; other assertion libraries. The concepts are universal. AI accelerates all of it — but this is the module where you verify its output most rigorously, because the stakes are real users.

---

## Key takeaways

- Production-ready = tested, resilient, secure, accessible, performant, and maintainable — a higher bar than "it works."
- Test at three levels; AI writes tests well, but review that they check the right thing (and watch the runner/glob/auth gotchas).
- Every data screen needs loading, empty, and error states.
- Accessibility and performance are the qualities AI skips — prompt for them explicitly and verify with a real audit.
- Self-review against the checklist before shipping — it's the capstone rubric; don't ship what you can't explain.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)