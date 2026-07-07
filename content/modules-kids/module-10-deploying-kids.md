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

## Lesson 10.3 — Deploy in One Click (~20 min)

1. Go to vercel.com
2. Click "Import Project"
3. Find your GitHub repo (pet-tracker)
4. Click "Deploy"
5. Wait 30 seconds
6. You get a live URL!

Vercel automatically:
- Watches your GitHub repo
- Deploys when you push changes
- Gives you a public URL
- Handles all the server stuff

---

## Lesson 10.4 — Your Own Domain (Optional) (~30 min)

You can use `my-pet-tracker.vercel.app` OR buy a custom domain like `mypetracker.com`.

Domains cost ~$10/year. Optional for this course.

---

## Lesson 10.5 — Environment Variables (~30 min)

Your Supabase keys are secret (don't share them!).

On your computer, they live in `.env.local` (gitignored).

On Vercel, they go in Settings → Environment Variables.

Prompt Claude Code: *"Set up environment variables for Supabase on Vercel."*

It'll guide you.

---

## Activity: Deploy Your App 🚀

Follow these steps to put your pet tracker on the real internet!

### Step 1: Sign up for Vercel (2 min)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Choose "GitHub" and click "Authorize"
4. Done!

### Step 2: Import your repo (3 min)
1. Click "New Project"
2. Find your `pet-tracker` repo
3. Click "Import"
4. Vercel detects it's a Next.js app ✓
5. Click "Deploy"

### Step 3: Wait for the build (2 min)
Vercel builds and deploys your app. You'll see:
- Building... (spinning)
- Ready! (green checkmark)
- Your live URL: `pet-tracker-abc123.vercel.app`

### Step 4: Test it! (2 min)
1. Click the live URL
2. Your pet tracker is on the internet! 🌍
3. Add a pet, refresh—it's still there!

### Step 5: Add environment variables (3 min)
If you set up Supabase in your app:

1. In Vercel, go to **Settings → Environment Variables**
2. Add your Supabase URL and key (from Module 7):
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   ```
3. Click "Save"
4. Go back to **Deployments** and click "Redeploy" on the latest build
5. Wait ~1 min for the new build
6. Your live app now works with Supabase!

### Step 6: Share it! (1 min)
Send your live URL to a friend and have them try it!
```
https://pet-tracker-abc123.vercel.app
```

### Deliverable:
- Your live Vercel URL (screenshot showing it works)
- Screenshot of your pet tracker running on the internet

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
