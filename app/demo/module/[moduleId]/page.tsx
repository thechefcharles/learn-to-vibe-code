import { getModule } from "@/lib/content";
import { getModuleQuiz } from "@/lib/quizzes";
import { getModuleMetadata } from "@/lib/module-metadata";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Link from "next/link";
import DemoQuizViewer from "@/components/DemoQuizViewer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface DemoModulePageProps {
  params: Promise<{ moduleId: string }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 16 }, (_, i) => ({
    moduleId: String(i),
  }));
}

export async function generateMetadata({ params }: DemoModulePageProps): Promise<Metadata> {
  const { moduleId } = await params;
  const id = parseInt(moduleId);

  if (isNaN(id) || id < 0 || id > 15) {
    return { title: "Module not found" };
  }

  const meta = getModuleMetadata(id);
  return {
    title: `${meta.title} — Learn to Vibe Code`,
    description: meta.description,
  };
}

export default async function DemoModulePage({ params }: DemoModulePageProps) {
  const { moduleId } = await params;
  const id = parseInt(moduleId);

  if (isNaN(id) || id < 0 || id > 15) {
    notFound();
  }

  const module = await getModule(id);
  const quiz = getModuleQuiz(id);
  const meta = getModuleMetadata(id);

  if (!module) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/demo" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Course Preview
          </Link>
          <div className="mb-4">
            <span className="text-sm text-slate-400">Module {id}</span>
            <h1 className="text-4xl font-bold text-white mt-2">{meta.title}</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-12">
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={module.content} />
          </div>
        </div>

        {/* Quiz Section */}
        {quiz && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">📝 Sample Quiz</h2>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <p className="text-blue-400 text-sm">
                ℹ️ This is a demo quiz. Answers are shown but won't be saved. Sign up for full access to submit real quizzes.
              </p>
            </div>
            <DemoQuizViewer quiz={quiz} />
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          {id > 0 && (
            <Link
              href={`/demo/module/${id - 1}`}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition text-center"
            >
              ← Previous Module
            </Link>
          )}
          {id < 15 && (
            <Link
              href={`/demo/module/${id + 1}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
            >
              Next Module →
            </Link>
          )}
        </div>

        {/* CTA */}
        {id === 15 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Complete the Course?</h2>
            <p className="text-blue-100 mb-6">Sign up to track progress, earn badges, and submit your capstone project.</p>
            <Link
              href="/auth/sign-up"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition"
            >
              Create Account →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
