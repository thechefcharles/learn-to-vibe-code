'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type CoinSide = 'heads' | 'tails' | null;

export function FreeWidget() {
  const [selected, setSelected] = useState<CoinSide>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinSide>(null);
  const [flips, setFlips] = useState(0);
  const [wins, setWins] = useState(0);

  const handleFlip = async () => {
    if (!selected || isFlipping) return;

    setIsFlipping(true);
    setFlips(prev => prev + 1);

    // Simulate flip duration
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Random result
    const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
    setResult(flipResult);

    if (flipResult === selected) {
      setWins(prev => prev + 1);
    }

    setIsFlipping(false);
  };

  const resetGame = () => {
    setSelected(null);
    setResult(null);
    setFlips(0);
    setWins(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Coin Flip Game</h3>
      </div>

      {/* Heads/Tails Selector */}
      <div className="flex gap-3 mb-6">
        <motion.button
          onClick={() => !isFlipping && setSelected('heads')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            selected === 'heads'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/50'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          disabled={isFlipping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          👑 Heads
        </motion.button>

        <motion.button
          onClick={() => !isFlipping && setSelected('tails')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            selected === 'tails'
              ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-black shadow-lg shadow-pink-500/50'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          disabled={isFlipping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🌙 Tails
        </motion.button>
      </div>

      {/* Coin */}
      <motion.button
        onClick={handleFlip}
        disabled={!selected || isFlipping}
        className="cursor-pointer mb-6 focus:outline-none disabled:cursor-not-allowed"
        whileHover={!isFlipping && selected ? { scale: 1.1 } : {}}
        whileTap={!isFlipping && selected ? { scale: 0.95 } : {}}
      >
        <motion.div
          animate={isFlipping ? { rotateY: 1080, rotateX: 360 } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="relative w-40 h-40 flex items-center justify-center"
          style={{ perspective: '1000px' }}
        >
          {/* Coin with glass morphism */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 via-purple-300 to-pink-300 shadow-2xl shadow-purple-500/50 border-4 border-white/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
            {/* Glossy shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />

            {/* Coin content */}
            <div className="relative z-10 text-center">
              {isFlipping ? (
                <div className="text-6xl animate-spin">🪙</div>
              ) : result ? (
                <div className="text-6xl">
                  {result === 'heads' ? '👑' : '🌙'}
                </div>
              ) : (
                <div className="text-5xl opacity-50">?</div>
              )}
            </div>
          </div>

          {/* Sparkle animation on win */}
          {result && result === selected && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 text-3xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute top-0 right-0 text-3xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 left-0 text-3xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 right-0 text-3xl"
              >
                ✨
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.button>

      {/* Result & Stats */}
      <div className="text-center">
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4"
          >
            <p className="text-sm text-gray-300">
              {result === selected ? (
                <span className="text-green-400 font-bold">🎉 You won!</span>
              ) : (
                <span className="text-orange-400 font-bold">Better luck next time!</span>
              )}
            </p>
          </motion.div>
        )}

        <p className="text-xs text-gray-400 mb-3">
          Wins: <span className="text-green-400 font-bold">{wins}</span> / Flips: <span className="text-cyan-300 font-bold">{flips}</span>
        </p>

        <motion.button
          onClick={resetGame}
          className="text-2xs text-gray-500 hover:text-gray-300 transition-colors underline"
          whileHover={{ scale: 1.05 }}
        >
          Reset game
        </motion.button>
      </div>
    </div>
  );
}
