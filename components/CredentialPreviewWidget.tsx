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
  const verificationUrl = "https://learntovibecode.io/verify/VBC-2026-00547";

  const handleShare = () => {
    const message = encodeURIComponent("Learn To Vibe Code With Me");
    const signupUrl = `https://learntovibecode.io/signup?referral=${message}`;

    if (navigator.share) {
      navigator.share({
        title: "Vibe Coding Course",
        text: "Learn To Vibe Code With Me",
        url: signupUrl,
      }).catch(() => {
        window.open(signupUrl, "_blank");
      });
    } else {
      window.open(signupUrl, "_blank");
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <div className="relative w-full flex-1 bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-violet-400/80 backdrop-blur-lg rounded-xl border-2 border-white/40 p-8 flex flex-col justify-center items-center text-center shadow-2xl">
          <div className="text-2xl font-bold font-display text-white">
            Learn To Vibe Code
          </div>
          <div className="text-xs text-white/80 mt-4">Certificate of Completion</div>
        </div>
        <button
          onClick={handleShare}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/40 text-white font-semibold rounded-lg transition-all"
        >
          {copied ? "Shared!" : "Share Certificate"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div
        className="relative w-full flex-1 cursor-pointer"
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
            <div className="relative w-full h-full bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-violet-400/80 backdrop-blur-lg rounded-xl border-2 border-white/40 p-8 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-lg" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="relative z-10"
              >
                <motion.div className="text-2xl font-bold font-display text-white">
                  Learn To Vibe Code
                </motion.div>

                <motion.div className="text-xs text-white/80 mt-6 italic">
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
            <div className="relative w-full h-full bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-violet-400/80 backdrop-blur-lg rounded-xl border-2 border-white/40 p-8 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-lg" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-10 space-y-4 w-full"
              >
                <div>
                  <div className="text-xs text-white/70 font-semibold mb-1">CREDENTIAL ID</div>
                  <div className="text-lg font-mono font-bold text-white">{credentialId}</div>
                </div>

                <div className="h-px bg-white/30 opacity-50 w-3/4 mx-auto" />

                <div>
                  <div className="text-xs text-white/70 font-semibold mb-1">ISSUED</div>
                  <div className="text-sm font-semibold text-white">{issueDate}</div>
                </div>

                <div className="h-px bg-white/30 opacity-50 w-3/4 mx-auto" />

                <div>
                  <div className="text-xs text-white/70 font-semibold mb-2">VERIFY</div>
                  <motion.a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white font-mono underline hover:text-white/80 break-all"
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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300 backdrop-blur-md border ${
          copied
            ? "bg-white/20 border-white/30 hover:bg-white/25 text-white"
            : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ✓ Shared
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Share Certificate
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
