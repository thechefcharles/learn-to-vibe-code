import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { KidsLandingPage } from "@/components/kids-landing/KidsLandingPage";

export const metadata: Metadata = {
  title: "Learn to Vibe Code — Accredited AI Development Course",
  description: "16 modules, 93 hours, 9.3 CEUs. Learn full-stack development with AI. Free, accredited, with a capstone project.",
};

export default async function Home() {
  const user = await getUser();

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return <KidsLandingPage />;
}
