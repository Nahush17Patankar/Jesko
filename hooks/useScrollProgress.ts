import { useState, useEffect, RefObject } from 'react';

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Start when element top hits top of viewport, end when element bottom hits bottom of viewport
      const currentScroll = scrollY - elementTop;
      const rawProgress = currentScroll / (elementHeight - windowHeight);
      
      setProgress(Math.min(Math.max(rawProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to initialize
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}
