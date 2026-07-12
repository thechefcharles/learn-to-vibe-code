# Module 4: Building Apps in Cursor (In-Editor Flow)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~6 contact hours (0.6 CEU)

**Prerequisites:** Modules 1–3. Learners arrive with a spec and an ordered build plan (Module 3) and know how to write and decompose prompts (Module 2).

> The first hands-on build module and the workhorse of the course. Learners install real tools and ship a real feature. The running example is the **invoice tracker** planned in Module 3; here we build the first slice — managing clients — as UI only, on mock data. The app gets styled in Module 6 and wired to a real database in Module 7, so this module stays focused on the editor workflow.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* — capture from a live Cursor session (Cursor's own desktop UI is manual; the rendered app pages are auto-capturable from the reference app).
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

---

**[SCREENSHOT PLACEHOLDER: Next.js Starter Page]**

**What this screenshot should show:**
- Browser window at http://localhost:3000
- Default Next.js starter page visible (logo, "Get started by editing..." text, links to documentation)
- Proof that Node, npm, and Cursor are all working together
- No errors in the page or terminal visible

---

> **Instructor note:** Get everyone to a running [localhost](http://localhost) before moving on — setup failures here derail the module.
> 

---

## Lesson 4.2 — The four ways to work with Cursor (~60 min)

- **Tab (autocomplete)** — predicts your next edit; press Tab to accept. Best for small in-flow completions.
- **Cmd+K (inline edit)** — select a block, describe a change in plain English, get a color-coded diff to accept/reject. Best for focused edits.
- **Cmd+L (chat)** — a sidebar chat that understands your indexed project. Best for questions and planning.
- **Cmd+I (Composer / Agent)** — describe a larger change. **Composer** makes a multi-file edit in one pass; **Agent** goes further — it runs commands, reads the output, and fixes errors until it works. Best for multi-file features and open-ended tasks (Lesson 4.5).

**Mental model:** Tab for keystrokes, Cmd+K for a block, Chat for thinking, Composer for a whole feature.

---

**[SCREENSHOT PLACEHOLDER: Cmd+K Inline Edit Diff]**

**What this screenshot should show:**
- A code block is selected in Cursor editor
- The Cmd+K dialog is open with a prompt (e.g., "Add error handling and return type annotation")
- Below the prompt: a unified diff showing:
  - Red lines (removed code)
  - Green lines (added code)
  - Accept button (checkmark)
  - Reject button (X)
- Shows the diff clearly so user can review before accepting
- Proves: Cmd+K shows changes visually before applying them

---

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

---

**[SCREENSHOT PLACEHOLDER: @-Mention Menu]**

**What this screenshot should show:**
- Cursor chat panel is open (Cmd+L)
- User has typed "@" in the chat input
- A dropdown menu appears showing options:
  - @filename (specific file suggestions like `app/layout.tsx`, `lib/utils.ts`)
  - @folder (folder suggestions like `app/`, `lib/`, `components/`)
  - @Docs (link to documentation)
  - @Web (web search)
- One mention is being selected/highlighted
- Shows: how @-mentions let you pin specific context without typing full paths

---

> **Cross-tool note ([AGENTS.md](http://AGENTS.md)):** `.cursorrules` is Cursor's file; there's also an emerging vendor-neutral convention, **`AGENTS.md`**, that many AI tools read (create-next-app now scaffolds one). Same idea, different filename per tool. You'll meet Claude Code's counterpart, `CLAUDE.md`, in Module 5.
> 

---

## Lesson 4.4 — Build a feature end to end with full-feature prompts (~90 min)

This delivers Objective 1. Follow the Module 3 plan for the "clients" slice: a type, a list view, a create form. Mock data now; wired to Supabase in Module 7.

### The automation-first approach: one full-feature prompt

Instead of building incrementally (define type → build list → add form), **use Cursor's Composer (Cmd+I) to build the entire feature in one prompt:**

**Step 1 — Reference your plan.** In Cursor, open your `spec.md` and `build-order.md` from Module 3. You'll paste these as context.

**Step 2 — Open Composer** (Cmd+I) and write a comprehensive feature prompt:

```
Based on this spec and build order:
[PASTE YOUR MODULE 3 SPEC AND BUILD PLAN]

Build the complete "clients" slice for an invoice tracker:

1. Create a `types/client.ts` file with a Client type (id, name, email)
2. Build a server component at `app/clients/page.tsx` that:
   - Displays a list of mock clients in a clean Tailwind table
   - Shows columns: Name, Email, and Action (Edit/Delete buttons for later)
   - Uses semantic HTML for accessibility
3. Build a client component at `app/components/ClientForm.tsx` that:
   - Provides inputs for name and email
   - Validates that both fields are required
   - Includes a "Create Client" button
   - Shows form errors if validation fails
4. Add a route that renders the form below the list (or in a modal)
5. Wire the form to add clients to the mock array (client-side for now)
6. Verify the table re-renders when a new client is added

Use Tailwind for styling. Keep components small and typed. 
Add comments where the logic isn't obvious.
Reference @types/client.ts when importing.

This is the foundational feature for the invoice tracker — get it solid.
```

**Step 3 — Review the unified diff.** Composer will show all files it's creating/modifying in one diff. Step through file by file:
- Does the type match your spec?
- Is the table styled well and accessible?
- Is the form validation solid?
- Are imports correct?

**Step 4 — Accept the diff.** After review, accept it all at once (don't blind-accept; actually read the code).

**Step 5 — Test locally.**

```bash
npm run dev
# Visit http://localhost:3000/clients
# Try adding a client and verify the table updates
```

**Step 6 — Fix what's off.** If something doesn't work:
- Read the error (Module 8 skill)
- Use Cmd+K on the specific block to fix (e.g., "This import path is wrong, fix it")
- Re-test

**Why full-feature prompts over incremental edits?**

- **Coherence:** Composer builds the feature once, so components fit together naturally
- **Fewer round-trips:** one prompt → one unified diff → done, vs. five small prompts
- **Spec-driven:** you're building exactly what you planned, not improvising
- **Verification:** stepping through one diff is easier than reviewing five small changes

---

**[SCREENSHOT PLACEHOLDER: /Clients Page with Table]**

**What this screenshot should show:**
- Browser at http://localhost:3000/clients
- A Tailwind-styled table is visible with:
  - Header row: "Name" and "Email" columns
  - 3–5 sample rows with mock client data (e.g., "Acme Corp", "acme@example.com")
  - A form below or to the side with "Create Client" button
  - Clean, readable styling
- Proof that the full feature works end-to-end from one Composer prompt

---

---

## Lesson 4.5 — Multi-file editing with Composer (~45 min)

This delivers Objective 2. Real features touch multiple files. Composer (Cmd+I) handles it: describe the change, it edits every relevant file and shows one unified diff.

**Worked example:** "Add a nav link to `/clients` in the site header, create the header component if it doesn't exist, and include it in the root layout." Add `@` context (e.g. `@app/layout.tsx`). **Step through the diff file by file** and accept deliberately — never blind-accept.

---

**[SCREENSHOT PLACEHOLDER: Composer Unified Diff (Multi-File)]**

**What this screenshot should show:**
- Composer panel is open (after pressing Cmd+I and entering a multi-file prompt)
- A unified diff displays changes across multiple files:
  - File 1: `app/components/Header.tsx` (created or modified)
    - Shows new `<nav>` with link to `/clients`
  - File 2: `app/layout.tsx` (modified)
    - Shows `<Header />` component imported and rendered
- Red lines (removed), green lines (added)
- Accept/Reject buttons at the bottom
- Shows: Composer groups changes across files into one coherent diff
- Proves: step-through-the-diff workflow prevents blind-accepting

---

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

## Lesson 4.7 — Pause and Reflect: Cursor vs. Claude Code (~30 min)

You've spent ~3 hours in Cursor (Modules 4). You're about to enter Claude Code (Module 5). Before you do, reflect: which tool for which task?

### Decision Tree

**Is the change local and focused?** (e.g., "fix this component", "update this test")
→ Use Cursor. Fast feedback loop, easy to verify each small change.

**Is the change multi-file and cross-cutting?** (e.g., "add a new feature across 5 files", "refactor the auth layer")
→ Use Claude Code. Orchestrates multiple files, reviews the full diff.

**Do you need to see the code changing in real-time?**
→ Use Cursor. You watch autocomplete suggest lines, accept/reject in-editor.

**Do you prefer to describe the goal and see the full result?**
→ Use Claude Code. You prompt "build X", it builds, you review the diff.

**Are you debugging and need to iterate fast?**
→ Use Cursor. Quick tests, quick fixes, quick feedback.

**Are you on a feature branch with a complex sequence of steps?**
→ Use Claude Code. It can manage the full sequence, write commit messages, show you the diff.

### The Real Answer

Use both. Most projects need both:
- Cursor for tweaks and quick fixes
- Claude Code for features and orchestration

The skill is knowing when to switch. Don't spend 30 minutes in Cursor when Claude Code could do it in 5. Don't spend 30 minutes in Claude Code when a quick Cursor fix is simpler.

### Practice: Redo Module 4 in Claude Code

Pick one of the Module 4 tasks (e.g., "style the clients page") and redo it in Claude Code. Compare:
- How long did each take?
- Which felt more natural to you?
- Did you prefer seeing the changes in-editor (Cursor) or reviewing diffs (Claude Code)?

Your preference + the task characteristics should guide your choice going forward.

### Knowledge Check

**Q4-7:** "You need to fix a typo in one component and add error states to five components. What's your strategy?"

a) Use Cursor for both—it's simpler
b) Use Claude Code for both—it's faster
c) Use Cursor for the typo (focused), Claude Code for the error states (multi-file)
d) Ask a teammate

**Correct:** c) — Match the tool to the scope. Local = Cursor. Cross-cutting = Claude Code.

---

## Hands-on activity (~60 min, folded in)

**"Ship the clients feature."** Build the invoice tracker's clients slice using Cursor's editing modes and multi-file workflow.

### Step-by-step instructions:

1. **Create `.cursorrules`** at the project root:
   ```
   # .cursorrules
   This is a Next.js App Router + TypeScript + Tailwind app.
   Use server components by default.
   Components go in app/components/.
   Mock data in lib/mockData.ts.
   Keep components small and focused.
   ```

2. **Define the Client type** (use Cmd+L to ask: "Create a Client type in types/client.ts with fields: id, name, email")

3. **Build the list page** (use Cmd+L with `@types/client.ts` context):
   ```
   Create a server component at app/clients/page.tsx that:
   - Imports the Client type
   - Creates a mock array of 5 clients
   - Renders them in a Tailwind table
   - Shows name and email columns
   ```

4. **Add a create form** (use Cmd+K inline edit on a selected component block):
   - Select a placeholder `{/* form goes here */}` comment
   - Cmd+K: "Add a form with name and email inputs, basic validation, a submit button"
   - Review the diff and accept

5. **Use Composer for multi-file header** (Cmd+I):
   ```
   Add a header with a nav link to /clients.
   Create a Header component in app/components/Header.tsx.
   Import and render it in app/layout.tsx.
   ```

6. **Test everything:**
   - `npm run dev` and visit http://localhost:3000/clients
   - Verify the table shows mock clients
   - Verify the form validates input (try submitting empty)
   - Verify the nav link is in the header

### Submission:
- Provide a screenshot or recording of the /clients page showing the working list + form
- Paste the prompts you used for steps 2, 3, 4, 5
- In 2 sentences, explain which Cursor mode (Tab, Cmd+K, Chat, Composer) was most useful and why

---

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q4-1:** Which Cursor mode is best for a change spanning multiple files?
- (a) Tab
- (b) Cmd+K inline edit
- (c) **Composer/Agent** ✓
- (d) find-and-replace

*Why:* Composer/Agent mode handles multi-file changes and cross-file context. Cmd+K is for single blocks; Tab is autocomplete; find-and-replace is a last resort.

**Q4-2:** What does a project rules file (e.g. `AGENTS.md`) do?
- (a) Formats code
- (b) **Injects persistent project context into every AI interaction** ✓
- (c) Deploys the app
- (d) Runs tests

*Why:* Rules files become system prompts for the AI, setting project norms and conventions. This is exactly the `.cursorrules` pattern from Lesson 4.3.

**Q4-3:** `@`-mentions are used to:
- (a) Tag teammates
- (b) **Pin specific context (files/docs/web) into the model's window** ✓
- (c) Comment code
- (d) Undo changes

*Why:* @-mentions let you include specific files or web pages as context for the AI, reducing the need to repeat yourself.

**Q4-4:** You're building a React list component that fetches data from an API. Which Cursor mode is best?
- (a) Tab autocomplete (just keep typing)
- (b) Cmd+K inline edit (describe changes to a block)
- (c) Cmd+L chat (ask questions about the code)
- (d) **Cmd+I Composer (build the whole component)** ✓

*Why:* Composer (Cmd+I) is best for building a complete feature—it orchestrates the component, imports, and wiring together. This is a feature-level task, not an edit.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Build a working feature (Quiz Q4-4):**
- Q4-4: "You're building a React list component that fetches from an API. Which mode is best?" ✅ Tests feature-building judgment
- *Practical check:* Screenshot of the working /clients page (table + form) + the Cursor chat/Composer prompts you used

**Objective 2 — Multi-file editing & context (Quiz Q4-1, Q4-2, Q4-3):**
- Q4-1: "Which mode is best for multi-file changes?" ✅ Tests Composer knowledge
- Q4-2: "What does `AGENTS.md` do?" ✅ Tests context/rules understanding
- Q4-3: "`@`-mentions are used to:" ✅ Tests context-pinning knowledge
- *Practical check:* Describe a Composer change spanning 2+ files. Example:
  - "I used Composer to add a sidebar to the layout. It created `app/components/Sidebar.tsx`, imported it in `app/layout.tsx`, and styled both with Tailwind. I reviewed the diff file-by-file before accepting."

**Objective 3 — Compare alternatives (Lesson 4.6 knowledge):**
- *Practical check:* For a scenario—"Your team standardizes on VS Code for backend. You're joining to build a frontend. Which editor?"—write a 3-sentence recommendation (Cursor, VS Code + Copilot, or Zed) with trade-offs.
  - **SAMPLE ANSWER:** "I'd recommend VS Code + Copilot for consistency with the backend team—no editor switching tax. Trade-off: Copilot's autocomplete is more limited than Cursor's Composer for multi-file refactors. However, if full-stack AI coding matters more than team standardization, Cursor's superior context-handling wins."

---

**Scenario-based judgment checks:**

For each, decide which Cursor mode fits best and explain in one sentence why:

- (a) You need to refactor a function signature across 8 files. Tab? Cmd+K? Chat? Composer?
- (b) You're unsure how your auth library works. What mode would you use to ask?
- (c) You notice a typo in a variable name on the current screen. Tab or Cmd+K?
- (d) A feature works but feels slow. Which mode to investigate why?

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