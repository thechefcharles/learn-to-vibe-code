'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">16 Module Learning Path</h3>
      </div>

      {/* Arc Container */}
      <div className="h-44 w-full flex items-center justify-center mb-3">
        <CursorTrackedModuleArc totalModules={16} />
      </div>

      {/* Subtitle */}
      <div className="mt-3">
        <p className="text-xs text-gray-400 text-center">
          Drag cursor across arc to explore modules
        </p>
      </div>
    </div>
  );
}
