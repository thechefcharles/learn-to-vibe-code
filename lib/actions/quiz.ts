"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { scoreQuiz, getModuleQuiz } from "@/lib/quizzes";
import { revalidatePath } from "next/cache";

export async function submitQuiz(
  moduleId: number,
  responses: Record<string, number>
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Get quiz and score it server-side (NEVER trust client scoring)
  const quiz = getModuleQuiz(moduleId);
  if (!quiz) throw new Error("Quiz not found");

  const result = scoreQuiz(responses, quiz);

  const supabase = await createClient();

  // Store attempt
  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    module_id: moduleId,
    score: result.score,
    passed: result.passed,
    attempt_no: await getNextAttemptNumber(user.id, moduleId),
  });

  if (error) throw error;

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

  return data && data.length > 0;
}
