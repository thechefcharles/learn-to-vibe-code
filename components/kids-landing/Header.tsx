'use client';

import { Logo } from '@/components/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';

interface HeaderProps {
  hideThemeToggle?: boolean;
}

export function Header({ hideThemeToggle = false }: HeaderProps) {
  return (
    <header className="relative z-20 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        {!hideThemeToggle && <ThemeSwitcher />}
        {/* Center: Logo - Responsive sizing */}
        <div className="flex justify-center">
          <div className="scale-110 sm:scale-150">
            <Logo variant="cosmic" size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
