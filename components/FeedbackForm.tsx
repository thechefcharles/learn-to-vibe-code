"use client";

import { useState } from "react";
import { useVersion } from "@/lib/VersionContext";

interface FeedbackFormProps {
  onSuccess?: () => void;
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const { version } = useVersion();
  const isKids = version === "kids";

  const [clarity, setClarity] = useState<"very-clear" | "mostly-clear" | "somewhat-unclear" | "not-clear" | "">("");
  const [difficulty, setDifficulty] = useState<"too-easy" | "just-right" | "too-hard" | "">("");
  const [challenge, setChallenge] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [would_recommend, setWouldRecommend] = useState<"yes" | "maybe" | "no" | "">("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields are filled
    if (!clarity || !difficulty || !challenge.trim() || !suggestions.trim() || !would_recommend) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/course/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clarity,
          difficulty,
          challenge: challenge.trim(),
          suggestions: suggestions.trim(),
          would_recommend,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save feedback");
      }

      setSubmitted(true);
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save feedback");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`rounded-lg p-8 border-2 text-center max-w-2xl mx-auto ${isKids ? "bg-white border-green-400" : "bg-slate-800 border-green-500"}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${isKids ? "bg-green-100" : "bg-green-500/20"}`}>
          <span className={`text-2xl ${isKids ? "text-green-600" : "text-green-400"}`}>✅</span>
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isKids ? "text-green-700" : "text-white"}`}>
          {isKids ? "Thanks for Your Feedback! 🎉" : "Feedback Submitted!"}
        </h2>
        <p className={isKids ? "text-purple-700" : "text-slate-400"}>
          {isKids ? "Your thoughts help us make the course even better! Thank you! 💜" : "Thank you for your feedback. We use this information to continuously improve the course."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-lg p-8 border space-y-8 max-w-2xl mx-auto ${isKids ? "bg-white border-purple-300" : "bg-slate-800 border-slate-700"}`}>
      {error && (
        <div className={`rounded-lg p-4 ${isKids ? "bg-red-100 border border-red-300" : "bg-red-500/10 border border-red-500/20"}`}>
          <p className={`text-sm font-medium ${isKids ? "text-red-700" : "text-red-400"}`}>{error}</p>
        </div>
      )}

      {/* Clarity Rating */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
          📚 Was the content clear?
        </h3>
        <div className="space-y-3">
          {[
            { value: "very-clear", label: "✨ Very clear", description: "I understood everything" },
            { value: "mostly-clear", label: "👍 Mostly clear", description: "Some parts could be clearer" },
            { value: "somewhat-unclear", label: "🤔 Somewhat unclear", description: "I had trouble following parts" },
            { value: "not-clear", label: "❓ Not clear", description: "I struggled to understand" },
          ].map((option) => (
            <label key={option.value} className="flex items-start cursor-pointer">
              <input
                type="radio"
                name="clarity"
                value={option.value}
                checked={clarity === option.value}
                onChange={(e) => setClarity(e.target.value as any)}
                className="mt-1 mr-3"
              />
              <div>
                <p className={`font-medium ${isKids ? "text-purple-700" : "text-white"}`}>{option.label}</p>
                <p className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}>{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty Rating */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
          ⚙️ Was the difficulty level right?
        </h3>
        <div className="space-y-3">
          {[
            { value: "too-easy", label: "😴 Too easy", description: "I need more of a challenge" },
            { value: "just-right", label: "🎯 Just right", description: "It matched my skill level" },
            { value: "too-hard", label: "😰 Too hard", description: "I struggled to keep up" },
          ].map((option) => (
            <label key={option.value} className="flex items-start cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                value={option.value}
                checked={difficulty === option.value}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="mt-1 mr-3"
              />
              <div>
                <p className={`font-medium ${isKids ? "text-purple-700" : "text-white"}`}>{option.label}</p>
                <p className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}>{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Biggest Challenge */}
      <div>
        <label className={`block text-lg font-bold mb-3 ${isKids ? "text-purple-700" : "text-white"}`}>
          🚧 What was your biggest challenge?
        </label>
        <textarea
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder={isKids ? "e.g., 'Understanding database concepts' or 'The quiz questions were confusing'" : "e.g., 'Understanding RLS concepts' or 'Quiz questions were worded confusingly'"}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 resize-none ${isKids ? "bg-purple-50 border border-purple-300 text-slate-700 placeholder-slate-500 focus:border-purple-600 focus:ring-purple-500" : "bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"}`}
        />
        <p className={`text-xs mt-2 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "Be specific so we can help improve those parts" : "Your specific feedback helps us improve"}
        </p>
      </div>

      {/* Improvement Suggestions */}
      <div>
        <label className={`block text-lg font-bold mb-3 ${isKids ? "text-purple-700" : "text-white"}`}>
          ✨ What would help you learn better?
        </label>
        <textarea
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          placeholder={isKids ? "e.g., 'More examples' or 'Video walkthrough'" : "e.g., 'More worked examples' or 'Video walkthrough of the quiz'"}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 resize-none ${isKids ? "bg-purple-50 border border-purple-300 text-slate-700 placeholder-slate-500 focus:border-purple-600 focus:ring-purple-500" : "bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"}`}
        />
        <p className={`text-xs mt-2 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "Tell us what would make learning easier for you" : "Tell us what content or format would help"}
        </p>
      </div>

      {/* Recommendation */}
      <div>
        <h3 className={`text-lg font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
          🌟 Would you recommend this course?
        </h3>
        <div className="space-y-3">
          {[
            { value: "yes", label: "🚀 Yes!", description: "I'd definitely recommend it" },
            { value: "maybe", label: "🤷 Maybe", description: "Only if improvements are made" },
            { value: "no", label: "❌ No", description: "I wouldn't recommend it yet" },
          ].map((option) => (
            <label key={option.value} className="flex items-start cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value={option.value}
                checked={would_recommend === option.value}
                onChange={(e) => setWouldRecommend(e.target.value as any)}
                className="mt-1 mr-3"
              />
              <div>
                <p className={`font-medium ${isKids ? "text-purple-700" : "text-white"}`}>{option.label}</p>
                <p className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}>{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className={`rounded-lg p-4 ${isKids ? "bg-blue-100 border border-blue-300" : "bg-blue-500/10 border border-blue-500/20"}`}>
        <p className={`text-sm ${isKids ? "text-blue-700" : "text-blue-400"}`}>
          {isKids ? "💡 Your honest feedback helps us build an even better course for everyone!" : "💡 Your feedback is valuable and helps us continuously improve the course."}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-bold py-3 rounded-lg transition text-lg ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-purple-400 disabled:to-pink-400 text-white" : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white"}`}
      >
        {loading ? (isKids ? "Saving Your Feedback... 💜" : "Saving Feedback...") : (isKids ? "Share Your Feedback 🎉" : "Submit Feedback")}
      </button>
    </form>
  );
}
