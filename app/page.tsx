import type { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { KidsLandingPage } from "@/components/kids-landing/KidsLandingPage";

export const metadata: Metadata = {
  title: "Learn to Vibe Code — AI Development Course",
  description: "16 modules, 100 hours of content. Learn full-stack development with AI. Free, with a capstone project.",
};

export default async function Home() {
  const user = await getUser();
  // Always show landing page regardless of auth status
  return (
    <main>
      <KidsLandingPage isSignedIn={!!user} />
    </main>
  );
}
