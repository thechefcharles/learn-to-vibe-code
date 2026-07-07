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

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q14-k1:** The brownfield golden rule is:
- (a) Rewrite it all your way
- (b) **Change minimum, match the code around it, prove you didn't break anything** ✓
- (c) Never use tests
- (d) Don't read the code

*Why:* Someone built this code before you. Respect their work. Change only what you need to, write it the way they did, and test that you didn't break anything. Small, careful changes beat big rewrites.

**Q14-k2:** Before changing existing code, assess:
- (a) Its color scheme
- (b) **The blast radius (what depends on it)** ✓
- (c) File size only
- (d) Who wrote it

*Why:* One line can break something far away if other code depends on it. Ask: "If I change this, what breaks?" Know the risk before you act.

**Q14-k3:** If an AI tries to reformat 40 files for a one-line fix, you should:
- (a) Accept it
- (b) **Reject scope creep — keep the change tiny** ✓
- (c) Delete the repo
- (d) Disable tests

*Why:* AI loves to "helpfully" refactor everything. But that's scope creep! A one-line bug fix should touch one file, maybe two. Reject the extra changes. Scope creep = more chances to break stuff.

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
