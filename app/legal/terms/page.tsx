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
            <section className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
              <h3 className="text-amber-400 font-bold mb-2">⚠️ ACCREDITATION STATUS</h3>
              <p className="text-sm">
                Learn to Vibe Code is <strong>pursuing accreditation</strong> but is currently <strong>NOT an accredited program</strong>.
                Your completion certificate is proof that you learned to code with us—not a transferable academic credit or professional license.
                See Section 3 below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Learn to Vibe Code platform ("Service"), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Learn to
                Vibe Code for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software on the Service</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">3. Course Completion Badge & Non-Accreditation Disclaimer</h2>
              <p className="font-semibold text-amber-300 mb-3">IMPORTANT: Please read carefully.</p>
              <p className="mb-3">
                Upon completing all 16 modules and passing your capstone project, you will receive a <strong>Course Completion Badge</strong> from Learn to Vibe Code.
                This badge represents that you have completed our curriculum and demonstrated competency in AI-assisted development.
                <strong className="text-red-400"> This is NOT an accredited credential, degree, or professional certification.</strong>
              </p>
              <p className="mb-3 font-semibold">Your Completion Badge is:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>✓ Proof that you completed our 16-module curriculum</li>
                <li>✓ Evidence of learning in AI-assisted full-stack development</li>
                <li>✓ Shareable in your portfolio or on LinkedIn as proof of participation</li>
              </ul>
              <p className="mb-3 font-semibold">Your Completion Badge is NOT and does NOT:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>✗ Constitute a professional license, degree, or academic credit</li>
                <li>✗ Transfer to universities or other educational institutions</li>
                <li>✗ Guarantee employment, a specific salary, or career advancement</li>
                <li>✗ Come from an accredited institution (Learn to Vibe Code is pursuing accreditation but is currently unaccredited)</li>
                <li>✗ Replace formal education or professional certifications required by law or regulation</li>
                <li>✗ Entitle you to claim credentials that you have not earned through an accredited institution</li>
              </ul>
              <p className="bg-slate-700/50 p-3 rounded">
                <strong>Your responsibility:</strong> You are responsible for assessing whether this course meets your career goals and verifying with employers whether they accept our completion badge.
                Some employers value self-directed learning; others may not. Your success depends on your effort, practice, and how you apply these skills in real-world projects.
                <strong> Misrepresenting this badge as an accredited credential may violate laws protecting credential holders.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">4. Educational Content Disclaimer</h2>
              <p className="font-semibold mb-2">Course Content Quality:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>All course materials and assessments are provided "as-is"</li>
                <li>Content is generated using AI tools (Claude, Cursor, Claude Code) and may contain errors or ambiguities</li>
                <li>We make no guarantee that lessons are perfect, complete, or universally applicable to your situation</li>
                <li>You may encounter technical issues, unclear explanations, or content that doesn't match your learning style</li>
              </ul>
              <p className="font-semibold mb-2">Learning Outcomes:</p>
              <p>
                Completing all modules does <strong>NOT guarantee</strong> employment, a specific salary, industry-wide recognition, or mastery
                of all AI development concepts. Learning outcomes vary significantly based on individual effort, background knowledge, and how
                you apply these skills. <strong>We are not liable if you complete the course but do not achieve your career goals.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">5. Limitation of Liability</h2>
              <p className="mb-3">
                <strong>YOU ASSUME ALL RISK</strong> related to your use of this platform. In no event shall Learn to Vibe Code be liable for:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Loss of time or productivity if you don't pass quizzes or capstone</li>
                <li>Employment outcomes or career advancement (positive or negative)</li>
                <li>Loss of earnings, salary, or career opportunities</li>
                <li>Employer rejection of our certificate</li>
                <li>Data loss, privacy breaches (we maintain security, but no system is perfect)</li>
                <li>Any third-party content or linked websites</li>
              </ul>
              <p className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                This is a <strong>free course</strong>. Your only loss is time. If you're not willing to accept the risk that you may not reach
                your goals after completing this curriculum, do not enroll.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">6. Refunds & Donation Disputes</h2>
              <p className="mb-3">
                <strong>For Donations:</strong> Donations are voluntary contributions to support Learn to Vibe Code.
                Refund requests must be submitted in writing to <strong>support@learntovibe.code</strong> within <strong>30 days of your donation</strong>.
              </p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Refund requests made after 30 days will be denied</li>
                <li>Refunds are processed via your original payment method (Stripe) within 5-10 business days</li>
                <li>Disputed charges should be reported directly to your bank or payment provider</li>
                <li>If you initiate a chargeback without requesting a refund first, your account may be suspended</li>
              </ul>
              <p className="bg-slate-700/50 p-3 rounded">
                <strong>The course is free to use.</strong> Donations are optional and do not affect your access to course materials or the ability to earn a completion badge.
                If you have concerns about a charge, contact <strong>support@learntovibe.code</strong> before disputing with your bank.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">7. Instructor Feedback & Grading</h2>
              <p className="mb-3">
                Instructor feedback on your quizzes, deliverables, and capstone project is <strong>educational opinion</strong>, not professional advice.
              </p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Feedback is intended to help you learn, not to guarantee career outcomes or employment</li>
                <li>Instructors are not liable for any employment, salary, or career-related consequences of their feedback</li>
                <li>If you believe a score is unfair, you may request a re-review by emailing <strong>support@learntovibe.code</strong> within 7 days</li>
                <li>All grading decisions are final after re-review</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">8. User Conduct</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Share quiz answers or capstone solutions with other learners (violates academic integrity)</li>
                <li>Reverse-engineer, scrape, or copy course content</li>
                <li>Harass, threaten, or impersonate instructors or other learners</li>
                <li>Attempt unauthorized access to grading systems or other learner data</li>
                <li>Violate applicable laws while using this platform</li>
              </ul>
              <p>
                Violations may result in quiz/capstone score resets, account suspension, or permanent ban.
                If you have already received a certificate, it may be revoked.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">9. Intellectual Property</h2>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Your Work:</strong> You retain all rights to your capstone project code and deliverables</li>
                <li><strong>Our Content:</strong> All lessons, quizzes, and assessments are our property. Do not copy or redistribute without permission</li>
                <li><strong>Your Feedback:</strong> Any feedback you provide may be used to improve the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">10. Modifications</h2>
              <p>
                Learn to Vibe Code may revise these Terms of Service at any time without notice. By continuing to use this Service
                after changes are posted, you agree to be bound by the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">11. Dispute Resolution & Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Learn to Vibe Code operates.
                Any legal dispute will be resolved through binding arbitration, not court proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">12. Severability</h2>
              <p>
                If any provision of these Terms is found unenforceable, that provision is severed, and the remainder of these Terms continues
                in full force.
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
