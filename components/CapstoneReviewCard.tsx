"use client";

import { useState } from "react";
import { CapstoneGradingForm } from "./CapstoneGradingForm";
import type { CapstoneSubmission } from "@/lib/actions/capstone";

interface CapstoneReviewCardProps {
  submission: CapstoneSubmission;
  onGradeSubmitted?: () => void;
}

export default function CapstoneReviewCard({
  submission,
  onGradeSubmitted,
}: CapstoneReviewCardProps) {
  const [showGradingForm, setShowGradingForm] = useState(false);
  const result = submission.result || "pending";
  const isKids = submission.target_audience === "kids";

  const statusColorMap: Record<string, string> = {
    pending: "border-yellow-500",
    pass: "border-green-500",
    fail: "border-red-500",
  };
  const statusLabelMap: Record<string, string> = {
    pending: "⏳ Pending Review",
    pass: "✅ Passed",
    fail: "❌ Failed",
  };

  const statusColor = statusColorMap[result];
  const statusLabel = statusLabelMap[result];

  const handleGradeSubmitted = () => {
    setShowGradingForm(false);
    onGradeSubmitted?.();
  };

  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-2 ${statusColor} space-y-4`}>
      {/* Header with Status */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm text-slate-400">{statusLabel}</p>
            {isKids && <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">🎮 Kids</span>}
            {!isKids && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">💼 Adult</span>}
          </div>
          <h3 className="text-lg font-semibold text-white">{submission.learner_name}</h3>
          <p className="text-sm text-slate-400">{submission.learner_email}</p>
        </div>
        <div className="text-sm text-slate-400">
          {new Date(submission.submitted_at || "").toLocaleDateString()}
        </div>
      </div>

      {/* Submission Links */}
      <div className="space-y-2 text-sm">
        <p>
          <span className="text-slate-400">Repository: </span>
          <a
            href={submission.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 break-all"
          >
            {submission.repo_url} →
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
            {submission.live_url} →
          </a>
        </p>
        {submission.defense_video_url && (
          <p>
            <span className="text-slate-400">Defense Video: </span>
            <a
              href={submission.defense_video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Watch →
            </a>
          </p>
        )}
      </div>

      {/* Current Rubric Scores (if graded) */}
      {submission.rubric_scores && submission.result !== "pending" && (
        <div className={`p-3 rounded-lg ${isKids ? "bg-purple-600/20 border border-purple-600/30" : "bg-blue-600/20 border border-blue-600/30"}`}>
          <p className="text-sm font-semibold text-slate-200 mb-2">Rubric Scores:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(submission.rubric_scores).map(([key, score]) => (
              <div key={key} className="text-slate-300">
                {key}: <span className="font-bold">{score}/3</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grade Button or Form */}
      {result === "pending" ? (
        <>
          {!showGradingForm ? (
            <button
              onClick={() => setShowGradingForm(true)}
              className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
                isKids
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Grade Capstone ({isKids ? "🎮 Kids" : "💼 Adult"})
            </button>
          ) : (
            <div className={`p-4 rounded-lg ${isKids ? "bg-purple-600/10 border border-purple-600/30" : "bg-blue-600/10 border border-blue-600/30"}`}>
              <p className="text-sm font-semibold text-white mb-4">
                {isKids ? "🎮 Kids Capstone Grading" : "💼 Adult Capstone Grading"}
              </p>
              <CapstoneGradingForm
                userId={submission.user_id}
                version={submission.target_audience || "adult"}
                currentScores={submission.rubric_scores}
                onGradeSubmitted={handleGradeSubmitted}
              />
            </div>
          )}
        </>
      ) : (
        <div className={`p-3 rounded-lg text-center text-sm font-semibold ${
          result === "pass"
            ? "bg-green-600/20 text-green-200 border border-green-600/30"
            : "bg-red-600/20 text-red-200 border border-red-600/30"
        }`}>
          {result === "pass" ? "✅ Capstone Approved - Certificate Issued" : "❌ Capstone Not Approved"}
        </div>
      )}
    </div>
  );
}
