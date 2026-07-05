import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header */}
      <header className="bg-paper border-b border-violet-light/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition">
            <Logo variant="primary" size="sm" />
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/demo" className="text-ink hover:text-violet transition text-sm font-medium">
              Demo
            </Link>
            <Link href="/auth/sign-in" className="bg-violet hover:bg-violet-light text-paper px-4 py-2 rounded-lg text-sm font-medium transition">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto px-4 py-12 w-full">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <Logo variant="tagline" size="lg" className="mx-auto" />
            </div>
            <p className="text-xl text-slate mb-8">
              16 modules • 93 hours • 9.3 CEUs • 100% free
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/auth/sign-up"
                className="bg-violet hover:bg-violet-light text-paper font-bold py-3 px-8 rounded-lg transition"
              >
                Create Account
              </Link>
              <Link
                href="/demo"
                className="bg-paper border-2 border-violet text-violet hover:bg-violet/5 font-bold py-3 px-8 rounded-lg transition"
              >
                📖 Preview (2 Free Modules)
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-violet-light/20 hover:border-violet/40 transition">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold font-display text-ink mb-2">16 Modules</h3>
            <p className="text-slate text-sm">
              From AI fundamentals to production-ready deployments
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-violet-light/20 hover:border-violet/40 transition">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold font-display text-ink mb-2">Hands-On</h3>
            <p className="text-slate text-sm">
              Quizzes, deliverables, and a capstone project
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-violet-light/20 hover:border-violet/40 transition">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-xl font-bold font-display text-ink mb-2">Gamified</h3>
            <p className="text-slate text-sm">
              Earn badges, track streaks, build your portfolio
            </p>
          </div>
        </div>

        {/* Course Preview */}
        <div className="bg-white rounded-lg p-8 border border-violet-light/20 mb-12">
          <h2 className="text-3xl font-bold font-display text-ink mb-6">Course Curriculum</h2>
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
                <span className="text-violet font-bold">Module {i}</span>
                <span className="text-ink">{module}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-violet to-violet-light rounded-lg p-12 text-center mb-12">
          <h2 className="text-3xl font-bold font-display text-paper mb-4">Ready to Learn?</h2>
          <p className="text-paper/90 mb-8 text-lg">
            Create an account to start building with AI today
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-paper text-violet font-bold py-3 px-8 rounded-lg hover:bg-lime hover:text-ink transition font-display"
          >
            Get Started →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
