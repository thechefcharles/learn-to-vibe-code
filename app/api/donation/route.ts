import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

// This is a placeholder. Stripe integration requires:
// 1. npm install stripe
// 2. STRIPE_SECRET_KEY in .env.local
// 3. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { amount } = await request.json();

    // Validate amount
    if (!amount || amount < 1 || amount > 10000) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // TODO: Implement Stripe checkout session creation
    // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: "Learn to Vibe Code - Course Donation",
    //           description: "Support course development and maintenance",
    //         },
    //         unit_amount: amount * 100,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation-success`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/certificate`,
    //   customer_email: user.email,
    //   metadata: {
    //     user_id: user.id,
    //   },
    // });

    // For now, return a placeholder response
    return NextResponse.json(
      {
        error: "Stripe integration not configured. To enable donations, configure STRIPE_SECRET_KEY in .env.local",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { error: "Failed to process donation" },
      { status: 500 }
    );
  }
}
