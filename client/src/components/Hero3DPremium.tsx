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

export default function Hero3DPremium() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
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

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      const newParticles: Particle[] = [];
      for (let i = 0; i < 4; i++) {
        newParticles.push({
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5 - 2,
          life: 1,
          size: Math.random() * 4 + 1.5,
        });
      }
      setParticles(prev => [...prev, ...newParticles].slice(-300));
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prev => {
        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.012,
            vy: p.vy + 0.12,
          }))
          .filter(p => p.life > 0);

        updated.forEach(p => {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, `rgba(26, 107, 255, ${p.life * 0.8})`);
          gradient.addColorStop(1, `rgba(0, 170, 255, ${p.life * 0.2})`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
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

      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-black to-black" />
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Logo Section */}
        <div className={`mb-12 ${prefersReducedMotion ? '' : 'animate-float'}`}>
          <div className="perspective">
            <div
              className={`relative w-32 h-32 mx-auto ${!prefersReducedMotion ? 'animate-rotate-3d' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                animation: prefersReducedMotion ? 'none' : 'rotate-3d 25s linear infinite',
              }}
            >
              {/* Logo glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 blur-3xl opacity-40" />
              
              {/* Logo container */}
              <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center overflow-hidden">
                <img 
                  src="/manus-storage/pasted_file_GVwXNI_image_5189f15b.png" 
                  alt="Mayo College Logo" 
                  className="w-20 h-20 object-contain filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className={`text-center mb-8 max-w-5xl ${prefersReducedMotion ? '' : 'animate-slide-up'}`}>
          <h1 className="font-playfair text-7xl md:text-8xl font-black mb-4 text-glow leading-tight">
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
          <p className="text-2xl text-gray-200 mt-6 font-light tracking-wide">
            13th Edition • 2026
          </p>
          <p className="text-lg text-gray-400 mt-3 font-light">
            A Competition Like No Other
          </p>
        </div>

        {/* Event Details - Premium styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto w-full">
          <div className="text-center group">
            <div className="text-electric-blue text-xs font-bold mb-3 tracking-widest uppercase">Opening Ceremony</div>
            <div className="text-white text-2xl font-playfair font-bold group-hover:text-electric-blue transition-smooth">October 8th, 2026</div>
          </div>
          <div className="text-center group">
            <div className="text-electric-blue text-xs font-bold mb-3 tracking-widest uppercase">Duration</div>
            <div className="text-white text-2xl font-playfair font-bold group-hover:text-electric-blue transition-smooth">October 8-10, 2026</div>
          </div>
          <div className="text-center group">
            <div className="text-electric-blue text-xs font-bold mb-3 tracking-widest uppercase">Location</div>
            <div className="text-white text-2xl font-playfair font-bold group-hover:text-electric-blue transition-smooth">Mayo College, Ajmer</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 ${prefersReducedMotion ? '' : 'animate-scale-in'}`}>
          <a
            href="https://forms.gle/iVtMpHNNsRXPmx348"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 transition-smooth hover:from-blue-500 hover:to-blue-400 hover:scale-110 hover:shadow-2xl glow-electric text-lg"
          >
            Register Now
          </a>
          <button className="px-8 py-4 rounded-lg font-semibold text-white border-2 border-electric-blue hover:bg-electric-blue/10 transition-smooth hover-glow text-lg">
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
