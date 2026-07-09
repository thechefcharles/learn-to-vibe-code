'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function FreeWidget() {
  const [clicked, setClicked] = useState(false);
  const [coinCount, setCoinCount] = useState(0);

  const handleClick = () => {
    setClicked(true);
    setCoinCount(prev => prev + 1);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">No Cost</h3>
      </div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer mb-6"
      >
        <motion.div
          animate={clicked ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          {/* Coin */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-full shadow-lg border-4 border-yellow-200 flex items-center justify-center">
            <span className="text-5xl">💰</span>
          </div>

          {/* Sparkles on click */}
          {clicked && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-0 right-0 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-0 left-0 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-0 right-0 text-2xl"
              >
                ✨
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.button>

      <div className="text-center">
        <p className="text-3xl font-bold text-white mb-2">$0</p>
        <p className="text-xs text-gray-400">
          100% free, forever
        </p>
        <p className="text-2xs text-gray-500 mt-2">
          Click the coin ({coinCount})
        </p>
      </div>
    </div>
  );
}
