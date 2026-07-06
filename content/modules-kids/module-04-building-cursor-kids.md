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

## Lesson 4.6 — Next Steps: Add a Database (~60 min)

Once your app works in memory (in React state), it's time to save pets permanently.

You'd prompt: *"Connect this component to Supabase. Create a `pets` table with columns: id, name, breed, photoUrl, createdAt. Save pets to Supabase. Load pets on page load. Keep the delete button wired to Supabase delete."*

Cursor would guide you through the changes. This is still Modules 4-5 territory.

---

## Activity: Build the Pet Tracker 🐕

Follow the lessons and build the pet tracker. Submit a screenshot of your working app showing:
- The form
- At least 2 pets in the list
- The page running at localhost:3000

---

## Knowledge Check (Quiz)

1. **What's the difference between Cursor and Claude Code?**
2. **Write a prompt for Cursor to add a "favorite" button to each pet.**
3. **You get an error. Write a prompt asking Cursor to fix it (include the error message).**

---

## Key Takeaways

- Cursor is AI in your editor 💻
- The flow: prompt → read → test → refine
- Test after every change
- Use error messages to debug
- You build incrementally, not all at once

**Next:** Module 5 — Building in Claude Code (The Agentic Flow!)
