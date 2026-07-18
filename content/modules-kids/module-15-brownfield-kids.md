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

## Lesson 14.1 — Read Existing Code by Hand (~30 min)

Before Claude Code maps a codebase, let's learn to read code ourselves. This is a CRITICAL skill.

### How to Read Unfamiliar Code

When you open a project you didn't write, where do you start?

**Step 1: Find the entry point**

This is the file that runs first.
- For a Next.js app: `app/page.tsx` (the home page)
- For a full-stack app: check `package.json` for `"main"` or `"start"` script
- For a React app: look for `index.tsx` or `main.tsx`

**Step 2: Read the entry point**

Open `app/page.tsx`. What does it do?
- What components does it import?
- What data does it display?
- What buttons does it have?

Example:
```jsx
import { PetList } from "@/components/PetList";
import { PetForm } from "@/components/PetForm";

export default function Page() {
  return (
    <div>
      <h1>Pet Tracker</h1>
      <PetForm />
      <PetList />
    </div>
  );
}
```

Translation: "This page shows a form to add pets and a list of existing pets."

**Step 3: Find the components it uses**

It imports `PetList` and `PetForm`. Open those files:
- `components/PetList.tsx` — what does it display?
- `components/PetForm.tsx` — what does it do?

Read the first 10-20 lines of each. You don't need to understand every line yet!

**Step 4: Trace one feature end-to-end**

Pick one feature: "What happens when I add a pet?"

Trace the code:
1. User fills `PetForm` and clicks submit
2. Read `PetForm.tsx`: What function does `onSubmit` call?
3. Find that function (probably in `actions/` or `lib/`)
4. Read the function: Does it call Supabase? Does it update state?
5. After the action, does `PetList` re-render? Why?

**Example trace:**
```
User clicks "Add pet" in PetForm
  → calls addPet() function (in actions/addPet.ts)
  → addPet() calls Supabase to insert pet
  → Supabase returns the new pet
  → PetList re-fetches and shows the new pet
```

### Practice: Map Your Pet Tracker

Open your pet tracker code (the one you built in Modules 4-7).

Answer these questions:

1. **Entry point:** What file runs first?
2. **Main components:** What components does the entry point use?
3. **Feature trace:** Pick "delete a pet." Trace the code:
   - Where is the delete button?
   - What function does it call?
   - What does that function do?
   - After deletion, how does the UI update?

Write down your answers (or draw a diagram).

### Why This Matters

Reading code is how you:
- **Understand what a feature does** — you can trace it step-by-step
- **Find bugs** — wrong logic somewhere jumps out
- **Modify existing features** — add a new field, change behavior, without breaking things
- **Learn from others' code** — see patterns, steal good ideas

**Without reading:** Code is a black box. You're afraid to change anything.

**With reading:** You own the code. You can modify it confidently.

Claude Code helps verify your understanding, but YOU must do the detective work first.

---

## Lesson 14.1b — Verify with Claude Code (~15 min)

You've read the pet tracker code by hand. Now Claude Code will do the same (and faster).

**Why this works:**
- You understand the codebase structure (entry point, components, features)
- Claude Code scans the same code and summarizes it
- You can verify: "Does Claude Code's summary match my understanding?"

**If they match:** You understand correctly. Claude Code confirmed it. ✅

**If they don't match:** Claude Code spotted something you missed, or you misread. Good learning moment! 🔍

**What you're doing:** Verification + critical thinking.

**What Claude Code is doing:** Pattern scanning + summarization.

Open Claude Code:
```bash
claude
```

Paste your manual understanding:

```
I just read through my codebase and traced a feature. Here's my understanding:

**Entry point:** [file you found]

**Main components:** [components you identified]

**Feature: [the feature you traced]**
  - [step 1 of your trace]
  - [step 2]
  - [step 3]
  - etc.

Is this correct? Did I miss anything?
```

Claude Code will:
- Verify your trace ✅
- Point out any misunderstandings ✅
- Highlight parts you missed ✅
- Generate a complete map of the codebase ✅

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

## Activity: Understand an Existing Codebase 🏗️

### Step 1: Manual code reading (20 min)

Pick a codebase:
- Your own pet tracker (Modules 4-7)
- OR a simple open-source project from GitHub

**Part A: Find the entry point**
- For Next.js: `app/page.tsx`
- For other frameworks: check `package.json` for `"main"` or `"start"`

Write down: "The entry point is [file]"

**Part B: Map the main components**

Open the entry point. What does it import?

Write down:
```
Entry point: app/page.tsx
Imports:
  - PetList (from components/PetList.tsx)
  - PetForm (from components/PetForm.tsx)
  - styles (from globals.css)
```

**Part C: Trace one feature**

Pick a feature (add pet, delete pet, fetch from database, search, etc.)

Trace it through the code, step by step. Document:
```
Feature: Delete a pet

Step 1: Where is the delete button?
  → Found in: components/PetCard.tsx, line 32

Step 2: What function does it call?
  → Calls: deletePet(petId)

Step 3: Where is deletePet defined?
  → Found in: actions/deletePet.ts

Step 4: What does deletePet do?
  → Calls Supabase delete query
  → Returns success/error

Step 5: After delete, how does the UI update?
  → PetList re-renders with fresh data from Supabase
```

Write down your trace (3-5 steps). Draw a diagram if it helps!

### Step 2: Verify your understanding with Claude Code (10 min)

Open Claude Code:

```bash
claude
```

Paste your manual trace:

```
I just read through my codebase and traced a feature. Here's my understanding:

**Entry point:** [what you found]
**Main components:** [list them]

**Feature: [name]**
  - [step 1 of your trace]
  - [step 2]
  - [step 3]
  - etc.

Is this correct? Did I miss anything?
```

Claude Code will:
- Verify your trace
- Point out any misunderstandings
- Highlight parts you missed
- Generate a complete map of the codebase

### Step 3: Compare (5 min)

Compare your manual trace to Claude Code's understanding:
- ✓ Did you identify the same entry point?
- ✓ Did you identify the same main components?
- ✓ Did your feature trace match Claude Code's?

If yes to all: You understand the codebase. Claude Code confirmed it. ✅

If no: Ask Claude Code: "Why did I miss [thing]?" Learn from the difference.

### Step 4: Modify the codebase safely (10 min)

Now that you understand the code, make ONE small change:
- Add a new field to PetForm (e.g., "age")
- Update PetCard to display the age
- Update the delete button to say "Remove" instead of "Delete"
- Add a search box to PetList

**Workflow:**
```bash
git checkout -b small-change
# Make your ONE change
npm run dev
# Test it works locally
git add .
git commit -m "Add [small thing]"
git push -u origin small-change
```

You just modified existing code confidently because you understand it. That's brownfield development. 🏗️

### Deliverable:

Submit:
- **Trace document:** Your manual code trace (the one you wrote in Step 1)
- **Screenshot of feature working:** Show your change running locally
- **GitHub PR:** Link to your PR with the small change
- **Reflection:** Did your manual trace match Claude Code's summary? What did you learn?

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

## Knowledge Check

**Q1: You're reading unfamiliar code. Where do you start?**
- A) Read every file top-to-bottom
- B) Find the entry point (main file) and trace from there
- C) Ask Claude Code to explain everything
- D) Give up (too hard)

**Answer: B** — Entry point = first file that runs. Start there, follow the imports, map components. Then you understand the structure.

---

**Q2: You traced a feature and found: button → function → database. Now what?**
- A) Stop, you're done tracing
- B) Test it: run the feature, watch it work, confirm your trace was right
- C) Read every line of the function (overkill)
- D) Ask Claude Code to re-explain it

**Answer: B** — Verify your understanding by running the code. Execution = proof.

---

**Q3: Claude Code's codebase summary says the delete button calls deletePet(). Your manual trace said it calls removeItem(). What does this mean?**
- A) Claude Code is always right, trust it
- B) You're always right, Claude Code missed it
- C) Someone (you or Claude Code) misread. Open the code and find the truth.
- D) Both are correct (different names for the same thing)

**Answer: C** — Disagreement is a signal. It means you need to investigate. Open the code, search for the actual function name. Learning happens at disagreements.

---

**Q4: After understanding the codebase, you want to add a feature. What's the best first step?**
- A) Ask Claude Code to build it
- B) Find similar code in the codebase, understand it, then modify it
- C) Write new code from scratch
- D) Rewrite the entire project

**Answer: B** — Existing code is your reference guide. Follow patterns. Copy-paste-adapt. Brownfield = building on existing foundations.

---

**Q5: AI wants to reformat the whole codebase while adding your feature. You should:**
- A) Accept it (it knows best)
- B) Reject scope creep — keep the change tiny
- C) Delete the repo
- D) Disable tests

**Answer: B** — A one-line bug fix should touch one file. A one-feature add should touch related files only. Reject extra changes. Scope creep = more chances to break stuff.

---

**Rubric:**
| ✅ | Check |
|----|---|
| ✅ | Manually traced the codebase (entry point → components → feature) |
| ✅ | Verified trace with Claude Code |
| ✅ | Documented understanding (manual trace + comparison) |
| ✅ | Worked on a branch |
| ✅ | Made ONE focused change |
| ✅ | Tested locally (feature works, nothing broke) |
| ✅ | Submitted PR with clear commit message |

*Pass mark: All checks completed. Manual trace is required — skipping to Claude Code only = incomplete.*

---

## Key Takeaways

- Find the entry point and trace the flow 🔍
- Make small changes, test after each
- Use branches for safety
- AI can understand and modify existing code
- "Brownfield" = real-world coding

**Next:** Module 15 — The Tooling Landscape!
