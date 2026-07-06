# Module 9: Git & GitHub (Save Your Code!) 💾

**Stage:** Production · **Level:** Intermediate · **Duration:** ~4 hours · **XP:** 400

**What you need:** Modules 0-8

> **Why this matters:** GitHub is where you save your code online. It's like Google Drive for code. Also, GitHub is where other coders find your projects. Employers look at GitHub when hiring!

## What You'll Learn

By the end of this module, you'll be able to:

1. **Create a GitHub repo** (project)
2. **Save your code** to GitHub
3. **Understand commits** (save points)

---

## Lesson 9.1 — Git & GitHub Basics (~30 min)

**Git:** A tool that tracks changes to your code (like "Track Changes" in Google Docs).

**GitHub:** A website where you store your Git projects online.

**Commit:** A save point. Every commit has a message: "Added pet delete button", "Fixed bug in auth", etc.

Think of commits like checkpoints in a video game. You save progress, then if something breaks, you can go back.

---

## Lesson 9.2 — Create a GitHub Repo (~20 min)

Go to github.com and click "New Repository":

1. Name it `pet-tracker`
2. Add a description: "A fun app to track your pets!"
3. Make it public (everyone can see it, not secret)
4. Click "Create Repository"

GitHub gives you instructions. Copy them and run in your terminal.

---

## Lesson 9.3 — Commits (~45 min)

A commit is a snapshot of your code at one moment.

**How to make commits:**

```bash
git add .
git commit -m "Added pet delete button"
git push
```

- `git add .` = "I'm ready to save these changes"
- `git commit -m "..."` = "Save it with this message"
- `git push` = "Send it to GitHub"

**Good commit messages:**
- ✅ "Added delete button"
- ✅ "Fixed bug where pets weren't loading"
- ✅ "Updated color scheme to blue"

Bad:
- ❌ "stuff"
- ❌ "changes"
- ❌ "ahhhhh"

---

## Lesson 9.4 — Branches (~45 min)

Branches are like alternate timelines. You make changes on a branch, test them, then merge back to main.

```bash
git branch my-feature
git checkout my-feature
```

Now you're on `my-feature` branch. Make changes, commit, then:

```bash
git checkout main
git merge my-feature
```

Now those changes are in main.

Why? So you don't accidentally break the working version.

---

## Activity: Push Your Project to GitHub 🚀

1. Create a GitHub repo
2. Follow their instructions to push your pet tracker
3. Submit your GitHub link

---

## Knowledge Check (Quiz)

1. **What's the difference between Git and GitHub?**
2. **Write a good commit message for: "You added a favorite button"**
3. **What's a branch? Why use branches?**

---

## Key Takeaways

- Git tracks changes to your code 📝
- GitHub stores your code online
- Commits are save points with messages
- Push = send to GitHub
- Branches = safe experimentation

**Next:** Module 10 — Deploying (Show the World!)
