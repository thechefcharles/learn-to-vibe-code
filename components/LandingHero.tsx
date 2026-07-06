"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function LandingHero() {
  return (
    <div className="relative py-20 px-4 overflow-hidden" style={{ backgroundImage: "var(--color-bg)" }}>
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: "var(--color-bg)",
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img src="/logo-playful.svg" alt="Learn To Vibe Code" className="h-32 mx-auto mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold font-display text-ink mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          Learn to <span style={{ color: "var(--color-accent-light)" }}>Vibe Code</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl text-slate mb-6"
        >
          Hard to start. Impossible to stop.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-slate mb-8"
        >
          16 modules • 93 hours • 9.3 CEUs • <span className="font-bold" style={{ color: "var(--color-accent)" }}>100% free</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/auth/sign-up"
            className="text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Start Learning Free
          </Link>
          <Link
            href="/demo"
            className="font-bold py-4 px-10 rounded-lg transition-all duration-300 text-lg"
            style={{
              backgroundColor: "var(--color-card-bg)",
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
              border: "2px solid",
            }}
          >
            Try 2 Free Modules
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center text-sm text-slate"
        >
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Learn at your own pace</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Verifiable certificate</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
