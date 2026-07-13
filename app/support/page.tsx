import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Support Learn to Vibe Code',
  description: 'Help support the Accredited Vibe Coding Course and make quality education accessible to everyone.',
};

export default function SupportPage() {
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
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">💳 One-Time Donation</h3>
                  <p className="text-sm mb-4">
                    Make a one-time contribution to support the platform and help us keep the course free.
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all">
                    Donate via PayPal
                  </button>
                </div>

                <div className="bg-white/5 border border-purple-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-purple-400 mb-2">☕ Buy Me a Coffee</h3>
                  <p className="text-sm mb-4">
                    Support through Buy Me a Coffee - even $5 helps keep the servers running.
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all">
                    Buy Me a Coffee
                  </button>
                </div>

                <div className="bg-white/5 border border-pink-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-pink-400 mb-2">🌟 Share the Course</h3>
                  <p className="text-sm mb-4">
                    The best support is spreading the word. Share Learn to Vibe Code with friends, colleagues, and students.
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-orange-700 transition-all">
                    Share on Social Media
                  </button>
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
