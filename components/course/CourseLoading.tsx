'use client';

import { motion } from 'framer-motion';

export function CourseLoading() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/20 shadow-2xl text-center"
      >
        {/* Animated loading symbol */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto mb-6 rounded-full border-3 border-white/20 border-t-cyan-500"
        />

        {/* Text */}
        <h2 className="text-xl font-bold text-white mb-2">Loading Course Map</h2>
        <p className="text-sm text-gray-400">Preparing your learning path...</p>

        {/* Animated dots */}
        <div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
