# Module 15: Working in Existing Codebases (Brownfield)

**Stage:** Production (Advanced) · **Level:** Advanced · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 4–13, and especially Module 9 (reading code). Learners can build, secure, deploy, and automate a greenfield app. This module confronts the reality of most real jobs: you don't start from an empty folder — you join someone else's messy, unfamiliar codebase.

> Everything so far has been greenfield (build from scratch). Real work is the opposite: inherit a large repo you didn't write, understand it fast, and change it *without breaking things*. This is the single biggest step from "can build a demo" toward "employable engineer," and it leans hard on the reading-code skill from Module 9.
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

## Lesson 15.1 — Greenfield vs. brownfield: the real-job reality (~30 min)

Greenfield lets you choose everything; brownfield means living with others' choices, conventions, and tech debt. The skills flip — less "generate lots of code," more "understand before you touch, and change the minimum." The danger is different too: in a big codebase, a small change can break something far away.

---

## Lesson 15.2 — Map the codebase with Claude Code (~60 min)

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
This is a Next.js + TypeScript "Reading List" app.
Main layers:
- UI: app/page.tsx (page + search state), components/SearchBar.tsx,
  components/BookCard.tsx (React + Tailwind classes)
- Data: lib/books.ts (Book type + seeded array + searchBooks(); no live DB)
- Auth: lib/supabase.ts is a STUB (getCurrentUser returns a fake user);
  a real deployment would scope the list per-user via Supabase + RLS

Feature trace (search):
1. User types in components/SearchBar.tsx (controlled input)
2. app/page.tsx holds the query in useState and calls
   searchBooks(books, query) from lib/books.ts
3. searchBooks filters the array; page.tsx renders a BookCard per result

Conventions:
- camelCase for functions and variables (searchBooks, getCurrentUser)
- PascalCase for components (SearchBar, BookCard)
- No complex state management (just React hooks)
- className strings for styling (no CSS-in-JS)
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

[SCREENSHOT: Terminal showing Claude Code mapping the brownfield-practice-repo — a Next.js + TypeScript Reading List with an auth stub in lib/supabase.ts, seed data plus searchBooks() in lib/books.ts, and a React/Tailwind UI in app/page.tsx and components/.]

---

## Lesson 15.3-15.4 — Trace & fix with Claude Code assistance (~125 min)

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
BUG-101 is "search crashes on special characters." Per `TICKET.md`, type an opening parenthesis `(` (or `[`, `*`, `+`) into the search box. The list disappears and the page throws. Open the browser console and confirm the exact error:

```
Uncaught SyntaxError: Invalid regular expression: /(/: Unterminated group
```

You now have a reliable repro. Never trust a fix for a bug you can't trigger on demand.

**Step 3 — Prompt Claude Code to help trace** (Claude Code assists, you verify):

```bash
claude
```

Send:

```
I'm debugging BUG-101: search crashes on special characters.

I can reproduce it by typing "(" into the search box — the console shows
"SyntaxError: Invalid regular expression: /(/: Unterminated group".

Please help me:
1. Find where the search query is turned into something that could throw
2. Show me the exact line and the file it's in
3. Explain the data flow from the search box to that line
4. Explain why "(" specifically triggers it

Then I'll trace it myself to confirm your findings.
```

**Step 4 — Claude Code will:**
- Search the codebase and find `searchBooks()` in `lib/books.ts`
- Point at the offending line: `const pattern = new RegExp(query, "i");`
- Explain the flow: `SearchBar` → `query` state in `app/page.tsx` → `searchBooks(books, query)`
- Explain the root cause: the raw user query is compiled as a **regex**, and `(` is an unbalanced regex metacharacter, so the `RegExp` constructor throws

**Step 5 — Verify with the reading skill** (you do this):
Open `lib/books.ts` yourself and confirm:
- ✅ The crash is on `new RegExp(query, "i")`, exactly where Claude Code said
- ✅ The data flow matches (`page.tsx` is the only caller of `searchBooks`)
- ✅ You understand the *root cause* (raw input compiled as a regex), not just the symptom ("special characters break it")

**Step 6 — Fix safely:**
The feature only needs a case-insensitive substring match — it never needed regex power. So the smallest correct fix is to drop the regex entirely:

```typescript
// lib/books.ts
export function searchBooks(list: Book[], query: string): Book[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
  );
}
```

(Escaping the query before `new RegExp` also works, but it's more code for no benefit. Choosing the simpler fix that matches the actual intent is the point.)

**Step 7 — Verify the fix** (you do this):
```bash
npm test     # All tests still pass? ✓
npm run dev  # Type "(" again → no crash, just an empty result? ✓
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

**Step 5 — Open a small PR** (Module 10):
The diff should be tight and easy to review. Reviewers should instantly understand what changed and why.

[SCREENSHOT: Side-by-side of Claude Code's trace of BUG-101 in lib/books.ts — the new RegExp(query) line, the searchBooks data flow, and the root cause — next to the fixed substring-match code plus its new test.]

---

## Lesson 15.5 — Assessing risk before you change (~45 min)

This delivers Objective 3. Before you edit a line, ask one question: **what else depends on this code?** The set of things a change could break is its **blast radius**. You cannot judge a fix's safety until you've traced its blast radius, and the good news is that tracing it is mechanical — you don't guess, you search.

### Trace every caller before you touch a function

Before changing `searchBooks`, find every place that calls it. Two reliable ways:

**Option A — grep the repo** (works in any editor or terminal):

```bash
cd brownfield-practice-repo
grep -rn "searchBooks" --include="*.ts" --include="*.tsx" .
```

Reading the results:

```
lib/books.ts:34:export function searchBooks(list: Book[], query: string): Book[] {
lib/books.test.ts:2:import { books, searchBooks } from "./books";
app/page.tsx:4:import { books, searchBooks } from "@/lib/books";
app/page.tsx:13:  const results = searchBooks(books, query);
```

How to read that: line 34 is the **definition** (ignore it as a caller). The `import` lines just pull the symbol in — they tell you *which files* use it but not *how*. The one line that actually **invokes** it is `app/page.tsx:13`. So `searchBooks` has exactly **one production caller** (`page.tsx`) plus its test file. Nothing in `components/`, nothing in the auth stub, no database. The blast radius is tiny and fully contained — a correct change to `searchBooks` cannot ripple past the search feature.

**Option B — "Find All References"** in your editor (right-click the function name in Cursor/VS Code). It resolves the symbol through TypeScript rather than matching text, so it won't get confused by a comment that happens to say "searchBooks." Use it to confirm the grep result: same single caller in `page.tsx`.

### Turn the trace into a risk rating

| What you found | Risk | Why |
|----------------|------|-----|
| One caller, leaf-level, no auth/data/shared code | **LOW–MEDIUM** | A localized function; regressions can only appear in search |
| A shared utility called from 20 files | **HIGH** | One change reverberates everywhere; needs broad tests + review |
| Auth, the `Book` data model, or a payment path | **HIGH** | A wrong assumption is expensive (locked-out users, corrupted data) |

`searchBooks` lands at LOW–MEDIUM: important to users, but structurally isolated. Contrast it with the `Book` interface in `lib/books.ts` — if you changed *that* (say, made `author` optional), the blast radius would include `searchBooks`, `BookCard.tsx` (which renders `book.author`), and every seed row. Same file, very different risk. **The risk lives in the dependencies, not the line count.** This is the Module 2 trust dial applied to *someone else's* code, where a wrong assumption costs more — so you spend the two minutes to grep before you spend an hour debugging a regression.

---

## Lesson 15.6 — Legacy patterns & tech debt (~45 min)

Real repos carry old patterns, inconsistencies, and debt. The instinct — especially with an AI that can rewrite a file in seconds — is to "clean it up while you're here." Resist it. The skill this lesson builds is **restraint**: match the existing style even when you'd do it differently (consistency beats personal preference), and keep "the change I was asked for" strictly separate from "cleanup I think it needs" (propose the latter as its own PR).

### Worked example: match the convention, don't rewrite it

FEAT-102 asks for a genre filter. Look at how the existing code is shaped before you write anything. `searchBooks` in `lib/books.ts` is a **plain, pure function** — takes a list and a value, returns a filtered list, no classes, no hooks, no clever abstractions. That's the local convention, and it's what you match.

**❌ Over-engineered rewrite (fights the codebase):**

```typescript
// Introduces a filtering "engine" nobody asked for, folds genre INTO
// searchBooks, changes its signature, and breaks its one caller + tests.
class BookQuery {
  constructor(private books: Book[]) {}
  search(q: string) { /* ...regex, options bag... */ return this; }
  byGenre(g: string) { /* ... */ return this; }
  results() { /* ... */ }
}
```

Even if that class is "nicer" in the abstract, it's *inconsistent* with a repo built from small pure functions, it expands the blast radius (every caller and test of `searchBooks` must change), and it buries a one-line feature in a framework.

**✅ Additive change that matches the surroundings:**

```typescript
// lib/books.ts — a new pure helper that mirrors searchBooks' shape.
export type GenreFilter = Book["genre"] | "all";

export function filterByGenre(list: Book[], genre: GenreFilter): Book[] {
  if (genre === "all") return list;
  return list.filter((book) => book.genre === genre);
}
```

```tsx
// app/page.tsx — compose the two, leave searchBooks untouched.
const results = filterByGenre(searchBooks(books, query), genre);
```

Same style (pure function, same naming, same file), zero change to `searchBooks`, and the two concerns stay separate. The diff is small and obvious to a reviewer.

### When you *do* spot real tech debt

You will notice genuine debt along the way — say, the seed array duplicates data that "should" come from `lib/supabase.ts`. That may be worth fixing, but **not in this PR**. Note it, and either open a follow-up ticket or say so in the PR description: *"Out of scope here: the seed data could move behind the Supabase seam — happy to do that as a separate PR."* That keeps this change reviewable and lets someone decide on the cleanup on its own merits. Mixing a refactor into a bug fix is how a two-line change becomes an unreviewable, regression-prone diff.

---

## Hands-on activity (~60 min, folded in)

**"Join the codebase."** Using the **`brownfield-practice-repo/`** and its `TICKET.md`, each learner: (1) produces a short architecture summary, (2) reproduces BUG-101 and identifies its root cause and blast radius, (3) fixes the bug and implements FEAT-102 as scoped changes with a test, and (4) opens a focused PR. Deliverable: the PR + a one-paragraph "how I oriented and what I was careful about." (Graded against `ANSWER-KEY.md`.)

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q15-1:** Brownfield development means:
- (a) building in dirt
- (b) **working on an existing codebase with constraints** ✓
- (c) always starting fresh
- (d) removing features

*Why:* Greenfield = build from scratch, choose everything. Brownfield = inherit an existing system with its history, conventions, and tech debt. Most real jobs are brownfield.

**Q15-2:** When reading unfamiliar code, start with:
- (a) deleting it
- (b) **the README or entry point** ✓
- (c) asking for a rewrite
- (d) guessing

*Why:* The README and entry points tell you what the app does and how it's organized — the architecture. With that foundation, the details make sense. Never read a codebase bottom-up; start at the top.

**Q15-3:** Refactoring during brownfield work:
- (a) always necessary
- (b) **only touch what you need to change** ✓
- (c) delete everything first
- (d) optional if it works

*Why:* Restraint is a skill. Match existing patterns, not your preferences. Resist rewrites; scope creep is how you introduce bugs. Change the minimum needed, add a test, prove it works, ship it.

---

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Orient:** Summarize the practice repo's architecture and trace how the search feature flows through it.
- *Example answer:* "Next.js + TypeScript app. Data layer: lib/books.ts (Book type, seed array, searchBooks()). UI: app/page.tsx holds search state and renders components/SearchBar.tsx + components/BookCard.tsx. Auth: lib/supabase.ts is a stub. Flow: user types in SearchBar → page.tsx stores the query and calls searchBooks(books, query) → a BookCard renders per result."

**Objective 2 — Scoped change:** Show a small, focused PR fixing BUG-101 (with a test) and adding FEAT-102, with no unrelated reformatting.
- *Example answer:* "PR shows only the changed lines: searchBooks now does a substring match instead of `new RegExp(query)`, plus a new `filterByGenre` helper composed in page.tsx. Added tests: `it('does not throw on regex metacharacters')` and one for `filterByGenre`. No reformatting. Diff is tight and reviewable."

**Objective 3 — Assess risk:** For your change, identify what depends on the affected code and rate the risk.
- *Example answer:* "`grep -rn searchBooks` shows one production caller (app/page.tsx:13) plus its test — no auth, data model, or shared util touches it. Blast radius is contained to the search feature. Risk: LOW–MEDIUM (important to users, but structurally isolated). Mitigation: add a test, run the full suite, keep the diff small."

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
  - ✅ **Better:** Read it (Module 9). Ask AI to explain it. Trace the runtime with `console.log` (or a `debugger` breakpoint in the browser devtools). Understand before you change.
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