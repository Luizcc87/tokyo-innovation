import { useEffect, useState, useRef, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number; // Multiplier for parallax effect (0.1 = slow, 1 = normal scroll)
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export function useParallax({ speed = 0.3, direction = 'up', disabled = false }: ParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const updateOffset = useCallback(() => {
    if (!ref.current || prefersReducedMotion || disabled) {
      setOffset(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Apply parallax based on distance from center
    const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? 1 : -1);
    
    setOffset(parallaxOffset);
    ticking.current = false;
  }, [speed, direction, prefersReducedMotion, disabled]);

  useEffect(() => {
    if (prefersReducedMotion || disabled) return;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateOffset);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOffset(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateOffset, prefersReducedMotion, disabled]);

  return { ref, offset, style: { transform: `translateY(${offset}px)` } };
}

// Hook for multiple parallax layers within a section
export function useLayeredParallax(layerCount: number, baseSpeed: number = 0.1) {
  const containerRef = useRef<HTMLElement>(null);
  const [offsets, setOffsets] = useState<number[]>(new Array(layerCount).fill(0));
  const ticking = useRef(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const updateOffsets = useCallback(() => {
    if (!containerRef.current || prefersReducedMotion) {
      setOffsets(new Array(layerCount).fill(0));
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;

    const newOffsets = Array.from({ length: layerCount }, (_, i) => {
      const layerSpeed = baseSpeed * (i + 1);
      return distanceFromCenter * layerSpeed;
    });

    setOffsets(newOffsets);
    ticking.current = false;
  }, [layerCount, baseSpeed, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateOffsets);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOffsets();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateOffsets, prefersReducedMotion]);

  return { containerRef, offsets };
}
