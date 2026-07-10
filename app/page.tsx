import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { KidsLandingPage } from "@/components/kids-landing/KidsLandingPage";

export const metadata: Metadata = {
  title: "Learn to Vibe Code — Accredited AI Development Course",
  description: "16 modules, 93 hours, 9.3 CEUs. Learn full-stack development with AI. Free, accredited, with a capstone project.",
};

interface HomeProps {
  searchParams?: Promise<{ view?: string }>;
}

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const viewLanding = searchParams?.view === 'landing';
  const user = await getUser();

  // If user is already logged in and not explicitly viewing landing page, redirect to dashboard
  if (user && !viewLanding) {
    redirect('/dashboard');
  }

  // Show landing page if:
  // - User is not logged in, OR
  // - User is logged in but explicitly requested landing page view with ?view=landing
  return <KidsLandingPage />;
}
