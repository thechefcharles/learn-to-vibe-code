import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - Learn to Vibe Code",
  description: "Terms of Service for Learn to Vibe Code course platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* DRAFT BANNER */}
        <div className="mb-8 p-4 bg-red-500/20 border-l-4 border-red-500">
          <p className="text-red-400 font-bold">
            ⚠️ DRAFT — Pending Attorney Review
          </p>
          <p className="text-red-300 text-sm mt-2">
            These Terms of Service are pending legal review and should not be
            considered final or binding. Do not use in production until
            attorney approval is obtained.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Course Use</h2>
          <p className="text-slate-300 mb-4">
            Learn to Vibe Code (the "Course") is provided as-is for educational purposes. By
            enrolling, you agree to use the Course only for your personal educational
            benefit and in compliance with all applicable laws.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Free Access & Donations</h2>
          <p className="text-slate-300 mb-4">
            The Course is offered at no cost. Optional donations are voluntary and
            non-refundable. Donations support the maintenance and improvement of the
            course material.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Learner Responsibility</h2>
          <p className="text-slate-300 mb-4">
            You are responsible for:
          </p>
          <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
            <li>Ensuring your own computer meets system requirements</li>
            <li>Maintaining confidentiality of your login credentials</li>
            <li>Submitting only work that is your own (AI assistance is expected and allowed,
              but you must understand and be able to explain every line you ship)</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Intellectual Property</h2>
          <p className="text-slate-300 mb-4">
            You retain ownership of any projects, code, or work you create during the Course.
            Course materials (lessons, quizzes, rubrics) are copyrighted and licensed for
            educational use only. You may not redistribute, resell, or use them commercially
            without written permission.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Certificates</h2>
          <p className="text-slate-300 mb-4">
            Upon passing the capstone project (≥80% on the rubric), you will receive a
            digital Certificate of Completion. Certificates are non-transferable and
            represent your achievement of the course's learning objectives.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-300 mb-4">
            The Course is provided "as-is" without warranty. The course creators are not
            liable for any damages, losses, or issues arising from your use of the Course,
            including (but not limited to) technical problems, data loss, or reliance on
            course material.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Changes & Termination</h2>
          <p className="text-slate-300 mb-4">
            The course creators reserve the right to modify or discontinue the Course at any
            time without notice. Access may be terminated if you violate these terms.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Governing Law</h2>
          <p className="text-slate-300 mb-4">
            These terms are governed by applicable law. For disputes, you agree to seek
            resolution through good-faith communication first.
          </p>

          <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-blue-300 text-sm mt-2">
              These terms are subject to change. Continued use of the Course after changes
              constitutes acceptance.
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
