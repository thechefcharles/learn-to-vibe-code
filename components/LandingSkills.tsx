"use client";
import { motion } from "framer-motion";
const skillCategories = [
  { category: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"], emoji: "🎨" },
  { category: "Backend", skills: ["Node.js", "APIs", "Databases", "Authentication"], emoji: "⚙️" },
  { category: "DevOps", skills: ["Git & GitHub", "Vercel", "Supabase", "Deployment"], emoji: "🚀" },
  { category: "AI Engineering", skills: ["Prompt Engineering", "Claude SDK", "AI Workflows", "Agent Design"], emoji: "🤖" },
];
export function LandingSkills() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl font-bold font-display text-ink text-center mb-12">Learn Job-Ready Skills</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-xl p-6 border-2 border-violet-light/20 hover:border-violet-600">
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <h3 className="text-lg font-bold text-ink mb-4">{cat.category}</h3>
              <ul className="space-y-2">{cat.skills.map((s, i) => <li key={i} className="text-slate text-sm flex items-center gap-2"><span className="text-violet-600">✓</span>{s}</li>)}</ul>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-12 bg-gradient-to-r from-violet-100 to-pink-100 rounded-xl p-8 text-center border border-violet-200">
          <h3 className="text-2xl font-bold text-ink mb-2">After Module 15</h3>
          <p className="text-slate mb-4">You'll deploy a full-stack app, complete a capstone, and earn a credential.</p>
          <p className="text-lg font-bold text-violet-600">Ready for junior developer roles in AI-assisted development.</p>
        </motion.div>
      </div>
    </section>
  );
}
