"use client";

import Link from "next/link";

interface ModuleBreadcrumbProps {
  moduleId: number;
  moduleName: string;
  currentLessonTitle?: string;
  currentSectionIndex?: number;
  currentSectionHeading?: string;
  totalSections?: number;
}

export function ModuleBreadcrumb({
  moduleId,
  moduleName,
  currentLessonTitle,
  currentSectionIndex,
  currentSectionHeading,
  totalSections,
}: ModuleBreadcrumbProps) {
  return (
    <div className="mb-4 text-xs text-slate-500 flex items-center gap-2">
      <Link
        href="/course"
        className="text-slate-500 hover:text-slate-300 transition"
      >
        Course
      </Link>
      <span className="text-slate-600">→</span>
      <Link
        href={`/course/${moduleId}`}
        className="text-slate-500 hover:text-slate-300 transition"
      >
        {String(moduleId).padStart(2, "0")} {moduleName}
      </Link>
      {currentLessonTitle && (
        <>
          <span className="text-slate-600">→</span>
          <span className="text-sm text-slate-400">{currentLessonTitle}</span>
        </>
      )}
      {currentSectionIndex !== undefined && currentSectionHeading && (
        <>
          <span className="text-slate-600">→</span>
          <span className="text-xs text-slate-400">
            Section {currentSectionIndex + 1} of {totalSections} · {currentSectionHeading}
          </span>
        </>
      )}
    </div>
  );
}
