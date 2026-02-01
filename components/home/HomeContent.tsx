"use client";

import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import HowItWorks from "@/components/home/HowItWorks";
import GameShowcase from "@/components/home/GameShowcase";
import SuccessStories from "@/components/home/SuccessStories";
import Hackathons from "@/components/home/Hackathons";
import Resources from "@/components/home/Resources";
import CTAFinal from "@/components/home/CTAFinal";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { useAuth } from "@/lib/auth-context";

export default function HomeContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#704214] border-t-transparent" />
      </main>
    );
  }

  if (user) {
    return (
      <main>
        <UserDashboard />
      </main>
    );
  }

  return (
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
  );
}
