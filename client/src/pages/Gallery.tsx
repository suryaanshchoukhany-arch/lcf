import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { GALLERY_YEARS } from '@/lib/gallery-images';
import { MAYO } from '@/lib/mayo-images';

const EASE = [0.16, 1, 0.3, 1] as const;

// Reverse so newest year shows first
const sortedYears = [...GALLERY_YEARS].reverse();

/* ── Lightbox ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl cursor-pointer"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all duration-300 rounded-full text-lg"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeYear, setActiveYear] = useState(sortedYears[0].year);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const activeData = sortedYears.find(y => y.year === activeYear)!;

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-end">
        <img
          src={MAYO.split2}
          alt="Mayo College"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) saturate(0.5)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,7,11,0.85) 0%, rgba(5,7,11,0.3) 50%, rgba(5,7,11,0.85) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40" />

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE }}
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Moments Captured
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Photo{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Gallery</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC]/70 max-w-xl leading-relaxed font-body">
              Relive the memorable moments from every edition of Le Concours de la Francophonie du Mayo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ YEAR TABS ═══ */}
      <section className="sticky top-16 z-40 border-b border-white/[0.04] bg-[#05070B]/80 backdrop-blur-2xl">
        <div className="container max-w-[1400px] px-6 md:px-12">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-4">
            {sortedYears.map((yearData) => (
              <button
                key={yearData.year}
                onClick={() => setActiveYear(yearData.year)}
                className={`relative px-5 py-2.5 text-[10px] font-heading font-bold tracking-[0.2em] uppercase transition-all duration-500 shrink-0 cursor-pointer rounded-sm ${
                  activeYear === yearData.year
                    ? 'text-white bg-[#2A5A9A]/20 border border-[#2A5A9A]/30'
                    : 'text-white/30 hover:text-white/60 border border-transparent'
                }`}
              >
                {yearData.year}
                {activeYear === yearData.year && (
                  <motion.div
                    layoutId="yearIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#2A5A9A] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY GRID ═══ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Large watermark */}
        <div className="absolute -top-16 -right-16 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.012] uppercase leading-none" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          {activeYear}
        </div>

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12">
          {/* Year info header */}
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <div className="flex items-baseline gap-4">
              <h2 className="font-heading font-extrabold text-white text-3xl md:text-5xl tracking-tight uppercase">
                {activeYear}
              </h2>
              <span className="text-[9px] font-heading tracking-[0.25em] text-[#2A5A9A] uppercase font-bold">
                {activeData.label}
              </span>
              <span className="text-[9px] font-body text-[#4A6A8A]/40">
                {activeData.images.length} photos
              </span>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent mt-6" />
          </motion.div>

          {/* Masonry-style grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5"
            >
              {activeData.images.map((img, idx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: EASE, delay: Math.min(idx * 0.04, 0.4) }}
                  className="break-inside-avoid mb-4 md:mb-5 group cursor-pointer"
                  onClick={() => openLightbox(img.src, img.alt)}
                >
                  <div className="relative overflow-hidden rounded-sm border border-white/[0.04] bg-[#09111F]/30">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover transition-all duration-[800ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Expand icon on hover */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/[0.08] backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 rounded-sm">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
