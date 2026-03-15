import { useState, useEffect } from 'react';

export function useImageSequence(frameCount: number, getFilename: (index: number) => string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // Allow iteration to match the exact frame count, starting at 0 if needed in getFilename
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFilename(i);
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      
      imgArray.push(img);
    }
    
    setImages(imgArray);
  }, [frameCount, getFilename]);

  return { images, loaded };
}
