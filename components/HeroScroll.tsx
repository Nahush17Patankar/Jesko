"use client";

import { useRef, useEffect, useCallback } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useImageSequence } from '@/hooks/useImageSequence';
import { motion, useTransform, useScroll } from 'framer-motion';

const FRAME_COUNT = 80;

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);

  // Framer motion scroll for the text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Main Headline Timelines
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.4], [1, 1, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const canvasOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Cloud Headline Timelines
  const cloudTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const cloudTextY = useTransform(scrollYProgress, [0.35, 0.75], [50, -50]);
  const cloudTextScale = useTransform(scrollYProgress, [0.35, 0.75], [0.95, 1.05]);

  // Use useCallback to memoize the function
  const getFilename = useCallback((i: number) => 
    `/sequence-1/Camera_moves_through_window_9c4e8025de_${i.toString().padStart(3, '0')}.jpg`, 
  []);

  // Load images
  const { images } = useImageSequence(FRAME_COUNT, getFilename);

  // Update canvas
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentFrame = Math.min(
      FRAME_COUNT - 1, 
      Math.floor(scrollProgress * FRAME_COUNT)
    );

    const render = () => {
        const img = images[currentFrame];
        if (img && img.complete && img.naturalHeight !== 0) {
          // Adjust for retina displays
          const width = window.innerWidth;
          const height = window.innerHeight;
          const dpr = window.devicePixelRatio || 1;
          
          // Only set width/height if it changed to prevent flashing
          if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
          }
  
          // Object cover logic
          const hRatio = width / img.width;
          const vRatio = height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (width - img.width * ratio) / 2;
          const centerShift_y = (height - img.height * ratio) / 2;
          
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(
            img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
          );
        }
      };
  
      const animationFrameId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animationFrameId);
    }, [scrollProgress, images]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <motion.canvas 
          ref={canvasRef} 
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Main Initial Headline */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Center Window Text */}
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-2xl md:text-4xl lg:text-5xl tracking-[0.2em] font-light text-white normal-case mix-blend-overlay opacity-90 whitespace-nowrap">
              Jesko Jets
            </div>
          </div>

          {/* Top Left Text */}
          <div className="absolute top-[28%] left-8 md:left-12 lg:left-20">
            <div className="text-5xl md:text-7xl lg:text-[7.5rem] font-medium leading-[0.9] tracking-tight text-white block normal-case">
              We are<br />movement
            </div>
          </div>

          {/* Mid Right Text */}
          <div className="absolute top-[55%] right-8 md:right-12 lg:right-20 text-right">
            <div className="text-5xl md:text-7xl lg:text-[7.5rem] font-medium leading-[0.9] tracking-tight text-white block normal-case">
              We are<br />distinction
            </div>
          </div>

          {/* Bottom Left Content */}
          <div className="absolute bottom-12 md:bottom-16 left-8 md:left-12 lg:left-20 max-w-[280px]">
            <div className="text-xl md:text-2xl font-bold leading-snug tracking-tight mb-5 text-white normal-case">
              Your<br />freedom to<br />enjoy life
            </div>
            <div className="w-8 h-[2px] bg-white mb-6"></div>
            <div className="text-[10px] md:text-xs font-medium tracking-wide text-white leading-relaxed normal-case">
              Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
            </div>
          </div>

          {/* Bottom Right Content */}
          <div className="absolute bottom-12 md:bottom-16 right-8 md:right-12 lg:right-20 w-full max-w-[320px]">
            <div className="w-full h-[1px] bg-white/40 mb-3"></div>
            <div className="flex items-center justify-between text-[8px] md:text-[10px] font-bold tracking-[0.1em] uppercase text-white">
              <div className="flex items-center gap-2">
                <div className="flex flex-col -space-y-1">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <span>SCROLL DOWN</span>
              </div>
              <span className="text-right">TO START THE JOURNEY</span>
            </div>
          </div>

          {/* Bottom Center Button */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto">
            <button className="bg-white text-black pl-6 pr-2 py-2 rounded-full text-sm font-bold tracking-wide normal-case hover:bg-white/90 transition-colors flex items-center gap-4">
              Book the Flight
              <span className="bg-black/10 rounded-full p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cloud Sequence Reveal */}
        <motion.div 
          style={{ 
            opacity: cloudTextOpacity, 
            y: cloudTextY,
            scale: cloudTextScale 
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mix-blend-screen"
        >
          <h2 className="text-white uppercase tracking-[0.35em] font-light text-5xl md:text-7xl leading-tight opacity-90 blur-[1px]">
            ASCEND BEYOND<br/>LIMITS
          </h2>
          <p className="text-white uppercase tracking-widest text-sm md:text-lg opacity-60 font-light mt-6 blur-[0.5px]">
            Engineered for those who move the world.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
