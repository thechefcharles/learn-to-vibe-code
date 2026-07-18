# Launch Day Runbook: Learn to Vibe Code Platform

**Launch Date:** [TBD - Set 48 hours before launch]  
**Platform:** Learn to Vibe Code (Next.js + Supabase + Vercel)  
**Slack Channel:** #launch-control  
**Status Page:** https://status.learntovibe.com (or monitor via Vercel dashboard)  

---

## 1. Pre-Launch Checks (48 Hours Before)

**Time Estimate:** 2-3 hours  
**Owner:** DevOps + Platform Lead  
**Status:** [ ] Complete

### Database & Infrastructure

- [ ] **Supabase backup verification**
  - Run: `supabase db backup list --linked`
  - Expected: Latest backup within 24 hours
  - Action: If missing, trigger manual backup now via Supabase dashboard

- [ ] **Database migration dry-run**
  - Migrations needed: feedback table, learner engagement indexes
  - Run: `supabase migration list --linked`
  - Action: Verify all migrations applied to staging environment

- [ ] **Production database capacity check**
  - Check Supabase dashboard: storage usage, connection limit
  - Expected: <50% usage headroom
  - Action: If >80%, contact Supabase support for limit increase

- [ ] **Row-Level Security (RLS) policy verification**
  - Run test: `SELECT * FROM profiles LIMIT 1;` (as learner user)
  - Expected: Only own record visible
  - Action: If policies disabled, re-enable immediately and escalate

- [ ] **Database replica sync status**
  - Check Supabase dashboard: Read Replicas > sync lag
  - Expected: <1s lag
  - Action: Wait for sync or disable replicas if needed

### Monitoring & Observability

- [ ] **Sentry project verification**
  - Endpoint: https://sentry.io/[org]/projects/learn-to-vibe-api/
  - Verify: DSN correct, all environments configured (production, staging)
  - Action: Test alert: `curl -X POST https://[sentry-url] -d '{"exception":{"values":[{"type":"test"}]}}'`

- [ ] **Vercel deployment check**
  - Visit: https://vercel.com/dashboard/[team]/learn-to-vibe
  - Expected: Latest commit deployed, all checks passing
  - Action: If checks failing, revert to last passing commit

- [ ] **Monitoring alerts enabled**
  - [ ] Email alerts for >5% error rate
  - [ ] Slack alerts for critical errors
  - [ ] Uptime monitoring (Uptime Robot or similar)
  - [ ] Database connection warnings enabled

- [ ] **Log aggregation tested**
  - Vercel: Logs tab shows recent requests
  - Supabase: Logs viewer shows queries
  - Action: Tag a test log entry to verify retention

### Email & Communications

- [ ] **Email service verification (SendGrid/Resend)**
  - Test send: Transactional email (sign-up confirmation)
  - Check: Email arrives in inbox <2 minutes
  - Verify: Templates render correctly, links work
  - Action: If failing, contact support and prepare fallback

- [ ] **Announcement emails queued**
  - [ ] Welcome email template approved
  - [ ] Launch announcement email ready (not sent yet)
  - [ ] Support contact list verified
  - Action: Save all templates to `/launch-day/email-templates/`

- [ ] **SMS/Slack notifications tested (if applicable)**
  - Test message to #launch-control channel
  - Expected: Message arrives <30 seconds
  - Action: Verify webhook URL correct in Vercel/Supabase

### Backups & Disaster Recovery

- [ ] **Full database backup taken**
  - Run: `supabase db backup create --linked --name "pre-launch-backup"`
  - Expected: Backup completes in <10 minutes
  - Action: Note backup ID, store in secure location

- [ ] **File storage backup (Supabase Storage)**
  - Verify: All course content, screenshots present
  - Run: Export figures manifest + verify 59 screenshots present
  - Action: If any missing, upload from source before launch

- [ ] **Environment secrets audit**
  - Verify in Vercel dashboard: All env vars loaded
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` set
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` set (server-side only)
  - [ ] `STRIPE_SECRET_KEY` set (if payments enabled)
  - Action: No secrets should be visible in logs

### Capacity Planning

- [ ] **Load test results reviewed**
  - Expected: Platform handles 100 concurrent users
  - Verify: Response time <500ms at 100 concurrent
  - Check: No memory leaks after sustained 30-min load
  - Action: If failing, scale Vercel or optimize DB queries

- [ ] **CDN cache warming**
  - Pre-cache: All lesson pages, static assets
  - Run: `curl -I https://learntovibe.com/course/module-00` (verify Cache-Control headers)
  - Expected: Cache hit ratio >80%
  - Action: Manually prime cache if needed

---

## 2. Launch Day Morning (3 Hours Before Go-Live)

**Time Estimate:** 1.5-2 hours  
**Owner:** Platform Lead + DevOps + Support Lead  
**Status:** [ ] Complete

### System Health Checks

- [ ] **Application healthcheck**
  - Endpoint: `https://learntovibe.com/api/health`
  - Expected: `{"status":"ok","version":"1.0.0"}` within 100ms
  - Action: If failing, investigate server logs immediately

- [ ] **Database connectivity**
  - Test query: `SELECT COUNT(*) FROM profiles;`
  - Expected: <50ms response time
  - Action: If >200ms, check connection pool or scale up

- [ ] **Authentication system**
  - Test sign-up flow in staging: Email → confirm → login
  - Expected: Complete flow <30 seconds
  - Action: If failing, check Supabase auth config

- [ ] **Payment system (if live)**
  - Test Stripe connection: Create test charge
  - Expected: Transaction confirms <5 seconds
  - Action: If failing, verify API keys and Stripe dashboard

- [ ] **Email delivery**
  - Trigger test: Sign up with test email
  - Expected: Confirmation arrives <1 minute
  - Action: If failing, check sender domain reputation

- [ ] **CDN/Caching**
  - Ping CDN: `curl -I https://learntovibe.com/course`
  - Expected: Headers show `CF-Cache-Status: HIT` (Cloudflare) or similar
  - Action: Clear cache if needed: Vercel dashboard > Deployments > Redeploy

### Team Preparation

- [ ] **Support team trained & online**
  - [ ] Support team members in #launch-control Slack
  - [ ] Incident procedures reviewed (see Section 7)
  - [ ] FAQ & troubleshooting doc shared: `/launch-day/support-faq.md`
  - [ ] Response protocol: P1 (critical) within 5 min, P2 within 30 min
  - Action: Run 10-minute Q&A walkthrough

- [ ] **Incident commanders assigned**
  - [ ] Platform Lead: on-call (phone + Slack)
  - [ ] DevOps: monitoring dashboards
  - [ ] Support Lead: managing tickets
  - [ ] Comms Lead: external announcements
  - Action: Post phone numbers in #launch-control

- [ ] **Documentation distributed**
  - [ ] Launch checklist (this runbook)
  - [ ] Incident response decision trees
  - [ ] Rollback procedures
  - [ ] Monitoring dashboard links
  - [ ] Escalation contact matrix
  - Action: Slack thread with all links pinned

### Marketing & Communications

- [ ] **Launch announcement prepared**
  - [ ] Email subject line approved
  - [ ] Social media posts scheduled (or queued for manual send)
  - [ ] Landing page updated (enrollment link live)
  - [ ] FAQ updated: Where to sign up, what's included, support contact
  - Action: Do NOT send yet — wait for go-live signal

- [ ] **Marketing links verified**
  - [ ] Sign-up link works: `https://learntovibe.com/signup`
  - [ ] Course preview works: `https://learntovibe.com/demo`
  - [ ] Support email configured: support@learntovibe.com (checked by 9am)
  - Action: If any failing, fix before launch

- [ ] **Status page live**
  - [ ] Status page accessible: https://status.learntovibe.com
  - [ ] Status: Set to "Operational" (will update if incidents)
  - [ ] Incident notification template ready
  - Action: Verify team has status page API credentials

### Final Verification

- [ ] **Course content accessible**
  - Load Module 0 (Setup): `https://learntovibe.com/course/module-00`
  - Expected: Full lesson loads, all screenshots render
  - Verify: No 404s, no broken links
  - Action: If broken, redeploy from backup

- [ ] **Quiz system tested**
  - Take test quiz in staging as new learner
  - Expected: Submit → score recorded → pass/fail feedback
  - Verify: Answer keys server-side only (client never sees answers)
  - Action: If client sees answers, escalate immediately

- [ ] **Database triggers & functions active**
  - Verify: `learner_created_webhook` trigger enabled
  - Verify: `calculate_xp` function working
  - Action: Re-enable any disabled triggers

---

## 3. Launch Moment (Go-Live)

**Time Estimate:** 30 minutes (critical window)  
**Owner:** Incident Commander (Platform Lead)  
**Slack:** #launch-control (pinned checklist)

### GO-LIVE SEQUENCE

**T-15 min:** Final healthcheck round
```
[ ] Run all healthchecks from Section 2 (takes ~5 min)
[ ] DevOps: Monitor dashboards open (Vercel, Supabase, Sentry)
[ ] Support: Support tickets system ready (Slack, email monitored)
[ ] Comms: Announcement queued, waiting for signal
```

**T-5 min:** Standby
```
[ ] All team members in #launch-control
[ ] Phone lines open (no meetings)
[ ] Incident commander confirms readiness
[ ] Post: "🚀 Launching in 5 minutes"
```

**T-0: LAUNCH**
```
[ ] Post in #launch-control: "🚀 LIVE: Platform launches now"
[ ] Send launch announcement email to waitlist
[ ] Post launch tweet/social media
[ ] Update status page: "🟢 Operational"
```

### First 2 Hours: Active Monitoring

**Every 5 minutes (automated or manual):**
- [ ] Error rate check: `Sentry > Issues > Error Rate`
  - Alert if: >5% of requests failing
  - Action: Immediate investigation + incident response (see Section 7)

- [ ] Response time check: `Vercel > Analytics > Response Time`
  - Alert if: P95 latency >1000ms
  - Action: Check database queries or enable caching

- [ ] Sign-up flow verification: `Supabase > profiles table > REALTIME`
  - Expected: New rows appear as learners sign up
  - Alert if: No sign-ups for 10 min (check if marketing working)

- [ ] Authentication email delivery: `Supabase > Auth > Email > Logs`
  - Expected: Confirmation emails sent <1 min, no bounces
  - Alert if: Bounce rate >1%

**Every 15 minutes (active):**
- [ ] Support ticket queue: Slack #support channel
  - Watch for: Common complaints, blockers, bugs
  - Log: Screenshot 1-2 key issues to monitor

- [ ] Learner onboarding: Sample test account
  - Login → view Module 0 → start quiz
  - Expected: Smooth UX, no errors
  - Log: Time to first module completion

- [ ] Database performance: Supabase dashboard
  - Check: Active connections <80% limit
  - Check: Query time <500ms median
  - Alert if: CPU >70%

**Every 30 minutes (review):**
- [ ] Post update to #launch-control:
  ```
  ✅ [Time]: Error rate <1%, [X] sign-ups, [Y] modules started
  ```
  - Maintain morale
  - Catch early issues
  - Celebrate milestones ("100 sign-ups!")

**If incident detected (any alert):**
- Go to Section 7: Critical Incident Responses
- Incident commander takes lead
- Freeze announcements, focus on recovery

---

## 4. First 24 Hours Post-Launch

**Owner:** DevOps + Support Lead  
**Cadence:** Every 4 hours

### 4-Hour Check (T+4 hours, ~1pm)
- [ ] **Error rate**: Check Sentry
  - Target: <1%
  - Review: Any patterns? Common error types?
  - Action: If >3%, investigate immediately (Section 7)

- [ ] **Signup volume**: Query
  ```sql
  SELECT DATE(created_at) as day, COUNT(*) as signups
  FROM profiles
  WHERE created_at >= NOW() - INTERVAL '4 hours'
  GROUP BY day;
  ```
  - Expected: 10-50 signups (adjust based on marketing)
  - Low: Check if marketing live, email working
  - High: Verify database scaling, no bottlenecks

- [ ] **Support tickets**: Check Slack #support + email
  - Count new tickets
  - Any critical issues? (Yes → Section 7)
  - Respond to all within 1 hour

- [ ] **Database health**:
  ```sql
  SELECT 
    schemaname, tablename, n_live_tup
  FROM pg_stat_user_tables
  ORDER BY n_live_tup DESC LIMIT 10;
  ```
  - Verify: No unexpected table growth
  - Check: Storage usage <60%

- [ ] **Learner actions**: Module 1 starts
  - Query: Count learners who viewed Module 1
  ```sql
  SELECT COUNT(DISTINCT user_id)
  FROM module_progress
  WHERE module_id = 1;
  ```
  - Expected: 30-50% of signups
  - Low: Quiz flow may have issue

### 8-Hour Check (T+8 hours, ~5pm)
- [ ] Repeat 4-hour checks (shortened review)
- [ ] Check if any learners passed Module 1 quiz
  ```sql
  SELECT COUNT(*) as passed
  FROM quiz_attempts
  WHERE module_id = 1 AND score >= 80;
  ```
  - Expected: 2-5 (early adopters)

### 12-Hour Check (T+12 hours, ~9pm)
- [ ] Repeat 4-hour checks
- [ ] Cumulative review: signups, activities, errors
- [ ] If all green: confidence check with incident commander
- [ ] If issues: begin monitoring every 2 hours instead

### 24-Hour Check (T+24 hours, ~noon next day)
**Full daily review meeting:**

**Attendees:** Platform Lead, DevOps, Support Lead, Comms Lead

**Agenda (30 min):**
1. **Metrics review** (5 min)
   - Total signups: [X]
   - Total quiz attempts: [Y]
   - Error rate: [Z]%
   - Support tickets: [N] (how many resolved?)

2. **Issues & resolutions** (10 min)
   - Any incident responses triggered? Review what happened.
   - Root cause: ?
   - Fix applied: ?
   - Prevention: What monitoring added?

3. **Wins & celebrations** (2 min)
   - Celebrate hitting milestones
   - Shout out team responses

4. **Next 24-hour plan** (5 min)
   - Continue 4-hour checks? Or move to 12-hour?
   - Any preventive work needed?
   - Comms: Update landing page / FAQ?

5. **Escalations** (5 min)
   - Anything needing leadership decision?
   - Any blockers for learners?

**Post meeting:**
- Update #launch-control with summary
- Share full daily report in Google Drive
- Archive support tickets daily

---

## 5. First Week Post-Launch

**Owner:** Product Lead + Support  
**Cadence:** Daily standup + EOD review

### Day 2 (Thursday, if Wed = launch)

**Morning Standup (9am):**
- [ ] Previous 24h metrics
- [ ] Any overnight incidents?
- [ ] Learner feedback themes emerging?

**Mid-day Check:**
- [ ] Deliverable submissions: Any learners attempting Module 0 deliverable?
  ```sql
  SELECT COUNT(*) FROM deliverables WHERE created_at >= NOW() - INTERVAL '24 hours';
  ```
- [ ] Quiz progression: Module 1 → Module 2?
  ```sql
  SELECT module_id, COUNT(*) as attempts
  FROM quiz_attempts
  WHERE created_at >= NOW() - INTERVAL '48 hours'
  GROUP BY module_id;
  ```

### Day 3-4

**Same daily checklist:**
- [ ] Signups (cumulative)
- [ ] Error rate (Sentry)
- [ ] Support tickets (resolve same-day if possible)
- [ ] Module progression (quiz pass rate healthy?)
- [ ] Any feature requests / bugs reported? (Log to backlog)

### Day 5 (Friday, if Wed = launch)

**Survey Launch: Send learner satisfaction email**
```
Subject: "Quick feedback: How is Learn to Vibe Code?"

Hi [Name],

We launched 5 days ago and would love your feedback!
- What's working well?
- What could be better?
- Any blockers?

[Link to 3-question Google Form]

Thanks!
```

**Deadline:** Responses by EOD Monday (first week complete)

### End of Week Review (Sunday EOD or Monday morning)

**Meeting (60 min):** Platform Lead + Product Lead + Support

**Agenda:**
1. **Week 1 metrics summary**
   - [ ] Total signups: [X]
   - [ ] Quiz pass rate: [Y]%
   - [ ] Avg modules per learner: [Z]
   - [ ] Error rate (final): [A]%
   - [ ] Critical incidents: [0 / N]

2. **Learner feedback themes**
   - [ ] Survey responses reviewed (if survey complete)
   - [ ] Common praise (2-3 themes)
   - [ ] Common complaints (2-3 themes)
   - [ ] Top feature request

3. **Support ticket analysis**
   - [ ] Total tickets: [N]
   - [ ] Resolution time: [X] hours avg
   - [ ] Unresolved (if any): [M]
   - [ ] Top issue: [Issue type]

4. **Technical retrospective**
   - [ ] Incidents triggered: [List]
   - [ ] Root causes: [Causes]
   - [ ] Prevention deployed: [What changed?]
   - [ ] Performance trends: ↑ / ↓ / → ?

5. **Escalations & decisions**
   - [ ] Any blocking issues?
   - [ ] Need more infrastructure?
   - [ ] Content/curriculum issues?
   - [ ] Marketing adjustments?

**Decisions to make:**
- [ ] Continue daily monitoring or move to every-other-day?
- [ ] Any hot fixes needed? (Yes → deploy this week)
- [ ] Ready for Phase 9 (Payments/Credentials)? Or pause?

---

## 6. First 30 Days Post-Launch

**Owner:** DevOps (monitoring) + Product (analysis)

### Weekly Rhythm (Every 7 days)

**Monday Morning Standup (15 min):**
- [ ] Metrics from last 7 days
- [ ] Any incidents? (Yes → root cause review)
- [ ] Key metric changes (↑ or ↓)
- [ ] Week's priorities (fixes, features, content updates)

**Weekly Checks (Wednesday):**
- [ ] Database size check
  ```sql
  SELECT pg_size_pretty(pg_database_size(current_database()));
  ```
  - Growth rate acceptable? (Should be <5MB/day)

- [ ] Backup integrity: `supabase db backup list --linked`
  - Latest backup: completed and verified

- [ ] Certificate generation (if live): Test certificate creation
  - [ ] PDF generates <5 seconds
  - [ ] Styling renders correctly
  - [ ] Unique cert ID generated

### Bi-Weekly Check (Every 14 days)

**Capstone Analysis:** If any learners reached capstone submissions
```sql
SELECT COUNT(*) as submitted, COUNT(CASE WHEN result='pass' THEN 1 END) as passed
FROM capstone_submissions
WHERE created_at >= NOW() - INTERVAL '14 days';
```
- Review: Any submissions? Pass rate? (target: >60%)
- Quality: Review rubric scores, common gaps
- Feedback: Any patterns in feedback to learners?

### End of Month Review (Day 30)

**Full Monthly Report (2-3 hours):**

**Attendees:** Platform Lead, Product Lead, Support Lead, DevOps Lead

**Report sections:**

1. **User acquisition & retention**
   - Total registrations: [X]
   - Still active (logged in last 7 days): [Y]
   - Churn: [100 - (Y/X)]%
   - Top geographic regions: [List]

2. **Learning progress**
   - Module completion rate by module: [Table]
   - Overall quiz pass rate: [A]%
   - Avg time to Module 1 completion: [B] hours
   - Capstone submissions (if applicable): [C]

3. **Infrastructure & performance**
   - Uptime: [X]% (target: 99.9%)
   - Avg response time: [A] ms
   - Peak concurrent users: [B]
   - Database growth rate: [C] MB/day

4. **Security & data**
   - Security incidents: [0 / X]
   - Data breaches: [0]
   - Backup success rate: [X]%
   - RLS policy violations: [0]

5. **Support & escalations**
   - Total support tickets: [N]
   - Avg resolution time: [X] hours
   - CSAT score (if measured): [X]/5
   - Top 3 issues: [List]

6. **Incidents & resolutions**
   - Total incidents: [N]
   - Time to resolution avg: [X] min
   - Root causes: [List]
   - Preventions deployed: [List]

7. **Roadmap adjustments**
   - Phase 9 (Payments): Ready? Issues?
   - Phase 10 (Hardening): What to prioritize?
   - Content quality: Any feedback requiring updates?

**Decisions to make:**
- [ ] Ready for 100+ concurrent users (before Phase 9)?
- [ ] Any critical technical debt to address?
- [ ] Curriculum updates needed (learner feedback)?
- [ ] Marketing strategy working (acquisition cost acceptable)?

---

## 7. Critical Incident Responses

**Owner:** Incident Commander (Platform Lead)  
**Severity Levels:** P1 (critical) | P2 (high) | P3 (medium)  
**Response SLA:** P1: 5 min | P2: 30 min | P3: 2 hours

### Decision Tree: Incident Triage

```
Alert received → 
  → Is platform DOWN (HTTP 500 on homepage)?
     YES → Go to Section 7a (Platform Down)
     NO → Continue
  → Is >5% of requests failing?
     YES → Go to Section 7b (Error Rate Spike)
     NO → Continue
  → Is signup/auth broken?
     YES → Go to Section 7c (Auth Issues)
     NO → Continue
  → Is quiz/course content broken?
     YES → Go to Section 7d (Course Flow Broken)
     NO → Continue
  → Are payments failing?
     YES → Go to Section 7e (Payment Failures)
     NO → Go to Section 7f (Database Issues)
```

---

### 7a. PLATFORM DOWN (P1: Critical)

**Symptom:** Homepage returns 500 error, site unreachable, or extreme latency (>5s)

**Severity:** P1 — resolve within 5 minutes

**Response:**

**T+0-1 min:**
- [ ] Incident commander posts to #launch-control: "🔴 P1: Platform down, investigating"
- [ ] Update status page: `🔴 Investigating - Platform Degradation`
- [ ] Open Vercel dashboard: Deployments > check latest deploy status
  - If deploy in progress → wait 60 seconds
  - If deploy failed → check error logs, rollback if needed
  - If deploy stuck → manually redeploy

**T+1-2 min:**
- [ ] Check Vercel Functions logs:
  ```bash
  vercel logs --tail (monitor real-time errors)
  ```
  - Look for: "ECONNREFUSED", "ENOMEM", "TypeError", "Timeout"

- [ ] Check Supabase status (https://status.supabase.com)
  - Is Supabase having outage? If yes → wait and communicate
  - If no → Database is likely not the issue

**T+2-3 min:**
- [ ] If error is connection error → check Supabase:
  ```bash
  supabase status (local CLI check)
  ```
  - If Supabase down → escalate to support, wait
  - If Supabase up → issue is network or secrets

- [ ] Verify secrets loaded:
  ```bash
  vercel env list (check NEXT_PUBLIC_SUPABASE_URL et al are loaded)
  ```
  - If any missing → redeploy with secrets
  - If all present → check Sentry for 401/403 auth errors

**T+3-4 min:**
- [ ] If all above checks pass but platform still down → ROLLBACK
  ```bash
  vercel rollback (reverts to previous working deployment)
  ```
  - This will take ~2 minutes
  - Notify #launch-control: "Rolling back to previous version"

**T+4-5 min:**
- [ ] Platform should be back
- [ ] Verify: Healthcheck endpoint returns 200
  ```bash
  curl -I https://learntovibe.com/api/health
  ```
  - Expected: HTTP 200 within 1 second

**Recovery:**
- [ ] Post to #launch-control: "✅ Platform restored. Investigating root cause."
- [ ] Update status page: `🟢 Operational`
- [ ] Open incident ticket in Linear / GitHub Issues with title:
  - `[Incident] Platform downtime [start-time] to [end-time] [duration min]`
- [ ] Document root cause (what was deployed, what failed)
- [ ] Schedule post-incident review (within 24 hours)

---

### 7b. ERROR RATE SPIKE (P1: Critical if >5%, P2 if >3%)

**Symptom:** Sentry shows >5% of requests failing (alerts configured to trigger at 5%)

**Severity:** P1 if >5% | P2 if 3-5%

**Response:**

**T+0-1 min:**
- [ ] Post to #launch-control: "🟡 P2/P1: Error rate spike [X]%, investigating"
- [ ] Open Sentry: https://sentry.io/[org]/projects/learn-to-vibe-api/
  - Filter: Last 5 minutes
  - Identify: Top 3 error types (click each to see stack trace)
  - Common errors: "ENOMEM", "ECONNREFUSED", "Timeout", "Unauthorized", "Invalid JWT"

**T+1-2 min:**
- [ ] By error type, respond:

  **If Database Connection Error:**
  ```bash
  # Check Supabase connection pool
  # Supabase Dashboard > Database > Connection Pool > Active Connections
  # If >80% of limit → SCALE UP immediately
  supabase db upgrade --tier [higher tier]
  ```

  **If Memory/CPU Error (ENOMEM, heap overflow):**
  ```bash
  # Check Vercel Functions scale
  # Vercel Dashboard > Analytics > Compute Units
  # If spiking → enable auto-scaling or increase plan
  vercel env set NODE_ENV=production (ensure optimized)
  ```

  **If JWT/Auth Error (Unauthorized, Invalid token):**
  - Check Supabase Auth logs: Supabase > Auth > Logs
  - If auth service down → wait, escalate to Supabase
  - If JWTs expired → deploy new signing key (rare, escalate)

  **If Timeout (Request took >30s):**
  - Check slowest endpoints: Vercel Analytics
  - Likely cause: Slow database query
  - Response: Restart database connections or scale up

**T+2-3 min:**
- [ ] If error rate still >5% → check recent deploy:
  ```bash
  vercel logs --tail (look for errors in latest 2 minutes)
  ```
  - If new code introduced error → ROLLBACK
  - If not deploy-related → scale infrastructure

**T+3-5 min:**
- [ ] Error rate should trend down as issue resolves
  - Monitor Sentry dashboard for next 10 minutes
  - If stuck → escalate to DevOps lead + consider rollback

**Recovery:**
- [ ] When error rate <1%: Post to #launch-control: "✅ Error rate normalized"
- [ ] Create incident ticket (Linear/GitHub)
- [ ] Document root cause + fix applied
- [ ] Schedule post-incident review

---

### 7c. AUTH/SIGNUP FLOW BROKEN (P1: Critical)

**Symptom:** Learners cannot sign up or log in; "Invalid credentials", "Email not sending", or auth loops

**Severity:** P1 — this blocks new learner acquisition

**Response:**

**T+0-1 min:**
- [ ] Post to #launch-control: "🔴 P1: Auth flow broken, investigating"
- [ ] Test auth flow manually:
  ```bash
  # Step 1: Try signup via https://learntovibe.com/signup
  # Enter test email, password
  # Expected: Confirmation email arrives <1 min
  # If fails → Step 2
  ```

**T+1-2 min:**
- [ ] Check Supabase Auth:
  - Open Supabase Dashboard > Auth > Authentication Settings
  - Verify: Email provider configured (SendGrid or Resend)
  - Verify: Email templates present (confirm email template)
  - [ ] SMTP settings correct? (Check mail provider dashboard)
  - [ ] Email rate limit hit? (Check SendGrid/Resend usage)

- [ ] Check auth function logs:
  ```bash
  # Supabase > Edge Functions > Logs > auth-trigger
  # Look for email sending errors
  ```

**T+2-3 min:**
- [ ] If email provider issue:
  - Check SendGrid: https://app.sendgrid.com/stats
    - Bounce rate <5%?
    - Sending not paused?
  - If paused/high bounce → contact provider or switch to backup

- [ ] If Supabase Auth issue:
  - Check Supabase status page: https://status.supabase.com
  - If auth service down → wait and communicate
  - If up → likely config issue

**T+3-4 min:**
- [ ] Manual email send test:
  ```bash
  # Send test email via Supabase CLI
  # or test via provider's API (SendGrid, Resend)
  # Expected: Arrives <1 min to test email
  ```
  - If test succeeds → issue is trigger/function
  - If test fails → email provider down

**Recovery:**
- [ ] When auth flow working: Post "✅ Auth flow restored"
- [ ] Support: Check queue for affected learners
  - Manually send reset emails if needed
  - Priority: High, respond within 10 min

---

### 7d. COURSE FLOW BROKEN (P2: High)

**Symptom:** Learners cannot view lessons, take quizzes, or submit deliverables; 404 errors or missing content

**Severity:** P2 — learners are blocked from learning

**Response:**

**T+0-2 min:**
- [ ] Test course flow manually:
  - [ ] Can access Module 0? `https://learntovibe.com/course/module-00`
  - [ ] Can start quiz? Click "Take Quiz"
  - [ ] Can submit deliverable? Upload repo URL
  - [ ] Expected: All 3 succeed, no 404s

- [ ] If 404 on lesson → check:
  ```bash
  # Verify lesson files exist: /content/modules/module-00.md
  # Check figures-manifest.json loads: /public/figures-manifest.json
  ```

- [ ] If quiz broken:
  - Check Supabase: Is quiz_attempts table accessible?
  - Test query: `SELECT * FROM quiz_attempts LIMIT 1;`
  - If RLS blocking → escalate, check policies

- [ ] If deliverable submission broken:
  - Check Supabase: Is deliverables table accessible?
  - Check auto-check service: Is the SSRF-safe URL checker running?

**T+2-3 min:**
- [ ] Check recent deploys:
  ```bash
  vercel logs --tail (look for "ENOENT", "Cannot find module")
  ```
  - If file not found → likely bad deploy
  - If permission error → likely RLS issue

**T+3-5 min:**
- [ ] If not resolved:
  - Check specific error in Sentry
  - Open GitHub: Check if course content commit was reverted
  - If content is missing → redeploy: `git push origin main` → Vercel redeploys

**Recovery:**
- [ ] When course flow working: Post "✅ Course flow restored"
- [ ] Check learner impact: How many affected?
- [ ] Offer support: Extend deadlines if needed

---

### 7e. PAYMENT FAILURES (P2: High, P1 if affecting >50% transactions)

**Symptom:** Stripe errors, "Payment declined", "Webhook not received", or learners not billed

**Severity:** P2 (or P1 if revenue-blocking)

**Response:**

**T+0-1 min:**
- [ ] Open Stripe Dashboard: https://dashboard.stripe.com/
- [ ] Check: Recent failed charges, webhook delivery logs
  - Webhook failures? → Check URL configured: `https://learntovibe.com/api/webhooks/stripe`
  - Charges declined? → May be normal (fraud prevention), monitor rate

- [ ] Test payment:
  ```bash
  # Use test card: 4242 4242 4242 4242, exp 12/25, CVC 123
  # Go to /checkout, add to cart, purchase
  # Expected: Charge succeeds within 5 seconds
  ```

**T+1-2 min:**
- [ ] If test charge fails:
  - Check Stripe API keys: Vercel env vars
    - `STRIPE_SECRET_KEY` present?
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` present?
  - If missing → redeploy with keys
  - If present → check Stripe account status (suspended/limited?)

- [ ] If webhook not delivering:
  - Stripe Dashboard > Developers > Webhooks
  - Check endpoint URL for /stripe webhook
  - Verify: Event types: charge.succeeded, charge.failed subscribed
  - Re-enable endpoint if disabled

**T+2-3 min:**
- [ ] If still failing → FAILSAFE:
  - Disable Stripe integration temporarily (remove from checkout)
  - Post to #launch-control: "⚠️ Payments temporarily offline, investigating"
  - Manually process any pending payments after fix

**Recovery:**
- [ ] When payments working: Post "✅ Payments restored"
- [ ] Review all failed charges (refund if needed)
- [ ] Document Stripe webhook delivery logs
- [ ] Create incident ticket

---

### 7f. DATABASE DOWN / SLOW QUERIES (P1 if down, P2 if slow)

**Symptom:** Database timeout errors, "Connection refused", queries taking >5 seconds

**Severity:** P1 if completely down | P2 if slow

**Response:**

**T+0-1 min:**
- [ ] Check Supabase status: https://status.supabase.com
  - Any incidents reported?
  - If outage → escalate to Supabase support, communicate to learners

- [ ] Try direct connection:
  ```bash
  psql postgresql://[user]:[password]@[host]/postgres -c "SELECT 1;"
  # Expected: Immediate response
  ```
  - Timeout → network issue or Supabase down
  - Error → auth issue

**T+1-2 min:**
- [ ] Check Supabase Dashboard:
  - Database > Query Performance > Slow Queries
  - Connection Pool > Active Connections (if >90%, scale up)
  - Storage > Usage (if >95%, urgent cleanup needed)

- [ ] If queries slow:
  - Identify: Which query is slow? (SQL in logs)
  - Add index: If missing, create index on frequently-filtered column
  - Kill slow query: `SELECT pg_terminate_backend(pid) WHERE query LIKE '%[slow-query]%';`

**T+2-3 min:**
- [ ] If database truly down → FAILSAFE:
  - Display maintenance page: "Platform undergoing maintenance"
  - Notify learners via email / status page
  - Work with Supabase support for recovery

**T+3-5 min:**
- [ ] When database back:
  - Restart connection pools: Vercel > redeploy
  - Verify: Response time <500ms
  - Post "✅ Database restored"

**Recovery & Prevention:**
- [ ] Monitor queries for next 2 hours (look for new slow queries)
- [ ] If recurring issue → enable database alerts:
  - Supabase > Alerts > CPU >70%, Connections >80%
- [ ] Scale database proactively before peak hours

---

## 8. Success Criteria (First Week)

### Targets (by end of Day 7)

| Metric | Target | Status |
|--------|--------|--------|
| **Platform Uptime** | >99% (max 15 min downtime) | [ ] Pass |
| **Error Rate** | <1% (avg) | [ ] Pass |
| **Response Time** | <500ms P95 | [ ] Pass |
| **Total Signups** | 10+ (realistic for launch day outreach) | [ ] Pass |
| **Module 1 Starts** | >50% of signups | [ ] Pass |
| **Quiz Pass Rate** | 60-80% (healthy, not too easy/hard) | [ ] Pass |
| **Support Tickets** | <5 total, zero unresolved critical | [ ] Pass |
| **Critical Incidents** | 0 (or <1 lasting >30 min) | [ ] Pass |
| **Email Delivery** | 100% (no bounce/spam rate >2%) | [ ] Pass |
| **Certificate Generation** | Working (if launched) | [ ] Pass |
| **Feedback Collected** | 50%+ of learners survey participation | [ ] Pass |

### Success Definitions

✅ **Platform Uptime > 99%**
- Platform accessible via healthcheck (/api/health) >99% of time
- Max 1 incident causing <15 min total downtime
- No cascading failures

✅ **Error Rate < 1%**
- Sentry logs show <1% error rate by end of Day 7
- No persistent error patterns
- All errors logged + triaged

✅ **Learner Experience (Quiz Pass Rate 60-80%)**
- Too high (>85%) → quiz is too easy, needs harder questions
- Too low (<55%) → quiz is too hard, or course content gaps
- Healthy zone: 60-80% suggests well-calibrated difficulty

✅ **Support (Zero Critical Unresolved)**
- All P1 (critical) incidents resolved within 5 min
- All P2 tickets resolved within 30 min
- Response SLA met 100%

✅ **Feedback Working**
- Learners can report issues
- Support team has captured feedback themes
- Actionable insights documented

### Post-Week 1 Actions

**If all SUCCESS:**
- [ ] Move to Phase 9 (Payments & Credentials)
- [ ] Scale monitoring to daily instead of every 4 hours
- [ ] Celebrate with team + thank early learners

**If BLOCKERS found:**
- [ ] Pause Phase 9, focus on fixes
- [ ] Extend first week monitoring (continue intensive checks)
- [ ] High-priority: Do not launch payments until platform stable
- [ ] Iterate on fixes, retest before proceeding

---

## Appendix: Quick Reference Commands

### Healthcheck & Verification
```bash
# Platform up?
curl -I https://learntovibe.com/api/health

# Supabase up?
supabase status

# Database query?
supabase db execute "SELECT 1;"

# Recent logs?
vercel logs --tail

# Sentry errors?
# Open: https://sentry.io/[org]/projects/learn-to-vibe-api/
```

### Monitoring
```bash
# Check deployment status
vercel deployments --limit 5

# View environment
vercel env list

# Rollback (if needed)
vercel rollback

# Redeploy latest
vercel deploy --prod
```

### Database Queries (via Supabase CLI)
```bash
# Connect to prod DB
supabase db connect

# Count signups today
SELECT COUNT(*) FROM profiles WHERE created_at >= NOW() - INTERVAL '24 hours';

# Check quiz attempts
SELECT module_id, COUNT(*) FROM quiz_attempts WHERE created_at >= NOW() - INTERVAL '24 hours' GROUP BY module_id;

# Check deliverable submissions
SELECT COUNT(*) FROM deliverables WHERE created_at >= NOW() - INTERVAL '24 hours';
```

### Incident Response Checklist
- [ ] Post to #launch-control
- [ ] Update status page
- [ ] Identify root cause (Sentry, logs)
- [ ] Apply fix or rollback
- [ ] Verify recovery
- [ ] Document incident ticket
- [ ] Schedule post-incident review

---

**Document Owner:** Platform Lead  
**Last Updated:** 2026-07-17  
**Next Review:** After Day 7 (post-launch retrospective)  
**Version:** 1.0 (Launch Day Runbook)

