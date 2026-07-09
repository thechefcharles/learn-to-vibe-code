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
import { Header } from '@/components/kids-landing/Header';
import Link from 'next/link';

export default function KidsLandingPageContent() {
  const [userName, setUserName] = useState('');

  return (
    <div
      className="relative w-full min-h-screen text-white overflow-x-hidden flex flex-col"
      data-landing-container
      style={{
        backgroundColor: '#0f172a',
      }}
    >
      <VideoBackground />
      <MouseTrail />
      <FloatingCTA />

      {/* ============ HEADER ============ */}
      <Header />

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 relative z-10 flex-1">
        <div className="max-w-6xl mx-auto">

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
      <footer className="border-t border-slate-800/50 py-1.5 sm:py-2 px-2 sm:px-4 mt-1.5 text-center">
        <p className="text-xs sm:text-xs text-gray-600 mb-1 sm:mb-1.5">© 2026 Vibe Coding. Learn to code with AI. Ship real apps.</p>
        <div className="flex gap-3 sm:gap-6 justify-center flex-wrap">
          <Link href="/about" className="text-xs sm:text-sm font-medium text-gray-500 hover:text-cyan-400 transition">
            About
          </Link>
          <Link href="/support" className="text-xs sm:text-sm font-medium text-gray-500 hover:text-cyan-400 transition">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
