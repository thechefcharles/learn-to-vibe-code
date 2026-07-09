'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-visible">
      {/* Title */}
      <div className="mb-3">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wide">Module<br/>Path</h3>
      </div>

      {/* Arc Container - Allow overflow */}
      <div className="h-32 w-full flex items-center justify-center flex-shrink-0 overflow-visible">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
