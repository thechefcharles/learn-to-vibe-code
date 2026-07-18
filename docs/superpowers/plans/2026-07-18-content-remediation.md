# Content Remediation Plan — Learn to Vibe Code

> Derived from the full content audit (4-cluster parallel deep-read, 2026-07-18).
> Goal: bring all 16 lesson modules from draft-state (avg 3.2/5) to publishable for an accredited-pending credential.

**Execution:** one implementer per module file (files are independent — safe to parallelize in waves). Cross-cutting tasks (brownfield repo, quiz file, CLAUDE.md) are separate. Review after each wave.

---

## Global Constraints (every task obeys these)

### G1. Canonical numbering scheme
- File `module-0N-*.md` → H1 **exactly** `# Module N: <title>` → lessons `N.1, N.2, …` → quiz IDs `QN-x`.
- **Lesson renumber per file:**
  | File | Current lesson prefix | → target |
  |---|---|---|
  | module-01 | 0.x | 1.x |
  | module-02 | 1.x | 2.x |
  | module-03 | 2.x | 3.x |
  | module-04 | 3.x | 4.x |
  | module-05 | 4.x | 5.x |
  | module-06 | 5.x | 6.x |
  | module-07 | 6.x | 7.x |
  | module-08 | 8.x | 8.x (keep) |
  | module-09 | 8.x | 9.x |
  | module-10 | 9.x | 10.x |
  | module-11 | 10.x | 11.x |
  | module-12 | 11.x | 12.x |
  | module-13 | 12.x | 13.x |
  | module-14 | 13.x | 14.x |
  | module-15 | 14.x | 15.x |
  | module-16 | 15.x | 16.x |
- **H1 fix (files 10–16 only; 1–9 already say the right number):** `Module 20→10, 21→11, 22→12, 23→13, 24→14, 25→15, 26→16`.
- **Cross-reference remap in prose:** `Module 20→10, 21→11, 22→12, 23→13, 24→14, 25→15, 26→16`. Modules 1–9 references stay as-is (already correct). There is NO Module 17–19 or 27+; if one is cited, resolve by the topic named in parentheses.
- De-dupe: kill duplicate lesson IDs (Module 3's two 2.5s → 3.5a/3.5 or merge), duplicate "Key takeaways" sections (merge into one at the true end), and any second H1.

### G2. Authoring-artifact removal (learner-facing cleanliness)
- Remove every `[SCREENSHOT PLACEHOLDER: …]` block **including its "what this screenshot should show" director notes**. Replace with the canonical figure placeholder the renderer supports (`[SCREENSHOT: <short alt text>]`) OR delete if non-essential. Standardize on the single `[SCREENSHOT: …]` syntax course-wide.
- Fix broken auto-links: `[CLAUDE.md](http://CLAUDE.md)` → plain `` `CLAUDE.md` ``; `[Continue.dev](http://Continue.dev)` → plain `Continue.dev`. Any `http://<BareName>` autolink → plain text.
- Fix broken image tags: `![m06-before-clients]` etc. (no path) → `[SCREENSHOT: …]` placeholder.
- Remove raw Notion export footer links (`…391f6ea8…md`, `app.notion.com/…`).
- Remove leftover authoring voice: "✅" self-check marks, "This delivers Objective N", instructor asides.
- Remove stray duplicate `---` rules and dangling `> ` blockquote closers.
- Move any lesson content that sits BELOW "Key takeaways"/footer back into body order (Modules 1, 6, 12).

### G3. Correct-command reference (use these exact facts when fixing technical errors)
- Claude Code context: `/context` (NOT `claude-c`).
- Claude Code plan mode: entered by pressing **Shift+Tab** to cycle modes (NOT `/plan`).
- Claude Code rewind: `/rewind` or double-press `Esc` (NO numeric argument like `/rewind 3`).
- Spokenly: a **native macOS app** (NOT web-based).
- Mac paste: **Cmd+V** (NOT Ctrl+V).
- Next.js default font: **Geist** (Inter is NOT a system default; it's a Google font you opt into).
- Whisper: takes a **local audio file**; to transcribe YouTube you must `yt-dlp` the audio first. There is no `npx whisper-cli <url>` one-liner.
- Supabase server client `setAll`: MUST be wrapped in try/catch (Server Components can't set cookies).
- Supabase server auth checks: use `supabase.auth.getUser()` (revalidates) NOT `getSession()` (trusts cookie).
- Supabase RLS: policies do nothing unless `alter table <t> enable row level security;` is run.
- Vercel AI SDK (current): tools defined with `tool({ inputSchema: z.object({…}), execute })`; multi-step agent loop needs `stopWhen`/`maxSteps`; use a current model id, not `claude-3-5-sonnet-20241022`.
- Secrets: never paste tokens into chat or into committed `.mcp.json`; use env vars / the MCP secret store.

---

## TIER 1 — Publish-blockers

### Task 1–16: Per-module remediation
Each task edits exactly one `content/modules/module-0N-*.md`. Every task applies **G1 + G2**, plus the module-specific fixes below.

- **M1 setup:** renumber objectives (currently 1,2,5,3,4 → 1–5); move lessons 0.6/0.7 above the "Key takeaways"/footer; fix `git secrets --register-aws`/CodeQL-as-secret-scanning framing (use Supabase/Stripe-relevant secret patterns); reconcile the 5432 vs 54321 port examples with a one-line note (54321 = Supabase local API, 5432 = raw Postgres); soften service-role-key-as-first-example.
- **M2 ai-fundamentals:** fix quiz→objective off-by-one mapping; reframe "AI can't access the internet in real-time" for the agentic 2026 context (base model doesn't *know* new facts, but the agent reads web/files/tools); quantify "context window" briefly; name temperature when saying "ask twice, get two answers"; fix the class-component "last year's pattern" claim.
- **M3 prompt-engineering:** REMOVE/repair `npx whisper-cli <youtube-url>` (yt-dlp + local file, or cut); Ctrl+V→Cmd+V; de-dupe the two Lesson 2.5s; reconcile "5 prompts" vs "6 prompts"; trim/relabel the competitor-video scraping tangent so it serves a stated objective or is cut.
- **M4 planning:** fix Module 24/26 refs (→14/16); fix "Module 1.7" dangling ref; reconcile the Notion-vs-repo rule with its own answer key (make routing consistent); trim scope note that infra-scaffolding belongs partly to tooling.
- **M5 cursor:** update `.cursorrules` → `.cursor/rules/*.mdc` as primary (note `.cursorrules` legacy); refs 21/26 → 11/16; give the agent-iterates-on-errors flow one concrete example.
- **M6 claude-code (2/5 — priority):** fix `claude-c`→`/context`, `/plan`→Shift+Tab, drop `/rewind 3` arg, fix Spokenly description; MOVE lessons 5.7/5.7b above the closing "Key takeaways" and merge the two takeaways sections; fold redundant SuperWhisper/screenshot content into one; add one real worked agentic-build round-trip (goal → plan → execute → verify with sample output).
- **M7 design-ux:** fix Inter-"system default" contradiction → Geist; fact-check/qualify "Claude Design" (mark as emerging/verify or genericize); fix broken `![m06-…]` image tags; restore the missing `## Tools & alternatives` header (orphaned prose); move 6.4b next to 6.4; ref 23→13.
- **M8 supabase (SAFETY — priority):** add try/catch to server client `setAll`; ADD a `middleware.ts` session-refresh example; teach `getUser()` vs `getSession()`; add `enable row level security` to the Lesson 8.0 todos example; add `TO authenticated` + `(select auth.uid())` to policies; fix auto-confirm dashboard path (Providers → Email, not Auth Policies → Email Templates); fix `sb_pub_xxx`/`sb_publishable_xxx` inconsistency; fix `catch (err) { err.message }` unknown-type TS bug; remove the "For kids/For adults" inline register break.
- **M9 debugging:** renumber 8.x→9.x; de-dupe the two Q8-1s and repair quiz→objective mapping; fix "halluci again" typo; add one annotated multi-frame stack trace; mention breakpoints/`debugger`/React DevTools alongside console.log; verify the middleware→proxy claim is stated correctly.
- **M10 git (BROKEN LAB — priority):** fix the conflict exercise so it ACTUALLY conflicts (add a second divergent commit on `main` after branching, before merge); add baseline `git status`/`git diff`/`git log` literacy; teach `git stash`/rebase where referenced; H1 20→10; add `git branch -M main` consistently (note repo default may be `master`).
- **M11 deploying:** H1 21→11; remove the token-pasting-into-chat/`.mcp.json` anti-pattern → env var / MCP secret store; merge near-duplicate lessons 10.3/10.4; pick ONE deploy path (MCP or dashboard) as primary; add "read Vercel build logs" as a first-class step; footer link → relative.
- **M12 agent-workflows (2/5 — priority):** H1 22→12; REWRITE the core to include a real runnable agent loop (current model id, `tool({inputSchema: z.object()})`, `stopWhen`/`maxSteps` so it loops, a full tool→agent→human-approval→tool round-trip with sample output); fold bolted-on 11.7 in properly; de-dupe the two "Key takeaways"; fix the AI SDK examples to current API.
- **M13 production-ready:** H1 23→13; reorder lessons to 13.1…13.7 sequential (12.5 currently after the rubric; no 12.4); reconcile "6 hours/essentials only" header with actual content/time math; mark the `config.yaml` example as illustrative-only and point to `process.env`+typed config; add one integration-test example; add one server-side validation (Zod) worked example.
- **M14 pipeline (FABRICATED CODE — priority):** H1 24→14; replace fictional `subagent("reviewer", {…})` with real Claude Code subagent invocation (or mark clearly as pseudocode); fix the `failureAction` hook schema to the real hooks schema; work the end-to-end pipeline lesson with actual output instead of 6 bullets; refs 21/22/23/26 → 11/12/13/16; keep the volatility "as of 2026" note.
- **M15 brownfield (depends on missing repo — see Task 17):** H1 25→15; flesh out lessons 14.5 (risk/blast-radius) and 14.6 (tech-debt) — each currently one paragraph — with a worked `grep`/find-references example; `print statements`→`console.log`/`debugger`; refs 20→10; ensure hands-on matches the repo shipped in Task 17.
- **M16 tooling-landscape (2/5 finale — priority):** H1 26→16 and remove the duplicate second H1; fix broken `Continue.dev` link; de-dupe the two `Q15-1`s; add one FULLY worked application of the 6-criterion framework (e.g., scored Supabase-vs-Firebase or a stack-for-scenario walkthrough) so the finale teaches a method; add a model/LLM-layer subsection (which model, cost/token) — conspicuously absent; date-stamp the alternatives table and qualify PlanetScale/Firebase/Copilot free-tier claims.

### Task 17: Create `brownfield-practice-repo/`
Module 15's hands-on references `brownfield-practice-repo/` with `TICKET.md`, `ANSWER-KEY.md`, `BUG-101`, `FEAT-102`. It does not exist. Create a minimal but real Next.js/TS practice repo with: a planted bug (BUG-101), a small feature ticket (FEAT-102), `TICKET.md`, `ANSWER-KEY.md`, and a README orienting the learner. Must align with what Module 15's lesson text instructs.

## TIER 2 — Credibility
Covered inline in the per-module tasks above (M6/M12 worked implementations, M15/M16 fleshed endings).

## TIER 3 — Polish + docs

### Task 18: `lib/quizzes.ts` audit
Verify question `id` strings don't collide; confirm every module 2–16 has ≥5 questions (Module 1 currently 3 — expand to 5–6 so the 80% gate isn't all-or-nothing on 3). Note Module "1" in the quiz file maps to course Module 1 — confirm keys align to the 1–16 route scheme.

### Task 19: Update `CLAUDE.md`
Fix stale claims: "3 MC questions per module (48 total)" → actual count; "retakes from shuffled pool" → the quiz serves all questions per attempt (either fix the doc or implement a real shuffled subset — doc fix for now). Note the numbering canonicalization done here.

---

## Progress Ledger
- [ ] Wave 1 (priority technical): M6, M8, M10, M12, M14, M16
- [ ] Wave 2 (remaining modules): M1, M2, M3, M4, M5, M7, M9, M11, M13, M15
- [ ] Task 17: brownfield-practice-repo
- [ ] Task 18: quizzes.ts
- [ ] Task 19: CLAUDE.md
- [ ] Final review pass
