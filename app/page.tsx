import type { Metadata } from "next";
import { KidsLandingPage } from "@/components/kids-landing/KidsLandingPage";

export const metadata: Metadata = {
  title: "Learn to Vibe Code — Accredited AI Development Course",
  description: "16 modules, 93 hours, 9.3 CEUs. Learn full-stack development with AI. Free, accredited, with a capstone project.",
};

export default async function Home() {
  // Always show landing page regardless of auth status
  return <KidsLandingPage />;
}
