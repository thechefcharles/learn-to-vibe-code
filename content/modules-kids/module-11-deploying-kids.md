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

## Lesson 10.2 — Deploy Step-by-Step on Vercel (~45 min)

Before Claude Code automates deployment, let's understand what happens when you deploy.

### What Is Deployment?

"Deployment" = uploading your app to the internet so others can use it.

Right now:
- Your app runs on YOUR computer (`localhost:3000`)
- Only you can access it
- If you close your laptop, it stops

After deployment:
- Your app runs on a SERVER (Vercel's computer)
- Anyone with the URL can access it
- It runs 24/7, even when your laptop is closed

### How Deployment Works: 3 Steps

**Step 1: Build**
You write code. The computer compiles it (JavaScript → optimized bundles). This is `npm run build`.

**Step 2: Connect to Vercel**
You push your code to GitHub. Vercel watches GitHub. When you push, Vercel automatically rebuilds and redeploys.

**Step 3: Add Environment Variables**
Your app needs secrets (Supabase key, API keys). These can't go in your code (GitHub is public!). So you add them to Vercel's environment variables.

**Example:**
- Code says: `const client = Supabase.init(process.env.NEXT_PUBLIC_SUPABASE_URL)`
- You add to Vercel: `NEXT_PUBLIC_SUPABASE_URL = https://yourproject.supabase.co`
- Vercel injects it when running your app

### Practice: Set Up Vercel Manually

#### Step 1: Create a Vercel account
Go to [vercel.com](https://vercel.com). Sign up with GitHub.

#### Step 2: Import your pet tracker from GitHub
- Click "New project"
- Select your `pet-tracker` repo
- Click "Import"
- Vercel will scan your code and detect: "This is a Next.js app"

#### Step 3: Add environment variables in Vercel UI
Vercel will ask: "Do you have any environment variables?"

Click "Add Environment Variable" and fill in:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://yourproject.supabase.co` (copy from Supabase)

Add another:
- **Name:** `NEXT_PUBLIC_SUPABASE_KEY`
- **Value:** `sb_anon_xxx` (copy from Supabase)

**Why "NEXT_PUBLIC"?** These keys are OK to expose (they're read-only). If you had a SECRET key, you'd NOT use NEXT_PUBLIC.

#### Step 4: Click "Deploy"
Vercel:
1. Runs `npm install` (download packages)
2. Runs `npm run build` (compile your code)
3. Uploads the bundle to Vercel's servers
4. Shows you a live URL: `https://pet-tracker-xyz.vercel.app`

#### Step 5: Test it
Open the live URL. Add a pet, refresh the page. Verify it works (it should—same code as your laptop).

### What Just Happened?

You deployed an app! You:
- Connected GitHub to Vercel
- Added environment variables manually
- Clicked deploy
- Now anyone can access your app

**This is CI/CD (Continuous Integration/Continuous Deployment):**
- Continuous Integration = every time you push to GitHub, Vercel rebuilds
- Continuous Deployment = rebuilds are deployed automatically

You don't have to click "deploy" manually every time. Push to GitHub → Vercel sees it → rebuilds + deploys automatically.

### Troubleshooting

**"Build failed"**
- Check the build logs (Vercel shows them)
- Common error: missing env var
- Fix: Add the missing variable to Vercel UI, redeploy

**"Blank page / 404"**
- Check the URL (did you copy it right?)
- Check the app works on your laptop first
- Check Vercel shows "Deployment: Success"

**"Environment variable missing"**
- Error message: "Cannot read property 'url' of undefined"
- This means `process.env.NEXT_PUBLIC_SUPABASE_URL` is missing
- Fix: Add it to Vercel's environment variables

### Key Takeaway

Deployment isn't magic. It's:
1. Push code to GitHub
2. Add secrets to Vercel (environment variables)
3. Click deploy (or it deploys automatically)
4. Your app runs on the internet

Next, Claude Code will automate this. But you understand what's happening.

---

## Lesson 10.3 — Automate Deployment with Claude Code (~20 min)

You've deployed once manually. Now Claude Code can do it for all your future deployments.

**Why this works:**
- You understand the steps (build, connect, env vars, deploy)
- Claude Code knows Vercel's API and can do all steps automatically
- It can deploy in 2 minutes; it would take you 15 manually

**What you're doing:** Verification + decision-making.
**What Claude Code is doing:** API calls + form filling.

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
1. Help me sign up for Vercel (if needed)
2. Import my pet-tracker repo to Vercel
3. Add the Supabase environment variables
4. Check that auto-deploy is enabled
5. Give me the live URL when it's ready
```

Claude Code will handle the repetitive steps. You focus on testing.

---

## Lesson 10.4 — What Happens After Deploy (~30 min)

**Auto-updates:** When you push code to GitHub, Vercel automatically rebuilds and redeploys. No clicking needed!

**Preview URLs:** Every PR you make gets its own live preview URL. You can test changes before merging.

**Domains:** You get a free domain like `pet-tracker-abc123.vercel.app`. Later, you can add a custom domain.

---

## Lesson 10.5 — Set Up Auth So Sign-In Works (~20 min)

When you sign in to your pet tracker, Supabase sends a link back to your app. If Supabase doesn't know your live URL, sign-in breaks.

### The 6 Steps

**Step 1:** Open your Supabase dashboard (where you created your database in Module 7)

**Step 2:** Click **Authentication** on the left sidebar

**Step 3:** Click **URL Configuration**

**Step 4:** Copy your Vercel URL from your Vercel dashboard
- Example: `https://pet-tracker-abc123.vercel.app`
- Paste it into the **Site URL** field

**Step 5:** In **Redirect URLs**, add this line:
```
https://pet-tracker-abc123.vercel.app/auth/callback
```
(Replace `pet-tracker-abc123` with your actual Vercel project name)

**Step 6:** Click **Save**

### Test It

Go to your live URL, try to sign in. It should work now!

### Troubleshooting

- **Sign-in still doesn't work?** Double-check:
  - Your Vercel URL matches exactly (including `https://`)
  - The redirect URL ends with `/auth/callback`
  - You clicked Save

---

## Activity: Deploy Your App to the Internet! 🚀

Deploy your pet tracker twice: once manually to learn, then Claude Code automates it next time.

### Step 1: Manual deployment (20 min)

Follow Lesson 10.2's steps:
1. Go to Vercel.com
2. Create account / sign in with GitHub
3. Import your `pet-tracker` GitHub repo
4. Add environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY)
5. Click "Deploy"
6. Wait for build to complete
7. Open the live URL and verify your app works

**Deliverable:** Screenshot of your app running at `*.vercel.app`

### Step 2: Understand the deployment (5 min)

Vercel showed you build logs during Step 1. Answer:
- ✓ What command did Vercel run? (`npm install`, `npm run build`)
- ✓ Did the build succeed or fail?
- ✓ Did your environment variables get injected?

### Step 3: Push a code change (5 min)

On your laptop:
1. Change something in your app (e.g., title from "Pet Tracker" to "My Pets")
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Change title"
   git push
   ```

Go back to Vercel. You should see:
- New deployment started automatically
- It rebuilds with your change
- Live URL updates automatically

(This is CI/CD—automatic rebuilds on push.)

### Step 4: Ask Claude Code to handle future deployments (10 min)

Now that you understand the process, open Claude Code:

```bash
claude
```

Paste:
```
My pet tracker is deployed to Vercel at https://pet-tracker-xyz.vercel.app

The environment variables are:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_KEY

From now on, every time I push to GitHub, I want Vercel to:
1. Rebuild automatically
2. Redeploy automatically
3. Report any build errors

Can you verify this is set up in Vercel? If not, fix it.
```

Claude Code will:
- Check Vercel's deployment settings
- Verify auto-rebuild is enabled
- Ensure environment variables are set
- Report: "All good, your app will auto-deploy on every push"

### Step 5: Verify it works (5 min)

Make another small code change, push to GitHub, and watch Vercel auto-deploy. Done!

### Deliverable:
- Your live Vercel URL
- Screenshot of your app working on the internet
- Proof it works (add a pet on the live site, screenshot it)
- Proof that auto-deploy works (code change pushed → live app updated)

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q10-k1:** What does "CI/CD" mean?
- (a) Computer Installation/Debugging
- (b) **Continuous Integration/Continuous Deployment** ✓
- (c) Cloud Internet/Database
- (d) Checking Important/Code Downloads

*Why:* CI = every time you push to GitHub, Vercel rebuilds. CD = rebuilds deploy automatically. You don't click "deploy" manually—it's automatic.

**Q10-k2:** Why do you add environment variables to Vercel instead of putting them in your code?
- (a) It's faster
- (b) **GitHub is public; you can't hardcode secrets there** ✓
- (c) Vercel requires it
- (d) It's more fun

*Why:* Secrets (API keys, database passwords) can't live in code because GitHub is public. Anyone could see them! Vercel injects them securely at runtime.

**Q10-k3:** You pushed code to GitHub. Vercel automatically rebuilds and deploys. Which step did you NOT do manually?
- (a) Write the code
- (b) Push to GitHub
- (c) **Click the "Deploy" button** ✓
- (d) Test the live app

*Why:* CI/CD means deploy happens automatically when you push. You don't click anything—that's the automation magic!

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What are the 3 main steps of deployment?**
   - *Example answer:* "Build (compile code), Connect (push to GitHub), Add secrets (environment variables on Vercel), Deploy (click deploy or auto-deploy on push)."

2. **Why would you ever manually deploy if CI/CD is automatic?**
   - *Example answer:* "You manually deploy once to understand what happens. After that, CI/CD automates it. You learn the steps first, then let tools handle it."

3. **What happens if you set environment variables on Vercel but forget to redeploy?**
   - *Example answer:* "The old build is already built without the new secrets. You must redeploy so it rebuilds with the new variables."

### Scenario-based judgment checks:

*For each scenario, explain what's happening and what to do.*

- **(a) You manually deployed to Vercel. Build succeeded. But the live app shows a blank page.**
  - ✅ **Likely cause:** Environment variables are missing (app can't connect to Supabase). Fix: Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY to Vercel Settings, then redeploy.
  - ❌ **Avoid:** Rewriting code. The code is fine; the config is missing.

- **(b) You added a feature, pushed to GitHub.** You expect Vercel to auto-deploy, but 10 minutes later it's still showing the old version.
  - ✅ **Check:** Go to Vercel → Deployments. Did a new build start? If not, check if you pushed to the right branch (usually `main`). If the build failed, click it to see the error.
  - ❌ **Avoid:** Assuming Vercel is broken. Diagnose the git push and build logs first.

- **(c) You forgot to add environment variables, then added them to Vercel.** Will the old deployment magically work now?
  - ✅ **No!** The old deployment is already built without the secrets. You must click "Redeploy" so it rebuilds with the new vars. Or push any code change to trigger a new build.
  - ❌ **Avoid:** Waiting and hoping. Old builds stay old.

- **(d) You shared your live Vercel URL with a friend. They can't access it.**
  - ✅ **Check:** Did the build actually succeed? Go to Vercel → Deployments. Is there a green checkmark? If the build failed, check the logs. If it passed, verify the URL is correct.
  - ❌ **Avoid:** Blaming their internet. Diagnose your build first.

- **(e) You manually deployed once (following Lesson 10.2). Now you want Claude Code to handle future deployments.**
  - ✅ **Good!** You understand the steps. Claude Code can automate them: check Vercel settings, ensure auto-rebuild is on, verify env vars are set.
  - ❌ **Avoid:** Jumping to Claude Code without understanding manual deployment. You need to know what you're automating.

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
