"use client";

import { useState, useEffect } from "react";
import { submitQuiz, getQuizAttempts } from "@/lib/actions/quiz";
import { getModuleQuiz, getModuleMetadata } from "@/lib/quizzes";
import Link from "next/link";
import { useParams } from "next/navigation";

interface QuizResult {
  score: number;
  percentage: number;
  passed: boolean;
}

export default function QuizPage() {
  const params = useParams();
  const moduleId = parseInt(params.moduleId as string);

  const [quiz, setQuiz] = useState<any>(null);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    const q = getModuleQuiz(moduleId);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center text-slate-400">
          Loading quiz...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Link
          href={`/course/${moduleId}`}
          className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block"
        >
          ← Back to Lesson
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">{meta.title}</h1>
        <p className="text-slate-400 mb-8">
          Quiz: Answer all questions. 80% to pass.
        </p>

        {submitted && result ? (
          /* Results Screen */
          <div className="bg-slate-800 rounded-lg p-8 border-2 border-slate-700">
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
              <p className="text-slate-300 mt-2">
                You scored {result.score} out of {quiz.questions.length}
              </p>
            </div>

            {result.passed && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <p className="text-green-400 font-medium">
                  ✓ You've unlocked the next module! Check your checklist to
                  mark the quiz as complete.
                </p>
              </div>
            )}

            {!result.passed && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                <p className="text-yellow-400 font-medium">
                  You need 80% to pass. You can retake the quiz with a fresh
                  question pool.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleRetake}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Retake Quiz
              </button>
              <Link
                href={`/course/${moduleId}`}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-lg transition text-center"
              >
                Back to Lesson
              </Link>
            </div>

            {/* Attempt History */}
            {attempts.length > 1 && (
              <div className="mt-8 pt-8 border-t border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  Attempt History
                </h3>
                <div className="space-y-2 text-sm">
                  {attempts.map((a: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>Attempt {a.attempt_no}</span>
                      <span
                        className={
                          a.passed ? "text-green-400" : "text-red-400"
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
                className="bg-slate-800 rounded-lg p-6 border border-slate-700"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Question {idx + 1}
                </h3>
                <p className="text-slate-200 mb-4">{q.text}</p>

                <div className="space-y-2">
                  {q.options.map((option: string, optIdx: number) => (
                    <label
                      key={optIdx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer transition"
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
                      <span className="text-slate-200">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? "Submitting..." : "Submit Quiz"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
