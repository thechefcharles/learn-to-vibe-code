'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Title */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white">16 Module Learning Path</h3>
      </div>

      {/* Arc Container */}
      <div className="h-48 w-full flex items-center justify-center mb-1">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
