import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

interface GridLine {
  position: number;
  opacity: number;
  speed: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const horizontalLinesRef = useRef<GridLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(50, Math.floor((width * height) / 25000));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Initialize horizontal scanning lines
    horizontalLinesRef.current = Array.from({ length: 3 }, (_, i) => ({
      position: (height / 3) * i,
      opacity: 0.1 + Math.random() * 0.1,
      speed: 0.3 + Math.random() * 0.2,
    }));
  }, []);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gridSize = 60;
    const perspectiveY = height * 0.4;
    
    // Vertical lines with perspective
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.03)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= width; x += gridSize) {
      const wave = Math.sin(time * 0.001 + x * 0.01) * 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + wave, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      const wave = Math.sin(time * 0.0008 + y * 0.01) * 2;
      const opacity = 0.02 + (y / height) * 0.02;
      ctx.strokeStyle = `rgba(79, 195, 247, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(0, y + wave);
      ctx.lineTo(width, y + wave);
      ctx.stroke();
    }

    // Animated scanning lines
    horizontalLinesRef.current.forEach((line) => {
      line.position += line.speed;
      if (line.position > height) {
        line.position = -10;
        line.opacity = 0.08 + Math.random() * 0.08;
      }

      const gradient = ctx.createLinearGradient(0, line.position - 20, 0, line.position + 20);
      gradient.addColorStop(0, 'rgba(79, 195, 247, 0)');
      gradient.addColorStop(0.5, `rgba(79, 195, 247, ${line.opacity})`);
      gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, line.position - 20, width, 40);
    });

    // Perspective grid at bottom
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.04)';
    const vanishingPointX = width / 2;
    const vanishingPointY = perspectiveY;
    
    for (let i = -10; i <= 10; i++) {
      const startX = vanishingPointX + i * 100;
      ctx.beginPath();
      ctx.moveTo(vanishingPointX, vanishingPointY);
      ctx.lineTo(startX, height);
      ctx.stroke();
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.pulsePhase += 0.02;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Mouse interaction - subtle attraction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200 && distance > 0) {
        const force = (200 - distance) / 200 * 0.02;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }

      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Pulsing opacity
      const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.pulsePhase) * 0.3);

      // Draw particle with glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, `rgba(79, 195, 247, ${pulseOpacity})`);
      gradient.addColorStop(0.5, `rgba(79, 195, 247, ${pulseOpacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core of particle
      ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.8})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw connections between nearby particles
    ctx.strokeStyle = 'rgba(79, 195, 247, 0.05)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.1;
          ctx.strokeStyle = `rgba(79, 195, 247, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }, []);

  const drawGlowOrbs = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Large ambient glow orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, size: 200, color: '79, 195, 247' },
      { x: width * 0.8, y: height * 0.6, size: 250, color: '41, 121, 255' },
      { x: width * 0.5, y: height * 0.8, size: 180, color: '79, 195, 247' },
    ];

    orbs.forEach((orb, i) => {
      const pulse = Math.sin(time * 0.001 + i * Math.PI * 0.5) * 0.3 + 0.7;
      const xOffset = Math.sin(time * 0.0005 + i) * 30;
      const yOffset = Math.cos(time * 0.0007 + i) * 20;

      const gradient = ctx.createRadialGradient(
        orb.x + xOffset, orb.y + yOffset, 0,
        orb.x + xOffset, orb.y + yOffset, orb.size * pulse
      );
      gradient.addColorStop(0, `rgba(${orb.color}, 0.05)`);
      gradient.addColorStop(0.5, `rgba(${orb.color}, 0.02)`);
      gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x + xOffset, orb.y + yOffset, orb.size * pulse, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    if (prefersReducedMotion) {
      // Draw static version
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      drawGrid(ctx, rect.width, rect.height, 0);
      drawGlowOrbs(ctx, rect.width, rect.height, 0);
      return;
    }

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      drawGlowOrbs(ctx, rect.width, rect.height, time);
      drawGrid(ctx, rect.width, rect.height, time);
      drawParticles(ctx, rect.width, rect.height, time);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, drawGrid, drawParticles, drawGlowOrbs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
