"use client";

import { useState } from "react";
import { updateCapstoneStatus } from "@/lib/actions/capstone";
import type { CapstoneSubmission } from "@/lib/actions/capstone";

interface CapstoneReviewCardProps {
  submission: CapstoneSubmission;
}

export default function CapstoneReviewCard({ submission }: CapstoneReviewCardProps) {
  const [feedback, setFeedback] = useState(submission.instructor_feedback || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleApprove = async () => {
    setSaving(true);
    setError("");
    try {
      await updateCapstoneStatus(submission.id, "approved", feedback);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!feedback) {
      setError("Please provide feedback before rejecting");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await updateCapstoneStatus(submission.id, "rejected", feedback);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
      setSaving(false);
    }
  };

  const handleStartReview = async () => {
    setSaving(true);
    setError("");
    try {
      await updateCapstoneStatus(submission.id, "in_review", feedback);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
      setSaving(false);
    }
  };

  const statusColor = {
    pending: "border-yellow-500",
    in_review: "border-orange-500",
    approved: "border-green-500",
    rejected: "border-red-500",
  }[submission.status];

  const statusLabel = {
    pending: "⏳ Pending",
    in_review: "👀 Reviewing",
    approved: "✅ Approved",
    rejected: "❌ Rejected",
  }[submission.status];

  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-2 ${statusColor}`}>
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{submission.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{statusLabel}</p>
        </div>
        <div className="text-sm text-slate-400">
          {new Date(submission.submitted_at).toLocaleDateString()}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-slate-300 mb-3">{submission.description}</p>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-slate-400">Repository: </span>
            <a
              href={submission.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              {submission.repo_url}
            </a>
          </p>
          <p>
            <span className="text-slate-400">Live: </span>
            <a
              href={submission.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              {submission.live_url}
            </a>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Feedback</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Provide constructive feedback for the student..."
          rows={4}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {submission.status === "pending" && (
        <div className="flex gap-3">
          <button
            onClick={handleStartReview}
            disabled={saving}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white font-medium py-2 rounded-lg transition"
          >
            {saving ? "Saving..." : "Start Review"}
          </button>
        </div>
      )}

      {(submission.status === "in_review" || submission.status === "pending") && (
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            disabled={saving}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium py-2 rounded-lg transition"
          >
            {saving ? "Saving..." : "✅ Approve"}
          </button>
          <button
            onClick={handleReject}
            disabled={saving}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium py-2 rounded-lg transition"
          >
            {saving ? "Saving..." : "❌ Reject"}
          </button>
        </div>
      )}
    </div>
  );
}
