"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { VideoBackground } from "@/components/kids-landing/VideoBackground";
import { MouseTrail } from "@/components/kids-landing/MouseTrail";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send reset email");
      } else {
        setSuccess(true);
        setEmail("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

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
            Reset Password
          </h1>
          <p className="text-gray-300 mb-6">Enter your email to receive a password reset link</p>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6"
            >
              <p className="text-green-300 text-sm font-medium">✓ Check your email for a reset link</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6"
            >
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          {!success ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:bg-white/10 focus:border-cyan-400/70"
                  placeholder="your@email.com"
                  required
                  animate={{
                    borderColor: focusedField === "email" ? '#06b6d4' : undefined,
                    boxShadow: focusedField === "email" ? '0 0 20px rgba(6, 182, 212, 0.3)' : undefined,
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-3 rounded-lg font-bold text-white uppercase tracking-wider transition-all disabled:opacity-60"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)',
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </motion.button>
            </form>
          ) : null}

          {/* Back to Sign In */}
          <p className="text-gray-300 text-sm mt-6 text-center">
            <Link href="/auth/sign-in" className="text-cyan-300 hover:text-purple-300 font-semibold transition">
              Back to sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
