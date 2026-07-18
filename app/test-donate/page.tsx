"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { VideoBackground } from "@/components/kids-landing/VideoBackground";
import { MouseTrail } from "@/components/kids-landing/MouseTrail";
import { motion } from "framer-motion";

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
    { type: "coffee", amount: 5, label: "Buy me a coffee", emoji: "☕" },
    { type: "tea", amount: 10, label: "Cup of tea", emoji: "🍵" },
    { type: "lunch", amount: 25, label: "Lunch", emoji: "🍽️" },
    { type: "dinner", amount: 50, label: "Dinner", emoji: "🍷" },
  ];

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden flex items-center justify-center py-12 px-4">
      <VideoBackground />
      <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />
      <MouseTrail />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition">
            <Logo variant="cosmic" size="lg" />
          </Link>
        </motion.div>

        {/* Form Card with Glass Morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all"
        >
          {/* Heading with Gradient */}
          <h1
            className="text-3xl font-bold uppercase tracking-wider mb-2"
            style={{
              background: 'linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Support The Vibe
          </h1>
          <p className="text-gray-300 mb-6">Help us build the future of AI-assisted coding education</p>

          {/* Quick Donation Buttons */}
          <div className="space-y-3 mb-8">
            {donations.map((item) => (
              <motion.button
                key={item.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDonate(item.type)}
                disabled={loading !== null}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white uppercase tracking-wide transition-all disabled:opacity-60 ${
                  loading === item.type ? 'opacity-70' : ''
                }`}
                style={{
                  background: 'linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)',
                }}
              >
                {loading === item.type ? (
                  'Processing...'
                ) : (
                  <>
                    {item.emoji} {item.label} (${item.amount})
                  </>
                )}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-8" />

          {/* Custom Amount */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
              Custom Amount
            </label>
            <form onSubmit={handleCustom} className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Enter amount"
                  step="0.01"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all focus:bg-white/10 focus:border-cyan-400/70"
                  disabled={loading !== null}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading !== null}
                className="py-3 px-6 rounded-lg font-bold text-white uppercase tracking-wide transition-all disabled:opacity-60"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)',
                }}
              >
                {loading === "custom" ? "..." : "Donate"}
              </motion.button>
            </form>
          </div>

          {/* Test Card Info */}
          <div className="bg-white/5 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 mt-6">
            <h3 className="text-sm font-bold text-cyan-300 mb-3">💳 Stripe Test Card</h3>
            <div className="space-y-1 text-gray-400 font-mono text-xs">
              <div><strong>Card:</strong> 4242 4242 4242 4242</div>
              <div><strong>Exp:</strong> 12/25 (any future date)</div>
              <div><strong>CVC:</strong> 123 (any 3 digits)</div>
              <div><strong>ZIP:</strong> 12345 (any 5 digits)</div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <Link href="/" className="text-cyan-300 hover:text-purple-300 text-sm font-semibold transition">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
