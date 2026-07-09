'use client';

import { useState } from 'react';
import { DashboardGrid, GridItem } from '@/components/kids-landing/dashboard/DashboardGrid';
import { ModuleArcWidget } from '@/components/kids-landing/dashboard/ModuleArcWidget';
import { LearningTiersWidget } from '@/components/kids-landing/dashboard/LearningTiersWidget';
import { TimeWidget } from '@/components/kids-landing/dashboard/TimeWidget';
import { FreeWidget } from '@/components/kids-landing/dashboard/FreeWidget';
import { InviteWidget } from '@/components/kids-landing/dashboard/InviteWidget';
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

      {/* ============ FLOATING LOGO (TOP-LEFT) ============ */}
      <div className="fixed top-6 left-6 z-40">
        <img
          src="/learn_to_vibe_code_logo_cosmic_wordmark_transparent.svg"
          alt="Learn To Vibe Code"
          className="h-16 sm:h-20 w-auto"
        />
      </div>

      {/* ============ DIAGONAL WELCOME BACKGROUND ============ */}
      <div className="absolute top-0 left-0 w-full h-96 pointer-events-none">
        <h1
          className="text-7xl sm:text-8xl lg:text-9xl font-bold leading-tight opacity-10"
          style={{
            transform: 'rotate(-12deg) translateX(-10%)',
            background: 'linear-gradient(to right, rgb(6, 182, 212), rgb(168, 85, 247), rgb(236, 72, 153))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'absolute',
            top: '-100px',
            left: '-200px',
            whiteSpace: 'nowrap',
          }}
        >
          Welcome, "{userName || 'Your Name'}"
        </h1>
      </div>

      {/* ============ HERO SECTION WITH NAME INPUT ============ */}
      <section className="py-8 px-4 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Input Box - centered at top */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/10 transition-all max-w-sm">
              <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Input:</p>
              <div className="font-mono text-sm text-cyan-300 break-words">
                greet("<span className="inline-block"><input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="your name"
                  className="bg-transparent border-0 p-0 w-24 text-cyan-300 font-mono text-sm focus:outline-none focus:ring-0 placeholder-gray-600"
                /></span>")
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
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

            {/* Row 2: The Value - Free + Journey + Invite + Certificate */}
            <GridItem colSpan={1}>
              <FreeWidget />
            </GridItem>
            <GridItem colSpan={1}>
              <ProgressFlowWidget />
            </GridItem>
            <GridItem colSpan={1}>
              <InviteWidget />
            </GridItem>
            <GridItem colSpan={1}>
              <CredentialPreviewWidget />
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
