import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import type { DonationInsert } from "@/lib/types/donations";

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Donation preset amounts (in cents)
export const DONATION_AMOUNTS: Record<string, number> = {
  coffee: 500, // $5
  tea: 1000, // $10
  lunch: 2500, // $25
  dinner: 5000, // $50
};

/**
 * Creates a Stripe checkout session for a donation and records it in the database.
 *
 * @param userId - The authenticated user's ID
 * @param amountCents - Amount in cents (e.g., 1000 = $10.00)
 * @param siteUrl - The base URL of the site for success/cancel redirects
 * @returns Object with sessionId and checkout URL
 * @throws Error if Stripe session creation or database insert fails
 */
export async function createDonationSession(
  userId: string,
  amountCents: number,
  siteUrl: string
): Promise<{ sessionId: string; url: string | null }> {
  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Support Learn to Vibe Code",
            description:
              "Your donation helps keep the course free and accessible.",
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${siteUrl}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/donation-cancel`,
  });

  // Insert donation record to Supabase
  const supabase = await createClient();
  const donationInsert: DonationInsert = {
    user_id: userId,
    amount_cents: amountCents,
    currency: "usd",
    stripe_session_id: session.id,
    status: "pending",
  };

  const { error: dbError } = await supabase
    .from("donations")
    .insert(donationInsert);

  if (dbError) {
    throw new Error(
      `Failed to record donation: ${dbError.message}`
    );
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
}
