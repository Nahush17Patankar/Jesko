"use client";

import { useRef, useEffect, useCallback } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useImageSequence } from '@/hooks/useImageSequence';
import { motion, useTransform, useScroll } from 'framer-motion';

const FRAME_COUNT = 80;

export default function PlaneMorph() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const getFilename = useCallback((i: number) => 
    `/sequence-2/Jet_morphs_into_wireframe_blueprint_7e214e9b6f_${i.toString().padStart(3, '0')}.jpg`, 
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
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        }

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
        
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h2 className="cinematic-title">Engineered for<br/>the Extraordinary</h2>
          <p className="cinematic-subtitle">Precision meets performance.</p>
        </motion.div>
      </div>
    </section>
  );
}
