# Claude Code Project Setup Reference

## 🚀 IMMEDIATE ACTION

**Read this first:**

You've been given a project setup reference guide. This document will help standardize your project's Claude Code configuration (CLAUDE.md, settings.json, skills, agents, hooks) based on your project's specific needs.

**Here's what happens next:**

1. **Answer 15 questions** about your project below
2. **I'll read your answers** and use them to customize recommendations
3. **I'll generate/update your setup files** (CLAUDE.md, settings.json, suggested skills/agents)
4. **I'll explain each change** and commit them to git

This takes 15-20 minutes and ensures your project is optimized for Claude Code automation.

**Ready? Fill in the questionnaire below:**

---

## PHASE 1: Project Information Questionnaire

**Answer these questions about your project. Your answers will guide what goes into CLAUDE.md, settings.json, skills, and agents.**

Fill in the following:

### Project Basics
1. **Project name:** _________________________
2. **What does it do? (one sentence)** _________________________
3. **Who are the users/customers?** _________________________
4. **Current phase:** (Early / MVP / Scaling / Mature / Maintenance)

### Technology
5. **Frontend:** (React/Vue/Svelte/Next.js/etc., or N/A)
6. **Backend:** (Node.js/Python/Go/etc., or N/A)
7. **Database:** (PostgreSQL/MongoDB/Supabase/etc., or N/A)
8. **Deployment:** (Vercel/AWS/Docker/etc.)

### Team & Work
9. **Team size:** (Solo / 2-3 / 4-10 / 10+)
10. **Collaboration model:** (Solo / pair programming / async / standup meetings)
11. **Current blockers/pain points:** _________________________

### Architecture & Constraints
12. **Locked principles** (non-negotiable rules, max 3):
    - _________________________
    - _________________________
    - _________________________

13. **Key security concerns:** (auth/payments/data privacy/compliance/etc.)

14. **Testing strategy:** (unit/integration/E2E/none yet?)

15. **Deployment frequency:** (continuous/weekly/monthly/on-demand)

---

## ✅ AFTER YOU'VE FILLED IN THE QUESTIONNAIRE

**Share your answers above. I will:**

1. Review your current `.claude/CLAUDE.md` and `settings.json`
2. Compare against best practices (sections below)
3. Generate customized recommendations for:
   - **CLAUDE.md sections** based on your domain (questions 2-3, 11-13)
   - **settings.json hooks** based on your tech stack (questions 5-8, 14)
   - **skills/** recommendations based on deployment needs (question 15)
   - **agents/** suggestions based on security concerns (question 13)
4. Create/update your files with these changes
5. Commit with explanations of each change

**The sections below are your reference guide. I'll use them to customize your setup.**

---

---

## Overview

A well-configured Claude Code project uses structured metadata files and automated workflows to:
- Communicate project context clearly to AI assistants
- Enforce permissions and guardrails
- Automate repetitive tasks (testing, linting, secret scanning)
- Track progress and manage complex workflows
- Enable reproducible, scalable development

This reference documents the canonical structure and best practices, customized to your answers above.

---

## Directory Structure

```
project-root/
├── .claude/
│   ├── CLAUDE.md                    # Project context & instructions
│   ├── settings.json                # Claude Code configuration
│   ├── PROJECT-SETUP-REFERENCE.md   # This file
│   ├── skills/                      # Project-specific skills
│   │   └── [skill-name]/SKILL.md
│   └── agents/                      # Project-specific agents
│       └── [agent-name]/agent.md
├── CLAUDE.md                        # (optional) root-level copy for visibility
└── [project files...]
```

---

## CLAUDE.md — Project Context & Instructions

**Purpose:** The single source of truth for project context, constraints, and instructions. Loaded automatically into every Claude Code session in this project.

**Location:** `.claude/CLAUDE.md` (required); optionally also at root level for visibility in IDE.

**What to Put In Each Section** (based on your answers above):

### What We're Building
Use **question 2 & 3**: "What does it do?" + "Who are the users?"

Example:
```
A web platform for [question 2]. Users include [question 3].
Core value: [why they care].
```

### Locked Principles
Use **question 12**: Your non-negotiable constraints.

Example:
```
1. [your principle 1]
2. [your principle 2]
3. [your principle 3]
These override defaults and guide all architecture decisions.
```

### Data Model
Describe key entities from your project.

Example (based on your domain):
```
| Entity | Purpose | Key fields |
|--------|---------|-----------|
| [entity] | [what it does] | id, created_at, [fields] |
```

### Security & Access Rules
Use **question 13**: Your key security concerns.

Example:
```
## [Your concern 1]
[How you handle it: server-side only, RLS policies, env vars, etc.]

## [Your concern 2]
[Implementation approach]
```

### Routes & Features
Use your current phase (question 4) and blockers (question 11).

Example:
```
**Phase 1: MVP (Current)**
- `/dashboard` ✓ done
- `/api/data` ⏳ in progress
- `/admin` ❌ blocked (needs permissions design)
```

### Testing & Deployment
Use **question 8 & 15**: Your deployment platform and frequency.

Example:
```
**Local:** npm run dev (port 3000)
**Test:** npm run test (using [your test framework])
**Deploy:** [your deployment platform] (pushes to [frequency])
**Env vars:** [list needed vars]
```

### Open Decisions
Document unresolved choices from **question 11** (blockers).

Example:
```
| Question | Default | Scope |
|----------|---------|-------|
| [your blocker] | TBD | [what it affects] |
```

### Complete Template

```markdown
# [Answer Q1: Project Name]

## What We're Building
[Answer Q2 & Q3: What it does, who uses it]

## Locked Principles
- [Answer Q12a: Principle 1]
- [Answer Q12b: Principle 2]
- [Answer Q12c: Principle 3]

## Data Model
[Draw from your domain: entities, relationships, access control]

## Security & Access Rules
[Answer Q13: Address each concern]

## Routes & Features
[Based on Q4 current phase and Q11 blockers]

## Key Files & Locations
[Map your codebase structure]

## Testing & Deployment
- Local: [Answer Q8 frontend/backend setup]
- Test: npm run [your test command]
- Deploy: [Answer Q15 deployment platform and frequency]
- Env vars: [list them]

## Open Decisions
[Use Q11: What's blocking you?]

## Next Steps
[What's next based on your phase]
```

**Best Practices:**
- Keep it up-to-date as the project evolves
- Use exact values (commit hashes, URLs, numbers) for reproducibility
- Link to external docs (design specs, API docs) but keep CLAUDE.md self-contained
- Use past tense for completed work, present for in-progress, future for planned
- Never include secrets (keys, tokens, passwords)

---

## .claude/settings.json — Configuration & Automation

**Purpose:** Configure Claude Code behavior—permissions, defaults, and automated workflows.

**Location:** `.claude/settings.json` (required).

**What to Customize** (based on your answers):

### name & description
Use **question 1 & 4**: Project name and current phase.

Example:
```json
"name": "[Q1: Project Name] — [Q4: Current Phase]",
"description": "[Q2: What it does, one line]"
```

### permissions
Defaults for any project—adjust based on **questions 8 (tech stack) & 15 (deployment frequency)**:

- **Frontend projects (React/Vue/Next.js):** Add `"Bash(npm run build|npm start)"`
- **Backend projects:** Add `"Bash(npm start|python server.py)"`
- **If deploying continuously (Q15):** Keep git push in `ask_first` (require confirmation)
- **If deploying rarely:** Move git push to `deny` to prevent accidental pushes

Example customization:
```json
"auto_allow": [
  "Bash(npm test|npm run lint|npm run type-check)",
  "Bash(git status|git log|git diff)",
  "Read(.*)"
],
"ask_first": [
  "Bash(git commit|git push|git merge)",
  "Bash(npm run build)"  // if Q8 is frontend
],
"deny": [
  "Bash(rm -rf|git reset --hard|git clean -fd)",
  "Bash(.*delete.*prod.*)"
]
```

### hooks
Pre-commit checks based on **question 8 (tech stack)** and **question 14 (testing strategy)**:

**For Node.js/TypeScript projects:**
```json
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "npm run lint && npm run type-check || exit 1"
      }
    ]
  }
]
```

**For Python projects:**
```json
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "python -m pytest tests/ --tb=short || exit 1"
      }
    ]
  }
]
```

**If you have E2E tests (Q14):**
Add a post-hook:
```json
"PostToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "npm run test:e2e 2>/dev/null && echo '✓ E2E passed' || echo '⚠ E2E warnings'"
      }
    ]
  }
]
```

### context
Always include these:
```json
"context": {
  "instructions": "./.claude/CLAUDE.md — project context",
  "skills": "./.claude/skills/ — custom workflows",
  "agents": "./.claude/agents/ — specialized subagents"
}
```

**Sections:**

### `permissions`
Controls what Claude Code can and cannot do without asking.

- `auto_allow`: Safe operations (read, view diffs, run tests)
- `ask_first`: Potentially risky (commits, pushes, deployments)
- `deny`: Forbidden (destructive operations, prod deletes)

**Format:** Tool name followed by regex pattern of allowed operations.

Examples:
```json
"Bash(npm test|npm run lint)"        // Allow npm test and npm run lint
"Read(.*)"                           // Allow reading any file
"Bash(git (push|merge))"             // Allow git push and git merge
"Bash(.*rm.*-rf)"                    // Deny recursive deletes
```

### `hooks`
Automated commands that run before/after tool use.

- `PreToolUse`: Run checks before executing (linting, type-checking, secret scanning)
- `PostToolUse`: Run cleanup or verification after (logging, tests)

**Structure:**
```json
"[HookName]": [
  {
    "matcher": "ToolName|OtherTool",  // Which tools trigger this
    "hooks": [
      {
        "type": "command",
        "command": "shell command to run"
      }
    ]
  }
]
```

**Common hooks:**

Pre-commit checks:
```json
"command": "npm run lint && npm run type-check && ./scripts/scan-secrets.sh || exit 1"
```

Post-test verification:
```json
"command": "npm test -- --coverage && echo 'Tests passed'"
```

### `context`
Pointers to project-specific guidance (optional but recommended).

---

## .claude/skills/ — Custom Workflows

**Purpose:** Reusable workflow automations specific to your project.

**Location:** `.claude/skills/[skill-name]/SKILL.md`

**Skills to Consider** (based on your answers):

### For all projects:
**deploy** (if Q15: deployment frequency is weekly or more)
- Use **question 8** (deployment platform): "Deploy to [platform]"
- Steps: test → build → deploy → verify
- Trigger: `/deploy` or `/deploy staging`

### For frontend projects (if Q5 includes React/Next.js/Vue):
**test-ui** (if Q14: testing strategy includes E2E)
- Steps: start dev server → run E2E tests → report results
- Trigger: `/test-ui`

**build-and-check** 
- Steps: build bundle → check bundle size → run type-check
- Trigger: `/build-and-check`

### For backend projects (if Q6 includes Node.js/Python/etc):
**lint-and-test**
- Steps: lint → type-check → run unit tests → report coverage
- Trigger: `/lint-and-test`

**database-migrate** (if Q7 includes PostgreSQL/MongoDB/etc)
- Steps: backup → run migration → verify schema → rollback if failed
- Trigger: `/database-migrate`

### Based on your concerns (Q13):
**If payment handling:** `process-payment-test` (safe test transactions)  
**If user auth:** `test-auth-flows` (verify login/signup/2fa)  
**If data privacy:** `audit-data-access` (check RLS policies, log access)

**Example custom skill structure:**

```markdown
---
name: [your-workflow-name]
description: [What it does, one sentence]
---

# [Your Workflow Title]

[What this does and why you run it]

## Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Usage

```bash
/[your-workflow-name]
```

## When to use

[When this is useful]
```

**When to create a skill:**
- Multi-step workflows you run frequently
- Domain-specific knowledge (deployment process, testing strategy)
- Sequences that benefit from step-by-step narration

**When NOT to create a skill:**
- One-off commands
- Simple shell scripts (just document in CLAUDE.md)
- Generic operations (npm test, git commit—use Bash directly)

---

## .claude/agents/ — Specialized Subagents

**Purpose:** Define custom agent types for complex, multi-step tasks requiring specialized reasoning.

**Location:** `.claude/agents/[agent-name]/agent.md`

**Agents to Consider** (based on your answers):

### For all projects:
**code-reviewer** (if Q4: mature phase or scaling)
- Review code for bugs, performance, and adherence to CLAUDE.md principles
- Use case: `/code-review` before merging

### Based on tech stack (Q5 & Q6):
**frontend-auditor** (if Q5: React/Next.js/Vue)
- Audit for: accessibility (WCAG), performance (Core Web Vitals), UX consistency
- Use case: Review new UI components

**database-auditor** (if Q7: PostgreSQL/MongoDB/etc)
- Audit for: N+1 queries, missing indexes, data consistency, RLS policies
- Use case: Review data layer changes

### Based on concerns (Q13):
**security-auditor** (if Q13 mentions: auth, payments, data privacy, compliance)
- Audit for: OWASP Top 10, injection, auth bypasses, data leaks, secrets
- Use case: Review before production deployment

**performance-auditor** (if Q13 mentions: scale, latency, throughput)
- Audit for: slow queries, inefficient algorithms, memory leaks, bundle size
- Use case: Investigate performance regressions

**accessibility-auditor** (if Q5: frontend, or compliance-heavy domain)
- Audit for: WCAG AA/AAA compliance, keyboard nav, screen reader, color contrast
- Use case: A11y regression testing

### Example agent structure:

```markdown
---
name: [agent-name]
description: [Specialize in what? One sentence]
model: opus  // use for complex reasoning
---

# [Agent Title]

This agent specializes in: [what they're good at]

## Instructions

1. [Task 1]
2. [Task 2]
3. [Task 3]
4. Report findings as: [JSON / structured list / severity + fix]

## Tools available

- Read files
- Grep for patterns
- Git history review
```

**When to create an agent:**
- Specialized skills (security, performance, accessibility)
- Tasks that benefit from a different model (slower but more capable)
- Work that should be isolated from main session context

**Don't create an agent for:**
- Simple linting or formatting (use hooks instead)
- Workflows that don't need judgment (use skills instead)

---

## Best Practices

### Keep CLAUDE.md up-to-date
Every time the project state changes significantly (phase complete, major feature added, security policy updated), update CLAUDE.md. Stale context is worse than none.

### Permissions: least privilege
- Only auto-allow what's genuinely safe
- Require confirmation for anything that could affect others (commits, pushes)
- Use deny rules to prevent catastrophic mistakes

### Hooks: fast and focused
- Pre-hooks should fail quickly (linting, type-checking, secret scanning)
- Post-hooks should verify success (tests, coverage checks)
- Keep commands short; complex logic goes in scripts

### Skills vs. agents vs. bash
| Task | Use |
|------|-----|
| Run tests | Bash directly |
| Deploy to staging | Skill (multi-step, domain knowledge) |
| Security audit code | Agent (requires judgment, specialized knowledge) |
| Parse JSON | Bash + tool |

### Secrets management
- Never store secrets in CLAUDE.md, settings.json, or git
- Use `.env.local` (gitignored) for local development
- Document where secrets go (env vars on CI/CD, vault service, etc.)

### Document decisions, not just features
In CLAUDE.md, explain WHY architectural choices were made. This helps future Claude Code sessions understand the reasoning behind trade-offs.

---


---

## Checklist for Complete Setup

Use this to audit your project:

- [ ] `.claude/CLAUDE.md` exists and is up-to-date (completed phases, current blockers, next steps)
- [ ] `CLAUDE.md` includes: What We're Building, Locked Principles, Data Model, Security Rules, Routes, Key Files, Testing/Deployment, Next Steps
- [ ] `.claude/settings.json` has clear permission boundaries (auto_allow, ask_first, deny)
- [ ] Pre-commit hooks in settings.json (lint, type-check, secret scan)
- [ ] All secrets are in `.env.local` or CI/CD vars, not in git
- [ ] `.claude/skills/` has 1-3 domain-specific workflows (documented, tested)
- [ ] `.claude/agents/` has specialized agents for complex tasks (security audit, performance review, etc.)
- [ ] Project root has a README.md with quick start instructions
- [ ] Recent commits reference CLAUDE.md principles in their messages
- [ ] All external dependencies (APIs, services, databases) are documented in CLAUDE.md

---

## Resources

- [Superpowers: Writing Plans](https://claude.com/docs/skills/writing-plans) — comprehensive implementation planning
- [Superpowers: Subagent-Driven Development](https://claude.com/docs/skills/subagent-driven-development) — orchestrating parallel work
- [CLAUDE.md Best Practices](https://claude.com/docs/claude-code/claude-md) — detailed guide

---

**Last updated:** 2026-07-17  
**Created for:** Learn to Vibe Code platform  
**Generalized for:** Any Claude Code project
