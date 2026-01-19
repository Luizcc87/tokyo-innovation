import { useState, useEffect, useCallback, useRef } from 'react';

interface MorphingLogoProps {
  text: string;
  className?: string;
}

const glitchChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const techChars = '01@#$%&<>{}[]░▒▓█';

export function MorphingLogo({ text, className = '' }: MorphingLogoProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [distortionOffset, setDistortionOffset] = useState({ x: 0, y: 0 });
  const [scanLinePos, setScanLinePos] = useState(0);
  const hoverStartRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Progressive glitch effect based on hover duration
  const updateGlitchIntensity = useCallback(() => {
    if (!isHovering) return;
    
    const elapsed = Date.now() - hoverStartRef.current;
    setHoverDuration(elapsed);
    
    // Intensity increases over time (0 to 1 over 3 seconds)
    const intensity = Math.min(elapsed / 3000, 1);
    setGlitchIntensity(intensity);
    
    // Random distortion offset that increases with intensity
    if (intensity > 0.2) {
      setDistortionOffset({
        x: (Math.random() - 0.5) * intensity * 6,
        y: (Math.random() - 0.5) * intensity * 3,
      });
    }
    
    // Glitch more characters as intensity increases
    const glitchProbability = intensity * 0.4;
    const charSet = intensity > 0.5 ? techChars : glitchChars;
    
    const newText = text
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        if (Math.random() < glitchProbability) {
          return charSet[Math.floor(Math.random() * charSet.length)];
        }
        return char;
      })
      .join('');
    
    setDisplayText(newText);
  }, [isHovering, text]);

  // Handle hover start
  const handleMouseEnter = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    setIsHovering(true);
    hoverStartRef.current = Date.now();
    
    // Start progressive glitch
    intervalRef.current = setInterval(updateGlitchIntensity, 50);
  }, [updateGlitchIntensity]);

  // Handle hover end
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setHoverDuration(0);
    setGlitchIntensity(0);
    setDistortionOffset({ x: 0, y: 0 });
    setDisplayText(text);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [text]);

  // Scan line animation during hover
  useEffect(() => {
    if (!isHovering || glitchIntensity < 0.3) {
      setScanLinePos(0);
      return;
    }
    
    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 5) % 100);
    }, 50);
    
    return () => clearInterval(scanInterval);
  }, [isHovering, glitchIntensity]);

  // Periodic subtle ambient glitch when not hovering
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    glitchIntervalRef.current = setInterval(() => {
      if (!isHovering && Math.random() > 0.7) {
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

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
    };
  }, [text, isHovering]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, []);

  const intensityClass = glitchIntensity > 0.7 ? 'intense' : glitchIntensity > 0.4 ? 'medium' : '';

  return (
    <span
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
      style={{
        transform: `translate(${distortionOffset.x}px, ${distortionOffset.y}px)`,
        transition: glitchIntensity > 0 ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Main text layer */}
      <span className="relative z-10">
        {displayText.split('').map((char, index) => {
          const isGlitched = char !== text[index];
          const charGlitchOffset = isGlitched ? (Math.random() - 0.5) * glitchIntensity * 4 : 0;
          
          return (
            <span
              key={index}
              className={`inline-block transition-all duration-75 ${
                isGlitched ? 'text-tech-cyan' : ''
              }`}
              style={{
                transform: isGlitched ? `translateY(${charGlitchOffset}px) scale(${1 + glitchIntensity * 0.1})` : 'none',
                textShadow: isGlitched 
                  ? `0 0 ${8 + glitchIntensity * 12}px hsl(var(--tech-cyan)), 0 0 ${16 + glitchIntensity * 20}px hsl(var(--tech-cyan) / 0.5)` 
                  : 'none',
                filter: isGlitched && glitchIntensity > 0.5 ? `blur(${glitchIntensity * 0.5}px)` : 'none',
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
      
      {/* Chromatic aberration layers - appear with intensity */}
      {glitchIntensity > 0.2 && (
        <>
          {/* Red/magenta layer */}
          <span
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              transform: `translate(${-2 - glitchIntensity * 4}px, ${glitchIntensity * 2}px)`,
              opacity: glitchIntensity * 0.4,
              color: 'hsl(var(--primary))',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
          
          {/* Cyan layer */}
          <span
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              transform: `translate(${2 + glitchIntensity * 4}px, ${-glitchIntensity * 2}px)`,
              opacity: glitchIntensity * 0.4,
              color: 'hsl(var(--tech-cyan))',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
        </>
      )}
      
      {/* Horizontal glitch slices */}
      {glitchIntensity > 0.5 && (
        <>
          <span
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            style={{ 
              clipPath: `inset(${20 + Math.random() * 10}% 0 ${50 + Math.random() * 10}% 0)`,
              transform: `translateX(${(Math.random() - 0.5) * glitchIntensity * 10}px)`,
            }}
            aria-hidden="true"
          >
            <span className="text-tech-cyan">{displayText}</span>
          </span>
          <span
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            style={{ 
              clipPath: `inset(${60 + Math.random() * 10}% 0 ${10 + Math.random() * 10}% 0)`,
              transform: `translateX(${(Math.random() - 0.5) * glitchIntensity * 8}px)`,
            }}
            aria-hidden="true"
          >
            <span className="text-primary">{displayText}</span>
          </span>
        </>
      )}
      
      {/* Scan line effect */}
      {glitchIntensity > 0.3 && (
        <span
          className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent ${scanLinePos - 5}%,
              hsl(var(--tech-cyan) / ${glitchIntensity * 0.3}) ${scanLinePos}%,
              transparent ${scanLinePos + 5}%
            )`,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Noise overlay for intense glitch */}
      {glitchIntensity > 0.6 && (
        <span
          className="absolute inset-0 z-25 pointer-events-none mix-blend-overlay"
          style={{
            opacity: glitchIntensity * 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Intensity indicator */}
      {glitchIntensity > 0.1 && (
        <span
          className="absolute -bottom-4 left-0 right-0 h-0.5 bg-tech-cyan/20 overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="h-full bg-tech-cyan transition-all duration-100"
            style={{ 
              width: `${glitchIntensity * 100}%`,
              boxShadow: `0 0 ${glitchIntensity * 10}px hsl(var(--tech-cyan))`,
            }}
          />
        </span>
      )}
    </span>
  );
}

