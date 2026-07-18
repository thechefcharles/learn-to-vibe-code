# Legal Review: Learn to Vibe Code Platform
**Reviewer Role:** Business Lawyer (Educational/SaaS focus)  
**Date:** July 18, 2026  
**Status:** DRAFT - REQUIRES ATTORNEY REVIEW BEFORE LAUNCH

---

## EXECUTIVE SUMMARY

**Overall Assessment:** 🔴 **NOT READY FOR LAUNCH**

Your legal documents exist but have **critical gaps** that expose you to liability, particularly around:
1. Certificate accreditation status (prominently misleading)
2. Educational content disclaimers
3. Data protection compliance (GDPR/CCPA)
4. Learner records and data retention
5. No explicit limitation of liability for educational failure

**Risk Level:** HIGH
- **Accreditation misrepresentation**: Your site calls it "Accredited Vibe Coding Course" but the certificate is NOT yet accredited. This is a major red flag for consumer protection and false advertising.
- **No educational disclaimers**: You're offering educational content but not disclaiming what learners should expect.
- **Missing data protection language**: You store learning records but don't clearly state how long you keep them or learner rights.

**Before launch, you need:**
1. ✅ Rename/clarify "Accredited" status (it's aspirational, not current)
2. ✅ Add certificate disclaimer language
3. ✅ Add educational content disclaimers
4. ✅ Add GDPR/CCPA compliance sections
5. ✅ Add learner data retention policy
6. ✅ Attorney final review

---

## DETAILED FINDINGS

### 🔴 CRITICAL: Accreditation Terminology

**Problem:**
- Your site is called "Accredited Vibe Coding Course"
- Your marketing calls it accredited
- Your certificate says "Accredited Vibe Coding Course"
- But your CLAUDE.md and docs state: "pending CPD credential (interim, 3-month fast track)" and "IACET accreditation ~12 months post-launch"
- **This is false advertising.** The course is NOT accredited yet.

**Risk:**
- FTC violation (false/misleading advertising)
- State AG action (educational fraud)
- Consumer complaints (learners think they're getting an accredited credential; they're getting a completion certificate)
- Bad faith when applying for accreditation (accreditors will see the misleading marketing)

**Recommendation:**
Immediately change all marketing and legal language:
- Rename to: **"Vibe Coding Course"** (remove "Accredited")
- Change tagline to: **"Pursuing Accreditation"** or **"Accreditation in Progress"**
- Update Terms/Privacy to include:

```markdown
## ACCREDITATION STATUS DISCLAIMER

Learn to Vibe Code is pursuing accreditation with [CPD/IACET] but is NOT currently 
an accredited program. Your completion certificate is a proof of course completion, 
not a transferable academic credit or professional certification.

Current Status:
- ✓ Pursuing CPD accreditation (targeted: Q4 2026)
- ✓ Pursuing IACET accreditation (targeted: Q3 2027, 12 months post-launch)
- ✗ Not currently accredited by any external body

This certificate is issued by Learn to Vibe Code and represents your completion of 
our curriculum. It is NOT equivalent to an accredited degree or professional license.
```

---

### 🔴 CRITICAL: No Certificate/Credential Disclaimer

**Problem:**
Your Terms and certificate make no disclaimer about:
- What the certificate is worth (it's just a completion badge, not a job guarantee)
- Whether it's transferable (it's not)
- Whether it's a professional license (it's not)
- Employer recognition (completely unknown)

**Risk:**
- False advertising (learners think certificate = job)
- Bait-and-switch (free course but certificate is worthless)
- Consumer fraud claims

**Recommendation:**
Add this section to Terms of Service:

```markdown
## CERTIFICATE DISCLAIMER

The completion certificate issued upon capstone pass is:

✓ Proof that you completed our 16-module curriculum
✓ Evidence of learning and demonstrated competency in AI-assisted development
✗ NOT a professional license or degree
✗ NOT transferable for academic credit at universities
✗ NOT a guarantee of employment or salary
✗ NOT a substitute for formal accreditation

Employer Recognition:
We cannot guarantee that employers will recognize or value this certificate. 
Some employers may value self-directed learning; others may not. Your certificate 
is one data point in a portfolio, not a credential that replaces formal education.

Learner Responsibility:
YOU are responsible for assessing whether this course meets your career goals. 
We provide the content, instruction, and assessment tools. Your success depends 
on your effort, practice, and how you apply these skills in real-world projects.
```

---

### 🟠 HIGH: No Educational Content Disclaimers

**Problem:**
You offer educational content (16 modules, 93 hours) but your Terms don't:
- Disclaim the accuracy of instructional content
- State that learners may not pass despite effort
- Clarify learning outcomes are variable
- Disclaim liability if learner doesn't reach their career goals

**Risk:**
- Lawsuits if learners complete the course but don't get jobs
- Claims of false advertising ("Free, but I wasted 93 hours")
- Complaints that teaching quality isn't "professional" (it's AI-generated)

**Recommendation:**
Add to Terms of Service:

```markdown
## EDUCATIONAL CONTENT DISCLAIMER

Course Quality & Delivery:
- All course materials, lessons, and assessments are delivered as-is.
- Content is generated using AI tools (Claude, Cursor, Claude Code) and may contain errors.
- We make no guarantee that lessons are perfect, complete, or universally applicable.
- You may encounter technical issues, unclear explanations, or content that doesn't match your learning style.

Learning Outcomes:
- Completing all modules does NOT guarantee:
  * A job in software development
  * A specific salary or career advancement
  * Industry-wide recognition or credibility
  * Mastery of all AI development concepts
- Learning outcomes vary by individual effort, background, and application.

No Warranty of Instruction:
- We do not warrant that your experience with the course will meet your expectations.
- We do not warranty that instructional content is accurate for your specific use case.
- Learners are responsible for verifying technical accuracy and applicability.

Limitation of Liability:
- If you do not pass a quiz or capstone: We are not liable for loss of time, tuition 
  reimbursement (though the course is free), or career impact.
- If you complete the course but don't get a job: We are not liable for employment 
  outcomes, salary loss, or career harm.

Your Responsibility:
- You are responsible for your own learning and outcomes.
- Completing this course requires self-discipline, practice, and independent problem-solving.
- Do not rely solely on this course for your technical education; supplement with other resources.
```

---

### 🟠 HIGH: Missing GDPR/CCPA Compliance

**Problem:**
Your Privacy Policy is vague about:
- GDPR data subject rights (EU learners can request all data, deletion, portability)
- CCPA consumer rights (CA learners can opt-out of data sales)
- How long you retain learning records
- Whether data is ever deleted
- Data processing agreements with Supabase/Stripe

**Risk:**
- GDPR fines: up to €20M or 4% of global revenue (whichever is higher)
- CCPA fines: up to $7,500 per violation
- Learner data requests you can't fulfill (regulatory liability)

**Recommendation:**
Replace Privacy Policy's Section 4 ("Disclosure of Your Information") with:

```markdown
## DATA PROTECTION & PRIVACY RIGHTS

### EU Residents (GDPR Compliance)

If you are located in the EU, you have the following rights:
- **Right to Access:** Request a copy of all personal data we hold about you
- **Right to Rectification:** Correct inaccurate information
- **Right to Erasure ("Right to Be Forgotten"):** Request deletion of your data 
  (except where we have legal obligations to retain)
- **Right to Data Portability:** Receive your data in a portable format
- **Right to Restrict Processing:** Limit how we use your data
- **Right to Object:** Opt out of certain processing

To exercise these rights, email: privacy@learntovibe.code

We will respond to requests within 30 days. Some requests (e.g., erasure) may be 
delayed if we have legal obligations to retain your learning records for accreditation audits.

### California Residents (CCPA Compliance)

If you are a California resident, CCPA gives you the right to:
- Know what personal information we collect about you
- Delete your personal information (subject to legal exceptions)
- Opt-out of "sales" of personal information (we don't sell data, but you have this right)

To exercise CCPA rights, email: privacy@learntovibe.code

### Data Retention

- **Account data (name, email, password):** Retained for 30 days after account deletion
- **Learning records (quiz scores, module completion, capstone submission):** 
  Retained for 7 years to comply with potential accreditation audits
- **Technical logs (IP, browser, pages visited):** Retained for 90 days, then deleted
- **Payment data:** Stripe handles retention; we don't store card data

### Supabase & Stripe

We use third-party processors:
- **Supabase (database):** EU-located, GDPR compliant, data processing agreement in place
- **Stripe (payments):** US-located, PCI-DSS compliant, credit card data never sent to us

For questions about these processors, email: privacy@learntovibe.code
```

---

### 🟠 HIGH: Learner Records Retention & Educational Data

**Problem:**
Your Privacy Policy mentions learning data but doesn't:
- Explain how long grades/quiz scores are kept
- State whether they're shared with accreditors
- Clarify learner access to their own records
- Address FERPA-like concerns (if you ever accept federal funds)

**Risk:**
- If you apply for grant funding (FAFSA, NSF, etc.), you may be subject to FERPA
- Accreditors will ask: "How long do you retain learner data?" and "How do learners access?"
- Learners may request grades/transcripts you can't produce

**Recommendation:**
Add to Privacy Policy:

```markdown
## LEARNER RECORDS & EDUCATIONAL DATA

### What We Store

For accreditation and learner support, we maintain:
- Enrollment date and status
- Module completion dates and status
- Quiz attempt records: date, questions attempted, scores (%), pass/fail status
- Deliverable submissions: URLs, auto-check results, approval status
- Capstone submission: project links, rubric scores, grading notes, final result
- Certificate ID and issuance date (if applicable)

### How Long We Keep Records

- **Active learners:** While enrolled + 7 years after completion (for accreditation audits)
- **Inactive learners:** 90 days of inactivity = account eligible for deletion
- **Deleted accounts:** Learning records anonymized (name removed) but grade data kept 
  for aggregate reporting and accreditation compliance

### Learner Data Access

You can request a copy of your complete learning record, including:
- Quiz attempt history and scores
- Grades on deliverables
- Capstone rubric feedback (if graded)
- Certificate details (if issued)

Request at: privacy@learntovibe.code (response in 10 business days)

### Accreditor Access

As we pursue accreditation, we may share aggregate learner data with:
- CPD (interim accreditor)
- IACET (formal accreditor)
- Independent auditors verifying learning outcomes

We do NOT share individual learner names with accreditors; only aggregate 
pass rates, average scores, and completion metrics.

### Data Deletion on Request

You can request account deletion at any time. Upon deletion:
- Your personal data (name, email, password) is removed immediately
- Learning records are anonymized (name removed, kept for accreditation)
- You lose access to your certificate and course progress
- After 90 days of inactivity, we may purge your account entirely

To request deletion, email: privacy@learntovibe.code
```

---

### 🟠 MEDIUM: Donation/Refund Policy - Good, But Add Clarity

**Assessment:** Your refund policy is solid. But add:

**Missing:**
- What donations are used for (platform maintenance, content, salaries, etc.)
- Whether donations are tax-deductible (you correctly say NO, but bold it)
- Stripe's role in chargebacks and how you handle them

**Recommendation - Add:**

```markdown
## What Donations Fund

Your voluntary donations support:
- Server costs and infrastructure (Supabase, Vercel)
- Content development and course updates
- Instructor grading and support staff
- Platform maintenance and security improvements
- Pursuit of accreditation (fees, audits, compliance)

Donations do NOT guarantee:
- Faster grading or priority support
- Direct access to course developers
- Input on curriculum changes

All donations are handled transparently. We do not sell or trade donor data.
```

**Tax Deduction:** Already good. Just bold it:

```markdown
## Tax Treatment

**Important: Learn to Vibe Code is NOT a nonprofit. Donations are NOT tax-deductible.**

We are a for-profit entity. If you need tax documentation, we can provide 
a receipt, but you should not claim donations as a charitable deduction.
```

---

### 🟡 MEDIUM: Terms of Service - Generic, Add Context

**Current Issue:**
Your ToS is boilerplate (disclaimer, limitations, jurisdiction) but doesn't address:
- User conduct (no harassment, no cheating on quizzes, no content theft)
- Account suspension (when we can kick you off)
- Intellectual property (learner projects vs. course IP)
- Dispute resolution (arbitration vs. court)

**Recommendation - Add Sections:**

```markdown
## USER CONDUCT

You agree not to:
- Share quiz answers or capstone solutions with others (academic integrity)
- Reverse-engineer or scrape course content
- Use the platform to harass instructors or other learners
- Attempt to gain unauthorized access to grading systems
- Impersonate others (fake accounts, plagiarism)
- Violate applicable laws while using this platform

Violations may result in:
- Quiz/capstone score reset
- Capstone resubmission requirement
- Account suspension or permanent ban
- Certificate revocation (if already issued)

## INTELLECTUAL PROPERTY

- **Course Content:** You retain rights to your capstone project and code
- **Our Content:** All lessons, quizzes, assessments are our property. You may not 
  copy/redistribute without permission.
- **Your Feedback:** Any feedback you provide may be used to improve the course

## DISPUTE RESOLUTION

Any legal dispute will be resolved via arbitration (not court), 
governed by [Your Jurisdiction] law.
```

---

### 🟡 MEDIUM: Missing Liability Limitations for Accreditation Failure

**Problem:**
When your accreditation is denied or delayed, learners may sue ("I wasted time on a non-accredited course").

**Recommendation - Add to Terms:**

```markdown
## ACCREDITATION DISCLAIMER & LIMITATION OF LIABILITY

### Accreditation Status
Learn to Vibe Code is pursuing accreditation but is not currently accredited. 
We make NO GUARANTEE that:
- Accreditation will be granted
- Accreditation will occur by any specific date
- Accreditation will be maintained if obtained

### Limitation of Liability
YOU ASSUME ALL RISK that:
- Accreditation is denied
- Accreditation is delayed
- Accreditation is revoked
- The certificate never becomes recognized credentials

IN NO EVENT SHALL WE BE LIABLE FOR:
- Time spent on the course if accreditation is not obtained
- Employer rejection of our certificate
- Salary or career impact from lack of accreditation
- Reputational harm if accreditation efforts fail

This is a free course. Your only loss is time. Accept this risk before enrolling.
```

---

### 🟡 MEDIUM: Missing Severability Clause

**Problem:**
If one part of your ToS is ruled invalid, the whole agreement could collapse.

**Add:**

```markdown
## SEVERABILITY

If any provision of these Terms is found unenforceable, that provision is severed, 
and the remainder of these Terms continues in full force.
```

---

### 🟢 GOOD: Refund Policy

✅ Clearly states donations are non-refundable (except legal exceptions)  
✅ Explicitly clarifies free course access is unaffected  
✅ States donations are not tax-deductible  
✅ Provides clear refund request process  
✅ Addresses chargebacks  

**Keep this language.**

---

### 🟢 GOOD: Privacy Policy (Mostly)

✅ Lists what data you collect  
✅ Explains use cases  
✅ Discloses third parties (Stripe, Supabase)  
✅ States HTTPS/encryption  

**Just add GDPR/CCPA sections** (see above).

---

## REGULATORY CHECKLIST

| Item | Status | Action |
|------|--------|--------|
| **FTC Compliance** (no false advertising) | 🔴 FAIL | Remove "Accredited" from all marketing |
| **GDPR (EU residents)** | 🔴 FAIL | Add GDPR rights sections |
| **CCPA (CA residents)** | 🔴 FAIL | Add CCPA rights sections |
| **FERPA-readiness** | 🟡 PARTIAL | Add learner data access policy |
| **Educational accreditation** | 🟡 PARTIAL | Disclaim current non-accreditation |
| **Certificate disclaimers** | 🔴 FAIL | Add "not a degree" language |
| **Liability limitations** | 🟡 PARTIAL | Add ed-content + accreditation limits |
| **User conduct rules** | 🟡 PARTIAL | Add academic integrity section |
| **Tax treatment** | 🟢 GOOD | Already correct |
| **Donation transparency** | 🟢 GOOD | Just add "what funds used for" |
| **Data retention** | 🔴 FAIL | Add retention schedule |
| **Third-party agreements** | 🟡 PARTIAL | Supabase/Stripe DPAs in place? |
| **Dispute resolution** | 🟡 PARTIAL | Add arbitration clause |

---

## IMPLEMENTATION PRIORITY

### BEFORE LAUNCH (Critical)
1. ✅ Remove "Accredited" from all marketing/site/certificate
2. ✅ Add accreditation disclaimer to Terms
3. ✅ Add certificate disclaimer
4. ✅ Add educational content disclaimers
5. ✅ Add GDPR/CCPA sections to Privacy Policy

### AFTER LAUNCH (High Priority, within 30 days)
6. ✅ Verify Supabase/Stripe data processing agreements exist
7. ✅ Add learner data retention policy to Privacy Policy
8. ✅ Add user conduct rules to Terms
9. ✅ Add "what donations fund" to Refund Policy

### BEFORE ACCREDITATION (Medium Priority)
10. ✅ Accreditor will require full audit of your ToS/Privacy
11. ✅ Be prepared to add specific FERPA/COPPA language if needed

---

## ATTORNEY SIGN-OFF TEMPLATE

Once you fix these issues, have a real attorney review and add:

```markdown
LEGAL REVIEW CERTIFICATION

These Terms of Service, Privacy Policy, and Refund Policy have been 
reviewed by [Law Firm Name] for compliance with applicable federal 
and state law as of [Date].

This review confirms:
☐ No false advertising claims
☐ GDPR/CCPA compliant
☐ Adequate liability protections
☐ Accreditation status clearly disclosed
☐ Educational disclaimers present
☐ Data protection compliant

Reviewed by: [Attorney Name], Esq.
License: [State Bar #]
Date: [Date]
```

---

## SUMMARY

| Category | Status | Risk |
|----------|--------|------|
| **Accreditation Misleading** | 🔴 CRITICAL | High (FTC, AG, learner lawsuits) |
| **Certificate Disclaimed** | 🔴 CRITICAL | High (false advertising) |
| **Data Protection** | 🔴 CRITICAL | High (GDPR/CCPA fines) |
| **Educational Disclaimers** | 🟠 HIGH | Medium (learner complaints) |
| **User Conduct** | 🟡 MEDIUM | Medium (cheating, IP theft) |
| **Refund/Donations** | 🟢 GOOD | Low (already solid) |

**Bottom line:** Your legal docs have good bones (refund policy, privacy baseline) but need substantial updates before launch, specifically around accreditation status and data protection.

**Estimated attorney review time:** 2-3 hours  
**Estimated cost:** $500–$1,500 depending on your attorney

---

## NEXT STEPS

1. **Today:** Update all marketing to remove "Accredited" (change to "Pursuing Accreditation")
2. **This week:** Add accreditation, certificate, and educational disclaimers to Terms
3. **This week:** Add GDPR/CCPA sections to Privacy Policy
4. **Before launch:** Have a real attorney review (2-3 hours)
5. **Before accreditation:** Full compliance audit by accreditor

**DO NOT LAUNCH without fixing the "Accredited" terminology.** That's the biggest liability.

---

**Signed (in advisory capacity only):**  
Business Law Consultant  
*Not a substitute for real legal counsel*

---

