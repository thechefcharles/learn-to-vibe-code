import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Learn to Vibe Code",
  description: "Terms of Service for the Accredited Vibe Coding Course.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundImage: 'url(/legal-terms-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/30" />
      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block font-semibold">
          ← Back to Home
        </Link>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-8 border border-white/20 text-gray-200">
          <h1 className="text-4xl font-bold text-white mb-8 uppercase tracking-wide">Terms of Service</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Learn to Vibe Code platform ("Service"), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">2.Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Learn to
                Vibe Code for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Disclaimer</h2>
              <p>
                The materials on Learn to Vibe Code are provided on an "as is" basis. Learn to Vibe Code makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
                property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Limitations</h2>
              <p>
                In no event shall Learn to Vibe Code or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the
                materials on Learn to Vibe Code.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Learn to Vibe Code could include technical, typographical, or photographic errors. Learn
                to Vibe Code does not warrant that any of the materials on the Service are accurate, complete, or current. Learn to
                Vibe Code may make changes to the materials contained on the Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Links</h2>
              <p>
                Learn to Vibe Code has not reviewed all of the sites linked to its website and is not responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by Learn to Vibe Code of the site. Use
                of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Modifications</h2>
              <p>
                Learn to Vibe Code may revise these Terms of Service at any time without notice. By using this Service, you are
                agreeing to be bound by the then current version of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which
                Learn to Vibe Code operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="border-t border-slate-600 pt-6">
              <p className="text-slate-400">
                Last updated: {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
