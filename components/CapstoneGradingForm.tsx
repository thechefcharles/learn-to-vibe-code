"use client";

import { useState } from "react";
import { updateCapstoneGrade } from "@/lib/actions/capstone";
import { getRubricForVersion, SCORING_GUIDE } from "@/lib/capstone-rubrics";
import type { Version } from "@/lib/VersionContext";
import type { RubricScores } from "@/lib/actions/capstone";

interface CapstoneGradingFormProps {
  userId: string;
  version: "kids" | "adult";
  currentScores?: RubricScores;
  onGradeSubmitted?: () => void;
}

export function CapstoneGradingForm({
  userId,
  version,
  currentScores,
  onGradeSubmitted,
}: CapstoneGradingFormProps) {
  const rubric = getRubricForVersion(version);
  const [scores, setScores] = useState<RubricScores>(
    currentScores || rubric.reduce((acc, item) => ({ ...acc, [item.key]: 0 }), {})
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Calculate pass/fail based on rubric
  const scoreValues = Object.values(scores) as number[];
  const allMeet = scoreValues.length > 0 && scoreValues.every((s) => s >= 2);
  const total =
    scoreValues.length > 0
      ? (scoreValues.reduce((a, b) => a + b, 0) / (scoreValues.length * 3)) * 100
      : 0;
  const willPass = allMeet && total >= 80;

  const handleScoreChange = (key: string, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateCapstoneGrade(userId, scores);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onGradeSubmitted?.();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit grade");
    } finally {
      setLoading(false);
    }
  };

  const isKids = version === "kids";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rubric Items */}
      <div className="space-y-4">
        {rubric.map((item) => (
          <div
            key={item.key}
            className={`
              p-4 rounded-lg border
              ${isKids ? "bg-purple-50 border-purple-200" : "bg-blue-50 border-blue-200"}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <label className="font-semibold text-slate-900">{item.label}</label>
                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              </div>
              <select
                value={scores[item.key] || 0}
                onChange={(e) => handleScoreChange(item.key, parseInt(e.target.value))}
                className="ml-4 px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 font-medium"
              >
                <option value={0}>0 - Not attempted</option>
                <option value={1}>1 - Started</option>
                <option value={2}>2 - Adequate</option>
                <option value={3}>3 - Excellent</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Summary */}
      <div
        className={`
          p-4 rounded-lg border-2
          ${
            willPass
              ? `${isKids ? "bg-green-50 border-green-500" : "bg-green-50 border-green-500"}`
              : `${isKids ? "bg-red-50 border-red-500" : "bg-red-50 border-red-500"}`
          }
        `}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-slate-600">Total Score</p>
            <p className="text-2xl font-bold text-slate-900">{total.toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Min Criteria</p>
            <p className={`text-2xl font-bold ${allMeet ? "text-green-600" : "text-red-600"}`}>
              {allMeet ? "✓" : "✗"}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Result</p>
            <p className={`text-2xl font-bold ${willPass ? "text-green-600" : "text-red-600"}`}>
              {willPass ? "PASS" : "FAIL"}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Pass requires: all criteria ≥ 2 points AND total ≥ 80%
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          Grade submitted successfully! Certificate{willPass ? " issued." : " not issued (did not pass)."}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 px-4 rounded-lg font-semibold text-white
          ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : willPass
                ? `${isKids ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"}`
                : `${isKids ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-600 hover:bg-orange-700"}`
          }
          transition-colors
        `}
      >
        {loading ? "Submitting..." : `Submit Grade (${willPass ? "PASS" : "FAIL"})`}
      </button>
    </form>
  );
}
