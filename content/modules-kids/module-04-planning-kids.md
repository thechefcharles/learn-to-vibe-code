# Module 3: Plan Before You Code! 📋

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 1-2 (know how AI thinks, know how to prompt)

> **Why this matters:** Coding fast is fun, but coding *without a plan* is chaos. This teaches you to plan *with* AI — use it as a thinking partner to figure out what you're building before you build it. A good plan saves you from writing code that doesn't fit together.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Clarify** a vague idea into a real project vision 💡
2. **Organize** your project with Notion and repo structure 📁
3. **Write** a spec for your app (what it does, who uses it, what's MVP) 📝
4. **Turn** your spec into a technical plan (data model, screens, tasks) 🛠️
5. **Order** your tasks so you build things in the right sequence ⚡

---

## Lesson 3.1 — Clarify Your Idea, Set Up Your Project (~60 min)

You have an idea, but it's fuzzy. "I want to build a pet tracker app." Nice! But what does it actually *do*? Who uses it? What doesn't it do?

Before you spec anything, **you need to clarify your idea and set up your project structure.** This lesson teaches you to use Claude, Notion, and your repo to organize like a pro. 🎯

### Part 1: Interview Claude to Clarify Your Idea (15 min)

Open Claude Code or ChatGPT and ask it to interview you:

```
I want to build a pet tracker app. 

Please interview me with 5-7 questions to help me think through:
- What problem does it solve?
- Who will use it?
- What's the MVP (bare minimum)?
- What are we NOT building?
- How do we know it works?

Ask one question at a time and wait for my answers.
```

Claude will ask questions like:
- "What kind of pets? Just dogs and cats, or any pet?"
- "Should owners be able to track multiple pets?"
- "Do you want reminders (vet checkups, feeding times)?"
- "Can parents or vets see the app?"

**Your answers become your project brief** — the clear picture of what you're building. 💭

### Part 2: Design Your Notion Home for This Project (15 min)

Your project lives in **two places:**
1. **Notion** = where you think and make decisions 🧠
2. **Repo** = where you write code 💻

In Notion, create a simple dashboard with:

**📍 Project Brief** (1 page summarizing: problem, users, core features, out-of-scope, success)

**🗺️ Build Roadmap** (phases: what you're building when)

**🎨 Design Ideas** (sketches, wireframes, user flow notes)

**🔬 Research** (things you discovered, alternatives you considered)

Example:

```
# Pet Tracker — Project Home 🐾

## Project Brief
Problem: Pet owners forget when to feed, walk, or take pets to the vet.
Users: Pet owners (age 16+) with 1-3 pets.
Core Features: Log feeding times, log walks, get reminders.
Out of Scope: Social/sharing, breed info, vet directory.
Success: Owner uses it daily for 2 weeks to track 2 pets.

## Roadmap
Phase 1: Auth + Add pet + Log feedings & walks
Phase 2: Reminders
Phase 3: Multiple pets

## Design Ideas
- Simple dashboard: today's tasks (feeding, walks)
- Pet card: show pet photo, name, last fed time
- Big button: "I just fed [pet name]"
```

This is your project notebook. Everything non-code goes here! 📓

### Part 3: Scaffold Your Repo (15 min)

Ask Claude:

```
I'm building a pet tracker app in Next.js.
Set up my project folder structure and create my initial files:
- Folder structure (app/, components/, lib/, etc.)
- CLAUDE.md (how AI should help me)
- FEATURES.md (all features I want to build)
- Initial package.json template
```

Claude will give you the structure. Create the folders and files, then commit:

```bash
git add .
git commit -m "chore: project scaffolding for pet tracker"
```

Your repo is now ready to build in! ✨

### Part 4: Create Your Feature Checklist (15 min)

In your repo, create `FEATURES.md` with all the features you want:

```markdown
# Pet Tracker — Feature List

## Phase 1
- [ ] Sign up and log in
- [ ] Add a pet (name, type, photo)
- [ ] Log a feeding (mark pet as fed)
- [ ] Log a walk (mark pet as walked)
- [ ] Dashboard showing last fed & walked times

## Phase 2
- [ ] Get reminders (email when overdue)
- [ ] Track multiple pets
- [ ] View history (past feedings/walks)

## Nice-to-Haves
- [ ] Pet birthday tracking
- [ ] Health checkup reminders
- [ ] Share with family members
```

As you build, check things off! This keeps you focused. ☑️

---

## Lesson 3.2 — Why Plan When AI Is So Fast? ⚡ (~30 min)

Sounds backwards, right? "But the AI can write code in seconds, why plan?"

Here's the thing: the faster you can code, the more it costs when you code the wrong thing.

The AI can make a screen in 10 seconds. But if you haven't thought about what data it needs, where it connects, or what "done" means, you'll end up with 10 screens that don't fit together. Then you spend hours fixing it.

**Planning isn't slowing you down — it's the context you'll give the AI later.** A good plan = good prompts = good code.

The rule: **Decide what you're building and in what order BEFORE you ask the AI to build it.**

---

## Lesson 3.2b — Recording Your Decisions as You Plan (~25 min)

When Claude Code interviews you and builds your plan, you're making dozens of small choices:
- "Should users be able to add multiple pets or just one?"
- "Why did I pick Supabase instead of Firebase?"
- "Why does the data model have a `tags` table instead of just text fields?"

These **decisions matter**. Six months from now, when you're maintaining your code, or when a teammate joins, they'll ask "Why is it built this way?" If you don't have an answer, they might break something or rebuild it wrong.

**That's why you create a `decisions.md` file** — a record of WHY you made each design choice. It's not a to-do list. It's a notebook of your thinking.

### What Goes in decisions.md

Each decision is simple: *What did I decide, and why?*

**Example from a pet tracker:**

```markdown
# Pet Tracker — Design Decisions

## Decision 1: Multiple pets per user
**Chose:** Yes, users can track 2-3 pets.
**Why:** My interview showed pet owners often have multiple pets. Tracking just one would feel too limited.
**Alternative:** Start with one pet per user, add multi-pet later.
**Impact:** Needs a link between `users` and `pets` tables.

## Decision 2: Database choice
**Chose:** Supabase (PostgreSQL).
**Why:** We need real-time updates (live streak counts) and Row-Level Security. Supabase does both.
**Alternative:** Firebase, which is simpler but harder to query complex data.
**Impact:** SQL queries, not NoSQL. Data is relational.

## Decision 3: Reminders (out of scope)
**Chose:** NOT building reminders in MVP.
**Why:** Keeps the project small. We can add reminders in Phase 2 after users give feedback.
**Alternative:** Build reminders from the start (way more complex).
**Impact:** Don't need a notifications table or email service yet.
```

### How to Ask Claude Code to Create decisions.md

After Claude Code creates your `spec.md` and `decisions.md`, review it. But if Claude Code doesn't fully explain your decisions, you can ask it to be more explicit:

```
I want to improve my decisions.md file. 
For each design choice we made (data model, screens, build order), write 1-2 sentences explaining:
1. What we decided
2. Why we decided it (what problem does it solve?)
3. What alternative did we consider?

Make it detailed enough that someone new to the project can understand our reasoning 6 months from now.
```

Claude Code will expand your decisions.md with clear reasoning for each choice. Perfect! 💡

### Why This Matters

When you ship code, **your code is a conversation between you and the next person who maintains it** — maybe that's future-you, a teammate, or someone hiring you.

If they see a complex data model and ask "Why is it like this?" and you say "Uh... I don't remember," you've lost credibility. But if you say "Here's the spec we wrote, and here's why we chose this model," you look professional. You've *documented your thinking*.

Also, writing down your decisions forces you to think clearly. If you can't explain why you chose something, maybe you shouldn't have! 🤔

---

## Lesson 3.3 — Build Your Plan with Claude Code (~60 min)

A spec is just a written description of what your app should do. Instead of manually writing it yourself, you'll **use Claude Code to interview you and build the entire plan automatically**. This saves time and makes sure you don't miss anything. 🚀

**Your spec will answer these questions:**

1. **What problem does it solve?** (Who's stuck and why?)
2. **Who uses it?** (What are they trying to do?)
3. **What's the MVP?** (What's the bare minimum to ship?)
4. **What's NOT in the MVP?** (What cool stuff are you saving for later?)
5. **How do you know it works?** (What does success look like?)

### Let Claude Code Orchestrate Your Planning

Instead of asking questions one by one, you'll give Claude Code your idea and ask it to run the full planning workflow!

**Step 1:** Open Claude Code:

```bash
claude
```

**Step 2:** Paste this prompt (replace "homework tracker" with your idea):

```
I want to build an app that helps students track their homework and get reminders.

Please help me plan it completely:

1. Ask me 5-7 clarifying questions to understand my app better
2. Based on my answers, write a one-page spec (problem, users, core features, out-of-scope, success)
3. Suggest a data model (table names and fields)
4. List 5-7 key screens users will see
5. Recommend a build order with dependencies
6. Save everything to my project folder

After each step, show me the output and ask if I want to change anything!
```

**Step 3:** Claude Code will:
- Interview you with smart questions (like "Do you need reminders?" and "Can parents see it?")
- Wait for your answers
- Draft your complete spec based on what you said
- Propose a data model, screen list, and build order
- **Save spec.md and decisions.md files** automatically 📁

**Step 4:** Review Claude Code's output. If something looks wrong, tell it! Say things like: "Actually, I don't need reminders, can you remove that?" and Claude Code will adjust. ✏️

**Watch out:** Claude Code will confidently suggest features. It's smart, but *you* make the final call on what's in your MVP. The AI is helping you think, not making decisions for you. You're the boss! 😎

---

**[SCREENSHOT PLACEHOLDER: Claude Code Planning Session]**

**What this screenshot should show:**
- Terminal window with Claude Code running
- Claude Code asking questions: "How many assignments per class? Do you need reminders? Can teachers see your progress?"
- Your answers visible below each question
- Claude Code's drafted spec, data model, screen list, and build order
- Files saved to project folder: `spec.md` and `decisions.md`
- **Shows:** how Claude Code orchestrates the entire planning workflow in one session 💡

---

## Lesson 3.4 — Your Technical Plan (Already Made!) (~60 min)

Good news: **Claude Code already created your technical plan** when you ran the planning workflow in Lesson 3.2! 🎉

Your technical plan includes:

1. **Data Model** — what you're storing
   - Example for homework tracker: `users`, `homework` (with fields: subject, description, due_date, done, created_at)
   
2. **Screens** — what the user sees
   - Example: Home page (list all homework), Add screen (form), Detail screen (view one assignment)
   
3. **Build Order** — tasks in the right sequence
   - Example: Database setup → Create form → Show list → Wire up save/delete

**Your job:** Review what Claude Code suggested. Does it match your vision? If something doesn't look right, ask Claude Code to adjust it. 

**Example:** "Actually, I don't need a detail screen. Can you simplify the plan to just a list and a form?"

Claude Code will revise the entire plan to match what you want. Easy! ✨

### Worked Example: Pet Tracker from Spec to Technical Plan

Let me walk you through a complete example so you see how the spec becomes a plan. Here's a real pet tracker spec:

**THE SPEC (what the app does):**

```
PROBLEM: Pet owners forget when they last fed their pet.

USERS: People with 1-2 pets who want a simple tracker.

MVP FEATURES:
1. Sign up and log in
2. Add a pet (name, type, photo)
3. Mark pet as fed (timestamp logged)
4. See last fed time on dashboard
5. Can edit pet details

OUT OF SCOPE:
- Reminders (phase 2)
- Multiple pets per account (start with 1)
- Sharing with family (future)

SUCCESS: User adds a dog, feeds it, and sees "Last fed: 2 hours ago" on the dashboard.
```

**THE TECHNICAL PLAN Claude Code builds:**

**1. Data Model (what we store):**

```sql
-- Users table (auth)
users: id, name, email, password_hash, created_at

-- Pets table (the thing we're tracking)
pets: id, user_id, name, type (dog/cat), photo_url, created_at

-- Feeding logs (history)
feedings: id, pet_id, fed_at (timestamp), created_at
```

**Why this design?**
- `pets` links to `users` so each user only sees their pets (privacy via database)
- `feedings` is a separate table so you can have a history (see "fed 5 times this week" later)
- We DON'T have a `last_fed` field in `pets` because we can calculate it from `feedings` (avoids data duplication)

**2. Screens (what users see):**

```
Screen 1: Login/Sign Up
  → Text field for email + password
  → "Sign up" button

Screen 2: Dashboard (main page after login)
  → Shows: [Pet photo] [Pet name]
  → Shows: "Last fed: 2 hours ago"
  → Shows: "Mark as fed" button (big, green)
  → Shows: "Edit pet" link

Screen 3: Add Pet (reached from dashboard)
  → Text field: Pet name
  → Dropdown: Type (dog / cat)
  → File upload: Pet photo
  → "Save" button

Screen 4: Edit Pet
  → Same fields as Add Pet
  → "Update" button
  → "Delete pet" button (red, dangerous)
```

**Why these screens?**
- Users only need to add 1 pet (MVP), so just 1 form
- Dashboard is the main page (most used action: "mark as fed")
- We're NOT building a history view (out of scope), just the last time

**3. Build Order (what to build first):**

```
Task 1: Set up Supabase (auth + pets table + feedings table)
   → Why first? Everything depends on the database

Task 2: Build login/sign up flow
   → Why second? Users can't access the app without this

Task 3: Build dashboard (show pet name + last fed time)
   → Why third? This is the main page, must work

Task 4: Build "Mark as fed" button (writes to feedings table)
   → Why fourth? Users can log feedings now

Task 5: Build "Add pet" form (creates row in pets table)
   → Why fifth? Users can set up their account

Task 6: Build "Edit pet" page
   → Why last? Nice-to-have; can ship without it at first
```

**Why this order?**
- Can't show the dashboard (Task 3) before the database (Task 1) exists
- Can't test "mark as fed" (Task 4) before the dashboard works (Task 3)
- Adding pets (Task 5) can wait because Claude Code can pre-populate a test pet
- Editing (Task 6) is the least critical

### Critique Step: Does the plan match your vision?

**You review Claude Code's plan and ask:**
- "Does the data model look right?" → If not, say what's wrong
- "Do these screens cover what users need?" → If not, suggest new screens or remove some
- "Does the build order make sense?" → If not, tell Claude Code which tasks should move

**Example critique:** "Wait, I want users to be able to track 2 pets, not just 1. And I want a history view so I can see 'fed 5 times this week.' Can you revise?"

Claude Code updates the data model (no change, already supports 2 pets!), adds a history screen, and reorders tasks. It takes 30 seconds. 🚀

This is the power of planning: **you catch scope/priority issues before writing a single line of code.** If Claude Code had just started coding, you'd be 3 hours in before realizing you need a history view!

---

---

## Lesson 3.5 — Understand Your Build Order (~60 min)

You can't build everything at once. Some tasks depend on others. **Claude Code already figured this out for you!** 🎯

When Claude Code created your plan, it ordered the tasks logically. Here's why the order matters:

**Example order for homework tracker:**

1. ✅ Set up the database (can't save homework without this)
2. ✅ Build the form (can't add homework without this)
3. ✅ Build the list view (can't see homework without this)
4. ✅ Wire up the save button
5. ✅ Wire up done/delete buttons

**Each task depends on the ones before it.** You can't wire up the save button before you have a form and database! Claude Code's build order makes sure you never get stuck. 

**Review your build order:** Look at the task list Claude Code created. Ask yourself:
- Does step 2 depend on step 1? (Why or why not?)
- What would break if you did step 4 before step 3?

**If the order looks wrong**, tell Claude Code! Example: "I want to build the login system first before the homework form." Claude Code will revise the order to match.

### Understanding Dependencies: Real Scenarios

Let's practice thinking about dependencies with three scenarios. For each one, figure out the right build order.

**Scenario A: Task dependencies with independent work**

You have these 6 tasks for your pet tracker:

- Task A: Set up Supabase database
- Task B: Build dashboard page (shows pet info)
- Task C: Build login/sign up
- Task D: Add "Mark as fed" button (calls database)
- Task E: Build pet photo upload feature
- Task F: Add email reminders (sends email)

*Question: What's the safest build order?*

**Think first:** Which of these MUST happen first? Which can happen independently?

**Answer:**
```
Safe order:
1. Task A (database) — everything depends on this
2. Task C (auth) — users need to log in first
3. Task B (dashboard) — needs auth + database to work
4. Task D (mark as fed) — needs database + dashboard
5. Task E (photo upload) — independent, can happen anytime after Task A
6. Task F (reminders) — last, least critical

Key insight: Tasks E and F could be done by someone else while you're doing B, C, D.
If you're solo, do A→C→B→D first, then E and F.
```

**Scenario B: Deadline pressure and prioritization**

Your client wants the pet tracker ready by Friday. It's Wednesday. You estimate:

- Database setup: 1 day
- Auth (login/sign up): 1 day
- Dashboard: 1 day
- "Mark as fed" button: 4 hours
- Photo upload: 2 hours
- Email reminders: 2 days

*Question: What's your MVP for Friday? Which features do you cut?*

**Think first:** What's the minimum the client needs to use the app?

**Answer:**
```
Friday deadline (2 days available):

MUST BUILD (day 1 + day 2):
- Database setup (1 day) — foundation
- Auth (1 day) — users can log in

MUST BUILD (half of day 2):
- Dashboard (1 day, but use Claude to speed it up) — users see their pet
- "Mark as fed" button (4 hours) — main feature works

SHIP FRIDAY with this. Users can: sign up → see their pet → mark it fed.

MOVE TO v1.1 (next week):
- Photo upload (2 hours) — nice to have
- Email reminders (2 days) — complex, can wait

This is prioritization: What's the CORE problem you're solving? Reminders are nice,
but "I forgot to log that I fed my dog" is the core problem. Solve that first. 🎯
```

**Scenario C: Hidden dependencies**

You plan to build these 5 tasks in this order:

1. Build homepage
2. Build dashboard
3. Build settings page
4. Connect to database
5. Add login/sign up

*Question: What's wrong with this order?*

**Think first:** Does every task have what it needs?

**Answer:**
```
This order is BROKEN:

- Task 1 (homepage) — needs what from 2-5? Just styling. ✓ Can start.
- Task 2 (dashboard) — needs database (Task 4) to show data. ✗ Can't start yet.
- Task 3 (settings) — needs database to save settings. ✗ Can't start yet.
- Task 4 (database) — needs auth (Task 5) to know whose data. ✗ Can't start yet.
- Task 5 (login) — needs database set up first (Task 4). ✗ Wrong order.

CORRECT ORDER:
1. Build login/sign up (Task 5 first!)
2. Connect to database (Task 4 — after auth is done)
3. Build dashboard (Task 2 — now it has auth + database)
4. Build settings (Task 3 — now it has auth + database)
5. Build homepage (Task 1 last — just styling, no dependencies)

Key lesson: Draw the dependency chain BEFORE you start. If Task X needs Task Y,
Y must come first. This saves you from wasted work! 📊
```

---

## Next: Use Your Plan in Module 4

You now have a plan for your pet tracker (or homework helper). In Module 4, you'll actually build it using Cursor. Open your plan and use it—this proves that planning works.

---

## Lesson 3.6 — Writing Your Plan as a Prompt (~45 min)

After all this planning, you have a document. That document becomes your AI prompt!

When you ask the AI to build something, hand it your spec and plan:

*"Build a homework tracker. Here's the spec [paste spec]. Start with task 1: set up a Supabase table with these fields: [list]. Return the SQL."*

Boom. The AI has all the context it needs. You get the right code first time because you told it exactly what you want.

---

## Activity: Plan Your Own Project 🎨

Pick one of these three projects (or use your own small idea). For EACH, you'll create: a spec, a data model, a screen list, and a build order.

---

### PROJECT 1: Habit Tracker 🎯

**Idea:** An app where you log daily habits and watch your streaks grow (e.g., "workout," "read," "meditate").

**SAMPLE SPEC (what good looks like):**
```
PROBLEM & USERS
Kids want to build good habits but lose motivation without feedback.
Users: kids and teens (age 10+) on any device.

CORE FEATURES (MVP)
1. Sign up and log in
2. Create a habit (name, description)
3. Check off a habit each day
4. See your current streak (consecutive days completed)
5. View all habits and their streaks

OUT OF SCOPE
- Social features (showing friends)
- Rewards or badges (v2)
- Reminders / notifications (future)

SUCCESS
A user creates 3 habits, checks them daily, and sees their streaks growing.
```

**SAMPLE DATA MODEL:**
```
users: id, name, email, created_at
habits: id, user_id, name, description, created_at
completions: id, habit_id, date (yyyy-mm-dd), created_at
```

**SAMPLE SCREENS:**
1. Login / Sign up
2. Dashboard: List of habits with current streak for each
3. Add Habit: Form to create a new habit
4. Habit Detail: View streak, past completions, edit/delete buttons
5. Daily Check-in: Checkboxes for today's habits

**SAMPLE BUILD ORDER:**
1. Auth (sign up/login, users table)
2. Create habit (habits table + form)
3. List habits (show on dashboard)
4. Mark habit done (add to completions table)
5. Display streaks (count consecutive days, show on dashboard)

---

### PROJECT 2: Video Game Wishlist 🎮

**Idea:** An app to track games you want to play. Mark them done when you finish them.

**SAMPLE SPEC:**
```
PROBLEM & USERS
Gamers have tons of games on their wishlist but forget which ones they wanted to play.
Users: gamers (age 13+) who play video games.

CORE FEATURES (MVP)
1. Sign up and log in
2. Add a game to your wishlist (name, platform, rating)
3. View all games on your wishlist
4. Mark a game as played/completed
5. See how many games you've completed

OUT OF SCOPE
- Game reviews or descriptions (v2)
- Multiplayer/sharing lists (future)
- Game recommendations (v2)

SUCCESS
User adds 10 games, plays 3, and can see which ones are done.
```

**SAMPLE DATA MODEL:**
```
users: id, name, email, created_at
games: id, user_id, title, platform, rating, completed, completed_date, created_at
```

**SAMPLE SCREENS:**
1. Login / Sign up
2. Wishlist: List of all games (show which are completed)
3. Add Game: Form to add a new game
4. Game Detail: Full details, mark as played, edit/delete
5. Stats: "You've completed X of Y games"

**SAMPLE BUILD ORDER:**
1. Auth (users table, sign up/login)
2. Add game (games table + form to create)
3. List games (show on dashboard)
4. Mark game complete (update completed status)
5. Show stats (count completed games)

---

### PROJECT 3: Poll Tool 📊

**Idea:** Create quick polls and share them. Anyone can vote. See results live.

**SAMPLE SPEC:**
```
PROBLEM & USERS
Event planners, teachers, and friends want quick feedback without complicated setup.
Users: anyone organizing a quick group decision.

CORE FEATURES (MVP)
1. Create a poll (question + options, like "Pizza or tacos?")
2. Share a public link (no login needed to vote)
3. Vote on a poll (click your choice)
4. See live results (vote counts and percentages)
5. Creator can view their polls and results

OUT OF SCOPE
- Timed polls that close automatically (v2)
- Multiple questions per poll (keep it simple)
- Email notifications (future)

SUCCESS
Creator makes a poll, shares the link, 10 people vote, creator sees results.
```

**SAMPLE DATA MODEL:**
```
users: id, name, email, created_at
polls: id, creator_id, question, created_at
options: id, poll_id, text, vote_count
```

**SAMPLE SCREENS:**
1. Create Poll: Question input, add options (buttons to add more), create button
2. Vote Page (public): Question, radio buttons or buttons for each option, vote button
3. Results: Question, options with vote counts and percentage bars
4. My Polls: List of polls I created, view results button, share link

**SAMPLE BUILD ORDER:**
1. Auth (creators sign up/login)
2. Create poll (polls table + form)
3. Public vote page (no auth needed)
4. Results page (count votes, show percentages)
5. My polls dashboard (list creator's polls)

---

### Activity Instructions 🎯

**Step 1: Pick one of the three projects** (or propose your own small idea)

**Step 2: Run Claude Code's planning orchestration:**
- Open Claude Code: `claude`
- Paste the prompt from Lesson 3.2 (replace "homework tracker" with your idea)
- Answer Claude Code's interview questions
- Review the spec, data model, screen list, and build order it creates

**Step 3: Refine the plan (if needed):**
- If something doesn't look right, tell Claude Code!
- Examples: "Remove the reminders feature" or "Add a settings screen" or "Change the data model"
- Claude Code will revise the whole plan to match

**Step 4: Save your plan:**
- Claude Code will save `spec.md` and `decisions.md` to your project folder
- These files are your planning artifacts — keep them! You'll use them when you start building in Module 4

**Step 5: Submit:**
- Your complete planning output:
  - Spec file (spec.md)
  - Decisions file (decisions.md)
  - Data model
  - Screen list
  - Build order

---

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Clarify idea & scaffold project (Quiz Q3-k1, Q3-k2):**
- Q3-k1: "You have a rough idea. Who do you ask to help you clarify it?" ✅ Tests who to use as thinking partner
- Q3-k2: "Which belongs in Notion, which belongs in your repo?" ✅ Tests Notion vs repo judgment
- **Written check:** Write a project brief (problem, users, 3-4 core features, out-of-scope, success) for your idea.

**Objective 2 — Produce a spec (Quiz Q3-k3, Q3-k4):**
- Q3-k3: "Why does planning matter when AI codes fast?" ✅ Tests value of planning
- Q3-k4: "A lightweight spec must include all EXCEPT:" ✅ Tests spec content
- **Written check:** For "an app to organize school supplies," write a one-page MVP spec with: problem, users, 4-5 core features, out-of-scope, success criteria.

**Objective 3 — Translate to technical plan (Quiz Q3-k5):**
- Q3-k5: "When planning an app, what should you design first?" ✅ Tests planning order
- **Written check:** For the "school supplies" app, propose: (1) a data model (table names + fields), (2) a screen list (5-7 screens), (3) build milestones.

**Objective 4 — Sequence with dependencies (Quiz Q3-k6):**
- Q3-k6: "A dependency means:" ✅ Tests dependency understanding
- **Written check:** For the "school supplies" app, list 6-8 build tasks in order. For at least 3, explain what must exist first.

**Scenario-based judgment checks (all objectives):**

For each scenario, identify what's wrong and how to fix it:

- (a) Your spec says "Users can create an account, upload a profile picture, and join groups." Which is too ambitious for MVP, and why?
- (b) Your data model has `users` and `posts` tables, but no way to know which user wrote each post. What's missing?
- (c) You want to build: 1) Create post, 2) List posts, 3) Add comment, 4) Delete comment. What's the dependency problem?
- (d) Your spec says "The app should be fast and easy to use." Is this a good spec? Why or why not?

---

## Tools & Alternatives (This Module)

**Planning works everywhere.** Any AI tool (Claude Code, ChatGPT, Cursor's chat) can be your thinking partner. The default is **Claude Code**, so you can save your spec and plan as files next to your code. But a text file, a note-taking app, or even a Google Doc works fine — the thinking matters more than the tool.

**Pro tip:** keep your spec in a shared document (Google Docs, Notion) so if you're working with others, everyone sees the same plan. In Module 13, you'll connect Notion to Claude Code so the AI can check off your tasks as it builds them!

---

## Key Takeaways

- Planning is the context you'll feed the AI later 📝
- A spec answers: problem, users, MVP, out-of-scope, success
- A technical plan shows: data model, screens, build order
- Order matters — some tasks depend on others
- Good plan + good prompt = good code first time 🎉

**Next:** Module 4 — Building in Cursor (Your First Real Project!)
