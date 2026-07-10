'use client';

import { ReactNode } from 'react';

interface GridItemProps {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  mobileColSpan?: number; // Override colSpan on mobile
  mobileOrder?: number; // Reorder on mobile
}

function GridItem({ children, colSpan = 1, rowSpan = 1, mobileColSpan, mobileOrder }: GridItemProps) {
  const desktopColSpan = colSpan === 2 ? 'lg:col-span-2' : colSpan === 3 ? 'lg:col-span-3' : 'lg:col-span-1';
  const mobileColSpanClass = mobileColSpan === 2 ? 'col-span-2' : mobileColSpan === 1 ? 'col-span-1' : 'col-span-1';
  const rowSpanClass = rowSpan === 2 ? 'row-span-2' : 'row-span-1';
  const orderClass = mobileOrder !== undefined ? `order-${mobileOrder} lg:order-none` : '';

  return (
    <div
      className={`${mobileColSpanClass} ${desktopColSpan} ${rowSpanClass} ${orderClass} rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-2.5 lg:p-3 hover:border-white/40 transition-all hover:bg-white/15 shadow-lg flex flex-col items-center justify-center`}
    >
      {children}
    </div>
  );
}

export function DashboardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1.5 lg:gap-2 w-full max-w-6xl mx-auto px-2 sm:px-3 lg:px-4">
      {children}
    </div>
  );
}

export { GridItem };
