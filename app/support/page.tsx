"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function SupportContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-12">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Thank You! 💚</h3>
                <p className="text-green-300">
                  Your donation was successful. You'll receive a receipt via email shortly. Thank you for supporting the course!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cancelled Message */}
        {cancelled && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mb-12">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Donation Cancelled</h3>
                <p className="text-amber-300">
                  Your donation was cancelled. No charge was made. Feel free to try again or reach out if you have any issues.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-lg p-8 border border-violet-500/20">
          <h1 className="text-5xl font-bold text-white mb-4">Support & Donate</h1>
          <p className="text-xl text-slate-300">
            Help keep this course free and accessible for everyone
          </p>
        </div>

        {/* Donation Section */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">☕ Support the Course</h2>
          <p className="text-slate-300 mb-8">
            This course is free, but donations help us maintain the platform, create new content, and keep learning accessible. Any amount helps!
          </p>

          {/* Stripe Donations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Donate via Card</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { amount: "5", label: "☕ Coffee", emoji: "☕" },
                { amount: "10", label: "🍵 Tea", emoji: "🍵" },
                { amount: "25", label: "🥗 Lunch", emoji: "🥗" },
                { amount: "50", label: "🍽️ Dinner", emoji: "🍽️" },
              ].map((tier) => (
                <form
                  key={tier.amount}
                  action="/api/donate"
                  method="POST"
                  className="inline"
                >
                  <input type="hidden" name="type" value={tier.amount === "5" ? "coffee" : tier.amount === "10" ? "tea" : tier.amount === "25" ? "lunch" : "dinner"} />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                  >
                    {tier.emoji} ${tier.amount}
                  </button>
                </form>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Custom Amount
              </label>
              <form action="/api/donate" method="POST" className="flex gap-2">
                <input
                  type="number"
                  name="amount"
                  min="1"
                  max="10000"
                  placeholder="Enter amount in dollars"
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Donate
                </button>
              </form>
              <p className="text-xs text-slate-400 mt-2">
                Uses Stripe Checkout (sandbox mode). Test card: 4242 4242 4242 4242
              </p>
            </div>
          </div>

          {/* PayPal */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">PayPal</h3>
            <a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              💙 Donate via PayPal
            </a>
            <p className="text-slate-400 text-sm mt-2">Coming soon — PayPal link TBD</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">❓ FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Is the course really free?
              </h3>
              <p className="text-slate-400">
                Yes! The entire course is free. Donations are optional and help us maintain the platform and create new content.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What happens if I donate?
              </h3>
              <p className="text-slate-400">
                You'll get a confirmation receipt. Your donation helps us keep learning accessible and fund platform improvements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What is the refund policy?
              </h3>
              <p className="text-slate-400">
                See our{" "}
                <Link href="/legal/refund" className="text-blue-400 hover:text-blue-300">
                  Refund Policy
                </Link>{" "}
                for details on donation refunds.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                How do I know my donation is secure?
              </h3>
              <p className="text-slate-400">
                We use Stripe for payment processing, which is PCI-DSS compliant and encrypts all transactions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I get a receipt or invoice?
              </h3>
              <p className="text-slate-400">
                Yes, you'll receive a receipt via email after a successful donation. For invoices, contact support@learntovibe.code.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Is my donation tax-deductible?
              </h3>
              <p className="text-slate-400">
                We are not currently a registered nonprofit, so donations are not tax-deductible. This may change in the future.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6">📧 Contact & Support</h2>
          <p className="text-slate-400 mb-4">
            Questions or issues? Reach out to us:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li>
              <strong>Email:</strong> support@learntovibe.code
            </li>
            <li>
              <strong>Discord:</strong> Coming soon
            </li>
            <li>
              <strong>X (Twitter):</strong> @learntovibe
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/legal/terms"
              className="text-blue-400 hover:text-blue-300 mr-6"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy"
              className="text-blue-400 hover:text-blue-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SupportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800" />}>
      <SupportContent />
    </Suspense>
  );
}
