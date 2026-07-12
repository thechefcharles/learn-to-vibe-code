'use client';

import { motion } from 'framer-motion';
import type { ModuleStepSequence } from '@/lib/module-steps';

interface ModuleSidebarProps {
  steps: ModuleStepSequence;
  currentStepIndex: number;
  completedSteps: Set<number>;
  onJumpToStep: (index: number) => void;
  isKids: boolean;
  currentSectionIndex?: number;
  viewedSections?: Set<number>;
  onJumpToSection?: (sectionIndex: number) => void;
}

export function ModuleSidebar({
  steps,
  currentStepIndex,
  completedSteps,
  onJumpToStep,
  isKids,
  currentSectionIndex,
  viewedSections,
  onJumpToSection,
}: ModuleSidebarProps) {
  const progress = ((currentStepIndex + 1) / steps.steps.length) * 100;

  return (
    <div
      className={`sticky top-20 w-64 max-h-[calc(100vh-80px)] overflow-y-auto rounded-xl p-4 border ${
        isKids
          ? 'bg-gradient-to-b from-purple-50 to-pink-50 border-purple-200'
          : 'bg-slate-800/50 border-slate-700'
      }`}
    >
      {/* Lessons Title */}
      <h3
        className={`text-sm font-bold uppercase tracking-wider mb-4 ${
          isKids ? 'text-purple-900' : 'text-white'
        }`}
      >
        Lessons
      </h3>

      {/* Progress Bar */}
      <div
        className={`mb-6 p-3 rounded-lg ${
          isKids ? 'bg-purple-100' : 'bg-slate-700'
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-semibold ${isKids ? 'text-purple-900' : 'text-white'}`}>
            {Math.round(progress)}%
          </span>
          <span className={`text-xs ${isKids ? 'text-purple-700' : 'text-slate-400'}`}>
            {currentStepIndex + 1}/{steps.steps.length}
          </span>
        </div>
        <div
          className={`h-2 rounded-full overflow-hidden ${
            isKids ? 'bg-purple-200' : 'bg-slate-600'
          }`}
        >
          <motion.div
            className={`h-full ${
              isKids
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-cyan-500 to-purple-600'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-2">
        {steps.steps.map((step, index) => {
          const isCompleted = completedSteps.has(index);
          const isCurrent = currentStepIndex === index;

          return (
            <div key={index}>
              <motion.button
                onClick={() => onJumpToStep(index)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all relative border-l-3 ${
                  isCurrent
                    ? isKids
                      ? 'bg-purple-300/40 text-purple-900 shadow-lg border-l-purple-500 font-semibold'
                      : 'bg-purple-500/30 text-white shadow-lg border-l-purple-400 font-semibold'
                    : isCompleted
                    ? isKids
                      ? 'bg-green-400/30 text-white shadow-lg hover:bg-green-400/40 border-l-green-500'
                      : 'bg-green-600/30 text-white shadow-lg hover:bg-green-600/40 border-l-green-500'
                    : isKids
                    ? 'bg-white/30 text-purple-900 hover:bg-white/50 border-l-transparent'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border-l-slate-600'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isCurrent
                          ? isKids
                            ? 'bg-purple-500 text-white'
                            : 'bg-cyan-400 text-slate-900'
                          : isCompleted
                          ? isKids
                            ? 'bg-green-600 text-white'
                            : 'bg-green-700 text-white'
                          : isKids
                          ? 'bg-purple-300 text-purple-700'
                          : 'bg-slate-600 text-slate-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{step.title}</span>
                  </div>
                  {isCompleted && (
                    <span className="text-lg flex-shrink-0 ml-2">✓</span>
                  )}
                </div>
              </motion.button>

              {/* Section sub-list when this is the current lesson and it has sections */}
              {isCurrent && step.sections && step.sections.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="ml-7 mt-1 space-y-1"
                >
                  {step.sections.map((section, sIdx) => {
                    const sectionViewed = viewedSections?.has(sIdx);
                    const sectionCurrent = currentSectionIndex === sIdx;
                    return (
                      <motion.button
                        key={sIdx}
                        onClick={() => onJumpToSection?.(sIdx)}
                        className={`w-full text-left px-2 py-1.5 text-xs rounded transition-all ${
                          sectionCurrent
                            ? isKids
                              ? 'bg-purple-200 text-purple-900'
                              : 'bg-cyan-500/20 text-cyan-300'
                            : sectionViewed
                            ? isKids
                              ? 'bg-green-100 text-green-900'
                              : 'bg-green-600/20 text-green-400'
                            : isKids
                            ? 'bg-white/30 text-purple-900'
                            : 'bg-slate-700/50 text-slate-400'
                        }`}
                        whileHover={{ x: 2 }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">
                            {sectionViewed ? '✓' : '○'}
                          </span>
                          <span className="truncate font-medium">{section.heading}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Milestone Badge */}
      {progress > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-6 p-3 rounded-lg text-center text-sm font-semibold ${
            progress === 100
              ? isKids
                ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-900'
                : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300'
              : isKids
              ? 'bg-blue-100 text-blue-900'
              : 'bg-blue-500/20 text-blue-300'
          }`}
        >
          {progress === 100
            ? '🎉 Complete!'
            : progress >= 75
            ? '🔥 Almost there!'
            : progress >= 50
            ? '💪 Halfway!'
            : '🚀 Getting started'}
        </motion.div>
      )}
    </div>
  );
}
