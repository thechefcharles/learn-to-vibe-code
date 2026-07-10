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
      className={`rounded-2xl p-8 border-2 ${
        isKids
          ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 border-purple-300'
          : 'bg-gradient-to-br from-slate-800 to-slate-700 border-cyan-500/30'
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
            {steps.moduleTitle}
          </h1>
          <p className={`text-sm ${isKids ? 'text-purple-700' : 'text-slate-400'}`}>
            {steps.description}
          </p>
        </div>
      </div>

      {/* Learning Objectives */}
      {steps.learningObjectives && steps.learningObjectives.length > 0 && (
        <div className="mb-6">
          <h3 className={`font-semibold mb-3 ${isKids ? 'text-purple-900' : 'text-white'}`}>
            By the end, you'll be able to:
          </h3>
          <ul className="space-y-2">
            {steps.learningObjectives.map((objective, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className={`text-lg flex-shrink-0 ${
                    isKids ? 'text-purple-500' : 'text-cyan-400'
                  }`}
                >
                  ✓
                </span>
                <span className={`text-sm ${isKids ? 'text-purple-800' : 'text-slate-300'}`}>
                  {objective}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
          isKids
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'
        }`}
      >
        Let's Go! 🚀
      </motion.button>
    </motion.div>
  );
}
