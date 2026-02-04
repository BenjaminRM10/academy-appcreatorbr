import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { VideoSection } from "@/components/landing/VideoSection";
import { InstructorCard } from "@/components/landing/InstructorCard";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { CourseGrid } from "@/components/landing/CourseGrid";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <VideoSection />
      <InstructorCard />
      <FeatureSection />
      <CourseGrid />
      <PricingSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
