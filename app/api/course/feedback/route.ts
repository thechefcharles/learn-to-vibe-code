import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { sendFeedbackAlertEmail } from "@/lib/actions/notifications";

/**
 * POST /api/course/feedback
 * Save learner feedback to the database
 *
 * Request body:
 * {
 *   clarity: "very-clear" | "mostly-clear" | "somewhat-unclear" | "not-clear",
 *   difficulty: "too-easy" | "just-right" | "too-hard",
 *   challenge: string (text area),
 *   suggestions: string (text area),
 *   would_recommend: "yes" | "maybe" | "no"
 * }
 */
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
    const { clarity, difficulty, challenge, suggestions, would_recommend } = body;

    // Validate required fields
    if (!clarity || !difficulty || !challenge || !suggestions || !would_recommend) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate field values
    const validClarityValues = ["very-clear", "mostly-clear", "somewhat-unclear", "not-clear"];
    const validDifficultyValues = ["too-easy", "just-right", "too-hard"];
    const validRecommendationValues = ["yes", "maybe", "no"];

    if (!validClarityValues.includes(clarity)) {
      return NextResponse.json(
        { error: "Invalid clarity value" },
        { status: 400 }
      );
    }

    if (!validDifficultyValues.includes(difficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty value" },
        { status: 400 }
      );
    }

    if (!validRecommendationValues.includes(would_recommend)) {
      return NextResponse.json(
        { error: "Invalid recommendation value" },
        { status: 400 }
      );
    }

    // Validate text fields are not empty
    if (typeof challenge !== "string" || challenge.trim().length === 0) {
      return NextResponse.json(
        { error: "Challenge field cannot be empty" },
        { status: 400 }
      );
    }

    if (typeof suggestions !== "string" || suggestions.trim().length === 0) {
      return NextResponse.json(
        { error: "Suggestions field cannot be empty" },
        { status: 400 }
      );
    }

    // Save feedback to database
    const supabase = await createClient();
    const { error: insertError } = await supabase
      .from("learner_feedback")
      .upsert({
        user_id: user.id,
        clarity,
        difficulty,
        challenge: challenge.trim(),
        suggestions: suggestions.trim(),
        would_recommend,
      });

    if (insertError) {
      console.error("Error saving feedback:", insertError);
      return NextResponse.json(
        { error: "Failed to save feedback" },
        { status: 500 }
      );
    }

    // Send alert email to support team (don't block response if email fails)
    try {
      await sendFeedbackAlertEmail(
        user.user_metadata?.name || user.email || "Unknown",
        user.email || "",
        clarity,
        difficulty,
        challenge,
        suggestions,
        would_recommend
      );
    } catch (emailError) {
      console.error("Failed to send feedback alert email:", emailError);
      // Don't fail the API response if email fails - feedback is already saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save feedback";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
