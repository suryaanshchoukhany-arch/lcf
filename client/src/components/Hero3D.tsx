import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create particles on mouse move (only if not reduced motion)
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      const newParticles: Particle[] = [];
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          life: 1,
          size: Math.random() * 3 + 1,
        });
      }
      setParticles(prev => [...prev, ...newParticles].slice(-200));
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prev => {
        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.015,
            vy: p.vy + 0.1, // gravity
          }))
          .filter(p => p.life > 0);

        // Draw particles with optimized rendering
        updated.forEach(p => {
          ctx.fillStyle = `rgba(26, 107, 255, ${p.life * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Glow effect (less frequent for performance)
          if (Math.random() > 0.7) {
            ctx.strokeStyle = `rgba(0, 170, 255, ${p.life * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        return updated;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (!prefersReducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden perspective">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* 3D Badge */}
        <div className={prefersReducedMotion ? '' : 'animate-float'}>
          <div className="perspective">
            <div
              className={`relative w-48 h-48 mx-auto ${!prefersReducedMotion ? 'animate-rotate-3d' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                animation: prefersReducedMotion ? 'none' : 'rotate-3d 20s linear infinite',
              }}
            >
              {/* Badge outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 glow-intense blur-2xl opacity-50" />

              {/* Badge main */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 border-2 border-electric-blue glow-electric flex items-center justify-center">
                {/* Inner circle */}
                <div className="absolute inset-4 rounded-full border border-electric-blue/50" />

                {/* Badge content */}
                <div className="text-center z-10">
                  <div className="text-6xl font-black text-electric-blue text-glow">13</div>
                  <div className="text-xs font-bold text-white mt-1 tracking-widest">EDITION</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className={`text-center mb-8 ${prefersReducedMotion ? '' : 'animate-slide-up'}`}>
          <h1 className="text-6xl md:text-7xl font-black mb-4 text-glow leading-tight">
            <span className="text-white">LE</span>
            <br />
            <span className="text-electric-blue">CONCOURS</span>
            <br />
            <span className="text-white">DE LA</span>
            <br />
            <span className="text-electric-blue">FRANCOPHONIE</span>
            <br />
            <span className="text-white">DU MAYO</span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 font-light">
            A Competition Like No Other
          </p>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-electric-blue text-sm font-bold mb-2">OPENING CEREMONY</div>
            <div className="text-white text-lg font-semibold">October 3rd, 2025</div>
          </div>
          <div className="text-center">
            <div className="text-electric-blue text-sm font-bold mb-2">DURATION</div>
            <div className="text-white text-lg font-semibold">October 2-5, 2025</div>
          </div>
          <div className="text-center">
            <div className="text-electric-blue text-sm font-bold mb-2">LOCATION</div>
            <div className="text-white text-lg font-semibold">Mayo College, Ajmer</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 ${prefersReducedMotion ? '' : 'animate-scale-in'}`}>
          <a
            href="https://forms.gle/iVtMpHNNsRXPmx348"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium"
          >
            Register Now
          </a>
          <button className="px-6 py-3 rounded-lg font-semibold text-white border-2 border-electric-blue hover:bg-electric-blue/10 transition-smooth hover-glow">
            Learn More
          </button>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${prefersReducedMotion ? '' : 'animate-bounce'}`}>
          <div className="text-gray-400 text-sm mb-2">Scroll Down</div>
          <div className="text-electric-blue text-2xl">↓</div>
        </div>
      </div>
    </div>
  );
}
