'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AuthPanel() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = 'https://learntovibecode.io';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 120;

    // Create cosmic tie-dye gradient for scratch box
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(0.25, '#06b6d4');
    gradient.addColorStop(0.5, '#ec4899');
    gradient.addColorStop(0.75, '#a78bfa');
    gradient.addColorStop(1, '#06b6d4');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture noise
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 20;
      data[i + 3] = Math.max(0, data[i + 3] - noise);
    }
    ctx.putImageData(imageData, 0, 0);

    // Add "SCRATCH" text in large, bold letters
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', canvas.width / 2, canvas.height / 2);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scratch with brush
    ctx.clearRect(x - 20, y - 20, 40, 40);

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let scratched = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) scratched++;
    }
    const percentage = (scratched / (data.length / 4)) * 100;
    setScratchPercentage(percentage);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isRevealed = scratchPercentage > 40;

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full flex flex-col items-center gap-8"
    >
      {/* Sign In / Sign Up Buttons */}
      <div className="flex gap-4 w-full sm:gap-6">
        <Link
          href="/auth/sign-in"
          className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 sm:py-4 rounded-xl text-center transition-all shadow-lg hover:shadow-xl hover:scale-105 text-lg"
        >
          Sign In
        </Link>
        <Link
          href="/auth/sign-up"
          className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 sm:py-4 rounded-xl text-center transition-all shadow-lg hover:shadow-xl hover:scale-105 text-lg"
        >
          Sign Up
        </Link>
      </div>

      {/* Scratch to Reveal Lottery Ticket */}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="relative w-full max-w-sm">
          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            onMouseEnter={() => setIsDrawing(true)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={handleScratch}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={handleScratch}
            className="w-full rounded-xl border-4 border-dashed border-white/30 transition-all"
            style={{ cursor: isRevealed ? 'pointer' : 'crosshair' }}
          />

          {/* Revealed content - link + copy button */}
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm p-4"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: 3 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/50 to-purple-500/50 border border-white/40"
              >
                <p className="text-sm text-white font-bold tracking-wide">
                  learntovibecode.io
                </p>
              </motion.div>

              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400/60 to-purple-500/60 border border-cyan-300/80 text-white font-bold text-sm hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-400/60 transition-all"
              >
                {copied ? '✨ Copied!' : '📋 Copy Link'}
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Share the Vibe label */}
        <motion.p
          animate={{ scale: isRevealed ? 1.1 : 1 }}
          className="text-center text-base font-bold text-white tracking-widest uppercase"
          style={{
            background: 'linear-gradient(90deg, #06b6d4, #a78bfa, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Share The Vibe
        </motion.p>

        {!isRevealed && (
          <p className="text-xs text-white/60 font-medium">
            Scratch to reveal the share link →
          </p>
        )}
      </div>
    </motion.div>
  );
}
