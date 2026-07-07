import Link from "next/link";

export const metadata = {
  title: "Refund Policy — Learn to Vibe Code",
  description: "Refund Policy for the Accredited Vibe Coding Course.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-slate-100">
          <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Free Course Access</h2>
              <p>
                The Accredited Vibe Coding Course is completely free. All 16 modules, quizzes, projects, and capstone grading are
                provided at no cost.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Donations</h2>
              <p>
                We accept voluntary donations to support course development and maintenance. Donations are processed through Stripe
                and are non-refundable except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Donation Refunds</h2>
              <p>
                If you wish to request a refund for a donation, please contact us within 30 days of the transaction:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Email: support@learntovibe.code</li>
                <li>Provide your Stripe receipt or transaction ID</li>
                <li>Refund requests will be processed within 5-10 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Certificate Revocation</h2>
              <p>
                Certificates are issued upon successful completion of the capstone with a passing grade. Certificates may be
                revoked if:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Evidence of academic dishonesty or cheating is discovered</li>
                <li>The learner requests revocation</li>
                <li>The course is no longer accredited (with proper notice)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Account Deletion</h2>
              <p>
                If you wish to delete your account and all associated learning data, please contact us at:{" "}
                <a href="mailto:support@learntovibe.code" className="text-blue-400 hover:text-blue-300">
                  support@learntovibe.code
                </a>
              </p>
              <p className="mt-2">
                Upon deletion, your course progress will be permanently removed from our system. Certificates previously issued
                remain valid unless revoked.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Changes to This Policy</h2>
              <p>
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to
                this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
              <p>
                For questions about this Refund Policy, please contact us at:{" "}
                <a href="mailto:support@learntovibe.code" className="text-blue-400 hover:text-blue-300">
                  support@learntovibe.code
                </a>
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
