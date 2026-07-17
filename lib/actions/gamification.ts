"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { getUser } from "@/lib/auth";
import { getModuleSteps } from "@/lib/module-steps";
import type { Version } from "@/lib/VersionContext";

// The `xp`, `badges`, `streaks` and `step_xp_claims` tables intentionally have
// no INSERT/UPDATE RLS policy for the `authenticated` role (see
// supabase/rls-policies.sql) — gamification records must only ever be
// written by trusted server logic, never directly by a user's own Supabase
// client, or a learner could grant themselves arbitrary XP/badges by calling
// the table API directly. Writes therefore go through the service-role
// client (same pattern as lib/actions/profile.ts / lib/certificate.ts),
// gated by the `getUser()` session check in every exported function below.
const serviceClient = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface UserXP {
  user_id: string;
  points: number;
  level: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_key: string;
  earned_at: string;
}

export interface UserStreak {
  user_id: string;
  current: number;
  longest: number;
}

export async function getUserXP(): Promise<UserXP> {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("xp")
    .select("points, level")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return { user_id: user.id, points: data.points, level: data.level };
}

export async function getUserBadges(): Promise<UserBadge[]> {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("badges")
    .select("id, user_id, badge_key, earned_at")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getUserStreak(): Promise<UserStreak> {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("streaks")
    .select("current, longest")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return { user_id: user.id, current: data.current, longest: data.longest };
}

// Internal helper — deliberately NOT exported. Only exported `async function`s
// in a "use server" file become callable Server Actions, so keeping this
// private guarantees it can never be invoked directly with attacker-supplied
// userId/points. Every exported entry point below must resolve the user from
// the session and derive `points` from trusted server-side data BEFORE
// calling this.
async function grantXP(userId: string, points: number): Promise<UserXP> {
  const { data: current } = await serviceClient
    .from("xp")
    .select("points, level")
    .eq("user_id", userId)
    .single();

  if (!current) throw new Error("User XP record not found");

  const newPoints = current.points + points;
  const newLevel = Math.floor(newPoints / 1000) + 1;

  const { error } = await serviceClient
    .from("xp")
    .update({ points: newPoints, level: newLevel })
    .eq("user_id", userId);

  if (error) throw error;

  // Check for badge achievements
  await checkBadgeAchievements(userId, newLevel, newPoints);

  return { user_id: userId, points: newPoints, level: newLevel };
}

/**
 * Award XP for completing a lesson step (module-steps flow).
 *
 * This is called directly from a Client Component (StepLessonViewer), which
 * means it is a public RPC endpoint — the client can send *any* arguments.
 * It must not accept a user id or an XP amount from the caller:
 *  - the user is resolved from the server session
 *  - the XP amount is looked up from the server-side step catalog
 *  - awarding is idempotent per (user, module, step) via `step_xp_claims`,
 *    so replaying the call cannot farm XP
 */
export async function awardXP(moduleId: number, stepId: number): Promise<UserXP | null> {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized: must be logged in to earn XP");
  }

  const supabase = await createClient();

  // Resolve the user's enrolled version server-side to look up the correct
  // step catalog (kids vs adult steps can carry different XP values).
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("enrolled_version")
    .eq("user_id", user.id)
    .single();
  const version = (enrollment?.enrolled_version as Version) || "adult";

  // Canonical step + XP value, from server-side data only — never trust the
  // client's copy of the step (it can be edited in memory before the call).
  const steps = getModuleSteps(moduleId, version);
  const step = steps?.steps.find((s) => s.id === stepId);
  if (!step) {
    throw new Error("Step not found");
  }

  // Idempotency: claim (user, module, step) exactly once via a unique
  // constraint. If the claim already exists, this is a safe no-op.
  const { error: claimError } = await serviceClient.from("step_xp_claims").insert({
    user_id: user.id,
    module_id: moduleId,
    step_id: stepId,
    xp_awarded: step.xpReward,
  });

  if (claimError) {
    if (claimError.code === "23505") {
      // Unique violation — XP for this step was already claimed.
      return getUserXP().catch(() => null);
    }
    throw claimError;
  }

  return grantXP(user.id, step.xpReward);
}

/**
 * Award XP for passing a module quiz.
 *
 * Also called from a Client Component indirectly via `submitQuiz`, so the
 * same rule applies: no client-supplied score or XP amount. This re-reads
 * the user's own most recent quiz attempt (already scored and stored
 * server-side in `submitQuiz`) and claims its XP exactly once via the
 * `xp_awarded` flag on that row, guarding against double-award races with a
 * conditional update.
 */
export async function awardQuizXP(moduleId: number): Promise<UserXP | null> {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized: must be logged in to earn XP");
  }

  const supabase = await createClient();

  const { data: attempt, error: queryError } = await supabase
    .from("quiz_attempts")
    .select("id, score, passed, xp_awarded")
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .order("attempt_no", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (queryError) throw new Error(`Failed to fetch quiz attempt: ${queryError.message}`);
  if (!attempt || !attempt.passed) return null;
  if (attempt.xp_awarded) return getUserXP().catch(() => null);

  const xpReward = attempt.score === 100 ? 150 : 100;

  // Conditional update: only proceed if this attempt hasn't been claimed yet.
  // Uses the service client — learners have no UPDATE grant on quiz_attempts,
  // so this flag can't be flipped back to false from the client to re-farm XP.
  const { data: claimed, error: claimError } = await serviceClient
    .from("quiz_attempts")
    .update({ xp_awarded: true })
    .eq("id", attempt.id)
    .eq("xp_awarded", false)
    .select("id");

  if (claimError) throw claimError;
  if (!claimed || claimed.length === 0) {
    // Lost the race to another concurrent request — already claimed.
    return getUserXP().catch(() => null);
  }

  return grantXP(user.id, xpReward);
}

export async function awardBadge(userId: string, badgeId: string): Promise<UserBadge> {
  const user = await getUser();
  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }

  // Check if badge already exists
  const { data: existing } = await serviceClient
    .from("badges")
    .select("id")
    .eq("user_id", userId)
    .eq("badge_key", badgeId)
    .single();

  if (existing) {
    throw new Error("Badge already earned");
  }

  const { data, error } = await serviceClient
    .from("badges")
    .insert({
      user_id: userId,
      badge_key: badgeId,
      earned_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateStreak(userId: string, increment: boolean = true): Promise<UserStreak> {
  const user = await getUser();
  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }

  const { data: current } = await serviceClient
    .from("streaks")
    .select("current, longest")
    .eq("user_id", userId)
    .single();

  if (!current) throw new Error("Streak record not found");

  const newCurrent = increment ? current.current + 1 : 0;
  const newLongest = Math.max(current.longest, newCurrent);

  const { error } = await serviceClient
    .from("streaks")
    .update({ current: newCurrent, longest: newLongest })
    .eq("user_id", userId);

  if (error) throw error;

  // Check for streak badges
  if (newCurrent === 7) await awardBadge(userId, "streak_7").catch(() => {});
  if (newCurrent === 30) await awardBadge(userId, "streak_30").catch(() => {});

  return { user_id: userId, current: newCurrent, longest: newLongest };
}

async function checkBadgeAchievements(userId: string, level: number, points: number): Promise<void> {
  try {
    // Perfect quiz badge (100 points in one go - handled elsewhere)
    // Level-based badges
    if (level >= 5) await awardBadge(userId, "five_modules_complete").catch(() => {});
    if (level >= 16) await awardBadge(userId, "all_modules_complete").catch(() => {});
  } catch {
    // Silently fail badge checks
  }
}
