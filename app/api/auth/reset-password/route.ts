import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Use admin API to update password for the user
    const supabase = await createClient();

    // First, get the user by email to verify they exist
    const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers();

    if (getUserError || !users) {
      return NextResponse.json(
        { error: "Failed to process password reset" },
        { status: 400 }
      );
    }

    const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Don't reveal if email exists (security best practice)
      // But for password reset, we can be more helpful
      return NextResponse.json(
        { error: "Email not found in our system" },
        { status: 400 }
      );
    }

    // Update the user's password using admin API
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: password,
    });

    if (updateError) {
      console.error("Password update error:", updateError);
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 400 }
      );
    }

    console.log("✓ Password reset successful for:", email);
    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 }
    );
  }
}
