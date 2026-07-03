import { getAllModuleProgress, isModuleUnlocked } from "@/lib/actions/course";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { getModuleMetadata } from "@/lib/module-metadata";
import { redirect } from "next/navigation";

export default async function CoursePage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const progress = await getAllModuleProgress();
  const unlockedModules: Record<number, boolean> = {};

  for (let i = 0; i <= 15; i++) {
    unlockedModules[i] = await isModuleUnlocked(i);
  }

  const modules = [];
  for (let i = 0; i <= 15; i++) {
    const meta = getModuleMetadata(i);
    modules.push({ id: i, title: meta.title });
  }

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
          {modules.map((module) => {
            const isUnlocked = unlockedModules[module.id];
            const moduleProgress = progress.find((p: any) => p.module_id === module.id);
            const isCompleted = moduleProgress?.status === "completed";

            return (
              <Link
                key={module.id}
                href={isUnlocked ? `/course/${module.id}` : "#"}
                className={`block p-6 rounded-lg border-2 transition ${
                  !isUnlocked
                    ? "border-slate-700 bg-slate-800/50 opacity-60 cursor-not-allowed"
                    : isCompleted
                    ? "border-green-500 bg-slate-800 hover:bg-slate-700"
                    : "border-blue-500 bg-slate-800 hover:bg-slate-700 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isCompleted
                            ? "bg-green-600/20 text-green-400"
                            : "bg-blue-600/20 text-blue-400"
                        }`}
                      >
                        {isCompleted ? "✓" : String(module.id).padStart(2, "0")}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm">
                      {isCompleted
                        ? "✓ Completed"
                        : isUnlocked
                        ? "🔓 Unlocked"
                        : `🔒 Complete Module ${module.id - 1} to unlock`}
                    </p>
                  </div>
                  <div className="text-3xl">
                    {isCompleted ? "✓" : isUnlocked ? "→" : "🔒"}
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
