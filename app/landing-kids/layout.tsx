import type { ReactNode } from 'react';

export default function KidsLandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-[#0f0f1e] to-[#1a1a2e] text-white min-h-screen overflow-x-hidden">
      {/* Animated gradient accent (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
