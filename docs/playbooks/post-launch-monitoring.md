# Post-Launch Monitoring Playbook

**Platform:** Learn to Vibe Code  
**Purpose:** Daily, weekly, and monthly health checks to ensure platform stability, learner experience, and accreditation compliance  
**Owner:** Platform Operations  
**Last Updated:** 2026-07-17

---

## Overview

This playbook provides step-by-step procedures for monitoring platform health post-launch. Each section specifies:
- What to check
- Healthy baselines
- Action thresholds (when to escalate)
- Tools and queries needed
- Expected time investment

**Baseline Metrics (from pre-launch testing):**
- Error rate: <0.5%
- Quiz pass rate: 78–82% (learner population variance)
- Average lesson completion time: 45–90 min (varies by module)
- Deliverable review turnaround: <48 hours
- Platform uptime: 99.9%

---

## Daily Checks (10 minutes)

Performed every morning (8 AM) before learners access the platform. Use the **Admin Dashboard** (see Tools section).

### 1. Error Rate Monitoring ✓

**What to check:**
- Application error rate (500s, 503s, database timeouts)
- Sentry error dashboard for last 24 hours

**Healthy baseline:**
- <0.5% error rate (1 error per 200 requests)
- No recurring 5XX errors

**Action thresholds:**
- Error rate 0.5–2%: Log and monitor hourly; no action yet
- Error rate 2–5%: Investigate immediately, post update in #support Slack
- Error rate >5%: **ESCALATE** (see Escalation Matrix)

**Steps:**
1. Open Sentry dashboard: https://sentry.io/organizations/learn-to-vibe/
2. Filter by last 24 hours
3. Check error trend graph (should be flat or declining)
4. If errors spike, click top error to view stack trace
5. Log findings in operations log (see Tools section)

**Database errors to watch for:**
- Supabase connection timeout (check Supabase status dashboard)
- RLS policy violation (indicates misconfigured auth)
- Quiz attempt write failures (blocks learner progress)

---

### 2. Active Learners & Session Health ✓

**What to check:**
- Number of logged-in learners (last 24h)
- Session duration and bounce rate
- Geographic distribution (if applicable)

**Healthy baseline:**
- Expected 5–50 learners/day (ramp-up phase)
- Average session: 30–120 minutes
- Bounce rate: <15% (learners who leave without action)

**Action threshold:**
- Active learners drop >50% vs. 7-day average → investigate
- Bounce rate >25% → check homepage UX, support tickets

**Steps:**
1. Open Admin Dashboard → **Learner Activity**
2. Note: "Active Now" count (should fluctuate with time of day)
3. Check "24-hour New Sessions" (track onboarding rate)
4. Scan "Top Pages" for unexpected high bounce on lesson pages
5. If geographic data available, flag unusual spikes in single region (may indicate regional outage)

---

### 3. Quiz Pass Rate ✓

**What to check:**
- Overall quiz pass rate (last 24 hours)
- Module-by-module pass rates
- Any failing questions with >50% incorrect answers

**Healthy baseline:**
- 78–82% pass rate (based on pre-launch cohorts)
- No single question with >60% incorrect (indicates bad question or auth issue)

**Action threshold:**
- Overall pass rate drops below 60% → Investigate question quality or learner readiness
- Single question fails >70% → Flag for content review
- Pass rate spikes >95% → May indicate quiz difficulty issue or cheating signal

**Steps:**
1. Admin Dashboard → **Assessments** → **Quiz Performance**
2. Filter last 24h
3. Check pass rate trend (green = healthy, red = concerning)
4. Sort by module, review pass % per module
5. Click failing modules to view question breakdown
6. Flag any question with >60% incorrect to content team

---

### 4. Deliverable Submission Backlog ✓

**What to check:**
- Number of pending deliverable reviews (submitted but not reviewed)
- Average time since submission
- Any repo/URL validation failures

**Healthy baseline:**
- <5 pending reviews (for solo instructor)
- Average review time: 24 hours
- All submissions pass auto-checks (repo accessible, URL live)

**Action threshold:**
- >5 pending reviews → Assign another reviewer or block new submissions
- Any submission pending >48h → Send learner status update
- >2 auto-check failures → Database/auth issue (escalate)

**Steps:**
1. Admin Dashboard → **Deliverables** → **Pending Reviews**
2. Scan list: count pending, note submission timestamps
3. Sort by "Time Pending" (descending)
4. Review "Auto-Checks" column: all should show ✓
5. If any auto-checks fail, click to view error (usually network/auth)
6. Notify instructor if backlog exceeds threshold

---

### 5. Support Tickets (if applicable) ✓

**What to check:**
- Number of new support tickets (last 24h)
- Response time to first ticket
- Common themes (technical, content, account)

**Healthy baseline:**
- <3 tickets/day (ramp-up phase)
- First response within 4 hours
- Most tickets resolve in <24h

**Action threshold:**
- >10 new tickets/day → **ESCALATE** (see Escalation Matrix)
- >2 tickets same issue (e.g., "cannot submit deliverable") → Common bug, prioritize fix
- Response time >8h → Assign backup support handler

**Steps:**
1. Check support email/Slack channel for new messages
2. Note ticket count, topics, and response status
3. If pattern emerges (e.g., "quiz scoring wrong"), flag for dev team
4. If no support tickets: note "0 tickets" in log (positive indicator)

---

## Weekly Checks (20 minutes)

Performed every Monday morning. Aggregates daily metrics and identifies trends.

### 1. Cohort Progress by Module ✓

**What to check:**
- What module learners are currently in (distribution)
- Time-to-completion per module (vs. expected 45–90 min)
- Module-specific completion blockers

**Healthy baseline:**
- Learners spread across modules 0–8 (no logjams)
- 60%+ of enrolled learners have started (Module 0)
- <20% stuck on same module >1 week

**Action threshold:**
- >30% of cohort stuck on single module → Module too hard or unclear (content review)
- Module average time <20 min → Learners skipping or rushing
- Module average time >4 hours → Learner confusion or platform bug

**Steps:**
1. Admin Dashboard → **Cohort Analytics** → **Module Progress**
2. View distribution chart (% per module)
3. Check "Avg Time to Completion" per module (vs. historical)
4. If module time spikes, click to view learner breakdown
5. Contact learners stuck >1 week for feedback
6. Log findings and flag content team if pattern emerges

---

### 2. Completion Rate Trends (7-day moving average) ✓

**What to check:**
- Weekly lesson completion rate (lessons submitted vs. enrolled)
- Quiz attempt rate (quizzes taken vs. available)
- Deliverable submission rate

**Healthy baseline:**
- Lesson completion: 70%+ of enrolled learners complete ≥1 lesson/week
- Quiz rate: 60%+ attempt quizzes weekly
- Deliverable rate: 40%+ submit deliverables weekly (ramp-up phase)

**Action threshold:**
- Lesson completion drops below 50% → Engagement issue
- Quiz rate drops below 30% → Learning stalling, check course difficulty
- Deliverable submission <20% → Learners not making progress, investigate blockers

**Steps:**
1. Admin Dashboard → **Engagement** → **7-day Trends**
2. View line graph for completion %, quiz %, deliverable %
3. Compare this week vs. last week (look for downward trend)
4. If steep decline, check for:
   - Platform outages (correlate with error rate)
   - New difficult module (check Module Progress)
   - Support ticket spike (suggests learner confusion)
5. Document trend in operations log

---

### 3. Assessment Quality (Question Correctness %) ✓

**What to check:**
- Question-level pass rates (% answering correctly)
- Consistency with pre-launch baselines
- Outlier questions (suspiciously easy/hard)

**Healthy baseline:**
- Each question: 60–80% correct answer rate
- No question with <40% or >90% (indicates poor calibration)

**Action threshold:**
- Question <40% correct → Poorly written, ambiguous, or content not taught well
- Question >90% correct → Too easy, learners may be guessing or prior knowledge
- 3+ questions in same module suspicious → Module difficulty issue

**Steps:**
1. Admin Dashboard → **Assessments** → **Question Analysis**
2. Sort by "Correct Answer %" 
3. Identify outliers: <40% (red) and >90% (orange)
4. For each outlier, click to view:
   - Question text
   - Learner answers (which distractor is most common?)
   - Learner comments/feedback
5. If pattern (e.g., distractor A always chosen), flag for content review
6. Log all findings; content team reviews at end of month

---

### 4. Capstone Success Rate (if submissions exist) ✓

**What to check:**
- Number of capstone submissions (last week)
- Pass rate (% graded as Pass)
- Average rubric score per category

**Healthy baseline:**
- 1–3 submissions/week (ramp-up phase)
- Pass rate: 75%+ (learners who reach capstone are typically ready)
- Rubric scores: avg 3.5+/5 across categories

**Action threshold:**
- Capstone pass rate <60% → Rubric too strict or learners underprepared
- Rubric category score <3/5 across multiple submissions → Category too hard, review instructions
- No submissions for 2+ weeks → Learners not reaching capstone (check unlock gates)

**Steps:**
1. Admin Dashboard → **Capstone** → **Submissions & Grades**
2. Count submissions submitted last 7 days
3. View pass/fail counts (chart)
4. Sort by rubric category (e.g., "Code Quality"), view avg scores
5. If score <3/5, review rubric descriptor and calibration notes
6. If pattern (e.g., all fail "User Story" category), flag for rubric workshop

---

### 5. Version Parity Check (Kids vs. Adult) ✓

**What to check:**
- Both course versions (if running parallel) are at feature parity
- Quiz content, figures, and rubric are identical
- Deployment status same for both

**Healthy baseline:**
- Both versions on same commit hash or equivalent features
- No divergence in content or bug fixes

**Action threshold:**
- Versions >1 commit behind → Risk of learners on different content
- Bug fixed in one version but not other → Prioritize backport
- Different deployments (e.g., one on v0.8, other on v0.7) → Immediate sync

**Steps:**
1. Check Git: `git log --oneline | head -5` (current branch)
2. If running kids + adult variants:
   - Check `git branch -a` for both branches
   - Compare commit hashes: `git log <kids-branch> -1` vs. `git log <adult-branch> -1`
   - If diverged >5 commits, schedule merge
3. Check Vercel deployments:
   - Adult version: https://learn-to-vibe.vercel.app/
   - Kids version: (if deployed separately)
   - Verify both show same version number (footer or settings)
4. If diverged, notify team to align deployments

---

## Monthly Checks (45 minutes)

Performed on the 1st of each month. Deep-dive analysis and stakeholder updates.

### 1. Learner Satisfaction Survey ✓

**What to check:**
- Learner feedback on course quality, pacing, and support
- Net Promoter Score (NPS)
- Common pain points

**Healthy baseline:**
- NPS: 40+ (industry standard for education is 30–50)
- Overall satisfaction: 4/5 stars
- <20% report "very difficult" or "frustrated"

**Action threshold:**
- NPS <30 → Course perception declining
- >30% report "unclear instructions" → Content review needed
- >20% report "support response too slow" → Staffing issue

**Survey template (email or in-app):**
```
1. How likely are you to recommend this course? (0–10 scale → NPS calculation)
2. Rate course clarity: 1–5 stars
3. Rate instructor support: 1–5 stars
4. Most valuable module so far?
5. Biggest challenge or frustration?
6. Any feature request?
```

**Steps:**
1. Draft survey (use template above or Typeform/SurveyMonkey)
2. Email all enrolled learners: "Help us improve—1-minute feedback"
3. Allow 7 days for responses
4. Analyze results:
   - NPS: (% Promoters − % Detractors) × 100
   - Average star ratings per question
   - Tag open-ended responses (content, pacing, support, tech)
5. Create summary report with top 3 themes
6. Share findings with stakeholders; prioritize fixes

---

### 2. Capstone Rubric Calibration ✓

**What to check:**
- Instructor scoring consistency across submissions
- Rubric descriptor alignment with learner work
- Any scoring disputes or edge cases

**Healthy baseline:**
- Same submission scored consistently by different reviewers (>80% agreement)
- Rubric descriptors match learner work (no ambiguity)
- No learner appeals or scoring disputes

**Action threshold:**
- Rubric agreement <70% → Descriptors unclear, schedule rubric workshop
- >2 scoring disputes/month → Category too subjective
- Single category consistently low (<2.5 avg) → Category or instruction issue

**Steps:**
1. Admin Dashboard → **Capstone** → **Rubric Calibration**
2. If multiple graders: pull 3–5 submissions graded by different reviewers
3. Calculate inter-rater reliability (% same score, or correlation)
4. If <80%, pull rubric and review with graders:
   - Read descriptor for low-agreement category
   - Review 2–3 examples from learner work
   - Discuss: "What does 5/5 look like?" vs. "3/5"?
5. Document calibration notes in rubric (shared in admin guide)
6. Log agreement score in monthly report

---

### 3. Module Performance Analysis (time spent vs. outcomes) ✓

**What to check:**
- Correlation: learners who spend more time → higher quiz scores?
- Ideal time-to-completion per module
- Modules with high drop-off (learners start but don't finish)

**Healthy baseline:**
- Positive correlation: more time → higher scores (within reason)
- Drop-off <20% per module (80% who start finish)
- No single module with avg time >3 hours (learner confusion risk)

**Action threshold:**
- Module with negative time/outcome correlation → Content gaps or quiz mismatch
- Drop-off >30% → Module too hard or unclear
- Module avg time >4 hours → Needs content review or simplification

**Steps:**
1. Admin Dashboard → **Analytics** → **Module Performance Matrix**
2. For each module (0–15), gather:
   - Avg time to completion
   - Avg quiz score
   - % completion (of starters)
   - Learner feedback (from monthly survey)
3. Create scatter plot (time vs. score) or correlation table
4. Identify outliers:
   - Module with high time but low scores → Content/quiz mismatch
   - Module with low time but high scores → Learners skipping or rushing
5. For problem modules, schedule content review with instructor
6. Document findings in monthly report

---

### 4. Certificate Issuance Verification ✓

**What to check:**
- All eligible learners (passed all quizzes + capstone) have certificates issued
- Certificate URLs are live and shareable
- Certificate contains correct learner name, date, and accreditation reference

**Healthy baseline:**
- 100% of qualifying learners receive certificate within 24h of approval
- Certificate format: PDF, signed (if required), with branding
- Certificates stored in database with shareable links

**Action threshold:**
- Learner qualified but no certificate >48h → Database issue
- Certificate URL broken or 404 → Storage/CDN issue
- Certificate missing critical info (name, date, CEU count) → Data entry error

**Steps:**
1. Admin Dashboard → **Credentials** → **Certificates**
2. Filter by "Issued This Month"
3. Compare count to "Qualifiers This Month" (passed all requirements)
4. If mismatch:
   - Check database: `SELECT * FROM certificates WHERE created_at > NOW() - INTERVAL 1 MONTH;`
   - Any NULL entries → investigate
5. Spot-check 5 random certificates:
   - Click link, verify PDF opens
   - Check content: name, issue date, "9.3 CEUs – Accredited Vibe Coding Course"
   - Verify learner can download and share
6. Log verification in monthly report

---

### 5. Cost & Sustainability Review ✓

**What to check:**
- Monthly platform costs (Supabase, Vercel, storage, etc.)
- Cost per learner (total cost ÷ active learners)
- Revenue (if monetized) or sustainability runway (if free)

**Healthy baseline:**
- Cost per learner per month: <$5 (with modest cohort size)
- Platform cost <$500/month (scaling phase)
- If charging: revenue covers costs + 20% margin

**Action threshold:**
- Cost spike >30% vs. prior month → Investigate (database queries, storage usage)
- Cost per learner >$10 → Optimization needed (caching, database indexing)
- Revenue <costs → Adjust pricing, reduce costs, or increase cohort size

**Steps:**
1. **Supabase costs:**
   - Log into Supabase dashboard → Settings → Billing
   - Note storage usage (GB), API calls, and costs for current month
2. **Vercel costs:**
   - Log into Vercel dashboard → Settings → Usage
   - Note serverless function invocations, bandwidth, and costs
3. **Other costs:**
   - Sentry (if used): $/month
   - Domain, email service, etc.
   - Total monthly cost = Supabase + Vercel + other
4. **Calculate per-learner cost:**
   - Total cost ÷ active learners this month = cost per learner
5. **If cost spike:**
   - Check Supabase query logs (performance tab) for slow queries
   - Check Vercel function cold starts and execution time
   - Consider caching, database indexing, or query optimization
6. **If revenue model:**
   - Calculate MRR (monthly recurring revenue)
   - Gross margin: (MRR − cost) ÷ MRR × 100
   - Track cohort LTV and CAC (later)
7. Log findings in sustainability report

---

## Escalation Matrix

**Critical Issues (0–1 hour response):**

| Condition | Owner | Action | Escalate To |
|-----------|-------|--------|------------|
| Error rate >5% | Platform Ops | Sentry investigation, check Supabase status, restart if needed | CTO / DevOps |
| Quiz system down (learners can't submit) | Platform Ops | Check auth/database, verify RLS policies | Backend Engineer |
| Security incident (unauthorized access, data leak report) | Security Lead | Isolate, audit logs, notify affected users | Legal / CTO |

**High Priority (4–24 hour response):**

| Condition | Owner | Action | Escalate To |
|-----------|-------|--------|------------|
| Quiz pass rate <60% (overall) | Instructor / Content Lead | Review question quality, check learner feedback | Content Team |
| Deliverable auto-checks failing >2 instances | Backend Engineer | Investigate URL validation or auth, fix | Platform Ops |
| Support tickets >10/day, same issue pattern | Support Lead | Triage common problem, create FAQ or patch | Dev Team |
| Capstone rubric agreement <70% | Instructor | Schedule rubric calibration workshop | Lead Instructor |

**Medium Priority (24–72 hour response):**

| Condition | Owner | Action | Escalate To |
|-----------|-------|--------|------------|
| Learner satisfaction survey reveals >30% "frustrated" | Instructor | Identify module/pain point, plan content review | Course Lead |
| Module performance shows negative time/outcome correlation | Content Lead | Audit lesson clarity, quiz calibration | Instructor |
| Certificate issuance delayed >24h | Platform Ops | Check certificate generation job, audit database | Backend Engineer |

**Low Priority (1 week response):**

| Condition | Owner | Action | Escalate To |
|-----------|-------|--------|------------|
| Learner completion rate trending down 5–10%/week | Instructor | Monitor engagement, send re-engagement email | Marketing / Course Lead |
| Cost per learner trending up >10%/month | DevOps | Audit database queries, plan optimization | CTO |
| Minor UX improvements from learner feedback | Product / Design | Add to sprint backlog | Product Owner |

---

## Tools & Access

### Admin Dashboard
- **URL:** https://learn-to-vibe.vercel.app/admin (instructor-only, requires RLS auth)
- **Features:**
  - Learner Activity (active sessions, geo distribution)
  - Quiz Performance (pass rates, question analysis)
  - Deliverables (submissions, review status, auto-checks)
  - Capstone (submissions, grades, rubric calibration)
  - Cohort Analytics (module progress, completion trends)
  - Credentials (certificates, issuance logs)

### Error Tracking (Sentry)
- **URL:** https://sentry.io/organizations/learn-to-vibe/
- **Setup:** Configured in Next.js with `@sentry/nextjs`
- **Queries:**
  - Error rate (last 24h): Dashboard → Graph
  - By module: Filter by `route` tag
  - By severity: Filter "error" vs. "warning"
- **Actions:** Resolve, ignore, or assign to developer

### Database Queries (Supabase SQL Editor)

**Check error rate (last 24h):**
```sql
SELECT 
  COUNT(*) as error_count,
  COUNT(*) * 100.0 / (
    SELECT COUNT(*) FROM request_logs WHERE created_at > NOW() - INTERVAL 1 day
  ) as error_rate_percent
FROM error_logs
WHERE created_at > NOW() - INTERVAL 1 day;
```

**Quiz pass rate (last 7 days):**
```sql
SELECT 
  module_id,
  COUNT(*) as attempts,
  COUNT(CASE WHEN score >= 80 THEN 1 END) as passed,
  ROUND(COUNT(CASE WHEN score >= 80 THEN 1 END) * 100.0 / COUNT(*), 1) as pass_rate_percent
FROM quiz_attempts
WHERE taken_at > NOW() - INTERVAL 7 days
GROUP BY module_id
ORDER BY module_id;
```

**Module completion time (avg):**
```sql
SELECT 
  module_id,
  COUNT(DISTINCT user_id) as learners,
  ROUND(AVG(EXTRACT(EPOCH FROM (completed_at - created_at)) / 60)::numeric, 1) as avg_minutes
FROM module_progress
WHERE completed_at IS NOT NULL AND created_at > NOW() - INTERVAL 30 days
GROUP BY module_id
ORDER BY module_id;
```

**Deliverable review backlog:**
```sql
SELECT 
  user_id,
  module_id,
  submitted_at,
  EXTRACT(EPOCH FROM (NOW() - submitted_at)) / 3600 as hours_pending,
  status
FROM deliverables
WHERE status = 'pending'
ORDER BY submitted_at ASC;
```

**Certificate issuance (this month):**
```sql
SELECT COUNT(*) as certs_issued
FROM certificates
WHERE issued_at > DATE_TRUNC('month', NOW());
```

### Learner Export (for accreditation audits)

**Admin Dashboard → Settings → Export Records**
- Format: CSV or PDF
- Includes:
  - Learner ID, name, email, enrollment date
  - Module completion checklist (unlock gates)
  - Quiz attempts (score, pass/fail, date)
  - Deliverable status (submitted, reviewed, approved)
  - Capstone result (pass/fail, rubric scores)
  - Certificate ID and issue date
  - Total contact hours, CEUs awarded

**Use case:** CPD/IACET audits, learner transcript requests

---

## Daily Operations Log Template

Record daily checks in shared log (Google Sheet or Notion):

| Date | Check | Status | Notes | Owner |
|------|-------|--------|-------|-------|
| 2026-07-18 | Error Rate | ✓ OK (0.2%) | No spike | Ops |
| 2026-07-18 | Active Learners | ✓ OK (12) | Normal for time | Ops |
| 2026-07-18 | Quiz Pass Rate | ✓ OK (79%) | Within range | Ops |
| 2026-07-18 | Deliverable Backlog | ✓ OK (2 pending) | All <24h | Ops |
| 2026-07-18 | Support Tickets | ✓ OK (1 ticket) | "Quiz scoring question" | Support |
| ... | ... | ... | ... | ... |

---

## Checklist: Daily Morning (8 AM)

- [ ] Check Sentry dashboard (error rate)
- [ ] Log active learners count
- [ ] Review quiz pass rate
- [ ] Scan deliverable backlog
- [ ] Count support tickets
- [ ] Update operations log
- [ ] Slack summary to team (if issues found)

## Checklist: Weekly Review (Monday, 8 AM)

- [ ] Review cohort progress by module
- [ ] Calculate 7-day completion trends
- [ ] Analyze question performance
- [ ] Check capstone submissions (if any)
- [ ] Verify version parity
- [ ] Document findings in weekly report
- [ ] Identify content/platform issues for team review

## Checklist: Monthly Review (1st of month, 9 AM)

- [ ] Send learner satisfaction survey
- [ ] Pull capstone rubric calibration data
- [ ] Analyze module performance matrix (time vs. outcomes)
- [ ] Verify certificate issuance
- [ ] Audit platform costs
- [ ] Aggregate findings into monthly operations report
- [ ] Present to stakeholders and plan next month priorities

---

## Incident Response Quick Reference

**Platform Unresponsive:**
1. Check Vercel deployment status: https://vercel.com/dashboard
2. Check Supabase status: https://status.supabase.com
3. Restart serverless function (if persistent): Vercel dashboard → Deployments → Redeploy
4. Notify learners in #support Slack channel

**Learners Can't Log In:**
1. Check Supabase auth: Settings → Auth → Verify email setup
2. Check JWT secret (Vercel env vars match Supabase)
3. Test login flow yourself
4. If RLS issue: check `public.profiles` RLS policy

**Learner Scores Not Saving:**
1. Check `quiz_attempts` table row-level security
2. Verify user_id matches authenticated user
3. Check Sentry for database constraint errors
4. Review recent schema changes (migrations)

**Certificate Generation Failing:**
1. Check `certificates` table existence and schema
2. Verify storage bucket (Supabase Storage) has write permissions
3. Test certificate generation endpoint manually
4. Check error logs in Sentry for PDF library errors

**Support Ticket Spike:**
1. Search ticket keywords: common problem?
2. Check recent deployment: any config changes?
3. Post in #support Slack with diagnosis
4. If bug: file issue, prioritize hotfix
5. If content: post FAQ in #announcements

---

## Continuous Improvement

**Monthly playbook review:**
- Are thresholds still realistic? (Adjust as cohort size grows)
- New tools/metrics to add?
- Any checks that are redundant or no longer needed?
- Update this document quarterly or when major platform change occurs

**Feedback loop:**
- Escalation Matrix is tested → update with real-world triggers
- Post-mortems on any outage → document in playbook for future
- Learner feedback informs new checks (e.g., "quizzes too hard" → add question analysis check)

---

## Owner & Contact

**Platform Operations Lead:** [Assign name]  
**Backup:** [Assign name]  
**Escalation Contact (CTO):** [Assign name]  
**Content Lead:** [Assign name]  
**Support Lead:** [Assign name]

**For questions or updates to this playbook, contact Platform Operations.**
