'use client';

import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Title - positioned absolutely at top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-1">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wide">16 Modules</h3>
      </div>

      {/* Arc Container - centered in remaining space */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        <CursorTrackedModuleArc totalModules={16} />
      </div>
    </div>
  );
}
