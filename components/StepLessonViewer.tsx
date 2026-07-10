"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useVersion } from "@/lib/VersionContext";
import { useKeyboardNavigation } from "@/lib/hooks/useKeyboardNavigation";
import { useModuleTimeRemaining } from "@/lib/hooks/useModuleTimeRemaining";
import { useUserStreak } from "@/lib/hooks/useUserStreak";
import { ModuleSidebar } from "./course/ModuleSidebar";
import { ModuleIntro } from "./course/ModuleIntro";
import { KeyPointCard } from "./course/KeyPointCard";
import { BookmarkButton } from "./course/BookmarkButton";
import { NextStepPreview } from "./course/NextStepPreview";
import { StepResourcesFooter } from "./course/StepResourcesFooter";
import { ModuleBreadcrumb } from "./course/ModuleBreadcrumb";
import { VideoBackground } from "./kids-landing/VideoBackground";
import { XPRewardBadge } from "./course/XPRewardBadge";
import { MouseTrail } from "./kids-landing/MouseTrail";
import type { ModuleStep, ModuleStepSequence } from "@/lib/module-steps";

interface StepQuizState {
  answered: boolean;
  selectedIndex: number | null;
  showExplanation: boolean;
}

interface StepLessonViewerProps {
  steps: ModuleStepSequence;
  moduleId: number;
}

export function StepLessonViewer({ steps, moduleId }: StepLessonViewerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showHints, setShowHints] = useState(false);
  const [stepStartTime] = useState(Date.now());
  const [totalXP, setTotalXP] = useState(0);
  const [quizState, setQuizState] = useState<StepQuizState>({
    answered: false,
    selectedIndex: null,
    showExplanation: false,
  });
  const { version } = useVersion();
  const isKids = version === "kids";
  const { remaining, total } = useModuleTimeRemaining(steps, currentStepIndex);
  const streak = useUserStreak();

  // Calculate milestone progress
  const progress = ((currentStepIndex + 1) / steps.steps.length) * 100;
  const isMilestone = progress === 25 || progress === 50 || progress === 75 || progress === 100;
  const milestoneText = progress === 25 ? "25% Complete! 🚀" : progress === 50 ? "Halfway There! 💪" : progress === 75 ? "Almost Done! 🔥" : "Module Complete! 🎉";

  const currentStep = steps.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.steps.length - 1;

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`module-${moduleId}-progress`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentStepIndex(parsed.currentStep || 0);
      setCompletedSteps(new Set(parsed.completedSteps || []));
    }
  }, [moduleId]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      `module-${moduleId}-progress`,
      JSON.stringify({
        currentStep: currentStepIndex,
        completedSteps: Array.from(completedSteps),
      })
    );
  }, [currentStepIndex, completedSteps, moduleId]);

  const handleNext = () => {
    if (!isLastStep) {
      celebrateCompletion();
      const newCompleted = new Set(completedSteps);
      newCompleted.add(currentStepIndex);
      setCompletedSteps(newCompleted);
      setCurrentStepIndex(currentStepIndex + 1);
      setQuizState({
        answered: false,
        selectedIndex: null,
        showExplanation: false,
      });

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keyboard navigation: K for previous, J for next
  useKeyboardNavigation({
    onNext: handleNext,
    onPrevious: handleBack,
    disabled: false,
  });

  const celebrateCompletion = () => {

  useSwipeNavigation({
    onSwipeLeft: handleNext,
    onSwipeRight: handleBack,
    disabled: false,
  });
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

  return (
    <div
      className="relative w-full min-h-screen text-white overflow-x-hidden flex flex-col"
      style={{
        backgroundColor: '#0f172a',
      }}
    >
      <VideoBackground />
      <MouseTrail />

      {/* Minimal Header */}
      <div className="sticky top-0 z-40 bg-slate-900/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href={`/course/${moduleId}`}
            className="text-sm font-medium text-slate-300 hover:text-white transition"
          >
            ← Back
          </Link>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-400">
                Step {currentStepIndex + 1} of {steps.steps.length}
              </div>
              <BookmarkButton
                moduleId={moduleId}
                stepIndex={currentStepIndex}
                stepTitle={currentStep.title}
              />
            </div>
            {streak && <div className="text-orange-400 text-xs">🔥 {streak.current} day streak</div>}
          </div>
          <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8 relative z-10 flex-1">
        {/* Sidebar - Show on step 1+ */}
        {!isFirstStep && (
          <div className="hidden lg:block">
            <ModuleSidebar
              steps={steps}
              currentStepIndex={currentStepIndex}
              completedSteps={completedSteps}
              onJumpToStep={handleJumpToStep}
              isKids={isKids}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 max-w-3xl">
        {/* Minimal Module Info - Show only on first step */}
        {isFirstStep && (
          <div className="mb-6 text-xs text-slate-400">
            <span className="text-cyan-400 font-semibold">{String(moduleId).padStart(2, '0')}</span> {steps.moduleName} • {steps.steps.length} steps • {Math.round(steps.totalDuration)} min
          </div>
        )}

        {/* Step Indicator */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl border backdrop-blur-md p-6 ${
            isKids
              ? "bg-white/10 border-white/20"
              : "bg-white/5 border-white/10"
          }`}
        >
          {/* Milestone Celebration */}
          {isMilestone && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`mb-4 p-4 rounded-lg text-center font-bold text-lg ${
                isKids
                  ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-400"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
              }`}
            >
              {milestoneText}
            </motion.div>
          )}

          {/* Compact Step Metadata */}
          <div className="mb-6 flex items-center gap-3 text-xs">
            <span className="text-slate-400">
              {currentStep.type === "lesson"
                ? "📖"
                : currentStep.type === "checkpoint"
                  ? "✓"
                  : "🎯"} {currentStep.type}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{currentStep.difficulty}</span>
            <span className="text-slate-500">•</span>
            <span className="text-purple-400">+{currentStep.xpReward} XP</span>
            <span className="text-slate-500 ml-auto">~{currentStep.duration} min</span>
          </div>



          <ModuleBreadcrumb
            moduleId={moduleId}
            moduleName={steps.moduleName}
            stepIndex={currentStepIndex}
            stepTitle={currentStep.title}
          />

          {/* Step Title */}
          <h1 className="text-2xl font-bold mb-6 text-white">
            {currentStep.title}
          </h1>

          {/* Skip To Next Option */}
          {currentStep.duration > 10 && !isFirstStep && !isLastStep && (
            <div className="mb-6 flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <span className="text-xs text-slate-400">Taking too long?</span>
              <button
                onClick={handleNext}
                className="text-xs px-3 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-700/50 transition"
              >
                Jump to next step →
              </button>
            </div>
          )}

          {/* Content */}
          <div
            className={`prose prose-invert max-w-none mb-6 ${
              isKids ? "prose-invert-kids" : ""
            }`}
          >
            <MarkdownRenderer content={currentStep.content} />
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
                className={`w-full flex justify-between items-center font-bold text-left ${
                  isKids ? "text-blue-700" : "text-blue-300"
                }`}
              >
                <span>💡 Hints ({currentStep.hints.length})</span>
                <span className="text-xl">{showHints ? "−" : "+"}</span>
              </button>
              {showHints && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-2"
                >
                  {currentStep.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded text-sm ${
                        isKids
                          ? "bg-white text-blue-700 border border-blue-200"
                          : "bg-slate-800 text-blue-200 border border-blue-500/30"
                      }`}
                    >
                      <strong>Hint {idx + 1}:</strong> {hint}
                    </div>
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
              <p className={`font-bold mb-3 ${isKids ? "text-orange-700" : "text-orange-300"}`}>
                📚 Related Resources
              </p>
              <div className="space-y-2">
                {currentStep.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-2 rounded text-sm transition ${
                      isKids
                        ? "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
                        : "bg-slate-800 text-orange-200 hover:bg-slate-700 border border-orange-500/30"
                    }`}
                  >
                    <span className="font-medium">{resource.type === "docs" ? "📖" : resource.type === "video" ? "🎥" : "📄"}</span>
                    {" "}{resource.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Challenge Section */}
          {currentStep.challenge && (
            <div
              className={`rounded-lg p-6 mb-8 border-2 ${
                isKids
                  ? "bg-green-50 border-green-300"
                  : "bg-green-500/10 border-green-500/30"
              }`}
            >
              <p
                className={`font-bold text-lg mb-2 ${
                  isKids ? "text-green-700" : "text-green-300"
                }`}
              >
                {isKids ? "🎯 Your Challenge" : "✓ Challenge"}
              </p>
              <p
                className={`mb-3 ${
                  isKids ? "text-green-700" : "text-green-200"
                }`}
              >
                {currentStep.challenge.description}
              </p>
              <div
                className={`p-3 rounded mb-3 ${
                  isKids
                    ? "bg-white border border-green-200"
                    : "bg-slate-900 border border-green-500/30"
                }`}
              >
                <p className="text-xs font-mono mb-1 opacity-70">Action:</p>
                <p
                  className={`font-mono text-sm ${
                    isKids ? "text-slate-700" : "text-green-100"
                  }`}
                >
                  {currentStep.challenge.action}
                </p>
              </div>
              <p
                className={`text-sm ${
                  isKids ? "text-green-600" : "text-green-400"
                }`}
              >
                ✓ Success: {currentStep.challenge.successCriteria}
              </p>
            </div>
          )}

          {/* Quiz Section */}
          {currentStep.quiz && (
            <div
              className={`rounded-lg p-6 mb-8 border-2 ${
                isKids
                  ? "bg-purple-50 border-purple-300"
                  : "bg-purple-500/10 border-purple-500/30"
              }`}
            >
              <p
                className={`font-bold text-lg mb-4 ${
                  isKids ? "text-purple-700" : "text-purple-300"
                }`}
              >
                {isKids ? "🎯 Quick Check" : "? Quiz"}
              </p>
              <p
                className={`mb-4 ${
                  isKids ? "text-purple-700" : "text-purple-100"
                }`}
              >
                {currentStep.quiz.question}
              </p>

              <div className="space-y-2 mb-4">
                {currentStep.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!quizState.answered) {
                        setQuizState({
                          answered: true,
                          selectedIndex: idx,
                          showExplanation: true,
                        });
                      }
                    }}
                    className={`w-full p-3 rounded-lg text-left transition ${
                      quizState.selectedIndex === idx
                        ? idx === currentStep.quiz!.correctAnswer
                          ? isKids
                            ? "bg-green-200 border-2 border-green-400 text-green-800"
                            : "bg-green-500/30 border-2 border-green-500 text-green-100"
                          : isKids
                            ? "bg-red-200 border-2 border-red-400 text-red-800"
                            : "bg-red-500/30 border-2 border-red-500 text-red-100"
                        : isKids
                          ? "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50"
                          : "bg-slate-800 border border-purple-500/30 text-purple-100 hover:bg-slate-700"
                    } ${quizState.answered ? "cursor-default" : "cursor-pointer"}`}
                    disabled={quizState.answered}
                  >
                    {idx === currentStep.quiz!.correctAnswer && quizState.answered && "✓ "}
                    {idx !== currentStep.quiz!.correctAnswer && quizState.answered && idx === quizState.selectedIndex && "✗ "}
                    {option}
                  </button>
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
            </div>
          )}

          {/* Next Step Preview */}
          <NextStepPreview nextStep={steps.steps[currentStepIndex + 1]} isLastStep={isLastStep} />

          {/* Navigation Inside Box */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center gap-4">
            <button
              onClick={handleBack}
              disabled={isFirstStep}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isFirstStep
                  ? "opacity-30 cursor-not-allowed text-slate-500"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              ← Previous
            </button>

            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-slate-500">
                {isLastStep ? (
                  <span className="text-emerald-400">✓ Complete!</span>
                ) : (
                  <span>{currentStepIndex + 1} of {steps.steps.length}</span>
                )}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                K/J to navigate
              </div>
            </div>

            <button
              onClick={isLastStep ? () => (window.location.href = `/course`) : handleNext}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition text-white ${
                isLastStep
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                  : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600"
              }`}
            >
              {isLastStep ? "Back to Course" : "Next →"}
            </button>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Step Progress Mini Map (Optional - shown on side on large screens) */}
      {steps.steps.length > 1 && (
        <div className="fixed right-4 top-32 hidden xl:block">
          <div
            className={`rounded-lg p-4 border ${
              isKids
                ? "bg-white border-purple-300"
                : "bg-slate-800 border-slate-700"
            }`}
            style={{ maxWidth: "120px" }}
          >
            <p
              className={`text-xs font-bold mb-3 ${
                isKids ? "text-purple-700" : "text-slate-300"
              }`}
            >
              Progress
            </p>
            <div className="space-y-1">
              {steps.steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToStep(idx)}
                  className={`block w-full text-xs text-left px-2 py-1 rounded transition ${
                    idx === currentStepIndex
                      ? isKids
                        ? "bg-purple-500 text-white font-bold"
                        : "bg-violet-600 text-white font-bold"
                      : completedSteps.has(idx)
                        ? isKids
                          ? "bg-green-100 text-green-700"
                          : "bg-green-500/20 text-green-300"
                        : isKids
                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                  title={steps.steps[idx].title}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
