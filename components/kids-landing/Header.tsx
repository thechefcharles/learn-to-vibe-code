'use client';

import { Logo } from '@/components/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Theme Toggle */}
          <div className="flex-shrink-0">
            <ThemeSwitcher />
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Logo variant="cosmic" size="sm" />
          </div>

          {/* Right: Empty space for balance */}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>
    </header>
  );
}
