'use client';

import { useState } from 'react';
import { DashboardGrid, GridItem } from '@/components/kids-landing/dashboard/DashboardGrid';
import { ModuleArcWidget } from '@/components/kids-landing/dashboard/ModuleArcWidget';
import { LearningTiersWidget } from '@/components/kids-landing/dashboard/LearningTiersWidget';
import { TimeWidget } from '@/components/kids-landing/dashboard/TimeWidget';
import { FreeWidget } from '@/components/kids-landing/dashboard/FreeWidget';
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start">
            {/* Left: Input Box with greet() function */}
            <div className="md:col-span-1">
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/10 transition-all">
                <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Input:</p>
                <div className="font-mono text-sm text-cyan-300 break-words">
                  greet("<span className="inline-block"><input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="your name"
                    className="bg-transparent border-0 p-0 w-20 text-cyan-300 font-mono text-sm focus:outline-none focus:ring-0 placeholder-gray-600"
                  /></span>")
                </div>
              </div>
            </div>

            {/* Center-Right: Greeting + Logo */}
            <div className="md:col-span-3">
              {/* Welcome greeting - ALWAYS visible */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">Welcome, </span>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  "{userName || 'Your Name'}"
                </span>
              </h1>

              {/* Cosmic Wordmark Logo */}
              <img
                src="/learn_to_vibe_code_logo_cosmic_wordmark_transparent.svg"
                alt="Learn To Vibe Code"
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <DashboardGrid>
            {/* Row 1: The Story - Path + Structure + Time */}
            <GridItem colSpan={1}>
              <ModuleArcWidget />
            </GridItem>
            <GridItem colSpan={2}>
              <LearningTiersWidget />
            </GridItem>
            <GridItem colSpan={1}>
              <TimeWidget />
            </GridItem>

            {/* Row 2: The Value - Free + Your Journey */}
            <GridItem colSpan={1}>
              <FreeWidget />
            </GridItem>
            <GridItem colSpan={3}>
              <ProgressFlowWidget />
            </GridItem>

            {/* Row 3: The Reward - Certificate */}
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
