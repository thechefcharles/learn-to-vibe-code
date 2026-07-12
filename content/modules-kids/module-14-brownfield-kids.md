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

## Lesson 14.1 — Claude Code Maps the Codebase for You (~45 min)

Reading existing code from scratch is hard! Let Claude Code do the heavy lifting.

**Without AI:** You read files for 30 minutes, still confused about the architecture.

**With Claude Code:** It reads the entire codebase and summarizes it in 2 minutes! 🚀

**Let Claude Code orient you:**

Open Claude Code:
```bash
claude
```

Paste:

```
I'm new to this codebase. Please help me understand it:

1. What does this app do? (2-3 sentences)
2. What are the main parts? (auth, database, UI, etc.)
3. Trace one feature end-to-end (e.g., how does adding a pet work?)
4. What patterns/conventions does the code use?
5. Where would I add a new feature? (which files?)
```

Claude Code will:
- Summarize the whole app ✅
- Show the architecture ✅
- Trace data flow ✅
- Identify patterns ✅
- Point to the right files ✅

Now you understand the layout. Much faster than reading all the code!

---

## Lesson 14.2 — Make Small, Safe Changes (~60 min)

**Golden rule:** Change the minimum, match the code around it, verify it works.

**Workflow:**

1. Create a branch: `git checkout -b feature-name`
2. Make ONE small change
3. Test it: `npm run dev` or `npm test`
4. Commit: `git commit -m "Clear message"`
5. Push: `git push`

**Don't:** Change 10 things and hope it works. That's chaos! 

**Do:** One focused change, test, verify, commit. Repeat.

---

## Lesson 14.3 — Claude Code Assists Your Debugging (~45 min)

If code breaks, Claude Code helps you find the bug:

Open Claude Code:

```bash
claude
```

Paste:

```
My pet tracker is crashing when I search!
Error: "Cannot read properties of undefined"

I can reproduce it by:
1. [describe exact steps]
2. [error appears]

Please help:
1. Search the code for this error
2. Find the line that's crashing
3. Explain why it crashes
4. Show me the data flow

Then I'll fix it!
```

Claude Code will:
- Find the crash location ✅
- Explain the root cause ✅
- Suggest a fix ✅
- BUT: You make the actual fix and verify it works ✅

---

## Activity: Add a Feature to Existing Code 🏗️

Use Claude Code to map the code, then add a focused feature.

### Step 1: Let Claude Code map your pet tracker (5 min)

Open Claude Code:
```bash
claude
```

Paste:

```
Map my pet tracker codebase.

Tell me:
1. What does this app do?
2. What are the main parts? (UI, database, auth, etc.)
3. How does adding a pet work? (trace it end-to-end)
4. Where's the code for displaying pets?
5. Where would I add an "export to CSV" feature?

Show me file paths!
```

Claude Code will give you a complete map. You now understand the layout.

### Step 2: Pick a feature to add (1 min)

Choose one:
- Export pets as CSV
- Search by pet name  
- Sort by breed
- Add a "favorite" button

### Step 3: Create a branch and make the change (10 min)

```bash
git checkout -b add-my-feature
```

Ask Claude Code:
```
Add [feature name] to my pet tracker.

Based on the architecture, make a focused change:
- Where should I add the code?
- What's the minimal change?
- How does it integrate with existing code?
```

Claude Code proposes the change. You review it, make sure it's small and focused, then accept it.

### Step 4: Test and verify (3 min)

```bash
npm run dev
```

Test your feature:
- Does it work? ✅
- Does it match the existing code style? ✅
- Did you break anything? ✅

### Step 5: Commit and push (2 min)

```bash
git add .
git commit -m "Add [feature name]"
git push -u origin add-my-feature
```

Open a PR on GitHub.

### Deliverable:
- Screenshot of the feature working
- GitHub PR screenshot  
- List the files you changed (keep it small!)

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

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **How do you start understanding an existing codebase?**
   - *Example answer:* "Find the entry point (App.tsx), trace data flow, ask AI to summarize architecture, follow one feature end-to-end."

2. **Why work on a branch when adding features?**
   - *Example answer:* "Branches keep main safe. You can test, commit multiple times, fix mistakes. If something breaks, main is still working."

3. **How can AI help you understand foreign code?**
   - *Example answer:* "Ask it to explain architecture, find where to add features, show data flow, identify patterns. AI reads faster than you."

### Scenario checks:

- **(a) AI wants to reformat the whole codebase while adding your feature.**
  - ✅ **Say:** "Focus on the feature. Refactoring is a separate PR."

- **(b) You changed a function, and a feature in another file broke.**
  - ✅ **Check:** Who uses this function? Is there a test? Fix carefully.
  - ❌ **Avoid:** Shipping without testing.

- **(c) You don't understand the existing code.**
  - ✅ **Do:** Read it, ask AI, add comments, trace it. Understand before changing.

---

**Rubric:**
| ✅ | Check |
|----|---|
| ✅ | Asked AI or read docs to understand codebase |
| ✅ | Worked on a branch |
| ✅ | Tested locally |
| ✅ | Tests pass (no broken code) |
| ✅ | PR is focused (only your changes) |
| ✅ | Feature works |

*Pass mark: 80% and a working feature PR submitted.*

---

## Key Takeaways

- Find the entry point and trace the flow 🔍
- Make small changes, test after each
- Use branches for safety
- AI can understand and modify existing code
- "Brownfield" = real-world coding

**Next:** Module 15 — The Tooling Landscape!
