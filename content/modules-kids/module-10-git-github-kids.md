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

## Lesson 9.2 — Push Your Code to GitHub (Claude Code Handles Git!) (~30 min)

GitHub is where your code lives online. But manually running Git commands is tedious. Let Claude Code do it!

**Step 1: Create a GitHub repo** (this part is manual, but quick)

Go to github.com and click "New Repository":
1. Name it `pet-tracker`
2. Make it public (everyone can see it)
3. Click "Create Repository"

GitHub shows you a URL. Copy it (looks like `https://github.com/YOUR-USERNAME/pet-tracker.git`).

**Step 2: Let Claude Code handle the Git setup and push**

Open Claude Code:
```bash
claude
```

Paste something like this:

```
I need to push my pet tracker app to GitHub.

My GitHub repo URL: https://github.com/YOUR-USERNAME/pet-tracker.git

Please:
1. Initialize git in my project
2. Add all files (make sure .env.local is NOT included — it should be in .gitignore)
3. Create an initial commit with a descriptive message about my pet tracker app
4. Connect to GitHub
5. Push everything to GitHub

Tell me the exact commands to run. Verify that .env.local is ignored before pushing!
```

Claude Code will:
- Initialize Git ✅
- Create a clear commit message ✅
- Verify your secrets aren't being committed ✅
- Show you the push command ✅

**Step 3: Copy and run the commands Claude Code gives you**

It will look something like:
```bash
git remote add origin https://github.com/YOUR-USERNAME/pet-tracker.git
git push -u origin main
```

**Step 4: Verify on GitHub**

Go to your GitHub repo URL and refresh. Your code is there! 🎉

---

## Lesson 9.3 — Making Changes & Commits (~45 min)

After your code is on GitHub, you'll make changes and save them.

**Branches:** Instead of editing `main` directly, you create a temporary branch for each feature.

Why? So if something breaks, your main branch stays safe and working.

**Example workflow:**

1. **Create a branch** (for your new feature): `git checkout -b add-pet-delete-button`
2. **Make changes** (add a delete button to your pet cards)
3. **Commit** (save with a message): `git commit -m "Add delete button to pet cards"`
4. **Push** (send to GitHub): `git push -u origin add-pet-delete-button`
5. **Open a PR** (Pull Request = "I have changes, please review!"): Go to GitHub, click "Compare & pull request"
6. **Merge** (bring changes into main): Click "Merge pull request" on GitHub

**Good commit messages:**
- ✅ "Add delete button"
- ✅ "Fix pet sorting bug"
- ✅ "Update color scheme"

Bad:
- ❌ "stuff"
- ❌ "fix"
- ❌ "ahhh"

**The rule:** Each commit should do ONE thing and explain it clearly.

---

## Activity: Push Your Project to GitHub 🚀

Get your pet tracker on GitHub using Claude Code to manage the Git workflow!

### Step 1: Create a GitHub repo (2 min)
1. Go to [github.com/new](https://github.com/new)
2. Name it `pet-tracker`
3. Click "Create Repository"
4. Copy the URL it shows you (e.g., `https://github.com/YOUR-USERNAME/pet-tracker.git`)

### Step 2: Push your code with Claude Code (5 min)

Open Claude Code:
```bash
claude
```

Paste:
```
I need to push my pet tracker to GitHub.
Repo URL: https://github.com/YOUR-USERNAME/pet-tracker.git

Please:
1. Initialize git
2. Add all files (verify .env.local is NOT included)
3. Create an initial commit with a message about my pet tracker
4. Push to GitHub

Show me the commands and verify the push succeeded!
```

Claude Code will orchestrate everything. Just run the commands it shows you!

### Step 3: Make a feature change on a branch (5 min)

**3a. Use Claude Code to create and manage your branch:**

Open Claude Code:
```bash
claude
```

Paste:
```
I want to add a feature to my pet tracker:
Feature: "Add a delete button to pet cards so users can remove pets"

Please:
1. Create a feature branch with a clear name
2. Guide me on what code to change
3. Create a good commit message
4. Push the branch to GitHub
5. Show me how to open a PR

Keep it focused—just the delete button feature!
```

**3b. Make the code change:**
- Add a delete button to your pet cards in Cursor/Composer

**3c. Commit and push:**
Follow Claude Code's instructions to commit and push

### Step 4: Open a PR and merge (3 min)
1. Go to your GitHub repo
2. You'll see a "Compare & pull request" button
3. Click it, add a description, and create the PR
4. Click "Merge pull request" to merge it
5. Delete the branch

You've shipped a feature! 🚀

### Deliverable:
- Your GitHub repo link
- Screenshot of your repo page (showing 2+ commits)
- Screenshot of your merged PR showing the changes

---

## Quiz Questions (Preview)

Here are your three quiz questions. Study these!

**Q9-k1:** A commit is best described as:
- (a) A deployed app
- (b) **A save point with a message (checkpoint in a game!)** ✓
- (c) A branch
- (d) A backup server

*Why:* Commits are like game save points! You save your progress with a message explaining what you did. Later, if you mess up, you can revert to an earlier checkpoint.

**Q9-k2:** Why use branches even when coding solo?
- (a) Required
- (b) **So main stays working, and each change is safe and reviewable** ✓
- (c) Faster typing
- (d) It deletes old code

*Why:* Branches protect your working code! You can experiment on a branch without breaking your main app. Then you review the changes before bringing them in.

**Q9-k3:** A merge conflict is:
- (a) Unfixable
- (b) **Git asking you to choose between two changes** ✓
- (c) A deployment failure
- (d) A virus

*Why:* Merge conflicts just need you to pick which change to keep! It's not an error—Git just can't decide when two changes touch the same line. You edit the file and choose.

---

## Knowledge Check (Quiz & Scenarios)

### Written checks:

1. **What's the difference between Git and GitHub?**
   - *Example answer:* "Git is the tool that tracks changes to your code. GitHub is the website where you store your Git projects online. Git is on your computer; GitHub is in the cloud."

2. **Write a good commit message for: "You added a favorite button"**
   - *Example answer:* "Add favorite button to pet cards" (or "Add heart icon to mark pets as favorites"). NOT "stuff" or "update" or "fix".

3. **What's a branch? Why use branches?**
   - *Example answer:* "A branch is a copy of your code where you can make changes without affecting main. You use branches so you can work safely and review changes before merging them in."

### Scenario-based judgment checks:

*For each scenario, explain what you'd do.*

- **(a) You committed your `.env.local` file and pushed to GitHub.** What should you do?
  - ✅ **Critical:** Your secrets are exposed! Delete them from GitHub, rotate your keys, and add `.env.local` to `.gitignore`.
  - ❌ **Avoid:** Leaving secrets on GitHub. That's a real security risk!

- **(b) You want to add a new feature but don't want to risk breaking main.** What do you do?
  - ✅ **Correct:** Create a branch (`git checkout -b feature-name`), make changes, commit, push, open a PR, and merge when done.
  - ❌ **Avoid:** Committing directly to main. Branches protect your working code.

- **(c) You see a merge conflict.** You don't know which version to keep. What's your next move?
  - ✅ **Correct:** Read the conflict markers (<<<, ===, >>>). Think about which version makes sense. Edit the file to keep what you want. Remove the markers. Commit.
  - ❌ **Avoid:** Panicking. Conflicts are normal and fixable!

- **(d) Your commit messages are "wip", "fix", "fix 2", "asdf".** Is this good practice?
  - ✅ **Correct:** No! Write clear messages like "Add delete button", "Fix pet sorting", "Update styles". Future-you will thank you.
  - ❌ **Avoid:** Lazy messages. They make history hard to read.

- **(e) You want to ship a new feature.** What's the professional workflow?
  - ✅ **Correct:** Branch → commit with good messages → push → open PR → review → merge. This is how real developers work!
  - ❌ **Avoid:** Pushing straight to main without branches/PRs.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Repo created on GitHub and code is pushed |
| ✅ | `.env.local` is in `.gitignore` (NOT committed) |
| ✅ | First commit message is clear (not "stuff" or "asdf") |
| ✅ | Created a feature branch (not working on main) |
| ✅ | Made a change on the branch, committed with good message |
| ✅ | Pushed branch to GitHub |
| ✅ | Opened a PR on GitHub |
| ✅ | Merged the PR successfully |
| ✅ | Commit history is clean (3+ commits with good messages) |

*Pass mark: 80% and a GitHub repo with merged PR submitted.*

---

## Key Takeaways

- Git tracks changes to your code 📝
- GitHub stores your code online
- Commits are save points with messages
- Push = send to GitHub
- Branches = safe experimentation

**Next:** Module 10 — Deploying (Show the World!)
