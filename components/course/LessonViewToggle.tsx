'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Grid3x3 } from 'lucide-react';
import { ModuleTreeView } from './ModuleTreeView';
import { CourseLessonHeader } from './CourseLessonHeader';
import type { User } from '@supabase/supabase-js';

interface LessonViewToggleProps {
  moduleId: number;
  lessonTitle: string;
  user: User | null;
  version: 'kids' | 'adult';
  unlockedModules: Set<number>;
  completedModules: Set<number>;
  lessonsByModule: Record<number, { id: number; title: string; sections?: any[] }[]>;
  children: React.ReactNode;
}

export function LessonViewToggle({
  moduleId,
  lessonTitle,
  user,
  version,
  unlockedModules,
  completedModules,
  lessonsByModule,
  children,
}: LessonViewToggleProps) {
  const [view, setView] = useState<'lesson' | 'modules'>('lesson');

  // Load view preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lesson-view');
    if (saved === 'modules') {
      setView('modules');
    }
  }, []);

  // Save view preference to localStorage
  const toggleView = (newView: 'lesson' | 'modules') => {
    setView(newView);
    localStorage.setItem('lesson-view', newView);
  };

  if (version === 'kids') {
    // Kids version: no toggle, just show lesson
    return <>{children}</>;
  }

  return (
    <>
      {/* Header with toggle button */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-lg overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <CourseLessonHeader
            moduleId={String(moduleId)}
            lessonTitle={lessonTitle}
            user={user}
            version={version}
          />

          {/* View Toggle (absolute positioned so it doesn't interfere with header layout) */}
          <div className="absolute right-4 sm:right-6 top-3 flex gap-1 bg-slate-800/40 rounded-lg p-1 border border-slate-700/50">
            <button
              onClick={() => toggleView('lesson')}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors text-sm font-medium ${
                view === 'lesson'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              title="Lesson view"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Lesson</span>
            </button>
            <button
              onClick={() => toggleView('modules')}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors text-sm font-medium ${
                view === 'modules'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
              title="Modules view"
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Modules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content: Lesson or Modules */}
      {view === 'lesson' ? (
        children
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur rounded-lg border border-slate-700/50 p-6">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
              Course Structure
            </h2>
            <div className="max-w-2xl">
              <ModuleTreeView
                currentModuleId={moduleId}
                currentLessonId={0}
                unlockedModules={unlockedModules}
                completedModules={completedModules}
                lessonsByModule={lessonsByModule}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
