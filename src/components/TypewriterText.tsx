import { useState, useEffect, useCallback } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  cursorChar?: string;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  className = '',
  typingSpeed = 80,
  startDelay = 500,
  cursorChar = '|',
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    setIsTyping(true);
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        // Vary typing speed slightly for natural feel
        const variance = Math.random() * 40 - 20;
        const nextDelay = typingSpeed + variance;
        
        setTimeout(typeChar, Math.max(30, nextDelay));
      } else {
        setIsTyping(false);
        setIsComplete(true);
        onComplete?.();
      }
    };

    typeChar();
  }, [text, typingSpeed, onComplete]);

  // Start typing after delay
  useEffect(() => {
    const timer = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay, startTyping]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={`relative inline ${className}`}>
      <span>{displayedText}</span>
      <span
        className={`inline-block ml-1 font-light transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } ${isComplete && !isTyping ? 'animate-pulse' : ''}`}
        style={{
          color: 'hsl(var(--tech-cyan))',
          textShadow: showCursor ? '0 0 8px hsl(var(--tech-cyan)), 0 0 16px hsl(var(--tech-cyan) / 0.5)' : 'none',
        }}
        aria-hidden="true"
      >
        {cursorChar}
      </span>
      {/* Screen reader gets full text immediately */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
