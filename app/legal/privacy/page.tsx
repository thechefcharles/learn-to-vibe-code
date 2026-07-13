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
                explains how we collect, use, disclose, and safeguard your information when you visit our website and use our
                services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-cyan-400 mb-3 uppercase tracking-wide">2.Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Personal Data:</strong> Name, email address, password</li>
                <li><strong>Learning Data:</strong> Course progress, quiz scores, module completion</li>
                <li><strong>Technical Data:</strong> IP address, browser type, pages visited</li>
                <li><strong>Payment Data:</strong> Stripe processes all payments (we do not store card data)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Track course progress and generate completion certificates</li>
                <li>Send you newsletters and updates about your course</li>
                <li>Evaluate course effectiveness through learning analytics</li>
                <li>Respond to your inquiries and fulfill your requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Disclosure of Your Information</h2>
              <p>
                We may share your information with third parties in the following circumstances:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Stripe:</strong> For payment processing (no card data stored by us)</li>
                <li><strong>Supabase:</strong> For data storage and authentication</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. All data is
                transmitted via secure HTTPS connections, and sensitive data is encrypted in our Supabase database.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Contact Us Regarding Privacy</h2>
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
