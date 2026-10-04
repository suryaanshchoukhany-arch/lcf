import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ElasticGridBg from './ElasticGridBg';

export default function GradientMeshBg() {
  const { scrollY } = useScroll();
  const yOffset1 = useTransform(scrollY, [0, 4000], [0, -400]);
  const yOffset2 = useTransform(scrollY, [0, 4000], [0, -250]);

  // Only show grid on non-touch devices (desktops) to save mobile perf
  const [showGrid, setShowGrid] = useState(false);
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setShowGrid(!isTouch);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#05070B] pointer-events-none select-none">
      {/* Slow-moving gradient blobs simulating volumetric lighting mesh */}
      <motion.div
        style={{ y: yOffset1 }}
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -90, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#2A5A9A]/[0.03] blur-[140px] will-change-transform"
      />

      <motion.div
        style={{ y: yOffset2 }}
        animate={{
          x: [0, -60, 70, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#1e3a8a]/[0.04] blur-[150px] will-change-transform"
      />

      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] right-[15%] w-[450px] h-[450px] rounded-full bg-[#2A5A9A]/[0.02] blur-[120px] will-change-transform"
      />

      {/* Subtle global elastic typographic grid — desktop only for performance */}
      {showGrid && (
        <div className="absolute inset-0 z-[1] opacity-[0.04] select-none pointer-events-none will-change-transform">
          <ElasticGridBg
            text="LCFMAYO"
            spacing={120}
            expansion={3.2}
            stiffness={0.15}
            damping={0.78}
            fillColor="rgba(59,130,246,0.4)"
            gap={3}
          />
        </div>
      )}
    </div>
  );
}
