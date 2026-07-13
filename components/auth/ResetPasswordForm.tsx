"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { VideoBackground } from "@/components/kids-landing/VideoBackground";
import { MouseTrail } from "@/components/kids-landing/MouseTrail";
import { motion } from "framer-motion";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      console.log("🔍 [ResetPasswordForm] Checking for recovery code...");
      console.log("URL:", window.location.href);

      // Extract the recovery code from the URL
      const params = new URLSearchParams(window.location.search);
      const recoveryCode = params.get("code");

      if (!recoveryCode) {
        console.log("No recovery code detected");
        setError("Invalid reset link. Please request a new one.");
        return;
      }

      console.log("✓ Recovery code found in URL:", recoveryCode);
      setCode(recoveryCode);

      // Try to exchange the code for a session immediately
      // This happens on page load, validating the recovery link works
      console.log("📍 Validating recovery code with Supabase...");
      try {
        // Create a client-side Supabase client to validate the code
        const response = await fetch("/api/auth/validate-recovery-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: recoveryCode }),
        });

        if (response.ok) {
          console.log("✓ Recovery code is valid");
          setHasValidSession(true);
        } else {
          console.log("✗ Recovery code validation failed");
          setError("Your reset link has expired or is invalid. Please request a new one.");
        }
      } catch (err) {
        console.error("Code validation error:", err);
        setError("Failed to validate reset link. Please try again.");
      }
    };

    checkSession();
  }, []);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!code) {
      setError("Invalid reset link");
      return;
    }

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
        body: JSON.stringify({ code, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password");
      } else {
        console.log("✓ Password reset successful!");
        setSuccess(true);
        setPassword("");
        setConfirmPassword("");
        // Redirect to sign-in after 2 seconds
        console.log("📍 Redirecting to /auth/sign-in in 2 seconds...");
        setTimeout(() => {
          console.log("🔗 Executing redirect to /auth/sign-in");
          window.location.href = "/auth/sign-in";
        }, 2000);
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
              background: "linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Set New Password
          </h1>
          <p className="text-gray-300 mb-6">Enter your new password below</p>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
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
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6"
            >
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          {!success && hasValidSession && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:bg-white/10 focus:border-cyan-400/70"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:bg-white/10 focus:border-cyan-400/70"
                  placeholder="••••••••"
                  required
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
                  background: "linear-gradient(90deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)",
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
