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

AI writes tests well — give it a function and ask for unit tests covering normal *and* edge cases. **But review the tests:** an AI can write a test that passes but checks the wrong thing, giving false confidence.

```bash
npm run test
```

![loading](/screenshots/m12/m12-01-loading.png)

> **Common gotchas (build-verified):** (1) `@playwright/test` (runner) ≠ `playwright` (library) — install the right one. (2) Vitest and Playwright **double-collect** each other's specs unless you scope `include`/`testDir` — keep them in separate folders. (3) Once auth gates routes, **E2E/screenshot scripts must sign in first**, or every test hits a 302 to login. Seed a demo user and log in at the start.
> 

---

## Lesson 12.3 — Error handling & resilient UX (~50 min)

Continues Objective 2. Real apps hit failures. Every data-driven screen needs three states: **Loading** (spinner/skeleton), **Empty** ("No invoices yet — create your first," not a blank table), **Error** (friendly message + retry, never a raw stack trace).

In code: wrap risky operations (DB calls, the agent workflow) in try/catch, handle the error path, never show raw errors to users. In Next.js, use error boundaries and loading files. Ask AI to "add loading, empty, and error states to this component" — then verify each triggers.

![empty](/screenshots/m12/m12-02-empty.png)

---

## Lesson 12.4 — Security hardening (~60 min)

Completes Objective 2 and is non-negotiable. Pull together the course's security threads:

- **Authorization on every path** — RLS (Module 7) enforces data access in the DB; confirm it's on for *every* table, tested with two accounts. Gate protected pages so logged-out users can't reach them.
- **Input validation** — never trust user input; validate on the server, not just the browser.
- **Secrets** — env vars only, never in the repo (Modules 9–10); server-only keys for privileged operations.
- **Least privilege** — code and agents get only the access they need (Module 11).
- **Dependencies** — keep packages updated; AI can flag known-vulnerable ones.

**AI + security caveat:** AI will happily write insecure code — skip validation, over-expose data, leave RLS off. Security is where you verify *hardest*. Ask AI to review specifically for security issues, then confirm its findings.

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

![error](/screenshots/m12/m12-03-error.png)

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

## Hands-on activity (~60 min, folded in)

**"Harden the invoice tracker."** (1) Add unit tests for core logic and one Playwright E2E test, (2) add loading/empty/error states, (3) run the security checklist and fix gaps, (4) run an a11y + performance audit and fix the top issues, (5) self-review against the full checklist. Deliverable: the hardened app plus the completed checklist evidenced.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Deliver production-ready:** submit your hardened app with tests passing, resilient states, security verified, and a README.

**Objective 2 — Tests/errors/hardening:** show one unit test, one E2E test, one component's error/empty/loading states, and one security fix.

**Objective 3 — A11y & performance:** show an audit (Lighthouse/axe) before and after fixing at least two issues.

**Objective 4 — Review:** review a small app against the production-readiness checklist and list what passes and what needs work.

*Pass mark: 80% and a hardened app with completed checklist submitted.*

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