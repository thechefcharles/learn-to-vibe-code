# Module 14: Working in Existing Codebases (Brownfield)

**Stage:** Production (Advanced) · **Level:** Advanced · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 4–13, and especially Module 8 (reading code). Learners can build, secure, deploy, and automate a greenfield app. This module confronts the reality of most real jobs: you don't start from an empty folder — you join someone else's messy, unfamiliar codebase.

> Everything so far has been greenfield (build from scratch). Real work is the opposite: inherit a large repo you didn't write, understand it fast, and change it *without breaking things*. This is the single biggest step from "can build a demo" toward "employable engineer," and it leans hard on the reading-code skill from Module 8.
> 

> **📦 Practice repo:** this module uses a purpose-built, deliberately-messy repo — **`brownfield-practice-repo/`** (a small Next.js + TypeScript "Reading List" with a seeded bug and a feature ticket). See its `README.md` and `TICKET.md`. Because brownfield needs an *unfamiliar* codebase, learners practice here, not on the invoice-tracker.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* are manual (terminal/editor views of a real repo).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Orient** in an unfamiliar codebase and summarize its architecture with AI. *(Analyze)*
2. **Make** a scoped change to an existing repo without introducing regressions. *(Create)*
3. **Assess** the risk and blast radius of a change before making it. *(Evaluate)*

---

## Lesson 14.1 — Greenfield vs. brownfield: the real-job reality (~30 min)

Greenfield lets you choose everything; brownfield means living with others' choices, conventions, and tech debt. The skills flip — less "generate lots of code," more "understand before you touch, and change the minimum." The danger is different too: in a big codebase, a small change can break something far away.

---

## Lesson 14.2 — Orienting in an unknown repo (~60 min)

This delivers Objective 1. A repeatable way to map an unfamiliar codebase, using AI as a guide (Module 8's reading skill at repo scale):

- **Start at the edges:** README, `package.json`/dependencies, folder structure, entry points. What kind of app is this?
- **Ask the agent to map it:** "Summarize this repo's architecture, main modules, and how a request flows through it." Then verify against the actual files (the AI can be wrong).
- **Find the seams:** where's the data layer, routing, auth, tests? Trace one real feature end to end.
- **Note the conventions:** naming, folder patterns, state management — you'll match them, not fight them.

---

**[SCREENSHOT PLACEHOLDER: Repo Architecture Summary]**

Left: File tree of brownfield-practice-repo (app/, lib/, components/, pages/). Right: Claude Code output: "This is a Next.js Reading List app. Main layers: auth (Supabase), data (Postgres), UI (React + Tailwind)..." Proof: AI can map unfamiliar repos.

---

---

## Lesson 14.3 — Reproduce before you fix (debugging someone else's code) (~50 min)

This strengthens Objectives 2 & 3 and applies Module 8's debugging loop to code you didn't write — where it's harder, because you don't know the *intended* behavior. The rule: **never fix what you can't reproduce.**

1. **Establish a baseline** — run the app and the existing tests. Know what "working" looks like before you touch anything.
2. **Reproduce the reported behavior** — trigger the exact bug from the ticket; confirm you see it.
3. **Trace it with the reading skill (Module 8)** — follow the data to the line that breaks; confirm the *root cause*, not the symptom.
4. **Only then change** — and re-run to confirm the reproduction is gone and the baseline still passes.

**Concrete example (practice repo, BUG-101):** the search box crashes with "Cannot read properties of undefined (reading 'toLowerCase')."

**Step 1 — Establish baseline:**
```bash
npm test  # All tests pass ✓
npm run dev  # App loads ✓
```

**Step 2 — Reproduce the bug:**
1. Open the app
2. Type a letter in the search box
3. Crash: "Cannot read properties of undefined (reading 'toLowerCase')"

**Step 3 — Trace with Module 8 reading skill:**
```typescript
// app/search/page.tsx (where the crash happens)
const filtered = books.filter(b => b.author.toLowerCase().includes(query));
// ↑ CRASH HERE: b.author is undefined for some books

// Check the data: lib/books.ts
const books = [
  { id: 1, title: "Book A", author: "Alice" },  // Has author
  { id: 2, title: "Book B" },                    // ❌ Missing author!
  { id: 3, title: "Book C", author: "Charlie" }
];
```

**Step 4 — Identify the root cause:**
- One book has no `author` field
- `.toLowerCase()` on undefined crashes
- The `any` type cast hid the type error (no TypeScript safety)

**Root-cause fix (not: "delete that book" or "remove author search"):**
```typescript
// ✅ SAFE: guard the optional field + type it
const filtered = books.filter(b =>
  (b.author?.toLowerCase() ?? "").includes(query)  // Safe optional chaining
);

// Better: fix the type definition
interface Book {
  id: number;
  title: string;
  author?: string;  // Explicit optional
}
```

**Step 5 — Verify the fix:**
```bash
npm test  # Still pass ✓
# Type the search input again → no crash ✓
# All books (even no-author) appear in results ✓
```



---

## Lesson 14.4 — Making a scoped change safely (~75 min)

This delivers Objective 2. The brownfield golden rule: **change the minimum, match the surroundings, and prove you didn't break anything.**

1. Reproduce current behavior first (Lesson 14.3) and run existing tests.
2. Make the smallest change that achieves the goal; follow the repo's existing patterns (feed them to the AI via context).
3. Keep tests green; add a test for your change.
4. Review the diff narrowly — did anything unrelated change? (AI agents love to "helpfully" refactor; don't let them.)
5. Open a small, focused PR (Module 9) that's easy to review.

> **Instructor note:** Demo an agent that tries to reformat 40 files while making a one-line fix. Teaching learners to *reject* scope creep is half this lesson.
> 

---

## Lesson 14.5 — Assessing risk before you change (~45 min)

This delivers Objective 3. Before editing, ask: what depends on this code? Search for usages; understand the "blast radius." High-risk zones (auth, data models, shared utilities, payment) demand extra care, tests, and review. Low-risk, leaf-level changes are safe to move faster. This is the Module 1 trust dial applied to *someone else's* code, where a wrong assumption costs more.

---

## Lesson 14.6 — Legacy patterns & tech debt (~45 min)

Real repos have old patterns, inconsistencies, and debt. Teach judgment: match the existing style even if you'd do it differently (consistency > preference), resist rewriting everything, and separate "the change I was asked for" from "cleanup I think it needs" (propose the latter separately). AI makes rewrites tempting and cheap — which is why restraint is the skill.

---

## Hands-on activity (~60 min, folded in)

**"Join the codebase."** Using the **`brownfield-practice-repo/`** and its `TICKET.md`, each learner: (1) produces a short architecture summary, (2) reproduces BUG-101 and identifies its root cause and blast radius, (3) fixes the bug and implements FEAT-102 as scoped changes with a test, and (4) opens a focused PR. Deliverable: the PR + a one-paragraph "how I oriented and what I was careful about." (Graded against `ANSWER-KEY.md`.)

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q14-1:** Brownfield development means:
- (a) building in dirt
- (b) **working on an existing codebase with constraints** ✓
- (c) always starting fresh
- (d) removing features

*Why:* Greenfield = build from scratch, choose everything. Brownfield = inherit an existing system with its history, conventions, and tech debt. Most real jobs are brownfield.

**Q14-2:** When reading unfamiliar code, start with:
- (a) deleting it
- (b) **the README or entry point** ✓
- (c) asking for a rewrite
- (d) guessing

*Why:* The README and entry points tell you what the app does and how it's organized — the architecture. With that foundation, the details make sense. Never read a codebase bottom-up; start at the top.

**Q14-3:** Refactoring during brownfield work:
- (a) always necessary
- (b) **only touch what you need to change** ✓
- (c) delete everything first
- (d) optional if it works

*Why:* Restraint is a skill. Match existing patterns, not your preferences. Resist rewrites; scope creep is how you introduce bugs. Change the minimum needed, add a test, prove it works, ship it.

---

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Orient:** Summarize the practice repo's architecture and trace how the search feature flows through it.
- *Example answer:* "Next.js app with React components + TypeScript. Data layer: lib/books.ts. UI: app/search/page.tsx displays books and filters by search query. Auth: optional (Supabase). Flow: user types → filter() runs on books array → display results."

**Objective 2 — Scoped change:** Show a small, focused PR fixing BUG-101 (with a test) and adding FEAT-102, with no unrelated reformatting.
- *Example answer:* "PR shows only the changed lines (optional chaining guard + type fix). Added a test: `it('handles missing author gracefully')`. No reformatting. Diff is tight and reviewable."

**Objective 3 — Assess risk:** For your change, identify what depends on the affected code and rate the risk.
- *Example answer:* "Changing the search filter affects: the search page (direct), book list (if shared), maybe export features. Risk: MEDIUM (search is important but not payment/auth critical). Mitigation: test the change, run full suite, keep the diff small."

### Scenario-based judgment checks:

*For each scenario, explain what's the better approach.*

- **(a) You found tech debt while fixing BUG-101. You refactor it while you're there.** Scope creep.
  - ✅ **Better:** Separate concerns. Fix the bug in one PR (tight, reviewable). Propose cleanup separately with justification.
  - ❌ **Avoid:** Mixing bug fixes and refactors. It's harder to review and easier to introduce regressions.

- **(b) The code uses a pattern you'd never write. You rewrite it to "modern" style.** Preference over consistency.
  - ✅ **Better:** Match the existing pattern. Consistency > personal preference. Write new code in your style; refactor old code only if necessary.
  - ❌ **Avoid:** "Improving" code unnecessarily. This is how you break things.

- **(c) AI offers to fix 10 related issues while making your one-line change.** AI overstepping.
  - ✅ **Better:** Reject the extra changes. Say: "Let's focus on the ticket scope. I'll open separate PRs for the others."
  - ❌ **Avoid:** Accepting helpful rewrites. Scope creep introduces bugs.

- **(d) You're not sure what the code does. You change it anyway.** Guessing.
  - ✅ **Better:** Read it (Module 8). Ask AI to explain it. Trace through with print statements. Understand before you change.
  - ❌ **Avoid:** "It probably doesn't matter." Guessing in brownfield is expensive.

- **(e) Your change works locally but breaks in CI.** Missed a dependency.
  - ✅ **Diagnose:** Check the CI logs. Find what's different (env vars, full test suite, different Node version). Fix it. Re-run locally mimicking CI if possible.
  - ❌ **Avoid:** Shipping "it works on my machine." Always run the full test suite before pushing.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Architecture understood** | Can summarize the repo in 3-4 sentences; traced one feature end-to-end |
| **Bug reproduced** | Can trigger BUG-101 consistently; know the exact error |
| **Root cause identified** | Traced to the line that fails; understand *why* (not just the symptom) |
| **Blast radius assessed** | Listed what depends on the affected code; rated risk (LOW/MEDIUM/HIGH) |
| **Minimal fix applied** | Only changed what's needed; no reformatting or unrelated refactors |
| **Tests still pass** | `npm test` green ✅; no regressions |
| **New test added** | One test covering the bug fix or new feature |
| **Type safety checked** | No `any` casts; types are explicit |
| **PR is focused** | Diff is tight and reviewable; one feature/fix per PR |
| **Conventions matched** | Naming, folder structure, patterns match the repo's style |

*Pass mark: 80% and a focused, tested PR to the practice repo submitted.*

---

## Tools & alternatives (this module)

The skill is tool-agnostic. **Claude Code** shines here (repo-wide reading and search from the terminal), **Cursor** for targeted edits. The durable technique — orient → reproduce → assess blast radius → change the minimum → prove it with tests — transfers to any tool, language, or repo. (Instructors can swap the practice repo for a real open-source one once learners are ready.)

---

## Key takeaways

- Real jobs are brownfield: understand before you touch, and change the minimum.
- Map an unknown repo from the edges in; have AI summarize the architecture, then verify.
- Never fix what you can't reproduce — establish a baseline, reproduce, trace to root cause, then change.
- Assess the blast radius before editing; high-risk zones (auth/data/shared) demand extra care.
- Match existing conventions over preference; resist AI-tempting rewrites and scope creep; ship small, tested, focused PRs.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)