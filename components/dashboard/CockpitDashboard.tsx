'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getModuleMetadata } from '@/lib/module-metadata';

interface CockpitDashboardProps {
  userName: string;
  xp: { points: number; level: number };
  badges: any[];
  streak: any;
  progress: any[];
  version: string;
  completedModules: number;
  capstoneUnlocked: boolean;
  continueHref: string;
  currentModuleId: number;
  badgeMetadata: any[];
}

export function CockpitDashboard({
  userName,
  xp,
  badges,
  streak,
  progress,
  version,
  completedModules,
  capstoneUnlocked,
  continueHref,
  currentModuleId,
  badgeMetadata,
}: CockpitDashboardProps) {
  const totalModules = 16;
  const progressPercent = (completedModules / totalModules) * 100;

  return (
    <div className="space-y-6">
      {/* HUD Frame Container */}
      <style>{`
        @keyframes scan-lines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scan-lines::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          animation: scan-lines 8s linear infinite;
        }
      `}</style>

      {/* Top Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* System Status */}
        <div className="relative bg-slate-900/60 backdrop-blur border border-cyan-500/40 rounded-lg p-4 scan-lines overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs text-cyan-400 font-mono tracking-widest mb-1">SYSTEM STATUS</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-white font-semibold">ONLINE</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Commander: {userName}</p>
          </div>
        </div>

        {/* XP Readout */}
        <div className="relative bg-slate-900/60 backdrop-blur border border-purple-500/40 rounded-lg p-4 scan-lines overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs text-purple-400 font-mono tracking-widest mb-1">XP ACCUMULATED</p>
            <p className="text-xl font-bold text-white">{xp.points.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">Level {xp.level}</p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="relative bg-slate-900/60 backdrop-blur border border-orange-500/40 rounded-lg p-4 scan-lines overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs text-orange-400 font-mono tracking-widest mb-1">STREAK</p>
            <p className="text-2xl font-bold text-orange-300">{streak?.current || 0}</p>
            <p className="text-xs text-slate-400 mt-1">days active</p>
          </div>
        </div>

        {/* Course Track */}
        <div className="relative bg-slate-900/60 backdrop-blur border border-pink-500/40 rounded-lg p-4 scan-lines overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs text-pink-400 font-mono tracking-widest mb-1">COURSE TRACK</p>
            <p className="text-sm font-semibold text-white">
              {version === 'kids' ? '🚀 Beginner' : '💻 Advanced'}
            </p>
            <p className="text-xs text-slate-400 mt-1">{completedModules}/16 complete</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Station */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Mission Briefing (Left) */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur border border-cyan-500/30 rounded-xl p-6 scan-lines overflow-hidden">
            {/* Corner Reticles */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/60" />

            <div className="relative z-10">
              <p className="text-xs text-cyan-400 font-mono tracking-widest mb-4">[ MISSION BRIEFING ]</p>

              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-3">Current Objective:</p>
                <h3 className="text-xl font-bold text-white mb-2">
                  Module {String(currentModuleId).padStart(2, '0')}: {getModuleMetadata(currentModuleId).title}
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  {getModuleMetadata(currentModuleId).description}
                </p>
              </div>

              {/* Progress Bar with Grid Background */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-cyan-400 font-mono">MISSION PROGRESS</p>
                  <p className="text-xs text-cyan-400 font-mono">{completedModules}/{totalModules}</p>
                </div>
                <div className="relative h-3 bg-slate-950 border border-cyan-500/30 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>
              </div>

              <Link
                href={continueHref}
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg shadow-cyan-500/50"
              >
                ▶ ENGAGE NEXT MODULE
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Radar (Right) */}
        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur border border-purple-500/30 rounded-xl p-6 scan-lines overflow-hidden">
          {/* Corner Reticles */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-500/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-500/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-500/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-500/60" />

          <div className="relative z-10">
            <p className="text-xs text-purple-400 font-mono tracking-widest mb-4">[ NAVIGATION ]</p>

            {/* Radar Circle */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full" />
              <div className="absolute inset-2 border border-purple-500/20 rounded-full" />
              <div className="absolute inset-6 border border-purple-500/10 rounded-full" />

              {/* Center point (current position) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/70" />

              {/* Progress indicator */}
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1/3 bg-gradient-to-b from-cyan-500 to-transparent origin-bottom"
                style={{
                  transform: `translateX(-50%) rotate(${(progressPercent / 100) * 360}deg)`,
                  transformOrigin: 'center calc(100% - 4px)',
                }}
              />
            </div>

            <p className="text-center text-xs text-slate-400">
              {progressPercent.toFixed(0)}% Course
            </p>
          </div>
        </div>
      </motion.div>

      {/* Command Center - Systems Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur border border-pink-500/30 rounded-xl p-6 scan-lines overflow-hidden"
      >
        {/* Corner Reticles */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-pink-500/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-pink-500/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-pink-500/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-pink-500/60" />

        <div className="relative z-10">
          <p className="text-xs text-pink-400 font-mono tracking-widest mb-4">[ ACHIEVEMENTS ]</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {badgeMetadata.map((badge) => {
              const earned = badges.some((b) => b.badge_key === badge.key);
              return (
                <div
                  key={badge.key}
                  className={`relative p-3 rounded-lg border transition-all ${
                    earned
                      ? 'border-pink-500/60 bg-pink-500/10 shadow-lg shadow-pink-500/30'
                      : 'border-slate-600/40 bg-slate-900/40 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2 text-center">{badge.icon}</div>
                  <p className="text-xs font-bold text-white text-center line-clamp-2">
                    {badge.name}
                  </p>
                  {earned && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link
          href="/course"
          className="relative group bg-slate-900/60 backdrop-blur border border-cyan-500/40 rounded-lg p-4 scan-lines overflow-hidden hover:border-cyan-400/60 transition-all"
        >
          <div className="relative z-10">
            <p className="text-xs text-cyan-400 font-mono tracking-widest mb-2">VIEW MODULES</p>
            <p className="text-white font-semibold">Course Map</p>
          </div>
        </Link>

        <Link
          href="/dashboard/settings"
          className="relative group bg-slate-900/60 backdrop-blur border border-purple-500/40 rounded-lg p-4 scan-lines overflow-hidden hover:border-purple-400/60 transition-all"
        >
          <div className="relative z-10">
            <p className="text-xs text-purple-400 font-mono tracking-widest mb-2">CONFIGURE</p>
            <p className="text-white font-semibold">Settings</p>
          </div>
        </Link>

        {capstoneUnlocked && (
          <Link
            href="/capstone"
            className="relative group bg-slate-900/60 backdrop-blur border border-pink-500/40 rounded-lg p-4 scan-lines overflow-hidden hover:border-pink-400/60 transition-all"
          >
            <div className="relative z-10">
              <p className="text-xs text-pink-400 font-mono tracking-widest mb-2">FINAL MISSION</p>
              <p className="text-white font-semibold">Capstone Project</p>
            </div>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
