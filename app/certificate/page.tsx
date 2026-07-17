import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import { getCertificateHTML } from "@/lib/certificate";

export const metadata = {
  title: "Certificate — Learn to Vibe Code",
  description: "View and share your Learn to Vibe Code Certificate.",
};

export default async function CertificatePage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  let certificateHtml: string | null = null;
  let error: string | null = null;

  try {
    certificateHtml = await getCertificateHTML(user.id);
    if (!certificateHtml) {
      error = "Certificate not yet issued. Complete and pass the capstone to earn your certificate.";
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load certificate";
  }

  if (error || !certificateHtml) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-4">📜 Your Certificate</h1>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-200">
              <p>{error}</p>
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-slate-400">To earn your certificate, you need to:</p>
              <ol className="text-slate-400 space-y-2 list-decimal list-inside">
                <li>Complete all 16 modules</li>
                <li>Pass all quizzes (80%+ score)</li>
                <li>Submit and pass all module deliverables</li>
                <li>Submit your capstone project</li>
                <li>Have your capstone graded as "pass" by an instructor</li>
              </ol>
            </div>
            <Link href="/capstone" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
              → Go to Capstone
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">📜 Your Certificate</h1>
          <p className="text-slate-400">Congratulations on completing Learn to Vibe Code!</p>
        </div>

        <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <iframe
            srcDoc={certificateHtml}
            style={{
              width: "100%",
              height: "600px",
              border: "none",
              borderRadius: "4px",
            }}
            title="Certificate Preview"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            🖨️ Print / Download PDF
          </button>
          <button
            onClick={() => {
              const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/certificate`;
              navigator.clipboard.writeText(shareUrl);
              alert("Certificate link copied to clipboard!");
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            🔗 Copy Share Link
          </button>
        </div>

        <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">About Your Certificate</h2>
          <div className="space-y-2 text-slate-400 text-sm">
            <p>✅ <strong>Verifiable:</strong> Your certificate ID is registered in our database.</p>
            <p>✅ <strong>Professional:</strong> Suitable for LinkedIn, resumes, and professional portfolios.</p>
            <p>✅ <strong>Comprehensive:</strong> 100 hours of quality content and assessment.</p>
            <p>✅ <strong>Permanent:</strong> Your certificate is saved and accessible anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
