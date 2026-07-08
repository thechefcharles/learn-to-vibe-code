"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CredentialPreviewWidget() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mock credential data
  const credentialId = "VBC-2026-00547";
  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const verificationUrl = "https://vibecode.academy/verify/VBC-2026-00547";

  const handleShare = async () => {
    try {
      const text = `I just earned my Accredited Vibe Coding Course Certificate! Credential ID: ${credentialId}\nVerify: ${verificationUrl}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (prefersReducedMotion) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="relative w-full aspect-video bg-gradient-to-br from-yellow-300 via-yellow-200 to-amber-300 rounded-xl border-2 border-yellow-500 p-8 flex flex-col justify-center items-center text-center">
          <div className="text-6xl mb-4">🏆</div>
          <div className="text-sm font-semibold text-yellow-900">Accredited</div>
          <div className="text-2xl font-bold font-display text-yellow-900 mt-2">
            Vibe Coding Course
          </div>
          <div className="text-xs text-yellow-800 mt-4">Certificate of Completion</div>
        </div>
        <button
          onClick={handleShare}
          className="mt-6 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
        >
          {copied ? "Copied!" : "Share Certificate"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="relative w-full aspect-video cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          style={{
            rotateY: isFlipped ? 180 : 0,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          {/* Front Side - Certificate */}
          <motion.div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-200 to-amber-300 rounded-xl border-2 border-yellow-500 p-8 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-yellow-600 rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-yellow-600 rounded-lg" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="relative z-10"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: isFlipped ? 0 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  🏆
                </motion.div>

                <motion.div
                  className="text-sm font-semibold text-yellow-900 tracking-widest"
                  animate={{ letterSpacing: "0.1em" }}
                  transition={{ duration: 0.3 }}
                >
                  ACCREDITED
                </motion.div>

                <motion.div className="text-2xl font-bold font-display text-yellow-900 mt-4">
                  Vibe Coding Course
                </motion.div>

                <motion.div className="text-xs text-yellow-800 mt-6 italic">
                  Certificate of Completion
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Back Side - Credential Details */}
          <motion.div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            className="w-full h-full"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-200 to-amber-300 rounded-xl border-2 border-yellow-500 p-8 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-yellow-600 rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-yellow-600 rounded-lg" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-10 space-y-4 w-full"
              >
                <div>
                  <div className="text-xs text-yellow-800 font-semibold mb-1">CREDENTIAL ID</div>
                  <div className="text-lg font-mono font-bold text-yellow-900">{credentialId}</div>
                </div>

                <div className="h-px bg-yellow-400 opacity-50 w-3/4 mx-auto" />

                <div>
                  <div className="text-xs text-yellow-800 font-semibold mb-1">ISSUED</div>
                  <div className="text-sm font-semibold text-yellow-900">{issueDate}</div>
                </div>

                <div className="h-px bg-yellow-400 opacity-50 w-3/4 mx-auto" />

                <div>
                  <div className="text-xs text-yellow-800 font-semibold mb-2">VERIFY</div>
                  <motion.a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-yellow-900 font-mono underline hover:text-yellow-800 break-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    vibecode.academy/verify
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Share Button */}
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-6 w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
          copied
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ✓ Copied to Clipboard
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            📋 Share Certificate
          </motion.span>
        )}
      </motion.button>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center text-xs text-slate/60"
      >
        Click or hover to flip • Click share to copy details
      </motion.div>
    </div>
  );
}
