"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useVersion } from "@/lib/VersionContext";

export function Footer() {
  const { version } = useVersion();
  const isKids = version === "kids";

  return (
    <footer className={`text-paper mt-12 pt-12 pb-8 ${isKids ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-indigo"}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Logo variant="reverse" size="sm" className="mb-4" />
            <p className="text-sm text-white/80">
              {isKids ? "Learn, build, ship. Level up today! 🚀" : "Hard to start. Impossible to stop."}
            </p>
          </div>

          {/* Course */}
          <div>
            <h3 className="font-display font-bold text-paper mb-4">Course</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/demo" className="text-violet-light hover:text-lime transition">
                  Preview
                </Link>
              </li>
              <li>
                <Link href="/course" className="text-violet-light hover:text-lime transition">
                  Modules
                </Link>
              </li>
              <li>
                <Link href="/capstone" className="text-violet-light hover:text-lime transition">
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
                <Link href="/about" className="text-violet-light hover:text-lime transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-violet-light hover:text-lime transition">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-violet-light hover:text-lime transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-violet-light hover:text-lime transition">
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
                <Link href="/legal/refund" className="text-violet-light hover:text-lime transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@learntovibe.code" className="text-violet-light hover:text-lime transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-violet/30 pt-8">
          <p className="text-xs text-violet-light text-center">
            © {new Date().getFullYear()} Learn To Vibe Code. All rights reserved. | Made with{" "}
            <span className="text-lime">💚</span> for learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
