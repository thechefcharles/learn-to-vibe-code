"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CodeBlockWithCopyProps {
  code: string;
  language?: string;
}

export function CodeBlockWithCopy({ code, language }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      <div className="rounded-lg bg-slate-950/50 border border-white/10 overflow-hidden">
        <div className="p-4">
          <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`absolute top-3 right-3 px-3 py-1.5 rounded-md text-xs font-medium transition ${
          copied
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
        }`}
      >
        {copied ? "✓ Copied" : "Copy"}
      </motion.button>
    </div>
  );
}
