# Module 3: Planning Software with AI

**Stage:** Foundations · **Level:** Beginner · **Duration:** ~4 contact hours (0.4 CEU)

**Prerequisites:** Modules 1–2 (understand how models behave; be able to write and decompose prompts).

> The last Foundations module and the bridge into building. Beginners want to jump straight to code; this teaches the discipline that separates people who ship working software from people who generate a pile of code that doesn't fit together. Plan *with* AI — don't skip planning because AI is fast. The spec and task breakdown produced here feed every build module that follows.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* are placeholders — capture from a live AI session (manual).
> 

## Learning objectives

By the end of this module, the learner can:

1. **Produce** a written product spec and task breakdown from a raw idea using AI. *(Create)*
2. **Translate** requirements into a technical plan (data model, screens, milestones). *(Apply)*
3. **Sequence** a feature into dependencies and an ordered build plan. *(Analyze)*

---

## Lesson 3.1 — Why plan when AI writes code so fast? (~30 min)

The faster the tool, the more a bad plan costs. AI can generate a screen in seconds — but if you haven't decided what data it needs, how it connects to the next screen, or what "done" means, you'll generate ten screens that don't fit together and spend far longer untangling them than planning would have taken.

Reframe planning for the AI era: it's not overhead, it's **the context you'll feed the model.** A clear spec and task list *is* the high-quality context from Module 2, written once and reused across every build prompt. Skipping planning doesn't save time — it moves the thinking into the middle of the build, where it's more expensive.

**The core idea:** decide *what* you're building and *in what order* before you ask AI to build any of it.

---

## Lesson 3.2 — From raw idea to a spec, with Claude Code (~60 min)

This delivers Objective 1. A spec is a short written description of what the software should do — you don't need a formal template, you need clarity. **Use Claude Code as your planning orchestrator.**

**A lightweight spec answers:**

- **Problem** — what pain does this solve, and for whom?
- **Users** — who uses it, and what are they trying to accomplish?
- **Core features** — the handful of things it must do (the MVP).
- **Out of scope** — what you're deliberately *not* building yet (as important as what you are).
- **Success** — how you'll know it works.

### Using Claude Code to build the spec

Instead of manually writing or passively chatting, **prompt Claude Code to orchestrate the full planning workflow:**

```bash
claude
```

Then describe your idea:

```
I want to build an app that helps freelancers track invoices. 
Please orchestrate my planning:

1. Interview me with 5–7 clarifying questions to understand my MVP
2. Based on my answers, draft a one-page spec (problem, users, core features, out-of-scope, success)
3. Propose a data model (table names, key fields, relationships)
4. Suggest 5–7 key screens
5. Recommend a build order with dependencies explained
6. Create a decisions.md file documenting why you chose this architecture

After each step, show me the output and ask if I want to revise or move on.
```

**Claude Code will:**
- Ask you clarifying questions and wait for your answers
- Draft the spec based on your responses
- Generate a technical plan
- Create the data model and screen list
- Propose a build order
- **Automatically log decisions** in a `decisions.md` file as you make them
- Save all of it to your project folder

### Why Claude Code for planning, not manual writing?

- **Speed:** interview → spec → technical plan happens in one session, not three
- **Completeness:** Claude Code catches questions you'd miss
- **Documentation:** decisions get logged automatically as you make them (see "Recording decisions as you plan" below)
- **Reusability:** the output becomes your build-stage prompts — you paste the spec into Cursor/Claude Code for each coding task

> **Instructor demo:** Run a live Claude Code planning session for a one-sentence idea. Show how the interview surfaces hidden assumptions, and how the orchestrated workflow produces a complete plan in 15 minutes.
> 

---

**[SCREENSHOT PLACEHOLDER: Claude Code Planning Session]**

**What this screenshot should show:**
- Terminal window with Claude Code running
- Claude Code asking clarifying questions ("Who is your primary user? How many invoices per month?")
- User's text answers visible
- Claude Code's responses: drafted spec, data model, screen list, build order
- Final output: a `spec.md` file and `decisions.md` file created in the project folder
- Shows: how Claude Code orchestrates the entire planning workflow end-to-end

---

**Watch-out (Module 1):** Claude Code will confidently suggest features and scope. Treat its output as a draft to edit, not gospel — *you* own the scope decisions. The orchestration saves time; the thinking is still yours.

---

## Lesson 3.3 — Translating the spec into a technical plan (~60 min)

This delivers Objective 2. A spec says *what*; a technical plan says *how*. Translate each feature into three things:

- **Data model** — what the app stores. For the invoice tracker: `clients` (name, email), `invoices` (client, amount, due date, status). This previews Module 7 (Supabase/Postgres).
- **Screens / views** — what the user sees: a client list, an invoice list, a "new invoice" form, a dashboard. Each maps to features in the spec.
- **Milestones** — checkpoints where you have something that works: "v0: add and list clients," "v1: create invoices," "v2: mark paid and see totals."

Prompt the AI for a first draft of each ("Given this spec, propose a simple data model and the screens needed"), then critique it (Module 2 skill) against your intent.

---

**[SCREENSHOT PLACEHOLDER: Technical Plan (Data Model + Screens)]**

**What this screenshot should show:**
- Top section: AI's proposed data model
  - Table 1: `users` (id, name, email, created_at)
  - Table 2: `invoices` (id, user_id, client_id, amount, due_date, status)
  - Table 3: `clients` (id, user_id, name, email, phone)
  - Clear relationships shown (user_id foreign keys)
- Middle section: Proposed screens/views
  - Screen 1: Dashboard (total invoices, revenue, overdue count)
  - Screen 2: Clients list (add, edit, delete)
  - Screen 3: Invoices list (filter by status, action links)
  - Screen 4: New invoice form
  - Screen 5: Invoice detail view (mark paid, edit, delete)
- Bottom section: Milestones
  - v0: Auth + clients CRUD
  - v1: Invoices CRUD
  - v2: Dashboard with analytics
- Shows: how to translate spec into concrete technical plan with data, UI, and sequencing

---

---

## Lesson 3.4 — Sequencing: dependencies and build order (~60 min)

This delivers Objective 3. Not all tasks are equal — some must come before others. Teach learners to spot **dependencies** and order work so they're never blocked.

**Rule of thumb:** build foundations before the things that rely on them. You can't display invoices before you can store one; you can't store one before the data model exists; a per-user app needs auth before user-owned data.

**Worked example — ordering the invoice tracker:**

1. Data model (clients, invoices) — everything depends on this.
2. Auth / users — so data can belong to someone.
3. Create + list clients — invoices reference clients, so clients first.
4. Create + list invoices.
5. Mark invoice paid / status changes.
6. Dashboard with totals — depends on invoices existing.

Ask, for each task, "what must already exist for this to work?" That question *is* dependency analysis. The result feeds directly into the decomposed prompting from Module 2 — each step becomes a focused prompt in the Building stage (Modules 4–13).

---

## Hands-on activity (~40 min, folded in)

**"Plan a real app end to end."** Choose one of the provided project ideas (or use your own). Using AI as an interview partner, produce: (1) a one-page spec, (2) a data model + screen list, and (3) an ordered build plan. This artifact exercises all three objectives and becomes your starting point for the Building stage (Modules 4–13).

### Three project ideas to choose from:

**PROJECT 1: Habit tracker**
*One-sentence idea:* An app where users can log daily habits and see streaks (e.g., "workout," "read," "meditate").

**SAMPLE SPEC (what good looks like):**
```
PROBLEM & USERS
Users want to build good habits but lose motivation without feedback. 
Users: individuals (age 18+) using mobile or desktop.

CORE FEATURES (MVP)
1. Sign up and log in
2. Create a habit (name, description, category)
3. Check off a habit each day
4. See current streak (consecutive days completed)
5. View all habits and their streaks

OUT OF SCOPE
- Social sharing (v2)
- Analytics/graphs (v2)
- Recurring reminders/notifications (future)
- Multiple habit categories/tags (v2)

SUCCESS
Users can log in, create 3 habits, check them off daily, and see their streaks growing.
```

**SAMPLE DATA MODEL:**
```
users
  - id (uuid, primary key)
  - email (unique)
  - created_at

habits
  - id (uuid)
  - user_id (foreign key → users)
  - name (e.g., "workout")
  - description
  - created_at

completions
  - id (uuid)
  - habit_id (foreign key → habits)
  - date (yyyy-mm-dd)
  - created_at
```

**SAMPLE SCREENS:**
1. Auth: Sign up, Login
2. Dashboard: List of habits with current streak for each
3. Add Habit form: Name, description input, create button
4. Daily log: Checkboxes for today's habits, confirm button
5. Habit detail: Past completions, current streak, edit/delete

**SAMPLE BUILD ORDER:**
1. Auth (users table, sign up/login screens)
2. Create habit (habits table, form UI)
3. List habits (dashboard, fetch and display)
4. Mark complete (completions table, add-to-log UI)
5. Display streaks (calculate consecutive days, show on dashboard)

---

**PROJECT 2: Homework organizer for students**
*One-sentence idea:* A class schedule + assignment tracker. Students enter their classes, add due dates, get a dashboard of what's due.

**SAMPLE SPEC:**
```
PROBLEM & USERS
Students juggle multiple classes and forget due dates.
Users: high school / college students.

CORE FEATURES (MVP)
1. Sign up, log in
2. Create classes (name, professor, schedule)
3. Add assignments to a class (name, due date, description)
4. Dashboard showing assignments sorted by due date
5. Mark assignment complete (strikethrough)

OUT OF SCOPE
- Grade tracking (v2)
- Reminders / notifications (future)
- Calendar view (v2)
- Collaboration / shared assignments (future)

SUCCESS
A student can enter their 4 classes, add 10 assignments across them, and see all due dates in order.
```

**SAMPLE DATA MODEL:**
```
users
  - id, email, created_at

classes
  - id, user_id, name, professor, day_time (e.g., "MWF 10am")

assignments
  - id, class_id, title, due_date, description, completed, created_at
```

**SAMPLE SCREENS:**
1. Classes list: Add, view, edit class
2. Dashboard: All assignments sorted by due date (color-coded by class)
3. Add assignment form: Class (dropdown), title, due date, description
4. Assignment detail: Full details, toggle complete, edit/delete

**SAMPLE BUILD ORDER:**
1. Auth + classes CRUD
2. Assignments table and CRUD forms
3. Dashboard sorting by due date
4. Mark complete / completion toggling

---

**PROJECT 3: Simple poll/survey tool**
*One-sentence idea:* Create polls, share links, collect votes, see results live.

**SAMPLE SPEC:**
```
PROBLEM & USERS
Event planners, teachers, teams want quick feedback without setup overhead.
Users: anyone organizing a group decision.

CORE FEATURES (MVP)
1. Create a poll (question + options)
2. Share a public link (no login needed to vote)
3. Vote on a poll (click an option)
4. See live results (vote counts, percentages)
5. Creator can view their polls and results

OUT OF SCOPE
- Custom branding (v2)
- Time limits / poll closing (v2)
- Multiple questions per poll (stay simple)
- Email notifications (future)

SUCCESS
Creator makes a poll, shares the link, 20 people vote, creator sees live vote counts.
```

**SAMPLE DATA MODEL:**
```
users
  - id, email, created_at (creators only)

polls
  - id, creator_id, question, created_at, closed (boolean)

options
  - id, poll_id, text, vote_count

votes
  - id, option_id, voted_at (no user tracking; public voting)
```

**SAMPLE SCREENS:**
1. Create poll: Question input, option fields (dynamic), create button
2. Vote page (public, no auth): Question, radio buttons, vote button
3. Results page: Question, option names with vote counts and percentage bars
4. Creator dashboard: List of their polls, link to share, view results

**SAMPLE BUILD ORDER:**
1. Auth (creators only for login)
2. Create + list polls (creator dashboard)
3. Public vote page (no auth required)
4. Results page with live vote counts

---

### Activity instructions for learners (using Claude Code orchestration):

1. **Pick one of the three projects above** (or propose your own simple idea)

2. **Open Claude Code and orchestrate the planning:**
   ```bash
   claude
   ```
   
   Then paste this prompt (filling in your idea):
   
   ```
   I want to build: [YOUR ONE-SENTENCE IDEA]
   
   Please orchestrate my complete planning workflow:
   
   1. Interview me with 5–7 questions to understand my MVP and users
   2. Draft a one-page spec (problem, users, core features, out-of-scope, success)
   3. Propose a data model with tables, key fields, and relationships
   4. Suggest 5–7 key screens and their purposes
   5. Recommend a build order (10–15 tasks) with dependencies explained
   6. Log each decision in a decisions.md file as we talk (e.g., "Chose X over Y because...")
   
   After each section, show me the output and ask if I want to refine before moving on.
   ```

3. **Review and critique:**
   - Read Claude Code's interview questions — they often surface assumptions you missed
   - Answer honestly (Claude Code refines its output based on your feedback)
   - Review the spec: does it capture your vision? If not, tell Claude Code and it refines
   - Review the data model: is it simple enough? Missing fields? Tell Claude Code
   - Review the build order: does it make sense? Any dependencies you'd order differently?

4. **Let Claude Code save the outputs:**
   - Claude Code creates `spec.md`, `data-model.md`, `screens.md`, `build-order.md`, and `decisions.md`
   - These are now in your project folder for Modules 4–13

5. **Submit:**
   - Your final spec (1 page, 5 sections: problem, users, core features, out-of-scope, success)
   - Your data model (table names, key fields, relationships)
   - Your screen list (5–7 screens)
   - Your build order (10–15 tasks with dependencies noted for at least 3 tasks)
   - Your decisions.md (showing your key architectural choices and reasoning)

---

## Knowledge check (mapped to objectives)

**Objective 1 — Produce a spec (Quiz Q3-1, Q3-2):**
- Q3-1: "Why plan when AI writes code fast?" ✅ Tests value of planning
- Q3-2: "A lightweight spec should include all EXCEPT:" ✅ Tests spec content
- *Written check:* From the scenario "a small gym wants an app to book classes," write a one-page MVP spec with: problem statement, target users, 4–5 core features, explicit out-of-scope items, and success criteria.
  - **SAMPLE OUTPUT (what good looks like):**
    ```
    PROBLEM: Gym members waste time calling or emailing to book classes. Classes fill up and members don't know.
    USERS: Gym members (age 18–65) who take regular classes.
    CORE FEATURES:
    1. View available classes (day, time, capacity)
    2. Book a class (one-click reservation)
    3. Cancel a booking
    4. See personal schedule (my booked classes)
    5. Get notified when a class is full
    OUT OF SCOPE:
    - Payment / billing (member already has gym membership)
    - Trainer profiles (v2)
    - Class ratings / reviews (v2)
    SUCCESS: Members book 80% of their classes through the app within first week.
    ```

**Objective 2 — Translate to technical plan (Quiz Q3-4):**
- Q3-4: "For a note-taking app, what should you plan first?" ✅ Tests technical planning order
- *Written check:* For the gym booking app above, propose: (1) a data model (table names, key fields, relationships), (2) a screen list (5–7 screens), and (3) three milestones.
  - **SAMPLE DATA MODEL:**
    ```
    users (id, email, name, created_at)
    classes (id, name, description, day_time, max_capacity, created_at)
    bookings (id, user_id, class_id, booked_at, cancelled_at)
    ```
  - **SAMPLE SCREEN LIST:**
    1. Login / sign up
    2. Class browser (list/calendar view, filters)
    3. Class detail (description, time, capacity, book button)
    4. My bookings (upcoming classes, cancel button)
    5. Confirmation (booking successful or error)
  - **SAMPLE MILESTONES:**
    - v0: Auth + classes list
    - v1: Book class + my bookings
    - v2: Notifications + capacity alerts

**Objective 3 — Sequence with dependencies (Quiz Q3-3):**
- Q3-3: "A dependency means:" ✅ Tests dependency understanding
- *Written check:* For the gym booking app, list the build tasks in order (8–10 tasks) and for at least 3 tasks, state what must exist first.
  - **SAMPLE BUILD ORDER:**
    ```
    1. Auth (users table, sign up/login) — FOUNDATION
    2. Classes table & list screen (fetch & display) — depends on: auth (know which user is logged in)
    3. Book class form & logic (add to bookings table) — depends on: auth + classes (need both to create a booking)
    4. My bookings screen (query user's bookings, show schedule) — depends on: auth + classes + bookings tables
    5. Cancel booking (delete from bookings) — depends on: bookings table exists
    6. Capacity check (count bookings per class, disable if full) — depends on: bookings table populated
    7. Notifications / alerts (send email when class full) — depends on: capacity logic working
    8. Calendar view of classes (visual layout) — depends on: classes list working
    ```

---

**Scenario-based judgment checks (all objectives):**

For each scenario, decide what's wrong with the plan and explain how to fix it:

- (a) Your spec says "Users can create an account, upload a profile picture, and join groups." One sentence: which of these is scope creep, and why?
- (b) Your data model has `users`, `posts`, and `comments` tables, but no way to link comments back to users. What's missing?
- (c) You want to build: 1) Create post, 2) List posts, 3) Add comment, 4) Delete comment. What's the dependency issue?
- (d) Your spec says "The app should be fast and scalable." Is this a good spec? Why or why not, in one sentence?

*Pass mark: 80%. Completing this gates entry to Stage 2 (Building).*

---

## Tools & alternatives (this module)

Planning is tool-agnostic — any capable assistant (Claude Code, Cursor's chat, ChatGPT, Claude) works as a planning partner. The default is **Claude Code**, so you can keep the spec and plan as files alongside the code you'll build next. Alternatives (a chat window, a Notion doc, a text file) are fine — the deliverable is the *thinking*, not the tool that holds it.

**Tip:** keep the spec *and a feature checklist* in **Notion** as your project's source of truth — and in Module 13 you'll connect Notion to Claude Code (via MCP) so the AI can read the checklist and tick items off as it ships them.

---

## Recording decisions as you plan (Claude Code automation)

As you build your spec, technical plan, and build order, you're making **important choices.** Why did you choose Supabase over Firebase? Why store data this way instead of that way? Why build features in this order?

### Claude Code logs decisions automatically

**During the planning session with Claude Code (Lesson 3.2),** prompt it to capture decisions as you make them:

```
As we plan, whenever I mention a choice or reason, add it to a decisions.md file 
(in the project root) with a timestamp, the decision, and the reasoning. 
Example format:

### 2026-02-10 — Chose Supabase over Firebase
Supabase gives us SQL (more flexible for queries) + RLS (security). Firebase locks 
us into NoSQL. For per-user data, SQL wins.

Do this throughout our planning, so I don't have to manually write decisions.md later.
```

**Claude Code will:** automatically create and update `decisions.md` as you talk, so by the time planning is done, your decision trail is complete.

### What a good decisions.md looks like

Here's a complete example:

```markdown
# Project Decisions — Invoice Tracker

### 2026-02-10 — Chose Supabase over Firebase
Supabase gives us SQL (more flexible for complex queries) + RLS (row-level security, built in). 
Firebase has great mobile SDKs but locks us into NoSQL. For a data-heavy invoice tracker 
with per-user isolation, SQL + RLS wins.

### 2026-02-10 — Store invoices by status, not status + date
Simplifies filtering. We can re-sort on the client side. If we need date-based stats 
later, we'll add a computed column.

### 2026-02-10 — Build auth first, then clients, then invoices
Auth is the foundation—without it, data can't belong to anyone. Clients are simpler 
than invoices (no dependencies), so build that skill first. Invoices depend on both auth and clients.
```

### Why it matters

**In the moment:** it's easy to forget *why* you chose something. Logging decisions keeps them fresh.

**Later:** a month from now, you'll ask yourself "why did we pick this?" Decisions.md saves you from re-deciding and prevents scope creep ("we considered this in planning and decided against it").

**For your capstone (Module 16):** a well-governed project has a clear decision trail. This becomes part of the rubric — your capstone grader will want to see thoughtful choices, not just code.

**For teamwork:** if you onboard a teammate, they can read decisions.md and understand the architecture in minutes instead of asking you questions.

### Your part: review and refine

Claude Code creates the decisions.md automatically, but **you review and edit it.** If a decision was misunderstood or you want to add reasoning, edit it directly. Keep it honest — if you change your mind later, add a follow-up entry.

Example revision:
```markdown
### 2026-02-15 — Revisited: Store status + due date, not just status
After sketching screens, filtering by both status AND due date is common. 
Storing both makes queries simpler. Revised the data model to add a due_date column.
```

**Deliverable:** Submit your `decisions.md` along with your spec and plan at the end of Module 3. You'll keep it updated through Modules 4–13 as you build, and it'll be part of your capstone submission.

---

## Key takeaways

- The faster the tool, the more a bad plan costs — plan *with* AI, don't skip it.
- A good spec states the problem, users, core features, out-of-scope, and success.
- Translate the spec into a data model, screens, and milestones before building.
- Order work by dependencies: build what other things rely on first.
- The plan you produce becomes the reusable context and the decomposed prompt list for the Building stage.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)