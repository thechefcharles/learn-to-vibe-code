# Module 7: Supabase (Your App's Brain!) 🧠

**Stage:** Production · **Level:** Intermediate · **Duration:** ~6 hours · **XP:** 600

**What you need:** Modules 0-6

> **Why this matters:** Your pet tracker works, but only on one computer. Supabase is your database — it stores data online so your app works everywhere. This module teaches databases, tables, and how to save/load data from the cloud.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Create a Supabase project** and database tables
2. **Save data to the cloud** from your app
3. **Load data from the cloud** on page load

---

## Lesson 7.1 — What's a Database? (~30 min)

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

## Lesson 7.2 — Set Up Supabase & Create Your Database with Claude Code (~30 min)

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

## Lesson 7.3 — Connect Your App to Supabase (Claude Code Handles It!) (~60 min)

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

## Lesson 7.4 — Read, Write, Delete (~60 min)

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

## Lesson 7.5 — Security & Auth (~45 min)

Supabase has security rules (RLS = Row-Level Security).

By default, it blocks everything. You have to allow:
- Who can read data?
- Who can write data?
- Who can delete data?

For a pet tracker, you'd say: *"Users can only see/edit their own pets."*

Supabase has a built-in auth system (email/password). You can use it.

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

**Q7-k1:** A database does everything EXCEPT:
- (a) Save your data permanently
- (b) Create user accounts
- (c) Control who can see what data
- (d) **Make your typing faster** ✓

*Why:* Databases store data, manage users, and control access. But they don't make you type faster—that's your editor's job! This is about what databases DO vs don't do.

**Q7-k2:** With RLS security on and NO rules set, what happens?
- (a) Everyone can see everything
- (b) **Nobody can see anything (locked by default, safe!)** ✓
- (c) Only new data shows
- (d) You get an error

*Why:* RLS defaults to LOCKED. Super safe! Nothing works until you say "allow this." You can't accidentally expose data.

**Q7-k3:** In a security rule, `auth.uid()` gives you:
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

**Next:** Module 8 — Reading & Debugging Code!
