"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { VideoBackground } from "@/components/kids-landing/VideoBackground";
import { MouseTrail } from "@/components/kids-landing/MouseTrail";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password");
      } else {
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
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
            Set New Password
          </h1>
          <p className="text-gray-300 mb-6">Enter your new password below</p>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6"
            >
              <p className="text-green-300 text-sm font-medium mb-3">✓ Password reset successfully!</p>
              <Link
                href="/auth/sign-in"
                className="text-cyan-300 hover:text-purple-300 font-semibold transition inline-block"
              >
                Sign in with your new password →
              </Link>
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
          {!success && token && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {[
                { label: "New Password", type: "password", value: password, onChange: setPassword, placeholder: "••••••••", id: "password" },
                { label: "Confirm Password", type: "password", value: confirmPassword, onChange: setConfirmPassword, placeholder: "••••••••", id: "confirm-password" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
                    {field.label}
                  </label>
                  <motion.input
                    type={field.type}
                    id={field.id}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:bg-white/10 focus:border-cyan-400/70"
                    placeholder={field.placeholder}
                    required
                    animate={{
                      borderColor: focusedField === field.id ? '#06b6d4' : undefined,
                      boxShadow: focusedField === field.id ? '0 0 20px rgba(6, 182, 212, 0.3)' : undefined,
                    }}
                  />
                </div>
              ))}

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
                {loading ? "Resetting..." : "Reset Password"}
              </motion.button>
            </form>
          )}

          {/* Back to Sign In */}
          {!success && (
            <p className="text-gray-300 text-sm mt-6 text-center">
              <Link href="/auth/sign-in" className="text-cyan-300 hover:text-purple-300 font-semibold transition">
                Back to sign in
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
