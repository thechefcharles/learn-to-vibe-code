# Module 13: Automating Your Dev Pipeline with Claude Code

**Stage:** Production (Advanced) · **Level:** Advanced · **Duration:** ~7 contact hours (0.7 CEU)

**Prerequisites:** Modules 5, 9, 10, 11. Learners can build agentically (5), use Git/GitHub (9), deploy on Vercel (10), and understand tools/MCP (11). This module wires it all together so Claude Code can drive the whole pipeline.

> The "AI automation engineer" module. So far learners *used* Claude Code to write code. Here they turn it into an operator that can commit, open PRs, run migrations, deploy, and read logs to debug — all from the terminal, with guardrails. The highest-leverage setup in the course and the clearest differentiator for a graduate.
> 

> **📸 Screenshots:** Items marked *[SCREENSHOT: …]* — MCP list, plugin install, and terminal shots are manual; an automated PR/deploy is auto-capturable.
> 

> **⚡ Version note:** the fastest-moving area in the course. Teach the *concepts and setup pattern*; point learners to current docs for exact syntax. Commands are representative as of 2026.
> 

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

*[SCREENSHOT: `claude mcp list` showing supabase, github, and vercel connected.]*

**MCP vs. CLI — both matter:** MCP for interactive read/act (inspect a schema, check a deploy, comment on a PR); the matching **CLIs** (`gh`, `supabase`, `vercel`) for versioned, scripted operations, which Claude Code runs via its shell. Rule: **MCP for current-state, CLI for migrations/history.** Teach both; they're complementary.

> **Build-verified fallback (important):** MCP OAuth can fail for a given provider — in the reference build the Supabase MCP returned "Unrecognized client_id" and we fell back to the CLI. Teach the **CLI + personal-access-token** path (`supabase login --token`, `gh auth login`, a Vercel token) as the reliable default; treat MCP OAuth as the convenience when it works.
> 

> **Security first (Module 12):** give MCP servers scoped, least-privilege tokens, start read-only, and never paste tokens into the repo — use environment variables.
> 

---

## Lesson 13.3 — Skills: reusable know-how (incl. from GitHub) (~50 min)

Begins Objective 2. A **skill** is a folder with a `SKILL.md` describing a task Claude should know; it loads automatically when context matches.

```
.claude/skills/ship-feature/SKILL.md
---
name: ship-feature
description: Standard steps to ship a feature: branch, test, conventional commit, PR.
---
1. Create a branch named for the feature.
2. Run the test suite; do not proceed if it fails.
3. Commit with a conventional message (feat/fix/chore).
4. Open a PR with a summary.
```

**Installing skills from GitHub:** skills are portable, shared as repos. Install via a skills CLI or plugin marketplace — e.g. `npx skills add owner/repo` — to adopt vetted workflows without writing them. **Skill vs. [CLAUDE.md](http://CLAUDE.md):** applies to nearly every task → [CLAUDE.md](http://CLAUDE.md); occasional workflow → skill.

*[SCREENSHOT: a [SKILL.md](http://SKILL.md) file and a skill being installed from a GitHub repo.]*

---

## Lesson 13.4 — Subagents: isolated specialists (~40 min)

Continues Objective 2. A **subagent** is a separate Claude session with its own context and tool permissions, for a focused job — to keep heavy work from polluting your main context and to run specialists in parallel.

```
.claude/agents/reviewer.md
---
name: reviewer
description: Reviews a diff for bugs, security, and style. Read-only.
tools: Read, Grep, Glob
---
You are a strict code reviewer. Given a diff, report issues by severity
with file:line references. Do not modify files.
```

Claude Code can hand a finished change to `reviewer` before you merge — the capstone review gate, automated. Note the **least-privilege** `tools:` list.

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

- **Permissions** (`/permissions`) — allow/ask/deny list. Auto-allow safe, reversible actions (run tests, read logs); **always require approval** for destructive ones (prod migration, merge to main, delete data, spend money). The Module 11 human-in-the-loop principle, configured.
- **Hooks** — scripts that run at points in the session (e.g. `PreToolUse` to run tests before a commit, or block a commit containing a secret).

```
// .claude/settings.json (illustrative)
"hooks": {
  "PreToolUse": [{ "matcher": "Bash(git commit*)",
    "command": "npm test && ./scripts/scan-for-secrets.sh" }]
}
```

**The rule:** automate the reversible, gate the irreversible. Everything about security and "you own every line" (Modules 1, 7, 12) applies double when an agent has hands on your infrastructure.

---

## Hands-on activity (~60 min, folded in)

**"Wire up and ship, hands-off (almost)."** (1) Connect the GitHub, Supabase, and Vercel MCPs, verify with `claude mcp list`, (2) write one skill and one read-only `reviewer` subagent, (3) set permissions so destructive actions require approval and add a pre-commit test hook, (4) have Claude Code take a small feature through the full pipeline, approving only the gated steps. Deliverable: a merged PR + live deploy from the pipeline, plus your permissions/hook config.

---

## Knowledge check (mapped to objectives)

**Objective 1 — Configure:** show `claude mcp list` with all three connected, and when you'd use each server's MCP vs. its CLI.

**Objective 2 — Build/install extensions:** submit a skill you wrote, a skill installed from GitHub, a subagent definition, and what a plugin would bundle.

**Objective 3 — Orchestrate:** demonstrate the pipeline producing a merged PR and a deploy, with your permissions/hooks and which steps you gated.

**Objective 4 — Choose:** for four needs (enforce commit style; check a live deploy; isolated security review; share the whole setup), pick [CLAUDE.md](http://CLAUDE.md) / skill / MCP / subagent / plugin and justify.

*Pass mark: 80% and an automated pipeline run submitted.*

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