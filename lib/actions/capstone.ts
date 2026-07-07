"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { getPublicIpForUrl } from "@/lib/actions/deliverable";
import { issueCertificate } from "@/lib/certificate";

export interface RubricScores {
  [criterion: string]: number; // 0-3 per criterion
}

export interface CapstoneSubmission {
  id?: string;
  user_id: string;
  repo_url: string;
  live_url: string;
  writeup?: string;
  defense_video_url?: string;
  result?: "pending" | "pass" | "fail";
  rubric_scores?: RubricScores;
  graded_by?: string;
  submitted_at?: string;
  target_audience?: "kids" | "adult";
  learner_name?: string;
  learner_email?: string;
}

/**
 * Submit capstone project (learner action)
 */
export async function submitCapstone(data: {
  repo_url: string;
  live_url: string;
  writeup?: string;
  defense_video_url?: string;
}): Promise<CapstoneSubmission> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Validate URLs are accessible (reuse SSRF-safe validation)
  try {
    await getPublicIpForUrl(data.repo_url);
    await getPublicIpForUrl(data.live_url);
  } catch (error) {
    throw new Error("One or both URLs are not publicly accessible");
  }

  const supabase = await createClient();

  // Check if already submitted
  const { data: existing } = await supabase
    .from("capstone_submissions")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existing) {
    // Update existing submission (revert to pending)
    const { data: updated, error } = await supabase
      .from("capstone_submissions")
      .update({
        repo_url: data.repo_url,
        live_url: data.live_url,
        writeup: data.writeup || null,
        defense_video_url: data.defense_video_url || null,
        result: "pending",
        submitted_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  } else {
    // Create new submission
    const { data: submission, error } = await supabase
      .from("capstone_submissions")
      .insert({
        user_id: user.id,
        repo_url: data.repo_url,
        live_url: data.live_url,
        writeup: data.writeup || null,
        defense_video_url: data.defense_video_url || null,
        result: "pending",
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return submission;
  }
}

/**
 * Get learner's capstone submission
 */
export async function getCapstoneSubmission(): Promise<CapstoneSubmission | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("capstone_submissions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return data || null;
}

/**
 * Grade capstone and issue certificate if passed (instructor action)
 * Rubric scoring: 10 criteria, each 0-3 points
 * Pass: all criteria >= 2/3 AND total >= 80%
 */
export async function updateCapstoneGrade(
  userId: string,
  rubricScores: RubricScores
): Promise<CapstoneSubmission> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Verify user is instructor
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Only instructors can grade submissions");
  }

  // Calculate result: all criteria must be >= 2, total >= 80%
  const scores = Object.values(rubricScores) as number[];
  const allMeet = scores.every((s) => s >= 2);
  const total = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / (scores.length * 3)) * 100 : 0;
  const result = allMeet && total >= 80 ? "pass" : "fail";

  // Update capstone
  const { data, error } = await supabase
    .from("capstone_submissions")
    .update({
      result,
      rubric_scores: rubricScores,
      graded_by: user.id,
    })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  // Auto-issue certificate if passed
  if (result === "pass") {
    try {
      await issueCertificate(userId, data.user_id);
    } catch (certError) {
      console.error("Certificate issuance failed (non-blocking):", certError);
    }
  }

  return data;
}

/**
 * Get all capstone submissions for instructor review with version and learner info
 */
export async function getCapstoneSubmissionsForReview(): Promise<CapstoneSubmission[]> {
  const user = await getUser();
  if (!user) return [];

  // Verify user is instructor
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    return [];
  }

  const { data: submissions } = await supabase
    .from("capstone_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (!submissions) return [];

  // Enrich with learner info and enrolled version
  const enriched = await Promise.all(
    submissions.map(async (submission: any) => {
      const { data: learner } = await supabase
        .from("profiles")
        .select("name, email")
        .eq("id", submission.user_id)
        .single();

      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("enrolled_version")
        .eq("user_id", submission.user_id)
        .single();

      return {
        ...submission,
        learner_name: learner?.name,
        learner_email: learner?.email,
        target_audience: enrollment?.enrolled_version || "adult",
      };
    })
  );

  return enriched;
}
