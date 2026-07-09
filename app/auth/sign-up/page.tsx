"use client";

import { useState, useEffect } from "react";
import { signUpAction } from "@/lib/actions/auth";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { VideoBackground } from "@/components/kids-landing/VideoBackground";
import { MouseTrail } from "@/components/kids-landing/MouseTrail";
import { motion } from "framer-motion";
import type { Version } from "@/lib/VersionContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [version, setVersion] = useState<Version>("adult");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const storedVersion = localStorage.getItem("version") as Version;
    if (storedVersion && (storedVersion === "kids" || storedVersion === "adult")) {
      setVersion(storedVersion);
    }
  }, []);

  async function handleSignUp(e: React.FormEvent) {
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
      const result = await signUpAction(email, password, name, version);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        localStorage.setItem("version", version);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="relative w-full min-h-screen text-white overflow-x-hidden flex items-center justify-center py-12 px-4">
        <VideoBackground />
        <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />
        <MouseTrail />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
            <p className="text-gray-300">Your account has been created. Redirecting to your dashboard...</p>
          </div>
        </motion.div>
      </div>
    );
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
            Get Started
          </h1>
          <p className="text-gray-300 mb-6">Choose your learning path</p>

          {/* Version Selection - Glass Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { value: "kids", label: "Beginner", desc: "Fun, gamified learning" },
              { value: "adult", label: "Advanced", desc: "Job-ready credential" },
            ].map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl border-2 backdrop-blur-md cursor-pointer transition-all ${
                  version === option.value
                    ? 'bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border-cyan-400/70 shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-purple-400/50'
                }`}
              >
                <input
                  type="radio"
                  name="version"
                  value={option.value}
                  checked={version === option.value}
                  onChange={(e) => setVersion(e.target.value as Version)}
                  className="mr-2"
                />
                <span className="font-bold text-white">{option.label}</span>
                <p className="text-xs text-gray-400 mt-1">{option.desc}</p>
              </motion.label>
            ))}
          </div>

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
          <form onSubmit={handleSignUp} className="space-y-4">
            {[
              { label: "Full Name", type: "text", value: name, onChange: setName, placeholder: "John Doe" },
              { label: "Email", type: "email", value: email, onChange: setEmail, placeholder: "your@email.com" },
              { label: "Password", type: "password", value: password, onChange: setPassword, placeholder: "••••••••" },
              { label: "Confirm Password", type: "password", value: confirmPassword, onChange: setConfirmPassword, placeholder: "••••••••" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-300 mb-2">
                  {field.label}
                </label>
                <motion.input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onFocus={() => setFocusedField(field.label)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:bg-white/10 focus:border-cyan-400/70"
                  placeholder={field.placeholder}
                  required
                  animate={{
                    borderColor: focusedField === field.label ? '#06b6d4' : undefined,
                    boxShadow: focusedField === field.label ? '0 0 20px rgba(6, 182, 212, 0.3)' : undefined,
                  }}
                />
              </div>
            ))}

            {/* Submit Button with Gradient */}
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
              {loading ? "Creating account..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <p className="text-gray-300 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-cyan-300 hover:text-purple-300 font-semibold transition">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
