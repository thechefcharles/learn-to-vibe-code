# Module 5: Building in Claude Code (The Agentic Flow!) 🤖

**Stage:** Building · **Level:** Beginner/Intermediate · **Duration:** ~6 hours · **XP:** 600

**What you need:** Modules 0-4

> **Why this matters:** Claude Code is the "agentic" way to build — you describe a goal at a high level, and the AI plans and executes across your whole project. It's faster for bigger tasks than Cursor's in-editor flow. This module teaches you when to use which tool.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Use Claude Code** from the terminal
2. **Build features across multiple files**
3. **Understand in-editor vs. agentic flows**

---

## Lesson 5.1 — Claude Code: The Terminal AI (~30 min)

Claude Code is an AI that runs in your terminal. You open it in your project folder, describe what you want built, and it makes changes across your whole project automatically.

**How to use it:**

```bash
cd your-project
claude
```

Then describe your goal at a high level:

*"Add a login page to my app. Users sign up with email/password, and it saves to Supabase. After login, redirect to the home page."*

Claude Code reads your entire project, makes all the changes needed (new files, updates to existing files), and explains what it did.

**In-editor (Cursor) vs. Agentic (Claude Code):**

| Cursor | Claude Code |
| --- | --- |
| Works in one file | Works across whole project |
| Good for: tweaks, small fixes | Good for: new features, big changes |
| You guide every edit | AI plans the whole feature |
| Slower but more control | Faster but less control |

Use Cursor for edits, Claude Code for building new features.

---

## Lesson 5.2 — The Agentic Workflow (~45 min)

The pattern:

1. **Describe your goal** at a high level (not step-by-step)
2. **Claude Code reads your project**, understands the structure
3. **It plans the changes** across files
4. **It makes the changes** automatically
5. **It explains what it did**
6. **You review and test**

Example goal: *"Add dark mode toggle to the dashboard. Store preference in localStorage."*

Claude Code would:
- Find your layout component
- Add a ThemeContext
- Create a toggle button
- Wire up localStorage persistence
- All in one go.

**Key difference from Module 4:** You don't guide every edit. You describe the end goal and the AI figures out the steps.

---

## Lesson 5.3 — Prompting for Claude Code (~60 min)

The prompts are different from Cursor. They're higher-level, more about goals than implementation.

**Good Claude Code prompt:**

*"Add a comment system to the blog posts. Users can leave comments on each post. Comments appear below the post. Save to Supabase. Show comment count on the post list page."*

**Bad Claude Code prompt:**

*"Create a new file called comments.tsx. Import React. Make a component..."*

(Too detailed! Let the AI figure out the structure.)

---

## Lesson 5.4 — Build a Feature With Claude Code (~90 min)

Let's upgrade your pet tracker with Claude Code.

**Your goal:**

*"Add a favorite system to the pet tracker. Users can click a heart icon to mark pets as favorites. Show a count of favorites on each pet card. Sort the list so favorites appear first. Persist to Supabase."*

Run:

```bash
claude
```

Paste that goal. Claude Code will:
- Add a `favorite` column to your Supabase table
- Create components for the heart icon
- Update your list to sort favorites first
- Wire it all together

Then review the changes, test, and if something's off:

*"The favorites aren't staying after refresh. Debug it."*

Claude Code fixes it.

---

## Lesson 5.5 — Debugging at Scale (~30 min)

With a whole project changing, things can break. When they do:

1. **Describe the problem** with the full context
   - *"The comment section won't load. Here's the error in the console: [paste]"*

2. **Claude Code reads your whole project**, spots the issue
3. **It fixes it across all files**

---

## Activity: Upgrade Your Pet Tracker 🐕

Use Claude Code to add one new feature (pick one):

- Favorite system (heart to mark favorites)
- Categories (group pets by type)
- Birthday reminders
- Photo gallery (multiple photos per pet)

Submit a screenshot showing the new feature working.

---

## Knowledge Check (Quiz)

1. **When would you use Cursor vs. Claude Code?**
2. **Write a high-level goal for Claude Code (not step-by-step).**
3. **Your Claude Code output broke something. Write a debugging prompt.**

---

## Key Takeaways

- Claude Code is an agentic AI that plans across your whole project 🤖
- Prompts are high-level goals, not step-by-step
- Use Cursor for small edits, Claude Code for new features
- It reads your whole project to understand context
- Test after, then debug if needed

**Next:** Module 6 — Design & UX (Make It Look Cool!)
