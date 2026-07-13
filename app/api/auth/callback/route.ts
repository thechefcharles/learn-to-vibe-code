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

    // Exchange authorization code for session
    console.log("📍 Exchanging code for session...");
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("Exchange result:", {
      hasData: !!data,
      hasSession: !!data?.session,
      error: error ? error.message : "none",
    });

    if (error || !data.session) {
      console.error("❌ Exchange failed:", error?.message);
      return NextResponse.json(
        { error: error?.message || "Failed to exchange code for session" },
        { status: 400 }
      );
    }

    console.log("✓ Session established successfully");
    return NextResponse.json({
      success: true,
      message: "Session established",
    });
  } catch (err) {
    console.error("❌ Auth callback error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 }
    );
  }
}
