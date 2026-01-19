import { useRef, useState, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic({ strength = 0.3, radius = 100 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isInRange, setIsInRange] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      setIsInRange(true);
      const pullStrength = (1 - distance / radius) * strength;
      setTransform({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength,
      });
    } else {
      setIsInRange(false);
      setTransform({ x: 0, y: 0 });
    }
  }, [strength, radius, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
    setIsInRange(false);
  }, []);

  const bind = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  return {
    ref,
    transform,
    isInRange,
    style: {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
      transition: isInRange ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out',
    },
    bind,
  };
}
