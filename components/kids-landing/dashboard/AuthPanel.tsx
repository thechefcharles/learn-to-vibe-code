'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AuthPanel() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw scratch-off layer
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#c084fc');
    gradient.addColorStop(1, '#a855f7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal', canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText('share link', canvas.width / 2, canvas.height / 2 + 15);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isRevealing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.clearRect(x - 20, y - 20, 40, 40);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [isRevealing]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full space-y-6"
    >
      {/* Sign In / Sign Up Buttons */}
      <div className="flex gap-3">
        <Link
          href="/auth/sign-in"
          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg text-center transition-all shadow-lg"
        >
          Sign In
        </Link>
        <Link
          href="/auth/sign-up"
          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg text-center transition-all shadow-lg"
        >
          Sign Up
        </Link>
      </div>

      {/* Scratch to Reveal Share Box */}
      <div className="space-y-3">
        <div
          onMouseEnter={() => setIsRevealing(true)}
          onMouseLeave={() => setIsRevealing(false)}
          className="relative w-full h-32 rounded-lg overflow-hidden cursor-pointer"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center opacity-90">
            <div className="text-center">
              <p className="text-white/80 text-xs font-semibold">
                {copied ? 'Link Copied!' : 'learntovibecode.io'}
              </p>
              <button
                onClick={handleCopyLink}
                className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded transition"
              >
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-sm font-semibold text-white tracking-wide uppercase">
          Share the Vibe
        </p>
      </div>
    </motion.div>
  );
}
