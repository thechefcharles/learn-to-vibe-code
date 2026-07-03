import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Maintenance Banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-12">
          <p className="text-yellow-400 text-center font-medium">
            ⚠️ New account creation temporarily unavailable due to infrastructure maintenance
          </p>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Learn to Vibe Code</h1>
          <p className="text-2xl text-slate-400 mb-8">
            Master AI-powered application development from setup to production
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/auth/sign-in"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">16 Modules</h3>
            <p className="text-slate-400 text-sm">
              From AI fundamentals to production-ready deployments
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Hands-On</h3>
            <p className="text-slate-400 text-sm">
              Quizzes, deliverables, and a capstone project
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Gamified</h3>
            <p className="text-slate-400 text-sm">
              Earn badges, track streaks, build your portfolio
            </p>
          </div>
        </div>

        {/* Course Preview */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Course Curriculum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Setup & Accounts",
              "AI Fundamentals",
              "Prompt Engineering",
              "Planning with AI",
              "Building in Cursor",
              "Building in Claude Code",
              "Design & UX",
              "Supabase: Data & Auth",
              "Reading & Debugging",
              "Git & GitHub",
              "Deploying with Vercel",
              "Agent Workflows",
              "Production-Ready",
              "Automating Pipelines",
              "Brownfield",
              "Tooling Landscape",
            ].map((module, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Module {i}</span>
                <span className="text-slate-300">{module}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Learn?</h2>
          <p className="text-blue-100 mb-6">
            Create an account to start building with AI today
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
}
