"use client";

import { useState } from "react";
import { getCapstoneSubmissionsForReview } from "@/lib/actions/capstone";
import CapstoneReviewCard from "./CapstoneReviewCard";
import type { CapstoneSubmission } from "@/lib/actions/capstone";

interface CapstoneReviewsListProps {
  submissions: CapstoneSubmission[];
}

export default function CapstoneReviewsList({
  submissions: initialSubmissions,
}: CapstoneReviewsListProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [refreshing, setRefreshing] = useState(false);

  const handleGradeSubmitted = async () => {
    setRefreshing(true);
    try {
      const updated = await getCapstoneSubmissionsForReview();
      setSubmissions(updated);
    } catch (error) {
      console.error("Failed to refresh submissions:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Submissions</h2>
        {refreshing && <p className="text-sm text-slate-400">Refreshing...</p>}
      </div>

      {submissions.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
          <p className="text-slate-400">No capstone submissions yet</p>
        </div>
      ) : (
        submissions.map((submission) => (
          <CapstoneReviewCard
            key={submission.id}
            submission={submission}
            onGradeSubmitted={handleGradeSubmitted}
          />
        ))
      )}
    </div>
  );
}
