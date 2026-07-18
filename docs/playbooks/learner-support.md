# Learner Support Playbook

A practical guide for the support team handling learner issues, from common problems to escalation procedures.

**Last updated:** 2026-07-17  
**Audience:** Support team, instructors, technical staff  
**Quick link:** [Escalation Matrix](#escalation-matrix) | [Email Templates](#email-response-templates) | [Status Check Commands](#procedures-for-common-scenarios)

---

## 1. Common Issues & Resolutions

### 1.1 Quiz Failed 2x (Learner Stuck)

**Symptoms:**
- Learner contacted after failing quiz twice
- Confidence shaken, unsure how to proceed
- May not have reviewed learning materials between attempts

**Root causes:**
- Material not understood
- Rushing through questions
- Quiz questions misaligned with learner's comprehension

**Resolution path:**

1. **Acknowledge & encourage** (within 4 hours)
   - Send [Quiz Encouragement Template](#email-template-quiz-encouragement-after-failure) within 4 hours
   - Highlight: retakes are unlimited, material is designed to be challenging, this is normal

2. **Provide targeted resources** (within 24 hours)
   - Review learner's quiz attempt history (see [Check Quiz Status](#check-quiz-status))
   - Identify weak topic areas based on wrong answers
   - Send link to relevant lesson section + recommend 1-2 focused re-reads

3. **Offer structured next steps** (within 48 hours)
   - Suggest waiting 24 hours before next attempt
   - Recommend learner schedule office hours (if offered) to discuss concepts
   - Share link to learner's dashboard showing path forward

4. **Escalate if 3rd failure** → **Tier 2** (instructor review)
   - Flag for instructor: learner struggling on [module X], needs conceptual support
   - Instructor may offer 1:1 review or provide supplemental material

---

### 1.2 Deliverable Stuck in Review (Waiting Too Long)

**Symptoms:**
- Learner asks: "Where's my review? I submitted 10 days ago"
- Deliverable status shows "pending_review"
- Learner may be blocked on next module

**Root causes:**
- Instructor backlog
- Submission missing required info (repo/URL)
- Auto-checks failed silently

**Resolution path:**

1. **Check submission status** (within 2 hours)
   - See [Check Deliverable Status](#check-deliverable-status)
   - Confirm: submission received, auto-checks passed/failed
   - Identify: any missing info or blockers

2. **If auto-checks failed:**
   - Reply with [Deliverable Auto-Check Failed Template](#email-template-deliverable-auto-check-failed)
   - List specific issues (repo private, URL unreachable, PR not found)
   - Ask learner to fix and resubmit

3. **If stuck in manual review:**
   - Check SLA: is submission past the 3–5 business day window?
   - If yes → escalate to instructor immediately with [Escalation Notice Template](#email-template-escalation-notice)
   - If no → send [Deliverable Review In Progress](#email-template-deliverable-review-in-progress) (reassure + timeframe)

4. **If manually approved but status not updated:**
   - **Tier 3: Technical escalation** → check database/sync issue
   - Flag for dev team: deliverable auto-approval status sync

---

### 1.3 Can't Log In

**Symptoms:**
- Learner: "I forgot my password" / "I never got the verification email"
- Can't access course after signup

**Root causes:**
- Password reset email not received (spam folder, wrong email)
- Account not verified yet
- Email typo during signup
- Browser cache/cookies issue

**Resolution path:**

1. **Immediate troubleshooting** (within 1 hour)
   - Confirm email address they're trying to use
   - Check: is account in system? (see [Check Account Status](#check-account-status))
   - Ask: did they check spam/promotions folder?
   - Suggest: clear browser cache, try incognito window

2. **Send password reset** (within 2 hours)
   - If account exists: use Supabase admin panel to trigger password reset email
   - Provide direct link: `https://learn-to-vibe-code.vercel.app/auth/reset-password`
   - Set expectation: email arrives in 1–5 minutes

3. **If email still not arriving:**
   - Check email domain blacklist / deliverability issues
   - Offer alternative: learner verifies identity, you manually reset account
   - Collect: full name, signup date, account email, phone (last 4 digits)

4. **Escalate if email provider issue:**
   - **Tier 3: Technical** → DNS/email configuration review needed
   - Coordinate with Vercel/Supabase support if widespread

---

### 1.4 Requesting Detailed Feedback (Capstone/Deliverable)

**Symptoms:**
- Learner: "Can you explain why I scored X on the rubric?"
- Learner: "What should I have done differently?"
- Learner wants coaching, not just a grade

**Root causes:**
- Legitimate request for growth
- Capstone/rubric scoring is opaque to learner
- Learner invested heavily, wants to improve for next time

**Resolution path:**

1. **Validate the request** (acknowledge same day)
   - Reply with [Feedback Request Acknowledgment](#email-template-feedback-request-acknowledgment)
   - Set expectation: instructor will review, 3–5 business days

2. **Route to instructor** (within 24 hours)
   - Flag in admin panel: learner requesting detailed feedback
   - Include context: which deliverable/capstone, learner's prior performance
   - Ask instructor: Is learner due for re-attempt? (Most rubrics allow revision rounds)

3. **If re-attempt available:**
   - Instructor provides written feedback targeting 2–3 key areas
   - Learner resubmits within SLA (usually 2 weeks)
   - Document iteration in `capstone_submissions.rubric_scores`

4. **If final grade (no re-attempt):**
   - Instructor writes brief coaching summary (focus on growth)
   - Offer: optional office hours with instructor if time permits

---

### 1.5 Payment / Billing Issues

**Symptoms:**
- "My card was declined"
- "I was charged twice"
- "When do I get access after paying?"
- Learner is blocked on enrollment/tier upgrade

**Root causes:**
- Expired/incorrect card info
- Stripe webhook failure (rare)
- Learner accessing before payment confirmed
- Refund request (quality, access issues, personal)

**Resolution path:**

1. **Identify the issue** (within 2 hours)
   - Check Stripe dashboard for transaction history
   - Confirm: payment status (succeeded/failed/refunded)
   - Check: learner's enrollment tier matches payment

2. **If card declined:**
   - Send [Card Declined Template](#email-template-card-declined)
   - Provide retry link if available
   - Offer fallback: free tier or payment plan option

3. **If charged twice:**
   - Immediately confirm receipt via Stripe
   - If true duplicate: initiate refund same day (within 24 hours)
   - Send [Duplicate Charge Resolution](#email-template-duplicate-charge-resolved)
   - Follow up: confirm refund received in 3–5 business days

4. **If refund requested:**
   - Confirm: reason, enrollment date, progress (to honor refund window)
   - Follow refund policy (TBD in Phase 9)
   - Send [Refund Confirmation](#email-template-refund-confirmation)
   - **Escalate to lead** if:
     - Learner is past refund window but has quality complaint
     - Access issue prevented course progress (technical problem)

---

### 1.6 Time Zone Confusion

**Symptoms:**
- "Why does the dashboard show a deadline at 3 PM? I thought it was 5 PM"
- "Quiz expired before I expected"
- "Capstone defense slots shown in wrong timezone"
- Learner in different timezone, deadlines not clear

**Root causes:**
- Platform displays server time (UTC) without conversion
- Learner didn't set timezone preference
- Deadline unclear in learner's local time
- Async vs live event confusion

**Resolution path:**

1. **Clarify immediately** (within 1 hour)
   - Confirm learner's timezone (ask directly or check profile)
   - Convert deadline to their local time
   - Send [Timezone Clarification Template](#email-template-timezone-clarification)

2. **Update learner settings** (within 24 hours)
   - Guide learner to preferences → set timezone
   - Confirm: all future deadlines now show in local time
   - Provide: calendar export links in learner's timezone

3. **If deadline passed due to timezone issue:**
   - Check: how much time was missed? (hours vs days?)
   - If <2 hours: grant brief extension (e.g., +4 hours)
   - If >2 hours: escalate to instructor (may grant exception)

4. **Platform note:**
   - Flag in future: **Phase 10** should show deadlines in learner's timezone by default

---

### 1.7 Capstone Expectations Unclear

**Symptoms:**
- "Can I use an existing project for the capstone?"
- "Do I need to defend live or is video OK?"
- "What's the rubric? How do I pass?"
- Learner confused about scope/requirements before starting

**Root causes:**
- Capstone brief may be dense (4–5 pages)
- Rubric scoring criteria not obvious to learner
- Learner didn't review materials before asking

**Resolution path:**

1. **Provide quick reference** (within 4 hours)
   - Send [Capstone Orientation Template](#email-template-capstone-orientation)
   - Include: 1-page summary of requirements, rubric quick-start, timeline
   - Link to full brief + rubric (in `/capstone` page)

2. **If learner wants to use existing project:**
   - Check with instructor: does project meet learning objectives?
   - Instructor reviews scope + learning goals
   - May require: reflection essay + additional stretch goal

3. **If unclear on defense format:**
   - Confirm: async video recording is default (MVP)
   - Duration expectation: ~10 minutes (technical demo + brief explanation)
   - Provide: [Defense Format Guide](./capstone-defense-format.md) (TBD)

4. **Escalate if learner shows low readiness:**
   - If learner asks basic Q's before Module 14: reassure, say it's normal to wonder early
   - If learner starts capstone grossly unprepared: instructor reaches out proactively

---

## 2. Email Response Templates

All templates below use **`[PLACEHOLDERS_IN_BRACKETS]`** for names, dates, URLs. Copy-paste and fill in before sending.

---

### Email Template: Quiz Encouragement After Failure

**Subject:** You've Got This — Quiz Retakes Are Unlimited 💪

```
Hi [LEARNER_NAME],

Thanks for tackling Module [X] quiz — I see you gave it your best shot on your [1st/2nd] attempt. 
That takes courage, and the fact that you're trying tells me you're serious about learning this.

Here's the truth: **quiz retakes are unlimited and designed that way.** The questions are meant to 
be challenging because real AI-assisted development requires precision. Failing a quiz here means 
you're building that muscle.

**What to do next:**

1. Review the material one more time — focus on [specific topic, e.g., "RLS policies" or "middleware patterns"]
   Link: https://learn-to-vibe-code.vercel.app/course/module-[X]

2. Take a break (24 hours recommended). Your brain does amazing things overnight.

3. Retake the quiz whenever you're ready — no penalty, no time limit.

**You've already completed [X] modules successfully.** One tough quiz doesn't change that. 
Keep going.

If you want to chat about the concept behind a specific question, reply here or book office hours 
(if available in your tier).

Cheering you on,
[SUPPORT_TEAM_NAME]
```

---

### Email Template: Deliverable Review in Progress

**Subject:** Your [Module X] Deliverable Is Being Reviewed ✅

```
Hi [LEARNER_NAME],

Great news — your [Module X] deliverable submission was received on [SUBMISSION_DATE] and passed 
our automated checks.

**Your review is underway.**

Instructor reviews typically take **3–5 business days** from submission date. You're currently in 
position [X] in the review queue. Based on our timeline, you can expect feedback by **[ESTIMATED_DATE]**.

**What happens next:**

Once reviewed, you'll see:
- ✓ Approved — You unlock [Module Y] and level up
- 🔄 Feedback needed — Specific changes requested. You'll have [timeframe] to resubmit.

We'll email you the moment your review is complete.

Thanks for your patience. In the meantime, you can start reading Module [Y] materials 
or review any quiz feedback.

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Deliverable Auto-Check Failed

**Subject:** Your [Module X] Submission Needs a Small Fix

```
Hi [LEARNER_NAME],

We received your [Module X] deliverable submission, but our automated checks caught a few things 
that need fixing before instructor review:

**Issues found:**
- 🔴 [Repository URL is private / not accessible] — Please make the repo public or grant us read access
- 🔴 [Live URL returned 404] — Please verify the deployment is live
- 🔴 [No PR found in repo] — Please create a PR or check the URL

**How to fix:**

1. Address each issue above in your submission
2. Return to https://learn-to-vibe-code.vercel.app/course/module-[X]/submit
3. Re-upload with the corrected repo/URL
4. Resubmit — the auto-checks will run again (usually <5 min)

Once auto-checks pass, your submission goes straight to the instructor queue.

**Questions?** Reply here or check our [Deliverable FAQ](./faq.md).

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Escalation Notice

**Subject:** Action Needed: Your [Module X] Review Is Overdue

```
Hi [LEARNER_NAME],

We noticed your [Module X] deliverable has been waiting for instructor review for **[DAYS] days** 
— longer than our standard 3–5 business day window.

This isn't acceptable, and we're fixing it now.

**Action taken:**
✓ Escalated to [INSTRUCTOR_NAME] with priority flag
✓ Expected feedback by [NEW_DEADLINE_DATE]

**Your next steps:**
- Sit tight. You'll hear from us within 24 hours.
- If you don't hear back by [DATE], reply to this email immediately.

We know delays are frustrating. We're on it.

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Feedback Request Acknowledgment

**Subject:** We're Getting Your Detailed Feedback Ready

```
Hi [LEARNER_NAME],

Thanks for asking for detailed feedback on your [capstone/deliverable]. That kind of reflection 
is exactly what serious builders do.

We've flagged your request for [INSTRUCTOR_NAME] to review. You can expect a detailed 
response within **3–5 business days** that breaks down:
- What you did well
- Specific areas to strengthen
- Next steps if you want to iterate

In the meantime, feel free to review the rubric one more time:
https://learn-to-vibe-code.vercel.app/capstone

Hang tight.

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Completion Congratulations + Certificate

**Subject:** 🎓 You Did It! Your Certificate Is Ready

```
Hi [LEARNER_NAME],

You are officially an **Accredited Vibe Coding Course** completer. 

On [COMPLETION_DATE], you:
✓ Passed all 16 module quizzes
✓ Submitted and approved all deliverables
✓ Completed the capstone project
✓ Earned [X] CEUs of professional development credit

**Your certificate:**
Download: https://learn-to-vibe-code.vercel.app/dashboard/certificates
Shareable link: [UNIQUE_CERT_URL]

You can share this link with employers, professional networks, or anywhere you want 
to show proof of completion. The certificate includes your completion date, CEU count, 
and a unique verification ID ([CERT_ID]).

**What's next?**
- Share your capstone project on GitHub or your portfolio
- Tell us about your experience (feedback survey link)
- Join the alumni community (Slack/Discord — link below)

You should be proud. You built something real, and you did it with AI as your partner — 
that's the future.

Congratulations,
[SUPPORT_TEAM_NAME]

P.S. Not sure how to share your certificate? Check out this guide: [sharing guide link]
```

---

### Email Template: Card Declined

**Subject:** Your Payment Needs a Quick Fix

```
Hi [LEARNER_NAME],

We tried to process your payment for [TIER/AMOUNT] on [DATE], but your card was declined.

This usually happens because:
- Card expired
- Incorrect billing zip code
- Bank flagged it as suspicious (international charge)
- Insufficient funds

**How to fix it:**

Retry payment here: https://learn-to-vibe-code.vercel.app/checkout?retry=[SESSION_ID]

Or:
1. Log in to your account
2. Go to Settings → Billing
3. Update your payment method
4. Retry

**Still having issues?**
- Try a different card
- Contact your bank (they can whitelist us)
- Reply here and we'll explore alternative payment options

Once payment succeeds, you'll have instant access.

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Duplicate Charge Resolved

**Subject:** Your Duplicate Charge Has Been Refunded ✓

```
Hi [LEARNER_NAME],

We found the duplicate charge on your account and have **initiated a full refund** of 
$[AMOUNT] to your [CARD_LAST_4].

**Refund details:**
- Amount: $[AMOUNT]
- Refunded on: [DATE]
- Refund ID: [STRIPE_REFUND_ID]
- Expected arrival: 3–5 business days (depends on your bank)

You should see the credit in your account by [EXPECTED_DATE]. If you don't, let us know.

We apologize for the inconvenience. You're all set with one charge of $[AMOUNT] for [TIER].

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Refund Confirmation

**Subject:** Refund Confirmed — Course Access Changes

```
Hi [LEARNER_NAME],

We've processed your refund request for $[AMOUNT]. Here's what happens next:

**Refund:**
- Amount: $[AMOUNT]
- Processed on: [DATE]
- Expected in your account: [3–5 business days]

**Your access:**
- Course access: [Revoked/Reduced to free tier] effective immediately
- You can still view Modules 0–3 (public preview)
- Your progress data is archived for 90 days (in case you re-enroll)

**Re-enrollment:**
If you want to come back, just log in and upgrade anytime. Your old progress won't be restored, 
but we can help you pick up where you left off.

Thanks for giving Vibe Coding a shot. We'd love to hear what we could improve:
[Brief feedback form link]

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Timezone Clarification

**Subject:** Clarifying Your Deadline Time Zone

```
Hi [LEARNER_NAME],

I noticed a timezone mix-up. Let me clear this up:

**Your deadline for [Module X]:**
- Shows as [SERVER_TIME] UTC on the platform
- In your timezone ([LEARNER_TIMEZONE]): **[LOCAL_TIME]** on [DATE]

So you have until **[LOCAL_TIME]** on **[DATE]** to submit.

**To fix this for all future deadlines:**
1. Log in to https://learn-to-vibe-code.vercel.app
2. Go to Settings → Preferences
3. Set your timezone to [LEARNER_TIMEZONE]
4. Save — all future deadlines will show in your local time

Let me know if you have questions or need a deadline extension.

[SUPPORT_TEAM_NAME]
```

---

### Email Template: Capstone Orientation

**Subject:** Quick Start: Capstone Project Overview

```
Hi [LEARNER_NAME],

Excited to see you thinking about the capstone! Here's the no-fluff overview:

**The ask:**
Build a small AI-assisted project (new or enhanced existing) that shows what you've learned 
in Modules 1–15. Could be a web app, automation, data project — whatever fits your learnings.

**Requirements (rubric is graded on these):**
✓ Code quality (follows patterns taught in course)
✓ AI integration (meaningfully uses Claude/LLMs)
✓ Completeness (all core features working)
✓ Documentation (README, clear setup)
✓ Reflection essay (500 words: what you learned, what's next)

**Defense (async video):**
Record a ~10 min video:
- 1 min intro + scope
- 6 min technical walkthrough
- 3 min: what you'd do differently / next steps

Upload the video link with your capstone submission. No live presentation required (MVP).

**Timeline:**
- Available to start: After Module 15 completion
- Submission deadline: [TBD based on policy]
- Review: 5–7 business days
- Feedback/re-attempt window: 2 weeks

**Want more?**
Full brief + rubric: https://learn-to-vibe-code.vercel.app/capstone
FAQ: [capstone-faq.md](./capstone-faq.md)
Example projects: [examples link]

Have a question before you start? Just reply.

[SUPPORT_TEAM_NAME]
```

---

## 3. Support Tier Definitions

Clear SLAs and scope for each tier. **Use escalation matrix (Section 4) to decide which tier.**

### Tier 1: Email Support (24-Hour Response)

**Handled by:** Support team (non-technical)

**Scope:**
- General account questions (signup, login, password reset)
- Course logistics (deadlines, access, materials)
- Billing (card declined, refund requests)
- General encouragement/motivation
- FAQ-based troubleshooting

**Response time:** ≤4 hours (24 hours max)

**Resolution rate:** 60–70% of issues resolved at this tier without escalation

**Tools available:**
- Email
- FAQ database
- Supabase admin panel (read-only account data)
- Stripe dashboard (read transaction history)

**Escalation trigger:**
- Technical issue (database, email provider, deployment)
- Requires instructor judgment (quiz/grading appeal, capstone exception)
- Requires code change (bug investigation, feature request)

---

### Tier 2: Instructor Review (3–5 Business Days)

**Handled by:** Instructor(s)

**Scope:**
- Quiz performance review (learner struggling, needs conceptual support)
- Deliverable feedback (code review, approval decision)
- Capstone rubric scoring + detailed feedback
- Learning objective alignment (learner claims material unclear)
- Re-attempt authorization (failed quiz 3x, wants retry past deadline)
- Grade appeals (learner disagrees with score)

**Response time:** 3–5 business days from escalation

**Tools available:**
- Supabase (read all submissions, grade history)
- Quiz attempt data + answer keys
- Deliverable repo access (verified via auto-checks)
- Capstone rubric scoring form (admin panel)
- Communication with learner (email template or scheduled call)

**Escalation trigger:**
- Learner requesting legal interpretation (refund policy, accreditation terms)
- Dispute involving payment (duplicate charge, fraud claim)
- Urgent technical issue (learner locked out of course)

---

### Tier 3: Technical Escalation (Immediate for Critical)

**Handled by:** Technical team / Platform lead

**Scope:**
- Login broken (widespread, not individual)
- Payment processing failures (Stripe webhook down)
- Database sync issues (grade not updating, data inconsistency)
- Email delivery failures (no emails sending)
- Deployment issues (course unavailable)
- Security incident (suspected unauthorized access)
- Data access request (GDPR, learner data export)
- Bug investigation + hotfix

**Response time:**
- Critical (course down, payment failure): Immediate acknowledgment + 2 hour target
- High (individual learner locked out): Within 1 hour
- Medium (data inconsistency): Within 4 hours

**Escalation from:** Tier 1 or Tier 2 if technical root cause identified

---

## 4. Escalation Matrix

**Use this table to route issues correctly.**

| Issue | Initial Tier | Decision Point | Escalate To | Timeline | Notes |
|-------|--------------|-----------------|-------------|----------|-------|
| **Password reset not working** | Tier 1 | Is it widespread? | Tier 1: Try alt email / clear cache. <br> Tier 3: If >5 learners report | <4 hrs | Check spam folder first |
| **Quiz failed (1st–2nd time)** | Tier 1 | Is learner asking for help? | Tier 1: Send encouragement + materials. <br> Tier 2: If 3rd+ failure | <24 hrs | Unlimited retakes policy |
| **Quiz failed (3rd+ time)** | Tier 2 | Does learner show misunderstanding? | Instructor: Offer office hours / supplemental material. <br> Consider alternative assessment | 3–5 days | Document attempt history |
| **Deliverable stuck in review** | Tier 1 | Is it >5 business days? | Tier 1: Check auto-checks status. <br> Tier 2: Escalate with priority flag | <4 hrs | Monitor queue health |
| **Deliverable auto-checks failed** | Tier 1 | Can learner fix it themselves? | Tier 1: Send template + link to resubmit | <2 hrs | URL reachability, repo access |
| **Can't log in / account locked** | Tier 1 | Is learner verified? | Tier 1: Password reset, clear cache. <br> Tier 3: If email broken or account corrupted | <1 hr | Check email deliverability |
| **Card declined** | Tier 1 | Is it a systemic issue? | Tier 1: Troubleshoot card / retry. <br> Tier 3: If Stripe webhook failure | <2 hrs | Check Stripe logs |
| **Duplicate charge** | Tier 1 | Is refund needed? | Tier 1: Confirm duplicate + initiate refund same day. <br> Tier 2: If dispute | <24 hrs | Process refund immediately |
| **Refund request** | Tier 1 | Within refund window? | Tier 1: Check policy + approve/deny. <br> Tier 2: If policy exception | <24 hrs | Document reason |
| **Capstone expectations unclear** | Tier 1 | Is learner ready to start? | Tier 1: Send orientation template. <br> Tier 2: If learner shows low readiness | <4 hrs | Proactive instructor check at Module 14 |
| **Capstone feedback request** | Tier 1 | Can it be delegated? | Tier 2: Instructor provides detailed feedback | 3–5 days | Opportunity for re-attempt |
| **Grade appeal / scores wrong** | Tier 1 | Is there a calculation error? | Tier 2: Instructor review + regrade if needed | 3–5 days | Keep audit trail |
| **Time zone confusion** | Tier 1 | Is deadline passed? | Tier 1: Clarify in local time. <br> Tier 2: If exception needed | <2 hrs | Help set timezone pref |
| **Email not received** | Tier 1 | Is it in spam? | Tier 1: Resend or confirm address. <br> Tier 3: If DNS/ISP issue | <4 hrs | Check deliverability logs |
| **Course access / unlock issue** | Tier 1 | Is it policy or technical? | Tier 1: Check requirements. <br> Tier 3: If data sync issue | <2 hrs | Verify quiz score + deliverable status |
| **Learner data export / GDPR** | Tier 1 | Legal requirement? | Tier 3: Immediate with legal review | 24–48 hrs | Compliance critical |
| **Suspected unauthorized access** | Tier 1 | Security incident? | Tier 3: Immediate investigation | <30 min | Password reset + account audit |
| **Bulk email failures** | Tier 1 | Many learners affected? | Tier 3: Check email provider + logs | <1 hr | May require temporary workaround |
| **Course unavailable / 500 error** | Tier 1 | Deployment issue? | Tier 3: Immediate incident response | <15 min | Critical priority |

---

## 5. Key Metrics & Tracking

Track these metrics weekly to identify trends and measure support quality.

### Response Time

| Metric | Target | Tier | How to measure |
|--------|--------|------|-----------------|
| **First response time** | <4 hours | Tier 1 | Time from ticket creation to first reply (in ticketing system) |
| **Issue resolution time** | 80% resolved <24 hrs | Tier 1 | Subset: issues that resolve without escalation |
| **Escalation time** | <1 hour | Tier 1→2/3 | Time to escalate when decision made |
| **Tier 2 callback time** | 3–5 business days | Tier 2 | Time from escalation to instructor response |
| **Critical issue response** | <30 min | Tier 3 | Course down, payment broken, security incident |

### Volume & Trend

Track in spreadsheet or ticketing system:
- **Issues by category** (quiz, deliverable, auth, billing, capstone, other)
- **Repeat issues** (same learner, same problem — may indicate UX issue)
- **Escalation rate** (% of Tier 1 issues escalated — target: <30%)
- **Peak times** (Monday morning? Day before deadline? End of week?)

### Learner Satisfaction

Send brief survey after ticket resolution:
- "Was your issue resolved?" (yes/no)
- "How would you rate support?" (1–5 stars)
- "What could we improve?" (free text)

**Target:** ≥80% satisfaction rating

### Repeat Issues & Systemic Fixes

**Weekly review:**
1. Identify issues appearing 3+ times in a week
2. Assess: is it UX (confusing flow), docs (unclear guide), or learner coaching?
3. Example fixes:
   - Timezone confusion → make timezone preference default prompt after signup
   - Quiz concepts unclear → add module-specific study guide
   - Deliverable auto-checks fail → add pre-submit validation to UI
   - Capstone expectations unclear → add guided intro flow

---

## 6. Procedures for Common Scenarios

Step-by-step procedures for support team. Use these for consistent, auditable interactions.

---

### Check Account Status

**When to use:** Learner can't log in, or you need to verify account info

**Procedure:**

1. Open Supabase dashboard (link: [ask tech lead for access])
2. Go to **SQL Editor** → Create new query
3. Paste:
   ```sql
   SELECT id, email, name, role, created_at, encrypted_password
   FROM profiles
   WHERE email = '[LEARNER_EMAIL]'
   LIMIT 1;
   ```
4. Execute. Result should show 1 row if account exists.
5. **Check:**
   - ✓ Account exists → password reset available
   - ✗ Account not found → new signup needed
   - ⚠️ Multiple rows → possible duplicate (escalate to Tier 3)

6. **Document:** Note in ticket: account status + any findings

---

### Check Quiz Status

**When to use:** Learner failed quiz, you're tracking attempts or need to understand weak areas

**Procedure:**

1. Open Supabase dashboard
2. Go to **quiz_attempts** table (no SQL needed, use table view)
3. Filter: `user_id = [LEARNER_ID]` AND `module_id = [MODULE_NUMBER]`
4. **View columns:**
   - `attempt_no` — which attempt (1, 2, 3, ...)
   - `score` — % score (e.g., 60%, 75%, 100%)
   - `passed` — true/false (80%+ is passing)
   - `taken_at` — timestamp

5. **Analyze:**
   - If `passed = true` for any row → learner already passed this quiz
   - If `passed = false` for rows 1–2 → send encouragement template + review materials
   - If `passed = false` for row 3+ → escalate to Tier 2 (instructor)

6. **Document:** Note in ticket which attempt, score, date

---

### Check Deliverable Status

**When to use:** Learner asks about review progress, or you need to troubleshoot auto-checks

**Procedure:**

1. Open Supabase dashboard
2. Go to **deliverables** table
3. Filter: `user_id = [LEARNER_ID]` AND `module_id = [MODULE_NUMBER]`
4. **Check columns:**
   - `status` — pending_review | approved | needs_revision | rejected
   - `repo_url` — GitHub repo link
   - `live_url` — deployed site URL
   - `auto_checks` — JSON showing which checks passed/failed (e.g., `{ "repo_accessible": true, "url_reachable": false }`)
   - `submitted_at` — submission timestamp

5. **Interpret:**
   - If `auto_checks.repo_accessible = false` → repo is private, send auto-check failed template
   - If `auto_checks.url_reachable = false` → deployment is down/404, send auto-check failed template
   - If `status = pending_review` and `submitted_at` is >5 business days ago → escalate with priority
   - If `status = approved` but learner doesn't see unlock → escalate to Tier 3 (sync issue)
   - If `status = needs_revision` → check `notes` field for instructor's feedback

6. **Document:** Note submission date, status, auto-check results

---

### Check Module Unlock Status

**When to use:** Learner says they can't access next module

**Procedure:**

1. Open Supabase dashboard
2. Go to **module_progress** table
3. Filter: `user_id = [LEARNER_ID]`
4. Sort by `module_id` ascending
5. **Check for each module:**
   - If `unlocked = false` → check unlock conditions
   - If `unlocked = true` — next module should be available

6. **Verify unlock conditions** (for module N, must have passed module N-1):
   - Go to **quiz_attempts** table → find latest attempt for module N-1
   - Confirm: `score >= 80` AND `passed = true`
   - Go to **deliverables** table → find submission for module N-1
   - Confirm: `status = 'approved'`
   - If either is missing/failed → that's why module N is locked

7. **Resolve:**
   - If both met but `unlocked = false` → data sync issue, escalate to Tier 3
   - If requirements not met → explain in reply which requirement they still need to complete

8. **Document:** Note which module, which requirement missing

---

### Request Instructor Intervention

**When to use:** Issue needs instructor judgment (capstone grading, quiz appeal, learning accommodation)

**Procedure:**

1. **Prepare brief summary** (for instructor efficiency):
   - Learner name + email
   - Issue type (quiz appeal, capstone feedback, conceptual support, etc.)
   - Key context (e.g., failed quiz 3x, scores: 65%, 72%, 68%; learner says material is unclear)
   - Learner's request (explicit: "wants office hours", "requests detailed feedback", etc.)
   - Any relevant links (quiz attempt URL, deliverable review page)

2. **Method of request** (check which your team uses):
   - **Slack channel:** Post in #instructor-queue with tag @[instructor_name]
   - **Email:** Send to [instructor_email] with subject `[ESCALATION] [learner_name] — [issue_type]`
   - **Spreadsheet:** Add row to shared escalations tracker with due date

3. **Set SLA in request:** "Needed by [DATE]" (usually 3–5 business days)

4. **Follow-up:** If no response by SLA + 1 day, escalate to course lead / platform lead

5. **Document:** Log in ticket system that escalation was sent, note date/time

---

### Document Interactions

**When to use:** Every ticket (for audit trail, accreditation compliance)

**Procedure:**

1. **Create ticket** in system of record (Supabase + email thread, or dedicated ticketing tool):
   - Learner name + email
   - Date issue reported
   - Issue category (from Section 1)
   - Tier assigned

2. **Log each interaction:**
   - Timestamp + action (email sent, query run, escalation requested, resolved)
   - Summary of findings (e.g., "Quiz score 72%, failed twice, auto-checks show missing repo PR")
   - Template used (if applicable)
   - Next step + expected date

3. **Close ticket** when:
   - Learner confirms issue resolved, or
   - 7 days pass with no response from learner (mark as resolved / no further action)

4. **Archive:**
   - Keep records for ≥1 year (accreditation audit requirement)
   - Anonymize for later analysis (trend identification)

**Example log entry:**
```
TICKET #2847
Learner: alice@example.com (Alice Morgan)
Date reported: 2026-07-16
Issue: Quiz failed 2x, needs encouragement

2026-07-16 13:45 — Tier 1: Checked quiz_attempts table
  Scores: 65% (July 15), 68% (July 16), both failed (need 80%)
  Sent: Quiz Encouragement template + link to Module 5 materials
  Next: Await learner response, follow up if no retry by July 18

2026-07-18 10:30 — Learner retook quiz (72%), still failed
  New finding: Consistent low performance on RLS topics (2/3 RLS questions missed)
  Decision: Escalate to Tier 2 (instructor)
  Escalated to: @instructor_jane, subject "[ESCALATION] Alice Morgan — Quiz 3 Failure, Needs Conceptual Support"
  Expected response: By July 21

STATUS: ESCALATED → Tier 2
```

---

## Quick Reference Cards (Laminate These)

### Tier 1 (Support Team) — What to Do

| Learner Says | Your First Move | Template | Escalate If |
|--------------|-----------------|----------|-------------|
| "I forgot my password" | Password reset link | Card Declined (adapt) | Email not arriving |
| "Can't log in" | Check spam, clear cache, retry | Login Help | >5 learners report |
| "Quiz failed twice" | Send encouragement | Quiz Encouragement | 3rd failure |
| "Deliverable stuck?" | Check auto-checks status | Review in Progress | >5 days old |
| "Card declined" | Troubleshoot / retry | Card Declined | Stripe issue |
| "Timezone confused?" | Convert deadline + set pref | Timezone Clarification | Extension needed |
| "Capstone unclear" | Send orientation | Capstone Orientation | Learner unprepared |
| "When's my certificate?" | Verify completion | Completion Congratulations | Not completed |

### Tier 2 (Instructor) — When to Get Involved

- Quiz failed 3x in a row
- Learner requests conceptual support
- Deliverable needs detailed code feedback
- Capstone scoring or rubric questions
- Learning objective alignment concern
- Grade appeal or exception request

### Tier 3 (Technical) — When to Call

- Course unavailable / 500 error
- Login broken for multiple learners
- Payments not processing
- Emails not sending
- Data inconsistency (grade not updating)
- Security incident
- Database query outside support team scope

---

## Frequently Asked "How Do I..." Questions

### Q: "How do I reset a learner's password?"

A: Use Supabase admin panel (requires access). Go to Auth → Users, find learner, click "Reset password". They'll get an email. If email broken, escalate to Tier 3.

### Q: "Can a learner retake a quiz?"

A: Yes, unlimited retakes. They'll get the same module's quiz but with shuffled questions. No penalty.

### Q: "How long does a refund take?"

A: Stripe processes in 3–5 business days. You initiate in Stripe dashboard same day. Follow up in ticket.

### Q: "Can I override a quiz/deliverable status?"

A: No. Only instructor (Tier 2) can change rubric scores or delivery approval status. For quiz scores, only if calculation error found.

### Q: "What if a learner says material is unclear?"

A: Escalate to Tier 2 (instructor). They decide if it's a teaching issue or learner readiness issue. May result in office hours or supplemental material.

### Q: "Can learner use an existing project for capstone?"

A: Escalate to Tier 2. Instructor reviews scope + learning objectives. Often yes with caveats (reflection essay + stretch goal required).

### Q: "My email template doesn't fit. What do I do?"

A: Adapt the template language but keep the core content + tone. If you'd add more than 1–2 sentences, check with team lead first (may indicate missing guidance).

### Q: "I'm getting 5 similar issues in a week. What do I do?"

A: Document in weekly report. Escalate to platform/course lead with: issue summary, affected learners, root cause hypothesis. This triggers a fix (UX, docs, etc.).

---

## Glossary

- **Tier 1:** Email support, account basics, FAQ troubleshooting
- **Tier 2:** Instructor review, grading, coaching, judgment calls
- **Tier 3:** Technical / platform team, system-level issues, security
- **Escalation:** Moving a ticket from Tier 1 → 2/3 when initial resolution isn't possible
- **SLA:** Service Level Agreement (response + resolution time)
- **Auto-checks:** Automated validation that repo is accessible, URL is reachable, PR exists (runs when deliverable submitted)
- **RLS:** Row-Level Security (Supabase feature; restricts which data a user can read/write)
- **Rubric score:** Capstone grade based on criteria (code quality, AI integration, documentation, reflection)
- **CEU:** Continuing Education Unit (0.1 CEU ≈ 1 hour of instruction)

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-17 | Initial playbook: 7 common issues, email templates, tier definitions, escalation matrix, metrics, procedures |

---

**Last reviewed:** 2026-07-17  
**Next review:** 2026-09-17 (quarterly)  
**Owned by:** Support Lead / Course Lead  
**Feedback/updates:** Post in #support-playbook Slack or email [support-lead@example.com]
