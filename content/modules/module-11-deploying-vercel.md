# Module 21: Deploying Applications (Vercel + GitHub)

**Stage:** Production · **Level:** Advanced · **Duration:** ~5 contact hours (0.5 CEU)

**Prerequisites:** Modules 7 & 9. Learners have the invoice-tracker on GitHub (Module 20) with Supabase auth + RLS (Module 8). Now it goes live on the internet.

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

## Lesson 10.1 — What deployment (and CI/CD) means (~30 min)

Deployment puts your app on a server so anyone can reach it at a URL. **CI/CD** means this happens automatically: push to GitHub → it's built and deployed for you. That's the payoff of Module 20's GitHub setup: **push to `main` → Vercel builds and deploys.** Your repo is the source of truth; Vercel keeps the live site in sync.

---

## Lesson 10.2 — Deploy to Vercel with Claude Code & Vercel MCP (~60 min)

Begins Objective 1. **Use Claude Code with Vercel MCP to orchestrate deployment and environment configuration:**

### Automating Vercel deployment and configuration

**Step 1 — Sign up for Vercel** (manual one-time):
Go to [vercel.com](https://vercel.com) and click "Sign up" with GitHub. Authorize Vercel to access your GitHub repos.

**Step 2 — Generate a Vercel token** (manual, for Claude Code access):
1. Go to Vercel account settings
2. Click **Tokens**
3. Create a new token, copy it
4. Store it safely (you'll use it in Claude Code)

**Step 3 — Prompt Claude Code to deploy and configure with Vercel MCP:**

```bash
claude
```

Add Vercel MCP to Claude Code:

```
Connect me to Vercel so you can deploy and configure my app.

Use the Vercel MCP:
1. Add the Vercel server to .mcp.json with my token (I'll provide it)
2. Once connected, import my GitHub repo (invoice-tracker) to Vercel
3. Add environment variables for Supabase:
   - NEXT_PUBLIC_SUPABASE_URL: [from your Module 8 Supabase project]
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: [from Supabase]
4. Trigger the first deployment
5. Show me the live URL when done

My Vercel token: [paste your token here]
My Supabase credentials: [paste your keys here]
```

**Step 4 — Claude Code will orchestrate:**
- Connect to Vercel via MCP
- Import your GitHub repo (Next.js auto-detected)
- Add environment variables to Vercel
- Trigger the deployment
- Return the live URL (e.g., `invoice-tracker-abc123.vercel.app`)

**Step 5 — Test the live app:**
1. Click the URL Claude Code provides
2. Visit `/clients` page
3. If you see your data, the app is working! ✅
4. If empty, env vars might still be syncing (~1 min delay)

---

**[SCREENSHOT PLACEHOLDER: Vercel Dashboard with Deployment Ready]**

Vercel showing: deployment status "Ready ✓", live URL displayed, GitHub repo connected. Proof: app is live and reachable.

---

**Why Claude Code + Vercel MCP for deployment?**

- **Automation:** deployment boilerplate (repo import, env var setup, redeploy) is orchestrated in one go
- **Vercel MCP access:** Claude Code can configure Vercel programmatically, not just via UI clicks
- **Speed:** what takes 5-10 manual steps on the Vercel dashboard is coordinated by Claude Code
- **Fewer mistakes:** env vars are set before the first real deploy, so "works locally, breaks in prod" is avoided

**Important:** You still own the secrets (Supabase keys). Claude Code securely stores them in Vercel's env vars; they don't touch your git history or local machine in unsafe ways.

---

## Lesson 10.3 — Preview deploys work automatically (~20 min)

A happy side effect: because Vercel is linked to your GitHub repo (from Lesson 10.2), **every PR automatically gets a preview URL** — you don't need to do anything. This is the CI/CD payoff:

1. You push a branch and open a PR (Module 20 workflow)
2. GitHub notifies Vercel
3. Vercel builds and deploys the branch to a preview URL (automatically)
4. You see the preview link on the PR
5. Test it live, then merge

**No extra configuration needed.** Vercel's GitHub integration (set up by Claude Code in Lesson 10.2) handles the rest.

---

## Lesson 10.4 — Preview deploys & the CI/CD workflow (~45 min)

Completes the CI/CD half of Objectives 1–2 and pays off Module 20's branch/PR habit. Vercel deploys *every branch and PR* to its own **preview URL** — a live copy you can test and share before it reaches production. The full loop:

1. Branch and make a change (Module 20).
2. Open a PR → Vercel posts a **preview URL** on the PR.
3. Test the preview; merge when good.
4. Merge to `main` → Vercel deploys to **production** automatically.

---

**[SCREENSHOT PLACEHOLDER: GitHub PR with Preview Link]**

GitHub PR page showing: Vercel bot comment with "Preview Ready" and link to live preview URL. Proof: PR has a testable preview deploy.

---

You never test experiments in production, and every change is verifiable in a real environment first — the Module 2 verification principle at deployment scale.

---

## Lesson 10.5 — Custom domain & production config (~45 min)

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

> **Beyond the basics (awareness — not required for the capstone):** as a project grows you'll meet a few more Vercel features. (1) **Per-environment env vars** — Vercel scopes variables to Production / Preview / Development separately, so preview deploys can point at a *separate* Supabase project instead of touching real data. (2) **Instant rollback** — the Deployments list can promote a previous build back to production in one click when a deploy breaks. (3) **Staging branch → its own domain** — map a long-lived branch (e.g. `staging`) to a fixed URL for a stable pre-prod environment. (4) **Preview protection** — password-protect or auth-gate preview URLs so they aren't public. You don't need these to pass — just know they exist for when an app outgrows one-env-one-database.
> 

---

## Lesson 10.6 — Vercel vs. the alternatives (~30 min)

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
3. This is normal — need to configure Supabase auth URLs (see Lesson 10.5)

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

**Q10-1:** CI/CD here means:
- (a) manual uploads
- (b) **pushing to GitHub auto-builds and deploys** ✓
- (c) copying files to a server
- (d) emailing code

*Why:* CI/CD automates the entire build-and-deploy cycle: push to `main` → GitHub triggers a build → Vercel deploys the result. That's the payoff of the workflow you built in Modules 9–10.

**Q10-2:** Your app worked locally but breaks on Vercel until you:
- (a) restart your laptop
- (b) **add the env vars to Vercel** ✓
- (c) rewrite it
- (d) buy a domain

*Why:* The `NEXT_PUBLIC_*` variables are inlined at build time, so they must exist in Vercel before the deploy. This is the classic "works locally, breaks in prod" trap — your `.env.local` never made it to Vercel.

**Q10-3:** A preview deploy is:
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

Default: **Vercel** from **GitHub**, with **Supabase** as the production backend. Alternatives in Lesson 10.6. Deployment is a great agentic task — Claude Code can configure build settings or debug a failed deploy from logs — but *you* own env-var and auth config (secrets and production URLs).

---

## Key takeaways

- Deployment puts your app at a public URL; CI/CD means pushing to GitHub auto-builds and deploys it.
- Vercel auto-detects Next.js — import the repo and deploy with zero config.
- Secrets live in the platform (Vercel env vars), never in the repo; `NEXT_PUBLIC_*` are inlined at build time, so set them before deploying.
- Every PR gets a preview URL; test there, then merge to `main` for production.
- Set Supabase's production Site URL / redirect URLs, or auth breaks live.

[Accredited Vibe Coding Course](https://app.notion.com/p/Accredited-Vibe-Coding-Course-391f6ea84e41819a8ac3c38ebdb12d04?pvs=21)