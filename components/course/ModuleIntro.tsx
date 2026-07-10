'use client';

import { motion } from 'framer-motion';
import type { ModuleStepSequence } from '@/lib/module-steps';

interface ModuleIntroProps {
  steps: ModuleStepSequence;
  moduleId: number;
  isKids: boolean;
  onStart: () => void;
}

export function ModuleIntro({ steps, moduleId, isKids, onStart }: ModuleIntroProps) {
  const totalSteps = steps.steps.length;
  const estimatedTime = `${totalSteps * 5} min`; // Assume 5 min per step

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-8 border backdrop-blur-md ${
        isKids
          ? 'bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 border-purple-400/30'
          : 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-white/20'
      }`}
    >
      {/* Module Badge */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`text-3xl w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
            isKids
              ? 'bg-purple-400 text-white'
              : 'bg-cyan-500/30 text-cyan-400'
          }`}
        >
          {String(moduleId).padStart(2, '0')}
        </div>
        <div>
          <h1
            className={`text-2xl font-bold ${
              isKids ? 'text-purple-900' : 'text-white'
            }`}
          >
            {steps.moduleName}
          </h1>
        </div>
      </div>


      {/* Module Stats */}
      <div
        className={`grid grid-cols-3 gap-4 p-4 rounded-lg mb-6 ${
          isKids ? 'bg-white/50' : 'bg-slate-900/50'
        }`}
      >
        <div className="text-center">
          <div className={`text-2xl font-bold ${isKids ? 'text-purple-600' : 'text-cyan-400'}`}>
            {totalSteps}
          </div>
          <div className={`text-xs ${isKids ? 'text-purple-700' : 'text-slate-400'}`}>
            Steps
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isKids ? 'text-purple-600' : 'text-cyan-400'}`}>
            {estimatedTime}
          </div>
          <div className={`text-xs ${isKids ? 'text-purple-700' : 'text-slate-400'}`}>
            Estimated time
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isKids ? 'text-purple-600' : 'text-cyan-400'}`}>
            +50 XP
          </div>
          <div className={`text-xs ${isKids ? 'text-purple-700' : 'text-slate-400'}`}>
            Completion reward
          </div>
        </div>
      </div>

      {/* Start Button */}
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg ${
          isKids
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 shadow-purple-500/50 hover:shadow-purple-600/50'
            : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-cyan-500/50 hover:shadow-cyan-600/50'
        }`}
      >
        Let's Go! 🚀
      </motion.button>
    </motion.div>
  );
}
