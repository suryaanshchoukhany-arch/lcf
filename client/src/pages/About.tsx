import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MAYO } from '@/lib/mayo-images';

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '1875', label: 'Founded' },
  { value: '180', label: 'Acres of Campus' },
  { value: '18', label: 'Playing Fields' },
  { value: '60+', label: 'Horses' },
  { value: '9-Hole', label: 'Golf Course' },
  { value: '150+', label: 'Years of Legacy' },
];

/* ═══════════════════════════════════════════════════════════════
   COUNTER — Oversized animated number
   ═══════════════════════════════════════════════════════════════ */
function Counter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="text-center"
    >
      <div className="font-body font-bold text-white tabular-nums leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
        {value}
      </div>
      <div className="text-[9px] tracking-[0.25em] uppercase text-[#4A6A8A]/60 font-heading font-bold mt-3">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const campusImages = [
    { src: MAYO.editorial1, alt: 'Mayo College Main Building', span: 'col-span-2 row-span-2' },
    { src: MAYO.editorial2, alt: 'Campus Life', span: 'col-span-1 row-span-1' },
    { src: MAYO.editorial3, alt: 'Cultural Activities', span: 'col-span-1 row-span-1' },
    { src: MAYO.editorial5, alt: 'College Grounds', span: 'col-span-2 row-span-1' },
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — FULL-WIDTH ARCHITECTURAL HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[550px] overflow-hidden flex items-end">
        <img
          src={MAYO.about1}
          alt="Mayo College Campus"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.4) saturate(0.6)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,7,11,0.85) 0%, rgba(5,7,11,0.3) 50%, rgba(5,7,11,0.85) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40" />

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              About Mayo College
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              The Eton <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>of the East</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC] max-w-xl leading-relaxed font-body">
              A heritage of excellence since 1875. Mayo College stands as India's premier institution — where tradition meets ambition on 180 acres of storied grounds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="relative w-full py-5 border-y border-white/[0.04] overflow-hidden select-none z-10" style={{ background: 'linear-gradient(90deg, #05070B, #09111F, #05070B)' }}>
        <div className="flex w-max items-center gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {["HERITAGE", "EXCELLENCE", "TRADITION", "LEADERSHIP", "FRANCOPHONIE", "MAYO COLLEGE", "AJMER", "1875"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-16">
                  <span className="font-heading text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#4A6A8A]/30 uppercase">{item}</span>
                  <span className="w-1 h-1 bg-[#2A5A9A]/20" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — EDITORIAL SPLIT: Heritage & Stats
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left — Editorial text */}
          <div className="w-full lg:w-[45%] py-16 lg:py-24 px-6 lg:px-16 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
                Our Heritage
              </span>
              <h2 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                A Legacy of<br />Excellence
              </h2>
              <p className="text-sm md:text-base text-[#7A94AC] leading-relaxed font-body mb-6">
                Founded by the Viceroy Lord Mayo, this institution has shaped generations of leaders, scholars, and visionaries. Its sprawling campus is a world unto itself — fields, stables, fairways, and halls that echo with over a century of tradition.
              </p>
              <p className="text-xs md:text-sm text-[#4A6A8A]/70 leading-relaxed font-body">
                The architecture of Mayo College features spectacular Indo-Saracenic styles, most notably the majestic main building in white marble, built under the guidance of Viceroy Lord Mayo.
              </p>
            </motion.div>
          </div>

          {/* Right — Architectural photo with parallax */}
          <div className="relative w-full lg:w-[55%] h-[500px] lg:h-auto overflow-hidden order-1 lg:order-2">
            <img
              src={MAYO.split1}
              alt="Mayo College Heritage"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.7)' }}
            />
            <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to left, transparent 60%, #05070B 100%)' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/80 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — STATISTICS: Oversized numbers, image background
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={MAYO.about2} alt="" className="w-full h-full object-cover opacity-[0.06]" style={{ filter: 'brightness(0.5) saturate(0.5)' }} />
          <div className="absolute inset-0 bg-[#05070B]/95" />
        </div>

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat) => (
              <Counter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — VISION & MISSION: Editorial split
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={MAYO.ctaBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.4)' }}
          />
          <div className="absolute inset-0 bg-[#05070B]/85" />
        </div>

        <div className="container max-w-[1200px] w-full relative z-10 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-16"
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Our Purpose
            </span>
            <h2 className="font-heading font-extrabold text-white tracking-tight mb-6 uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Vision & Mission
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative pl-6 border-l border-[#2A5A9A]/20"
            >
              <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold mb-3 block">
                Our Vision
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
                Shaping Tomorrow's Global Citizens
              </h3>
              <p className="text-xs md:text-sm text-[#7A94AC] leading-relaxed font-body">
                Mayo College envisions nurturing well-rounded individuals rooted in Indian values yet prepared for the global stage. Every student is empowered to think critically, lead compassionately, and contribute meaningfully to society.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
              className="relative pl-6 border-l border-[#2A5A9A]/20"
            >
              <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold mb-3 block">
                Our Mission
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
                Excellence Through Tradition & Innovation
              </h3>
              <p className="text-xs md:text-sm text-[#7A94AC] leading-relaxed font-body">
                To provide a holistic education that balances academic rigour with character building, sports, and the arts. Through its historic campus and world-class facilities, Mayo College cultivates discipline, integrity, and an enduring love of learning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — CAMPUS GALLERY: Bento grid
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute -top-16 -right-16 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.015] uppercase leading-none" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          CAMPUS
        </div>

        <div className="container max-w-[1400px] w-full relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="max-w-3xl mb-16"
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Campus Gallery
            </span>
            <h2 className="font-heading font-extrabold text-white tracking-tight mb-6 uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              A World Within
            </h2>
            <p className="text-xs md:text-sm text-[#4A6A8A]/60 leading-relaxed font-body">
              From grand heritage buildings to state-of-the-art facilities, Mayo College's sprawling campus is designed to inspire at every turn.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-5">
            {campusImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                className={`${img.span} relative overflow-hidden border border-white/[0.03] group`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  style={{ filter: 'brightness(0.7) saturate(0.8)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/80 via-[#05070B]/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />
                <div className="absolute bottom-0 left-0 right-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="font-heading text-[10px] tracking-wider uppercase text-white font-bold">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
