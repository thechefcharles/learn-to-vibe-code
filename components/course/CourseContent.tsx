import { getAllModuleProgress, isModuleUnlocked, getUserEnrolledVersion } from "@/lib/actions/course";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getModuleMetadata } from "@/lib/module-metadata";
import type { Version } from "@/lib/VersionContext";
import { CourseModuleList } from "./CourseModuleList";

export async function CourseContent() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const progress = await getAllModuleProgress();
  const version = (await getUserEnrolledVersion()) as Version || "adult";
  const isKids = version === "kids";

  // Fetch all unlock statuses in parallel
  const unlockedStatusesPromises = Array.from({ length: 16 }, (_, i) =>
    isModuleUnlocked(i + 1).then(unlocked => ({ moduleId: i + 1, unlocked }))
  );
  const unlockedStatuses = await Promise.all(unlockedStatusesPromises);
  const unlockedModules: Record<number, boolean> = {};
  unlockedStatuses.forEach(({ moduleId, unlocked }) => {
    unlockedModules[moduleId] = unlocked;
  });

  const modules = [];
  for (let i = 1; i <= 16; i++) {
    const meta = getModuleMetadata(i);
    modules.push({ id: i, title: meta.title });
  }

  return (
    <div
      className="min-h-screen py-8 px-4 relative"
      style={{
        backgroundImage: 'url(/course-map-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Content container */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex justify-between items-start mb-8 gap-6 bg-slate-900/40 backdrop-blur-sm p-6 rounded-lg border border-slate-700/40">
          <div>
            <h1 className="text-5xl font-bold mb-2 text-white drop-shadow-lg">
              {isKids ? "Course Map 🗺️" : "Course Map"}
            </h1>
            <p className="text-lg text-slate-100 drop-shadow-md">
              {isKids
                ? "Unlock 16 modules! 🎮 From hello-world to live apps! 🚀"
                : "Learn to build with AI, step by step. 16 modules, from setup to production."}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            {isKids ? "My Progress" : "→ Dashboard"}
          </Link>
        </div>

        {/* Modules List */}
        <CourseModuleList
          modules={modules}
          progress={progress}
          unlockedModules={unlockedModules}
          version={version}
          isKids={isKids}
        />

        {/* Info Box */}
        <div className="mt-8 p-6 rounded-lg bg-slate-900/60 border border-slate-700/40 backdrop-blur-sm">
          <h3 className="text-base font-bold text-white mb-2 drop-shadow-md">
            {isKids ? "🎮 What You'll Learn" : "About This Course"}
          </h3>
          <p className="text-sm text-slate-100 drop-shadow-md">
            {isKids
              ? "16 levels to complete! You'll learn to build real apps using AI tools, frameworks, and deployment. By the end, you'll ship a live project! 🚀"
              : "A hands-on path from zero to deployed app. You'll learn with Cursor, Claude Code, Next.js, Supabase, and Vercel. Ship a live project and earn a verifiable credential."}
          </p>
        </div>
      </div>
    </div>
  );
}
