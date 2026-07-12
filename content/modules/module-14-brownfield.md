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

## Lesson 14.2 — Map the codebase with Claude Code (~60 min)

This delivers Objective 1. **Use Claude Code to quickly map an unfamiliar codebase, then you verify the map against the actual files.**

### Claude Code as your orientation guide

**Step 1 — Start at the repo edges** (manual, quick scan):
- Read README (what does the app do?)
- Check `package.json` (what dependencies? What tech stack?)
- Look at folder structure (how is code organized?)
- Skim one entry point (e.g., `app/page.tsx` or `main.ts`)

**Step 2 — Prompt Claude Code to map the full architecture:**

```bash
cd your-unfamiliar-repo
claude
```

Send:

```
Map this codebase for me. I'm joining as a new engineer.

Please:
1. Summarize the app in 2-3 sentences (what does it do?)
2. List the main layers/modules (data, auth, UI, etc.)
3. Trace one feature end-to-end (e.g., "how does a search query flow through the code?")
4. Identify conventions (naming, folder structure, patterns)
5. Flag any decisions.md or DECISION_LOG.md if they exist

Then show me the file paths for key entry points.
```

**Step 3 — Claude Code will:**
- Read the codebase (via file listing and grep)
- Generate a summary like:

```
This is a Next.js Reading List app.
Main layers:
- UI: app/, components/ (React + TypeScript)
- Data: lib/books.ts (in-memory array, no DB)
- Auth: optional (Supabase setup exists but unused)

Feature trace (search):
1. User types in app/search/page.tsx
2. filter() runs against books array
3. Results display below

Conventions:
- camelCase for functions and variables
- PascalCase for components
- No complex state management (just React hooks)
- Tailwind for styling
```

**Step 4 — Verify Claude Code's map** (you read the files):
- Does the summary match what you see in the code?
- Does the feature trace make sense?
- Are there contradictions? (AI can be wrong)

If Claude Code missed something or was incorrect, ask it to clarify: "I found X in the code, but you said Y — what am I missing?"

**Step 5 — Find decisions.md** (if it exists):
```bash
find . -name "decisions.md" -o -name "DECISION_LOG.md"
```

If found, read it. It explains *why* the code is the way it is — which trade-offs were made and what constraints shaped the system.

---

**[SCREENSHOT PLACEHOLDER: Claude Code Architecture Summary]**

Terminal showing Claude Code mapping the brownfield-practice-repo: "This is a Next.js Reading List app. Main layers: auth (Supabase), data (books.ts), UI (React + Tailwind)..." Proof: Claude Code can quickly orient you in an unfamiliar codebase.

---

## Lesson 14.3-14.4 — Trace & fix with Claude Code assistance (~125 min)

This delivers Objectives 2 & 3. **Use Claude Code to assist with debugging and tracing, but you drive the investigation and verification.**

### Reproducing and tracing the bug

**Step 1 — Establish baseline** (you do this):
```bash
npm install  # Install dependencies
npm test     # Run tests → should all pass
npm run dev  # Start the app locally
```

Verify everything works as expected. This is your baseline.

**Step 2 — Reproduce the bug** (you do this):
From the ticket, trigger the exact bug. For example:
- If BUG-101 is "search crashes on special characters," type a special character in the search box
- Confirm you see the exact error

**Step 3 — Prompt Claude Code to help trace** (Claude Code assists, you verify):

```bash
claude
```

Send:

```
I'm debugging BUG-101: [paste the bug report and error message]

I can reproduce it when [describe exact steps].

Please help me:
1. Search the codebase for the error ("Cannot read properties of undefined")
2. Find the line where the crash happens
3. Explain the data flow leading to that line
4. Propose what's missing or wrong with the data

Then I'll trace it myself to confirm your findings.
```

**Step 4 — Claude Code will:**
- Search for the error message in the code
- Find the problematic line (e.g., `b.author.toLowerCase()`)
- Show you the data model (where does `b.author` come from?)
- Propose the root cause

**Step 5 — Verify with the reading skill** (you do this):
Read the files Claude Code points to. Confirm:
- ✅ The error is where Claude Code said
- ✅ The data model is what Claude Code described
- ✅ You understand the root cause (not just the symptom)

**Step 6 — Fix safely:**
Make the smallest change:
```typescript
// ✅ SAFE: guard the optional field
const filtered = books.filter(b =>
  (b.author?.toLowerCase() ?? "").includes(query)
);
```

**Step 7 — Verify the fix** (you do this):
```bash
npm test     # All tests still pass? ✓
npm run dev  # Reproduce the bug → gone? ✓
```

### Making a scoped change

**The brownfield golden rule:** change the minimum, match the surroundings, prove it works.

**Step 1 — Reproduce and assess** (from above).

**Step 2 — Make the smallest fix** (you control the scope):
- Don't refactor 10 things while fixing one
- Match the repo's existing patterns
- Add a test for your fix

**Step 3 — Claude Code temptation** (watch out):
Claude Code might say: "While I'm here, I'll also modernize this function / refactor that component / reformat 40 files."

**Reject it.** Say: "Let's focus on the ticket scope. The refactor is a separate PR."

**Step 4 — Verify**:
```bash
npm test     # Tests pass, nothing broke
git diff     # Review your changes — is the diff tight and focused?
```

**Step 5 — Open a small PR** (Module 9):
The diff should be tight and easy to review. Reviewers should instantly understand what changed and why.

---

**[SCREENSHOT PLACEHOLDER: Before/After Bug Trace]**

Left: Claude Code's trace of the bug (showing the undefined error line, the data model, root cause). Right: The fixed code with a test. Proof: methodical debugging and scoped fixes.

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