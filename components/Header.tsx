"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useVersion } from "@/lib/VersionContext";

export function Header() {
  const { version } = useVersion();
  const isKids = version === "kids";

  return (
    <header className={`border-b ${isKids ? "bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200" : "bg-paper border-violet-light/20"}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition">
          <Logo variant="primary" size="sm" />
        </Link>
        <nav className="flex gap-8 items-center">
          <Link href="/about" className={`transition text-sm font-medium ${isKids ? "text-purple-700 hover:text-purple-900" : "text-ink hover:text-violet"}`}>
            About
          </Link>
          <Link href="/course" className={`transition text-sm font-medium ${isKids ? "text-purple-700 hover:text-purple-900" : "text-ink hover:text-violet"}`}>
            Course
          </Link>
          <Link href="/showcase" className={`transition text-sm font-medium ${isKids ? "text-purple-700 hover:text-purple-900" : "text-ink hover:text-violet"}`}>
            Showcase
          </Link>
          <Link href="/dashboard" className={`transition text-sm font-medium ${isKids ? "text-purple-700 hover:text-purple-900" : "text-ink hover:text-violet"}`}>
            Dashboard
          </Link>
          <Link href="/auth/sign-in" className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "bg-violet hover:bg-violet-light text-paper"}`}>
            {isKids ? "Get Started" : "Sign In"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
