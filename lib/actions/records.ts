"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

export interface LearnerRecord {
  learner_id: string;
  name: string;
  email: string;
  enrollment_date: string;
  modules_completed: number;
  quiz_score_avg: number;
  capstone_result: string | null;
  certificate_id: string | null;
  issued_at: string | null;
}

/**
 * Export all learner records as CSV for CPD/IACET audits
 * Instructor-only access
 */
export async function exportLearnerRecordsCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Check instructor role
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Instructor access required");
  }

  // Fetch all learner records
  const { data: records } = await supabase
    .from("profiles")
    .select(
      `
      id,
      name,
      email,
      created_at,
      enrollments(enrolled_at),
      quiz_attempts(score, passed),
      capstone_submissions(result, graded_at),
      certificates(cert_id, issued_at)
    `
    )
    .eq("role", "learner")
    .order("created_at", { ascending: true });

  if (!records) return "";

  // Build CSV rows
  const rows: string[] = [
    "Learner ID,Name,Email,Enrollment Date,Modules Completed,Avg Quiz Score (%),Capstone Result,Certificate ID,Issued At",
  ];

  for (const record of records) {
    const enrollments = (record as any).enrollments || [];
    const quizAttempts = (record as any).quiz_attempts || [];
    const capstoneSubmissions = (record as any).capstone_submissions || [];
    const certificates = (record as any).certificates || [];

    const enrollmentDate = enrollments[0]?.enrolled_at || record.created_at;

    // Count modules from quiz attempts (1 quiz per module = 1 module)
    const modulesCompleted = new Set(
      quizAttempts.map((q: any) => q.module_id)
    ).size;

    // Average quiz score
    const avgScore =
      quizAttempts.length > 0
        ? Math.round(
            quizAttempts.reduce((sum: number, q: any) => sum + q.score, 0) /
              quizAttempts.length
          )
        : 0;

    const capstoneResult = capstoneSubmissions[0]?.result || "Not Submitted";
    const certificate = certificates[0];
    const certId = certificate?.cert_id || "N/A";
    const issuedAt = certificate?.issued_at || "N/A";

    const row = [
      record.id,
      `"${record.name}"`, // Quote to handle commas in names
      record.email,
      enrollmentDate,
      modulesCompleted,
      avgScore,
      capstoneResult,
      certId,
      issuedAt,
    ].join(",");

    rows.push(row);
  }

  return rows.join("\n");
}

/**
 * Export detailed quiz attempt records for audit trail
 */
export async function exportQuizAttemptRecordsCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Check instructor role
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Instructor access required");
  }

  // Fetch all quiz attempts
  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select(
      `
      user_id,
      module_id,
      score,
      percentage,
      passed,
      attempt_no,
      taken_at,
      profiles(name, email)
    `
    )
    .order("taken_at", { ascending: false });

  if (!attempts) return "";

  // Build CSV rows
  const rows: string[] = [
    "Learner ID,Learner Name,Email,Module ID,Score (%),Passed,Attempt #,Taken At",
  ];

  for (const attempt of attempts) {
    const profile = (attempt as any).profiles;
    const row = [
      attempt.user_id,
      `"${profile?.name || "Unknown"}"`,
      profile?.email || "Unknown",
      attempt.module_id,
      attempt.percentage,
      attempt.passed ? "Yes" : "No",
      attempt.attempt_no,
      new Date(attempt.taken_at).toISOString(),
    ].join(",");

    rows.push(row);
  }

  return rows.join("\n");
}

/**
 * Export capstone submission records for grading audit
 */
export async function exportCapstoneRecordsCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Check instructor role
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Instructor access required");
  }

  // Fetch all capstone submissions
  const { data: submissions } = await supabase
    .from("capstone_submissions")
    .select(
      `
      user_id,
      repo_url,
      live_url,
      rubric_scores,
      result,
      graded_by,
      submitted_at,
      profiles(name, email)
    `
    )
    .order("submitted_at", { ascending: false });

  if (!submissions) return "";

  // Build CSV rows
  const rows: string[] = [
    "Learner ID,Learner Name,Email,Result,Repo URL,Live URL,Graded By,Submitted At,Graded At",
  ];

  for (const submission of submissions) {
    const profile = (submission as any).profiles;
    const row = [
      submission.user_id,
      `"${profile?.name || "Unknown"}"`,
      profile?.email || "Unknown",
      submission.result || "Pending",
      submission.repo_url || "N/A",
      submission.live_url || "N/A",
      submission.graded_by || "Not Graded",
      submission.submitted_at ? new Date(submission.submitted_at).toISOString() : "N/A",
    ].join(",");

    rows.push(row);
  }

  return rows.join("\n");
}

/**
 * Export accreditation summary (for CPD/IACET reports)
 */
export async function exportAccreditationSummaryCSV(): Promise<string> {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Check instructor role
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    throw new Error("Instructor access required");
  }

  // Get summary stats
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "learner");

  const { data: certificates } = await supabase
    .from("certificates")
    .select("id");

  const { data: capstoneResults } = await supabase
    .from("capstone_submissions")
    .select("result")
    .eq("result", "pass");

  const totalLearners = profiles?.length || 0;
  const completedCount = certificates?.length || 0;
  const capstonePassCount = capstoneResults?.length || 0;
  const completionRate =
    totalLearners > 0
      ? Math.round((completedCount / totalLearners) * 100)
      : 0;

  // Build CSV with summary
  const rows: string[] = [
    "Accreditation Summary Report",
    "",
    "Metric,Value",
    `Total Learners Enrolled,${totalLearners}`,
    `Certificates Issued,${completedCount}`,
    `Completion Rate (%),${completionRate}`,
    `Capstone Pass Count,${capstonePassCount}`,
    `Report Generated,${new Date().toISOString()}`,
  ];

  return rows.join("\n");
}
