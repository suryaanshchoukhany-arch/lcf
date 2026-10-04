import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { IMAGES } from '@/lib/images';
import { MAYO } from '@/lib/mayo-images';
import { TiltedReflectiveCard } from '../components/TiltedReflectiveCard';

const EASE = [0.16, 1, 0.3, 1] as const;

const advisoryMembers = [
  {
    name: 'Prof Romey Borges',
    role: 'Former Head of French, Mayo College',
    image: IMAGES.advisory.borges,
  },
  {
    name: 'Prof Abhijit Karkun',
    role: 'Former Head of French, Mayo College',
    image: IMAGES.advisory.karkun,
  },
  {
    name: 'Prof Olivier Auvray',
    role: 'Alliance Française, Jaipur',
    image: IMAGES.advisory.auvray,
  },
  {
    name: 'Mr D. Bhattacharjya Tato',
    role: 'Alliance Française, Delhi',
    image: IMAGES.advisory.tato,
  },
  {
    name: 'Mr Anunay Kumar',
    role: 'Former French Teacher, Mayo College',
    image: IMAGES.advisory.anunay,
  },
  {
    name: 'Prof Ebrahim Salimikouchi',
    role: 'Bordeaux University, France',
    image: IMAGES.advisory.salimikouchi,
  },
  {
    name: 'Mr Thierry Larivière',
    role: 'Alliance Française, Jaipur',
    image: IMAGES.advisory.lariviere,
  },
  {
    name: 'Mr Léonide Aslanoff',
    role: 'Former Cultural Attaché, French Embassy',
    image: IMAGES.advisory.aslanoff,
  },
];

function MemberCard({ member, index }: { member: (typeof advisoryMembers)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.03 }}
    >
      <TiltedReflectiveCard className="overflow-hidden h-full !bg-[#09111F]/50 border-white/[0.04]">
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-[800ms] group-hover:scale-104"
          />
        </div>
        <div className="p-6 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-[2px]">
          <h3 className="font-heading font-extrabold text-base text-white mb-2 uppercase tracking-tight">
            {member.name}
          </h3>
          <p className="font-body text-xs text-[#7A94AC] leading-relaxed">
            {member.role}
          </p>
        </div>
      </TiltedReflectiveCard>
    </motion.div>
  );
}

export default function Advisory() {
  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-width architectural background
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-end">
        <img
          src={MAYO.about1}
          alt="Mayo College"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.6)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,7,11,0.85) 0%, rgba(5,7,11,0.3) 50%, rgba(5,7,11,0.85) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40" />

        <div className="container max-w-[1400px] w-full relative z-10 px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Advisory Committee
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Committee <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>&amp; Advisors</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC] max-w-xl leading-relaxed font-body">
              Distinguished educators and cultural ambassadors who lend their expertise and vision to Le Concours de la Francophonie du Mayo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MEMBERS GRID ═══ */}
      <section className="py-16 md:py-24 border-t border-white/[0.04]">
        <div className="container px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {advisoryMembers.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING QUOTE ═══ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={MAYO.ctaBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.15) saturate(0.3)' }}
          />
          <div className="absolute inset-0 bg-[#05070B]/90" />
        </div>

        <div className="container max-w-2xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center"
          >
            <p className="font-heading text-lg md:text-xl text-white leading-relaxed mb-6 italic">
              "La langue française est une femme. Et cette femme est si belle."
            </p>
            <p className="font-body text-[9px] text-[#4A6A8A]/60 tracking-wider uppercase font-bold">
              — Anatole France
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
