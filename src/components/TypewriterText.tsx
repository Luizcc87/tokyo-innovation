import { useState, useEffect, useCallback, useMemo } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

// Characters that cycle through before landing on the final character
const glitchChars = '01アイウエオ@#$%&*<>{}[]░▒▓█';
const binaryChars = '01';

export function TypewriterText({
  text,
  className = '',
  typingSpeed = 60,
  startDelay = 500,
  onComplete,
}: TypewriterTextProps) {
  const [displayedChars, setDisplayedChars] = useState<string[]>([]);
  const [glitchingIndex, setGlitchingIndex] = useState<number>(-1);
  const [glitchChar, setGlitchChar] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [scanLinePos, setScanLinePos] = useState(0);

  // AI cursor states
  const cursorStates = useMemo(() => ['▌', '▐', '█', '▐'], []);
  const [cursorIndex, setCursorIndex] = useState(0);

  const startTyping = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setDisplayedChars(text.split(''));
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex >= text.length) {
        setGlitchingIndex(-1);
        setIsComplete(true);
        onComplete?.();
        return;
      }

      const targetChar = text[currentIndex];
      
      // Skip glitch effect for spaces
      if (targetChar === ' ') {
        setDisplayedChars(prev => [...prev, ' ']);
        currentIndex++;
        setTimeout(typeNextChar, typingSpeed * 0.3);
        return;
      }

      // Start glitching phase for this character
      setGlitchingIndex(currentIndex);
      
      let glitchCount = 0;
      const maxGlitches = 3 + Math.floor(Math.random() * 3);
      
      const glitchCycle = () => {
        if (glitchCount < maxGlitches) {
          // Show random glitch character
          const charSet = Math.random() > 0.5 ? glitchChars : binaryChars;
          setGlitchChar(charSet[Math.floor(Math.random() * charSet.length)]);
          glitchCount++;
          setTimeout(glitchCycle, 30 + Math.random() * 40);
        } else {
          // Settle on final character
          setDisplayedChars(prev => [...prev, targetChar]);
          setGlitchingIndex(-1);
          currentIndex++;
          
          // Variable delay for robotic feel - sometimes fast bursts
          const isBurst = Math.random() > 0.7;
          const delay = isBurst ? typingSpeed * 0.3 : typingSpeed + Math.random() * 30;
          setTimeout(typeNextChar, delay);
        }
      };
      
      glitchCycle();
    };

    typeNextChar();
  }, [text, typingSpeed, onComplete]);

  // Start typing after delay
  useEffect(() => {
    const timer = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay, startTyping]);

  // Animated AI cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorIndex(prev => (prev + 1) % cursorStates.length);
    }, 150);

    return () => clearInterval(cursorInterval);
  }, [cursorStates.length]);

  // Scan line animation
  useEffect(() => {
    if (isComplete) return;
    
    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 1) % 3);
    }, 200);

    return () => clearInterval(scanInterval);
  }, [isComplete]);

  return (
    <span className={`relative inline ${className}`}>
      {/* Rendered characters */}
      {displayedChars.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-100 ${char === ' ' ? 'w-[0.3em]' : ''}`}
          style={{
            textShadow: index === displayedChars.length - 1 && !isComplete && char !== ' '
              ? '0 0 10px hsl(var(--tech-cyan)), 0 0 20px hsl(var(--tech-cyan) / 0.5)'
              : 'none',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      
      {/* Glitching character */}
      {glitchingIndex >= 0 && (
        <span
          className="inline-block text-tech-cyan"
          style={{
            textShadow: '0 0 15px hsl(var(--tech-cyan)), 0 0 30px hsl(var(--tech-cyan) / 0.8)',
            animation: 'pulse 0.1s infinite',
          }}
        >
          {glitchChar}
        </span>
      )}
      
      {/* AI Cursor */}
      <span
        className="inline-block ml-0.5 text-tech-cyan relative"
        style={{
          textShadow: '0 0 12px hsl(var(--tech-cyan)), 0 0 24px hsl(var(--tech-cyan) / 0.6)',
          opacity: isComplete ? 0.7 : 1,
        }}
        aria-hidden="true"
      >
        {cursorStates[cursorIndex]}
        
        {/* Scanning effect on cursor */}
        {!isComplete && (
          <span
            className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-cyan/30 to-transparent pointer-events-none"
            style={{
              transform: `translateY(${(scanLinePos - 1) * 33}%)`,
              transition: 'transform 0.15s linear',
            }}
          />
        )}
      </span>

      {/* Binary trail effect while typing */}
      {!isComplete && displayedChars.length > 0 && (
        <span 
          className="absolute -bottom-6 left-0 text-xs font-mono text-tech-cyan/30 whitespace-nowrap overflow-hidden"
          style={{ maxWidth: '100%' }}
          aria-hidden="true"
        >
          {Array.from({ length: Math.min(displayedChars.length, 20) }, () => 
            Math.random() > 0.5 ? '1' : '0'
          ).join('')}
        </span>
      )}

      {/* Processing indicator */}
      {!isComplete && (
        <span 
          className="absolute -right-16 top-1/2 -translate-y-1/2 text-xs font-mono text-tech-cyan/50 hidden md:inline-block"
          aria-hidden="true"
        >
          [{String(Math.floor((displayedChars.length / text.length) * 100)).padStart(3, '0')}%]
        </span>
      )}
      
      {/* Screen reader gets full text immediately */}
      <span className="sr-only">{text}</span>
    </span>
  );
}

