import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Stripe webhook handler for payment confirmation and failure events.
 * Validates webhook signature and updates donation status in the database.
 */
export async function POST(req: NextRequest) {
  try {
    // Read body as text for signature verification
    const body = await req.text();

    // Get signature from header
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("Webhook: Missing stripe-signature header");
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    if (!webhookSecret) {
      console.error("Webhook: STRIPE_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify signature and construct event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = await createClient();

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        // Query donations table for matching stripe_session_id
        const { data: donation, error: queryError } = await supabase
          .from("donations")
          .select("*")
          .eq("stripe_session_id", session.id)
          .single();

        if (queryError || !donation) {
          console.error(
            `Webhook: Donation not found for session ${session.id}`,
            queryError
          );
          return NextResponse.json(
            { error: "Donation record not found" },
            { status: 404 }
          );
        }

        // Retrieve payment intent to get charge ID
        let chargeId: string | null = null;

        if (session.payment_intent) {
          try {
            const paymentIntentId = typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent.id;

            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            // Get charge ID from payment intent charges list
            const intentData = paymentIntent as any;
            if (intentData.charges && intentData.charges.data && intentData.charges.data.length > 0) {
              chargeId = intentData.charges.data[0].id;
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
            console.error(
              `Webhook: Failed to retrieve payment intent: ${errorMessage}`
            );
          }
        }

        // Update donation record
        const { error: updateError } = await supabase
          .from("donations")
          .update({
            status: "success",
            stripe_charge_id: chargeId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", donation.id);

        if (updateError) {
          console.error(
            `Webhook: Failed to update donation ${donation.id}: ${updateError.message}`
          );
          return NextResponse.json(
            { error: "Failed to update donation record" },
            { status: 500 }
          );
        }

        console.log(
          `Webhook: Donation ${donation.id} marked as success with charge ${chargeId}`
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error(
          `Webhook: Error processing checkout.session.completed: ${errorMessage}`
        );
        return NextResponse.json(
          { error: "Failed to process checkout session" },
          { status: 500 }
        );
      }
    }

    // Handle charge.failed event
    if (event.type === "charge.failed") {
      const charge = event.data.object as Stripe.Charge;

      try {
        // Query donations table for matching stripe_charge_id
        const { data: donation, error: queryError } = await supabase
          .from("donations")
          .select("*")
          .eq("stripe_charge_id", charge.id)
          .single();

        if (queryError || !donation) {
          console.warn(
            `Webhook: Donation not found for charge ${charge.id}`,
            queryError
          );
          // Don't return 404 for failed charges - they might not exist yet
          // Just log and return success to acknowledge the event
          return NextResponse.json({ received: true });
        }

        // Update donation record to failed status
        const { error: updateError } = await supabase
          .from("donations")
          .update({
            status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("id", donation.id);

        if (updateError) {
          console.error(
            `Webhook: Failed to update donation ${donation.id} to failed: ${updateError.message}`
          );
          return NextResponse.json(
            { error: "Failed to update donation record" },
            { status: 500 }
          );
        }

        console.log(`Webhook: Donation ${donation.id} marked as failed`);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error(
          `Webhook: Error processing charge.failed: ${errorMessage}`
        );
        return NextResponse.json(
          { error: "Failed to process charge failure" },
          { status: 500 }
        );
      }
    }

    // Log unhandled event types (but don't error)
    if (
      event.type !== "checkout.session.completed" &&
      event.type !== "charge.failed"
    ) {
      console.log(`Webhook: Received unhandled event type: ${event.type}`);
    }

    // Always return success to Stripe
    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook: Unexpected error: ${errorMessage}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
