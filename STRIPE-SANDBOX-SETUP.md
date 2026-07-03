# Stripe Sandbox Setup & Local Testing

## Step 1: Get Stripe Sandbox Keys (5 minutes)

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com/
   - Sign up if needed (free account)

2. **Navigate to API Keys:**
   - Settings (bottom left) → API Keys
   - You'll see two sections: Publishable & Secret keys
   - Make sure you're in **Sandbox/Test Mode** (toggle at top)

3. **Copy your SANDBOX keys:**
   - **Publishable Key:** `pk_test_xxxxx` (public, safe to expose)
   - **Secret Key:** `sk_test_xxxxx` (PRIVATE, never share)

## Step 2: Add Keys to `.env.local`

Edit `.env.local` in your project root:

```env
# Stripe (Phase 9) — SANDBOX keys
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# App config
NEXT_PUBLIC_SITE_URL=http://localhost:3008
```

Replace `pk_test_xxxxx` and `sk_test_xxxxx` with your actual sandbox keys from Step 1.

## Step 3: Install Dependencies

```bash
npm install
```

This installs `stripe`, `html2pdf.js`, and other Phase 9 packages.

## Step 4: Start Dev Server

```bash
npm run dev
```

Server runs at `http://localhost:3008`

## Step 5: Test Donation Flow

### Option A: Use Test Page (Recommended)

1. Open browser: `http://localhost:3008/test-donate`
2. Click any donation button (e.g., "☕ Buy me a coffee ($5)")
3. You'll be redirected to Stripe Checkout
4. Use test card below
5. After payment, redirected to `http://localhost:3008/support?success=true`

### Option B: Manual API Test

```bash
curl -X POST http://localhost:3008/api/donate \
  -H "Content-Type: application/json" \
  -d '{"type": "coffee"}'
```

Response:
```json
{
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/..."
}
```

Open the `url` in browser.

## Stripe Test Cards

| Scenario | Card Number | Result |
|----------|-------------|--------|
| **Success** | 4242 4242 4242 4242 | ✅ Payment succeeds |
| **Decline** | 4000 0000 0000 0002 | ❌ Card declined |
| **Expired** | 4000 0000 0000 0069 | ❌ Card expired |

**Expiry & CVC:** Use any future date (e.g., 12/25) and any 3 digits (e.g., 123)
**ZIP:** Any 5 digits

## Step 6: Verify in Stripe Dashboard

1. Go to https://dashboard.stripe.com/
2. Events → Checkout session created
3. Payments → See your test donation listed
4. **No real money charged** — it's all sandbox

## Step 7: Test Certificate Generation

When you pass a capstone (instructor grades as "pass"):

1. **Check Supabase:**
   - Go to https://app.supabase.com
   - Select your project
   - SQL Editor → Query `SELECT * FROM certificates WHERE user_id = 'YOUR_USER_ID'`
   - Should see a row with `cert_id`, `issued_at`, `url`

2. **Download certificate (as learner):**
   - Go to `/capstone` page
   - If capstone passed, see "Download Certificate" button
   - Click to generate PDF

3. **Share certificate:**
   - Copy the shareable URL from `/certificate/share/{cert_id}`
   - Anyone with link can view (no auth required for viewing, but cert only issued after passing)

## Step 8: Test Records Export (as Instructor)

1. **Log in as instructor** (if you have an instructor account)
2. Navigate to `/api/admin/export-records`
3. CSV file downloads with all learner records
4. Verify:
   - Email, name, enrollment date present
   - Quiz scores for each module
   - Capstone result + rubric scores
   - Certificate ID + issue date

## Troubleshooting

### Donation button doesn't work
- Check browser console (F12) for errors
- Verify `STRIPE_PUBLIC_KEY` is in `.env.local`
- Verify `npm install` completed
- Restart dev server: `npm run dev`

### Checkout page shows 404
- Make sure `/api/donate` route exists
- Check server logs for errors
- Verify Stripe keys are correct

### Certificate not showing after capstone pass
- Check Supabase `certificates` table
- Verify capstone `result` is set to 'pass' (not 'pending')
- Verify instructor role and grading worked
- Check browser console for JavaScript errors

### CSV export is empty
- Verify you're logged in as instructor
- Check Supabase has enrollments/quiz attempts/capstone submissions
- Verify instructor role is correct

## Next Steps

Once local testing is successful:

1. **Set production keys in Vercel:**
   - Get live keys (not sandbox) from Stripe Dashboard
   - Add to Vercel Environment Variables
   - Keys are `pk_live_xxxxx` and `sk_live_xxxxx`

2. **Test in production:**
   - Make a real donation (will charge your card)
   - Verify email receipt
   - Check Stripe Dashboard shows transaction

3. **Legal review:**
   - Have attorney review Terms/Privacy/Refund pages
   - Remove DRAFT banners once approved

4. **Phase 10:**
   - E2E tests
   - A11y audit
   - Performance optimization
   - Records export UI page

## Reference

- **Stripe Docs:** https://stripe.com/docs
- **Test Card Numbers:** https://stripe.com/docs/testing
- **Stripe Dashboard:** https://dashboard.stripe.com/

