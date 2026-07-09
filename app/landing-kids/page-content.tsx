'use client';

import { useState } from 'react';
import { DashboardGrid, GridItem } from '@/components/kids-landing/dashboard/DashboardGrid';
import { ModuleArcWidget } from '@/components/kids-landing/dashboard/ModuleArcWidget';
import { LearningTiersWidget } from '@/components/kids-landing/dashboard/LearningTiersWidget';
import { CodeExecutorWidget } from '@/components/kids-landing/dashboard/CodeExecutorWidget';
import { ProgressFlowWidget } from '@/components/ProgressFlowWidget';
import { CredentialPreviewWidget } from '@/components/CredentialPreviewWidget';
import { FloatingCTA } from '@/components/kids-landing/FloatingCTA';
import { VideoBackground } from '@/components/kids-landing/VideoBackground';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function KidsLandingPageContent() {
  const [userName, setUserName] = useState('');

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

      {/* ============ HERO SECTION WITH NAME INPUT ============ */}
      <section className="py-4 px-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: Welcome Input */}
            <div className="md:col-span-1">
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <p className="text-sm text-gray-400 mb-3 uppercase tracking-wide">Your Name</p>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white text-lg placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                />
                <p className="text-xl font-bold mt-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {userName ? `Welcome, ${userName}` : 'Welcome'}
                </p>
                <p className="text-sm text-gray-400 mt-2">to learn to vibe code</p>
              </div>
            </div>

            {/* Center: Headline */}
            <div className="md:col-span-1 text-center">
              <div className="mb-2 flex justify-center scale-75">
                <Logo variant="cosmic-mark" size="lg" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Learn To Vibe Code
                </span>
              </h1>
              <div className="text-xs sm:text-sm text-gray-300 mt-3">
                <div className="font-medium">
                  16 Modules • 93 Hours • Free • Self-Paced • Accredited
                </div>
              </div>
            </div>

            {/* Right: Stats/Info (empty for balance) */}
            <div className="md:col-span-1"></div>
          </div>
        </div>
      </section>

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <DashboardGrid>
            {/* Row 1: Module Arc (skinny 1) + Learning Tiers (2) + space (1) */}
            <GridItem colSpan={1}>
              <ModuleArcWidget />
            </GridItem>
            <GridItem colSpan={2}>
              <LearningTiersWidget />
            </GridItem>
            <GridItem colSpan={1}>
              <div></div>
            </GridItem>

            {/* Row 2: Code Executor (1) + Progress Flow (3) */}
            <GridItem colSpan={1}>
              <CodeExecutorWidget />
            </GridItem>
            <GridItem colSpan={3}>
              <ProgressFlowWidget />
            </GridItem>

            {/* Row 3: Certificate (1) + space (3) */}
            <GridItem colSpan={1}>
              <CredentialPreviewWidget />
            </GridItem>
            <GridItem colSpan={3}>
              <div></div>
            </GridItem>
          </DashboardGrid>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-800 py-2 px-4 mt-2">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-500">
          <p>© 2026 Vibe Coding. Learn to code with AI. Ship real apps.</p>
          <div className="flex gap-4 justify-center mt-1">
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
