import { useState, useEffect, useCallback } from 'react';

interface MorphingLogoProps {
  text: string;
  className?: string;
}

const glitchChars = 'アイウエオカキクケコサシスセソタチツテト01!@#$%&*';

export function MorphingLogo({ text, className = '' }: MorphingLogoProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  const scrambleText = useCallback(() => {
    let iterations = 0;
    const maxIterations = text.length * 3;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iterations / 3 > index) return char;
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );
      
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
    
    return interval;
  }, [text]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isHovering) {
      interval = scrambleText();
    } else {
      setDisplayText(text);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, scrambleText, text]);

  // Ambient subtle glitch
  useEffect(() => {
    const ambientGlitch = setInterval(() => {
      if (!isHovering && Math.random() > 0.7) {
        const chars = text.split('');
        const randomIndex = Math.floor(Math.random() * chars.length);
        if (chars[randomIndex] !== ' ') {
          chars[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        setDisplayText(chars.join(''));
        
        setTimeout(() => {
          setDisplayText(text);
        }, 100);
      }
    }, 2000);
    
    return () => clearInterval(ambientGlitch);
  }, [text, isHovering]);

  return (
    <span
      className={`relative inline-block cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span
        className="relative z-10 transition-all duration-200"
        style={{
          textShadow: isHovering 
            ? '0 0 10px hsl(var(--tech-cyan)), 0 0 20px hsl(var(--tech-cyan) / 0.5)' 
            : 'none',
        }}
      >
        {displayText.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block transition-transform duration-100"
            style={{
              transform: isHovering && char !== ' ' 
                ? `translateY(${Math.sin(index * 0.5) * 2}px)` 
                : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      
      {/* Chromatic aberration on hover */}
      {isHovering && (
        <>
          <span
            className="absolute inset-0 z-0 opacity-50 pointer-events-none"
            style={{
              color: 'hsl(var(--tech-cyan))',
              transform: 'translateX(-2px)',
              filter: 'blur(0.5px)',
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 z-0 opacity-50 pointer-events-none"
            style={{
              color: 'hsl(var(--tech-magenta, 300 80% 60%))',
              transform: 'translateX(2px)',
              filter: 'blur(0.5px)',
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
