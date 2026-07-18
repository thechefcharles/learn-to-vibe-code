"use client";

import { useState } from "react";
import type { ModuleQuiz } from "@/lib/quizzes";

interface DemoQuizViewerProps {
  quiz: ModuleQuiz;
}

export default function DemoQuizViewer({ quiz }: DemoQuizViewerProps) {
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (index: number) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="space-y-6">
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          {/* Question */}
          <p className="text-lg font-bold text-white mb-4">
            {qIndex + 1}. {question.text}
          </p>

          {/* Options */}
          <fieldset className="space-y-3 mb-6">
            <legend className="sr-only">Answer options for question {qIndex + 1}</legend>
            {question.options.map((option, oIndex) => {
              const optionId = `q${qIndex}-opt${oIndex}`;
              return (
                <label
                  key={oIndex}
                  htmlFor={optionId}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition cursor-pointer ${
                    oIndex === question.correctAnswer
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    id={optionId}
                    name={`question-${qIndex}`}
                    value={oIndex}
                    checked={false}
                    disabled
                    className="w-6 h-6 mt-1 cursor-pointer"
                    aria-label={option}
                  />
                  <p className="text-slate-300 flex-1">{option}</p>
                  {oIndex === question.correctAnswer && (
                    <span className="text-green-400 font-bold">✓</span>
                  )}
                </label>
              );
            })}
          </fieldset>

          {/* Answer Toggle */}
          <button
            onClick={() => toggleAnswer(qIndex)}
            className="w-full text-left px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-slate-300 text-sm font-medium"
          >
            {expandedAnswers[qIndex] ? "Hide Explanation" : "Show Explanation"}
          </button>

          {/* Explanation */}
          {expandedAnswers[qIndex] && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-slate-300 mb-2">
                <span className="font-bold text-green-400">Correct Answer:</span> {String.fromCharCode(65 + question.correctAnswer)}
              </p>
              {question.explanation && (
                <p className="text-sm text-slate-400">{question.explanation}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Summary */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <p className="text-blue-400 font-medium mb-2">Quiz Summary</p>
        <p className="text-slate-400 text-sm">
          This quiz has {quiz.questions.length} questions. In the full course, you need to score 80% or higher to pass and unlock the next module.
        </p>
      </div>
    </div>
  );
}
