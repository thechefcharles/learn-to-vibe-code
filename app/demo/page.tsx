import Link from "next/link";

export default function DemoPage() {
  const demoModules = [
    { id: 0, title: "Setup & Accounts", description: "Get your development environment ready" },
    { id: 1, title: "AI Fundamentals", description: "Understand how AI and LLMs work" },
  ];

  const fullCourseModules = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Demo Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="inline-block bg-amber-500 text-amber-950 font-bold px-3 py-1 rounded-full text-sm mb-3">
                🔓 DEMO MODE
              </span>
              <h1 className="text-3xl font-bold text-white">Try 2 Free Modules</h1>
              <p className="text-amber-200 mt-2">
                Get a taste of the course curriculum. Sign up to unlock all 16 modules and earn your certificate.
              </p>
            </div>
            <Link
              href="/auth/sign-up"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg whitespace-nowrap transition"
            >
              Sign Up Now →
            </Link>
          </div>
        </div>

        {/* Demo Modules */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Demo Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoModules.map((module) => (
              <Link
                key={module.id}
                href={`/demo/${module.id}`}
                className="group bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-slate-400 text-sm">Module {module.id}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                      {module.title}
                    </h3>
                  </div>
                  <span className="text-2xl">▶</span>
                </div>
                <p className="text-slate-400">{module.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* What You'll Unlock */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Unlock the Full Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">All 16 Modules</h3>
              <ul className="space-y-2 text-slate-300">
                {demoModules.map((m) => (
                  <li key={m.id} className="text-slate-400">
                    ✓ Module {m.id}: {m.title}
                  </li>
                ))}
                {fullCourseModules.map((title, idx) => (
                  <li key={idx} className="text-slate-300">
                    ✓ Module {idx + 2}: {title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="space-y-4">
                {[
                  { icon: "🎯", title: "Hands-On Quizzes", desc: "3 questions per module, instant feedback" },
                  { icon: "📦", title: "Deliverables", desc: "Real projects with auto-checking" },
                  { icon: "🎓", title: "Capstone Project", desc: "Build something real + defend it" },
                  { icon: "🏆", title: "Certification", desc: "Professional credential (9.3 CEUs)" },
                  { icon: "🎮", title: "Gamification", desc: "Earn XP, badges, and streaks" },
                  { icon: "📊", title: "Progress Tracking", desc: "Dashboard shows your journey" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p className="text-slate-400 mb-4">
              <span className="font-semibold text-white">93 hours</span> of content • <span className="font-semibold text-white">9.3 CEUs</span> accredited
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Start Your Free Journey →
            </Link>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Why Learn Here?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-semibold text-white mb-2">100% Free</h3>
              <p className="text-slate-400 text-sm">
                No paywalls. Course access is always free. Optional donations support development.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">📜</div>
              <h3 className="font-semibold text-white mb-2">Accredited Credential</h3>
              <p className="text-slate-400 text-sm">
                Earn a professional certificate worth 9.3 CEUs recognized by employers and accreditors.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-white mb-2">Job-Ready Skills</h3>
              <p className="text-slate-400 text-sm">
                Learn AI-assisted full-stack development with real tools: Cursor, Claude Code, Next.js, Supabase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
