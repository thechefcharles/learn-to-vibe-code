"use client";
import { motion } from "framer-motion";
const testimonials = [
  { quote: "I went from zero coding knowledge to building a live app in 8 weeks.", author: "Sarah Chen", role: "Product Manager → Full-Stack Developer", avatar: "👩‍💼" },
  { quote: "The capstone project forced me to think like a real engineer. I deployed to production.", author: "Marcus Johnson", role: "Consultant → AI Engineer", avatar: "👨‍💻" },
  { quote: "Gamification kept me going. Streaks and badges made learning feel like a game.", author: "Priya Patel", role: "Designer → Full-Stack Creator", avatar: "👩‍🎨" },
];
export function LandingTestimonials() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl font-bold font-display text-ink text-center mb-12">Learners Building Real Skills</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-xl p-8 border border-violet-200">
              <div className="mb-4 flex gap-1">{[...Array(5)].map((_, j) => <span key={j}>⭐</span>)}</div>
              <p className="text-slate mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{t.avatar}</div>
                <div><p className="font-bold text-ink">{t.author}</p><p className="text-sm text-slate">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
