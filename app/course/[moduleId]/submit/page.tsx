"use client";

import { useState, useEffect } from "react";
import { submitDeliverable, getDeliverable } from "@/lib/actions/deliverable";
import { getModuleMetadata } from "@/lib/module-metadata";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Deliverable {
  repo_url: string;
  live_url: string;
  status: string;
  auto_checks: Record<string, boolean>;
  submitted_at: string;
}

export default function SubmitPage() {
  const params = useParams();
  const moduleId = parseInt(params.moduleId as string);
  const meta = getModuleMetadata(moduleId);

  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null);
  const [autoChecks, setAutoChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load existing deliverable if any
    getDeliverable(moduleId).then((d) => {
      if (d) {
        setDeliverable(d);
        setRepoUrl(d.repo_url);
        setLiveUrl(d.live_url);
        setAutoChecks(d.auto_checks || {});
        setSubmitted(true);
      }
    });
  }, [moduleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await submitDeliverable(moduleId, {
        repoUrl,
        liveUrl,
      });
      setAutoChecks(result.autoChecks);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          href={`/course/${moduleId}`}
          className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block"
        >
          ← Back to Lesson
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">{meta.title}</h1>
        <p className="text-slate-400 mb-8">Submit your deliverable (repo + live URL)</p>

        {submitted && deliverable ? (
          /* Submission Confirmed */
          <div className="bg-slate-800 rounded-lg p-8 border-2 border-green-500 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✓</span>
              <h2 className="text-2xl font-bold text-white">Deliverable Submitted</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Repository</label>
                <p className="text-white font-mono text-sm break-all">
                  {deliverable.repo_url}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Live URL</label>
                <a
                  href={deliverable.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-mono text-sm break-all"
                >
                  {deliverable.live_url} →
                </a>
              </div>
            </div>

            {/* Auto-checks */}
            <div className="bg-slate-700 rounded-lg p-4 space-y-2">
              <p className="text-sm font-bold text-slate-300 mb-3">Auto-checks</p>
              <div className="flex items-center gap-2">
                <span className={autoChecks["live_url_reachable"] ? "text-green-400" : "text-red-400"}>
                  {autoChecks["live_url_reachable"] ? "✓" : "✗"}
                </span>
                <span className="text-slate-300">Live URL is reachable</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={autoChecks["github_repo_exists"] ? "text-green-400" : "text-red-400"}>
                  {autoChecks["github_repo_exists"] ? "✓" : "✗"}
                </span>
                <span className="text-slate-300">Repository on GitHub</span>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400 font-medium">
                ✓ Deliverable recorded. Go back to your checklist and mark this item complete to unlock the next module.
              </p>
            </div>

            <Link
              href={`/course/${moduleId}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition text-center"
            >
              Back to Lesson
            </Link>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-white mb-2">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
              <p className="text-xs text-slate-400 mt-2">
                Your GitHub repo with all code and commits
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://my-app.vercel.app"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
              <p className="text-xs text-slate-400 mt-2">
                Your deployed, working app (must be publicly accessible)
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                💡 <strong>Tip:</strong> Make sure your live URL is deployed and working before submitting. We'll verify both the repo and live URL are accessible.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? "Submitting..." : "Submit Deliverable"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
