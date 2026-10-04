import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 700);
    
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#05070B] flex flex-col items-center justify-center"
        >
          <div className="relative text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex items-center justify-center mx-auto"
            >
              <img src="/lcf-logo-white.png" className="w-16 h-16" alt="LCF" />
            </motion.div>

            {/* Letter reveal */}
            <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white tracking-[0.2em] mb-3 flex items-center justify-center">
              {Array.from("LCF DU MAYO").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.05,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={char === ' ' ? 'mr-3' : ''}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-[9px] font-heading font-medium tracking-[0.25em] text-[#4A6A8A]"
            >
              LE CONCOURS DE LA FRANCOPHONIE
            </motion.p>

            {/* Progress line */}
            <div className="w-40 h-[1.5px] bg-white/10 mx-auto overflow-hidden relative mt-8">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#2A5A9A] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
