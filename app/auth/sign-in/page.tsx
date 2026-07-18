"use client";

import { useState } from "react";
import { signInAction } from "@/lib/actions/auth";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { VideoBackground } from "@/components/kids-landing/VideoBackground";
import { MouseTrail } from "@/components/kids-landing/MouseTrail";
import { motion } from "framer-motion";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInAction(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden flex items-center justify-center py-12 px-4">
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
            Welcome Back
          </h1>
          <p className="text-gray-300 mb-6">Sign in to your account</p>

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
          <form onSubmit={handleSignIn} className="space-y-4">
            {[
              { label: "Email", type: "email", value: email, onChange: setEmail, placeholder: "your@email.com", id: "email" },
              { label: "Password", type: "password", value: password, onChange: setPassword, placeholder: "••••••••", id: "signin-password" },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all focus:bg-white/10 focus:border-cyan-400/70"
                  placeholder={field.placeholder}
                  required
                  aria-label={field.label}
                />
              </div>
            ))}

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-xs text-cyan-300 hover:text-purple-300 font-semibold transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button with Gradient */}
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
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="text-gray-300 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-cyan-300 hover:text-purple-300 font-semibold transition">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
