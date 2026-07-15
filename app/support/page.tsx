'use client';

import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';
import { DonationButton } from '@/components/DonationButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Force dynamic rendering since we use useSearchParams
export const dynamic = 'force-dynamic';

function SupportPageContent() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get('success') === 'true';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: 'url(/support-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
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
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4">
              Support Our Mission
            </h1>
            <p className="text-xl text-cyan-400 font-semibold">
              Help make quality coding education accessible to everyone
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-400 font-semibold">
                Thank you for your donation! Your support means the world to us.
              </p>
            </div>
          )}

          {/* Content */}
          <div className="space-y-8 text-gray-200">
            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                Why We Need Your Support
              </h2>
              <p className="mb-4">
                The Accredited Vibe Coding Course is built to be freely accessible to learners everywhere. By keeping the platform free,
                we're removing barriers for students who want to learn but can't afford expensive bootcamps or courses.
              </p>
              <p>
                Your support helps us maintain the platform, improve the content, and keep the course free for everyone. Even a small
                contribution makes a real difference.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
                Ways to Support
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">☕ Buy Me a Coffee</h3>
                  <p className="text-sm mb-4">
                    Support through a one-time coffee donation - just $5 helps keep the servers running.
                  </p>
                  <DonationButton
                    type="coffee"
                    label="Buy Me a Coffee ($5)"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
                  />
                </div>

                <div className="bg-white/5 border border-purple-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-purple-400 mb-2">🍵 Buy Me Tea</h3>
                  <p className="text-sm mb-4">
                    Contribute $10 to help us improve course content and learner experience.
                  </p>
                  <DonationButton
                    type="tea"
                    label="Buy Me Tea ($10)"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
                  />
                </div>

                <div className="bg-white/5 border border-pink-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-pink-400 mb-2">🍔 Buy Me Lunch</h3>
                  <p className="text-sm mb-4">
                    A $25 donation supports platform development and new module creation.
                  </p>
                  <DonationButton
                    type="lunch"
                    label="Buy Me Lunch ($25)"
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-orange-700 transition-all"
                  />
                </div>

                <div className="bg-white/5 border border-orange-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">🍽️ Buy Me Dinner</h3>
                  <p className="text-sm mb-4">
                    A generous $50 donation helps us maintain accreditation and support learners.
                  </p>
                  <DonationButton
                    type="dinner"
                    label="Buy Me Dinner ($50)"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
                  />
                </div>

                <div className="bg-white/5 border border-indigo-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-indigo-400 mb-2">💝 Custom Donation</h3>
                  <p className="text-sm mb-4">
                    Choose any amount you'd like to contribute to support our mission.
                  </p>
                  <DonationButton
                    amount={25}
                    label="Make a Custom Donation"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                What Your Support Goes Toward
              </h2>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Platform Hosting:</strong> Keeping the course live and accessible 24/7
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Content Creation:</strong> Developing new modules and improving existing ones
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Student Support:</strong> Helping learners succeed with feedback and guidance
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Accreditation:</strong> Maintaining the course's professional accreditation status
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                Get Started Learning
              </h2>
              <p className="mb-6">
                The course is completely free. Start learning today without any pressure to donate.
              </p>
              <Link
                href="/auth/sign-up"
                className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all"
              >
                Enroll Now
              </Link>
            </section>

            <section className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Have questions about supporting the course? Reach out at{' '}
                <a href="mailto:support@learntovibe.code" className="text-cyan-400 hover:text-cyan-300 underline">
                  support@learntovibe.code
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SupportPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-white">Loading...</p></div>}>
      <SupportPageContent />
    </Suspense>
  );
}
