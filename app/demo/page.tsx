import Link from "next/link";
import { getModuleMetadata } from "@/lib/module-metadata";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block">
            ← Back to Home
          </Link>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <p className="text-blue-400 text-sm">
              📖 Demo Mode — View course content without signing in
            </p>
          </div>

          <h1 className="text-5xl font-bold text-white mb-2">📚 Course Preview</h1>
          <p className="text-slate-400">Explore all 16 modules and sample quizzes</p>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4">
          {Array.from({ length: 16 }, (_, i) => {
            const meta = getModuleMetadata(i);
            return (
              <Link
                key={i}
                href={`/demo/module/${i}`}
                className="block bg-slate-800 hover:bg-slate-700 rounded-lg p-6 border border-slate-700 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Module {i}: {meta.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Click to view content and sample questions
                    </p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mt-12">
          <h2 className="text-xl font-bold text-white mb-3">About Demo Mode</h2>
          <p className="text-slate-400 mb-4">
            This demo view lets you explore course content without authentication. You can:
          </p>
          <ul className="text-slate-400 space-y-2 text-sm">
            <li>✓ Read all lesson content</li>
            <li>✓ View all quiz questions and answers</li>
            <li>✓ See the full course structure</li>
            <li>✗ Progress won't be saved (no login)</li>
            <li>✗ Can't submit quizzes or deliverables</li>
          </ul>
          <p className="text-slate-400 mt-4 text-sm">
            Sign up for full access once Supabase is back online.
          </p>
        </div>
      </div>
    </div>
  );
}
