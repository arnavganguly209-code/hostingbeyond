import { SiteHeader } from "@/components/layout";
import { HeroSection } from "@/components/home";

export default function HomePage() {
  return (
    <div className="h-[100svh] overflow-hidden bg-[#050814]">
      <SiteHeader />
      <HeroSection />
    </div>
  );
}
