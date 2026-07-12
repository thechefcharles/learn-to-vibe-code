# Module 4: Building in Cursor (Your First Real Project!) 🚀

**Stage:** Building · **Level:** Beginner/Intermediate · **Duration:** ~6 hours · **XP:** 600

**What you need:** Modules 0-3 (setup, AI fundamentals, prompting, planning)

> **Why this matters:** Now you actually build something real! Cursor is your in-editor AI buddy that helps you write code. This module teaches you the in-editor flow: open a file, describe what you want, the AI edits your code, you verify it works. Welcome to the building phase!

## What You'll Learn

By the end of this module, you'll be able to:

1. **Use Cursor** like a pro (AI in your editor)
2. **Build a real project** using AI-assisted coding
3. **Debug your code** when something breaks

---

## Lesson 4.1 — Cursor: Your In-Editor AI Buddy (~30 min)

Cursor is VS Code + AI built in. It's a code editor that can suggest code, explain code, and fix code right there in the editor.

**Key features:**
- Type your prompt in the Cursor chat (bottom right)
- The AI reads your open file and surrounding context automatically
- It suggests edits directly in the file
- You approve or reject each change

**Different from Claude Code:** Cursor works *within a single file or folder*, while Claude Code works *at a terminal level on the whole project*.

**Four ways to use Cursor:**

| Mode | What you do | Best for |
| --- | --- | --- |
| **Tab** | Type code, AI autocompletes your next line | Small quick completions |
| **Cmd+K** (Mac) or Ctrl+K (Windows) | Select a block, describe a change, get a diff | Fixing one section of code |
| **Cmd+L** (Chat) | Ask the AI questions in a sidebar | Planning, debugging, asking why |
| **Cmd+I** (Composer) | Describe a change that touches many files, AI does them all | Building multi-file features |

**Mental model:** Tab for quick stuff, Cmd+K for one block, Chat for thinking, Composer for whole features.

---

**[SCREENSHOT PLACEHOLDER: Next.js Starter Page]**

**What this screenshot should show:**
- Browser window at http://localhost:3000
- Default Next.js starter page visible (logo, "Get started by editing..." text)
- Proof that Node, npm, and Cursor are all working together
- No errors visible

---

## Lesson 4.2 — Your First Project Setup (~30 min)

Let's build a **Pet Tracker** app (simple, visual, real):

**Features:**
- Add a pet (name, breed, photo)
- View all pets
- Click a pet to see details
- Delete a pet

**Stack:** Next.js, TypeScript, Tailwind CSS, Supabase

**Step 1: Create the project**

```bash
npx create-next-app@latest pet-tracker
```

Choose: App Router, TypeScript, Tailwind, ESLint. Yes to all.

```bash
cd pet-tracker
npm run dev
```

You should see the starter page at localhost:3000. That's your baseline.

---

## Lesson 4.2b — Setting Up Context with .cursorrules (~20 min)

Create a file called `.cursorrules` at the root of your project. This file tells Cursor "remember these rules for every prompt."

```
# .cursorrules
This is a Next.js app using the App Router.
Use TypeScript for all new files.
Use Tailwind CSS for styling.
Keep components small and focused.
```

Now whenever you ask Cursor a question, it reads this file first. No more repeating "I'm using Next.js and TypeScript" every time!

**Pro tip:** `.cursorrules` is like permanent context. It saves you typing.

---

**[SCREENSHOT PLACEHOLDER: Cmd+K Inline Edit]**

**What this screenshot should show:**
- A code block is selected in Cursor
- The Cmd+K dialog is open with a prompt
- Below: a unified diff showing:
  - Red lines (code being removed)
  - Green lines (new code added)
  - Accept button (checkmark)
  - Reject button (X)
- Shows the changes clearly before accepting
- **Proves:** Cmd+K lets you see changes before you accept them ✓

---

## Lesson 4.3 — Full-Feature Prompts with Cursor (~45 min)

Open `app/page.tsx` and delete everything. This is where we'll build.

Instead of asking for pieces one at a time, you'll **write ONE BIG prompt that describes the entire feature**, and Cursor will build it all at once. This is way faster and more organized!

**Your first full-feature prompt in Cursor:**

Open **Composer** (Cmd+I) and paste this:

```
Build a complete pet tracker app with:

1. A Pet type with fields: id, name, breed, photoUrl

2. A page component at app/page.tsx that:
   - Shows a form to add a pet (name input, breed input, photo URL input)
   - Below the form, show a grid of all pets
   - Each pet card displays: photo, name, breed
   - Each pet card has a delete button
   - When you add a pet, it appears in the grid
   - When you delete a pet, it disappears

3. Use TypeScript for types, Tailwind CSS for styling, React state for storing pets (not database yet)

4. Make it look nice and be easy to use.
```

Cursor will generate the entire feature. Read it carefully. Does it look good? If yes, accept it all at once. If something's wrong, ask:

*"The delete button doesn't work. Fix it so pets actually get removed when you click delete."*

This is the power move: one big prompt = one big feature = done! ⚡

---

## Lesson 4.4 — Testing Your Code (~30 min)

After each change:

1. Save the file
2. Look at your app (it hot-reloads)
3. Test it: add a pet, delete a pet, etc.
4. If it breaks, ask Cursor: *"I got this error: [paste error]. Fix it."*

Error messages are your friend. They tell you exactly what's wrong.

---

## Lesson 4.5 — Debugging With AI (~45 min)

Bugs happen. Here's how to use Cursor to fix them:

**The breakdown:** *"The delete button doesn't work. Here's the error: [paste full error]. The pet stays in the list. What's wrong?"*

Cursor reads your code + your error and suggests a fix.

**The key:** Don't say "fix it." Tell Cursor *what went wrong* and *what you expected*.

---

## Lesson 4.5b — Using @-Mentions for Context (~20 min)

In Cursor chat, you can type `@` to pin specific files or folders. Example:

```
@app/page.tsx add a heading to this page
@components make all components export TypeScript interfaces
```

This tells Cursor "here's the exact file I'm talking about" without having to explain the path.

**Pro tip:** Use `@filename` to be super specific. It helps Cursor understand your project better.

---

**[SCREENSHOT PLACEHOLDER: @-Mention Menu in Cursor Chat]**

**What this screenshot should show:**
- Cursor chat panel is open (Cmd+L)
- User typed "@" in the chat input
- A dropdown menu appears showing:
  - File suggestions (app/page.tsx, components/PetCard.tsx, etc.)
  - Folder suggestions (app/, components/, lib/)
- One file is being selected/highlighted
- **Shows:** how @-mentions let you pin specific context 📌

---

---

## Lesson 4.6 — Multi-File Changes with Composer (~30 min)

For bigger changes that touch multiple files, **Composer (Cmd+I) is your power move!**

**Example:** "Add a header component with a nav link to the app. Create Header.tsx, import it in layout.tsx, and make sure the nav link goes to /pets."

Composer will:
1. Create the Header component for you
2. Update the layout to use it
3. Show ALL changes in one unified diff
4. You review everything before accepting

**This is the superpower:** one prompt → multiple files updated → one unified view → accept or reject. No more "oops, I also needed to update this other file!" 💪

**Remember the workflow:**
1. Write a full-feature prompt (it can touch multiple files!)
2. Composer shows you everything that will change
3. Read through the entire diff
4. Accept it all at once
5. Test in your browser

---

**[SCREENSHOT PLACEHOLDER: Composer Multi-File Diff]**

**What this screenshot should show:**
- Composer panel after entering a multi-file prompt
- A unified diff showing changes across 2+ files:
  - File 1: New `app/components/Header.tsx` with nav link
  - File 2: `app/layout.tsx` with Header imported and rendered
- Red lines (removed), green lines (added)
- Clear file separation showing what changes in each
- **Shows:** Composer groups changes across files into one coherent view 📄

---

## Lesson 4.7 — Next Steps: Add a Database (~60 min)

Once your app works in memory (in React state), it's time to save pets permanently.

You'd prompt: *"Connect this component to Supabase. Create a `pets` table with columns: id, name, breed, photoUrl, createdAt. Save pets to Supabase. Load pets on page load. Keep the delete button wired to Supabase delete."*

Cursor would guide you through the changes. This is still Modules 4-5 territory.

---

## Activity: Build the Pet Tracker 🐕

Build the pet tracker using Composer with one full-feature prompt!

### Step-by-step instructions:

**Step 1: Create `.cursorrules`** at the root of your project:
```
# .cursorrules
This is a Next.js App Router + TypeScript + Tailwind app.
Use server components by default.
Keep components small and focused.
Mock data goes in lib/mockData.ts.
```

**Step 2: Open `app/page.tsx`, clear it, and open Composer (Cmd+I).**

**Step 3: Write ONE BIG prompt that builds the entire feature:**
```
Build a complete pet tracker app:

1. Create a Pet type with: id, name, breed, photoUrl

2. Create the page at app/page.tsx that:
   - Shows a form with inputs for name, breed, photo URL
   - Below the form, show all pets in a grid
   - Each pet card shows: photo, name, breed, delete button
   - When you add a pet, it appears in the grid
   - When you delete, the pet disappears from the list

3. Use TypeScript, Tailwind CSS, and React state (no database yet)
4. Make it look nice and easy to use
```

**Step 4: Review the full unified diff** that Cursor generates. Does it look right?

**Step 5: Accept the entire change** and test at localhost:3000.

**Step 6: If something's broken**, ask Cursor with Cmd+K:
```
The delete button doesn't work. Fix it.
```

Then re-test.

### Submission:
- Screenshot of your working pet tracker showing:
  - The add form visible
  - At least 2 pets in the grid
  - Running at localhost:3000
- One full-feature prompt you used
- What was the easiest part? The hardest?

---

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Build with Cursor:**
- **Quiz Q4-k1:** "What's the difference between Cursor and Claude Code?" ✅
- **Quiz Q4-k2:** "Cmd+K is best for..." ✅
- **Written check:** Show your working pet tracker and explain one prompt you used.

**Objective 2 — Use context and @-mentions:**
- **Quiz Q4-k3:** "What should you put in `.cursorrules`?" ✅
- **Written check:** Write a `.cursorrules` file for a Next.js + Tailwind app you're building.

**Objective 3 — Debug and iterate:**
- **Quiz Q4-k4:** "When you get an error, you should..." ✅
- **Written check:** Write a prompt asking Cursor to fix a specific error (include the error message).

**Scenario-based checks:**
- (a) You're building a form. Should you use Cmd+K or Composer? Why?
- (b) You want to add a header component to multiple files. What Cursor mode is best?
- (c) You keep forgetting to tell Cursor your tech stack. What's the solution?
- (d) Cursor's suggestion looks wrong. What should you do before accepting it?

---

## Tools & Alternatives (This Module)

**Cursor is the default**, but there are alternatives:

| Tool | Best when |
| --- | --- |
| **Cursor** (what we use) | You want the most integrated AI in your editor |
| VS Code + GitHub Copilot | You won't switch editors / team uses VS Code |
| Zed | You want a fast editor |

The skills (prompting, testing, debugging) work in all of them. You're learning the *technique*, not just the tool.

---

## Key Takeaways

- Cursor is AI in your editor — use all four modes (Tab, Cmd+K, Chat, Composer) 💻
- Set up `.cursorrules` once, save yourself from repeating context
- The flow: prompt → read → test → refine
- Use Cmd+K for one block, Composer for multi-file changes
- Test after every change; use errors to debug
- You build incrementally, one verified step at a time

**Next:** Module 5 — Building in Claude Code (The Agentic Flow!)
