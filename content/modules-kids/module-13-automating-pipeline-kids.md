# Module 13: Automation (Optional, After Capstone)

**Stage:** Advanced · **Level:** Advanced · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-12

## This Module Is Optional

This module is **optional**. It's about automating your workflow with Claude Code.

**Why optional?** Your capstone doesn't need it. Ship first, automate later, is the right order.

**When to take it:** After your capstone, if you're building a lot and want to move faster.

**For now:** Focus on shipping your capstone. Come back to this module later if you want to level up.

---

## If You're Taking This Module

> **Why this matters:** Stop doing repetitive tasks by hand. Automate: run tests, check code, deploy — all when you push to GitHub. Less work, fewer mistakes, faster shipping.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Set up CI/CD** (tests + deployment automation)
2. **Automate tests** to run on every push
3. **Auto-deploy** only when tests pass
4. **Monitor** your live app

---

## Lesson 13.1 — CI/CD Concepts (~20 min)

**CI/CD = Continuous Integration / Continuous Deployment**

**The flow:**
```
You push code to GitHub
  ↓
Tests run automatically
  ↓
If tests pass → Deploy
If tests fail → Stop (don't break production)
  ↓
Live app updates
```

**Why it matters:**
- Tests catch bugs before they ship ✓
- No manual deploys (less human error) ✓
- You can ship faster (automation does the work) ✓

---

## Lesson 13.2 — GitHub Actions (Continuous Integration) (~40 min)

GitHub Actions are automated workflows that run when you push.

**Concrete workflow example:**

Create `.github/workflows/test.yml`:

```yaml
name: Run Tests
on: [push]  # Run on every push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3        # Download your code
      - uses: actions/setup-node@v3      # Set up Node
      - run: npm install                 # Install packages
      - run: npm run test                 # Run tests
      - run: npm run lint                 # Check code style
```

**What happens:**
1. You `git push` to GitHub
2. GitHub detects the `.github/workflows/test.yml` file
3. Spins up a virtual machine (ubuntu-latest)
4. Runs `npm install` → `npm test` → `npm lint` automatically
5. Shows a ✅ (passed) or ❌ (failed) badge on your PR

**To see it working:**
1. Commit and push this file: `git add . && git commit -m "Add CI workflow" && git push`
2. Go to GitHub → Actions tab
3. Watch your workflow run! ⏳

Prompt Claude Code: *"Create a GitHub Actions workflow that runs tests and linting on every push."*

---

## Lesson 13.3 — Vercel Auto-Deploy (Continuous Deployment) (~30 min)

Vercel already auto-deploys when you push! Here's how:

**The chain:**
```
Push to main
  ↓
GitHub Actions runs tests
  ↓
If tests pass → Vercel sees the push
  ↓
Vercel builds your app
  ↓
Live at your URL
```

**To prevent broken deploys:**
1. Make sure GitHub Actions passes tests FIRST
2. Then merge to main (which triggers Vercel)
3. Vercel deploys only if your code made it past GitHub Actions

**Monitor the deploy:**
- Go to Vercel dashboard → Deployments tab
- See all your deploys with their status (✅ ready, ❌ failed)
- Click a deploy to see build logs

---

## Lesson 13.4 — Monitoring & Safety (~30 min)

After your app deploys, monitor it:

**Check:**
- **Is it running?** Vercel shows status (Ready = 🟢)
- **Is it fast?** Vercel shows deployment time (should be <1 min)
- **Are there errors?** Check Supabase dashboard for logs

**Safety guardrail:**
- GitHub Actions tests MUST pass before you can merge to main
- This prevents deploying broken code to production
- No bad deploy = happy users!

---

## Activity: Set Up Automation 🤖

### Step 1: Create the workflow file (5 min)
1. In your pet tracker, create `.github/workflows/test.yml`
2. Copy the workflow code from Lesson 13.2
3. Commit: `git add .github/workflows/test.yml && git commit -m "Add CI workflow"`
4. Push: `git push`

### Step 2: Watch it run (5 min)
1. Go to GitHub → your repo → Actions tab
2. You should see your workflow running!
3. Wait for it to complete (⏳ → ✅ or ❌)
4. Click the workflow run to see the logs

### Step 3: Test the guardrail (5 min)
1. Make a small change to your code that breaks a test (e.g., change a function name)
2. Push: `git add . && git commit -m "Test broken code" && git push`
3. GitHub Actions runs and FAILS (❌)
4. Go to GitHub → PRs → your PR shows "Checks failed"
5. You CAN'T merge until you fix it ✓

### Step 4: Fix it and merge (5 min)
1. Revert the breaking change
2. Push again: `git add . && git commit -m "Fix: restore function" && git push`
3. GitHub Actions runs again and PASSES (✅)
4. Now you CAN merge to main
5. Merge on GitHub → Vercel auto-deploys

### Step 5: Watch the deploy (5 min)
1. Go to Vercel → your project → Deployments
2. See the deployment running (building...)
3. When it's done → status = Ready (🟢)
4. Your live app has your latest code!

### Deliverable:
- Screenshot of GitHub Actions workflow passing ✅
- Screenshot of GitHub Actions workflow failing ❌ (showing the test failure)
- Screenshot of Vercel deployment successful (Ready status)
- Your `.github/workflows/test.yml` file

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q13-k1:** What lets Claude Code act on GitHub/Supabase/Vercel?
- (a) CLAUDE.md
- (b) A skill
- (c) **MCP (tool connectors)** ✓
- (d) A comment

*Why:* MCPs are special connectors that let Claude Code talk to external systems (GitHub, Supabase, Vercel, etc.). Think of them as bridges—Claude Code on one side, the service on the other.

**Q13-k2:** A skill is best for:
- (a) Storing secrets
- (b) **Procedural know-how that kicks in by context** ✓
- (c) Hosting
- (d) Database queries

*Why:* Skills are step-by-step instructions for how to do things. When Claude Code sees you need those steps, it loads the skill automatically. Like having a recipe book it can pull from!

**Q13-k3:** The safe rule for automation is:
- (a) Automate everything
- (b) **Automate the reversible, protect the irreversible** ✓
- (c) Never automate
- (d) Skip permissions

*Why:* Automate things you can undo (run tests, format code, build). Gate things you can't (deploying to production, deleting data, spending money). You always review the dangerous stuff before it happens.

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's CI/CD? Explain in your own words.**
   - *Example answer:* "CI = continuous integration: tests run automatically when you push. CD = continuous deployment: if tests pass, it deploys automatically. So: push → test (auto) → deploy (auto). No manual work!"

2. **What happens when you push code with GitHub Actions set up?**
   - *Example answer:* "GitHub Actions sees the push, starts the workflow, installs packages, runs tests and linting. If everything passes ✅, I can merge to main. If it fails ❌, I fix it and push again."

3. **Why auto-deploy instead of manual?**
   - *Example answer:* "Manual is slow and error-prone (I might forget to deploy). Automation: faster, consistent, no human mistakes. Plus it's reversible—if something breaks on live, I can roll back."

### Scenario-based judgment checks:

*For each scenario, explain what's happening.*

- **(a) You pushed code, GitHub Actions passed ✅, but Vercel deployment failed ❌.** Tests passed but production broke.
  - ✅ **Root cause:** Tests didn't catch the deployment issue (e.g., env vars missing on Vercel). **Fix:** Check Vercel build logs; add tests for deployment (e.g., check env vars exist).
  - ❌ **Avoid:** Thinking tests are perfect. They catch logic bugs, not all deployment issues.

- **(b) Your workflow tests run, but then you manually deployed anyway.** Didn't trust the automation.
  - ✅ **Safer approach:** Let Vercel deploy automatically when your code hits main. You control this via branch protection (can't merge without green ✅).
  - ❌ **Avoid:** Mixing automated + manual deploys. Pick one and stick with it.

- **(c) You broke a test but the PR still says "Ready to merge."** Failed test not blocking.
  - ✅ **Fix:** Go to GitHub repo Settings → Branches → main → require status checks to pass (GitHub Actions must pass before merge).
  - ❌ **Avoid:** Merging with failed tests. That defeats the whole point of CI.

- **(d) You want to add linting (code style checks) to your workflow.** Expanding CI.
  - ✅ **How:** Add `- run: npm run lint` to your `.github/workflows/test.yml`. Push. Now linting runs with tests.
  - ✅ **Why:** Catch style issues early, keep code consistent.

- **(e) The workflow takes 10 minutes to run. Too slow.** CI is a bottleneck.
  - ✅ **Fix:** Check what's slow (probably `npm install`). Cache node_modules or use a faster CI provider. Optimize tests to run only changed files.
  - ✅ **Why:** Fast feedback loop = better developer experience.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | `.github/workflows/test.yml` created with npm test + lint |
| ✅ | Workflow passes on valid code (green ✅) |
| ✅ | Workflow fails on broken code (red ❌) |
| ✅ | GitHub Actions tab shows workflow history |
| ✅ | Can't merge to main if workflow fails (branch protection) |
| ✅ | Vercel auto-deploys when code merged to main |
| ✅ | Vercel deployment succeeds (status = Ready) |
| ✅ | Can see live app with deployed code |

*Pass mark: 80% and workflow + deploy screenshots submitted.*

---

## Key Takeaways

- CI/CD = tests + deployment automation ✅
- GitHub Actions run workflows automatically
- Vercel auto-deploys from GitHub
- Automation = fewer mistakes, faster shipping

**Next:** Module 14 — Brownfield Coding!
