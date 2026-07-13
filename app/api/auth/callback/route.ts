import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Exchange authorization code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      return NextResponse.json(
        { error: "Failed to exchange code for session" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Session established",
    });
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
