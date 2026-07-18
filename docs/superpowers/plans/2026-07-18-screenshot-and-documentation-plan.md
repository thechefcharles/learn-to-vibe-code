# Screenshot & Documentation Plan for New Dashboards

**Date:** 2026-07-18  
**Status:** Planning phase  
**Goal:** Capture and document 3 new admin/instructor dashboards built in post-launch infrastructure; establish reusable screenshot & documentation workflow

---

## Phase Overview

Three new features (admin analytics, capstone insights, learner feedback) were built to support post-launch operations. These dashboards need:
1. **Screenshots** (clean, representative, user-ready)
2. **Documentation** (usage guides, data interpretation, access control)
3. **Internal guides** (for instructor training)

---

## Deliverables

### 1. Analytics Dashboard (`/admin/analytics`)

**What it does:**  
Real-time monitoring of learner activity, quiz performance, completion rates, deliverable submissions, and error tracking. Auto-refreshes every 5 minutes.

**Screenshots needed:**
- **Full dashboard (desktop)** — overview with all widgets visible
  - File: `public/figures/admin-dashboards/admin-analytics-full.png`
  - Alt: "Analytics dashboard showing daily active users, quiz pass rate, completion percentage, pending deliverables, and status indicators"
  
- **Mobile view (responsive)** — shows how dashboard adapts to tablet/phone
  - File: `public/figures/admin-dashboards/admin-analytics-mobile.png`
  - Alt: "Analytics dashboard on mobile device with cards stacked vertically"

**Documentation:**
- `/admin/admin-dashboards.md` — Add section: "Analytics Dashboard — Monitor Learner Activity"
  - Purpose & use cases
  - Key metrics explained (active users, pass rates, pending items)
  - Status indicator meanings (green/yellow/red)
  - Refresh behavior & how to read trends

---

### 2. Capstone Success Report (`/admin/insights/capstone-report`)

**What it does:**  
Analyzes learner performance across modules and predicts capstone success. Shows correlation between module scores and capstone outcomes. Identifies at-risk modules.

**Screenshots needed:**
- **Full report (desktop)** — success factors, at-risk modules, weak/strong predictors
  - File: `public/figures/admin-dashboards/capstone-report-full.png`
  - Alt: "Capstone success report showing Pearson correlation scores, at-risk modules ranked by impact, success factors chart, and prediction confidence"
  
- **At-risk modules detail** — highlights which modules most predict capstone failure
  - File: `public/figures/admin-dashboards/capstone-report-at-risk.png`
  - Alt: "List of modules ranked by correlation to capstone failure, showing which 3-5 modules are strongest predictors"

**Documentation:**
- `/admin/admin-dashboards.md` — Add section: "Capstone Success Report — Predict & Analyze Performance"
  - How to interpret correlation scores (r-value range)
  - What "at-risk modules" means for instructors
  - When to use this for early intervention
  - Example: "If Module X is at-risk, increase 1-on-1 coaching or offer supplementary materials"

---

### 3. Learner Feedback Form (`/course/feedback`)

**What it does:**  
5-question survey (clarity, difficulty, challenge, suggestions, recommendation) that learners submit after completing a module. Non-blocking, helps identify struggling learners and content gaps.

**Screenshots needed:**
- **Feedback form (empty)** — fresh form, clean state
  - File: `public/figures/admin-dashboards/feedback-form-empty.png`
  - Alt: "Learner feedback form with 5 fields: clarity (Likert 1-5), difficulty (1-5), challenge rating (1-5), suggestions text box, and recommendation question"
  
- **Feedback form (filled)** — example completed response
  - File: `public/figures/admin-dashboards/feedback-form-filled.png`
  - Alt: "Completed feedback form showing sample learner responses: moderate clarity, high difficulty, low challenge, suggestion text, and willingness to recommend"
  
- **Thank you/confirmation** — post-submit state
  - File: `public/figures/admin-dashboards/feedback-form-submitted.png`
  - Alt: "Confirmation message after submitting feedback: 'Thanks for your feedback! This helps us improve.'"

**Documentation:**
- `/admin/admin-dashboards.md` — Add section: "Learner Feedback — Gather Progress Insights"
  - Why feedback is optional but valuable
  - Interpreting each question (what to look for)
  - How to access aggregated feedback (for instructors)
  - Example: "Low clarity + high difficulty = content needs better explanations"

---

## Implementation Workflow

### Step 1: Run Local App
```bash
npm run dev
# App runs on localhost:3008
```

### Step 2: Authentication
- Sign in with test instructor account (admin role required)
- Test credentials: (stored in `.env.local`)

### Step 3: Capture Screenshots

**For each dashboard:**
1. Navigate to the URL
2. Let page settle (~2s) for animations
3. Take clean screenshot (full viewport, no browser chrome)
4. Ensure all key elements visible and readable
5. Save with naming convention: `admin-dashboards/<feature>-<variant>.png`

**Dashboard URLs:**
- Analytics: `http://localhost:3008/admin/analytics`
- Capstone Report: `http://localhost:3008/admin/insights/capstone-report`
- Feedback Form: `http://localhost:3008/course/feedback`

### Step 4: Add to figures-manifest.json

For each screenshot, add entry:
```json
"admin-analytics-full": {
  "path": "/figures/admin-dashboards/admin-analytics-full.png",
  "alt": "Analytics dashboard showing..."
}
```

### Step 5: Documentation

Update or create `/docs/admin/admin-dashboards.md`:
- Overview of all 3 dashboards
- Each dashboard's purpose, key features, how to interpret data
- Access control (instructor role required)
- Screenshots embedded with alt text
- Links to related playbooks (monitoring.md, learner-support.md)

---

## File Locations

**Screenshots:**
```
public/figures/admin-dashboards/
├── admin-analytics-full.png
├── admin-analytics-mobile.png
├── capstone-report-full.png
├── capstone-report-at-risk.png
├── feedback-form-empty.png
├── feedback-form-filled.png
└── feedback-form-submitted.png
```

**Documentation:**
```
docs/admin/admin-dashboards.md (new file, ~800-1000 words)
  - Overview
  - Analytics Dashboard section
  - Capstone Report section
  - Feedback Form section
  - Access control & instructor guide
```

---

## Quality Checklist

- [ ] All 7 screenshots captured at clean resolution (1280px+ width)
- [ ] No sensitive data in screenshots (test data only)
- [ ] All text legible, no partial cuts
- [ ] Mobile screenshots show appropriate responsive behavior
- [ ] figures-manifest.json updated with all 7 entries
- [ ] admin-dashboards.md written with all 3 sections
- [ ] Screenshots referenced in docs with correct alt text
- [ ] Links back to monitoring.md, learner-support.md working

---

## Next Steps

1. **Phase 2 (this plan):** Complete
2. **Phase 3 (execution):** Run app locally, capture 7 screenshots
3. **Phase 4 (documentation):** Write admin-dashboards.md, commit
4. **Phase 5 (integration):** Link from main admin docs and launch playbooks

---

## Related Files & Context

**Built features:**
- `lib/analytics.ts` (11 analytics functions)
- `app/admin/analytics/page.tsx` (analytics UI)
- `app/api/admin/analytics/route.ts` (data endpoint)
- `lib/capstone-success-factors.ts` (correlation analysis)
- `app/admin/insights/capstone-report/page.tsx` (report UI)
- `app/api/admin/insights/capstone/route.ts` (data endpoint)
- `app/course/feedback/page.tsx` (feedback form)
- `app/api/course/feedback/route.ts` (submission endpoint)

**Reference docs:**
- `docs/playbooks/post-launch-monitoring.md`
- `docs/playbooks/learner-support.md`
- `docs/playbooks/launch-day.md`

**Manifest:**
- `public/figures-manifest.json` (already updated with `/figures/screenshots/` paths)
