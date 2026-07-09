'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-visible">
      {/* Title - moved up with less margin */}
      <div className="mb-1">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wide">16 Modules</h3>
      </div>

      {/* Arc Container - Allow overflow */}
      <div className="h-32 w-full flex items-center justify-center flex-shrink-0 overflow-visible mt-2">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
