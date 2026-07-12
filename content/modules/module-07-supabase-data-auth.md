# Module 7: Data, Auth & Backend (Supabase)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~5.5 contact hours (0.55 CEU)

**Prerequisites:** Modules 4–6. Learners have an invoice-tracker with clients + invoices UI, now styled (Module 6), running on **mock data**. This module replaces that mock data with a real database, plus accounts and per-user security.

> This is where the app becomes real. Until now data vanished on refresh; now it persists, users log in, and each user sees only their own data. It's also the first taste of the durable skill that outlasts any tool: modeling data and enforcing who-can-see-what. Code-heavy by design.
> 

> **📸 Screenshots:** the Supabase dashboard shots (API keys, Table Editor, Auth users, RLS policy) are auto-capturable via a logged-in browser; the app shots via Playwright.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Understand** database fundamentals: tables, primary keys, foreign keys, and row-level security. *(Understand)* — Lesson 7.0
2. **Model** data in Postgres and connect a Next.js app to Supabase. *(Apply)*
3. **Implement** user authentication and row-level-security authorization. *(Create)*
4. **Compare** Supabase with Firebase / Postgres + Prisma and justify the choice for a use case. *(Evaluate)*

> **Version note (pin + concept):** use the **`@supabase/ssr`** package for cookie-based sessions and the new **publishable/secret** API keys (legacy keys are retiring). Teach the concepts — tables, keys in env vars, auth sessions, RLS — so the skill survives API changes.
> 

> **Build-verified gotchas (pin + concept):** with `@supabase/ssr` on Next 15/16, `cookies()` is **async** — `await` it — and you keep separate browser and server clients plus a session-refresh middleware. On real setups you'll also hit (1) **IPv6-only direct DB connections** — `supabase db push`/`psql` fail on home Wi-Fi with "no route to host"; use the connection pooler or run SQL via the Management API over HTTPS; and (2) **email confirmation ON by default** — new signups can't log in without SMTP, so enable auto-confirm for a course/demo. Check current Supabase docs.
> 

---

## Lesson 7.0 — Database Tables, Keys, and Security (~30 min)

Before you write SQL or see RLS policies, understand the pieces.

### What's a Table?

A table is an ordered collection of rows. Each row is a record. Think: a spreadsheet where each row is an entry.

Example: a "clients" table might look like:

| id  | name       | email            | user_id |
|-----|------------|------------------|---------|
| 1   | Alice Corp | alice@example.com | uuid-1  |
| 2   | Bob Inc    | bob@example.com  | uuid-2  |
| 3   | Charlie Co | charlie@...      | uuid-1  |

Each column has a type: `id` is a number (integer), `name` is text, `email` is text, `user_id` is a UUID.

### What's a Primary Key?

A primary key is a column (or columns) that uniquely identifies each row. No two rows can have the same primary key.

In the example above, `id` is the primary key. Alice's record has `id=1`, Bob's has `id=2`, etc. You never have two `id=1` rows.

**Why?** So you can say "give me row 1" and get exactly one answer. Without a primary key, "row 1" might be ambiguous.

### What's a Foreign Key?

A foreign key is a column in one table that references the primary key of another table. It's how tables relate.

Example: an "invoices" table might have:

| id  | client_id | amount | user_id |
|-----|-----------|--------|---------|
| 1   | 1         | $100   | uuid-1  |
| 2   | 1         | $200   | uuid-1  |
| 3   | 2         | $50    | uuid-2  |

`client_id` is a foreign key—it references the `id` in the clients table. Invoice 1 belongs to client 1 (Alice Corp).

**Why?** So you can link data across tables. Instead of repeating "Alice Corp" in every invoice, you store client_id=1 and say "look up client 1 to find the name."

### What's Row-Level Security (RLS)?

RLS is a default-deny policy: no one can read or write to a table unless a policy explicitly allows it.

**Without RLS:** If your app has users, they can see each other's data by default. User 2 can read User 1's invoices just by changing the URL.

**With RLS:** Each row has a `user_id`. A policy says "you can only read rows where user_id = your logged-in user_id." So User 2 can only read their own invoices.

Example RLS policy:

```sql
CREATE POLICY "users can read their own invoices"
ON invoices
FOR SELECT
USING (auth.uid() = user_id);
```

This means: "Allow SELECT on invoices only if the current logged-in user's ID matches the row's user_id."

**Why?** Security. Without it, one user could read/write/delete other users' data. RLS is the enforcement mechanism—the database itself refuses to return rows that don't pass the policy.

### The Pattern

Every data table in your app should follow this pattern:

1. **Primary key** (`id`): unique identifier for the row
2. **Foreign keys** (e.g., `user_id`): links to other tables
3. **RLS policy**: "you can only read/write your own rows"

Example: A "todos" table for a multi-user app:

```sql
CREATE TABLE todos (
  id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE POLICY "users can read their own todos"
ON todos
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "users can create their own todos"
ON todos
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

Translation:
- `id`: unique todo identifier
- `user_id`: who owns this todo
- `title`, `completed`, `created_at`: todo data
- First policy: you can only SELECT (read) todos where user_id = your ID
- Second policy: you can only INSERT (create) todos where user_id = your ID

### Knowledge Check

1. **Q7-0a:** "Why do we use `user_id` in every table?"
   - a) To make the table longer
   - b) To identify who owns each row (so RLS can enforce "you can only read your own rows")
   - c) Just because Supabase requires it
   - d) To track when data was created

   **Correct:** b) — `user_id` is the bridge between rows and users. RLS uses it to enforce security.

2. **Q7-0b:** "What does an RLS policy do?"
   - a) Encrypts data in the database
   - b) Prevents SQL errors
   - c) Enforces default-deny access control—blocks all access unless a policy says "yes"
   - d) Makes queries faster

   **Correct:** c) — RLS is the security enforcement layer. Without it, any logged-in user can read/write any row.

---

## Lesson 7.2 — Why you need a backend (~30 min)

Before diving into Supabase setup, understand what a backend solves.

Mock data lives in your code, so it resets every reload and every user sees the same thing. A real app needs three things a backend provides: **persistence** (data survives), **accounts** (users log in), and **authorization** (each user sees only what they should).

Supabase bundles all three: a **Postgres database**, **Auth**, and **Row Level Security** — with a generous free tier and native Vercel integration for later. It's real Postgres, so the SQL and data-modeling skills transfer to any database job.

---

## Lesson 7.3 — Create a project & connect Next.js (~45 min)

This continues Objective 2.

**Step 1 — Create a Supabase project** at [supabase.com](http://supabase.com). Copy your project URL and **publishable key** from API settings.

---

**[SCREENSHOT PLACEHOLDER: Supabase API Settings]**

Dashboard showing: Project URL, Publishable API Key, Secret Key. Proof: credentials are visible and copyable.

---

**Step 2 — Store them in `.env.local`** (never hard-code keys — previews Module 10's env handling):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

**Step 3 — Install the SDK and create clients** with `@supabase/ssr` (sessions must work in server components for RLS to know the user):

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Browser client** (for client components & auth):
```tsx
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
```

**Server client** (for server components, reads RLS-protected data):
```tsx
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies(); // ⚠️ async in Next 15+
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
};
```

The **key difference:** browser clients are used in `"use client"` components and handle auth state; server clients run on the server and attach the user session to queries, so RLS can filter rows.

> **Tip:** a perfect agentic task (Module 5) — ask Claude Code to "set up Supabase browser and server clients using @supabase/ssr, with async cookies handling for Next.js 15+" and review the diff. The boilerplate is complex; let the agent handle it, but verify the structure.
> 

---

## Lesson 7.4 — Model your data with Claude Code (~45 min)

Continue Objective 2 (modeling data). Turn your Module 3 data model into real Postgres tables. **Use Claude Code to generate the SQL migrations from your spec:**

### Automating data model generation

**Step 1 — Gather your Module 3 data model.** Open your `spec.md` or `data-model.md` file from planning.

**Step 2 — Prompt Claude Code to generate Postgres schema:**

```bash
claude
```

Then send:

```
I'm setting up a Supabase project for my invoice tracker.
My data model from planning:

[PASTE YOUR MODULE 3 DATA MODEL — table names, fields, relationships]

Generate complete Postgres CREATE TABLE statements that:
1. Use UUID primary keys with gen_random_uuid()
2. Add user_id field to every table (default auth.uid())
3. Add relationships (foreign keys) between tables
4. Add created_at timestamps (default now())
5. Set appropriate column types (text, numeric, date, uuid, timestamptz)
6. Include NOT NULL constraints where needed

Make sure the relationships match my spec exactly.
Format as SQL I can paste directly into Supabase's SQL editor.
```

**Step 3 — Review Claude Code's SQL output.** It will generate:

```sql
create table clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  name text not null,
  email text,
  created_at timestamptz default now()
);

create table invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  client_id uuid not null references clients(id),
  amount numeric not null,
  due_date date,
  status text default 'unpaid',
  created_at timestamptz default now()
);
```

Check:
- ✅ All tables have `user_id` (for per-user security later)
- ✅ All tables have `id` (primary key) and `created_at` (audit trail)
- ✅ Relationships match your spec (e.g., invoices.client_id → clients.id)
- ✅ Column types are correct (uuid, text, numeric, date)

**Step 4 — Run the SQL in Supabase.** Copy Claude Code's output, go to Supabase → SQL Editor, paste, and run. Tables are created.

**Why Claude Code for this?**

- **Automation:** you describe the tables once (in planning), Claude Code generates production-ready SQL
- **Correctness:** it knows Postgres idioms (uuid vs. int, foreign key syntax, defaults)
- **Consistency:** every table gets user_id and created_at automatically, preventing oversights
- **Speed:** less manual SQL to write, more time to verify and iterate

---

**[SCREENSHOT PLACEHOLDER: Tables in Supabase Editor]**

Table Editor showing: clients and invoices tables with columns (id, user_id, name, email, amount, due_date, status, created_at). Proof: schema is created and visible.

---

---

## Lesson 7.5 — Replace mock data with real queries (~60 min)

Complete Objective 2 (modeling data). Swap the hard-coded arrays for live reads/writes.

```tsx
// app/clients/page.tsx
import { createClient } from "@/lib/supabase/server";
export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select();
  return (
    <table className="w-full text-left">
      <thead><tr><th>Name</th><th>Email</th></tr></thead>
      <tbody>{clients?.map((c) => (<tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>))}</tbody>
    </table>
  );
}
```

**Write** happens in a form action calling `supabase.from("clients").insert({ name, email })`. Wire both, then confirm data survives a refresh — the moment the app feels real.

**Concrete example — form action:**

```tsx
// app/clients/actions.ts (server action)
"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addClient(name: string, email: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .insert({ name, email }); // user_id auto-filled by auth.uid() in SQL
  
  if (error) throw error;
  revalidatePath("/clients"); // refresh the page
}
```

```tsx
// app/clients/form.tsx (client component)
"use client";
import { addClient } from "./actions";
import { useState } from "react";

export default function ClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addClient(name, email);
      setName("");
      setEmail("");
    } catch (err) {
      alert("Error adding client: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Client name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Client</button>
    </form>
  );
}
```

**Verify:** add a record via the form, reload the page, and check the row in Supabase Table Editor. It's still there. The app feels real.

---

## Lesson 7.6 — Authentication & RLS with Claude Code (~90 min)

Address Objective 3 (auth + authorization). Instead of writing boilerplate manually, **use Claude Code to orchestrate authentication setup and Row Level Security policies:**

### Automating auth and RLS

**Step 1 — Enable email/password auth in Supabase dashboard** (manual one-time):
- Go to Supabase → Authentication → Providers
- Enable "Email" provider
- Optionally: in Settings → Auth, turn on "Enable email confirmations" or disable it for testing

**Step 2 — Use Claude Code to generate auth components and RLS policies:**

```bash
claude
```

Send this prompt:

```
I'm setting up auth and RLS for my Supabase invoice tracker.

My tables: clients, invoices (both have user_id fields)

Please generate:

1. AUTH COMPONENTS (sign-up, sign-in, sign-out flows):
   - A sign-up form (email, password, password confirm)
   - A sign-in form (email, password)
   - A sign-out button
   - A useAuth hook to get the current user
   All using @supabase/ssr with the createClient pattern

2. RLS POLICIES (for database security):
   For each table (clients, invoices):
   - enable row level security
   - create a policy allowing users to see/edit only their own rows
   - use (auth.uid() = user_id) for filtering

3. FORM ACTIONS (wire auth to the app):
   - signUp(email, password) server action
   - signIn(email, password) server action
   - signOut() server action

Format the SQL for Supabase's SQL editor.
Format the TSX for my Next.js app.

My goal: users can sign up, sign in, and only see their own clients/invoices.
```

**Step 3 — Review Claude Code's output.**

For auth components, check:
- ✅ Forms include validation (non-empty email, password length)
- ✅ Error messages shown to users
- ✅ Success handling (redirect or state update after auth)
- ✅ Using @supabase/ssr (not hardcoding keys)

For RLS policies, check:
- ✅ `alter table ... enable row level security;` for every table
- ✅ Policy condition uses `auth.uid() = user_id`
- ✅ `using` and `with check` both set (not just one)
- ✅ No typos in table/column names

**Step 4 — Apply the code.** 
- Paste RLS SQL into Supabase → SQL Editor and run
- Create auth components in your app (e.g., `app/auth/SignUp.tsx`, `app/auth/SignIn.tsx`)
- Add server actions in `app/auth/actions.ts`

**Step 5 — Test.**
1. Sign up with email/password
2. Verify you see your clients/invoices
3. Sign out and sign in as a different user
4. **Critical:** verify the second user can NOT see the first user's data (this proves RLS works)

If a user sees another user's data, RLS isn't enabled correctly. Debug with Claude Code: "Check my RLS policies — why is User A seeing User B's data?"

**Why Claude Code for auth + RLS?**

- **End-to-end orchestration:** sign-up → sign-in → RLS policies all generated consistently
- **Boilerplate elimination:** auth form and RLS SQL are verbose; Claude Code handles it
- **Security-first:** it always includes the `with check` clause (prevents privilege escalation)
- **Verification:** you test with two accounts (the real proof); Claude Code provided the machinery

---

**[SCREENSHOT PLACEHOLDER: Auth flow and RLS verification]**

Left: Sign-up and sign-in forms in the app.
Right: Two users logged in, each seeing only their own clients (proof RLS is working).

---

## Lesson 7.8 — Configuration vs. secrets (~30 min)

Not all env vars are created equal. **Config** is anything you might change between environments — URLs, thresholds, feature flags, timeouts. **Secrets** are credentials you *never* share — API keys, passwords, signing keys. This distinction matters for security and deployment.

### For kids

Keep it simple: **Config = things you can show people. Secrets = things you never show anyone.**

**Config examples:**
- Where the database is (localhost for you, production server for others)
- How many times to retry something
- Timeouts (how long to wait before giving up)

**Secret examples:**
- Supabase API keys
- Database passwords
- Anything with "secret" or "key" in the name

**The rule:** If it's an API key or password, **put it in `.env.local`** (a file you don't push to GitHub). Everything else can go in a config file and pushed to GitHub safely.

Example:
```
# config.yaml (safe to commit)
database_url: postgresql://localhost/invoice_tracker
timeout_ms: 5000

# .env.local (git-ignored, secret)
SUPABASE_API_KEY=sb_secret_xxx
```

**Deliverable:** Check your `.gitignore` file has `.env.local`. If not, add it.

---

### For adults

**Config lives in files or environment vars that are okay to version-control** (or committed with safe values):
- Database connection string (non-prod)
- Feature flag thresholds
- Timeout durations
- Public API URLs

Example config file (`config.yaml`):
```yaml
database_url: postgresql://localhost/invoice_tracker
timeout_ms: 5000
max_retries: 3
public_api_endpoint: https://api.example.com
```

**Secrets never touch git.** They live in `.env.local` (locally, gitignored) and Vercel env vars (production):
- Supabase API keys and URLs (especially secret keys)
- Database passwords
- OAuth tokens (GitHub, Google)
- Stripe secret keys
- Signing certificates

Example `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx  # ← never shared!
STRIPE_SECRET_KEY=sk_live_xxx  # ← never shared!
```

**Red flag:** if a key starts with `secret`, `private`, or `token`, it's a secret. If it's your publishable key, it's config (safe for the browser). If you're not 100% sure, treat it as a secret.

**Lifecycle:** Locally, secrets come from `.env.local` (loaded at dev/build time). In production, Vercel stores secrets in project settings (inaccessible except at deploy), injects them at build/runtime, and you never type them into code or screenshots. Commit `.env.local` to `.gitignore` and ensure CI/CD skips the local file—only production secrets come from Vercel env vars.

**Audit trail:** Log which secrets are in use and when they rotate. For a capstone, documenting secrets management in your CLAUDE.md shows security discipline.

---

## Lesson 7.9 — Supabase vs. the alternatives (~30 min)

Address Objective 4 (comparison and justification).

| Option | What it is | Best when |
| --- | --- | --- |
| **Supabase** (default) | Postgres + Auth + RLS + storage, managed | Real SQL, built-in auth/security, fast setup, free tier |
| Firebase | Google's NoSQL backend + auth | Realtime/mobile-first; you prefer documents over SQL |
| Postgres + Prisma | Your own DB + typed ORM | Full control, comfortable managing the DB |
| Neon / PlanetScale | Managed serverless SQL | You need the DB only and add auth separately |

**Why Supabase is the default:** database, auth, and authorization in one beginner-friendly tool, on real Postgres, with a native Vercel path (Module 10). **Trade-offs:** Firebase is simpler for realtime/mobile but locks you into NoSQL/Google; Postgres + Prisma gives control at the cost of wiring auth/security yourself.

---

## Hands-on activity (~60 min, folded in)

**"Make it real."** Follow these steps to wire Supabase fully into your invoice tracker.

### Step 1: Create a Supabase project and get credentials (5 min)
1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project (give it a name, set a password)
3. Wait for it to spin up
4. In the project dashboard, go to **Settings → API**
5. Copy your **Project URL** and **Publishable API Key**
6. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_pub_xxx
   ```
7. Save and restart your dev server (`npm run dev`)

### Step 2: Install Supabase SDK (2 min)
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Step 3: Create Supabase client files (5 min)
Create two files in `lib/supabase/`:
- `client.ts` (browser client, from the snippet above)
- `server.ts` (server client, from the snippet above)

Tip: This is perfect for Claude Code (Module 5). Prompt: "Set up Supabase browser and server clients using @supabase/ssr with async cookies for Next.js 15+"

### Step 4: Create database tables (5 min)
1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste:
   ```sql
   create table clients (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null default auth.uid() references auth.users(id),
     name text not null,
     email text,
     created_at timestamptz default now()
   );

   create table invoices (
     id uuid primary key default gen_random_uuid(),
     user_id uuid not null default auth.uid() references auth.users(id),
     client_id uuid not null references clients(id),
     amount numeric not null,
     due_date date,
     status text default 'unpaid',
     created_at timestamptz default now()
   );
   ```
3. Click **Run** and confirm both tables exist in the **Table Editor**

### Step 5: Replace mock data with live reads (10 min)
1. Update `app/clients/page.tsx` to query Supabase:
   ```tsx
   import { createClient } from "@/lib/supabase/server";
   
   export default async function ClientsPage() {
     const supabase = await createClient();
     const { data: clients } = await supabase.from("clients").select();
     
     return (
       <table className="w-full">
         <thead><tr><th>Name</th><th>Email</th></tr></thead>
         <tbody>
           {clients?.map((c) => (
             <tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>
           ))}
         </tbody>
       </table>
     );
   }
   ```
2. Create a form action for writing (see "Write" example above)
3. Test: add a client via the form, refresh the page—it's still there!

### Step 6: Enable authentication (5 min)
1. In Supabase dashboard, go to **Authentication → Providers**
2. Ensure **Email** is enabled
3. Go to **Authentication → Auth Policies → Email Templates**
4. For a course/demo, toggle **Enable Auto Confirm** so new users don't need email verification
5. Create a sign-in page using `supabase.auth.signInWithPassword({ email, password })`

### Step 7: Enable Row Level Security (10 min)
1. Go to **SQL Editor** and run:
   ```sql
   alter table clients enable row level security;
   
   create policy "users manage own clients"
     on clients for all
     using (auth.uid() = user_id)
     with check (auth.uid() = user_id);
   
   alter table invoices enable row level security;
   
   create policy "users manage own invoices"
     on invoices for all
     using (auth.uid() = user_id)
     with check (auth.uid() = user_id);
   ```
2. Verify in the **Table Editor**: policies are listed under each table

### Step 8: Test isolation with two accounts (10 min)
1. Sign up as **User A** (email: alice@example.com)
2. Add a client as User A
3. Sign out
4. Sign up as **User B** (email: bob@example.com)
5. Check the clients list—User A's client is NOT visible
6. Add a client as User B
7. Sign in again as User A—you see only your client
8. ✅ Isolation works!

### Deliverable:
- Screenshots showing:
  - User A's clients list (only their data)
  - User B's clients list (only their data, different from A)
  - Supabase Table Editor showing all rows (proof both exist in DB)

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q7-1:** A backend provides all EXCEPT:
- (a) persistence
- (b) accounts
- (c) authorization
- (d) **faster typing** ✓

*Why:* Backends solve three real problems: data persists, users log in, and access is controlled. Typing speed has nothing to do with it. (That's an IDE/editor job.)

**Q7-2:** With RLS enabled and no policy, how many rows are returned?
- (a) all
- (b) **zero — it's default-deny** ✓
- (c) only the newest
- (d) an error

*Why:* This is the critical security principle: RLS defaults to **deny everything unless you explicitly allow it**. No policy = nobody reads anything. Safe by default.

**Q7-3:** In a policy, `auth.uid()` gives you:
- (a) a random id
- (b) **the logged-in user's id from their session** ✓
- (c) the table name
- (d) the API key

*Why:* `auth.uid()` is how you identify the current user in your RLS policy. It's the bridge between "who's logged in" and "what rows can they see."

---

## Knowledge check (mapped to objectives)

**Objective 1 — Database Fundamentals:** understand tables, primary keys, foreign keys, and RLS concepts.
- *Practical evidence:* Explain the purpose of `user_id` in every table, and how RLS enforces default-deny access. Answer the Q7-0a and Q7-0b knowledge checks in Lesson 7.0.

**Objective 2 — Model & connect:** show your schema and a working query reading real data into a page.
- *Practical evidence:* Screenshot of Supabase Table Editor showing `clients` and `invoices` tables with columns; screenshot of your `/clients` page displaying real data (not mock).

**Objective 3 — Auth & RLS:** demonstrate sign-in and show your RLS policy plus two-account evidence of isolation.
- *Practical evidence:* Screenshots of User A's view and User B's view showing different data; SQL query of your RLS policy (`using (auth.uid() = user_id)`); Supabase Table Editor showing all rows exist but queries return only each user's.

**Objective 4 — Compare:** recommend Supabase, Firebase, or Postgres + Prisma for a given scenario and justify in 3–4 sentences.
- *Example scenario:* "You're building a real-time collaborative whiteboard app with mobile clients."
  - ✅ **Correct:** Firebase. You need real-time data sync and mobile SDKs; Firestore's document model is natural for collaborative edits; you trade SQL expertise for simplicity.
  - ❌ **Avoid:** Supabase here (no native mobile real-time). Postgres + Prisma (no out-of-box real-time).

---

**Scenario-based judgment checks:**

- **(a) Silent empty data:** User logs in and their `/clients` page shows an empty table. You added 3 clients via the form. What went wrong?
  - ✅ **Likely cause:** RLS is on but the policy is wrong or missing. Fix: Check that `auth.uid() = user_id` is in the policy's `using` clause. Test with two accounts.
  - ❌ **Avoid:** Assuming your code is wrong before checking RLS.

- **(b) Security oops:** You write a query like `supabase.from("clients").select().eq("user_id", userId)` to filter by user in your app code.
  - ✅ **Better approach:** Rely on RLS. Query `select()` with no filter; let the database enforce `auth.uid() = user_id` in the policy. It's safer (can't be bypassed).
  - ❌ **Avoid:** App-level filtering. The database must be the source of truth.

- **(c) Relationship broken:** You try to add an invoice with a `client_id` from a different user. The insert fails. Why?
  - ✅ **Correct:** RLS on the `invoices` table checks `auth.uid() = user_id`. You're trying to write a row owned by someone else. That's the security working as designed.
  - ❌ **Avoid:** Removing RLS to make it work. The error is catching a real threat.

- **(d) Data model:** You're modeling a multi-user expense app. Each user has expenses; each expense has tags. Where do you put `user_id`?
  - ✅ **Correct:** On `expenses` and `tags`. Each row is owned by a user; RLS protects both tables independently.
  - ❌ **Avoid:** Putting `user_id` only on expenses and leaving tags unprotected. A user could see other users' tags if you forget the policy.

- **(e) Env vars:** You hard-code your Supabase URL in `client.ts` instead of using `.env.local`.
  - ✅ **Fix:** Use `process.env.NEXT_PUBLIC_SUPABASE_URL!` and restart dev server. It reads from `.env.local`.
  - ❌ **Avoid:** Hard-coding. Makes it easy to leak (or change) by accident, and doesn't scale to production.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Tables created** | `clients` and `invoices` tables exist in Supabase with correct columns (id, user_id, name, email, amount, etc.) |
| **Foreign keys** | `invoices.client_id` references `clients.id`; both have `user_id` foreign key to `auth.users(id)` |
| **Live queries** | App reads from `supabase.from("clients").select()` (not mock data) |
| **Write path** | Form creates new clients via `supabase.from("clients").insert({ name, email })` |
| **Auth enabled** | Users can sign up/sign in; session is stored in cookies |
| **RLS enabled** | Both tables have `enable row level security` and `auth.uid() = user_id` policies |
| **Isolation tested** | Two accounts show different data; screenshots prove isolation |
| **Env vars used** | Credentials in `.env.local`, not hard-coded in code |

*Pass mark: 80% and a working app with auth + RLS submitted.*

---

## Tools & alternatives (this module)

Default: **Supabase** on **Next.js**, using `@supabase/ssr`. Alternatives in Lesson 7.8. Great module to build partly with Claude Code (Module 5) — the client/server boilerplate is agent-friendly, while *you* own the data model and RLS policies.

---

## Key takeaways

- A backend gives persistence, accounts, and authorization; Supabase bundles all three on real Postgres.
- Model data as tables with keys and relationships; `user_id default auth.uid()` ties rows to users.
- Connect with `@supabase/ssr` (async `cookies()`) so sessions work server-side — required for RLS.
- Auth identifies the user; RLS (default-deny, `auth.uid()`, `with check`) enforces who sees what — in the database.
- Always verify RLS with two accounts; watch for IPv6 DB connections and email-confirm defaults.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)