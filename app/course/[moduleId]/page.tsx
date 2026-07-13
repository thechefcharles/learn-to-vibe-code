import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { StepLessonViewer } from "@/components/StepLessonViewer";
import { ModuleChecklist } from "@/components/ModuleChecklist";
import { CourseLessonHeader } from "@/components/course/CourseLessonHeader";
import { LessonViewToggle } from "@/components/course/LessonViewToggle";
import { CoursePageInteractive } from "@/components/course/CoursePageInteractive";
import { ShareLesson } from "@/components/course/ShareLesson";
import { getModule } from "@/lib/content";
import { getModuleMetadata } from "@/lib/module-metadata";
import { getModuleSteps, hasModuleSteps } from "@/lib/module-steps";
import {
  getChecklistItems,
  isModuleUnlocked,
  getUserModuleProgress,
} from "@/lib/actions/course";
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

// Render dynamically based on user's enrolled version
export const dynamic = "force-dynamic";

interface LessonPageProps {
  params: Promise<{ moduleId: string }>;
}

export async function generateMetadata(props: LessonPageProps) {
  const params = await props.params;
  const moduleId = parseInt(params.moduleId);
  const meta = getModuleMetadata(moduleId);
  return {
    title: `${meta.title} — Learn to Vibe Code`,
    description: meta.description,
  };
}

export default async function LessonPage(props: LessonPageProps) {
  const params = await props.params;
  const moduleId = parseInt(params.moduleId);

  if (isNaN(moduleId) || moduleId < 0 || moduleId > 15) {
    notFound();
  }

  // Check if module is unlocked
  const unlocked = await isModuleUnlocked(moduleId);
  if (!unlocked) {
    redirect("/course");
  }

  // Get user's enrolled version
  const user = await getUser();
  let userVersion: "kids" | "adult" = "adult";
  if (user) {
    const supabase = await createClient();
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("enrolled_version")
      .eq("user_id", user.id)
      .single();
    if (enrollment?.enrolled_version) {
      userVersion = enrollment.enrolled_version as "kids" | "adult";
    }
  }

  const module = await getModule(moduleId, userVersion);
  if (!module) {
    notFound();
  }

  const meta = getModuleMetadata(moduleId);
  const prevModule = moduleId > 0 ? moduleId - 1 : null;
  const nextModule = moduleId < 15 ? moduleId + 1 : null;

  // Extract title from module content
  const titleMatch = module.content.match(/^#\s+(.+?)(?:\n|$)/);
  const pageTitle = titleMatch ? titleMatch[1] : meta.title;

  // Load user data
  const checklistItems = user ? await getChecklistItems(moduleId) : [];
  const progress = user ? await getUserModuleProgress(moduleId) : null;

  // Load all module progress for tree view
  const { getAllModuleProgress } = await import("@/lib/actions/course");
  const allProgress = user ? await getAllModuleProgress() : [];

  // Build sets of unlocked and completed modules
  const unlockedModules = new Set<number>();
  const completedModules = new Set<number>();

  allProgress.forEach((p: any) => {
    if (p.status === "unlocked" || p.status === "completed") {
      unlockedModules.add(p.module_id);
    }
    if (p.status === "completed") {
      completedModules.add(p.module_id);
    }
  });

  // Build lessons structure for tree view
  const lessonsByModule: Record<number, { id: number; title: string; sections?: any[] }[]> = {};
  for (let i = 0; i < 16; i++) {
    lessonsByModule[i] = [
      { id: 0, title: "Main Lesson" },
      // Additional lessons would be loaded here from module structure
    ];
  }

  // Convert checklist items to checked object
  const checked: Record<string, boolean> = {};
  checklistItems.forEach((item: any) => {
    checked[item.item_key] = item.checked;
  });

  const isKids = userVersion === "kids";

  // Check if this module uses the new step-based format
  if (hasModuleSteps(moduleId)) {
    const steps = getModuleSteps(moduleId, userVersion);
    if (steps) {
      return (
        <CoursePageInteractive moduleNumber={moduleId} user={user}>
          <div className={`min-h-screen ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
            <LessonViewToggle
              moduleId={moduleId}
              lessonTitle={pageTitle}
              user={user}
              version={userVersion}
              unlockedModules={unlockedModules}
              completedModules={completedModules}
              lessonsByModule={lessonsByModule}
            >
              <StepLessonViewer steps={steps} moduleId={moduleId} user={user} />
            </LessonViewToggle>
          </div>
        </CoursePageInteractive>
      );
    }
  }

  const lessonUrl = `https://learn2vibecode.com/course/${moduleId}`;

  return (
    <CoursePageInteractive moduleNumber={moduleId} user={user}>
      <div className={`min-h-screen ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
        {/* Header */}
        {!isKids && <CourseLessonHeader moduleId={String(moduleId)} lessonTitle={pageTitle} user={user} />}

        {/* Main Layout */}
        <div className={`max-w-7xl mx-auto px-4 ${!isKids ? "pt-4 sm:pt-6 pb-12" : "py-12"}`}>
        <div className={`${!unlockedModules.has(moduleId) ? "opacity-60 pointer-events-none select-none" : ""}`}>
            {/* Preview Badge for Locked Content */}
            {!unlockedModules.has(moduleId) && !isKids && (
              <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/50 rounded-lg flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-amber-200">Preview Mode</p>
                  <p className="text-sm text-amber-100">This module is locked. Complete the previous module to unlock.</p>
                </div>
              </div>
            )}
            <article className={`prose prose-invert max-w-none mb-12 ${isKids ? "" : ""}`}>
              <MarkdownRenderer content={module.content} />
            </article>

            {/* Share Buttons */}
            {!isKids && (
              <ShareLesson
                moduleName={`Module ${String(moduleId).padStart(2, '0')}`}
                lessonTitle={pageTitle}
                url={lessonUrl}
              />
            )}

            {/* Navigation */}
            <div className={`flex gap-4 mt-16 pt-8 border-t ${isKids ? "border-purple-200" : "border-slate-700"}`}>
              {prevModule !== null ? (
                <Link
                  href={`/course/${prevModule}`}
                  className={`flex-1 p-4 rounded-lg transition text-left ${isKids ? "bg-purple-100 hover:bg-purple-200 border border-purple-300" : "bg-slate-800 hover:bg-slate-700 border border-slate-600"}`}
                >
                  <p className={`text-xs mb-1 ${isKids ? "text-purple-600" : "text-slate-400"}`}>← Previous Module</p>
                  <p className={`font-bold ${isKids ? "text-purple-700" : "text-white"}`}>
                    {getModuleMetadata(prevModule).title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextModule !== null ? (
                <Link
                  href={`/course/${nextModule}`}
                  className={`flex-1 p-4 rounded-lg transition text-right ${isKids ? "bg-purple-100 hover:bg-purple-200 border border-purple-300" : "bg-slate-800 hover:bg-slate-700 border border-slate-600"}`}
                >
                  <p className={`text-xs mb-1 ${isKids ? "text-purple-600" : "text-slate-400"}`}>Next Module →</p>
                  <p className={`font-bold ${isKids ? "text-purple-700" : "text-white"}`}>
                    {getModuleMetadata(nextModule).title}
                  </p>
                </Link>
              ) : (
                <Link
                  href="/capstone"
                  className={`flex-1 p-4 rounded-lg transition text-right ${isKids ? "bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400 border border-purple-400" : "bg-purple-800/30 hover:bg-purple-800/50 border border-purple-500"}`}
                >
                  <p className={`text-xs mb-1 ${isKids ? "text-purple-700 font-bold" : "text-purple-400"}`}>{isKids ? "Final Project →" : "Next: Capstone →"}</p>
                  <p className={`font-bold ${isKids ? "text-purple-900" : "text-white"}`}>
                    {isKids ? "Build Your App 🚀" : "Build & Defend Your Project"}
                  </p>
                </Link>
              )}
            </div>

            {/* Checklist */}
            {user ? (
              <ModuleChecklist
                moduleId={moduleId}
                initialChecked={checked}
              />
            ) : (
              <div className={`mt-12 p-6 rounded-lg border ${isKids ? "bg-purple-100 border-purple-300" : "bg-slate-800 border-slate-700"}`}>
                <p className={`text-center ${isKids ? "text-purple-700" : "text-slate-400"}`}>
                  <Link href="/auth/sign-in" className={isKids ? "text-purple-600 hover:text-purple-800 font-bold" : "text-blue-400 hover:text-blue-300"}>
                    Sign in
                  </Link>{" "}
                  {isKids ? "to track your progress and collect badges! 🏆" : "to track your progress"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CoursePageInteractive>
  );
}
