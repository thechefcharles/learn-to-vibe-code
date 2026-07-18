# Module 6: Building Apps in Claude Code (Agentic)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Module 5. Learners have a running Next.js invoice-tracker with the clients feature (mock data) and know the in-editor (Cursor) workflow.

> Module 5 taught in-editor flow — you drive, the AI assists edit-by-edit. This module teaches the *agentic* flow — you describe a goal and an agent plans and executes across the whole repo from the terminal. Same skills (context, prompting, verification), bigger unit of work. The example advances: learners add the **invoices** feature (which depends on clients, per the Module 4 build order), still on mock data. The app gets styled in Module 7 and wired to Supabase in Module 8.

> **Version note (pin + concept):** Claude Code updates frequently. Teach the concepts — persistent project context, plan-before-execute, review-the-diff, permissions — so the skill survives CLI changes. Commands are current as of 2026.

## Learning objectives

By the end of this module, the learner can:

1. **Orchestrate** an agentic build or refactor across a repository from the terminal. *(Create)*
2. **Direct** an agent with a written plan and review its multi-step output. *(Apply)*
3. **Determine** which tasks suit agentic (Claude Code) vs. in-editor (Cursor) workflows. *(Analyze)*
4. **Leverage** advanced terminal commands and visual workflows to optimize agentic development. *(Apply)*

---

## Lesson 6.1 — Setup & the agentic mindset (~45 min)

**Step 1 — Install Claude Code** and sign in; open your terminal in the `invoice-tracker` folder from Module 5.

**Step 2 — Start it** by running `claude`. You now have an agent that can read your whole repo, propose changes, run commands, and edit files — from the terminal.

```bash
cd invoice-tracker
claude
```

[SCREENSHOT: Claude Code welcome prompt in the terminal]

**The mindset shift:** in Cursor you think in *edits*; in Claude Code you think in *goals*. Instead of "change this line," you say "add an invoices feature that lists and creates invoices tied to clients." The agent figures out which files to touch. Your job moves up a level: describe intent clearly, then review what it did.

---

## Lesson 6.2 — `CLAUDE.md`: persistent project context (~30 min)

The agentic equivalent of Cursor's `.cursorrules` (Module 5) — and the same Module 2 principle: context = quality. `CLAUDE.md` is a file the agent reads at the start of every session. Generate a starter with `/init`, then edit it:

```
# CLAUDE.md
This is a Next.js (App Router) + TypeScript + Tailwind app: an invoice tracker.
Data is mock/in-memory for now (Supabase comes in Module 8).
Use server components by default; keep components small and typed.
Follow the existing patterns in app/clients for new features.
```

Pointing the agent at existing code (`app/clients`) makes new features match what you built. Maintain `CLAUDE.md` as the project grows — it's the memory that keeps the agent consistent.

> **Cross-tool note (`AGENTS.md`):** `CLAUDE.md` is Claude Code's file; `.cursorrules` (Module 5) is Cursor's. There's also a vendor-neutral standard, **`AGENTS.md`**, that many tools read (create-next-app scaffolds both). Keep them consistent, or treat `AGENTS.md` as the shared source.

[SCREENSHOT: a CLAUDE.md file showing project conventions]

---

### Quick Tip: Reading Screenshots in Claude Code

**When you need to show Claude Code a screenshot** (e.g., a broken UI to debug, a design to match), use the **Read tool**:

```
Claude, use the Read tool to look at /path/to/screenshot.png
```

Claude Code runs in the terminal and doesn't automatically see image files the way web chat does. The Read tool explicitly loads the screenshot so the agent can analyze it visually. This works for:
- Error overlays or browser screenshots (Module 9 debugging)
- UI designs you want to match (Module 7 styling)
- Any visual reference you want the agent to see

---

## Lesson 6.3 — Plan mode: propose before doing (~45 min)

The single most important agentic habit for beginners. Before a big change, use plan mode (press **Shift+Tab** to cycle into plan mode) so the agent proposes an approach *before* editing anything. You review, correct, then let it execute — preventing the classic failure where the agent confidently does the wrong thing across ten files.

**Flow:** describe the goal → agent returns a plan (files it will create/change, in order) → you check it against your intent and the Module 4 build order → approve or refine (Module 3's critique-and-refine, applied to a plan) → agent executes.

[SCREENSHOT: Claude Code in plan mode listing proposed steps before making changes]

**Key skill:** When the agent returns a plan, your job is to **critique and refine it** (using Module 3's skills), not just approve it. The plan won't always be perfect on first try — and learning to steer the plan is where the real skill lives. Don't accept the first plan; push back, ask for changes, refine it until it matches your intent.

---

## Lesson 6.4 — Orchestrate a multi-file build end to end (~90 min)

Build the **invoices** feature agentically — it spans several files, where agentic flow shines.

**Step 1 — State the goal** (feature-level five-ingredient prompt): "Add an invoices feature. Create an `Invoice` type (id, clientId, amount, dueDate, status). Add a page at `app/invoices` that lists invoices in a Tailwind table, and a form to create one referencing an existing client. Use mock data and follow the patterns in `app/clients`."

**Step 2 — Enter plan mode** (Shift+Tab) so the agent proposes before touching files, then review the plan.

**Step 3 — Let it execute**, then review the diff across files. Run `npm run dev` and confirm `/invoices` works.

**Step 4 — Iterate** with follow-ups. The habit is unchanged: **goal → plan → execute → verify → next.**

### A worked round-trip

Here is one complete pass so you can see what "goal → plan → execute → verify" actually looks like in the terminal.

**You (after pressing Shift+Tab to enter plan mode):**
```
Add an invoices feature. Create an Invoice type (id, clientId, amount,
dueDate, status). Add a page at app/invoices that lists invoices in a
Tailwind table, plus a form to create one referencing an existing client.
Mock data only; follow the patterns in app/clients.
```

**Claude Code (plan mode — proposes, does not edit yet):**
```
Plan:
1. lib/types.ts      — add `Invoice` type (id, clientId, amount, dueDate, status)
2. lib/invoices.ts   — mock array + getInvoices()/addInvoice(), mirroring lib/clients.ts
3. app/invoices/page.tsx        — server component: Tailwind table of invoices
4. app/invoices/new/page.tsx    — create form; client dropdown reads getClients()

Follows app/clients conventions (server components, typed helpers). Proceed?
```

You read the plan against the Module 4 build order — invoices depend on clients, and the dropdown correctly reuses `getClients()`. Approve.

**Claude Code (executes, then summarizes the diff):**
```
Created lib/types.ts        (+7)
Created lib/invoices.ts     (+24)
Created app/invoices/page.tsx      (+38)
Created app/invoices/new/page.tsx  (+52)
4 files changed, 121 insertions
```

**You verify:**
```bash
npm run dev
# visit http://localhost:3008/invoices  → table renders the mock rows
# visit /invoices/new → the client dropdown is populated from getClients()
```

Reviewing the diff, you notice the form doesn't validate `amount`. One follow-up — "Reject a non-positive amount in the create form" — and the loop repeats. That is the whole payoff vs. Module 5: you described one feature and the agent handled the whole set of files.

[SCREENSHOT: the terminal showing the multi-file diff for the invoices feature]

---

## Lesson 6.5 — Directing and reviewing safely (~45 min)

Two habits:

- **Direct with a written plan.** Clear goal and constraints → better plan. Reuse `CLAUDE.md` so you don't repeat context.
- **Review every diff before accepting.** The agent shows what it changed — read it. You own every line, even the ones an agent wrote (Module 2). Never blind-accept a multi-file change.

**Permissions:** Claude Code asks before sensitive actions (running commands, editing files); control the rules with `/permissions`. For beginners, keep approvals on. Useful: `/context` (see the window) and `/compact` (summarize a long session so the agent doesn't lose earlier detail — the Module 2 "lost detail" risk).

[SCREENSHOT: a Claude Code permission prompt]

---

## Lesson 6.6 — Cursor vs. Claude Code: which for which task (~45 min)

Not competitors — complementary; skilled builders use both.

| Reach for… | When the task is… | Examples |
| --- | --- | --- |
| **Cursor** (in-editor) | Focused, local, watch each edit | Tweak a component, fix one function, style a page |
| **Claude Code** (agentic) | Large, multi-file, or repetitive | Add a whole feature, rename a concept everywhere, big refactor |

**Rule of thumb:** small/local → in-editor; large/cross-cutting → agentic. Many run both (the 2026 solo stack is Cursor + Claude Code). **Alternatives:** Codex CLI, Copilot agent mode, open-source Cline/Continue — the skill (goal → plan → review) transfers; Claude Code is the default for its repo-wide performance and terminal-native fit.

---

## Lesson 6.7 — Advanced terminal techniques: context, screenshots & voice (~60 min)

Power-user habits that make agentic development more efficient and accessible.

### Terminal navigation: controlling long sessions

When working on a complex feature or debugging across many files, Claude Code sessions grow large. A few commands help you navigate context:

**`/compact` — summarize the session.** After many back-and-forth exchanges (typically 20+ messages), run `/compact`. Claude Code summarizes the conversation so far into a concise context summary, preventing early information from being lost as new exchanges push older details out of the context window. Useful when:
- Returning to a long debugging session the next day
- Preventing the agent from "forgetting" early design decisions

**`/rewind` — go back in the conversation.** If Claude Code took a wrong turn a few steps ago, `/rewind` (or double-press **Esc**) lets you backtrack to a known-good point and retry. This beats deleting files and restarting; you keep the project state but steer differently.

**`/context` — check project state without prompting.** To see what's in your project context (what `CLAUDE.md` says, what files the agent can see), run `/context`. It prints the current context-window state — useful before a big change to confirm the agent knows about all relevant files.

**`claude --resume` — pick up from a past session.** If you close Claude Code and want to resume a past conversation (not start fresh), run:

```bash
claude --resume
```

This loads your prior conversation state so you don't lose continuity — useful for long-running features or when the terminal crashes.

### Using screenshots to inform prompts

Visual context is often faster than prose. Common workflows:

- **Showing a bug.** Instead of writing *"the login form validation isn't working — I filled in the email but no error appeared,"* take a screenshot of what you see and say *"Here's what I see [screenshot]. The validation isn't triggering. Fix it."* Claude Code can see the UI state and often diagnoses the problem faster.
- **Comparing designs.** Screenshot the current version and the desired new version, then ask *"Here's the current dashboard [old]. I want it to look like this [new]. Update the styling and layout."* Visual comparisons reduce ambiguity.
- **Copying a reference pattern.** Found a pattern you like in another app? Screenshot it and ask *"Here's a checkout flow I like [screenshot]. Adapt this pattern to my payment form."* Instead of describing the pattern in words, show it.

**How to provide screenshots:** use your OS screenshot tool (macOS: Cmd+Shift+4, Windows: Win+Shift+S, Linux: Print Screen), then load it with the Read tool (see the Quick Tip above) or paste it into the terminal.

### Talk-to-text: voice as a primary input

For learners with RSI or dyslexia — or anyone who prefers speaking — voice input turns speech into text you feed straight into Claude Code. It's not only an accessibility aid; skilled developers use voice as a **primary input modality** for faster iteration.

**Why voice speeds iteration:**
1. **Speaking is faster than typing** for most people (~150 WPM speaking vs. ~60 WPM typing).
2. **Natural language flows better** when spoken — "add a button that does X" comes out in one breath.
3. **Talking reinforces thinking** — explaining a goal out loud often clarifies it before you hit Enter.
4. **No context switch** — you stay in the flow of your app instead of flipping between terminal and editor.

**Tools:**
- **SuperWhisper** (macOS/Windows, ~$10) — set a hotkey (e.g., Option+Space), speak, and it types the transcription wherever your cursor is. Install from www.superwhisper.com, set the hotkey, test with "add a login form," then use it in Claude Code: hotkey → speak → text appears in the terminal → hit Enter.
- **Spokenly** (native macOS app) — click to record, it transcribes, paste the text into Claude Code.

**The voice-first loop** replaces `type prompt → wait → read → retype` with `speak goal → agent shows result → speak refinement → watch it change`.

Example voice-driven session:

```
You: (Option+Space) "Add an invoices list page at /invoices with a table of
     all invoices and a create button."
Claude Code: "Here's the plan:
  - Create app/invoices/page.tsx
  - Add Invoice type to lib/types.ts
  - Mock data in lib/invoices.ts
  - Table showing id, date, amount, status"
You: (Option+Space) "Looks good. Execute and add a filter by status."
Claude Code: [executes, then proposes the filter]
```

**Combining voice + screenshots** is the fastest feedback path: run the app, screenshot the current UI, then dictate the change — *"Here's the current UI [screenshot]. Make the buttons bigger, add spacing between fields, and change the submit color to blue. Do it."* Paste both the screenshot and the transcript into Claude Code.

**When to switch back to typing:**
- Describing exact error messages or code patterns (voice mis-transcribes them)
- Copying code from documentation (paste, don't dictate)
- Quiet environments where speaking would disturb others

---

## Hands-on activity (~60 min, folded in)

**"Ship the invoices feature agentically."** Using Claude Code with a maintained `CLAUDE.md`, add the invoices feature: (1) use plan mode and refine the plan at least once, (2) let the agent execute a multi-file change, (3) review the diff before accepting. Deliverable: a running `/invoices` page tied to clients. Then write one sentence on which task you'd have done in Cursor instead, and why.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Orchestrate:** submit the goal prompt and a screenshot of the multi-file result for a feature you built.

**Objective 2 — Direct & review:** show a plan the agent proposed, your refinement, and one thing you caught reviewing the diff.

**Objective 3 — Choose the workflow:** for four tasks (rename `Client` to `Customer` everywhere; adjust one button's color; add a settings page; fix a heading typo), label each Cursor or Claude Code and justify in one line.

*Pass mark: 80% and a working agentic feature submitted.*

---

## Tools & alternatives (this module)

Default: **Claude Code** on the **Next.js** app. Alternatives compared in Lesson 6.6 (Codex CLI, Copilot agent mode, Cline/Continue). These pair with, not replace, the in-editor tool from Module 5 — real workflows use both.

---

## Key takeaways

- Agentic flow means describing a *goal*; the agent plans and edits across the repo. You move up to intent + review.
- `CLAUDE.md` is persistent project context (the agentic `.cursorrules`; `AGENTS.md` is the cross-tool equivalent).
- Always plan before executing a big change (Shift+Tab to enter plan mode); refine the plan, then let it run.
- Review every diff and keep permissions on — you own every line.
- Small/local → Cursor; large/cross-cutting → Claude Code. Use both.
- Manage long sessions with `/compact`, `/rewind` (or double-Esc), and `/context`; resume past work with `claude --resume`.
- Screenshots and voice (SuperWhisper, Spokenly) reduce ambiguity and keyboard strain — combine them for accessible, efficient prompting.
