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
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();

  // Get user's enrolled version
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("enrolled_version")
    .eq("user_id", user.id)
    .single();

  const version = (enrollment?.enrolled_version as Version) || "adult";

  // Get quiz and score it server-side (NEVER trust client scoring)
  const quiz = getModuleQuizByVersion(moduleId, version);
  if (!quiz) throw new Error("Quiz not found");

  const result = scoreQuiz(responses, quiz);

  // Store attempt with version tracking
  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    module_id: moduleId,
    score: result.score,
    passed: result.passed,
    attempt_no: await getNextAttemptNumber(user.id, moduleId),
    target_audience: version,
  });

  if (error) throw error;

  // Award XP and badges for passing
  if (result.passed) {
    // xpReward is derived server-side inside awardQuizXP from the attempt
    // row just inserted above — never trust a client-supplied amount here.
    await awardQuizXP(moduleId);

    // Award badge for first quiz passed
    await awardBadge(user.id, "first_quiz_passed").catch(() => {});

    // Award perfect score badge
    if (result.score === 100) {
      await awardBadge(user.id, "perfect_quiz").catch(() => {});
    }

    // Update streak
    await updateStreak(user.id, true).catch(() => {});
  }

  revalidatePath(`/course/${moduleId}/quiz`);
  return result;
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
