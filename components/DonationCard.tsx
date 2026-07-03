"use client";

import { useState } from "react";

export default function DonationCard() {
  const [amount, setAmount] = useState("10");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDonation = async (donationAmount: number) => {
    setLoading(true);
    setMessage("");

    try {
      // Call server action to create Stripe checkout session
      const response = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to create donation session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Donation failed");
      setLoading(false);
    }
  };

  const donationAmount = customAmount ? parseInt(customAmount) : parseInt(amount);

  return (
    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold text-white mb-2">💜 Support Course Development</h2>
      <p className="text-slate-400 mb-6">
        This course is free and always will be. If you found it valuable, consider supporting its development and maintenance.
      </p>

      <div className="space-y-4">
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {["5", "10", "25", "50"].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                setAmount(btn);
                setCustomAmount("");
              }}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                amount === btn && !customAmount
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              ${btn}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="flex gap-3">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (e.target.value) setAmount("");
            }}
            placeholder="Custom amount ($)"
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            min="1"
          />
        </div>

        {/* Error/Message */}
        {message && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{message}</p>
          </div>
        )}

        {/* Donate Button */}
        <button
          onClick={() => handleDonation(donationAmount)}
          disabled={loading || donationAmount < 1}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? "Processing..." : `Donate $${donationAmount}`}
        </button>

        {/* Info */}
        <p className="text-xs text-slate-400 text-center">
          Secure payment powered by Stripe. All donations go directly to course maintenance and development.
        </p>
      </div>
    </div>
  );
}
