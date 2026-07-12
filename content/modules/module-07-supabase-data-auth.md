# Module 7: Data, Auth & Backend (Supabase)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~5 contact hours (0.5 CEU)

**Prerequisites:** Modules 4–6. Learners have an invoice-tracker with clients + invoices UI, now styled (Module 6), running on **mock data**. This module replaces that mock data with a real database, plus accounts and per-user security.

> This is where the app becomes real. Until now data vanished on refresh; now it persists, users log in, and each user sees only their own data. It's also the first taste of the durable skill that outlasts any tool: modeling data and enforcing who-can-see-what. Code-heavy by design.
> 

> **📸 Screenshots:** the Supabase dashboard shots (API keys, Table Editor, Auth users, RLS policy) are auto-capturable via a logged-in browser; the app shots via Playwright.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Model** data in Postgres and connect a Next.js app to Supabase. *(Apply)*
2. **Implement** user authentication and row-level-security authorization. *(Create)*
3. **Compare** Supabase with Firebase / Postgres + Prisma and justify the choice for a use case. *(Evaluate)*

> **Version note (pin + concept):** use the **`@supabase/ssr`** package for cookie-based sessions and the new **publishable/secret** API keys (legacy keys are retiring). Teach the concepts — tables, keys in env vars, auth sessions, RLS — so the skill survives API changes.
> 

> **Build-verified gotchas (pin + concept):** with `@supabase/ssr` on Next 15/16, `cookies()` is **async** — `await` it — and you keep separate browser and server clients plus a session-refresh middleware. On real setups you'll also hit (1) **IPv6-only direct DB connections** — `supabase db push`/`psql` fail on home Wi-Fi with "no route to host"; use the connection pooler or run SQL via the Management API over HTTPS; and (2) **email confirmation ON by default** — new signups can't log in without SMTP, so enable auto-confirm for a course/demo. Check current Supabase docs.
> 

---

## Lesson 7.1 — Why you need a backend (~30 min)

Mock data lives in your code, so it resets every reload and every user sees the same thing. A real app needs three things a backend provides: **persistence** (data survives), **accounts** (users log in), and **authorization** (each user sees only what they should).

Supabase bundles all three: a **Postgres database**, **Auth**, and **Row Level Security** — with a generous free tier and native Vercel integration for later. It's real Postgres, so the SQL and data-modeling skills transfer to any database job.

---

## Lesson 7.2 — Create a project & connect Next.js (~45 min)

This begins Objective 1.

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

## Lesson 7.3 — Model your data in Postgres (~45 min)

The modeling half of Objective 1. Turn the Module 3 data model into real tables. Each gets a primary key (`id`) and a `user_id` linking rows to the logged-in user. Run in the Supabase SQL editor:

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

Note `user_id ... default auth.uid()` so inserts populate ownership automatically. The relationships mirror the Module 3 build order.

---

**[SCREENSHOT PLACEHOLDER: Tables in Supabase Editor]**

Table Editor showing: clients and invoices tables with columns (id, user_id, name, email, amount, due_date, status, created_at). Proof: schema is created and visible.

---

---

## Lesson 7.4 — Replace mock data with real queries (~60 min)

This completes Objective 1. Swap the hard-coded arrays for live reads/writes.

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

## Lesson 7.5 — Authentication: user accounts (~45 min)

This begins Objective 2. Supabase Auth handles sign-up/sign-in. Enable email/password in the dashboard, then:

```tsx
"use client";
import { createClient } from "@/lib/supabase/client";
async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
}
```

Once signed in, Supabase stores the session in a cookie (why `@supabase/ssr` matters) and every request carries *who* is making it. That identity is the key to the next lesson.

*[SCREENSHOT: the Supabase Auth users list after a test signup.]*

---

## Lesson 7.6 — Authorization with Row Level Security (~45 min)

Completes Objective 2 and is the most important security concept in the course. **RLS** is a per-table rule deciding which rows a user may see or change. In Supabase it's **default-deny**: turn it on with no policy and *nobody* reads anything — safe by default.

```sql
alter table clients enable row level security;

create policy "users manage own clients"
  on clients for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

`using` controls readable/updatable rows; `with check` controls what can be inserted or reassigned (without it, a user could set a row's `user_id` to someone else). Repeat for `invoices`. Now the same query from 7.4 returns only the current user's rows — the database enforces security, not your app code. (Note: RLS controls *rows*; make sure the table is also exposed to the Data API via `anon`/`authenticated` grants — that controls *table access*.)

> **Watch-out:** an AI will happily write app code that forgets RLS. Confirm it's enabled and test with two accounts — log in as A, then B, and verify they can't see each other's data.
> 

*[SCREENSHOT: an RLS policy on the clients table.]*

---

## Lesson 7.7 — Configuration vs. secrets (~30 min)

Not all env vars are created equal. **Config** is anything you might change between environments — URLs, thresholds, feature flags, timeouts. **Secrets** are credentials you *never* share — API keys, passwords, signing keys. This distinction matters for security and deployment.

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

**In production:** Vercel stores secrets in project env vars, inaccessible to everyone but the deployment. When you deploy, Vercel injects them at build time. You never type them into code or screenshots.

---

## Lesson 7.8 — Supabase vs. the alternatives (~30 min)

This delivers Objective 3.

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

**Objective 1 — Model & connect:** show your schema and a working query reading real data into a page.
- *Practical evidence:* Screenshot of Supabase Table Editor showing `clients` and `invoices` tables with columns; screenshot of your `/clients` page displaying real data (not mock).

**Objective 2 — Auth & RLS:** demonstrate sign-in and show your RLS policy plus two-account evidence of isolation.
- *Practical evidence:* Screenshots of User A's view and User B's view showing different data; SQL query of your RLS policy (`using (auth.uid() = user_id)`); Supabase Table Editor showing all rows exist but queries return only each user's.

**Objective 3 — Compare:** recommend Supabase, Firebase, or Postgres + Prisma for a given scenario and justify in 3–4 sentences.
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

Default: **Supabase** on **Next.js**, using `@supabase/ssr`. Alternatives in Lesson 7.7. Great module to build partly with Claude Code (Module 5) — the client/server boilerplate is agent-friendly, while *you* own the data model and RLS policies.

---

## Key takeaways

- A backend gives persistence, accounts, and authorization; Supabase bundles all three on real Postgres.
- Model data as tables with keys and relationships; `user_id default auth.uid()` ties rows to users.
- Connect with `@supabase/ssr` (async `cookies()`) so sessions work server-side — required for RLS.
- Auth identifies the user; RLS (default-deny, `auth.uid()`, `with check`) enforces who sees what — in the database.
- Always verify RLS with two accounts; watch for IPv6 DB connections and email-confirm defaults.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)