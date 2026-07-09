'use client';

import { Logo } from '@/components/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
            <Logo variant="cosmic" size="sm" />
          </div>

          {/* Center: Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider"
            style={{
              background: 'linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gleam 3s ease-in-out infinite',
            }}
          >
            Learn Vibe Coding in Weeks
          </motion.h1>

          {/* Right: Theme Toggle */}
          <div className="flex-shrink-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gleam {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.4); }
        }
      `}</style>
    </header>
  );
}
