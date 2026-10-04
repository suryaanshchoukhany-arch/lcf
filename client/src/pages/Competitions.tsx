import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ChevronDown, ArrowRight, Trophy, Music, Globe, ChefHat, PenTool, ScrollText, HelpCircle, Clapperboard, PenLine, Music2, type LucideIcon } from 'lucide-react';
import { TiltedReflectiveCard } from '../components/TiltedReflectiveCard';
import Magnetic from '@/components/Magnetic';
import { MAYO } from '@/lib/mayo-images';

const EASE = [0.16, 1, 0.3, 1] as const;

interface EventData {
  name: string;
  nameFr: string;
  desc: string;
  icon: LucideIcon;
}

function EventCard({ event, index }: { event: EventData; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.03 }}
    >
      <TiltedReflectiveCard className="w-full !bg-[#09111F]/50 border-white/[0.04]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-6 md:p-8 flex items-start gap-6 cursor-pointer group"
        >
          <div className="text-blue-500 shrink-0 mt-1 transition-transform duration-500 group-hover:scale-105">
            <event.icon size={32} className="text-current" />
          </div>
          <div className="flex-1 min-w-0 transition-transform duration-500 group-hover:-translate-y-[2px]">
            <h3 className="font-heading font-extrabold text-white text-base md:text-lg group-hover:text-white transition-colors duration-300 normal-case uppercase tracking-tight">
              {event.name}
            </h3>
            <p className="text-[10px] font-body italic text-[#4A6A8A]/50 mt-1">{event.nameFr}</p>
          </div>
          <div className="shrink-0 mt-2">
            <div className="w-8 h-8 bg-white/[0.02] border border-white/[0.04] flex items-center justify-center hover:bg-white/[0.06] transition-all duration-300">
              <ChevronDown
                size={14}
                className={`text-[#4A6A8A]/50 transition-transform duration-500 ${expanded ? 'rotate-180 text-white' : ''}`}
              />
            </div>
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="border-t border-white/[0.04] pt-5 ml-[3.5rem]">
                  <p className="text-xs md:text-sm text-[#7A94AC] leading-relaxed font-body">{event.desc}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TiltedReflectiveCard>
    </motion.div>
  );
}

const seniorEvents: EventData[] = [
  {
    name: 'French Language Olympiad',
    nameFr: 'Olympiade de la Langue Française',
    desc: 'The purpose of this event is to test the vocabulary and grammatical knowledge of the students. The level required corresponds to DELF A2. Participants answer multiple-choice questions testing vocabulary, grammar, reading comprehension, and cultural knowledge.',
    icon: Trophy,
  },
  {
    name: 'Solo Song',
    nameFr: 'Chanson Solo',
    desc: 'The purpose of solo song is to enhance artistic and language skills, you also get to showcase your talent and learn French and Francophonie Culture. Participants are judged on pronunciation, melody, stage presence, and emotional expression.',
    icon: Music,
  },
  {
    name: 'Francophone Exhibition',
    nameFr: 'Exposition Francophonie',
    desc: 'The Objective of Francophone Exhibition is to enhance the pupil\'s knowledge while also developing a grip of the language. Schools create cultural stalls representing a French-speaking country with art, cuisine samples, historical facts, and cultural artifacts.',
    icon: Globe,
  },
  {
    name: 'French Cuisine',
    nameFr: 'Cuisine Francophone',
    desc: 'The purpose of a French Cuisine Competition is to inculcate in a student, the knowledge and skill required to cook French food. Teams cook a French vegetarian recipe on-site and are judged on authenticity, presentation, taste, and cultural significance.',
    icon: ChefHat,
  },
  {
    name: 'Spell Bee',
    nameFr: "Abeille d'Orthographe",
    desc: 'The purpose of a spell bee contest is to help students improve their spellings, enhance their vocabulary and develop correct French usage. A thrilling multi-round elimination contest testing spelling accuracy and linguistic precision.',
    icon: PenTool,
  },
  {
    name: 'Poem Recitation',
    nameFr: 'Récitation de Poésie',
    desc: 'The purpose of poetry is to communicate an idea, a sentiment, a concept. French Poetry has always held significant Value. Perform French poetry with expression, correct pronunciation, and artistic flair from a curated list.',
    icon: ScrollText,
  },
  {
    name: 'Francophonic Quiz',
    nameFr: 'Quiz des Francophones',
    desc: 'The Objective of the Quiz is to test the general knowledge about France and francophone countries. Teams compete across multiple rounds of increasing difficulty in a fast-paced quiz format covering culture, geography, history, and current affairs.',
    icon: HelpCircle,
  },
  {
    name: 'French Film Festival',
    nameFr: 'Français Cinéma Fête',
    desc: 'It aims to bring out the artist in the students. It gives stage to all who voice and shape their story. Films are judged on storyline, French dialogue quality, cinematography, and cultural relevance.',
    icon: Clapperboard,
  },
];

const juniorEvents: EventData[] = [
  {
    name: 'Spell Bee — Junior Edition',
    nameFr: "Abeille d'Orthographe — Édition Junior",
    desc: 'The purpose of a spell bee contest is to help students improve their spellings, enhance their vocabulary and develop correct French usage. This junior edition is designed for younger learners with age-appropriate words.',
    icon: PenLine,
  },
  {
    name: 'Solo Song — Junior Edition',
    nameFr: 'Chanson Solo — Édition Junior',
    desc: 'The purpose of solo song is to enhance artistic and language skills, you also get to showcase your talent and learn French and Francophonie Culture. A specially designed singing competition for junior students.',
    icon: Music2,
  },
];

export default function Competitions() {
  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-width architectural background
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end">
        <img
          src={MAYO.comp1}
          alt="LCF Competitions"
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
              Events
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Competitions <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>&amp; Modules</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC] max-w-xl leading-relaxed font-body">
              Le Concours de la Francophonie du Mayo features exciting competitions and activities. Rules and guidelines are attached to each event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CATEGORY CARDS ═══ */}
      <section className="py-16 md:py-20 border-t border-white/[0.04]">
        <div className="container max-w-[1400px] px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <TiltedReflectiveCard className="!bg-[#09111F]/50 border-white/[0.04]">
                <a href="#senior" className="p-6 md:p-8 flex items-center justify-between group block">
                  <div>
                    <div className="text-4xl md:text-5xl font-heading font-black text-white group-hover:text-white transition-colors">8</div>
                    <div className="text-[8px] font-heading tracking-[0.25em] text-[#4A6A8A]/60 uppercase font-bold mt-1">Senior Events</div>
                  </div>
                  <ArrowRight size={18} className="text-[#4A6A8A]/40 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-500 ease-[0.16,1,0.3,1]" />
                </a>
              </TiltedReflectiveCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.06 }}
            >
              <TiltedReflectiveCard className="!bg-[#09111F]/50 border-white/[0.04]">
                <a href="#junior" className="p-6 md:p-8 flex items-center justify-between group block">
                  <div>
                    <div className="text-4xl md:text-5xl font-heading font-black text-white group-hover:text-white transition-colors">2</div>
                    <div className="text-[8px] font-heading tracking-[0.25em] text-[#4A6A8A]/60 uppercase font-bold mt-1">Junior Events</div>
                  </div>
                  <ArrowRight size={18} className="text-[#4A6A8A]/40 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-500 ease-[0.16,1,0.3,1]" />
                </a>
              </TiltedReflectiveCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SPLIT-SCREEN: Senior Events + Architectural Image
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left — Architectural photo with parallax */}
          <div className="relative w-full lg:w-[40%] h-[400px] lg:h-auto overflow-hidden">
            <img
              src={MAYO.comp2}
              alt="LCF Events"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.45) saturate(0.65)' }}
            />
            <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(to right, transparent 50%, #05070B 100%)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/80 to-transparent lg:hidden" />

            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#4A7AAA] font-bold block mb-4">
                  Senior Division
                </span>
                <h2 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  8 Modules<br />of Excellence
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Right — Senior events list */}
          <div id="senior" className="w-full lg:w-[60%] py-16 lg:py-24 px-6 lg:px-12">
            <div className="space-y-4">
              {seniorEvents.map((event, idx) => (
                <EventCard key={idx} event={event} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          JUNIOR EVENTS
          ═══════════════════════════════════════════════════════════ */}
      <section id="junior" className="py-24 md:py-32 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute -top-16 -left-16 select-none pointer-events-none font-heading font-extrabold tracking-tight text-white/[0.015] uppercase leading-none" style={{ fontSize: 'clamp(100px, 20vw, 280px)' }}>
          JUNIOR
        </div>

        <div className="container max-w-[1200px] px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-4 mb-12"
          >
            <h2 className="font-heading font-extrabold text-white tracking-tight uppercase text-xl md:text-2xl">Junior Events</h2>
            <div className="bg-white/[0.02] border border-white/[0.04] px-4 py-1">
              <span className="text-[9px] font-heading font-bold tracking-[0.2em] text-[#4A6A8A]/50 uppercase">2 Modules</span>
            </div>
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            {juniorEvents.map((event, idx) => (
              <EventCard key={idx} event={event} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* ═══════════════════════════════════════════════════════════
          REGISTER CTA — Architectural background
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-40 md:py-56 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={MAYO.ctaBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.4)' }}
          />
          <div className="absolute inset-0 bg-[#05070B]/80" />
        </div>

        <div className="container relative z-10 max-w-2xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="text-[9px] font-body tracking-[0.25em] uppercase text-[#2A5A9A] font-bold block mb-5">
              Join the Competition
            </span>
            <h2 className="font-heading font-extrabold text-white tracking-tight mb-6 leading-[0.95] uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Ready to Compete?
            </h2>
            <p className="text-xs md:text-sm text-[#4A6A8A]/60 max-w-md mx-auto mb-12 font-body leading-relaxed">
              Register your school for the XIIIth Edition of Le Concours de la Francophonie du Mayo today.
            </p>
            <Magnetic range={60} strength={0.3}>
              <motion.a
                href="https://forms.gle/iVtMpHNNsRXPmx348"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="inline-flex px-12 py-5 text-[10px] tracking-[0.18em] uppercase font-heading font-bold bg-[#2A5A9A] hover:bg-[#1E4A80] transition-all text-white items-center gap-3 btn-sweep"
              >
                Register Now
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
