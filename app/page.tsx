import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import HowItWorks from "@/components/home/HowItWorks";
import GameShowcase from "@/components/home/GameShowcase";
import SuccessStories from "@/components/home/SuccessStories";
import Hackathons from "@/components/home/Hackathons";
import Resources from "@/components/home/Resources";
import CTAFinal from "@/components/home/CTAFinal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <GameShowcase />
        <SuccessStories />
        <Hackathons />
        <Resources />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
