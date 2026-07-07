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

**Step 3 — Create a repo on GitHub and push:**

```bash
git remote add origin https://github.com/YOU/invoice-tracker.git
git push -u origin main
```

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

```
<<<<<<< HEAD
const status = "unpaid";
=======
const status = "pending";
>>>>>>> add-invoice-filter
```

Resolve by editing to the version you want and removing the marker lines, then commit. A great spot for AI: paste the conflict and ask it to explain both sides and propose a resolution — but *you* decide, since only you know the intended behavior (Module 1).

**Collaboration basics:** pull others' changes before starting (`git pull`), work on your own branch, open a PR, resolve conflicts if they arise.

*[SCREENSHOT: a merge conflict shown in the editor with markers.]*

---

## Lesson 9.5 — Git with AI, safely (~20 min)

- **Commit messages & PR descriptions** — AI writes good ones from your diff.
- **Explaining history** — ask AI what a commit or diff changed.
- **Conflict help** — AI can propose resolutions (Lesson 9.4).
- **The one hard rule:** never let any tool commit secrets. Double-check `.gitignore` and scan diffs for keys before pushing. If a secret is ever committed, rotate it — assume it's compromised. (Reinforced in Module 10 and Module 12's security pass.)

---

## Hands-on activity (~50 min, folded in)

**"Ship a change the professional way."** (1) Confirm secrets are gitignored, (2) push the invoice-tracker to a new GitHub repo, (3) create a branch, make a small improvement, commit, (4) open a PR and merge it, (5) deliberately create and resolve one merge conflict. Deliverable: a GitHub repo with clean history, a merged PR, and no secrets committed.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Explain:** define repo, commit, branch, and PR, and give one reason version control matters even solo.

**Objective 2 — Manage:** show a repo with a feature branch, meaningful commits, and a merged PR.

**Objective 3 — Resolve a conflict:** given a file with conflict markers, produce the correctly resolved file and explain your choice.

*Pass mark: 80% and a GitHub repo with a merged PR submitted.*

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