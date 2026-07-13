import { getAllModuleProgress, isModuleUnlocked, getUserEnrolledVersion } from "@/lib/actions/course";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getModuleMetadata } from "@/lib/module-metadata";
import type { Version } from "@/lib/VersionContext";

export async function CourseContent() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const progress = await getAllModuleProgress();
  const version = (await getUserEnrolledVersion()) as Version || "adult";
  const isKids = version === "kids";

  // Fetch all unlock statuses in parallel (not sequentially)
  const unlockedStatusesPromises = Array.from({ length: 16 }, (_, i) =>
    isModuleUnlocked(i).then(unlocked => ({ moduleId: i, unlocked }))
  );
  const unlockedStatuses = await Promise.all(unlockedStatusesPromises);
  const unlockedModules: Record<number, boolean> = {};
  unlockedStatuses.forEach(({ moduleId, unlocked }) => {
    unlockedModules[moduleId] = unlocked;
  });

  const modules = [];
  for (let i = 0; i <= 15; i++) {
    const meta = getModuleMetadata(i);
    modules.push({ id: i, title: meta.title });
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className={`text-5xl font-bold mb-4 ${isKids ? "text-purple-600" : "text-white"}`}>
              {isKids ? "Course Map 🗺️" : "Course Map"}
            </h1>
            <p className={`text-xl ${isKids ? "text-purple-700" : "text-slate-400"}`}>
              {isKids
                ? "Unlock 16 modules! 🎮 From hello-world to live apps on the internet! 🚀"
                : "Learn to build with AI, step by step. 16 modules, from setup to production-ready apps."}
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className={`px-4 py-2 rounded-lg transition font-bold ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              📊 {isKids ? "My Progress" : "Dashboard"}
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {modules.map((module) => {
            const isUnlocked = unlockedModules[module.id];
            const moduleProgress = progress.find((p: any) => p.module_id === module.id);
            const isCompleted = moduleProgress?.status === "completed";

            return (
              <Link
                key={module.id}
                href={isUnlocked ? `/course/${module.id}` : "#"}
                className={`block p-6 rounded-lg border-2 transition ${
                  isKids
                    ? !isUnlocked
                      ? "border-gray-300 bg-gray-100/50 opacity-50 cursor-not-allowed"
                      : isCompleted
                      ? "border-green-400 bg-gradient-to-r from-green-100 to-emerald-100 hover:shadow-lg hover:shadow-green-300/40"
                      : "border-purple-400 bg-gradient-to-r from-purple-100 to-pink-100 hover:shadow-lg hover:shadow-purple-300/40 cursor-pointer"
                    : !isUnlocked
                    ? "border-slate-700 bg-slate-800/50 opacity-60 cursor-not-allowed"
                    : isCompleted
                    ? "border-green-500 bg-slate-800 hover:bg-slate-700"
                    : "border-blue-500 bg-slate-800 hover:bg-slate-700 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          isKids
                            ? isCompleted
                              ? "bg-green-400 text-white"
                              : "bg-purple-400 text-white"
                            : isCompleted
                            ? "bg-green-600/20 text-green-400"
                            : "bg-blue-600/20 text-blue-400"
                        }`}
                      >
                        {isCompleted ? "✓" : module.id + 1}
                      </div>
                      <h3 className={`text-lg font-bold ${isKids ? "text-purple-900" : "text-white"}`}>
                        {module.title}
                      </h3>
                    </div>
                    <p className={`text-sm ${isKids ? "text-purple-700" : "text-slate-400"}`}>
                      {isCompleted
                        ? isKids
                          ? "✓ Level Complete! 🎉"
                          : "✓ Completed"
                        : isUnlocked
                        ? isKids
                          ? "🔓 Ready to Level Up!"
                          : "🔓 Unlocked"
                        : isKids
                        ? `🔒 Complete Module ${module.id} first!`
                        : `🔒 Complete Module ${module.id} to unlock`}
                    </p>
                  </div>
                  <div className={`text-4xl ${isKids && !isUnlocked ? "opacity-30" : ""}`}>
                    {isCompleted ? "✓" : isUnlocked ? "→" : "🔒"}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Capstone */}
          <Link
            href="/capstone"
            className={`block p-6 rounded-lg border-2 transition ${isKids ? "border-yellow-400 bg-gradient-to-r from-yellow-100 to-orange-100 hover:shadow-lg hover:shadow-yellow-300/40" : "border-purple-500 bg-slate-800 hover:bg-slate-700"} cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isKids ? "bg-yellow-400 text-white" : "bg-purple-600/20 text-purple-400"}`}>
                    🎯
                  </div>
                  <h3 className={`text-lg font-bold ${isKids ? "text-yellow-900" : "text-white"}`}>
                    {isKids ? "The Grand Challenge!" : "Capstone"}
                  </h3>
                </div>
                <p className={`text-sm ${isKids ? "text-yellow-800" : "text-slate-400"}`}>
                  {isKids ? "Build your masterpiece & earn a badge! 👑" : "Build, defend, and earn your credential"}
                </p>
              </div>
              <div className="text-3xl">→</div>
            </div>
          </Link>
        </div>

        <div className={`mt-12 p-6 rounded-lg border ${isKids ? "bg-pink-100/50 border-pink-300" : "bg-blue-500/10 border-blue-500/20"}`}>
          <h3 className={`text-lg font-bold mb-2 ${isKids ? "text-pink-900" : "text-white"}`}>
            {isKids ? "🎮 What You'll Learn" : "About This Course"}
          </h3>
          <p className={`text-sm leading-relaxed ${isKids ? "text-pink-900" : "text-slate-300"}`}>
            {isKids
              ? "16 levels to complete! You'll learn to build real apps using AI tools (Cursor, Claude Code), real frameworks (Next.js, Supabase), and real deployment (Vercel). By the end, you'll ship a live project and earn your Master Builder badge! 🚀"
              : "This is the Accredited Vibe Coding Course — a hands-on path from zero to deployed app. You'll learn with real AI tools (Cursor, Claude Code), real frameworks (Next.js, Supabase), and real deployment (Vercel). By the end, you'll have shipped a live project and earned a verifiable credential."}
          </p>
        </div>
      </div>
    </div>
  );
}
