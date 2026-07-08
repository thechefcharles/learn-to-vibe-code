import type { ReactNode } from 'react';

export default function KidsLandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Animated gradient accent (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />

      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
