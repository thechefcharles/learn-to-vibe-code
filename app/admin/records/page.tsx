"use client";

import { useState } from "react";
import {
  exportLearnerRecordsCSV,
  exportQuizAttemptRecordsCSV,
  exportCapstoneRecordsCSV,
  exportDeliverablesRecordsCSV,
  exportAccreditationSummaryCSV,
} from "@/lib/actions/records";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecordsExport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const downloadCSV = async (
    action: () => Promise<string>,
    filename: string
  ) => {
    setLoading(true);
    setError("");

    try {
      const csv = await action();

      // Create blob and download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to export records"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/instructor/capstone-reviews"
            className="text-violet hover:text-violet-light text-sm font-medium"
          >
            ← Back to Capstone Reviews
          </Link>
        </div>

        <h1 className="text-4xl font-bold font-display text-ink mb-2">
          Accreditation Records Export
        </h1>
        <p className="text-slate mb-8">
          Export learner records for CPD/IACET accreditation audits
        </p>

        {error && (
          <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 mb-6">
            <p className="text-danger text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learner Records */}
          <div className="bg-white rounded-lg border border-violet-light/20 p-6 hover:border-violet/40 transition">
            <h2 className="text-xl font-bold font-display text-ink mb-2">
              📊 Learner Records
            </h2>
            <p className="text-slate text-sm mb-4">
              Summary of all enrolled learners, completion status, and certificate issuance
            </p>
            <button
              onClick={() =>
                downloadCSV(exportLearnerRecordsCSV, "learner-records")
              }
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Exporting..." : "Export CSV"}
            </button>
          </div>

          {/* Quiz Attempt Records */}
          <div className="bg-white rounded-lg border border-violet-light/20 p-6 hover:border-violet/40 transition">
            <h2 className="text-xl font-bold font-display text-ink mb-2">
              ✏️ Quiz Attempts
            </h2>
            <p className="text-slate text-sm mb-4">
              Detailed audit trail of all quiz submissions and scores (pass/fail)
            </p>
            <button
              onClick={() =>
                downloadCSV(
                  exportQuizAttemptRecordsCSV,
                  "quiz-attempt-records"
                )
              }
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Exporting..." : "Export CSV"}
            </button>
          </div>

          {/* Capstone Records */}
          <div className="bg-white rounded-lg border border-violet-light/20 p-6 hover:border-violet/40 transition">
            <h2 className="text-xl font-bold font-display text-ink mb-2">
              🎓 Capstone Submissions
            </h2>
            <p className="text-slate text-sm mb-4">
              All capstone project submissions, grading status, and rubric scores
            </p>
            <button
              onClick={() =>
                downloadCSV(exportCapstoneRecordsCSV, "capstone-records")
              }
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Exporting..." : "Export CSV"}
            </button>
          </div>

          {/* Deliverables Records */}
          <div className="bg-white rounded-lg border border-violet-light/20 p-6 hover:border-violet/40 transition">
            <h2 className="text-xl font-bold font-display text-ink mb-2">
              📁 Deliverables Submissions
            </h2>
            <p className="text-slate text-sm mb-4">
              All module deliverable submissions including repo/live URLs, approval status, and auto-checks
            </p>
            <button
              onClick={() =>
                downloadCSV(
                  exportDeliverablesRecordsCSV,
                  "deliverables-records"
                )
              }
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Exporting..." : "Export CSV"}
            </button>
          </div>

          {/* Accreditation Summary */}
          <div className="bg-white rounded-lg border border-violet-light/20 p-6 hover:border-violet/40 transition">
            <h2 className="text-xl font-bold font-display text-ink mb-2">
              📈 Accreditation Summary
            </h2>
            <p className="text-slate text-sm mb-4">
              High-level metrics for accreditation bodies (completion rate, certificates)
            </p>
            <button
              onClick={() =>
                downloadCSV(
                  exportAccreditationSummaryCSV,
                  "accreditation-summary"
                )
              }
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Exporting..." : "Export CSV"}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-indigo/5 border border-violet-light/30 rounded-lg p-6">
          <h3 className="text-lg font-bold font-display text-ink mb-3">
            ℹ️ About These Records
          </h3>
          <ul className="text-slate text-sm space-y-2">
            <li>
              • <strong>Learner Records:</strong> Enrollment dates, module completion, quiz averages, and certificate IDs
            </li>
            <li>
              • <strong>Quiz Attempts:</strong> Per-attempt details (score, pass/fail, timestamp) for audit trail
            </li>
            <li>
              • <strong>Capstone Submissions:</strong> Project URLs, grading status, and submission date
            </li>
            <li>
              • <strong>Deliverables Submissions:</strong> Module-by-module repo URLs, live URLs, approval status, and auto-check results
            </li>
            <li>
              • <strong>Accreditation Summary:</strong> Completion rates and aggregate metrics for accreditors
            </li>
            <li>
              • All exports are date-stamped and include full learner information
            </li>
            <li>
              • These records satisfy CPD/IACET audit requirements for measurable learning outcomes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
