"use client";

import Link from "next/link";

interface ModuleBreadcrumbProps {
  moduleId: number;
  moduleName: string;
  stepIndex: number;
  stepTitle: string;
}

export function ModuleBreadcrumb({
  moduleId,
  moduleName,
  stepTitle,
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
      <span className="text-slate-600">→</span>
      <span className="text-slate-400">{stepTitle}</span>
    </div>
  );
}
