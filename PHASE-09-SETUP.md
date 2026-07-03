# Phase 9 Setup — Payments + Credential

## What's Been Built

✅ **Stripe integration** — `/api/donate` endpoint for donation checkout
✅ **Certificate generation** — HTML template, auto-issuance on capstone pass
✅ **Capstone schema alignment** — updated to use `result` (pass/fail) + `rubric_scores` (jsonb)
✅ **Auto-certificate issuance** — fires when capstone graded as "pass"
✅ **Legal pages** — `/legal/terms`, `/legal/privacy`, `/legal/refund` (DRAFT banners)
✅ **Admin records export** — `/api/admin/export-records` CSV endpoint
✅ **Defense video capture** — capstone form now accepts `defense_video_url`
✅ **Package updates** — added `stripe` and `html2pdf.js` to dependencies

## What You Need to Do

### 1. Install Dependencies (LOCAL)
```bash
npm install
```

### 2. Stripe Setup (REQUIRED FOR PRODUCTION)

1. **Create Stripe account** (if not already done):
   - Go to https://stripe.com and sign up
   - Get your API keys from the dashboard

2. **Add keys to `.env.local`:**
   ```
   STRIPE_PUBLIC_KEY=pk_test_xxx (or pk_live_xxx for production)
   STRIPE_SECRET_KEY=sk_test_xxx (or sk_live_xxx for production)
   ```

3. **Add keys to Vercel** (for production):
   - Go to your Vercel project settings
   - Environment variables
   - Add `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY`

4. **Configure donation amounts** (optional):
   - Edit `/app/api/donate/route.ts` → `DONATION_AMOUNTS` object
   - Default: $5, $10, $25, $50 (in cents)

### 3. Legal Review (REQUIRED FOR PRODUCTION)

The legal pages are DRAFTS. Before going live:

1. **Hire an attorney** to review:
   - `/legal/terms/page.tsx` (Terms of Service)
   - `/legal/privacy/page.tsx` (Privacy Policy)
   - `/legal/refund/page.tsx` (Refund Policy)

2. **Update pages** once attorney approves:
   - Remove the red DRAFT banner
   - Add attorney signature or approval note

3. **Timeline**: Budget 1–2 weeks for legal review (cost: ~$300–500)

### 4. Certificate Customization (OPTIONAL)

The certificate template is in `/lib/certificate.ts`. Customize:
- Colors, fonts, seal/badge emoji
- Text (e.g., add institution name, signature line)
- Contact the designer if you want a professional certificate PDF design

### 5. Donation Settings (OPTIONAL)

- **Fallback links**: Add PayPal/Buy Me a Coffee links on `/support` page (Phase 11)
- **Thank-you emails**: Configure transactional email template (Supabase Auth → Email settings)

### 6. Database Migration (ONE-TIME)

The capstone table schema needs to be updated from the old `status` field to the new `result` field. 

**If you have existing capstone submissions in production**, run this migration on Supabase:

```sql
-- Add new columns if they don't exist
ALTER TABLE capstone_submissions 
ADD COLUMN IF NOT EXISTS result text DEFAULT 'pending' CHECK (result IN ('pending', 'pass', 'fail')),
ADD COLUMN IF NOT EXISTS rubric_scores jsonb DEFAULT NULL,
ADD COLUMN IF NOT EXISTS defense_video_url text DEFAULT NULL;

-- Drop old columns (if migrating from old schema)
-- ALTER TABLE capstone_submissions DROP COLUMN IF EXISTS status;
-- ALTER TABLE capstone_submissions DROP COLUMN IF EXISTS instructor_feedback;
-- ALTER TABLE capstone_submissions DROP COLUMN IF EXISTS reviewed_at;
```

**If this is a fresh database**, the schema should already be correct (no migration needed).

---

## Testing Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test donation flow:**
   - Go to `/support` (or add a donation button to `/` first)
   - Click "Donate $10" → redirects to Stripe Checkout
   - Use test card: `4242 4242 4242 4242` (exp: any future date, CVC: any 3 digits)
   - Should redirect to `/support?success=true`

3. **Test capstone grading:**
   - Grade a capstone submission as instructor
   - Check that `rubric_scores` are saved correctly
   - If result = "pass", verify certificate was issued:
     - Check `/certificates` table in Supabase
     - Learner should see download button on `/capstone` page

4. **Test certificate download:**
   - As learner, go to `/capstone` after capstone passes
   - Click "Download Certificate"
   - PDF should open/download with your name and cert ID

5. **Test records export:**
   - As instructor, navigate to `/admin/export-records` (create this page in Phase 10)
   - Download CSV
   - Verify all enrollments, quiz scores, capstone results, cert IDs are present

---

## Deployment to Vercel

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Vercel auto-deploys** (if connected)

3. **Add environment variables in Vercel dashboard:**
   - `STRIPE_PUBLIC_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL` (production URL, e.g., https://learn-to-vibe-code.com)

4. **Test on production:**
   - Stripe will reject test cards on live mode
   - Use actual payment to verify flow works

---

## What's Next (Phase 10)

- E2E tests (Playwright)
- A11y audit (keyboard nav, contrast, alt text)
- Performance optimization
- Records export UI (`/admin/export-records` page)
- Comprehensive testing

---

## Troubleshooting

**Stripe checkout not appearing?**
- Check browser console for errors
- Verify `STRIPE_PUBLIC_KEY` is set in `.env.local`
- Ensure `/api/donate` route is accessible

**Certificate not generating?**
- Check Supabase `certificates` table has a row for the user
- Verify `issueCertificate()` is called after capstone grades as "pass"
- Check browser console for JavaScript errors

**Legal pages showing DRAFT?**
- Expected! Remove the red banner once attorney approves

**Records export returning empty CSV?**
- Verify you're logged in as an instructor
- Check enrollments exist in Supabase
- Ensure `quiz_attempts`, `module_progress`, `capstone_submissions` have data

---

## Files Modified

| File | Change |
|------|--------|
| `/lib/certificate.ts` | NEW: certificate generation + issuance |
| `/app/api/donate/route.ts` | NEW: Stripe checkout endpoint |
| `/app/api/certificate/route.ts` | NEW: certificate HTML fetch |
| `/app/api/admin/export-records/route.ts` | NEW: CSV export for audits |
| `/app/legal/terms/page.tsx` | NEW: Terms of Service (DRAFT) |
| `/app/legal/privacy/page.tsx` | NEW: Privacy Policy (DRAFT) |
| `/app/legal/refund/page.tsx` | NEW: Refund Policy (DRAFT) |
| `/lib/actions/capstone.ts` | MODIFIED: schema alignment + auto-cert |
| `/package.json` | MODIFIED: added `stripe`, `html2pdf.js` |
| `.env.local` | MODIFIED: added Stripe keys + config |

---

## Summary

**Phase 9 is ~70% complete.** Core infrastructure is built. Remaining work:

- ✅ Donations (Stripe) — wired, awaiting keys
- ✅ Certificates — generated on capstone pass
- ✅ Legal pages — drafted, awaiting attorney review
- ✅ Records export — endpoint ready, awaiting UI page
- ⏳ **ACTION REQUIRED:** Stripe keys, attorney review

Next: **Phase 10** (hardening) — tests, a11y, performance, records UI.

