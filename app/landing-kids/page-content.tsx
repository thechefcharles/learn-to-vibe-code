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

      {/* ============ FLOATING LOGO (TOP-RIGHT) ============ */}
      <div className="fixed top-6 right-4 z-30 opacity-40 pointer-events-none">
        <img
          src="/learn_to_vibe_code_logo_cosmic_wordmark_transparent.png"
          alt="Learn To Vibe Code"
          className="h-12 sm:h-14 lg:h-16 w-auto"
        />
      </div>

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-1 sm:py-3 lg:py-4 px-2 sm:px-3 lg:px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Gleaming Headline */}
          <div className="text-center mb-2 sm:mb-3 lg:mb-4">
            <h2
              className="text-xl sm:text-2xl lg:text-4xl font-bold uppercase tracking-wider"
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
            {/* Mobile: 16 MODULES top (full width) */}
            <GridItem colSpan={1} mobileColSpan={2} mobileOrder={1}>
              <ModuleArcWidget userName={userName} onUserNameChange={setUserName} />
            </GridItem>

            {/* Desktop: 4 LEARNING TIERS */}
            <GridItem colSpan={2} mobileColSpan={2} mobileOrder={6}>
              <LearningTiersWidget />
            </GridItem>

            {/* Desktop: COURSE DURATION */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={7}>
              <TimeWidget />
            </GridItem>

            {/* Desktop: IS IT FREE */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={8}>
              <FreeWidget />
            </GridItem>

            {/* Mobile: YOUR LEARNING JOURNEY (full width middle) */}
            <GridItem colSpan={1} mobileColSpan={2} mobileOrder={3}>
              <ProgressFlowWidget />
            </GridItem>

            {/* Mobile: SHARE THE VIBE (bottom left) */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={4}>
              <InviteWidget />
            </GridItem>

            {/* Mobile: GET CERTIFIED (bottom right) */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={5}>
              <CredentialPreviewWidget />
            </GridItem>
          </DashboardGrid>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-800 py-2 sm:py-3 px-2 sm:px-4 mt-2">
        <div className="max-w-7xl mx-auto text-center text-xs sm:text-sm text-gray-500">
          <p className="text-xs sm:text-xs">© 2026 Vibe Coding. Learn to code with AI. Ship real apps.</p>
          <div className="flex gap-4 sm:gap-8 justify-center mt-2 flex-wrap">
            <Link href="/about" className="text-sm sm:text-base lg:text-lg font-semibold hover:text-cyan-400 transition">
              About
            </Link>
            <Link href="/support" className="text-sm sm:text-base lg:text-lg font-semibold hover:text-cyan-400 transition">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
