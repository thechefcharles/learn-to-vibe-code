# Module 14: Working in Existing Codebases 🏗️

**Stage:** Advanced · **Level:** Advanced · **Duration:** ~4 hours · **XP:** 400

**What you need:** Modules 0-13

> **Why this matters:** In the real world, you rarely start from scratch. You inherit existing code, fix bugs, add features. This is "brownfield" work. Learn to navigate someone else's (or past you's) codebase.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Navigate an existing codebase**
2. **Find where to make changes**
3. **Add features without breaking things**
4. **Ask AI to understand foreign code**

---

## Lesson 14.1 — Understanding Someone Else's Code (~45 min)

Reading existing code is hard. Start by:

1. **Find the entry point** — what runs first? (Usually `index.tsx` or `app.tsx`)
2. **Trace the flow** — follow the data/logic through the app
3. **Identify patterns** — how does this codebase organize things?
4. **Ask the AI** — *"Explain the architecture of this codebase. Where would I add a new feature?"*

AI reads the whole project and tells you how it's organized.

---

## Lesson 14.2 — Making Changes Safely (~60 min)

**Golden rule:** Make small changes, test after each one.

1. Create a branch: `git branch my-feature`
2. Make one change
3. Test it
4. Commit: `git commit -m "Added new feature"`
5. Push: `git push`

Don't change ten things and hope.

---

## Lesson 14.3 — Using AI to Help (~45 min)

AI is amazing at understanding existing code:

*"I need to add a new feature (export pets as CSV). Here's my codebase. Where would I add this? What files need to change? What data does it need?"*

Claude Code reads the whole project and tells you:
- Exactly which files to modify
- What new code to add
- How it integrates with existing code

Then it helps you add the feature without breaking anything.

---

## Activity: Add a Feature to Existing Code 🏗️

1. Find an existing project (your pet tracker)
2. Pick a feature to add (export pets, search, sort by name)
3. Use Claude Code to understand the codebase
4. Ask it to help you add the feature
5. Test and push to GitHub

---

## Knowledge Check (Quiz)

1. **How do you start understanding an existing codebase?**
2. **Why work on a branch when adding features?**
3. **How can AI help you understand foreign code?**

---

## Key Takeaways

- Find the entry point and trace the flow 🔍
- Make small changes, test after each
- Use branches for safety
- AI can understand and modify existing code
- "Brownfield" = real-world coding

**Next:** Module 15 — The Tooling Landscape!
