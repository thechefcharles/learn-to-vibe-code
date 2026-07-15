'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: 'url(/settings-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/20" />
      <Header hideThemeToggle={true} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back Link */}
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-8 inline-block">
          ← Back to Home
        </Link>

        {/* Content Container */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-wide mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-300">
              Your generous donation means the world to us and helps keep Learn to Vibe Code free and accessible to everyone.
            </p>
          </div>

          {/* What's Next Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
              What's Next?
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">📧 Check Your Email</h3>
                <p className="text-gray-300">
                  We've sent you a receipt and thank-you message to your email. Keep it for your records!
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">📚 Continue Learning</h3>
                <p className="text-gray-300">
                  The course is completely free! Your donation doesn't affect your access—start or continue learning whenever you're ready.
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">🌟 Share the Course</h3>
                <p className="text-gray-300">
                  Help us reach more learners! Share Learn to Vibe Code with friends, colleagues, or anyone interested in coding education.
                </p>
              </div>
            </div>
          </section>

          {/* Your Support Impact Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
              Your Support Impact
            </h2>
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-8">
              <div className="space-y-4 text-gray-200">
                <div className="flex gap-3">
                  <span className="text-emerald-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Keep the Course Free:</strong> Your donation helps us maintain the platform at no cost to learners.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Improve Content:</strong> We invest in creating better explanations, more examples, and updated modules.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Cover Infrastructure:</strong> Hosting, databases, and server costs are covered by generously supporters like you.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Support Learners:</strong> We provide feedback on projects and help learners succeed in their journey.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Session ID (optional transparency) */}
          {sessionId && (
            <section className="mb-12">
              <p className="text-xs text-gray-500 text-center">
                Transaction ID: <code className="text-gray-400">{sessionId}</code>
              </p>
            </section>
          )}

          {/* Action Buttons */}
          <section className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/course"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all text-center"
            >
              Continue Learning
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-lg transition-all text-center"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationSuccessContent />
    </Suspense>
  );
}
