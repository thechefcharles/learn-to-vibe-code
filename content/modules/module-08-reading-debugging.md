# Module 8: Reading & Debugging AI-Generated Code

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 4–7. Learners have a real app (Next.js + Supabase, auth + RLS) and will now learn to read it and fix it when it breaks — which, with AI-generated code, it regularly will.

> Reading and debugging are the skills that separate people who *use* AI from people who can *ship* with it. AI generates code faster than you can read it and that code breaks; beginners freeze. This module builds the habit of understanding code you didn't write and a repeatable way to fix it. It uses bugs from the app the learner already built — including the RLS "empty list" trap from Module 7.
> 

> **📸 Screenshots:** the Next.js error overlay is auto-capturable (trigger a throwing route); the debugging-chat shot is manual.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Read and explain** unfamiliar AI-generated code to confirm you understand what you're shipping. *(Understand/Analyze)*
2. **Diagnose** the root cause of a bug in code the learner did not write. *(Analyze)*
3. **Use** AI tools to reproduce, isolate, and fix errors. *(Apply)*
4. **Assess** whether an AI-proposed fix is correct and safe before applying it. *(Evaluate)*

---

## Lesson 8.1 — Reading code you didn't write (~45 min)

This delivers Objective 1 — the skill the whole course's "don't ship what you can't explain" rule depends on. AI generates code faster than you can comfortably read it; the discipline is reading it *efficiently*. You can't debug — or defend at the capstone — code you can't read.

**A repeatable way to read unfamiliar (AI-generated) code:**

1. **Get the one-sentence purpose first.** What does this file/function do overall? Read the *names* before the logic.
2. **Follow the data.** Where does input come from, how is it transformed, what's returned? Trace one realistic path, not every branch.
3. **Have the AI explain it — then verify.** Ask "explain this line by line, and why." Useful, but the AI can be wrong about its own output; check against the code.
4. **Read the risky parts closely.** Anything touching auth, data, money, or external calls gets line-level attention (the Module 1 trust dial).
5. **Confirm intent.** Does it do what you asked, or something plausible-but-different?

**Habits:** rename unclear variables as you read; drop a one-line comment capturing the *why*; and if you still can't explain a block, **don't ship it** — simplify or ask for a version you understand. This is exactly what the capstone oral defense tests.

---

## Lesson 8.2 — The debugging mindset (~30 min)

Reframe bugs: they're the normal state of building software. Expert code breaks; AI code breaks *more*, because the model produces likely-looking code that may not fit your situation (Module 1). The goal isn't to avoid bugs — it's a calm, repeatable way to find and fix them.

**The debugging loop (the spine of the rest of this module):** Read → Reproduce → Isolate → Fix → Verify.

---

## Lesson 8.3 — Read the error first (~45 min)

This begins Objective 2. Beginners paste code at the AI and say "fix it." The better first move is to *read the error* — it usually names the problem and points near the line. Three places errors show up in our stack:

- **Terminal** — where `npm run dev` runs; server-side errors and build failures.
- **Browser console** — (Inspect → Console) client-side JS errors.
- **Network tab** — failed requests (e.g. a Supabase call) with status codes.

A stack trace reads top-down: the top line is usually *what* went wrong, and the file:line tells you *where*. Extract those two facts first.

---

**[SCREENSHOT PLACEHOLDER: Next.js Error Overlay]**

Browser error overlay: red error message, file name and line number highlighted, stack trace below. Shows exactly where and what went wrong.

---

---

## Lesson 8.4 — Reproduce and isolate (~45 min)

Continues Objective 2. A bug you can't reproduce, you can't fix. Pin the exact trigger: *what did you click, with what input, and what happened vs. expected?* Then **isolate**: every user or one? On load or on submit? Logged in or out? A quick tool: add a `console.log` (or ask AI to) to check what a value actually is.

> **Worked example — the RLS "empty list" bug (from Module 7):** the clients page shows nothing, but there are rows in the Table Editor. No error. Reproduce: empty when logged out (or RLS is on and the query runs without a session). Isolate: log the query result — an empty array, not an error. Root cause: RLS is default-deny and the request carried no authenticated user. A bug with *no error message but a clear root cause* — it rewards understanding over pasting code at the AI.
> 

---

## Lesson 8.5 — Debugging with AI: give it what it needs (~60 min)

This delivers Objective 3. AI is excellent at debugging — *if* you give it context (Module 1). The anatomy of a good debugging prompt:

1. **The error message** — paste the actual text/stack trace.
2. **The relevant code** — the file/function (in Cursor `@`-mention it; Claude Code reads the repo).
3. **Expected vs. actual.**
4. **What you've already tried.**

**Weak:** "my page is broken, help." **Strong:** "My `/clients` page renders an empty table. Expected: my saved clients. The query is `supabase.from('clients').select()`. No error. RLS is enabled. Here's the component: [@app/clients/page.tsx]. What could cause zero rows?" The strong prompt often gets the exact root cause in one shot.

**Multimodal tip (Module 2):** you can also *paste a screenshot* of the broken screen or the error overlay — the AI reads the visual directly, which is often faster than describing what's wrong.

---

**[SCREENSHOT PLACEHOLDER: Debugging Chat]**

Claude Code or Cursor chat: user pastes error message and mentions @app/clients/page.tsx, asks "why are clients empty?" → AI response identifies root cause ("RLS is on but no authenticated session").

---

---

## Lesson 8.6 — Common bug classes in our stack (~45 min)

A field guide so learners recognize patterns:

- **Server vs. client component errors (Next.js)** — a browser-only feature/event handler in a server component. Fix: add `"use client"` or move the logic.
- **Silent empty data (Supabase RLS)** — no error, no rows: RLS on and unauthenticated, or a missing policy (Lesson 8.4).
- **Env var problems** — `undefined` keys because `.env.local` is missing a value or the dev server wasn't restarted.
- **Type errors (TypeScript)** — the code assumes a shape the data doesn't have; the squiggle names the mismatch.
- **Hallucinated APIs (Module 1)** — a function/option that doesn't exist. Fix: check the real docs.
- **Framework version deprecations** — e.g. Next.js 16 renamed the `middleware` file convention to **`proxy`**; read the warning and check the changelog rather than fighting the AI's older pattern.

Recognizing the *class* of bug is most of diagnosing it.

---

## Lesson 8.7 — Assess the fix before applying it (~45 min)

This delivers Objective 4 — the safety net. An AI fix can be wrong, incomplete, or *make the symptom disappear while hiding the real problem*. Before accepting, ask:

- **Root cause or symptom?** (Disabling RLS "fixes" the empty list — by removing your security. Wrong fix.)
- **Do I understand why it works?** If not, ask for an explanation first.
- **What could it break?**
- **Does it match our stack and conventions?** ([CLAUDE.md](http://CLAUDE.md) / .cursorrules help.)

Then **verify**: reproduce the original trigger and confirm it's gone; check the happy path still works.

> **Instructor note:** Show an AI fix that removes RLS to "solve" the empty list. Ask why it's terrible. Teaches root-cause vs. symptom better than any lecture.
> 

---

## Hands-on activity (~60 min, folded in)

**"Bug hunt."** The instructor ships three planted bugs in a copy of the invoice-tracker: (1) a server/client component error, (2) the RLS empty-list bug, (3) a hallucinated API call. For each, learners read the error (or notice its absence), reproduce and isolate, use AI to propose a fix, and write one sentence assessing root-cause before applying. Deliverable: all three fixed, root cause named for each.

---

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q8-1:** The best first move when something breaks:
- (a) paste code at the AI and say 'fix it'
- (b) **read the actual error message** ✓
- (c) rewrite everything
- (d) restart the computer

*Why:* Error messages tell you exactly what failed and where. They're your best diagnostic tool. A stack trace reads top-down: top line = what went wrong, file:line = where. Always start there.

**Q8-2:** If you can't explain a block of AI-generated code after reading it, you should:
- (a) ship it anyway
- (b) **not ship it — simplify or get a version you understand** ✓
- (c) delete the whole file
- (d) hide it

*Why:* This is the capstone defense principle (Module 1). You own and maintain the code. Never ship what you don't understand. If you can't explain it, it's not ready.

**Q8-3:** An AI "fix" that disables RLS to solve an empty list is:
- (a) a good fix
- (b) **a dangerous fix that removes security (symptom, not root cause)** ✓
- (c) the only option
- (d) fine

*Why:* Disabling RLS treats the *symptom* (empty rows) but removes *security*. The real cause is usually unauthenticated request or missing policy. Distinguish root-cause from symptom every time.

**Q8-4:** Before applying an AI-proposed fix, you should:
- (a) just apply it — the AI knows what it's doing
- (b) **read the code, understand what it changes, ask the AI to explain any unclear lines, confirm against the bug** ✓
- (c) skip it if it's too long to read
- (d) apply it to production first to test

*Why:* You own what ships (Module 1). Loop: read → understand → verify it solves the actual bug → then apply. Never blind-accept AI code.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Read & explain (Quiz Q8-1):**
- Q8-1: Tests understanding of reading code you don't own
- *Practical:* Given an AI function, explain in 3 sentences + flag one risky line (auth, data, external call)

**Objective 2 — Diagnose (Quiz Q8-2):**
- Q8-2: "An AI 'fix' that disables RLS..." ✅ Tests root-cause vs. symptom understanding
- *Practical:* Given an error + code snippet, state root cause + file:line

**Objective 3 — Use AI to debug (Quiz Q8-3):**
- Q8-3: "Before applying an AI-proposed fix..." ✅ Tests verification discipline
- *Practical:* Write a strong debugging prompt with all 4 parts: error message, code (@-mention), expected vs. actual, what you tried
  - **SAMPLE:** "My /clients page shows empty table. Expected: my saved clients. Query: `supabase.from('clients').select()`. No error. RLS is on. Code: @app/clients/page.tsx. I tried refreshing and logging in/out — same empty result. What's the root cause?"

**Objective 4 — Assess fix safety (Q8-4):**
- Q8-4: Tests evaluating fix correctness
- *Practical:* Given a bug + two fixes (one correct, one hides symptom), pick the right one + explain why the other is dangerous
  - **SAMPLE:** "Bug: empty client list. Fix A: add RLS policy so authenticated users see their clients. Fix B: set RLS to off. Answer: Fix A (correct). Fix B is dangerous because it removes security and exposes all users' data."

*Pass mark: 80% and bug hunt completed.*

---

## Tools & alternatives (this module)

Reading and debugging are tool-agnostic — the loops (read; reproduce → isolate → fix → verify) work anywhere. Defaults: **Cursor** for local reading/bugs (`@`-context, select-and-Cmd+K), **Claude Code** for repo-wide investigation. Browser DevTools and the terminal are your non-AI instruments and remain essential.

---

## Key takeaways

- Read and understand AI-generated code before you ship or debug it — the capstone defense tests exactly this.
- Bugs are normal; AI code breaks more. Loop: read → reproduce → isolate → fix → verify.
- Read the error first (terminal, console, network); a stack trace names the what and where.
- Give AI real context to debug: actual error, relevant code, expected vs. actual, what you tried.
- Assess every fix for root-cause vs. symptom before applying; then verify.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)