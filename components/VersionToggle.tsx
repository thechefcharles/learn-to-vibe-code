"use client";

import { motion } from "framer-motion";
import { useVersion, type Version } from "@/lib/VersionContext";
import { usePathname } from "next/navigation";

const versions: { id: Version; label: string; icon: string }[] = [
  { id: "kids", label: "Kids", icon: "🎮" },
  { id: "adult", label: "Professional", icon: "💼" },
];

export function VersionToggle() {
  const { version, setVersion } = useVersion();
  const pathname = usePathname();

  // Hide toggle on authenticated routes (course, dashboard, capstone, etc.)
  const hideOnAuthRoutes = ["/course", "/dashboard", "/capstone", "/instructor", "/admin"];
  const shouldHide = hideOnAuthRoutes.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-4 z-50 flex gap-2 items-center"
    >
      <span className="text-xs text-slate-600 font-medium hidden sm:inline">
        MODE:
      </span>
      <div className="flex gap-1 p-1 bg-white/80 backdrop-blur-md rounded-full border border-slate-200/50 shadow-lg">
        {versions.map((v) => (
          <motion.button
            key={v.id}
            onClick={() => setVersion(v.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
              version === v.id
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            title={v.label}
          >
            <span>{v.icon}</span>
            <span className="hidden sm:inline">{v.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
