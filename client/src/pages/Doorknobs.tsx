import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TiltedReflectiveCard } from '../components/TiltedReflectiveCard';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Member {
  name: string;
  role: string;
  image: string;
}

const members: Member[] = [
  {
    name: 'Saket Kalwani',
    role: 'Chairman',
    image: '/images/doorknobs/saket-kalwani.PNG',
  },
  {
    name: 'Janesh Kushwah',
    role: 'President',
    image: '/images/doorknobs/janesh-kushwah.JPG',
  },
  {
    name: 'Raunak Mishra',
    role: 'Director',
    image: '/images/doorknobs/raunak-mishra.png',
  },
  {
    name: 'Kanishk Ganeriwala',
    role: 'Vice Chairman',
    image: '/images/doorknobs/kanishk-ganeriwala.PNG',
  },
  {
    name: 'Atharv Pratap Singh',
    role: 'Vice President',
    image: '/images/doorknobs/atharv-pratap-singh.jpeg',
  },
  {
    name: 'Yuvraj Thakrar',
    role: 'Cultural Head',
    image: '/images/doorknobs/yuvraj-thakrar.jpeg',
  },
  {
    name: 'Aarav Gupta',
    role: 'IT Head',
    image: '/images/doorknobs/aarav-gupta.png',
  },
  {
    name: 'Aviral Gupta',
    role: 'Head of Management',
    image: '/images/doorknobs/aviral-gupta.JPG',
  },
  {
    name: 'Karanveer Choudhary',
    role: 'Head of Logistics',
    image: '/images/doorknobs/karanveer-chaudhary.jpeg',
  },
  {
    name: 'Sarthak Kedia',
    role: 'Media Head',
    image: '/images/doorknobs/sarthak-kedia.jpg',
  },
  {
    name: 'Nihit Saraf',
    role: 'Secretary',
    image: '/images/doorknobs/nihit-saraf.jpg',
  },
];

/* ── Grid Member Card — same style as Messages page ── */
function GridMemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      className="group"
    >
      {/* Photo in TiltedReflectiveCard — same as Messages */}
      <div className="aspect-[4/5] w-full mb-5">
        <TiltedReflectiveCard className="w-full h-full overflow-hidden !bg-[#09111F]/50 border-white/[0.04]">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-[800ms] group-hover:scale-[1.04]"
            loading="lazy"
          />
        </TiltedReflectiveCard>
      </div>

      {/* Text content below */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-3 bg-gradient-to-b from-[#2A5A9A] to-[#2A5A9A]/20 rounded-full" />
        <span className="text-[9px] font-heading tracking-[0.25em] text-[#2A5A9A] uppercase font-bold">
          {member.role}
        </span>
      </div>
      <h3 className="font-heading text-white text-lg tracking-tight leading-tight">
        {member.name}
      </h3>
    </motion.div>
  );
}

export default function Doorknobs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOverlay = useTransform(scrollYProgress, [0, 1], [0.3, 0.85]);

  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end bg-[#05070B]">
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12], x: [-30, 30, -30] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#2A5A9A]/15 blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1.1, 0.85, 1.1], opacity: [0.08, 0.18, 0.08], x: [20, -20, 20] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-[#2563EB]/10 blur-[150px]"
          />
        </div>

        {/* Overlays */}
        <motion.div className="absolute inset-0 bg-[#05070B] z-[1]" style={{ opacity: heroOverlay }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/50 z-[2]" />

        {/* Large watermark */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.015] uppercase leading-none z-[3]"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)', y: heroTextY }}
        >
          DOORKNOBS
        </motion.div>

        {/* Hero text */}
        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ y: heroTextY }}
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              The Organising Committee · XIII
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              The{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Doorknobs</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC]/70 max-w-xl leading-relaxed font-body">
              Twelve individuals. One vision — to make Le Concours de la Francophonie du Mayo unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ ALL MEMBERS — unified 3-column grid ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.015] uppercase leading-none" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          DOORKNOBS
        </div>

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {members.map((member, idx) => (
              <GridMemberCard key={member.name} member={member} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL CTA ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2A5A9A]/[0.02] to-transparent pointer-events-none" />
        <div className="container max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Follow Our Journey
            </span>
            <h2 className="font-heading font-extrabold text-white text-2xl md:text-3xl uppercase tracking-tight mb-4">
              Stay Connected
            </h2>
            <p className="text-xs md:text-sm text-[#7A94AC]/50 font-body max-w-md mx-auto leading-relaxed mb-10">
              Follow Le Concours de la Francophonie du Mayo on social media for behind-the-scenes updates, highlights, and announcements.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://youtube.com/@leconcoursdelafrancophonie7907?si=LPpXcHNTy4OFRttS"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500 rounded-lg"
              >
                <svg className="w-4 h-4 text-[#FF0000]/70 group-hover:text-[#FF0000] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-[10px] font-heading tracking-[0.15em] uppercase text-white/60 group-hover:text-white/90 transition-colors duration-300 font-bold">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/lcfdumayo"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500 rounded-lg"
              >
                <svg className="w-4 h-4 text-[#E1306C]/70 group-hover:text-[#E1306C] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                <span className="text-[10px] font-heading tracking-[0.15em] uppercase text-white/60 group-hover:text-white/90 transition-colors duration-300 font-bold">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
