"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useVersion } from "@/lib/VersionContext";
import { versionStyles } from "@/lib/versionStyles";

export function LandingHero() {
  const { version } = useVersion();
  const isKids = version === "kids";
  const styles = versionStyles[version];

  const content = {
    kids: {
      headline: "Learn to Code & Have Fun! 🎮",
      subheading: "Level up your coding skills with games, badges, and rewards",
      stats: "16 modules • Build real projects • Earn cool badges",
      cta1: "Start Learning Now",
      cta2: "Explore Free Lessons",
      badges: [
        { icon: "🎮", text: "Learn by doing" },
        { icon: "🎯", text: "Earn rewards" },
        { icon: "🚀", text: "No experience needed" },
      ],
    },
    adult: {
      headline: "Learn to Vibe Code",
      subheading: "Hard to start. Impossible to stop.",
      stats: "16 modules • 93 hours • 100% free",
      cta1: "Start Learning Free",
      cta2: "Try 2 Free Modules",
      badges: [
        { icon: "✓", text: "No credit card required" },
        { icon: "✓", text: "Learn at your own pace" },
        { icon: "✓", text: "Verifiable certificate" },
      ],
    },
  };

  const copy = content[version];

  return (
    <div
      className={`relative px-4 overflow-hidden ${isKids ? "py-32" : "py-20"}`}
      style={{ backgroundImage: "var(--color-bg)" }}
    >
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
          className={isKids ? "mb-12" : "mb-8"}
        >
          <img
            src="/logo-playful.svg"
            alt="Learn To Vibe Code"
            loading="lazy"
            className={`mx-auto ${version === "kids" ? "h-40" : "h-32"}`}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`${version === "kids" ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"} font-bold font-display mb-4`}
          style={{
            color: "var(--color-accent)",
            fontSize: version === "kids" ? "3.5rem" : undefined,
          }}
        >
          {copy.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`${version === "kids" ? "text-2xl md:text-3xl" : "text-2xl"} mb-6`}
          style={{ color: "var(--color-text-muted)" }}
        >
          {copy.subheading}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={`${version === "kids" ? "text-xl" : "text-lg"} mb-8`}
          style={{ color: "var(--color-text-muted)" }}
        >
          {copy.stats}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/auth/sign-up"
            className={`text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
              version === "kids" ? "py-5 px-12 text-xl" : "py-4 px-10 text-lg"
            }`}
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {copy.cta1}
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`flex flex-col sm:flex-row justify-center ${
            isKids ? "mt-16 gap-6 text-base" : "mt-12 gap-4 text-sm"
          }`}
          style={{ color: "var(--color-text-muted)" }}
        >
          {copy.badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
