import { useEffect, useRef } from 'react';

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawGrid = () => {
      const gridSize = 60;
      const gridOpacity = 0.03;
      
      ctx.strokeStyle = `rgba(79, 195, 247, ${gridOpacity})`;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawTechLines = () => {
      const lineCount = 5;
      const time = Date.now() * 0.0005;

      for (let i = 0; i < lineCount; i++) {
        const progress = (time + i * 0.2) % 1;
        const y = canvas.height * (0.2 + i * 0.15);
        const startX = -200 + progress * (canvas.width + 400);
        
        const gradient = ctx.createLinearGradient(startX, 0, startX + 200, 0);
        gradient.addColorStop(0, 'rgba(79, 195, 247, 0)');
        gradient.addColorStop(0.5, 'rgba(79, 195, 247, 0.15)');
        gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + 200, y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 195, 247, ${particle.opacity})`;
        ctx.fill();

        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.08;
            ctx.strokeStyle = `rgba(79, 195, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
    };

    const drawGlowOrbs = () => {
      const time = Date.now() * 0.001;
      
      // Large subtle glow orbs
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 300, offset: 0 },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, size: 250, offset: 2 },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, size: 200, offset: 4 },
      ];

      orbs.forEach((orb) => {
        const pulse = Math.sin(time + orb.offset) * 0.5 + 0.5;
        const opacity = 0.03 + pulse * 0.02;
        
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size
        );
        gradient.addColorStop(0, `rgba(79, 195, 247, ${opacity})`);
        gradient.addColorStop(1, 'rgba(79, 195, 247, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGlowOrbs();
      drawGrid();
      
      if (!prefersReducedMotion) {
        drawTechLines();
      }
      
      drawParticles();

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
