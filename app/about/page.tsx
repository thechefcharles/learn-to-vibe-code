import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About Charlie Foreman — Learn to Vibe Code',
  description: 'Learn about Charlie Foreman and the vision behind the Accredited Vibe Coding Course.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: 'url(/about-chicago-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/10" />
      <Header hideThemeToggle={true} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back Link */}
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-8 inline-block">
          ← Back to Home
        </Link>

        {/* Content Container */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4">
              Charlie Foreman
            </h1>
            <p className="text-xl text-cyan-400 font-semibold">
              Creator of the Accredited Vibe Coding Course
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-8 text-gray-200">
            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                The Vision
              </h2>
              <p className="mb-4">
                The Accredited Vibe Coding Course was born from a simple belief: learning to code should feel alive,
                immersive, and achievable for everyone. Not just another online tutorial, but a complete, accredited
                program that teaches you to build real things with AI-assisted development.
              </p>
              <p>
                This course exists because coding education has been stuck. Disconnected from how real developers work.
                Outdated. Gatekeeping advanced concepts. The Vibe Coding approach changes that by making the course itself
                a product—built with the stack you'll learn, deployed on the infrastructure you'll use, and graded to
                professional standards that employers actually respect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                What Makes This Different
              </h2>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">AI-First from Day One:</strong> Learn alongside Claude, Cursor, and other AI tools.
                    This is how real development works now.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Accredited & Credible:</strong> Earn a verifiable completion certificate backed by
                    9.3 CEUs. This isn't a certificate of participation—it's proof of learning.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Two Paths, Same Foundation:</strong> Beginner and Advanced tracks let you choose
                    your pace without compromising depth.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Real Deliverables:</strong> Every module has a real-world project you submit and defend.
                    No busy work. No filler.
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
                About Charlie
              </h2>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3 flex-shrink-0">
                  <img
                    src="/charlie-photo.jpg"
                    alt="Charlie Foreman"
                    className="w-full rounded-xl border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="mb-4">
                    Charlie Foreman is a full-stack developer, educator, and builder passionate about making technology accessible
                    and practical. With years of experience shipping products on the web, Charlie built this course to fill a gap:
                    there's no bridge between "I'm a beginner" and "I can ship production-grade code."
                  </p>
                  <p className="mb-4">
                    The platform itself is the proof of concept. Built with Next.js, TypeScript, Tailwind, Supabase, and Vercel—
                    the exact stack you'll learn in the course. It's designed to be accessible, performant, and beautiful. Because
                    if we're teaching you to build great things, the course should exemplify that standard.
                  </p>
                  <p>
                    This course is Charlie's attempt to democratize access to quality coding education. Not gatekeeping. Not
                    fake-difficulty. Not outdated. Just solid, modern, practical development training.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                Get Started
              </h2>
              <p className="mb-6">
                Ready to learn? Choose your path and start building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/sign-up"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/course-info"
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-lg transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
