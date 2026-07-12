# VibeCode Project Setup Template — Curriculum Integration Complete ✅

**Date:** 2026-07-12  
**Scope:** 5 modules enhanced with project governance, configuration management, and testing patterns  
**Commits:** 5 feature commits implementing all changes

---

## What Was Added

### Module 0: Setup & Accounts
**Lesson 0.6** — Project governance (~20 min)
- Introduced CLAUDE.md (project constitution)
- Introduced decisions.md (decision log)
- Introduced .mcp.json (shared MCP configuration)
- For kids: simplified vocabulary, small scope
- For adults: full governance pattern with rationale

**Why:** Sets expectations early that even first projects benefit from three lightweight governance documents.

**Commit:** (committed earlier in this session)

---

### Module 3: Planning Software with AI
**New section** — Recording decisions as you plan (~200 words)
- Added decisions.md as an ongoing deliverable
- Explained why recording decisions prevents re-deciding
- Showed example format (simple for kids, timestamped for adults)
- Deliverable: submit decisions.md with spec and plan

**Why:** While planning, learners make important architectural choices. Recording them creates an audit trail and teaches decision discipline.

**Commit:** (committed earlier in this session)

---

### Module 7: Supabase & Data + Auth
**Lesson 7.7** — Configuration vs. Secrets (~300 words)
- Distinguishes config (things you change) from secrets (credentials you never share)
- Examples: `config.yaml` stores API_URL; `.env` stores API_KEY
- Shows red flags for identifying secrets
- Links to Vercel production deployment patterns
- For kids: simple distinction with examples
- For adults: full .env lifecycle + Vercel secrets management

**Why:** Production-readiness starts here—separating config from secrets is non-negotiable.

**Commit:** `6e96666 feat(Module 7): add configuration vs secrets lesson`

---

### Module 9: Git & GitHub
**Lesson 9.3** — Branch naming convention & BRANCHING.md (~400 words)
- Introduced pattern: `<type>/<description>` (feature/, fix/, docs/, refactor/)
- Explained why readable branches keep history clear
- Added deliverable: create BRANCHING.md documenting the pattern
- For kids: simple examples (feature/add-filter, fix/typo)
- For adults: full workflow + governance pattern

**Why:** Clean branch names scale to team collaboration and make history readable.

**Commit:** (committed earlier in this session)

---

### Module 11: AI Agent Workflows
**Lesson 11.2** — Building Blocks: CLI Tools (~150 words)
- Expanded "tools" to include CLI scripts, not just functions
- Explained how agents invoke executables and scripts
- Examples: `./scripts/backup.sh`, `npm run build`
- Connected to Claude Code's tool execution model

**Why:** Agents are tool-agnostic—they can call functions, APIs, or CLI commands. This unlocks automation patterns.

**Commit:** `5c4839a feat(Module 11): expand building blocks to include CLI tools`

---

### Module 12: Production-Ready Software
**Lesson 12.1** — Three new subsections (~1000 words total)

#### 12.1a Configuration Discipline (~300 words)
- Separate config/ files (sources.yaml, thresholds.yaml) from .env secrets
- Why: Versioned config can change in production; secrets never do
- Examples: theme colors in config, API keys in .env
- Vercel deployment pattern: secrets via dashboard, config via git
- For kids: 2-3 config files, simple distinction
- For adults: full lifecycle, audit, rotation

**Deliverable:** Extract 2-3 hardcoded values from capstone into config/

#### 12.1b Golden Fixtures (~250 words)
- Known-good test data versioned in golden/ directory
- Purpose: regression testing + model calibration
- Example: golden/invoices.json with realistic edge cases
- When a test fails, update the fixture and re-run
- For kids: 5-10 test fixtures
- For adults: versioning, calibration workflows, regression detection

**Deliverable:** Create golden/fixtures.json for capstone data

#### 12.1c Tool Contracts (~250 words)
- Standardized output schema for tools and agents
- Format: `{status, result, error, metrics, artifacts, needs_human}`
- Why: composable tools, predictable errors, machine-readable output
- Example: a tool that always returns this shape
- For kids: basic schema (success/error)
- For adults: JSON Schema, versioning, error handling standards

**Deliverable:** Define a schema for one capstone tool

**Commit:** `362e4d7 feat(Module 12): add configuration discipline, golden fixtures, and tool contracts`

---

### Module 13: Automating Your Dev Pipeline with Claude Code
**Lesson 13.2a** — MCP Configuration: Worked Example (~200 words)
- Concrete example: wiring GitHub + Supabase + Vercel MCPs to invoice-tracker
- Step-by-step commands: `claude mcp add supabase`, `claude mcp add github`, etc.
- Verification: `claude mcp list`
- Use case: Claude Code can now read schema, check PR status, deploy
- Clarifies MCP (interactive read/act) vs CLI (versioned scripting)

**Why:** Learners see how the template actually works in practice.

**Commit:** `130483d feat(Module 13): add worked example of MCP configuration`

---

### Module 14: Working in Existing Codebases (Brownfield)
**Lesson 14.2** — Orienting in Unknown Repos: Read Decisions (~100 words)
- If a repo has decisions.md or DECISION_LOG.md, read it first
- Explains why architectural choices were made (SQL vs NoSQL, which framework, etc.)
- Prevents fighting the codebase; accelerates understanding
- Example: "Why is auth built-in? Because we chose Supabase for RLS."

**Why:** Understanding *why* code is structured a certain way prevents well-intentioned but wrong refactors.

**Commit:** `6cbc607 feat(Module 14): add guidance on reading decisions.md in brownfield repos`

---

## Impact Summary

### What This Enables

**For learners:**
- Understand that "write code" ≠ "ship software"
- Learn to govern projects from day one (even a capstone)
- Practice decision discipline and configuration management
- Test more rigorously (golden fixtures, tool contracts)

**For the platform:**
- Modules now teach the full development lifecycle, not just coding
- Governance patterns appear organically in sequence, not as an afterthought
- Capstone rubric can now include: clear CLAUDE.md, decisions.md, BRANCHING.md, golden fixtures

**For accreditation:**
- decisions.md becomes an audit trail (why did we make this choice?)
- Configuration discipline demonstrates production-readiness
- Tool contracts show understanding of system boundaries

### Curriculum Map

| Concept | Primary Module | Secondary | Purpose |
|---------|---|---|---|
| CLAUDE.md | Module 0, 13 | — | Project constitution |
| decisions.md | Module 3 | Module 14 | Decision audit trail |
| BRANCHING.md | Module 9 | — | Branch governance |
| Config vs. Secrets | Module 7 | Module 12 | Security + maintainability |
| CLI Tools | Module 13 | Module 11 | Automation building block |
| Golden Fixtures | Module 12 | — | Regression testing |
| Tool Contracts | Module 12 | Module 11 | System boundaries |
| MCP Setup | Module 13 | Module 0 | Claude Code automation |

---

## Deliverables Added (For Capstone Rubric)

Each learner now submits:

**Module 0:** (conceptual only)

**Module 3:**
- Spec + technical plan (existing)
- + decisions.md (5–10 decisions, why you made each choice)

**Module 9:**
- Git repo with clean history (existing)
- + BRANCHING.md documenting naming convention

**Module 12:**
- Tests (unit/integration/E2E, existing)
- + config/ directory with 2–3 extracted values
- + golden/fixtures.json with test data
- + at least one tool with a defined output contract

**Module 16 (Capstone):**
- Working app (existing)
- + CLAUDE.md (project rules)
- + decisions.md (updated throughout course)
- + BRANCHING.md (branch strategy)
- + config/ (extracted hardcoded values)
- + golden/ (test fixtures)
- + tools with defined contracts

---

## How to Use This

### For instructors:
- Mention these documents early (Module 0) so learners know to create them
- In Module 3, start the decisions.md deliverable immediately
- Check capstone submissions for well-governed projects
- Use decisions.md as evidence of thoughtful architecture

### For learners:
- Create CLAUDE.md for your capstone (3–5 rules)
- Keep decisions.md updated as you build
- Create BRANCHING.md to document your branch naming
- Extract config into config/ (don't hardcode thresholds, URLs, etc.)
- Create golden fixtures as you write tests
- Define tool output contracts as you build automation

### For the accreditation audit:
- decisions.md = proof of deliberate choices
- CLAUDE.md = proof of governance
- golden fixtures = proof of rigorous testing
- tool contracts = proof of system understanding

---

## Next Steps

1. **Update capstone rubric** to include these governance documents
2. **Add checkpoint quizzes** in Modules 7, 11, 12 about configuration, tools, fixtures
3. **Sample solutions** for Module 12 (golden fixtures + tool contracts)
4. **Kids curriculum review** — verify simplified language and scope are appropriate
5. **Test with a cohort** — ensure the flow feels natural, not prescriptive

---

## Commits Reference

```bash
6e96666 feat(Module 7): add configuration vs secrets lesson
5c4839a feat(Module 11): expand building blocks to include CLI tools
362e4d7 feat(Module 12): add configuration discipline, golden fixtures, and tool contracts
130483d feat(Module 13): add worked example of MCP configuration
6cbc607 feat(Module 14): add guidance on reading decisions.md in brownfield repos
```

---

**Status:** ✅ Complete. All 5 modules enhanced, 5 commits, curriculum ready for Phase 9 iteration.
