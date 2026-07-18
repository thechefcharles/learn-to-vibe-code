# Module 20: Git & Version Control (GitHub)

**Stage:** Building · **Level:** Intermediate · **Duration:** ~4 contact hours (0.4 CEU)

**Prerequisites:** Modules 4–7. Learners have a working invoice-tracker and will now put it under version control and onto GitHub — the prerequisite for deploying in Module 21.

> Beginners treat their code as a pile of files they're afraid to change. Version control removes that fear: you can experiment freely because you can always go back. It's also how you collaborate and how your app reaches Vercel (Module 21). Lighter on new app code, heavier on a workflow habit that pays off forever.
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

## Lesson 9.2 — Initialize Git & push to GitHub with Claude Code (~50 min)

Begins Objective 2. **Use Claude Code to manage the Git initialization and first push:**

### Automating Git setup

**Step 1 — Protect your secrets first** (manual check):
Confirm `.env.local` is in `.gitignore` (create-next-app adds it). Never commit API keys.

```
# .gitignore (already includes)
.env*.local
node_modules
.next
```

**Step 2 — Prompt Claude Code to initialize Git:**

```bash
claude
```

Then send:

```
I need to initialize Git in my invoice-tracker project and push it to GitHub.

My project is at: [your local project path]
My GitHub username: [your username]
Repo name: invoice-tracker

Please:
1. Initialize the git repository
2. Add all files (except those in .gitignore)
3. Create an initial commit with a descriptive message about my invoice tracker
4. Show me the GitHub commands to create and connect the remote
5. Push everything to GitHub

Make the commit message describe what the app does.
Verify that .env.local is NOT included (should be gitignored).
```

**Step 3 — Review Claude Code's output.** It will:
- Show `git init`, `git add .`, `git commit -m "..."` commands
- Generate a clear commit message describing your app
- Provide the GitHub remote URL and push command
- **Verify** that `.env.local` is in `.gitignore` (not being committed)

**Step 4 — Create the repo on GitHub** (manual one-time):
1. Go to [github.com/new](https://github.com/new)
2. Name it `invoice-tracker`, no README
3. Click "Create Repository"
4. Copy the URL GitHub shows

**Step 5 — Follow Claude Code's push instructions.** It will have shown you:
```bash
git remote add origin https://github.com/YOU/invoice-tracker.git
git push -u origin main
```

Run these in your terminal.

**Step 6 — Verify on GitHub.** Refresh [github.com/YOU/invoice-tracker](https://github.com/YOU/invoice-tracker) — your code is there! ✅

---

**[SCREENSHOT PLACEHOLDER: GitHub Repo Page]**

GitHub showing: repo name, file tree (app/, lib/, package.json, etc.), commit history. Proof: code is pushed and visible.

---

**Why Claude Code for this?**

- **Automation:** Git initialization is boilerplate; Claude Code handles it
- **Good commit messages:** Claude Code writes descriptive messages, not "stuff"
- **Safety:** it verifies `.env.local` isn't included before pushing
- **Speed:** what takes 5 manual commands is orchestrated in one prompt

---

## Lesson 9.3 — Branches and pull requests with Claude Code (~50 min)

**In this lesson:** You'll learn the professional workflow — instead of editing `main` directly, you'll use Claude Code to orchestrate feature branches and pull requests. This is how real teams ship code safely:

### Automating the branch workflow

**Step 1 — Decide on a feature to build.** For example: "Add invoice sorting by due date."

**Step 2 — Prompt Claude Code to manage the workflow:**

```bash
claude
```

Then send:

```
I want to add a new feature to my invoice-tracker: [your feature description]

Please orchestrate the full Git workflow:
1. Create a feature branch with a clear name (format: feature/description)
2. Make the code changes needed for this feature
3. Create a descriptive commit message
4. Push the branch to GitHub
5. Show me how to open a PR on GitHub

Keep changes focused on just this one feature—no refactoring or scope creep.
Make sure the commit message explains why the change is needed.
```

**Step 3 — Claude Code will:**
- Create a branch with a clear name (e.g., `feature/add-invoice-sort`)
- Make focused code changes
- Write a descriptive commit message
- Show you the push command
- Explain how to open a PR on GitHub

**Step 4 — Test locally first.** Before pushing, run the app and verify the feature works:

```bash
npm run dev
# Test the feature in your browser
```

**Step 5 — Follow Claude Code's push instructions:**

```bash
git push -u origin feature/add-invoice-sort
```

**Step 6 — Open the PR on GitHub** (Claude Code will guide you):
1. Go to your repo on GitHub
2. Click "New Pull Request" or use the banner that appears
3. Select `feature/add-invoice-sort` → `main`
4. Add a description (Claude Code will suggest one)
5. Click "Create Pull Request"

**Step 7 — Merge the PR** (solo workflow):
1. Review the diff on GitHub
2. Click "Merge pull request" → "Confirm merge"
3. Click "Delete branch" (clean up)

On GitHub, refresh `main` — your feature is now live! ✅

---

**[SCREENSHOT: a GitHub pull request showing the diff and merge button]**

---

**Why Claude Code for branches + PRs?**

- **Automation:** Claude Code creates branches, makes changes, and commits in one flow
- **Clear branch naming:** it follows `feature/`, `fix/`, `docs/` conventions automatically
- **Focused changes:** Claude Code keeps the feature scope tight (no scope creep)
- **Good PR descriptions:** it writes clear summaries of what changed and why
- **Professional workflow:** this is the exact habit employers expect

### Branch naming convention

To keep your history readable, use a consistent **naming pattern** for branches. The default pattern is:

```
<type>/<short-description>
```

Where `<type>` is one of:
- `feature/` — a new feature ("feature/add-invoice-filter")
- `fix/` — a bug fix ("fix/auth-logout-error")
- `docs/` — documentation only ("docs/update-readme")
- `refactor/` — code cleanup, no behavior change ("refactor/simplify-client-list")

**Examples:**
- ✅ `feature/add-payment-tracking`
- ✅ `fix/handle-empty-invoices-list`
- ✅ `docs/add-setup-guide`
- ❌ `asdf`, `stuff`, `wip` (unclear; avoid)

**Why it matters:** a readable branch history makes it obvious what each change was about. When you (or a teammate) look back at the repo, `feature/add-invoice-sort` tells you exactly what that PR was for.

**For your capstone:** Create a `BRANCHING.md` file in your project root documenting your naming convention:

```markdown
# Branching Strategy

## Pattern
`<type>/<description>` where type is: feature, fix, docs, refactor

## Examples
- feature/add-invoice-status-filter
- fix/rls-policy-for-clients
- docs/update-deployment-guide
- refactor/extract-invoice-logic

## Workflow
1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and commit frequently with clear messages
3. Push: `git push -u origin feature/your-feature`
4. Open a PR with a description of what changed and why
5. Review your own changes (or have a teammate review)
6. Merge when approved
```

This becomes part of your project governance (like CLAUDE.md from Module 1) and makes onboarding teammates (or future-you) much smoother.

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

## Lesson 9.4b (Optional) — Collaborating on a Shared Branch (~30 min)

Module 20.4 covered merge conflicts in a solo scenario (you edit the same file twice, create a conflict). This lesson is a step up: **what if two teammates edit the same file?**

### Scenario: Two Developers, One Branch

Branch: `add-user-roles` (implementing role-based access)

Developer A edits `/src/roles/admin.ts`:
```typescript
export const AdminRole = {
  permissions: ["read:users", "write:users", "delete:users"],
  name: "Admin"
};
```

Developer B edits the same file `/src/roles/admin.ts`, adding:
```typescript
export const AdminRole = {
  permissions: ["read:users", "write:users"],
  name: "Administrator",
  description: "Full access"
};
```

Both push to the same branch. Conflict!

### Resolution Workflow

1. **Developer A** commits and pushes first (no conflict)
2. **Developer B** tries to push, gets: "rejected — remote has changes"
3. **Developer B** pulls locally: `git pull`
4. Git shows a conflict:

```
<<<<<<< HEAD (Developer B's version)
export const AdminRole = {
  permissions: ["read:users", "write:users"],
  name: "Administrator",
  description: "Full access"
};
=======
export const AdminRole = {
  permissions: ["read:users", "write:users", "delete:users"],
  name: "Admin"
};
>>>>>>> origin/add-user-roles (Developer A's version)
```

5. **Developer B** must decide: which version is right? Or merge both?

In this case, the versions disagree on:
- Permissions: A added `delete:users`, B didn't
- Name: A says "Admin", B says "Administrator"
- Description: A has none, B added one

6. **Developer B** resolves by **talking to Developer A** (or reading the commit message). They decide:
   - Use B's name and description (better UX)
   - Use A's permissions (more permissive, as intended)
   - Result:

```typescript
export const AdminRole = {
  permissions: ["read:users", "write:users", "delete:users"],
  name: "Administrator",
  description: "Full access"
};
```

7. **Developer B** marks resolved: `git add src/roles/admin.ts`
8. **Developer B** completes the merge: `git commit -m "Merge add-user-roles: resolve role definitions"`
9. **Developer B** pushes: `git push`

### Key Lesson

Conflicts in team settings require **communication**. The code conflict is mechanical (git can't merge); the business logic conflict is human (which version is correct?). In a real team, you'd:
- Chat on Slack: "Hey, I'm rebasing add-user-roles, there's a conflict in roles/admin.ts. Did you intend to remove delete:users?"
- Read commit messages carefully
- Ask the other developer

### Knowledge Check

**Q9-4b:** "You and a teammate both edited `/config/api.ts`. Git shows a conflict. Your version sets timeout=30, their version sets timeout=60. What should you do?"

a) Always pick your version (you wrote it first)
b) Always pick their version (they pushed last)
c) Talk to your teammate and decide together based on the reason for the change
d) Just pick one at random

**Correct:** c) — Conflicts require judgment. Understand why each of you made the change, then decide together.

---

## Lesson 9.5 — Git with AI, safely (~20 min)

- **Commit messages & PR descriptions** — AI writes good ones from your diff.
- **Explaining history** — ask AI what a commit or diff changed.
- **Conflict help** — AI can propose resolutions (Lesson 9.4).
- **The one hard rule:** never let any tool commit secrets. Double-check `.gitignore` and scan diffs for keys before pushing. If a secret is ever committed, rotate it — assume it's compromised. (Reinforced in Module 21 and Module 23's security pass.)

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