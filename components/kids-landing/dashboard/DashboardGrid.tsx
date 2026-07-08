'use client';

import { ReactNode } from 'react';

interface GridItemProps {
  children: ReactNode;
  colSpan?: number; // 1 or 2 (default 1)
  rowSpan?: number; // 1 or 2 (default 1)
}

function GridItem({ children, colSpan = 1, rowSpan = 1 }: GridItemProps) {
  const colSpanClass = colSpan === 2 ? 'col-span-2' : 'col-span-1';
  const rowSpanClass = rowSpan === 2 ? 'row-span-2' : 'row-span-1';

  return (
    <div
      className={`${colSpanClass} ${rowSpanClass} rounded-lg bg-slate-900/50 border border-slate-700 p-6 hover:border-cyan-500/50 transition-colors`}
    >
      {children}
    </div>
  );
}

export function DashboardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}

export { GridItem };
