import Link from "next/link";

export const metadata = {
  title: "Refund Policy - Learn to Vibe Code",
  description: "Refund policy for the Accredited Vibe Coding Course donations",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundImage: 'url(/settings-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/30" />
      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block font-semibold">
          ← Back to Home
        </Link>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-8 border border-white/20 text-gray-200">
          <h1 className="text-4xl font-bold text-white mb-8 uppercase tracking-wide">Refund Policy</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">Donations</h2>
              <p className="mb-3">
                The Learn to Vibe Code course is completely <strong>FREE</strong>. There are no tuition fees, enrollment fees, or access charges.
                We accept <strong>voluntary donations</strong> to support ongoing course development, platform maintenance, and operations.
              </p>
              <p className="font-semibold mb-2">What Donations Fund:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Server costs and infrastructure (Supabase, Vercel, Stripe)</li>
                <li>Content development and curriculum updates</li>
                <li>Instructor grading and learner support</li>
                <li>Platform maintenance and security improvements</li>
                <li>Pursuit of accreditation (application fees, audits, compliance)</li>
              </ul>
              <p className="font-semibold mb-2">Donations Do NOT Guarantee:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Faster grading or priority support</li>
                <li>Direct access to course developers</li>
                <li>Input on curriculum decisions</li>
                <li>Special perks or exclusive content</li>
              </ul>
              <p>
                All donations are processed securely through Stripe and are <strong>non-refundable</strong> except where required by applicable law.
                Donations do not affect your course access in any way.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Refund Eligibility</h2>
              <p>
                While donations are generally non-refundable, we recognize the following exceptions within 30 days of your transaction:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Duplicate Charges:</strong> If you were charged twice for a single donation</li>
                <li><strong>Unauthorized Transactions:</strong> If a donation was made without your consent</li>
                <li><strong>Technical Errors:</strong> If an error in our payment system resulted in an unintended charge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">How to Request a Refund</h2>
              <p>
                To request a refund within the 30-day window, please contact our support team with the following information:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your name and email address</li>
                <li>Your Stripe receipt or transaction ID (if available)</li>
                <li>The date of the donation</li>
                <li>A brief explanation of why you are requesting a refund</li>
              </ul>
              <p className="mt-3">
                Send your request to:{" "}
                <a href="mailto:support@learntovibe.code" className="text-blue-400 hover:text-blue-300">
                  support@learntovibe.code
                </a>
              </p>
              <p className="mt-2">
                Approved refund requests will be processed within 5–10 business days. The funds will be returned to your original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Chargeback Process</h2>
              <p>
                If you dispute a donation charge through your bank or payment provider, it will be treated as a chargeback. Chargebacks may incur additional fees and could result in your account being flagged or suspended from future donations. We strongly encourage you to contact us first via email before initiating a chargeback, as we can often resolve issues more quickly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">Course Access</h2>
              <p>
                Your access to the free Accredited Vibe Coding Course is not affected by donations, refunds, or chargebacks. The course remains free and available to all learners regardless of donation status. Refunds of donations do not impact your ability to enroll in, progress through, or complete any modules, quizzes, or capstone projects.
              </p>
            </section>

            <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h2 className="text-xl font-bold text-red-400 mb-3">Tax Deduction</h2>
              <p className="mb-2">
                <strong>IMPORTANT: Learn to Vibe Code is NOT a nonprofit organization.</strong>
              </p>
              <p className="mb-2">
                Donations are <strong>NOT tax-deductible</strong>. You cannot claim your donation as a charitable contribution on your taxes.
              </p>
              <p>
                If you need documentation for your records, we can provide a receipt showing the donation date and amount.
                For questions about how donations affect your taxes, consult with a tax professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">Questions?</h2>
              <p>
                If you have any questions or concerns about this Refund Policy, please reach out to us at:{" "}
                <a href="mailto:support@learntovibe.code" className="text-blue-400 hover:text-blue-300">
                  support@learntovibe.code
                </a>
              </p>
            </section>

            <section className="border-t border-slate-600 pt-6 mt-8">
              <div className="space-y-3">
                <p className="text-slate-400">
                  Last updated: {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-4 text-sm">
                  <Link href="/legal/terms" className="text-cyan-400 hover:text-cyan-300">
                    Terms of Service
                  </Link>
                  <span className="text-slate-500">•</span>
                  <Link href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
