import { useEffect, useRef, useState, useCallback } from 'react';

export function useRevealOnScroll(threshold = 0.1, rootMargin = '0px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

interface StaggerRevealOptions {
  baseDelay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export function useStaggerReveal(
  itemCount: number, 
  baseDelayOrOptions: number | StaggerRevealOptions = 100
) {
  const options = typeof baseDelayOrOptions === 'number' 
    ? { baseDelay: baseDelayOrOptions }
    : baseDelayOrOptions;
  
  const { baseDelay = 100, threshold = 0.1, direction = 'up' } = options;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const [hasTriggered, setHasTriggered] = useState(false);

  const getTransform = useCallback((isVisible: boolean) => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    
    switch (direction) {
      case 'up': return 'translateY(40px) scale(0.98)';
      case 'down': return 'translateY(-40px) scale(0.98)';
      case 'left': return 'translateX(40px) scale(0.98)';
      case 'right': return 'translateX(-40px) scale(0.98)';
      case 'scale': return 'scale(0.9)';
      default: return 'translateY(40px) scale(0.98)';
    }
  }, [direction]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setVisibleItems(new Array(itemCount).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          
          // Stagger the reveal of each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * baseDelay);
          }
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [itemCount, baseDelay, threshold, hasTriggered]);

  const getItemStyle = useCallback((index: number) => ({
    opacity: visibleItems[index] ? 1 : 0,
    transform: getTransform(visibleItems[index]),
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${index * 50}ms`,
  }), [visibleItems, getTransform]);

  return { containerRef, visibleItems, getItemStyle };
}

// Hook for staggered children within a container
export function useStaggerChildren(options: { staggerDelay?: number; threshold?: number } = {}) {
  const { staggerDelay = 80, threshold = 0.15 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTriggered) {
          setIsTriggered(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, isTriggered]);

  const getChildStyle = useCallback((index: number) => ({
    opacity: isTriggered ? 1 : 0,
    transform: isTriggered ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: isTriggered ? `${index * staggerDelay}ms` : '0ms',
  }), [isTriggered, staggerDelay]);

  return { containerRef, isTriggered, getChildStyle };
}
