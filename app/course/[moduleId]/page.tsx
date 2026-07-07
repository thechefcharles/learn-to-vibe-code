import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ModuleChecklist } from "@/components/ModuleChecklist";
import { getModule } from "@/lib/content";
import { getModuleMetadata } from "@/lib/module-metadata";
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

  // Convert checklist items to checked object
  const checked: Record<string, boolean> = {};
  checklistItems.forEach((item: any) => {
    checked[item.item_key] = item.checked;
  });

  const isKids = userVersion === "kids";

  return (
    <div className={`min-h-screen ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${isKids ? "bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-300" : "bg-slate-800/50 border-b border-slate-700"}`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/course"
            className={`text-sm font-medium transition ${isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"}`}
          >
            ← Back to Course
          </Link>
          <div className="text-center">
            <p className={`text-xs ${isKids ? "text-purple-600" : "text-slate-400"}`}>Module {String(moduleId).padStart(2, "0")}</p>
            <h1 className={`text-2xl font-bold ${isKids ? "text-purple-700" : "text-white"}`}>{pageTitle}</h1>
          </div>
          <div className="w-24 text-right" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert max-w-none mb-12">
          <MarkdownRenderer content={module.content} />
        </article>

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
  );
}
