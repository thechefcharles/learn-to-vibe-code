"use client";

import { useState, useEffect } from "react";
import { signUpAction } from "@/lib/actions/auth";
import Link from "next/link";
import { Logo } from "@/components/Logo";
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

  // Initialize version from localStorage if it exists (from version toggle on landing page)
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
        // Set version in localStorage for immediate UI update
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
      <div className="min-h-screen flex items-center justify-center bg-indigo py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-violet-light/20">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-display text-ink mb-2">Welcome!</h2>
            <p className="text-slate mb-4">
              Your account has been created. Redirecting to your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition">
            <Logo variant="tagline" size="lg" />
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-violet-light/20">
          <h1 className="text-3xl font-bold font-display text-ink mb-2">Get Started</h1>
          <p className="text-slate mb-6">Choose your learning path</p>

          {/* Version Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <label
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                version === "kids"
                  ? "border-violet-600 bg-violet-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="version"
                value="kids"
                checked={version === "kids"}
                onChange={(e) => setVersion(e.target.value as Version)}
                className="mr-2"
              />
              <span className="font-bold text-ink">🎮 Kids</span>
              <p className="text-xs text-slate mt-1">Fun, gamified learning</p>
            </label>

            <label
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                version === "adult"
                  ? "border-violet-600 bg-violet-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="version"
                value="adult"
                checked={version === "adult"}
                onChange={(e) => setVersion(e.target.value as Version)}
                className="mr-2"
              />
              <span className="font-bold text-ink">💼 Professional</span>
              <p className="text-xs text-slate mt-1">Job-ready credential</p>
            </label>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 mb-6">
              <p className="text-danger text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-paper border border-violet-light/30 rounded-lg text-ink placeholder-slate focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-paper border border-violet-light/30 rounded-lg text-ink placeholder-slate focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-paper border border-violet-light/30 rounded-lg text-ink placeholder-slate focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-paper border border-violet-light/30 rounded-lg text-ink placeholder-slate focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-slate text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-violet hover:text-violet-light font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
