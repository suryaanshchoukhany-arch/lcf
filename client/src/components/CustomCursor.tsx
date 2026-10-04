import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState<string | null>(null);
  const isVisibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (hoverAttr) {
        setHovered(hoverAttr);
      } else if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')) {
        setHovered('pointer');
      } else {
        setHovered(null);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleHoverStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, []); // Empty deps — register once only

  if (!isVisible) return null;

  const isText = hovered && hovered !== 'pointer';

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#5EA2FF] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#2A5A9A]/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-screen will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isText ? 80 : hovered === 'pointer' ? 48 : 26,
          height: isText ? 80 : hovered === 'pointer' ? 48 : 26,
          backgroundColor: isText ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
          borderColor: isText ? 'rgba(94, 162, 255, 0.45)' : 'rgba(59, 130, 246, 0.35)',
          backdropFilter: isText ? 'blur(4px)' : 'none',
        }}
        animate={{
          scale: isText ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {isText && (
          <span className="text-[10px] uppercase tracking-wider font-heading font-extrabold text-[#F8FAFC] select-none text-center px-1">
            {hovered}
          </span>
        )}
      </motion.div>
    </>
  );
}
