"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

/**
 * Records Export — Instructor-only data fetching with RLS
 * For accreditation compliance (CSV exports)
 */

function convertToCSV(data: any[], headers: string[]): string {
  const headerRow = headers.map((h) => `"${h}"`).join(",");
  const dataRows = data.map((row) =>
    headers
      .map((h) => {
        const value = row[h];
        if (value === null || value === undefined) return '""';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",")
  );
  return [headerRow, ...dataRows].join("\n");
}

/**
 * Export learners as CSV
 */
export async function exportLearnerRecordsCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Only instructors can export records");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      name,
      email,
      enrollments (
        enrolled_version,
        enrolled_at,
        status
      )
    `
    )
    .eq("role", "learner");

  if (error) throw error;

  const learners = data?.map((learner: any) => ({
    "Learner ID": learner.id,
    Name: learner.name,
    Email: learner.email,
    Version: learner.enrollments?.[0]?.enrolled_version || "adult",
    "Enrolled Date": learner.enrollments?.[0]?.enrolled_at ? new Date(learner.enrollments[0].enrolled_at).toLocaleDateString() : "",
    Status: learner.enrollments?.[0]?.status || "pending",
  })) || [];

  const headers = ["Learner ID", "Name", "Email", "Version", "Enrolled Date", "Status"];
  return convertToCSV(learners, headers);
}

/**
 * Export quiz attempts as CSV
 */
export async function exportQuizAttemptRecordsCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Only instructors can export records");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select(
      `
      user_id,
      module_id,
      score,
      passed,
      attempt_no,
      taken_at,
      target_audience,
      profiles (name)
    `
    )
    .order("taken_at", { ascending: false });

  if (error) throw error;

  const attempts = data?.map((attempt: any) => ({
    "Learner ID": attempt.user_id,
    "Learner Name": attempt.profiles?.name || "Unknown",
    Module: `Module ${attempt.module_id}`,
    "Quiz Date": new Date(attempt.taken_at).toLocaleDateString(),
    "Score %": attempt.score,
    Passed: attempt.passed ? "Yes" : "No",
    "Attempt #": attempt.attempt_no,
    Version: attempt.target_audience,
  })) || [];

  const headers = ["Learner ID", "Learner Name", "Module", "Quiz Date", "Score %", "Passed", "Attempt #", "Version"];
  return convertToCSV(attempts, headers);
}

/**
 * Export capstone submissions as CSV
 */
export async function exportCapstoneRecordsCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Only instructors can export records");
  }

  const { data, error } = await supabase
    .from("capstone_submissions")
    .select(
      `
      user_id,
      repo_url,
      live_url,
      rubric_scores,
      result,
      target_audience,
      graded_by,
      submitted_at,
      profiles (name)
    `
    )
    .order("submitted_at", { ascending: false });

  if (error) throw error;

  const submissions = data?.map((sub: any) => ({
    "Learner ID": sub.user_id,
    "Learner Name": sub.profiles?.name || "Unknown",
    "Repository URL": sub.repo_url,
    "Live URL": sub.live_url,
    Result: sub.result,
    "Graded Date": sub.graded_by ? new Date(sub.submitted_at).toLocaleDateString() : "Pending",
    Version: sub.target_audience,
    "Total Score": sub.rubric_scores ? (Object.values(sub.rubric_scores).reduce((a: any, b: any) => a + b, 0) / (Object.keys(sub.rubric_scores).length * 3) * 100).toFixed(0) : "N/A",
  })) || [];

  const headers = ["Learner ID", "Learner Name", "Repository URL", "Live URL", "Result", "Graded Date", "Version", "Total Score"];
  return convertToCSV(submissions, headers);
}

/**
 * Export comprehensive accreditation summary
 */
export async function exportAccreditationSummaryCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Only instructors can export records");
  }

  // Fetch all data
  const [learners, quizzes, capstones, certificates] = await Promise.all([
    supabase.from("profiles").select(`id, name, email, enrollments (enrolled_version, enrolled_at, status)`).eq("role", "learner"),
    supabase.from("quiz_attempts").select(`user_id, module_id, passed`),
    supabase.from("capstone_submissions").select(`user_id, result`),
    supabase.from("certificates").select(`user_id`),
  ]);

  const learnerData = learners.data || [];
  const quizData = quizzes.data || [];
  const capstoneData = capstones.data || [];
  const certData = certificates.data || [];

  const summary = learnerData.map((learner: any) => {
    const completedModules = new Set(
      quizData
        .filter((q: any) => q.user_id === learner.id && q.passed)
        .map((q: any) => q.module_id)
    );

    return {
      "Learner ID": learner.id,
      Name: learner.name,
      Email: learner.email,
      Version: learner.enrollments?.[0]?.enrolled_version || "adult",
      "Modules Completed": completedModules.size,
      "Capstone Status": capstoneData.find((c: any) => c.user_id === learner.id)?.result || "Not submitted",
      "Certificate Issued": certData.find((c: any) => c.user_id === learner.id) ? "Yes" : "No",
      Status: learner.enrollments?.[0]?.status || "pending",
    };
  });

  const headers = ["Learner ID", "Name", "Email", "Version", "Modules Completed", "Capstone Status", "Certificate Issued", "Status"];
  return convertToCSV(summary, headers);
}
