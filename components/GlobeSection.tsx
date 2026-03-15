"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlobeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.6]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.3, 1], [0.95, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Looping Globe Video */}
        <motion.video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/globe-loop.mp4" type="video/mp4" />
        </motion.video>

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-40" />

        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h2 className="cinematic-title">Global Reach.<br/>Infinite Possibilities.</h2>
          <button className="mt-12 px-8 py-4 border border-white/30 tracking-widest uppercase text-sm hover:bg-white hover:text-black transition-colors duration-500">
            Discover the Fleet
          </button>
        </motion.div>
      </div>
    </section>
  );
}
