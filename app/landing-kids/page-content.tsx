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
import { MouseTrail } from '@/components/kids-landing/MouseTrail';
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
      <MouseTrail />
      <FloatingCTA />

      {/* ============ FLOATING LOGO (BOTTOM-LEFT) ============ */}
      <div className="fixed bottom-32 left-4 z-30 opacity-60 pointer-events-none">
        <img
          src="/learn_to_vibe_code_logo_cosmic_wordmark_transparent.png"
          alt="Learn To Vibe Code"
          className="h-20 sm:h-24 lg:h-28 w-auto"
        />
      </div>

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-2 sm:py-4 px-3 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Gleaming Headline */}
          <div className="text-center mb-3 sm:mb-4">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gleam 3s ease-in-out infinite',
              }}
            >
              Learn Vibe Coding In Weeks!
            </h2>
          </div>
          <style>{`
            @keyframes gleam {
              0%, 100% { filter: brightness(1); }
              50% { filter: brightness(1.4); }
            }
          `}</style>

          <DashboardGrid>
            {/* Row 1: The Story - Path + Structure + Time */}
            <GridItem colSpan={1}>
              <ModuleArcWidget userName={userName} onUserNameChange={setUserName} />
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
      <footer className="border-t border-slate-800 py-1 px-2 mt-1">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-500">
          <p>© 2026 Vibe Coding. Learn to code with AI. Ship real apps.</p>
          <div className="flex gap-8 justify-center mt-2">
            <Link href="/about" className="text-lg font-semibold hover:text-cyan-400 transition">
              About
            </Link>
            <Link href="/support" className="text-lg font-semibold hover:text-cyan-400 transition">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
