import { useRef, useState, useCallback, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
}

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  isVisible: boolean;
  index: number;
}

export function SolutionCard({ icon, title, description, bullets, isVisible, index }: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const particleIdRef = useRef(0);
  const rafRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // 3D rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;
    
    setTransform({ rotateX, rotateY });

    // Create particles on mouse move
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // Only create particles if mouse moved enough
    const dx = localX - lastMousePos.current.x;
    const dy = localY - lastMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      lastMousePos.current = { x: localX, y: localY };
      
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: localX,
        y: localY,
        size: Math.random() * 4 + 2,
        opacity: 1,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2 - 1,
      };

      setParticles(prev => [...prev.slice(-15), newParticle]);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            opacity: p.opacity - 0.02,
            velocityY: p.velocityY - 0.05,
          }))
          .filter(p => p.opacity > 0)
      );
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [particles.length > 0]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <article
      ref={cardRef}
      className={`relative stagger-child ${isVisible ? 'visible' : ''}`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        perspective: '1000px',
      }}
      onMouseMove={!prefersReducedMotion ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow effect behind card */}
      <div 
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-tech-cyan/0 via-tech-cyan/20 to-tech-blue/0 opacity-0 blur-xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.6 : 0 }}
      />
      
      {/* Main card with 3D transform */}
      <div
        className="relative h-full rounded-xl border border-border-subtle bg-surface-card/80 backdrop-blur-sm p-6 transition-all duration-200 ease-out overflow-hidden"
        style={{
          transform: prefersReducedMotion 
            ? 'none' 
            : `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateZ(${isHovered ? '20px' : '0px'})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(79, 195, 247, 0.15), 0 0 0 1px rgba(79, 195, 247, 0.1)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Particles */}
        {!prefersReducedMotion && particles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none rounded-full bg-tech-cyan"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${particle.size * 2}px rgba(79, 195, 247, ${particle.opacity})`,
            }}
          />
        ))}

        {/* Shine effect */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 0.1 : 0,
            background: `radial-gradient(circle at ${50 + transform.rotateY * 2}% ${50 - transform.rotateX * 2}%, rgba(79, 195, 247, 0.3), transparent 50%)`,
          }}
        />

        {/* Content with 3D depth */}
        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="p-3 rounded-lg bg-tech-cyan/10 text-tech-cyan transition-all duration-300"
              style={{
                transform: isHovered && !prefersReducedMotion ? 'translateZ(20px) scale(1.1)' : 'translateZ(0)',
                boxShadow: isHovered ? '0 0 20px rgba(79, 195, 247, 0.3)' : 'none',
              }}
            >
              {icon}
            </div>
            <h3 
              className="font-display font-semibold text-xl text-foreground"
              style={{
                transform: isHovered && !prefersReducedMotion ? 'translateZ(15px)' : 'translateZ(0)',
              }}
            >
              {title}
            </h3>
          </div>

          <p 
            className="text-foreground-muted mb-6 leading-relaxed"
            style={{
              transform: isHovered && !prefersReducedMotion ? 'translateZ(10px)' : 'translateZ(0)',
            }}
          >
            {description}
          </p>

          <ul className="space-y-3" aria-label={`Benefícios de ${title}`}>
            {bullets.map((bullet, bulletIndex) => (
              <li 
                key={bullet} 
                className="flex items-center gap-3 text-sm"
                style={{
                  transform: isHovered && !prefersReducedMotion 
                    ? `translateZ(${5 + bulletIndex * 3}px)` 
                    : 'translateZ(0)',
                  transition: `transform 0.3s ease-out ${bulletIndex * 50}ms`,
                }}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check size={12} className="text-primary" aria-hidden="true" />
                </span>
                <span className="text-foreground-muted">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Edge highlight */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, transparent 50%, rgba(43, 122, 184, 0.05) 100%)',
          }}
        />
      </div>
    </article>
  );
}
