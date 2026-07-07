# Module 9: Git & Version Control (GitHub)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~4 contact hours (0.4 CEU)

**Prerequisites:** Modules 4–7. Learners have a working invoice-tracker and will now put it under version control and onto GitHub — the prerequisite for deploying in Module 10.

> Beginners treat their code as a pile of files they're afraid to change. Version control removes that fear: you can experiment freely because you can always go back. It's also how you collaborate and how your app reaches Vercel (Module 10). Lighter on new app code, heavier on a workflow habit that pays off forever.
> 

> **📸 Screenshots:** the GitHub repo and PR-diff shots are auto-capturable (public pages); the in-editor merge conflict is manual.
> 

## Learning objectives

By the end of this module, the learner can:

1. **Explain** core version-control concepts and why they matter. *(Understand)*
2. **Manage** a project with branches, commits, and pull requests on GitHub. *(Apply)*
3. **Resolve** merge conflicts and collaborate on a shared repository. *(Apply)*

---

## Lesson 9.1 — Why version control (~40 min)

This delivers Objective 1. Version control records the history of your project so you can see what changed, when, and why — and undo anything. Git is the tool; GitHub hosts your Git repositories online. Vocabulary:

- **Repository (repo)** — your project plus its entire history.
- **Commit** — a saved snapshot with a message. Like a save point.
- **History** — the ordered list of commits; view or revert to any.
- **Branch** — a parallel line of work, so you can build without touching the working version.
- **Remote** — the copy on GitHub, shared and backed up.

**Why it matters:** experiment fearlessly (revert if it breaks), off-machine backup, collaboration, and — next module — pushing to GitHub triggers deployment.

---

## Lesson 9.2 — Git basics: commit and push to GitHub (~50 min)

Begins Objective 2.

**Step 1 — Protect your secrets first.** Confirm `.env.local` is in `.gitignore` (create-next-app adds it). Never commit API keys (your Supabase keys from Module 7).

```
# .gitignore (already includes)
.env*.local
node_modules
.next
```

**Step 2 — Initialize and commit:**

```bash
git init
git add .
git commit -m "Initial commit: invoice tracker with clients, invoices, auth"
```

**What you'll see:**
```
[main (root-commit) a1b2c3d] Initial commit: invoice tracker with clients, invoices, auth
 15 files changed, 450 insertions(+)
 create mode 100644 app/clients/page.tsx
 create mode 100644 app/invoices/page.tsx
 ...
```

**Step 3 — Create a repo on GitHub and push:**

1. Go to [github.com/new](https://github.com/new) and create a repo (name: `invoice-tracker`, no README)
2. Copy the commands GitHub shows
3. Run them in your terminal:
   ```bash
   git remote add origin https://github.com/YOU/invoice-tracker.git
   git branch -M main
   git push -u origin main
   ```

**What you'll see:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Then on GitHub, refresh the repo page—your code is there! ✅

---

**[SCREENSHOT PLACEHOLDER: GitHub Repo Page]**

GitHub showing: repo name, file tree (app/, lib/, package.json, etc.), commit history on the left. Proof: code is pushed and visible on GitHub.

---

Commit small, logical chunks with clear messages ("Add invoice status filter," not "stuff"). Good history is a capstone rubric criterion.

---

## Lesson 9.3 — Branches and pull requests (~50 min)

Completes Objective 2 — the professional workflow. Instead of editing `main` directly, make a **branch** per change, then open a **pull request (PR)** to merge it back.

```bash
git checkout -b add-invoice-filter
# ...changes, commits...
git push -u origin add-invoice-filter
```

On GitHub, open a PR from that branch into `main`. The PR shows the diff, lets you (or a teammate) review, and merges when approved. This is where Vercel posts preview deploys (Module 10).

*[SCREENSHOT: a GitHub pull request showing the diff and merge button.]*

**Why branches + PRs even solo:** `main` stays working, each change is isolated and reviewable, and you build the exact habit employers expect.

---

## Lesson 9.4 — Merge conflicts and collaboration (~40 min)

This delivers Objective 3. A **merge conflict** happens when two changes touch the same lines and Git can't decide. Not an error — Git asking you to choose. Routine, not scary.

**Concrete example — a conflict:**

You're on `main` and it has:
```javascript
const status = "unpaid";
```

You create a branch `add-filter` and change it to:
```javascript
const status = "pending";
```

Meanwhile, on `main`, someone else also changed it to:
```javascript
const status = "overdue";
```

When you try to merge `add-filter` into `main`, Git says "I don't know which version you want!" and marks it:

```
<<<<<<< HEAD
const status = "overdue";
=======
const status = "pending";
>>>>>>> add-filter
```

**Resolve it:**

1. Open the file and look at the markers
2. Decide which version you want (or combine them)
3. Edit to your choice:
   ```javascript
   const status = "overdue";  // You chose the main version
   ```
4. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Save the file
6. Commit: `git add . && git commit -m "Resolve conflict: keep overdue status from main"`

Now the merge is complete! ✅

**Using AI to help (safely):** You can paste the conflict and ask the AI to explain both sides—but *you* decide which version is correct, since only you know the intended behavior.

**Collaboration basics:** pull others' changes before starting (`git pull`), work on your own branch, open a PR, resolve conflicts if they arise.

---

## Lesson 9.5 — Git with AI, safely (~20 min)

- **Commit messages & PR descriptions** — AI writes good ones from your diff.
- **Explaining history** — ask AI what a commit or diff changed.
- **Conflict help** — AI can propose resolutions (Lesson 9.4).
- **The one hard rule:** never let any tool commit secrets. Double-check `.gitignore` and scan diffs for keys before pushing. If a secret is ever committed, rotate it — assume it's compromised. (Reinforced in Module 10 and Module 12's security pass.)

---

## Hands-on activity (~50 min, folded in)

**"Ship a change the professional way."** Follow these steps to practice the full Git/GitHub workflow.

### Step 1: Check `.gitignore` (2 min)
Confirm secrets won't be committed:

1. Open `.gitignore` in your editor
2. Verify it has:
   ```
   .env*.local
   node_modules
   .next
   ```
3. If missing, add them

### Step 2: Initialize Git and push to GitHub (10 min)

**2a. Create a repo on GitHub:**
1. Go to [github.com/new](https://github.com/new)
2. Name it `invoice-tracker`
3. Leave "Initialize with README" unchecked
4. Click "Create Repository"
5. Copy the commands GitHub shows (you'll need them in 2b)

**2b. Initialize locally and push:**
```bash
cd invoice-tracker  # your local project
git init
git add .
git commit -m "Initial commit: invoice tracker with clients, invoices, auth, Supabase"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/invoice-tracker.git
git push -u origin main
```

Check GitHub—your code is there! ✅

### Step 3: Create a branch and make a change (8 min)

**3a. Create a feature branch:**
```bash
git checkout -b add-invoice-sort
```

**3b. Make a small improvement:**
- Open `/invoices` page
- Add sorting by due date
- Test it works locally

**3c. Commit the change:**
```bash
git add app/invoices/page.tsx
git commit -m "Add sorting by due date on invoices list"
```

**3d. Push the branch:**
```bash
git push -u origin add-invoice-sort
```

### Step 4: Open and merge a PR (10 min)

**4a. Open a PR on GitHub:**
1. Go to your repo on GitHub
2. You'll see a banner: "Your recently pushed branches" with a green "Compare & pull request" button
3. Click it
4. Add a description: "Sorts invoices by due date for easier tracking"
5. Click "Create Pull Request"

**4b. Merge the PR:**
1. Look for the green "Merge pull request" button
2. Click it
3. Click "Confirm merge"
4. Click "Delete branch" (clean up)

You've shipped a change the professional way! ✅

### Step 5: Create and resolve a merge conflict (10 min)

**5a. Create a conflict intentionally:**

1. On `main`, go to `/clients` page and change the title from "Clients" to "Client List"
2. Commit: `git add app/clients/page.tsx && git commit -m "Rename to Client List"`
3. Create a branch: `git checkout -b improve-clients`
4. On the branch, change the same title to "All Clients"
5. Commit: `git add app/clients/page.tsx && git commit -m "Improve label for clarity"`
6. Try to merge back to main: `git checkout main && git merge improve-clients`

Git will say: **CONFLICT!**

**5b. Resolve it:**
1. Open `/clients/page.tsx` in your editor
2. Find the conflict markers (<<<<<<, =======, >>>>>>>)
3. Decide which version you want (or combine: "Clients - View All")
4. Delete the markers
5. Save
6. Commit: `git add app/clients/page.tsx && git commit -m "Resolve conflict: use 'Clients' title"`

Conflict resolved! ✅

### Deliverable:
- GitHub repo link with your code
- Screenshot showing a merged PR
- Screenshot of your commit history (at least 3-4 commits)
- One-sentence explanation of what you learned about conflicts

---

## Quiz questions (preview)

These are the three questions you'll see on the quiz. Study these to prepare:

**Q9-1:** A commit is best described as:
- (a) a deployed app
- (b) **a saved snapshot of changes with a message** ✓
- (c) a branch
- (d) a backup server

*Why:* A commit is exactly this: you select which files changed, write a message explaining WHY you changed them (not what—the diff shows that), and save the snapshot. Each commit is a save point you can revert to.

**Q9-2:** Why work on branches + pull requests even solo?
- (a) required
- (b) **`main` stays working and each change is isolated and reviewable** ✓
- (c) faster typing
- (d) it deletes old code

*Why:* Branches protect your production code (`main`); PRs let you review your own changes (and practice the habit for when you collaborate). This is the professional workflow—build it now.

**Q9-3:** A merge conflict is:
- (a) an unfixable error
- (b) **Git asking you to choose between two changes to the same lines** ✓
- (c) a deploy failure
- (d) a virus

*Why:* Conflicts are routine, not errors. Git sees two versions of the same line and can't decide—you edit the file, choose which version to keep, remove the markers, and commit. Not scary.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Explain:** define repo, commit, branch, and PR, and give one reason version control matters even solo.

**Objective 2 — Manage:** show a repo with a feature branch, meaningful commits, and a merged PR.

**Objective 3 — Resolve a conflict:** given a file with conflict markers, produce the correctly resolved file and explain your choice.

---

**Scenario-based judgment checks:**

*For each scenario, explain what you'd do.*

- **(a) You committed `.env.local` and pushed.** You realize you pushed secrets to GitHub. What's your next step?
  - ✅ **Correct:** Rotate your Supabase keys immediately (assume they're compromised). Then use `git rm --cached .env.local`, commit, and push again to remove it from history. Treat as a real incident.
  - ❌ **Avoid:** Ignoring it. Secrets in public repos are a real risk.

- **(b) You're on `main` and want to make a small fix.** What's the professional workflow?
  - ✅ **Correct:** Create a branch (`git checkout -b fix-typo`), make the change, commit, push, open a PR, review it, merge it.
  - ❌ **Avoid:** Committing directly to `main`. Branches protect `main` from half-baked changes.

- **(c) You have uncommitted changes and want to switch branches.** What happens if you just switch?
  - ✅ **Correct:** Git may warn or refuse (if changes conflict with the other branch). Safe: commit first or `git stash` to save changes, then switch.
  - ❌ **Avoid:** Forcing a switch and losing work. Be deliberate.

- **(d) You see a merge conflict marker.** You don't understand which version is right. What do you do?
  - ✅ **Correct:** Don't guess. Ask a teammate or read the context. Understanding the conflict is half the fix.
  - ❌ **Avoid:** Picking randomly. You might break logic or lose important code.

- **(e) Your commit history is messy: "wip", "asdf", "fix", "fix 2", "fix 3".** The capstone rubric looks for clean history. How do you avoid this?
  - ✅ **Correct:** Commit frequently with meaningful messages ("Add filter dropdown", "Fix auth bug on sign-in"). Aim for ~1 commit per logical change.
  - ❌ **Avoid:** Lazy commit messages. They matter. Future-you and reviewers will read them.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **Secrets protected** | `.gitignore` includes `.env*.local` and `.env.local` is never in commit history |
| **Initial commit** | Repo created on GitHub; all code pushed with clean initial commit |
| **Feature branch** | Created a branch (not working on `main`); named descriptively (e.g., `add-invoice-sort`) |
| **Commits are meaningful** | Each commit message describes what changed and why (not "fix", not "asdf") |
| **PR opened** | Branch pushed; PR created with a description explaining the change |
| **PR merged** | PR reviewed (even if self-reviewed) and merged; branch deleted after merge |
| **Conflict resolved** | Deliberately created a conflict, resolved it, committed the resolution |
| **Commit history is clean** | 4+ commits visible; messages are clear; no "wip" or throwaway commits |
| **No secrets in repo** | Verify: run `git log -p` and grep for NEXT_PUBLIC or sensitive strings—should be none |

*Pass mark: 80% and a GitHub repo with clean history, merged PR, and resolved conflict submitted.*

---

## Tools & alternatives (this module)

Default: **GitHub** (industry-standard host, best Vercel integration). **Alternatives:** GitLab, Bitbucket — same Git workflow, different hosting/CI. Run Git from the terminal, Cursor's source-control panel, or Claude Code.

---

## Key takeaways

- Version control records history so you can experiment fearlessly and always revert.
- Core concepts: repo, commit, branch, remote, pull request.
- Work on branches, merge via PRs — `main` stays working, changes stay reviewable.
- Merge conflicts are routine: edit to the version you want, remove markers, commit.
- Never commit secrets — keep `.env.local` gitignored and scan diffs before pushing.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)