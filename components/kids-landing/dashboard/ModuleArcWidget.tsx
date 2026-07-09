'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-start h-full pt-2">
      {/* Title */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-white">16 Module Learning Path</h3>
      </div>

      {/* Arc Container */}
      <div className="h-32 w-full flex items-center justify-center flex-shrink-0">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
