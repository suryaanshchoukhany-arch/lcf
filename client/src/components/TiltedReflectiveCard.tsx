import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function TiltedReflectiveCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { damping: 28, stiffness: 200, mass: 0.8 });
  const smoothRotateY = useSpring(rotateY, { damping: 28, stiffness: 200, mass: 0.8 });
  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(-((y - rect.height / 2) / (rect.height / 2)) * 5);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 5);
    shineX.set((x / rect.width) * 100);
    shineY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: 'preserve-3d' }}
      className={`relative bg-[#0B1220]/60 border border-white/[0.04] overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-white/[0.08] rounded-none ${className} group`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: hovered
            ? `radial-gradient(circle 180px at ${shineX.get()}% ${shineY.get()}%, rgba(200, 209, 230, 0.06) 0%, transparent 80%)`
            : 'transparent',
          transition: 'background 0.05s linear',
        }}
      />
      {children}
    </motion.div>
  );
}
