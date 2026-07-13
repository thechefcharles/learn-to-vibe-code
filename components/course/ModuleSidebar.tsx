'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ProfileMenu } from '@/components/dashboard/ProfileMenu';
import { getModuleMetadata } from '@/lib/module-metadata';
import { logEvent } from '@/lib/actions/analytics';
import type { ModuleStepSequence } from '@/lib/module-steps';

interface ModuleSidebarProps {
  steps: ModuleStepSequence;
  currentStepIndex: number;
  naturallyReachedStep?: number;
  completedSteps: Set<number>;
  onJumpToStep: (index: number) => void;
  isKids: boolean;
  currentSectionIndex?: number;
  viewedSections?: Set<number>;
  onJumpToSection?: (sectionIndex: number) => void;
  moduleId: number;
  unlockedModules?: Set<number>;
  completedModules?: Set<number>;
  user?: any;
  actualCurrentModule?: number;
}

export function ModuleSidebar({
  steps,
  currentStepIndex,
  naturallyReachedStep,
  completedSteps,
  onJumpToStep,
  isKids,
  currentSectionIndex,
  viewedSections,
  onJumpToSection,
  moduleId,
  unlockedModules,
  completedModules,
  onPreviewLessonClick,
  user,
  actualCurrentModule,
}: ModuleSidebarProps) {
  const router = useRouter();
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);

  const handleJumpToStep = (index: number) => {
    // Log the jump
    logEvent({
      event_type: 'lesson_jump',
      module_id: moduleId,
      lesson_id: index,
      data: {
        from: currentStepIndex,
        to: index,
        type: 'sidebar_jump',
      },
    });
    // Call original handler
    onJumpToStep(index);
  };

  const handleModuleSelect = (newModuleId: number) => {
    setShowModuleDropdown(false);

    // If clicking current module, do nothing
    if (newModuleId === moduleId) {
      return;
    }

    // Navigate to the selected module (includes preview mode for incomplete modules)
    const isUnlocked = unlockedModules?.has(newModuleId) ?? false;
    const href = `/course/${String(newModuleId).padStart(2, '0')}${!isUnlocked ? '?preview=true' : ''}`;
    router.push(href);
  };

  const progress = (((naturallyReachedStep ?? 0) + 1) / steps.steps.length) * 100;

  return (
    <div
      className={`sticky top-20 w-64 max-h-[calc(100vh-80px)] overflow-y-auto rounded-xl p-4 border ${
        isKids
          ? 'bg-slate-900/40 border-slate-700/50'
          : 'bg-slate-900/30 border-slate-700/50'
      }`}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center mb-4 hover:opacity-80 transition"
        title="Back to Dashboard"
      >
        <Logo variant="cosmic" size="sm" />
      </Link>

      {/* Module Selector Dropdown */}
      <div className="mb-4 relative">
        <button
          onClick={() => setShowModuleDropdown(!showModuleDropdown)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
            isKids
              ? 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/60'
              : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          <span className="text-sm font-semibold">
            Module {moduleId + 1}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showModuleDropdown ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {showModuleDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute top-full left-0 right-0 mt-1 rounded-lg border z-50 max-h-48 overflow-y-auto ${
              isKids
                ? 'bg-slate-800/80 border-slate-700/50'
                : 'bg-slate-800/80 border-slate-700/50'
            }`}
          >
            {Array.from({ length: 16 }).map((_, idx) => {
              const modId = idx;
              const meta = getModuleMetadata(modId);
              const isCurrentModule = modId === moduleId;
              const isActualCurrentModule = modId === actualCurrentModule;
              const isUnlocked = isCurrentModule || (unlockedModules?.has(modId) ?? false);
              const isCompleted = completedModules?.has(modId) ?? false;
              const isSelected = modId === moduleId;

              return (
                <button
                  key={modId}
                  onClick={() => handleModuleSelect(modId)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors border-b cursor-pointer ${
                    isSelected
                      ? isKids
                        ? 'bg-purple-200 text-purple-900'
                        : 'bg-slate-700 text-white'
                      : isUnlocked
                      ? isKids
                        ? 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : isKids
                      ? 'bg-purple-50/50 text-purple-600 opacity-60 hover:bg-purple-100/50'
                      : 'bg-slate-800/50 text-slate-500 opacity-60 hover:bg-slate-700/50'
                  } last:border-b-0`}
                >
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                      <span className="font-medium">Module {modId + 1}</span>
                      {!isUnlocked && !isActualCurrentModule && <span className="text-xs flex-shrink-0">🔒</span>}
                      {isCompleted && !isActualCurrentModule && <span className="text-xs flex-shrink-0">✓</span>}
                      <span className={`text-xs truncate ${!isUnlocked && !isActualCurrentModule ? 'text-slate-400' : 'text-slate-500'}`}>
                        {meta.title}
                      </span>
                    </div>
                    {isActualCurrentModule && (
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-500/70 text-white whitespace-nowrap flex-shrink-0">
                        Now
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Lessons Title */}
      <h3
        className={`text-sm font-bold uppercase tracking-wider mb-4 ${
          isKids ? 'text-purple-300' : 'text-slate-300'
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
            {Math.round((((naturallyReachedStep ?? 0) + 1) / steps.steps.length) * 100)}%
          </span>
          <span className={`text-xs ${isKids ? 'text-purple-700' : 'text-slate-400'}`}>
            {(naturallyReachedStep ?? 0) + 1}/{steps.steps.length}
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
            animate={{ width: `${(((naturallyReachedStep ?? 0) + 1) / steps.steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-2">
          {steps.steps.map((step, index) => {
            const isCompleted = completedSteps.has(index);
            // Show "Now" only on the lesson in the user's actual current module
            // Only show if this is the actualCurrentModule AND the user has naturally progressed to this step
            const isCurrentlyWorking = moduleId === actualCurrentModule && index === (naturallyReachedStep ?? currentStepIndex);
            // Highlight the lesson being viewed (could be preview)
            const isViewing = currentStepIndex === index;

            return (
              <div key={index}>
              <motion.button
                onClick={() => handleJumpToStep(index)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all relative border-l-3 ${
                  isViewing
                    ? 'bg-cyan-500/25 text-slate-200 shadow-lg border-l-cyan-400/50 font-bold ring-2 ring-cyan-400/30'
                    : isCompleted
                    ? 'bg-green-600/20 text-slate-300 shadow-lg hover:bg-green-600/30 border-l-green-500/50'
                    : 'bg-slate-700/15 text-slate-400 hover:bg-slate-700/30 border-l-slate-600/30'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isViewing
                          ? 'bg-cyan-400 text-slate-900'
                          : isCompleted
                          ? 'bg-green-700 text-white'
                          : 'bg-slate-600 text-slate-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{step.title}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {isCurrentlyWorking && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/70 text-white"
                      >
                        Now
                      </motion.span>
                    )}
                    {isCompleted && !isCurrentlyWorking && (
                      <span className="text-lg flex-shrink-0">✓</span>
                    )}
                  </div>
                </div>
              </motion.button>

              {/* Section sub-list when this is the current lesson and it has sections */}
              {isViewing && step.sections && step.sections.length > 0 && (
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
      {(() => {
        const progress = (((naturallyReachedStep ?? 0) + 1) / steps.steps.length) * 100;
        return progress > 0 ? (
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
        ) : null;
      })()}
    </div>
  );
}
