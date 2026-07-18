import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Learn to Vibe Code",
  description: "Privacy Policy for the Accredited Vibe Coding Course.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundImage: 'url(/legal-privacy-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
      {/* Dark Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/30" />
      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block font-semibold">
          ← Back to Home
        </Link>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-lg p-8 border border-white/20 text-gray-200">
          <h1 className="text-4xl font-bold text-white mb-8 uppercase tracking-wide">Privacy Policy</h1>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">1. Introduction</h2>
              <p>
                Learn to Vibe Code ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">2. Information We Collect</h2>
              <p>We collect information about you in the following categories:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Personal Data:</strong> Name, email address, password</li>
                <li><strong>Learning Data:</strong> Course progress, quiz scores, module completion, capstone submission, grading notes</li>
                <li><strong>Technical Data:</strong> IP address, browser type, pages visited, login times</li>
                <li><strong>Payment Data:</strong> Stripe processes donations (we do not store credit card data)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">3. Use of Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Track course progress and generate completion certificates</li>
                <li>Grade quizzes, deliverables, and capstone projects</li>
                <li>Send course updates and support communications</li>
                <li>Evaluate learning outcomes and course effectiveness</li>
                <li>Respond to your inquiries and fulfill support requests</li>
                <li>Share aggregate data with accreditors for compliance audits (your name is removed; only scores/pass rates shared)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">4. Data Retention & Your Rights</h2>
              <p className="font-semibold mb-2">How Long We Keep Your Data:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Account Data (name, email, password):</strong> Retained while your account is active; deleted 30 days after account deletion</li>
                <li><strong>Learning Records (quizzes, grades, capstone, certificate):</strong> Retained for 7 years to comply with accreditation audits</li>
                <li><strong>Technical Logs (IP, browser, pages):</strong> Retained for 90 days, then deleted</li>
                <li><strong>Donation Records (Stripe):</strong> Handled by Stripe; we keep a reference only</li>
              </ul>
              <p className="font-semibold mb-2">Your Rights (GDPR & CCPA):</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Right to Access:</strong> Request a copy of all your personal data</li>
                <li><strong>Right to Correct:</strong> Update inaccurate information</li>
                <li><strong>Right to Delete:</strong> Request deletion (except where we have legal/accreditation obligations)</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              </ul>
              <p className="text-sm text-slate-400">
                To exercise any of these rights, email: <a href="mailto:privacy@learntovibe.code" className="text-blue-400 hover:text-blue-300">privacy@learntovibe.code</a>
                (response within 30 days)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">5. Data Access & Learner Records</h2>
              <p className="font-semibold mb-2">Your Learning Record Includes:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Enrollment date and course status</li>
                <li>Module completion dates and status</li>
                <li>Quiz attempt history: date, score (%), pass/fail status</li>
                <li>Deliverable submissions: approval status, feedback</li>
                <li>Capstone submission: project links, rubric scores, grader feedback</li>
                <li>Certificate ID and issuance date (if applicable)</li>
              </ul>
              <p>
                You can request your complete learning record at any time. Email <a href="mailto:privacy@learntovibe.code" className="text-blue-400 hover:text-blue-300">privacy@learntovibe.code</a> with
                "Request Learning Record" in the subject line. We'll respond within 10 business days with a downloadable file.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">6. Disclosure of Your Information</h2>
              <p className="font-semibold mb-2">We share your information only with:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Stripe:</strong> Payment processing (no card data stored by us)</li>
                <li><strong>Supabase:</strong> Database and authentication (EU-based, GDPR compliant)</li>
                <li><strong>Accreditors (CPD, IACET):</strong> Aggregate data only; your name is removed, only scores/completion data shared</li>
                <li><strong>Legal/Law Enforcement:</strong> When required by law or to protect rights</li>
              </ul>
              <p className="text-sm text-slate-400">
                We have data processing agreements in place with Supabase and Stripe. We do NOT sell or trade your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">7. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2 mb-3">
                <li>All data transmitted via encrypted HTTPS connections</li>
                <li>Passwords hashed using industry-standard algorithms</li>
                <li>Database encrypted at rest in Supabase</li>
                <li>Regular security audits and vulnerability scans</li>
                <li>No credit card data stored (Stripe handles all payment data)</li>
              </ul>
              <p className="text-sm text-amber-300">
                <strong>Note:</strong> No security system is perfect. We commit to protecting your data, but we cannot guarantee absolute protection.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">8. Children's Privacy (COPPA Compliance)</h2>
              <p className="font-semibold mb-2">For Learners Under 13:</p>
              <p className="mb-3">
                Learn to Vibe Code offers a "kids" version of the course for learners ages 11–17.
                If a learner identifies as under 13, we require verifiable parental consent before account creation.
              </p>
              <p className="font-semibold mb-2">Parental Rights:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Parents can request a review of their child's information at any time</li>
                <li>Parents can request deletion of their child's account and data (except learning records required for accreditation)</li>
                <li>We do not use children's data for marketing or third-party advertising</li>
                <li>We collect only the minimum data necessary (name, email, course progress)</li>
              </ul>
              <p className="text-sm text-slate-400">
                For children's privacy requests, email: <a href="mailto:privacy@learntovibe.code" className="text-blue-400 hover:text-blue-300">privacy@learntovibe.code</a> with
                "Children's Privacy Request" in the subject line and proof of guardianship.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">9. Contact Us Regarding Privacy</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:privacy@learntovibe.code" className="text-blue-400 hover:text-blue-300">
                  privacy@learntovibe.code
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
