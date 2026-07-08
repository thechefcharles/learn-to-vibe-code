import { LandingHero } from "@/components/LandingHero";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingSkills } from "@/components/LandingSkills";
import { LandingTestimonials } from "@/components/LandingTestimonials";
import { LandingTrust } from "@/components/LandingTrust";
import { LandingCTA } from "@/components/LandingCTA";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Learn to Vibe Code — Accredited AI Development Course",
  description: "16 modules, 93 hours, 9.3 CEUs. Learn full-stack development with AI. Free, accredited, with a capstone project.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingSkills />
        <LandingTestimonials />
        <LandingTrust />
        <LandingCTA />
      </main>

      <Footer />
    </div>
  );
}
