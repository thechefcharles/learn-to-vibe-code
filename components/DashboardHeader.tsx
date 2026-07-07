"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useVersion } from "@/lib/VersionContext";

interface DashboardHeaderProps {
  onSignOut: () => Promise<void>;
}

export function DashboardHeader({ onSignOut }: DashboardHeaderProps) {
  const { version } = useVersion();
  const isKids = version === "kids";

  return (
    <header className={`sticky top-0 z-50 ${isKids ? "bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-300" : "bg-paper border-b border-violet-light/20"}`}>
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="hover:opacity-90 transition block">
          <img src="/logo-playful.svg" alt="Learn To Vibe Code" loading="lazy" className={`${isKids ? "h-32" : "h-24"} w-auto`} />
        </Link>

        <div className={`flex gap-${isKids ? "6" : "4"} items-center`}>
          {/* Support Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/support"
              className={`${isKids ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:shadow-pink-500/40 px-7 py-3 text-base" : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:shadow-pink-500/40 px-5 py-2 text-sm"}`}
            >
              ❤️ {isKids ? "Need Help?" : "Support"}
            </Link>
          </motion.div>

          {/* Sign Out Button */}
          <motion.form
            action={onSignOut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className={`bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                isKids ? "py-3 px-7 text-base" : "py-2 px-5 text-sm"
              }`}
            >
              {isKids ? "Sign Out 👋" : "Sign Out"}
            </button>
          </motion.form>
        </div>
      </div>
    </header>
  );
}
