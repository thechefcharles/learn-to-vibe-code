"use client";

import { useState } from "react";
import { submitCapstone } from "@/lib/actions/capstone";

export default function CapstoneSubmitForm() {
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
      <div className="bg-slate-800 rounded-lg p-8 border-2 border-green-500 text-center">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Capstone Submitted!</h2>
        <p className="text-slate-400">
          Your project has been submitted for review. Our instructor team will review it within 2-3 business days.
        </p>
        <button
          onClick={() => window.location.href = "/dashboard"}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700 space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-white mb-2">Project Writeup (Optional)</label>
        <textarea
          value={writeup}
          onChange={(e) => setWriteup(e.target.value)}
          placeholder="Describe your project, the problem it solves, and what AI features you implemented..."
          rows={5}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
        <p className="text-xs text-slate-400 mt-2">Be specific about your AI integration and technical decisions</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-white mb-2">GitHub Repository URL *</label>
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/project"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          required
        />
        <p className="text-xs text-slate-400 mt-2">Must be public and contain your full source code</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-white mb-2">Live Project URL *</label>
        <input
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://my-project.vercel.app"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          required
        />
        <p className="text-xs text-slate-400 mt-2">Must be publicly accessible and fully functional</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-blue-400 text-sm">
          💡 <strong>Tip:</strong> Make sure your project is deployed and working before submitting.
          Our reviewers will test your live application.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
      >
        {loading ? "Submitting..." : "Submit Capstone Project"}
      </button>
    </form>
  );
}
