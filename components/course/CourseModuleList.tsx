'use client';

import { useState } from "react";
import Link from "next/link";
import type { Version } from "@/lib/VersionContext";

const MODULE_LESSONS: Record<number, string[]> = {
  1: ["System Requirements", "Cursor Setup", "Claude Code Setup", "GitHub Account"],
  2: ["What is AI?", "How LLMs Work", "Prompting Basics", "Token Limits"],
  3: ["Clear Instructions", "Few-Shot Examples", "Structured Output", "Iterating"],
  4: ["Breaking Down Problems", "Spec Writing", "Requirements", "Edge Cases"],
  5: ["Installing Cursor", "Command Palette", "Chat & Edit", "AI Pairs"],
  6: ["Claude Code Intro", "Extensions", "Commands", "Workflows"],
  7: ["Design Thinking", "Wireframes", "Color & Typography", "Accessibility"],
  8: ["Database Design", "Auth Setup", "RLS Policies", "Migrations"],
  9: ["Reading Code", "Debugging", "Error Messages", "DevTools"],
  10: ["Git Basics", "Branches", "PRs & Reviews", "Collaboration"],
  11: ["Vercel Intro", "Deployment", "Environment Vars", "Monitoring"],
  12: ["Agent Patterns", "Multi-Step Tasks", "State Management", "Error Recovery"],
  13: ["Performance", "Security", "Testing", "Documentation"],
  14: ["CI/CD Pipelines", "Automation", "Scheduling", "Monitoring"],
  15: ["Refactoring Legacy", "Tech Debt", "Migrations", "Testing Strategies"],
  16: ["Current Tools", "What's Next?", "Continuing Learning", "Career Paths"],
};

interface Module {
  id: number;
  title: string;
}

interface ModuleProgress {
  module_id: number;
  status: string;
}

interface CourseModuleListProps {
  modules: Module[];
  progress: ModuleProgress[];
  unlockedModules: Record<number, boolean>;
  version: Version;
  isKids: boolean;
}

export function CourseModuleList({
  modules,
  progress,
  unlockedModules,
  version,
  isKids,
}: CourseModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className="space-y-2">
      {modules.map((module) => {
        const isUnlocked = unlockedModules[module.id];
        const moduleProgress = progress.find((p) => p.module_id === module.id);
        const isCompleted = moduleProgress?.status === "completed";
        const isExpanded = expandedModules.has(module.id);
        const lessons = MODULE_LESSONS[module.id] || [];

        return (
          <div key={module.id} className="group">
            <button
              onClick={(e) => {
                if (!isUnlocked) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                toggleModule(module.id);
              }}
              disabled={!isUnlocked}
              className={`w-full text-left p-3 rounded-lg border-2 transition ${
                !isUnlocked
                  ? "border-slate-600/40 bg-slate-900/50 opacity-50 cursor-not-allowed"
                  : isCompleted
                  ? "border-green-500/70 bg-green-900/40 hover:bg-green-900/50 backdrop-blur-sm"
                  : "border-blue-500/70 bg-blue-900/40 hover:bg-blue-900/50 cursor-pointer backdrop-blur-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      isCompleted
                        ? "bg-green-500/40 text-green-100"
                        : isUnlocked
                        ? "bg-blue-500/40 text-blue-100"
                        : "bg-slate-600/30 text-slate-300"
                    }`}
                  >
                    {isCompleted ? "✓" : module.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white drop-shadow-md">
                      {module.id}. {module.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5 drop-shadow-md">
                      {isCompleted
                        ? "✓ Completed"
                        : isUnlocked
                        ? "🔓 Unlocked"
                        : `🔒 Complete Module ${module.id - 1} first`}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-xl flex-shrink-0 transition-transform ${
                    isExpanded && isUnlocked ? "rotate-180" : ""
                  }`}
                >
                  {isUnlocked ? (isCompleted ? "✓" : "▼") : "🔒"}
                </div>
              </div>
            </button>

            {/* Expandable lessons */}
            {isExpanded && isUnlocked && (
              <div className="mt-1 pl-4 pr-3 py-2 rounded-lg bg-slate-900/60 border-2 border-slate-700/50 space-y-1 backdrop-blur-sm">
                {lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-slate-100 flex items-start gap-2 drop-shadow-md"
                  >
                    <span className="text-slate-400 flex-shrink-0">{idx + 1}.</span>
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Capstone */}
      <Link
        href="/capstone"
        className="block p-3 rounded-lg border-2 border-purple-500/60 bg-purple-900/20 hover:bg-purple-900/30 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-purple-500/30 text-purple-300">
              🎯
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isKids ? "The Grand Challenge!" : "Capstone"}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isKids
                  ? "Build your masterpiece & earn a badge! 👑"
                  : "Build & earn your credential"}
              </p>
            </div>
          </div>
          <div className="text-xl flex-shrink-0">→</div>
        </div>
      </Link>
    </div>
  );
}
