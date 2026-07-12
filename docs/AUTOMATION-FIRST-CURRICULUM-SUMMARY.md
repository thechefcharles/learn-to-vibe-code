# Automation-First Curriculum Refactoring

**Status:** ✅ Complete  
**Date:** 2026-07-12  
**Scope:** 9 modules reframed (0, 3, 4, 6, 7, 9, 10, 12, 14)  
**Core Change:** From manual tasks → Claude Code/Cursor orchestration  

---

## What Changed

The entire curriculum now teaches learners to **direct Claude Code and Cursor as their automation tools** rather than performing manual CLI/setup tasks. **Understanding stays the same; method changes.**

### The New Learning Model

**Before:** 
- "Go to nodejs.org, download, run installer"
- "Write SQL migrations manually"
- "Create branches with git commands"
- "Write tests manually"

**After:**
- "Prompt Claude Code: 'Set up my dev environment'"
- "Prompt Claude Code: 'Generate Postgres schema from my spec'"
- "Prompt Claude Code: 'Create a feature branch and commit'"
- "Prompt Claude Code: 'Generate tests, then I verify they're correct'"

---

## Module-by-Module Changes

### ✅ Module 0: Setup & Accounts (Reframed)
**What changed:**
- Lesson 0.2: "Download Node.js from website" → "Prompt Claude Code to orchestrate environment setup"
- Lesson 0.5: "Run `npx create-next-app` manually" → "Prompt Claude Code to scaffold project, run dev server, show live URL"

**Learning outcome:** Learners still understand what each tool does; they just don't click installers.

**Example prompt learners use:**
```
"Set up my dev environment for this course:
1. Install Node.js LTS
2. Verify Cursor and Claude Code installations
3. Create a Next.js 16 app called 'invoice-tracker'
4. Start the dev server and confirm it's live at localhost:3000"
```

---

### ✅ Module 3: Planning with AI (Reframed)
**What changed:**
- Lesson 3.2: "Write spec manually" → "Prompt Claude Code to interview you, generate spec.md"
- Lesson 3.3: "Draft data model and screens manually" → "Prompt Claude Code to generate technical plan from spec"
- Lesson 3.4: "Manually sequence tasks" → "Prompt Claude Code to generate ordered task breakdown with dependencies"
- "Recording decisions" section: Now frames decisions.md as auto-logged from Claude Code prompts, not manually written

**Learning outcome:** Spec, data model, and task order are produced the same way; learner reviews and refines instead of authoring from scratch.

**Example prompt:**
```
"Help me plan my app. Ask me questions about:
1. What problem does your app solve?
2. Who uses it?
3. What are 3–5 core features?
4. What's out of scope?
5. How do you know it works?

Then draft spec.md, propose a data model, and generate a task breakdown."
```

---

### ✅ Module 4: Building in Cursor (Reframed)
**What changed:**
- Lesson 4.4: "Incremental Cmd+K edits for small changes" → "Full-feature prompts to Cursor Composer for cohesive feature builds"
- Added guidance: When to use Tab (autocomplete), Cmd+K (one block), Composer (whole feature)

**Learning outcome:** Learners understand Cursor as a tool they direct toward full features, not just a line-by-line autocomplete.

**Example prompt:**
```
"Build the clients feature end-to-end:
- Create types/client.ts with Client type
- Build app/clients/page.tsx as a server component with shadcn/ui Table
- Build app/clients/create/page.tsx as a form
- Use TypeScript for full type safety"
```

---

### ✅ Module 5: Claude Code (Unchanged)
**Status:** Already aligned with automation-first approach; no reframing needed.

This module already teaches directing Claude Code toward orchestration goals (agentic workflow).

---

### ✅ Module 6: Design & UX (Reframed)
**What changed:**
- Lesson 6.4: "Manually style every page with Tailwind" → "Prompt Claude Code to apply design direction end-to-end"
- Activity: "Design application" is now "Direct Claude Code to implement design principles, then review and refine"

**Learning outcome:** Learners understand design principles (hierarchy, spacing, typography, color) and direct Claude Code to apply them; they don't manually write every CSS class.

**Example prompt:**
```
"Apply professional design to the invoice-tracker's clients and invoices pages:
- Use shadcn/ui components
- Implement 8px spacing scale
- Add clear hierarchy (page title, section headers)
- Make it responsive (stack on mobile)
- Review against design principles"
```

---

### ✅ Module 7: Supabase & Data + Auth (Reframed)
**What changed:**
- Lesson 7.2: Added callout to use Claude Code for boilerplate ("ask Claude Code to set up Supabase browser and server clients")
- Lesson 7.3 (NEW): **"Model your data with Claude Code"** — Prompt Claude Code to generate Postgres schema from spec.md
- Lesson 7.5-7.6: "Write RLS policies manually" → "Prompt Claude Code to generate RLS policies, then test with two accounts"

**Learning outcome:** Learners understand data modeling, auth sessions, RLS; they direct Claude Code to generate the SQL and boilerplate, then verify it works.

**Example prompt:**
```
"Set up Supabase for the invoice-tracker:
1. Generate migrations: clients and invoices tables with user_id, foreign keys, timestamps
2. Enable Row Level Security
3. Create RLS policies: allow only if auth.uid() = user_id
4. Wire the app to Supabase using @supabase/ssr
5. Update app/clients/page.tsx to fetch from Supabase"
```

---

### ✅ Module 8: Reading & Debugging (Minimal change)
**Status:** Already well-aligned; learners own the verification; AI assists.

Minor emphasis: This skill applies *especially* to AI-generated code (you must read it critically).

---

### ✅ Module 9: Git & GitHub (Reframed)
**What changed:**
- Lesson 9.2: "Manually run `git init`, `git add .`, `git commit`" → "Prompt Claude Code to orchestrate Git initialization and push"
- Lesson 9.3: "Manually create branches and commit" → "Prompt Claude Code to manage feature branch workflow (create branch, make changes, commit, push)"
- Branch naming convention moved up as a callout (learners still follow the pattern; Claude Code enforces it)

**Learning outcome:** Learners understand Git concepts (commits, branches, PRs, history) and professional workflow; Claude Code automates the CLI commands and writes clear commit messages.

**Example prompt:**
```
"Ship the invoice-status filter feature:
1. Create a feature branch named 'add-invoice-status-filter'
2. Make the code changes [describe feature]
3. Commit with a conventional message
4. Show me the diff and commit message
5. Prepare to open a PR"
```

---

### ✅ Module 10: Vercel Deployment (Reframed)
**What changed:**
- Lesson 10.2: "Manually import repo and deploy" → "Prompt Claude Code (with Vercel MCP) to deploy, configure env vars, verify live app"
- Lesson 10.3: "Manually add env vars in Vercel settings" → "Prompt Claude Code to configure environment variables and redeploy"
- Lesson 10.5: "Manually configure Supabase auth URLs" → "Prompt Claude Code to set Site URL and redirect URLs in Supabase"

**Learning outcome:** Learners understand CI/CD flow (push → build → deploy), env vars, production auth configuration; Claude Code automates the UI/CLI work via Vercel MCP.

**Example prompt:**
```
"Deploy the invoice-tracker to Vercel:
1. Import the GitHub repo
2. Add environment variables
3. Trigger a deploy and show me the live URL
4. Configure Supabase Auth for production
5. Verify the app works end-to-end"
```

---

### ✅ Module 11: Agent Workflows (Unchanged)
**Status:** Already the apex of automation-first; no reframing needed.

This module already teaches: learners design workflows, Claude Code builds them, learners own reliability.

---

### ✅ Module 12: Production-Ready (Reframed)
**What changed:**
- Lesson 12.2: "Write tests manually" → "Prompt Claude Code to generate unit + E2E tests, you verify they test the right thing"
- Lesson 12.3: "Add error states manually" → "Prompt Claude Code to add loading/empty/error states, you verify they work"
- Lesson 12.4: "Manually audit security" → "Prompt Claude Code to audit (RLS, env vars, input validation), you verify findings"
- Lesson 12.5: "Manually run Lighthouse/axe" → "Prompt Claude Code to run audits and fix top issues, you verify improvements"

**Learning outcome:** Learners understand testing, error handling, security, a11y, performance; Claude Code generates and audits; learners verify (this is non-negotiable).

**Example prompt:**
```
"Harden the invoice-tracker for production:
1. Generate Vitest tests for business logic (cover edge cases)
2. Generate Playwright E2E test: sign up, create client, create invoice, mark paid
3. Add loading/empty/error states to pages
4. Audit security: RLS, env vars, input validation, agent permissions
5. Run Lighthouse and axe, report issues, fix top 3 a11y problems"
```

---

### ✅ Module 13: Automating Your Dev Pipeline (Unchanged)
**Status:** Already the culmination of the automation-first vision; no reframing needed.

Claude Code is the automation engine. Learners configure tools, guardrails, and workflows; Claude Code operates the full pipeline.

---

### ✅ Module 14: Brownfield (Reframed)
**What changed:**
- Lesson 14.2: "Manually orient in repo" → "Prompt Claude Code to map codebase architecture, generate summary doc, you verify"
- Lesson 14.3: "Manually trace bugs" → "Prompt Claude Code to search codebase, trace code path, identify root cause, you verify"
- Lesson 14.4: "Manually make scoped changes" → "Prompt Claude Code to fix bug and implement feature, you verify it's scoped and minimal"

**Learning outcome:** Learners understand brownfield dynamics (existing patterns, risk assessment, scope discipline); Claude Code accelerates orientation and tracing; learners own the verification and decision-making.

**Example prompt:**
```
"Orient me in this unfamiliar codebase:
1. Summarize the repo: what does it do, what's the stack, main modules?
2. Create architecture.md with summary, folder diagram, entry points
3. Trace the 'search by author' feature: how does input flow, where's the bug?
4. Identify root cause and propose a fix
5. Assess blast radius: what else depends on this code?"
```

---

### ✅ Module 15: Tooling Landscape (Unchanged)
**Status:** Already about judgment and comparison; no method-based reframing needed.

This module teaches *how to choose* tools — the highest-order skill that outlasts any stack.

---

## The Unifying Pattern Across All Modules

| Stage | Before | After | Learning Outcome |
|-------|--------|-------|------------------|
| **Setup/Boilerplate** | "Download, install, run command X" | "Prompt Claude Code to orchestrate setup" | Still understand *what* and *why*; just don't click installers |
| **Code Generation** | "You type code, AI autocompletes lines" | "You direct Claude Code to build features, you review diffs" | Still read and own every line; just use higher-level prompts |
| **Planning/Docs** | "Write manually (spec, tasks, decisions)" | "Claude Code drafts, you review and refine" | Still own the thinking; Claude Code handles repetition |
| **Testing/Audits** | "Write tests manually, audit manually" | "Claude Code generates/audits, you verify findings" | Still develop judgment; Claude Code accelerates detection |
| **Verification** | "Assume what you wrote works" | "Always verify (test, review, audit) before shipping" | **Non-negotiable:** you own the final quality |

---

## Key Principles

### 1. **Understanding Doesn't Change**
Learners still grasp:
- What RLS means and why it's the security boundary
- Why branching matters for isolation
- How responsive design works
- What tests verify
- How to assess risk in brownfield code

The *method* shifts from manual to orchestrated; the *understanding* stays deep.

### 2. **Verification is Non-Negotiable**
Every auto-generated artifact is reviewed:
- Tests: Do they check the right thing?
- Migrations: Do they match the spec?
- Commits: Do they convey intent?
- Audits: Are the findings real?
- Designs: Do they follow principles?

Learners never ship what they can't explain.

### 3. **Guardrails Grow with Automation**
As automation increases (Modules 10, 12, 13), guardrails become critical:
- Permissions (what can the agent do?)
- Hooks (what needs human approval?)
- Tests (what proves it works?)

**Rule:** Automate the reversible, gate the irreversible.

### 4. **Judgment Compounds Across Modules**
- **Module 1:** When to trust vs. verify AI output
- **Module 2:** How to prompt precisely
- **Module 3:** How to plan before building
- **Module 8:** How to read unfamiliar code
- **Module 12:** How to assess production-readiness
- **Module 14:** How to assess risk in brownfield
- **Module 15:** How to choose tools for a scenario

Each module deepens the ability to *direct* AI rather than just use it.

### 5. **Skills Outlast Tools**
Learners learn: prompting, planning, reading code, verification, risk assessment.
Not: how to use *this version* of Claude Code.

When Claude Code updates or a new tool emerges, the skill transfers.

---

## Capstone Implications

**Authentic capstone:**
- **Instead of:** "Build an app from a spec" (follow the course path)
- **To:** "Direct Claude Code/Cursor to build your app, then verify, review, and defend every piece" (orchestrate and verify)

**Oral defense tests judgment:**
- "Explain this feature. Why those data-modeling choices? Why RLS? How did you verify it works?"
- These questions apply equally whether the learner typed the code or directed Claude Code.
- The *understanding* is what matters.

---

## Migration Path for Instructors

### Phase 1 (Modules 0–3): Setup + Planning Automation
- Emphasize Claude Code as the environment orchestrator
- Teach specification as a prompt-driven process with Claude Code

### Phase 2 (Modules 4–10): Code + Deployment Automation
- Shift in-editor coding from "you type, AI autocompletes" to "you direct, Claude Code implements"
- Teach Vercel deployment as orchestrated via Claude Code + MCP

### Phase 3 (Modules 11–13): Orchestration + Guardrails
- Learners build confidence in automation with safety
- Emphasize: configure once, automate thereafter

### Phase 4 (Modules 14–15): Generalization
- Brownfield and landscape challenge learners to apply skills to unfamiliar contexts
- Reinforce judgment: you direct, Claude Code assists, you verify

---

## Refrain for Learners

**"You are the engineer; Claude Code is the assistant. You direct, review, and verify every line you ship."**

This principle is baked into every module. Automation magnifies leverage; verification ensures safety.

---

## Summary of Commits

```
76c6c4b refactor(module-0): reframe setup to automation-first with Claude Code orchestration
57df468 refactor(module-3): reframe planning to be Claude Code-orchestrated
13dd00b refactor(module-4): shift to full-feature prompts instead of incremental edits
b1ebae6 refactor(module-6): reframe styling to Claude Code-driven design application
6badfa8 refactor(module-7): reframe Supabase setup to Claude Code orchestration
7f9378b refactor(module-9): reframe Git workflow to Claude Code orchestration
a4e4cc8 refactor(module-10): reframe Vercel deployment to Claude Code + Vercel MCP
0834074 refactor(module-12): reframe hardening to Claude Code generation + learner verification
c1ef600 refactor(module-14): reframe brownfield to Claude Code mapping + assisted tracing
```

---

## Ready for Launch

The curriculum now teaches learners to **orchestrate AI as their primary tool** while maintaining rigorous ownership of understanding and verification. Every module explicitly frames Claude Code/Cursor as the automation engine and the learner as the director, reviewer, and decision-maker.

**Learning outcomes remain unchanged; method modernized.**
