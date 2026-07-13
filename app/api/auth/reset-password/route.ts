import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code, password } = await request.json();

    if (!code || !password) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // CRITICAL: Verify the recovery code/OTP first
    // This proves the user has access to their email
    console.log("📍 Verifying recovery code...");
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: code,
      type: "recovery",
    });

    if (verifyError || !data?.user) {
      console.error("❌ Code verification failed:", verifyError?.message);
      // Return generic error so we don't reveal email validity
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Now that we've verified the recovery code, update the password
    // for the authenticated user
    console.log("📍 Updating password for verified user...");
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.error("❌ Password update error:", updateError);
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    console.log("✓ Password reset successful");
    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 500 }
    );
  }
}
