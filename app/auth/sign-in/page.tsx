"use client";

import { useState } from "react";
import { signInAction } from "@/lib/actions/auth";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          <h1 className="text-3xl font-bold font-display text-ink mb-2">Welcome Back</h1>
          <p className="text-slate mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-lg p-4 mb-6">
              <p className="text-danger text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet hover:bg-violet-light disabled:opacity-60 text-paper font-bold py-2 rounded-lg transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-slate text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-violet hover:text-violet-light font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
