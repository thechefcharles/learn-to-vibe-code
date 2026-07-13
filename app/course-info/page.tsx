import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Course Overview — Learn to Vibe Code',
  description: 'Discover what you\'ll learn in the Accredited Vibe Coding Course. Choose between beginner and advanced tracks.',
};

export default function CourseInfoPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: 'url(/course-info-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/20" />
      <Header hideThemeToggle={true} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back Link */}
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-8 inline-block">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4">
            The Accredited Vibe Coding Course
          </h1>
          <p className="text-xl text-gray-300">
            A comprehensive, AI-first development program. 16 modules. 93 hours of content. Choose your level.
          </p>
        </div>

        {/* What You'll Learn */}
        <section className="mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
              What You'll Master
            </h2>
            <div className="space-y-4 text-gray-200">
              <div className="flex gap-3">
                <span className="text-cyan-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Full-Stack Development:</strong> Build real applications with Next.js, TypeScript, Tailwind CSS, and modern JavaScript.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400 text-xl">→</span>
                <div>
                  <strong className="text-white">AI-Assisted Coding:</strong> Learn to leverage Claude and other AI tools to accelerate your development workflow.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Database & Authentication:</strong> Master Supabase for backend infrastructure, user authentication, and Row-Level Security.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Production-Ready Code:</strong> Understand testing, deployment, performance optimization, and accessibility standards.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Capstone Project:</strong> Build a complete portfolio project and defend it to demonstrate mastery.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Levels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Beginner */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">🚀 Beginner Track</h3>
              <p className="text-gray-300 mb-6">
                Perfect if you're new to coding or prefer a friendlier, more visual learning experience.
              </p>
              <ul className="space-y-3 text-gray-200 mb-6">
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Beginner-friendly explanations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Step-by-step walkthroughs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Visual learning aids</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Shorter modules</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Fun gamification features</span>
                </li>
              </ul>
              <p className="text-sm text-gray-400">
                <strong>Best for:</strong> Students, career switchers, or anyone starting their coding journey.
              </p>
            </div>

            {/* Advanced */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">💻 Advanced Track</h3>
              <p className="text-gray-300 mb-6">
                For developers with some experience who want to go deeper into production-grade patterns.
              </p>
              <ul className="space-y-3 text-gray-200 mb-6">
                <li className="flex gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Advanced technical depth</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Real-world scenarios</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Performance & optimization</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Architecture patterns</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Professional-grade examples</span>
                </li>
              </ul>
              <p className="text-sm text-gray-400">
                <strong>Best for:</strong> Working developers, technical leads, or experienced learners.
              </p>
            </div>
          </div>
        </section>

        {/* Course Structure */}
        <section className="mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
              Course Structure
            </h2>
            <div className="space-y-4 text-gray-200">
              <div>
                <p className="text-sm font-semibold text-cyan-400 mb-2">📚 16 MODULES</p>
                <p>
                  From setup and fundamentals through production-ready deployment and the modern tooling landscape.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-cyan-400 mb-2">⏱️ 93 HOURS</p>
                <p>
                  Comprehensive content at your own pace. Earn 9.3 CEUs upon completion.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-cyan-400 mb-2">✅ QUIZZES & DELIVERABLES</p>
                <p>
                  Test your knowledge with 3 questions per module. Submit real-world projects to unlock progression.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-cyan-400 mb-2">🏆 CAPSTONE PROJECT</p>
                <p>
                  Build something meaningful. Present it. Earn your accredited certificate upon passing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>
            <p className="text-gray-300 mb-6">
              Create your account and choose your path to becoming a vibe-coding expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/course"
                className="px-8 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-lg transition-all"
              >
                Explore Modules
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
