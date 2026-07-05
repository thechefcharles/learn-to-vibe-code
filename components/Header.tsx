import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-paper border-b border-violet-light/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition">
          <Logo variant="primary" size="sm" />
        </Link>
        <nav className="flex gap-8 items-center">
          <Link href="/about" className="text-ink hover:text-violet transition text-sm font-medium">
            About
          </Link>
          <Link href="/course" className="text-ink hover:text-violet transition text-sm font-medium">
            Course
          </Link>
          <Link href="/dashboard" className="text-ink hover:text-violet transition text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/auth/sign-in" className="bg-violet hover:bg-violet-light text-paper px-4 py-2 rounded-lg text-sm font-medium transition">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
