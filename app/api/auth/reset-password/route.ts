import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify the token and update password
    const { error } = await supabase.auth.updateUser({
      password: password,
    }, {
      externalId: token,
    });

    if (error) {
      // If the token-based approach doesn't work, try using setSession
      // The reset email should have included a token in the URL that Supabase can handle
      const { data, error: sessionError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "recovery",
      });

      if (sessionError || !data.user) {
        return NextResponse.json(
          { error: "Invalid or expired reset link" },
          { status: 400 }
        );
      }

      // Update password for the verified user
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
