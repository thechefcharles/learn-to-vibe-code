"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CredentialPreviewWidget() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [titleHover, setTitleHover] = useState(false);
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
    const signupUrl = `https://learntovibecode.io/auth/sign-up?referral=${message}`;

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
      <div className="w-full h-full flex flex-col gap-3">
        <motion.h3
          className="uppercase tracking-wide text-center cursor-pointer font-bold text-white text-xl"
          onClick={() => router.push('/auth/sign-up')}
        >
          Get Certified
        </motion.h3>
        <div
          className="relative w-full flex-1 bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-violet-400/80 backdrop-blur-lg rounded-xl border-2 border-white/40 p-6 flex flex-col justify-center items-center text-center shadow-2xl cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => router.push('/auth/sign-up')}
        >
          <div className="text-2xl font-bold font-display text-white">
            Learn To Vibe Code
          </div>
          <div className="text-sm text-white/80 mt-3">Certificate of Completion</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Title */}
      <motion.h3
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
        animate={{
          scale: titleHover ? 1.3 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => router.push('/auth/sign-up')}
        className="uppercase tracking-wide text-center cursor-pointer font-bold text-white hover:opacity-80 transition-opacity"
        style={{
          fontSize: titleHover ? '28px' : '20px',
          background: titleHover
            ? 'linear-gradient(to right, rgb(34, 211, 238), rgb(168, 85, 247), rgb(236, 72, 153))'
            : 'transparent',
          backgroundClip: titleHover ? 'text' : 'unset',
          WebkitBackgroundClip: titleHover ? 'text' : 'unset',
          WebkitTextFillColor: titleHover ? 'transparent' : 'white',
          color: titleHover ? 'transparent' : 'white',
          transformOrigin: 'center',
        }}
      >
        Get Certified
      </motion.h3>

      <div
        className="relative w-full flex-1 cursor-pointer hover:opacity-90 transition-opacity"
        style={{ perspective: "1200px" }}
        onClick={() => router.push('/auth/sign-up')}
      >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Certificate Card */}
          <motion.div className="w-full h-full">
            <div className="relative w-full h-full bg-gradient-to-br from-violet-400/80 via-purple-300/80 to-violet-400/80 backdrop-blur-lg rounded-xl border-2 border-white/40 p-6 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
              {/* Gold star - top right */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4 text-3xl"
              >
                ★
              </motion.div>

              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rounded-lg" />
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

                <motion.div className="text-sm text-white/80 mt-3 italic">
                  Certificate of Completion
                </motion.div>
                <motion.div className="text-xs text-cyan-300 mt-4 font-semibold tracking-wider">
                  Click Here!
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
