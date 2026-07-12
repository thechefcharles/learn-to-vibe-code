'use client';

import { useState } from 'react';
import { ChevronDown, Lock, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { getModuleMetadata } from '@/lib/module-metadata';
import type { ModuleStep } from '@/lib/module-steps';

interface ModuleTreeViewProps {
  currentModuleId: number;
  currentLessonId?: number;
  unlockedModules: Set<number>;
  completedModules: Set<number>;
  lessonsByModule: Record<number, { id: number; title: string; sections?: any[] }[]>;
}

export function ModuleTreeView({
  currentModuleId,
  currentLessonId,
  unlockedModules,
  completedModules,
  lessonsByModule,
}: ModuleTreeViewProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set([currentModuleId])
  );

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const isModuleUnlocked = (moduleId: number) => unlockedModules.has(moduleId);
  const isModuleCompleted = (moduleId: number) => completedModules.has(moduleId);

  const getStatusIcon = (isLocked: boolean, isCompleted: boolean) => {
    if (isLocked) {
      return <Lock className="w-4 h-4 text-slate-500" />;
    }
    if (isCompleted) {
      return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
    return <Circle className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 16 }).map((_, idx) => {
        const moduleId = idx;
        const metadata = getModuleMetadata(moduleId);
        const isUnlocked = isModuleUnlocked(moduleId);
        const isCompleted = isModuleCompleted(moduleId);
        const isExpanded = expandedModules.has(moduleId);
        const lessons = lessonsByModule[moduleId] || [];
        const isCurrentModule = moduleId === currentModuleId;

        return (
          <div key={moduleId} className="flex flex-col">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(moduleId)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left w-full ${
                isCurrentModule
                  ? 'bg-indigo-500/20 border border-indigo-500/50'
                  : 'hover:bg-slate-700/50'
              } ${!isUnlocked ? 'opacity-60' : ''}`}
            >
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform ${
                  isExpanded ? 'rotate-0' : '-rotate-90'
                }`}
              />
              {getStatusIcon(!isUnlocked, isCompleted)}
              <span className="flex-1 min-w-0 text-sm font-medium truncate text-slate-200">
                {`Module ${String(moduleId).padStart(2, '0')}`}
              </span>
              {!isUnlocked && <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />}
            </button>

            {/* Module Title (Subtitle) */}
            <div className="px-3 text-xs text-slate-400 truncate">
              {metadata.title}
            </div>

            {/* Expanded Lessons */}
            {isExpanded && isUnlocked && (
              <div className="ml-4 mt-2 flex flex-col gap-1 border-l border-slate-700/50 pl-3">
                {lessons.map((lesson) => (
                  <div key={`lesson-${moduleId}-${lesson.id}`} className="flex flex-col">
                    {/* Lesson Item */}
                    <Link
                      href={`/course/${String(moduleId).padStart(2, '0')}`}
                      className={`flex items-center gap-2 px-2 py-1 rounded text-sm transition-colors ${
                        currentLessonId === lesson.id
                          ? 'bg-indigo-500/30 text-indigo-200'
                          : 'text-slate-300 hover:bg-slate-700/30 hover:text-slate-100'
                      }`}
                    >
                      <Circle className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{lesson.title}</span>
                    </Link>

                    {/* Sections (if multi-section lesson) */}
                    {lesson.sections && lesson.sections.length > 0 && (
                      <div className="ml-4 flex flex-col gap-1 mt-1 border-l border-slate-700/30 pl-2">
                        {lesson.sections.map((section, idx) => (
                          <div
                            key={`section-${moduleId}-${lesson.id}-${idx}`}
                            className="flex items-center gap-2 px-2 py-0.5 text-xs text-slate-400"
                          >
                            <Circle className="w-2 h-2 text-slate-600 flex-shrink-0" />
                            <span className="truncate">{section.title || `Section ${idx + 1}`}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Locked Module Message */}
            {isExpanded && !isUnlocked && (
              <div className="ml-4 px-3 py-2 text-xs text-slate-500 italic">
                Complete previous module to unlock
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
