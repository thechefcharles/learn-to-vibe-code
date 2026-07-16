"use client";

import { useState, useEffect } from "react";
import { submitQuiz, getQuizAttempts } from "@/lib/actions/quiz";
import { getModuleQuizForClient } from "@/lib/quizzes";
import { getModuleMetadata } from "@/lib/module-metadata";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useVersion } from "@/lib/VersionContext";
import type { Version } from "@/lib/VersionContext";

interface QuizResult {
  score: number;
  percentage: number;
  passed: boolean;
}

export default function QuizPage() {
  const params = useParams();
  const moduleId = parseInt(params.moduleId as string);
  const { version } = useVersion();
  const isKids = version === "kids";

  const [quiz, setQuiz] = useState<any>(null);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    // Get version from localStorage (set during signup/toggle)
    const version = (localStorage.getItem("version") as Version) || "adult";

    // Load client-safe quiz (answer keys stripped)
    const q = getModuleQuizForClient(moduleId, version);
    setQuiz(q);

    // Load previous attempts
    getQuizAttempts(moduleId).then(setAttempts);
  }, [moduleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz) return;

    // Check all questions answered
    if (Object.keys(responses).length < quiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await submitQuiz(moduleId, responses);
      setResult(res);
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit quiz");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setResponses({});
    setSubmitted(false);
    setResult(null);
  };

  const meta = getModuleMetadata(moduleId);
  const passedBefore = attempts.some((a: any) => a.passed);

  if (!quiz) {
    return (
      <div className={`min-h-screen py-12 px-4 ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
        <div className={`max-w-2xl mx-auto text-center ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "Loading your quiz! 🎮" : "Loading quiz..."}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Link
          href={`/course/${moduleId}`}
          className={`text-sm mb-6 inline-block transition ${isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"}`}
        >
          ← Back to Lesson
        </Link>

        <h1 className={`text-4xl font-bold mb-2 ${isKids ? "text-purple-700" : "text-white"}`}>{meta.title}</h1>
        <p className={`mb-8 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "🎯 Answer all questions. 80% to pass!" : "Quiz: Answer all questions. 80% to pass."}
        </p>

        {submitted && result ? (
          /* Results Screen */
          <div className={`rounded-lg p-8 border-2 ${isKids ? "bg-white border-purple-300" : "bg-slate-800 border-slate-700"}`}>
            <div className="text-center mb-8">
              <div
                className={`text-6xl font-bold mb-2 ${
                  result.passed ? "text-green-400" : "text-red-400"
                }`}
              >
                {result.percentage}%
              </div>
              <h2
                className={`text-2xl font-bold ${
                  result.passed ? "text-green-400" : "text-red-400"
                }`}
              >
                {result.passed ? "✓ Quiz Passed!" : "Quiz Failed"}
              </h2>
              <p className={`mt-2 ${isKids ? "text-purple-600" : "text-slate-300"}`}>
                {isKids ? `You scored ${result.score}/${quiz.questions.length} — Amazing! 🎉` : `You scored ${result.score} out of ${quiz.questions.length}`}
              </p>
            </div>

            {result.passed && (
              <div className={`rounded-lg p-4 mb-6 ${isKids ? "bg-green-100 border border-green-300" : "bg-green-500/10 border border-green-500/20"}`}>
                <p className={`font-medium ${isKids ? "text-green-700" : "text-green-400"}`}>
                  {isKids ? "🚀 Next level unlocked! Mark your checklist complete to unlock the next module." : "✓ You've unlocked the next module! Check your checklist to mark the quiz as complete."}
                </p>
              </div>
            )}

            {!result.passed && (
              <div className={`rounded-lg p-4 mb-6 ${isKids ? "bg-yellow-100 border border-yellow-300" : "bg-yellow-500/10 border border-yellow-500/20"}`}>
                <p className={`font-medium ${isKids ? "text-yellow-700" : "text-yellow-400"}`}>
                  {isKids ? "Almost there! 💪 You need 80% to pass. Try again with fresh questions." : "You need 80% to pass. You can retake the quiz with a fresh question pool."}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleRetake}
                className={`flex-1 font-medium py-2 rounded-lg transition ${isKids ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                {isKids ? "Try Again 🔄" : "Retake Quiz"}
              </button>
              <Link
                href={`/course/${moduleId}`}
                className={`flex-1 font-medium py-2 rounded-lg transition text-center ${isKids ? "bg-slate-200 hover:bg-slate-300 text-purple-700" : "bg-slate-700 hover:bg-slate-600 text-white"}`}
              >
                Back to Lesson
              </Link>
            </div>

            {/* Attempt History */}
            {attempts.length > 1 && (
              <div className={`mt-8 pt-8 border-t ${isKids ? "border-purple-200" : "border-slate-700"}`}>
                <h3 className={`text-lg font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
                  {isKids ? "📊 Your Attempts" : "Attempt History"}
                </h3>
                <div className="space-y-2 text-sm">
                  {attempts.map((a: any, idx: number) => (
                    <div key={idx} className={`flex justify-between ${isKids ? "text-purple-700" : "text-slate-300"}`}>
                      <span>Attempt {a.attempt_no}</span>
                      <span
                        className={
                          a.passed ? (isKids ? "text-green-600 font-bold" : "text-green-400") : (isKids ? "text-red-600 font-bold" : "text-red-400")
                        }
                      >
                        {Math.round((a.score / quiz.questions.length) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {quiz.questions.map((q: any, idx: number) => (
              <div
                key={q.id}
                className={`rounded-lg p-6 border ${isKids ? "bg-white border-purple-200" : "bg-slate-800 border-slate-700"}`}
              >
                <h3 className={`text-lg font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
                  {isKids ? `🎯 Question ${idx + 1}` : `Question ${idx + 1}`}
                </h3>
                <p className={`mb-4 ${isKids ? "text-slate-700" : "text-slate-200"}`}>{q.text}</p>

                <div className="space-y-2">
                  {q.options.map((option: string, optIdx: number) => (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${isKids ? "bg-purple-50 hover:bg-purple-100 border border-purple-200" : "bg-slate-700 hover:bg-slate-600"}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={optIdx}
                        checked={responses[q.id] === optIdx}
                        onChange={(e) =>
                          setResponses((prev) => ({
                            ...prev,
                            [q.id]: parseInt(e.target.value),
                          }))
                        }
                        className="w-4 h-4"
                      />
                      <span className={isKids ? "text-slate-700" : "text-slate-200"}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-3 rounded-lg transition ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-purple-400 disabled:to-pink-400 text-white" : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white"}`}
            >
              {loading ? (isKids ? "Checking Answers... 🤔" : "Submitting...") : (isKids ? "Submit Quiz 🚀" : "Submit Quiz")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
