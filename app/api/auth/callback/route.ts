import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    console.log("🔍 [/api/auth/callback] Received code:", code ? "yes" : "no");

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Try to verify OTP first (for recovery flows)
    console.log("📍 Verifying code as OTP (recovery flow)...");
    const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
      token_hash: code,
      type: "recovery",
    });

    if (!otpError && otpData?.user) {
      console.log("✓ OTP verification successful, session established");
      return NextResponse.json({
        success: true,
        message: "Session established",
      });
    }

    console.log("⚠️ OTP verification failed, trying code exchange...");

    // Fallback to code exchange for OAuth flows
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data?.session) {
        console.error("❌ Code exchange failed:", error?.message);
        return NextResponse.json(
          { error: error?.message || "Failed to exchange code for session" },
          { status: 400 }
        );
      }

      console.log("✓ Session established via code exchange");
      return NextResponse.json({
        success: true,
        message: "Session established",
      });
    } catch (exchangeErr) {
      console.error("❌ Code exchange error:", exchangeErr);
      // If both methods fail, return the OTP error since that's what the recovery flow expects
      return NextResponse.json(
        { error: otpError?.message || "Failed to verify recovery code" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("❌ Auth callback error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 }
    );
  }
}
