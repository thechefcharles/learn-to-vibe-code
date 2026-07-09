'use client';

import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useState, useRef } from 'react';

export function FloatingCTA() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [initialPos] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640;
      return { x: isMobile ? window.innerWidth - 60 : window.innerWidth - 80, y: 40 };
    }
    return { x: 0, y: 40 };
  });
  const [cursorPos, setCursorPos] = useState(initialPos);
  const [buttonPos, setButtonPos] = useState(initialPos);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track cursor position (desktop only)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smoothly move button towards cursor (desktop only)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) return;

    const animate = () => {
      setButtonPos(prev => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only move if cursor is far enough away (to avoid jitter at rest)
        if (distance > 10) {
          const speed = 0.002; // Ultra-slow chase speed (half of previous)
          return {
            x: prev.x + dx * speed,
            y: prev.y + dy * speed,
          };
        }
        return prev;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPos, prefersReducedMotion]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed z-50"
      style={{
        left: `${buttonPos.x}px`,
        top: `${buttonPos.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: prefersReducedMotion ? 'none' : 'none',
      }}
    >
      <Link
        href="/auth/sign-up"
        data-testid="floating-cta-button"
        className={`
          inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-base text-white
          bg-gradient-to-r from-cyan-500 to-purple-600
          border border-cyan-400 shadow-lg whitespace-nowrap
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
