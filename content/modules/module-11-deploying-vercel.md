# Module 11: Deploying Applications (Vercel + GitHub)

**Stage:** Production · **Level:** Advanced · **Duration:** ~5.5 contact hours (0.55 CEU)

**Prerequisites:** Modules 7 & 9. Learners have the invoice-tracker on GitHub (Module 10) with Supabase auth + RLS (Module 8). Now it goes live on the internet.

> Where "my app on [localhost](http://localhost)" becomes "my app anyone can use at a URL." It's the first Production-stage module, so the trust dial from Module 2 turns down: mistakes here are public, and secrets and config matter. The reward is a real, shareable, deployed product — exactly what a portfolio and the capstone need.
> 

> **📸 Screenshots:** the Vercel dashboard shots (import, env vars, deployments, preview link) are auto-capturable via a logged-in browser.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Deploy** a Next.js + Supabase app to production on Vercel with GitHub-driven CI/CD. *(Create)*
2. **Configure** environment variables, preview deploys, and a custom domain. *(Apply)*
3. **Compare** Vercel with Netlify / Railway / Render for a given project. *(Evaluate)*

---

## Lesson 11.1 — What deployment (and CI/CD) means (~30 min)

Deployment puts your app on a server so anyone can reach it at a URL. **CI/CD** means this happens automatically: push to GitHub → it's built and deployed for you. That's the payoff of Module 10's GitHub setup: **push to `main` → Vercel builds and deploys.** Your repo is the source of truth; Vercel keeps the live site in sync.

---

## Lesson 11.2 — Deploy to Vercel (~60 min)

Begins Objective 1. Vercel turns your GitHub repo into a live site. **The primary path in this module is the Vercel dashboard** — it's the clearest way to *see* what deployment does, and it keeps your secrets out of any chat window. You'll walk it end to end in the Hands-on activity below; here's the shape of it:

1. **Sign up** for Vercel with GitHub (one-time).
2. **New Project → Import** your `invoice-tracker` repo. Vercel auto-detects Next.js — zero config.
3. **Deploy.** You get a live URL (e.g., `invoice-tracker-abc123.vercel.app`).
4. **Add env vars** in Settings → Environment Variables (your Supabase URL + publishable key), then **redeploy**.

The full step-by-step — including the deliberate "empty table → add env vars → it works" arc — is in the Hands-on activity.

### When a deploy fails, read the build logs first

Don't guess. Open **Vercel → Deployments**, click the failed deployment, and read the **Build Logs**. The error that stopped the build is printed there — a missing dependency, a type error, a bad import path. Fix exactly what the log names, push again, and Vercel rebuilds. Reading the log is always the first step; Claude Code can help interpret a log you paste in.

[SCREENSHOT: Vercel dashboard with deployment status Ready, the live URL displayed, and the GitHub repo connected]

### Optional: accelerate with Claude Code + Vercel MCP (advanced)

Once you've deployed manually and understand the moving parts, you can let Claude Code drive Vercel through the **Vercel MCP** — importing the repo, setting env vars, and redeploying in one pass. This is optional; the dashboard path above is all you need to pass.

> **Warning:** Never paste a long-lived token (Vercel, Supabase, or any other) into a chat prompt — chat history can be logged or synced. Put the token in an environment variable and reference it *by name*.

**Step 1 — Generate a Vercel token and store it in an environment variable:**
1. Vercel account settings → **Tokens** → create a token, copy it.
2. Add it to your shell environment or your MCP client's secret store — never to a file you commit:
   ```bash
   export VERCEL_TOKEN="your-token-here"
   ```

**Step 2 — Reference the variable *name* (not the value) in `.mcp.json`:**
```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp"],
      "env": { "VERCEL_TOKEN": "${VERCEL_TOKEN}" }
    }
  }
}
```
`.mcp.json` holds only the placeholder `${VERCEL_TOKEN}`, never the secret itself — so it stays safe even though this file is often committed to the repo.

**Step 3 — Prompt Claude Code (no secrets in the prompt):**
```
Use the Vercel MCP. My token is already in the VERCEL_TOKEN env var — do not ask me to paste it.
1. Import my GitHub repo (invoice-tracker) to Vercel
2. Read my Supabase env vars from .env.local and add them to the Vercel project:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
3. Trigger the first deployment
4. Show me the live URL when done
```

**Why use the MCP path?** It coordinates repo import, env-var setup, and redeploy in one go, so "works locally, breaks in prod" is less likely. **What stays yours:** the secrets. They live in Vercel's env vars and your local environment — never in the prompt, never in git history.

---

## Lesson 11.3 — Preview deploys & the CI/CD workflow (~45 min)

Completes the CI/CD half of Objectives 1–2 and pays off Module 10's branch/PR habit. A happy side effect of linking Vercel to your GitHub repo (Lesson 11.2): **every branch and PR automatically gets its own preview URL** — a live copy you can test and share before it reaches production. No extra configuration is needed; Vercel's GitHub integration handles it. The full loop:

1. Branch and make a change (Module 10).
2. Push and open a PR → Vercel builds the branch and posts a **preview URL** on the PR.
3. Test the preview live; merge when it's good.
4. Merge to `main` → Vercel deploys to **production** automatically.

[SCREENSHOT: GitHub PR page showing the Vercel bot comment with Preview Ready and a link to the live preview URL]

You never test experiments in production, and every change is verifiable in a real environment first — the Module 2 verification principle at deployment scale.

---

## Lesson 11.4 — A database per environment (dev / preview / production) (~30 min)

Preview deploys (Lesson 11.3) solve half the problem: your *code* is isolated per branch. But if all those previews point at the **same Supabase project as production**, a test signup, a `delete`, or a half-finished migration in a preview touches **real user data**. Isolating code without isolating data is a trap.

**The principle: one database per environment.** Dev and preview get throwaway data you can break; production is sacred and only your live `main` deploy touches it.

**The beginner-practical setup — two Supabase projects:**

1. Create a **second** Supabase project. Now you have two: `myapp-prod` (real users) and `myapp-dev` (throwaway/test data).
2. In **Vercel → Settings → Environment Variables**, use the **same variable names with different values per environment**. Vercel scopes every variable to **Production / Preview / Development** separately:
   - `NEXT_PUBLIC_SUPABASE_URL` + keys → **Production** = your `myapp-prod` values.
   - Same variable names → **Preview** and **Development** = your `myapp-dev` values.
3. Result: your `main` → production deploy uses the production database; **every PR preview uses the dev database**. You can break a preview freely — real users never see it and their data is untouched.

[SCREENSHOT: Vercel Environment Variables page showing NEXT_PUBLIC_SUPABASE_URL scoped to Production vs Preview with different values]

**Keep the schemas in sync with migrations (don't click twice).** Two databases must have the same tables and RLS policies, or code that works in dev breaks in prod. Don't build each one by hand — use **versioned SQL migrations** (Module 14): apply the same migration file to each project (`supabase db push` against each, or paste it into each project's SQL editor). Migrations are the source of truth, so dev and prod never drift.

**Auth URLs are per-project too.** Each Supabase project needs its own **Site URL / Redirect URLs** (Lesson 11.5): the dev project points at your preview/`localhost` URLs, the prod project at your real domain. Set them once per project.

**Grow into it (awareness — not required for the capstone):**

- **Supabase local** — `supabase start` runs the entire stack (Postgres, Auth, Storage) on your machine via Docker, fully offline. Develop and test migrations locally, then `supabase db push` to a hosted project. Great once you're comfortable with the CLI; it needs Docker installed.
- **Supabase branching** — Supabase can automatically spin up a fresh preview database for each git branch/PR, mirroring Vercel's preview deploys. It's the fully-automated version of "a database per environment" — reach for it when managing two projects by hand becomes the bottleneck.

**Rule of thumb:** never let an experiment touch production data. At minimum, a separate dev project; ideally, automated per-branch databases as you scale.

---

## Lesson 11.5 — Custom domain & production config (~45 min)

**In this lesson:** Two critical things separate a demo from a production app:

**Custom domain** — in Vercel → Settings → Domains, add a domain you own and follow the DNS steps. Your app lives at `yourname.com`.

### Production auth config (the step beginners miss): Configure Supabase for Production Auth

When you deploy to Vercel, auth breaks if Supabase doesn't know your production URL.

**Why?** Supabase sends a redirect link after you sign in. If that link goes to localhost:3000 instead of your Vercel URL, sign-in fails silently (or redirects to the wrong place).

**Step-by-step walkthrough:**

1. Go to your Supabase dashboard: https://supabase.com/dashboard/
2. Select your project
3. Navigate to **Authentication** → **URL Configuration** (left sidebar)
4. You'll see two fields:
   - **Site URL** — where your app is hosted
   - **Redirect URLs** — where Supabase sends users after sign-in

5. In **Site URL**, enter your Vercel deployment URL:
   ```
   https://your-app-name.vercel.app
   ```
   (If you don't know your Vercel URL, go to your Vercel dashboard and copy it.)

6. In **Redirect URLs**, add two entries:
   - `https://your-app-name.vercel.app/auth/callback`
   - `https://your-app-name.vercel.app` (the root)

   (These should match the redirect URLs in your `/app/auth/callback/route.ts` file. If you're not sure, check the file.)

7. Click **Save**

8. Test: Visit your live Vercel URL, click "Sign In", enter an email/password, and verify you're redirected to the dashboard.

**If it doesn't work:**
- Check the Supabase URL and API key in your Vercel env vars (they should match your Supabase project)
- Check the Redirect URLs — they must exactly match your Vercel URL + `/auth/callback`
- Check your `/app/auth/callback/route.ts` — it should have `getURL()` returning the correct origin

**Screenshot example:**

[SCREENSHOT: Supabase URL Configuration page, showing Site URL and Redirect URLs filled in]

> **Beyond the basics (awareness — not required for the capstone):** as a project grows you'll meet a few more Vercel features. (1) **Per-environment env vars & a database per environment** — pointing preview deploys at a separate Supabase project so they never touch real data (walked through in Lesson 11.4). (2) **Instant rollback** — the Deployments list can promote a previous build back to production in one click when a deploy breaks. (3) **Staging branch → its own domain** — map a long-lived branch (e.g. `staging`) to a fixed URL for a stable pre-prod environment. (4) **Preview protection** — password-protect or auth-gate preview URLs so they aren't public. You don't need these to pass — just know they exist for when an app outgrows one-env-one-database.
> 

---

## Lesson 11.6 — Vercel vs. the alternatives (~30 min)

This delivers Objective 3.

| Option | What it is | Best when |
| --- | --- | --- |
| **Vercel** (default) | Deployment platform built by the Next.js team | Next.js — zero-config deploys, previews, great DX |
| Netlify | Similar frontend/JAMstack platform | Static/frontend sites; you prefer its ecosystem |
| Railway / Render | General app hosting (backends, containers, cron, DBs) | Long-running servers or non-Next.js backends |
| Cloudflare / AWS | Broader cloud platforms | Advanced scale/control; more setup |

**Why Vercel is the default:** made by the Next.js team — zero-config, automatic previews, seamless GitHub integration. **Trade-offs:** Netlify comparable for frontends; Railway/Render better for always-on backends or hosting DB + app together; big clouds trade simplicity for control.

---

## Hands-on activity (~60 min, folded in)

**"Go live."** Follow these steps to deploy your invoice-tracker to the real internet!

### Step 1: Sign up for Vercel (2 min)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "GitHub" and authorize it

### Step 2: Import your GitHub repo (5 min)
1. Click "New Project"
2. Find your `invoice-tracker` repo in the list
3. Click "Import"
4. Vercel auto-detects Next.js ✓
5. Click "Deploy"
6. Wait for the build to complete (~2 min)
7. You get a live URL! (e.g., `invoice-tracker-abc123.vercel.app`)

### Step 3: Test it and see the issue (2 min)
1. Click the live URL
2. Try to view `/clients`
3. Empty table — this is expected! Your Supabase keys aren't on Vercel yet.

### Step 4: Add environment variables (5 min)
1. In Vercel, go to **Settings → Environment Variables**
2. Add your Supabase credentials (from Module 8):
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = sb_pub_xxx
   ```
3. Click "Save"

### Step 5: Redeploy (5 min)
1. Go to **Deployments**
2. Click the three dots on the latest deployment
3. Click "Redeploy"
4. Wait ~1 min for the build
5. Visit the live URL again—your data appears! ✅

### Step 6: Test with a PR preview (5 min)
1. On your local machine, create a branch: `git checkout -b add-sort-feature`
2. Make a small change (add a comment, update a style)
3. Commit and push: `git add . && git commit -m "Add feature" && git push -u origin add-sort-feature`
4. Go to GitHub, open a PR
5. Vercel posts a preview URL on the PR (watch for "Preview Ready")
6. Click the preview URL—you see your change live!

### Step 7: Test auth in production (3 min)
1. On your live site, try to sign up with a new email
2. You might see an error (auth not configured for production)
3. This is normal — need to configure Supabase auth URLs (see Lesson 11.5)

### Step 8: Configure Supabase Auth for production (5 min)
1. In Supabase dashboard, go to **Authentication → URL Configuration**
2. Set **Site URL** to your Vercel URL (e.g., `https://invoice-tracker-abc123.vercel.app`)
3. Add your Vercel URL to **Redirect URLs** (same URL)
4. Click "Save"

### Step 9: Test auth again (2 min)
1. Back on your live site, try to sign up
2. Should work now! ✅
3. Sign in and confirm you see only your own data

### Deliverable:
- Your live Vercel URL (screenshot showing it works)
- Screenshot of a preview URL from a PR
- Evidence that auth works in production (screenshot of sign-in → logged-in state)

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q11-1:** CI/CD here means:
- (a) manual uploads
- (b) **pushing to GitHub auto-builds and deploys** ✓
- (c) copying files to a server
- (d) emailing code

*Why:* CI/CD automates the entire build-and-deploy cycle: push to `main` → GitHub triggers a build → Vercel deploys the result. That's the payoff of the workflow you built in Modules 9–10.

**Q11-2:** Your app worked locally but breaks on Vercel until you:
- (a) restart your laptop
- (b) **add the env vars to Vercel** ✓
- (c) rewrite it
- (d) buy a domain

*Why:* The `NEXT_PUBLIC_*` variables are inlined at build time, so they must exist in Vercel before the deploy. This is the classic "works locally, breaks in prod" trap — your `.env.local` never made it to Vercel.

**Q11-3:** A preview deploy is:
- (a) the production site
- (b) **a live URL for a branch/PR to test before merging** ✓
- (c) a screenshot
- (d) a local server

*Why:* Every branch and PR gets its own preview URL (a real, live deployment). Test there, merge to `main` when confident, and production auto-deploys. No guessing — you've seen it working.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Deploy with CI/CD:** submit your live production URL and explain, step by step, what happens when you push to `main`.

**Objective 2 — Configure env/previews/domain:** explain why it worked locally but not on Vercel until you added env vars, and show a preview URL from a PR.

**Objective 3 — Compare:** recommend Vercel, Netlify, or Railway/Render for a given app and justify in 3–4 sentences.

---

**Scenario-based judgment checks:**

*For each scenario, explain what's happening and what to do.*

- **(a) Build succeeded but the app shows an error "Cannot read properties of undefined":** You deployed but didn't set env vars.
  - ✅ **Root cause:** Supabase URL/key are undefined in production. Fix: Add env vars in Vercel Settings, redeploy.
  - ❌ **Avoid:** Thinking the code is broken. The code is fine; the config is missing.

- **(b) Env vars are in Vercel, but auth still fails on the live site.** Users can't log in even though it works locally.
  - ✅ **Root cause:** Supabase Auth isn't configured for your production URL. Fix: Set Site URL and Redirect URLs in Supabase Dashboard.
  - ❌ **Avoid:** Re-adding env vars (they're fine). The problem is Supabase auth config.

- **(c) You opened a PR and no preview URL appeared.** You're waiting for Vercel to post a comment.
  - ✅ **Likely issue:** Vercel integration isn't connected to your GitHub repo, or the build failed. Check Vercel Deployments tab.
  - ❌ **Avoid:** Waiting forever. Investigate if the build even ran.

- **(d) You want to roll back after a bad deploy.** The latest production deploy has a bug.
  - ✅ **Fix:** Go to Vercel → Deployments, find the previous good deployment, click three dots, click "Promote to Production".
  - ❌ **Avoid:** Trying to fix it via code; rollback is instant.

- **(e) Preview URL doesn't match production behavior.** Code works in preview but breaks on production main.
  - ✅ **Diagnose:** Different env vars? (per-environment config?) Different Supabase project? Check Settings → Environment Variables and filter by deployment environment.
  - ❌ **Avoid:** Assuming they're the same. They might not be configured the same way.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Repo imported** | Vercel project created, GitHub repo connected |
| **Deployed successfully** | Live URL generated (e.g., `invoice-tracker-xxx.vercel.app`) |
| **Env vars added** | NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel Settings |
| **Redeployed** | After adding env vars, redeploy triggered and build succeeded |
| **App works live** | Visit the URL, `/clients` page loads with data (not empty) |
| **Auth configured** | Supabase Site URL and Redirect URLs set to production URL |
| **Auth works in production** | Can sign up / sign in on live site |
| **Data isolation verified** | Two accounts: sign up as User A, see User A's data; sign out, sign up as User B, see only User B's data |
| **Preview URL tested** | Opened a PR, Vercel posted a preview URL, clicked it and saw the preview |
| **Live URL shared** | Submitted your live Vercel URL for grading |

*Pass mark: 80% and a live, working deployed URL submitted.*

---

## Tools & alternatives (this module)

Default: **Vercel** from **GitHub**, with **Supabase** as the production backend. Alternatives in Lesson 11.6. Deployment is a great agentic task — Claude Code can configure build settings or debug a failed deploy from logs — but *you* own env-var and auth config (secrets and production URLs).

---

## Key takeaways

- Deployment puts your app at a public URL; CI/CD means pushing to GitHub auto-builds and deploys it.
- Vercel auto-detects Next.js — import the repo and deploy with zero config.
- Secrets live in the platform (Vercel env vars), never in the repo; `NEXT_PUBLIC_*` are inlined at build time, so set them before deploying.
- Every PR gets a preview URL; test there, then merge to `main` for production.
- Set Supabase's production Site URL / redirect URLs, or auth breaks live.

[Accredited Vibe Coding Course](/course)