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
  const [rotation, setRotation] = useState(0);

  const handleFlip = async () => {
    if (!selected || isFlipping) return;

    setIsFlipping(true);
    setFlips(prev => prev + 1);

    // Animate rotation
    setRotation(prev => prev + 1080);

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
    setRotation(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-6">
        Free Forever
      </h3>

      {/* Heads/Tails Selector */}
      <div className="flex gap-3 mb-8">
        <motion.button
          onClick={() => !isFlipping && setSelected('heads')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border ${
            selected === 'heads'
              ? 'bg-cyan-400/20 border-cyan-400/60 text-cyan-300 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:border-white/30'
          }`}
          disabled={isFlipping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Heads
        </motion.button>

        <motion.button
          onClick={() => !isFlipping && setSelected('tails')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border ${
            selected === 'tails'
              ? 'bg-purple-400/20 border-purple-400/60 text-purple-300 shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:border-white/30'
          }`}
          disabled={isFlipping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tails
        </motion.button>
      </div>

      {/* Coin */}
      <motion.button
        onClick={handleFlip}
        disabled={!selected || isFlipping}
        className="cursor-pointer mb-6 focus:outline-none disabled:cursor-not-allowed"
        whileHover={!isFlipping && selected ? { scale: 1.08 } : {}}
        whileTap={!isFlipping && selected ? { scale: 0.92 } : {}}
      >
        <motion.div
          animate={{ rotateY: rotation }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="relative w-32 h-32"
          style={{ perspective: '1200px' }}
        >
          {/* Coin container */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/40 via-purple-400/40 to-pink-300/40 backdrop-blur-sm border-2 border-white/40 shadow-2xl shadow-purple-500/30 flex items-center justify-center overflow-hidden group">
            {/* Glossy shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full group-hover:from-white/40 transition-all" />

            {/* Coin content */}
            <motion.div
              className="relative z-10 text-center font-mono font-bold text-2xl"
              animate={{ opacity: isFlipping ? 0.3 : 1 }}
            >
              {isFlipping ? (
                <span className="text-4xl">∿</span>
              ) : result ? (
                <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  {result === 'heads' ? 'H' : 'T'}
                </span>
              ) : (
                <span className="text-gray-400">?</span>
              )}
            </motion.div>
          </div>

          {/* Win sparkle effect */}
          {result && result === selected && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute -top-2 -left-2 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-2 -left-2 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-2 -right-2 text-2xl"
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
            className="mb-3"
          >
            <p className="text-sm font-semibold">
              {result === selected ? (
                <span className="text-green-400">Match! +1 Win</span>
              ) : (
                <span className="text-orange-400">No match</span>
              )}
            </p>
          </motion.div>
        )}

        <p className="text-xs text-gray-400 mb-3">
          <span className="text-green-400 font-mono">{wins}</span>
          {' / '}
          <span className="text-cyan-300 font-mono">{flips}</span>
          {' flips'}
        </p>

        {flips > 0 && (
          <motion.button
            onClick={resetGame}
            className="text-2xs text-gray-500 hover:text-gray-300 transition-colors underline"
            whileHover={{ scale: 1.05 }}
          >
            New game
          </motion.button>
        )}
      </div>
    </div>
  );
}
