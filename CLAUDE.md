# Learn to Vibe Code — Platform Documentation

## What We're Building

An interactive learning platform that delivers the **Accredited Vibe Coding Course** — a 16-module, ~93-hour accredited program (9.3 CEUs) that takes complete beginners to job-ready in AI-assisted full-stack development.

**Not an in-browser IDE.** Learners write code in their own Cursor/Claude Code instances. This platform **tracks progress, quizzes, grades, gamifies, and records** completion for accreditation purposes.

**The product is a credential.** Learners who pass (80%+ on quizzes + deliverables + capstone rubric pass) get a verifiable completion certificate.

---

## Locked Principles

1. **No in-browser IDE** — the app never runs learner code. It quizzes, tracks, grades, and links to real tools (Cursor, Claude Code, GitHub, Supabase, Vercel).

2. **Dogfood the course stack** — the platform itself is built with Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui · Supabase (auth/RLS/storage) · Vercel. We teach what we use.

3. **Gamified but credible** — XP/badges/streaks/sound for motivation, but sound OFF by default, honor `prefers-reduced-motion`, no dark patterns. It backs a professional credential that employers and accreditors trust.

4. **Grading data = accreditation records** — every quiz attempt, deliverable submission, and capstone score is stored and exportable (CSV/PDF) for CPD/IACET audits. This data is the proof-of-learning accreditors require.

5. **The platform models the course** — responsive design, full accessibility (WCAG, alt text on every figure, keyboard nav), performant (Core Web Vitals), tested (Vitest + Playwright E2E). We dogfood Modules 6 (Design/UX) and 12 (Production-Ready).

6. **Answer keys and rubric grading are server-side only** — quiz answer keys and capstone rubric scoring logic never expose to the client. Instructor-only fields in the DB use Row-Level Security (RLS) to enforce access control.

---

## Data Model (Supabase)

**Roles:** `learner`, `instructor` (admin).

**Tables (the accreditation records):**

| Table | Purpose | Key fields |
|-------|---------|-----------|
| `profiles` | User identity | id (uuid), name, email, role, created_at |
| `enrollments` | Enrollment status | user_id, enrolled_at, status |
| `module_progress` | Module completion | user_id, module_id, unlocked, completed_at |
| `checklist_items` | Module 0 readiness + Module 12 production checklist | user_id, module_id, item_key, checked |
| `quiz_attempts` | Quiz submissions | user_id, module_id, score (%), passed, attempt_no, taken_at |
| `deliverables` | Module deliverable submissions (Modules 0–14) | user_id, module_id, repo_url, live_url, auto_checks (jsonb), status, reviewed_by, notes, submitted_at |
| `capstone_submissions` | Capstone project + defense | user_id, repo_url, live_url, writeup, defense_video_url, rubric_scores (jsonb), result, graded_by, submitted_at |
| `badges` | Gamification: earned badges | user_id, badge_key, earned_at |
| `xp` | Gamification: XP points and level | user_id, points, level |
| `streaks` | Gamification: learning streaks | user_id, current, longest, last_active |
| `certificates` | Credential issuance | user_id, cert_id (unique), issued_at, url |
| `payments` (future) | Monetization tracking | user_id, provider, status, tier, amount, created_at |

**Auth:** Supabase email/password + optional OAuth.

**RLS:** Default-deny on all tables. Per-user policies allow learners to read/write only their own records. Instructor role can read all submissions/grades and export records.

**Unlock gates:** To unlock Module N+1:
- `quiz_attempts[user_id, module_id].score >= 80` AND
- `deliverables[user_id, module_id].status = 'approved'`

**Capstone unlock:** Available after Module 15 completion.

---

## Security & Access Rules

### Quiz Answer Keys (SERVER-SIDE ONLY)
- Questions shipped to client as JSON with `correctAnswer` omitted
- `quiz_attempts` endpoint scores server-side, never sends answers to client
- Answer key stored as instructor-gated server constant or DB field with RLS

### Capstone Rubric Grading (SERVER-SIDE ONLY)
- Rubric scoring form in the admin UI (instructor-only route)
- Scoring logic on the server; learners never see rubric scores until graded
- `capstone_submissions.rubric_scores` readable by learner only after grading complete

### Secrets (ENV VARS ONLY)
- `.env.local` (gitignored): Supabase URL, keys, Stripe keys
- Never commit secrets to git
- Production secrets in Vercel env vars

### Legal Drafts
- Terms of Service, Privacy Policy, Refund Policy in `business/` (pending attorney review before launch)
- Currently DRAFTS only; do not treat as final legal documents

---

## Content Architecture

### Single Source of Truth: `course-content/`
The authoritative course content lives in the **Accredited Vibe Coding Course** workspace at:
```
/Users/admin/Charlie Foreman/My Projects/Accredited Vibe Coding Course/course-content/
```

**Imported into this repo (and kept in sync):**
- **Lessons:** `course-content/modules/module-00-setup.md` … `module-15-tooling-landscape.md`
- **Quizzes:** `assessments/quiz-bank-and-answer-keys.md` (parsed into `/content/quizzes/`; answers server-only)
- **Capstone:** `capstone-brief.md`, `capstone-rubric.md`
- **Figures:** 59 screenshots from `vibe-coding-course-demo/screenshots/` → copied to `public/figures/`
- **Figures manifest:** `public/figures-manifest.json` (maps `[SCREENSHOT: ...]` placeholders → actual paths + alt text)

### Content Pipeline (Phases 3+)
1. **Markdown import:** `content/modules/*.md` rendered via `MarkdownRenderer.tsx`
2. **Figure resolution:** lesson renderer scans markdown for `[SCREENSHOT: ...]` placeholders, resolves via `figures-manifest.json`, renders `<img>` with alt text
3. **Graceful placeholders:** if a screenshot is missing, show a styled `[SCREENSHOT: needed]` callout (no broken images)

### Screenshot Sources (Reference App)
- **Auto-capturable** (Playwright + logged-in browser): app UI, dashboards, GitHub, Vercel, state variants
- **Manual only:** live AI sessions, Cursor/terminal UI, merge conflicts, Lighthouse reports, Claude Design, brownfield

See `/Accredited Vibe Coding Course/START-HERE/SCREENSHOTS.md` for capture workflow.

---

## Routes & Features (per Phase)

### Phase 1: Scaffold ✓
- `/` home/landing
- Dark mode + sound toggle (OFF by default)
- Base layout + header

### Phase 2: Auth & Data ✓
- `/login`, `/signup` (Supabase email/password)
- Profiles, enrollments, module_progress tables + RLS

### Phase 3: Content Pipeline ✓
- `/course` (course map)
- `/course/[module]` (lesson viewer, MarkdownRenderer, figures)
- `/demo` (no-auth course preview)

### Phase 4: Course Map & Lessons ✓
- `/course` shows all 16 modules + capstone
- Locked/unlocked states
- Deliverable checklist (interactive, saved to `checklist_items`)

### Phase 5: Quizzes ✓
- `/course/[module]/quiz`
- 3 MC questions per module (48 total)
- Server-side scoring (80% to pass, retakes from shuffled pool)
- Instant feedback, `quiz_attempts` records

### Phase 6: Deliverables & Unlock Gates ✓
- `/course/[module]/submit` (repo URL + live URL)
- Auto-checks: URL reachable, repo accessible, PR exists (SSRF-safe)
- `deliverables` table, auto/manual approval → unlock gate

### Phase 7: Gamification ✓
- `/dashboard` (resume, overall %, streak, badges, next action)
- XP + levels (Foundations → Building → Production → Landscape)
- Badges: first_quiz_passed, rls_locked_down, went_live, automation_engineer, capstone
- Streaks: consecutive-day activity
- Animated progress, sound + confetti (OFF by default, reduced-motion safe)

### Phase 8: Capstone & Admin ✓
- `/capstone` (brief, rubric view, submit form, defense video URL)
- `/admin/capstone-reviews` (instructor-only, grade against rubric, export records)
- Capstone unlock: available after Module 15

### Phase 9: Payments & Credential (NEXT)
- Stripe checkout (access tier / free with donations)
- Certificate generation (HTML → PDF, shareable)
- Legal pages (Terms, Privacy, Refund — pending review)

### Phase 10: Harden
- Vitest unit tests
- Playwright E2E (sign in → complete lesson → pass quiz → unlock next)
- A11y audit + fixes
- Performance (Core Web Vitals)
- Records export (CSV for CPD/IACET)

### Phase 11: Final
- `/about` (bio from `ebook/about-the-author.md`)
- `/support` (donate via PayPal + others)

---

## Open Decisions (Decide Before Phase 9)

**Blocking:** brand/name, pricing, credential approach

| Question | Default | Scope |
|----------|---------|-------|
| **Brand:** name, domain, logo, colors, typeface? | TBD | Blocks landing page, emails, certs |
| **Pricing:** one-time vs subscription vs tiers? Free trial? | TBD | Sets refund window, data model |
| **Credential:** DIY badge/PDF or Credly/Open Badges? | DIY PDF (MVP) | Phase 9 |
| **Oral defense:** async video or Cal.com live? | Async video (MVP) | Phase 8 |
| **Donate providers:** PayPal + which others? | PayPal + (Stripe, Buy Me a Coffee?) | Phase 11 |
| **Instructor:** solo or multiple graders? | Solo for MVP | Roles/permissions |

**Defaulted (override if disagree):**
- Stack = Next.js/Supabase/Vercel/shadcn
- Content = rendered markdown (no separate CMS for MVP)
- Self-paced only (cohorts later)
- Sound OFF by default

---

## Build Order (Phases)

See `/Accredited Vibe Coding Course/platform/MASTER-BUILD-PROMPT.md` for the full build plan.

**Completed (Phases 1–8):**
- Phase 1: Scaffold ✓
- Phase 2: Auth + data ✓
- Phase 3: Content pipeline ✓
- Phase 4: Course map + lessons ✓
- Phase 5: Quizzes ✓
- Phase 6: Deliverables + unlock gates ✓
- Phase 7: Gamification ✓
- Phase 8: Capstone + admin ✓

**Remaining:**
- Phase 9 ★ Payments + credential (STOP for open questions)
- Phase 10: Hardening
- Phase 11: Final (About + Donate)

---

## Key Files & Locations

**Course content (source of truth):**
```
/Users/admin/Charlie Foreman/My Projects/Accredited Vibe Coding Course/
├── course-content/
│   ├── modules/module-00-setup.md ... module-15-tooling-landscape.md
│   ├── learning-objectives.md
│   ├── capstone-brief.md
│   ├── capstone-rubric.md
│   └── overview.md
├── assessments/
│   ├── quiz-bank-and-answer-keys.md (answer keys stay server-side)
│   └── activity-materials-and-answer-keys.md
├── business/
│   ├── completion-and-credentialing-process.md
│   ├── learner-records-template.md
│   ├── terms-of-service-DRAFT.md
│   ├── privacy-policy-DRAFT.md
│   └── refund-policy-DRAFT.md
└── platform/ (design/spec docs)
```

**Platform repo:**
```
/Users/admin/Charlie Foreman/My Projects/learn-to-vibe-code/
├── content/modules/*.md (imported lessons)
├── lib/
│   ├── quizzes.ts (quiz questions + scoring logic)
│   ├── auth.ts (Supabase auth)
│   └── actions/ (server actions for sensitive ops)
├── public/
│   ├── figures/ (59 screenshots, organized by module)
│   └── figures-manifest.json (placeholder → image mapping)
├── app/
│   ├── page.tsx (home)
│   ├── course/ (lesson viewer + quizzes)
│   ├── dashboard/ (user progress)
│   ├── capstone/ (capstone submission)
│   ├── admin/ (instructor grading)
│   └── demo/ (public course preview)
└── CLAUDE.md (this file)
```

---

## Testing & Deployment

### Local Development
- **Start:** `npm run dev` (port 3008)
- **Tests:** `npm run test` (unit + E2E)
- **E2E:** `npx playwright test` (or `/test-and-verify` skill)
- **Type check:** `npm run type-check`
- **Lint:** `npm run lint`

### CI/CD Workflow

**Branch naming:**
- Feature: `feat/description` (new feature)
- Fix: `fix/description` (bug fix)
- Docs: `docs/description` (documentation)
- Refactor: `refactor/description` (code cleanup, no behavior change)

**Commit workflow:**
1. Create feature branch: `git checkout -b feat/new-feature`
2. Make changes + test locally
3. Commit with clear message: `git commit -m "feat: add next module button"`
4. Use skills for validation:
   - `/test-and-verify` — Run full test suite
   - `/security-audit` — Check for vulnerabilities
5. Push to branch: `git push -u origin feat/new-feature`
6. Create PR (GitHub Actions runs tests automatically)
7. Merge when tests pass and code is approved

**Database migrations (Supabase):**
1. If modifying schema, create migration file: `supabase migration new [name]`
2. Write SQL in migrations file
3. Test locally: `supabase migration up`
4. Commit migration file to git
5. On main branch: manually run `supabase migration up --linked` to update production

**Deployment (Vercel):**
- **Automatic:** Push to `main` branch → GitHub Actions tests → Vercel auto-deploys
- **Preview:** Push to feature branch → Vercel creates preview URL automatically
- **Rollback:** If production breaks, revert commit on main and push (Vercel redeploys)
- **Manual check:** After deploy, verify with `/deploy-to-prod` skill or manual health check

### Environment Variables
- **Local:** `.env.local` (gitignored, never commit)
- **Production:** Set in Vercel dashboard or `vercel env` CLI
- **Never commit:** API keys, JWT secrets, database passwords, Stripe keys

### GitHub Actions
- **Trigger:** Runs on every push and PR to any branch
- **Steps:** checkout → setup Node → npm ci → npm run test:unit → npm run test:e2e
- **Status:** Required to pass before merging to main
- **Logs:** View in GitHub Actions tab

---

## Accreditation & Compliance

**Accreditation bodies:**
- **CPD** (interim, fast track): pending
- **IACET** (full accreditation): ~12 months post-launch, requires ≥1 year in business + ≥3 months running

**What accreditors audit:**
1. Measurable learning objectives (per module, aligned to Bloom's) ✓
2. Defined contact hours & CEUs (93 hours, 9.3 CEUs) ✓
3. Assessments tied to objectives (quizzes + capstone rubric) ✓
4. Learner records (enrollment, attempts, scores, completion) ✓
5. Documented governance & policies (Completion & Credentialing Process, Learner Records Template) ✓

**Platform must export (CSV/PDF):**
- Learner ID, name, email, enrollment date
- Module completion checklist, quiz scores (% + pass), deliverable status
- Capstone result (pass/fail), rubric scores, grader, date
- Contact hours, CEUs awarded, certificate ID + issue date

---

## Accreditation & Compliance

**Accreditation bodies:**
- **CPD** (interim, fast track): pending
- **IACET** (full accreditation): ~12 months post-launch, requires ≥1 year in business + ≥3 months running

**What accreditors audit:**
1. Measurable learning objectives (per module, aligned to Bloom's) ✓
2. Defined contact hours & CEUs (93 hours, 9.3 CEUs) ✓
3. Assessments tied to objectives (quizzes + capstone rubric) ✓
4. Learner records (enrollment, attempts, scores, completion) ✓
5. Documented governance & policies (Completion & Credentialing Process, Learner Records Template) ✓

**Platform must export (CSV/PDF):**
- Learner ID, name, email, enrollment date
- Module completion checklist, quiz scores (% + pass), deliverable status
- Capstone result (pass/fail), rubric scores, grader, date
- Contact hours, CEUs awarded, certificate ID + issue date

**Compliance checklist:**
- Quiz answer keys server-side only ✓
- Capstone rubric scoring server-side only ✓
- RLS enforces learner data isolation ✓
- Email verification required for enrollment ✓
- Rate limiting prevents brute-force attacks ✓
- All learner data encrypted at rest and in transit ✓

---

## Next Steps

1. **Launch Phase:** Go live with platform and start recruiting learners
2. **Accreditation:** Apply for CPD credential (interim, 3-month fast track)
3. **Scale:** Monitor learner onboarding, gather feedback, iterate on UX
4. **IACET:** After 1 year in business + 3 months running, apply for full IACET accreditation
5. **Future phases:** Cohort-based learning, instructor training, corporate licensing

---

## Contact & Attribution

**Course:** Accredited Vibe Coding Course  
**Platform:** Learn to Vibe Code  
**Built with:** Claude Code + Cursor + Next.js + Supabase + Vercel  
**Author:** Charlie Foreman (charlieforeman77@gmail.com)

