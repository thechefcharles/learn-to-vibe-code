"use client";

import Link from "next/link";
import { useState } from "react";

export default function SupportPage() {
  const [copied, setCopied] = useState(false);

  const handleDonate = async (amount: number) => {
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("Donation failed. Please try again.");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("support@learntovibe.code");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-slate-800/50 border-b border-slate-700 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition">
            Learn to Vibe Code
          </Link>
          <div className="space-x-6">
            <Link href="/course" className="text-slate-300 hover:text-white transition">
              Course
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-white transition">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">💚 Support Us</h1>
          <p className="text-xl text-slate-300">
            The course is completely free. Help us keep it that way.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Free Tier */}
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">✅ Free Forever</h2>
            <p className="text-slate-300 mb-6">
              The entire course is completely free. All 16 modules, quizzes, projects, capstone grading, and certificates — no paywalls, no gates, no hidden costs.
            </p>
            <div className="space-y-2 text-slate-400 text-sm">
              <p>✓ 16 modules (93 contact hours)</p>
              <p>✓ 48 quizzes with instant feedback</p>
              <p>✓ 15 hands-on projects</p>
              <p>✓ Live capstone project</p>
              <p>✓ Verifiable certificate</p>
              <p>✓ Professional credential</p>
            </div>
            <Link
              href="/course"
              className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition"
            >
              Start Learning →
            </Link>
          </div>

          {/* Support Tier */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border border-purple-600">
            <h2 className="text-2xl font-bold text-white mb-4">💜 Support Development</h2>
            <p className="text-slate-200 mb-6">
              Donations help us maintain the course, improve content, and keep it free for everyone. Every contribution counts.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleDonate(5)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                ☕ Buy me a coffee ($5)
              </button>
              <button
                onClick={() => handleDonate(10)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                🍵 Buy me tea ($10)
              </button>
              <button
                onClick={() => handleDonate(25)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                🍽️ Buy me lunch ($25)
              </button>
              <button
                onClick={() => handleDonate(50)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                🍷 Buy me dinner ($50)
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Secure payment via Stripe. No recurring charges.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Questions?</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Is the course really free?</h3>
              <p className="text-slate-300">
                Yes, completely free. No paywalls, no signup fees, no hidden costs. The entire course, all modules, quizzes, projects, capstone grading, and certificates are available to everyone at no cost.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Do I have to donate?</h3>
              <p className="text-slate-300">
                No. Donations are completely optional and appreciated, but not required. You can complete the entire course and earn your certificate without ever donating.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Where does my donation go?</h3>
              <p className="text-slate-300">
                Donations support course maintenance, content improvements, instructor grading, and keeping the platform running so it stays free for future learners.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Is my payment secure?</h3>
              <p className="text-slate-300">
                Yes. All payments are processed securely through Stripe. We never store your payment information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Other ways to support?</h3>
              <p className="text-slate-300 mb-2">
                Spread the word! Share the course with friends, mention it on social media, or send feedback:
              </p>
              <button
                onClick={copyEmail}
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
              >
                {copied ? "✅ Copied!" : "📧 Copy Email"}
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Learn?</h2>
          <p className="text-blue-100 mb-6">
            The course is free. Your certificate is real. Your skills are employer-ready.
          </p>
          <Link
            href="/course"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-slate-100 transition"
          >
            Start the Course →
          </Link>
        </div>
      </div>
    </div>
  );
}
