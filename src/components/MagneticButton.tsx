import { forwardRef, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
  strength?: number;
  radius?: number;
  children: React.ReactNode;
}

export const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  ({ variant = 'primary', strength = 0.35, radius = 120, className, children, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLAnchorElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLAnchorElement>) || innerRef;
    const contentRef = useRef<HTMLSpanElement>(null);

    const prefersReducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const handleMouseMove = useCallback((e: MouseEvent) => {
      const element = ref.current;
      if (!element || prefersReducedMotion) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const pullStrength = (1 - distance / radius) * strength;
        const translateX = distanceX * pullStrength;
        const translateY = distanceY * pullStrength;

        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        element.style.transition = 'transform 0.15s ease-out';

        // Inner content moves slightly more for depth effect
        if (contentRef.current) {
          contentRef.current.style.transform = `translate(${translateX * 0.3}px, ${translateY * 0.3}px)`;
        }
      }
    }, [radius, strength, prefersReducedMotion, ref]);

    const handleMouseLeave = useCallback(() => {
      const element = ref.current;
      if (!element) return;

      element.style.transform = 'translate(0, 0)';
      element.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      if (contentRef.current) {
        contentRef.current.style.transform = 'translate(0, 0)';
        contentRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    }, [ref]);

    useEffect(() => {
      if (prefersReducedMotion) return;

      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);

      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
      };
    }, [handleMouseMove, prefersReducedMotion]);

    const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

    return (
      <a
        ref={ref}
        className={cn(baseClasses, 'inline-block', className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span ref={contentRef} className="inline-flex items-center gap-2 transition-transform duration-150">
          {children}
        </span>
      </a>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
