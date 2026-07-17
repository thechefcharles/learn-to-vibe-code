import { Metadata } from "next";
import { getCertificateById } from "@/lib/certificate";
import Link from "next/link";

interface PageProps {
  params: Promise<{ cert_id: string }>;
}

/**
 * Generate dynamic metadata for certificate page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cert_id } = await params;
  const certData = await getCertificateById(cert_id);

  if (!certData) {
    return {
      title: "Certificate Not Found — Learn to Vibe Code",
      description: "The certificate you are looking for could not be found.",
    };
  }

  return {
    title: `${certData.user.name}'s Certificate — Learn to Vibe Code`,
    description: `Certificate of Completion for ${certData.user.name} - Accredited Vibe Coding Course`,
    openGraph: {
      title: `${certData.user.name}'s Certificate — Learn to Vibe Code`,
      description: "Certificate of Completion - Accredited Vibe Coding Course",
      type: "website",
    },
  };
}

/**
 * Public certificate view page (no authentication required)
 * Displays certificate for sharing and download
 */
export default async function PublicCertificatePage({ params }: PageProps) {
  const { cert_id } = await params;
  const certData = await getCertificateById(cert_id);

  if (!certData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-4">📜 Certificate</h1>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-200">
              <p>The certificate you are looking for could not be found.</p>
              <p className="text-sm mt-2 text-red-300">
                The certificate ID may be invalid or this certificate may have been removed.
              </p>
            </div>
            <div className="mt-8">
              <p className="text-slate-400 mb-4">
                If you believe this is an error, please contact support.
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                → Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(certData.certificate.issued_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">📜 Certificate of Completion</h1>
          <p className="text-slate-400">
            Accredited Vibe Coding Course — {certData.user.name}
          </p>
        </div>

        {/* Certificate Display */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <iframe
            srcDoc={certData.html}
            style={{
              width: "100%",
              height: "600px",
              border: "none",
              borderRadius: "4px",
            }}
            title={`Certificate for ${certData.user.name}`}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Print/Download Button */}
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>🖨️</span>
            <span>Print / Download PDF</span>
          </button>

          {/* Share Button */}
          <button
            onClick={async () => {
              try {
                const shareUrl = `${
                  typeof window !== "undefined" ? window.location.origin : ""
                }/certificate/${cert_id}`;

                if (navigator.share) {
                  await navigator.share({
                    title: `${certData.user.name}'s Certificate`,
                    text: "Certificate of Completion - Accredited Vibe Coding Course",
                    url: shareUrl,
                  });
                } else {
                  // Fallback: copy to clipboard
                  await navigator.clipboard.writeText(shareUrl);
                  alert("Certificate link copied to clipboard!");
                }
              } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                  console.error("Share error:", error);
                }
              }
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>🔗</span>
            <span>Share Certificate</span>
          </button>

          {/* Download Link */}
          <a
            href={`/api/certificate/${cert_id}/download`}
            download={`certificate-${cert_id}.html`}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>⬇️</span>
            <span>Download HTML</span>
          </a>
        </div>

        {/* Certificate Details */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Certificate Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400 text-sm">
            <div>
              <p className="text-slate-300 font-semibold mb-1">Learner Name</p>
              <p>{certData.user.name}</p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Certificate ID</p>
              <p className="font-mono text-xs">{certData.certificate.cert_id}</p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Issue Date</p>
              <p>{formattedDate}</p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Contact Hours & CEUs</p>
              <p>100 Hours · 10.0 CEUs</p>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">About This Certificate</h2>
          <div className="space-y-2 text-slate-400 text-sm">
            <p>✅ <strong>Verifiable:</strong> This certificate ID is registered in our database and can be verified.</p>
            <p>✅ <strong>Professional:</strong> Suitable for LinkedIn, resumes, and professional portfolios.</p>
            <p>✅ <strong>Comprehensive:</strong> 100 hours of quality content and rigorous assessment.</p>
            <p>✅ <strong>Accredited:</strong> Completion tracked for CPD and future IACET accreditation.</p>
            <p>✅ <strong>Shareable:</strong> Use the share button to show your achievement to employers and colleagues.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
