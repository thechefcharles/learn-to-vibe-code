'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';

interface KeyboardShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Shortcut {
  keys: string[];
  description: string;
  platform?: 'all' | 'mac' | 'windows';
}

const shortcuts: Shortcut[] = [
  {
    keys: ['K'],
    description: 'Jump to next lesson',
  },
  {
    keys: ['J'],
    description: 'Jump to previous lesson',
  },
  {
    keys: ['⌘', '?'],
    description: 'Open keyboard shortcuts',
    platform: 'mac',
  },
  {
    keys: ['Ctrl', '?'],
    description: 'Open keyboard shortcuts',
    platform: 'windows',
  },
  {
    keys: ['Esc'],
    description: 'Close this panel',
  },
];

export function KeyboardShortcutsPanel({
  isOpen,
  onClose,
}: KeyboardShortcutsPanelProps) {
  const prefersReducedMotion = usePreferredMotion();

  // Filter shortcuts based on platform
  const isMac = typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
  const displayedShortcuts = shortcuts.filter((shortcut) => {
    if (shortcut.platform === 'mac') return isMac;
    if (shortcut.platform === 'windows') return !isMac;
    return true;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              className="
                relative w-full max-w-md p-8 rounded-2xl
                bg-gradient-to-br from-slate-800/95 to-slate-900/95
                border border-slate-700/50 border-slate-600/30
                backdrop-blur-xl
                shadow-2xl shadow-slate-900/50
              "
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button (X) */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200
                  transition-colors duration-200 text-xl leading-none"
                aria-label="Close keyboard shortcuts"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">⌨️</div>
                <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
              </div>

              {/* Shortcuts List */}
              <div className="space-y-4">
                {displayedShortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg
                      bg-slate-700/30 border border-slate-600/30
                      hover:bg-slate-700/50 transition-colors duration-200"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    {/* Keyboard Keys */}
                    <div className="flex items-center gap-1.5 min-w-fit">
                      {shortcut.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1.5">
                          <kbd
                            className="
                              px-3 py-1.5 rounded
                              bg-slate-800/80 border border-slate-600/50
                              text-slate-200 text-sm font-semibold
                              shadow-md shadow-black/30
                              min-w-12 text-center
                            "
                          >
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-slate-500 text-xs font-semibold">+</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm flex-1">
                      {shortcut.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Footer Text */}
              <div className="mt-6 pt-4 border-t border-slate-700/30">
                <p className="text-slate-400 text-xs text-center">
                  Use keyboard shortcuts to navigate faster through lessons
                </p>
              </div>

              {/* Close Button at Bottom */}
              <button
                onClick={onClose}
                className="
                  w-full mt-6 px-4 py-3 rounded-lg font-medium
                  bg-slate-700/40 text-slate-200 border border-slate-600/50
                  hover:bg-slate-700/60 hover:text-white
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-slate-500/50
                "
              >
                Close (Esc)
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
