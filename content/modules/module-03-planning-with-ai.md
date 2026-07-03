# Module 3: Planning Software with AI

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~4 contact hours (0.4 CEU)

**Prerequisites:** Modules 1–2 (understand how models behave; be able to write and decompose prompts).

> The last Foundations module and the bridge into building. Beginners want to jump straight to code; this teaches the discipline that separates people who ship working software from people who generate a pile of code that doesn't fit together. Plan *with* AI — don't skip planning because AI is fast. The spec and task breakdown produced here feed every build module that follows.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* are placeholders — capture from a live AI session (manual).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Produce** a written product spec and task breakdown from a raw idea using AI. *(Create)*
2. **Translate** requirements into a technical plan (data model, screens, milestones). *(Apply)*
3. **Sequence** a feature into dependencies and an ordered build plan. *(Analyze)*

---

## Lesson 3.1 — Why plan when AI writes code so fast? (~30 min)

The faster the tool, the more a bad plan costs. AI can generate a screen in seconds — but if you haven't decided what data it needs, how it connects to the next screen, or what "done" means, you'll generate ten screens that don't fit together and spend far longer untangling them than planning would have taken.

Reframe planning for the AI era: it's not overhead, it's **the context you'll feed the model.** A clear spec and task list *is* the high-quality context from Module 2, written once and reused across every build prompt. Skipping planning doesn't save time — it moves the thinking into the middle of the build, where it's more expensive.

**The core idea:** decide *what* you're building and *in what order* before you ask AI to build any of it.

---

## Lesson 3.2 — From raw idea to a spec, with AI (~60 min)

This delivers Objective 1. A spec is a short written description of what the software should do — you don't need a formal template, you need clarity. Use AI as a thinking partner.

**A lightweight spec answers:**

- **Problem** — what pain does this solve, and for whom?
- **Users** — who uses it, and what are they trying to accomplish?
- **Core features** — the handful of things it must do (the MVP).
- **Out of scope** — what you're deliberately *not* building yet (as important as what you are).
- **Success** — how you'll know it works.

**Using AI to build the spec:** describe your rough idea and ask the model to interview you — e.g. "I want an app that helps freelancers track invoices. Ask me the questions you'd need to write a clear MVP spec." Answer, then ask it to draft the spec. This turns a vague idea into a concrete document fast, and surfaces gaps you'd have missed.

> **Instructor demo:** Take a one-sentence app idea from the class and have the AI interview-then-draft a spec live. Show how the questions expose hidden assumptions.
> 

*[SCREENSHOT: the AI interviewing the user with clarifying questions, then the drafted MVP spec.]*

**Watch-out (Module 1):** the AI will confidently suggest features and scope. Treat its output as a draft to edit, not gospel — *you* own the scope decisions.

---

## Lesson 3.3 — Translating the spec into a technical plan (~60 min)

This delivers Objective 2. A spec says *what*; a technical plan says *how*. Translate each feature into three things:

- **Data model** — what the app stores. For the invoice tracker: `clients` (name, email), `invoices` (client, amount, due date, status). This previews Module 7 (Supabase/Postgres).
- **Screens / views** — what the user sees: a client list, an invoice list, a "new invoice" form, a dashboard. Each maps to features in the spec.
- **Milestones** — checkpoints where you have something that works: "v0: add and list clients," "v1: create invoices," "v2: mark paid and see totals."

Prompt the AI for a first draft of each ("Given this spec, propose a simple data model and the screens needed"), then critique it (Module 2 skill) against your intent.

*[SCREENSHOT: the AI's proposed data model and screen list for the invoice tracker.]*

---

## Lesson 3.4 — Sequencing: dependencies and build order (~60 min)

This delivers Objective 3. Not all tasks are equal — some must come before others. Teach learners to spot **dependencies** and order work so they're never blocked.

**Rule of thumb:** build foundations before the things that rely on them. You can't display invoices before you can store one; you can't store one before the data model exists; a per-user app needs auth before user-owned data.

**Worked example — ordering the invoice tracker:**

1. Data model (clients, invoices) — everything depends on this.
2. Auth / users — so data can belong to someone.
3. Create + list clients — invoices reference clients, so clients first.
4. Create + list invoices.
5. Mark invoice paid / status changes.
6. Dashboard with totals — depends on invoices existing.

Ask, for each task, "what must already exist for this to work?" That question *is* dependency analysis. The result feeds directly into the decomposed prompting from Module 2 — each step becomes a focused prompt in the Building stage (Modules 4–13).

---

## Hands-on activity (~40 min, folded in)

**"Plan a real app end to end."** Each learner picks a simple app idea (or a provided one). Using AI as an interview partner, they produce: (1) a one-page spec with an explicit out-of-scope section, (2) a data model and screen list, and (3) an ordered build plan with dependencies noted. This single artifact exercises all three objectives and becomes their starting point for the Building stage.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Produce a spec:** from "an app for a small gym to book classes," write a one-page MVP spec (problem, users, core features, out-of-scope, success).

**Objective 2 — Technical plan:** for that gym app, propose a data model and screen list, and define three milestones.

**Objective 3 — Sequence:** put the build tasks in order and, for two, state what must already exist first and why.

*Pass mark: 80%. Completing this gates entry to Stage 2 (Building).*

---

## Tools & alternatives (this module)

Planning is tool-agnostic — any capable assistant (Claude Code, Cursor's chat, ChatGPT, Claude) works as a planning partner. The default is **Claude Code**, so you can keep the spec and plan as files alongside the code you'll build next. Alternatives (a chat window, a Notion doc, a text file) are fine — the deliverable is the *thinking*, not the tool that holds it.

**Tip:** keep the spec *and a feature checklist* in **Notion** as your project's source of truth — and in Module 13 you'll connect Notion to Claude Code (via MCP) so the AI can read the checklist and tick items off as it ships them.

---

## Key takeaways

- The faster the tool, the more a bad plan costs — plan *with* AI, don't skip it.
- A good spec states the problem, users, core features, out-of-scope, and success.
- Translate the spec into a data model, screens, and milestones before building.
- Order work by dependencies: build what other things rely on first.
- The plan you produce becomes the reusable context and the decomposed prompt list for the Building stage.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)