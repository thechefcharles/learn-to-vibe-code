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
    <div className="space-y-3">
      {modules.map((module) => {
        const isUnlocked = unlockedModules[module.id];
        const moduleProgress = progress.find((p) => p.module_id === module.id);
        const isCompleted = moduleProgress?.status === "completed";
        const isExpanded = expandedModules.has(module.id);
        const lessons = MODULE_LESSONS[module.id] || [];

        return (
          <div key={module.id} className="group">
            <Link
              href={isUnlocked ? `/course/${module.id}` : "#"}
              onClick={(e) => {
                if (!isUnlocked) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                toggleModule(module.id);
              }}
              className={`block p-4 rounded-lg border-2 transition ${
                !isUnlocked
                  ? "border-slate-600/30 bg-slate-900/30 opacity-40 cursor-not-allowed"
                  : isCompleted
                  ? "border-green-500/60 bg-green-900/20 hover:bg-green-900/30"
                  : "border-blue-500/60 bg-blue-900/20 hover:bg-blue-900/30 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      isCompleted
                        ? "bg-green-500/30 text-green-300"
                        : isUnlocked
                        ? "bg-blue-500/30 text-blue-300"
                        : "bg-slate-600/20 text-slate-400"
                    }`}
                  >
                    {isCompleted ? "✓" : module.id}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
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
            </Link>

            {/* Expandable lessons */}
            {isExpanded && isUnlocked && (
              <div className="mt-1 pl-4 pr-3 py-3 rounded-lg bg-slate-900/40 border-2 border-slate-700/40 space-y-2">
                {lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-slate-500 flex-shrink-0">→</span>
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
        className="block p-4 rounded-lg border-2 border-purple-500/60 bg-purple-900/20 hover:bg-purple-900/30 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-purple-500/30 text-purple-300">
              🎯
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
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
