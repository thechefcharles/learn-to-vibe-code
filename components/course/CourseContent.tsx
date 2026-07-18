'use client';

import { getAllModuleProgress, isModuleUnlocked, getUserEnrolledVersion } from "@/lib/actions/course";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getModuleMetadata } from "@/lib/module-metadata";
import type { Version } from "@/lib/VersionContext";
import { useState, useEffect } from "react";

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

export function CourseContent() {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<any[]>([]);
  const [unlockedModules, setUnlockedModules] = useState<Record<number, boolean>>({});
  const [version, setVersion] = useState<Version>("adult");
  const [isKids, setIsKids] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const user = await getUser();
      if (!user) {
        redirect("/auth/sign-in");
      }

      const progressData = await getAllModuleProgress();
      setProgress(progressData);

      const enrolledVersion = (await getUserEnrolledVersion()) as Version || "adult";
      setVersion(enrolledVersion);
      setIsKids(enrolledVersion === "kids");

      const unlockedStatusesPromises = Array.from({ length: 16 }, (_, i) =>
        isModuleUnlocked(i + 1).then(unlocked => ({ moduleId: i + 1, unlocked }))
      );
      const unlockedStatuses = await Promise.all(unlockedStatusesPromises);
      const unlockedMap: Record<number, boolean> = {};
      unlockedStatuses.forEach(({ moduleId, unlocked }) => {
        unlockedMap[moduleId] = unlocked;
      });
      setUnlockedModules(unlockedMap);
    };

    loadData();
  }, []);

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const modules = [];
  for (let i = 1; i <= 16; i++) {
    const meta = getModuleMetadata(i);
    modules.push({ id: i, title: meta.title });
  }

  return (
    <div
      className="min-h-screen py-8 px-4 relative"
      style={{
        backgroundImage: 'url(/course-map-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Content container */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex justify-between items-start mb-8 gap-6">
          <div>
            <h1 className="text-5xl font-bold mb-2 text-white drop-shadow-lg">
              {isKids ? "Course Map 🗺️" : "Course Map"}
            </h1>
            <p className="text-lg text-white drop-shadow-md">
              {isKids
                ? "Unlock 16 modules! 🎮 From hello-world to live apps! 🚀"
                : "Learn to build with AI, step by step. 16 modules, from setup to production."}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            {isKids ? "My Progress" : "→ Dashboard"}
          </Link>
        </div>

        {/* Modules Grid */}
        <div className="space-y-3">
          {modules.map((module) => {
            const isUnlocked = unlockedModules[module.id];
            const moduleProgress = progress.find((p: any) => p.module_id === module.id);
            const isCompleted = moduleProgress?.status === "completed";
            const isExpanded = expandedModules.has(module.id);
            const lessons = MODULE_LESSONS[module.id] || [];

            return (
              <div key={module.id} className="group">
                <button
                  onClick={() => toggleModule(module.id)}
                  disabled={!isUnlocked}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
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
                    <div className={`text-xl flex-shrink-0 transition-transform ${isExpanded && isUnlocked ? 'rotate-180' : ''}`}>
                      {isUnlocked ? (isCompleted ? "✓" : "▼") : "🔒"}
                    </div>
                  </div>
                </button>

                {/* Expandable lessons */}
                {isExpanded && isUnlocked && (
                  <div className="mt-1 pl-4 pr-3 py-3 rounded-lg bg-slate-900/40 border-2 border-slate-700/40 space-y-2">
                    {lessons.map((lesson, idx) => (
                      <div key={idx} className="text-sm text-slate-300 flex items-start gap-2">
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
          <button
            onClick={() => {
              window.location.href = "/capstone";
            }}
            className="w-full text-left p-4 rounded-lg border-2 border-purple-500/60 bg-purple-900/20 hover:bg-purple-900/30 transition cursor-pointer group"
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
                    {isKids ? "Build your masterpiece & earn a badge! 👑" : "Build & earn your credential"}
                  </p>
                </div>
              </div>
              <div className="text-xl flex-shrink-0">→</div>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-lg bg-slate-900/60 border border-slate-700/40 backdrop-blur-sm">
          <h3 className="text-base font-bold text-white mb-2">
            {isKids ? "🎮 What You'll Learn" : "About This Course"}
          </h3>
          <p className="text-sm text-slate-300">
            {isKids
              ? "16 levels to complete! You'll learn to build real apps using AI tools, frameworks, and deployment. By the end, you'll ship a live project! 🚀"
              : "A hands-on path from zero to deployed app. You'll learn with Cursor, Claude Code, Next.js, Supabase, and Vercel. Ship a live project and earn a verifiable credential."}
          </p>
        </div>
      </div>
    </div>
  );
}
