'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-start h-full pt-1 overflow-visible -mb-12">
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white">16 Module Learning Path</h3>
      </div>

      {/* Arc Container - Allow overflow */}
      <div className="h-40 w-full flex items-center justify-center flex-shrink-0 overflow-visible">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
