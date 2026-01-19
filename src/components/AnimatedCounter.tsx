import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  const animateCount = () => {
    const startTime = performance.now();
    const startValue = 0;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentValue = startValue + (end - startValue) * easedProgress;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  };

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();

  return (
    <span 
      ref={ref} 
      className={`tabular-nums ${className}`}
      aria-label={`${prefix}${end}${suffix}`}
    >
      {prefix}
      <span className="inline-block min-w-[1ch]">
        {formattedCount}
      </span>
      {suffix}
    </span>
  );
}

interface StatItemProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function StatItem({ value, label, prefix, suffix, decimals }: StatItemProps) {
  return (
    <div className="flex flex-col items-center p-4 md:p-6">
      <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
        <AnimatedCounter 
          end={value} 
          prefix={prefix} 
          suffix={suffix}
          decimals={decimals}
          duration={2500}
        />
      </div>
      <div className="text-sm md:text-base text-foreground-muted text-center">
        {label}
      </div>
    </div>
  );
}

interface StatsGridProps {
  stats: StatItemProps[];
  className?: string;
}

export function StatsGrid({ stats, className = '' }: StatsGridProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-cyan/5 via-tech-blue/5 to-tech-cyan/5 rounded-2xl blur-xl" />
      
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 p-4 md:p-6 rounded-2xl border border-border/30 bg-background/50 backdrop-blur-sm">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`relative ${
              index < stats.length - 1 
                ? 'md:border-r md:border-border/30' 
                : ''
            }`}
          >
            <StatItem {...stat} />
            
            {/* Decorative glow on number */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-tech-cyan/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
