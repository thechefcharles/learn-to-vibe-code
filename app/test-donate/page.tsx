"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestDonatePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = async (type: string) => {
    setLoading(type);
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("Donation failed. Check browser console for details.");
    } finally {
      setLoading(null);
    }
  };

  const handleCustom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(customAmount);

    if (!amount || amount < 1) {
      alert("Please enter an amount ≥ $1");
      return;
    }

    setLoading("custom");
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
      alert("Donation failed. Check browser console for details.");
    } finally {
      setLoading(null);
    }
  };

  const donations = [
    { type: "coffee", amount: 5, label: "☕ Buy me a coffee", emoji: "☕" },
    { type: "tea", amount: 10, label: "🍵 Cup of tea", emoji: "🍵" },
    { type: "lunch", amount: 25, label: "🍽️ Lunch", emoji: "🍽️" },
    { type: "dinner", amount: 50, label: "🍷 Dinner", emoji: "🍷" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">Test Donation Flow</h1>
          <p className="text-slate-400 mb-8">
            This page tests Stripe integration in sandbox mode. No real charges will be made.
          </p>

          {/* Quick Donation Buttons */}
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Quick Amounts ($5, $10, $25, $50):</h2>

            {donations.map((item) => (
              <button
                key={item.type}
                onClick={() => handleDonate(item.type)}
                disabled={loading !== null}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition"
              >
                {loading === item.type ? "Processing..." : `${item.label} ($${item.amount})`}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mt-8 pt-8 border-t border-slate-600">
            <h2 className="text-lg font-bold text-white mb-4">Custom Amount:</h2>
            <form onSubmit={handleCustom} className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Enter amount (e.g., 15)"
                  step="0.01"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  disabled={loading !== null}
                />
              </div>
              <button
                type="submit"
                disabled={loading !== null}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                {loading === "custom" ? "..." : "Donate"}
              </button>
            </form>
          </div>

          {/* Test Card Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-bold text-blue-400 mb-4">💳 Stripe Sandbox Test Card</h3>
            <div className="space-y-2 text-slate-300 font-mono text-sm">
              <div>
                <strong>Card Number:</strong> <code>4242 4242 4242 4242</code>
              </div>
              <div>
                <strong>Expiry:</strong> <code>12/25</code> (or any future date)
              </div>
              <div>
                <strong>CVC:</strong> <code>123</code> (or any 3 digits)
              </div>
              <div>
                <strong>ZIP:</strong> <code>12345</code> (or any 5 digits)
              </div>
            </div>
            <p className="text-blue-300 text-sm mt-4">
              ℹ️ Use this card to test successful payments. After checkout, you'll be redirected to
              the success page.
            </p>
          </div>

          {/* Testing Notes */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">📝 Testing Notes</h3>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>
                ✅ <strong>This is SANDBOX mode:</strong> No real money will be charged
              </li>
              <li>
                ✅ <strong>Test card:</strong> Use 4242 4242 4242 4242 to simulate success
              </li>
              <li>
                ❌ <strong>To test failure:</strong> Use 4000 0000 0000 0002 (card will be declined)
              </li>
              <li>✅ <strong>Check Stripe Dashboard:</strong> All transactions appear at https://dashboard.stripe.com/payments</li>
              <li>
                ✅ <strong>Success redirect:</strong> After payment, you'll be sent to `/support?success=true`
              </li>
            </ul>
          </div>

          {/* More Test Cards */}
          <div className="bg-slate-700 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-white mb-4">🧪 Other Test Cards</h3>
            <div className="space-y-2 text-slate-300 text-sm">
              <div>
                <code className="bg-slate-800 px-2 py-1 rounded">4000 0000 0000 0069</code> →
                Card expired
              </div>
              <div>
                <code className="bg-slate-800 px-2 py-1 rounded">4000 0000 0000 0002</code> →
                Card declined
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Full list: https://stripe.com/docs/testing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
