# Module 5: Building Apps in Claude Code (Agentic)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Module 4. Learners have a running Next.js invoice-tracker with the clients feature (mock data) and know the in-editor (Cursor) workflow.

> Module 4 taught in-editor flow — you drive, the AI assists edit-by-edit. This module teaches the *agentic* flow — you describe a goal and an agent plans and executes across the whole repo from the terminal. Same skills (context, prompting, verification), bigger unit of work. The example advances: learners add the **invoices** feature (which depends on clients, per the Module 3 build order), still on mock data. The app gets styled in Module 6 and wired to Supabase in Module 7.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* — the Claude Code terminal is a manual capture.
> 

> **Version note (pin + concept):** Claude Code updates frequently. Teach the concepts — persistent project context, plan-before-execute, review-the-diff, permissions — so the skill survives CLI changes. Commands are current as of 2026.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Orchestrate** an agentic build or refactor across a repository from the terminal. *(Create)*
2. **Direct** an agent with a written plan and review its multi-step output. *(Apply)*
3. **Determine** which tasks suit agentic (Claude Code) vs. in-editor (Cursor) workflows. *(Analyze)*

---

## Recap: Tool Choice

Module 4 taught in-editor (Cursor). Module 4.7 asked you to reflect on when to use Cursor vs. Claude Code.

Here's the TL;DR: **Use Cursor for focused edits, Claude Code for orchestration.**

Module 5 teaches orchestration—multi-file builds, sequencing, reviewing diffs. You'll use Claude Code heavily here. But you'll still use Cursor (from Module 4) in real projects. The skill is knowing which one to reach for.

---

## Lesson 5.1 — Setup & the agentic mindset (~45 min)

**Step 1 — Install Claude Code** and sign in; open your terminal in the `invoice-tracker` folder from Module 4.

**Step 2 — Start it** by running `claude`. You now have an agent that can read your whole repo, propose changes, run commands, and edit files — from the terminal.

```bash
cd invoice-tracker
claude
```

---

**[SCREENSHOT PLACEHOLDER: Claude Code Welcome]**

**What this screenshot should show:**
- Terminal window with `claude` command output
- Welcome message from Claude Code (version, session start)
- Cursor ready for user input (e.g., `You:`)
- Proof that Claude Code is installed and running

---

**The mindset shift:** in Cursor you think in *edits*; in Claude Code you think in *goals*. Instead of "change this line," you say "add an invoices feature that lists and creates invoices tied to clients." The agent figures out which files to touch. Your job moves up a level: describe intent clearly, then review what it did.

---

## Lesson 5.2 — [CLAUDE.md](http://CLAUDE.md): persistent project context (~30 min)

The agentic equivalent of Cursor's `.cursorrules` (Module 4) — and the same Module 1 principle: context = quality. `CLAUDE.md` is a file the agent reads at the start of every session. Generate a starter with `/init`, then edit it:

```
# CLAUDE.md
This is a Next.js (App Router) + TypeScript + Tailwind app: an invoice tracker.
Data is mock/in-memory for now (Supabase comes in Module 7).
Use server components by default; keep components small and typed.
Follow the existing patterns in app/clients for new features.
```

Pointing the agent at existing code (`app/clients`) makes new features match what you built. Maintain [CLAUDE.md](http://CLAUDE.md) as the project grows — it's the memory that keeps the agent consistent.

> **Cross-tool note ([AGENTS.md](http://AGENTS.md)):** `CLAUDE.md` is Claude Code's file; `.cursorrules` (Module 4) is Cursor's. There's also a vendor-neutral standard, **`AGENTS.md`**, that many tools read (create-next-app scaffolds both). Keep them consistent, or treat `AGENTS.md` as the shared source.
> 

---

**[SCREENSHOT PLACEHOLDER: CLAUDE.md File]**

**What this screenshot should show:**
- Editor window with CLAUDE.md open
- 5-10 lines of project conventions (framework, language, patterns, style)
- Example content: "Next.js App Router, TypeScript, Tailwind CSS, follow patterns in app/clients"
- Proof: persistent context file is created and editable

---

---

## Lesson 5.3 — Plan mode: propose before doing (~45 min)

The single most important agentic habit for beginners. Before a big change, use plan mode (`/plan`) so the agent proposes an approach *before* editing anything. You review, correct, then let it execute — preventing the classic failure where the agent confidently does the wrong thing across ten files.

**Flow:** describe the goal → agent returns a plan (files it will create/change, in order) → you check it against your intent and the Module 3 build order → approve or refine (Module 2's critique-and-refine, applied to a plan) → agent executes.

---

**[SCREENSHOT PLACEHOLDER: Plan Mode Output]**

**What this screenshot should show:**
- Terminal showing Claude Code's response to `/plan` command
- Numbered list of steps (e.g., "1. Create types/invoice.ts", "2. Create app/invoices/page.tsx", etc.)
- Each step describes a file and its purpose
- No changes have been made yet (just a proposal)
- Proof: agent proposes before executing

---

> **Instructor note:** Show a plan you *reject* and refine, not just a happy path. Steering the plan is the skill.
> 

---

## Lesson 5.4 — Orchestrate a multi-file build end to end (~90 min)

This delivers Objective 1. Build the **invoices** feature agentically — it spans several files, where agentic flow shines.

**Step 1 — State the goal** (feature-level five-ingredient prompt): "Add an invoices feature. Create an `Invoice` type (id, clientId, amount, dueDate, status). Add a page at `app/invoices` that lists invoices in a Tailwind table, and a form to create one referencing an existing client. Use mock data and follow the patterns in `app/clients`. Show me a plan first."

Here's what a strong prompt looks like (five ingredients: task, context, constraints, tone, examples):

```
Task: Add an invoices feature to the invoice-tracker.
Context: I completed Module 3 planning. My spec says the app is [your app name], built on [your stack choice], with these core features: [your features from your feature list]. My data model includes [your tables]. My build order is [your sequence].

Now I'm building the [next feature] feature based on my plan.
Constraints: Mock data (no database yet—that's Module 7). Follow the folder structure and patterns of app/clients. Each invoice references a clientId.
Tone: Be professional and skip explanations—I'll review the plan first.
Examples: Invoice type should have fields: id (uuid), clientId (string), amount (number), dueDate (Date), status ('draft' | 'sent' | 'paid').
Plan first, then execute.
```

**Step 2 — Review the plan**; confirm it creates:
- `types/invoice.ts` (the `Invoice` type)
- `app/invoices/page.tsx` (list page with Tailwind table)
- `app/invoices/form.tsx` (create form, reusing clients patterns)
- Mock data in `lib/mock-invoices.ts`

**Step 3 — Let it execute**, then review the diff across files. Run `npm run dev` and confirm `/invoices` works. The diff should show files added/modified, with green (new code) and red (removed code) clearly visible. Check:
- Type matches your spec
- Form has proper client dropdown
- List page shows all invoices
- No console errors in the browser

**Step 4 — Iterate** with follow-ups (add filtering, sorting, etc.). The habit is unchanged: **goal → plan → execute → verify → next.**

---

**Concrete code example** — what the Invoice type might look like after Claude Code generates it:

```typescript
// types/invoice.ts
export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid';
  createdAt: Date;
}
```

And a stub for the form component:

```tsx
// app/invoices/form.tsx
'use client';
import { useState } from 'react';
import { Invoice } from '@/types/invoice';

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    dueDate: '',
    status: 'draft',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Claude Code will add: create invoice, redirect, etc.
    console.log('Submit:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Client</label>
        <select value={formData.clientId} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })} />
      </div>
      {/* Amount, Due Date, Status fields */}
      <button type="submit">Create Invoice</button>
    </form>
  );
}
```

---

**[SCREENSHOT PLACEHOLDER: Multi-File Diff]**

**What this screenshot should show:**
- Terminal showing Claude Code's diff output
- Multiple files listed (e.g., `types/invoice.ts`, `app/invoices/page.tsx`, `app/invoices/form.tsx`)
- For each file: red lines (removed), green lines (added)
- Accept/reject prompt at the end
- Proof: agent changed multiple files coherently in one operation

---

The payoff vs. Module 4: you described one feature and the agent handled the whole set of files.

---

## Lesson 5.5 — Directing and reviewing safely (~45 min)

This delivers Objective 2. Two habits:

- **Direct with a written plan.** Clear goal and constraints → better plan. Reuse [CLAUDE.md](http://CLAUDE.md) so you don't repeat context.
- **Review every diff before accepting.** The agent shows what it changed — read it. You own every line, even the ones an agent wrote (Module 1). Never blind-accept a multi-file change.

**Permissions:** Claude Code asks before sensitive actions (running commands, editing files); control the rules with `/permissions`. For beginners, keep approvals on. Useful: `/context` (see the window) and `/compact` (summarize a long session so the agent doesn't lose earlier detail — the Module 1 "lost detail" risk).

---

**[SCREENSHOT PLACEHOLDER: Permission Prompt]**

**What this screenshot should show:**
- Terminal showing Claude Code asking for permission
- Prompt: "I will run `npm install`. Approve? (yes/no)"
- Or: "I will edit 3 files. Review the diff first? (yes/no)"
- Shows the safeguard mechanism at work
- User is in control (can deny or require review)

---

---

## Lesson 5.6 — Claude as strategic co-pilot: maintaining project context (~60 min)

Claude Code excels at multi-file coordination and rapid implementation—it reads your repo and builds features across dozens of files. But here's the catch: as it writes hundreds of lines of code, it can lose sight of the *big picture*. You end up asking it "should I build X next?" and the agent has no memory of your overall spec, architectural decisions, or project priorities.

The solution: **Use Claude (web or desktop, with Notion context) as a strategic co-pilot while Claude Code handles the implementation.**)

### The context problem

Claude Code is great at *how* (implementation), but loses *what* and *why* (strategy). Example:

- You: "Claude Code, add filtering to the invoices page."
- Claude Code: "Got it. Should I add status/date/amount dropdowns, or checkboxes, or a search bar? Should filtering persist in localStorage? Should I reset when navigating away?"
- You: ...you don't remember. You're in the code, not the spec.

Result: Claude Code guesses wrong, or you spend 10 minutes re-explaining the feature spec mid-implementation.

### The solution: handoff pattern

**Claude** (strategic) ← → **Claude Code** (implementation)

1. **Claude stays on task:** Reads architecture overviews, specs, decisions, next priorities from Notion
2. **Claude Code stays focused:** Reads your repo (CLAUDE.md, code, tests) and implements what Claude directs
3. **Handoff cycle:** Claude Code → Claude (for strategic direction) → Claude Code (for implementation)

### How to set it up

**1. Structure Notion with architecture & strategy**

Create a Notion workspace (or pages) with:

```
Architecture Overview
├── Project Goals & Roadmap
├── Module Build Order (which features in which order)
├── Current Decisions (design, tech, data model, auth)
├── Next Priorities (unblocked, in-progress, blockers)
├── Frequently Asked Questions (common design questions)
└── Glossary (domain terminology, type definitions)
```

Example:

```
# Module 5 Build Order (Architecture)
1. Clients feature (Module 4) ✓ Done
2. Invoices feature (depends on clients)
   - List page with table
   - Create form
   - Tie invoices to existing clients (via clientId)
   - Filter by status + date (future)
3. Dashboard (depends on invoices + clients)
4. Supabase wiring (Module 7)
```

**2. CLAUDE.md for Claude Code**

Keep your CLAUDE.md focused on *implementation* guardrails (tech stack, patterns, constraints):

```markdown
# CLAUDE.md

Next.js (App Router) + TypeScript + Tailwind v4.
Use server components by default. Follow patterns in app/clients.
Types in /types. Components in /app. Server actions in /lib/actions.
Mock data for now (Supabase in Module 7).
```

**3. Make Claude aware of your Notion**

Instead of pasting your whole Notion every time, give Claude a link + key questions:

```
I have a Notion workspace at [link] with:
- Architecture Overview (project goals, build order, current decisions)
- Next Priorities (what's unblocked to build next)

When I ask strategic questions, refer to this workspace. Example questions:
- "What's the next priority in the build order?"
- "Does the spec say to filter invoices by status?"
- "Should this feature be in the dashboard or a separate page?"
```

**4. Keep Notion and CLAUDE.md in sync**

- Notion: strategic context (spec, decisions, roadmap, blockers)
- CLAUDE.md: implementation guardrails (stack, patterns, conventions)
- Both read-only for learners; you maintain both

### Example workflow

Let's say you want to add invoice filtering by status.

**Step 1 — Ask Claude (strategic)**

> "I want to add invoice filtering to the invoices page. Based on my Notion architecture (see link), where does this feature fit in the build order, and should I add it now?"

Claude reads your Notion and answers:

> "Per your Module 5 build order, invoices come before dashboard. Filtering is listed as a future enhancement. I'd recommend completing the basic invoices feature first (create + list), then circle back to filtering in iteration 2."

**Step 2 — Paste Claude's answer to Claude Code (implementation)**

> "Add filtering to the invoices page. Based on our spec, sort by status (draft, sent, paid) using Tailwind badge colors. Add dropdown filter above the table. Don't persist to localStorage yet (we'll add that in the dashboard phase)."

Claude Code: "Got it. Should I add this to the existing page.tsx or create a separate filter component?"

**Step 3 — Ask Claude if you're unsure**

> "Claude, per the Notion patterns, should I use a separate filter component or inline it on the page?"

Claude: "Your existing app/clients has inline filters, so keep invoices consistent—inline the dropdown on page.tsx for now."

**Step 4 — Paste back to Claude Code**

> "Based on the existing patterns (app/clients has inline filters), put the filter dropdown inline on the invoices page."

Claude Code implements it with full context.

### When to use this pattern

- **Long builds (>30 min):** Claude Code loses high-level context. Claude refocuses you on the spec.
- **Architectural decisions:** Let Claude (with full spec) decide structure; Claude Code implements it.
- **Scope creep:** Claude catches when a feature isn't in the spec yet.
- **Team consensus:** If you're pairing, Claude + Notion is shared context (Claude Code is just the typist).
- **Context reset:** Between sessions, re-sync with Claude ("catch me up on the build order and current blockers") instead of re-reading docs.

### Knowledge check

**Q5-6a:** When Claude Code loses track of the big picture during a long build, which tool should you use to refocus?
- (a) Cursor (it's faster)
- (b) **Claude (it reads your full spec in Notion)** ✓
- (c) Restart Claude Code with a fresh prompt
- (d) Give up and plan more upfront

*Why:* Claude (with Notion context) knows your full spec and build order; Claude Code only knows the repo. Claude is the strategic co-pilot.

**Q5-6b:** What should your Notion contain that CLAUDE.md shouldn't?
- (a) Tech stack (Next.js, Tailwind, etc.)
- (b) Code patterns (follow app/clients)
- (c) **Architecture overview, roadmap, and design decisions** ✓
- (d) TypeScript type definitions

*Why:* Notion is for strategic context (what to build, in what order, why). CLAUDE.md is for implementation guardrails (how to build, tech stack, patterns).

---

## Lesson 5.7 — Cursor vs. Claude Code: which for which task (~45 min)

This delivers Objective 3. Not competitors — complementary; skilled builders use both.

| Reach for… | When the task is… | Examples |
| --- | --- | --- |
| **Cursor** (in-editor) | Focused, local, watch each edit | Tweak a component, fix one function, style a page |
| **Claude Code** (agentic) | Large, multi-file, or repetitive | Add a whole feature, rename a concept everywhere, big refactor |
| **Claude** (strategic co-pilot) | Big-picture decisions, spec questions, roadmap | "Should I build X now?", "What's the architecture?", "Does this match the spec?" |

**Rule of thumb:** small/local → Cursor; large/cross-cutting → Claude Code; strategic questions → Claude. Many run all three (the 2026 solo stack is Cursor + Claude Code + Claude with Notion). **Alternatives:** Codex CLI, Copilot agent mode, open-source Cline/Continue — the skill (goal → plan → review) transfers; Claude Code is the default for its repo-wide performance and terminal-native fit.

---

## Hands-on activity (~60 min, folded in)

**"Ship the invoices feature agentically."** Using Claude Code with a maintained [CLAUDE.md](http://CLAUDE.md), add the invoices feature. Here's the step-by-step:

### Step-by-step walkthrough:

1. **Start Claude Code** in your `invoice-tracker` folder:
   ```bash
   claude
   ```

2. **Paste the goal** (from Lesson 5.4; include the five-ingredient format for best results):
   ```
   Add an invoices feature. Create an Invoice type (id, clientId, amount, dueDate, status). 
   Add a page at app/invoices that lists invoices in a Tailwind table, and a form to create 
   one referencing an existing client. Use mock data and follow the patterns in app/clients. 
   Show me a plan first.
   ```

3. **Review the plan** Claude Code returns. It should list:
   - `types/invoice.ts` (type definition)
   - `app/invoices/page.tsx` (list view)
   - `app/invoices/form.tsx` (form component)
   - `lib/mock-invoices.ts` (mock data)
   
   **If the plan is off**, refine it: "Don't create a separate form component—put it on the same page for now" or "Add a delete button in the table."

4. **Approve execution** after reviewing. Claude Code will show a diff. Check:
   - New files are TypeScript-correct (no syntax errors)
   - Form has a client dropdown (not hardcoded)
   - Table displays all invoice fields
   - Mock data has 3–5 sample invoices

5. **Run the app** locally:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/invoices` and test: create an invoice, see it in the list, refresh and it's still there (mock data persists during the session).

6. **Iterate** (optional):
   - "Add a status badge (Tailwind colors: draft=gray, sent=blue, paid=green)"
   - "Sort invoices by dueDate descending"
   - "Add a search filter by client name"

### Deliverable:
- A running `/invoices` page with list + create form, tied to clients
- Screenshot of the working page
- One sentence on which task you'd have done in Cursor instead, and why
  - *Example:* "If the form styling was off, I'd use Cursor to adjust the Tailwind classes interactively, not re-generate the whole component."

---

## Quiz questions (preview)

These are the questions you'll see on the quiz. Study these to prepare:

**Q5-1:** The key mindset shift from Cursor to Claude Code is thinking in:
- (a) **edits → goals** ✓
- (b) goals → edits
- (c) files → folders
- (d) tests → bugs

*Why:* Cursor is edit-focused ("change this line"); Claude Code is goal-focused ("add an invoices feature"). You describe the outcome, the agent plans the steps.

**Q5-2:** `CLAUDE.md` is the agentic equivalent of:
- (a) package.json
- (b) **a Cursor rules file** ✓
- (c) .gitignore
- (d) README

*Why:* CLAUDE.md serves the same role as Cursor's `.cursorrules` (or `AGENTS.md`)—persistent project context that the agent reads on every session.

**Q5-3:** Why use plan mode before a big change?
- (a) it's faster
- (b) **so the agent proposes an approach you can review before it edits anything** ✓
- (c) it saves tokens
- (d) it's required

*Why:* Plan mode (`/plan`) lets you review the agent's proposed approach and approve before it modifies files. This prevents the agent from confidently doing the wrong thing across many files.

**Q5-6a:** When Claude Code loses track of the big picture during a long build, which tool should you use to refocus?
- (a) Cursor (it's faster)
- (b) **Claude (it reads your full spec in Notion)** ✓
- (c) Restart Claude Code with a fresh prompt
- (d) Give up and plan more upfront

*Why:* Claude (with Notion context) knows your full spec and build order; Claude Code only knows the repo. Claude is the strategic co-pilot.

**Q5-6b:** What should your Notion contain that CLAUDE.md shouldn't?
- (a) Tech stack (Next.js, Tailwind, etc.)
- (b) Code patterns (follow app/clients)
- (c) **Architecture overview, roadmap, and design decisions** ✓
- (d) TypeScript type definitions

*Why:* Notion is for strategic context (what to build, in what order, why). CLAUDE.md is for implementation guardrails (how to build, tech stack, patterns).

**Q5-7:** You finished Module 3 planning and created spec.md. You're starting Module 5. What should you do first?
- (a) Ask Claude Code to build whatever sounds interesting
- (b) **Paste your spec.md into Claude Code and reference it in your prompt** ✓
- (c) Build a generic invoice app first, then customize later
- (d) Skip the spec—Claude Code doesn't need context

*Why:* Your spec is Claude Code's context. The better the context, the better the output. Use the plan you created to guide Claude Code's building.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Orchestrate (Quiz Q5-1):**
- Q5-1: "The key mindset shift from Cursor to Claude Code is thinking in:" ✅ edits → goals
- *Practical check:* Submit the goal prompt you used + screenshot of the working `/invoices` page (proof of multi-file orchestration)

**Objective 2 — Direct & review (Quiz Q5-2, Q5-3):**
- Q5-2: Test understanding of CLAUDE.md
- Q5-3: Test understanding of plan mode and review discipline
- *Practical check:* Show a plan the agent proposed for a feature, your refinement (if any), and one thing you caught reviewing the diff.
  - **SAMPLE:** "Agent proposed renaming `client_id` to `clientId` everywhere. I refined it to only rename in new code (types/invoice.ts) to avoid breaking old clients table. Reviewing the diff, I caught that it missed updating the validation schema — I asked it to add that before accepting."

**Objective 3 — Use Claude as strategic co-pilot (Quiz Q5-6a, Q5-6b):**
- Q5-6a: Test understanding of when to use Claude vs. Claude Code
- Q5-6b: Test understanding of what goes in Notion vs. CLAUDE.md
- *Practical check:* Set up a simple Notion with architecture overview + build order. Capture one example where you asked Claude a strategic question (e.g., "What's next in the build order?") and how that informed your Claude Code prompt.
  - **SAMPLE:** "Notion had 'Invoices feature includes: list, create, (filtering is future)'. I asked Claude: 'Should I add filtering now or after dashboard?' Claude said: 'Per your roadmap, do basic invoices first, filtering later.' I then directed Claude Code to build list + create only, without filters."

**Objective 4 — Choose workflow (Lesson 5.7 knowledge):**
- *Practical check:* For four tasks, label Cursor, Claude Code, or Claude and justify:
  - (a) Rename `Invoice` to `Payment` everywhere (which tool?) → **Claude Code** (cross-cutting, affects many files)
  - (b) Adjust one button's color (which tool?) → **Cursor** (local, focused change)
  - (c) Add a whole notification system feature (which tool?) → **Claude Code** (large, multi-file)
  - (d) "Should I add notifications before or after the dashboard?" (which tool?) → **Claude** (strategic, references spec + roadmap)

---

**Scenario-based judgment checks:**

*For each scenario, state your action and reasoning.*

- **(a) Confusing plan:** You ask Claude Code to add a feature, it proposes a 10-file plan. You don't understand step 3. What do you do?
  - ✅ **Correct:** Ask Claude Code: "Explain step 3 in more detail. Why are you creating that file and what does it do?" This is refining the plan (Module 2 critique-and-refine).
  - ❌ **Avoid:** Just approving and hoping it works, or rejecting the whole plan and starting over.

- **(b) Verification:** The agent's diff looks good but renamed 50 variables from camelCase to snake_case everywhere. How do you verify it didn't miss any?
  - ✅ **Correct:** Ask Claude Code: "Search the codebase for any remaining camelCase versions of these variable names. Did I miss any references?" Then review the grep results.
  - ❌ **Avoid:** Accepting the diff without checking for missed references (could break the app).

- **(c) Tool choice:** You want to try two different UI approaches to the invoice form (side-by-side layout vs. stacked). Which tool would you use to test both quickly?
  - ✅ **Correct:** Cursor. You can toggle between the two approaches locally, see them in the browser immediately, without multi-file coordination.
  - ❌ **Avoid:** Claude Code for this — it's a single-file, visual iteration; agentic overkill.

- **(d) Error handling:** The agent creates a form but doesn't validate that amount > 0. You catch this in the review. Do you:
  - ✅ **Correct:** Reject the diff, ask Claude Code: "Add validation: amount must be positive, dueDate must be in the future." Then review the next diff.
  - ❌ **Avoid:** Accepting and adding validation later (you want validation in place before shipping).

- **(e) Strategic uncertainty:** You're not sure if the invoices feature should support recurring billing. Do you:
  - ✅ **Correct:** Ask Claude (with Notion context): "Does the spec mention recurring billing? If not, is it a future feature?" Claude reads your Notion and clarifies. Then direct Claude Code accordingly.
  - ❌ **Avoid:** Guessing and having Claude Code build the wrong thing. Or asking Claude Code directly (it only knows the repo, not your spec).

---

**Rubric checklist (self-review before submission):**

| Criterion | Evidence |
|-----------|----------|
| **Goal clarity** | You wrote a five-ingredient prompt (task, context, constraints, tone, examples) |
| **Plan review** | You reviewed the agent's plan and refined it at least once (e.g., "Don't do X, do Y instead") |
| **Diff inspection** | You read the full diff before accepting (no blind accepts) |
| **Working app** | `/invoices` page loads, you can create + list invoices, form ties to clients |
| **Pattern reuse** | New code follows the same style/structure as `app/clients` |
| **Judgment call** | You identified one small task you'd do in Cursor instead, with reasoning |

*Pass mark: 80% and a working agentic feature submitted.*

---

## Tools & alternatives (this module)

Default: **Claude Code** on the **Next.js** app. Alternatives compared in Lesson 5.6 (Codex CLI, Copilot agent mode, Cline/Continue). These pair with, not replace, the in-editor tool from Module 4 — real workflows use both.

---

## Key takeaways

- Agentic flow means describing a *goal*; the agent plans and edits across the repo. You move up to intent + review.
- `CLAUDE.md` is persistent project context (the agentic `.cursorrules`; `AGENTS.md` is the cross-tool equivalent).
- Always plan before executing a big change; refine the plan, then let it run.
- Review every diff and keep permissions on — you own every line.
- Small/local → Cursor; large/cross-cutting → Claude Code. Use both.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)