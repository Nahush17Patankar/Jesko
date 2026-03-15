"use client";

import { useLenis } from '@/hooks/useLenis';
import HeroScroll from '@/components/HeroScroll';
import PlaneMorph from '@/components/PlaneMorph';
import GlobeSection from '@/components/GlobeSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  // Initialize Lenis at the highest layout level to enable smooth scroll context globally
  useLenis();

  return (
    <main className="relative bg-background">
      <Navbar />
      <HeroScroll />
      <div className="h-[30vh] w-full" />
      <PlaneMorph />
      <div className="h-[30vh] w-full" />
      <GlobeSection />
      <Footer />
    </main>
  );
}
