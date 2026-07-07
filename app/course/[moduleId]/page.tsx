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

export async function generateStaticParams() {
  return Array.from({ length: 16 }, (_, i) => ({
    moduleId: String(i),
  }));
}

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

  // Load user data
  const checklistItems = user ? await getChecklistItems(moduleId) : [];
  const progress = user ? await getUserModuleProgress(moduleId) : null;

  // Convert checklist items to checked object
  const checked: Record<string, boolean> = {};
  checklistItems.forEach((item: any) => {
    checked[item.item_key] = item.checked;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/course"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            ← Back to Course
          </Link>
          <div className="text-center">
            <p className="text-slate-400 text-xs">Module {String(moduleId).padStart(2, "0")}</p>
            <h1 className="text-2xl font-bold text-white">{meta.title}</h1>
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
        <div className="flex gap-4 mt-16 pt-8 border-t border-slate-700">
          {prevModule !== null ? (
            <Link
              href={`/course/${prevModule}`}
              className="flex-1 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition text-left"
            >
              <p className="text-xs text-slate-400 mb-1">← Previous Module</p>
              <p className="font-bold text-white">
                {getModuleMetadata(prevModule).title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextModule !== null ? (
            <Link
              href={`/course/${nextModule}`}
              className="flex-1 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition text-right"
            >
              <p className="text-xs text-slate-400 mb-1">Next Module →</p>
              <p className="font-bold text-white">
                {getModuleMetadata(nextModule).title}
              </p>
            </Link>
          ) : (
            <Link
              href="/capstone"
              className="flex-1 p-4 bg-purple-800/30 hover:bg-purple-800/50 border border-purple-500 rounded-lg transition text-right"
            >
              <p className="text-xs text-purple-400 mb-1">Next: Capstone →</p>
              <p className="font-bold text-white">
                Build & Defend Your Project
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
          <div className="mt-12 p-6 bg-slate-800 border border-slate-700 rounded-lg">
            <p className="text-slate-400 text-center">
              <Link href="/auth/sign-in" className="text-blue-400 hover:text-blue-300">
                Sign in
              </Link>{" "}
              to track your progress
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
