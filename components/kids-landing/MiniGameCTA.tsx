'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { playSound } from '@/lib/sounds';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Confetti } from '@/components/Confetti';
import { ParticleEffect } from './ParticleEffect';

interface CodeBlock {
  id: string;
  text: string;
  correctPosition: number;
}

const BLOCKS: CodeBlock[] = [
  { id: 'block-1', text: 'const build', correctPosition: 0 },
  { id: 'block-2', text: '= () => {}', correctPosition: 1 },
  { id: 'block-3', text: 'ship();', correctPosition: 2 },
];

const EXPECTED_RESULT = 'const build = () => { ship(); }';

export const MiniGameCTA: React.FC = () => {
  const [blocks, setBlocks] = useState<CodeBlock[]>(BLOCKS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect touch capability on mount
  useEffect(() => {
    setIsTouchDevice(() => {
      return (
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer:coarse)').matches ||
          ('ontouchstart' in window) ||
          (navigator as any).maxTouchPoints > 0)
      );
    });
  }, []);

  // Check if blocks are in correct order
  const checkWin = useCallback((blockOrder: CodeBlock[]) => {
    return blockOrder.every((block, index) => block.correctPosition === index);
  }, []);

  // Swap blocks and check for win
  const swapAndCheck = (index1: number, index2: number) => {
    if (index1 === index2) return;

    const newBlocks = [...blocks];
    [newBlocks[index1], newBlocks[index2]] = [
      newBlocks[index2],
      newBlocks[index1],
    ];

    setBlocks(newBlocks);
    playSound('click');

    // Check for win
    if (checkWin(newBlocks)) {
      setGameWon(true);
      setShowConfetti(true);
      setShowParticles(true);
      playSound('success');
    }
  };

  // Handle drag start (desktop)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    playSound('click');
    e.dataTransfer!.effectAllowed = 'move';
  };

  // Handle drag over (desktop)
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  };

  // Handle drop (desktop)
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    swapAndCheck(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  // Handle tap to select/swap (mobile)
  const handleTapBlock = (index: number) => {
    if (selectedIndex === null) {
      // First tap: select block
      setSelectedIndex(index);
      playSound('hover');
    } else if (selectedIndex === index) {
      // Second tap on same block: deselect
      setSelectedIndex(null);
      playSound('click');
    } else {
      // Second tap on different block: swap
      swapAndCheck(selectedIndex, index);
      setSelectedIndex(null);
    }
  };

  // Reset game
  const handleReset = () => {
    setBlocks(BLOCKS);
    setGameWon(false);
    setShowConfetti(false);
    setShowParticles(false);
    setDraggedIndex(null);
    setSelectedIndex(null);
    playSound('click');
  };

  // Get current result based on block order
  const currentResult = blocks.map((b) => b.text).join(' ');

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      {/* Intro Text */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Quick test: Can you think like a coder?
        </h3>
        <p className="text-cyan-300/80">Arrange these 3 code blocks in the right order in 30 seconds</p>
      </div>

      {/* Game Container */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/30 rounded-lg p-8 mb-8">
        {/* Draggable Blocks */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-cyan-400 mb-4 block">
            {isTouchDevice ? 'Tap to reorder:' : 'Drag to reorder:'}
          </label>
          <div className="space-y-3">
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                draggable={!isTouchDevice}
                onDragStart={(e: any) => handleDragStart(e, index)}
                onDragOver={(e: any) => handleDragOver(e)}
                onDrop={(e: any) => handleDrop(e, index)}
                onDragEnd={() => setDraggedIndex(null)}
                onClick={() => isTouchDevice && handleTapBlock(index)}
                role="button"
                tabIndex={0}
                aria-label={`Code block ${index + 1}: ${block.text}`}
                aria-pressed={selectedIndex === index}
                className={`p-4 rounded-lg font-mono text-base cursor-pointer transition-all focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black ${
                  draggedIndex === index
                    ? 'bg-cyan-500/20 border-2 border-cyan-400 opacity-50'
                    : selectedIndex === index
                      ? 'bg-purple-500/30 border-2 border-purple-400'
                      : 'bg-slate-700/80 border-2 border-slate-600 hover:border-cyan-400/60'
                }`}
                whileHover={!isTouchDevice ? { scale: prefersReducedMotion ? 1 : 1.02 } : undefined}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-cyan-400 font-bold">{'⋮⋮'}</div>
                  <span className="text-white">{block.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expected Result Display */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-cyan-400 mb-2 block">
            Current result:
          </label>
          <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-green-400">{currentResult}</code>
          </div>
          <label className="text-sm font-semibold text-cyan-400 mb-2 block mt-4">
            Target:
          </label>
          <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-purple-400">{EXPECTED_RESULT}</code>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-2xl font-bold text-white mb-1">You got it!</p>
                <p className="text-green-300">Perfect order! You're thinking like a coder already.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {gameWon ? (
            <>
              <button
                onClick={handleReset}
                className="px-6 py-3 sm:py-3 rounded-lg font-semibold text-slate-900 bg-slate-300 hover:bg-slate-200 transition-colors active:scale-95 text-base"
              >
                Try Again
              </button>
              <Link
                href="/auth/sign-up?version=kids"
                className="px-6 sm:px-8 py-3 sm:py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-lg hover:shadow-cyan-400/50 transition-all hover:scale-105 active:scale-95 inline-block text-base text-center"
              >
                Enroll Free →
              </Link>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-slate-600/50 hover:bg-slate-600 transition-colors active:scale-95 text-base"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      {/* Particle Effect */}
      <ParticleEffect
        trigger={showParticles}
        count={12}
        color="#00d9ff"
        duration={1}
      />
    </div>
  );
};

export default MiniGameCTA;
