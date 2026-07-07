import Link from "next/link";

export const metadata = {
  title: "About — Learn to Vibe Code",
  description: "Meet Charles Foreman, the creator of the Accredited Vibe Coding Course.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-slate-800/50 border-b border-slate-700 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition">
            Learn to Vibe Code
          </Link>
          <div className="space-x-6">
            <Link href="/course" className="text-slate-300 hover:text-white transition">
              Course
            </Link>
            <Link href="/support" className="text-slate-300 hover:text-white transition">
              Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">👋 About Charles</h1>
          <p className="text-xl text-slate-300">
            Technology entrepreneur, AI product builder, and self-taught developer
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8 text-slate-200 leading-relaxed">
          <p className="text-lg">
            Charles Foreman is a technology entrepreneur, AI product builder, and self-taught software developer with more than three years of intensive experience building AI-assisted software, rapid prototypes, and modern applications using "vibe coding" methodologies. His work centers on transforming complex ideas into real-world software by combining artificial intelligence, automation, and modern development tools.
          </p>

          <p>
            Over the past several years, Charles has spent thousands of hours designing, building, and refining software products across healthcare, education, enterprise, gaming, and productivity. Working alongside AI coding assistants, he has developed expertise in product architecture, user experience design, full-stack application development, database design, workflow automation, and prompt engineering.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">His Portfolio</h2>
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">🎮 WordBank</h3>
                <p className="text-sm text-slate-400">
                  An innovative strategy-based daily word game that blends classic word puzzles with an in-game economy, player statistics, and competitive progression.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">🏢 NXT STPS</h3>
                <p className="text-sm text-slate-400">
                  An enterprise software platform built for victim service organizations, designed to streamline case management, resource coordination, client tracking, reporting, and organizational workflows through modern technology and AI-powered tools.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">💚 Holding Hope</h3>
                <p className="text-sm text-slate-400">
                  A digital platform created to support women navigating infertility and fertility challenges by providing educational resources, personalized guidance, community support, and tools that help users throughout their fertility journey.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">🧠 Kuriosa</h3>
                <p className="text-sm text-slate-400">
                  An AI-powered learning platform focused on curiosity-driven education, helping people discover new topics, expand their knowledge, and learn through interactive experiences.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The Vibe Coding Philosophy</h2>
            <p>
              Charles is a strong advocate for the emerging discipline of vibe coding — the practice of pairing human creativity with artificial intelligence to dramatically accelerate software development. He believes AI is reshaping entrepreneurship by enabling individuals and small teams to build sophisticated products that were once only possible for large engineering organizations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What Drives Him</h2>
            <p>
              His interests extend beyond software development into artificial intelligence, entrepreneurship, civic technology, digital infrastructure, automation, and emerging technologies. He is particularly passionate about creating products that solve meaningful real-world problems while making advanced technology more accessible to organizations and individuals alike.
            </p>
            <p className="mt-4">
              Through his work, Charles continues to explore how AI can redefine the way software is conceived, built, and deployed, empowering a new generation of founders to turn ambitious ideas into reality.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <p className="text-center font-bold text-blue-300">
              This course is Charles's guide for anyone who wants to learn the same "vibe coding" methodology that powers his product work — hands-on, AI-assisted, and focused on shipping real projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
