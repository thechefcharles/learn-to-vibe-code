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
    const user = await getUser();
    if (!user) throw new Error("Not authenticated");

    const supabase = await createClient();

    // Get user's enrolled version
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("enrolled_version")
      .eq("user_id", user.id)
      .single();

    if (enrollmentError) throw new Error(`Failed to fetch enrollment: ${enrollmentError.message}`);

    const version = (enrollment?.enrolled_version as Version) || "adult";

    // Get quiz and score it server-side (NEVER trust client scoring)
    const quiz = getModuleQuizByVersion(moduleId, version);
    if (!quiz) throw new Error("Quiz not found");

    const result = scoreQuiz(responses, quiz);

    // Store attempt (version is tracked server-side during scoring, not stored in DB)
    const attemptNo = await getNextAttemptNumber(user.id, moduleId);
    const { error: insertError } = await supabase.from("quiz_attempts").insert({
      user_id: user.id,
      module_id: moduleId,
      score: result.score,
      passed: result.passed,
      attempt_no: attemptNo,
    });

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
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("submitQuiz error:", message);
    throw error;
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
