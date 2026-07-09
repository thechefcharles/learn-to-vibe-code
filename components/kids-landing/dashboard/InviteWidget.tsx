'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function InviteWidget() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/landing-kids`
    : 'https://learn-to-vibe-code.vercel.app/landing-kids';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-base font-semibold text-white uppercase tracking-wide mb-6 text-center">
        never code alone
      </h3>

      {/* Collapsed State: Share Button */}
      {!isRevealed && (
        <motion.button
          onClick={() => setIsRevealed(true)}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-400/30 to-pink-500/30 border border-purple-400/60 text-white font-semibold text-sm hover:border-purple-300/100 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.3)',
              '0 0 40px rgba(168, 85, 247, 0.5)',
              '0 0 20px rgba(168, 85, 247, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          share the vibe
        </motion.button>
      )}

      {/* Expanded State: Share Link + Copy */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center gap-4"
          >
            {/* Share Link Display */}
            <motion.div
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center"
              animate={{
                borderColor: copied
                  ? 'rgba(34, 197, 94, 0.6)'
                  : 'rgba(255, 255, 255, 0.2)',
                boxShadow: copied
                  ? '0 0 20px rgba(34, 197, 94, 0.4)'
                  : '0 0 0px rgba(0, 0, 0, 0)',
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-gray-400 mb-2">your share link:</p>
              <p className="text-xs font-mono text-cyan-300 break-all">{shareUrl}</p>
            </motion.div>

            {/* Copy Button */}
            <motion.button
              onClick={handleCopyLink}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-400/30 to-cyan-500/30 border border-cyan-400/60 text-white font-semibold text-sm hover:border-cyan-300/100 hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {copied ? '✨ Copied!' : 'Copy Link'}
            </motion.button>

            {/* Close Button */}
            <motion.button
              onClick={() => setIsRevealed(false)}
              className="text-xs text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              close
            </motion.button>

            {/* Confetti-lite sparkles on copy */}
            {copied && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{ scale: 1.5, opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="absolute text-lg pointer-events-none"
                >
                  ✨
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{ scale: 1.5, opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="absolute text-lg pointer-events-none"
                >
                  ✨
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
