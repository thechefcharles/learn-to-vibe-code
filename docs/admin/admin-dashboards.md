# Admin Dashboards — Post-Launch Monitoring Tools

**Access Level:** Instructor role required  
**Location:** `/admin/*` routes  
**Purpose:** Real-time monitoring, data analysis, and learner feedback collection to support post-launch operations

---

## Overview

Three complementary dashboards provide instructors with visibility into learner progress, identify intervention opportunities, and gather qualitative feedback:

1. **Analytics Dashboard** (`/admin/analytics`) — Real-time activity monitoring
2. **Capstone Success Report** (`/admin/insights/capstone-report`) — Performance prediction and analysis
3. **Learner Feedback Form** (`/course/feedback`) — Qualitative insights collection

Access these routes only after signing in with an instructor account.

---

## Analytics Dashboard

**Route:** `/admin/analytics`  
**Refresh Rate:** Auto-refresh every 5 minutes  
**Purpose:** Monitor learner activity, engagement, and completion in real-time

### Key Metrics

**Daily Active Users**
- Count of learners who accessed the platform today
- Indicator of overall engagement and daily participation
- Use to detect drops in activity or unusual patterns

**Today's Quiz Pass Rate**
- Percentage of quiz attempts passing (80%+ score = pass)
- Reflects content comprehension and learner readiness to proceed
- Target: ≥75% pass rate for healthy content difficulty

**Completion Rate**
- Percentage of learners who have completed all 16 modules + capstone
- Tracks overall program progress toward credential issuance
- Use to identify cohort health and burnout risk

**Pending Deliverables**
- Count of module submissions awaiting instructor review
- Includes repo URL, live URL, and submission date for each
- Click to review and approve (unlocks next module)

**Error Rate (Last 24h)**
- Percentage of API calls returning errors (5xx status codes)
- Use to detect infrastructure issues or bugs
- Action: Review server logs if rate >1%

### Status Indicators

**Green** — All metrics within healthy thresholds  
**Yellow** — One or more metrics at warning level; review trends  
**Red** — Critical metric out of range; immediate action recommended  

### How to Use

1. **Daily standup:** Check active users and quiz pass rate
2. **Weekly review:** Assess completion rate and pending deliverables trend
3. **Intervention:** If error rate spikes, check Sentry logs immediately
4. **Cohort comparison:** Use version comparison (kids vs adult) to assess teaching effectiveness

### Related Documentation

See [`docs/playbooks/post-launch-monitoring.md`](../playbooks/post-launch-monitoring.md) for daily/weekly/monthly monitoring procedures.

---

## Capstone Success Report

**Route:** `/admin/insights/capstone-report`  
**Data Source:** All quiz attempts, module completions, and capstone submissions  
**Purpose:** Predict learner success and identify at-risk modules

### Success Factors

Displays Pearson correlation scores (r = -1 to +1) showing which module scores predict capstone success:

- **Strong positive correlation (r > 0.7)** — Module is critical predictor of capstone success; focus teaching efforts here
- **Moderate correlation (0.4–0.7)** — Module contributes meaningfully; ensure learners master concepts
- **Weak correlation (<0.4)** — Module has limited predictive power; focus on engagement over mastery
- **Negative correlation (r < 0)** — Rare; indicates mastery of this module inversely predicts success elsewhere

**Example interpretation:**
- Module 4 (Planning with AI): r=0.82 → Strong predictor. Emphasize technical planning skills early.
- Module 2 (Prompting): r=0.65 → Moderate predictor. Reinforce best practices.
- Module 13 (MCP): r=0.18 → Weak predictor. Teach for engagement; capstone doesn't heavily test this.

### At-Risk Modules

Lists modules ranked by correlation with capstone **failure**:

- **Module X (r_failure = 0.75)** — Learners struggling here are 75% more likely to fail capstone
- **Module Y (r_failure = 0.62)** — Second-highest risk factor

**Action items:**
1. For learners who haven't passed Module X quiz, offer 1-on-1 tutoring or supplementary materials
2. Monitor quiz attempts in at-risk modules for patterns (e.g., time pressure, specific question types)
3. Consider simplifying at-risk module content or adding more practice examples

### Weak Predictors & Strong Predictors

**Weak predictors** (little correlation with capstone) may be:
- Prerequisite concepts now mastered (e.g., setup/environment)
- Less-tested in capstone (e.g., optional tools/MCP)
- Well-taught across the curriculum (high pass rates = high variance)

**Strong predictors** are opportunities for targeted intervention—focus instructor effort here.

### How to Use

1. **Before capstone submissions open:** Review at-risk modules. Offer optional review sessions.
2. **During capstone grading:** When a learner fails, check their performance in at-risk modules to understand root cause
3. **Curriculum iteration:** After 30+ capstone submissions, use weak predictors to identify courses/content to deprioritize or enhance
4. **Cohort comparison:** Run report for kids and adult versions separately to detect teaching effectiveness differences

### Related Documentation

See [`docs/superpowers/plans/2026-07-18-screenshot-and-documentation-plan.md`](../superpowers/plans/2026-07-18-screenshot-and-documentation-plan.md) for technical details on success factor calculation.

---

## Learner Feedback Form

**Route:** `/course/feedback`  
**Submission:** Optional, after each module completion  
**Purpose:** Gather qualitative insights on content clarity, difficulty, and engagement

### Form Questions

**1. How clear was this module's content?** (Likert 1–5)
- 1 = Very unclear, confusing
- 5 = Crystal clear
- Use to identify phrasing, examples, or explanations that need improvement

**2. How difficult was this module?** (Likert 1–5)
- 1 = Too easy
- 5 = Too hard
- Target: 3–4 (appropriately challenging)
- 5s indicate content may need scaffolding or more examples

**3. Did this module challenge you appropriately?** (Likert 1–5)
- 1 = Not challenging enough
- 5 = Overwhelming
- Use to validate difficulty rating and identify engagement issues

**4. Suggestions for improvement** (Open-ended text)
- Learner can propose specific changes: "Add more examples," "Slow down the pacing," "Clarify the auth.uid() concept"
- Review weekly; aggregate common themes

**5. Would you recommend this course to others?** (Yes/No)
- Yes → Strong recommendation signal; learner is engaged and sees value
- No → Red flag; investigate why via follow-up 1-on-1

### How to Use

**After each module:**
- Spend 2 minutes reviewing feedback for that day/module
- Flag any "5" difficulty ratings → offer 1-on-1 support
- Note "No" recommendations → schedule check-in call

**Weekly aggregation:**
- Tally clarity/difficulty/challenge ratings by module
- Identify top 3 suggestions for improvement
- Prioritize easiest wins (e.g., clarifying a screenshot caption)

**Monthly review:**
- Compare kids vs adult feedback for same module (different teaching effectiveness?)
- Incorporate suggestions into curriculum updates
- Track improvement: Did a clarified explanation reduce difficulty scores in the next cohort?

### Related Documentation

See [`docs/playbooks/learner-support.md`](../playbooks/learner-support.md) for support escalation procedures and how to respond to learner feedback.

---

## Access Control

**Who can see these dashboards:**
- Instructor role users (set in `profiles.role = 'instructor'`)
- Must be authenticated (Supabase session required)

**Row-Level Security (RLS):**
- Learners cannot access `/admin/*` routes (403 Forbidden)
- Instructors see aggregated data across all learners (service role query bypass)
- Audit trail: All instructor access is logged in Supabase audit logs

**Creating an instructor account:**

1. Sign up normally with instructor email
2. Use Supabase dashboard or admin API to update `profiles.role = 'instructor'`
3. Log out and back in; instructor routes now accessible

---

## Troubleshooting

**Dashboard shows no data**
- Check: Are there learners enrolled in the system?
- Check: Have learners completed quizzes/modules?
- Check: Is your session expired? (Log out and back in)

**Metrics not updating (not auto-refreshing)**
- Check: Is JavaScript enabled in your browser?
- Check: Are you viewing from a private/incognito tab? (May block local storage)
- Manual refresh: Press Ctrl+R (Windows) or Cmd+R (Mac)

**"Access Denied" or 403 error**
- Check: Are you logged in as an instructor?
- Check: Is your account's `profiles.role` set to `'instructor'` in the database?

**Capstone report shows 0% success rate**
- This is normal if fewer than 3 capstone submissions exist
- Report requires minimum sample size for correlation calculation to be meaningful
- Check back after ≥10 submissions

---

## Next Steps

1. **Instructor training:** Review this guide in onboarding for new graders
2. **Monitoring schedule:** Follow [`docs/playbooks/launch-day.md`](../playbooks/launch-day.md) for daily/weekly check-in cadence
3. **Learner support:** Use feedback to trigger support actions per [`docs/playbooks/learner-support.md`](../playbooks/learner-support.md)
4. **Curriculum updates:** After 30+ learners, use analytics + feedback to iterate course content

---

## Related Files & Architecture

**Dashboard code:**
```
app/admin/analytics/page.tsx               — Analytics UI component
app/api/admin/analytics/route.ts           — Data endpoint (service role query)
app/admin/insights/capstone-report/page.tsx — Capstone report UI
app/api/admin/insights/capstone/route.ts    — Success factor analysis endpoint
app/course/feedback/page.tsx                — Learner feedback form
app/api/course/feedback/route.ts            — Feedback submission handler
```

**Analytics functions:**
```
lib/analytics.ts                        — 11 core analytics queries
lib/capstone-success-factors.ts         — Correlation & prediction logic
```

**Monitoring & support playbooks:**
```
docs/playbooks/post-launch-monitoring.md    — Daily/weekly/monthly procedures
docs/playbooks/learner-support.md            — Support escalation & templates
docs/playbooks/launch-day.md                 — Pre-launch & go-live checklist
```
