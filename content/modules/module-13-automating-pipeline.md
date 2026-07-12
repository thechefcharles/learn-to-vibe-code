# Module 13: Automating Your Dev Pipeline with Claude Code (Optional, Post-Capstone)

**Stage:** Production (Advanced) · **Level:** Advanced · **Duration:** ~7 contact hours (0.7 CEU)

**Prerequisites:** Modules 5, 9, 10, 11. Learners can build agentically (5), use Git/GitHub (9), deploy on Vercel (10), and understand tools/MCP (11). This module wires it all together so Claude Code can drive the whole pipeline.

> The "AI automation engineer" module. So far learners *used* Claude Code to write code. Here they turn it into an operator that can commit, open PRs, run migrations, deploy, and read logs to debug — all from the terminal, with guardrails. The highest-leverage setup in the course and the clearest differentiator for a graduate.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* — MCP list, plugin install, and terminal shots are manual; an automated PR/deploy is auto-capturable.
> 

> **⚡ Version note:** the fastest-moving area in the course. Teach the *concepts and setup pattern*; point learners to current docs for exact syntax. Commands are representative as of 2026.
> 

## This Module Is Optional — Start Here

This module is **optional**. It covers advanced automation with MCP servers, skills, subagents, and plugins.

**Why optional?** The capstone (Module 16) doesn't require it. Many projects are polished and shipped without automation. Learning to ship first, automate later, is wise.

**When to take this module:**
- After you've shipped your capstone
- If you're building frequently and want to reduce repetitive work
- If you want to explore Claude Code's advanced features

**For now:** Focus on shipping your capstone (Modules 1-12 + 14-16). Come back to Module 13 after graduation if you want to level up.

---

## Learning objectives

By the end of this module, the learner can:

1. **Configure** MCP connections and CLIs so Claude Code can act on GitHub, Supabase, Vercel, and Notion. *(Apply)*
2. **Build and install** skills (including from GitHub) and subagents, and package them as a plugin. *(Create)*
3. **Orchestrate** an end-to-end automated pipeline (commit → PR → migrate → deploy → debug) with guardrails. *(Create)*
4. **Choose** the right extension type ([CLAUDE.md](http://CLAUDE.md), skill, subagent, MCP, plugin) for a given need. *(Evaluate)*

---

## Lesson 13.1 — The extension mental model (~45 min)

Delivers Objective 4 — and prevents the #1 confusion here. Five ways to extend Claude Code, each for a different job:

| Extension | What it's for | Use when… |
| --- | --- | --- |
| [**CLAUDE.md**](http://CLAUDE.md) | Always-on project rules/context | A rule applies to almost every task ("use conventional commits") |
| **Skill** | On-demand procedural know-how, activates by context | A specific workflow only matters sometimes (PR-review checklist) |
| **MCP** | Access to external systems (read + act) | You need to query/fetch/act on GitHub, a DB, Vercel, an API |
| **Subagent** | A specialist with its own context + tool permissions | You need isolation or parallel work (a dedicated reviewer) |
| **Plugin** | A bundle of the above, installable in one command | You want to package and share a whole setup |

**One-line test:** rules → [CLAUDE.md](http://CLAUDE.md); how-to → skill; access/actions → MCP; isolated specialist → subagent; share-the-bundle → plugin. Most real setups use several. (Hooks, in 13.7, automate the session.)

> **Cross-tool note:** `CLAUDE.md` is Claude Code's project-instructions file; **`AGENTS.md`** is the vendor-neutral equivalent many tools (and create-next-app) now use. Working across tools, keep an `AGENTS.md` as the shared source and let tool-specific files point to it.
> 

---

## Lesson 13.2 — MCP setup: give Claude Code hands (~75 min)

Delivers Objective 1 — the core of "control everything." MCP servers let Claude Code *act* on external systems. Add servers via the CLI (or a project `.mcp.json` so the team shares them):

```bash
# Supabase (schema, queries, auth) — scoped access token
claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest --project-ref=YOUR_REF
# GitHub (issues, PRs, repo actions)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
# Vercel (deploys, build status, envs, domains)
claude mcp add --transport http vercel https://mcp.vercel.com
# Notion (your specs, feature checklists, docs — read + write)
claude mcp add --transport http --scope user notion https://mcp.notion.com/mcp
```

Confirm with `claude mcp list`.

**Notion as your project's source of truth:** after connecting Notion (run `/mcp` for the OAuth flow, then share the pages you want Claude to access), Claude Code can **read a feature checklist, tick items off as it ships them, and write specs/decisions back** — so your plan (Module 3) and your automation live in one place. Great for a solo builder keeping a living TODO the agent actually maintains.

---

**[SCREENSHOT PLACEHOLDER: MCP List Output]**

Terminal showing: `claude mcp list` with three connected servers: supabase (schema access), github (PR/issues), vercel (deploys). Proof: Claude Code can act on all systems.

---

### 13.2a — Worked example: MCP configuration for the invoice-tracker (~45 min)

**Scenario:** You've built the invoice-tracker (Modules 4–12) on Supabase + Next.js + Vercel. Now you want Claude Code to:
- Query the Supabase schema and data to understand structure
- Open PRs and check PR status on GitHub
- Monitor deployments and view build logs on Vercel

**Step 1: Connect Supabase** (schema access, scoped token):
```bash
# Generate a scoped Supabase token (read-only for schema/queries)
supabase login --token
# (Paste your personal access token)

# Add Supabase MCP
claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest \
  --project-ref=abc12345def67890 \
  --db-url="postgresql://postgres:YOUR_PASSWORD@db.abc12345.supabase.co/postgres"
```

**Step 2: Connect GitHub** (PRs, issues, repo actions):
```bash
# Authenticate with GitHub
gh auth login
# (Follow the flow: web browser, create a personal access token if prompted)

# Add GitHub MCP
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
# Alternative: use the gh CLI directly (no OAuth needed)
```

**Step 3: Connect Vercel** (deploys, build status, environment):
```bash
# Get a Vercel token from https://vercel.com/account/tokens
export VERCEL_TOKEN="your-token-here"

# Add Vercel MCP
claude mcp add --transport http vercel https://mcp.vercel.com
```

**Verify all three are connected:**
```bash
claude mcp list
# Output:
# ✓ supabase (via npx)
# ✓ github (http)
# ✓ vercel (http)
```

**Now Claude Code can:**
- **Supabase:** `List tables and schema`, `Query invoices to verify data`, `Check for RLS policies`
- **GitHub:** `List recent PRs`, `Open a PR with a title and description`, `Comment on a PR`
- **Vercel:** `Check deployment status`, `View build logs`, `Set environment variables`

**Example commands Claude Code can now run directly:**
```
"Show me the current Supabase schema for invoices table"
→ MCP queries Supabase API, returns schema + indexes

"Open a PR to add the paid_at timestamp feature"
→ MCP calls GitHub API, creates PR with your code

"Is the last deploy on Vercel successful? What was the LCP score?"
→ MCP queries Vercel API, returns deployment status + Lighthouse metrics
```

This setup is the foundation of the automated pipeline (Lesson 13.6). Claude Code can now inspect, create, and monitor the entire system without you copy-pasting between dashboards.

> **For kids:**
> This wires your tools together so Claude Code can use them. You don't need to do this yet (it's advanced), but see how the pieces connect: Claude talks to Supabase (to understand your data), GitHub (to open PRs), and Vercel (to deploy). It's like giving Claude hands to act on the systems you use.

> **For adults:**
> This is the operational pattern for Phase 8+. Wiring MCP servers is how you build production automation — it's the infrastructure layer that enables end-to-end pipeline orchestration (Lesson 13.6). Every production system needs this setup: ChatOps without the chat UI, or an agentic CI/CD that can reason about your entire stack.

---

**MCP vs. CLI — both matter:** MCP for interactive read/act (inspect a schema, check a deploy, comment on a PR); the matching **CLIs** (`gh`, `supabase`, `vercel`) for versioned, scripted operations, which Claude Code runs via its shell. Rule: **MCP for current-state, CLI for migrations/history.** Teach both; they're complementary.

> **Build-verified fallback (important):** MCP OAuth can fail for a given provider — in the reference build the Supabase MCP returned "Unrecognized client_id" and we fell back to the CLI. Teach the **CLI + personal-access-token** path (`supabase login --token`, `gh auth login`, a Vercel token) as the reliable default; treat MCP OAuth as the convenience when it works.
> 

> **Security first (Module 12):** give MCP servers scoped, least-privilege tokens, start read-only, and never paste tokens into the repo — use environment variables.
> 

---

## Lesson 13.3 — Skills: reusable know-how (incl. from GitHub) (~50 min)

Begins Objective 2. A **skill** is a folder with a `SKILL.md` describing a task Claude should know; it loads automatically when context matches.

**Concrete skill example:**

```
.claude/skills/ship-feature/SKILL.md
---
name: ship-feature
description: Standard workflow to ship a feature safely
---

## Workflow: Ship a Feature

Use this workflow when shipping a new feature or fix. It ensures testing and good history.

1. **Create a branch:** `git checkout -b <feature-name>` (use kebab-case, e.g., `add-invoice-filter`)
2. **Make changes** and commit incrementally with conventional messages:
   - `feat: add invoice status filter`
   - `fix: resolve RLS policy for clients table`
3. **Run tests:** `npm run test && npm run test:e2e` — do NOT proceed if tests fail
4. **Open a PR:** use `gh pr create` with a summary linking to any issue
5. **Wait for review:** if the `reviewer` subagent finds issues, fix them; re-run tests; push
6. **Merge:** `gh pr merge --squash` (clean history)
7. **Verify deploy:** wait for Vercel to deploy, spot-check the live site

### When NOT to use this:
- Emergency hotfixes: follow this but notify #oncall
- Schema changes: add a migration step before step 1
```

**Installing skills from GitHub:** skills are portable, shared as repos. Install via a skills CLI or plugin marketplace — e.g. `npx skills add owner/repo` — to adopt vetted workflows without writing them. 

**Skill vs. [CLAUDE.md](http://CLAUDE.md):** applies to nearly every task → [CLAUDE.md](http://CLAUDE.md); occasional workflow → skill.

---

**[SCREENSHOT PLACEHOLDER: Skill Install]**

Left: `.claude/skills/ship-feature/SKILL.md` file open with detailed workflow steps. Right: Terminal showing `npx skills add owner/repo` and skill loaded. Proof: skills automate known workflows.

---

---

## Lesson 13.4 — Subagents: isolated specialists (~40 min)

Continues Objective 2. A **subagent** is a separate Claude session with its own context and tool permissions, for a focused job — to keep heavy work from polluting your main context and to run specialists in parallel.

**Concrete subagent example:**

```
.claude/agents/reviewer.md
---
name: reviewer
description: Reviews code diffs for bugs, security, and style violations. Read-only, strict.
tools: Read, Grep, Glob
effort: high
---

You are a strict security and code-quality reviewer. Your job: examine a code diff
and report issues by severity (HIGH/MEDIUM/LOW) with file:line references.

**Always check for:**
- Security: RLS on tables, validation on inputs, secrets in code, SQL injection risk
- Logic: off-by-one errors, null checks, race conditions
- Style: naming clarity, function size, type safety

**Format your report as:**
```
HIGH: [filename:line] SQL injection risk in query construction
MEDIUM: [filename:line] Missing null check on user_id
```

**Do not:**
- Suggest trivial style changes (semicolons, spacing)
- Modify any files (read-only)
- Approve broken code even if it's "clever"
```

Claude Code can hand a finished change to `reviewer` before you merge — the capstone review gate, automated. Note the **least-privilege** `tools:` list — the reviewer can't edit, only report.

**Invoking a subagent in the pipeline:**

```typescript
// When you're ready to merge, but want a final check:
const reviewResult = await subagent("reviewer", {
  diff: gitDiff,
  context: "Adding new invoice endpoint with RLS policies"
});

// If HIGH issues, ask Claude to fix them; if only MEDIUM/LOW, you can approve
if (reviewResult.includes("HIGH:")) {
  // Loop back, fix issues, re-run
} else {
  // Ready to merge
}
```

---

## Lesson 13.5 — Plugins: bundle and share (~30 min)

Completes Objective 2. A **plugin** packages skills + MCP + subagents + commands + hooks into one installable unit.

```bash
/plugin marketplace add anthropics/claude-plugins-official
/plugin install <plugin-name>
```

You can also *author* a plugin (a repo with a `.claude-plugin/marketplace.json` manifest) to standardize your team's setup — everyone installs one plugin and gets the same skills, subagents, and MCP config. The endgame: your automated pipeline, packaged.

*[SCREENSHOT: `/plugin install` adding a plugin.]*

---

## Lesson 13.6 — The automated pipeline, end to end (~90 min)

Delivers Objective 3 — the payoff. Have Claude Code take a feature from idea to deployed, with you approving the risky steps.

**Worked example — "Add a `paid_at` timestamp to invoices and ship it":**

1. **Plan** (Module 5 plan mode) — Claude proposes migration, code change, tests, PR, deploy.
2. **Migrate** — Claude generates a Supabase migration via the CLI (versioned); you **approve** applying it. Inspect via the Supabase MCP.
3. **Code + test** — updates the app; a **hook** runs the tests (13.7).
4. **Commit + PR** — conventional commit, PR via GitHub MCP / `gh`; the `reviewer` subagent checks the diff.
5. **Deploy** — merge triggers the Vercel deploy (Module 10); Claude monitors build status via the Vercel MCP.
6. **Debug** — if it fails, Claude reads Vercel/Supabase logs via MCP and loops — the Module 8 debugging loop, automated.

*[SCREENSHOT: Claude Code opening a PR and reporting a successful deploy from the terminal.]*

One instruction, a full pipeline — but you stayed in control at the migration and merge gates. That balance is the whole skill.

---

## Lesson 13.7 — Guardrails: permissions & hooks (~40 min)

Secures Objective 3. Automation without guardrails is how you drop a production table at 2 a.m.

**Permissions** (`/permissions`) — allow/ask/deny list. Auto-allow safe, reversible actions (run tests, read logs); **always require approval** for destructive ones (prod migration, merge to main, delete data, spend money). The Module 11 human-in-the-loop principle, configured.

**Concrete permissions config:**

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run test)",
      "Bash(npm run lint)",
      "Read(*)",
      "Grep(*)",
      "Bash(git status)",
      "Bash(git log *)"
    ],
    "ask": [
      "Bash(git commit *)",
      "Bash(git push *)",
      "Bash(supabase db push)",
      "Bash(gh pr create)",
      "Bash(npm install)",
      "Bash(git rebase *)"
    ],
    "deny": [
      "Bash(git reset --hard)",
      "Bash(rm -rf *)",
      "Bash(supabase db reset)",
      "Bash(npx stripe *)"
    ]
  }
}
```

**Hooks** — scripts that run at points in the session. For example, run tests before committing, or block a commit if it contains secrets:

**Concrete hooks config:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "command": "npm run test && npm run lint && ./scripts/check-secrets.sh",
        "failureAction": "block"
      },
      {
        "matcher": "Bash(git push*)",
        "command": "echo 'Pushing to remote. Verify the PR will pass CI.'",
        "failureAction": "warn"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash(supabase db push)",
        "command": "echo 'Migration applied. Verify in Supabase dashboard: https://app.supabase.com/project/YOUR_REF/sql/migrations'",
        "failureAction": "log"
      }
    ]
  }
}
```

**The rule:** automate the reversible, gate the irreversible. Everything about security and "you own every line" (Modules 1, 7, 12) applies double when an agent has hands on your infrastructure.

Concretely:
- ✅ **Auto-allow:** reading files, running tests, checking status (reversible)
- ✅ **Ask:** committing, pushing, opening PRs (reversible but important to review)
- ✅ **Deny or ask:** database migrations, merging to main, spending money (irreversible)

---

## Hands-on activity (~90 min, folded in)

**"Wire up and ship, hands-off (almost)."** Follow these steps to automate the full pipeline:

### Step 1: Connect MCPs (15 min)
1. Connect GitHub: `claude mcp add --transport http github https://api.githubcopilot.com/mcp/` (or use `gh auth login`)
2. Connect Supabase: `claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest --project-ref=YOUR_REF`
3. Connect Vercel: `claude mcp add --transport http vercel https://mcp.vercel.com`
4. Verify: `claude mcp list` → all three show connected ✓

### Step 2: Write a skill (15 min)
1. Create `.claude/skills/ship-feature/SKILL.md`
2. Write a step-by-step workflow for shipping a feature (branch → test → commit → PR → merge)
3. Include: what to do, what NOT to do, when to use this skill
4. Test: prompt Claude Code: *"I want to ship a new feature. Walk me through the workflow."* → it should cite your skill

### Step 3: Write a subagent (15 min)
1. Create `.claude/agents/reviewer.md`
2. Define a read-only reviewer with `tools: Read, Grep, Glob`
3. Instruct it to check for: security issues (RLS, validation, secrets), logic bugs, style
4. Include: format for reporting (HIGH/MEDIUM/LOW with file:line)

### Step 4: Set permissions & hooks (15 min)
1. Create `.claude/settings.json`
2. Allow: tests, reading, git status (safe)
3. Ask: commit, push, PR, migration (important)
4. Deny: reset --hard, rm -rf, db reset (destructive)
5. Add hook: Pre-commit runs `npm test && npm run lint` (blocks if fail)

### Step 5: Ship a small feature (30 min)
1. Pick a small feature: e.g., "Add `updated_at` timestamp to invoices table"
2. Prompt Claude Code: *"Ship this feature end-to-end: migrate schema, update app, test, open PR, merge. Use the skills and reviewer."*
3. Approve at the gated steps (migrations, merge to main)
4. Watch the pipeline run: branch → migrate → code → test → PR → deploy

### Deliverable:
- Screenshots of `claude mcp list` (three connected servers)
- Your `.claude/skills/ship-feature/SKILL.md` (describe your workflow)
- Your `.claude/agents/reviewer.md` (define your reviewer)
- Your `.claude/settings.json` (permissions + hooks)
- Screenshot of the merged PR from the pipeline
- Screenshot of the live deploy from Vercel

---

## Quiz questions (preview)

These are the four questions you'll see on the quiz. Study these to prepare:

**Q13-1:** A pipeline automates all EXCEPT:
- (a) running tests
- (b) deploying
- (c) **understanding the business need** ✓
- (d) linting code

*Why:* Pipelines are for technical automation: test runs, lints, builds, migrations, deploys. Understanding *why* you're building something is a human job — no tool can do that for you.

**Q13-2:** GitHub Actions runs on:
- (a) your laptop
- (b) **GitHub's servers** ✓
- (c) your database
- (d) Vercel

*Why:* GitHub Actions (and CI/CD in general) run on remote infrastructure, triggered by events (push, PR). Your laptop just kicks it off. That's why you can walk away and the build finishes without your machine being on.

**Q13-3:** A pipeline failing before deploy is:
- (a) a disaster
- (b) **good — it prevented pushing broken code** ✓
- (c) slow
- (d) expensive

*Why:* Pipeline failures are *success*. The whole point is to catch bugs before they ship. A failure that stops a broken deploy to production is exactly what you want.

**Q13-4:** You want Claude Code to export GitHub data on every build. You should use:
- (a) a CLAUDE.md instruction
- (b) a skill (reusable, needs testing)
- (c) **an MCP server (connects Claude to GitHub's API)** ✓
- (d) a GitHub Action (different tool entirely)

*Why:* MCPs give Claude Code hands-on access to external systems. CLAUDE.md is for project rules, skills for reusable know-how. MCP is the right tool for "connect to a system's API."

---

## Knowledge check (mapped to objectives)

### Written checks:

**Objective 1 — Configure:** Show `claude mcp list` with all three connected, and explain when you'd use each server's MCP vs. its CLI.
- *Example answer:* "MCP: interactive queries (inspect schema, check current deploy status, read logs). CLI: versioned, scripted operations (migrations, git history, deployments that need to be repeatable). MCP for now, CLI for records."

**Objective 2 — Build/install extensions:** Submit a skill you wrote, explain what a skill installed from GitHub would do, define a subagent, and describe what a plugin bundles.
- *Example answer:* "Skill I wrote: ship-feature workflow (branch → test → commit → PR). Skill from GitHub: team's PR review checklist. Subagent: `reviewer` (read-only, checks for security/bugs). Plugin: all of the above + MCP config + permissions, packaged and installable."

**Objective 3 — Orchestrate:** Demonstrate the pipeline producing a merged PR and a deploy. Show: which steps require approval, what hooks ran, and what the reviewer checked.
- *Example answer:* "Pipeline: `migrate → code → test (auto-allowed) → commit (asked) → PR (asked) → merge (asked) → deploy (monitored)`. Hooks: pre-commit ran tests (passed). Reviewer: checked for RLS, SQL injection, secrets. Approved merge and deployed."

**Objective 4 — Choose:** For each need, pick the right extension and justify:
- *"Enforce conventional commits across the team"* → **CLAUDE.md** (rule applies to every commit)
- *"Check if a deploy succeeded"* → **MCP** (read-only access to Vercel's current state)
- *"Isolated security audit of a diff"* → **Subagent** (separate context, read-only permissions, parallel)
- *"Share our whole automation setup with a new team member"* → **Plugin** (one install, everything configured)

### Scenario-based judgment checks:

*For each scenario, explain what went wrong and what to do.*

- **(a) Claude Code committed secrets to main without asking.** Permissions were too loose.
  - ✅ **Root cause:** Commit was in "allow" list, no hook scanned for secrets. **Fix:** Move commit to "ask" list; add hook to run `check-secrets.sh` before commit.
  - ❌ **Avoid:** Auto-allowing destructive actions. Everything that produces history should ask.

- **(b) You had to manually review every commit because the `reviewer` subagent was too slow.** Bottleneck in the pipeline.
  - ✅ **Root cause:** Subagent took 5 min per diff. **Fix:** Run subagent in parallel with human approval, or scope it to HIGH severity only (MEDIUM/LOW can be reviewed later).
  - ❌ **Avoid:** Letting the pipeline slow you down. Automation should save time.

- **(c) The reviewer subagent approved code with an SQL injection bug.** Reviewer failed at its job.
  - ✅ **Root cause:** Subagent wasn't trained on your patterns or the bug was subtle. **Fix:** Update the reviewer prompt to include "check for SQL injection specifically"; add an example of a past bug you want to catch.
  - ❌ **Avoid:** Trusting the reviewer blindly. Periodically audit its findings; improve its prompt.

- **(d) You gated merge-to-main but forgot to gate the migration.** Inconsistent guardrails.
  - ✅ **Root cause:** Migration wasn't in permissions. **Fix:** Add migrations to "ask" list; gate before code changes (schema → app).
  - ❌ **Avoid:** Partial gates. If one is destructible, gate it; don't rely on reviewing later.

- **(e) The MCP failed but the CLI works.** OAuth vs. token fallback.
  - ✅ **Root cause:** Supabase MCP OAuth failed (client_id issue). **Fix:** Fall back to CLI with a personal access token (`supabase login --token`). Gate the token in env vars, not in scripts.
  - ❌ **Avoid:** Hardcoding tokens or trusting only MCP. Have a CLI fallback for reliability.

---

**Rubric checklist (self-review before submission):**

| Criterion | Check (✅ = pass) |
|-----------|-------------|
| **MCP connected** | `claude mcp list` shows 3+ servers (GitHub, Supabase, Vercel) |
| **MCP fallback** | You know the CLI equivalent for each MCP (gh, supabase, vercel) |
| **Skill written** | `.claude/skills/ship-feature/SKILL.md` describes a workflow with steps |
| **Skill tested** | Claude Code cites your skill when given a task that matches |
| **Subagent defined** | `.claude/agents/reviewer.md` exists; read-only; checks security + logic |
| **Subagent invoked** | You can prompt Claude Code to run the reviewer on a diff |
| **Permissions set** | Allow (safe), Ask (important), Deny (destructive) configured |
| **Hooks working** | Pre-commit hook runs tests; they block if fail |
| **Pipeline end-to-end** | Feature shipped: migrate → code → test → PR → merge → deploy (all steps visible) |
| **Gated steps** | You approved only the destructible steps (migration, merge) |
| **PR merged** | GitHub shows PR merged from the pipeline |
| **Deploy live** | Vercel shows deployment successful; live site works |

*Pass mark: 80% and a full pipeline run (MCP list + PR + deploy + config files) submitted.*

---

## Tools & alternatives (this module)

Portable pattern: **MCP** is the emerging open standard for tool/data access, **CLIs** (`gh`, `supabase`, `vercel`) are the scriptable complement, and **skills/subagents/plugins** are Claude Code's extension model with analogues in other agentic tools. The durable skill — connect systems, automate the reversible, gate the irreversible — transfers to any toolchain.

---

## Key takeaways

- Five extensions, five jobs: [CLAUDE.md](http://CLAUDE.md) (rules), skills (how-to), MCP (access/actions), subagents (specialists), plugins (bundles).
- MCP gives Claude Code hands on GitHub/Supabase/Vercel; CLIs complement it (and are the reliable fallback when OAuth fails).
- Skills install from GitHub; subagents run isolated specialists; plugins package it all.
- You can automate the full pipeline: migrate → commit → PR → deploy → debug, from one instruction.
- Guardrails are non-negotiable: permissions + hooks. Automate the reversible; gate the irreversible.

[Accredited Vibe Coding Course](../Accredited%20Vibe%20Coding%20Course%20391f6ea84e41819a8ac3c38ebdb12d04.md)