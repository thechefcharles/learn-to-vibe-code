# VibeCode Project Setup Template — Curriculum Integration Map

This document maps the VibeCode Project Setup Template concepts into the Accredited Vibe Coding Course (Modules 0–15) for both kid and adult learners.

**Goal:** Identify where each template piece fits, whether to teach it, and how to adapt for age/stage.

---

## 1. CLAUDE.md (Project Constitution)

**Template concept:** Non-negotiable rules document that governs project decisions and agent behavior.

**Best fit:**
- **Primary:** Module 13, Lesson 13.1 "The extension mental model" (already covers CLAUDE.md)
- **Secondary:** Module 0, Lesson 0.1 "The stack, before you touch it" (introduce as part of stack governance)
- **Secondary:** Module 9, Lesson 9.2 (branch protection and repo governance)

**For kids:**
- Simplify: "Rules document for your project — like house rules, but for code"
- Example: "No secrets in git," "Commit messages must be clear," "Test before shipping"
- Activity: Write a 3–5 rule CLAUDE.md for their capstone project

**For adults:**
- Full version: Teach the template (pitch, non-negotiable rules, source of truth model, Definition of Done)
- Example: The learn-to-vibe-code platform's CLAUDE.md as a real case study
- Activity: Write a production-grade CLAUDE.md for their capstone project

**Action:** Already present in Module 13. Add a **worked example** (learn-to-vibe-code's CLAUDE.md + how it governs the platform).

---

## 2. decisions.md (Append-Only Decision Log)

**Template concept:** Record of every meaningful decision ("why did we choose Supabase?") for future reference.

**Best fit:**
- **Primary:** Module 3, Lesson 3.2 "Planning with AI" → extend to include decision logging
- **Secondary:** Module 14, Lesson 14.2 "Orienting in an unknown repo" (learners see decisions in existing code)
- **Tertiary:** Module 13 (when automating, decisions matter for guardrails)

**For kids:**
- Simpler: "Choices log" — write down the important choices you made and *why*
- Example: "We chose Supabase because it has built-in auth" / "We use Tailwind because the team knows it"
- Activity: Maintain a simple `decisions.md` for their capstone (5–10 entries)

**For adults:**
- Full version: Append-only format, one per decision, include date + rationale + who decided
- Example: Read decisions from the learn-to-vibe-code project (why 16 modules? Why Vercel?)
- Activity: Maintain a production `decisions.md` for their capstone; export for audits

**Action:** 
- Add to Module 3 as a deliverable: learners create and maintain decisions.md as they plan
- Show in Module 14 how to read decisions in brownfield repos (understand *why* code is the way it is)
- Link to Module 13 for pipeline automation: decisions inform guardrails

---

## 3. BRANCHING.md (Branching Strategy & Naming Convention)

**Template concept:** Document how to name branches, when to branch, and when to open PRs.

**Best fit:**
- **Primary:** Module 9, Lesson 9.3 "Branches and pull requests"
- **Secondary:** Module 13, Lesson 13.3 "Skills: reusable know-how" (skills can include BRANCHING.md templates)

**For kids:**
- Simplified: "Branch naming rules" — e.g., `feature/add-invoice-filter`, `fix/typo-in-title`
- Keep it: feature/, fix/, and maybe docs/
- Activity: Name 5 branches for their capstone using the pattern

**For adults:**
- Full version: feature/, fix/, docs/, refactor/, style/ + workflow (when to branch, when NOT to)
- Example: The learn-to-vibe-code project uses `main`/`master` mix → standardize to a clear pattern
- Bonus: Skills template for "ship-feature" workflow (part of Module 13)

**Action:** 
- Module 9, Lesson 9.3: Add a subsection "Naming your branches" with a BRANCHING.md template
- Module 13, Lesson 13.3: Create a skill example that includes BRANCHING.md + a "ship-feature" workflow

---

## 4. Configuration Management (config/ dir, config files vs .env)

**Template concept:** Non-secret configuration lives in versioned files (config/sources.yaml, config/thresholds.yaml); secrets stay in .env (git-ignored).

**Best fit:**
- **Primary:** Module 12, Lesson 12.1 "What production-ready means" (maintainability pillar)
- **Secondary:** Module 7, Lesson 7.3 "Secrets & RLS" (distinguish secrets from config)
- **Secondary:** Module 10, Lesson 10.2 "Environment variables" (Vercel env setup)

**For kids:**
- Simplified: "Config = things you might change (API URL, feature flags); Secrets = things you never share (API keys)"
- Example: `config.yaml` has `API_URL: "https://api.example.com"`, `.env` has `API_KEY=secret123`
- Activity: Create a simple `config.yaml` for their capstone

**For adults:**
- Full version: Multiple config files (sources.yaml, thresholds.yaml, vocabularies.yaml), yaml format, env vars for Vercel
- Example: learn-to-vibe-code could benefit from config/ directory to reduce hardcoded values
- Bonus: How to swap configs for dev vs. staging vs. production

**Action:** 
- Module 12, Lesson 12.1: Add subsection "Configuration discipline: config/ vs .env"
- Module 7, Lesson 7.3: Clarify distinction between config and secrets
- Deliverable: Learners extract any hardcoded values from their capstone into config/

---

## 5. CLI Tools & Deterministic Operations

**Template concept:** Build tools (not just functions) that produce reproducible results and can be composed into pipelines.

**Best fit:**
- **Primary:** Module 13, Lesson 13.2–13.4 (Skills, subagents, and how Claude Code calls CLI tools)
- **Secondary:** Module 11, Lesson 11.2 "The building blocks" (tools as a core abstraction)
- **Tertiary:** Capstone extension (learners may build a CLI tool as part of their project)

**For kids:**
- Simplified: "Write tools that do one thing well, so Claude Code can use them"
- Example: `npm run check-broken-links` outputs JSON so it's easy to parse
- Activity: Write one simple CLI command for their capstone

**For adults:**
- Full version: Teach typer/Click (Python) or commander/yargs (Node), tool contracts, determinism
- Example: A Supabase migration tool, a backup tool, a validation tool
- Bonus: How to compose tools into automation pipelines (Module 13 MCP + CLI)

**Action:** 
- Module 13, Lesson 13.2: Add subsection "CLI tools as first-class abstractions"
- Module 11, Lesson 11.2: Mention tools can be CLI commands, not just functions
- Optional capstone extension: "Build a CLI tool for your project"

---

## 6. Golden Fixtures & Testing (Known-Good Data)

**Template concept:** Version-controlled test data (golden fixtures) for regression testing and model calibration.

**Best fit:**
- **Primary:** Module 12, Lesson 12.2 "Testing with AI" (extend beyond unit/E2E)
- **Secondary:** Module 12, Lesson 12.3 "Error handling & resilient UX" (test each state)

**For kids:**
- Simplified: "Test data — make sure your app works with realistic data"
- Example: A few sample invoices, clients, and edge cases to test against
- Activity: Create 5–10 test fixtures for their capstone

**For adults:**
- Full version: Structured golden fixtures (JSON), fixture versioning, calibration workflows
- Example: A golden set of known-good Supabase records to test against
- Bonus: How to use golden fixtures to catch regressions (A/B test before/after)

**Action:** 
- Module 12, Lesson 12.2: Add subsection "Golden fixtures: known-good test data"
- Deliverable: Learners create a `golden/fixtures.json` for their capstone

---

## 7. MCP (Model Context Protocol) for External Systems

**Template concept:** Wire Claude to GitHub, Supabase, Vercel, Notion via MCP so it can read/act on those systems.

**Best fit:**
- **Primary:** Module 13, Lesson 13.2 "MCP setup: give Claude Code hands" (already partially here)
- **Secondary:** Module 13, Lesson 13.1 (extension mental model — MCP is one extension type)

**For kids:**
- Simplified: "Let Claude Code talk to your tools — GitHub, database, deployment"
- Activity: Set up GitHub MCP (read-only) so Claude Code can check PRs

**For adults:**
- Full version: Supabase MCP (schema + queries), GitHub MCP (PRs, issues), Vercel MCP (deploys), Notion MCP (tasks + decisions)
- Example: Wire learn-to-vibe-code's Supabase + GitHub + Vercel so Claude Code can deploy
- Bonus: MCP vs. CLI tradeoffs (MCP for interactive, CLI for scripted)

**Action:** 
- Module 13, Lesson 13.2: Already covers this well. Add a **worked example** (wire 3+ MCPs to a real project).
- Optional: Module 0 "stack map" could preview MCP as an extension point

---

## 8. .mcp.json (Shared MCP Configuration)

**Template concept:** Project-level .mcp.json so the team (or Claude Code agents) all see the same connected systems.

**Best fit:**
- **Primary:** Module 13, Lesson 13.2 "MCP setup" (already mentions .mcp.json)
- **Secondary:** Module 0 (infrastructure setup)

**For kids:**
- Simplified: "Team config file that says 'we all connect to GitHub, Supabase, Vercel'"
- Activity: Create a .mcp.json for their capstone

**For adults:**
- Full version: YAML or JSON format, scoped tokens, versioning, sharing with teammates
- Example: A real .mcp.json from a production project
- Bonus: How to keep it in sync without leaking secrets

**Action:** 
- Module 13, Lesson 13.2: Show a .mcp.json example as part of MCP setup
- Deliverable: Learners create a .mcp.json for their capstone if using MCP

---

## 9. Tool Contracts & Schema (Standardized Tool Output)

**Template concept:** All tools (CLI, agents, functions) output JSON matching a schema (status, artifacts, metrics, flags, needs_human).

**Best fit:**
- **Primary:** Module 11, Lesson 11.2 "The building blocks" → Lesson 11.5 "stable-interface pattern"
- **Secondary:** Module 13, Lesson 13.4 "Subagents" (subagents expect consistent tool output)

**For kids:**
- Simplified: "Make your tools predictable — they always return the same shape"
- Example: Every tool returns `{status, result, error}`
- Activity: Define a schema for one of their capstone tools

**For adults:**
- Full version: JSON Schema, tool versioning, error handling standards, machine-readable output
- Example: The template's agent_output.schema.json
- Bonus: How tool contracts enable composition (pipe one tool's output to another)

**Action:** 
- Module 11, Lesson 11.5: Add subsection "Tool contracts: stable, machine-readable output"
- Module 13, Lesson 13.4: Mention tool contracts when building subagents

---

## 10. Secrets Management (.env, .gitignore)

**Template concept:** Never commit secrets; use environment variables; git-ignore .env files.

**Best fit:**
- **Primary:** Module 9, Lesson 9.2 "Protect your secrets first" (already covers this)
- **Secondary:** Module 7, Lesson 7.3 "Auth & RLS" (where secrets first matter)
- **Reinforced:** Module 12, Lesson 12.5 "Security hardening"

**For kids:**
- Already covered in Module 9. Reinforce: "Never push API keys to GitHub — they're like passwords."
- Activity: Check .gitignore in their capstone project

**For adults:**
- Already covered in Module 9. Add depth in Module 12: Vercel env vars, secret rotation, audit logs.
- Example: How learn-to-vibe-code's Supabase keys are protected
- Bonus: Secret scanning tools (GitHub's built-in, third-party)

**Action:** 
- Module 9, Lesson 9.2: Already good. Consider adding subsection "Verifying .gitignore is correct"
- Module 12, Lesson 12.5: Mention secret scanning and rotation

---

## 11. Database Migrations (db/migrations/)

**Template concept:** Versioned, deterministic schema changes that can be replayed from scratch.

**Best fit:**
- **Primary:** Module 7, Lesson 7.2 "Schema & Queries" (where learners design schema)
- **Secondary:** Module 12, Lesson 12.1 "Production-ready means..." (maintainability)
- **Secondary:** Module 13 (automation runs migrations)

**For kids:**
- Simplified: "Keep a record of your database changes, so you can replay them"
- Activity: Write one migration for their capstone (pseudocode okay)

**For adults:**
- Full version: Supabase migrations (SQL files), naming convention (001-init.sql, 002-add-users.sql), rollback strategy
- Example: A real migration from learn-to-vibe-code (add RLS to invoices table, add index on user_id)
- Bonus: When and how to run migrations in production (blue-green deploy, backward compatibility)

**Action:** 
- Module 7, Lesson 7.2: Add subsection "Versioning your schema with migrations"
- Deliverable: Learners write 1–2 migrations for their capstone schema changes

---

## 12. Notion MCP + /sync-notion Workflow

**Template concept:** Keep Notion (tasks, decisions, specs) in sync with the repo via Claude Code automation.

**Best fit:**
- **Primary:** Module 13, Lesson 13.2 "Notion as your project's source of truth"
- **Secondary:** Module 3, Lesson 3.2 "Planning with AI" (learners create plans in Notion, then keep them current)

**For kids:**
- Simplified: "Use Notion to track your tasks; let Claude Code keep it updated as you build"
- Activity: Create a Notion task board for their capstone, wire up MCP

**For adults:**
- Full version: Notion database schema (Tasks, Decisions, Features), sync workflow, append-only decisions log
- Example: A real Notion setup from a production project (learn-to-vibe-code could adopt this)
- Bonus: Notion as the operational hub — specifications, rubrics, learner records (for accreditation)

**Action:** 
- Module 13, Lesson 13.2: Already covers Notion MCP. Add a **worked example** (wire Notion for capstone tracking).
- Module 3, Lesson 3.2: Suggest learners plan in Notion, link to Module 13's /sync-notion workflow for keeping it current

---

## Summary: What to Add & Where

### Immediate (high-impact additions):

1. **Module 0:** Introduce CLAUDE.md, .mcp.json as part of "project governance" in the stack overview
2. **Module 3:** Add decisions.md activity (learners create and maintain throughout the course)
3. **Module 9:** Add BRANCHING.md subsection (naming + workflow)
4. **Module 12:** Add subsections:
   - Configuration discipline (config/ vs .env)
   - Golden fixtures (test data)
   - Tool contracts (stable output schemas)
5. **Module 13:** Enhance existing coverage with **worked examples** for CLAUDE.md, .mcp.json, Notion sync

### Extend (optional, rich):

6. Module 11: Mention CLI tools as a tool type
7. Module 13, Lesson 13.3: Create a "ship-feature" skill that includes BRANCHING.md + workflow
8. Capstone: Optional extension (learners build a CLI tool or Notion sync workflow)

### For kids vs. adults:

- **Kids:** Simplified vocabulary, smaller scope (5-rule CLAUDE.md, basic decisions, simple config)
- **Adults:** Full production patterns, examples from real projects, audit/compliance angles

---

**Next step:** Pick one module to enhance first, or shall I dive deeper into a specific piece?
