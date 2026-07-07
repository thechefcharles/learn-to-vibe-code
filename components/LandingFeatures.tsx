"use client";

import { motion } from "framer-motion";
import { useVersion } from "@/lib/VersionContext";

const featuresMap = {
  kids: [
    {
      icon: "🎮",
      title: "16 Fun Modules",
      description: "Learn step-by-step with fun projects",
      details: "From basics to building your own games and websites",
    },
    {
      icon: "🎯",
      title: "Learn by Doing",
      description: "Quizzes, challenges, and cool projects",
      details: "Build real things. See them come to life online.",
    },
    {
      icon: "🏆",
      title: "Earn Rewards",
      description: "Badges, levels, and achievements",
      details: "Stay motivated with fun rewards and progress tracking",
    },
  ],
  adult: [
    {
      icon: "📚",
      title: "16 Modules",
      description: "From AI fundamentals to production-ready deployments",
      details: "Complete curriculum covering everything from prompt engineering to capstone project",
    },
    {
      icon: "🎯",
      title: "Hands-On",
      description: "Quizzes, deliverables, and a capstone project",
      details: "Build real projects. Get feedback. Deploy to production.",
    },
    {
      icon: "🏆",
      title: "Gamified",
      description: "Earn badges, track streaks, build your portfolio",
      details: "Stay motivated with XP, badges, and achievement streaks",
    },
  ],
};

export function LandingFeatures() {
  const { version } = useVersion();
  const features = featuresMap[version];
  const isKids = version === "kids";

  return (
    <section
      className={`${isKids ? "py-24" : "py-16"} px-4 bg-gradient-to-b from-white to-slate-50`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`font-bold font-display text-ink text-center ${
            isKids ? "text-5xl mb-16" : "text-4xl mb-12"
          }`}
        >
          {isKids ? "What Makes It Fun?" : "What You Get"}
        </motion.h2>

        <div className={`grid grid-cols-1 md:grid-cols-3 ${isKids ? "gap-8" : "gap-6"}`}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className={`bg-white ${isKids ? "rounded-2xl p-10" : "rounded-xl p-8"} border-2 border-violet-light/20 hover:border-violet-600 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
            >
              <div className={`${isKids ? "text-7xl" : "text-5xl"} mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`${isKids ? "text-2xl" : "text-xl"} font-bold font-display text-ink mb-2`}>
                {feature.title}
              </h3>
              <p className={`${isKids ? "text-lg" : "text-base"} text-slate mb-4`}>
                {feature.description}
              </p>
              <p className={`${isKids ? "text-base" : "text-sm"} text-slate-600`}>
                {feature.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
