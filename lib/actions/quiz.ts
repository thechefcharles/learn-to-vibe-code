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
  // Minimal test - just return success without any database operations
  return {
    score: 100,
    percentage: 100,
    passed: true,
  };
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
