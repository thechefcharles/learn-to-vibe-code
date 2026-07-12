# Module 10: Deploying (Show the World!) 🌍

**Stage:** Production · **Level:** Intermediate · **Duration:** ~4 hours · **XP:** 400

**What you need:** Modules 0-9 (your code is on GitHub, now put it online)

> **Why this matters:** Your app works on your computer. Deployment means putting it online so anyone, anywhere can use it. One click to deploy with Vercel!

## What You'll Learn

By the end of this module, you'll be able to:

1. **Deploy your app** to Vercel (free!)
2. **Get a live URL** so anyone can visit it
3. **Understand how the cloud works** (basics)

---

## Lesson 10.1 — What's Deployment? (~20 min)

Deployment = putting your app on the internet.

Your computer: Only you can access your app.
Vercel: Everyone can access your app via a URL.

Example: Your pet tracker at `my-pet-tracker.vercel.app` (or your own domain).

---

## Lesson 10.2 — Vercel Basics (~30 min)

Vercel is a platform that hosts Next.js apps (perfect for us!).

**What you do:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" and choose GitHub
3. Authorize it to see your repos

**What Vercel does:**
- Watches your GitHub repo
- When you push, Vercel automatically builds and deploys it
- Your app lives at a URL like `pet-tracker-abc123.vercel.app`

That's the whole concept! Really.

---

## Lesson 10.3 — Deploy with Claude Code (~20 min)

Instead of clicking through Vercel's UI, let Claude Code orchestrate the entire deployment!

Open Claude Code:

```bash
claude
```

Paste something like:

```
I want to deploy my pet tracker to Vercel.

My GitHub repo is at: https://github.com/YOUR-USERNAME/pet-tracker
My Supabase credentials (from Module 7):
- NEXT_PUBLIC_SUPABASE_URL: [your URL]
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: [your key]

Please:
1. Guide me through signing up for Vercel (if needed)
2. Import my pet-tracker repo to Vercel
3. Add the Supabase environment variables
4. Trigger the first deployment
5. Give me the live URL when it's ready

I want to test it in my browser right after!
```

Claude Code will:
- Help you set up Vercel ✅
- Import your GitHub repo ✅
- Add your secrets as env vars ✅
- Deploy your app ✅
- Give you a live URL ✅

That's it! Your app is on the internet.

---

## Lesson 10.4 — What Happens After Deploy (~30 min)

**Auto-updates:** When you push code to GitHub, Vercel automatically rebuilds and redeploys. No clicking needed!

**Preview URLs:** Every PR you make gets its own live preview URL. You can test changes before merging.

**Domains:** You get a free domain like `pet-tracker-abc123.vercel.app`. Later, you can add a custom domain.

---

## Activity: Deploy Your App to the Internet! 🚀

Use Claude Code to deploy your pet tracker in minutes!

### Step 1: Get your Supabase credentials ready (1 min)

From Module 7, find:
- Your Supabase project URL (settings → API)
- Your Publishable Key

Copy these — you'll paste them in Claude Code.

### Step 2: Prepare your GitHub repo (1 min)

Make sure:
- Your code is pushed to GitHub (from Module 9)
- Your `.env.local` is in `.gitignore` (NOT committed)

### Step 3: Deploy with Claude Code (5 min)

Open Claude Code:
```bash
claude
```

Paste:
```
I want to deploy my pet tracker to Vercel.

My GitHub repo: https://github.com/YOUR-USERNAME/pet-tracker
My Supabase URL: [paste your Supabase URL]
My Supabase Key: [paste your Publishable Key]

Please:
1. Help me sign up for Vercel (if I haven't)
2. Import my pet-tracker repo to Vercel
3. Add the Supabase environment variables
4. Deploy the app
5. Give me the live URL

I'll test it in my browser right after!
```

Claude Code orchestrates everything. Just follow its guidance!

### Step 4: Test your live app (2 min)

1. Click the live URL Claude Code gives you
2. Your pet tracker is on the internet! 🌍
3. Add a pet, refresh the page
4. It's still there! (Vercel + Supabase working together)

### Step 5: Share it! (1 min)

Send your live URL to a friend:
```
https://pet-tracker-abc123.vercel.app
```

They can visit and use your app!

### Deliverable:
- Your live Vercel URL
- Screenshot of your app working on the internet
- Proof it works (add a pet on the live site, screenshot it)

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q10-k1:** What does 'CI/CD' mean here?
- (a) Manual uploads
- (b) **Push to GitHub → auto-build and auto-deploy** ✓
- (c) Copying files manually
- (d) Email code to a server

*Why:* CI/CD is automation magic! You push code to GitHub, and Vercel automatically builds and deploys it. No manual steps. That's the whole point of using GitHub + Vercel together!

**Q10-k2:** Your app works at home but breaks on Vercel because:
- (a) Restart your laptop
- (b) **You forgot to set environment variables on Vercel** ✓
- (c) Rewrite it
- (d) Buy a domain

*Why:* Your Supabase secrets live in `.env.local` at home (safe, never pushed to GitHub). On Vercel, you have to tell it those secrets via Settings → Environment Variables. Without them, your app doesn't know how to connect to the database!

**Q10-k3:** A 'preview deploy' is:
- (a) The live production app
- (b) **A test version of a branch/PR before merging** ✓
- (c) A screenshot
- (d) Your local computer

*Why:* Every PR gets a live preview URL! You can test your changes on a real server before merging to `main`. If something's broken, you fix it. If it looks good, you merge and it auto-deploys to production.

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's the difference between development and deployment?**
   - *Example answer:* "Development is building on your computer. Deployment is putting your app on the internet where everyone can use it. Development = localhost; Deployment = live URL."

2. **How does Vercel auto-deploy?**
   - *Example answer:* "When you push code to GitHub, Vercel automatically builds your app and puts it online. You don't have to click anything—it's automatic!"

3. **Why are environment variables secret?**
   - *Example answer:* "Environment variables like Supabase keys are like passwords. If someone sees them, they can access your database. So they go in Vercel Settings, not in your code on GitHub."

### Scenario-based judgment checks:

*For each scenario, explain what's happening and what to do.*

- **(a) You deployed but the app shows an empty page or an error.** Everything was working locally!
  - ✅ **Likely cause:** Supabase keys aren't set up on Vercel. Fix: Add env vars in Vercel Settings, redeploy.
  - ❌ **Avoid:** Thinking something is broken. The code is fine; the config is missing.

- **(b) You're waiting for Vercel to deploy but it's been 10+ minutes.** Normally it's fast.
  - ✅ **Check:** Go to Vercel → Deployments. Did the build actually start? If it failed, click it to see the error.
  - ❌ **Avoid:** Giving up. There's a reason it's slow—diagnose it.

- **(c) You added a new feature locally, pushed to GitHub, but the live site didn't update.** Should auto-deploy!
  - ✅ **Check:** Did you push to the right branch (usually `main`)? Check Vercel → Deployments to see if a new build started.
  - ❌ **Avoid:** Assuming Vercel is broken. Usually it's a git push issue.

- **(d) You shared your live URL but your friend can't access it.** Says "Connection refused" or similar.
  - ✅ **Likely:** Your app crashed or the URL is wrong. Check Vercel → Deployments. Is there a green checkmark? Is the URL correct?
  - ❌ **Avoid:** Blaming their internet. Diagnose your deploy first.

- **(e) You forgot to add env vars and the app doesn't work.** Now you added them—does the old deploy magically work?
  - ✅ **No!** Old builds are already built. You must **Redeploy** in Vercel so it rebuilds with the new vars.
  - ❌ **Avoid:** Waiting and hoping. You have to redeploy.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Vercel account created, GitHub repo connected |
| ✅ | Repo imported into Vercel successfully |
| ✅ | Deployment finished (status shows \"Ready\") |
| ✅ | Live URL generated and accessible |
| ✅ | Live app works (pet tracker is functional on the internet) |
| ✅ | Added environment variables (if using Supabase) |
| ✅ | Redeployed after adding env vars |
| ✅ | Live app works with Supabase (data persists, isn't broken) |
| ✅ | Shared URL with someone and they can access it |

*Pass mark: 80% and a live, working app on the internet submitted.*

---

## Key Takeaways

- Deployment = putting your app online ☁️
- Vercel auto-deploys from GitHub
- One click and you're live!
- Keep secrets in environment variables
- Anyone can visit your live URL

**Next:** Module 11 — AI Agents & Workflows!
