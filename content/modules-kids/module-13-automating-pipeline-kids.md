# Module 13: Automating Your Dev Pipeline 🚀

**Stage:** Advanced · **Level:** Advanced · **Duration:** ~5 hours · **XP:** 500

**What you need:** Modules 0-12

> **Why this matters:** Instead of doing repetitive tasks by hand, automate them. Run tests, deploy, format code — all automatically when you push to GitHub. This saves time and prevents mistakes.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Set up CI/CD** (continuous integration/deployment)
2. **Automate tests** to run on every push
3. **Auto-deploy** when code is ready

---

## Lesson 13.1 — CI/CD Basics (~30 min)

**CI/CD = Continuous Integration / Continuous Deployment**

When you push code to GitHub:
1. Tests run automatically
2. Code is checked for errors
3. If all good, it deploys to production
4. You get a notification

No manual steps. Automated.

---

## Lesson 13.2 — GitHub Actions (~60 min)

GitHub Actions are workflows that run automatically.

Create a `.github/workflows/test.yml` file:

```yaml
name: Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

Now every push runs tests automatically!

Prompt Claude Code: *"Set up GitHub Actions to run tests on every push."*

---

## Lesson 13.3 — Auto-Deploy (~30 min)

Vercel already auto-deploys when you push to GitHub. It's built in!

But you can add more steps:
1. Run tests
2. If tests pass, deploy
3. If tests fail, don't deploy

---

## Lesson 13.4 — Monitoring & Alerts (~30 min)

After deployment, monitor your app:
- Is it running?
- How fast is it?
- Are there errors?

Tools: Vercel dashboard, Supabase dashboard, error tracking (Sentry).

---

## Activity: Set Up Automation 🤖

1. Create a GitHub Actions workflow for tests
2. Commit and push
3. Watch it run automatically
4. Deploy to Vercel
5. Share your workflow file

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

## Knowledge Check (Quiz)

1. **What's CI/CD? Explain in your own words.**
2. **What happens when you push code with GitHub Actions set up?**
3. **Why auto-deploy instead of manual?**

---

## Key Takeaways

- CI/CD = tests + deployment automation ✅
- GitHub Actions run workflows automatically
- Vercel auto-deploys from GitHub
- Automation = fewer mistakes, faster shipping

**Next:** Module 14 — Brownfield Coding!
