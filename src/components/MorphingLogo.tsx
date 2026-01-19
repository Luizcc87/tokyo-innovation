import { useState, useEffect, useCallback } from 'react';

interface MorphingLogoProps {
  text: string;
  className?: string;
}

const glitchChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export function MorphingLogo({ text, className = '' }: MorphingLogoProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrambleText = useCallback(() => {
    if (isAnimating) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    setIsAnimating(true);
    const originalText = text;
    const duration = 600;
    const frameRate = 50;
    const totalFrames = duration / frameRate;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      
      const newText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          
          // Characters resolve from left to right
          const charProgress = (index / originalText.length) * 0.7;
          if (progress > charProgress + 0.3) {
            return originalText[index];
          }
          
          // Random glitch character
          if (Math.random() > 0.5) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return originalText[index];
        })
        .join('');

      setDisplayText(newText);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(originalText);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [text, isAnimating]);

  // Trigger animation on hover
  useEffect(() => {
    if (isHovering && !isAnimating) {
      scrambleText();
    }
  }, [isHovering, scrambleText, isAnimating]);

  // Periodic subtle animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!isHovering && !isAnimating && Math.random() > 0.7) {
        // Subtle single character glitch
        const randomIndex = Math.floor(Math.random() * text.length);
        if (text[randomIndex] !== ' ') {
          const glitchedText = text
            .split('')
            .map((char, i) => 
              i === randomIndex 
                ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                : char
            )
            .join('');
          
          setDisplayText(glitchedText);
          setTimeout(() => setDisplayText(text), 100);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [text, isHovering, isAnimating]);

  return (
    <span
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={text}
    >
      <span className="relative z-10">
        {displayText.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-75 ${
              char !== text[index] 
                ? 'text-tech-cyan scale-110 blur-[0.5px]' 
                : ''
            }`}
            style={{
              textShadow: char !== text[index] 
                ? '0 0 8px hsl(var(--tech-cyan)), 0 0 16px hsl(var(--tech-cyan) / 0.5)' 
                : 'none',
            }}
          >
            {char}
          </span>
        ))}
      </span>
      
      {/* Glitch layers */}
      {isAnimating && (
        <>
          <span
            className="absolute inset-0 z-0 text-tech-cyan/30 blur-[1px]"
            style={{ 
              transform: 'translate(-2px, 0)',
              clipPath: 'inset(10% 0 60% 0)',
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 z-0 text-primary/30 blur-[1px]"
            style={{ 
              transform: 'translate(2px, 0)',
              clipPath: 'inset(40% 0 20% 0)',
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
        </>
      )}
    </span>
  );
}
