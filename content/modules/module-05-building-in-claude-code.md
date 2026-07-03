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

*[SCREENSHOT: the Claude Code welcome prompt in the terminal.]*

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

*[SCREENSHOT: a [CLAUDE.md](http://CLAUDE.md) file showing project conventions.]*

---

## Lesson 5.3 — Plan mode: propose before doing (~45 min)

The single most important agentic habit for beginners. Before a big change, use plan mode (`/plan`) so the agent proposes an approach *before* editing anything. You review, correct, then let it execute — preventing the classic failure where the agent confidently does the wrong thing across ten files.

**Flow:** describe the goal → agent returns a plan (files it will create/change, in order) → you check it against your intent and the Module 3 build order → approve or refine (Module 2's critique-and-refine, applied to a plan) → agent executes.

*[SCREENSHOT: Claude Code in plan mode listing proposed steps before making changes.]*

> **Instructor note:** Show a plan you *reject* and refine, not just a happy path. Steering the plan is the skill.
> 

---

## Lesson 5.4 — Orchestrate a multi-file build end to end (~90 min)

This delivers Objective 1. Build the **invoices** feature agentically — it spans several files, where agentic flow shines.

**Step 1 — State the goal** (feature-level five-ingredient prompt): "Add an invoices feature. Create an `Invoice` type (id, clientId, amount, dueDate, status). Add a page at `app/invoices` that lists invoices in a Tailwind table, and a form to create one referencing an existing client. Use mock data and follow the patterns in `app/clients`. Show me a plan first."

**Step 2 — Review the plan**; confirm it creates the type, list page, and form, reusing the clients patterns.

**Step 3 — Let it execute**, then review the diff across files. Run `npm run dev` and confirm `/invoices` works.

**Step 4 — Iterate** with follow-ups. The habit is unchanged: **goal → plan → execute → verify → next.**

*[SCREENSHOT: the terminal showing the multi-file diff for the invoices feature.]*

The payoff vs. Module 4: you described one feature and the agent handled the whole set of files.

---

## Lesson 5.5 — Directing and reviewing safely (~45 min)

This delivers Objective 2. Two habits:

- **Direct with a written plan.** Clear goal and constraints → better plan. Reuse [CLAUDE.md](http://CLAUDE.md) so you don't repeat context.
- **Review every diff before accepting.** The agent shows what it changed — read it. You own every line, even the ones an agent wrote (Module 1). Never blind-accept a multi-file change.

**Permissions:** Claude Code asks before sensitive actions (running commands, editing files); control the rules with `/permissions`. For beginners, keep approvals on. Useful: `/context` (see the window) and `/compact` (summarize a long session so the agent doesn't lose earlier detail — the Module 1 "lost detail" risk).

*[SCREENSHOT: a Claude Code permission prompt.]*

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

## Knowledge check (mapped to objectives)

**Objective 1 — Orchestrate:** submit the goal prompt and a screenshot of the multi-file result for a feature you built.

**Objective 2 — Direct & review:** show a plan the agent proposed, your refinement, and one thing you caught reviewing the diff.

**Objective 3 — Choose the workflow:** for four tasks (rename `Client` to `Customer` everywhere; adjust one button's color; add a settings page; fix a heading typo), label each Cursor or Claude Code and justify in one line.

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