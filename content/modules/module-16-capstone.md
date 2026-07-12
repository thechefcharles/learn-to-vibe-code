# Module 16: Capstone Project

## Capstone Objective

Independently **design, build, deploy, and defend** a production-ready full-stack application. *(Bloom: Create + Evaluate — the top of the ladder.)*

This is the final practical exam. You will demonstrate mastery of the entire course stack and justify every architectural decision you make.

> **Why a capstone (not a multiple-choice final):** a credential is only credible if graduates can demonstrably do the job. Building and defending a real, deployed app — and explaining every decision — is the proof employers and accreditors actually trust.

## What You'll Build

A working, deployed, multi-user web application on the course stack (Next.js + Supabase + Vercel, built with Cursor/Claude Code, version-controlled on GitHub). It must be **your own project**, not a tutorial exercise — reusing the invoice tracker from the lessons is not permitted, though the same patterns absolutely should be applied.

## Requirements (each maps to a rubric criterion)

- **Real functionality** — solves a genuine use case with core features that work end to end.
- **Data persistence** — a Postgres data model in Supabase with at least two related tables.
- **Authentication** — users can sign up and log in.
- **Authorization** — Row Level Security so each user sees only their own data (verified with two accounts).
- **Deployed live** — a public Vercel URL with GitHub-driven CI/CD; production auth configured.
- **Version control** — a GitHub repo with meaningful commit history and at least one pull request; no secrets committed.
- **Tested** — automated tests on core logic, including at least one end-to-end test.
- **Resilient UX** — loading, empty, and error states on the main screens.
- **Professional design** — a clean, consistent UI (not generic/AI-looking) that works on mobile; a component library is fine.
- **Accessible & performant** — keyboard/labels/contrast basics and reasonable Core Web Vitals.
- **Deliberate AI workflow** — evidence of intentional Cursor/Claude Code use.
- **Oral defense** — you can explain the code and justify your decisions and alternatives.

## Suggested Project Options

You may pick your own idea (approved for scope) or choose from these:

- **Personal habit tracker** — users log habits and see streaks.
- **Small-business booking app** — clients book time slots; owner sees a schedule.
- **Reading list / bookmarks manager** — save, tag, and filter items.
- **Simple expense tracker** — categorize expenses and see monthly totals.

Each is intentionally scoped like the invoice tracker: small enough to finish in the timeframe, rich enough to exercise every requirement.

## Deliverables

1. **Live URL** — the deployed, working app.
2. **GitHub repo** — source with clean history and a README (what it is, how to run it).
3. **Short write-up** — one page: what it does, the stack choices and *why* (referencing alternatives), and known limitations.
4. **Oral defense** — a short live walkthrough where you explain decisions and answer questions.

## Governance & Decision Documentation

Submit the following alongside your code and oral defense:

### 1. **decisions.md** (hand-written, authentic)

Your log of 3–5 major decisions you made throughout this project.

For each decision, document:
- **What you decided** (the choice you made)
- **Why** (the reasoning; you can reference Module 0 for decision-making framework)
- **Alternatives considered** (what else you thought about)

This is YOUR record, not AI-generated. Reflect on the actual choices you made.

**Example:**
```
## Decision 1: Chose Supabase over Prisma ORM

**What:** Supabase for data layer instead of Prisma + separate PostgreSQL

**Why:** Supabase includes Auth + RLS, which handles both data persistence and 
per-user security in one package. Reduces boilerplate compared to Prisma + manual auth.

**Alternatives:** Firebase (easier auth, but vendor lock-in), Prisma + custom auth 
(more control, more work), Planet Scale (serverless MySQL, but no native auth).

**Confidence:** High. RLS is the core security model taught in Module 7; Supabase 
lets us use it directly without a middleware layer.
```

### 2. **CLAUDE.md** (can start AI-generated, then customize)

Your project's constitution: rules, conventions, and guardrails.

Must include:
- **Secret management policy:** How you handle API keys and credentials (Module 0 / Module 12.5 reference)
- **Testing expectations:** What must be tested before shipping (Module 12.2 reference)
- **Deployment gates:** What checks must pass before deploying to Vercel (Module 12 reference)
- **AI workflow rules:** How you used Cursor vs. Claude Code, and when you verified their output
- **Source of truth:** Which files are versioned (repo) vs. knowledge (Notion) — Module 0.7 reference

You can ask Claude Code to generate a draft CLAUDE.md based on your project. Then review it, edit it, make it yours.

**Example structure:**
```markdown
# CLAUDE.md — Invoice Tracker Project Constitution

## Secret Management
- All API keys live in `.env.local` (gitignored, never committed)
- Vercel env vars injected at deploy time
- Zero secrets in code; all checked via pre-commit linting

## Testing
- All new features require unit + integration tests
- Test coverage must stay > 80%
- E2E tests for critical user flows (login, invoice creation, deletion)

## Deployment Gates
- All tests must pass (CI/CD enforcement)
- Lighthouse audit score > 90
- Security audit (RLS policies enabled on all tables)
- Performance: LCP < 2.5s, INP < 200ms

## AI Workflow
- Used Cursor for in-editor code generation and autocomplete
- Used Claude Code for multi-file orchestration (migrations, tests, infrastructure)
- Verified every generated piece before merging

## Source of Truth
- Repository: code, tests, migrations, CLAUDE.md, decisions.md, config/
- Notion: team onboarding, architectural research, design explorations
```

### 3. **.mcp.json** (if Module 13 automation attempted)

If you automated any part of your pipeline (bonus criterion), document which MCP servers you wired and why.

Example:
```json
{
  "github": {
    "enabled": true,
    "reason": "Automated PR creation, branch management"
  },
  "supabase": {
    "enabled": true,
    "reason": "Automated schema migrations, data generation"
  },
  "vercel": {
    "enabled": true,
    "reason": "Automated deployment, environment variable setup"
  }
}
```

Include a brief explanation in your submission of what each MCP connection automates and why you configured it that way.

### Reference Module 12 Production Readiness

Before you submit your capstone, complete the **Module 12 production-readiness checklist** (13 points). Include it in your CLAUDE.md or as a separate production-checklist.md:

- [ ] Tests written and passing (unit + integration + E2E)
- [ ] Error handling added (loading, empty, error states)
- [ ] Security audited (RLS, env vars, input validation)
- [ ] Accessibility tested (keyboard nav, screen readers, contrast)
- [ ] Performance audited (LCP, INP, CLS; Lighthouse > 90)
- [ ] All secrets in environment variables, not hardcoded
- [ ] Configuration files extracted from code
- [ ] Deployable to production without manual steps
- [ ] Rollback procedure documented
- [ ] Monitoring + alerting in place
- [ ] Documentation complete (README, CLAUDE.md, decisions.md)
- [ ] One-account and two-account security testing done
- [ ] Team/contributor onboarding guide created

**Verification:** If all 13 checks pass, you've met the production-ready standard. This is your proof of readiness.

## Effort & Timeline

The proctored practical exam is budgeted at **~8 contact hours**, with additional independent build time expected beforehand. Suggested flow:

1. Spec + data model (Module 3) — 1 hour
2. Build with AI (Modules 4–5) — 5 hours
3. Design/UX (Module 6) — 1.5 hours
4. Wire Supabase + auth + RLS (Module 7) — 1 hour
5. Test, secure & harden incl. a11y/performance (Module 12) — 1 hour
6. Deploy (Module 10) — 0.5 hour
7. Prepare governance artifacts (decisions.md, CLAUDE.md) — 1 hour
8. Prepare the defense — 1 hour

## How It's Graded

Scored against the rubric below — 10 core criteria plus an optional automation bonus. **Passing = "Meets (2)" or higher on every criterion AND total ≥ 80%.** Any "Does Not Meet (0)" on a core criterion is an automatic fail regardless of total.

*The Bonus criterion (pipeline automation, Module 13) is optional: it does not count toward the pass threshold and can never lower a score — it lets advanced learners earn distinction.*

| Criterion | Does Not Meet (0) | Approaching (1) | Meets (2) | Exceeds (3) |
| --- | --- | --- | --- | --- |
| **Functionality / requirements** | App doesn't run or misses core requirements | Runs but key features broken/incomplete | All required features work as specified | All features plus polished UX and extra scope |
| **Data, auth & security (Supabase)** | No working data layer or auth | Data/auth works but insecure (e.g. no RLS) | Correct data model, working auth, RLS enforced | Robust schema, thorough authorization, edge cases handled |
| **Code quality & maintainability** | Disorganized, unreadable, no structure | Works but messy, little structure | Clean, organized, reasonably documented | Idiomatic, well-structured, clearly documented |
| **Version control (GitHub)** | No repo or single dump commit | Repo exists, poor history | Meaningful commit history, branches/PRs used | Clean history, good PR hygiene, collaboration-ready |
| **Deployment (Vercel + CI/CD)** | Not deployed | Deployed manually / broken CI/CD | Live on Vercel with working GitHub CI/CD | CI/CD plus preview deploys, env config, custom domain |
| **Effective AI workflow use** | No evidence of deliberate AI use or decisions documented | Ad-hoc AI use; CLAUDE.md/decisions.md missing or generic | Deliberate, documented use of Cursor/Claude Code; decisions.md reflects actual choices made; CLAUDE.md documents secret management, testing, and deployment gates; can explain which tools you used and why | Sophisticated, well-documented workflow (MCP configuration if Module 13 bonus attempted); decisions.md shows deep thinking on tradeoffs; CLAUDE.md is thorough and enforced throughout project |
| **Testing & error handling** | None | Minimal / superficial | Key paths tested, errors handled gracefully | Strong coverage, robust error and edge-case handling |
| **Design & UX** | Looks broken or unstyled | Functional but generic / AI-looking | Clean, consistent, professional-looking UI that works on mobile | Polished, thoughtful visual design |
| **Accessibility & performance** | Inaccessible; obvious performance problems | Gaps (missing labels, poor contrast, slow) | Keyboard/labels/contrast basics; reasonable Core Web Vitals | Strong a11y and performance, audited |
| **Oral defense / decision justification** | Cannot explain own code or choices; hand-waves on decisions | Explains some code and decisions; weak on tradeoffs and alternatives considered | Clearly explains architecture decisions (references decisions.md), articulates alternatives considered, justifies key trade-offs (stack, data model, automation choices); demonstrates ownership of every piece | Could mentor others; articulate on ALL major decisions and their constraints; demonstrates deep understanding of why choices matter; can explain reasoning even for delegated tasks |
| **Bonus: pipeline automation (optional)** | Not attempted | Basic MCP/CLI use shown | Automates part of the pipeline with guardrails | Full commit→PR→migrate→deploy→debug automation, safely gated |

*The "oral defense" and "AI workflow" criteria — especially backed by decisions.md and CLAUDE.md — are what make this a genuine competence check rather than a copy-paste exercise. You must justify decisions and demonstrate you understand code you produced with AI.*

## Bonus: Pipeline Automation (Optional)

Learners who completed **Module 13** may earn distinction by automating part of their pipeline (MCP/CLI-driven commit → PR → migrate → deploy → debug) with proper guardrails. This is scored on the optional bonus criterion and never counts against a learner who skips it.

## Integrity & AI Use

AI assistance is expected — this is an AI-assisted development course. But the work must be your own project and **you must understand and be able to explain every part you ship** (the course throughline). The oral defense is where that understanding is verified; inability to explain one's own code is an automatic fail on that criterion.

Your governance artifacts (decisions.md and CLAUDE.md) are proof of that understanding. They show you made deliberate choices and can articulate your reasoning.
