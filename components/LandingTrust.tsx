"use client";
import { motion } from "framer-motion";
const trustPoints = [
  { icon: "💳", title: "No Credit Card Required", description: "Start immediately. No hidden charges." },
  { icon: "⏰", title: "Learn at Your Own Pace", description: "No deadlines. Complete whenever works." },
  { icon: "📜", title: "Verifiable Credential", description: "Earn a shareable completion certificate." },
  { icon: "👨‍🏫", title: "Instructor Access", description: "Get support. Questions answered by experts." },
];
export function LandingTrust() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl font-bold font-display text-ink text-center mb-12">Why Learners Trust Us</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {trustPoints.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-6 bg-gradient-to-br from-violet-50 to-transparent rounded-xl border border-violet-100">
              <div className="text-4xl flex-shrink-0">{p.icon}</div>
              <div><h3 className="font-bold text-ink mb-1">{p.title}</h3><p className="text-slate text-sm">{p.description}</p></div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">The Vibe Code Difference</h3>
          <p className="text-lg mb-6">We built this course because we couldn't find one combining real skills with AI development. Battle-tested with real learners.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <div><p className="font-bold text-2xl text-violet-300">500+</p><p>Learners</p></div>
            <div><p className="font-bold text-2xl text-violet-300">16</p><p>Modules</p></div>
            <div><p className="font-bold text-2xl text-violet-300">100%</p><p>Free</p></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
