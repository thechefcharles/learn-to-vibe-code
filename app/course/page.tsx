"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getModuleMetadata } from "@/lib/content";

export default function CoursePage() {
  const [modules, setModules] = useState<Array<{ id: number; title: string }>>([]);

  useEffect(() => {
    const mods = [];
    for (let i = 0; i <= 15; i++) {
      const meta = getModuleMetadata(i);
      mods.push({ id: i, title: meta.title });
    }
    setModules(mods);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Course Map</h1>
          <p className="text-xl text-slate-400">
            Learn to build with AI, step by step. 16 modules, from setup to
            production-ready apps.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((module, idx) => {
            const isLocked = idx > 0; // Only module 0 unlocked initially
            const isCapstone = idx === 16;

            return (
              <Link
                key={module.id}
                href={`/course/${module.id}`}
                className={`block p-6 rounded-lg border-2 transition ${
                  isLocked
                    ? "border-slate-700 bg-slate-800/50 opacity-60 cursor-not-allowed"
                    : "border-blue-500 bg-slate-800 hover:bg-slate-700 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                        {String(module.id).padStart(2, "0")}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm">
                      {idx === 0
                        ? "🔓 Unlocked"
                        : `🔒 Unlock by completing Module ${idx - 1}`}
                    </p>
                  </div>
                  <div className="text-3xl">
                    {idx === 0 ? "→" : "🔒"}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Capstone */}
          <Link
            href="/capstone"
            className="block p-6 rounded-lg border-2 border-purple-500 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-white">Capstone</h3>
                </div>
                <p className="text-slate-400 text-sm">
                  Build, defend, and earn your credential
                </p>
              </div>
              <div className="text-3xl">→</div>
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-2">About This Course</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            This is the Accredited Vibe Coding Course — a hands-on path from
            zero to deployed app. You'll learn with real AI tools (Cursor,
            Claude Code), real frameworks (Next.js, Supabase), and real
            deployment (Vercel). By the end, you'll have shipped a live project
            and earned a verifiable credential.
          </p>
        </div>
      </div>
    </div>
  );
}
