'use client';

import { CodeWandCursor } from '@/components/kids-landing/CodeWandCursor';
import { CursorTrackedModuleArc } from '@/components/kids-landing/CursorTrackedModuleArc';
import { ModuleGrid } from '@/components/kids-landing/ModuleGrid';
import { ScrollRevealSection } from '@/components/kids-landing/ScrollRevealSection';
import { InteractiveFeatureCard } from '@/components/kids-landing/InteractiveFeatureCard';
import { MiniGameCTA } from '@/components/kids-landing/MiniGameCTA';
import { SoundToggle } from '@/components/kids-landing/SoundToggle';
import { FloatingCTA } from '@/components/kids-landing/FloatingCTA';
import { KIDS_LANDING_CONTENT, MODULE_TIERS } from '@/lib/kids-landing/content';
import Link from 'next/link';
import { useEffect } from 'react';
import { playSound } from '@/lib/sounds';

export default function KidsLandingPageContent() {
  // Preload sounds on mount
  useEffect(() => {
    // Sounds preload handled by SoundToggle
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden text-white">
      <SoundToggle />
      <FloatingCTA />

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <CodeWandCursor bgImage={KIDS_LANDING_CONTENT.hero.backgroundImage} />

        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Real Apps.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              With AI. In Weeks.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            See what vibe coding looks like →
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              onClick={() => playSound('click')}
            >
              Enroll Free
            </Link>
          </div>
        </div>
      </section>

      {/* ============ MODULE ARC SECTION ============ */}
      <section className="py-20 px-4 relative">
        <ScrollRevealSection>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Your Learning Path
            </h2>
            <p className="text-center text-gray-300 mb-12">
              16 Modules • 93 Hours • Self-Paced • Accredited
            </p>
            <CursorTrackedModuleArc totalModules={16} />
            <p className="text-center text-sm text-gray-400 mt-8">
              Move your cursor across the arc to explore modules
            </p>
          </div>
        </ScrollRevealSection>
      </section>

      {/* ============ COURSE OVERVIEW SECTION ============ */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <ScrollRevealSection>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              What's Inside
            </h2>
            <p className="text-center text-gray-300 mb-16">
              A comprehensive curriculum from setup to production-ready code
            </p>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                <div className="text-5xl font-bold text-cyan-400">16</div>
                <div className="text-gray-300 mt-2">Modules</div>
                <div className="text-xs text-gray-500 mt-3">
                  Progressive skill building
                </div>
              </div>
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                <div className="text-5xl font-bold text-purple-400">93</div>
                <div className="text-gray-300 mt-2">Contact Hours</div>
                <div className="text-xs text-gray-500 mt-3">
                  Real depth, not a quick tutorial
                </div>
              </div>
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
                <div className="text-5xl font-bold text-pink-400">4</div>
                <div className="text-gray-300 mt-2">Learning Tiers</div>
                <div className="text-xs text-gray-500 mt-3">
                  Foundations → Production
                </div>
              </div>
            </div>

            {/* Learning Tiers */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">
                  🏗️ Tier 1: Foundations (Modules 0–3)
                </h3>
                <p className="text-gray-300">
                  HTML, CSS, JavaScript, and AI collaboration. Build your base.
                </p>
              </div>
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-3">
                  🚀 Tier 2: Building (Modules 4–9)
                </h3>
                <p className="text-gray-300">
                  React, databases, full-stack, APIs, deployment. Build real apps.
                </p>
              </div>
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-3">
                  ⚙️ Tier 3: Production (Modules 10–12)
                </h3>
                <p className="text-gray-300">
                  Security, testing, professional code. Ship with confidence.
                </p>
              </div>
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-3">
                  🌍 Tier 4: Landscape (Modules 13–15)
                </h3>
                <p className="text-gray-300">
                  Industry tools, frameworks, future trends. Stay ahead.
                </p>
              </div>
            </div>

            {/* Module Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-6">All 16 Modules</h3>
              <ModuleGrid />
            </div>
          </div>
        </ScrollRevealSection>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-20 px-4">
        <ScrollRevealSection>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Why This Course
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {KIDS_LANDING_CONTENT.features.map((feature) => (
                <InteractiveFeatureCard
                  key={feature.id}
                  feature={feature}
                />
              ))}
            </div>
          </div>
        </ScrollRevealSection>
      </section>

      {/* ============ GAME & CTA SECTION ============ */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <ScrollRevealSection>
          <div className="max-w-2xl mx-auto">
            <MiniGameCTA />
          </div>
        </ScrollRevealSection>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 Vibe Coding. Accredited learning for the future.</p>
          <div className="flex gap-6 justify-center mt-4">
            <Link href="/demo" className="hover:text-cyan-400 transition">
              Demo
            </Link>
            <Link href="/about" className="hover:text-cyan-400 transition">
              About
            </Link>
            <Link href="/support" className="hover:text-cyan-400 transition">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
