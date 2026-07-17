"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { scoreQuiz, getModuleQuizByVersion } from "@/lib/quizzes";
import { revalidatePath } from "next/cache";
import { awardQuizXP, awardBadge, updateStreak } from "@/lib/actions/gamification";
import type { Version } from "@/lib/VersionContext";

export async function submitQuiz(
  moduleId: number,
  responses: Record<string, number>
) {
  try {
    console.log("=== submitQuiz START ===");
    console.log("moduleId:", moduleId);
    console.log("response count:", Object.keys(responses).length);

    const user = await getUser();
    console.log("user:", user?.id);
    if (!user) throw new Error("Not authenticated");

    const supabase = await createClient();
    console.log("supabase client created");

    // Get user's enrolled version (use maybeSingle to handle no enrollment)
    console.log("Fetching enrollment for user:", user.id);
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("enrolled_version")
      .eq("user_id", user.id)
      .maybeSingle();

    console.log("enrollment query result:", { enrollment, error: enrollmentError?.message });
    if (enrollmentError) throw new Error(`Failed to fetch enrollment: ${enrollmentError.message}`);

    const version = (enrollment?.enrolled_version as Version) || "adult";
    console.log("resolved version:", version);

    // Get quiz and score it server-side (NEVER trust client scoring)
    console.log("Getting quiz for moduleId:", moduleId, "version:", version);
    const quiz = getModuleQuizByVersion(moduleId, version);
    console.log("quiz found:", !!quiz, "questions:", quiz?.questions.length);
    if (!quiz) throw new Error("Quiz not found");

    const result = scoreQuiz(responses, quiz);
    console.log("quiz scored:", result);

    // Store attempt (version is tracked server-side during scoring, not stored in DB)
    console.log("Getting next attempt number for user:", user.id, "module:", moduleId);
    const attemptNo = await getNextAttemptNumber(user.id, moduleId);
    console.log("next attempt number:", attemptNo);

    console.log("Inserting quiz attempt with:", {
      user_id: user.id,
      module_id: moduleId,
      score: result.score,
      passed: result.passed,
      attempt_no: attemptNo,
    });
    const { error: insertError } = await supabase.from("quiz_attempts").insert({
      user_id: user.id,
      module_id: moduleId,
      score: result.score,
      passed: result.passed,
      attempt_no: attemptNo,
    });

    console.log("insert result:", { error: insertError?.message });
    if (insertError) throw new Error(`Failed to insert quiz attempt: ${insertError.message}`);

    // Award XP and badges for passing
    if (result.passed) {
      try {
        // xpReward is derived server-side inside awardQuizXP from the attempt
        // row just inserted above — never trust a client-supplied amount here.
        await awardQuizXP(moduleId);
      } catch (xpError) {
        console.error("Failed to award quiz XP:", xpError);
        // Continue even if XP fails - quiz is already submitted
      }

      // Award badge for first quiz passed
      await awardBadge(user.id, "first_quiz_passed").catch((err) => {
        console.error("Failed to award first_quiz_passed badge:", err);
      });

      // Award perfect score badge
      if (result.score === 100) {
        await awardBadge(user.id, "perfect_quiz").catch((err) => {
          console.error("Failed to award perfect_quiz badge:", err);
        });
      }

      // Update streak
      await updateStreak(user.id, true).catch((err) => {
        console.error("Failed to update streak:", err);
      });
    }

    revalidatePath(`/course/${moduleId}/quiz`);
    console.log("=== submitQuiz SUCCESS ===");
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const stack = error instanceof Error ? error.stack : "";
    console.error("=== submitQuiz ERROR ===");
    console.error("message:", message);
    console.error("stack:", stack);
    console.error("full error:", error);

    // Create a detailed error message for the client
    const detailedError = new Error(`Quiz submission failed: ${message}`);
    throw detailedError;
  }
}

async function getNextAttemptNumber(userId: string, moduleId: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_attempts")
    .select("attempt_no")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
    .order("attempt_no", { ascending: false })
    .limit(1);

  return (data?.[0]?.attempt_no || 0) + 1;
}

export async function getQuizAttempts(moduleId: number) {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_attempts")
    .select()
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .order("taken_at", { ascending: false });

  return data || [];
}

export async function hasPassedQuiz(moduleId: number): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_attempts")
    .select("passed")
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .eq("passed", true)
    .limit(1);

  return (data && data.length > 0) ?? false;
}
