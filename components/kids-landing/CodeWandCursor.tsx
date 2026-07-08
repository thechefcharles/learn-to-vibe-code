'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';

interface CodeWandCursorProps {
  bgImage: string;
}

interface CodeBlock {
  id: string;
  code: string;
  x: number;
  y: number;
  index: number;
}

const CODE_SNIPPETS = [
  'const build = () => {}',
  'function ai() { return true; }',
  'let vibe = "amazing"',
  'export default App;',
  'interface Code {}',
  'type Props = { success: boolean };',
  'async function learn() {}',
  'const [code, setCode] = useState();',
  'npm run build',
  'git commit -m "ship it"',
  'deploy();',
  'if (works) celebrate();',
];

export const CodeWandCursor: React.FC<CodeWandCursorProps> = ({ bgImage }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mouseTrackerRef = useRef<HTMLDivElement>(null);
  const blockCounterRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize cursor position and track global mouse move
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Start listening immediately on mount
    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  // Direct mouse position update (no RAF throttling)
  const updateMousePos = useCallback((x: number, y: number) => {
    setMousePos({ x, y });
  }, []);

  // Attempt to spawn a code block (throttled to every 150ms, ~5-7 blocks/sec max)
  const trySpawnCodeBlock = useCallback((x: number, y: number) => {
    const now = Date.now();
    const timeSinceLastSpawn = now - lastSpawnTimeRef.current;

    // Only spawn if enough time has passed AND random chance succeeds
    if (timeSinceLastSpawn > 150 && Math.random() < 0.4 && !prefersReducedMotion) {
      lastSpawnTimeRef.current = now;

      const newBlock: CodeBlock = {
        id: `code-${blockCounterRef.current++}`,
        code: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        x,
        y,
        index: codeBlocks.length,
      };

      setCodeBlocks((prev) => [...prev, newBlock]);

      // Auto-cleanup after animation (2s)
      setTimeout(() => {
        setCodeBlocks((prev) => prev.filter((b) => b.id !== newBlock.id));
      }, 2000);
    }
  }, [codeBlocks.length, prefersReducedMotion]);

  // Track mouse position and spawn code blocks with throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update mouse position (throttled via RAF)
    updateMousePos(x, y);

    // Try to spawn a code block (throttled to 150ms intervals)
    if (throttleTimeoutRef.current === null) {
      trySpawnCodeBlock(x, y);

      // Set throttle timeout to prevent rapid spawning attempts
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
      }, 150);
    }
  }, [updateMousePos, trySpawnCodeBlock]);

  // Handle touch position tracking for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Update position (throttled via RAF)
    updateMousePos(x, y);

    // Try to spawn a code block (throttled to 150ms intervals)
    if (throttleTimeoutRef.current === null) {
      trySpawnCodeBlock(x, y);

      // Set throttle timeout to prevent rapid spawning attempts
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
      }, 150);
    }
  }, [updateMousePos, trySpawnCodeBlock]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  const codeBlockVariants = {
    initial: (i: number) => ({
      opacity: 0,
      y: 0,
      rotate: -5 + Math.random() * 10,
      scale: 0.8,
    }),
    animate: (i: number) => ({
      opacity: [0, 1, 0.5, 0],
      y: [0, -100, -150],
      rotate: -5 + Math.random() * 10,
      scale: [0.8, 1, 0.9],
    }),
  };

  return (
    <div
      ref={mouseTrackerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        cursor: prefersReducedMotion ? 'auto' : 'none',
        backgroundImage: bgImage.startsWith('url(') ? bgImage : `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Custom cursor (✨ emoji) */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed pointer-events-none text-3xl z-50"
          animate={{
            x: mousePos.x - 8,
            y: mousePos.y - 8,
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 200,
            mass: 0.8,
          }}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(0, 217, 255, 0.6))',
          }}
        >
          ✨
        </motion.div>
      )}

      {/* Cascading code blocks */}
      {codeBlocks.map((block) => (
        <motion.div
          key={block.id}
          custom={block.index}
          variants={codeBlockVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: block.index * 0.08,
            duration: 2,
            ease: 'easeOut',
          }}
          className="fixed pointer-events-none px-3 py-2 rounded-lg text-sm font-mono"
          style={{
            left: block.x,
            top: block.y,
            backgroundColor: 'rgba(0, 217, 255, 0.15)',
            border: '1px solid rgba(0, 217, 255, 0.4)',
            color: '#00d9ff',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 12px rgba(0, 217, 255, 0.3)',
          }}
        >
          {block.code}
        </motion.div>
      ))}

      {/* Hero content - centered overlay */}
      <MotionConfig reducedMotion="user">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 font-display"
            style={{ color: '#00d9ff' }}
          >
            Build Real Apps.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 font-display"
            style={{ color: '#a78bfa' }}
          >
            With AI. In Weeks.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-lg lg:text-xl mb-8 text-white/90"
          >
            Learn full-stack development with AI-assisted coding. Go from zero to deployed in 16 modules.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/auth/sign-up"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg active:scale-95"
            >
              Start Learning Now
            </Link>
            <Link
              href="/demo"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-colors duration-300 text-base sm:text-lg active:scale-95"
            >
              Explore Free Lessons
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Learn at your pace</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Verifiable Certificate</span>
            </div>
          </motion.div>
        </div>
      </MotionConfig>
    </div>
  );
};

export default CodeWandCursor;
