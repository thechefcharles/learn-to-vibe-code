"use client";

import { useState } from "react";
import { submitCapstone } from "@/lib/actions/capstone";
import { useVersion } from "@/lib/VersionContext";

export default function CapstoneSubmitForm() {
  const { version } = useVersion();
  const isKids = version === "kids";
  const [writeup, setWriteup] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await submitCapstone({
        repo_url: repoUrl,
        live_url: liveUrl,
        writeup: writeup || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`rounded-lg p-8 border-2 text-center ${isKids ? "bg-white border-green-400" : "bg-slate-800 border-green-500"}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${isKids ? "bg-green-100" : "bg-green-500/20"}`}>
          <span className={`text-2xl ${isKids ? "text-green-600" : "text-green-400"}`}>✅</span>
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isKids ? "text-green-700" : "text-white"}`}>
          {isKids ? "Project Submitted! 🚀" : "Capstone Submitted!"}
        </h2>
        <p className={isKids ? "text-purple-700" : "text-slate-400"}>
          {isKids ? "Great work! Our team will review your amazing project soon. You'll get feedback within 2-3 days. 🎉" : "Your project has been submitted for review. Our instructor team will review it within 2-3 business days."}
        </p>
        <button
          onClick={() => window.location.href = "/dashboard"}
          className={`mt-6 font-medium py-2 px-6 rounded-lg transition ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          {isKids ? "Back to Dashboard 📊" : "Back to Dashboard"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-lg p-8 border space-y-6 ${isKids ? "bg-white border-purple-300" : "bg-slate-800 border-slate-700"}`}>
      {error && (
        <div className={`rounded-lg p-4 ${isKids ? "bg-red-100 border border-red-300" : "bg-red-500/10 border border-red-500/20"}`}>
          <p className={`text-sm ${isKids ? "text-red-700" : "text-red-400"}`}>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="project-writeup" className={`block text-sm font-bold mb-2 ${isKids ? "text-purple-700" : "text-white"}`}>Project Writeup (Optional)</label>
        <textarea
          id="project-writeup"
          value={writeup}
          onChange={(e) => setWriteup(e.target.value)}
          placeholder={isKids ? "What does your app do? What was the coolest part to build?" : "Describe your project, the problem it solves, and what AI features you implemented..."}
          rows={5}
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 ${isKids ? "bg-purple-50 border border-purple-300 text-slate-700 placeholder-slate-500 focus:border-purple-600 focus:ring-purple-500" : "bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"}`}
        />
        <p className={`text-xs mt-2 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "Tell us what makes your project special!" : "Be specific about your AI integration and technical decisions"}
        </p>
      </div>

      <div>
        <label htmlFor="repo-url" className={`block text-sm font-bold mb-2 ${isKids ? "text-purple-700" : "text-white"}`}>GitHub Repository URL *</label>
        <input
          id="repo-url"
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/project"
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 ${isKids ? "bg-purple-50 border border-purple-300 text-slate-700 placeholder-slate-500 focus:border-purple-600 focus:ring-purple-500" : "bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"}`}
          required
        />
        <p className={`text-xs mt-2 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "Link to your GitHub repo (must be public)" : "Must be public and contain your full source code"}
        </p>
      </div>

      <div>
        <label htmlFor="live-url" className={`block text-sm font-bold mb-2 ${isKids ? "text-purple-700" : "text-white"}`}>Live Project URL *</label>
        <input
          id="live-url"
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://my-project.vercel.app"
          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 ${isKids ? "bg-purple-50 border border-purple-300 text-slate-700 placeholder-slate-500 focus:border-purple-600 focus:ring-purple-500" : "bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"}`}
          required
        />
        <p className={`text-xs mt-2 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
          {isKids ? "Link where people can see your app live" : "Must be publicly accessible and fully functional"}
        </p>
      </div>

      <div className={`rounded-lg p-4 ${isKids ? "bg-blue-100 border border-blue-300" : "bg-blue-500/10 border border-blue-500/20"}`}>
        <p className={`text-sm ${isKids ? "text-blue-700" : "text-blue-400"}`}>
          {isKids ? "🚀 Make sure your app is deployed and working! Our reviewers will try it out." : "💡 Make sure your project is deployed and working before submitting. Our reviewers will test your live application."}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-bold py-3 rounded-lg transition ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-purple-400 disabled:to-pink-400 text-white" : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white"}`}
      >
        {loading ? (isKids ? "Submitting Your Project... 🚀" : "Submitting...") : (isKids ? "Submit Your Project 🎉" : "Submit Capstone Project")}
      </button>
    </form>
  );
}
