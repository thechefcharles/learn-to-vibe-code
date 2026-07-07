"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useVersion } from "@/lib/VersionContext";
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
  const [quizState, setQuizState] = useState<StepQuizState>({
    answered: false,
    selectedIndex: null,
    showExplanation: false,
  });
  const { version } = useVersion();
  const isKids = version === "kids";

  const currentStep = steps.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.steps.length) * 100;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div
        className={`sticky top-0 z-40 border-b ${
          isKids
            ? "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300"
            : "bg-slate-800/80 border-slate-700"
        } backdrop-blur`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <Link
              href={`/course/${moduleId}`}
              className={`text-sm font-medium transition ${
                isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"
              }`}
            >
              ← Back to Module
            </Link>
            <div
              className={`text-sm font-medium ${
                isKids ? "text-purple-700" : "text-slate-300"
              }`}
            >
              Step {currentStepIndex + 1} of {steps.steps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className={`h-2 rounded-full overflow-hidden ${
              isKids ? "bg-purple-200" : "bg-slate-700"
            }`}
          >
            <motion.div
              className={`h-full rounded-full ${
                isKids
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step Type Badge */}
          <div className="mb-4 inline-block">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentStep.type === "lesson"
                  ? isKids
                    ? "bg-blue-100 text-blue-700"
                    : "bg-blue-500/20 text-blue-300"
                  : currentStep.type === "checkpoint"
                    ? isKids
                      ? "bg-green-100 text-green-700"
                      : "bg-green-500/20 text-green-300"
                    : isKids
                      ? "bg-purple-100 text-purple-700"
                      : "bg-purple-500/20 text-purple-300"
              }`}
            >
              {currentStep.type === "lesson"
                ? "📖 Lesson"
                : currentStep.type === "checkpoint"
                  ? "✓ Checkpoint"
                  : "🎯 Quiz"}
            </span>
            <span
              className={`ml-3 text-sm ${
                isKids ? "text-purple-600" : "text-slate-400"
              }`}
            >
              ~{currentStep.duration} min read
            </span>
          </div>

          {/* Step Title */}
          <h1
            className={`text-4xl font-bold mb-8 ${
              isKids ? "text-purple-700" : "text-white"
            }`}
          >
            {currentStep.title}
          </h1>

          {/* Content */}
          <div
            className={`prose prose-invert max-w-none mb-12 ${
              isKids ? "prose-invert-kids" : ""
            }`}
          >
            <MarkdownRenderer content={currentStep.content} />
          </div>

          {/* Code Block */}
          {currentStep.codeBlock && (
            <div
              className={`rounded-lg p-6 mb-8 border ${
                isKids
                  ? "bg-slate-900 border-purple-300 text-white"
                  : "bg-slate-950 border-slate-700"
              }`}
            >
              <pre
                className={`text-sm font-mono overflow-x-auto ${
                  isKids ? "text-slate-100" : "text-slate-300"
                }`}
              >
                <code>{currentStep.codeBlock.code}</code>
              </pre>
            </div>
          )}

          {/* Key Point */}
          {currentStep.keyPoint && (
            <div
              className={`rounded-lg p-4 mb-8 border-l-4 ${
                isKids
                  ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                  : "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
              }`}
            >
              <p className="font-medium">💡 Key Point</p>
              <p className="text-sm mt-1">{currentStep.keyPoint}</p>
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
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="bg-slate-800/50 border-t border-slate-700 sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center gap-4">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              isFirstStep
                ? "opacity-50 cursor-not-allowed"
                : isKids
                  ? "bg-slate-600 hover:bg-slate-700 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
            }`}
          >
            ← Back
          </button>

          <div className="flex-1 text-center">
            <p
              className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}
            >
              {isLastStep ? "Module Complete!" : "Step by step..."}
            </p>
          </div>

          <button
            onClick={isLastStep ? () => (window.location.href = `/course`) : handleNext}
            className={`px-6 py-2 rounded-lg font-medium transition text-white ${
              isKids
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            }`}
          >
            {isLastStep ? "Back to Course" : "Next →"}
          </button>
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
