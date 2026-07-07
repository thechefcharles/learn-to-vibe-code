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

Go to vercel.com and sign up with GitHub.

That's it! Really.

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

1. Make sure your code is on GitHub
2. Sign up for Vercel
3. Import your repo
4. Click deploy
5. Share your live URL!

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

## Knowledge Check (Quiz)

1. **What's the difference between development and deployment?**
2. **How does Vercel auto-deploy?**
3. **Why are environment variables secret?**

---

## Key Takeaways

- Deployment = putting your app online ☁️
- Vercel auto-deploys from GitHub
- One click and you're live!
- Keep secrets in environment variables
- Anyone can visit your live URL

**Next:** Module 11 — AI Agents & Workflows!
