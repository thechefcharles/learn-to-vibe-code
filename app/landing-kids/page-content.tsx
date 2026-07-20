'use client';

import { useState } from 'react';
import { DashboardGrid, GridItem } from '@/components/kids-landing/dashboard/DashboardGrid';
import { ModuleArcWidget } from '@/components/kids-landing/dashboard/ModuleArcWidget';
import { LearningTiersWidget } from '@/components/kids-landing/dashboard/LearningTiersWidget';
import { TimeWidget } from '@/components/kids-landing/dashboard/TimeWidget';
import { FreeWidget } from '@/components/kids-landing/dashboard/FreeWidget';
import { AuthPanel } from '@/components/kids-landing/dashboard/AuthPanel';
import { ProgressFlowWidget } from '@/components/ProgressFlowWidget';
import { CredentialPreviewWidget } from '@/components/CredentialPreviewWidget';
import { FloatingCTA } from '@/components/kids-landing/FloatingCTA';
import { VideoBackground } from '@/components/kids-landing/VideoBackground';
import { MouseTrail } from '@/components/kids-landing/MouseTrail';
import { Header } from '@/components/kids-landing/Header';
import { Footer } from '@/components/Footer';

interface KidsLandingPageContentProps {
  isSignedIn?: boolean;
}

export default function KidsLandingPageContent({ isSignedIn = false }: KidsLandingPageContentProps) {
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
      <FloatingCTA isSignedIn={isSignedIn} />

      {/* ============ HEADER ============ */}
      <Header />

      {/* ============ DASHBOARD GRID ============ */}
      <section className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 relative z-10 flex-1">
        <div className="max-w-6xl mx-auto">

          <DashboardGrid>
            {/* WELCOME BACK / SIGN IN */}
            <GridItem colSpan={1} mobileColSpan={2} mobileOrder={1}>
              <AuthPanel userName={userName} isSignedIn={isSignedIn} />
            </GridItem>

            {/* 4 LEARNING TIERS */}
            <GridItem colSpan={2} mobileColSpan={2} mobileOrder={2}>
              <LearningTiersWidget />
            </GridItem>

            {/* 16 MODULES */}
            <GridItem colSpan={1} mobileColSpan={2} mobileOrder={3}>
              <ModuleArcWidget userName={userName} onUserNameChange={setUserName} />
            </GridItem>

            {/* YOUR LEARNING JOURNEY (bottom left) */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={4}>
              <ProgressFlowWidget />
            </GridItem>

            {/* COURSE DURATION */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={5}>
              <TimeWidget />
            </GridItem>

            {/* IS IT FREE */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={6}>
              <FreeWidget />
            </GridItem>

            {/* GET CERTIFIED (bottom right) */}
            <GridItem colSpan={1} mobileColSpan={1} mobileOrder={7}>
              <CredentialPreviewWidget />
            </GridItem>
          </DashboardGrid>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}
