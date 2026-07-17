# Module 9: Reading & Debugging AI-Generated Code

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 4–7. Learners have a real app (Next.js + Supabase, auth + RLS) and will now learn to read it and fix it when it breaks — which, with AI-generated code, it regularly will.

> Reading and debugging are the skills that separate people who *use* AI from people who can *ship* with it. AI generates code faster than you can read it and that code breaks; beginners freeze. This module builds the habit of understanding code you didn't write and a repeatable way to fix it. It uses bugs from the app the learner already built — including the RLS "empty list" trap from Module 8.
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

## Debugging: You First, AI Second

The course teaches "you are the engineer; AI is the tool." This module emphasizes it: **you debug first, using your own skills. AI helps verify, not replace.**

Why? Because:
1. You learn debugging skills that outlast any AI tool
2. You'll hit bugs that AI can't solve
3. Understanding the root cause (not just the fix) makes you better at preventing future bugs
4. In team settings, you need to communicate the bug to others

The pattern: **Read → Isolate → Reproduce → Debug → Verify (optionally with AI) → Fix → Test**

Each step uses your own judgment. AI is your verification partner, not your debugging proxy.

---

## Lesson 8.1 — Reading code you didn't write (~45 min)

This delivers Objective 1 — the skill the whole course's "don't ship what you can't explain" rule depends on. AI generates code faster than you can comfortably read it; the discipline is reading it *efficiently*. You can't debug — or defend at the capstone — code you can't read.

**A repeatable way to read unfamiliar (AI-generated) code:**

1. **Get the one-sentence purpose first.** What does this file/function do overall? Read the *names* before the logic.
2. **Follow the data.** Where does input come from, how is it transformed, what's returned? Trace one realistic path, not every branch.
3. **Have the AI explain it — then verify.** Ask "explain this line by line, and why." Useful, but the AI can be wrong about its own output; check against the code.
4. **Read the risky parts closely.** Anything touching auth, data, money, or external calls gets line-level attention (the Module 2 trust dial).
5. **Confirm intent.** Does it do what you asked, or something plausible-but-different?

**Concrete example — reading unfamiliar code:**

```tsx
// AI generated this. Can you explain it line by line?
export async function updateInvoiceStatus(invoiceId: string, status: string) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  
  if (!user) return { error: "Unauthorized" };
  
  const { data, error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", invoiceId)
    .eq("user_id", user.data.user?.id)
    .select();
  
  return { data, error };
}
```

**Reading it systematically:**

1. **Purpose (line 1):** Updates an invoice's status. Takes `invoiceId` and `status`.
2. **Data flow:** Gets the current user → checks if authenticated → updates the invoice → returns result.
3. **Risky parts (lines 6-7):** Auth check is good. BUT line 11: does `.eq("user_id", user.data.user?.id)` work? Check: yes, filters to the current user's invoice only (security ✓).
4. **Trace one path:** Invoice 123 owned by Alice → Alice calls with `status: "paid"` → row found and updated → returns updated row.
5. **Intent match:** Does it do what you asked ("let users update their own invoice status")? Yes. ✅

**Habits:** rename unclear variables as you read; drop a one-line comment capturing the *why*; and if you still can't explain a block, **don't ship it** — simplify or ask for a version you understand. This is exactly what the capstone oral defense tests.

---

## Lesson 8.2 — The debugging mindset (~30 min)

Reframe bugs: they're the normal state of building software. Expert code breaks; AI code breaks *more*, because the model produces likely-looking code that may not fit your situation (Module 2). The goal isn't to avoid bugs — it's a calm, repeatable way to find and fix them.

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

> **Worked example — the RLS "empty list" bug (from Module 8):** the clients page shows nothing, but there are rows in the Table Editor. No error. Reproduce: empty when logged out (or RLS is on and the query runs without a session). Isolate: log the query result — an empty array, not an error. Root cause: RLS is default-deny and the request carried no authenticated user. A bug with *no error message but a clear root cause* — it rewards understanding over pasting code at the AI.
> 

---

## Lesson 8.5 — Debugging with AI: give it what it needs (~60 min)

This delivers Objective 3. AI is excellent at debugging — *if* you give it context (Module 2). The anatomy of a good debugging prompt:

1. **The error message** — paste the actual text/stack trace.
2. **The relevant code** — the file/function (in Cursor `@`-mention it; Claude Code reads the repo).
3. **Expected vs. actual.**
4. **What you've already tried.**

**Weak:** "my page is broken, help." **Strong:** "My `/clients` page renders an empty table. Expected: my saved clients. The query is `supabase.from('clients').select()`. No error. RLS is enabled. Here's the component: [@app/clients/page.tsx]. What could cause zero rows?" The strong prompt often gets the exact root cause in one shot.

**Multimodal tip (Module 3):** you can also *paste a screenshot* of the broken screen or the error overlay — the AI reads the visual directly, which is often faster than describing what's wrong.

---

**[SCREENSHOT PLACEHOLDER: Debugging Chat]**

Claude Code or Cursor chat: user pastes error message and mentions @app/clients/page.tsx, asks "why are clients empty?" → AI response identifies root cause ("RLS is on but no authenticated session").

---

---

## Lesson 8.6 — Common bug classes in our stack (~45 min)

A field guide so learners recognize patterns and diagnose quickly:

**1. Server vs. client component errors (Next.js)**
- **Symptom:** Error like "localStorage is not defined" or "click handler not firing"
- **Root cause:** Tried to use browser-only features (event handlers, localStorage, window) in a server component
- **Fix:** Add `"use client"` at the top of the file, OR move the logic to a child component marked `"use client"`
- **Example:**
  ```tsx
  // ❌ WRONG — server component, can't use onClick
  export default function Page() {
    return <button onClick={() => alert("clicked")}>Click me</button>;
  }
  
  // ✅ CORRECT — client component
  "use client";
  export default function Page() {
    return <button onClick={() => alert("clicked")}>Click me</button>;
  }
  ```

**2. Silent empty data (Supabase RLS)**
- **Symptom:** Query returns zero rows, no error message, but rows exist in the Table Editor
- **Root cause:** RLS is enabled, but the user is unauthenticated or the policy is missing
- **Fix:** Check RLS policies in Supabase; add `using (auth.uid() = user_id)` to your policy
- **Example:** You query `supabase.from("clients").select()` but get `[]`. Check: is RLS on? Do you have a policy? Are you logged in?

**3. Env var problems**
- **Symptom:** `undefined` values or "Cannot read properties of undefined"
- **Root cause:** `.env.local` is missing a value, or you didn't restart the dev server after adding it
- **Fix:** Check `.env.local`, ensure the key is spelled exactly right, and run `npm run dev` again
- **Example:** Used `process.env.NEXT_PUBLIC_SUPABASE_URL` but it's undefined → check `.env.local` has it → restart dev server

**4. Type errors (TypeScript)**
- **Symptom:** Red squiggly lines or "Property 'X' does not exist on type 'Y'"
- **Root cause:** The code assumes the data has a shape it doesn't actually have (e.g., assumes `client.name` exists, but it might be `client.clientName`)
- **Fix:** Read the error, check the actual data shape, fix the property name
- **Example:** `client.name` but the API returns `client.firstName` → error immediately catches it

**5. Hallucinated APIs (Module 2)**
- **Symptom:** "supabase.auth.getUserAsync is not a function" or similar
- **Root cause:** The AI made up a function that doesn't exist in the SDK
- **Fix:** Check the real docs; the correct function is usually similar but slightly different (e.g., `getUser()` not `getUserAsync()`)

**6. Framework version deprecations**
- **Symptom:** Warning like "middleware.ts is deprecated; use proxy.ts instead"
- **Root cause:** The AI generated code for an older Next.js version
- **Fix:** Read the warning, check the changelog for the current version, rename/move the file

**Recognizing the *class* of bug is most of diagnosing it.** If you see "undefined," think "env var or missing property." If you see no error but no data, think "RLS." If you see a function doesn't exist, think "hallucination — check the docs."

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

**"Bug hunt."** You'll debug three real bugs that commonly appear when AI generates code. The goal: read the error (or lack thereof), pinpoint the root cause, and fix it safely.

### Three planted bugs:

#### Bug 1: Server/Client Component Error
**What you'll see:** Error in the browser: "addEventListener is not a function" or click handler doesn't fire

**Step 1 — Read the error (2 min)**
- Open your browser console (F12 → Console tab)
- Find the error message and the file:line it points to

**Step 2 — Reproduce (2 min)**
- Try the action that caused the error (click a button, submit a form)
- Confirm it happens every time

**Step 3 — Isolate (3 min)**
- Look at the file from the error
- Check if it has `"use client"` at the top
- If not, that's likely the issue

**Step 4 — Fix (2 min)**
- Add `"use client";` at the very top of the file
- Save and check the browser—error gone

**Step 5 — Root cause (1 min)**
- Write: "The component tried to use a click handler (browser-only feature) in a server component. Added `"use client"` to make it a client component."

---

#### Bug 2: Silent Empty Data (RLS)
**What you'll see:** The `/clients` page shows an empty table, but you added clients. No error in console.

**Step 1 — Read the error (1 min)**
- No error message. That's the clue.
- Empty data + no error = likely RLS

**Step 2 — Reproduce (2 min)**
- Go to `/clients`
- Confirm it's empty
- Open Supabase Table Editor and confirm rows exist

**Step 3 — Isolate (3 min)**
- Check: are you logged in? (If you're logged out, RLS blocks everything)
- Check Supabase dashboard: is RLS enabled on the `clients` table? (Look under **SQL Editor** → run `SELECT * FROM clients;` — do you get rows?)

**Step 4 — Check the policy (3 min)**
- Go to Supabase **Table Editor** → click `clients` table → scroll right to **Policies**
- Do you see a policy? Is it correct? (Should say `auth.uid() = user_id`)
- If missing, add it:
  ```sql
  create policy "users manage own clients"
    on clients for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
  ```

**Step 5 — Fix (2 min)**
- Refresh the page
- Clients now appear

**Step 6 — Root cause (1 min)**
- Write: "RLS was enabled but the policy was missing. Without a policy, RLS default-denies all reads. Added the policy so authenticated users can see their own clients."

---

#### Bug 3: Hallucinated API Call
**What you'll see:** Error like "supabase.auth.getCurrentUserAsync is not a function"

**Step 1 — Read the error (2 min)**
- Error says the function doesn't exist
- Note the function name

**Step 2 — Find the bug (2 min)**
- Search your code for the function name (Ctrl+Shift+F)
- Find the file that calls it

**Step 3 — Check the docs (3 min)**
- Open Supabase docs for `supabase-js`
- Search for the function the AI called
- It doesn't exist
- Look for similar names — usually the correct one is close (e.g., `getUser()` instead of `getCurrentUserAsync()`)

**Step 4 — Fix (2 min)**
- Replace the hallucinated function with the real one
- Test — no more error

**Step 5 — Root cause (1 min)**
- Write: "The AI generated a function name that doesn't exist in the Supabase SDK. Replaced it with the correct function from the official docs."

---

### Deliverable:
- Screenshot or description of each bug
- For each: one sentence naming the root cause
- Example:
  1. "Bug 1: Server component using click handler. Fix: added `"use client"`."
  2. "Bug 2: RLS policy missing. Fix: added policy with `auth.uid() = user_id`."
  3. "Bug 3: AI hallucinated function name. Fix: replaced with real SDK function from docs."

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

*Why:* This is the capstone defense principle (Module 2). You own and maintain the code. Never ship what you don't understand. If you can't explain it, it's not ready.

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

*Why:* You own what ships (Module 2). Loop: read → understand → verify it solves the actual bug → then apply. Never blind-accept AI code.

---

## Knowledge check (mapped to objectives)

### Learner-First Approach: Core Principle

**Q8-1 (Learner-first philosophy):** "You see an error: 'Cannot read property "email" of undefined.' What's your first step?"

a) Copy the error and paste it to Claude
b) Read the stack trace and find the line where "email" is being accessed
c) Restart the app and hope it goes away
d) Add random null checks until it stops failing

**Correct:** b) — Read the stack trace. Find the exact line. Understand what's undefined. *Then* decide if you need help.

---

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

---

**Scenario-based judgment checks:**

*For each scenario, explain what's wrong and how you'd diagnose it.*

- **(a) "Cannot read properties of undefined":** Your page crashes with this error. What are three possible root causes?
  - ✅ **Correct answers:** (1) Missing env var (`process.env.X` is undefined), (2) Data shape mismatch (assumed `user.id` but it's `user?.id`), (3) Forgot to await an async call (value is promise, not data)
  - ❌ **Avoid:** Guessing. Read the stack trace — it points to the exact line that failed.

- **(b) Blank table, no error:** Your `/invoices` page renders an empty table, no console errors, but invoices exist in Supabase.
  - ✅ **Diagnosis:** Check RLS. Is the policy on? Are you logged in? Log the query result in the browser console to confirm it returns `[]`.
  - ❌ **Avoid:** Assuming the code is wrong. Check infrastructure (auth, RLS) first.

- **(c) AI gave you a function that doesn't exist:** You got "is not a function" error. How do you find the real function?
  - ✅ **Correct:** Search the official SDK docs for similar names. The real function is usually 90% the same name but slightly different.
  - ❌ **Avoid:** Asking the AI to fix it blindly. It might halluci again. Read the real docs yourself.

- **(d) You understand the fix, but it feels wrong:** AI proposes removing a security rule to "fix" an empty list bug.
  - ✅ **Correct:** Reject it. It treats the symptom, not the root cause. The real cause is a missing RLS policy, not "too much security."
  - ❌ **Avoid:** Accepting the shortcut. Security is not the problem; misunderstanding the data model is.

- **(e) You fixed the bug, but now something else broke:** After applying the fix, a different page now shows an error.
  - ✅ **Correct:** Revert, investigate. The fix might have broken something else (e.g., a shared function). Re-apply with more surgical precision.
  - ❌ **Avoid:** Applying the fix and shipping without testing the full app.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Bug 1 diagnosis** | Identified as server/client component error; fixed by adding `"use client"` |
| **Bug 1 explanation** | Root cause: browser-only feature in server component |
| **Bug 2 diagnosis** | Identified as RLS (no error, but no data); checked policies |
| **Bug 2 fix** | Added or verified RLS policy with `auth.uid() = user_id` |
| **Bug 2 explanation** | Root cause: RLS policy was missing or incorrect |
| **Bug 3 diagnosis** | Identified hallucinated function; checked real SDK docs |
| **Bug 3 fix** | Replaced with correct SDK function |
| **Bug 3 explanation** | Root cause: AI generated non-existent function name |
| **All bugs fixed** | The app runs without errors; all three issues resolved |
| **Root causes named** | For each bug: wrote one clear sentence explaining the real problem (not the symptom) |

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