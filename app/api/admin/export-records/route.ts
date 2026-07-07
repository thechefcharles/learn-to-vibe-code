import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // Verify instructor role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "instructor") {
      return NextResponse.json(
        { error: "Only instructors can export records" },
        { status: 403 }
      );
    }

    // Fetch all learner data
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, name, email, created_at")
      .eq("role", "learner")
      .order("created_at", { ascending: false });

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        { error: "No learner records found" },
        { status: 404 }
      );
    }

    // For each learner, fetch their progress data
    const records = await Promise.all(
      profiles.map(async (learner) => {
        // Get enrollments
        const { data: enrollments } = await supabase
          .from("enrollments")
          .select("enrolled_at, status")
          .eq("user_id", learner.id)
          .single();

        // Get module progress (count completed)
        const { data: moduleProgress } = await supabase
          .from("module_progress")
          .select("*")
          .eq("user_id", learner.id);

        const modulesCompleted = moduleProgress?.filter((m) => m.completed_at).length || 0;

        // Get quiz attempts (latest score per module)
        const { data: quizAttempts } = await supabase
          .from("quiz_attempts")
          .select("module_id, score, passed")
          .eq("user_id", learner.id)
          .order("taken_at", { ascending: false });

        const quizPassCount = quizAttempts?.filter((q) => q.passed).length || 0;

        // Get capstone submission
        const { data: capstone } = await supabase
          .from("capstone_submissions")
          .select("result, submitted_at")
          .eq("user_id", learner.id)
          .single();

        // Get certificate (if issued)
        const { data: cert } = await supabase
          .from("certificates")
          .select("cert_id, issued_at")
          .eq("user_id", learner.id)
          .single();

        return {
          learner_id: learner.id,
          learner_name: learner.name,
          learner_email: learner.email,
          enrolled_at: enrollments?.enrolled_at || "",
          enrollment_status: enrollments?.status || "inactive",
          modules_completed: modulesCompleted,
          quizzes_passed: quizPassCount,
          capstone_result: capstone?.result || "not_submitted",
          capstone_submitted_at: capstone?.submitted_at || "",
          certificate_issued: cert ? "yes" : "no",
          certificate_id: cert?.cert_id || "",
          certificate_issued_at: cert?.issued_at || "",
          account_created_at: learner.created_at,
        };
      })
    );

    // CSV-safe escaper (prevents formula injection)
    function csvSafe(value: any): string {
      const s = String(value ?? "");
      let escaped = s.replace(/"/g, '""');
      // Prevent formula injection: prefix with ' if starts with formula chars
      if (/^[=+\-@\t\r]/.test(escaped)) {
        escaped = "'" + escaped;
      }
      return `"${escaped}"`;
    }

    // Generate CSV
    const headers = [
      "Learner ID",
      "Name",
      "Email",
      "Enrolled At",
      "Enrollment Status",
      "Modules Completed",
      "Quizzes Passed",
      "Capstone Result",
      "Capstone Submitted At",
      "Certificate Issued",
      "Certificate ID",
      "Certificate Issued At",
      "Account Created At",
    ];

    const csvRows = records.map((record) => [
      csvSafe(record.learner_id),
      csvSafe(record.learner_name),
      csvSafe(record.learner_email),
      csvSafe(record.enrolled_at),
      csvSafe(record.enrollment_status),
      record.modules_completed,
      record.quizzes_passed,
      csvSafe(record.capstone_result),
      csvSafe(record.capstone_submitted_at),
      csvSafe(record.certificate_issued),
      csvSafe(record.certificate_id),
      csvSafe(record.certificate_issued_at),
      csvSafe(record.account_created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="learner-records-${new Date().toISOString().split("T")[0]}.csv"`,
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
