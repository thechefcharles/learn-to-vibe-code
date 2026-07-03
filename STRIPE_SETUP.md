# Stripe Donation Integration Setup

The donation system is built to support Stripe, but requires manual setup to enable.

## Steps to Enable Donations

### 1. Install Stripe SDK
```bash
npm install stripe
```

### 2. Get Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers → API Keys
3. Copy your **Secret Key** and **Publishable Key**

### 3. Add Environment Variables

In `.env.local`:
```
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com  # For production
```

### 4. Uncomment Stripe Code

In `app/api/donation/route.ts`, uncomment the Stripe checkout session creation code:

```typescript
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const session = await stripe.checkout.sessions.create({
  // ... session configuration
});

return NextResponse.json({ url: session.url });
```

### 5. (Optional) Add Webhook Handler

For production, handle webhooks at `app/api/webhooks/stripe/route.ts` to:
- Track donations in database
- Send thank you emails
- Update metrics

## Features

✅ **Donations Page** — `/certificate` shows donation component  
✅ **Flexible Amounts** — Quick buttons ($5, $10, $25, $50) + custom  
✅ **Success Page** — Redirect after donation  
✅ **Security** — Authentication required, server-side validation  

## Testing

### Test Mode (Stripe Provides Test Cards)
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

### Production Mode
Use real cards only for live deployments

## Notes

- Stripe charges 2.9% + $0.30 per transaction
- Donations are one-time payments (not subscriptions)
- Data saved to Stripe dashboard for reporting
- No refunds implemented (can be added if needed)

## Troubleshooting

**"Stripe integration not configured"** → Missing `STRIPE_SECRET_KEY` in `.env.local`  
**Donation button disabled** → Amount must be ≥ $1  
**Redirect fails** → Check `NEXT_PUBLIC_APP_URL` is set correctly  
