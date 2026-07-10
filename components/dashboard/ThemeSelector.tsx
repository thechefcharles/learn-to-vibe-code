'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Theme {
  name: string;
  key: string;
  color: string;
}

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  themes: Theme[];
}

export function ThemeSelector({ currentTheme, onThemeChange, themes }: ThemeSelectorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5, delay: 0.1 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-2xl"
    >
      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Theme</h3>
      <p className="text-sm text-gray-400 mb-4">Choose your learning environment aesthetic</p>

      <div className="flex gap-3 flex-wrap">
        {themes.map((theme) => (
          <motion.button
            key={theme.key}
            whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
            onClick={() => onThemeChange(theme.key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentTheme === theme.key
                ? `bg-gradient-to-r ${theme.color} text-white shadow-lg ring-2 ring-white/30`
                : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/15'
            }`}
          >
            {theme.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
