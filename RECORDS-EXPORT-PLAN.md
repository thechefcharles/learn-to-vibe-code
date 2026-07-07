# Records Export Implementation — Accreditation Compliance

**Requirement:** IACET/CPD auditors need verifiable learner records in CSV/PDF format  
**Compliance:** CEU accreditation, learner data protection  
**Scope:** Export learner progress, quiz scores, deliverables, capstone, certificates

---

## What Accreditors Need

Per CLAUDE.md: **Grading data = accreditation records**

**Required Exports (CSV + PDF):**

1. **Learner Enrollment Report**
   - Learner ID, name, email, role
   - Enrolled version (kids/adult)
   - Enrollment date
   - Current status (active/completed/inactive)

2. **Module Progress Report**
   - Learner ID, module number, module title
   - Unlocked date, completed date
   - Quiz score (%, pass/fail)
   - Deliverable status (pending/approved/rejected)

3. **Quiz Attempts Report**
   - Learner ID, quiz date, module, score %
   - Pass/fail status
   - Attempt number
   - Time taken

4. **Deliverables Report**
   - Learner ID, module, submission date
   - Repo URL, live URL
   - Auto-check status
   - Manual review status, notes

5. **Capstone Submission Report**
   - Learner ID, submission date
   - Repo URL, live URL, writeup
   - Rubric scores (all items, 0-3)
   - Pass/fail result
   - Grader, grading date

6. **Certificates Report**
   - Learner ID, certificate ID
   - Issue date, expiration date (if applicable)
   - CEU value (9.3)
   - Certificate URL

7. **Learner Records Summary**
   - Single view: learner ID → all data
   - Used for audit verification
   - Required format for CPD/IACET

---

## Implementation Components

### 1. Server Actions (`lib/actions/records.ts`)
**Purpose:** Fetch data with proper authorization & RLS enforcement

```typescript
export async function getAllLearnersForExport(): Promise<Learner[]>
export async function getLearnersQuizAttempts(userIds: string[]): Promise<QuizAttempt[]>
export async function getLearnersDeliverables(userIds: string[]): Promise<Deliverable[]>
export async function getLearnersCapstone(userIds: string[]): Promise<CapstoneSubmission[]>
export async function getLearnersCertificates(userIds: string[]): Promise<Certificate[]>
```

**Security:**
- ✅ Instructor-only access (check role)
- ✅ RLS prevents data leakage
- ✅ Audit logging (who exported what, when)

---

### 2. CSV Export Service (`lib/csv-export.ts`)
**Purpose:** Convert data to CSV format

**Exports:**
- `exportLearnersCSV(learners): string`
- `exportQuizAttemptsCSV(attempts): string`
- `exportDeliverablesCSV(deliverables): string`
- `exportCapstoneCSV(submissions): string`
- `exportCertificatesCSV(certificates): string`
- `exportLearnerRecordSummaryCSV(summary): string`

**Format:** Standard RFC 4180 CSV (Excel-compatible)

---

### 3. PDF Export Service (`lib/pdf-export.ts`)
**Purpose:** Generate professional PDF reports

**Approach:**
- Use `html2pdf` or `pdfkit` library
- Generate from HTML template
- Include branding, headers, footers
- Page numbers, generated timestamp

**Reports:**
- Learner enrollment summary (1 page per batch)
- Module progress (1 page per learner)
- Quiz attempts (2 pages per learner)
- Capstone report (1 page per submission)
- Certificates (digital certificate)

---

### 4. Export API Route (`app/api/admin/export-records`)
**Purpose:** HTTP endpoint for export requests

**Endpoints:**
- `GET /api/admin/export-records?format=csv&type=learners` → CSV download
- `GET /api/admin/export-records?format=pdf&type=capstone` → PDF download
- `GET /api/admin/export-records?format=json&type=all` → JSON export

**Response:**
- Content-Type: `text/csv` / `application/pdf` / `application/json`
- Filename: `learners_export_2026-07-06.csv`
- Size limit: Handle large datasets (paginate if needed)

---

### 5. Instructor UI (`app/admin/records/page.tsx`)
**Purpose:** UI for instructor to trigger exports

**Features:**
- Date range filter (enrollment date)
- Format selector (CSV/PDF)
- Report type selector (all | learners | quizzes | capstone | certificates)
- Export button → download file
- Recent exports log (last 10)

**Design:** Matches admin capstone grading page aesthetic

---

## Data Model Alignment

**Existing tables with record data:**
- `profiles` → learner identity
- `enrollments` → version enrollment
- `module_progress` → completion tracking
- `quiz_attempts` → quiz scores (target_audience for version tracking)
- `deliverables` → project submissions
- `capstone_submissions` → rubric_scores, result
- `certificates` → cert_id, issued_at

**RLS Enforcement:** All instructor exports use server-side RLS (Row-Level Security)

---

## CSV Format Examples

### Learner Enrollment CSV
```
learner_id,name,email,version,enrollment_date,status
550e8400-e29b-41d4-a716-446655440000,John Doe,john@example.com,adult,2026-01-15,completed
550e8400-e29b-41d4-a716-446655440001,Jane Smith,jane@example.com,kids,2026-02-01,active
```

### Quiz Attempts CSV
```
learner_id,learner_name,module_id,quiz_date,score_percent,passed,attempt_no,version
550e8400-e29b-41d4-a716-446655440000,John Doe,0,2026-01-20,95,yes,1,adult
550e8400-e29b-41d4-a716-446655440000,John Doe,1,2026-01-22,82,yes,1,adult
```

### Capstone CSV
```
learner_id,learner_name,submission_date,repo_url,live_url,rubric_1_score,rubric_2_score,...,result,graded_date,version
550e8400-e29b-41d4-a716-446655440000,John Doe,2026-04-10,https://...,https://...,3,3,2,3,...,pass,2026-04-15,adult
```

---

## Implementation Timeline

| Phase | Task | Effort | Priority |
|-------|------|--------|----------|
| **7a** | Create server actions (records fetching) | 30 min | HIGH |
| **7b** | Implement CSV export service | 20 min | HIGH |
| **7c** | Create export API route | 20 min | HIGH |
| **7d** | Build instructor export UI | 40 min | HIGH |
| **7e** | Add PDF export (optional for MVP) | 1 hour | MEDIUM |
| **7f** | Audit logging | 20 min | HIGH |
| **7g** | Test exports end-to-end | 30 min | HIGH |

**Total: 2.5-3 hours** to production-ready MVP

---

## Security & Compliance

✅ **Authorization:** Instructor role only (checked server-side)  
✅ **RLS Enforcement:** All queries use Supabase RLS policies  
✅ **Data Protection:** Exports contain PII (name, email); marked confidential  
✅ **Audit Trail:** Log who exported what, when (instructor_id, timestamp, export_type)  
✅ **Rate Limiting:** Max 1 export per 60 seconds (prevent abuse)  
✅ **Version Tracking:** All records include enrolled_version or target_audience  

---

## Accreditation Readiness

After Phase 7 complete:
- ✅ Learner records: exportable in CSV format
- ✅ Quiz scores: with pass/fail and timestamps
- ✅ Capstone rubric: scores and grader info
- ✅ Certificates: issuance dates and cert IDs
- ✅ Audit trail: timestamp on all records

**For IACET application (future):**
- Export last 12 months of records
- Provide completion metrics (X learners, Y avg score)
- Demonstrate record retention & backup
- Show audit trail for compliance

---

## MVP Scope (Phase 7)

**Must Have:**
1. CSV export (learners, quizzes, capstone)
2. Instructor UI with download
3. Role-based access control
4. Audit logging

**Nice to Have (Phase 8+):**
- PDF export with branding
- Email export (send to compliance officer)
- Scheduled exports (weekly CSV)
- Data retention policies

---

## Files to Create/Modify

### New Files
- `lib/actions/records.ts` (server actions for data fetching)
- `lib/csv-export.ts` (CSV generation logic)
- `app/admin/records/page.tsx` (instructor UI)
- `app/api/admin/export-records.ts` (API route)

### Modified Files
- `lib/actions/course.ts` (add record export helpers)
- Database: add `audit_log` table (optional but recommended)

---

## Next Steps

1. ✅ Create server actions for data fetching (with RLS)
2. ✅ Implement CSV export service
3. ✅ Build API route + streaming response
4. ✅ Create instructor UI
5. ✅ Test end-to-end with real data
6. ✅ Deploy & verify in production
