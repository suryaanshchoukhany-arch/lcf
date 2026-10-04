import { useEffect, useRef, useState, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useInView } from 'framer-motion';
import { ArrowDown, Mail, ChevronRight, ExternalLink, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { GALLERY_YEARS } from '@/lib/gallery-images';
import { MAYO } from '@/lib/mayo-images';
import { IMAGES } from '@/lib/images';
import Magnetic from '@/components/Magnetic';
import ElasticGridBg from '@/components/ElasticGridBg';


const EASE = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════════
   COUNTER — Oversized animated number
   ═══════════════════════════════════════════════════════════════ */
function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      let startTime: number | null = null;
      const duration = 2400;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setCount(Math.floor(easeOutExpo(progress) * end));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="select-none">
      <div className="font-body font-bold text-white tabular-nums leading-none" style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[9px] tracking-[0.25em] uppercase text-[#4A6A8A]/60 font-heading font-bold mt-3">
        {label}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */


const workshops = [
  { title: "Critique Cinématographique", desc: "Film criticism workshop exploring French cinema and its global impact.", fr: "Le Cinéma", image: IMAGES.filmFestival },
  { title: "Chanson Solo", desc: "Solo singing performances of classic and contemporary Francophone music.", fr: "La Musique", image: IMAGES.soloSong },
  { title: "Le Débat", desc: "Formal French debate tournament on contemporary social issues.", fr: "L'Argumentation", image: IMAGES.homeSection3 },
  { title: "Olympiade de Français", desc: "Written examination testing grammar, vocabulary, and comprehension.", fr: "L'Examen", image: IMAGES.spellBee },
  { title: "Récitation de Poésie", desc: "Dramatic recitation of classic French poetry with expression and diction.", fr: "La Poésie", image: IMAGES.homeSection5 },
  { title: "Concours de Orthographe", desc: "French Spell Bee — an intense vocabulary and orthography challenge.", fr: "L'Orthographe", image: IMAGES.homeSection2 },
];

const foods = [
  { title: "French Pâtisserie", desc: "Sample authentic croissants, éclairs, and macarons with traditional recipes.", fr: "La Pâtisserie", image: IMAGES.cuisine },
  { title: "Francophone Cuisine", desc: "Discover diverse foods from France and the Francophone world.", fr: "La Cuisine", image: IMAGES.homeSection1 },
  { title: "Live Cooking Demos", desc: "Watch culinary experts prepare classic French dishes live on stage.", fr: "Démonstrations", image: IMAGES.homeSection4 },
];

const homeGallery = GALLERY_YEARS.find(y => y.year === 2024)?.images.slice(0, 6).map(img => ({
  src: img.src,
  caption: img.alt,
})) || [];



/* ═══════════════════════════════════════════════════════════════
   MAIN HOME PAGE — APPLE-STYLE SCROLL SYNCHRONIZED
   ═══════════════════════════════════════════════════════════════ */
export default function HomePremium() {
  const [eventsTab, setEventsTab] = useState<'workshops' | 'food'>('workshops');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  /* ── SCROLL REFS ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const exhibitionsRef = useRef<HTMLDivElement>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* ── HERO SCROLL ANIMATIONS ── 
     The hero section is 420vh with a sticky viewport inside.
     The page stays FROZEN while the user scrolls through the scroll runway.
     
     Phase 1 (0→0.12): Grid only — page frozen, ElasticGrid interactive
     Phase 2 (0.12→0.28): Text fades in ON TOP of grid — page still frozen
     Phase 3 (0.28→0.55): Text fully visible, reading time — page still frozen
     Phase 4 (0.55→0.72): Both fade out — page starts to release
     
     IMPORTANT: Once the hero text has been revealed (heroScroll >= 0.28),
     it STAYS visible even when scrolling back up. The "heroRevealed" latch
     ensures the text persists.
  */
  const HERO_SPRING_CONFIG = { damping: 50, stiffness: 80, mass: 0.3 };
  const [heroRevealed, setHeroRevealed] = useState(false);

  const { scrollYProgress: rawHeroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScroll = useSpring(rawHeroScroll, HERO_SPRING_CONFIG);
  
  // Latch: once the text has fully appeared, it stays visible on scroll-back
  useMotionValueEvent(heroScroll, "change", (v) => {
    if (v >= 0.28 && !heroRevealed) setHeroRevealed(true);
  });
  
  const heroVideoScale = useTransform(heroScroll, [0, 0.75], [1, 1.08]);
  // Hero text: fades in while page is locked, stays visible longer, then exits
  const heroContentY = useTransform(heroScroll, [0.12, 0.28, 0.55, 0.72], [50, 0, 0, -50]);
  const heroContentOpacity = useTransform(heroScroll, (v) => {
    // Once revealed and scrolling back up (before the exit zone), keep visible
    if (heroRevealed && v < 0.55) return 1;
    // Normal forward animation
    if (v < 0.12) return 0;
    if (v < 0.28) return (v - 0.12) / 0.16; // fade in
    if (v <= 0.55) return 1; // fully visible
    if (v <= 0.72) return 1 - (v - 0.55) / 0.17; // fade out
    return 0;
  });
  // Dark overlay: lighter at start so grid pops, slight dim for text readability
  const heroOverlayOpacity = useTransform(heroScroll, [0, 0.12, 0.28, 0.55, 0.72], [0.6, 0.6, 0.5, 0.5, 0.92]);
  // Grid: fully visible → dims behind text → fades out with text
  const gridOpacity = useTransform(heroScroll, (v) => {
    // When text is revealed and user scrolls back, grid stays dimmed
    if (heroRevealed && v < 0.55) return 0.15;
    if (v < 0.12) return 1;
    if (v < 0.28) return 1 - (v - 0.12) / 0.16 * 0.75; // dim to 0.25
    if (v <= 0.55) return 0.15;
    if (v <= 0.72) return 0.15 - (v - 0.55) / 0.17 * 0.15; // fade to 0
    return 0;
  });
  // Grid pointer-events: interactive only during Phase 1 (and not after reveal)
  const gridPointerEvents = useTransform(heroScroll, (v) => (v < 0.15 && !heroRevealed) ? 'auto' : 'none');

  /* ── HERO CURSOR ZOOM ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorScale = useMotionValue(1);
  const smoothCursorX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.5 });
  const smoothCursorY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.5 });
  const smoothCursorScale = useSpring(cursorScale, { damping: 20, stiffness: 150, mass: 0.4 });

  const handleHeroMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x * 20);
    mouseY.set(y * 15);
    cursorScale.set(1.08);
  }, [mouseX, mouseY, cursorScale]);

  const handleHeroMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    cursorScale.set(1);
  }, [mouseX, mouseY, cursorScale]);

  /* ── ABOUT SCROLL ANIMATIONS ── */
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImgY = useTransform(aboutScroll, [0, 1], ['-15%', '15%']);
  const aboutTextX = useTransform(aboutScroll, [0.1, 0.4], [-60, 0]);
  const aboutTextOpacity = useTransform(aboutScroll, [0.1, 0.35], [0, 1]);

  /* ── STATS SCROLL ANIMATIONS ── */
  const { scrollYProgress: statsScroll } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
  const statsBgY = useTransform(statsScroll, [0, 1], ['-10%', '10%']);
  const statsScale = useTransform(statsScroll, [0, 0.5, 1], [0.92, 1, 0.98]);

  /* ── EXHIBITIONS SCROLL ANIMATIONS ── */
  const { scrollYProgress: exhibScroll } = useScroll({ target: exhibitionsRef, offset: ["start end", "end start"] });
  const exhibContentY = useTransform(exhibScroll, [0.15, 0.5], [80, 0]);
  const exhibContentOpacity = useTransform(exhibScroll, [0.15, 0.4], [0, 1]);



  /* ── GALLERY SCROLL ANIMATIONS ── */
  const { scrollYProgress: galScroll } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const galWatermarkX = useTransform(galScroll, [0, 1], ['5%', '-5%']);

  /* ── CONTACT SCROLL ANIMATIONS ── */
  const { scrollYProgress: contactScroll } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const contactImgY = useTransform(contactScroll, [0, 1], ['-10%', '10%']);
  const contactFormX = useTransform(contactScroll, [0.15, 0.45], [60, 0]);
  const contactFormOpacity = useTransform(contactScroll, [0.15, 0.4], [0, 1]);

  /* ── CTA SCROLL ANIMATIONS ── */
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaBgY = useTransform(ctaScroll, [0, 1], ['-10%', '10%']);
  const ctaScale = useTransform(ctaScroll, [0, 0.5], [0.9, 1]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const currentEvents = eventsTab === 'workshops' ? workshops : foods;

  return (
    <div className="relative bg-[#05070B] text-[#E8EDF7] overflow-x-clip selection:bg-[#2A5A9A]/25 selection:text-white">
      {/* Film grain CSS animation */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        .film-grain::after {
          content: '';
          position: absolute;
          inset: -100%;
          width: 300%;
          height: 300%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
          z-index: 50;
        }
      `}</style>
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — VIDEO HERO (Apple-style sticky + scroll fade)
          ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-[420vh]">
        {/* Sticky hero container */}
        <div
          className="sticky top-0 h-screen overflow-hidden cursor-none"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          {/* Hero background image with cursor zoom */}
          <motion.div
            className="absolute inset-0 z-[1]"
            style={{
              scale: useTransform(heroVideoScale, (v) => v * smoothCursorScale.get()),
              x: smoothCursorX,
              y: smoothCursorY,
            }}
          >
            <img
              src={MAYO.heroMain}
              alt="Mayo College Campus"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.8) contrast(1.05)' }}
            />
          </motion.div>

          {/* Dark overlay that intensifies on scroll */}
          <motion.div
            className="absolute inset-0 z-[2] bg-[#05070B]"
            style={{ opacity: heroOverlayOpacity }}
          />

          {/* Vignette + blue atmospheric light — enhanced for grid phase */}
          <div className="absolute inset-0 z-[3] pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%),
              radial-gradient(ellipse at 50% 50%, rgba(5,7,11,0) 0%, rgba(5,7,11,0.3) 55%, rgba(5,7,11,0.8) 100%)
            `
          }} />

          {/* Film grain overlay on hero */}
          <div className="absolute inset-0 z-[16] pointer-events-none film-grain" />

          {/* Elastic Typographic Grid Overlay — canvas-based for 60fps */}
          <motion.div 
            className="absolute inset-0 z-[15] select-none"
            style={{ opacity: gridOpacity, pointerEvents: gridPointerEvents as any }}
          >
            <ElasticGridBg
              lines={['13TH', 'EDITION']}
              expansion={5}
              stiffness={0.15}
              damping={0.65}
              fillColor="#2563EB"
              gap={4}
            />
          </motion.div>

          {/* Top and bottom fades */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#05070B]/60 via-[#05070B]/15 to-transparent z-[4] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#05070B]/90 via-[#05070B]/30 to-transparent z-[4] pointer-events-none" />

          {/* Floating line details */}
          <div className="absolute top-24 right-12 z-[5] pointer-events-none hidden lg:block">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>
          <div className="absolute bottom-32 left-12 z-[5] pointer-events-none hidden lg:block">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* Hero content — overlays on top of the grid when scrolling */}
          <motion.div
            className="absolute inset-0 z-[18] flex items-center"
            style={{ y: heroContentY, opacity: heroContentOpacity }}
          >
            <div className="container max-w-[1400px] w-full px-6 md:px-12 pt-32 md:pt-0">
              <div className="max-w-4xl mx-auto text-center">
                {/* Premium prestige label */}
                <div className="mb-8 md:mb-12">
                  <div className="flex items-center justify-center gap-5">
                    <div className="w-10 h-[1px] bg-[#2A5A9A]/40" />
                    <span className="text-[10px] md:text-[11px] font-body font-medium uppercase tracking-[0.22em] text-[#2A5A9A]/80">
                      XIII Edition
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#2A5A9A]/40" />
                    <span className="text-[10px] md:text-[11px] font-body font-medium uppercase tracking-[0.22em] text-white/50">
                      8–10 October 2026
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#2A5A9A]/40" />
                    <span className="text-[10px] md:text-[11px] font-body font-medium uppercase tracking-[0.22em] text-white/50">
                      Mayo College, Ajmer
                    </span>
                  </div>
                </div>

                {/* MAIN TITLE */}
                <div className="mb-3 md:mb-4 overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)', scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                    className="font-heading text-white font-semibold tracking-[-0.03em] leading-[0.88]"
                    style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
                  >
                    LCF <span className="text-[#2A5A9A]">du</span> Mayo
                  </motion.h1>
                </div>

                {/* SUBTITLE */}
                <div className="mb-8 md:mb-12 overflow-hidden">
                  <motion.p
                    initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
                    className="font-heading italic font-light"
                    style={{ fontSize: 'clamp(1.1rem, 2.8vw, 2rem)', letterSpacing: '0.005em' }}
                  >
                    <span className="text-white/55">Le Concours de la </span>
                    <span className="text-[#2A5A9A]">Francophonie</span>
                  </motion.p>
                </div>

                {/* Thin rule — centered */}
                <div className="w-16 h-[1px] bg-[#2A5A9A]/40 mb-8 md:mb-10 mx-auto" />

                {/* DESCRIPTION */}
                <motion.p
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                  className="text-[13px] md:text-[15px] text-white/45 max-w-lg mx-auto leading-[1.9] font-body mb-12 md:mb-16"
                >
                  Three days of <span className="text-[#2A5A9A]/80">language</span>, <span className="text-[#2A5A9A]/80">culture</span>, <span className="text-[#2A5A9A]/80">competition</span> and <span className="text-[#2A5A9A]/80">creativity</span> — where the finest young francophones gather to compete, create and connect.
                </motion.p>

                {/* CTAs — centered */}
                <motion.div
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
                  className="flex flex-wrap gap-4 items-center justify-center"
                >
                  <Magnetic range={50} strength={0.3}>
                    <motion.a
                      href="https://forms.gle/iVtMpHNNsRXPmx348"
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="group px-9 py-4 text-[10px] tracking-[0.18em] uppercase font-body font-semibold bg-white text-[#05070B] hover:bg-white/90 transition-all duration-500 inline-flex items-center gap-3"
                    >
                      Register Now
                      <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.a>
                  </Magnetic>
                  <Magnetic range={50} strength={0.3}>
                    <motion.a
                      href="#about"
                      onClick={(e) => { e.preventDefault(); aboutRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="group px-9 py-4 text-[10px] tracking-[0.18em] uppercase font-body font-semibold border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all duration-500 text-white/50 hover:text-white inline-flex items-center gap-3"
                    >
                      Explore Competitions
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Custom cursor dot */}
          <motion.div
            className="absolute z-20 pointer-events-none hidden md:block"
            style={{
              x: useTransform(smoothCursorX, (v) => v * 3),
              y: useTransform(smoothCursorY, (v) => v * 3),
              left: '50%',
              top: '50%',
              marginLeft: -20,
              marginTop: -20,
            }}
          >
            <motion.div
              className="w-10 h-10 rounded-full border border-white/20"
              style={{ scale: smoothCursorScale }}
            />
          </motion.div>

          {/* Scroll indicator — visible during Phase 1 (grid phase) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-none select-none z-[20]"
          >
            <motion.div style={{ opacity: useTransform(heroScroll, [0, 0.06, 0.12], [1, 1, 0]) }} className="flex flex-col items-center gap-2.5">
              <span className="text-[8px] font-body tracking-[0.35em] uppercase font-medium text-white/30">Scroll to explore</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                <ArrowDown size={13} className="text-white/30" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — ABOUT: Parallax image + sliding text
          ═══════════════════════════════════════════════════════════ */}
      <section id="about" ref={aboutRef} className="relative min-h-screen overflow-hidden">
        {/* Full-bleed parallax image */}
        <div className="absolute inset-0">
          <motion.img
            src={MAYO.about1}
            alt="Mayo College Campus"
            className="absolute inset-0 w-full h-[140%] object-cover"
            style={{ y: aboutImgY, filter: 'brightness(0.45) saturate(0.6)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,7,11,0.85) 0%, rgba(5,7,11,0.25) 50%, rgba(5,7,11,0.85) 100%)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/50" />
        </div>

        {/* Text slides in from left on scroll */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container max-w-[1400px] w-full px-6 md:px-12 py-24">
            <motion.div
              style={{ x: aboutTextX, opacity: aboutTextOpacity }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#2A5A9A] font-medium block mb-5">
                The Prestige & Legacy
              </span>
              <div className="mb-8">
                <span className="font-heading text-white block leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}>
                  An <span className="text-[#2A5A9A]">Elite</span>
                </span>
                <span className="font-body text-white/50 block leading-[1.1] mt-2 text-[0.85em] tracking-[0.08em] uppercase font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
                  International Forum
                </span>
              </div>
              <p className="text-sm md:text-base text-[#7A94AC] leading-relaxed font-body max-w-lg mx-auto">
                Born 13 years ago at <span className="text-[#2A5A9A]/80">Mayo College, Ajmer</span>, Le Concours de la Francophonie du Mayo has grown into the nation's premier independent <span className="text-[#2A5A9A]/80">French language festival</span>. We bring together delegates from top-tier academic institutions across India for intensive competition, intellectual exchange, and artistic display.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — STATISTICS: Oversized numbers with parallax
          ═══════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="relative min-h-screen py-32 md:py-40 overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0">
          <motion.img
            src={MAYO.about2}
            alt=""
            className="absolute inset-0 w-full h-[130%] object-cover opacity-[0.06]"
            style={{ y: statsBgY, filter: 'brightness(0.5) saturate(0.5)' }}
          />
          <div className="absolute inset-0 bg-[#05070B]/95" />
        </div>

        <motion.div
          className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12"
          style={{ scale: statsScale }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 place-items-center">
            {[
              { end: 13, suffix: '', label: 'Edition Legacy' },
              { end: 2500, suffix: '+', label: 'Participants Hosted' },
              { end: 15, suffix: '+', label: 'Elite Competitions' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '50px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                className="text-center"
              >
                <Counter end={stat.end} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="select-none text-center"
            >
              <div className="font-heading font-extrabold tracking-tight leading-none" style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}>
                <span className="text-white">MAYO</span>
              </div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#2A5A9A] font-heading font-bold mt-3">
                College Ajmer
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — EXHIBITIONS: Full-width video background + overlaid content
          ═══════════════════════════════════════════════════════════ */}
      <section ref={exhibitionsRef} className="relative min-h-screen overflow-hidden">
        {/* Full-width background video */}
        <div className="absolute inset-0 z-[1]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(0.7)' }}
          >
            <source src="/lcf-glimpses-web.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Dark overlays for readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#05070B]/70 via-[#05070B]/40 to-[#05070B]/80" />
        <div className="absolute inset-0 z-[2]" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,7,11,0.6) 100%)' }} />

        {/* Content overlaid on video */}
        <div className="relative z-[3] min-h-screen flex flex-col lg:flex-row items-center">
          {/* Left — Heading */}
          <div className="w-full lg:w-[45%] flex items-center justify-center py-16 lg:py-24 px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '100px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-center w-full"
            >
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#4A7AAA] font-medium block mb-4">
                The Exhibitions
              </span>
              <div>
                <span className="font-heading text-white block leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}>
                  <span className="text-[#2A5A9A]">Highlights</span>
                </span>
                <span className="font-body text-white/50 block leading-[1.1] mt-2 text-[0.85em] tracking-[0.08em] uppercase font-medium" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  & Workshops
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — Scrolling tabbed content */}
          <div className="w-full lg:w-[55%] py-16 lg:py-24 px-6 lg:px-16 flex flex-col justify-center">
            <motion.div
              style={{ y: exhibContentY, opacity: exhibContentOpacity }}
            >
              <p className="text-xs md:text-sm text-white/50 font-body mb-10 leading-relaxed max-w-md text-center mx-auto">
                Explore our curated modules showcasing French academic seminars, language labs, and authentic culinary celebrations.
              </p>

              {/* Tab buttons — centered */}
              <div className="flex gap-2 mb-10 justify-center">
                <motion.button
                  onClick={() => setEventsTab('workshops')}
                  whileTap={{ scale: 0.97 }}
                  className={`px-7 py-3.5 text-[9px] font-heading font-bold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                    eventsTab === 'workshops'
                      ? 'bg-[#2A5A9A] text-white shadow-lg shadow-[#2A5A9A]/15'
                      : 'border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.15] bg-[#05070B]/30 backdrop-blur-sm'
                  }`}
                >
                  Ateliers (Workshops)
                </motion.button>
                <motion.button
                  onClick={() => setEventsTab('food')}
                  whileTap={{ scale: 0.97 }}
                  className={`px-7 py-3.5 text-[9px] font-heading font-bold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                    eventsTab === 'food'
                      ? 'bg-[#2A5A9A] text-white shadow-lg shadow-[#2A5A9A]/15'
                      : 'border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.15] bg-[#05070B]/30 backdrop-blur-sm'
                  }`}
                >
                  Gastronomie (Food)
                </motion.button>
              </div>

              {/* Event cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={eventsTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="space-y-3"
                >
                   {currentEvents.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -3, scale: 1.008 }}
                      whileTap={{ scale: 0.995 }}
                      viewport={{ once: true, margin: '100px' }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
                      className="bg-[#05070B]/50 backdrop-blur-md border border-white/[0.06] p-5 group hover:border-[#2A5A9A]/20 hover:bg-[#0D1525]/60 hover:shadow-lg hover:shadow-[#2A5A9A]/5 transition-all duration-500 flex gap-5 items-center"
                    >
                      {event.image && (
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden shrink-0 border border-white/[0.06] relative select-none">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-[#05070B]/25 group-hover:bg-[#05070B]/10 transition-colors duration-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-heading font-bold text-xs md:text-sm text-white mb-1 uppercase transition-transform duration-300 group-hover:-translate-y-[1px]">
                              {event.title}
                            </h3>
                            <p className="font-body text-[10px] md:text-[11px] text-white/40 leading-relaxed">{event.desc}</p>
                          </div>
                          <span className="text-[8px] font-heading font-bold text-[#2A5A9A]/70 tracking-wider uppercase shrink-0 mt-1">{event.fr}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />


      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — GALLERY: Parallax masonry grid
          ═══════════════════════════════════════════════════════════ */}
      <section ref={galleryRef} className="py-32 md:py-48 relative overflow-hidden">
        {/* Watermark slides horizontally */}
        <motion.div
          className="absolute -top-16 -right-16 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.015] uppercase leading-none"
          style={{ x: galWatermarkX, fontSize: 'clamp(100px, 20vw, 280px)' }}
        >
          GALERIE
        </motion.div>

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '100px' }}
              transition={{ duration: 1, ease: EASE }}
              className="max-w-xl text-center mx-auto md:text-left md:mx-0"
            >
              <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#2A5A9A] font-medium block mb-5">
                Exhibition Memories
              </span>
              <div className="mb-6">
                <span className="font-heading text-white block leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}>
                  <span className="text-[#2A5A9A]">Curated</span>
                </span>
                <span className="font-body text-white/50 block leading-[1.1] mt-2 text-[0.85em] tracking-[0.08em] uppercase font-medium" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  Exhibition
                </span>
              </div>
            </motion.div>
            <motion.a
              href="/gallery"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '100px' }}
              className="text-[9px] font-heading font-bold tracking-[0.15em] uppercase text-[#2A5A9A] hover:text-white transition-colors duration-300 flex items-center gap-2 justify-center md:justify-start"
            >
              View Full Gallery <ChevronRight size={12} />
            </motion.a>
          </div>

          {/* Editorial masonry grid with staggered parallax */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {homeGallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '100px' }}
                transition={{ duration: 0.7, ease: EASE, delay: idx * 0.08 }}
                onClick={() => setLightbox(img)}
                className="relative overflow-hidden border border-white/[0.03] bg-[#09111F]/30 cursor-pointer group break-inside-avoid hover:border-white/[0.1] transition-all duration-500"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  style={{ filter: 'brightness(0.8) saturate(0.8)' }}
                />
                <div className="absolute inset-0 bg-[#05070B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
                  <span className="text-[10px] font-heading font-bold tracking-[0.25em] uppercase text-white border border-white/[0.12] px-5 py-2.5">VIEW</span>
                  <span className="text-[9px] text-[#7A94AC]/70 font-body">{img.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — CONTACT: Sticky image + sliding form
          ═══════════════════════════════════════════════════════════ */}
      <section ref={contactRef} className="relative min-h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left — Sticky architectural photo */}
          <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-auto overflow-hidden lg:sticky lg:top-0 lg:self-start">
            <motion.img
              src={MAYO.split2}
              alt="Mayo College Campus"
              className="absolute inset-0 w-full h-[140%] object-cover"
              style={{ y: contactImgY, filter: 'brightness(0.4) saturate(0.65)' }}
            />
            <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, transparent 50%, #05070B 100%)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/90 to-transparent lg:hidden" />

            {/* Overlaid text */}
            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '100px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="text-center w-full"
              >
                <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#4A7AAA] font-medium block mb-4">
                  Contact
                </span>
                <div>
                  <span className="font-heading text-white block leading-[0.95]" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
                    Get in
                  </span>
                  <span className="font-body block leading-[1.1] mt-2 text-[0.85em] tracking-[0.08em] uppercase font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}>
                    <span className="text-[#2A5A9A]">Touch</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — Contact form slides in */}
          <div className="w-full lg:w-1/2 py-16 lg:py-24 px-6 lg:px-16 flex items-center">
            <motion.div
              className="w-full max-w-md mx-auto"
              style={{ x: contactFormX, opacity: contactFormOpacity }}
            >
              <div className="bg-[#09111F]/50 border border-white/[0.04] p-8 md:p-10">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <Mail className="w-10 h-10 text-[#2A5A9A] mx-auto mb-4" />
                    <h3 className="font-heading font-extrabold text-white text-lg mb-2 uppercase">Message Transmis</h3>
                    <p className="text-xs text-[#4A6A8A]/60 font-body leading-relaxed">Merci. We will reply to your query as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="mb-6">
                      <h3 className="font-heading font-extrabold text-white text-xl uppercase tracking-tight mb-2">Contact Secretariat</h3>
                      <p className="text-[11px] text-[#4A6A8A]/60 font-body">Reach out to the LCF organizing desk directly.</p>
                    </div>
                    <div>
                      <label className="block text-[8px] font-heading font-bold uppercase tracking-wider text-[#4A6A8A]/60 mb-1.5">Nom Complet</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/[0.06] focus:border-[#2A5A9A] focus:outline-none py-3 text-xs transition-all font-body text-white placeholder-[#4A6A8A]/30" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-heading font-bold uppercase tracking-wider text-[#4A6A8A]/60 mb-1.5">Email</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/[0.06] focus:border-[#2A5A9A] focus:outline-none py-3 text-xs transition-all font-body text-white placeholder-[#4A6A8A]/30" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-heading font-bold uppercase tracking-wider text-[#4A6A8A]/60 mb-1.5">Message</label>
                      <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-white/[0.06] focus:border-[#2A5A9A] focus:outline-none py-3 text-xs transition-all font-body text-white resize-none placeholder-[#4A6A8A]/30" placeholder="Type your message..." />
                    </div>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 text-[9px] font-heading font-bold tracking-[0.15em] bg-[#2A5A9A] hover:bg-[#1E4A80] transition-colors uppercase cursor-pointer text-white btn-sweep"
                    >
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — CTA: Final dramatic reveal
          ═══════════════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src={MAYO.ctaBg}
            alt=""
            className="absolute inset-0 w-full h-[140%] object-cover"
            style={{ y: ctaBgY, filter: 'brightness(0.2) saturate(0.4)' }}
          />
          <div className="absolute inset-0 bg-[#05070B]/80" />
        </div>

        <motion.div
          className="container relative z-10 max-w-2xl mx-auto px-6 md:px-12 text-center"
          style={{ scale: ctaScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#2A5A9A] font-medium block mb-5">
              Rejoin the Festival
            </span>
            <div className="mb-6">
              <span className="font-heading text-white block leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}>
                Ready to
              </span>
              <span className="font-body block leading-[1.1] mt-2 text-[0.85em] tracking-[0.08em] uppercase font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
                <span className="text-[#2A5A9A]">Compete</span><span className="text-white/50">?</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#4A6A8A]/60 max-w-md mx-auto mb-12 font-body leading-relaxed">
              Join us for the <span className="text-[#2A5A9A]/70">XIIIth Edition</span> of Le Concours de la Francophonie du Mayo. Register your school today!
            </p>
            <Magnetic range={60} strength={0.3}>
              <motion.a
                href="https://forms.gle/iVtMpHNNsRXPmx348"
                target="_blank" rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="inline-flex px-12 py-5 text-[10px] tracking-[0.18em] uppercase font-heading font-bold bg-[#2A5A9A] hover:bg-[#1E4A80] transition-all text-white items-center gap-3 btn-sweep"
              >
                Register Now
                <ExternalLink size={12} />
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#05070B]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 z-10 cursor-pointer">
              <X size={16} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-5xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.caption}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-white/[0.02]" />
              <p className="text-center text-xs text-[#4A6A8A]/60 mt-5 font-body">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTED CARD COMPONENT (used by other pages)
   ═══════════════════════════════════════════════════════════════ */
export { TiltedReflectiveCard } from '../components/TiltedReflectiveCard';
