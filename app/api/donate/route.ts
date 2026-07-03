import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Donation preset amounts (in cents)
const DONATION_AMOUNTS: Record<string, number> = {
  coffee: 500, // $5
  tea: 1000, // $10
  lunch: 2500, // $25
  dinner: 5000, // $50
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, type } = body;

    // Validate amount
    let amountCents = 0;
    if (type && DONATION_AMOUNTS[type]) {
      amountCents = DONATION_AMOUNTS[type];
    } else if (amount && typeof amount === "number" && amount > 0) {
      amountCents = Math.round(amount * 100);
    } else {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    // Create Checkout session
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/support?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/support?cancelled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
