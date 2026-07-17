# Module 6: Building Apps in Claude Code (Agentic)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Module 5. Learners have a running Next.js invoice-tracker with the clients feature (mock data) and know the in-editor (Cursor) workflow.

> Module 5 taught in-editor flow — you drive, the AI assists edit-by-edit. This module teaches the *agentic* flow — you describe a goal and an agent plans and executes across the whole repo from the terminal. Same skills (context, prompting, verification), bigger unit of work. The example advances: learners add the **invoices** feature (which depends on clients, per the Module 4 build order), still on mock data. The app gets styled in Module 7 and wired to Supabase in Module 8.
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
4. **Leverage** advanced terminal commands and visual workflows to optimize agentic development. *(Apply)*

---

## Lesson 5.1 — Setup & the agentic mindset (~45 min)

**Step 1 — Install Claude Code** and sign in; open your terminal in the `invoice-tracker` folder from Module 5.

**Step 2 — Start it** by running `claude`. You now have an agent that can read your whole repo, propose changes, run commands, and edit files — from the terminal.

```bash
cd invoice-tracker
claude
```

*[SCREENSHOT: the Claude Code welcome prompt in the terminal.]*

**The mindset shift:** in Cursor you think in *edits*; in Claude Code you think in *goals*. Instead of "change this line," you say "add an invoices feature that lists and creates invoices tied to clients." The agent figures out which files to touch. Your job moves up a level: describe intent clearly, then review what it did.

---

## Lesson 5.2 — [CLAUDE.md](http://CLAUDE.md): persistent project context (~30 min)

The agentic equivalent of Cursor's `.cursorrules` (Module 5) — and the same Module 2 principle: context = quality. `CLAUDE.md` is a file the agent reads at the start of every session. Generate a starter with `/init`, then edit it:

```
# CLAUDE.md
This is a Next.js (App Router) + TypeScript + Tailwind app: an invoice tracker.
Data is mock/in-memory for now (Supabase comes in Module 8).
Use server components by default; keep components small and typed.
Follow the existing patterns in app/clients for new features.
```

Pointing the agent at existing code (`app/clients`) makes new features match what you built. Maintain [CLAUDE.md](http://CLAUDE.md) as the project grows — it's the memory that keeps the agent consistent.

> **Cross-tool note ([AGENTS.md](http://AGENTS.md)):** `CLAUDE.md` is Claude Code's file; `.cursorrules` (Module 5) is Cursor's. There's also a vendor-neutral standard, **`AGENTS.md`**, that many tools read (create-next-app scaffolds both). Keep them consistent, or treat `AGENTS.md` as the shared source.
> 

*[SCREENSHOT: a [CLAUDE.md](http://CLAUDE.md) file showing project conventions.]*

---

## Lesson 5.3 — Plan mode: propose before doing (~45 min)

The single most important agentic habit for beginners. Before a big change, use plan mode (`/plan`) so the agent proposes an approach *before* editing anything. You review, correct, then let it execute — preventing the classic failure where the agent confidently does the wrong thing across ten files.

**Flow:** describe the goal → agent returns a plan (files it will create/change, in order) → you check it against your intent and the Module 4 build order → approve or refine (Module 3's critique-and-refine, applied to a plan) → agent executes.

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

The payoff vs. Module 5: you described one feature and the agent handled the whole set of files.

---

## Lesson 5.5 — Directing and reviewing safely (~45 min)

This delivers Objective 2. Two habits:

- **Direct with a written plan.** Clear goal and constraints → better plan. Reuse [CLAUDE.md](http://CLAUDE.md) so you don't repeat context.
- **Review every diff before accepting.** The agent shows what it changed — read it. You own every line, even the ones an agent wrote (Module 2). Never blind-accept a multi-file change.

**Permissions:** Claude Code asks before sensitive actions (running commands, editing files); control the rules with `/permissions`. For beginners, keep approvals on. Useful: `/context` (see the window) and `/compact` (summarize a long session so the agent doesn't lose earlier detail — the Module 2 "lost detail" risk).

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

Default: **Claude Code** on the **Next.js** app. Alternatives compared in Lesson 5.6 (Codex CLI, Copilot agent mode, Cline/Continue). These pair with, not replace, the in-editor tool from Module 5 — real workflows use both.

---

## Key takeaways

- Agentic flow means describing a *goal*; the agent plans and edits across the repo. You move up to intent + review.
- `CLAUDE.md` is persistent project context (the agentic `.cursorrules`; `AGENTS.md` is the cross-tool equivalent).
- Always plan before executing a big change; refine the plan, then let it run.
- Review every diff and keep permissions on — you own every line.
- Small/local → Cursor; large/cross-cutting → Claude Code. Use both.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)
---

## Lesson 5.7 — Advanced terminal techniques: Context, screenshots & accessibility (~45 min)

This lesson covers three power-user habits that make agentic development more efficient and accessible.

### Terminal Navigation: Controlling Long Sessions

When working on a complex feature or debugging across many files, Claude Code sessions grow large. Two commands help you navigate context:

**`/compact` — Summarize the session**

After many back-and-forth exchanges (typically 20+ messages), run `/compact`. Claude Code summarizes the conversation so far into a concise context summary. This prevents early information from being lost as new exchanges push older details out of the context window. Useful when:
- Returning to a long debugging session the next day
- Passing a complex project state to a colleague (they run `/compact` and get a summary)
- Preventing the agent from "forgetting" early design decisions

Example:
```bash
/compact
```

The agent returns a summary; subsequent prompts use this summary instead of re-reading all prior messages.

**`/rewind` — Go back in the conversation**

If Claude Code took a wrong turn three steps ago, `/rewind` lets you backtrack to a known-good point and retry. Example:

```bash
/rewind 3
# Claude Code reverts to 3 exchanges ago
# Now you can prompt a different direction
```

This beats deleting files and restarting; you keep the project state but steer differently.

**`claude-c` — Check project state without prompting**

If you just want to see what's in your project context (what CLAUDE.md says, what files the agent can see), use:

```bash
claude-c
```

It prints the current context window state — useful before a big change to confirm the agent knows about all relevant files.

**`claude --resume` — Pick up from a past session**

If you close Claude Code and want to resume a past conversation (not start fresh), use:

```bash
claude --resume session-id
```

This loads your prior conversation state so you don't lose continuity. Useful for long-running features or when the terminal crashes.

### Using Screenshots to Inform Prompts

Visual context is often faster than prose. Three workflows:

**Workflow 1 — Showing a bug:**

Instead of writing: *"The login form validation isn't working. I filled in the email but no validation error appeared."*

Take a screenshot of what you see (email filled, no error shown), and say:

*"Here's what I see [screenshot]. The validation isn't triggering. Fix it."*

Claude Code can see the UI state and often diagnoses the problem faster.

**Workflow 2 — Comparing designs:**

If you're redesigning a component, screenshot the old version and the desired new version side-by-side, then ask:

*"Here's the current dashboard [old screenshot]. I want it to look like this [new screenshot]. Update the styling and layout."*

Visual comparisons reduce ambiguity; Claude Code sees exactly what "better" means.

**Workflow 3 — Copying from reference projects:**

Found a cool pattern in another app? Screenshot it and ask:

*"Here's a checkout flow I like [screenshot]. Adapt this pattern to my app's payment form."*

Instead of describing the pattern in words, show it.

**How to provide screenshots:** Use your OS screenshot tool (macOS: Cmd+Shift+4, Windows: Win+Shift+S, Linux: Print Screen), paste into Claude Code's terminal, or use accessibility tools below.

### Talk-to-Text Workflows for Accessibility & Efficiency

For learners with RSI, dyslexia, or anyone who prefers speaking, several tools turn speech into text or describe screenshots:

**SuperWhisper** (macOS/Windows)
- Press a hotkey to record your voice
- It transcribes to text in real-time
- Paste directly into Claude Code
- Example: "Add a login form with email and password fields, store in Supabase"
- SuperWhisper types it automatically

**Spokenly** (Web-based)
- Browser tool; no install
- Click to record, it transcribes
- Copy the text and paste into Claude Code
- Good for remote work (no client-side recording)

**Accessibility workflow:**

1. Open your app in a browser (dev server running)
2. Take a screenshot of the current UI
3. Use SuperWhisper/Spokenly to describe what you want: *"Add a dark mode toggle. Store preference in localStorage. Label should say theme."*
4. Paste both the screenshot and your spoken description into Claude Code
5. Prompt: *"Here's the current UI [screenshot]. Here's what I want [transcribed speech]. Implement it."*

This combines visual + voice input, reducing keyboard strain and making the workflow more natural for neurodiverse learners.

---

## Key takeaways (Lesson 5.7)

- Use `/compact` on long sessions to keep context fresh; `/rewind` to backtrack without restarting.
- `claude-c` shows your current project context; `claude --resume` picks up past conversations.
- Screenshots reduce ambiguity — show bugs, compare designs, copy reference patterns.
- SuperWhisper and Spokenly turn speech into text; combine with screenshots for accessible, efficient prompting.
- These techniques scale agentic development from hobby projects to production teams.

---

## Lesson 5.7b — Advanced voice workflows: Rapid iteration through dictation (~60 min)

This lesson deepens voice-driven development: using voice not just for accessibility, but as the **primary input modality** for faster iteration. Skilled developers use voice + screenshots + transcripts to prototype faster than typing alone.

### The voice-first loop

Instead of:
```
open editor → type prompt → wait for result → read result → type next prompt
```

The voice-first loop is:
```
speak goal → AI hears → shows result → speak refinement → watch it change
```

It's faster because:
1. **Speaking is faster than typing** for most people (150 WPM speaking vs. 60 WPM typing)
2. **Natural language flows better** when spoken — "add a button that does X" vs. typing `"add a button that..." [stop, retype]`
3. **Talking reinforces thinking** — explaining your goal out loud often clarifies it before you hit enter
4. **No context switch** — you stay in the flow of your app, not flipping between terminal and editor

### Tool setup: SuperWhisper as your voice input

SuperWhisper (macOS/Windows, ~$10) is the gold standard for voice-driven development:

1. **Install** from www.superwhisper.com
2. **Set a hotkey** (e.g., Option+Space)
3. **Test:** press Option+Space, speak "add a login form", release. It types the text.
4. **Use in Claude Code:** hotkey → speak → text pastes into your terminal → hit Enter

Example voice-driven session:

```
You: (press Option+Space) "Add an invoices list page at /invoices with a table showing all invoices and a create button."
SuperWhisper: [types] "Add an invoices list page at /invoices with a table showing all invoices and a create button."
You: (hit Enter in claude terminal)
Claude Code: "I'll create this feature. Here's the plan:
  - Create app/invoices/page.tsx
  - Add Invoice type to lib/types.ts
  - Mock data in lib/invoices.ts
  - Table component showing id, date, amount, status"
You: (press Option+Space) "Looks good. Execute and add a filter by status."
SuperWhisper: [types] "Looks good. Execute and add a filter by status."
Claude Code: [executes, then proposes the filter]
```

**No typing.** Just talking.

### Advanced: Combining voice + screenshots for faster feedback

When describing what you want changed, a screenshot + voice description is 10x faster than text alone.

**Workflow:**

1. Run your app locally (npm run dev)
2. Take a screenshot of the current UI (Cmd+Shift+4 on Mac)
3. Speak your goal: "Make the form wider, move the submit button to the right, and add a cancel button."
4. Prompt Claude Code with both: screenshot + transcript
5. Claude Code sees the current state and your spoken goal, generates the change instantly

**Voice prompt template for screenshot feedback:**

```
(press Option+Space)
"Here's the current UI [screenshot]. I want to:
1) Make the buttons at the bottom bigger
2) Add more spacing between the form fields
3) Change the submit button color to blue
Do it."
```

SuperWhisper transcribes. Paste both screenshot and transcript into Claude Code. Done.

### Multi-step voice planning

For complex features, dictate your plan first, then execute:

```
(press Option+Space)
"Here's what I need:
1) A dashboard that shows user stats (posts, followers, total views)
2) Each stat is a card in a grid
3) Below that, a recent posts list with date and preview
4) Add a sidebar navigation
5) Use Supabase for data
Show me a plan first."
```

Claude Code breaks it into steps; you review the plan (or just approve), and it executes the whole thing.

### When voice-driven isn't ideal (and when to switch back)

**Use voice when:**
- Iterating rapidly (tweaking styling, adding features)
- You have clear intent (you know what you want)
- Accessibility (RSI, dyslexia, or learning preference)
- Typing would break your focus (you're watching the app run)

**Switch to typing when:**
- Describing exact error messages or code patterns (voice gets the transcription wrong)
- Copying code from documentation (paste, don't dictate)
- Working with others (open chat, not a voice session)
- In quiet environments where people around you might be distracted

### Hands-on: One feature, entirely by voice

Pick a simple feature (add a page, style a component, change a form). Don't use your keyboard for the prompt—only for hotkey shortcuts (if your tool uses them).

1. Open Claude Code
2. Set up SuperWhisper hotkey
3. Speak your goal (feature goal + 5 ingredients)
4. Speak refinements and approvals
5. Speak `/compact` if the session gets long

Write one sentence: "How much faster was this than typing the same prompts?"

---

