'use client';

import { Logo } from '@/components/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Theme Toggle */}
          <div className="flex-shrink-0">
            <ThemeSwitcher />
          </div>

          {/* Center: Logo - Responsive sizing */}
          <div className="flex-1 flex justify-center">
            <div className="scale-110 sm:scale-150">
              <Logo variant="cosmic" size="sm" />
            </div>
          </div>

          {/* Right: Empty space for balance */}
          <div className="flex-shrink-0 w-8 sm:w-10" />
        </div>
      </div>
    </header>
  );
}
