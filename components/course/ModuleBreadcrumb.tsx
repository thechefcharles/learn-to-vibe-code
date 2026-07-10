"use client";

import Link from "next/link";

interface ModuleBreadcrumbProps {
  moduleId: number;
  moduleName: string;
  currentSectionIndex?: number;
  currentSectionHeading?: string;
  totalSections?: number;
}

// Deliberately does NOT render the lesson title — that's the page's single <h1>.
// Deliberately does NOT re-prefix a zero-padded module number — moduleName
// (e.g. "Module 0: Setup & Accounts") already carries it. This keeps module
// identity shown exactly once here, once in the header bar, and nowhere else.
export function ModuleBreadcrumb({
  moduleId,
  moduleName,
  currentSectionIndex,
  currentSectionHeading,
  totalSections,
}: ModuleBreadcrumbProps) {
  return (
    <div className="mb-4 text-xs text-slate-500 flex items-center gap-2 flex-wrap">
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
        {moduleName}
      </Link>
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
