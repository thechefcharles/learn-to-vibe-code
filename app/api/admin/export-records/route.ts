import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getUser } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/admin/export-records
 * Export learner records as CSV for CPD/IACET audits
 * Instructor-only endpoint
 */
export async function GET(req: NextRequest) {
  try {
    // Check instructor auth
    const user = await getUser();
    if (!user || user.role !== "instructor") {
      return NextResponse.json(
        { error: "Unauthorized - instructor only" },
        { status: 403 }
      );
    }

    // Fetch all enrollments with related data
    const { data: enrollments, error: enrollError } = await supabase
      .from("enrollments")
      .select(
        `
        user_id,
        enrolled_at,
        profiles:profiles(id, name, email),
        module_progress:module_progress(module_id, status, completed_at),
        quiz_attempts:quiz_attempts(module_id, score, passed, attempt_no, taken_at),
        capstone_submissions:capstone_submissions(result, rubric_scores, submitted_at, graded_by),
        certificates:certificates(cert_id, issued_at)
      `
      );

    if (enrollError) throw enrollError;

    // Build CSV rows
    const csvRows: string[] = [
      [
        "User ID",
        "Email",
        "Name",
        "Enrollment Date",
        "Module 0-15 Status",
        "Quiz Scores (Module 0-15)",
        "Capstone Result",
        "Capstone Rubric Scores",
        "Certificate ID",
        "Certificate Issue Date",
      ].join(","),
    ];

    enrollments.forEach((enrollment: any) => {
      const profile = enrollment.profiles[0];
      const capstone = enrollment.capstone_submissions?.[0];
      const cert = enrollment.certificates?.[0];

      // Build module status string (e.g., "complete,complete,locked,...")
      const moduleStatuses = Array.from({ length: 16 }, (_, i) => {
        const prog = enrollment.module_progress?.find(
          (p: any) => p.module_id === i
        );
        return prog?.status || "not_started";
      });

      // Build quiz scores string (e.g., "85%,92%,78%,...")
      const quizScores = Array.from({ length: 16 }, (_, i) => {
        const attempt = enrollment.quiz_attempts?.find(
          (q: any) => q.module_id === i
        );
        return attempt ? `${attempt.score}%` : "not_attempted";
      });

      const row = [
        enrollment.user_id,
        `"${profile.email}"`,
        `"${profile.name}"`,
        new Date(enrollment.enrolled_at).toISOString().split("T")[0],
        `"${moduleStatuses.join("|")}"`,
        `"${quizScores.join("|')}"`,
        capstone?.result || "not_submitted",
        capstone?.rubric_scores
          ? `"${JSON.stringify(capstone.rubric_scores)}"`
          : "",
        cert?.cert_id || "",
        cert?.issued_at
          ? new Date(cert.issued_at).toISOString().split("T")[0]
          : "",
      ];

      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");

    // Return as downloadable CSV
    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="learn-to-vibe-course-records.csv"',
      },
    });
  } catch (error) {
    console.error("Export records error:", error);
    return NextResponse.json(
      { error: "Failed to export records" },
      { status: 500 }
    );
  }
}
