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

## Lesson 4.3 — Prompting in Cursor (~45 min)

Open `app/page.tsx` and delete everything. This is where we'll build.

**Your first prompt in Cursor:**

*"Create a Next.js page component that shows a pet tracker app. It should have a form to add a pet (name, breed, photo URL). Below the form, show a grid of all pets added. Each pet card shows the name, breed, and photo. Add a delete button on each card. Use TypeScript, Tailwind for styling, and store pets in React state (not a database yet). Return only the component code."*

Cursor will suggest the code. Read it. If it looks good, accept it. If something's wrong, ask:

*"The photo input should be a URL text field. Add a button to delete pets that actually removes them from the list."*

This is the in-editor flow: prompt → read → verify → refine.

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

## Lesson 4.6 — Using Composer for Multi-File Changes (~30 min)

For bigger changes that touch multiple files, use **Composer (Cmd+I)** instead of Cmd+K.

**Example:** "Add a header with a nav link to the app. Create a Header component. Import it in the main layout."

Composer will:
1. Create the header component
2. Update the main layout
3. Show you ALL changes in one diff
4. Let you review each file before accepting

**This is powerful** because one prompt can fix multiple files at once. No more "oh, I also need to update this file too."

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

Follow the lessons step by step and build the pet tracker.

### Step-by-step instructions:

**Step 1: Create `.cursorrules`** at the root of your project with:
```
# .cursorrules
This is a Next.js App Router + TypeScript + Tailwind app.
Use server components by default.
Keep components small and focused.
Mock data goes in lib/mockData.ts.
```

**Step 2: Open `app/page.tsx` and clear it.** Use Cmd+L chat to ask:
```
Create a page component for a pet tracker with:
- A form to add a pet (name, breed, photo URL)
- A grid showing all pets
- Each pet card has: photo, name, breed, delete button
Use TypeScript, Tailwind CSS, React state for now (no database yet).
```

**Step 3: Review the code** Cursor generates. Read it carefully. Does it look good?

**Step 4: Test it** — save, look at localhost:3000, try adding a pet.

**Step 5: If something's wrong**, use Cmd+L to ask:
```
The delete button doesn't work. Here's the error: [paste error].
The pet stays in the list. What's wrong?
```

**Step 6: Iterate** — keep refining with Cmd+K and Cmd+L until it works perfectly.

### Submission:
- Screenshot of your working pet tracker showing:
  - The add form visible
  - At least 2 pets in the grid
  - Running at localhost:3000
- List 2 prompts you used (and what they fixed)
- Which Cursor mode (Tab, Cmd+K, Chat, Composer) was most useful?

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
