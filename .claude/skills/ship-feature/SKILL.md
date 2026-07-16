---
name: ship-feature
description: Standard steps to ship a feature end-to-end: branch, code, test, commit, PR, deploy
---

# Ship a Feature (Accredited Vibe Coding Course — Module 13)

Use this skill to take a feature from code to production with full automation and guardrails.

## The Pipeline

**1. Plan & Branch**
- Create a new git branch named for the feature: `feat/module-name` or `fix/issue-name`
- Run `git checkout -b <branch-name>`

**2. Code + Test**
- Write code and tests (TDD: test first)
- Run `npm run test:unit` to verify unit tests pass
- Run `npm run test:e2e` to verify E2E tests pass (requires dev server running)
- Don't proceed if tests fail

**3. Commit (with Pre-commit Hook)**
- Stage changes: `git add <files>`
- Commit with conventional message: `git commit -m "feat: <description>"`
- The pre-commit hook automatically runs:
  - `npm test` (all tests)
  - `./scripts/scan-for-secrets.sh` (security check)
- Commit blocks if tests fail or secrets detected

**4. Create Pull Request**
- Push to remote: `git push origin <branch-name>`
- Create PR via `gh pr create --title "feat: <title>" --body "<description>"`
- Assign the read-only `reviewer` subagent to check the diff
- Review bot reports findings (must fix Critical/Important)

**5. Merge & Deploy**
- After approval, merge to `main`: `git merge --squash <branch-name>`
- Push: `git push origin main`
- GitHub Actions (`.github/workflows/test.yml`) automatically:
  - Runs full test suite (`npm run test:unit && npm run test:e2e`)
  - On success, Vercel auto-deploys to production
- Monitor Vercel logs via `vercel logs` or the Vercel MCP

**6. Verify in Production**
- Check the live site at www.learntovibecode.io
- If deploy fails, Claude reads Vercel logs and suggests fixes

## When to Use

- Shipping a new lesson, feature, or bugfix
- Any change that touches the course content, code, or data
- Every commit should follow this flow (it's automated after step 3)

## Guardrails

| Action | Auto-Allow | Require Approval |
|--------|-----------|------------------|
| Run tests | ✅ Yes (pre-commit hook) | — |
| Read logs | ✅ Yes (debugging) | — |
| Merge to `main` | — | ✅ Always (human review) |
| Deploy to production | ✅ Yes (on merge) | — (gate at merge instead) |
| Delete data | — | ✅ Always |

## Tools Used

- **Git** — version control
- **Bash** — running tests and commits
- **GitHub** (via `gh` CLI or GitHub MCP) — create PRs, merge
- **Vercel MCP** — monitor deploys
- **Subagent `reviewer`** — automated code review
