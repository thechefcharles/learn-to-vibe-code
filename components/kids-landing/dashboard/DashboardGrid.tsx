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
      className={`${colSpanClass} ${rowSpanClass} rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:border-white/40 transition-all hover:bg-white/15 shadow-xl`}
    >
      {children}
    </div>
  );
}

export function DashboardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}

export { GridItem };
