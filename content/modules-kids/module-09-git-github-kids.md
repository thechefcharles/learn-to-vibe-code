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

GitHub gives you instructions. Copy them and run in your terminal:

```bash
git init
git add .
git commit -m "First version of pet tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pet-tracker.git
git push -u origin main
```

**What you'll see:**
```
Enumerating objects: 20, done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main'
```

Boom! Your code is on GitHub now. 🚀

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

Follow these steps to get your pet tracker on GitHub!

### Step 1: Create a GitHub repo (2 min)
1. Go to [github.com/new](https://github.com/new)
2. Name it `pet-tracker`
3. Click "Create Repository"
4. Copy the commands GitHub shows (you'll use them below)

### Step 2: Push your code (5 min)
1. Open your terminal in your pet tracker folder
2. Run:
   ```bash
   git init
   git add .
   git commit -m "First version of pet tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pet-tracker.git
   git push -u origin main
   ```
3. Wait for it to finish
4. Go back to GitHub and refresh—your code is there! ✅

### Step 3: Make a change on a branch (5 min)

**3a. Create a new branch:**
```bash
git checkout -b add-pet-delete-button
```

**3b. Make a small change:**
- Add a delete button to your pet cards
- Test it works

**3c. Commit and push:**
```bash
git add .
git commit -m "Add delete button to pet cards"
git push -u origin add-pet-delete-button
```

### Step 4: Open a PR (3 min)
1. Go to your GitHub repo
2. You'll see a green "Compare & pull request" button
3. Click it
4. Add a description: "Let users delete pets from their list"
5. Click "Create Pull Request"
6. Click the green "Merge pull request" button to merge it
7. Click "Delete branch"

You've shipped a change! 🚀

### Deliverable:
- Your GitHub repo link
- Screenshot of your repo page (showing commits)
- Screenshot of your merged PR

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
