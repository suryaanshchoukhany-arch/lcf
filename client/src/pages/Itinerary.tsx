import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TiltedReflectiveCard } from '../components/TiltedReflectiveCard';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Itinerary() {
  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden flex flex-col justify-between">
      <Navigation />

      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center py-28 md:py-36 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#2A5A9A]/15 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.1, 0.2, 0.1],
              x: [30, -30, 30],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#2563EB]/10 blur-[130px]"
          />
        </div>

        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          {/* Header Description */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-14 text-center"
          >
            <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#2A5A9A] font-medium block mb-5">
              Event Itinerary
            </span>
            <div className="mb-6">
              <h1 className="font-heading text-white block leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Interactive <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Schedule</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-[#7A94AC]/60 max-w-md mx-auto leading-relaxed font-body">
              Three days of competition, culture, and celebration. The detailed agenda is currently being finalized.
            </p>
          </motion.div>

          {/* Coming Soon Premium Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="w-full max-w-xl mx-auto"
          >
            <TiltedReflectiveCard className="w-full !bg-[#09111F]/40 backdrop-blur-md border-white/[0.04] p-8 md:p-12 relative select-none">
              <div className="flex flex-col gap-6 text-left">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                  <span className="text-[9px] tracking-[0.2em] font-heading text-[#2A5A9A] font-bold">13E ÉDITION</span>
                  <span className="text-[9px] font-body tracking-[0.1em] text-white/30">AJMER, IN</span>
                </div>

                <div>
                  <h4 className="font-heading font-extrabold text-white text-xl uppercase tracking-tight mb-1">
                    L'Itinéraire des Trois Jours
                  </h4>
                  <p className="text-[10px] text-[#7A94AC]/50 font-body mb-6">
                    A sneak peek of the upcoming festival program
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <span className="text-[9px] font-heading font-bold text-[#2A5A9A] w-12 pt-0.5 shrink-0">JOUR 1</span>
                    <div>
                      <h5 className="text-[11px] font-body font-semibold text-white uppercase tracking-wider">Inauguration & Olympiade</h5>
                      <p className="text-[10px] text-[#7A94AC]/60 font-body mt-0.5 leading-relaxed">Opening ceremony, delegate registrations, and linguistic assessments.</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white/[0.02]" />
                  <div className="flex gap-4 items-start">
                    <span className="text-[9px] font-heading font-bold text-[#2A5A9A] w-12 pt-0.5 shrink-0">JOUR 2</span>
                    <div>
                      <h5 className="text-[11px] font-body font-semibold text-white uppercase tracking-wider">Gastronomie & Orthographe</h5>
                      <p className="text-[10px] text-[#7A94AC]/60 font-body mt-0.5 leading-relaxed">French cuisine live showcase, food festival, and spelling bees.</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white/[0.02]" />
                  <div className="flex gap-4 items-start">
                    <span className="text-[9px] font-heading font-bold text-[#2A5A9A] w-12 pt-0.5 shrink-0">JOUR 3</span>
                    <div>
                      <h5 className="text-[11px] font-body font-semibold text-white uppercase tracking-wider">Défis & Clôture</h5>
                      <p className="text-[10px] text-[#7A94AC]/60 font-body mt-0.5 leading-relaxed">Grand quiz finals, short film screenings, and valedictory awards ceremony.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.04] pt-5 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[8px] font-body tracking-[0.15em] uppercase text-white/50 font-bold">Détails Bientôt Disponibles</span>
                  </div>
                  <span className="text-[9px] font-body text-[#4A6A8A]/60 italic">October 2026</span>
                </div>
              </div>
            </TiltedReflectiveCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
