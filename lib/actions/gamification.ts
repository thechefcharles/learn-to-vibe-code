"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

export interface UserXP {
  user_id: string;
  points: number;
  level: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface UserStreak {
  user_id: string;
  current: number;
  longest: number;
}

export async function getUserXP(userId?: string): Promise<UserXP> {
  const supabase = await createClient();
  const user = userId ? null : await getUser();
  const id = userId || user?.id;

  if (!id) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("xp")
    .select("points, level")
    .eq("user_id", id)
    .single();

  if (error) throw error;
  return { user_id: id, points: data.points, level: data.level };
}

export async function getUserBadges(userId?: string): Promise<UserBadge[]> {
  const supabase = await createClient();
  const user = userId ? null : await getUser();
  const id = userId || user?.id;

  if (!id) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("badges")
    .select("id, user_id, badge_id, earned_at")
    .eq("user_id", id)
    .order("earned_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getUserStreak(userId?: string): Promise<UserStreak> {
  const supabase = await createClient();
  const user = userId ? null : await getUser();
  const id = userId || user?.id;

  if (!id) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("streaks")
    .select("current, longest")
    .eq("user_id", id)
    .single();

  if (error) throw error;
  return { user_id: id, current: data.current, longest: data.longest };
}

export async function awardXP(userId: string, points: number): Promise<UserXP> {
  const supabase = await createClient();

  const { data: current } = await supabase
    .from("xp")
    .select("points, level")
    .eq("user_id", userId)
    .single();

  if (!current) throw new Error("User XP record not found");

  const newPoints = current.points + points;
  const newLevel = Math.floor(newPoints / 1000) + 1;

  const { error } = await supabase
    .from("xp")
    .update({ points: newPoints, level: newLevel })
    .eq("user_id", userId);

  if (error) throw error;

  // Check for badge achievements
  await checkBadgeAchievements(userId, newLevel, newPoints);

  return { user_id: userId, points: newPoints, level: newLevel };
}

export async function awardBadge(userId: string, badgeId: string): Promise<UserBadge> {
  const supabase = await createClient();

  // Check if badge already exists
  const { data: existing } = await supabase
    .from("badges")
    .select("id")
    .eq("user_id", userId)
    .eq("badge_id", badgeId)
    .single();

  if (existing) {
    throw new Error("Badge already earned");
  }

  const { data, error } = await supabase
    .from("badges")
    .insert({
      user_id: userId,
      badge_id: badgeId,
      earned_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateStreak(userId: string, increment: boolean = true): Promise<UserStreak> {
  const supabase = await createClient();

  const { data: current } = await supabase
    .from("streaks")
    .select("current, longest")
    .eq("user_id", userId)
    .single();

  if (!current) throw new Error("Streak record not found");

  const newCurrent = increment ? current.current + 1 : 0;
  const newLongest = Math.max(current.longest, newCurrent);

  const { error } = await supabase
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
