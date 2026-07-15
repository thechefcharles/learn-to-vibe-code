/**
 * Donation type definitions for optional donations (no subscription model).
 * Donations are one-time, voluntary payments that support the platform.
 */

export type DonationStatus = "pending" | "success" | "failed";

/**
 * Complete donation record from the database
 */
export type Donation = {
  id: string;
  user_id: string;
  amount_cents: number; // Amount in cents (e.g., 1000 = $10.00)
  currency: string; // ISO 4217 code (default: 'usd')
  stripe_session_id: string; // Stripe Checkout session ID (unique)
  stripe_charge_id: string | null; // Stripe charge ID, populated after successful payment
  status: DonationStatus;
  created_at: string;
  updated_at: string;
};

/**
 * Insert payload for donations (what the client sends)
 * Server-side will generate id, created_at, updated_at
 * Stripe integration will populate stripe_charge_id on success
 */
export type DonationInsert = {
  user_id: string;
  amount_cents: number;
  currency?: string; // Optional, defaults to 'usd' in DB
  stripe_session_id: string;
  stripe_charge_id?: string | null;
  status?: DonationStatus; // Optional, defaults to 'pending' in DB
};
