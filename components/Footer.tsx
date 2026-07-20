"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useVersion } from "@/lib/VersionContext";

export function Footer() {
  const { version } = useVersion();
  const isKids = version === "kids";

  return (
    <footer className="text-paper mt-12 pt-12 pb-8 bg-black/40 backdrop-blur-2xl border-t border-white/15 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Logo variant="cosmic" size="sm" className="mb-4" />
            <p className="text-sm text-white/80">
              {isKids ? "Learn, build, ship. Level up today! 🚀" : "Hard to start. Impossible to stop."}
            </p>
          </div>

          {/* Course */}
          <div>
            <h3 className="font-display font-bold text-paper mb-4">Course</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/course-info" className="text-cyan-300 hover:text-cyan-200 transition">
                  Course Info
                </Link>
              </li>
              <li>
                <Link href="/course" className="text-cyan-300 hover:text-cyan-200 transition">
                  Modules
                </Link>
              </li>
              <li>
                <Link href="/capstone" className="text-cyan-300 hover:text-cyan-200 transition">
                  Capstone
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-bold text-paper mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-cyan-300 hover:text-cyan-200 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/course/feedback" className="text-cyan-300 hover:text-cyan-200 transition">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-cyan-300 hover:text-cyan-200 transition">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-cyan-300 hover:text-cyan-200 transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-cyan-300 hover:text-cyan-200 transition">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-paper mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/refund" className="text-cyan-300 hover:text-cyan-200 transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@learntovibe.code" className="text-cyan-300 hover:text-cyan-200 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15 pt-8">
          <p className="text-xs text-cyan-300/70 text-center">
            © {new Date().getFullYear()} Learn To Vibe Code. All rights reserved. | Made with{" "}
            <span className="text-cyan-400">💙</span> for learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
