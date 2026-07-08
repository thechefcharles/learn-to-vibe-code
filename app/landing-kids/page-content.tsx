'use client';

import { DashboardGrid, GridItem } from '@/components/kids-landing/dashboard/DashboardGrid';
import { ModuleArcWidget } from '@/components/kids-landing/dashboard/ModuleArcWidget';
import { LearningTiersWidget } from '@/components/kids-landing/dashboard/LearningTiersWidget';
import { CodeExecutorWidget } from '@/components/kids-landing/dashboard/CodeExecutorWidget';
import { AICopilotWidget } from '@/components/kids-landing/dashboard/AICopilotWidget';
import { ProgressFlowWidget } from '@/components/ProgressFlowWidget';
import { CredentialPreviewWidget } from '@/components/CredentialPreviewWidget';
import { FloatingCTA } from '@/components/kids-landing/FloatingCTA';
import { VideoBackground } from '@/components/kids-landing/VideoBackground';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function KidsLandingPageContent() {
  return (
    <div
      className="relative w-full min-h-screen text-white overflow-x-hidden"
      data-landing-container
      style={{
        backgroundColor: '#0f172a',
      }}
    >
      <VideoBackground />
      <FloatingCTA />

      {/* ============ HERO SECTION WITH DASHBOARD GRID ============ */}
      <section className="py-6 px-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Logo and Headline */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <Logo variant="cosmic-mark" size="lg" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Learn To Build Real Apps
              </span>
            </h1>

            {/* Stats Line */}
            <div className="text-sm sm:text-base md:text-lg text-gray-300 space-y-1">
              <div className="font-medium">
                16 Modules • 93 Hours • Free • Self-Paced • Accredited Certificate
              </div>
            </div>
          </div>

          {/* Dashboard Grid with Widgets */}
          <DashboardGrid>
            {/* Row 1: Module Arc (2x1) + Learning Tiers (2x1) */}
            <GridItem colSpan={2}>
              <ModuleArcWidget />
            </GridItem>
            <GridItem colSpan={2}>
              <LearningTiersWidget />
            </GridItem>

            {/* Row 2: Code Executor (1x1) + AI Copilot (1x1) */}
            <GridItem colSpan={1}>
              <CodeExecutorWidget />
            </GridItem>
            <GridItem colSpan={1}>
              <AICopilotWidget />
            </GridItem>

            {/* Row 3: Progress Flow (full-width) */}
            <GridItem colSpan={4}>
              <ProgressFlowWidget />
            </GridItem>

            {/* Row 4: Credential Preview (1x1) */}
            <GridItem colSpan={1}>
              <CredentialPreviewWidget />
            </GridItem>
          </DashboardGrid>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-800 py-4 px-4 mt-4">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-500">
          <p>© 2026 Vibe Coding. Learn to code with AI. Ship real apps.</p>
          <div className="flex gap-3 sm:gap-4 justify-center mt-2">
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
