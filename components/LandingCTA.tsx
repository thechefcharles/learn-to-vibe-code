"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useVersion } from "@/lib/VersionContext";

export function LandingCTA() {
  const { version } = useVersion();
  const isKids = version === "kids";

  const content = {
    kids: {
      headline: "Ready to Start Coding?",
      subheading: "No experience needed. Start free and level up!",
      cta1: "Start My Journey",
      cta2: "Try Free Lessons",
      social: "Join 500+ young learners already coding",
    },
    adult: {
      headline: "Ready to Start?",
      subheading: "No credit card required. Try 2 free modules.",
      cta1: "Create Account",
      cta2: "Preview",
      social: "Join 500+ learners on their path to mastery",
    },
  };

  const copy = content[version];

  return (
    <section className={`px-4 bg-gradient-to-r from-violet-600 to-indigo-600 ${isKids ? "py-32" : "py-20"}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center text-white">
        <h2 className={`font-bold font-display mb-6 ${isKids ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}>{copy.headline}</h2>
        <p className={`mb-8 text-white/90 ${isKids ? "text-2xl" : "text-xl"}`}>{copy.subheading}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/sign-up" className={`bg-white text-violet-600 hover:bg-violet-50 font-bold rounded-lg transition-all ${isKids ? "py-5 px-12 text-xl" : "py-4 px-10"}`}>{copy.cta1}</Link>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className={`text-white/70 ${isKids ? "mt-12 text-base" : "mt-8 text-sm"}`}>{copy.social}</motion.p>
      </motion.div>
    </section>
  );
}
