'use client';

import { useState, useEffect } from 'react';
import React from 'react';
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

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-lg overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <CourseLessonHeader
            moduleId={String(moduleId)}
            lessonTitle={lessonTitle}
            user={user}
            version={version}
          />
        </div>
      </div>

      {/* Content: Lesson View */}
      {typeof children === 'object' && children && 'props' in children
        ? // If children is a React element, clone it with additional props
          React.cloneElement(children as React.ReactElement, {
            unlockedModules,
            completedModules,
          } as any)
        : children}
    </>
  );
}
