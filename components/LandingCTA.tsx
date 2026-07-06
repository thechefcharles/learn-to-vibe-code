"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export function LandingCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-violet-600 to-indigo-600">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Ready to Start?</h2>
        <p className="text-xl mb-8 text-white/90">No credit card required. Try 2 free modules.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/sign-up" className="bg-white text-violet-600 hover:bg-violet-50 font-bold py-4 px-10 rounded-lg transition-all">Create Account</Link>
          <Link href="/demo" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-lg transition-all">Preview</Link>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 text-sm text-white/70">Join 500+ learners on their path to mastery</motion.p>
      </motion.div>
    </section>
  );
}
