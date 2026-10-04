import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { IMAGES } from '@/lib/images';
import { MAYO } from '@/lib/mayo-images';
import { TiltedReflectiveCard } from '../components/TiltedReflectiveCard';

const EASE = [0.16, 1, 0.3, 1] as const;

interface MessageData {
  image: string;
  name: string;
  role: string;
  fr: string;
  en: string;
}

const messages: MessageData[] = [
  {
    image: IMAGES.principal,
    name: 'Saurav Sinha',
    role: 'Principal – Mayo College',
    fr: `C'est avec un grand plaisir que nous vous accueillons à la 13e édition du Concours de la Francophonie du Mayo 2026, une célébration de la culture, de la créativité et de l'esprit vibrant du monde francophone. S'appuyant sur le fier héritage du Mayo College, cet événement continue de refléter notre engagement envers l'excellence académique, les échanges culturels et la citoyenneté mondiale.\n\nAu fil des années, le LCF du Mayo est devenu un événement phare du Département de Français, mettant en lumière le talent, l'enthousiasme et le dévouement de nos élèves et enseignants. Chaque édition apporte de nouvelles dimensions à l'apprentissage, à la créativité et à la collaboration. Inspirés par le succès des années précédentes, nous continuons d'enrichir le programme avec des événements innovants qui soulignent la diversité et le dynamisme du monde francophone.\n\nLe français n'est pas seulement la langue de la France ; c'est une langue internationale parlée sur cinq continents et servant de langue officielle dans plus de 29 pays. Apprendre le français ouvre les portes de cultures diverses, d'opportunités mondiales et de compréhension interculturelle. Fidèle à cet esprit, le LCF du Mayo s'étend au-delà des frontières géographiques et célèbre la richesse du monde francophone. Lors des éditions précédentes, nous avons eu le privilège d'accueillir des invités distingués de régions telles que le Québec, la France, le Luxembourg, la Suisse, le Canada, la Belgique et Madagascar.\n\nJ'adresse mes meilleurs vœux à tous les participants et enseignants pour un LCF du Mayo 2026 mémorable. Que cette expérience vous inspire, vous aide à tisser des amitiés durables, approfondisse votre appréciation de la Francophonie et vous laisse de précieux souvenirs de votre séjour au Mayo College.`,
    en: `It is with great pleasure that we welcome you to the 13th Edition of Le Concours de la Francophonie du Mayo 2026, a celebration of culture, creativity, and the vibrant spirit of the Francophone world. Building on the proud legacy of Mayo College, this event continues to reflect our commitment to academic excellence, cultural exchange, and global citizenship.\n\nOver the years, LCF du Mayo has grown into a signature event of the French Department, showcasing the talent, enthusiasm, and dedication of our students and teachers. Each edition brings new dimensions to learning, creativity, and collaboration. Inspired by the success of previous years, we continue to enrich the programme with innovative events that highlight the diversity and dynamism of the Francophone world.\n\nFrench is not only the language of France; it is an international language spoken across five continents and serves as an official language in over 29 countries. Learning French opens doors to diverse cultures, global opportunities, and intercultural understanding. True to this spirit, LCF du Mayo extends beyond geographical boundaries and celebrates the richness of the Francophone world. In earlier editions, we have been privileged to welcome distinguished guests from regions such as Quebec, France, Luxembourg, Switzerland, Canada, Belgium, and Madagascar.\n\nI extend my best wishes to all participants and teachers for a memorable LCF du Mayo 2026. May this experience inspire you, help you forge lasting friendships, deepen your appreciation of the Francophonie, and leave you with cherished memories of your time at Mayo College.`,
  },
  {
    image: IMAGES.convenor,
    name: 'Kunal Kumar',
    role: 'Head of Department – French, Founder LCF',
    fr: `Bienvenue à l'édition 2026 du Concours de la Francophonie du Mayo.\nAprès une année 2025 exceptionnelle, marquée par des célébrations historiques et une participation remarquable, nous sommes heureux de vous accueillir pour une nouvelle édition du LCF du Mayo 2026, un événement qui continue de grandir et de rayonner au sein de la communauté francophone scolaire.\n\nAu fil des années, le Concours de la Francophonie du Mayo s'est imposé comme une plateforme unique d'échanges culturels et linguistiques. Les éditions précédentes ont permis aux élèves de découvrir la richesse du monde francophone à travers des activités variées, créatives et pédagogiques, favorisant une immersion authentique dans la langue et la culture françaises.\n\nLe LCF du Mayo 2026 demeure un événement par les élèves et pour les élèves, offrant bien plus qu'une simple compétition. Il permet aux participants de développer des compétences essentielles telles que le leadership, la gestion d'événements, le travail d'équipe, la communication interculturelle et la créativité. À travers des initiatives comme les concours culturels, linguistiques et éditoriaux, les élèves enrichissent leur parcours académique tout en laissant un héritage inspirant aux générations futures.\n\nLa Francophonie est bien plus qu'une langue : elle est un lien vivant entre les cultures, les peuples et les traditions du monde entier. En célébrant la langue française, nous célébrons la diversité, l'ouverture d'esprit et les valeurs de partage qui nous unissent. Le Concours de la Francophonie du Mayo 2026 est une invitation à explorer cette richesse, à apprendre les uns des autres et à bâtir des amitiés au-delà des frontières.\n\nC'est avec enthousiasme que nous vous invitons à prendre part à cette célébration de la langue française et de la culture francophone, portée par l'engagement des élèves et des enseignants.\nVenez célébrer la Francophonie avec nous et créer ensemble des souvenirs inoubliables.`,
    en: `Welcome to the 2026 Edition of Le Concours de la Francophonie du Mayo.\nAfter an exceptional 2025, marked by historic celebrations and remarkable participation, we are delighted to welcome you to a new edition of LCF du Mayo 2026, an event that continues to grow and shine within the school francophone community.\n\nOver the years, Le Concours de la Francophonie du Mayo has established itself as a unique platform for cultural and linguistic exchange. Previous editions have enabled students to discover the richness of the Francophone world through varied, creative, and educational activities, fostering an authentic immersion in the French language and culture.\n\nLCF du Mayo 2026 remains an event by students and for students, offering much more than a simple competition. It enables participants to develop essential skills such as leadership, event management, teamwork, intercultural communication, and creativity. Through initiatives like cultural, linguistic, and editorial competitions, students enrich their academic journey while leaving an inspiring legacy for future generations.\n\nLa Francophonie is much more than a language: it is a living bond between cultures, peoples, and traditions from around the world. By celebrating the French language, we celebrate diversity, open-mindedness, and the values of sharing that unite us. Le Concours de la Francophonie du Mayo 2026 is an invitation to explore this richness, to learn from one another, and to build friendships beyond borders.\n\nIt is with great enthusiasm that we invite you to take part in this celebration of the French language and Francophone culture, driven by the commitment of students and teachers.\nCome celebrate la Francophonie with us and create unforgettable memories together.`,
  },
];

function PersonMessage({ data, index }: { data: MessageData; index: number }) {
  const [lang, setLang] = useState<'fr' | 'en'>('en');
  const currentText = lang === 'fr' ? data.fr : data.en;
  const paragraphs = currentText.split('\n\n').filter(Boolean);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle architectural background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={index === 0 ? MAYO.about1 : MAYO.about2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.1) saturate(0.3)' }}
        />
        <div className="absolute inset-0 bg-[#05070B]/90" />
      </div>

      <div className="container max-w-5xl px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:col-span-4 aspect-[4/5] w-full"
          >
            <TiltedReflectiveCard className="w-full h-full overflow-hidden !bg-[#09111F]/50 border-white/[0.04]">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-[800ms] group-hover:scale-[1.04]"
              />
            </TiltedReflectiveCard>
          </motion.div>

          {/* Text Column */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-white mb-1 uppercase tracking-tight">{data.name}</h3>
                <p className="font-body text-[8px] tracking-[0.2em] uppercase text-[#4A6A8A]/60 font-bold">{data.role}</p>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 p-1 bg-white/[0.02] border border-white/[0.04] self-start sm:self-center">
                {(['fr', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-2 text-[9px] tracking-wider uppercase font-heading font-bold transition-all duration-300 cursor-pointer ${
                      lang === l
                        ? 'bg-[#2A5A9A] text-white'
                        : 'text-white/40 hover:text-white/85'
                    }`}
                  >
                    {l === 'fr' ? 'FR' : 'EN'}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter reveal paragraph container */}
            <div className="space-y-4 font-body text-xs md:text-sm text-[#7A94AC] leading-relaxed max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {paragraphs.map((p, i) => (
                    <p key={i} className="mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Messages() {
  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8EDF7] overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-width architectural background
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-end">
        <img
          src={MAYO.split2}
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
              From the Desk
            </span>
            <h1 className="font-heading font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Inspirational <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #7AA8D4 50%, #4A7AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Messages</span>
            </h1>
            <p className="text-sm md:text-base text-[#7A94AC] max-w-xl leading-relaxed font-body">
              Words of inspiration and guidance from the leadership of Le Concours de la Francophonie du Mayo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MESSAGES LIST ═══ */}
      <div className="divide-y divide-white/[0.03]">
        <PersonMessage data={messages[0]} index={0} />
        <PersonMessage data={messages[1]} index={1} />
      </div>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
