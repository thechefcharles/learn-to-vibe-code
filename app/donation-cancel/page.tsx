'use client';

import Link from 'next/link';
import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';

export default function DonationCancelPage() {
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
          {/* Cancel Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">👋</div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-wide mb-4">
              Donation Cancelled
            </h1>
            <p className="text-xl text-gray-300">
              No worries! Your donation wasn't processed, and you haven't been charged.
            </p>
          </div>

          {/* What Happened Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
              What Happened?
            </h2>
            <div className="bg-white/5 border border-yellow-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                You cancelled the donation at the payment checkout. This means:
              </p>
              <ul className="space-y-3 text-gray-300 ml-4">
                <li className="flex gap-3">
                  <span className="text-yellow-400">✓</span>
                  <span>No charge has been made to your payment method</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-400">✓</span>
                  <span>Your access to the free course is unaffected</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-400">✓</span>
                  <span>You can try donating again at any time</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-400">✓</span>
                  <span>The course remains completely free to use</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Want to Try Again Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
              Want to Try Again?
            </h2>
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
              <p className="text-gray-300 mb-4">
                If you'd like to support our mission to make coding education accessible to everyone, you can return to the donation page anytime.
              </p>
              <p className="text-gray-400 text-sm">
                You can choose from one-time donations, Buy Me a Coffee, or simply share the course with others—all support helps!
              </p>
            </div>
          </section>

          {/* Reassurance Section */}
          <section className="mb-12">
            <div className="bg-white/5 border border-white/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">🎓 The Course is Still Free</h3>
              <p className="text-gray-300">
                Donations are entirely optional. Whether you donate or not, you have full access to all 16 modules, quizzes, capstone project, and your path to certification. Keep learning!
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support"
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all text-center"
            >
              Try Donating Again
            </Link>
            <Link
              href="/course"
              className="px-8 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-lg transition-all text-center"
            >
              Continue Learning
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
