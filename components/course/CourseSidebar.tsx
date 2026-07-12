'use client';

import { useState } from 'react';
import { BookOpen, Grid3x3 } from 'lucide-react';
import { CoursePageSidebar } from './CoursePageSidebar';
import { ModuleTreeView } from './ModuleTreeView';
import type { User } from '@supabase/supabase-js';

interface CourseSidebarProps {
  userId: string | undefined;
  moduleId: number;
  lessonNumber: number;
  lessonTitle: string;
  estimatedMinutes?: number;
  user: User | null;
  unlockedModules: Set<number>;
  completedModules: Set<number>;
  lessonsByModule: Record<number, { id: number; title: string; sections?: any[] }[]>;
}

export function CourseSidebar({
  userId,
  moduleId,
  lessonNumber,
  lessonTitle,
  estimatedMinutes,
  user,
  unlockedModules,
  completedModules,
  lessonsByModule,
}: CourseSidebarProps) {
  const [view, setView] = useState<'lessons' | 'modules'>('lessons');

  if (!user) return null;

  return (
    <aside className="hidden lg:flex flex-col gap-4 w-72 sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* View Toggle */}
      <div className="flex gap-2 bg-slate-800/40 rounded-lg p-1 border border-slate-700/50">
        <button
          onClick={() => setView('lessons')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors text-sm font-medium ${
            view === 'lessons'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Lessons</span>
        </button>
        <button
          onClick={() => setView('modules')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors text-sm font-medium ${
            view === 'modules'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <Grid3x3 className="w-4 h-4" />
          <span className="hidden sm:inline">Modules</span>
        </button>
      </div>

      {/* Lessons View */}
      {view === 'lessons' && (
        <CoursePageSidebar
          userId={userId}
          moduleId={moduleId}
          lessonNumber={lessonNumber}
          lessonTitle={lessonTitle}
          estimatedMinutes={estimatedMinutes || 30}
          user={user}
        />
      )}

      {/* Modules Tree View */}
      {view === 'modules' && (
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur rounded-lg border border-slate-700/50 p-4">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
            Course Structure
          </h3>
          <ModuleTreeView
            currentModuleId={moduleId}
            currentLessonId={lessonNumber}
            unlockedModules={unlockedModules}
            completedModules={completedModules}
            lessonsByModule={lessonsByModule}
          />
        </div>
      )}
    </aside>
  );
}
