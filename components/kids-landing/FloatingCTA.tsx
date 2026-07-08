'use client';

import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useState } from 'react';

export function FloatingCTA() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-8 right-8 z-50">
      <Link
        href="/signup"
        data-testid="floating-cta-button"
        className={`
          inline-block px-6 py-3 rounded-lg font-bold text-white
          bg-gradient-to-r from-cyan-500 to-purple-600
          border border-cyan-400 shadow-lg
          ${!prefersReducedMotion ? 'hover:scale-105 active:scale-95 transition-transform duration-300 animate-pulse' : ''}
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950
        `}
        style={{
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.1)',
        }}
      >
        Enroll Free
      </Link>
    </div>
  );
}

export default FloatingCTA;
