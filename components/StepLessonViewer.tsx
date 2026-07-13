"use client";

import { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ProfileMenu } from "@/components/dashboard/ProfileMenu";
import { useVersion } from "@/lib/VersionContext";
import { useKeyboardNavigation } from "@/lib/hooks/useKeyboardNavigation";
import { useKeyboardShortcuts } from "@/lib/hooks/useKeyboardShortcuts";
import { useModuleTimeRemaining } from "@/lib/hooks/useModuleTimeRemaining";
import { useSwipeNavigation } from "@/lib/hooks/useSwipeNavigation";
import { useUserStreak } from "@/lib/hooks/useUserStreak";
import { useUser } from "@/lib/hooks/useUser";
import { ModuleSidebar } from "./course/ModuleSidebar";
import { ModuleIntro } from "./course/ModuleIntro";
import { KeyPointCard } from "./course/KeyPointCard";
import { CodeBlockWithCopy } from "./course/CodeBlockWithCopy";
import { StepResourcesFooter } from "./course/StepResourcesFooter";
import { KeyboardShortcutsPanel } from "./course/KeyboardShortcutsPanel";
import { VideoBackground } from "./kids-landing/VideoBackground";
import { MouseTrail } from "./kids-landing/MouseTrail";
import { SectionLessonViewer } from "@/components/course/SectionLessonViewer";
import { awardXP } from "@/lib/actions/gamification";
import { logEvent } from "@/lib/actions/analytics";
import type { ModuleStep, ModuleStepSequence } from "@/lib/module-steps";

interface StepQuizState {
  answered: boolean;
  selectedIndex: number | null;
  showExplanation: boolean;
}

interface StepLessonViewerProps {
  steps: ModuleStepSequence;
  moduleId: number;
  unlockedModules?: Set<number>;
  completedModules?: Set<number>;
  user?: any;
}

export function StepLessonViewer({
  steps,
  moduleId,
  unlockedModules,
  completedModules,
  user,
}: StepLessonViewerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [naturallyReachedStep, setNaturallyReachedStep] = useState(0); // Only updated via Next button
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showHints, setShowHints] = useState(false);
  const [stepStartTime] = useState(Date.now());
  const [totalXP, setTotalXP] = useState(0);
  const [lessonCompletedTrigger, setLessonCompletedTrigger] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<StepQuizState>({
    answered: false,
    selectedIndex: null,
    showExplanation: false,
  });
  const [previewModuleId, setPreviewModuleId] = useState<number | null>(null);
  const [previewLessonIndex, setPreviewLessonIndex] = useState<number | null>(null);
  const [previewModuleSteps, setPreviewModuleSteps] = useState<ModuleStepSequence | null>(null);
  const { version } = useVersion();
  const isKids = version === "kids";
  const { remaining, total } = useModuleTimeRemaining(steps, currentStepIndex);
  const streak = useUserStreak();
  const timeGradientId = useId();
  const { shortcutsOpen, setShortcutsOpen } = useKeyboardShortcuts();

  // Circular progress: filled portion represents time remaining out of total.
  const timeRingRadius = 16;
  const timeRingCircumference = 2 * Math.PI * timeRingRadius;
  const timeRingPercent = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;
  const timeRingOffset = timeRingCircumference * (1 - timeRingPercent);

  // Calculate milestone progress (based on actual completion, not preview viewing)
  const progress = (((naturallyReachedStep ?? 0) + 1) / steps.steps.length) * 100;
  const isMilestone = progress === 25 || progress === 50 || progress === 75 || progress === 100;
  const milestoneText = progress === 25 ? "25% Complete! 🚀" : progress === 50 ? "Halfway There! 💪" : progress === 75 ? "Almost Done! 🔥" : "Module Complete! 🎉";

  // Use preview step if one is selected, otherwise use current module's step
  const displayingPreviewLesson = previewModuleId !== null && previewLessonIndex !== null && previewModuleSteps;
  const currentStep = displayingPreviewLesson && previewModuleSteps
    ? previewModuleSteps.steps[previewLessonIndex]
    : steps.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.steps.length - 1;
  const isPreviewMode = displayingPreviewLesson || currentStepIndex > naturallyReachedStep;

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`module-${moduleId}-progress`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentStepIndex(parsed.currentStep || 0);
      setCompletedSteps(new Set(parsed.completedSteps || []));
      // Load naturallyReachedStep - default to max completed step if not saved
      if (parsed.naturallyReachedStep !== undefined) {
        setNaturallyReachedStep(parsed.naturallyReachedStep);
      } else if (parsed.completedSteps && parsed.completedSteps.length > 0) {
        setNaturallyReachedStep(Math.max(...parsed.completedSteps));
      }
    }
  }, [moduleId]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      `module-${moduleId}-progress`,
      JSON.stringify({
        currentStep: currentStepIndex,
        completedSteps: Array.from(completedSteps),
        naturallyReachedStep: naturallyReachedStep,
      })
    );
  }, [currentStepIndex, completedSteps, moduleId, naturallyReachedStep]);

  const handleNext = () => {
    if (!isLastStep) {
      celebrateCompletion();
      const newCompleted = new Set(completedSteps);
      newCompleted.add(currentStepIndex);
      setCompletedSteps(newCompleted);
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      setNaturallyReachedStep(Math.max(naturallyReachedStep, nextStepIndex));
      setQuizState({
        answered: false,
        selectedIndex: null,
        showExplanation: false,
      });

      // Log navigation event
      logEvent({
        event_type: 'lesson_jump',
        module_id: moduleId,
        lesson_id: nextStepIndex,
        data: {
          from: currentStepIndex,
          to: nextStepIndex,
          type: 'natural_progression',
        },
      });

      // Reset lesson completion trigger when moving to next lesson
      setLessonCompletedTrigger(null);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    // Clear preview mode when jumping to a lesson in the current module
    setPreviewModuleId(null);
    setPreviewLessonIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviewLessonClick = async (previewModuleId: number, lessonIndex: number) => {
    setPreviewModuleId(previewModuleId);
    setPreviewLessonIndex(lessonIndex);

    // Load the preview module's steps if not already loaded
    if (!previewModuleSteps || previewModuleSteps.moduleId !== previewModuleId) {
      try {
        const { getModuleSteps } = await import('@/lib/module-steps');
        const loadedSteps = getModuleSteps(previewModuleId, isKids ? 'kids' : 'adult');
        setPreviewModuleSteps(loadedSteps);
      } catch (error) {
        console.error('Failed to load preview module steps:', error);
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keyboard navigation: K for previous, J for next
  useKeyboardNavigation({
    onNext: handleNext,
    onPrevious: handleBack,
    disabled: false,
  });

  const celebrateCompletion = () => {
    if (!isLastStep) {
      const ele = document.querySelector('[data-step-container]');
      if (ele && 'animate' in Element.prototype) {
        ele.animate(
          [
            { scale: 1, opacity: 1 },
            { scale: 1.05, opacity: 1 },
            { scale: 1, opacity: 1 },
          ],
          { duration: 600, easing: 'ease-in-out' }
        );
      }
    }
  };

  useSwipeNavigation({
    onSwipeLeft: handleNext,
    onSwipeRight: handleBack,
    disabled: false,
  });

  return (
    <div
      className="relative w-full min-h-screen text-white overflow-x-hidden flex flex-col"
      style={{
        backgroundColor: '#0f172a',
      }}
    >
      <VideoBackground />
      <MouseTrail />

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex gap-4 sm:gap-8 relative z-10 flex-1">
        {/* Sidebar - Always visible */}
        <div className="hidden lg:block w-64 flex-shrink-0">
            <ModuleSidebar
              steps={steps}
              currentStepIndex={currentStepIndex}
              naturallyReachedStep={naturallyReachedStep}
              completedSteps={completedSteps}
              onJumpToStep={handleJumpToStep}
              isKids={isKids}
              moduleId={moduleId}
              unlockedModules={unlockedModules}
              completedModules={completedModules}
              onPreviewLessonClick={handlePreviewLessonClick}
              user={user}
            />
        </div>

        {/* Main Content */}
        <div className={`flex-1 max-w-3xl ${isPreviewMode ? 'opacity-60 pointer-events-none select-none' : ''}`}>
        {/* Preview Mode Badge */}
        {isPreviewMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center gap-2 text-amber-200"
          >
            <span className="text-lg">👀</span>
            <span className="text-sm font-medium">Preview Mode — Complete earlier lessons to unlock</span>
          </motion.div>
        )}

        {/* Step Indicator */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl border backdrop-blur-md p-6 sm:p-8 relative ${
            isKids
              ? "bg-white/10 border-white/20"
              : "bg-white/5 border-white/10"
          }`}
          style={{
            borderLeft: "3px solid #a78bfa",
            boxShadow: "inset 3px 0 0 0 rgba(6, 182, 212, 0.5)"
          } as React.CSSProperties}
          data-step-container
        >
          {/* Module Name & Time - integrated into content box */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div
              className="text-2xl sm:text-3xl font-black tracking-tighter"
              style={{
                backgroundImage: isKids
                  ? "linear-gradient(to right, #8b5cf6, #ec4899)"
                  : "linear-gradient(to right, #06b6d4, #a78bfa, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {steps.moduleName}
            </div>
            {/* Right side: Time + Profile */}
            <div className="flex items-center gap-3">
              {/* Time indicator */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
              <div
                className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20"
                title={`${remaining} minutes remaining out of ${total} total`}
                role="img"
                aria-label={`${remaining} of ${total} minutes remaining in this module`}
              >
                <svg width="28" height="28" viewBox="0 0 36 36" className="-rotate-90 flex-shrink-0">
                  <defs>
                    <linearGradient id={timeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="18"
                    cy="18"
                    r={timeRingRadius}
                    fill="none"
                    stroke={isKids ? "rgba(126,34,206,0.2)" : "rgba(6,182,212,0.15)"}
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={timeRingRadius}
                    fill="none"
                    stroke={`url(#${timeGradientId})`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={timeRingCircumference}
                    strokeDashoffset={timeRingOffset}
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                  />
                </svg>
                <div className="text-left leading-tight">
                  <span className={`block text-xs font-bold bg-gradient-to-r ${isKids ? 'from-purple-400 to-purple-300 bg-clip-text text-transparent' : 'from-cyan-400 to-purple-400 bg-clip-text text-transparent'}`}>
                    {remaining}
                  </span>
                  <span className={`block text-[9px] uppercase tracking-widest font-semibold ${isKids ? 'text-purple-400/70' : 'text-cyan-400/70'}`}>
                    min left
                  </span>
                </div>
              </div>
              </motion.div>
              {/* Profile Menu */}
              {user && (
                <div className="hidden sm:block">
                  <ProfileMenu userName={user.email?.split('@')[0] || 'User'} />
                </div>
              )}
            </div>
          </div>

          {/* Lesson Title */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white font-semibold">
            Lesson {currentStepIndex + 1}: {currentStep.title}
          </h2>

          {/* Milestone Celebration */}
          {isMilestone && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`mb-6 p-4 rounded-lg text-center font-bold text-lg ${
                isKids
                  ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-400"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
              }`}
            >
              {milestoneText}
            </motion.div>
          )}

          {/* Info Box - Time & Difficulty */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg p-3 mb-8 border flex flex-col sm:flex-row gap-4 sm:gap-6 ${
              isKids
                ? "bg-blue-50 border-blue-200"
                : "bg-blue-500/10 border-blue-500/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${isKids ? 'text-blue-900' : 'text-blue-300'}`}>
                  Estimated Time
                </p>
                <p className={`text-sm font-medium ${isKids ? 'text-blue-900' : 'text-blue-200'}`}>
                  {currentStep.duration} minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${isKids ? 'text-blue-900' : 'text-blue-300'}`}>
                  Difficulty
                </p>
                <p className={`text-sm font-medium capitalize ${isKids ? 'text-blue-900' : 'text-blue-200'}`}>
                  {currentStep.difficulty}
                </p>
              </div>
            </div>
            {currentStep.xpReward > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isKids ? 'text-blue-900' : 'text-blue-300'}`}>
                    XP Reward
                  </p>
                  <p className={`text-sm font-medium ${isKids ? 'text-blue-900' : 'text-blue-200'}`}>
                    +{currentStep.xpReward} XP
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {currentStep.sections ? (
            <div className="mb-6">
              {/* NOTE: Section navigation is owned entirely by SectionLessonViewer via localStorage.
                  Future enhancement: refactor to use React Context if we need to expose section state
                  at the StepLessonViewer level for sidebar section jumps or breadcrumb updates.
                  For MVP, section list in sidebar is display-only. */}
              <SectionLessonViewer
                step={currentStep}
                moduleId={moduleId}
                isKids={isKids}
                onLessonComplete={() => {
                  setLessonCompletedTrigger(currentStepIndex);
                  // Mark lesson as complete in module progress
                  const moduleProgress = JSON.parse(
                    localStorage.getItem(`module-${moduleId}-progress`) || "{}"
                  );
                  const newCompleted = new Set(moduleProgress.completedSteps || []);
                  newCompleted.add(currentStepIndex);
                  localStorage.setItem(
                    `module-${moduleId}-progress`,
                    JSON.stringify({
                      ...moduleProgress,
                      completedSteps: Array.from(newCompleted),
                    })
                  );
                  // Award XP via server action. The server resolves the
                  // current user from the session and looks up the XP
                  // amount from its own step catalog — it does not trust
                  // client-supplied user ids or XP amounts.
                  if (user) {
                    awardXP(moduleId, currentStep.id).catch(console.error);
                  }
                }}
              />
            </div>
          ) : (
            // Legacy single-content rendering
            <>
              {/* Content */}
              <div
                className={`prose prose-invert max-w-none mb-8 leading-[1.75] ${
                  isKids ? "prose-invert-kids" : ""
                }`}
              >
                <MarkdownRenderer content={currentStep.content || ""} />
              </div>

              {/* Code Block */}
              {currentStep.codeBlock && (
                <div className="mb-8">
                  <CodeBlockWithCopy
                    code={currentStep.codeBlock.code}
                    language={currentStep.codeBlock.language}
                  />
                </div>
              )}

              {/* Key Point */}
              {currentStep.keyPoint && <KeyPointCard keyPoint={currentStep.keyPoint} />}

              {/* Hints Section */}
              {currentStep.hints && currentStep.hints.length > 0 && (
                <div
                  className={`rounded-lg p-4 mb-8 border ${
                    isKids
                      ? "bg-blue-50 border-blue-300"
                      : "bg-blue-500/10 border-blue-500/30"
                  }`}
                >
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className={`w-full flex justify-between items-center font-bold text-left uppercase text-xs tracking-wider transition-all duration-200 py-1 ${
                      isKids ? "text-blue-700 hover:text-blue-800" : "text-blue-300 hover:text-blue-200"
                    }`}
                  >
                    <span>💡 Hints ({currentStep.hints.length})</span>
                    <motion.span
                      animate={{ rotate: showHints ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg"
                    >
                      {showHints ? "−" : "+"}
                    </motion.span>
                  </button>
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-3"
                    >
                      {currentStep.hints.map((hint, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          className={`p-3 rounded text-sm leading-relaxed ${
                            isKids
                              ? "bg-white text-blue-700 border border-blue-200"
                              : "bg-slate-800 text-blue-200 border border-blue-500/30"
                          }`}
                        >
                          <strong className="uppercase text-xs tracking-wider block mb-1">Hint {idx + 1}:</strong>
                          <span>{hint}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Resources Section */}
              {currentStep.resources && currentStep.resources.length > 0 && (
                <div
                  className={`rounded-lg p-4 mb-8 border ${
                    isKids
                      ? "bg-orange-50 border-orange-300"
                      : "bg-orange-500/10 border-orange-500/30"
                  }`}
                >
                  <p className={`font-bold mb-4 uppercase text-xs tracking-wider ${isKids ? "text-orange-700" : "text-orange-300"}`}>
                    📚 Related Resources
                  </p>
                  <div className="space-y-3">
                    {currentStep.resources.map((resource, idx) => (
                      <motion.a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className={`block p-3 rounded text-sm transition duration-200 ${
                          isKids
                            ? "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
                            : "bg-slate-800 text-orange-200 hover:bg-slate-700 border border-orange-500/30"
                        }`}
                      >
                        <span className="font-medium mr-2">{resource.type === "docs" ? "📖" : resource.type === "video" ? "🎥" : "📄"}</span>
                        <span className="font-medium">{resource.title}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenge Section */}
              {currentStep.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-6 mb-8 border-2 ${
                    isKids
                      ? "bg-green-50 border-green-300"
                      : "bg-green-500/10 border-green-500/30"
                  }`}
                >
                  <p
                    className={`font-bold text-lg mb-4 uppercase text-xs tracking-wider ${
                      isKids ? "text-green-700" : "text-green-300"
                    }`}
                  >
                    {isKids ? "🎯 Your Challenge" : "✓ Challenge"}
                  </p>
                  <p
                    className={`mb-4 leading-relaxed ${
                      isKids ? "text-green-700" : "text-green-200"
                    }`}
                  >
                    {currentStep.challenge.description}
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`p-4 rounded mb-4 border ${
                      isKids
                        ? "bg-white border-green-200"
                        : "bg-slate-900 border-green-500/30"
                    }`}
                  >
                    <p className="text-xs font-mono mb-2 opacity-70 uppercase tracking-wider font-bold">Action:</p>
                    <p
                      className={`font-mono text-sm leading-relaxed ${
                        isKids ? "text-slate-700" : "text-green-100"
                      }`}
                    >
                      {currentStep.challenge.action}
                    </p>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      isKids ? "text-green-600" : "text-green-400"
                    }`}
                  >
                    ✓ Success: {currentStep.challenge.successCriteria}
                  </motion.p>
                </motion.div>
              )}

              {/* Quiz Section */}
              {currentStep.quiz && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg p-6 mb-8 border-2 ${
                    isKids
                      ? "bg-purple-50 border-purple-300"
                      : "bg-purple-500/10 border-purple-500/30"
                  }`}
                >
                  <p
                    className={`font-bold text-lg mb-4 uppercase text-xs tracking-wider ${
                      isKids ? "text-purple-700" : "text-purple-300"
                    }`}
                  >
                    {isKids ? "🎯 Quick Check" : "? Quiz"}
                  </p>
                  <p
                    className={`mb-6 text-base leading-relaxed font-medium ${
                      isKids ? "text-purple-700" : "text-purple-100"
                    }`}
                  >
                    {currentStep.quiz.question}
                  </p>

                  <div className="space-y-3 mb-6">
                    {currentStep.quiz.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          if (!quizState.answered && !isPreviewMode) {
                            const isCorrect = idx === currentStep.quiz!.correctAnswer;
                            setQuizState({
                              answered: true,
                              selectedIndex: idx,
                              showExplanation: true,
                            });

                            // Log quiz attempt
                            logEvent({
                              event_type: 'quiz_answer',
                              module_id: moduleId,
                              lesson_id: currentStepIndex,
                              data: {
                                questionIndex: currentStepIndex,
                                selectedOption: idx,
                                correct: isCorrect,
                                question: currentStep.quiz?.question,
                              },
                            });
                          }
                        }}
                        whileHover={!quizState.answered && !isPreviewMode ? { scale: 1.01, y: -2 } : {}}
                        whileTap={!quizState.answered && !isPreviewMode ? { scale: 0.99 } : {}}
                        className={`w-full p-4 rounded-lg text-left transition-all duration-200 font-medium ${
                          quizState.selectedIndex === idx
                            ? idx === currentStep.quiz!.correctAnswer
                              ? isKids
                                ? "bg-green-200 border-2 border-green-400 text-green-800 shadow-lg"
                                : "bg-green-500/30 border-2 border-green-500 text-green-100 shadow-lg shadow-green-500/30"
                              : isKids
                                ? "bg-red-200 border-2 border-red-400 text-red-800 shadow-lg"
                                : "bg-red-500/30 border-2 border-red-500 text-red-100 shadow-lg shadow-red-500/30"
                            : isKids
                              ? "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50"
                              : "bg-slate-800 border border-purple-500/30 text-purple-100 hover:bg-slate-700"
                        } ${quizState.answered || isPreviewMode ? "cursor-default" : "cursor-pointer"}`}
                        disabled={quizState.answered || isPreviewMode}
                      >
                        {idx === currentStep.quiz!.correctAnswer && quizState.answered && <span className="font-bold mr-2">✓</span>}
                        {idx !== currentStep.quiz!.correctAnswer && quizState.answered && idx === quizState.selectedIndex && <span className="font-bold mr-2">✗</span>}
                        {option}
                      </motion.button>
                    ))}
                  </div>

                  {quizState.showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg border-l-4 ${
                        quizState.selectedIndex === currentStep.quiz!.correctAnswer
                          ? isKids
                            ? "bg-green-100 border-green-400 text-green-800"
                            : "bg-green-500/20 border-green-500 text-green-200"
                          : isKids
                            ? "bg-red-100 border-red-400 text-red-800"
                            : "bg-red-500/20 border-red-500 text-red-200"
                      }`}
                    >
                      <p className="font-bold mb-1">
                        {quizState.selectedIndex === currentStep.quiz!.correctAnswer
                          ? isKids
                            ? "🎉 Correct!"
                            : "✓ Correct"
                          : isKids
                            ? "💡 Not quite!"
                            : "✗ Try again"}
                      </p>
                      <p className="text-sm">{currentStep.quiz.explanation}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </>
          )}

          {/* Resources Footer */}
          <StepResourcesFooter
            resources={currentStep.resources}
            nextStepTitle={!isLastStep ? steps.steps[currentStepIndex + 1]?.title : undefined}
          />
          {/* Navigation Inside Box */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <motion.button
              onClick={handleBack}
              disabled={isFirstStep}
              whileHover={!isFirstStep ? { y: -2 } : {}}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isFirstStep
                  ? "opacity-30 cursor-not-allowed text-slate-500"
                  : "text-slate-300 hover:text-white hover:bg-white/10 active:scale-95"
              }`}
            >
              ← Previous
            </motion.button>

            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-slate-500 font-semibold">
                {isLastStep ? (
                  <span className="text-emerald-400">✓ Complete! +{currentStep.xpReward} XP</span>
                ) : (
                  <span>{currentStepIndex + 1} of {steps.steps.length}</span>
                )}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                K/J to navigate
              </div>
              <span className="text-slate-600 text-xs mt-1 sm:hidden">Swipe to navigate</span>
            </div>

            <motion.button
              onClick={isLastStep ? () => (window.location.href = `/course`) : handleNext}
              disabled={isPreviewMode || (currentStep.sections ? lessonCompletedTrigger !== currentStepIndex : false)}
              whileHover={!isPreviewMode && !(currentStep.sections && lessonCompletedTrigger !== currentStepIndex) ? { scale: 1.02, y: -2 } : {}}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 text-white ${
                isPreviewMode || (currentStep.sections && lessonCompletedTrigger !== currentStepIndex)
                  ? "opacity-30 cursor-not-allowed"
                  : isLastStep
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg hover:shadow-emerald-500/50"
                    : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/50"
              }`}
            >
              {isPreviewMode
                ? "Preview Mode"
                : currentStep.sections && lessonCompletedTrigger !== currentStepIndex
                ? "Complete all sections to continue"
                : isLastStep
                  ? "Back to Course"
                  : "Next →"}
            </motion.button>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

    </div>
  );
}
