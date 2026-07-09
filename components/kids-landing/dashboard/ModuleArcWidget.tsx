'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="flex flex-col items-center justify-start h-full w-full overflow-visible">
      {/* Title at top with spacing */}
      <div className="pt-1 pb-6">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wide">16 Modules</h3>
      </div>

      {/* Arc Container - pushed down, centered horizontally */}
      <div className="flex-1 w-full flex items-center justify-center overflow-visible">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
