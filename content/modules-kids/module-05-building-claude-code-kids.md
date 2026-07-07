# Module 5: Building in Claude Code (The Agentic Flow!) 🤖

**Stage:** Building · **Level:** Beginner/Intermediate · **Duration:** ~6 hours · **XP:** 600

**What you need:** Modules 0-4

> **Why this matters:** Claude Code is the "agentic" way to build — you describe a goal at a high level, and the AI plans and executes across your whole project. It's faster for bigger tasks than Cursor's in-editor flow. This module teaches you when to use which tool and how to direct AI safely.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Orchestrate** features across multiple files using Claude Code (agentic flow)
2. **Use CLAUDE.md** and Plan mode to guide the AI safely
3. **Choose Cursor vs Claude Code** for different tasks
4. **Review AI-generated code** before accepting changes

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

## Lesson 5.2 — CLAUDE.md: Your Project Memory (~30 min)

Just like `.cursorrules` in Cursor (Module 4), Claude Code reads a file called **CLAUDE.md** at the start of every session. This tells the AI your project's rules and conventions.

**Create a CLAUDE.md file at your project root:**

```markdown
# CLAUDE.md

This is a Next.js (App Router) + TypeScript + Tailwind app.
Use server components by default.
Keep components small and focused.
Follow the existing patterns in app/components/ for new code.
```

Now the AI always remembers your stack and patterns. No more repeating "I'm using Next.js and TypeScript!"

**Pro tip:** Update CLAUDE.md as your project grows. It's the AI's memory.

---

## Lesson 5.3 — Plan Mode: Propose Before Doing (~30 min)

Before Claude Code makes big changes, use **Plan mode** to see what it *plans* to do before it does it.

Type `/plan` and describe your goal:

*"/plan Add a favorites system to the pet tracker. Users click a heart to favorite pets. Show favorite count on each card. Sort favorites first."*

Claude Code responds with a numbered plan:

```
1. Add a "favorite" field to the Pet type
2. Create a FavoriteButton component  
3. Update the list to sort by favorite status
4. Wire up the click handler
```

**Review the plan.** Does it make sense? If not, say so and it refines it.

Only after you approve does it actually make the changes!

---

## Lesson 5.4 — The Agentic Workflow (~45 min)

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

**Key difference from Module 4 (Cursor):** In Cursor, you guide every edit. In Claude Code, you describe the end goal and the AI figures out all the steps across multiple files.

The agentic flow:
1. Describe your goal (high-level, not step-by-step)
2. Claude Code reads your whole project
3. Use `/plan` to see what it proposes
4. Approve the plan (or refine it)
5. It makes all the changes
6. Review the diffs and test

---

## Lesson 5.5 — Prompting for Claude Code (~60 min)

The prompts are different from Cursor. They're higher-level, more about goals than implementation.

**Good Claude Code prompt:**

*"Add a comment system to the blog posts. Users can leave comments on each post. Comments appear below the post. Save to Supabase. Show comment count on the post list page."*

**Bad Claude Code prompt:**

*"Create a new file called comments.tsx. Import React. Make a component..."*

(Too detailed! Let the AI figure out the structure.)

---

## Lesson 5.6 — Build a Feature With Claude Code (~90 min)

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

## Lesson 5.7 — Debugging at Scale (~30 min)

With a whole project changing, things can break. When they do:

1. **Describe the problem** with the full context
   - *"The comment section won't load. Here's the error in the console: [paste]"*

2. **Claude Code reads your whole project**, spots the issue
3. **It fixes it across all files**

---

## Lesson 5.8 — Cursor vs Claude Code: Which Tool for Which Task? (~45 min)

Don't think of Cursor and Claude Code as competitors — use both for different jobs:

| Use Cursor... | Use Claude Code... |
| --- | --- |
| Tweaking one component | Adding a whole feature |
| Fixing one function | Renaming a concept everywhere |
| Styling a page | Big refactors |
| Local, focused changes | Cross-file, large changes |

**Rule of thumb:** Small and local → Cursor. Large and spread out → Claude Code.

**Alternatives:** VS Code + Copilot Agent, Zed with AI, Windsurf. They all have agentic modes. The skill (goal → plan → review) works everywhere.

---

## Activity: Upgrade Your Pet Tracker 🐕

Use Claude Code with a CLAUDE.md file to add a new feature (pick one):

- Favorite system (heart to mark favorites)
- Categories (group pets by type)
- Birthday reminders
- Photo gallery (multiple photos per pet)

### Concrete example: Favorite system

Here's what a good goal prompt looks like:

*"Add a favorite system to the pet tracker. Users can click a heart icon to mark pets as favorites. Show a count of favorites on each pet card. Sort the list so favorites appear first. Store favorite status in mock data (Supabase later). Follow the patterns in app/pets."*

**What code looks like after Claude Code generates it:**

```typescript
// types/pet.ts (updated)
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  favorite: boolean;  // NEW
  createdAt: Date;
}
```

```tsx
// app/pets/pet-card.tsx (updated)
'use client';
import { useState } from 'react';

export default function PetCard({ pet }: { pet: Pet }) {
  const [isFavorite, setIsFavorite] = useState(pet.favorite);

  return (
    <div className="border rounded p-4">
      <h3>{pet.name}</h3>
      <p>{pet.breed}, {pet.age} years old</p>
      <button onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? '❤️' : '🤍'} {pet.favorites || 0}
      </button>
    </div>
  );
}
```

### Step-by-step walkthrough:

1. **Create CLAUDE.md** at your project root:
   ```markdown
   # CLAUDE.md
   
   This is a Next.js App Router app built with TypeScript and Tailwind.
   It's a pet tracker with mock data.
   Use server components by default.
   Follow the patterns in app/pets.
   ```

2. **Run Claude Code:**
   ```bash
   cd your-project
   claude
   ```

3. **Use `/plan` first:**
   ```
   /plan Add a favorite system...
   ```
   Claude Code responds with a plan. Read it and ask questions if anything is unclear.

4. **Approve and execute** (after reviewing the plan):
   ```
   /plan output looks good. Execute it.
   ```

5. **Review the diff** — Claude Code shows what files changed. Check:
   - New favorite field added to Pet type
   - Heart button appears on each card
   - Favorites are sorted to the top
   - No red error squiggles in your editor

6. **Test it:**
   ```bash
   npm run dev
   ```
   Click hearts, refresh, see favorites persist (during the session, with mock data).

7. **Iterate** if needed:
   ```
   The favorites aren't persisting after a page reload. Debug it.
   ```

### Deliverable:
- Screenshot of your new feature working
- Your CLAUDE.md file
- One example of a plan you refined before executing
- One sentence on which small task you'd do in Cursor instead (e.g., "Adjusting the button color")

---

## Quiz Questions (Preview)

These are the three questions on your quiz. Study these first!

**Q5-k1:** Claude Code works differently from Cursor because it thinks in:
- (a) Edits first, goals second
- (b) **Goals first, then figures out the edits** ✓
- (c) Files first, folders second
- (d) Tests first

*Why:* Claude Code is agentic — you describe the GOAL (like "add a favorites feature"), and it figures out all the steps and files needed. Cursor makes you guide every edit manually.

**Q5-k2:** `CLAUDE.md` in Claude Code is like:
- (a) package.json
- (b) **A Cursor rules file** ✓
- (c) .gitignore
- (d) A comment

*Why:* CLAUDE.md tells Claude Code your project's rules and conventions, just like `.cursorrules` does in Cursor. It's the AI's memory of your stack and patterns.

**Q5-k3:** Why use plan mode?
- (a) It's faster
- (b) **So the AI shows you its plan before changing code (you can say yes/no)** ✓
- (c) It saves tokens
- (d) It's required by law

*Why:* Plan mode (`/plan`) is your safety net! The AI proposes what it will do, you review it, and only THEN does it make changes. No more surprises!

---

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Orchestrate multi-file features (Quiz Q5-k1):**
- Q5-k1: "The mindset shift from Cursor to Claude Code is thinking in:" ✅ edits vs. goals
- **Written check:** Submit your goal prompt for adding a feature + screenshot of it working

**Objective 2 — Use CLAUDE.md and Plan mode (Quiz Q5-k2, Q5-k3):**
- Q5-k2: "What should go in CLAUDE.md?" ✅ Tests understanding of persistent context
- Q5-k3: "What does `/plan` do?" ✅ Tests understanding of plan mode
- **Written check:** Show a plan Claude Code proposed, any refinement you made, and why

**Objective 3 — Choose the right tool (Lesson 5.8 knowledge):**
- **Practical check:** For four tasks, pick Cursor or Claude Code and explain:
  - (a) Rename a type everywhere (Cursor? Claude Code?)
  - (b) Adjust one button's color (Cursor? Claude Code?)
  - (c) Add a whole new feature (Cursor? Claude Code?)
  - (d) Fix a typo in one file (Cursor? Claude Code?)

**Scenario-based judgment checks:**

*For each scenario, explain what you'd do.*

- **(a) Confusing plan:** Claude Code proposes a 5-step plan you don't fully understand. What do you do?
  - ✅ **Right:** Ask it to explain step 3 in more detail before you approve.
  - ❌ **Wrong:** Just approve and hope it works, or reject and start over.

- **(b) One prompt vs. many edits:** Which is better for adding a whole new feature — one Claude Code prompt or multiple Cursor edits?
  - ✅ **Right:** One Claude Code prompt. It figures out all the files at once. Faster, less mistake-prone.
  - ❌ **Wrong:** Multiple Cursor edits. You'd have to remember what to edit in each file.

- **(c) Which tool?** You want to tweak a button's color. Cursor or Claude Code?
  - ✅ **Right:** Cursor. You see the color change instantly in one file. Fast and focused.
  - ❌ **Wrong:** Claude Code. Overkill for one color tweak.

- **(d) Multiple tools:** You're adding a new feature. Which tool do you start with, and when do you switch?
  - ✅ **Right:** Start with Claude Code to build the whole feature. Then switch to Cursor if you need to tweak the styling or fix a small bug.
  - ❌ **Wrong:** Use only Cursor for everything, or only Claude Code.

- **(e) Code you don't understand:** Claude Code creates a file you don't understand. Do you:
  - ✅ **Right:** Ask it to explain the file, and only accept after you understand it (Module 1).
  - ❌ **Wrong:** Accept it blindly because "the AI knows what it's doing."

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | You wrote a high-level goal (not step-by-step) |
| ✅ | You reviewed the `/plan` output and refined it at least once |
| ✅ | You reviewed the diff (changed files) before accepting |
| ✅ | The feature works on your local app (`npm run dev`) |
| ✅ | New code follows the patterns from existing files (same style, naming, structure) |
| ✅ | You identified one small task you'd use Cursor for instead, with a reason |
| ✅ | Your CLAUDE.md file is created and has your stack info |

*Pass mark: 80% and a working feature with CLAUDE.md submitted.*

---

## Tools & Alternatives (This Module)

**Claude Code is the default agentic tool**, but alternatives exist:

| Tool | Best when |
| --- | --- |
| **Claude Code** (what we use) | You want terminal-native, repo-wide automation |
| VS Code + GitHub Copilot Agent | You won't switch editors / team uses VS Code |
| Zed (agentic mode) | You prioritize editor speed |
| Windsurf | You like another AI-native interface |

The skill transfers: write a clear goal, let the agent propose a plan, review before accepting. You're learning the *technique*, not just one tool.

---

## Key Takeaways

- Claude Code is an agentic AI that plans across your whole project 🤖
- Create CLAUDE.md to give the AI persistent context about your project
- Use `/plan` to see what Claude Code will do before it does it
- Prompts are high-level goals, not step-by-step
- Use Cursor for small edits, Claude Code for new features
- Review every diff before accepting — you own all the code

**Next:** Module 6 — Design & UX (Make It Look Cool!)
