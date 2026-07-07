# Module 3: Plan Before You Code! 📋

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~4 hours · **XP:** 400

**What you need:** Modules 1-2 (know how AI thinks, know how to prompt)

> **Why this matters:** Coding fast is fun, but coding *without a plan* is chaos. This teaches you to plan *with* AI — use it as a thinking partner to figure out what you're building before you build it. A good plan saves you from writing code that doesn't fit together.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Write** a spec for your app (what it does, who uses it, what's MVP)
2. **Turn** your spec into a technical plan (data model, screens, tasks)
3. **Order** your tasks so you build things in the right sequence

---

## Lesson 3.1 — Why Plan When AI Is So Fast? ⚡ (~30 min)

Sounds backwards, right? "But the AI can write code in seconds, why plan?"

Here's the thing: the faster you can code, the more it costs when you code the wrong thing.

The AI can make a screen in 10 seconds. But if you haven't thought about what data it needs, where it connects, or what "done" means, you'll end up with 10 screens that don't fit together. Then you spend hours fixing it.

**Planning isn't slowing you down — it's the context you'll give the AI later.** A good plan = good prompts = good code.

The rule: **Decide what you're building and in what order BEFORE you ask the AI to build it.**

---

## Lesson 3.2 — Build a Spec (What You're Making) (~60 min)

A spec is just a written description of what your app should do. You don't need fancy templates, just clarity.

**Your spec answers these questions:**

1. **What problem does it solve?** (Who's stuck and why?)
2. **Who uses it?** (What are they trying to do?)
3. **What's the MVP?** (What's the bare minimum to ship?)
4. **What's NOT in the MVP?** (What cool stuff are you saving for later?)
5. **How do you know it works?** (What does success look like?)

**The hack:** Use AI to help you write the spec! Describe your rough idea and ask: "Ask me questions to understand what I'm building, then draft a spec." Answer the questions, and boom — instant spec. 🎯

**Example:** 

*Your idea:* "I want an app where kids can track their homework and get reminders."

*AI asks:* 
- What homework? (Just due dates or full descriptions?)
- Who sends reminders? (Email? App notification?)
- Can your parents see it?
- What about past homework? (Archive or delete?)

*After you answer, AI writes:*

---

**Homework Tracker Spec**

**Problem:** Kids forget homework and miss deadlines.

**Users:** Middle/high school students who want to remember assignments and stay on top of deadlines.

**MVP:**
- Add a homework assignment (subject, due date, description)
- View all homework
- Mark homework done
- Get a reminder the day before due date

**Not in MVP:**
- Parent/teacher access
- Grade tracking
- Collaboration

**Success:** User doesn't miss a single assignment deadline.

---

**Watch out:** The AI will suggest features. It sounds smart. But *you* decide what's in the MVP, not the AI. You're the boss.

---

**[SCREENSHOT PLACEHOLDER: AI Interview + Drafted Spec]**

**What this screenshot should show:**
- Left panel: Claude/ChatGPT asked to interview the user
  - Prompt: "I want an app to track video games I want to play. Ask me questions to understand what to build."
  - AI questions visible: "How many games per list? Do you rate games? Can friends see your list?"
  - User answers visible below
- Right panel: AI's drafted MVP spec
  - Shows sections: Problem, Users, Core Features, Out of Scope, Success Criteria
  - Real example spec with details
- **Shows:** how interviewing reveals hidden assumptions and turns vague ideas into clarity 💡

---

## Lesson 3.3 — Turn Your Spec Into a Technical Plan (~60 min)

Now you know *what* you're building. Time to figure out *how*.

For every feature, write:

1. **Data** — what you're storing
   - Homework: subject, description, dueDate, done (yes/no), createdDate
   
2. **Screens** — what the user sees
   - Home page: List of all homework
   - Add screen: Form to create homework
   - Detail screen: View one homework assignment
   
3. **Tasks** — the code you need to write
   - Database setup
   - Create form component
   - Show homework list component
   - Wire up save/delete buttons

---

## Lesson 3.4 — Order Your Tasks (Dependencies) (~45 min)

You can't build everything at once. Some tasks depend on others.

**Example order for homework tracker:**

1. ✅ Set up the database (can't save homework without this)
2. ✅ Build the form (can't add homework without this)
3. ✅ Build the list view (can't see homework without this)
4. ✅ Wire up the save button
5. ✅ Wire up done/delete buttons
6. ✅ Add reminders

Do them in order. Each one feeds into the next.

**Question:** Why not build step 4 before step 3? (Answer: because you need the list to see if saving worked!)

---

**[SCREENSHOT PLACEHOLDER: Technical Plan (Data Model + Screens)]**

**What this screenshot should show:**
- Top section: AI's proposed data model for homework tracker
  - Table 1: `users` (id, name, email)
  - Table 2: `homework` (id, user_id, subject, description, due_date, done)
  - Table 3: `reminders` (id, homework_id, sent_date)
  - Clear relationships shown (user_id foreign keys)
- Middle section: Proposed screens
  - Screen 1: Dashboard (list all homework, sorted by due date)
  - Screen 2: Add homework form (subject, due date, description)
  - Screen 3: Homework detail (view, mark done, delete)
  - Screen 4: Settings (reminder preferences)
- Bottom section: Milestones
  - v0: Auth + homework CRUD
  - v1: Reminders working
- **Shows:** how to translate spec into concrete tables, screens, and milestones 📋

---

## Lesson 3.5 — Writing Your Plan as a Prompt (~45 min)

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

**Step 2: Use AI as an interview partner:**
- Paste your one-sentence idea into Claude Code or ChatGPT
- Ask: "I want to build [idea]. What questions would you ask me to clarify what I'm building?"
- Answer the AI's questions honestly
- Ask: "Now draft a complete spec based on our conversation"

**Step 3: Create a technical plan:**
- Ask the AI: "Based on this spec, propose: (1) a data model (tables and fields), (2) a list of screens, (3) a build order with dependencies"
- Review the output: does it match your vision? Fix anything that's off.

**Step 4: Submit:**
- Your final spec (answer the 5 questions: problem, users, MVP, out-of-scope, success)
- Your data model (table names, fields, relationships)
- Your screen list (5-7 screens)
- Your build order (6-8 tasks with dependencies explained)

---

## Knowledge Check (Mapped to Your Objectives)

**Objective 1 — Produce a spec (Quiz Q3-k1, Q3-k2):**
- Q3-k1: "Why does planning matter when AI codes fast?" ✅ Tests value of planning
- Q3-k2: "A lightweight spec must include all EXCEPT:" ✅ Tests spec content
- **Written check:** For "an app to organize school supplies," write a one-page MVP spec with: problem, users, 4-5 core features, out-of-scope, success criteria.

**Objective 2 — Translate to technical plan (Quiz Q3-k4):**
- Q3-k4: "When planning an app, what should you design first?" ✅ Tests planning order
- **Written check:** For the "school supplies" app, propose: (1) a data model (table names + fields), (2) a screen list (5-7 screens), (3) build milestones.

**Objective 3 — Sequence with dependencies (Quiz Q3-k3):**
- Q3-k3: "A dependency means:" ✅ Tests dependency understanding
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
