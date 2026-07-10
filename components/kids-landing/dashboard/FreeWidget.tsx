'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type CoinSide = 'heads' | 'tails' | null;
type GameStage = 'select' | 'flipping' | 'landed' | 'result';
type FlipRecord = 'W' | 'L';

export function FreeWidget() {
  const [selected, setSelected] = useState<CoinSide>(null);
  const [stage, setStage] = useState<GameStage>('select');
  const [result, setResult] = useState<CoinSide>(null);
  const [won, setWon] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [record, setRecord] = useState<FlipRecord[]>([]);
  const [titleHover, setTitleHover] = useState(false);

  const handleFlip = async () => {
    if (!selected || stage !== 'select') return;

    setStage('flipping');

    // Animate rotation
    setRotation(prev => prev + 1080);

    // Simulate flip duration
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Random result
    const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
    setResult(flipResult);
    setStage('landed');

    // Wait 2 seconds to show what landed
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Determine win/loss
    const isWin = flipResult === selected;
    setWon(isWin);
    setRecord(prev => [...prev, isWin ? 'W' : 'L']);
    setStage('result');
  };

  const resetGame = () => {
    setSelected(null);
    setStage('select');
    setResult(null);
    setWon(false);
    setRotation(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.h3
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
        animate={{
          scale: titleHover ? 1.3 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="uppercase tracking-wide mb-6 cursor-pointer font-bold text-center"
        style={{
          fontSize: titleHover ? '28px' : '20px',
          background: titleHover
            ? 'linear-gradient(to right, rgb(34, 211, 238), rgb(168, 85, 247), rgb(236, 72, 153))'
            : 'transparent',
          backgroundClip: titleHover ? 'text' : 'unset',
          WebkitBackgroundClip: titleHover ? 'text' : 'unset',
          WebkitTextFillColor: titleHover ? 'transparent' : 'white',
          color: titleHover ? 'transparent' : 'white',
          transformOrigin: 'center',
        }}
      >
        Is It Free?
      </motion.h3>

      {/* Selection Stage: Pick Heads or Tails */}
      {stage === 'select' && (
        <>
          <div className="flex gap-3 mb-8">
            <motion.button
              onClick={() => setSelected('heads')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border ${
                selected === 'heads'
                  ? 'bg-cyan-400/30 border-cyan-400/80 text-cyan-200 shadow-lg shadow-cyan-500/40'
                  : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/15 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Heads
            </motion.button>

            <motion.button
              onClick={() => setSelected('tails')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border ${
                selected === 'tails'
                  ? 'bg-purple-400/30 border-purple-400/80 text-purple-200 shadow-lg shadow-purple-500/40'
                  : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/15 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tails
            </motion.button>
          </div>

          <motion.button
            onClick={handleFlip}
            disabled={!selected}
            className="cursor-pointer mb-6 focus:outline-none disabled:cursor-not-allowed"
            whileHover={selected ? { scale: 1.08 } : {}}
            whileTap={selected ? { scale: 0.92 } : {}}
          >
            <motion.div
              animate={{
                x: selected ? [0, -6, 6, -6, 6, -6, 6, 0] : 0,
                y: selected ? [0, -3, 3, -3, 3, -3, 3, 0] : 0,
              }}
              transition={{
                x: { duration: 0.4, repeat: selected ? Infinity : 0 },
                y: { duration: 0.4, repeat: selected ? Infinity : 0 },
              }}
              className="relative w-40 h-40"
            >
              <CoinDisplay isFlipping={false} result={null} />
            </motion.div>
          </motion.button>
        </>
      )}

      {/* Flipping Stage: Coin is spinning */}
      {(stage === 'flipping' || stage === 'landed') && (
        <motion.button
          className="cursor-pointer mb-6 focus:outline-none"
          disabled
        >
          <motion.div
            animate={{
              rotateY: stage === 'flipping' ? rotation : 0,
            }}
            transition={{
              rotateY: { duration: 1.2, ease: 'easeInOut' },
            }}
            className="relative w-40 h-40"
            style={{ perspective: '1200px' }}
          >
            <CoinDisplay isFlipping={stage === 'flipping'} result={result} />
          </motion.div>
        </motion.button>
      )}

      {/* Landed Stage: Show what it landed on */}
      {stage === 'landed' && result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-4"
        >
          <p className="text-5xl font-black text-white capitalize">
            {result}!
          </p>
        </motion.div>
      )}

      {/* Result Stage: Win or Loss message */}
      {stage === 'result' && result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <p className="text-3xl font-black text-white mb-3 capitalize">
              {result}
            </p>
            <p className="text-2xl font-bold text-white mb-4">
              {won ? 'You Win!' : 'You Lose'}
            </p>

            {won ? (
              <div>
                <p className="text-sm text-cyan-300 uppercase tracking-widest mb-2">Your Course Is</p>
                <motion.p
                  className="text-7xl font-black text-white leading-none"
                  animate={{
                    y: [0, -4, 4, -4, 4, -4, 4, 0],
                    scale: [1, 1.05, 0.95, 1.05, 0.95, 1.05, 0.95, 1]
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  FREE
                </motion.p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-300 uppercase tracking-widest mb-2">
                  Since I Feel Bad That You Lost, Your Course Is Still...
                </p>
                <motion.p
                  className="text-6xl font-black text-white leading-none mt-3"
                  animate={{
                    y: [0, -3, 3, -3, 3, 0],
                    scale: [1, 1.03, 0.97, 1.03, 0.97, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  FREE
                </motion.p>
              </div>
            )}
          </motion.div>

          <motion.button
            onClick={resetGame}
            className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400/30 to-purple-500/30 border border-cyan-400/60 text-white font-semibold hover:border-cyan-300/100 hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
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

function CoinDisplay({ isFlipping, result }: { isFlipping: boolean; result: CoinSide }) {
  return (
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/40 via-blue-400/40 to-purple-500/40 backdrop-blur-xl border-4 border-pink-300/50 shadow-2xl shadow-pink-400/50 flex items-center justify-center overflow-hidden">
      {/* Coin ridges - concentric circles */}
      <div className="absolute inset-0 rounded-full border border-slate-400/40" style={{ transform: 'scale(0.85)' }} />
      <div className="absolute inset-0 rounded-full border border-slate-400/30" style={{ transform: 'scale(0.70)' }} />

      {/* Glossy shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full" />

      {/* Metallic inner circle */}
      <div className="absolute inset-6 rounded-full border border-slate-400/50 bg-gradient-to-b from-slate-200 to-slate-400" />

      {/* Coin content */}
      <motion.div className="relative z-10 text-center font-bold" animate={{ opacity: isFlipping ? 0.3 : 1 }}>
        {isFlipping ? (
          <span className="text-4xl text-slate-500">∿</span>
        ) : result ? (
          <span className="text-5xl text-slate-700 font-black">{result === 'heads' ? '◐' : '◑'}</span>
        ) : (
          <span className="text-slate-700 text-lg leading-tight font-semibold">
            Flip
            <br />
            Me
          </span>
        )}
      </motion.div>
    </div>
  );
}
