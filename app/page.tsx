import ExpertTips from "@/components/ExpertTips";
import HairStyles from "@/components/HairStyles";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/NavBar/Navbar";
import YourHair from "@/components/YourHair";


export default function Home() {
  return (
    <main className="flex flex-col ">
      <Navbar />
      <HeroSection />
      <YourHair />
      <ExpertTips />
      <HairStyles />
    </main>
  );
}
