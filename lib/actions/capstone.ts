"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { getPublicIpForUrl } from "@/lib/actions/deliverable";

export interface CapstoneSubmission {
  id: string;
  user_id: string;
  title: string;
  description: string;
  repo_url: string;
  live_url: string;
  status: "pending" | "in_review" | "approved" | "rejected";
  instructor_feedback?: string;
  submitted_at: string;
  reviewed_at?: string;
}

export async function submitCapstone(data: {
  title: string;
  description: string;
  repo_url: string;
  live_url: string;
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
    // Update existing submission
    const { data: updated, error } = await supabase
      .from("capstone_submissions")
      .update({
        title: data.title,
        description: data.description,
        repo_url: data.repo_url,
        live_url: data.live_url,
        status: "pending",
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
        title: data.title,
        description: data.description,
        repo_url: data.repo_url,
        live_url: data.live_url,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return submission;
  }
}

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

export async function updateCapstoneStatus(
  capstoneId: string,
  status: "in_review" | "approved" | "rejected",
  feedback?: string
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
    throw new Error("Only instructors can review submissions");
  }

  const { data, error } = await supabase
    .from("capstone_submissions")
    .update({
      status,
      instructor_feedback: feedback,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", capstoneId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

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

  const { data } = await supabase
    .from("capstone_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  return data || [];
}
