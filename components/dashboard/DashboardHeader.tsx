'use client';

import { Logo } from '@/components/Logo';
import { ProfileMenu } from './ProfileMenu';

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="relative z-20 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Left: Empty space for balance */}
        <div className="w-10 sm:w-16" />

        {/* Center: Logo */}
        <div className="flex justify-center flex-1">
          <div className="bg-slate-900/80 rounded-lg p-3 sm:p-4 backdrop-blur-md border border-cyan-500/30">
            <div className="scale-110 sm:scale-150">
              <Logo variant="cosmic" size="sm" />
            </div>
          </div>
        </div>

        {/* Right: Profile Menu */}
        <div className="flex justify-end w-10 sm:w-16">
          <ProfileMenu userName={userName} />
        </div>
      </div>
    </header>
  );
}
