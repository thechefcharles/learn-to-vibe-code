# Screenshot manifest (v2 module numbering)

Three capture tiers:
- **auto (Playwright)** — app UI on localhost, via `node scripts/screenshots.mjs` (signs in as a seeded demo user; desktop 1280×800 + a 375px mobile pass for Module 6).
- **auto (MCP)** — logged-in dashboards, GitHub web, error overlay, MCP auto-deploy, captured with the chrome-devtools MCP.
- **manual** — native desktop/terminal only (Cursor, Claude Code terminal, editor merge conflict, Lighthouse); see `MANUAL-TODO.md`.

| filename | module | what it shows | tier | done |
|---|---|---|---|---|
| m00/m00-01-nextjs-starter.png | 0 | Next.js starter at localhost:3000 | auto (Playwright) | ✅ |
| m00/m00-terminal-versions.png | 0 | terminal version checks (node/npm/git) | manual | ✅ |
| m00/m00-cursor-welcome.png | 0 | Cursor welcome screen | manual | ✅ |
| m01/m01-same-prompt-twice.png | 1 | same prompt run twice → two different outputs (nondeterminism) | manual | ✅ |
| m01/m01-hallucination.png | 1 | illustrative confident hallucination (fake `chunk()`), labeled as an example | manual | ✅ |
| m02/m02-mockup-source.png | 2 | the UI mockup handed to the AI (pairs with m02-image-prompt) | asset | ✅ |
| m02/m02-image-prompt.png | 2 | AI recreating the mockup as code (image → code) | manual | ✅ |
| m02/m02-weak-vs-strong-1-weak.png | 2 | weak prompt output (pairs with the strong one) | manual | ✅ |
| m02/m02-weak-vs-strong-2-strong.png | 2 | strong/detailed prompt → fuller, accessible output | manual | ✅ |
| m02/m02-refinement.png | 2 | flawed output → feedback → fixed (iterate with the AI) | manual | ✅ |
| m04/m04-01-clients-table.png | 4 | /clients table (mock rows) | auto (Playwright) | ✅ |
| m04/m04-02-create-form.png | 4 | /clients/new create form | auto (Playwright) | ✅ |
| m04/m04-cursor-cmdk-diff.png | 4 | Cursor Cmd+K inline diff | manual | ✅ |
| m04/m04-cursor-at-mention.png | 4 | Cursor @-mention menu | manual | ✅ |
| m04/m04-cursor-composer-diff.png | 4 | Cursor Composer multi-file diff | manual | ✅ |
| m04/m04-cursor-agent-mode.png | 4 | Cursor Agent mode running / destructive-command approval prompt | manual | ✅ |
| m05/m05-01-invoices-table.png | 5 | /invoices list (mock) | auto (Playwright) | ✅ |
| m05/m05-02-invoice-form.png | 5 | /invoices/new form | auto (Playwright) | ✅ |
| m05/m05-claude-welcome.png | 5 | Claude Code welcome in terminal | manual | ✅ |
| m05/m05-claude-plan-mode.png | 5 | plan mode showing a proposed plan | manual | ✅ |
| m05/m05-claude-md.png | 5 | CLAUDE.md open in the editor | manual | ✅ |
| m05/m05-claude-permission.png | 5 | permission (allow/deny) prompt | manual | ✅ |
| m05/m05-claude-multifile-diff.png | 5 | multi-file diff | manual | ✅ |
| m06/m06-01-clients-styled.png | 6 | styled /clients (desktop) | auto (Playwright) | ✅ |
| m06/m06-02-clients-mobile.png | 6 | /clients at 375px (responsive) | auto (Playwright) | ✅ |
| m06/m06-03-invoices-mobile.png | 6 | /invoices at 375px (responsive) | auto (Playwright) | ✅ |
| m06/m06-claude-design-home.png | 6 | Claude Design "What will you design today?" home | manual | ✅ |
| m06/m06-claude-design-prototype.png | 6 | a Claude Design generated prototype | manual | ✅ |
| m07/m07-01-signed-out.png | 7 | app signed-out (login page) | auto (Playwright) | ✅ |
| m07/m07-02-signed-in-clients.png | 7 | signed-in /clients (live data) | auto (Playwright) | ✅ |
| m07/m07-supabase-api-keys.png | 7 | Supabase API keys | auto (MCP) | ✅ |
| m07/m07-supabase-table-editor.png | 7 | Supabase Table Editor (clients rows) | auto (MCP) | ✅ |
| m07/m07-supabase-auth-users.png | 7 | Supabase Auth users | auto (MCP) | ✅ |
| m07/m07-supabase-rls-policy.png | 7 | RLS policies (clients + invoices) | auto (MCP) | ✅ |
| m08/m08-01-error-overlay.png | 8 | Next.js dev error overlay | auto (MCP) | ✅ |
| m08/m08-debugging-chat.png | 8 | a debugging chat (live AI session) | manual | ✅ |
| m09/m09-01-github-repo.png | 9 | GitHub repo (public) | auto (MCP) | ✅ |
| m09/m09-02-pr-diff.png | 9 | PR files-changed diff | auto (MCP) | ✅ |
| m09/m09-merge-conflict.png | 9 | a merge conflict in the editor | manual | ✅ |
| m10/m10-01-live-clients.png | 10 | live /clients on the public Vercel URL | auto (MCP, prod) | ✅ |
| m10/m10-vercel-import.png | 10 | Vercel import (New Project) screen | auto (MCP) | ✅ |
| m10/m10-vercel-env.png | 10 | Vercel env vars settings | auto (MCP) | ✅ |
| m10/m10-vercel-deployments.png | 10 | Vercel deployments / CI-CD history | auto (MCP) | ✅ |
| m10/m10-vercel-preview-link.png | 10 | PR Vercel preview deployment link | auto (MCP) | ✅ |
| m10/m10-supabase-prod-auth-urls.png | 10 | Supabase prod Site URL + redirects | auto (MCP) | ✅ |
| m11/m11-01-approval-queue.png | 11 | overdue-reminder human-approval queue | auto (Playwright) | ✅ |
| m12/m12-01-loading.png | 12 | /clients?state=loading skeleton | auto (Playwright) | ✅ |
| m12/m12-02-empty.png | 12 | /clients?state=empty | auto (Playwright) | ✅ |
| m12/m12-03-error.png | 12 | /clients?state=error + retry | auto (Playwright) | ✅ |
| m12/m12-04-tests.txt | 12 | unit + E2E test run output | auto | ✅ |
| m12/m12-lighthouse.png | 12 | Lighthouse / axe panel | manual | ✅ |
| m13/m13-01-automated-pr-deploy.png | 13 | MCP-driven PR merged + auto-deploy | auto (MCP) | ✅ |
| m13/m13-mcp-list.png | 13 | `claude mcp list` | manual | ✅ |
| m13/m13-skill-install.png | 13 | SKILL.md / skill install | manual | ✅ |
| m13/m13-plugin-install.png | 13 | `/plugin install` | manual | ✅ |
| m13/m13-notion-checklist.png | 13 | a Notion feature-checklist page (Notion MCP) | manual | ✅ |
| m14/m14-architecture-summary.png | 14 | AI architecture summary + file tree of the brownfield repo | manual | ✅ |

**Module 1–2 lesson figures** are now captured and in the table above (live-AI sessions).
The `m01-hallucination` shot is a clearly-labeled *illustration* (no real model would confidently
invent `Array.prototype.chunk()` — Opus and Haiku both correctly flagged it).

_Archived: `_alt/` holds three raw plan-mode captures (extra scroll positions of the Module 5 plan)._
