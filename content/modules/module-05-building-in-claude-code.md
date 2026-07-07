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

**Step 2 — Review the plan**; confirm it creates the type, list page, and form, reusing the clients patterns.

**Step 3 — Let it execute**, then review the diff across files. Run `npm run dev` and confirm `/invoices` works.

**Step 4 — Iterate** with follow-ups. The habit is unchanged: **goal → plan → execute → verify → next.**

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

## Lesson 5.6 — Cursor vs. Claude Code: which for which task (~45 min)

This delivers Objective 3. Not competitors — complementary; skilled builders use both.

| Reach for… | When the task is… | Examples |
| --- | --- | --- |
| **Cursor** (in-editor) | Focused, local, watch each edit | Tweak a component, fix one function, style a page |
| **Claude Code** (agentic) | Large, multi-file, or repetitive | Add a whole feature, rename a concept everywhere, big refactor |

**Rule of thumb:** small/local → in-editor; large/cross-cutting → agentic. Many run both (the 2026 solo stack is Cursor + Claude Code). **Alternatives:** Codex CLI, Copilot agent mode, open-source Cline/Continue — the skill (goal → plan → review) transfers; Claude Code is the default for its repo-wide performance and terminal-native fit.

---

## Hands-on activity (~60 min, folded in)

**"Ship the invoices feature agentically."** Using Claude Code with a maintained [CLAUDE.md](http://CLAUDE.md), add the invoices feature: (1) use plan mode and refine the plan at least once, (2) let the agent execute a multi-file change, (3) review the diff before accepting. Deliverable: a running `/invoices` page tied to clients. Then write one sentence on which task you'd have done in Cursor instead, and why.

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

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

**Objective 3 — Choose workflow (Lesson 5.6 knowledge):**
- *Practical check:* For four tasks, label Cursor or Claude Code and justify:
  - (a) Rename `Invoice` to `Payment` everywhere (Cursor? Claude Code?) → **Claude Code** (cross-cutting, affects many files)
  - (b) Adjust one button's color (Cursor? Claude Code?) → **Cursor** (local, focused change)
  - (c) Add a whole notification system feature (Cursor? Claude Code?) → **Claude Code** (large, multi-file)
  - (d) Fix a typo in one component (Cursor? Claude Code?) → **Cursor** (micro-task)

---

**Scenario-based judgment checks:**

- (a) You ask Claude Code to add a feature, it proposes a 10-file plan. You don't understand step 3. What do you do?
- (b) The agent's diff looks good but renamed 50 variables. How do you verify it didn't miss any?
- (c) You want to try two different approaches to a feature. Which tool would you use to test both quickly?

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