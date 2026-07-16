import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getIpFromHeaders } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const ip = getIpFromHeaders(request.headers);
    const { success, remaining } = await checkRateLimit(`recovery-code:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: "Too many recovery code attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "900", // 15 minutes
          },
        }
      );
    }

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Verify the recovery OTP - this will also establish a session
    console.log("📍 Verifying recovery code...");
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: code,
      type: "recovery",
    });

    if (error) {
      console.error("❌ Verification failed:", error.message);
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    if (!data?.user) {
      console.error("❌ No user from verification");
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    console.log("✓ Recovery code verified, session established");
    return NextResponse.json({
      success: true,
      message: "Code verified",
      remaining,
    });
  } catch (err) {
    console.error("❌ Validation error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
