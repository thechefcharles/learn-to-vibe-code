# Module 8: Supabase (Your App's Brain!) 🧠

**Stage:** Production · **Level:** Intermediate · **Duration:** ~6.5 hours · **XP:** 600

**What you need:** Modules 0-6

> **Why this matters:** Your pet tracker works, but only on one computer. Supabase is your database — it stores data online so your app works everywhere. This module teaches databases, tables, and how to save/load data from the cloud.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Create a Supabase project** and database tables
2. **Save data to the cloud** from your app
3. **Load data from the cloud** on page load

---

## Lesson 8.0 — What's a Database? (Tables, Keys, and Rules) (~45 min)

Before you set up Supabase, know what you're doing.

### What's a Table?

A table is like a spreadsheet. Each row is one record.

Example: a "pets" table:

| id  | name    | breed     | age | favorite_food |
|-----|---------|-----------|-----|---------------|
| 1   | Bella   | Labrador  | 3   | Chicken       |
| 2   | Max     | Poodle    | 5   | Treats        |
| 3   | Luna    | Husky     | 2   | Salmon        |

Each pet gets a unique number (id). You use that to find it later.

### Why Primary Key?

The `id` is the primary key. No two pets have the same id. So when you say "show pet 1," it's always Bella.

### Why User ID?

In a real app with multiple people, each pet has a user_id. This says "this pet belongs to this person."

If you have 100 users with 5 pets each, you have 500 pets. User IDs separate them: "show me all pets where user_id = 1" gets only MY pets.

**Example:** User 1 (Alice) can have pets, and User 2 (Bob) can have pets. But Alice's app should only show Alice's pets, never Bob's. That's what user_id does.

### What's Row-Level Security (RLS)? The Security Guard 🛡️

RLS is like a security guard at a database door. Here's how it works:

**Without RLS:** Anyone logged in can see EVERYTHING. User 2 can read User 1's pets just by asking. This is dangerous!

**With RLS:** A security guard checks every question. The rule says: *"You can only see rows where user_id = your ID."*

When User 2 asks "show me all pets," the guard checks:
- Is this your data? (Does user_id match YOUR logged-in ID?)
- If YES → show the row ✅
- If NO → block it ❌

Example: User 1 tries to read User 2's pet:
```
Request: "Show me pet with id=2"
Guard checks: "Does this pet's user_id equal User 1's ID?"
Database answer: NO (pet 2 belongs to user_id=2, not user_id=1)
Guard says: "Blocked! That's not your data."
```

Supabase enforces this automatically. The database itself refuses to return rows that don't pass the RLS check.

### Real Consequence: Why RLS Matters (Data Breach Risk) 💥

Imagine an app WITHOUT RLS:

**The Attack:**
1. You have a notes app with users
2. Alice and Bob both have accounts
3. Alice writes a personal note: "I'm planning to quit tomorrow and apply at Company X"
4. Bob logs in and queries the database: `SELECT * FROM notes WHERE user_id = 'alice_id'`
5. **Without RLS:** The database has no security guard. It returns Alice's note.
6. Bob reads Alice's private plans. **Data breach.**

**With RLS enabled:**
1. Bob is logged in as user_id = bob_id
2. Bob tries the same query: `SELECT * FROM notes WHERE user_id = 'alice_id'`
3. **RLS blocks it:** The database says: "You're bob_id, but these rows are alice_id. BLOCKED."
4. Bob gets zero rows. Alice's data is safe.

**Real-world impact:** Without RLS, hackers (or other users) could:
- Read everyone's private messages
- See confidential business data
- Access passwords and payment info
- Steal identity information

RLS is not optional. It's the firewall protecting everyone's data.

### How RLS Works: Default-Deny Security 🔒

This is the critical concept:

**Default-Deny means:** *"Deny everything unless explicitly allowed."*

```
With RLS ON and no policies set:
User logged in? ❌ Can see ZERO rows
```

This is actually SAFE by default. Nothing leaks accidentally. You have to deliberately write a policy that says "allow this."

Compare to default-allow (bad):
```
With NO RLS and no policies:
User logged in? ✅ Can see EVERYTHING
```

This is dangerous. One mistake = huge data leak.

**RLS principle:** When building secure apps, always default-deny. Make people earn access.

### Concrete Example: Notes App with RLS 📝

Let's say you're building a personal notes app. Two users: Alice and Bob.

**The Database:**
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,        -- Who owns this note
  title TEXT,
  content TEXT,
  created_at TIMESTAMP
);
```

**The RLS Policy:**
```sql
CREATE POLICY "users can read their own notes"
  ON notes
  FOR SELECT
  USING (auth.uid() = user_id);
```

**Translation:**
- `ON notes` — this rule applies to the notes table
- `FOR SELECT` — this rule is about reading (SELECT queries)
- `USING (auth.uid() = user_id)` — allow reading ONLY if the logged-in user's ID matches the row's user_id

**What happens:**
1. Alice logs in (auth.uid() = alice_id)
2. Alice queries: "show me all notes"
3. RLS checks every row:
   - Row 1: user_id = alice_id → ✅ Show (Alice's note)
   - Row 2: user_id = bob_id → ❌ Block (Bob's note, not Alice's)
4. Alice sees only her notes ✅

**If Bob logs in:**
1. Bob logs in (auth.uid() = bob_id)
2. Bob queries: "show me all notes"
3. RLS checks every row:
   - Row 1: user_id = alice_id → ❌ Block (Alice's note, not Bob's)
   - Row 2: user_id = bob_id → ✅ Show (Bob's note)
4. Bob sees only his notes ✅

**Alice and Bob never see each other's data.** The database enforces it.

### Per-User Data Isolation: The Golden Rule 👑

**Rule:** *Every table should have a user_id column, and an RLS policy protecting it.*

This ensures each user's data is completely isolated:

```sql
-- Correct pattern (SAFE):
CREATE TABLE todos (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,           -- User ID always present
  title TEXT,
  completed BOOLEAN
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own todos"
  ON todos
  USING (auth.uid() = user_id)     -- Users see only their rows
  WITH CHECK (auth.uid() = user_id); -- Users can only create rows for themselves
```

The `USING` clause is "read permission" and `WITH CHECK` is "write permission." Both should check `auth.uid() = user_id` so users can't write data for other people.

**What if you forget RLS?** Anyone with database access reads everything. Not safe for production.

### The Pattern

Every app table follows the same pattern:

1. **id:** unique identifier (every note gets a number)
2. **user_id:** who owns this (so User 1 can't see User 2's notes)
3. **Data columns:** what you actually care about (title, content, etc.)
4. **RLS rule:** "you can only see/edit rows where user_id = your ID"

That's it. Same pattern in every module.

### Knowledge Check

1. **Q8-0a:** "Why does every note need a user_id?"
   - a) Supabase requires it
   - b) So the RLS rule can say "you can only see YOUR notes"
   - c) To track when it was created
   - d) To make the database bigger

   **Correct:** b) — user_id is how RLS knows which data is yours.

2. **Q8-0b:** "What does RLS mean?"
   - a) Really long sentences
   - b) A security rule: "you can only read/write your own data"
   - c) Rust language something
   - d) Reverse lookup system

   **Correct:** b) — RLS is the security guard: "is this your data? Yes? You can see it. No? Blocked."

3. **Q8-0c:** "What's 'default-deny' security?"
   - a) Everything is open, then you block things
   - b) Everything is BLOCKED unless you explicitly ALLOW it (safer!)
   - c) Same as default-allow
   - d) You can allow some users

   **Correct:** b) — Default-deny means nothing works until you say "allow this." It's safe by design.

---

## Lesson 8.2 — What's a Database? (~30 min)

A database is just a fancy spreadsheet in the cloud. It stores your data.

**Example: Pet Tracker Database**

| id | name | breed | photoUrl | created_at |
| --- | --- | --- | --- | --- |
| 1 | Buddy | Golden Retriever | photo1.jpg | 2024-01-15 |
| 2 | Luna | Cat | photo2.jpg | 2024-01-20 |

- Each row = one pet
- Each column = a property (name, breed, photo, etc.)
- Database is online, so any device can access it

**Supabase:** A company that hosts databases. It's free for learning.

---

## Lesson 8.3 — Set Up Supabase & Create Your Database with Claude Code (~30 min)

**Step 1: Create a Supabase project**

Go to supabase.com, sign up (free), and create a new project. Wait for it to spin up.

**Step 2: Get your API keys**

Go to Settings → API. Copy:
- Project URL (like `https://your-project.supabase.co`)
- Publishable Key (starts with `sb_pub_`)

Save these somewhere safe — you'll need them!

**Step 3: Let Claude Code generate your database schema** 

Remember your data model from Module 3? Claude Code will turn it into a real database!

Open Claude Code:
```bash
claude
```

Paste something like this:

```
I'm setting up a Supabase database for a pet tracker app.
My data model needs:

Tables:
- pets (id, name, breed, photoUrl, created_at)
- users (id, email, created_at)

Requirements:
- Each pet belongs to one user
- Use UUID for IDs (gen_random_uuid())
- Add created_at timestamp to every table
- Make sure user_id connects pets to users

Generate complete SQL CREATE TABLE statements I can paste directly into Supabase.
Format: production-ready, ready to run.
```

Claude Code will generate SQL like:

```sql
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid(),
  name TEXT NOT NULL,
  breed TEXT,
  photoUrl TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Step 4: Run the SQL in Supabase**

1. Go to Supabase → SQL Editor
2. Copy Claude Code's SQL
3. Paste it and click "Run"

Boom! Your database tables are created. 🎉

---

## Lesson 8.4 — Connect Your App to Supabase (Claude Code Handles It!) (~60 min)

Your Next.js app needs to talk to Supabase. Let Claude Code set it up!

**Step 1: Add your Supabase keys to `.env.local`**

Create a file called `.env.local` at the root of your project and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
```

(Replace with your actual keys from Supabase Settings → API)

**Step 2: Let Claude Code wire everything up**

Open Claude Code:

```bash
claude
```

Paste this:

```
I need to connect my Next.js pet tracker to Supabase.

My database has:
- pets table (id, name, breed, photoUrl, created_at, user_id)

Setup needed:
1. Install @supabase/supabase-js
2. Create lib/supabase/client.ts (browser client)
3. Update app/page.tsx to:
   - Load pets from the database on page load
   - Save new pets to the database
   - Delete pets from the database
4. Keep the form inputs but wire them to real Supabase calls

I have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local already.

Show me the complete setup and the updated pet tracker component.
```

Claude Code will:
- Install the Supabase library ✅
- Create client files for you ✅
- Update your page to load/save real data ✅
- Wire up the delete button ✅

**Step 3: Test it**

```bash
npm run dev
```

Go to localhost:3000 and:
1. Add a pet → it appears in the list (and persists if you refresh!) ✅
2. Delete a pet → it vanishes from the database ✅
3. Refresh the page → pets are still there (real data!) ✅

No more mock data! Your app now uses a real database. 🎉

---

## Lesson 8.5 — Read, Write, Delete (~60 min)

Three operations:

**Write (Save):**
```javascript
supabase.from("pets").insert({ name: "Buddy", breed: "Retriever" })
```

**Read (Load):**
```javascript
const { data } = await supabase.from("pets").select()
```

**Delete:**
```javascript
supabase.from("pets").delete().eq("id", petId)
```

You don't write these yourself — Cursor/Claude Code does. You just understand what they do.

---

## Lesson 8.6 — Security & Auth (~60 min)

Supabase has security rules (RLS = Row-Level Security).

### The Three Questions RLS Answers

When you set up a table, ask:
1. **Who can READ this data?** (SELECT permission)
2. **Who can CREATE new rows?** (INSERT permission)
3. **Who can UPDATE/DELETE?** (UPDATE/DELETE permission)

For a pet tracker:
- Read: *"Users can only see their own pets"* ✅
- Create: *"Users can only create pets for themselves"* ✅
- Update/Delete: *"Users can only modify their own pets"* ✅

### How RLS Protects Three Operations

**Example: Alice tries to delete Bob's pet**

Without RLS:
```
Alice: DELETE pet with id=2
Database: Deleted! (No one stops her)
Bob: My pet is gone! (Data breach/sabotage)
```

With RLS:
```
Alice: DELETE pet with id=2
RLS checks: Does pet 2 have user_id = alice_id? NO (it's bob_id)
Database: BLOCKED! You can't delete someone else's data.
Bob: My pet is safe!
```

Every read, write, and delete goes through the RLS check. The database is the security layer, not your code.

### The Built-in Auth System

Supabase has email/password authentication built in:
- Users sign up with email + password
- Supabase creates a session (logs them in)
- Every query includes their auth.uid() (current user ID)
- RLS uses auth.uid() to filter data

You use it like this:
1. Sign up → `supabase.auth.signUp({ email, password })`
2. Sign in → `supabase.auth.signIn({ email, password })`
3. Your logged-in ID is stored → `auth.uid()` in RLS policies
4. Every query automatically filters by your user_id

**Key insight:** You never manually pass user_id. The database knows who you are (via auth.uid()) and enforces RLS automatically.

---

## Lesson 8.7 — Understanding `auth.uid()` and Security Flow (~30 min)

This is the glue between authentication and RLS. Let's demystify it.

### What is `auth.uid()`?

`auth.uid()` is a special function in Supabase that returns the currently logged-in user's unique ID.

Think of it like asking the database: *"Who's currently logged in?"*

```
When Alice is logged in:
auth.uid() returns: "uuid-for-alice"

When Bob is logged in:
auth.uid() returns: "uuid-for-bob"

When nobody is logged in:
auth.uid() returns: NULL (empty/null value)
```

### How RLS Uses `auth.uid()`

The RLS policy uses `auth.uid()` to compare:

```sql
CREATE POLICY "users read own notes"
  ON notes
  USING (auth.uid() = user_id);
```

**This means:**
- "Allow SELECT (read) on notes ONLY IF the current logged-in user's ID matches the row's user_id"

**Step by step:**
1. Alice logs in → `auth.uid()` becomes "uuid-for-alice"
2. Alice queries: "SELECT * FROM notes"
3. For each row in the database:
   - Does `auth.uid() = user_id`?
   - Alice's note: uuid-for-alice = uuid-for-alice ✅ YES → Include it
   - Bob's note: uuid-for-alice = uuid-for-bob ❌ NO → Skip it
4. Alice gets only her notes

This happens automatically. You don't write the comparison yourself; Supabase does.

### The Complete Security Flow

Here's what happens when a user does something:

```
1. User signs in
   ↓
2. Supabase creates a session (a token proving they're logged in)
   ↓
3. Session is stored in the browser
   ↓
4. Every query sent to Supabase includes the session
   ↓
5. Supabase reads the session and sets auth.uid()
   ↓
6. RLS policy checks: (auth.uid() = user_id)?
   ↓
7. If YES: Return row. If NO: Block it.
   ↓
8. User gets only their data
```

**Key point:** The session travels with every query. That's how the database knows who's asking.

### Why This Matters: App-Level vs Database-Level Security

**BAD APPROACH (App-level filtering only):**
```javascript
// In your app code:
const notes = await supabase
  .from("notes")
  .select()
  .eq("user_id", currentUserId);  // Filtering in the app
```

**Problem:** If a hacker modifies the app code or uses a tool to bypass your app and query directly, they can change `currentUserId` to someone else's ID and read all notes. Your app-level filter is useless.

**GOOD APPROACH (Database-level RLS):**
```sql
-- In the database (RLS policy):
CREATE POLICY "users read own notes"
  ON notes
  USING (auth.uid() = user_id);
```

Then in your app, you can just query:
```javascript
const notes = await supabase
  .from("notes")
  .select();  // No user_id filter needed!
```

**Why it's safe:** Even if a hacker tries to query the database directly (bypassing your app), the RLS policy still blocks them. The database enforces security, not the app.

**Rule:** Always trust the database, never trust the app for security. RLS is your shield.

---

## Activity: Make Your App Cloud-Based ☁️

Follow these steps to move from local (mock) data to real cloud data!

### Step 1: Create a Supabase account (5 min)
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email
3. Create a new project (give it a name like "pet-tracker")
4. Wait for it to be ready (30 seconds or so)

### Step 2: Get your credentials (3 min)
1. In the Supabase dashboard, go to **Settings → API**
2. Copy your **Project URL** (looks like: `https://xxx.supabase.co`)
3. Copy your **Publishable Key** (starts with `sb_pub_`)
4. Open your `.env.local` file in your code editor
5. Add these lines:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
   ```
6. Save and restart your dev server: `npm run dev`

### Step 3: Create your database table (5 min)
1. In Supabase, go to **SQL Editor**
2. Create a new query and paste this:
   ```sql
   CREATE TABLE pets (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     breed TEXT,
     age INT,
     created_at TIMESTAMPTZ DEFAULT now()
   );
   ```
3. Click **Run**
4. Go to **Table Editor** and confirm the `pets` table exists

### Step 4: Connect your app (10 min)
1. Run this command:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. Prompt Claude Code:
   ```
   Connect this Next.js app to Supabase.
   Install @supabase/ssr.
   Create a browser client in lib/supabase/client.ts
   Update the pets page to load from the `pets` table instead of mock data.
   Add a form to save new pets to Supabase.
   ```

3. Review Claude Code's changes and accept them

### Step 5: Test it! (5 min)
1. Open your app: `http://localhost:3000`
2. Add a new pet via the form
3. **Refresh the page** — the pet is still there! (It's saved in Supabase)
4. Open Supabase **Table Editor**, click the `pets` table
5. You'll see your pet in the database!

### Step 6: Optional — test on two devices (5 min)
1. Add a pet on one device
2. Open your app on a different device (phone, tablet, or another browser)
3. The new pet appears! (It's coming from the same Supabase database)

### Deliverable:
- Screenshot of your Supabase `pets` table showing your data
- Screenshot of your pet tracker app showing the same pets
- Proof that data persists after refresh

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study them now!

**Q8-k1:** A database does everything EXCEPT:
- (a) Save your data permanently
- (b) Create user accounts
- (c) Control who can see what data
- (d) **Make your typing faster** ✓

*Why:* Databases store data, manage users, and control access. But they don't make you type faster—that's your editor's job! This is about what databases DO vs don't do.

**Q8-k2:** With RLS security on and NO rules set, what happens?
- (a) Everyone can see everything
- (b) **Nobody can see anything (locked by default, safe!)** ✓
- (c) Only new data shows
- (d) You get an error

*Why:* RLS defaults to LOCKED. Super safe! Nothing works until you say "allow this." You can't accidentally expose data.

**Q8-k3:** In a security rule, `auth.uid()` gives you:
- (a) A random ID
- (b) **The logged-in user's unique ID** ✓
- (c) The table name
- (d) The API key

*Why:* `auth.uid()` is the magic function that says "who's logged in right now?" That's how Supabase knows which user should see which data.

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's a database? How is it like a spreadsheet?**
   - *Example answer:* "A database is an organized collection of data stored in tables. Each table has rows (records) and columns (fields), just like a spreadsheet. The difference: databases are on a server, so multiple people can access them, and data persists forever (not just in a file)."

2. **Write the three operations: write, read, delete.**
   - *Example answer:*
     - Read: `supabase.from("pets").select()` — get all pets
     - Write: `supabase.from("pets").insert({ name: "Buddy" })` — add a new pet
     - Delete: `supabase.from("pets").delete().eq("id", petId)` — remove a pet

3. **Why do we need security rules?**
   - *Example answer:* "Security rules (RLS) make sure each user can only see and edit their own data. Without them, User A could see (or delete!) User B's pets, which is bad!"

### Scenario-based judgment checks:

*For each scenario, explain what's wrong and how to fix it.*

- **(a) Data disappeared after refresh:** You add a pet, refresh the page, and it's gone. But it WAS there a second ago.
  - ✅ **Fix:** Make sure you're loading from Supabase, not mock data. Update your page to use `supabase.from("pets").select()` instead of a hardcoded array.
  - ❌ **Avoid:** Mock data resets every time you refresh. Real databases remember.

- **(b) Two users see the same data:** You and your friend both have the app. You add a pet, and they see it too (without you sharing it).
  - ✅ **Likely issue:** RLS (security rules) aren't set up. Each user should only see their own data.
  - ❌ **Avoid:** Leaving the database open to everyone.

- **(c) Can't add a pet:** You submit the form but nothing happens. No error, nothing in the table.
  - ✅ **Likely issue:** The form isn't connected to Supabase, or you forgot the `.insert()` call. Check that your form action calls `supabase.from("pets").insert(...)`.
  - ❌ **Avoid:** Assuming the form is "broken." Debug by checking the code and looking for the insert call.

- **(d) Env vars problem:** You added your Supabase URL to the code but got an error about "undefined".
  - ✅ **Fix:** Use `.env.local` instead. Add your URL to `.env.local` and use `process.env.NEXT_PUBLIC_SUPABASE_URL` in your code. Restart your dev server.
  - ❌ **Avoid:** Hard-coding credentials. They should be in `.env.local`, never in your code.

- **(e) Seeing someone else's data:** You sign in and can see all pets from all users, not just yours.
  - ✅ **Fix:** This is a security problem! Enable RLS and set policies so users can only see their own rows. This is critical!
  - ❌ **Avoid:** Ignoring this. Everyone's data is exposed!

---

## Deliverable Rubric Criteria

Your submission will be graded on these objectives:

### 1. Cloud Data Architecture
- **Full:** App successfully loads and saves data to Supabase (not mock data)
- **Partial:** App loads from Supabase but not saving, or vice versa
- **No credit:** Still using hardcoded/mock data

### 2. Security & User Isolation
- **Full:** RLS policies are configured; users can only see their own data
- **Partial:** RLS mentioned but not implemented correctly
- **No credit:** No RLS; multiple users can see each other's data

### 3. Environment Variables
- **Full:** Credentials stored in `.env.local` (never hardcoded)
- **Partial:** Credentials in env vars but some hardcoded values remain
- **No credit:** API keys visible in code

### 4. Compare Database Options ⭐
- **Full:** In your project plan or submission notes, explain why you chose Supabase (or what database you chose) and what alternatives you considered. Include 2+ concrete reasons (e.g., "Supabase has RLS built-in; Firebase doesn't" or "Postgres is self-hosted so more expensive for small projects; Supabase is better for learning because it's free and includes auth")
- **Partial:** Mentions database choice but reasoning is weak or incomplete
- **No credit:** Doesn't address database choice or alternatives considered

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Created a Supabase project and have credentials (URL + key) |
| ✅ | Added credentials to `.env.local` (not hard-coded in code) |
| ✅ | Created a `pets` table with columns (id, name, breed, age, created_at) |
| ✅ | App loads pets from Supabase (not mock data) |
| ✅ | Form saves new pets to Supabase database |
| ✅ | Data persists after page refresh |
| ✅ | Screenshot of Supabase Table Editor showing your data |
| ✅ | Screenshot of app showing the same pets |

*Pass mark: 80% and working cloud-based app submitted.*

---

## Key Takeaways

- Database = cloud storage for your data 📦
- Supabase is an online database (free!)
- Tables have rows (data) and columns (properties)
- Save/load from cloud, not just your computer
- Security rules control who sees what

**Next:** Module 9 — Agent Workflows
