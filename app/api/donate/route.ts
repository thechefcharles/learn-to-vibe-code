import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createDonationSession, DONATION_AMOUNTS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { amount, type, userId } = body;

    // Validate that userId matches authenticated user
    if (userId && userId !== user.id) {
      return NextResponse.json(
        { error: "User ID mismatch" },
        { status: 403 }
      );
    }

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

    // Validate amount is between $1 and $10,000 (100 to 1,000,000 cents)
    const MIN_AMOUNT_CENTS = 100; // $1.00
    const MAX_AMOUNT_CENTS = 1000000; // $10,000.00

    if (amountCents < MIN_AMOUNT_CENTS || amountCents > MAX_AMOUNT_CENTS) {
      return NextResponse.json(
        {
          error: `Donation amount must be between $1.00 and $10,000.00`,
        },
        { status: 400 }
      );
    }

    // Get site URL from environment or request headers
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    // Create donation session
    const { sessionId, url } = await createDonationSession(
      user.id,
      amountCents,
      siteUrl
    );

    return NextResponse.json({ sessionId, url });
  } catch (error) {
    console.error("Donation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
