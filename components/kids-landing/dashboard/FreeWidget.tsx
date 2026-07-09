'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type CoinSide = 'heads' | 'tails' | null;

type FlipRecord = 'W' | 'L';

export function FreeWidget() {
  const [selected, setSelected] = useState<CoinSide>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinSide>(null);
  const [won, setWon] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [record, setRecord] = useState<FlipRecord[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleFlip = async () => {
    if (!selected || isFlipping) return;

    setIsFlipping(true);
    setShowResult(false);

    // Animate rotation
    setRotation(prev => prev + 1080);

    // Simulate flip duration
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Random result
    const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
    setResult(flipResult);
    const isWin = flipResult === selected;
    setWon(isWin);

    // Add to record
    setRecord(prev => [...prev, isWin ? 'W' : 'L']);

    setIsFlipping(false);

    // Wait 2 seconds before showing result so user can see H or T and let it breathe
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowResult(true);
  };

  const resetGame = () => {
    setSelected(null);
    setResult(null);
    setWon(false);
    setRotation(0);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-base font-semibold text-white uppercase tracking-wide mb-6">
        is it free?
      </h3>

      {/* Game State: Selection */}
      {!result && (
        <>
          {/* Heads/Tails Selector */}
          <div className="flex gap-3 mb-8">
            <motion.button
              onClick={() => !isFlipping && setSelected('heads')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border ${
                selected === 'heads'
                  ? 'bg-cyan-400/30 border-cyan-400/80 text-cyan-200 shadow-lg shadow-cyan-500/40'
                  : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/15 hover:border-white/30'
              }`}
              disabled={isFlipping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Heads
            </motion.button>

            <motion.button
              onClick={() => !isFlipping && setSelected('tails')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border ${
                selected === 'tails'
                  ? 'bg-purple-400/30 border-purple-400/80 text-purple-200 shadow-lg shadow-purple-500/40'
                  : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/15 hover:border-white/30'
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
              animate={{
                rotateY: rotation,
                x: selected && !isFlipping ? [0, -6, 6, -6, 6, -6, 6, 0] : 0,
                y: selected && !isFlipping ? [0, -3, 3, -3, 3, -3, 3, 0] : 0,
              }}
              transition={{
                rotateY: { duration: 1.2, ease: 'easeInOut' },
                x: { duration: 0.4, repeat: selected && !isFlipping ? Infinity : 0 },
                y: { duration: 0.4, repeat: selected && !isFlipping ? Infinity : 0 },
              }}
              className="relative w-40 h-40"
              style={{ perspective: '1200px' }}
            >
              {/* Coin container */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/40 via-purple-400/40 to-pink-300/40 backdrop-blur-sm border-2 border-white/40 shadow-2xl shadow-purple-500/30 flex items-center justify-center overflow-hidden group">
                {/* Glossy shine - top shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-full" />
                {/* Additional shine overlay */}
                <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-br from-white/60 to-transparent rounded-full blur-md" />

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
                    <span className="text-cyan-300 text-lg leading-tight">
                      flip
                      <br />
                      me
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Win sparkle effect */}
              {result && won && (
                <>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-2 -left-2 text-3xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="absolute -top-2 -right-2 text-3xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute -bottom-2 -left-2 text-3xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute -bottom-2 -right-2 text-3xl"
                  >
                    ✨
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.button>
        </>
      )}

      {/* Game State: Result */}
      {result && showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6">
            {won ? (
              <div className="text-white">
                <p className="text-base mb-2">you won,</p>
                <motion.p
                  className="text-5xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                  animate={{
                    y: [0, -4, 4, -4, 4, -4, 4, 0],
                    scale: [1, 1.05, 0.95, 1.05, 0.95, 1.05, 0.95, 1]
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  the course is free
                </motion.p>
              </div>
            ) : (
              <div className="text-white">
                <p className="text-base mb-2">you lost,</p>
                <p className="text-base mb-2">but the course is</p>
                <motion.p
                  className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                  animate={{
                    y: [0, -4, 4, -4, 4, -4, 4, 0],
                    scale: [1, 1.05, 0.95, 1.05, 0.95, 1.05, 0.95, 1]
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  still free
                </motion.p>
              </div>
            )}
          </div>

          <motion.button
            onClick={resetGame}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400/30 to-purple-500/30 border border-cyan-400/60 text-white font-semibold text-sm hover:border-cyan-300/100 hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}

      {/* Record Display */}
      {record.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1 justify-center max-w-xs">
          {record.map((flip, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-sm font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/60"
            >
              {flip}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
