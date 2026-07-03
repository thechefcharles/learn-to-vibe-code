# Module 10: Deploying Applications (Vercel + GitHub)

**Stage:** Production · **Level:** Advanced · **Duration:** ~5 contact hours (0.5 CEU)

**Prerequisites:** Modules 7 & 9. Learners have the invoice-tracker on GitHub (Module 9) with Supabase auth + RLS (Module 7). Now it goes live on the internet.

> Where "my app on [localhost](http://localhost)" becomes "my app anyone can use at a URL." It's the first Production-stage module, so the trust dial from Module 1 turns down: mistakes here are public, and secrets and config matter. The reward is a real, shareable, deployed product — exactly what a portfolio and the capstone need.
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

Deployment puts your app on a server so anyone can reach it at a URL. **CI/CD** means this happens automatically: push to GitHub → it's built and deployed for you. That's the payoff of Module 9's GitHub setup: **push to `main` → Vercel builds and deploys.** Your repo is the source of truth; Vercel keeps the live site in sync.

---

## Lesson 10.2 — Deploy to Vercel from GitHub (~60 min)

Begins Objective 1.

**Step 1 — Sign up at [vercel.com](http://vercel.com)** with GitHub.

**Step 2 — Import your repo.** Vercel detects Next.js and configures the build — no config files (why Next.js + Vercel is the default).

![live clients](/screenshots/m10/m10-01-live-clients.png)

**Step 3 — Deploy.** In a minute or two you get a live URL. The build succeeds but the app won't fully work yet — no database keys in production. Deliberate teaching moment: **your local `.env.local` did not go to Vercel** (gitignored in Module 9), so production has no secrets until you add them.

---

## Lesson 10.3 — Environment variables in production (~45 min)

Begins Objective 2 and explains the "worked locally, broke deployed" mystery. Your Supabase keys live in `.env.local`, which is *not* in Git and *not* on Vercel. Add them in **Vercel → Project → Settings → Environment Variables** (same keys from Module 7):

```
NEXT_PUBLIC_SUPABASE_URL = https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = sb_publishable_xxx
```

Then redeploy. Principle: **secrets live in the platform, never in the repo.** Same value, two homes — `.env.local` for local, Vercel's settings for production.

> **Build-verified note:** `NEXT_PUBLIC_*` variables are **inlined at build time**, so they must exist in Vercel *before* the deploy that uses them — add them first, then trigger a fresh deploy, or the built app breaks in production with no error locally.
> 

![m10 supabase prod auth urls](/screenshots/m10/m10-supabase-prod-auth-urls.png)

---

## Lesson 10.4 — Preview deploys & the CI/CD workflow (~45 min)

Completes the CI/CD half of Objectives 1–2 and pays off Module 9's branch/PR habit. Vercel deploys *every branch and PR* to its own **preview URL** — a live copy you can test and share before it reaches production. The full loop:

1. Branch and make a change (Module 9).
2. Open a PR → Vercel posts a **preview URL** on the PR.
3. Test the preview; merge when good.
4. Merge to `main` → Vercel deploys to **production** automatically.

![m10 vercel deployments](/screenshots/m10/m10-vercel-deployments.png)

You never test experiments in production, and every change is verifiable in a real environment first — the Module 1 verification principle at deployment scale.

---

## Lesson 10.5 — Custom domain & production config (~45 min)

Completes Objective 2. Two things turn the deploy into a real product:

**Custom domain** — in Vercel → Settings → Domains, add a domain you own and follow the DNS steps. Your app lives at `yourname.com`.

**Production auth config (the step beginners miss)** — Supabase Auth needs your production URL or logins/redirects fail on the live site even though they worked locally. In the Supabase dashboard, set the **Site URL** and add your domain to the **redirect URLs**. A classic "works on [localhost](http://localhost), breaks in prod" trap.

![m10 vercel env](/screenshots/m10/m10-vercel-env.png)

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

**"Go live."** (1) Import your repo into Vercel and deploy, (2) add the Supabase env vars and redeploy so it works in production, (3) open a PR and confirm a preview URL, (4) configure Supabase Auth's production Site URL so login works live, (5) optionally attach a custom domain. Deliverable: a working, public URL where a user can sign up, log in, and see only their own data.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Deploy with CI/CD:** submit your live production URL and explain, step by step, what happens when you push to `main`.

**Objective 2 — Configure env/previews/domain:** explain why it worked locally but not on Vercel until you added env vars, and show a preview URL from a PR.

**Objective 3 — Compare:** recommend Vercel, Netlify, or Railway/Render for a given app and justify in 3–4 sentences.

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