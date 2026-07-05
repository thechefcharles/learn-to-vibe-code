import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Back Link */}
          <Link
            href="/"
            className="text-violet hover:text-violet-light text-sm font-medium mb-8 inline-block"
          >
            ← Back to Home
          </Link>

          {/* Author Bio */}
          <article className="prose prose-sm max-w-none">
            <h1 className="text-4xl font-bold font-display text-ink mb-8">
              About the Author
            </h1>

            <div className="space-y-6 text-slate leading-relaxed">
              <p className="text-lg">
                Charles Foreman is a technology entrepreneur, AI product builder,
                and self-taught software developer with more than three years of
                intensive experience building AI-assisted software, rapid
                prototypes, and modern applications using "vibe coding"
                methodologies. His work centers on transforming complex ideas into
                real-world software by combining artificial intelligence,
                automation, and modern development tools.
              </p>

              <p>
                Over the past several years, Charles has spent thousands of hours
                designing, building, and refining software products across
                healthcare, education, enterprise, gaming, and productivity.
                Working alongside AI coding assistants, he has developed expertise
                in product architecture, user experience design, full-stack
                application development, database design, workflow automation, and
                prompt engineering.
              </p>

              <h2 className="text-2xl font-bold font-display text-ink mt-8 mb-4">
                Portfolio Highlights
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-ink">WordBank</h3>
                  <p className="text-sm">
                    An innovative strategy-based daily word game that blends
                    classic word puzzles with an in-game economy, player
                    statistics, and competitive progression.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-ink">NXT STPS</h3>
                  <p className="text-sm">
                    An enterprise software platform built for victim service
                    organizations, designed to streamline case management,
                    resource coordination, client tracking, reporting, and
                    organizational workflows through modern technology and
                    AI-powered tools.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-ink">Holding Hope</h3>
                  <p className="text-sm">
                    A digital platform created to support women navigating
                    infertility and fertility challenges by providing
                    educational resources, personalized guidance, community
                    support, and tools that help users throughout their
                    fertility journey.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-ink">Kuriosa</h3>
                  <p className="text-sm">
                    An AI-powered learning platform focused on curiosity-driven
                    education, helping people discover new topics, expand their
                    knowledge, and learn through interactive experiences.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-display text-ink mt-8 mb-4">
                Philosophy
              </h2>

              <p>
                Charles is a strong advocate for the emerging discipline of vibe
                coding — the practice of pairing human creativity with artificial
                intelligence to dramatically accelerate software development. He
                believes AI is reshaping entrepreneurship by enabling individuals
                and small teams to build sophisticated products that were once only
                possible for large engineering organizations.
              </p>

              <p>
                His interests extend beyond software development into artificial
                intelligence, entrepreneurship, civic technology, digital
                infrastructure, automation, and emerging technologies. He is
                particularly passionate about creating products that solve
                meaningful real-world problems while making advanced technology
                more accessible to organizations and individuals alike.
              </p>

              <p>
                Through his work, Charles continues to explore how AI can redefine
                the way software is conceived, built, and deployed, empowering a
                new generation of founders to turn ambitious ideas into reality.
              </p>

              {/* CTA Section */}
              <div className="mt-12 pt-8 border-t border-violet-light/20">
                <div className="bg-indigo/5 border border-violet-light/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold font-display text-ink mb-2">
                    Learn Vibe Coding
                  </h3>
                  <p className="text-sm text-slate mb-4">
                    Ready to build with AI? This course teaches you everything
                    Charles has learned building production software with AI
                    assistants.
                  </p>
                  <Link
                    href="/auth/sign-up"
                    className="inline-block bg-violet hover:bg-violet-light text-paper font-bold py-2 px-6 rounded-lg transition"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
}
