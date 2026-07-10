'use client';

import dynamic from 'next/dynamic';

const PageContent = dynamic(() => import('@/app/landing-kids/page-content'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="text-4xl mb-4">🌀</div>
        <p className="text-white/70">Loading...</p>
      </div>
    </div>
  ),
});

interface KidsLandingPageProps {
  isSignedIn?: boolean;
}

export function KidsLandingPage({ isSignedIn = false }: KidsLandingPageProps) {
  return <PageContent isSignedIn={isSignedIn} />;
}
