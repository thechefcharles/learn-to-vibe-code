import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getModule } from "@/lib/content";
import { getModuleMetadata } from "@/lib/module-metadata";

export default async function DemoLessonPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId: moduleIdStr } = await params;
  const moduleId = parseInt(moduleIdStr);

  // Only allow modules 0-1 in demo
  if (moduleId < 0 || moduleId > 1) {
    notFound();
  }

  const module = await getModule(moduleId);

  if (!module) {
    notFound();
  }

  const meta = getModuleMetadata(moduleId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Demo Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8 flex justify-between items-center">
          <div>
            <span className="inline-block bg-amber-500 text-amber-950 font-bold px-3 py-1 rounded-full text-xs">
              🔓 DEMO
            </span>
            <p className="text-amber-200 text-sm mt-2">
              This is a preview of the full course. Sign up to unlock quizzes, deliverables, and your certification.
            </p>
          </div>
          <Link
            href="/auth/sign-up"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg whitespace-nowrap transition text-sm"
          >
            Sign Up →
          </Link>
        </div>

        {/* Lesson Header */}
        <div className="mb-8">
          <Link
            href="/demo"
            className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
          >
            ← Back to Demo
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Module {moduleId}</h1>
          <p className="text-slate-400">{meta.title}</p>
        </div>

        {/* Lesson Content */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
          <MarkdownRenderer content={module.content} />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Continue Learning?</h2>
          <p className="text-blue-100 mb-6">
            Sign up now to access all 16 modules, quizzes, real-world projects, and earn your professional certification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition"
            >
              Create Account →
            </Link>
            <Link
              href="/auth/sign-in"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition"
            >
              Already have an account?
            </Link>
          </div>
        </div>

        {/* Next Module Link */}
        {moduleId < 1 && (
          <div className="mt-8 text-center">
            <Link
              href={`/demo/${moduleId + 1}`}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Next Module: Module {moduleId + 1} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
