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
