"use client";

import { useState, useEffect } from "react";
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
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function HomeContent() {
  const [user, setUser] = useState<{ firstName: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.user ?? null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-[50vh] flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#704214] border-t-transparent" />
        </main>
        <Footer />
      </>
    );
  }

  if (user) {
    return (
      <>
        <Header />
        <main>
          <UserDashboard />
        </main>
        <Footer />
      </>
    );
  }

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
