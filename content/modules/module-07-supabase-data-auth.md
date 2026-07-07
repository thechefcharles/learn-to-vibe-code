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

```tsx
// lib/supabase/client.ts (browser)
import { createBrowserClient } from "@supabase/ssr";
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
```

> **Tip:** a perfect agentic task (Module 5) — ask Claude Code to "set up Supabase browser and server clients using @supabase/ssr" and review the diff. The server client + cookie handling is boilerplate the agent does well; you verify it.
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

**Write** happens in a form action calling `supabase.from("clients").insert({ name, email })`. Wire both, then confirm data survives a refresh — the moment the app feels real. Verify: add a record, reload, and check the row in the Table Editor.

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

## Lesson 7.7 — Supabase vs. the alternatives (~30 min)

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

**"Make it real."** (1) Create a Supabase project and connect it, (2) create the `clients`/`invoices` tables, (3) replace mock data with live reads/writes, (4) add email/password sign-in, (5) enable RLS with per-user policies and verify isolation with two accounts. Deliverable: a running app where data persists and two users can't see each other's data.

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

**Objective 2 — Auth & RLS:** demonstrate sign-in and show your RLS policy plus two-account evidence of isolation.

**Objective 3 — Compare:** recommend Supabase, Firebase, or Postgres + Prisma for a given scenario and justify in 3–4 sentences.

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