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

## Lesson 5.2 — Design Your App's Structure by Hand (~30 min)

Before you ask Claude Code to "figure out the structure," let's think about files and folders ourselves. This is called **architecture**.

### How Apps Are Organized

Your pet tracker has features: add a pet, show pets, delete a pet. Each feature needs code.

Where does that code live? In separate files:

- **Components folder** (`app/components/`): Reusable pieces (PetCard, PetForm, PetList)
- **Pages folder** (`app/`): Full pages (home, about, settings)
- **Utilities folder** (`lib/`): Helper functions (formatDate, validateEmail)
- **Data folder** (`lib/api/`): Functions that talk to the database

**Why?** If every line of code lived in ONE file, it would be 10,000 lines long—impossible to find anything.

### Example: Pet Tracker Architecture

Your pet tracker needs:

**Feature 1: Add a pet**
- File 1: `app/components/PetForm.tsx` (the form UI)
- File 2: `app/actions/addPet.ts` (the logic to save to database)
- File 3: `app/page.tsx` (imports and displays PetForm)

**Feature 2: Show pets**
- File 1: `app/components/PetList.tsx` (displays the list)
- File 2: `app/components/PetCard.tsx` (displays one pet)
- File 3: `app/page.tsx` (uses PetList)

**Feature 3: Delete a pet**
- File 1: `app/actions/deletePet.ts` (delete logic)
- File 2: `app/components/PetCard.tsx` (has the delete button)

### Practice: Sketch Your App's Files

Take a feature you want to build (e.g., "Add a pet"). Sketch the files it needs:

1. **UI Component** — What does the user see? (form, buttons, input fields) → File name?
2. **Logic** — What happens when they click submit? → File name?
3. **Data** — Does it talk to the database? → File name?

Example answer:
- UI: `components/PetForm.tsx`
- Logic: `actions/addPet.ts`
- Data: calls database via Supabase client

**Challenge:** Sketch the files for "Delete a pet feature."

Answer:
- The delete button lives in: `components/PetCard.tsx`
- The delete logic lives in: `actions/deletePet.ts`
- The button calls the action when clicked

### Why This Matters

When you ask Claude Code to "build the feature," it will create files with these names. If you've already sketched the structure:
- You can verify Claude Code didn't over-complicate it
- You understand WHERE each part lives
- You can modify it later (add to PetForm, change deletePet logic, etc.)

**Without sketching:** Claude Code builds it, you accept it, you don't understand the structure, you're stuck when something breaks.

**With sketching:** Claude Code builds it EXACTLY as you designed, you understand it completely.

---

## Lesson 5.3 — CLAUDE.md: Your Project Memory (~30 min)

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

## Lesson 5.4 — Plan Mode: Propose Before Doing (~30 min)

Before Claude Code makes big changes, use **Plan mode** to see what it *plans* to do before it does it.

**Use your plan from Module 3.** When you ask Claude Code to build something, paste the context from your planning session:

```
Context: I finished planning my pet tracker. My plan says:
- Core features: list pets, add pets, delete pets, mark favorites
- Data: pet name, breed, age, favorite_food
- Stack: Next.js, TypeScript, Tailwind

Now I'm building the pet list feature based on my plan.
```

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

## Lesson 5.5 — The Agentic Workflow (~45 min)

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

## Lesson 5.6 — Prompting for Claude Code (~60 min)

You've sketched your app's files. Now Claude Code writes them all for you.

**Why this works:**
- You've already designed the structure (which files, what each does)
- Claude Code knows file patterns (components have hooks, actions are async functions, etc.)
- It can create 10 files in 30 seconds; it would take you 30 minutes

**What you're doing:** Architecture + thinking. 
**What Claude Code is doing:** Typing + pattern-matching.

You own the hard part (design). Claude Code owns the tedious part (implementation). This is the partnership.

### How to Write Good Prompts

The prompts are different from Cursor. They're higher-level, more about goals than implementation.

**Good Claude Code prompt:**

*"Add a comment system to the blog posts. Users can leave comments on each post. Comments appear below the post. Save to Supabase. Show comment count on the post list page."*

**Bad Claude Code prompt:**

*"Create a new file called comments.tsx. Import React. Make a component..."*

(Too detailed! Let the AI figure out the structure.)

---

## Lesson 5.7 — Build a Feature With Claude Code (~90 min)

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

## Lesson 5.8 — Two Helpers: Claude + Claude Code Working Together (~45 min)

Imagine you have two helpers:

1. **Claude Code** — reads your code and builds stuff. Super fast at typing. But only knows your code, not your project plan.
2. **Claude** — reads your project plan (Notion) and knows what to build next. But doesn't type code.

**The problem:** You're building a pet tracker. You ask Claude Code: "Add a favorites system!" 

Claude Code: "OK! Should I save favorites to the database or just in memory? Should the heart be red or pink? Should favorites show first or in a separate list?"

You're stuck. You're in the code, not thinking about the big picture.

**The solution:** You have two helpers. Use them both!

### Your role: The director

You're not the coder—you're the **director**. You:

1. **Tell Claude** the big-picture question
2. **Claude reads your plan** and answers
3. **You tell Claude Code** what to build (now you know!)
4. **Claude Code builds it**

### How to set it up

**Step 1 — Put your project plan in Notion**

Create simple Notion pages:

```
Pet Tracker Plan
├── Features to Build (in order)
│   1. Add pets (done ✓)
│   2. Delete pets (next)
│   3. Favorites system (after delete)
│   4. Photo gallery (future)
├── Design Rules
│   - Heart icon for favorites, red when favorited
│   - Favorites sort to top
├── Questions & Answers
   - Q: Should users name their pets? A: Yes, required
```

You own this Notion. Claude reads it when you need advice.

**Step 2 — Make Claude aware of your plan**

Tell Claude:

> "I have a Notion at [link] with my pet tracker plan: features in order, design rules, Q&A. When I ask which feature to build next, read this Notion and tell me. Example: 'Claude, what should I build next?' and you'll check the Notion and say 'Delete pets comes before favorites.'"

**Step 3 — Keep Claude Code focused on code**

Claude Code reads your CLAUDE.md (from Lesson 5.3). It says:

```markdown
# CLAUDE.md
Pet tracker app built with Next.js and TypeScript.
Use server components. Follow patterns in app/pets.
```

Claude Code is the typist. Give it clear directions.

### Example: Adding a favorites feature

**You:** "Claude, I want to add a favorites feature to my pet tracker. What do I need to know from the plan?"

**Claude:** (reads your Notion)
> "Per your plan, favorites come after delete. Here's what the plan says: red heart icon, favorites sort first, save to database."

**You:** (now you know!) Now you direct Claude Code:
> "Add a favorites system to the pet tracker. Red heart icon. When clicked, marks a pet as favorite. Sort favorites to the top of the list. Persist to Supabase."

**Claude Code:** "Got it. Anything else?" Builds it.

**Step 4 — When Claude Code is confused**

Claude Code: "I've built the heart button. But should I add a 'Favorites only' filter too?"

**You:** (not sure!) Paste to Claude:
> "Claude, should I add a 'Favorites only' filter as part of this feature, or is that future work?"

**Claude:** (checks Notion)
> "Not in this phase. Stick to click-to-favorite and sorting. Filter is a future feature."

**You:** Paste back to Claude Code:
> "No filter for now. Just the heart and sorting. Let's ship this first."

### When to use this pattern

- **You're not sure what to build next** → Ask Claude (it reads your plan)
- **Claude Code asks design questions** → Ask Claude (it has your big picture)
- **You're making quick edits** → Claude Code alone (just code, no strategy needed)
- **You're building a big feature** → All three: plan (Notion) → strategy (Claude) → code (Claude Code)

### Knowledge check

**Q5-k8a:** You're adding a favorites system but aren't sure if it should sort favorites first or show them in a separate list. What do you do?

- (a) Ask Claude Code to guess
- (b) **Ask Claude (it reads your plan/Notion)** ✓
- (c) Make it up
- (d) Don't add sorting at all

*Why:* Claude Code only knows code. Claude knows your spec and plan. Claude answers design questions.

**Q5-k8b:** Claude has two jobs: reading code and reading your plan. Which is which?

- (a) Claude Code: reads your plan; Claude: reads code
- (b) **Claude Code: reads code; Claude: reads your plan** ✓
- (c) Both read both
- (d) Neither reads either

*Why:* Claude Code is a code builder. Claude is a plan reader. Different jobs, same team.

---

## Lesson 5.9 — Debugging at Scale (~30 min)

With a whole project changing, things can break. When they do:

1. **Describe the problem** with the full context
   - *"The comment section won't load. Here's the error in the console: [paste]"*

2. **Claude Code reads your whole project**, spots the issue
3. **It fixes it across all files**

---

## Lesson 5.10 — Cursor vs Claude Code: Which Tool for Which Task? (~45 min)

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

Use Claude Code with a CLAUDE.md file to add a new feature. **But first, sketch the architecture by hand.**

Pick one feature:

- Favorite system (heart to mark favorites)
- Categories (group pets by type)
- Birthday reminders
- Photo gallery (multiple photos per pet)

### Step 1: Sketch the architecture (10 min)

**Before you open Claude Code**, answer these questions for your chosen feature.

**Example: Favorite system**

1. **What does the user see?** (form, buttons, inputs, cards)
   - Answer: Heart icon on each pet card, favorite count
   - → File name: `app/components/PetCard.tsx` (has heart button)

2. **What happens when they click?** (logic, functions)
   - Answer: Toggle favorite status, save to database
   - → File name: `app/actions/toggleFavorite.ts` (async function)

3. **Does it save to the database?** (database operations)
   - Answer: Yes, saves to Supabase
   - → Function: `toggleFavorite` calls Supabase client

**Your turn:** Sketch the files for YOUR chosen feature:

- UI (what the user sees) → File name?
- Logic (what happens on click/submit) → File name?
- Data (does it touch the database?) → Function name?

Write your sketch down (or draw it). Don't continue to Step 2 until you can explain your architecture.

### Step 2: Create CLAUDE.md (~5 min)

Create a CLAUDE.md file at your project root:

```markdown
# CLAUDE.md

This is a Next.js App Router app built with TypeScript and Tailwind.
It's a pet tracker with mock data.
Use server components by default.
Follow the patterns in app/pets.
```

### Step 3: Ask Claude Code to build it (~10 min)

Run Claude Code:

```bash
cd your-project
claude
```

**Tell Claude Code your architecture.** For example:

*"Add a favorite system to the pet tracker. Here's my architecture:*
*- UI: PetCard.tsx (has a heart icon and favorite count)*
*- Logic: actions/toggleFavorite.ts (async function that calls Supabase)*
*- Display: PetList.tsx (sorts favorites to the top)*

*Create these files following this structure."*

Claude Code will ask questions or propose a plan. Review it!

### Step 4: Use `/plan` to review (~5 min)

If Claude Code doesn't automatically show a plan, type `/plan` and your goal:

```
/plan Add a favorite system with the architecture I described above
```

Claude Code responds with a numbered plan. Check:
- Does it match YOUR sketch?
- Does it make sense?
- Is anything missing?

If yes, say: *"Plan looks good. Execute it."*

If no, refine it: *"In step 2, I want the favorite button to also show [detail]. Please adjust."*

### Step 5: Review the diff (~10 min)

Claude Code shows what files changed. Check:
- ✓ Files match your sketch
- ✓ New favorite field added to Pet type
- ✓ Heart button appears on each card
- ✓ Favorites are sorted to the top
- ✓ No red error squiggles in your editor

### Step 6: Test it (~5 min)

Run your app:

```bash
npm run dev
```

- Click hearts
- Refresh the page
- See favorites persist (during the session, with mock data)

### Step 7: Iterate if needed (~10 min)

If something's wrong:

```
The favorites aren't persisting after a page reload. Debug it.
```

Claude Code fixes it.

### Deliverable:
- Your architecture sketch (written or drawn)
- Your CLAUDE.md file
- Screenshot of your new feature working
- One example of a plan you refined before executing (paste the conversation)
- One sentence on which small task you'd do in Cursor instead (e.g., "Adjusting the button color")

---

## Quiz Questions (Preview)

These are the six questions on your quiz. Study these first!

**Q5-k1:** Before asking Claude Code to build a feature, what should you do?
- (a) Just describe it and let Claude Code figure it out
- (b) **Sketch which files you need and what each does** ✓
- (c) Start coding by hand
- (d) Ask Claude Code for suggestions

*Why:* Sketching means you understand the architecture. When Claude Code builds it, you can verify it matches YOUR design. This is the difference between understanding your app and accepting whatever the AI gives you.

**Q5-k2:** Claude Code works differently from Cursor because it thinks in:
- (a) Edits first, goals second
- (b) **Goals first, then figures out the edits** ✓
- (c) Files first, folders second
- (d) Tests first

*Why:* Claude Code is agentic — you describe the GOAL (like "add a favorites feature"), and it figures out all the steps and files needed. Cursor makes you guide every edit manually.

**Q5-k3:** Why use plan mode?
- (a) It's faster
- (b) **So the AI shows you its plan before changing code (you can say yes/no)** ✓
- (c) It saves tokens
- (d) It's required by law

*Why:* Plan mode (`/plan`) is your safety net! The AI proposes what it will do, you review it, and only THEN does it make changes. No more surprises!

**Q5-k4:** `CLAUDE.md` in Claude Code is like:
- (a) package.json
- (b) **A Cursor rules file** ✓
- (c) .gitignore
- (d) A comment

*Why:* CLAUDE.md tells Claude Code your project's rules and conventions, just like `.cursorrules` does in Cursor. It's the AI's memory of your stack and patterns.

**Q5-k7:** You finished planning your app in Module 3. Now in Module 5, what should you do?
- (a) Ask Claude Code to build whatever sounds fun
- (b) **Paste your plan into Claude Code and reference it in your prompt** ✓
- (c) Build a generic pet app first, then change it later
- (d) Skip the plan—Claude Code will figure it out

*Why:* Your plan is Claude Code's roadmap. Use it! You already did the hard thinking in Module 3. Now Claude Code builds exactly what you planned.

**Q5-k8a:** You're adding a favorites system but aren't sure if it should sort favorites first or show them in a separate list. What do you do?
- (a) Ask Claude Code to guess
- (b) **Ask Claude (it reads your plan/Notion)** ✓
- (c) Make it up
- (d) Don't add sorting at all

*Why:* Claude Code only knows code. Claude knows your spec and plan. Claude answers design questions.

**Q5-k8b:** Claude has two jobs: reading code and reading your plan. Which is which?
- (a) Claude Code: reads your plan; Claude: reads code
- (b) **Claude Code: reads code; Claude: reads your plan** ✓
- (c) Both read both
- (d) Neither reads either

*Why:* Claude Code is a code builder. Claude is a plan reader. Different jobs, same team.

---

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Design app architecture by hand (Lesson 5.2):**
- Q5-k1: "Before asking Claude Code to build a feature, what should you do?"
  - ✅ (b) Sketch which files you need and what each does
- **Written check:** Show your architecture sketch for the feature you built

**Objective 2 — Orchestrate multi-file features with Claude Code (Quiz Q5-k2):**
- Q5-k2: "Claude Code works differently from Cursor because it thinks in:"
  - ✅ (b) Goals first, then figures out the edits
- **Written check:** Submit your goal prompt + screenshot of it working

**Objective 3 — Use CLAUDE.md and Plan mode (Quiz Q5-k3, Q5-k4):**
- Q5-k3: "What does `/plan` do?"
  - ✅ (b) So the AI shows you its plan before changing code (you can say yes/no)
- Q5-k4: "CLAUDE.md is like:"
  - ✅ (b) A Cursor rules file
- **Written check:** Show a plan Claude Code proposed, any refinement you made, and why

**Objective 4 — Use Claude as strategic co-pilot (Lesson 5.8 knowledge; Quiz Q5-k8a, Q5-k8b):**
- Q5-k8a: "You're adding a feature but aren't sure about the design. What do you do?"
  - ✅ (b) Ask Claude (it reads your plan/Notion)
- Q5-k8b: "Claude vs Claude Code — which reads code, which reads your plan?"
  - ✅ (b) Claude Code: reads code; Claude: reads your plan
- **Written check:** Set up a simple Notion with your pet tracker plan (features to build, design rules). Show one example where you asked Claude a design question and used the answer to direct Claude Code.
  - **Example:** "Notion said favorites come after delete. I asked Claude: 'When should I build favorites?' Claude said 'After delete.' I then told Claude Code: 'Add delete first, no favorites yet.'"

**Objective 5 — Choose the right tool (Lesson 5.10 knowledge):**
- **Practical check:** For five tasks, pick Cursor, Claude Code, or Claude and explain:
  - (a) Rename a type everywhere (which tool?)
  - (b) Adjust one button's color (which tool?)
  - (c) Add a whole new feature (which tool?)
  - (d) Fix a typo in one file (which tool?)
  - (e) "Should I add notifications before or after photo gallery?" (which tool?)

**Architecture-focused judgment checks:**

*For each scenario, explain what you'd do.*

- **(a) Architecture check:** Claude Code creates files with names you didn't sketch. What do you do?
  - ✅ **Right:** Ask it to rename the files to match your architecture sketch. You understand your app better if files match your design.
  - ❌ **Wrong:** Accept it anyway. File names don't matter.

- **(b) Missing a file:** You sketched 3 files, but Claude Code only creates 2. What do you do?
  - ✅ **Right:** Ask: "Where did my third file go? Should it be in [location]?"
  - ❌ **Wrong:** Accept it and hope it works.

- **(c) Confusing plan:** Claude Code proposes a 5-step plan you don't fully understand. What do you do?
  - ✅ **Right:** Ask it to explain step 3 in more detail before you approve. You should understand your own app.
  - ❌ **Wrong:** Just approve and hope it works.

- **(d) Which tool?** You want to tweak a button's color. Cursor or Claude Code?
  - ✅ **Right:** Cursor. You see the color change instantly in one file. Fast and focused.
  - ❌ **Wrong:** Claude Code. Overkill for one color tweak.

- **(e) Multiple tools:** You're adding a new feature. Which tool do you start with, and when do you switch?
  - ✅ **Right:** Start with Claude Code to build the whole feature (using your architecture sketch). Then switch to Cursor if you need to tweak styling or fix a small bug.
  - ❌ **Wrong:** Use only Cursor for everything, or only Claude Code.

- **(f) Code you don't understand:** Claude Code creates a file you don't understand. Do you:
  - ✅ **Right:** Ask it to explain the file, and only accept after you understand it (Module 1).
  - ❌ **Wrong:** Accept it blindly because "the AI knows what it's doing."

- **(g) Strategic question mid-build:** Claude Code asks: "Should the delete button be red or gray?" Do you:
  - ✅ **Right:** Ask Claude (with your Notion open): "What color should delete buttons be in my design?" Claude checks your plan and answers. Then tell Claude Code the answer.
  - ❌ **Wrong:** Ask Claude Code to guess, or make it up on the spot.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | You sketched your architecture (3+ files, explained what each does) |
| ✅ | Your sketch matches the files Claude Code created |
| ✅ | You wrote a high-level goal prompt (not step-by-step) |
| ✅ | You reviewed the `/plan` output and refined it at least once |
| ✅ | You reviewed the diff (changed files) before accepting |
| ✅ | The feature works on your local app (`npm run dev`) |
| ✅ | New code follows the patterns from existing files (same style, naming, structure) |
| ✅ | You identified one small task you'd use Cursor for instead, with a reason |
| ✅ | Your CLAUDE.md file is created and has your stack info |
| ✅ | You created a simple Notion with your project plan (features, design rules) |
| ✅ | You asked Claude a strategic question using that Notion and got an answer |
| ✅ | You showed how Claude's answer informed your Claude Code prompt |

*Pass mark: 80% and a working feature with architecture sketch + CLAUDE.md + Notion coordination example submitted.*

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
