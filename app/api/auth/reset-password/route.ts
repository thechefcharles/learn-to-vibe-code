import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get the authenticated user (authenticated by verifyOtp client-side)
    console.log("📍 Getting authenticated user...");
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("❌ No authenticated user");
      return NextResponse.json({ error: "Invalid request" }, { status: 401 });
    }

    // Update password for the authenticated user
    console.log("📍 Updating password for user:", user.email);
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.error("❌ Password update error:", updateError);
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    console.log("✓ Password reset successful");
    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
