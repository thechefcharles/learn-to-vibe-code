"use client";

import Link from "next/link";

interface ModuleBreadcrumbProps {
  moduleId: number;
  moduleName: string;
}

export function ModuleBreadcrumb({
  moduleId,
  moduleName,
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
    </div>
  );
}
