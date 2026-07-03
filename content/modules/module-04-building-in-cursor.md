# Module 4: Building Apps in Cursor (In-Editor Flow)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 1–3. Learners arrive with a spec and an ordered build plan (Module 3) and know how to write and decompose prompts (Module 2).

> The first hands-on build module and the workhorse of the course. Learners install real tools and ship a real feature. The running example is the **invoice tracker** planned in Module 3; here we build the first slice — managing clients — as UI only, on mock data. The app gets styled in Module 6 and wired to a real database in Module 7, so this module stays focused on the editor workflow.
> 

> **📸 Screenshots:** Items marked ![clients table](/screenshots/m04/m04-01-clients-table.png) — capture from a live Cursor session (Cursor's own desktop UI is manual; the rendered app pages are auto-capturable from the reference app).
> 

> **Version note (pin + concept):** shortcuts are current as of 2026 (Mac; use Ctrl on Windows/Linux), and the reference build uses **Next.js 16** — where `searchParams`/`params` are **async** in server components (you `await` them) and route groups like `(dashboard)` organize shared layout. Cursor and Next both move fast; pin your versions, learn the concepts, check the docs.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Build** a working full-stack feature in a Next.js app using Cursor's in-editor AI. *(Create)*
2. **Use** multi-file editing and context features to implement changes across files. *(Apply)*
3. **Compare** in-editor flow (Cursor) with alternatives (VS Code + Copilot, Zed) and justify a choice. *(Evaluate)*

---

## Lesson 4.1 — Setup: Cursor + a Next.js project (~45 min)

**Step 1 — Install Cursor** from [cursor.com](http://cursor.com) and sign in. It's a VS Code fork, so extensions/keybindings carry over.

**Step 2 — Install Node.js** (LTS).

**Step 3 — Create the project** in Cursor's built-in terminal:

```bash
npx create-next-app@latest invoice-tracker
# TypeScript = yes, App Router = yes, Tailwind = yes
cd invoice-tracker
npm run dev
```

**Step 4 — Open** [http://localhost:3000](http://localhost:3000) to confirm the starter app runs.

*[SCREENSHOT: the default Next.js starter page at [localhost:3000](http://localhost:3000).]*

> **Instructor note:** Get everyone to a running [localhost](http://localhost) before moving on — setup failures here derail the module.
> 

---

## Lesson 4.2 — The four ways to work with Cursor (~60 min)

- **Tab (autocomplete)** — predicts your next edit; press Tab to accept. Best for small in-flow completions.
- **Cmd+K (inline edit)** — select a block, describe a change in plain English, get a color-coded diff to accept/reject. Best for focused edits.
- **Cmd+L (chat)** — a sidebar chat that understands your indexed project. Best for questions and planning.
- **Cmd+I (Composer / Agent)** — describe a larger change. **Composer** makes a multi-file edit in one pass; **Agent** goes further — it runs commands, reads the output, and fixes errors until it works. Best for multi-file features and open-ended tasks (Lesson 4.5).

**Mental model:** Tab for keystrokes, Cmd+K for a block, Chat for thinking, Composer for a whole feature.

![create form](/screenshots/m04/m04-02-create-form.png)

---

## Lesson 4.3 — Giving Cursor context (~45 min)

Module 1's "context is everything," made concrete:

- **@-mentions** — type `@` to pin context: `@filename`, `@folder`, `@Docs`, `@Web`. Puts exactly what you want into the model's window.
- **`.cursorrules`** — a project-root file of persistent instructions (stack, conventions) injected into every interaction. Example:

```
# .cursorrules
This is a Next.js (App Router) + TypeScript + Tailwind app.
Use server components by default; only "use client" when needed.
Keep components small and typed.
```

![m04 cursor agent mode](/screenshots/m04/m04-cursor-agent-mode.png)

> **Cross-tool note ([AGENTS.md](http://AGENTS.md)):** `.cursorrules` is Cursor's file; there's also an emerging vendor-neutral convention, **`AGENTS.md`**, that many AI tools read (create-next-app now scaffolds one). Same idea, different filename per tool. You'll meet Claude Code's counterpart, `CLAUDE.md`, in Module 5.
> 

---

## Lesson 4.4 — Build a feature end to end (~90 min)

This delivers Objective 1. Follow the Module 3 plan for the "clients" slice: a type, a list view, a create form. Mock data now; wired to Supabase in Module 7.

**Step 1 — Define the data shape** (`types/client.ts`):

```tsx
export type Client = { id: string; name: string; email: string };
```

**Step 2 — Build the list view.** In chat (Cmd+L), prompt five-ingredient style: "Create a server component at `app/clients/page.tsx` that renders a list of clients from a mock array, showing name and email in a Tailwind table. Use the `Client` type from `@types/client.ts`." Review the diff, accept.

**Step 3 — Add a create form** — a client component with name/email fields and basic validation. Verify it renders and validates before moving on — **prompt → verify → next** (Module 2).

At each step: read the generated code, run it, use Cmd+K to fix anything off. You are the engineer (Module 1).

![m04 cursor at mention](/screenshots/m04/m04-cursor-at-mention.png)

---

## Lesson 4.5 — Multi-file editing with Composer (~45 min)

This delivers Objective 2. Real features touch multiple files. Composer (Cmd+I) handles it: describe the change, it edits every relevant file and shows one unified diff.

**Worked example:** "Add a nav link to `/clients` in the site header, create the header component if it doesn't exist, and include it in the root layout." Add `@` context (e.g. `@app/layout.tsx`). **Step through the diff file by file** and accept deliberately — never blind-accept.

![m04 cursor cmdk diff](/screenshots/m04/m04-cursor-cmdk-diff.png)

**When to use which:** Cmd+K for one block, Composer for a change spanning files.

**Composer vs. Agent vs. Background (2026):** *Composer* applies a change you've specified; *Agent* adds autonomy — it runs terminal commands, reacts to errors, and iterates until tests pass (use it when the task has no obvious end state). **Background Agents** run in the cloud on a branch and return a pull request (queue a task, close your laptop). **Subagents** run several in parallel for big refactors. Turn on Settings → Agent → *require approval for destructive commands* so `rm -rf` / `DROP TABLE` / force-push need a click. These are the same agentic ideas the course teaches for Claude Code (Modules 5, 11, 13) — Cursor just brings them into the editor. (Fast-moving — check current docs.)

---

## Lesson 4.6 — Cursor vs. the alternatives (~45 min)

This delivers Objective 3.

| Option | What it is | Best when |
| --- | --- | --- |
| **Cursor** (default) | AI-native IDE (VS Code fork) with Tab, inline edit, chat, multi-file agent | You want the most integrated AI coding experience |
| VS Code + GitHub Copilot | Standard editor plus an AI plugin | You won't switch editors / team standardizes on VS Code |
| Zed | Very fast native editor with AI features | You prioritize editor speed |
| Windsurf / others | Alternative AI-native IDEs | Worth trying if Cursor's pricing/feel doesn't fit |

**Why Cursor is the default:** tightest integration of the four modes in one beginner-friendly tool. **Trade-off:** Cursor's credit-based pricing can get expensive with heavy use; VS Code + Copilot is lower-friction if you won't leave VS Code; Zed wins on speed. The skills (autocomplete, inline edit, context, multi-file changes) exist in all of them.

---

## Hands-on activity (~60 min, folded in)

**"Ship the clients feature."** Build the clients slice: the `Client` type, a list page, a working create form — using at least three of Cursor's four modes and a `.cursorrules` file, with Composer used at least once. Deliverable: a running app on [localhost](http://localhost) with the feature working.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Build a feature:** screenshot/recording of a working list + form feature you built, plus the prompts used.

**Objective 2 — Multi-file & context:** describe a Composer change touching 2+ files and how you used `@`-context or `.cursorrules`.

**Objective 3 — Compare & justify:** in 3–4 sentences, recommend Cursor, VS Code + Copilot, or Zed for a given scenario and justify with the trade-offs.

*Pass mark: 80% and a working feature submitted.*

---

## Tools & alternatives (this module)

Default: **Cursor** on a **Next.js** app. Editor alternatives compared in Lesson 4.6. The framework layer (Next.js vs. Remix, Astro, SvelteKit) is covered in Module 15 (Landscape); Next.js is used here for its zero-config path to Vercel later (Module 10).

---

## Key takeaways

- Cursor gives four modes — Tab, Cmd+K, Chat, Composer — matched to the size of the change.
- Steer the model with `@`-mentions and a `.cursorrules` file (`AGENTS.md` is the cross-tool equivalent).
- Build step by step: prompt → read → run → fix → next.
- Composer handles multi-file changes; step through the diff, never blind-accept.
- The core skills transfer to VS Code + Copilot, Zed, and others.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)