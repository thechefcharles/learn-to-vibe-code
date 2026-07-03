# Module 0: Setup & Accounts

**Stage:** Onboarding · **Level:** Beginner / All · **Duration:** ~2 contact hours (0.2 CEU)

**Prerequisites:** None — this comes before Module 1. A computer and an internet connection are all that's assumed.

> Setup friction is where beginners quietly give up. This module installs and *verifies* every account and tool once, up front, so no later lesson stalls on "it won't install." It also gives learners the map of the whole stack before they touch any of it.

## Learning objectives

By the end of this module, the learner can:

1. **Set up** all required accounts and tools for the course. *(Apply)*
2. **Explain** what each tool in the stack is for and how the pieces connect. *(Understand)*
3. **Verify** the full toolchain works with a hello-world check. *(Apply)*

---

## Lesson 0.1 — The stack, before you touch it (~20 min)

Give learners the whole map first, so every tool has a place to land. Each maps to a later module:

| Tool | What it's for | First used in… |
| --- | --- | --- |
| Node.js | Runs your app locally | Module 4 |
| Cursor | AI code editor (in-editor flow) | Module 4 |
| Claude Code | Terminal AI agent (agentic flow) | Module 5 |
| Supabase | Database + auth + security | Module 7 |
| GitHub | Version control + code hosting | Module 9 |
| Vercel | Deploys your app to a public URL | Module 10 |

**The one-sentence flow:** you *write* code in Cursor/Claude Code, make it *look good* (Module 6), *power* it with Supabase, *store* it on GitHub, and *ship* it on Vercel — with Node running it locally along the way.

---

## Lesson 0.2 — Install the editors and runtime (~30 min)

- **Node.js** — install the LTS version from [nodejs.org](http://nodejs.org). Verify in a terminal:

```bash
node --version
npm --version
```

- **Cursor** — download from [cursor.com](http://cursor.com), install, and sign in. (It's a VS Code fork, so it'll feel familiar if you've used VS Code.)
- **Claude Code** — install and sign in per the current instructions, then confirm it launches:

```bash
claude --version
```

![m00 cursor welcome](/screenshots/m00/m00-cursor-welcome.png)

---

## Lesson 0.3 — Create your accounts (~30 min)

Sign up for all three now so nothing blocks you later. Use the same email for consistency.

- **GitHub** — [github.com](http://github.com) (you'll create your first repo in Module 9).
- **Supabase** — [supabase.com](http://supabase.com) (you'll create a project in Module 7).
- **Vercel** — [vercel.com](http://vercel.com), and connect it to your GitHub account (this link enables auto-deploy in Module 10).

![m00 terminal versions](/screenshots/m00/m00-terminal-versions.png)

---

## Lesson 0.4 — Costs & free tiers (~15 min)

Set expectations honestly so nobody is surprised by a bill:

- **Node.js, GitHub, Supabase, Vercel** — all have free tiers that comfortably cover this course.
- **Cursor & Claude Code** — free/trial tiers, with paid plans (commonly around $20/month each) for heavier use. You can complete the course on modest usage.

Since pricing changes often, visit each tool's current pricing page to understand the free tier limits and what happens if you exceed them.

**Managing spend (so the bill doesn't surprise you):** AI coding tools bill by usage/credits, and heavy agentic runs (big multi-file builds, long sessions) burn faster than in-editor autocomplete. Habits: start on free/trial tiers; prefer scoped, specific prompts over "rebuild everything"; use `/compact` and fresh sessions to avoid paying for bloated context; and check your usage dashboard weekly at first to learn your own burn rate.

---

## Lesson 0.5 — Verify everything works (~25 min)

Prove the whole toolchain runs *before* Module 1. Create a throwaway hello-world Next.js app:

```bash
npx create-next-app@latest hello-check
cd hello-check
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — if the starter page loads, Node + npm + your editor work. Then confirm you can sign in to Cursor, launch Claude Code in that folder, and that you're logged in to GitHub, Supabase, and Vercel. Delete the `hello-check` folder afterward.

![Next.js starter page](/screenshots/m00/m00-01-nextjs-starter.png)

This course's reference build uses **Next.js 16 + Tailwind v4**. Note: Tailwind v4 has **no `tailwind.config.js`** — configuration lives in CSS via `@import "tailwindcss"` and `@theme` directives instead. These frameworks evolve quickly, so when you start your own project, pin specific versions, understand the core concepts, and refer to the latest documentation for any surprises.

---

## Readiness checklist

Tick every box before starting Module 1:

| Item | Done when… |
| --- | --- |
| Node.js | `node --version` prints a version |
| Cursor | Installed and signed in |
| Claude Code | Launches from the terminal |
| GitHub | Account created, logged in |
| Supabase | Account created, logged in |
| Vercel | Account created, connected to GitHub |
| Hello-world | A create-next-app ran at [localhost:3000](http://localhost:3000) |

---

## Troubleshooting (common blockers)

- **`command not found` after install** — close and reopen the terminal (PATH updates on restart); reinstall if it persists.
- **`create-next-app` fails** — usually an old Node version; install the current LTS.
- **`create-next-app` refuses to run in a non-empty folder** — even one stray file (or a hidden `.DS_Store`) blocks it. Start in an empty folder, or let it create a fresh subfolder.
- **Port 3000 in use** — stop the other process or let Next.js use the next port it offers.
- **Can't sign in to a tool** — check you're using the same email and that pop-ups/OAuth aren't blocked.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Set up tools/accounts:** submit your completed readiness checklist (screenshots of each).

**Objective 2 — Explain the stack:** in one sentence each, say what Cursor, GitHub, Supabase, and Vercel do.

**Objective 3 — Verify the toolchain:** show a screenshot of a create-next-app running at [localhost:3000](http://localhost:3000).

*This module is pass/complete (checklist done) rather than quiz-graded — it gates entry to Module 1.*

---

## Tools & alternatives (this module)

These are the course defaults; alternatives are discussed in their modules and consolidated in Module 15 (Landscape). A learner already on an alternative editor (VS Code + Copilot) can follow along, but the step-by-step screenshots assume the defaults — recommend beginners use them to avoid divergence.

---

## Key takeaways

- Set up and verify everything once, up front — don't let install friction derail a later lesson.
- Know the stack map: write (Cursor/Claude Code) → design (Module 6) → power (Supabase) → store (GitHub) → ship (Vercel).
- Free tiers cover the course; AI tools are metered, so heavy use costs more.
- You're ready for Module 1 when every box on the readiness checklist is ticked.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)