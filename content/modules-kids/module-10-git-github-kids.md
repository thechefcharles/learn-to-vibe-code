# Module 9: Git & GitHub (Save Your Code!) 💾

**Stage:** Production · **Level:** Intermediate · **Duration:** ~4 hours · **XP:** 400

**What you need:** Modules 0-8

> **Why this matters:** GitHub is where you save your code online. It's like Google Drive for code. More importantly: GitHub is how you collaborate with other developers, how you deploy your app (Module 10), and how employers evaluate your skills. Every job-ready developer has a GitHub profile with real projects.

## What You'll Learn

By the end of this module, you'll be able to:

1. **Explain why version control matters** (history, rollback, safety, collaboration)
2. **Manage a GitHub repo** (commits, branches, pull requests)
3. **Resolve merge conflicts** (the thing that looks scary but isn't)
4. **Work like a professional developer** (the workflow real teams use)

---

## Lesson 9.1 — Why Version Control Matters (~45 min)

**Git** is a tool that tracks every change you make to your code. Think of it like Google Docs' version history, but way more powerful.

**GitHub** is where you store that history online, share your code, and collaborate.

### What a Commit Really Is

A **commit** is not just a save point—it's a snapshot of your entire project at one moment in time. Every commit has three things:

1. **What changed** (the diff—the actual lines you added/deleted)
2. **A message explaining WHY** (not what—everyone can see the diff; explain your reasoning)
3. **A timestamp and author** (when and who)

**Example:**
```
Commit: "Add sorting by due date to invoice list"

What changed:
- Added a sort dropdown to InvoiceList component
- Implemented a compareFn for date sorting
- Added test for the sort feature

Why: Users complained they couldn't find overdue invoices quickly
```

### The Power of History

Version control gives you a **complete history** of every change. This matters because:

**1. Revert when you break something:**
```bash
# Oops, that new feature broke the app
# Go back to the last working version:
git revert HEAD
```

**2. Find out when a bug was introduced:**
```bash
git log  # See all commits
# Read the commit messages and find when the bug started
```

**3. Understand why code exists:**
Years later, you'll see a line of code and wonder "why is this here?" The commit message tells you the reason—and maybe the GitHub issue it fixed.

### Solo vs. Team

**Working alone:** You still use commits and branches. Commits become a time machine; branches keep `main` safe while you experiment.

**Working with teammates:** This is where Git becomes critical. Two developers can work on the same project without stepping on each other. Branches + pull requests = safe collaboration.

**Real example:**
- You're on `add-filter-feature`
- A teammate is on `fix-auth-bug`
- Both push to GitHub
- GitHub merges them together intelligently
- No stepping on each other, no lost work

### Key Vocabulary

- **Repository (repo):** Your project + all its history
- **Commit:** A snapshot with a message
- **Branch:** A parallel line of work (like a save slot in a video game)
- **Main:** The stable, production version of your code
- **Remote:** Your repo on GitHub (synced with your local computer)
- **Pull:** Download the latest changes from GitHub
- **Push:** Upload your commits to GitHub

---

## Lesson 9.2 — Initialize Git & Push to GitHub (~50 min)

GitHub is where your code lives online and where you'll eventually deploy (Module 10). Let Claude Code handle the Git setup!

**Step 1: Protect your secrets first** (manual check)

Open `.gitignore` in your project and confirm it includes:
```
.env*.local
node_modules
.next
.DS_Store
```

Never commit API keys or secrets. `.gitignore` tells Git: "Ignore these files when saving."

**Step 2: Create a repo on GitHub** (one-time, manual)

1. Go to [github.com/new](https://github.com/new)
2. Name it `pet-tracker` (or whatever your project is)
3. Make it public (employers see public repos)
4. Click "Create Repository"
5. Copy the URL GitHub shows (e.g., `https://github.com/YOUR-USERNAME/pet-tracker.git`)

**Step 3: Let Claude Code handle the rest**

Open Claude Code:
```bash
claude
```

Paste something like:

```
I need to push my pet tracker app to GitHub.

My GitHub repo URL: https://github.com/YOUR-USERNAME/pet-tracker.git

Please:
1. Initialize git in my project
2. Add all files (verify .env.local is NOT included — it should be in .gitignore)
3. Create an initial commit with a descriptive message about my pet tracker app
4. Set up the remote
5. Push everything to GitHub

Tell me the exact commands to run. Before pushing, verify that no .env.local or secrets are being committed!
```

Claude Code will orchestrate:
- `git init` — Start version control
- `git add .` — Stage all files (except those in .gitignore)
- `git commit -m "Initial commit: pet tracker with auth, Supabase, etc."` — Create the snapshot
- `git remote add origin [URL]` — Connect to GitHub
- `git push -u origin main` — Upload to GitHub

**Step 4: Verify on GitHub**

Go to your repo URL and refresh. Your code is there! 🎉

---

## Lesson 9.3 — Branches & Pull Requests (~55 min)

You've pushed your code to GitHub. Now comes the professional workflow: **never edit `main` directly**. Instead, you work on branches and use Pull Requests (PRs).

### Why Branches?

Imagine `main` is your production app. If you edit it directly and mess up, your app breaks. Branches are safe experiment spaces:

- You create a branch for your new feature
- You work on it without touching `main`
- You test it locally
- You open a PR (Pull Request) asking to merge it into `main`
- GitHub shows you a diff—a visual comparison of what changed
- You (or a teammate) reviews the diff
- You click "Merge" when it looks good
- `main` stays working the entire time

### Branch Naming Convention

Use a **clear naming pattern** so your history is readable:

```
<type>/<short-description>
```

Where `<type>` is:
- `feature/` — a new feature ("feature/add-delete-button")
- `fix/` — a bug fix ("fix/auth-logout-error")
- `docs/` — documentation only ("docs/update-readme")
- `refactor/` — code cleanup, no behavior change ("refactor/simplify-form-logic")

**Examples:**
- ✅ `feature/add-invoice-sort`
- ✅ `fix/handle-empty-list`
- ✅ `docs/add-setup-guide`
- ❌ `asdf`, `stuff`, `wip` (unclear; avoid)

### The Professional Workflow (Step-by-Step)

**Step 1: Create a feature branch**
```bash
git checkout -b feature/add-delete-button
```

This creates a new branch and switches to it. `main` is untouched.

**Step 2: Make your changes**

Edit your code in Cursor. Add the delete button to your pet cards. Test locally:
```bash
npm run dev
# Test in your browser
```

**Step 3: Commit with a clear message**

```bash
git add .  # Stage all changes
git commit -m "Add delete button to pet cards"
```

Good commit messages:
- ✅ "Add delete button to pet cards"
- ✅ "Fix pet sorting by date"
- ✅ "Update styles for dark mode"

Bad (lazy):
- ❌ "stuff"
- ❌ "fix"
- ❌ "asdf"
- ❌ "work in progress"

**Why clear messages matter:** Six months later, you'll read `git log` to understand what your project does. Lazy messages make that impossible.

**Step 4: Push the branch to GitHub**

```bash
git push -u origin feature/add-delete-button
```

This uploads your branch to GitHub (not to `main`, just your branch).

**Step 5: Open a Pull Request on GitHub**

1. Go to your GitHub repo
2. You'll see a notification: "Your recently pushed branches" with a green button: "Compare & pull request"
3. Click it
4. Add a description (Claude Code can help write these):
   ```
   ## What's new
   Added a delete button to pet cards so users can remove their own pets.
   
   ## Why this matters
   Users asked for the ability to clean up old pets from their profile.
   
   ## Testing
   - Tested locally: delete button appears on each pet
   - Tested deletion: pet is removed from the list
   ```
5. Click "Create Pull Request"

**Step 6: Review the diff**

GitHub shows you exactly what changed. Review it—did you change what you intended to change? No accidental deletions? This is your safety net.

**Step 7: Merge the PR**

1. Click "Merge pull request"
2. Click "Confirm merge"
3. Click "Delete branch" (clean up)

Your feature is now in `main`! 🎉

---

## Lesson 9.4 — Merge Conflicts (Not Scary!) (~45 min)

A **merge conflict** is when two branches change the same line and Git can't decide which version to keep. Sounds scary—it's not. It's just Git asking you to choose.

### When Conflicts Happen

**Scenario 1 (Solo):** You edit the same file twice on different branches.

**Scenario 2 (Team):** You and a teammate both edit the same line. Git can't merge automatically.

### What a Conflict Looks Like

Your file shows **conflict markers** (Git is being very literal):

```javascript
const status = "unpaid";

// Someone else changed this to:
<<<<<<< HEAD
const status = "overdue";
=======
const status = "pending";
>>>>>>> add-filter-feature
```

### How to Read It

The conflict marker has three parts:

1. **`<<<<<<< HEAD`** — Your current version (on `main`)
2. **`=======`** — The divider
3. **`>>>>>>> add-filter-feature`** — The version you're trying to merge in

### Resolving It (Step-by-Step)

**Step 1: Open the file with the conflict**

You'll see those marker lines. Don't panic.

**Step 2: Decide which version to keep**

Read both options. Which is right for your code?
- Keep HEAD (your current version)?
- Keep the incoming branch?
- Combine them?

In this example, let's say you decide to keep the `overdue` status because that's what the current code expects.

**Step 3: Edit the file**

Delete the markers and keep only the version you want:

```javascript
const status = "overdue";
```

That's it! No markers, just the code you want.

**Step 4: Save and commit**

```bash
git add .
git commit -m "Resolve merge conflict in invoice status"
```

Git now knows the conflict is resolved.

### Real Example: Team Scenario

You and your teammate are both working on the invoice app.

**You (on `add-filter`):**
```typescript
export const statusOptions = ["unpaid", "pending", "overdue", "paid"];
```

**Teammate (on `fix-ui`):**
```typescript
export const statusOptions = ["draft", "sent", "paid"];
```

Both push to `main`. Conflict!

When you try to merge, you'll see both versions. You read the code and talk to your teammate:
- "Hey, I see you removed `unpaid` and `overdue`. Why?"
- "Oh, the design team said we should simplify to three statuses."
- "OK, let me update my filter to match."

You resolve by deciding together on the right version. This is why **communication** matters when resolving conflicts. The code conflict is mechanical; the business logic conflict is human.

### Knowledge Check

**You see this conflict:**
```
<<<<<<< HEAD
const timeout = 30;
=======
const timeout = 60;
>>>>>>> increase-timeout
```

What should you do?

a) Always pick your version (HEAD)  
b) Always pick the incoming branch  
c) Pick randomly  
d) **Talk to your teammate and understand why they changed it** ✓

**Answer:** d. Understanding the *why* is the whole point. Maybe they increased it because the API is slow in production. Maybe you set it too conservatively. You decide together.

---

## Lesson 9.5 — Debugging with Git (~25 min)

After months of commits, your repo is a time machine. Here's how to use it.

### `git log` — See the History

View all commits:
```bash
git log
```

Output:
```
commit 3f8d2a1c9e... (HEAD -> main)
Author: You <you@example.com>
Date: Wed Sep 10 10:15:03 2025

    Add delete button to pet cards

commit a2b9f4e1d2...
Author: You <you@example.com>
Date: Tue Sep 9 14:22:15 2025

    Fix pet sorting by date

commit 5e1a7c3d4f...
Author: You <you@example.com>
Date: Mon Sep 8 09:45:22 2025

    Initial commit: pet tracker with auth
```

Each line is a snapshot. You can see:
- The commit message (what changed and why)
- Who made the change
- When

### Finding When a Bug Started

If a bug exists in `main` but you don't know when it started:

```bash
git log --oneline  # Shorter format
# Outputs:
# 3f8d2a1 Add delete button to pet cards
# a2b9f4e Fix pet sorting by date
# 5e1a7c3 Initial commit
```

Read the messages. When did the bug likely start? Use `git show <commit>` to see what changed:

```bash
git show a2b9f4e
# Shows the full diff for that commit
```

### `git blame` — Find Who Changed a Line

If a line of code looks wrong, see when and who changed it:

```bash
git blame app/pets/page.tsx
```

Output shows each line with the commit that last changed it:
```
a2b9f4e (You     Tue Sep 9) const sortedPets = pets.sort(...);
5e1a7c3 (You     Mon Sep 8) const [pets, setPets] = useState([]);
```

This tells you: "The sorting logic was last changed in commit `a2b9f4e` on Sep 9."

### Reverting a Bad Commit

If a recent commit broke something, revert it:

```bash
git revert <commit-hash>
```

This creates a *new* commit that undoes the changes. It doesn't erase history—it adds to it. This is important for team safety (no one loses work by history being rewritten).

**Example:**
```bash
git log --oneline
# 3f8d2a1 Add delete button  <-- This broke the app
# a2b9f4e Fix pet sorting
# 5e1a7c3 Initial commit

git revert 3f8d2a1
# Git creates a new commit that undoes the delete button
# main is now stable again
```

---

## Lesson 9.6 — Working with Teammates (~20 min)

When you're part of a team, a few more habits matter.

### Pull Before You Work

Always pull the latest changes from GitHub before starting:

```bash
git checkout main
git pull
```

This downloads everyone's merged changes. Otherwise, you might work on old code and create conflicts.

### Push Frequently

Push your branch often (at least once a day):

```bash
git push
```

This backs up your work and lets teammates see what you're doing.

### Open PRs Early

You don't have to wait until a feature is perfect. Open a PR as a "work in progress":

```
## Work In Progress (WIP)

Adding filter feature. Not ready to merge yet, but wanted to show progress.

- [ ] Filter dropdown added
- [ ] Filter logic not yet tested
- [ ] Styles pending
```

This signals to teammates: "I'm working on this, don't start the same thing."

### Request Reviews

In the PR, ask a teammate to review:

```
@teammate-name, when you get a chance, can you review this? I'm not sure about the sorting logic.
```

Teammates can leave comments on specific lines:
```
💬 "This comparison looks backwards—should it be > instead of <?
```

You discuss and fix together.

### Communication

Conflicts and PRs are about **communication**, not just code. If someone's changes touch yours:
- Slack/Teams them: "Hey, I see you changed the status enum. I was adding a new status. Let's sync up."
- Decide together on the right version
- Resolve the code conflict with that decision

---

## Hands-on Activity: Full Git Workflow 🚀

Get your project on GitHub and practice branches, commits, and PRs.

### Step 1: Set up on GitHub (5 min)

1. Go to [github.com/new](https://github.com/new)
2. Name it `pet-tracker`
3. Click "Create Repository"
4. Copy the URL

Initialize locally with Claude Code:
```bash
claude
```

Send:
```
I need to push my pet tracker to GitHub.
GitHub repo URL: https://github.com/YOUR-USERNAME/pet-tracker.git

Please:
1. Initialize git
2. Verify .env.local is in .gitignore
3. Create an initial commit with a descriptive message
4. Push to GitHub
```

Verify: Go to GitHub and refresh. Your code is there! ✅

### Step 2: Create a branch and make a change (8 min)

```bash
git checkout -b feature/add-delete-button
```

Make a small improvement (e.g., add a delete button to pet cards).

Test locally:
```bash
npm run dev
```

Commit:
```bash
git add .
git commit -m "Add delete button to pet cards"
```

Push:
```bash
git push -u origin feature/add-delete-button
```

### Step 3: Open and merge a PR (5 min)

1. Go to your GitHub repo
2. Click "Compare & pull request"
3. Add a description (explain what and why)
4. Click "Create Pull Request"
5. Review the diff
6. Click "Merge pull request"
7. Click "Delete branch"

You've shipped a feature the professional way! ✅

### Step 4: Create and resolve a merge conflict (7 min)

On `main`, change the page title to "My Pets":
```bash
git checkout main
# Edit app/pets/page.tsx: Change title to "My Pets"
git add .
git commit -m "Update page title to My Pets"
```

Create a branch and change the same title to "All Pets":
```bash
git checkout -b feature/improve-title
# Edit app/pets/page.tsx: Change title to "All Pets"
git add .
git commit -m "Improve title clarity"
```

Try to merge it back:
```bash
git checkout main
git merge feature/improve-title
```

**CONFLICT!** 

Resolve it:
1. Open `app/pets/page.tsx`
2. Find the conflict markers
3. Decide which title to keep (or combine: "My Pets - View All")
4. Delete the markers
5. Save
6. Commit: `git add . && git commit -m "Resolve conflict: use updated title"`

Conflict resolved! ✅

### Deliverable

Submit:
- GitHub repo link
- Screenshot of your repo page (showing 3+ commits)
- Screenshot of a merged PR with the diff visible
- One sentence: "Merge conflicts happen when [describe the scenario], and I resolved it by [describe your choice]."

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

## Knowledge Check (Deep Dive)

### Written checks:

1. **What's the difference between Git and GitHub?**
   - *Example answer:* "Git is the tool that tracks changes to your code on your computer. GitHub is the website where you store your Git projects online and collaborate. Git is local; GitHub is in the cloud."

2. **Why do you write commit messages? Why not just "fix"?**
   - *Example answer:* "Because months later, you'll read your commit history to understand what your project does and why changes were made. A message like 'Add delete button' tells you what happened. 'fix' tells you nothing. Future-you (and teammates) need to understand the *why*."

3. **What's a branch and why create one for every feature?**
   - *Example answer:* "A branch is a parallel copy of your code. You create one for each feature so you can work without breaking `main`. If your feature breaks, `main` stays working. When it's ready, you merge it in safely."

4. **Describe the steps to resolve a merge conflict.**
   - *Example answer:* "1) Open the file with conflict markers. 2) Read both versions (<<<, ===, >>>). 3) Decide which to keep (or combine). 4) Delete the markers. 5) Save. 6) Commit with a message like 'Resolve conflict: chose version X because...'"

5. **When would `git log` be useful?**
   - *Example answer:* "To see all changes and when they happened. If a bug exists but you don't know when it started, read `git log --oneline` to see every commit. Read the messages to find when the bug probably started."

### Scenario-based judgment checks:

*For each scenario, explain what you'd do.*

- **(a) You committed your `.env.local` file and pushed to GitHub.** What should you do?
  - ✅ **Critical:** Your secrets are exposed! Immediately rotate your keys (assume they're compromised). Then use `git rm --cached .env.local`, commit, and push to remove it from history.
  - ❌ **Avoid:** Leaving secrets on GitHub. That's a real security breach.

- **(b) You want to add a new feature but don't want to risk breaking main.** What do you do?
  - ✅ **Correct:** Create a branch (`git checkout -b feature/name`), make changes, commit, push, open a PR, review, and merge.
  - ❌ **Avoid:** Committing directly to main. Branches protect your production code.

- **(c) You see a merge conflict marker. You don't understand which version is right.** What do you do?
  - ✅ **Correct:** Don't guess. Read the context. If working with teammates, ask them why they made that change. Understand the *why* before deciding.
  - ❌ **Avoid:** Picking randomly. You might break logic or lose important code.

- **(d) Your commit history is "wip", "fix", "fix 2", "asdf".** Is this good?
  - ✅ **Correct:** No! Rewrite future commits with clear messages: "Add delete button", "Fix auth bug", "Update styles". Your history is a record. Make it readable.
  - ❌ **Avoid:** Lazy messages. They make history impossible to understand.

- **(e) You and a teammate both edited the same file.** What's your first step?
  - ✅ **Correct:** Pull their changes first (`git pull`). Then create your own branch and work on your feature. When you push and get a conflict, talk to them about what the code should do.
  - ❌ **Avoid:** Working on stale code. Always pull first so you're up to date.

---

**Rubric checklist (before you submit):**

| Checkmark | What to check |
|-----------|---------------|
| ✅ | Repo created on GitHub and code is pushed |
| ✅ | `.env.local` is in `.gitignore` (NOT committed) |
| ✅ | First commit message is clear and describes what the app does |
| ✅ | Created a feature branch (not working on main) |
| ✅ | Made a change on the branch, committed with descriptive message |
| ✅ | Pushed branch to GitHub |
| ✅ | Opened a PR with a description explaining the change |
| ✅ | Merged the PR successfully |
| ✅ | Deliberately created a merge conflict and resolved it |
| ✅ | Commit history is clean (4+ commits with good messages, no "wip" or "fix") |
| ✅ | No secrets in history (run `git log -p` and verify no .env.local) |

*Pass mark: 80% and a GitHub repo with clean history, merged PR, and resolved conflict submitted.*

---

## Key Takeaways

- Git tracks changes to your code; GitHub stores it online and enables collaboration
- **Commits** are snapshots with messages explaining *why* you changed things
- **Branches** keep `main` safe; you work on features in isolation
- **Pull requests** let you review changes before merging
- **Merge conflicts** are not errors—Git asking you to choose between two versions
- `git log` is your time machine; use it to find when bugs started
- Clear commit messages matter forever—they're how you (and teammates) understand your project
- Professional developers work in branches and use PRs, even solo

**Next:** Module 10 — Deploying (Show the World!)
